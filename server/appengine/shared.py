import webapp2
import datetime
import json
import jinja2
import os
import uuid
import hashlib
from google.appengine.ext import ndb
from google.appengine.api import users


"""
Environment
"""
if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    ENV_NAME = 'production'
    BACKEND_URL = 'https://www.public.ink'
    FRONTEND_URL = 'https://www.public.ink'
    ALLOW_ORIGIN = BACKEND_URL
else:
    ENV_NAME = 'develop'

    BACKEND_URL = 'http://localhost:8080'
    FRONTEND_URL = 'http://localhost:4200'
    """
    When the above settings are actice, run:

    dev_appserver.py .
    ng serve
    """
    
    #BACKEND_URL = 'http://192.168.0.103:8080'
    #FRONTEND_URL = 'http://192.168.0.103:4200' 
    """
    When the above settings are active, run these two:
    
    dev_appserver.py . --host 192.168.0.103
    ng serve --host 192.168.0.103

    and change the backendHost in environment.ts to 192.168.0.103
    """
    
    ALLOW_ORIGIN = '*'


"""
Unix Epoch Helper
"""

zero = datetime.datetime.utcfromtimestamp(0)
def epoch(dt):
    if not dt:
        return 0
    return int((dt - zero).total_seconds() * 1000)


"""
Decorators
"""
def cross_origin(fn):
    """
    Generic decorators to allow CORS requests
    use as decorator like so:

    @cross_origin
    def get(self, any_arg):
        pass
    """
    def decorated_request(*args):
        allow_cors(args[0])
        return fn(*args)
    return decorated_request

# this will be different with jwt!
# but a decorator is actually pretty good.
def owner_required(fn):
    """
    Generic decorator that guards against unauthorized access.
    Works and any request which has the author_id as its second argument.

    @owner_required
    def post(self, user_id, other_id):
        pass
    """
    def decorated_request(*args):
        request = args[0]
        user = users.get_current_user()
        if not user:
            request.error(401)
            request.response.write("You don't have permission to alter this resource.")
            return
        author_id = args[1]
        author = ndb.Key('Author', author_id).get()
        author_email = author.email
        if author_email == users.get_current_user().email() or users.is_current_user_admin():
            return fn(*args)
        else:
            request.error(401)
            request.response.write("You don't have permission to alter this resource.")
            return
    return decorated_request


def login_required(fn):
    """
    Generic decorator that guards resources from non-authenticated requests

    @login_required
    def put(self, whathaveyou):
        pass
    """
    def decorated_request(*args):
        user = users.get_current_user()
        if user:
            return fn(*args)
        else:
            request = args[0]
            return_error(request, 401, "You need to be logged in to perfom this request")
            return
    return decorated_request


"""
Request Handler Replacement
"""

class RequestHandler(webapp2.RequestHandler):
    """
    A CORS-friendly request handler
    It simply sets CORS headers on OPTION requests (aka pre-flights)
    """
    def options(self, *arg):
        allow_cors(self)


"""
Helper Functions
"""

def allow_cors(request):
    """
    set the appropriate response headers for cross-origin requests
    """
    request.response.headers['Access-Control-Allow-Credentials'] = 'true'
    request.response.headers['Access-Control-Allow-Origin']  = ALLOW_ORIGIN
    request.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    request.response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE'


def return_json(handler, data):
    """
    returns JSON
    """
    handler.response.headers['Content-Type'] = 'application/json; charset=utf-8'
    handler.response.out.write(json.dumps(data))


def return_error(handler, code, message):
    """
    Returns an error with a given code and message
    """
    handler.error(code)
    handler.response.out.write(message)


"""
Ninja Environment
"""
ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname( __file__ ), 'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


