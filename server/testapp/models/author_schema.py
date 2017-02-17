from require import require_publication_schema
import graphene



class AuthorSchema(graphene.ObjectType):
    publication_schema = require_publication_schema()
    name = graphene.String()
    publications = graphene.List(lambda: publication_schema)