// Declaration React and React Router
import * as React from "react";
import SidebarListView from "../components/SidebarListView";

// Declaration Pages
import HeaderList from "../components/HeaderList";

// Declaration MUI
import { Grid, Container, Typography } from "@mui/material";

// Declaration Context
import { userContext } from "../Context/UserContext";

export default function Sidebar() {
  const { dataLists, loadingLists, errorLists, deleteList, setListId } = React.useContext(userContext);
  if (loadingLists) return <Typography>Loading...</Typography>;
  if (errorLists) return <Typography>{`Error! ${error.message}`}</Typography>;
  return (
    <main
      style={{
        height: "100dvh",
        maxHeight: "calc(100dvh - 64px)",
      }}
    >
      <Container maxWidth="lg">
        <HeaderList />
        <Grid container mt={8} justifyContent="center">
          {dataLists.lists.map((list) => (
            <SidebarListView
              key={list.id}
              id={list.id}
              name={list.name}
              userId={list.user.id}
              userName={list.user.name}
              userEmail={list.user.email}
              noteContent={list.notes.content}
              createdAt={list.createdAt}
              updateAt={list.updateAt}
              deleteList={deleteList}
              setListId={setListId}
            />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
