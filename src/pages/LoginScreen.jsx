// Declarations LoginScreen component
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations/auth";

// Declaration Formik
import { Formik, useFormik } from "formik";
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

export default function LoginScreen() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [login, { error, data }] = useMutation(LOGIN);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login({
        variables: {
          email: formik.values.email,
          password: formik.values.password,
        },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          if (error.message.includes("password")) {
            formik.setFieldError("password", `${error.message}`);
          } else {
            formik.setFieldError("email", `${error.message}`);
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <Avatar sx={{ m: 1 }}>
          <ListIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            formik.handleSubmit(e);
            if (formik.isValid) {
              handleLogin(e);
            }
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
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
    </Container>
  );
}
