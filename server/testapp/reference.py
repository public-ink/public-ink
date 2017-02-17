import webapp2
from google.appengine.ext import ndb
import graphene

# imports 
from user import User

""" author """
class Author(ndb.Model):
    name = ndb.StringProperty()

class AuthorSchema(graphene.ObjectType):
    name = graphene.String()
    articles = graphene.List(lambda: ArticleSchema)


""" publication """
class Publication(ndb.Model):
    name = ndb.StringProperty()

class PublicationSchema(graphene.ObjectType):
    name = graphene.String()
    author = graphene.Field(AuthorSchema)
    articles = graphene.List(lambda: ArticleSchema)

""" article """
class Article(ndb.Model):
    name = ndb.StringProperty()

class ArticleSchema(graphene.ObjectType):
    name = graphene.String()
    author = graphene.Field(AuthorSchema)
    publication = graphene.Field(PublicationSchema)



""" QUERY """
class Query(graphene.ObjectType):
    author = graphene.Field(AuthorSchema)
    publication = graphene.Field(PublicationSchema)
    article = graphene.Field(ArticleSchema)




class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        return self.response.write('mega')

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
    ], debug=True
)