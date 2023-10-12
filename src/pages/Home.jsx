// Declaration React and React Router
import * as React from "react";
import List from "../components/List";
import CreateList from "../components/CreateList";

// Declaration Apollo Server
import { useReactiveVar } from "@apollo/client";

// Declaration Context
import { cartItemsVar } from "../reactiveVariable";

// Declaration MUI
import { Stack, Grid, Typography, Container } from "@mui/material";

export default function Home({ loading, error, refetch, data, deleteList }) {
  const cartItems = useReactiveVar(cartItemsVar);
  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{`Error! ${error.message}`}</Typography>;
  return (
    <Stack>
      <main
        style={{
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
    </Stack>
  );
}
