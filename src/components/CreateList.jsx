// Declaration React
import React from "react";
import { userContext } from "../Context/UserContext";

// Declaration Apollo Server
import { useMutation } from "@apollo/client";
import { CREATE_LIST } from "../graphql/mutations/list";

// Declaration MUI
import { Button, Container, Stack, TextField } from "@mui/material";

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
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        mb: 3,
      }}
    >
      <Stack spacing={3}>
        <TextField
          variant="outlined"
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
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
    </Container>
  );
}
