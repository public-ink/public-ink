

def require_publication_schema():
    from publication_schema import PublicationSchema    
    return PublicationSchema

def require_author_schema():
    from author_schema import AuthorSchema    
    return AuthorSchema

def require_article_schema():
    from article_schema import ArticleSchema
    return ArticleSchema