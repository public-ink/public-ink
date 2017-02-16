from common import InkModel
import graphene


class Article(InkModel):
    """
    Represents an article, which belongs to an author
    The ID is set by us, e.g. 'how-public-ink-was-made', so an article can be retrieved like so:
    ndb.Key('Author', 'hoff', 'Publication', 'atomic-angular', 'Article', 'how-public-ink-was-made').get()
    """
    title = ndb.StringProperty()
    teaser = ndb.TextProperty()
    body = ndb.TextProperty()


class ArticleSchema(graphene.ObjectType):
    """ The Schema / Type Definition of an Article """
    """ GOTCHA: self refers to the actual Article instance """

    #order = graphene.InputField(AuthorSchema)

    id = graphene.String()
    def resolve_id(self, *args): return self.key.id()

    title = graphene.String()
    #remove
    teaser = graphene.String()
    body = graphene.String()

    created = graphene.String()
    updated = graphene.String()

    """ related """
    publication = graphene.Field(PublicationSchema)
    def resolve_publication(self, *args): return self.key.parent().get()

    author = graphene.Field(AuthorSchema)
    def resolve_author(self, args, context, info):
        publication = self.key.parent().get()
        author = publication.key.parent().get()
        return author

"""
Mutations
"""
class UpdateArticle(graphene.Mutation):
    class Input:
        # identification
        authorID = graphene.String()
        publicationID = graphene.String()
        articleID = graphene.String()
        #content
        title = graphene.String()
        body = graphene.String()

    # the return value(s) fro this mutation, in this case the updated article
    article = graphene.Field(ArticleSchema)

    def mutate(self, args, context, info):
        print 'mutate!'
        # get article
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        article_id = args.get('articleID')
        article = ndb.Key(
            'Author', author_id,
            'Publication', publication_id,
            'Article', article_id).get()
        # perform update here
        article.title = args.get('title', 'no title sent!')
        article.body = args.get('body', '{"ops":[{"insert":"no body sent!\n"}]}')
        article.put()
        return UpdateArticle(article=article)