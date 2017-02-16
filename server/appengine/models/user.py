from common import InkModel
from google.appengine.ext import ndb
import graphene
from datetime import datetime, timedelta
import jwt

import hashlib
import uuid


class User(InkModel):
    """
    Represents a human being
    The id is automatically set
    """
    email = ndb.StringProperty()
    verification_token = ndb.StringProperty()
    verified_at = ndb.DateTimeProperty()
    password_hash_sha256 = ndb.StringProperty()

    def hash_password_sha256(self, password):
        """
        given a password, hashes it and saves the hash
        """
        salt = uuid.uuid4().hex
        hash = hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt
        self.password_hash_sha256 = hash
        self.put()

    def verify_password_sha256(self, password):
        """
        checks if a given password matches the stored password's hash
        """
        hashed_password = self.password_hash_sha256
        password, salt = hashed_password.split(':')
        return password == hashlib.sha256(salt.encode() + password.encode()).hexdigest()


class UserSchema(graphene.ObjectType):
    """
    The InkUser schema
    """
    email = graphene.String()


"""
Mutations
"""


class CreateUser(graphene.Mutation):
    class Input:
        email = graphene.String()
        password = graphene.String()

    jwt = graphene.String()

    def mutate(self, args, context, info):
        email = args.get('email')
        password = args.get('password')

        # duplicate check
        exisiting = ndb.Key('User', email).get()
        if exisiting:
            return CreateUser(jwt='dup email! no token!')

        else:
            """ new signup """
            password_hash = hash_password(password)
            # this should move to classmethod on User
            verification_token = uuid.uuid4().hex
            user = User(
                id=email,
                email=email,
                verification_token=verification_token,
                password_hash_sha256=password_hash)
            user.put()

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

            return CreateUser(jwt=token_str)