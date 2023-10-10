// Declarations React And Pages
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/auth";

// Declarations MUI
import ListIcon from "@mui/icons-material/List";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginScreen() {
  const { setUser } = useContext(userContext);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const navigate = useNavigate();

  const handleClickPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPassword(false);
  };

  const handleClickEmail = () => {
    setOpenEmail(true);
  };

  const handleCloseEmail = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEmail(false);
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [login, { error, data }] = useMutation(LOGIN);

  useEffect(() => {
    if (data) {
      console.log(data);
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      console.log("USER", data.login.user);
      setUser(data.login.user);
      navigate("/");
    }
  }, [data, setUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid item xs={false} sm={4} md={7} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#008000" }}>
          <ListIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            handleLogin(e);
            if (error.message.includes("password")) {
              handleClickPassword();
            }
            if (error.message.includes("email")) {
              handleClickEmail();
            }
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Grid container justifyContent="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                background: "#008000",
                ":&hover": {
                  background: "#008000",
                },
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Link href="/auth/register" variant="body2" color={"#008000"}>
              "Don't have an account? Sign Up"
            </Link>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={openPassword} autoHideDuration={2000} onClose={handleClosePassword}>
        <Alert onClose={handleClosePassword} severity="error" sx={{ width: "100%" }}>
          {error && error.message}
        </Alert>
      </Snackbar>
      <Snackbar open={openEmail} autoHideDuration={2000} onClose={handleCloseEmail}>
        <Alert onClose={handleCloseEmail} severity="error" sx={{ width: "100%" }}>
          {error && error.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
