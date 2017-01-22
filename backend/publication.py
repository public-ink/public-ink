from google.appengine.ext import ndb
from shared import RequestHandler, return_json, allow_cors, cross_origin



"""
The Publication Model
"""
class Publication(ndb.Model):
    name = ndb.StringProperty()


"""
The Publication Endpoint
"""
class PublicationEndpoint(RequestHandler):

    @cross_origin
    def get(self, author_id, publication_id):
        return_json(self, {'status': 'success', 'author': author_id, 'publication': publication_id})