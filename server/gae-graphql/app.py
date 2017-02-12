from google.appengine.ext import ndb
import json
import os
import webapp2
import graphene
from graphene import relay, resolve_only_args
from graphene_gae import NdbObjectType, NdbConnectionField

import jinja2


ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname( __file__ ))),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

"""
Our NDB models
"""

class Author(ndb.Model):
    """
    Represents an author.
    The ID is set by us, e.g. 'hoff', so an author can be retrieved like so:
    nbd.Key('Author', 'hoff').get()
    """
    name = ndb.StringProperty()
    about = ndb.TextProperty()

class AuthorSchema(graphene.ObjectType):
    name = graphene.String()
    about = graphene.String()
    #posts = graphene.List(lambda: PostSchema, description="jo I write about the awesome post schema")

class Publication(ndb.Model):
    """
    Represents a publication, which belongs to an author
    The ID is set by us, e.g. 'atomic-angular', so a publication can be retrieved like so:
    ndb.Key('Author', 'hoff', 'Publication', 'atomic-angular').get()
    """
    name = ndb.StringProperty()
    about = ndb.TextProperty()

class Article(ndb.Model):
    """
    Represents an article, which belongs to an author
    The ID is set by us, e.g. 'how-public-ink-was-made', so an article can be retrieved like so:
    ndb.Key('Author', 'hoff', 'Publication', 'atomic-angular', 'Article', 'how-public-ink-was-made').get()
    """
    title = ndb.StringProperty()
    teaser = ndb.TextProperty()

def reset_data():
    authors = Author.query().fetch()
    publications = Publication.query().fetch()
    articles = Article.query().fetch()
    for entity in authors + publications + articles:
        entity.key.delete()
    
    author_slug = 'hoffer'
    publication_slug = 'atomic-angular'
    article_slug = 'how-public-ink-was-made'

    author = Author(
        id = author_slug, 
        name = 'Hoff', 
        about = 'the man!')
    author_key = author.put()

    publication = Publication(
        id = publication_slug, 
        parent = author_key,
        name = 'Atomic Angular', 
        about = 'a wonderful publication')
    publication_key = publication.put()

    article = Article(
        id = article_slug,
        parent = publication_key,
        title = 'How public.ink was made',
        teaser = 'A look behind the scenes!'
    )
    article_key = article.put()
    print 'created article'
    print article_key
    print Article.query().fetch()


    

class Home(webapp2.RequestHandler):
    def get(self):
        self.response.write('nothing to see, yet')

import time
class ResetEndpoint(webapp2.RequestHandler):
    def get(self):
        reset_data()
        time.sleep(2)
        authors = Author.query()
        publications = Publication.query().fetch()
        articles = Article.query().fetch()
        template = ninja.get_template('templates/data.html')
        data = {
            'authors': authors,
            'publications': publications,
            'articles': articles
        }
        self.response.write(template.render(data))

class DataEndpoint(webapp2.RequestHandler):
    def get(self):
        template = ninja.get_template('templates/data.html')
        data = {
            'authors': Author.query(),
            'publications': Publication.query(),
            'articles': Article.query()
        }
        self.response.write(template.render(data))



"""
QUERY and schema
"""
class Query(graphene.ObjectType):
    author = graphene.Field(AuthorSchema, description="Information about an author!")

    def resolve_author(self, args, context, info):
        author_key = ndb.Key('Author', 'hoffer')
        author = author_key.get()
        return author

schema = graphene.Schema(query=Query) #, mutation=Mutation

"""
GraphQL Endpoint
"""
class GraphQLEndpoint(webapp2.RequestHandler):
    def get(self):
        """
        Renders the GraphiQL IDE, populated with a query if it exists
        """
        query = self.request.GET.get('query')
        template = ninja.get_template('graphiql.html')
        template_values = {
            'query': query
        }
        self.response.write(template.render(template_values))

    def post(self):
        """
        Accepts a query, executes it, and returns the result
        """
        data = json.loads(self.request.body)
        query = data.get('query', '')
        result = schema.execute(query)
        response = {'data' : result.data}
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))

app = webapp2.WSGIApplication(
    [
        ('/', Home),
        ('/reset', ResetEndpoint),
        ('/data', DataEndpoint),
        ('/graphql', GraphQLEndpoint)
    ], debug = True
)