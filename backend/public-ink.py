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

from author  import AuthorEndpoint, MeEndpoint
from blog    import BlogEndpoint
from article import ArticleEndpoint
from shared  import ninja


class Home(webapp2.RequestHandler):
    def get(self):
        template = ninja.get_template('home.html')
        user = users.get_current_user()
        login_url = users.create_login_url("/")
        template_values = {'login_url': login_url}
        self.response.write(template.render(template_values))


app = webapp2.WSGIApplication([
  ('/', Home),
  (r'/author/(.+)?', AuthorEndpoint),
  ('/me', MeEndpoint),
  #('/author', AuthorEndpoint),
  ('/blog', BlogEndpoint),
  ('/article', ArticleEndpoint)
  # the unique identifier for a blog
  #(r'/author/(.+)?/blog/(.+)?', AuthorEndpoint),
], debug=True)