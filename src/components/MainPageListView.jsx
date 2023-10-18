// Decalration React
import React from "react";

// Declaration MUI
import { Stack, Typography, Avatar, Button } from "@mui/material";

function MainPageListView({ name, userName, noteContent, deleteList, createdAt }) {
  return (
    <Stack
      direction="row"
      height="100%"
      mt={3}
      mb={3}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        p: 2,
        cursor: "pointer",
        ":hover": {
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Avatar>{userName[0]}</Avatar>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack ml={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="body1" fontWeight="bold">
              {name}
            </Typography>
          </Stack>
          <Typography variant="body2">{noteContent}</Typography>
        </Stack>
        <Button>
          <Typography variant="body2">Delete</Typography>
        </Button>
      </Stack>
    </Stack>
  );
}

export default MainPageListView;
