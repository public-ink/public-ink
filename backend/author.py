from google.appengine.ext import ndb
from shared import RequestHandler, return_json, return_404
from slugify import slugify
import json


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
    deleted = ndb.BooleanProperty()

    @classmethod
    def get(cls, id):
        author = ndb.Key('Author', id).get()
        return author

    @classmethod
    def create(cls, name, email, about=None):
        """
        creates an auther with a given name, email, and (optional) about.
        returns the newly created author ndb entitiy

        :param name: The name of the Author
        :param email: The email of the Author
        :param about (optional): An text snippet about the Author
        :rtype: Author :class:`ndb.Entitiy <Author>`
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
        author = ndb.Key('Author', id).get()
        author.name = name if name else author.name
        author.about = author.about if about else author.about
        author.put()
        return author

    @classmethod
    def delete(cls, id):
        author = ndb.Key('Author', id).get()
        author.deleted = True
        author.put()
        return author

    def data(self):
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
        endpoint for retrieving an author by their id
        """
        author = Author.get(id)
        if not author: 
            return_404(self)
            return
        author_data = author.data()
        return_json(self, author_data)

    def put(self, id):
        """
        endpoint for creating an author
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        email = data.get('email')
        author = Author.create(name, email)
        author_data = author.data()
        return_json(self, author_data)

    def post(self, id):
        """
        endpoint for updating an author
        TODO: ensure authentication!
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        about = data.get('about')
        author = Author.update(id, name, about)
        author_data = author.data()
        return_json(self, author_data)

    def delete(self, id):
        """
        endpoint for deleting a user
        TODO: ensure authentication!
        """
        author = Author.delete(id)
        author_data = author.data()
        return_json(self, author_data)
