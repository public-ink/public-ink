import webapp2
from google.appengine.ext import blobstore
from google.appengine.api import images
from google.appengine.api import users
from google.appengine.ext import ndb
from google.appengine.ext.webapp import blobstore_handlers

from shared import return_json, RequestHandler, allow_cors

"""
UserImage: An image uploaded by an author
"""
class UserImage(ndb.Model):
    # id set by us: filename
    blob_key = ndb.BlobKeyProperty()
    uploaded_when = ndb.DateTimeProperty(auto_now_add=True)
    #width = ndb.IntegerProperty()
    #height = ndb.IntegerProperty()

    def url(self):
        return images.get_serving_url(self.blob_key)


class UploadUrl(RequestHandler):
    def get(self):
        #todo: make URL const
        allow_cors(self)
        upload_url = blobstore.create_upload_url('/image/upload')
        return_json(self, {'url': upload_url })


class ImageUploadHandler(blobstore_handlers.BlobstoreUploadHandler):
    """
    consider changing to put
    """
    def post(self):
        # works!
        self.response.headers.add('Access-Control-Allow-Origin', '*')
        try:
            upload = self.get_uploads()[0]
            user_image = UserImage(
                blob_key=upload.key(),
                id = upload.filename
            )
            user_image.put()
            return_json(self, {'status': 'success' })

        except Exception, e:
            print str(e)
            self.error(500)

