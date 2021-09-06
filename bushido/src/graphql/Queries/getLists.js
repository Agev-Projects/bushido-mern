import { gql } from "@apollo/client";

const GET_LISTS = gql`
  query getLists {
    animelist {
      titles {
        en
        es
        pt
      }
      imageCover
      slug
    }

    mangalist {
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

export default GET_LISTS;
