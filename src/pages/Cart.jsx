// Declare React, React Router, and MUI
import React from "react";

// Declare MUI
import { Button, Stack, TextField } from "@mui/material";

function Cart() {
  return (
    <Stack>
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

export default Cart;
