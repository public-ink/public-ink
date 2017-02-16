from google.appengine.ext import vendor
import sys

vendor.add('lib')
vendor.add('models')

sys.path[0:0] = ['lib']
sys.path[0:0] = ['models']


"""
From shell:
> sys.path[0:0] = ['lib']
"""