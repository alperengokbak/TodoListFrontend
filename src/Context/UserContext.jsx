import React, { createContext, useState } from "react";

// Declaration Apollo Server
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NOTE, DELETE_NOTE } from "../graphql/mutations/note";
import { CREATE_LIST, DELETE_LIST } from "../graphql/mutations/list";
import { GET_LISTS, GET_LIST } from "../graphql/queries/list";

export const userContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [listId, setListId] = React.useState(null);

  const [createNote] = useMutation(CREATE_NOTE);
  const [createList] = useMutation(CREATE_LIST);

  const { loading: loadingLists, error: errorLists, data: dataLists, refetch } = useQuery(GET_LISTS);
  const {
    loading: loadingList,
    error: errorList,
    data: dataList,
  } = useQuery(GET_LIST, {
    variables: { id: listId },
    skip: !listId, // skip this query if listId is undefined
  });

  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      cache.modify({
        fields: {
          lists(existingLists = [], { readField }) {
            return existingLists.filter((listRef) => deleteList.id !== readField("id", listRef));
          },
        },
      });
    },
  });

  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      cache.modify({
        fields: {
          notes(existingNotes = [], { readField }) {
            return existingNotes.filter((noteRef) => deleteNote.id !== readField("id", noteRef));
          },
        },
      });
    },
  });

  return (
    <userContext.Provider
      value={{
        user,
        listId,
        setListId,
        setUser,
        createNote,
        createList,
        loadingList,
        errorList,
        dataList,
        dataLists,
        loadingLists,
        errorLists,
        deleteList,
        deleteNote,
        refetch,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

export default UserContextProvider;
