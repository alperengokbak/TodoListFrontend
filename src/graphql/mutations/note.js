import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($content: String!, $userId: ID!, $listId: ID!) {
    createNote(content: $content, userId: $userId, listId: $listId) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;
