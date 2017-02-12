from google.appengine.ext import ndb
import json
import os
import webapp2
import graphene
from graphene import relay, resolve_only_args
from graphene_gae import NdbObjectType, NdbConnectionField

import jinja2


ninja = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname( __file__ ))),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

"""
Our NDB models
"""

class Author(ndb.Model):
    name = ndb.StringProperty(default="hoff")

class Article(ndb.Model):
    title = ndb.StringProperty(default="such title")
    author_key = ndb.KeyProperty(kind=Author)

""" from demo, working """
class CharacterModel(ndb.Model):
    name = ndb.StringProperty()

    def __str__(self):
        return self.name


class FactionModel(ndb.Model):
    name = ndb.StringProperty()
    hero_key = ndb.KeyProperty(kind=CharacterModel)

    def __str__(self):
        return self.name


class ShipModel(ndb.Model):
    name = ndb.StringProperty()
    faction_key = ndb.KeyProperty(kind=FactionModel)

    def __str__(self):
        return self.name

"""
Our GraphQL schema
"""
class ArticleType(NdbObjectType):
    class Meta:
        model = Article

class AuthorType(NdbObjectType):
    class Meta:
        model = Author
        interfaces = (relay.Node,)

    

class Boat(NdbObjectType):
    class Meta:
        model = ShipModel
        """
        If I'm not giving the below interfaces, I get
        AssertionError: NdbConnectionField type have to be a subclass of Connection. Received "Boat".
        """
        interfaces = (relay.Node,)


"""
Demo stuff below
"""       

class Ship(NdbObjectType):
    class Meta:
        model = ShipModel
        description = "Jo SHip motherfucker!"
        interfaces = (relay.Node,)




class Character(NdbObjectType):
    class Meta:
        model = CharacterModel
        interfaces = (relay.Node,)


class Faction(NdbObjectType):
    class Meta:
        model = FactionModel
        interfaces = (relay.Node,)

    ships = NdbConnectionField(Ship)

    def resolve_ships(self, *_):
        return ShipModel.query().filter(ShipModel.faction_key == self.key)


class IntroduceShip(relay.ClientIDMutation):
    class Input:
        ship_name = graphene.String(required=True)
        faction_id = graphene.String(required=True)

    ship = graphene.Field(Ship)
    faction = graphene.Field(Faction)

    @classmethod
    def mutate_and_get_payload(cls, input, context, info):
        ship_name = input.get('ship_name')
        faction_id = input.get('faction_id')
        faction_key = ndb.Key(FactionModel, faction_id)
        ship = create_ship(ship_name, faction_key)
        faction = faction_key.get()
        return IntroduceShip(ship=ship, faction=faction)


""" NDB Models """

class Writer(ndb.Model):
    # Id is set by us, e.g. hoff, so ndb.Key('Writer', 'hoff).get() is how you find this
    name = ndb.StringProperty(default="Hoffi")
    age = ndb.IntegerProperty(default=36)

class Publication(ndb.Model):
    # id is set by us, e.g. 'atomic-angular', so ndb.Key('Writer', 'hoff', Publication', 'atomic-angular') is how you find me
    name = ndb.StringProperty()
    teaser = ndb.StringProperty()

class Post(ndb.Model):
    # Id is set by us, e.g. 'awesome', so you can do ndb.key('Writer', 'hoff', 'Post', 'awesome)
    title = ndb.StringProperty(default="mega post")


""" Schemas / Types Definitions """

class WriterSchema(graphene.ObjectType):
    name = graphene.String()
    age = graphene.Int()
    posts = graphene.List(lambda: PostSchema, description="jo I write about the awesome post schema")

class PublicationSchema(graphene.ObjectType):
    """
    The purpose of this schema is to allow queries to give use everything on Publication
    AND everything related
    """
    name = graphene.String()
    writer = graphene.Field(lambda: WriterSchema)
    
    def resolve_writer(self, *args):
        """
        currently, we're creating a writer on the fly, just 'find' a Writer
        instead, we need to acceot an argument
        """
        writer = ndb.Key('Writer', 'hoff').get()

    def resolve_publication(self, *args):
        pub = ndb.Key('')

class PostSchema(graphene.ObjectType):
    title = graphene.String()
    writer = graphene.Field(lambda: WriterSchema)
    publication = graphene.Field(lambda: PublicationSchema)

    def resolve_writer(self, *args):
        """
        returns a Writer Instance, which is typed in WriterSchema
        this allows traversing up, and down
        """
        writer = ndb.Key(Writer, 'hoff').get()
        return writer

    def resolve_publication(self, *args):
        """
        Returns a Publication Instance
        """
        return ndb.Key(Publication)




class Query(graphene.ObjectType):
    post = graphene.Field(PostSchema, description="got posts?")
    writer = graphene.Field(WriterSchema, description="this query gives you a writer")
    publication = graphene.Field(PublicationSchema, description="All the things I can give jo?")

    def resolve_post(self, *args):
        writer = Writer(id='hoff', name = "superhoff").put()
        return Post(parent = writer).put().get()

    def resolve_writer(self, args, context, info):
        writer = Writer(name = "revolver", age=5).put()
        return writer.get()




    @resolve_only_args
    def resolve_authors(self):
        return ShipModel.query()

    @resolve_only_args
    def resolve_boats(self):
        return ShipModel.query()

    @resolve_only_args
    def resolve_ships(self):
        return ShipModel.query()

    @resolve_only_args
    def resolve_rebels(self):
        return FactionModel.get_by_id("rebels")

    @resolve_only_args
    def resolve_empire(self):
        result = FactionModel.get_by_id("empire")
        print result
        print type(result)
        return FactionModel.get_by_id("empire")

    authors = NdbConnectionField(AuthorType, description="here you can query authors, I hope!")
    boats   = NdbConnectionField(Boat, "boating queryyyy")

    rebels = graphene.Field(Faction, description = "jo Rebels sup")
    empire = graphene.Field(Faction, description = "The empire query description")
    node = relay.Node.Field(description ="description of node query, whatever that is")
    ships = NdbConnectionField(Ship, "description of the ships query")

    hello = graphene.String(description='A typical hello world')


class Mutation(graphene.ObjectType):
    introduce_ship = IntroduceShip.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)


"""
Reset Data Endpoint
"""
class ResetDataEndpoint(webapp2.RequestHandler):
    def get(self):
        initialize()
        self.response.write('well done')


def initialize():
    human = CharacterModel(name='Human')
    human.put()

    droid = CharacterModel(name='Droid')
    droid.put()

    rebels = FactionModel(id="rebels", name='Alliance to Restore the Republic', hero_key=human.key)
    rebels.put()

    empire = FactionModel(id="empire", name='Galactic Empire', hero_key=droid.key)
    empire.put()

    xwing = ShipModel(name='X-Wing', faction_key=rebels.key)
    xwing.put()

    ywing = ShipModel(name='Y-Wing', faction_key=rebels.key)
    ywing.put()

    awing = ShipModel(name='A-Wing', faction_key=rebels.key)
    awing.put()

    # Yeah, technically it's Corellian. But it flew in the service of the rebels,
    # so for the purposes of this demo it's a rebel ship.
    falcon = ShipModel(name='Millenium Falcon', faction_key=rebels.key)
    falcon.put()

    homeOne = ShipModel(name='Home One', faction_key=rebels.key)
    homeOne.put()

    tieFighter = ShipModel(name='TIE Fighter', faction_key=empire.key)
    tieFighter.put()

    tieInterceptor = ShipModel(name='TIE Interceptor', faction_key=empire.key)
    tieInterceptor.put()

    executor = ShipModel(name='Executor', faction_key=empire.key)
    executor.put()

"""
Looks like this is called from schema? Figure out...
"""

def create_ship(ship_name, faction_key):
    new_ship = ShipModel(name=ship_name, faction_key=faction_key)
    new_ship.put()
    return new_ship


"""
The very simplistic GraphQL Endpoint
"""
class GraphQLEndpoint(webapp2.RequestHandler):

    def get(self):
        template = ninja.get_template('graphiql.html')
        template_values = {
        }
        self.response.write(template.render(template_values))

    def post(self):
        data = json.loads(self.request.body)
        query = data.get('query', '')
        result = schema.execute(query)
        response = {'data' : result.data}
        self.response.headers['Content-Type'] = 'application/json; charset=utf-8'
        self.response.out.write(json.dumps(response))


class Home(webapp2.RequestHandler):
    def get(self):
        """
        Change this to an overview of this demo project.
        """
        template = ninja.get_template('graphiql.html')
        template_values = {
        }
        self.response.write(template.render(template_values))

"""
Our application with 1 endpoint
"""
app = webapp2.WSGIApplication([
    ('/', Home),
    ('/reset', ResetDataEndpoint),
    ('/graphql', GraphQLEndpoint),
], debug=True)