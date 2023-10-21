// Decalration React
import React from "react";

// Declaration MUI
import { Stack, Typography, Avatar, Button, Box } from "@mui/material";

// Declaration Pages
import CreateNote from "./CreateNote";

function MainPageListView({ id, notes, userName, createNote, deleteNote, refetch }) {
  return (
    <Stack
      height="100%"
      mt={3}
      mb={1}
      sx={{
        cursor: "pointer",
      }}
    >
      <CreateNote createNote={createNote} id={id} refetch={refetch} />
      {notes.map((note) => (
        <Box
          key={note.id}
          sx={{
            display: "flex",
            mb: 1,
            mt: 4,
            ":hover": {
              boxShadow: "0 0 11px rgba(33,33,33,.2)",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Avatar>{note.user.name[0]}</Avatar>
          <Stack direction="row" alignItems="center" ml={2}>
            <Typography variant="body1" fontWeight="bold">
              {note.content}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: "auto" }}
            onClick={async () => {
              await deleteNote({
                variables: {
                  id: note.id,
                },
              });
              refetch();
            }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Stack>
  );
}

export default MainPageListView;
