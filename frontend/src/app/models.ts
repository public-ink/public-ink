import { BackendService } from './backend.service'
import { Http } from '@angular/http'

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

    constructor(data: AuthorData) {
        super(data)
        this.type = 'author'
        this.name = data.nameText
        this.nameText = data.nameText
        this.about = data.about
        this.aboutText = data.aboutText
        this.imageUrl = data.imageUrl
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

    /** nice, but useless */
    static fromData(data: AuthorData) {
        return new this(data)
    }
}

export class Publication extends Resource implements IResource {
    name: string
    about: string

    constructor(data: PublicationData) {
        super(data)
        this.type = 'publication'
        this.name = data.name
        this.about = data.about
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
    deleted: boolean
}
export interface PublicationData extends ResourceData{
    name: string
    about: string
}
