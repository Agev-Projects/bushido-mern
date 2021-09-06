import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation signup(
    $username: String!
    $email: String!
    $password: String!
    $profilePic: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      profilePic: $profilePic
    ) {
      username
      email
      password
      profilePic
    }
  }
`;

export default SIGNUP;
