// Declaration React and React Router
import * as React from "react";
import List from "../components/List";
import CreateList from "../components/CreateList";

// Declaration MUI
import { Stack, Grid, Typography, Container } from "@mui/material";

export default function Home({ loading, error, refetch, data, deleteList }) {
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{`Error! ${error.message}`}</Typography>;
  return (
    <main
      style={{
        height: "100dvh",
        maxHeight: "calc(100dvh - 64px)",
      }}
    >
      <Container maxWidth="lg">
        <CreateList refetch={refetch} />
        <Grid container>
          {data.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              name={list.name}
              userName={list.user.name}
              userEmail={list.user.email}
              noteContent={list.notes.content}
              deleteList={deleteList}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
