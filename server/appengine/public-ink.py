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





class InkModel(ndb.Model):
    """
    A common NDB entity model
    """
    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now=True)



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

class AccountResponse(graphene.ObjectType):
    """
    happens to return both of the above :) - name is not so good maybe
    """
    info = graphene.Field(InfoSchema)
    account = graphene.Field(AccountSchema)




""" USER """

class UserModel(InkModel):
    email = ndb.StringProperty(required=True)
    email_verified_at = ndb.DateTimeProperty()
    verification_token = ndb.StringProperty()
    password_hash_sha256 = ndb.StringProperty()

    @property
    def is_verified(self):
        return True if self.email_verified_at else False

    

class UserSchema(graphene.ObjectType):
    """
    The User Schema: email, verified, activated
    to add: list of authors...
    """
    email = graphene.String()

    # any of this in use?

    verified = graphene.Boolean()
    def resolve_verified(self, args, context, info):
        return self.is_verified

    
    authenticated = graphene.Boolean(email=graphene.String(), token=graphene.String())
    def resolve_authenticated(self, args, context, info):
        print 'resolve authenticated'
        print args
        email = args.get('email')
        token = args.get('token')
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if claim_email == payload.get('email'):
            return True if email == claim_email else False
        
    jwt = graphene.String()
    def resolve_jwt(self, args, context, info):
        return 'abc'



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



"""
PUBLICATION 
"""
class PublicationModel(InkModel):
    name = ndb.StringProperty()

class PublicationSchema(graphene.ObjectType):
    """
    The schema for representing a publication
    """
    id = graphene.String()
    def resolve_id(self, *args):
        return self.key.id()
    name = graphene.String()
    articles = graphene.List(lambda: ArticleSchema, order=graphene.String())
    def resolve_articles(self, *args):
        return ArticleModel.query(ancestor=self.key)
    author = graphene.Field(AuthorSchema)
    def resolve_author(self, *args):
        return self.key.parent().get()


""" 
ARTICLE
"""
class ArticleModel(InkModel):
    title = ndb.StringProperty()

class ArticleSchema(graphene.ObjectType):
    """
    The schema for representing an author.
    """
    id = graphene.String()
    def resolve_id(self, *args):
        return self.key.id()
    title = graphene.String()
    # related
    publication = graphene.Field(PublicationSchema)
    def resolve_publication(self, *args):
        return self.parent().get()
    author = graphene.Field(AuthorSchema)
    def resolve_author():
        return self.parent().parent().get()


class Hoff(graphene.ObjectType):
    name = graphene.String()
    age = graphene.Int()

class Beer(graphene.ObjectType):
    brand = graphene.String()
    volume = graphene.Int()

class Evening(graphene.ObjectType):
    hoff = graphene.Field(Hoff)
    beer = graphene.Field(Beer)


"""
##############  THE BIG FAT QUERY  ############################
"""
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


    """ Now getting real """
    epLogin = graphene.Field(AccountResponse)
    def resolve_epLogin(self, *args):
        print 'epLogin root'
        email = self.get('email')
        password = self.get('password')
        user = ndb.Key('UserModel', email).get()

        if not user:
            info = InfoSchema(
                success=False,
                message='account_not_found'
            )
            return AccountResponse(
                info=info
            )
        
        matches = verify_password(user.password_hash_sha256, password)
        if not matches:
            info = InfoSchema(
                success=False,
                message='password_incorrect'
            )
            return AccountResponse(
                info=info
            )

        # Proper big response
        account = AccountSchema(
            email=email,
            verified=user.is_verified,
            authenticated=True,
            jwt=generate_jwt(email)
        )
        info = InfoSchema(
            success=True,
            message='login_success'
        )
        return AccountResponse(
            account=account,
            info=info
        )

    """
    Query all the things!
    """
    """ TEST """
    test = graphene.Int()
    def resolve_test(*args):
        return randint(0,100)

    #accountTest = graphene.Field(AccountSnippet)
    accountTest = graphene.Boolean()
    def resolve_accountTest(self, *args):
        print 'resolve acount test'
        return AccountSnippet(
            email='jo',
            verified=True,
            authenticated=True
        )

    """ AUTH: JWT LOGIN"""
    jwtLogin = graphene.Field(AccountResponse, jwt=graphene.String())
    def resolve_jwtLogin(self, args, *more):
        """
        Checks the JWT and returns an Auth Object, if successful
        """
        token = args.get('jwt')
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            email = payload.get('email')
            user_key = ndb.Key('UserModel', email)
            user = user_key.get()

            if not user:
                return AccountResponse(info=InfoSchema(success=False, message='account not found'))

            return AccountResponse(
                info=InfoSchema(success=True, message="token login successful"),
                account=AccountSchema(
                    email=email, verified=user.is_verified, 
                    authenticated=True, jwt=generate_jwt(email))
                )
            
        except jwt.ExpiredSignatureError, e:
            return AccountResponse(info=InfoSchema(success=False, message='token expired'))
        except jwt.DecodeError, e:
            return AccountResponse(info=InfoSchema(success=False, message='token invalid'))




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

    """ AUTHOR !!! """

    createAuthor = graphene.Field(
        AuthorSchema
        )
    def resolve_createAuthor(self, args, *more):
        print "resolve create author"
        name = args.get('name')
        about = args.get('about')
        imageURL = args.get('imageURL')
        # more args!
        token = args.get('jwt')
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
        # outdated!! -> but good learning
        """
        we can either return just a db instance, or a custom schema!
        """
        # this might not include the just-created author.
        authors = AuthorModel.query(AuthorModel.user == user_key).fetch()
        if author not in authors:
            authors.append(author.get())
        return AuthorSchema(
            
        )

    """ delete author"""
    deleteAuthor = graphene.Boolean(jwt=graphene.String(), authorID=graphene.String())
    def resolve_deleteAuthor(self, args, *more):
        ndb.Key('AuthorModel', args.get('authorID')).delete()
        return True


    """ PUBLICATION !!! """

    createPublication = graphene.Field(PublicationSchema, 
        jwt=graphene.String(), 
        authorID=graphene.String(), 
        name=graphene.String()
        )
    def resolve_createPublication(self, args, *more):
        authorID = args.get('authorID')
        name = args.get('name')
        publication = PublicationModel(
            parent=ndb.Key('AuthorModel', authorID),
            id=slugify(name),
            name=name
        ).put()
        return publication.get()

    """ save publication (existing or new!) """
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
        
        if publicationID == 'create-publication':
            """ create publication """
            publication_key = PublicationModel(
                parent=ndb.Key('AuthorModel', authorID),
                id=slugify(name),
                name=name
            ).put()
        else:
            """ update publication """
            publication = ndb.Key('AuthorModel', authorID, 'PublicationModel', publicationID).get()
            publication.name = args.get('name')
            publicion_key = publication.put()
        return publication_key.get()

    
        
    """ DATA RETRIEVAL """
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
        print 'resolve publication / zero'
        print 'self:'
        print self
        print 'args:'
        print args
        authorID = self.get('authorID') or self.args.get('authorID')
        publicationID = self.get('publicationID') or self.args.get('publicationID')
        publication = ndb.Key(
            'AuthorModel',      authorID, 
            'PublicationModel', publicationID
        ).get()
        return publication


    article = graphene.Field(ArticleSchema, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String())
    def resolve_article(self, args, context, info):
        print 'resolve article / zero'
        publication = ndb.Key(
            'AuthorModel',      args.get('authorID'), 
            'PublicationModel', args.get('publicationID'),
            'ArticleModel',     args.get('articleID')
        ).get()
        return publication

    

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
        response = {'data' : result.data, 'errors': result.errors}
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
