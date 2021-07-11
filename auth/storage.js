import jwtDecode from "jwt-decode";
import http from "../api/http";

const token = "authToken";

const storeAuthToken = (authToken) => {
  localStorage.setItem(token, authToken);
};

const getAuthToken = () => {
  return localStorage.getItem(token);
};

const getUser = () => {
  const authToken = localStorage.getItem(token);
  if (authToken) {
    http.setJWT(authToken);
    return jwtDecode(authToken);
  } else {
    return null;
  }
};

const removeAuthToken = () => {
  localStorage.removeItem(token);
};

export default {
  storeAuthToken,
  getAuthToken,
  getUser,
  removeAuthToken,
};
