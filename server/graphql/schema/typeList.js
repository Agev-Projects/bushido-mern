const { gql } = require("apollo-server-express");

const typeList = gql`
  type Query {
    animelist: [Anime]!
    mangalist: [Manga]!
  }

  type Mutation {
    addAnime(id: String!): String!
    addManga(id: String!): String!
    removeAnime(id: String!): String!
    removeManga(id: String!): String!
  }
`;

module.exports = { typeList };
