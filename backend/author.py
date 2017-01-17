from google.appengine.ext import ndb
from shared import RequestHandler, return_json

"""
The Author Model
"""
class Author(ndb.Model):
    name = ndb.StringProperty()


"""
The Author Endpoint
"""
class AuthorEndpoint(RequestHandler):
    def get(self):
        return_json(self, {'status': 'success'})