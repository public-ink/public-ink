from google.appengine.ext import ndb
import json
import os
import webapp2
import graphene
from graphene import relay, resolve_only_args
from graphene_gae import NdbObjectType, NdbConnectionField
import urllib
import random
import jinja2

from shared import RequestHandler, cross_origin


ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname( __file__ ))),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

"""
Complex Inputs
"""
class IDInput(graphene.InputObjectType):
    """
    This kind of thing is useful for defining complex inputs / args
    """
    id = graphene.String(required=True)

class OrderInput(graphene.InputObjectType):
    order = graphene.String(required=True)
    name = 'such order'


"""
Our NDB models
"""

class InkModel(ndb.Model):
    """
    A common NDB entity model
    """
    created = ndb.DateTimeProperty(auto_now_add = True)
    updated = ndb.DateTimeProperty(auto_now = True)

class Author(InkModel):
    """
    Represents an author.
    The ID is set by us, e.g. 'hoff', so an author can be retrieved like so:
    nbd.Key('Author', 'hoff').get()
    """
    name = ndb.StringProperty()
    about = ndb.TextProperty()
    

class AuthorSchema(graphene.ObjectType):
    """
    The Author Schema in all its glory!
    GOTCHA: this shows up in the docs :)
    """
    
    name = graphene.String()
    about = graphene.String()

    created = graphene.String()
    updated = graphene.String()

    #posts = graphene.List(lambda: PostSchema, description="jo I write about the awesome post schema")

    id = graphene.String()
    def resolve_id(self, *args): return self.key.id()

    articles = graphene.List(lambda: ArticleSchema, order= graphene.String())
    def resolve_articles(self, args, info, context): 
        
        order = args.get('order')
        if order == 'latest':
            return Article.query(ancestor=self.key).order(-Article.created)
        elif order == 'oldest':
            return Article.query(ancestor=self.key).order(Article.created)
        else:
            return Article.query(ancestor=self.key)
       
    publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, *args): return Publication.query(ancestor=self.key)



class Publication(InkModel):
    """
    Represents a publication, which belongs to an author
    The ID is set by us, e.g. 'atomic-angular', so a publication can be retrieved like so:
    ndb.Key('Author', 'hoff', 'Publication', 'atomic-angular').get()
    """
    name = ndb.StringProperty()
    about = ndb.TextProperty()

class PublicationSchema(graphene.ObjectType):
    """
    The publication schema
    """
    name = graphene.String()
    about = graphene.String()

    created = graphene.String()
    updated = graphene.String()

    id = graphene.String()
    def resolve_id(self, *args): return self.key.id()

    author = graphene.Field(AuthorSchema)
    def resolve_author(self, *args): return self.key.parent().get()

    """
    'articles' is  custom field, with 'order' input. If input gets complex you can do
    order = graphene.InputField(lambda: OrderInput)
    """
    articles = graphene.List(lambda: ArticleSchema, order = graphene.String())
    def resolve_articles(self, args, context, info): 
        return Article.query(ancestor = self.key)
    


class Article(InkModel):
    """
    Represents an article, which belongs to an author
    The ID is set by us, e.g. 'how-public-ink-was-made', so an article can be retrieved like so:
    ndb.Key('Author', 'hoff', 'Publication', 'atomic-angular', 'Article', 'how-public-ink-was-made').get()
    """
    title = ndb.StringProperty()
    teaser = ndb.TextProperty()


class ArticleSchema(graphene.ObjectType):
    """ The Schema / Type Definition of an Article """
    """ GOTCHA: self refers to the actual Article instance """

    #order = graphene.InputField(AuthorSchema)

    id = graphene.String()
    def resolve_id(self, *args): return self.key.id()
    
    title = graphene.String()
    teaser = graphene.String()

    created = graphene.String()
    updated = graphene.String()

    """ related """
    publication = graphene.Field(PublicationSchema)
    def resolve_publication(self, *args): return self.key.parent().get()
    
    author = graphene.Field(AuthorSchema)
    def resolve_author(self, args, context, info):
        publication = self.key.parent().get()
        author = publication.key.parent().get()
        return author



"""
QUERY and schema
"""
class Query(graphene.ObjectType):
    #author = graphene.Field(AuthorSchema, id=IDInput(), description="Information about an author, now with id!")

    """ author take an ID """
    author = graphene.Field(
        AuthorSchema, 
        id=graphene.String(), 
        description="Information about an author, given the author ID")

    def resolve_author(self, args, context, info):
        id = args.get('id')
        author_key = ndb.Key('Author', id)
        author = author_key.get()
        return author
    
    """
    Publication takes an authorID and publicationID
    """
    publication = graphene.Field(
        PublicationSchema, 
        authorID = graphene.String(), 
        publicationID = graphene.String(),
        description="Information about a publication, given autor ID and publication ID")

    def resolve_publication(self, args, context, info):
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        publication_key = ndb.Key('Author', author_id, 'Publication', publication_id)
        publication = publication_key.get()
        return publication

    """
    Article take an authorID, a publicationID, and articleID
    """
    article = graphene.Field(
        ArticleSchema, 
        authorID = graphene.String(), 
        publicationID = graphene.String(),
        articleID = graphene.String(),
        description="Information about an article, given autor ID, a publication ID, and article ID")

    def resolve_article(self, args, context, info):
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        article_id = args.get('articleID')
        article_key = ndb.Key('Author', author_id, 'Publication', publication_id, 'Article', article_id)
        article = article_key.get()
        return article

    """
    Endpoint for getting a list of articles
    -> currently simply returns all articles
    """
    articles = graphene.List(lambda: ArticleSchema, order = graphene.String())
    def resolve_articles(self, args, context, info): 
        return Article.query()

    """
    Endpoint for getting a list of publications
    -> currently returns all publications
    """
    publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, args, context, info):
        return Publication.query()


"""
Mutations
"""
class CreatePerson(graphene.Mutation):
    class Input:
        name = graphene.String()

    ok = graphene.Boolean()
    person = graphene.Field(lambda: Person)

    def mutate(self, args, context, info):
        person = Person(name=args.get('name'))
        ok = True
        return CreatePerson(person=person, ok=ok)

class UpdateArticle(graphene.Mutation):
    class Input:
        authorID = graphene.String()
        publicationID = graphene.String()
        articleID = graphene.String()
        title = graphene.String()

    # the return value(s) fro this mutation, in this case the update article
    article = graphene.Field(ArticleSchema)

    def mutate(self, args, context, info):
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        article_id = args.get('articleID')
        title = args.get('title')

        article = ndb.Key('Author', author_id, 'Publication', publication_id, 'Article', article_id).get()
        # perform update here

        article.title = title
        article.put()
        # return a proper article
        print article
        return UpdateArticle(article = article)


class Person(graphene.ObjectType):
    name = graphene.String()

class Mutation(graphene.ObjectType):
    create_person = CreatePerson.Field()
    update_article = UpdateArticle.Field()
        

schema = graphene.Schema(query=Query, mutation=Mutation) #, mutation=Mutation

"""
GraphQL Endpoint
"""
class GraphQLEndpoint(RequestHandler):
    def get(self):
        """
        Renders the GraphiQL IDE, populated with a query if it exists
        """
        query = self.request.GET.get('query')
        # this does shit all, but might be useful later
        # res = urllib.unquote(query).decode()
        
        template = ninja.get_template('graphiql.html')
        template_values = {
            'query': query 
        }
        # hack for un-quoting double quotes like these " 
        output = template.render(template_values).replace('&#34;', '"')
        self.response.write(output)

    @cross_origin
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


"""
Data...
"""
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
    
    article2 = Article(
        id="on-being-awesome",
        parent = publication_key,
        title="On being awesome",
        teaser ="a primer that will change your life"
    ).put()


"""
Endpoints!
"""
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



app = webapp2.WSGIApplication(
    [
        ('/', Home),
        ('/reset', ResetEndpoint),
        ('/data', DataEndpoint),
        ('/graphql', GraphQLEndpoint)
    ], debug = True
)