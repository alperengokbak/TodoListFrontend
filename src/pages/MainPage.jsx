// Decalration React
import React from "react";

// Declaration Pages
import MainPageListView from "../components/MainPageListView";

// Declaration MUI
import { Container, Stack, Typography } from "@mui/material";

// Declaration Context
import { userContext } from "../Context/UserContext";

function MainPage() {
  const { loadingList, errorList, dataList, createNote, deleteNote, refetch } = React.useContext(userContext);
  if (loadingList) return <Typography>Loading...</Typography>;
  if (errorList) return <Typography>{`Error! ${errorList.message}`}</Typography>;
  if (!dataList) return null;
  return (
    <Container maxWidth="lg">
      <Stack>
        <MainPageListView
          key={dataList.list.id}
          id={dataList.list.id}
          userId={dataList.list.user.id}
          userName={dataList.list.user.name}
          userEmail={dataList.list.user.email}
          notes={dataList.list?.notes}
          createNote={createNote}
          refetch={refetch}
          deleteNote={deleteNote}
        />
      </Stack>
    </Container>
  );
}

export default MainPage;
