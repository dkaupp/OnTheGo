import http from "./http";
import authStorage from "../auth/storage";

const editUserApi = async (id, userData) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  try {
    const { data } = await http.put(`/users/${id}`, userData);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default editUserApi;
