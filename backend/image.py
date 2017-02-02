import webapp2
from google.appengine.ext import blobstore
from google.appengine.api import images
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.ext.webapp import blobstore_handlers

from shared import return_json, RequestHandler, allow_cors, return_error, cross_origin

"""
UserImage: An image uploaded by an author
"""
class UserImage(ndb.Model):
    # id set by us: filename
    blob_key = ndb.BlobKeyProperty()
    uploaded_when = ndb.DateTimeProperty(auto_now_add=True)
    user_id = ndb.StringProperty()
    email = ndb.StringProperty()
    #width = ndb.IntegerProperty()
    #height = ndb.IntegerProperty()

    def url(self):
        return images.get_serving_url(self.blob_key)

    def data(self):
        return {
            'url': images.get_serving_url(self.blob_key),
            'id': self.key.id()
        }


class UserImageEndpoint(RequestHandler):
    """
    returns a list of the users images
    todo: better code for not-authed
    """
    @cross_origin
    def get(self):
        user = users.get_current_user()
        if not user:
            return_error(self, 403, 'you need to be authenticated in order to load images')
            return
        user_images = UserImage.query(UserImage.user_id == user.user_id()).fetch()
        image_list = []
        for user_image in user_images:
            image_list.append(user_image.data())
        return_json(self, image_list)


class UploadUrl(RequestHandler):
    def get(self):
        #todo: make URL const
        allow_cors(self)
        upload_url = blobstore.create_upload_url('/image/upload')
        return_json(self, {'url': upload_url })


class ImageUploadHandler(blobstore_handlers.BlobstoreUploadHandler):
    """
    upload image endpoint (only works with post)
    """
    def post(self):
        # works!
        allow_cors(self)
        user = users.get_current_user()
        if not user:
            return_error(self, 401, 'You need to be logged in to upload images...')
            return
        try:
            upload = self.get_uploads()[0]
            user_image = UserImage(
                user_id = user.user_id(),
                email = user.email(),
                blob_key=upload.key(),
                id = upload.filename
            )
            user_image.put()
            return_json(self, user_image.data())

        except Exception, e:
            print str(e)
            self.error(500)

    def options(self):
        allow_cors(self)

