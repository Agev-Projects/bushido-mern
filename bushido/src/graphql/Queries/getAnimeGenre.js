import { gql } from "@apollo/client";

const GET_ANIME_GENRE = gql`
  query getAnimeGenre($genre: String!) {
    anime_genre(genre: $genre) {
      id
      titles {
        en
        es
        pt
      }
      imageCover
      slug
    }
  }
`;

export default GET_ANIME_GENRE;
