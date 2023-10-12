// Declaration React
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

// Declaration Apollo Server
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Declaration Context
import { UserContextProvider } from "./Context/UserContext.jsx";

const PORT = 4001;

const client = new ApolloClient({
  uri: `http://localhost:${PORT}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : "",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </ApolloProvider>
);
