from google.appengine.ext import ndb
import graphene

from common import InkModel
from user import User
from article import Article, ArticleSchema
from publication import  Publication, PublicationSchema



class Author(InkModel):
    """
    Represents an author, and is always linked to a User,
    but that relation is not revealed publicly.

    The ID is set by us, e.g. 'hoff', so an author can be retrieved like so:
    nbd.Key('Author', 'hoff').get()

    name is the verbose name, e.g. The Hoff
    """
    ink_user = ndb.KeyProperty(kind=User)
    name = ndb.StringProperty()


class AuthorSchema(graphene.ObjectType):
    """
    The Author Schema in all its glory!
    GOTCHA: this shows up in the docs :)
    """

    name = graphene.String()
    about = graphene.String()

    created = graphene.String()
    updated = graphene.String()

    #posts = graphene.List(lambda: PostSchema, description="jo I write about the  post schema")

    id = graphene.String()
    def resolve_id(self, *args): return self.key.id()

    articles = graphene.List(
        lambda: ArticleSchema,
        order=graphene.String(),
        description="Lists of articles")

    def resolve_articles(self, args, info, context):

        order = args.get('order')
        if order == 'latest':
            return Article.query(ancestor=self.key).order(-Article.created)
        elif order == 'oldest':
            return Article.query(ancestor=self.key).order(Article.created)
        else:
            return Article.query(ancestor=self.key)

    publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, *args): return Publication.query(ancestor=self.key)
