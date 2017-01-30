import os
import webapp2
import json
import jinja2
import time

from google.appengine.api import users


"""
from google.appengine.api import images
from google.appengine.ext import ndb
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import blobstore
"""

from author      import AuthorEndpoint, MeEndpoint
from publication import PublicationEndpoint, PublicationsEndpoint
from article     import ArticleEndpoint
from image       import UploadUrl, ImageUploadHandler
from shared      import ninja


class Home(webapp2.RequestHandler):
    def get(self):
        template = ninja.get_template('home.html')
        user = users.get_current_user()
        login_url = users.create_login_url("/")
        template_values = {'login_url': login_url}
        self.response.write(template.render(template_values))


app = webapp2.WSGIApplication([
  # renders the home template, for now
  ('/', Home),
  # Article Endpoint 
  # /author/hoff/publication/atomic-angular/article/how-this-blog-was-made
  (r'/author/(.+)?/publication/(.+)?/article/(.+)?', ArticleEndpoint),
  # Publication Endpoint
  (r'/author/(.+)?/publication/(.+)?', PublicationEndpoint),
  # Author and Me Endpoints
  (r'/author/(.+)?', AuthorEndpoint),

  # here come listing of anythings!
  ('/publications', PublicationsEndpoint),
  ('/me', MeEndpoint),
  
  # here comes the image server!
  # get upload url
  ('/image/upload-url', UploadUrl),
  ('/image/upload', ImageUploadHandler),
  # not implemented
  ('/image/serve', UploadUrl)


], debug=True)