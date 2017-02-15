import graphene
import webapp2
import hashlib
import jinja2
import json
import uuid
import os

from google.appengine.ext import ndb
from google.appengine.api import mail

from shared import RequestHandler, cross_origin, hash_password, verify_password

"""
JWT
"""
from datetime import datetime, timedelta
import jwt

JWT_SECRET = 'soverysercret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20


ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class InkModel(ndb.Model):
    """
    A common NDB entity model
    """
    created = ndb.DateTimeProperty(auto_now_add=True)
    updated = ndb.DateTimeProperty(auto_now=True)


class InkUser(InkModel):
    """
    Represents a human being
    The id is automatically set
    """
    email = ndb.StringProperty()
    verification_token = ndb.StringProperty()
    verified_at = ndb.DateTimeProperty()
    password_hash_sha256 = ndb.StringProperty()

    def hash_password_sha256(self, password):
        """
        given a password, hashes it and saves the hash
        """
        salt = uuid.uuid4().hex
        hash = hashlib.sha256(salt.encode() + password.encode()).hexdigest() + ':' + salt
        self.password_hash_sha256 = hash
        self.put()

    def verify_password_sha256(self, password):
        """
        checks if a given password matches the stored password's hash
        """
        hashed_password = self.password_hash_sha256
        password, salt = hashed_password.split(':')
        return password == hashlib.sha256(salt.encode() + password.encode()).hexdigest()

class InkUserSchema(graphene.ObjectType):
    """
    The InkUser schema
    """
    email = graphene.String()


class Author(InkModel):
    """
    Represents an author, and is always linked to an InkUser,
    but that relation is not revealed publicly.

    The ID is set by us, e.g. 'hoff', so an author can be retrieved like so:
    nbd.Key('Author', 'hoff').get()

    name is the verbose name, e.g. The Hoff
    """
    ink_user = ndb.KeyProperty(kind=InkUser)
    name = ndb.StringProperty()


class Author(InkModel):
    """
    Represents an author, and is always linked to an InkUser,
    but that relation is not revealed publicly.

    The ID is set by us, e.g. 'hoff', so an author can be retrieved like so:
    nbd.Key('Author', 'hoff').get()
    """
    ink_user = ndb.KeyProperty(kind=InkUser)
    name = ndb.StringProperty()
    about = ndb.TextProperty()


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
QUERY and schema
"""
class Query(graphene.ObjectType):
    """
    For nexted input, you an Input class
    """

    """ author take an ID """
    author = graphene.Field(
        AuthorSchema,
        id=graphene.String(),
        description="Information about an author, given the author ID")

    def resolve_author(self, args): #, context, info
        """ returns and author instance from given argument """
        author_id = args.get('author_id')
        author_key = ndb.Key('Author', id)
        author = author_key.get()
        return author

    """
    Publication takes an authorID and publicationID
    """
    publication = graphene.Field(
        PublicationSchema,
        authorID=graphene.String(),
        publicationID=graphene.String(),
        description="Information about a publication, given autor ID and publication ID")

    def resolve_publication(self, args):
        """ resolves a publication from arguments """
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        publication_key = ndb.Key('Author', author_id, 'Publication', publication_id)
        publication = publication_key.get()
        return publication

    """
    Article take an authorID, a publicationID, and articleID
    """
    article = graphene.Field(
        ArticleSchema,
        authorID=graphene.String(),
        publicationID=graphene.String(),
        articleID=graphene.String(),
        description="Information about an article, given autor ID, publication ID, and article ID")

    def resolve_article(self, args):
        """ resolves and article from arguments """
        author_id = args.get('authorID')
        publication_id = args.get('publicationID')
        article_id = args.get('articleID')
        article_key = ndb.Key(
            'Author', author_id,
            'Publication', publication_id,
            'Article', article_id)
        article = article_key.get()
        return article

    """
    Endpoint for getting a list of articles
    -> currently simply returns all articles
    """
    articles = graphene.List(lambda: ArticleSchema, order=graphene.String())
    def resolve_articles(self, args, context, info):
        """ returns all articles, currently """
        return Article.query()

    """
    Endpoint for getting a list of publications
    -> currently returns all publications
    """
    publications = graphene.List(lambda: PublicationSchema)
    def resolve_publications(self, args, context, info):
        return Publication.query()


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

class CreateInkUser(graphene.Mutation):

    class Input:
        email = graphene.String()
        password = graphene.String()

    jwt = graphene.String()

    def mutate(self, args, context, info):
        email = args.get('email')
        password = args.get('password')

        # duplicate check
        exisiting = ndb.Key('InkUser', email).get()
        if exisiting:
            return CreateInkUser(jwt='dup email! no token!')

        else:
            """ new signup """
            password_hash = hash_password(password)
            # this should move to classmethod on InkUser
            verification_token = uuid.uuid4().hex
            ink_user = InkUser(
                id=email,
                email=email,
                verification_token=verification_token,
                password_hash_sha256=password_hash)
            ink_user.put()

            """make a token! """
            payload = {
                'email': ink_user.email,
                'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
            }
            jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
            token_str = jwt_token.decode('utf-8')

            """ send email """
            message = mail.EmailMessage(
                sender="auth@public-ink.appspotmail.com",
                subject="Public.Ink Verification")

            message.to = "micklinghoff@gmail.com"
            message.body = """Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, let follow this link:
https://public.ink/verify?email=micklinghoff@gmail.com&token=xyzToken

Awesome!
            """
            message.send()

            return CreateInkUser(jwt=token_str)



"""
Our Mutation Collection
"""
class Mutation(graphene.ObjectType):
    update_article = UpdateArticle.Field()
    createInkUser = CreateInkUser.Field()

""" The Schema """
schema = graphene.Schema(query=Query, mutation=Mutation)


"""
GraphQL Endpoint
"""
class GraphQLEndpoint(RequestHandler):
    def get(self):
        """
        Renders the GraphiQL IDE, populated with a query if it exists
        """
        query = self.request.GET.get('query')
        # this does shit all, but might be useful later
        # res = urllib.unquote(query).decode()

        template = ninja.get_template('graphiql.html')
        template_values = {
            'query': query
        }
        # hack for un-quoting double quotes like these "
        output = template.render(template_values).replace('&#34;', '"')
        self.response.write(output)

    @cross_origin
    def post(self):
        """
        Accepts a query, executes it, and returns the result
        """
        data = json.loads(self.request.body)
        query = data.get('query', '')
        variables = data.get('variables')
        result = schema.execute(query, variable_values=variables)
        response = {'data' : result.data}
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))


"""
Data...
"""
def reset_data():
    users = InkUser.query().fetch()
    authors = Author.query().fetch()
    publications = Publication.query().fetch()
    articles = Article.query().fetch()
    for entity in users + authors + publications + articles:
        entity.key.delete()

    author_slug = 'hoffer'
    publication_slug = 'atomic-angular'
    article_slug = 'how-public-ink-was-made'

    author = Author(
        id=author_slug,
        name='Hoff',
        about='the man!')
    author_key = author.put()

    publication = Publication(
        id=publication_slug,
        parent=author_key,
        name='Atomic Angular',
        about='a wonderful publication')
    publication_key = publication.put()

    article = Article(
        id=article_slug,
        parent=publication_key,
        title='How public.ink was made',
        body='{"ops":[{"insert":"such body\n"}]}'
    )
    article_key = article.put()

    article2 = Article(
        id="on-being-awesome",
        parent=publication_key,
        title="On being awesome",
        body='{"ops":[{"insert":"such legs\n"}]}'
    ).put()



import time
class ResetEndpoint(webapp2.RequestHandler):
    def get(self):
        reset_data()
        time.sleep(2)
        authors = Author.query()
        publications = Publication.query().fetch()
        articles = Article.query().fetch()
        template = ninja.get_template('templates/data.html')
        data = {
            'authors': authors,
            'publications': publications,
            'articles': articles
        }
        self.response.write(template.render(data))

class DataEndpoint(webapp2.RequestHandler):
    def get(self):
        template = ninja.get_template('templates/data.html')
        data = {
            'authors': Author.query(),
            'publications': Publication.query(),
            'articles': Article.query()
        }
        self.response.write(template.render(data))


class HomeEndpoint(webapp2.RequestHandler):
    def get(self):
        pw = 'mega'
        hashed_pw = hash_password(pw)

        verified = verify_password(hashed_pw, pw)

        ink_users = InkUser.query().fetch()
        user_count = len(ink_users)
        print user_count

        template = ninja.get_template('home.html')
        template_values = {
            'hash': hashed_pw,
            'verified': verified,
            'ink_users': ink_users
        }
        output = template.render(template_values)
        return self.response.write(output)



"""
Routing
"""

app = webapp2.WSGIApplication(
    [
        ('/', HomeEndpoint),
        ('/reset', ResetEndpoint),
        ('/data', DataEndpoint),
        ('/graphql', GraphQLEndpoint)
    ], debug=True
)
