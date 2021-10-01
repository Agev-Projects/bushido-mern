import { gql } from "@apollo/client";

const GET_MANGA_GENRE = gql`
  query getMangaGenre($genre: String!) {
    manga_genre(genre: $genre) {
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

export default GET_MANGA_GENRE;
