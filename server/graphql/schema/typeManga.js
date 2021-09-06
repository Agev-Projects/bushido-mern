const { gql } = require("apollo-server-express");

const typeManga = gql`
  type MangaTitle {
    en: String!
    es: String!
    pt: String!
  }

  type MangaDescription {
    en: String!
    es: String!
    pt: String!
  }

  type MangaGenre {
    en: [String!]!
    es: [String!]!
    pt: [String!]!
  }

  type Manga {
    id: ID!
    titles: MangaTitle!
    descriptions: MangaDescription!
    imageTitle: String!
    imageHero: String!
    imageCover: String!
    genres: MangaGenre!
    slug: String!
  }

  type Query {
    mangas: [Manga!]!
    mangas_hero: [Manga!]!
    manga_slug(slug: String!): Manga!
    manga_search(manga: String!): [Manga!]
    manga_genre(genre: String!): [Manga!]
  }
`;

module.exports = { typeManga };
