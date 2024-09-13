import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refresh_token: String!) {
    refresh_token(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;
