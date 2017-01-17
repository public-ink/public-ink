import os
import webapp2
import json
import jinja2
import time
#from slugify import slugify

from google.appengine.api import images
from google.appengine.api import users 
from google.appengine.ext import ndb
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import blobstore

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Home(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/home.html')
        template_values = {}
        self.response.write(template.render(template_values))

app = webapp2.WSGIApplication([
  ('/', Home),
  # the unique identifier for a blog
  #(r'/author/(.+)?/blog/(.+)?', AuthorEndpoint),
], debug=True)