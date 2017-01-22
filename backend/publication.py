from google.appengine.ext import ndb
from shared import RequestHandler, return_json, allow_cors, cross_origin, owner_required
from slugify import slugify
import json


"""
The Publication Model
"""
class Publication(ndb.Model):
    # id is set at time of creation, and consists of the author's id (root / parent), and publication id
    name = ndb.StringProperty()

    @classmethod
    def create(cls, author_id, publication_name):
        """
        creates a publication, given
        - an author id
        - a publication name
        """
        # parent is an author
        author_key = ndb.Key('Author', author_id)
        publication_key = Publication(
            id = slugify(publication_name),
            parent = author_key,
            name = publication_name
        ).put()
        return publication_key.get()

    def get_articles(self):
        """
        returns a list of articles associated with this Publication
        """
        pass

    def data(self):
        return {
            'id': self.key.id(),
            'name': self.name
        }

"""
PUBLICATION ENDPOINT
"""
class PublicationEndpoint(RequestHandler):

    @cross_origin
    def get(self, author_id, publication_id):
        return_json(self, {'status': 'success', 'author': author_id, 'publication': publication_id})

    @cross_origin
    @owner_required
    def post(self, author_id, publication_id):
        data = json.loads(self.request.body)
        name = data.get('name')
        publication = Publication.create(
            author_id,
            name
        )
        return_json(self, publication.data())
