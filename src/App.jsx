// Declaration React
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Declaration Apollo Server
import { useQuery, useMutation } from "@apollo/client";
import { GET_LISTS } from "./graphql/queries/list";
import { DELETE_LIST } from "./graphql/mutations/list";

// Declaration Pages
import LoginScreen from "./pages/LogInScreen";
import RegisterScreen from "./pages/RegisterScreen";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import { userContext } from "./Context/UserContext";

export function App() {
  const { user, setUser } = useContext(userContext);

  const { loading, error, data, refetch } = useQuery(GET_LISTS);
  const [deleteList] = useMutation(DELETE_LIST, {
    update(cache, { data: { deleteList } }) {
      cache.modify({
        fields: {
          lists(existingLists = [], { readField }) {
            return existingLists.filter((listRef) => deleteList.id !== readField("id", listRef));
          },
        },
      });
    },
  });

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
            <Header handleLogout={handleLogout}>
              <Home loading={loading} error={error} refetch={refetch} data={data} deleteList={deleteList} />
            </Header>
          }
        />
        <Route
          path="/cart"
          element={
            <Header handleLogout={handleLogout}>
              <Cart />
            </Header>
          }
        />
      </Routes>
    </Router>
  );
}
