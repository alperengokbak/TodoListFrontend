import * as React from "react";
import List from "../components/List";
import CreateList from "../components/CreateList";

// Declaration Apollo Server
import { useMutation, useQuery } from "@apollo/client";
import { GET_LISTS } from "../graphql/queries/list";

// Declaration MUI
import { Stack, AppBar, Grid, Toolbar, Typography, Container, Button } from "@mui/material";

export default function Home({ handleLogout }) {
  const { loading, error, data, refetch } = useQuery(GET_LISTS);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{`Error! ${error.message}`}</Typography>;

  return (
    <Stack>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            You Have To-DO
          </Typography>
        </Toolbar>
      </AppBar>
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
              />
            ))}
          </Grid>
          <Stack direction="row" justifyContent="flex-end" width="100wv" mt={5} mr={2}>
            <Button variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Container>
      </main>
    </Stack>
  );
}
