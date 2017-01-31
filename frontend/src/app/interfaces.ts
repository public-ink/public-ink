export interface Article {
  id: string;
  title: string;
  titleText: string;
  teaser: string;
  teaserText: string;
  body: string;
  bodyText: string;
  // todo: decide how to transfer
  image?: string;
  imageUrl?: string;
  url?: string; // only optional because of newArticle...
  deleted?: boolean; // only optional because of new...
}