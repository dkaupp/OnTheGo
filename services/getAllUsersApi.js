import http from "./http";
import authStorage from "../auth/storage";

const getAllUsersApi = async () => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  try {
    const { data } = await http.get(`/users/`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getAllUsersApi;
