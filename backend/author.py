from google.appengine.ext import ndb
from google.appengine.api import users
from shared import RequestHandler, allow_cors, return_json, return_error, cross_origin, owner_required, login_required
from slugify import slugify
import json
import webapp2

from publication import Publication


class Author(ndb.Model):
    """
    The Author Model
    
    The id is set when an entitiy is created, it is the slugified version
    of the name. An Author is a root entity, i.e. it does not have a parent.
    Therefore, it can be retrieved by her key: 
    > ndb.Key('Author', 'mc-hoff').get()
    """
    name = ndb.StringProperty()
    name_text = ndb.StringProperty()
    about = ndb.TextProperty()
    about_text = ndb.TextProperty()

    email = ndb.StringProperty()
    deleted = ndb.BooleanProperty(default=False)
    
    @classmethod
    def get(cls, id):
        """
        returns the requested author entity, or None if she does not exist
        """
        author = ndb.Key('Author', id).get()
        return author

    @classmethod
    def get_by_session(cls):
        """
        Returns a list of authors associated with the current sessions,
        or an empty list
        """
        user = users.get_current_user()
        author_list = []
        if not user:
            return author_list
        authors = cls.query(Author.email == user.email(), Author.deleted == False).fetch()
        for author in authors:
            author_list.append(author.data())
        return author_list


    @classmethod
    def create(cls, name, email, about=None):
        """
        Creates an auther with a given name, email, and (optional) about.
        Returns the newly created author entitiy.

        :param name: The name of the author
        :param email: The email of the author
        :param about (optional): An text snippet about the author
        :rtype: Author :class:`ndb.Entitiy <Author>` or None
        """
        author = ndb.Key(cls, slugify(name)).get()
        if author:
            return None
        author_key = cls(
            id=slugify(name),
            name=name,
            email=email,
            about=about
        ).put()
        return author_key.get()

    @classmethod
    def update(cls, id, name, about):
        """
        updates information about an author
        """
        author = ndb.Key('Author', id).get()
        if not author:
            return None
        author.name = name if name else author.name
        author.about = about if about else author.about
        author.put()
        return author

    @classmethod
    def delete(cls, id):
        """
        deletes an author by setting her deleted attribute to True
        """
        author = ndb.Key('Author', id).get()
        if not author:
            return None
        author.deleted = True
        author.put()
        return author

    def data(self, include_publications=True):
        """
        returns a dictionary containing information about an author,
        and her publications, unless specified otherwise, to prevent infinite loops
        """
        author_id = self.key.id() # still needed?
        publication_list = []
        if include_publications:
            publications = Publication.query(Publication.deleted == False, ancestor = self.key).fetch()
            for publication in publications:
                publication_list.append(publication.data())
        return {
            'id': author_id,
            'url': '/author/{}'.format(author_id),
            'name': self.name,
            'nameText': self.name_text,
            'about': self.about,
            'about_text': self.about_text,
            'publications': publication_list # exclude altogether
        }

"""
AUTHOR ENDPOINTS
"""

class AuthorEndpoint(RequestHandler):
    """
    The Author Endpoint
    """
    @cross_origin
    def get(self, id):
        """
        Endpoint for retrieving an author by their id
        """
        author = Author.get(id)
        if not author: 
            return_error(self, 404, 'this author does not exist')
            return
        author_data = author.data()
        return_json(self, author_data)

    @cross_origin
    @login_required
    def put(self, id):
        """
        Endpoint for creating an author
        """
        data = json.loads(self.request.body)
        name_text = data.get('nameText')
        email = users.get_current_user().email()

        author = ndb.Key('Author', slugify(name_text)).get()
        if author:
            # duplicate! raise error
            # or just add something to the key, like 'hoff-mega
            return_error(self, 409, 'already exists')
            return
        author_key = Author(
            id=slugify(name_text),
            name= data.get('name'),
            name_text = name_text,
            email=email, # add user id!
            about=data.get('about'),
            about_text = data.get('aboutText')
        ).put()
        author = author_key.get()
        return_json(self, author.data())

    @cross_origin
    @owner_required
    def post(self, id):
        """
        Endpoint for updating an author (protected)
        """
        data = json.loads(self.request.body)
        name = data.get('name')
        about = data.get('about')
        author = Author.update(id, name, about)
        if not author:
            return_error(self, 404, 'this author does not exist')
        author_data = author.data()
        return_json(self, author_data)

    @cross_origin
    @owner_required
    def delete(self, id):
        """
        Endpoint for deleting a user (protected)
        """
        author = Author.delete(id)
        author_data = author.data()
        return_json(self, author_data)

class MeEndpoint(RequestHandler):
    """
    Endpoint for querying information about the current user
    """
    def get(self):
        author_list = Author.get_by_session()
        allow_cors(self)
        return_json(self, author_list)