import React from "react";

// Declaration MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function List({ name, userName, userEmail, noteContent }) {
  console.log(noteContent);
  return (
    <Card sx={{ height: "100%", width: "20dvw", display: "flex", flexDirection: "column" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Stack>
          <Typography>{userName}</Typography>
          <Typography>{userEmail}</Typography>
          <Typography>{noteContent}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}

export default List;
