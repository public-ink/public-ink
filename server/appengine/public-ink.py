import graphene
import webapp2
import hashlib
import jinja2
import json
import uuid
import os
from shared import RequestHandler, cross_origin, ninja
import json
from datetime import datetime, timedelta

from google.appengine.api import mail

import jwt

import hashlib
import uuid

from secrets.jwt import JWT_SECRET, JWT_EXP_DELTA_SECONDS, JWT_ALGORITHM

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


from google.appengine.ext import ndb

"""
Models and Schemas
"""

""" USER """

class UserModel(ndb.Model):
    email = ndb.StringProperty(required=True)
    verification_token = ndb.StringProperty()
    password_hash_sha256 = ndb.StringProperty()

    

class UserSchema(graphene.ObjectType):
    email = graphene.String()
    jwt = graphene.String()
    def resolve_jwt(self, *args):
        return 'abc'



""" AUTHOR """

class AuthorModel(ndb.Model):
    user = ndb.KeyProperty(kind=UserModel, required=True)
    name = ndb.StringProperty(required=True)

class AuthorSchema(graphene.ObjectType):
    user = graphene.Field(UserSchema)
    name = graphene.String()



""" QUERY """
class Query(graphene.ObjectType):
    user = graphene.Field(UserSchema, email=graphene.String())
    def resolve_user(self, args, context, info):
        email = args.get('email')
        user = ndb.Key('UserModel', email).get()
        return user

    author = graphene.Field(AuthorSchema, authorID=graphene.String())
    def resolve_author(self, args, context, info):
        authorID = args.get('authorID')
        author = ndb.Key('AuthorModel', authorID).get()
        return author


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
                jwt='to be done',
                email=email)
        else:
            return LoginUser(
                success=False)
    # return values
    success = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()
        

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
            payload = {
                'email': user.email,
                'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
            }
            jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
            token_str = jwt_token.decode('utf-8')

            """ send email """
            message = mail.EmailMessage(
                sender="auth@public-ink.appspotmail.com",
                subject="Public.Ink Verification")

            message.to = "micklinghoff@gmail.com"
            message.body = """Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, let follow this link:
https://public.ink/verify?email=micklinghoff@gmail.com&token=xyzToken

Awesome!
            """
            message.send()

            return CreateUser(
                success=True,
                jwt=token_str,
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
