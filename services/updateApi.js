import http from "./http";
import authStorage from "../auth/storage";

const updateApi = async ({ name, email, password }) => {
  const token = authStorage.getAuthToken();
  http.setJWT(token);
  try {
    const { data } = await http.put("/users", { name, email, password });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default updateApi;
