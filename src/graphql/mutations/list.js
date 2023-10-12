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

export const DELETE_LIST = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
