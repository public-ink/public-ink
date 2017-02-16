from google.appengine.ext import vendor

vendor.add('lib')
vendor.add('models')


"""
From shell:
> sys.path[0:0] = ['lib']
"""