// Decalration React
import React from "react";

// Declaration Pages
import MainPageListView from "../components/MainPageListView";

// Declaration MUI
import { Container, Stack, Typography } from "@mui/material";

function MainPage({ loading, error, data, deleteList }) {
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{`Error! ${error.message}`}</Typography>;
  return (
    <Container maxWidth="lg">
      <Stack>
        {data.lists.map((list) => (
          <MainPageListView
            key={list.id}
            id={list.id}
            name={list.name}
            userId={list.user.id}
            userName={list.user.name}
            noteContent={list.notes[0]?.content}
            createdAt={list.createdAt}
            updateAt={list.updateAt}
            deleteList={deleteList}
          />
        ))}
      </Stack>
    </Container>
  );
}

export default MainPage;
