// Declaration RegisterScreen component
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../graphql/mutations/auth";
import { userContext } from "../App";
import { useMutation } from "@apollo/client";

// Declaration Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Declaration MUI
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

export default function RegisterScreen() {
  const { user, setUser } = useContext(userContext);
  const [open, setOpen] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(15, "Must be 15 characters or less").required("Required!"),
      email: Yup.string().email("Invalid email address").required("Required!"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .max(20, "Must be 20 characters or less")
        .uppercase("Must be uppercase")
        .lowercase("Must be lowercase")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [register, { error }] = useMutation(REGISTER);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        variables: {
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        },
      });
      if (res) {
        localStorage.setItem("token", res.data.register.token);
        localStorage.setItem("user", JSON.stringify(res.data.register.user));
        setUser(res.data.register.user);
      }
    } catch (error) {
      console.log("GraphQL Error:", error.message);
    }
  };
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formik.values.name}
                id="name"
                name="name"
                label="Name"
                type="text"
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formik.values.email}
                id="email"
                name="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formik.values.password}
                name="password"
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              onClick={() => {
                if (formik.values.name === "" || formik.values.email === "" || formik.values.password === "") {
                  handleClick();
                } else if (!formik.values.email.includes("@") || !formik.values.email.includes(".")) {
                  handleClickEmail();
                } else if (formik.values.password.length < 6 || formik.values.password.length > 20) {
                  handleClickPassword();
                }
              }}
              sx={{
                mt: 2,
                mb: 2,
                background: "#008000",
              }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Link href="/auth/login" variant="body2" sx={{ color: "#008000" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {formik.errors.name}
          </Alert>
        </Snackbar>
        <Snackbar open={openEmail} autoHideDuration={2000} onClose={handleCloseEmail}>
          <Alert onClose={handleCloseEmail} severity="error" sx={{ width: "100%" }}>
            {formik.errors.email}
          </Alert>
        </Snackbar>
        <Snackbar open={openPassword} autoHideDuration={4000} onClose={handleClosePassword}>
          <Alert onClose={handleClosePassword} severity="error" sx={{ width: "100%" }}>
            {formik.errors.password}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}
