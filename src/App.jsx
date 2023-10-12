// Declaration React
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Declaration Apollo Server
import { useQuery, useMutation } from "@apollo/client";
import { GET_LISTS } from "./graphql/queries/list";
import { DELETE_LIST } from "./graphql/mutations/list";

// Declaration Pages
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/Header";

// Declaration Context
export const userContext = React.createContext();

export const App = () => {
  const [user, setUser] = useState("");
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
    setUser(null);
  };

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Router>
        <Routes>
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/register" element={<RegisterScreen />} />
          <Route
            path="/"
            element={
              user ? (
                <Header handleLogout={handleLogout}>
                  <Home loading={loading} error={error} refetch={refetch} data={data} deleteList={deleteList} />
                </Header>
              ) : (
                <LoginScreen />
              )
            }
          />
          <Route
            path="/cart"
            element={
              user ? (
                <Header handleLogout={handleLogout}>
                  <Cart />
                </Header>
              ) : (
                <LoginScreen />
              )
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </userContext.Provider>
  );
};
