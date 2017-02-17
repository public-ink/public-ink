import graphene
from require import require_author_schema, require_article_schema


class PublicationSchema(graphene.ObjectType):
    AuthorSchema = require_author_schema
    ArticleSchema = require_article_schema

    name = graphene.String()
    author = graphene.Field(AuthorSchema)
    articles = graphene.List(lambda: ArticleSchema)