// Declaration React and React Router
import * as React from "react";
import List from "../components/List";
import CreateList from "../components/CreateList";

// Declaration MUI
import { Grid, Container, Typography } from "@mui/material";

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
              userId={list.user.id}
              userName={list.user.name}
              noteContent={list.notes.content}
              deleteList={deleteList}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
