import { createContext, useState, useEffect } from "react";
import authStorage from "../auth/storage";
import jwtDecode from "jwt-decode";
import singInApi from "../api/siningApi";
import http from "../api/http";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authStorage.getUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const logIn = async (data) => {
    const response = await singInApi(data);
    if (response.error) {
      return { errors: response.error };
    }
    const user = jwtDecode(response);
    setUser(user);
    authStorage.storeAuthToken(response);

    return { errors: null };
  };

  const register = async (token) => {
    const user = jwtDecode(token);
    setUser(user);
    authStorage.storeAuthToken(token);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeAuthToken();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logIn,
        logOut,
        loading,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
