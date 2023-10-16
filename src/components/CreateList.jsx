// Declaration React
import React from "react";
import { userContext } from "../Context/UserContext";

// Declaration Apollo Server
import { useMutation } from "@apollo/client";
import { CREATE_LIST } from "../graphql/mutations/list";

// Declaration MUI
import { Button, Stack, TextField } from "@mui/material";

export default function CreateList({ refetch }) {
  const [listName, setListName] = React.useState("");
  const { user } = React.useContext(userContext);
  const [createList] = useMutation(CREATE_LIST);

  const handleCreateList = async () => {
    if (listName === "") {
      return;
    }
    try {
      await createList({ variables: { name: listName, userId: user.id } });
      setListName("");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button variant="contained" onClick={handleCreateList}>
            Create
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setListName("");
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
