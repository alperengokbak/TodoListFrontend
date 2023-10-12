// Declaration React and React Router
import React from "react";

// Declaration Apollo Server
import { useReactiveVar } from "@apollo/client";

// Declaration MUI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { cartItemsVar } from "../reactiveVariable";

function List({ id, name, userName, userEmail, noteContent, deleteList }) {
  const cartItems = useReactiveVar(cartItemsVar);

  React.useEffect(() => {
    const storedData = localStorage.getItem("cartItems");
    const initialCartItems = storedData ? JSON.parse(storedData) : [];
    cartItemsVar(initialCartItems);
  }, []);

  return (
    <Card sx={{ height: "18dvh", width: "14dvw", display: "flex", flexDirection: "column", mr: 4, mb: 4 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Stack>
          <Typography variant="body1">{userName}</Typography>
          <Typography variant="body2" color="#757575">
            {userEmail}
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

export default List;
