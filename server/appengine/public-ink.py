import webapp2

class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        return self.response.write('public.ink')

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
    ], debug = True
)