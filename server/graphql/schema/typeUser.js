const { gql } = require("apollo-server-express");

const typeUser = gql`
  type User {
    username: String!
    email: String!
    password: String!
    profilePic: String!
    list: [String]
  }

  type Mutation {
    signup(
      username: String!
      email: String!
      password: String!
      profilePic: String
    ): User!
    login(email: String!, password: String!): User!
    changePic(pic: String!): User
    logout: Boolean
  }

  type Query {
    user: User!
  }
`;

module.exports = { typeUser };
