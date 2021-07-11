import http from "./http";
import authStorage from "../auth/storage";

const customerApi = async () => {
  try {
    const token = authStorage.getAuthToken();
    http.setJWT(token);
    const { data } = await http.get("/customer");
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default customerApi;
