import graphene

from require import require_author_schema, require_publication_schema




class ArticleSchema(graphene.ObjectType):
    AuthorSchema = require_author_schema
    PublicationSchema = require_publication_schema

    name = graphene.String()
    author = graphene.Field(AuthorSchema)
    publication = graphene.Field(PublicationSchema)


