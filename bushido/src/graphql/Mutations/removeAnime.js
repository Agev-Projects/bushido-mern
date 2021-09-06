import { gql } from "@apollo/client";

const REMOVE_ANIME = gql`
  mutation removeAnime($id: String!) {
    removeAnime(id: $id)
  }
`;

export default REMOVE_ANIME;
