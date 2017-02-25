import graphene
import webapp2
import hashlib
import jinja2
import json
import uuid
import os
import json
import jwt
import hashlib
import uuid
from datetime import datetime, timedelta
from slugify import slugify
import re
from random import randint


# ink stuff
from shared import RequestHandler, cross_origin, ninja
from secrets.jwt import JWT_SECRET, JWT_EXP_DELTA_SECONDS, JWT_ALGORITHM, JWT_EXP_DELTA_DAYS

# app engine
from google.appengine.api import mail
from google.appengine.ext import ndb









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
    print 'generating token for ' + email 
    payload = {
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=JWT_EXP_DELTA_DAYS)
    }
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    return jwt_token.decode('utf-8')



"""
Models and Schemas
"""

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
MODELS AND THEIR SCHEMAS 
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

    created = graphene.String()
    updated = graphene.String()

    # related
    publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, args, *more):
        print 'resolve publication of author'
        return PublicationModel.query(ancestor=self.key).fetch()

    def resolve_id(self, *args):
        return self.key.id()



""" PUBLICATION """

class PublicationModel(InkModel):
    """ 
    NDB model for publications 
    """
    name = ndb.StringProperty()

class PublicationSchema(graphene.ObjectType):
    """
    The schema for representing a publication
    """
    id = graphene.String()
    articles = graphene.List(lambda: ArticleSchema, order=graphene.String())
    author = graphene.Field(AuthorSchema)
    name = graphene.String()

    def resolve_id(self, *args):
        return self.key.id()
    def resolve_articles(self, *args):
        return ArticleModel.query(ancestor=self.key)
    def resolve_author(self, *args):
        return self.key.parent().get()


""" ARTICLE """

class ArticleModel(InkModel):
    """ Article NDB model """
    title = ndb.StringProperty()
    bodyOps = ndb.TextProperty()

class ArticleSchema(graphene.ObjectType):
    """
    The schema for representing an article.
    """
    title = graphene.String()
    bodyOps = graphene.String()

    id = graphene.String()
    def resolve_id(self, *args):
        return self.key.id()

    # related
    publication = graphene.Field(PublicationSchema)
    def resolve_publication(self, *args):
        return self.key.parent().get()
    author = graphene.Field(AuthorSchema)
    def resolve_author(self, *args):
        return self.key.parent().parent().get()


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


    """ Now getting real """
    epLogin = graphene.Field(AccountResponse)
    def resolve_epLogin(self, *args):
        print 'epLogin root'
        email = self.get('email')
        password = self.get('password')
        user = ndb.Key('UserModel', email).get()

        if not user:
            return AccountResponse(info=InfoSchema(success=False, message='account_not_found'))
        
        matches = verify_password(user.password_hash_sha256, password)
        if not matches:
            return AccountResponse(info=InfoSchema(success=False, message='password_mismatch'))

        # create account and return AccountResponse
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


    """ CREATE AUTHOR => should become save (create and update) """
    createAuthor = graphene.Field(AuthorSchema)
    def resolve_createAuthor(self, args, *more):
        print "resolve create author"
        name = self.get('name')
        about = self.get('about')
        imageURL = self.get('imageURL')
        token = self.get('jwt')
        email = email_from_jwt(token)
        user_key = ndb.Key('UserModel', email)
        # create author!
        author_key = AuthorModel(
            id=slugify(name),
            name=name,
            about=about,
            imageURL=imageURL,
            user=user_key
        ).put()
        # return the author, plain and simple
        author = author_key.get()
        return author

    """ SAVE PUBLICATION (create and update) -> change to publication response! """
    savePublication = graphene.Field(PublicationSchema, 
        jwt=graphene.String(), 
        publicationID=graphene.String(),
        authorID=graphene.String(), 
        name=graphene.String()
        )
    def resolve_savePublication(self, args, context, info):
        publicationID = self.get('publicationID')
        name = self.get('name')
        authorID = self.get('authorID')
        
        if publicationID == 'create-publication': #not ideal
            """ create publication """
            publication_key = PublicationModel(
                parent=ndb.Key('AuthorModel', authorID),
                id=slugify(name),
                name=name
            ).put()
        else:
            """ update publication """
            publication = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID).get()
            publication.name = self.get('name') 
            publication_key = publication.put()
        return publication_key.get()


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
        authorID = args.get('authorID')
        author = ndb.Key(
            'AuthorModel', args.get('authorID')
        ).get()
        return author

    publication = graphene.Field(PublicationSchema, authorID=graphene.String(), publicationID=graphene.String())
    def resolve_publication(self, args, context, info):
        print 'resolve publication'
        authorID = args.get('authorID') or self.get('authorID') 
        publicationID =  args.get('publicationID') or self.get('publicationID')
        publication = ndb.Key(
            'AuthorModel',      authorID, 
            'PublicationModel', publicationID
        ).get()
        return publication

    article = graphene.Field(ArticleSchema, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String())
    def resolve_article(self, args, context, info):
        print 'resolve article / zero'
        authorID = args.get('authorID') or self.get('authorID')
        publicationID =  args.get('publicationID') or self.get('publicationID')
        articleID =  args.get('articleID') or self.get('articleID')
        
        article = ndb.Key(
            'AuthorModel',      authorID, 
            'PublicationModel', publicationID,
            'ArticleModel',     articleID       
        ).get()
        return article


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
        ndb.Key('AuthorModel', args.get('authorID')).delete()
        return InfoSchema(success=True, message='author_deleted')

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

    

""" MUTATION """
""" OUTDATED """
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
        print 'executing schema with variables'
        print variables
        print query
        result = schema.execute(query, variables)
        error_list = []
        for error in result.errors:
            error_list.append(str(error))
        response = {'data' : result.data, 'errors': error_list}
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))


class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        
        # create user
        user = UserModel(id="hoff@hoff.com", email="hoff@hoff.com")
        user_key = user.put()
        author = AuthorModel(id="hoff", user=user_key, name='hoff')
        author_key = author.put()
        
        template_values = {
        }
        template = ninja.get_template('home.html')
        output = template.render(template_values)
        return self.response.write(output)

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
        ('/graphql', GraphQLEndpoint)
    ], debug=True
)



""" UTILS (move)"""
def send_verification_email(email, token):
    message = mail.EmailMessage(
        sender="auth@public-ink.appspotmail.com",
        subject="Public.Ink Verification")

    message.to = email
    host = 'http://localhost:4200'
    message.body = """Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, let follow this link:
{}/verify/{}/{}

Awesome!
    """.format(host, email, token)
    #message.send()
    print 'sending message to ' + email
    print message.body


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
    if matches:
        print "email is valid"
    else:
        print "email NOT VALID"
    return True if matches else False
