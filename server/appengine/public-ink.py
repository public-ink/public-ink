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

class AuthSchema(graphene.ObjectType):
    """
    A standalone schema, without backing db model
    """
    authenticated = graphene.Boolean()
    verified = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()
    message = graphene.String()
    authors = graphene.List(lambda: AuthorSchema)


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

class AuthorSchema(graphene.ObjectType):
    """
    The schema for representing an author
    """
    user = graphene.Field(UserSchema)
    name = graphene.String()

    # related
    publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, args, *more):
        print 'resolve publication of author'
        return PublicationModel.query(ancestor=self.key).fetch()



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
        return ArticleModel.query(ancestor = self.key)


""" 
ARTICLE
"""
class ArticleModel(InkModel):
    title = ndb.StringProperty()

class ArticleSchema(graphene.ObjectType):
    """
    The schema for representing an author.
    """
    title = graphene.String()
    # related
    publication = graphene.Field(PublicationSchema)
    def resolve_publication(self, *args):
        return self.parent().get()
    author = graphene.Field(AuthorSchema)
    def resolve_author():
        pass


"""
##############  THE BIG FAT QUERY  ############################
"""
class Query(graphene.ObjectType):
    """
    Query all the things!
    """
    # authors by

    """ AUTH: JWT LOGIN"""
    jwtLogin = graphene.Field(AuthSchema, jwt=graphene.String())
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
            authors = AuthorModel.query(AuthorModel.user == user_key)
            return AuthSchema(
                message='token valid',
                email=email, 
                authenticated=True, 
                verified=user.is_verified, 
                jwt=generate_jwt(email),
                authors=authors
            )
        except jwt.ExpiredSignatureError, e:
            return AuthSchema(
                message='token expired',
                email=email, 
                authenticated=False,
            )
        except jwt.DecodeError, e:
            return AuthSchema(
                message='token invalid'
            )

    loginUser = graphene.Field(AuthSchema, email=graphene.String(), pw=graphene.String())
    def resolve_loginUser(self, args, *more):
        """
        checks email and password, and returns and object containing
        auth related information
        """
        email = args.get('email')
        password = args.get('pw')
        user = ndb.Key('UserModel', email).get()

        if not user:
            return AuthSchema(
                message='login failed',
                authenticated=False,
                email=email
            )
        
        matches = verify_password(user.password_hash_sha256, password)
        authenticated = True if matches else False
        jwt = generate_jwt(email) if authenticated else None
        verified = user.is_verified if authenticated else None

        return AuthSchema(
            message='login successful',
            email=email, 
            authenticated=authenticated, 
            verified=verified, 
            jwt=jwt)


    createUser = graphene.Field(AuthSchema, email=graphene.String(), password=graphene.String())
    def resolve_createUser(self, args, *more):
        """
        creates a user with the given email address, provided it does not exist yet
        returns auth related information
        """
        email = args.get('email')
        password = args.get('password')
        user = ndb.Key('UserModel', email).get()
        if user:
            return AuthSchema(
                message='email already exists'
            )
        password_hash = hash_password(password)
        verification_token = uuid.uuid4().hex
        user_key = UserModel(
            id=email,
            email=email,
            verification_token=verification_token,
            password_hash_sha256=password_hash).put()
        send_verification_email(email, verification_token)
        return AuthSchema(
            message='user created',
            email=email, 
            authenticated=True, 
            verified=False, 
            jwt=generate_jwt(email))


    verifyEmail = graphene.Field(AuthSchema, email=graphene.String(), token=graphene.String())
    def resolve_verifyEmail(self, args, context, info):
        email = args.get('email')
        token = args.get('token')
        user = ndb.Key('UserModel', email).get()
        if token == user.verification_token:
            user.email_verified_at = datetime.now()
            user.put()
            return AuthSchema(
                message='email successfully verified',
                email=email, 
                authenticated=True, 
                verified=True, 
                jwt=generate_jwt(email))
        else:
            return AuthSchema(
                message='email verification failed',
                email=email)

    createAuthor = graphene.Field(AuthSchema, jwt=graphene.String(), name=graphene.String())
    def resolve_createAuthor(self, args, *more):
        print "resolve create author"
        name = args.get('name')
        token = args.get('jwt')
        email = email_from_jwt(token)
        user_key = ndb.Key('UserModel', email)
        # create author!
        author = AuthorModel(
            id=slugify(name),
            name=name,
            user=user_key
        ).put()
        # this might not include the just-created author.
        authors = AuthorModel.query(AuthorModel.user == user_key).fetch()
        if author not in authors:
            authors.append(author.get())
        return AuthSchema(
            message='Author created!',
            email=email, 
            authenticated=True, 
            verified=True, 
            jwt=generate_jwt(email),
            authors=authors
        )

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
        publication = ndb.Key(
            'AuthorModel',      args.get('authorID'), 
            'PublicationModel', args.get('publicationID')
        ).get()
        print publication
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
        result = schema.execute(query, variable_values=variables)
        response = {'data' : result.data}
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