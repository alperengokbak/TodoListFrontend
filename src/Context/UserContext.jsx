import React, { createContext, useState } from "react";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
