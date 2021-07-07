import jwtDecode from "jwt-decode";

const token = "authToken";

const storeAuthToken = (authToken) => {
  localStorage.setItem(token, authToken);
};

const getAuthToken = () => {
  return localStorage.getItem(token);
};

const getUser = () => {
  const authToken = localStorage.getItem(token);

  return authToken ? jwtDecode(authToken) : null;
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
