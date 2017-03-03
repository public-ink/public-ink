/** NEW MODELS! */
export interface iAuthor {
    id: string
    name: string
    about: string
    imageURL: string
    new?: boolean
}
export interface iPublication {
    id: string    
    name: string
    about: string
    imageURL: string
    // parent
    author: iAuthor
    new?: boolean
}
export interface iArticle {
    id: string    
    title: string
    bodyOps: string
    // parent
    publication: iPublication
    new?: boolean
}


/**
 * The shape of a Resource instance (an Author, Publication,.. instance)
 */
export interface IResource {
    type: string
    url: string
    id: string
    data(): Object
    isValid(): boolean
}
/**
 * Minimum shape of backend data (resource)
 * from which we make resources
 */
export interface IBackendData {
    type: string
    url: string
    id: string
    name?: string
}


/**
 * Base class representing a resource, it is the basis for:
 * - Author
 * - Publication
 * - Article
 * - Comment
 */
export class Resource {
    type: string
    url: string
    id: string

    constructor(data: IResourceData) {
        this.url = data.url
        this.id = data.id
    }
}

export class Author extends Resource implements IResource {
    name: string
    nameText: string
    about: string
    aboutText: string
    imageUrl: string
    publications: Publication[] = []
    deleted: boolean
    created: number
    updated: number

    constructor(data: AuthorData) {
        super(data)
        this.type = 'author'
        this.name = data.nameText
        this.nameText = data.nameText
        this.about = data.about
        this.aboutText = data.aboutText
        this.imageUrl = data.imageUrl
        this.deleted = data.deleted
        this.created = data.created
        this.updated = data.updated

        for (let publication of data.publications) {
            this.publications.push(new Publication(publication))
        } 

    }

    /** The data this resources puts/posts to the backend */
    data() {
        return {
            name: this.name,
            nameText: this.nameText,
            about: this.about,
            aboutText: this.aboutText,
            imageUrl: this.imageUrl,
        }
    }
    /**
     * data validation (expand, refactor)
     */
    isValid() {
        if (!this.nameText || this.nameText === '') {
            return false
        } else {
            return true
        }
    }

    /**
     * Creates and returns a 'New Author' instance
     */
    static createNew(): Author {
        let data: AuthorData = {
            id: 'new',
            url: 'http://localhost:8080/author/new',
            name: '',
            nameText: '',
            about: '',
            aboutText: '',
            imageUrl: '',
            deleted: false,
            publications: [],
        }
        return new this(data)
    }
}

export class Publication extends Resource implements IResource {
    name: string
    nameText: string
    about: string
    aboutText: string
    imageUrl: string
    // related
    articles: Article[] = []

    constructor(data: PublicationData) {
        super(data)
        this.type = 'publication'
        this.name = data.name
        this.nameText = data.nameText
        this.about = data.about
        this.aboutText = data.aboutText
        // construct related
        for (let articleData of data.articles) {
            this.articles.push(new Article(articleData))
        }
    }

    data() {
        return {
            name: this.name,
            about: this.about,
        }
    }

    isValid() {
        return true
    }
}

export class Article extends Resource implements IResource {
    title: string
    titleText: string
    body: string
    bodyText: string

    constructor(data: ArticleData) {
        super(data)
        this.title = data.title
        this.titleText = data.titleText
        this.body = data.body
        this.bodyText = data.bodyText
    }

    data() {
        return {}
    }
    isValid() {
        return true
    }
}

/** some duplication here */
/**
 * The shape of data we can use to create a resource
 */
export interface IResourceData {
    url: string
    id: string
}

interface ResourceData {
    url: string
    id: string
}

export interface AuthorData extends ResourceData {
    name: string
    nameText: string
    about: string
    aboutText: string
    imageUrl: string
    publications: PublicationData[]
    deleted: boolean
    created?: number
    updated?: number
}

export interface PublicationData extends ResourceData {
    name: string
    nameText: string
    about: string
    aboutText: string
    imageUrl: string
    articles: ArticleData[]
}

export interface ArticleData extends ResourceData {
    title: string
    titleText: string
    body: string
    bodyText: string
}

export interface ServerError {
    status: number
    statusText: string
    _body: string
}

export interface ValidationError {
    status: number
    statusText: string
}
