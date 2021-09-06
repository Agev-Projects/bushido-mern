import { gql } from "@apollo/client";

const ADD_MANGA = gql`
  mutation addManga($id: String!) {
    addManga(id: $id)
  }
`;

export default ADD_MANGA;
