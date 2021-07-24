import http from "./http";
import authStorage from "../auth/storage";

const getCategoryApi = async (id) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);

  try {
    const { data } = await http.get(`/category/${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getCategoryApi;
