import { gql } from "@apollo/client";

const UPDATE_PIC = gql`
  mutation updatePic($pic: String!) {
    changePic(pic: $pic) {
      profilePic
    }
  }
`;

export default UPDATE_PIC;
