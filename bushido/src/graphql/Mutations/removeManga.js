import { gql } from "@apollo/client";

const REMOVE_MANGA = gql`
  mutation removeManga($id: String!) {
    removeManga(id: $id)
  }
`;

export default REMOVE_MANGA;
