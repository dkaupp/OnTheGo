import jwtDecode from "jwt-decode";
import http from "../services/http";

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
  // localStorage.removeItem(token);
  // localStorage.removeItem("customer");
  // localStorage.removeItem("cartToken");
  // localStorage.removeItem("orderToken");
  localStorage.clear();
};

export default {
  storeAuthToken,
  getAuthToken,
  getUser,
  removeAuthToken,
};
