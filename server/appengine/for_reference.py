class LoginUser(graphene.Mutation):
    class Input:
        email = graphene.String()
        password = graphene.String()
    
    def mutate(self, args, context, info):
        email = args.get('email')
        password = args.get('password')
        # get user!
        user = ndb.Key('UserModel', email).get()
        # compare against hash!
        matches = verify_password(user.password_hash_sha256, password)
        if matches:
            return LoginUser(
                success=True,
                jwt= generate_jwt(email),
                user=user,
                email=email)
        else:
            return LoginUser(
                success=False)
    # return values
    success = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()
    user = graphene.Field(lambda: UserSchema)
        

class CreateUser(graphene.Mutation):
    class Input:
        email = graphene.String()
        password = graphene.String()

    # return Type
    #user = graphene.Field(UserSchema)
    #jwt = graphene.String()
    success = graphene.Boolean()
    jwt = graphene.String()
    email = graphene.String()

    def mutate(self, args, context, info):
        print "mutate!"
        email = args.get('email')
        password = args.get('password')

        # duplicate check
        exisiting = ndb.Key('UserModel', email).get()
        if exisiting:
            print 'exisiting!'
            return CreateUser(
                success=False
                )

        else:
            """ new signup """
            password_hash = hash_password(password)
            # this should move to classmethod on User
            verification_token = uuid.uuid4().hex
            user_key = UserModel(
                id=email,
                email=email,
                verification_token=verification_token,
                password_hash_sha256=password_hash).put()
            print 'saved'
            print password
            print password_hash
            user = user_key.get()

            """make a token! """
            jwt_token = generate_jwt(user.email)

            """ send email """
            message = mail.EmailMessage(
                sender="auth@public-ink.appspotmail.com",
                subject="Public.Ink Verification")

            message.to = "micklinghoff@gmail.com"
            host = 'http://localhost:4200'
            message.body = """Hello there,

You or somebody else submitted this email address to us. To create a public.ink account, let follow this link:
{}/verify/{}/{}

Awesome!
            """.format(host, user.email, verification_token)
            #message.send()
            print message.body

            return CreateUser(
                success=True,
                jwt=jwt_token,
                email=user.email
            )