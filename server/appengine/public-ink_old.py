import graphene
import webapp2
import hashlib
import jinja2
import json
import uuid
import os


from google.appengine.ext import ndb
#from models.author import AuthorSchema

from models.user import User, CreateUser
from models.author import Author
from models.publication import Publication#, PublicationSchema
from models.article import Article# , ArticleSchema#, UpdateArticle

from endpoints.graphql import GraphQLEndpoint
from models.require import require_author_schema, require_article_schema


from shared import RequestHandler, cross_origin, ninja
# hash_password, verify_password,



"""
QUERY and schema
"""
class Query(graphene.ObjectType):
    """
    For nexted input, you an Input class
    """

    """ author take an ID """

    AuthorSchema = require_author_schema()
    ArticleSchema = require_article_schema()

    author = graphene.Field(
        AuthorSchema,
        id=graphene.String(),
        description="Information about an author, given the author ID")

    def resolve_author(self, args): #, context, info
        """ returns and author instance from given argument """
        author_id = args.get('author_id')
        author_key = ndb.Key('Author', id)
        author = author_key.get()
        return author

    """
    Publication takes an authorID and publicationID
    """
    '''publication = graphene.Field(
        PublicationSchema,
        authorID=graphene.String(),
        publicationID=graphene.String(),
        description="Information about a publication, given autor ID and publication ID")

    def resolve_publication(self, args):
        """ resolves a publication from arguments """
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        publication_key = ndb.Key('Author', author_id, 'Publication', publication_id)
        publication = publication_key.get()
        return publication'''

    """
    Article take an authorID, a publicationID, and articleID
    """
    article = graphene.Field(
        ArticleSchema,
        authorID=graphene.String(),
        publicationID=graphene.String(),
        articleID=graphene.String(),
        description="Information about an article, given autor ID, publication ID, and article ID")

    def resolve_article(self, args):
        """ resolves and article from arguments """
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        article_id = args.get('articleID')
        article_key = ndb.Key(
            'Author', author_id,
            'Publication', publication_id,
            'Article', article_id)
        article = article_key.get()
        return article

    """
    Endpoint for getting a list of articles
    -> currently simply returns all articles
    """
    articles = graphene.List(lambda: ArticleSchema, order=graphene.String())
    def resolve_articles(self, args, context, info):
        """ returns all articles, currently """
        return Article.query()

    """
    Endpoint for getting a list of publications
    -> currently returns all publications
    """
    '''publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, args, context, info):
        return Publication.query()'''


"""
Our Mutation Collection
"""
class Mutation(graphene.ObjectType):
    #update_article = UpdateArticle.Field()
    createInkUser = CreateUser.Field()

""" The Schema """
schema = graphene.Schema(query=Query, mutation=Mutation)


"""
GraphQL Endpoint
"""



"""
Data...
"""
def reset_data():
    users = User.query().fetch()
    authors = Author.query().fetch()
    publications = Publication.query().fetch()
    articles = Article.query().fetch()
    for entity in users + authors + publications + articles:
        entity.key.delete()

    author_slug = 'hoffer'
    publication_slug = 'atomic-angular'
    article_slug = 'how-public-ink-was-made'

    author = Author(
        id=author_slug,
        name='Hoff',
        about='the man!')
    author_key = author.put()

    publication = Publication(
        id=publication_slug,
        parent=author_key,
        name='Atomic Angular',
        about='a wonderful publication')
    publication_key = publication.put()

    article = Article(
        id=article_slug,
        parent=publication_key,
        title='How public.ink was made',
        body='{"ops":[{"insert":"such body\n"}]}'
    )
    article_key = article.put()

    article2 = Article(
        id="on-being-awesome",
        parent=publication_key,
        title="On being awesome",
        body='{"ops":[{"insert":"such legs\n"}]}'
    ).put()



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


class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        """
        pw = 'mega'
        hashed_pw = hash_password(pw)

        verified = verify_password(hashed_pw, pw)


        user_count = len(users)
        print user_count


        template_values = {
            'hash': hashed_pw,
            'verified': verified,
            'ink_users': users
        }
        """

        #users = User.query().fetch()
        template_values = {
            #'ink_users': users
        }
        template = ninja.get_template('home.html')
        output = template.render(template_values)
        return self.response.write(output)



"""
Routing
"""

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
        ('/reset', ResetEndpoint),
        ('/data', DataEndpoint),
        ('/graphql', GraphQLEndpoint)
    ], debug=True
)
