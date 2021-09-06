import { gql } from "@apollo/client";

const ADD_ANIME = gql`
  mutation addAnime($id: String!) {
    addAnime(id: $id)
  }
`;

export default ADD_ANIME;
