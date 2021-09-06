import { gql } from "@apollo/client";

const GET_MANGAS = gql`
  query getMangas {
    mangas {
      id
      titles {
        en
        es
        pt
      }
      descriptions {
        en
        es
        pt
      }
      imageCover
      genres {
        en
        es
        pt
      }
      slug
    }
  }
`;

export default GET_MANGAS;
