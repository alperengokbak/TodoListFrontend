// Declaration React
import React from "react";
import { useNavigate } from "react-router-dom";
import { cartItemsVar } from "../reactiveVariable";

// Declaration Apollo Server
import { useReactiveVar } from "@apollo/client";

// Declaration MUI
import { Stack, AppBar, Toolbar, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

function Header({ children, handleLogout }) {
  const navigate = useNavigate();
  const cartItems = useReactiveVar(cartItemsVar);
  return (
    <Stack>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            You Have To-DO
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" flexGrow={1} spacing={3}>
            <HomeIcon
              onClick={() => {
                navigate("/");
              }}
              sx={{
                cursor: "pointer",
              }}
            />
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                cursor: "pointer",
              }}
            >
              <ShoppingCartIcon
                onClick={() => {
                  navigate("/cart");
                }}
                sx={{
                  mr: 0.5,
                }}
              />
              <Typography>{cartItems.length}</Typography>
            </Stack>
            <LogoutIcon
              onClick={() => {
                handleLogout();
              }}
              sx={{
                cursor: "pointer",
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      {children}
    </Stack>
  );
}

export default Header;
