
// AUTHOR
export interface Author {
  id: string;
  name: string;
  nameText: string;
  about: string;
  aboutText: string;
  publications?: Publication[];
  url: string;
}

// PUBLICATION
export interface Publication {
  id: string;
  name: string;
  nameText: string;
  about: string;
  aboutText: string;
  url?: string;
  imageUrl?: string;
  author: Author;
  articles: Publication[];
}

// ARTICLE
export interface Article {
  id: string;
  title: string;
  titleText: string;
  teaser: string;
  teaserText: string;
  body: string;
  bodyText: string;
  comments?: Comment[];
  // parent: author (only for existing)
  author?: Author;
  // todo: decide how to transfer
  image?: string;
  imageUrl?: string;
  url?: string; // only optional because of newArticle...
  deleted?: boolean; // only optional because of new...
}

// COMMENT
export interface Comment {
  id: string;
  userID: string;
  body: string;
  bodyText: string;
  url: string;
}

export interface ServerError {
  message: string;
}
