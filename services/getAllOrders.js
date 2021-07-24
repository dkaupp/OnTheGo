import http from "./http";
import authStorage from "../auth/storage";

const getAllOrderApi = async () => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  try {
    const { data } = await http.get(`/order/`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getAllOrderApi;
