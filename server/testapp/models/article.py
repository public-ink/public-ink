from google.appengine.ext import ndb


""" article """
class Article(ndb.Model):
    name = ndb.StringProperty()

