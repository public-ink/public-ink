def require_user_schema():
    from user import UserSchema
    return UserSchema


def require_publication_schema():
    from publication import PublicationSchema
    return PublicationSchema


def require_author_schema():
    from models.author import AuthorSchema
    return AuthorSchema


def require_article_schema():
    from article import ArticleSchema
    return ArticleSchema
