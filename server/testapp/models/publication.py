from google.appengine.ext import ndb


""" publication """
class Publication(ndb.Model):
    name = ndb.StringProperty()

