// Declaration React
import React from "react";
import { useContext } from "react";
import { userContext } from "../App";

// Declaration Apollo Server
import { useMutation } from "@apollo/client";
import { CREATE_LIST } from "../graphql/mutations/list";

// Declaration MUI
import { Button, Stack, TextField } from "@mui/material";

export default function CreateList({ refetch }) {
  const [listName, setListName] = React.useState("");
  const { user } = useContext(userContext);
  const [createList] = useMutation(CREATE_LIST);

  return (
    <Stack mb={3} spacing={2} mt={8}>
      <TextField
        variant="outlined"
        placeholder="List Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <Stack direction="row" maxWidth="100dvw" justifyContent="flex-end" p={2}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => {
              createList({ variables: { name: listName, userId: user.id } });
              setListName("");
              refetch();
            }}
          >
            Create
          </Button>
          <Button variant="contained">Cancel</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
