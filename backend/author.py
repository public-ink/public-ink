from google.appengine.ext import ndb
from google.appengine.api import users
from shared import RequestHandler, allow_cors, return_json, return_error, cross_origin, owner_required, login_required
from slugify import slugify
import json
import webapp2

from publication import Publication
from shared import ninja, epoch


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
    image_url = ndb.StringProperty()

    email = ndb.StringProperty()
    user_id = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add = True)
    updated = ndb.DateTimeProperty(auto_now = True)
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
            author_list.append(author.data(include_publications = False))
        return author_list

    ## todo: know which server you are sitting on! hardcoded localhost:8080 for now
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
            'url': 'http://localhost:8080/author/{}'.format(author_id),
            'name': self.name,
            'nameText': self.name_text,
            'about': self.about,
            'aboutText': self.about_text,
            'imageURL': self.image_url,
            'deleted': self.deleted,
            'created': epoch(self.created),
            'updated': epoch(self.updated),
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
        format = self.request.GET.get('format')
        if format == 'html':
            template = ninja.get_template('author.html')
            template_values = {
                'author': author
            }
            self.response.write(template.render(template_values))
        else: 
            return_json(self, author_data)

    @cross_origin
    @login_required
    def put(self, id):
        """
        Endpoint for creating an author
        """
        data = json.loads(self.request.body)
        name_text = data.get('nameText')
        if not name_text or name_text == '':
            return_error(self, 400, 'missing required paramter: nameText')
            return

        email = users.get_current_user().email()
        author = ndb.Key('Author', slugify(name_text)).get()
        if author:
            return_error(self, 409, 'an author of that name already exists')
            return
        author_key = Author(
            id=slugify(name_text),
            name= data.get('name'),
            name_text = name_text,
            email=email, # add user id!
            about=data.get('about'),
            about_text = data.get('aboutText'),
            image_url = data.get('imageURL')
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
        # inline
        author = ndb.Key('Author', id).get()
        if not author:
            return_error(self, 404, 'this author does not exist')
            return
        author.name = data.get('name')
        author.name_text = data.get('nameText')
        author.about = data.get('about')
        author.about_text = data.get('aboutText')
        author.image_url = data.get('imageURL')
        author.put()
        author_data = author.data()
        return_json(self, author_data)

    @cross_origin
    @owner_required
    def delete(self, id):
        """
        Endpoint for deleting a user (protected)
        """
        author = ndb.Key('Author', id).get()
        author.deleted = True
        author.put()
        return_json(self, author.data())

class MeEndpoint(RequestHandler):
    """
    Endpoint for querying information about the current user
    """
    def get(self):
        author_list = Author.get_by_session()
        allow_cors(self)
        return_json(self, author_list)

class WhoAmIEndpoint(RequestHandler):
    """
    Endpoint for querying information about the current user
    Response is a list of authors
    """
    def get(self):
        user = users.get_current_user()
        if user:
            authenticated = True
            email = user.email()
        else:
            authenticated = False
            email = ''
        author_list = Author.get_by_session()
        
        response = {
            'authenticated': authenticated,
            'authors': author_list,
            'loginUrl': users.create_login_url('http://localhost:4200/'),
            'logoutUrl': users.create_logout_url('http://localhost:4200/'),
            'email': email
        }
        allow_cors(self)
        return_json(self, response)
