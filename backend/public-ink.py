import os
import webapp2
import json
import jinja2
import time

from google.appengine.ext import ndb
from google.appengine.api import users


"""
from google.appengine.api import images
from google.appengine.ext import ndb
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import blobstore
"""

from author      import AuthorEndpoint, MeEndpoint, WhoAmIEndpoint
from publication import PublicationEndpoint, PublicationsEndpoint
from article     import ArticleEndpoint
from comment     import CommentEndpoint
from image       import UploadUrl, ImageUploadHandler, UserImageEndpoint
from shared      import ninja


class Home(webapp2.RequestHandler):
    def get(self):
        template = ninja.get_template('home.html')
        user = users.get_current_user()
        login_url = users.create_login_url('/')
        logout_url = users.create_logout_url('/')
        template_values = {
          'login_url': login_url,
          'logout_url': logout_url
        }
        self.response.write(template.render(template_values))

class StyleEndpoint(webapp2.RequestHandler):
    def get(self):
        content_width = 700
        template = ninja.get_template('style.css')
        template_values = {
          'content_width': content_width
        }
        self.response.write(template.render(template_values))


"""
Graphene Test Ride
"""



"""
class Author(ndb.Model):
    name = ndb.StringProperty()

class Article(ndb.Model):
    headline = ndb.StringProperty()
    summary = ndb.TextProperty()
    text = ndb.TextProperty()

    author_key = ndb.KeyProperty(kind='Author')

    created_at = ndb.DateTimeProperty(auto_now_add=True)
    updated_at = ndb.DateTimeProperty(auto_now=True)
"""

import graphene
from graphene_gae import NdbObjectType
#schema = graphene.Schema(query=Query)
from schema import schema
from shared import return_json, cross_origin, allow_cors, RequestHandler
import json

schema

from data import initialize



class GraphQLEndpoint(RequestHandler):

    @cross_origin
    def post(self):
        data = json.loads(self.request.body)
        query = data.get('query', '')
        result = schema.execute(query)
        response = {}
        response['data'] = result.data
        print "executed Query!!"
        return_json(self, response)

    @cross_origin
    def get(self):
        allow_cors(self)
        xquery = '''
        query RebelsShipsQuery {
            rebels {
                name,
                hero {
                    name
                }
            ships(first: 2) {
                edges {
                    node {
                        name
                    }
                }
            }
            }
        }
        '''
        xquery = ''
        xquery = self.request.GET.get('query', '')
        xquery = 'rebels {name}'
        xquery = """
        {
            rebels {
                name,
                hero {
                    name
                }
            }
        }
        """
        #query = "query test { rebels { name, hero { name }}}"
        query = self.request.GET.get('query', '')
        result = schema.execute(query)
        print "executed Query!!"
        return_json(self, result.data)


app = webapp2.WSGIApplication([
# new style
  ('/graphql', GraphQLEndpoint),

  # renders the home template, for now
  ('/', Home),
  # Comment Endpoint
  (r'/author/(.+)?/publication/(.+)?/article/(.+)?/comment/(.+)?', CommentEndpoint),
  # Article Endpoint 
  # /author/hoff/publication/atomic-angular/article/how-this-blog-was-made
  (r'/author/(.+)?/publication/(.+)?/article/(.+)?', ArticleEndpoint),
  # Publication Endpoint
  (r'/author/(.+)?/publication/(.+)?', PublicationEndpoint),
  # Author and Me Endpoints
  (r'/author/(.+)?', AuthorEndpoint),

  # here come listing of anythings!
  ('/publications', PublicationsEndpoint),
  # who am I
  ('/whoami', WhoAmIEndpoint),
  
  ('/me', MeEndpoint),
  
  # here comes the image server!
  # get upload url
  ('/image/upload-url', UploadUrl),
  ('/image/upload', ImageUploadHandler),
  # not implemented
  ('/image/serve', UploadUrl),
  # GET user images
  ('/userimage', UserImageEndpoint)


], debug=True)


"""
Tip: An easy way to restrict access to a part of your application 
to signed in users is to use the login: required configuration element 
for the URL handler. See Configuring an App.
"""