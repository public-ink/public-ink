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
    name_text = ndb.StringProperty()
    about = ndb.TextProperty()
    about_text = ndb.TextProperty()
    image_url = ndb.TextProperty()
    deleted = ndb.BooleanProperty(default=False)

    def get_articles(self):
        """
        returns a list of articles associated with this Publication
        """
        pass

    def data(self, include_articles = True):
        author_id = self.key.parent().id()
        author = self.key.parent().get()
        publication_id = self.key.id()

        # get your articles included
        article_list = []
        if include_articles:
            articles = Article.query(Article.deleted == False, ancestor = self.key).fetch()
            for article in articles:
                article_list.append(article.data())

        return {
            'id': publication_id,
            'author': author.data(include_publications = False),
            'name': self.name,
            'nameText': self.name_text,
            'about': self.about,
            'aboutText': self.about_text,
            'imageUrl': self.image_url,
            # related
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
        name_text = data.get('nameText')
        author_key = ndb.Key('Author', author_id)

        #debug
        abtext = data.get('aboutText')
        print type(abtext)
        print abtext

        publication = Publication(
            parent = author_key,
            id = slugify(name_text),
            name = name,
            name_text = name_text,
            about = data.get('about'),
            about_text = data.get('aboutText'),
            image_url  = data.get('imageUrl')
        )
        publication.put()
        return_json(self, publication.data())

    @cross_origin
    def get(self, author_id, publication_id):
        publication = ndb.Key('Author', author_id, 'Publication', publication_id).get()
        if not publication or publication.deleted:
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
        name_text = data.get('nameText')
        #debug
        abtext = data.get('aboutText')
        if abtext == name_text:
            print 'same same, omg!'
        else:
            print 'not the same!'
        print type(abtext)
        print abtext
        publication = ndb.Key('Author', author_id, 'Publication', publication_id).get()
        if not publication:
            return_error(self, 404, 'this publication could not be found.')
            return
        publication.name = data.get('name')
        publication.name_text = data.get('nameText')
        
        publication.about_text = name_text
        print 'I set about text to'
        print name_text
        publication.about_text = abtext
        publication.about_text = data.get('aboutText')
        publication.about = data.get('about')

        publication.image_url  = data.get('imageUrl')
        publication.put()
        return_json(self, publication.data())

class PublicationsEndpoint(RequestHandler):

    @cross_origin
    def get(self):
        publications = Publication.query(Publication.deleted == False).fetch()
        publication_list = []
        for publication in publications:
            publication_list.append(publication.data())
        return_json(self, publication_list)
