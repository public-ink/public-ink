from google.appengine.ext import ndb
from shared import RequestHandler, return_json

"""
The Blog Model
"""
class Blog(ndb.Model):
    name = ndb.StringProperty()


"""
The Blog Endpoint
"""
class BlogEndpoint(RequestHandler):
    def get(self):
        return_json(self, {'status': 'success'})