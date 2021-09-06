const { gql } = require("apollo-server-express");

const typeAnime = gql`
  type AnimeTitle {
    en: String!
    es: String!
    pt: String!
  }

  type AnimeDescription {
    en: String!
    es: String!
    pt: String!
  }

  type AnimeGenre {
    en: [String!]!
    es: [String!]!
    pt: [String!]!
  }

  type Anime {
    id: ID!
    titles: AnimeTitle!
    descriptions: AnimeDescription!
    imageTitle: String!
    imageHero: String!
    imageCover: String!
    trailer: String!
    trailerImage: String!
    genres: AnimeGenre!
    slug: String!
  }

  type Query {
    animes: [Anime!]!
    animes_hero: [Anime!]!
    anime_slug(slug: String!): Anime!
    anime_search(anime: String!): [Anime!]
    anime_genre(genre: String!): [Anime!]
  }
`;

module.exports = { typeAnime };
