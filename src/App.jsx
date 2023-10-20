// Declaration React
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Declaration MUI
import { Divider, Stack } from "@mui/material";

// Declaration Pages
import LoginScreen from "./pages/LogInScreen";
import RegisterScreen from "./pages/RegisterScreen";
import Sidebar from "./pages/Sidebar";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";

// Declaration Components
import CreateList from "./components/CreateList";

// Declaration Context
import { userContext } from "./Context/UserContext";

export function App() {
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
    setUser(null);
  };

  if (user === undefined) {
    return null;
  }
  if (user === null) {
    return (
      <Router>
        <Routes>
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/register" element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Stack direction="row" height="100dvh" width="100dvw" m={0}>
              <Stack direction="column" width="20dvw">
                <Sidebar />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Header handleLogout={handleLogout}>
                <CreateList />
                <Divider />
                <MainPage />
              </Header>
            </Stack>
          }
        />
        <Route
          path="/cart"
          element={
            <Stack direction="row" height="100dvh" width="100dvw" m={0}>
              <Stack direction="column" width="20dvw">
                <Sidebar />
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Header handleLogout={handleLogout}>
                <Cart />
              </Header>
            </Stack>
          }
        />
      </Routes>
    </Router>
  );
}
