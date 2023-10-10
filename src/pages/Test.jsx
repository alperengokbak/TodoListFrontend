// Declaration React
import React from "react";
import { useContext } from "react";
import { userContext } from "../App";

// Declaration Apollo Server
import { useQuery, useMutation } from "@apollo/client";
import { GET_LIST } from "../graphql/queries/list";
import { CREATE_LIST } from "../graphql/mutations/list";

// Declaration MUI
import { Button, Stack, TextField } from "@mui/material";

export default function Test({ handleLogout }) {
  const [listName, setListName] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const { user } = useContext(userContext);
  const { loading, error, data } = useQuery(GET_LIST, {
    variables: { id: user.id },
    pollInterval: 500,
  });
  const [createList] = useMutation(CREATE_LIST);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Stack height="100dvh" spacing={2}>
      <TextField
        variant="outlined"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <Stack direction="row" maxWidth="100dvw" justifyContent="flex-end" mr={1} p={2}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              createList({ variables: { name: listName, userId: user.id } });
              setListName("");
              setUserId("");
            }}
          >
            Create
          </Button>
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
