import { gql } from "@apollo/client";

const GET_ANIMES_HERO = gql`
  query getAnimesHero {
    animes_hero {
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

export default GET_ANIMES_HERO;
