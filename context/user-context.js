import { createContext, useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};

export default UserContext;
