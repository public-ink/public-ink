import sys
from google.appengine.ext import vendor

vendor.add('lib')


"""
From shell:
> sys.path[0:0] = ['lib']

to install:
pip install -t lib -r requirements.txt
"""