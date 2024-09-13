import { gql } from "@apollo/client";

export const MY_PROFILE_QUERY = gql`
  query MyProfile {
    myProfile {
      id
      name
      avatar
    }
  }
`;
