from google.appengine.ext import vendor
import sys

vendor.add('lib')

"""
for path in ['lib']:
    if path not in sys.path:
        sys.path[0:0] = [path]


in interactive shell:

import sys
sys.path[0:0] = ['lib']

from passlib.hash import argon2
h = argon2.hash("password")

ink_user = InkUser(email='hoff@hoff.com')
ink_user_key = ink_user.put()

author = Author(parent = ink_user_key, id='meister-author' name='Meister Author')
author_key = author.put()

# can I now still access my author with: no!
jo = ndb.Key('Author', 'meister-author').get()
print jo

"""



