import { gql } from "@apollo/client";

const GET_MANGA_SLUG = gql`
  query getMangaSlug($slug: String!) {
    manga_slug(slug: $slug) {
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

export default GET_MANGA_SLUG;
