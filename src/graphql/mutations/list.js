import { gql } from "@apollo/client";

export const CREATE_LIST = gql`
  mutation CreateList($name: String!, $userId: ID!) {
    createList(name: $name, userId: $userId) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
