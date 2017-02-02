from google.appengine.ext import ndb
from shared import RequestHandler, return_error, return_json, allow_cors, cross_origin, owner_required
from slugify import slugify
import json
import datetime
#from author import Author

"""
The Comment Model
"""
class Comment(ndb.Model):
    """
    ID is set at the time of creation, and consists of:
    author -> publication-> article -> DateTimeString
    """
    # who wrote this comment? can be 'hoff' of 'anonym'
    user_id = ndb.StringProperty()
    body = ndb.TextProperty()
    body_text = ndb.TextProperty()
    deleted = ndb.BooleanProperty(default=False)

    def data(self):
        # get parent
        article = self.key.parent().get()
        # get the author
        author = ndb.Key('Author', self.user_id).get()
        return {
            'id': self.key.id(),
            'userID': self.user_id,
            'body': self.body,
            'bodyText': self.body_text,
            'deleted': self.deleted,
            'url': article.url() + '/comment/' + self.key.id(),
            'author': author.data(include_publications= False) if author else ''
        }

"""
COMMENT ENDPOINT
"""
class CommentEndpoint(RequestHandler):

    @cross_origin
    def put(self, author_id, publication_id, article_id, comment_id):
        """
        creates a new comment
        """
        if not comment_id == 'new':
            return_error(self, 409, 'comments can only be put with /new')
            return
        data = json.loads(self.request.body)
        comment_id = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        # parent: article
        article_key = ndb.Key('Author', author_id, 'Publication', publication_id, 'Article', article_id)
        comment = Comment(
            id = comment_id, 
            parent = article_key,
            user_id = data.get('userID'),
            body = data.get('body'),
            body_text = data.get('bodyText')
        ).put().get()
        return_json(self, comment.data())


    @cross_origin
    def get(self, author_id, publication_id, article_id, comment_id):
        """
        returns a single requested comment. not very useful... but anyway
        """
        comment = ndb.Key(
            'Author', author_id, 
            'Publication', publication_id,
            'Article', article_id,
            'Comment', comment_id).get()
        if not comment:
            return_error(self, 404, 'this comment could not be found.')
            return
        return_json(self, comment.data())
        

    @cross_origin
    @owner_required
    def delete(self, author_id, publication_id, comment_id):
        """
        deletes the requested comment (sets deleted to true)
        """
        comment = ndb.Key(
            'Author', author_id, 
            'Publication', publication_id,
            'Article', article_id,
            'Comment', comment_id).get()
        if not comment:
            return_error(self, 404, 'this comment could not be found.')
            return
        comment.deleted = True
        comment.put()
        return_json(self, comment.data())


    @cross_origin
    @owner_required
    def post(self, author_id, publication_id, comment_id):
        """
        Updates a comment.
        """
        comment = ndb.Key(
            'Author', author_id, 
            'Publication', publication_id,
            'Article', article_id,
            'Comment', comment_id).get()
        if not comment:
            return_error(self, 404, 'this comment could not be found.')
            return
        data = json.loads(self.request.body)
        comment.body = data.get('body')
        comment.body_text = data.get('bodyText')
        comment.put()
        return_json(self, comment.data())
