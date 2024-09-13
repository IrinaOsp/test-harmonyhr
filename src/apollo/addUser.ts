import { gql } from "@apollo/client";

export const ADD_USER_MUTATION = gql`
  mutation addUser(
    $name: String!
    $email: String!
    $password: String!
    $avatar: String!
  ) {
    addUser(
      data: { name: $name, email: $email, password: $password, avatar: $avatar }
    ) {
      id
      name
      avatar
    }
  }
`;
