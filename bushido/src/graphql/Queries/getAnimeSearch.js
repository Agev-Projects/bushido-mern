import { gql } from "@apollo/client";

const GET_ANIME_SEARCH = gql`
  query getAnimeSearch($anime: String!) {
    anime_search(anime: $anime) {
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

export default GET_ANIME_SEARCH;
