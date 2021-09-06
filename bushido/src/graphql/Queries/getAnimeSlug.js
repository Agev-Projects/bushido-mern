import { gql } from "@apollo/client";

const GET_ANIME_SLUG = gql`
  query getAnimeSlug($slug: String!) {
    anime_slug(slug: $slug) {
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
      trailer
      trailerImage
      genres {
        en
        es
        pt
      }
      slug
    }
  }
`;

export default GET_ANIME_SLUG;
