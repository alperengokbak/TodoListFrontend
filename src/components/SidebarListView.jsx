// Declaration React and React Router
import React from "react";

// Declaration Apollo Server
import { useReactiveVar } from "@apollo/client";

// Declaration Context
import { userContext } from "../Context/UserContext";

// Declaration MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import { cartItemsVar } from "../reactiveVariable";

function SidebarListView({ id, userId, name, userName, userEmail, noteContent, deleteList, createdAt, setListId }) {
  const { user } = React.useContext(userContext);
  const cartItems = useReactiveVar(cartItemsVar);

  React.useEffect(() => {
    const storedData = localStorage.getItem("cartItems");
    const initialCartItems = storedData ? JSON.parse(storedData) : [];
    cartItemsVar(initialCartItems);
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        mb: 4,
        cursor: "pointer",
        ":hover": {
          boxShadow: "0 0 11px rgba(33,33,33,.2)",
          backgroundColor: "#f5f5f5",
        },
      }}
      onClick={() => {
        setListId(id);
      }}
    >
      <CardHeader
        avatar={<Avatar>{userName[0]}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={createdAt}
      />
      <CardContent>
        <Stack>
          <Typography variant="body1">{userName}</Typography>
          <Typography variant="body2" color="#757575">
            {userId === user?.id ? user?.email : null}
          </Typography>
          <Typography>{noteContent}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        {cartItems.some((item) => item.id === id) ? (
          <Button
            size="small"
            onClick={() => {
              cartItemsVar(cartItems.filter((item) => item.id !== id));
              localStorage.setItem("cartItems", JSON.stringify(cartItemsVar()));
            }}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => {
              cartItemsVar([
                ...cartItems,
                { id: id, name: name, userName: userName, userEmail: userEmail, noteContent: noteContent },
              ]);
              localStorage.setItem("cartItems", JSON.stringify(cartItemsVar()));
            }}
          >
            Add to Cart
          </Button>
        )}
        <Button
          size="small"
          onClick={() => {
            deleteList({ variables: { id: id } });
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default SidebarListView;
