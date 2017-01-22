from google.appengine.ext import ndb
from google.appengine.api import users
from shared import RequestHandler, allow_cors, return_json, return_404
from slugify import slugify
import json
import webapp2

"""
Decorator function to allow cross-origin requests.
"""
def cross_origin(fn):
    def decorated_request(request, id):
        allow_cors(request)
        return fn(request, id)
    return decorated_request

"""
Decorator function to guard against unauthorized access.
"""
def owner_required(fn):
    def decorated_request(request, id):
        owner = ndb.Key('Author', id).get()
        if owner == users.get_current_user() or users.is_current_user_admin():
            return fn(request, id)
        else:
            request.error(401)
            request.response.write("You don't have permission to alter this resource.")
            return
    return decorated_request

"""
Decorator function to ensure request is logged in.
"""
def login_required(fn):
    def decorated_request(request, id):
        user = users.get_current_user()
        if user:
            return fn(request, id)
        else:
            request.error(401)
            request.response.write("You need to be logged in to perfom this request")
            return
    return decorated_request


class Author(ndb.Model):
    """
    The Author Model
    
    The id is set when an entitiy is created, it is the slugified version
    of the name. An Author is a root entity, i.e. it does not have a parent.
    Therefore, it can be retrieved by her key: 
    > ndb.Key('Author', 'mc-hoff').get()
    """
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    about = ndb.TextProperty()
    deleted = ndb.BooleanProperty(default=False)
    
    @classmethod
    def get(cls, id):
        """
        returns the requested author entity, or None if she does not exist
        """
        user = users.get_current_user()
        author = ndb.Key('Author', id).get()
        return author

    @classmethod
    def create(cls, name, email, about=None):
        """
        Creates an auther with a given name, email, and (optional) about.
        Returns the newly created author entitiy.

        :param name: The name of the author
        :param email: The email of the author
        :param about (optional): An text snippet about the author
        :rtype: Author :class:`ndb.Entitiy <Author>`

        todo: check duplicate
        """
        author_key = cls(
            id=slugify(name),
            name=name,
            email=email,
            about=about
        ).put()
        author = author_key.get()
        return author

    @classmethod
    def update(cls, id, name, about):
        """
        updates information about an author
        """
        author = ndb.Key('Author', id).get()
        if not author:
            return None
        author.name = name if name else author.name
        author.about = about if about else author.about
        author.put()
        return author

    @classmethod
    def delete(cls, id):
        """
        deletes an author by setting her deleted attribute to True
        """
        author = ndb.Key('Author', id).get()
        if not author:
            return None
        author.deleted = True
        author.put()
        return author

    def data(self):
        """
        returns a dictionary containing information about an author
        """
        return {
            'id': self.key.id(),
            'name': self.name,
            'email': self.email,
            'about': self.about
        }


class AuthorEndpoint(RequestHandler):
    """
    The Author Endpoint
    """
    def get(self, id):
        """
        Endpoint for retrieving an author by their id
        """
        print 'GET HERE'
        author = Author.get(id)
        if not author: 
            return_404(self)
            return
        author_data = author.data()
        return_json(self, author_data)

    @cross_origin
    @login_required
    def put(self, id):
        """
        Endpoint for creating an author
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        email = users.get_current_user().email()
        author = Author.create(name, email)
        author_data = author.data()
        return_json(self, author_data)

    @owner_required
    def post(self, id):
        """
        Endpoint for updating an author (protected)
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        about = data.get('about')
        author = Author.update(id, name, about)
        if not author:
            return_404(self)
        author_data = author.data()
        return_json(self, author_data)

    @owner_required
    def delete(self, id):
        """
        Endpoint for deleting a user (protected)
        """
        author = Author.delete(id)
        author_data = author.data()
        return_json(self, author_data)

