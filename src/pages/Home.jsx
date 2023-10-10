import * as React from "react";
import List from "../components/List";
import Test from "./Test";

// Declaration Apollo Server
import { useMutation, useQuery } from "@apollo/client";
import { GET_LISTS } from "../graphql/queries/list";

// Declaration MUI
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function Home({ handleLogout }) {
  const [lists, setLists] = React.useState([]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
        {/* <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom> */}
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Test handleLogout={handleLogout} />
          <Grid container spacing={4}>
            {lists.map((list) => (
              <List key={list} />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

/* import React from "react";

// Declaration MUI
import { Button, Stack, Typography } from "@mui/material";

export default function Home({ handleLogout }) {
  return (
    <Stack height="100dvh" justifyContent="space-between">
      <Typography variant="h3">You Have To-DO</Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Stack>
  );
}

 */
