import graphene
import webapp2
import hashlib
import jinja2
import json
import uuid
import os

from google.appengine.ext import ndb

ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname( __file__ ), 'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class InkModel(ndb.Model):
    """
    A common NDB entity model
    """
    created = ndb.DateTimeProperty(auto_now_add = True)
    updated = ndb.DateTimeProperty(auto_now = True)


class InkUser(InkModel):
    """
    Represents a human being
    The id is automatically set
    """
    email = ndb.StringProperty()
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


class Author(InkModel):
    """
    Represents an author, and is always linked to an InkUser,
    but that relation is not revealed publicly.

    The ID is set by us, e.g. 'hoff', so an author can be retrieved like so:
    nbd.Key('Author', 'hoff').get()

    name is the verbose name, e.g. The Hoff
    """
    ink_user = ndb.KeyProperty(kind=InkUser)
    name = ndb.StringProperty()
    

 
def hash_password(password):
    # uuid is used to generate a random number
    salt = uuid.uuid4().hex
    return hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt
    
def verify_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == hashlib.sha256(salt.encode() + user_password.encode()).hexdigest()



class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        pw = 'mega'
        hashed_pw = hash_password(pw)

        verified = verify_password(hashed_pw, pw)

        template = ninja.get_template('home.html')
        template_values = {
            'hash': hashed_pw,
            'verified': verified
        }
        output = template.render(template_values)
        return self.response.write(output)


app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
    ], debug = True
)