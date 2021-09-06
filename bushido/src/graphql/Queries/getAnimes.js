import { gql } from "@apollo/client";

const GET_ANIMES = gql`
  query getAnimes {
    animes {
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

export default GET_ANIMES;
