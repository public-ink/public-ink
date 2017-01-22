import webapp2
import json
import jinja2
import os


"""
Request Handler
"""
class RequestHandler(webapp2.RequestHandler):
    """
    A CORS-friendly request handler by
    setting CORS headers on OPTION requests (aka pre-flight)
    """
    def options(self, *arg):
        allow_cors(self)


def allow_cors(request):
    """
    set the appropriate response headers for cross-origin requests
    """
    request.response.headers['Access-Control-Allow-Credentials'] = 'true'
    request.response.headers['Access-Control-Allow-Origin']  = 'http://localhost:4200'
    request.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    request.response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE'

def return_json(handler, data):
    """
    returns JSON
    """
    handler.response.headers['Content-Type'] = 'application/json; charset=utf-8'
    handler.response.out.write(json.dumps(data))

def return_404(handler):
    handler.error(404)
    return_json(handler, {'status': 404, 'message': 'this resouces could not be found, sorry!'})

def return_error(handler, code, message):
    handler.error(code)
    return_json(handler, {'message': message})

"""
Ninja Environment
"""
ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname( __file__ ), 'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)