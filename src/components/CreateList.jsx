// Declaration React
import React from "react";

// Declaration MUI
import { Button, Container, Stack, TextField } from "@mui/material";

// Declaration Context
import { userContext } from "../Context/UserContext";

export default function CreateList() {
  const [listName, setListName] = React.useState("");
  const { user, refetch, createList } = React.useContext(userContext);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateList();
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
          onKeyDown={handleKeyPress}
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
