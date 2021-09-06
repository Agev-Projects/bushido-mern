import { gql } from "@apollo/client";

const GET_MANGAS_HERO = gql`
  query getMangasHero {
    mangas_hero {
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
      imageTitle
      imageHero
      slug
    }
  }
`;

export default GET_MANGAS_HERO;
