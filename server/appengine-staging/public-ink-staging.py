import os, urllib, time, re, logging, hashlib, uuid, graphene, webapp2, hashlib, jinja2, json, uuid, jwt
from user_agents import parse
from collections import defaultdict, OrderedDict
from datetime import datetime, timedelta
from slugify import slugify
from random import randint
# app engine apis
from google.appengine.ext import ndb, blobstore
from google.appengine.api import memcache, mail, images
from google.appengine.ext.webapp import blobstore_handlers
# public.ink
from shared import timing, dt_to_epoch, RequestHandler, cross_origin, ninja, allow_cors, return_json, ENV_NAME, FRONTEND_URL, BACKEND_URL, DO_TIME
from secrets import JWT_SECRET, JWT_EXP_DELTA_SECONDS, JWT_ALGORITHM, JWT_EXP_DELTA_DAYS

from google.appengine.api import datastore_errors


##########################
# welcome to public.ink! #
##########################


"""  MODELS AND SCHEMAS """

class InkModel(ndb.Model):
    """
    A common NDB entity model
    """
    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now=True)


""" USER """
class UserModel(InkModel):
    """
    The NDB UserModel [root entity]
    """
    email = ndb.StringProperty(required=True)
    email_verified_at = ndb.DateTimeProperty()
    verification_token = ndb.StringProperty()
    password_hash_sha256 = ndb.StringProperty()
    reset_password_token = ndb.StringProperty()

    @property
    def is_verified(self):
        return True if self.email_verified_at else False


class UserSchema(graphene.ObjectType):
    """
    Simple User Schema: email and verified
    """
    email = graphene.String()
    verified = graphene.Boolean()
    def resolve_verified(self, args, context, info):
        return self.is_verified


""" USER IMAGE """
class ImageModel(InkModel):
    """
    The NDB model for user-uploaded images
    The id is set by us, and is a uuid plus the file name
    """
    blob_key = ndb.BlobKeyProperty()
    user_key = ndb.KeyProperty(kind=UserModel)

    @property
    def url(self):
        return BACKEND_URL + '/api/image/serve?key=' + str(self.blob_key)

    @property
    def id(self):
        return self.key.id()


class ImageSchema(graphene.ObjectType):
    """
    The simple schema representing a user-uploaded image
    """
    id = graphene.String()
    url = graphene.String()
    created = graphene.String()


"""
Generic Info Schema, super useful
"""
class InfoSchema(graphene.ObjectType):
    """
    container for part of ANY response
    """
    success = graphene.Boolean()
    message = graphene.String()


"""
Account Schema including stats (refactor)
"""
class AccountSchema(graphene.ObjectType):
    """
    container for account part of ANY response
    """
    email = graphene.String()
    verified = graphene.Boolean()
    authenticated = graphene.Boolean()
    jwt = graphene.String()

    """ Number of publications TODO """
    publication_count = graphene.Int()
    article_count = graphene.Int()

    """ Total Views """
    total_views = graphene.Int()
    @timing
    def resolve_total_views(self, *args):
        user_key = ndb.Key('UserModel', self.email)
        return EventModel.query(EventModel.user == user_key).count()

    """ Daily Stats """
    daily_views = graphene.String()
    @timing
    def resolve_daily_views(self, *args):
        
        # results placeholder
        result_dict = OrderedDict()
        today = datetime.today()
        for days_back in range(0, 7):
            day = today - timedelta(days=days_back)
            day_str = str(day.date())
            result_dict[day_str] = {
                'views': 0,
                'device': {'mobile': 0, 'pc': 0, 'tablet': 0},
                'bot': {'bot': 0, 'human': 0},
                'touch': {'yes': 0, 'no': 0}
            }
        # prepare query
        today = datetime.today().date()
        now = datetime.now()
        start = now - timedelta(days=6)
        user_key = ndb.Key('UserModel', self.email)

        # query
        events = EventModel.query(ndb.AND(
            EventModel.user == user_key,
            EventModel.created > start
            )).order(EventModel.created).fetch()

        # iterate and increment
        for event in events:
            day_str = str(event.created.date())
            # total views
            result_dict[day_str]['views'] += 1
            # bot
            kind = 'bot' if event.is_bot else 'human'
            result_dict[day_str]['bot'][kind] += 1
            # touch
            kind = 'yes' if event.has_touch else 'no'
            result_dict[day_str]['touch'][kind] += 1
            # device class
            if event.is_pc: result_dict[day_str]['device']['pc'] += 1
            if event.is_mobile: result_dict[day_str]['device']['mobile'] += 1
            if event.is_tablet: result_dict[day_str]['device']['tablet'] += 1
                
        return json.dumps(result_dict)

    """ related: authors connected to this account """
    authors = graphene.List(lambda: AuthorSchema)
    @timing
    def resolve_authors(self, *args):
        user_key = ndb.Key('UserModel', self.email)
        authors = AuthorModel.query(AuthorModel.user == user_key)
        return authors

class AccountResponse(graphene.ObjectType):
    """
    Returned on account calls, like login, registration
    """
    info = graphene.Field(InfoSchema)
    account = graphene.Field(AccountSchema)

class AuthorResponse(graphene.ObjectType):
    """
    Returned for author saves
    """
    info = graphene.Field(InfoSchema)
    author = graphene.Field(lambda: AuthorSchema)

class ArticleResponse(graphene.ObjectType):
    """
    Returned for saveArticle calls
    """
    info = graphene.Field(InfoSchema)
    article = graphene.Field(lambda: ArticleSchema)

class PublicationResponse(graphene.ObjectType):
    """
    Returned for savePublication calls
    """
    info = graphene.Field(InfoSchema)
    publication = graphene.Field(lambda: PublicationSchema)



"""
AUTHOR 
"""

class AuthorModel(InkModel):
    """
    The NDB model for an author
    """
    user = ndb.KeyProperty(kind=UserModel, required=True)
    name = ndb.StringProperty(required=True)
    about = ndb.StringProperty()
    imageURL = ndb.StringProperty()


class AuthorSchema(graphene.ObjectType):
    """
    The schema representing an author
    """
    id = graphene.String()
    user = graphene.Field(UserSchema)
    name = graphene.String()
    about = graphene.String()
    imageURL = graphene.String()

    # generic
    created = graphene.String()
    updated = graphene.String()

    # related
    publications = graphene.List(lambda: PublicationSchema)
    @timing
    def resolve_publications(self, args, *more):
        return PublicationModel.query(ancestor=self.key).order(PublicationModel.position)

    def resolve_id(self, *args):
        return self.key.id()



"""
PUBLICATION 
"""

class PublicationModel(InkModel):
    """
    NDB model for publications
    """
    name = ndb.StringProperty()
    about = ndb.StringProperty()
    imageURL = ndb.StringProperty()
    position = ndb.IntegerProperty()

class PublicationSchema(graphene.ObjectType):
    """
    The schema representing a publication
    """
    id = graphene.String()
    articles = graphene.List(lambda: ArticleSchema, include_drafts=graphene.Boolean())
    author = graphene.Field(AuthorSchema)
    name = graphene.String()
    about = graphene.String()
    imageURL = graphene.String()

    def resolve_id(self, *args):
        return self.key.id()

    @timing
    def resolve_articles(self, args, *more):
        #if args.get('include_drafts'):
        if 1 == 1:
            return ArticleModel.query(ancestor=self.key).order(ArticleModel.position)
        else:
            """ filters out un-published articles """
            articles = ArticleModel.query(ancestor=self.key).order(ArticleModel.position).fetch()
            published_articles = filter((lambda article: article.published_at is not None), articles)
            return published_articles

    @timing
    def resolve_author(self, *args):
        return self.key.parent().get()


"""
ARTICLE 
"""
class ArticleModel(InkModel):
    """ Article NDB model """
    title = ndb.StringProperty()
    prefoldJSON = ndb.TextProperty()
    postfoldJSON = ndb.TextProperty()
    published_at = ndb.DateTimeProperty()
    position = ndb.IntegerProperty()

    @timing
    def publish(self):
        self.published_at = datetime.now()
        self.put()

    @timing
    def unpublish(self):
        self.published_at = None
        self.put()

class ArticleSchema(graphene.ObjectType):
    """
    The schema for representing an article.
    """
    title = graphene.String()
    prefoldJSON = graphene.String()
    postfoldJSON = graphene.String()
    published_at = graphene.Float()

    id = graphene.String()
    def resolve_id(self, *args):
        return self.key.id()

    def resolve_published_at(self, *args):
        return dt_to_epoch(self.published_at)

    # related: parent publication
    publication = graphene.Field(PublicationSchema)
    @timing
    def resolve_publication(self, *args):
        return self.key.parent().get()

    # related: parent publication's author
    author = graphene.Field(AuthorSchema)
    @timing
    def resolve_author(self, *args):
        return self.key.parent().parent().get()

""" 
COMMENTS
"""
class CommentModel(InkModel):
    """ a user comment """
    article = ndb.KeyProperty(kind=ArticleModel)
    # in case the comment is a reply to another comment
    comment = ndb.KeyProperty()
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    body = ndb.TextProperty()


class CommentSchema(graphene.ObjectType):
    """
    A user comment (reply?)
    """
    name = graphene.String()
    body = graphene.String()

"""
Analytics Event
"""
class EventModel(InkModel):
    """
    A raw, singular event, like a pageview, a publication expansion, etc.
    """
    name = ndb.StringProperty()
    session_id = ndb.StringProperty()
    user = ndb.KeyProperty(kind=UserModel)
    author = ndb.KeyProperty(kind=AuthorModel)
    publication = ndb.KeyProperty(kind=PublicationModel)
    article = ndb.KeyProperty(kind=ArticleModel)
    path = ndb.StringProperty()
    os = ndb.StringProperty()
    browser = ndb.StringProperty()
    agent = ndb.StringProperty()
    browser = ndb.StringProperty()
    browser_version = ndb.StringProperty()
    os = ndb.StringProperty()
    os_version = ndb.StringProperty()
    device = ndb.StringProperty()
    brand = ndb.StringProperty()
    model = ndb.StringProperty()
    is_mobile = ndb.BooleanProperty()
    is_tablet = ndb.BooleanProperty()
    has_touch = ndb.BooleanProperty()
    is_pc = ndb.BooleanProperty()
    is_bot = ndb.BooleanProperty()



"""    THE  GRAPHQL QUERY      """


class Query(graphene.ObjectType):
    """
    This query hold all the 'endpoints' and how to resolve related data
    """

    """ AUTHENTICATION """

    """ Email / Password Login """
    epLogin = graphene.Field(AccountResponse)
    @timing
    def resolve_epLogin(self, *args):
        email = self.get('email')
        password = self.get('password')

        """ check required arguments """      
        if not email or not password:
            return AccountResponse(info=InfoSchema(success=False, message='missing_arguments'))

        """ retrieve user """
        user = ndb.Key('UserModel', email).get()
        if not user:
            return AccountResponse(info=InfoSchema(success=False, message='account_not_found'))

        """ check for stored, hashed password on account """
        if not user.password_hash_sha256:
            return AccountResponse(info=InfoSchema(success=False, message='password_hash_missing'))

        """ check password """
        matches = verify_password(user.password_hash_sha256, password)
        if not matches:
            return AccountResponse(info=InfoSchema(success=False, message='password_mismatch'))

        """ all good: respond with account and info """
        account = AccountSchema(
            email=email,
            verified=user.is_verified,
            authenticated=True,
            jwt=generate_jwt(email)
        )
        return AccountResponse(
            account=account,
            info=InfoSchema(success=True, message='login_successful'))


    """ AUTH: JWT LOGIN"""
    jwtLogin = graphene.Field(AccountResponse)
    @timing
    def resolve_jwtLogin(self, *args):
        """
        Checks the JWT and returns an AccountResponse
        """
        token = self.get('jwt')
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            email = payload.get('email')
            user_key = ndb.Key('UserModel', email)
            user = user_key.get()

            if not user:
                return AccountResponse(info=InfoSchema(success=False, message='account_not_found'))

            return AccountResponse(
                info=InfoSchema(success=True, message="jwt_login_successful"),
                account=AccountSchema(
                    email=email, verified=user.is_verified, 
                    authenticated=True, jwt=generate_jwt(email))
                )
            
        except jwt.ExpiredSignatureError, e:
            return AccountResponse(info=InfoSchema(success=False, message='token_expired'))
        except jwt.DecodeError, e:
            return AccountResponse(info=InfoSchema(success=False, message='token_invalid'))


    """
    Verfiy email (with a token from the verification linke)
    """
    verifyEmail = graphene.Field(AccountResponse, email=graphene.String(), token=graphene.String())
    @timing
    def resolve_verifyEmail(self, args, context, info):
        email = args.get('email')
        token = args.get('token')
        user = ndb.Key('UserModel', email).get()
        if token == user.verification_token:
            """ success """
            user.email_verified_at = datetime.now()
            user.put()
            return AccountResponse(
                info=InfoSchema(success=True, message="email verification successful"),
                account=AccountSchema(
                    email=user.email, verified=user.is_verified, 
                    authenticated=True, jwt=generate_jwt(user.email)))
        else:
            """ failure """
            return AccountResponse(info=InfoSchema(success=False, message='email verification failed'))

    

    """ 
    Create Account
    """
    createAccount = graphene.Field(AccountResponse)
    @timing
    def resolve_createAccount(self, *args):
        """
        creates a user with the given email address, provided it does not exist yet
        returns auth related information
        """

        """ email validation check """
        email = self.get('email')
        if not is_email_valid(email):
            return AccountResponse(info=InfoSchema(success=False, message='email_invalid'))

        """ duplicate email check """
        user = ndb.Key('UserModel', email).get()
        if user:
            return AccountResponse(info=InfoSchema(success=False, message='email_exists'))

        """ create an Account"""
        password = self.get('password')
        password_hash = hash_password(password)
        verification_token = uuid.uuid4().hex
        user_key = UserModel(
            id=email,
            email=email,
            verification_token=verification_token,
            password_hash_sha256=password_hash
            ).put()

        """ send email verification link """
        send_to_log = True if ENV_NAME == 'develop' else False
        send_verification_email(email, verification_token, send_to_log)

        """ return account response """
        return AccountResponse(
            info=InfoSchema(success=True, message="registration_successful"),
            account=AccountSchema(
                email=email, verified=False,
                authenticated=True, jwt=generate_jwt(email))
        )

    """
    Request Reset Password Link
    """
    requestResetPasswordLink = graphene.Field(InfoSchema, email=graphene.String())
    @timing
    def resolve_requestResetPasswordLink(self, args, *more):
        email = args.get('email') or self.get('email')
        user = ndb.Key('UserModel', email).get()

        if user:
            reset_password_token = uuid.uuid4().hex
            user.reset_password_token = reset_password_token
            user.put()
            send_to_log = True if ENV_NAME == 'develop' else False
            send_reset_password_email(email, reset_password_token, send_to_log)
            return InfoSchema(success=True, message='reset_link_sent')
        else:
            return InfoSchema(success=False, message='')


    """ 
    Reset Password (with token)
    """
    resetPassword = graphene.Field(InfoSchema, email=graphene.String(), token=graphene.String(), password=graphene.String())
    @timing
    def resolve_resetPassword(self, args, *more):
        email = args.get('email') or self.get('email')
        token = args.get('token') or self.get('token')
        new_password = args.get('password') or self.get('password')
        user = ndb.Key('UserModel', email).get()
        if user and user.reset_password_token == token:
            user.password_hash_sha256 = hash_password(new_password)
            user.reset_password_token = None
            user.put()
            return InfoSchema(success=True, message='Your password has been reset!')
        else:
            return InfoSchema(success=False, message='Password reset failed!')



    """ ENTITY CREATION AND MUTATION """

    """
    Save Author (create and update)
    """
    saveAuthor = graphene.Field(AuthorResponse)
    @timing
    def resolve_saveAuthor(self, args, *more):
        """
        Creates of updates an author
        """
        authorID = self.get('authorID')
        name = self.get('name')
        about = self.get('about')
        imageURL = self.get('imageURL')
        token = self.get('jwt')

        if not token:
            return AuthorResponse(
                InfoSchema(success=False, message='unauthorized (no jwt sent)')
            )

        email = email_from_jwt(token)
        user_key = ndb.Key('UserModel', email)

        if authorID == 'create-author':
            # duplication check
            if ndb.Key('AuthorModel', slugify(name)).get():
                return AuthorResponse(
                    info=InfoSchema(success=False, message='duplicate'),
                    author=None
                )

            """ create author """
            author_key = AuthorModel(
                id=slugify(name),
                name=name,
                about=about,
                imageURL=imageURL,
                user=user_key
            ).put()
            message = 'author_created'
        else:
            # authentication
            if not is_owner(token, authorID):
                return AuthorResponse(
                InfoSchema(success=False, message='unauthorized')
            )
            author_key = ndb.Key('AuthorModel', authorID)
            author = author_key.get()
            author.name = name
            author.about = about
            author.imageURL = imageURL
            author_key = author.put()
            message = 'author_updated'

        return AuthorResponse(
            info=InfoSchema(success=True, message=message),
            author=author_key.get()
        )

    """
    Save Author Order
    """
    save_author_order = graphene.Field(InfoSchema, author_data=graphene.String())
    @timing
    def resolve_save_author_order(self, args, context, info):
        """
        currently a pretty brute force implementation: gets and updates ALL the author's things
        a better idea might be to only send things where the order actually changed.
        in this context, think about ordering in general, and how new articles fit in.
        """
        author_data = json.loads(self.get('authorData'))
        author_id = author_data['authorID']
        publications = author_data['publications']
        publication_position = 0
        for pub in publications:
            publication_id = pub['publicationID']
            # retrieve publication and update
            publication = ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id).get()
            publication.position = publication_position
            publication.put()
            publication_position += 1
            article_position = 0
            for article_id in pub['articles']:
                # retrieve and update article
                article = ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id, 'ArticleModel', article_id).get()
                article.position = article_position
                article.put()
                article_position += 1
        return InfoSchema(success=True, message='order_saved')


    """
    Save Publication (create and update)
    """
    savePublication = graphene.Field(PublicationResponse,
                                     jwt=graphene.String(),
                                     publicationID=graphene.String(),
                                     authorID=graphene.String(),
                                     name=graphene.String()
                                    )
    @timing
    def resolve_savePublication(self, args, context, info):
       
        # params
        publicationID = self.get('publicationID')
        name = self.get('name')
        authorID = self.get('authorID')
        about = self.get('about')
        imageURL = self.get('imageURL')
        token = self.get('jwt')

        # authentication
        if not is_owner(token, authorID):
            return PublicationResponse(
                info=InfoSchema(success=False, message='unauthorized')
            )

        if publicationID == 'create-publication':
            """ create publication """
            publication_key = PublicationModel(
                parent=ndb.Key('AuthorModel', authorID),
                id=slugify(name),
                name=name,
                about=about,
                imageURL=imageURL
            ).put()
            message = 'publication_created'
        else:
            """ update publication """
            publication = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID).get()
            publication.name = name
            publication.about = about
            publication.imageURL = imageURL
            publication_key = publication.put()
            message = 'publication_updated'
        return PublicationResponse(
            info=InfoSchema(success=True, message=message),
            publication=publication_key.get()
        )


    """
    Save Article (create and update)
    """
    saveArticle = graphene.Field(ArticleResponse)
    def resolve_saveArticle(self, *args):
              
        # parameters
        jwt = self.get('jwt')
        authorID = self.get('authorID')
        publicationID = self.get('publicationID')
        articleID = self.get('articleID')
        title = self.get('title')
        prefoldJSON = self.get('prefoldJSON')
        postfoldJSON = self.get('postfoldJSON')

        # authentication
        if not is_owner(jwt, authorID):
            return ArticleResponse(
                info=InfoSchema(success=False, message='unauthorized'),
                article=None
            )
        
        # article creation
        if articleID == 'create-article':
            """ create article """
            publication_key = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID)
            # TODO: check if publication exists (low prio, ui-prevented)
            article_key = ArticleModel(
                parent=publication_key,
                id=slugify(title),
                title=title,
                prefoldJSON=prefoldJSON,
                postfoldJSON=postfoldJSON
            ).put()
            article = article_key.get()
            message = 'article_created'

        # article updating
        else:
            """ update Article """
            article_key = ndb.Key(
                'AuthorModel', authorID,
                'PublicationModel', publicationID,
                'ArticleModel', articleID
            )
            article = article_key.get()
            article.title = title
            article.prefoldJSON = prefoldJSON
            article.postfoldJSON = postfoldJSON
            article.put()
            message = 'article_updated'
        return ArticleResponse(
            info=InfoSchema(success=True, message=message),
            article=article
        )

    """
    Publish Article
    """
    publish_article = graphene.Field(ArticleResponse)
    def resolve_publish_article(self, args, *more):

        # parameters
        jwt = args.get('jwt') or self.get('jwt')
        authorID = args.get('authorID') or self.get('authorID')
        publicationID = self.get('publicationID')
        articleID = self.get('articleID')
        unpublish = self.get('unpublish')

        # authentication
        if not is_owner(jwt, authorID):
            return ArticleResponse(
                info=InfoSchema(success=False, message='unauthorized'),
                article=None
            )

        article = ndb.Key(
            'AuthorModel', authorID,
            'PublicationModel', publicationID,
            'ArticleModel', articleID
        ).get()

        #raise Exception('just to fuck with you')

        article.unpublish() if unpublish else article.publish()

        return ArticleResponse(
            info=InfoSchema(success=True, message='published!'),
            article=article
        )


    
    """ GETTING RESOURCES """

    """
    Get User (leaking information)
    """
    user = graphene.Field(UserSchema, email=graphene.String(), jwt=graphene.String())
    def resolve_user(self, args, context, info):
        user = ndb.Key(
            'UserModel', args.get('email')
        ).get()
        return user

    """
    Get Author
    """
    author = graphene.Field(AuthorSchema, authorID=graphene.String())
    def resolve_author(self, args, context, info):
        authorID = args.get('authorID') or self.get('authorID')
        author = ndb.Key(
            'AuthorModel', authorID
        ).get()
        #raise Exception("just to fuck with you")
        return author

    """
    Get Publication
    """
    publication = graphene.Field(PublicationSchema, authorID=graphene.String(), publicationID=graphene.String())
    def resolve_publication(self, args, context, info):
        authorID=args.get('authorID') or self.get('authorID') 
        publicationID=args.get('publicationID') or self.get('publicationID')
        publication=ndb.Key(
            'AuthorModel',      authorID,
            'PublicationModel', publicationID
        ).get()
        return publication


    """
    Get Article
    """
    article = graphene.Field(ArticleResponse, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String())
    def resolve_article(self, args, context, info):
        """
        Get an article by her IDs
        """
        authorID = args.get('authorID') or self.get('authorID')
        publicationID = args.get('publicationID') or self.get('publicationID')
        articleID = args.get('articleID') or self.get('articleID')

        article = ndb.Key(
            'AuthorModel',      authorID,
            'PublicationModel', publicationID,
            'ArticleModel',     articleID
        ).get()
        if not article:
            return ArticleResponse(
                info=InfoSchema(success=False, message='404'),
                article=None
            )
        else: 
            return ArticleResponse(
                info=InfoSchema(success=True, message='article resolved'),
                article=article
            )

    """
    Post Comment
    """
    post_comment = graphene.Field(lambda: InfoSchema, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String(),
    email=graphene.String(), name=graphene.String(), body=graphene.String()
    )
    def resolve_post_comment(self, args, *more):
        """
        Post a comment to an article
        """
        
        # params
        author_id = self.get('authorID')
        publication_id =  self.get('publicationID')
        article_id =  self.get('articleID')
        
        # get article
        article_key = ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id, 'ArticleModel', article_id)
        
        # save comment (todo: input validation)
        body = self.get('body')
        name = self.get('name')
        email = self.get('email')
        comment = CommentModel(
            email = email,
            name = name,
            body = body,
            article = article_key
        ).put()
        return InfoSchema(success=True, message='comment_posted')

    """
    Get Comments
    """
    load_comments = graphene.List(lambda: CommentSchema, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String())
    def resolve_load_comments(self, args, context, info):
        """
        Get all comments for a given article
        """
        author_id = args.get('authorID')
        publication_id =  args.get('publicationID')
        article_id =  args.get('articleID')
        article_key = ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id, 'ArticleModel', article_id)
        comments = CommentModel.query(CommentModel.article == article_key).order(-CommentModel.created)
        return comments

    """
    Get User Images
    """
    images = graphene.List(lambda: ImageSchema, jwt=graphene.String())
    def resolve_images(self, args, *more):
        """
        Get a user's images from a given JWT
        """
        jwt = args.get('jwt') or args.get('jwt')
        email = email_from_jwt(jwt)
        user_key = ndb.Key('UserModel', email)
        images = ImageModel.query(ImageModel.user_key == user_key).fetch()
        return images




    ### ------ DELETIONS --------- ###

    """ 
    Delete Account
    """
    deleteAccount = graphene.Field(InfoSchema)
    def resolve_deleteAccount(self, *args):
        
        # params
        jwt = self.get('jwt')
        delete_email = self.get('email')
        claimed_email = email_from_jwt(jwt)

        # authentication
        if delete_email != claimed_email:
            return InfoSchema(success=False, message='unauthorized')

        # action: delete account
        ndb.Key('UserModel', claimed_email).delete()
        return InfoSchema(success=True, message='account_deleted')

    """
    Delete Author
    """
    deleteAuthor = graphene.Field(InfoSchema, jwt=graphene.String(), authorID=graphene.String())
    def resolve_deleteAuthor(self, args, *more):
        
        # params
        token = args.get('jwt') or self.get('jwt')
        author_id = args.get('authorID') or self.get('authorID')
        
        # authentication
        if is_owner(token, author_id):
            ndb.Key('AuthorModel', author_id).delete()
            return InfoSchema(success=True, message='author_deleted')
        return InfoSchema(success=False, message='unauthorized')


    """ 
    Delete Publication
    """
    deletePublication = graphene.Field(InfoSchema)
    def resolve_deletePublication(self, *args):
        
        # params
        token = self.get('jwt')
        author_id = self.get('authorID')
        publication_id = self.get('publicationID')
        
        # authentication
        if is_owner(token, author_id):
            ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id).delete()
            return InfoSchema(success=True, message='publication deleted')
        return InfoSchema(success=False, message='unauthorized')


    """ 
    Delete Article
    """
    deleteArticle = graphene.Field(InfoSchema)
    def resolve_deleteArticle(self, *args):
        
        # params
        author_id = self.get('authorID')
        token = self.get('jwt')

        # authentication
        if is_owner(token, author_id):
            ndb.Key(
                'AuthorModel', self.get('authorID'), 
                'PublicationModel', self.get('publicationID'),
                'ArticleModel', self.get('articleID')
                ).delete()
            return InfoSchema(success=True, message='article_deleted')
        return InfoSchema(success=False, message='unauthorized')


    """
    Delete Image
    """
    deleteImage = graphene.Field(InfoSchema)
    def resolve_deleteImage(self, args, *more):
        
        # parameters
        id = args.get('id') or self.get('id')
        jwt = args.get('jwt') or self.get('jwt')
        email = email_from_jwt(jwt)
        user_key = ndb.Key('UserModel', email)

        # authentication (account level)
        image = ndb.Key('ImageModel', id).get()
        if image.user_key.id() != email:
            return InfoSchema(success=False, message='not_authed')

        # action: delete image
        ndb.Key('ImageModel', id).delete()
        return InfoSchema(success=True, message='image_deleted')


    """ ANALYTICS """
    """ 
    Record Event
    """
    record_event = graphene.Field(InfoSchema)
    @timing
    def resolve_record_event(self, args, *more):
        # raise Exception('just to fuck with you')
        # stuff is in self when sent as vars
        name = self.get('name')
        authorID = self.get('authorID')
        publicationID = self.get('publicationID')
        articleID = self.get('articleID')
        # additional
        agent_string = self.get('agent') #!cool
        agent = parse(agent_string)

        # related entities' keys
        authorKey = ndb.Key('AuthorModel', authorID).get().key
        userKey = authorKey.get().user
        publicationKey = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID).get().key
        articleKey = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID, 'ArticleModel', articleID).get().key
        # create and store an event
        event = EventModel(
            name = name,
            user = userKey,
            author = authorKey,
            publication = publicationKey,
            article = articleKey,
            agent = agent_string,
            browser = agent.browser.family,
            browser_version = agent.browser.version_string,
            os = agent.os.family,
            os_version = agent.os.version_string,
            device = agent.device.family,
            brand = agent.device.brand,
            model = agent.device.model,
            is_mobile = agent.is_mobile,
            is_tablet = agent.is_tablet,
            has_touch = agent.is_touch_capable,
            is_pc = agent.is_pc,
            is_bot = agent.is_bot
        ).put()
        return InfoSchema(success=True, message='event_recorded')

    

""" MUTATION """
class ReferenceMutation(graphene.Mutation):
    class Input:
        email = graphene.String()
        password = graphene.String()
    
    def mutate(self, args, context, info):
        # access inputs
        email = args.get('email')
        password = args.get('password')
        # do your thing, and return yourself, with return values
        return ReferenceMutation(
            success=True,
            message="such output!"
            )
    # return values
    success = graphene.Boolean()
    message = graphene.String()

class Mutation(graphene.ObjectType):
    referenceMutation = ReferenceMutation.Field()


""" Glorious Schema """
schema = graphene.Schema(query=Query, mutation=Mutation)


""" GraphQL endpoint """
class GraphQLEndpoint(RequestHandler):
    def get(self):
        """
        Renders the GraphiQL IDE, populated with a query if it exists
        """
        query = self.request.GET.get('query')

        template = ninja.get_template('graphiql.html')
        template_values = {
            'query': query
        }
        # hack for un-quoting double quotes like these "
        output = template.render(template_values).replace('&#34;', '"')
        self.response.write(output)

    @cross_origin
    def post(self):
        """
        Accepts a query, executes it, and returns the result
        """
        data = json.loads(self.request.body)
        query = data.get('query', '')
        variables = data.get('variables')
        result = schema.execute(query, variables)
        error_list = []
        if result.errors:
            for error in result.errors:
                error_list.append(str(error))
        response = {'data' : result.data, 'errors': error_list}
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))



""" IMAGE UPLOAD """

class UploadUrl(RequestHandler):
    """
    Handler for requesting an upload url (which then redirects to IMAGE_UPLOAD_URL)
    """
    def get(self):
        allow_cors(self)
        upload_url = blobstore.create_upload_url(IMAGE_UPLOAD_URL)
        return_json(self, {'url': upload_url })


class ImageUploadHandler(blobstore_handlers.BlobstoreUploadHandler):
    """
    upload image endpoint (only works with post)
    """
    def post(self):
        # works!
        allow_cors(self)
        jwt = self.request.get('jwt')
        email = email_from_jwt(jwt)
        user_key = ndb.Key('UserModel', email)
        try:
            upload = self.get_uploads()[0]
            id = uuid.uuid4().hex + upload.filename
            user_image_key = ImageModel(
                id=id,
                blob_key=upload.key(),
                user_key=user_key
            ).put()
            user_image = user_image_key.get()
            image_info = {'url': user_image.url, 'id': user_image.id }
            return_json(self, image_info)

        except Exception, e:
            print str(e)
            self.error(500)

    def options(self):
        allow_cors(self)



"""
Image Serving
"""

class ServeImage(webapp2.RequestHandler):
    """
    Serves an image of a given key. Can be resized with w and h query parameters,
    and the imag quality can also be set with the q parameter

    Defaults to width 500 with 80% quality
    """
    def get(self):
        
        # params
        blob_key = self.request.get("key")
        resize_w = self.request.get("w")
        resize_h = self.request.get("h")
        quality = int(self.request.get("q", 80))

        print "quality is" + str(quality)

        # get image
        image = images.Image(blob_key=blob_key)

        if not image._width:
            # todo
            # return self.error(404)
            pass
        
        # resize
        if resize_w and resize_h:
            image.resize(width=int(resize_w), height=int(resize_h), crop_to_fit=True) 
        elif resize_w:
            image.resize(width=int(resize_w))
        elif resize_h:
            image.resize(height=int(resize_h))
        else:
            image.resize(width=500)
        
        # generate and serve
        result = image.execute_transforms(output_encoding=images.JPEG, quality=quality)
        self.response.headers['Content-Type'] = 'image/jpeg'
        self.response.headers['Cache-Control'] = 'public, max-age=31536000'
        return self.response.out.write(result)


"""
Let's Encrypt Challenge Handler
"""
class CertificateHandler(webapp2.RequestHandler):
    """ The challenge string to be rendered comes from memcache """
    def get(self, hash):
        response = memcache.get(key="acme-challenge")
        self.response.write(response)
    

"""
App Routing
"""
IMAGE_UPLOAD_URL = '/api/image/upload'
app = webapp2.WSGIApplication(
    [
        # GraphQL (GET for interface, POST for queries)
        ('/api/graphql', GraphQLEndpoint),

        # generates an upload url
        ('/api/image/upload-url', UploadUrl),

        # upload image (the generated url redirects here)
        ('/api/image/upload', ImageUploadHandler),

        # image serving
        ('/api/image/serve', ServeImage),

        # let's Encrypt
        (r'/\.well-known/acme-challenge/(.+)?', CertificateHandler)

    ],
    debug=True
)



""" UTILS """

"""
Hashing
"""
@timing
def hash_password(password):
    # uuid is used to generate a random number
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt

@timing
def verify_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()

@timing
def generate_jwt(email):
    """ 
    Generates a jwt for a given email. The payload contains the email, 
    a comma separated string of author IDs, and an expiration date
    """    
    user_key = ndb.Key('UserModel', email)
    author_ids = AuthorModel.query(AuthorModel.user == user_key).map(lambda author: author.key.id())
    payload = {
        'email': email,
        'authors': ','.join(author_ids),
        'exp': datetime.utcnow() + timedelta(days=JWT_EXP_DELTA_DAYS)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return jwt_token.decode('utf-8')


def send_verification_email(email, token, to_log):
    """
    send a account verification link to a given email, with a given token
    optionally writes the email to log instead of actually sending the email (for development)
    """
    message = mail.EmailMessage(
        sender="auth@public-ink.appspotmail.com",
        subject="public.ink | please confirm your email address")
    message.to = email
    host = FRONTEND_URL
    message.body = """
Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, please follow this link:
{}/verify/{}/{}

Awesome!
    """.format(host, email, token)
    if to_log:
        logging.info('would send the following message to ' + email)
        logging.info(message.body)
    else:
        message.send()


def send_reset_password_email(email, token, to_log):
    """
    send a reset password link to a given email, with a given token  
    """
    message = mail.EmailMessage(
        sender="auth@public-ink.appspotmail.com",
        subject="public.ink | reset password link")
    message.to = email
    host = FRONTEND_URL
    message.body = """
Hello there,

You or somebody else submitted this email address to us. To reset your password for public.ink, please follow this link:
{}/reset/{}/{}

If you did not request a reset link, please disregard this email.

Have a nice day!
    """.format(host, email, token)
    if to_log:
        logging.info('would send the following message to ' + email)
        logging.info(message.body)
    else:
        message.send()


def email_from_jwt(token):
    """
    returns the email encoded in a given jwt
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload.get('email')
    except jwt.ExpiredSignatureError, jwt.DecodeError:
        return None


def is_email_valid(email):
    """
    tells you if in email is valid according to a pretty good regex
    """
    expression = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    matches = re.match(expression, email)
    return True if matches else False


def is_owner(token, author_id):
    """
    checks if an author_id is present in a given jwt
    """
    if not token and author_id:
        return False
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        author_ids = payload.get('authors').split(',')
        return True if author_id in author_ids else False
    except jwt.DecodeError:
        return False



"""
An Example for a Server Side Rendered Page
"""
class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        upload_url = blobstore.create_upload_url(IMAGE_UPLOAD_URL)
        template_values = {
            'upload_url': upload_url,
            'env': ENV_NAME
        }
        template = ninja.get_template('home.html')
        output = template.render(template_values)
        return self.response.write(output)