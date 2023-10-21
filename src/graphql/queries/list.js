import { gql } from "@apollo/client";

export const GET_LIST = gql`
  query GetList($id: ID!) {
    list(id: $id) {
      id
      name
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
      notes {
        id
        content
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_LISTS = gql`
  query GetLists {
    lists {
      id
      name
      createdAt
      updatedAt
      user {
        id
        name
      }
      notes {
        id
        content
      }
    }
  }
`;
