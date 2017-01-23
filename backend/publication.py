from google.appengine.ext import ndb
from shared import RequestHandler, return_error, return_json, allow_cors, cross_origin, owner_required
from slugify import slugify
import json
from article import Article

"""
The Publication Model
"""
class Publication(ndb.Model):
    # id is set at time of creation, and consists of the author's id (root / parent), and publication id
    name = ndb.StringProperty()
    deleted = ndb.BooleanProperty(default=False)

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
        author_id = self.key.parent().id()
        publication_id = self.key.id()

        # get your articles included
        articles = Article.query(Article.deleted == False, ancestor = self.key).fetch()
        article_list = []
        for article in articles:
            article_list.append(article.data())

        return {
            'id': publication_id,
            'author_id': author_id,
            'name': self.name,
            'articles': article_list,
            'deleted': self.deleted,
            'url': '/author/{}/publication/{}'.format(author_id, publication_id)
        }

"""
PUBLICATION ENDPOINT
"""
class PublicationEndpoint(RequestHandler):

    @cross_origin
    @owner_required
    def put(self, author_id, publication_id):
        """
        create a new publication
        TODO: duplicate check
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        publication = Publication.create(
            author_id,
            name
        )
        return_json(self, publication.data())

    @cross_origin
    def get(self, author_id, publication_id):
        publication = ndb.Key('Author', author_id, 'Publication', publication_id).get()
        if not publication:
            return_error(self, 404, 'this publication could not be found.')
            return
        return_json(self, publication.data())

    @cross_origin
    @owner_required
    def delete(self, author_id, publication_id):
        publication = ndb.Key('Author', author_id, 'Publication', publication_id).get()
        if not publication:
            return_error(self, 404, 'this publication could not be found.')
            return
        publication.deleted = True
        publication.put()
        return_json(self, publication.data())

    @cross_origin
    @owner_required
    def post(self, author_id, publication_id):
        """
        Updates a publication.
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        publication = ndb.Key('Author', author_id, 'Publication', publication_id).get()
        if not publication:
            return_error(self, 404, 'this publication could not be found.')
            return
        publication.name = name
        publication.put()
        return_json(self, publication.data())
