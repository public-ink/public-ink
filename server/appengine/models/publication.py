from google.appengine.ext import ndb
from common import InkModel
import graphene


from require import require_article_schema, require_author_schema
from article import Article


class Publication(InkModel):
    """
    Represents a publication, which belongs to an author
    The ID is set by us, e.g. 'atomic-angular', so a publication can be retrieved like so:
    ndb.Key('Author', 'hoff', 'Publication', 'atomic-angular').get()
    """
    name = ndb.StringProperty()
    about = ndb.TextProperty()


class PublicationSchema(graphene.ObjectType):
    """
    The publication schema
    """
    ArticleSchema = require_article_schema()
    AuthorSchema = require_author_schema()

    name = graphene.String()
    about = graphene.String()

    created = graphene.String()
    updated = graphene.String()

    id = graphene.String()
    def resolve_id(self, *args): return self.key.id()

    author = graphene.Field(AuthorSchema)
    def resolve_author(self, *args): return self.key.parent().get()

    """
    'articles' is  custom field, with 'order' input. If input gets complex you can do
    order = graphene.InputField(lambda: OrderInput)
    """
    articles = graphene.List(lambda: ArticleSchema, order = graphene.String())
    def resolve_articles(self, args, context, info):
        return Article.query(ancestor = self.key)

