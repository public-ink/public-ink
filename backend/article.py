from google.appengine.ext import ndb
from shared import RequestHandler, return_error, return_json, allow_cors, cross_origin, owner_required
from slugify import slugify
import json

"""
The Article Model
"""
class Article(ndb.Model):
    # id is set at time of creation, and consists of the author's id (root / parent), and article id
    title = ndb.StringProperty()
    title_text = ndb.StringProperty()
    teaser = ndb.TextProperty()
    teaser_text = ndb.TextProperty()
    body = ndb.TextProperty()
    body_text = ndb.TextProperty()
    deleted = ndb.BooleanProperty(default=False)


    def data(self):
        publication_key = self.key.parent()
        publication_id = publication_key.id()

        author_key = publication_key.parent()
        author_id = author_key.id()

        article_id = self.key.id()
        return {
            'id': article_id,
            'title': self.title,
            'titleText': self.title_text,
            'teaser': self.teaser,
            'teaserText': self.teaser_text,
            'body': self.body,
            'bodyText': self.body_text,
            'deleted': self.deleted,
            'url': '/author/{}/publication/{}/article/{}'.format(author_id, publication_id, article_id),
            # related: author
            'author': author_key.get().data(include_publications = False),
            # related: publication
            'publication': publication_key.get().data(include_articles = False)
        }

"""
ARTICLE ENDPOINT
"""
class ArticleEndpoint(RequestHandler):

    @cross_origin
    @owner_required
    def put(self, author_id, publication_id, article_id):
        """
        creates a new article
        TODO: duplicate check on title done, but also do on ID!
        check out uniqueness options from docs
        """
        # incoming data
        data = json.loads(self.request.body)
        article_title = data.get('title')
        article_title_text = data.get('titleText')
        article_body = data.get('body')
        article_teaser = data.get('teaser')
        
        # parent: publication
        publication_key = ndb.Key('Author', author_id, 'Publication', publication_id)
        
        # check if an article with that title's slug already exists
        dup = Article.query( Article.title == article_title, ancestor = publication_key).get()
        if dup:
            return_error(self, 409, 'already exists')
            return
        
        article = Article(
            id = slugify(article_title_text), 
            parent = publication_key,
            title = article_title,
            title_text = article_title_text,
            teaser = article_teaser,
            body = article_body
        ).put().get()
        return_json(self, article.data())


    @cross_origin
    def get(self, author_id, publication_id, article_id):
        """
        returns the requested article
        """
        article = ndb.Key(
            'Author', author_id, 
            'Publication', publication_id,
            'Article', article_id).get()
        if not article:
            return_error(self, 404, 'this article could not be found.')
            return
        return_json(self, article.data())
        

    @cross_origin
    @owner_required
    def delete(self, author_id, publication_id, article_id):
        """
        deletes the requested article (sets deleted to true)
        """
        article = ndb.Key(
            'Author', author_id, 
            'Publication', publication_id,
            'Article', article_id).get()
        if not article:
            return_error(self, 404, 'this article could not be found.')
            return
        article.deleted = True
        article.put()
        return_json(self, article.data())


    @cross_origin
    @owner_required
    def post(self, author_id, publication_id, article_id):
        """
        Updates a article.
        TODO: expand
        """
        data = json.loads(self.request.body)
        title = data.get('title')
        title_text = data.get('titleText')
        teaser = data.get('teaser')
        teaser_text = data.get('teaserText')
        body = data.get('body')
        body_text = data.get('bodyText')
        article = ndb.Key(
            'Author', author_id, 
            'Publication', publication_id,
            'Article', article_id).get()
        if not article:
            return_error(self, 404, 'this article could not be found.')
            return
        article.title = title
        article.title_text = title_text
        article.teaser = teaser
        article.teaser_text = teaser_text
        article.body = body
        article.body_text = body_text
        article.put()
        return_json(self, article.data())
