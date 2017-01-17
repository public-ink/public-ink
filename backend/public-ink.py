import os
import webapp2
import json
import jinja2
import time

"""
from slugify import slugify
from google.appengine.api import images
from google.appengine.api import users 
from google.appengine.ext import ndb
from google.appengine.ext.webapp import blobstore_handlers
from google.appengine.ext import blobstore
"""

from author  import AuthorEndpoint
from blog    import BlogEndpoint
from article import ArticleEndpoint
from shared  import ninja


class Home(webapp2.RequestHandler):
    def get(self):
        template = ninja.get_template('home.html')
        template_values = {}
        self.response.write(template.render(template_values))


app = webapp2.WSGIApplication([
  ('/', Home),
  ('/author', AuthorEndpoint),
  ('/blog', BlogEndpoint),
  ('/article', ArticleEndpoint)
  # the unique identifier for a blog
  #(r'/author/(.+)?/blog/(.+)?', AuthorEndpoint),
], debug=True)