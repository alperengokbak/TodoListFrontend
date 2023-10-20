import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($content: String!, $userId: ID!, $listId: ID!) {
    createNote(content: $content, userId: $userId, listId: $listId) {
      id
      content
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID!) {
    deleteNote(id: $id) {
      id
      content
      createdAt
      updatedAt
    }
  }
`;
