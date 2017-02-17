from google.appengine.ext import ndb


""" author """
class Author(ndb.Model):
    name = ndb.StringProperty()

