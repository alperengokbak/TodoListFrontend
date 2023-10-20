import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      content
      createdAt
      updatedAt
    }
  }
`;

export const GET_NOTE = gql`
  query GetNote($id: ID!) {
    note(id: $id) {
      id
      content
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
    }
  }
`;
