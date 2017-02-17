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
class AuthModel(InkModel):
    """
    This is NOT a normal db model, it's just used to help out the 
    AuthSchema at the moment, maybe could be done differently
    loginUser query uses it...
    """
    authenticated = ndb.BooleanProperty()
    verified = ndb.BooleanProperty()
    jwt = ndb.StringProperty()
    email = ndb.StringProperty()
    message = ndb.StringProperty()


class AuthSchema(graphene.ObjectType):
    authenticated = graphene.Boolean()
    verified = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()
    message = graphene.String()


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


"""
PUBLICATION 
"""
class PublicationModel(InkModel):
    name = ndb.StringProperty()

class PublicationSchema(graphene.ObjectType):
    """
    The schema for representing a publication
    """
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
            pass
        
        matches = verify_password(user.password_hash_sha256, password)
        authenticated = True if matches else False
        jwt = generate_jwt(email) if authenticated else None
        verified = user.is_verified if authenticated else None

        return AuthModel(
            message='login successful',
            email=email, 
            authenticated=authenticated, 
            verified=verified, 
            jwt=jwt)

    createUser = graphene.Field(AuthSchema, email=graphene.String(), pw=graphene.String())
    def resolve_createUser(self, args, *more):
        """
        creates a user with the given email address, provided it does not exist yet
        returns auth related information
        """
        email = args.get('email')
        password = args.get('pw')
        user = ndb.Key('UserModel', email).get()
        if user:
            return AuthModel(
                message='email already exists'
            )
        password_hash = hash_password(password)
        verification_token = uuid.uuid4().hex
        user_key = UserModel(
            id=email,
            email=email,
            verification_token=verification_token,
            password_hash_sha256=password_hash).put()
        return AuthModel(
            message='user created',
            email=email, 
            authenticated=True, 
            verified=False, 
            jwt=generate_jwt(email))
    
        
            

    
    user = graphene.Field(UserSchema, email=graphene.String(), jwt=graphene.String())
    def resolve_user(self, args, context, info):
        print 'resolve user'
        user = ndb.Key(
            'UserModel', args.get('email')
        ).get()
        return user


    author = graphene.Field(AuthorSchema, authorID=graphene.String())
    def resolve_author(self, args, context, info):
        print 'resolve author!'
        authorID = args.get('authorID')
        author = ndb.Key(
            'AuthorModel', args.get('authorID')
        ).get()
        return author


    publication = graphene.Field(PublicationSchema, authorID=graphene.String(), publicationID=graphene.String())
    def resolve_publication(self, args, context, info):
        print 'resolve publication'
        publication = ndb.Key(
            'AuthorModel',      args.get('authorID'), 
            'PublicationModel', args.get('publicationID')
        ).get()
        return publication


    article = graphene.Field(ArticleSchema, authorID=graphene.String(), publicationID=graphene.String(), articleID=graphene.String())
    def resolve_publication(self, args, context, info):
        print 'resolve publication'
        publication = ndb.Key(
            'AuthorModel',      args.get('authorID'), 
            'PublicationModel', args.get('publicationID'),
            'ArticleModel',     args.get('articleID')
        ).get()
        return publication



    verifyJWT = graphene.Boolean(jwt=graphene.String())
    def resolve_verifyJWT(self, args, context, info):
        token = args.get('jwt')
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            # todo: also check email is correct / matching
            email = payload.get('email')
            print payload
            return True
        except jwt.ExpiredSignatureError, e:
            print "token has expired"
            return False

    # should return an account later
    verifyEmail = graphene.Boolean(email=graphene.String(), token=graphene.String())
    def resolve_verifyEmail(self, args, context, info):
        email = args.get('email')
        token = args.get('token')
        user = ndb.Key('UserModel', email).get()
        if token == user.verification_token:
            user.email_verified_at = datetime.now()
            user.put()
            return True
        else:
            return False

""" MUTATION """

class LoginUser(graphene.Mutation):
    class Input:
        email = graphene.String()
        password = graphene.String()
    
    def mutate(self, args, context, info):
        email = args.get('email')
        password = args.get('password')
        # get user!
        user = ndb.Key('UserModel', email).get()
        # compare against hash!
        matches = verify_password(user.password_hash_sha256, password)
        if matches:
            return LoginUser(
                success=True,
                jwt= generate_jwt(email),
                user=user,
                email=email)
        else:
            return LoginUser(
                success=False)
    # return values
    success = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()
    user = graphene.Field(lambda: UserSchema)
        

class CreateUser(graphene.Mutation):
    class Input:
        email = graphene.String()
        password = graphene.String()

    # return Type
    #user = graphene.Field(UserSchema)
    #jwt = graphene.String()
    success = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()

    def mutate(self, args, context, info):
        print "mutate!"
        email = args.get('email')
        password = args.get('password')

        # duplicate check
        exisiting = ndb.Key('UserModel', email).get()
        if exisiting:
            print 'exisiting!'
            return CreateUser(
                success=False
                )

        else:
            """ new signup """
            password_hash = hash_password(password)
            # this should move to classmethod on User
            verification_token = uuid.uuid4().hex
            user_key = UserModel(
                id=email,
                email=email,
                verification_token=verification_token,
                password_hash_sha256=password_hash).put()
            print 'saved'
            print password
            print password_hash
            user = user_key.get()

            """make a token! """
            jwt_token = generate_jwt(user.email)

            """ send email """
            message = mail.EmailMessage(
                sender="auth@public-ink.appspotmail.com",
                subject="Public.Ink Verification")

            message.to = "micklinghoff@gmail.com"
            host = 'http://localhost:4200'
            message.body = """Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, let follow this link:
{}/verify/{}/{}

Awesome!
            """.format(host, user.email, verification_token)
            #message.send()
            print message.body

            return CreateUser(
                success=True,
                jwt=jwt_token,
                email=user.email
            )

class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()
    loginUser = LoginUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)


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
