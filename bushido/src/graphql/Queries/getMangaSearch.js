import { gql } from "@apollo/client";

const GET_MANGA_SEARCH = gql`
  query getMangaSearch($manga: String!) {
    manga_search(manga: $manga) {
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

export default GET_MANGA_SEARCH;
