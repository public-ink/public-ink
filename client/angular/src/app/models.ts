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
    publishedAt?: number
    // parent
    publication: iPublication
    new?: boolean
}

export interface iPublicationResponse {
    info: {
        message: string
        susccess: boolean
    }
    publication: iPublication
}

