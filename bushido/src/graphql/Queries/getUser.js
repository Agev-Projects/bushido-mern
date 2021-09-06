import { gql } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    user {
      username
      email
      profilePic
    }
  }
`;

export default GET_USER;
