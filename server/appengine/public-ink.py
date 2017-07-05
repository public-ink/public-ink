import logging
import graphene
import webapp2
import hashlib
import jinja2
import json
import uuid
import os
import jwt
import hashlib
import uuid
from datetime import datetime, timedelta
from slugify import slugify
import re
from random import randint
from google.appengine.ext import blobstore
import urllib
from google.appengine.api import memcache

# image
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.api import images

# ink stuff
from shared import dt_to_epoch, RequestHandler, cross_origin, ninja, allow_cors, return_json, ENV_NAME, FRONTEND_URL, BACKEND_URL
from secrets import JWT_SECRET, JWT_EXP_DELTA_SECONDS, JWT_ALGORITHM, JWT_EXP_DELTA_DAYS

# app engine
from google.appengine.api import mail
from google.appengine.ext import ndb
from google.appengine.api import search


_INDEX_NAME = 'SONG_INDEX'

"""
Hashing
"""
def hash_password(password):
    # uuid is used to generate a random number
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt


def verify_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()


def generate_jwt(email):
    print 'generating token for  ' + email 
    payload = {
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=JWT_EXP_DELTA_DAYS)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return jwt_token.decode('utf-8')



"""
Models and Schemas
"""

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

    

class InfoSchema(graphene.ObjectType):
    """
    container for part of ANY response
    """
    success = graphene.Boolean()
    message = graphene.String()

class AccountSchema(graphene.ObjectType):
    """
    container for account part of ANY response
    """
    email = graphene.String()
    verified = graphene.Boolean()
    authenticated = graphene.Boolean()
    jwt = graphene.String()

    # related: authors!
    authors = graphene.List(lambda: AuthorSchema)
    def resolve_authors(self, *args):
        # query authors that are pointing to this user
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



""" AUTHOR """

class AuthorModel(InkModel):
    user = ndb.KeyProperty(kind=UserModel, required=True)
    name = ndb.StringProperty(required=True)
    about = ndb.StringProperty()
    imageURL = ndb.StringProperty()

class AuthorSchema(graphene.ObjectType):
    """
    The schema for representing an author
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
    def resolve_publications(self, args, *more):
        return PublicationModel.query(ancestor=self.key).order(PublicationModel.position)

    def resolve_id(self, *args):
        return self.key.id()



""" PUBLICATION """

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
    The schema for representing a publication
    """
    id = graphene.String()
    articles = graphene.List(lambda: ArticleSchema, include_drafts=graphene.Boolean())
    author = graphene.Field(AuthorSchema)
    name = graphene.String()
    about = graphene.String()
    imageURL = graphene.String()

    def resolve_id(self, *args):
        return self.key.id()
    def resolve_articles(self, args, *more):
        if args.get('include_drafts'):
            return ArticleModel.query(ancestor=self.key).order(ArticleModel.position)
        else:
            #return ArticleModel.query(ArticleModel.published_at != None, ancestor=self.key).order(ArticleModel.position)
            # filter non-published yourself. todo
            articles = ArticleModel.query(ancestor=self.key).order(ArticleModel.position).fetch()
            published_articles = filter((lambda article: article.published_at is not None), articles)
            return published_articles
    def resolve_author(self, *args):
        return self.key.parent().get()


""" ARTICLE """

class ArticleModel(InkModel):
    """ Article NDB model """
    title = ndb.StringProperty()
    bodyOps = ndb.TextProperty()
    published_at = ndb.DateTimeProperty()
    position = ndb.IntegerProperty()

    def publish(self):
        self.published_at = datetime.now()
        self.put()

    def unpublish(self):
        self.published_at = None
        self.put()

class ArticleSchema(graphene.ObjectType):
    """
    The schema for representing an article.
    """
    title = graphene.String()
    bodyOps = graphene.String()
    published_at = graphene.Float()

    id = graphene.String()
    def resolve_id(self, *args):
        return self.key.id()

    def resolve_published_at(self, *args):
        return dt_to_epoch(self.published_at)

    # related: parent publication
    publication = graphene.Field(PublicationSchema)
    def resolve_publication(self, *args):
        return self.key.parent().get()

    # related: parent publication's author
    author = graphene.Field(AuthorSchema)
    def resolve_author(self, *args):
        return self.key.parent().parent().get()


""" Song """
class SongModel(InkModel):
    """ A midi song in json format """
    path = ndb.StringProperty()
    title = ndb.StringProperty()
    artist = ndb.StringProperty()
    bpm = ndb.IntegerProperty()
    ppq = ndb.IntegerProperty()
    tags = ndb.StringProperty(repeated=True)
    time_signature = ndb.IntegerProperty(repeated=True)
    track_count = ndb.IntegerProperty()
    tracks_string = ndb.TextProperty()
    # tracks = ndb.JsonProperty(repeated=True)
    indexed = ndb.BooleanProperty(default=False)    

    """
    index yourself so you can be found! (by title only currently)
    """
    def index(self):
        title_tokens = ','.join(tokenize_autocomplete(self.title))
        document = search.Document(
            doc_id=self.key.urlsafe(),
            fields=[
                search.TextField(name='title', value=title_tokens),
                search.TextField(name='verbose', value=self.title)
                ])
        search.Index(name=_INDEX_NAME).put(document)

"""

        doc = search.Document(
            
            fields=[
                search.TextField(name='title', value=self.title) #,
                #search.TextField(name='comment', value=content),
                #search.DateField(name='date', value=datetime.now().date())
            ])
        
"""


class SongSchema(graphene.ObjectType):
    """
    the schema for a song
    """
    path = graphene.String()
    title = graphene.String()
    tracks_string = graphene.String()
    title = graphene.String()
    artist = graphene.String()
    bpm = graphene.Int()
    #ppq = graphene.Int()
    track_count = graphene.Int()

class SongSearchSchema(graphene.ObjectType):
    """
    the shema for a song search result
    """
    title = graphene.String()
    key_id = graphene.String()



"""
Playground - remove at some point
"""

class Hoff(graphene.ObjectType):
    name = graphene.String()
    age = graphene.Int()

class Beer(graphene.ObjectType):
    brand = graphene.String()
    volume = graphene.Int()

class Evening(graphene.ObjectType):
    hoff = graphene.Field(Hoff)
    beer = graphene.Field(Beer)


"""  #####################  THE BIG FAT QUERY  #########################  """

class Query(graphene.ObjectType):
    """
    Tutorial
    """
    randomNumber = graphene.Int()
    def resolve_randomNumber(self, *args):
        return randint(0,100)

    """
    These Fields (or enpoints) can accept arguments. These inputs are also visible to GraphiQL
    Let's make an echo field that returns what we received
    """
    echo = graphene.Int(input = graphene.Int())
    def resolve_echo(self, args, context, info):
        return args.get('input')

    """
    So far, we've only been returning Primitives. How about returning an object?
    If, let's define a Schema for it, Hoff, with name and age.
    Inputs still work the same way, so here we pass age through.
    """
    hoff = graphene.Field(Hoff, age = graphene.Int())
    def resolve_hoff(self, args, *more):
        return Hoff(name='hoff', age=args.get('age'))

    """
    so to return an object with say, 2 'baskets', we simply define such and object
    Evening container Hoff and Beer
    """
    evening = graphene.Field(Evening)
    def resolve_evening(self, args, *more):
        hoff = Hoff(name='hoff', age=36)
        beer = Beer(brand='jever', volume=5)
        return Evening(hoff=hoff, beer=beer)

    """ end of documentation """


    """ Email / Password Login """
    epLogin = graphene.Field(AccountResponse)
    def resolve_epLogin(self, *args):
        #logging.debug('emailPasswordLogin')
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
    jwtLogin = graphene.Field(AccountResponse, jwt=graphene.String())
    def resolve_jwtLogin(self, args, *more):
        """
        Checks the JWT and returns an AccountResponse
        """
        token = args.get('jwt')
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
    Verfiy email (by following verification link in email)
    """
    verifyEmail = graphene.Field(AccountResponse, email=graphene.String(), token=graphene.String())
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

    

    """ CREATE ACCOUNT """
    createAccount = graphene.Field(AccountResponse, email=graphene.String(), password=graphene.String())
    def resolve_createAccount(self, args, *more):
        """
        creates a user with the given email address, provided it does not exist yet
        returns auth related information
        """

        """ email validation check """
        email = args.get('email') or self.get('email')
        if not is_email_valid(email):
            return AccountResponse(info=InfoSchema(success=False, message='email_invalid'))

        """ duplicate email check """
        user = ndb.Key('UserModel', email).get()
        if user:
            return AccountResponse(info=InfoSchema(success=False, message='email_exists'))

        """ Create an Account"""
        password = args.get('password') or self.get('password')
        password_hash = hash_password(password)
        verification_token = uuid.uuid4().hex
        user_key = UserModel(
            id=email,
            email=email,
            verification_token=verification_token,
            password_hash_sha256=password_hash
            ).put()
        send_verification_email(email, verification_token)

        """ return account response """
        return AccountResponse(
            info=InfoSchema(success=True, message="registration_successful"),
            account=AccountSchema(
                email=email, verified=False,
                authenticated=True, jwt=generate_jwt(email))
        )

    """ REQUEST PASSWORD RESET LINK """
    requestResetPasswordLink = graphene.Field(InfoSchema, email=graphene.String())
    def resolve_requestResetPasswordLink(self, args, *more):
        email = args.get('email') or self.get('email')
        user = ndb.Key('UserModel', email).get()
        if user:
            reset_password_token = uuid.uuid4().hex
            user.reset_password_token = reset_password_token
            user.put()
            send_reset_password_email(email, reset_password_token)
        return InfoSchema(success=True, message='reset_link_sent')


    """ ACTUALLY RESET THE PASSWORD """
    resetPassword = graphene.Field(InfoSchema, email=graphene.String(), token=graphene.String(), password=graphene.String())
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


    """ SAVE AUTHOR (CREATE AND UPDATE) """
    saveAuthor = graphene.Field(AuthorResponse)
    def resolve_saveAuthor(self, args, *more):
        authorID = self.get('authorID')
        print 'resolve saveAuthor'
        name = self.get('name')
        about = self.get('about')
        imageURL = self.get('imageURL')
        token = self.get('jwt')
        email = email_from_jwt(token)
        user_key = ndb.Key('UserModel', email)

        if authorID == 'create-author': # not cool
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
            author_key = ndb.Key('AuthorModel', authorID)
            # compare emails!
            # then
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
    SAVE ORDER
    """
    save_author_order = graphene.Field(InfoSchema, author_data=graphene.String())
    def resolve_save_author_order(self, args, context, info):
        # do your thing
        print 'resolve save author order'
        author_data = json.loads(self.get('authorData'))
        author_id = author_data['authorID']
        publications = author_data['publications']
        publication_position = 0
        for pub in publications:
            print pub['publicationID']
            publication_id = pub['publicationID']
            # retrieve publication and update
            publication = ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id).get()
            publication.position = publication_position
            publication.put()
            publication_position += 1
            article_position = 0
            for article_id in pub['articles']:
                # retrieve and update article
                print '-' + article_id
                article = ndb.Key('AuthorModel', author_id, 'PublicationModel', publication_id, 'ArticleModel', article_id).get()
                article.position = article_position
                article.put()
                article_position += 1
        return InfoSchema(success=True, message='order_saved')


    """ SAVE PUBLICATION (create and update)  """
    savePublication = graphene.Field(PublicationResponse,
        jwt=graphene.String(), 
        publicationID=graphene.String(),
        authorID=graphene.String(), 
        name=graphene.String()
    )
    def resolve_savePublication(self, args, context, info):
        publicationID = self.get('publicationID')
        name = self.get('name')
        authorID = self.get('authorID')
        about = self.get('about')
        imageURL = self.get('imageURL')

        if publicationID == 'create-publication': #not ideal
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


    """ SAVE ARTICLE (create and update) """
    saveArticle = graphene.Field(ArticleResponse)
    def resolve_saveArticle(self, *args):

        authorID = self.get('authorID')
        publicationID = self.get('publicationID')
        articleID = self.get('articleID')
        title = self.get('title')

        if articleID == 'create-article':
            """ create article """
            publication_key = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID)
            # TODO: check if publication exists
            article_key = ArticleModel(
                parent=publication_key,
                id=slugify(title),
                title=title,
                bodyOps=self.get('bodyOps')
            ).put()
            article = article_key.get()
            message = 'article_created'
        else:
            """ update Article """
            article_key = ndb.Key(
                'AuthorModel', authorID,
                'PublicationModel', publicationID,
                'ArticleModel', articleID
            )
            article = article_key.get()
            article.title = title
            article.bodyOps = self.get('bodyOps')
            article.put()
            message = 'article_updated'
        return ArticleResponse(
            info=InfoSchema(success=True, message=message),
            article=article
        )

    """ PUBLISH ARTICLE """
    publish_article = graphene.Field(ArticleResponse)
    def resolve_publish_article(self, args, *more):
        authorID = args.get('authorID') or self.get('authorID')
        publicationID = self.get('publicationID')
        articleID = self.get('articleID')

        unpublish = self.get('unpublish')

        article_key = ndb.Key(
            'AuthorModel', authorID,
            'PublicationModel', publicationID,
            'ArticleModel', articleID
        )
        article = article_key.get()
        if unpublish:
            article.unpublish()
        else:
            article.publish()
        return ArticleResponse(
            info=InfoSchema(success=True, message='published!'),
            article=article
        )


    """
    DATA RETRIEVAL / RESOURCES
    """
    user = graphene.Field(UserSchema, email=graphene.String(), jwt=graphene.String())
    def resolve_user(self, args, context, info):
        print 'resolve user'
        user = ndb.Key(
            'UserModel', args.get('email')
        ).get()
        return user

    author = graphene.Field(AuthorSchema, authorID=graphene.String())
    def resolve_author(self, args, context, info):
        print 'resolve author / zero'
        authorID = args.get('authorID') or self.get('authorID')
        author = ndb.Key(
            'AuthorModel', authorID
        ).get()
        return author

    publication = graphene.Field(PublicationSchema, authorID=graphene.String(), publicationID=graphene.String())
    def resolve_publication(self, args, context, info):
        print 'resolve publication'
        authorID=args.get('authorID') or self.get('authorID') 
        publicationID=args.get('publicationID') or self.get('publicationID')
        publication=ndb.Key(
            'AuthorModel',      authorID,
            'PublicationModel', publicationID
        ).get()
        return publication

    article = graphene.Field(ArticleSchema, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String())
    def resolve_article(self, args, context, info):
        print 'resolve article / zero'
        authorID=args.get('authorID') or self.get('authorID')
        publicationID=args.get('publicationID') or self.get('publicationID')
        articleID=args.get('articleID') or self.get('articleID')

        article = ndb.Key(
            'AuthorModel', authorID,
            'PublicationModel', publicationID,
            'ArticleModel', articleID
        ).get()
        return article

    """ Images """
    images = graphene.List(lambda: ImageSchema, jwt=graphene.String())
    def resolve_images(self, args, *more):
        print 'resolve images'
        jwt = args.get('jwt') or args.get('jwt')
        email = email_from_jwt(jwt)
        user_key = ndb.Key('UserModel', email)
        images = ImageModel.query(ImageModel.user_key == user_key).fetch()
        return images



    """ Songs """
    song = graphene.Field(lambda: SongSchema, id=graphene.String())
    def resolve_song(self, args, *more):

        id = args.get('id') or args.get('id')
        print 'got an id' + id

        song_key = ndb.Key(urlsafe=id)
        song = song_key.get()
        return song


    """
    Song Search
    """

    song_search = graphene.List(lambda: SongSearchSchema, q=graphene.String())
    def resolve_song_search(self, args, *more):

        songs = SongModel.query().fetch(20)
        for song in songs:
            song.index()
            pass

        q = args.get('q') or args.get('q')
        print 'got a search query!!' + q
        # perform search
        expr_list = [search.SortExpression(
            expression='title', default_value='',
            direction=search.SortExpression.DESCENDING)]
        # construct the sort options
        sort_opts = search.SortOptions(
            expressions=expr_list)
        query_options = search.QueryOptions(
            limit=3,
            sort_options=sort_opts)
        query_obj = search.Query(query_string=q, options=query_options)
        results = search.Index(name=_INDEX_NAME).search(query=query_obj)

        # pull out info from results
        to_return = []
        for result in results:
            verbose = 'not yet'
            for field in result.fields:
                if field.name == 'verbose':
                    verbose = field.value
            to_return.append(
                SongSearchSchema(
                    title=verbose,
                    key_id=result.doc_id
                )
            )
        return to_return


    """
    DELETIONS
    """

    """ delete account"""
    deleteAccount = graphene.Field(InfoSchema)
    def resolve_deleteAccount(self, *args):
        jwt = self.get('jwt')
        email = self.get('email')
        # verifiy token, compare emails
        UserModel.query(UserModel.email == email).delete()
        return InfoSchema(success=True, message='account_deleted')

    """ delete author"""
    deleteAuthor = graphene.Field(InfoSchema, jwt=graphene.String(), authorID=graphene.String())
    def resolve_deleteAuthor(self, args, *more):

        """ validate request! """
        token = args.get('jwt') or self.get('jwt')
        author_id = args.get('authorID') or self.get('authorID')

        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        claim_email = payload.get('email')
        user_key = ndb.Key('UserModel', claim_email)
        user = user_key.get()

        author = ndb.Key('AuthorModel', author_id).get()
        # improve this, rename to key, make a @property
        author_user = author.user.get()
        if author_user.email == claim_email:
            print "yes, you can delete this author"
            ndb.Key('AuthorModel', args.get('authorID')).delete()
            return InfoSchema(success=True, message='author_deleted (not really')
        else:
            print "you don't have permission to delete this author"
            return InfoSchema(success=False, message='unauthorized')

    """ delete publication """
    deletePublication = graphene.Field(InfoSchema)
    def resolve_deletePublication(self, *args):
        ndb.Key('AuthorModel', self.get('authorID'), 'PublicationModel', self.get('publicationID')).delete()
        return InfoSchema(success=True, message='publication_deleted')

    """ delete article, delete TODOs """
    deleteArticle = graphene.Field(InfoSchema)
    def resolve_deleteArticle(self, *args):
        """ TODO: check ownership, get jwt """
        ndb.Key(
            'AuthorModel', self.get('authorID'), 
            'PublicationModel', self.get('publicationID'),
            'ArticleModel', self.get('articleID')
            ).delete()
        return InfoSchema(success=True, message='article_deleted')

    deleteImage = graphene.Field(InfoSchema, id=graphene.String())
    def resolve_deleteImage(self, args, *more):
        """ todo: check ownership """
        id = args.get('id') or self.get('id')
        ndb.Key('ImageModel', id).delete()
        return InfoSchema(success=True, message='image_deleted')


    

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
        #logging.debug(variables)
        #loggin.debug(query)
        result = schema.execute(query, variables)
        error_list = []
        for error in result.errors:
            error_list.append(str(error))
        response = {'data' : result.data, 'errors': error_list}
        """ Test Cookies! (not showing up) """
        print 'cookie ' * 5
        self.response.set_cookie('jwt', 'myjwt', max_age=360, path='/',
            domain='localhost:4200', secure=True, httponly=True)
        self.response.set_cookie('jwt', 'myjwt', max_age=360, path='/',
            domain=None, secure=False, httponly=False)
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))


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



""" classic multi-part form upload for images """
class UploadUrl(RequestHandler):
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
        print 'Image Upload Handler here!'
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
    def get(self):
        blob_key = self.request.get("key")
        image = images.Image(blob_key=blob_key)

        transforms = False

        # allows user defined crops!
        crop = self.request.get("crop")
        if crop:
            box = map(float, crop.split(','))
            image.crop(box[0],box[1],box[2],box[3])
            transforms = True

        crop_h = self.request.get("crop_h")
        if crop_h:
            percent = float(crop_h) / 100.0
            left = (1 - percent )/ 2
            right = 1 - left
            image.crop(left, 0.0, right, 1.0)
        # resize (width=0, height=0, crop_to_fit=False, crop_offset_x=0.5, crop_offset_y=0.5, allow_stretch=False)
        resize_w = self.request.get("w")
        resize_h = self.request.get("h")
        #fit = bool(self.request.get("fit", False))
        if resize_w and resize_h:
            image.resize(width=int(resize_w), height=int(resize_h), crop_to_fit=True) 
            transforms = True
        elif resize_w:
            image.resize(width=int(resize_w))
            transforms = True
        elif resize_h:
            image.resize(height=int(resize_h))
            transforms = True

        if transforms:
            result = image.execute_transforms(output_encoding=images.JPEG)
        else:
            # this is a hack...
            # server a maximum size instead
            image.im_feeling_lucky()
            result = image.execute_transforms(output_encoding=images.JPEG)
        self.response.headers['Content-Type'] = 'image/jpeg'
        self.response.headers['Cache-Control'] = 'public, max-age=31536000'
        self.response.out.write(result)
        return



class CertificateHandler(webapp2.RequestHandler):
    """ The challenge string to be rendered comes from memcache """
    def get(self, hash):
        response = memcache.get(key="acme-challenge")
        self.response.write(response)
    
IMAGE_UPLOAD_URL = '/api/image/upload'


class MIDIUploadHandler(RequestHandler):
    """
    accepts a JSON midi object and stores it 
    """
    def get(self, data):
        dataString = urllib.unquote(data)#.decode('utf8') 
        midi = json.loads(dataString)
        print midi
        header = midi['header']
        ppq = header['PPQ']
        bpm = header['bpm']
        time_signature = header['timeSignature']
        # create a song
        song = SongModel(
            path = midi['path'],
            title = midi['path'].split('/')[-1].replace('.mid','').replace('_',' ').title(),
            bpm = int(bpm),
            ppq = int(ppq),
            track_count = len(midi['tracks']),
            time_signature = time_signature,
            tags = midi['path'].replace('/Users/martin.micklinghoff/Downloads/50000_MIDI_FILES/', '').split('/')[0: -1],
            tracks_string = json.dumps(midi['tracks'])
        )
        song.put()
        self.response.write('cool')

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
        
        # midi upload
        (r'/api/midi-upload/(.+)?', MIDIUploadHandler),

        #('/graphql', GraphQLEndpoint),
        ('/api/graphql', GraphQLEndpoint),
        # images
        # upload url
        ('/api/image/upload-url', UploadUrl),
        # this is where things are posted to, because get upload url specified this url
        ('/api/image/upload', ImageUploadHandler),
        ('/api/image/serve', ServeImage),
        # for let's encrypt:
        (r'/\.well-known/acme-challenge/(.+)?', CertificateHandler)
    ], debug=True
)

""" Search Index """

def tokenize_autocomplete(phrase):
    a = []
    for word in phrase.split():
        j = 1
        while True:
            for i in range(len(word) - j + 1):
                a.append(word[i:i + j])
            if j == len(word):
                break
            j += 1
    return a

""" UTILS (move)"""
def send_verification_email(email, token):
    message = mail.EmailMessage(
        sender="auth@public-ink.appspotmail.com",
        subject="Public.Ink Acount Verification")

    message.to = email
    host = FRONTEND_URL
    message.body = """
Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, please follow this link:
{}/verify/{}/{}

Awesome!
    """.format(host, email, token)
    #print 'sending message to ' + email
    #print message.body
    message.send()

def send_reset_password_email(email, token):
    message = mail.EmailMessage(
        sender="auth@public-ink.appspotmail.com",
        subject="Public.Ink Reset Password Link")

    message.to = email
    host = FRONTEND_URL
    message.body = """
Hello there,

You or somebody else submitted this email address to us. To reset your password for public.ink, please follow this link:
{}/reset/{}/{}

If you did not request a reset link, please disregard this email.

Have a nice day!
    """.format(host, email, token)
    print 'sending message to ' + email
    print message.body
    message.send()


def email_from_jwt(token):
    """
    returns the email encoded in our jwt
    """
    payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    email = payload.get('email')
    return email

def is_email_valid(email):
    expression = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    matches = re.match(expression, email)
    return True if matches else False
