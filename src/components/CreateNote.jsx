// Decalration React
import React from "react";
import { userContext } from "../Context/UserContext";

// Declaration MUI
import { Stack, Button, TextField } from "@mui/material";

function CreateNote({ createNote, id, refetch }) {
  const [content, setContent] = React.useState("");
  const { user } = React.useContext(userContext);

  const handleCreateNote = async () => {
    if (content === "") {
      return;
    }
    try {
      await createNote({ variables: { content: content, userId: user.id, listId: id } });
      setContent("");
      refetch();
    } catch (error) {
      console.log(error);
    }
    console.log("list id: ", id);
    console.log("user id: ", user.id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateNote();
    }
  };

  return (
    <Stack direction="row" flex={1} spacing={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button variant="contained" size="small" onClick={handleCreateNote}>
        Create
      </Button>
    </Stack>
  );
}

export default CreateNote;
