from google.appengine.ext import vendor
import sys

vendor.add('lib')

"""
for path in ['lib']:
    if path not in sys.path:
        sys.path[0:0] = [path]
"""