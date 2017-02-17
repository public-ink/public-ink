import webapp2
from google.appengine.ext import ndb
import graphene





""" QUERY """
class Query(graphene.ObjectType):
    author = graphene.Field(AuthorSchema)
    publication = graphene.Field(PublicationSchema)



class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        return self.response.write('mega')

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
    ], debug=True
)