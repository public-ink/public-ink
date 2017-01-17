from google.appengine.ext import ndb
from shared import RequestHandler, return_json

"""
The Article Model
"""
class Article(ndb.Model):
    name = ndb.StringProperty()


"""
The Article Endpoint
"""
class ArticleEndpoint(RequestHandler):
    def get(self):
        return_json(self, {'status': 'success'})