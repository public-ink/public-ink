from google.appengine.ext import ndb
from shared import RequestHandler, return_json
from slugify import slugify

"""
The Author Model
"""
class Author(ndb.Model):
    """
    the id is set when an entitiy is created, and is the slugified version
    of the name.
    """
    name = ndb.StringProperty()
    email = ndb.StringProperty()

    @classmethod
    def create(cls, name, email, about = None):
        """
        creates an auther with a given name, email, and (optional) about.
        returns the newly created author's key.
        """
        author = cls(
            id = slugify(name),
            name = name,
            email = email,
            about = about
        ).put()
        return author
        

"""
The Author Endpoint
"""
class AuthorEndpoint(RequestHandler):
    def get(self):
        return_json(self, {'status': 'success'})