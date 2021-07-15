import http from "./http";
import authStorage from "../auth/storage";

const getOrdersApi = async (id) => {
  const token = authStorage.getAuthToken();
  http.setJWT(token);
  try {
    const { data } = await http.get(`/order/customer/${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getOrdersApi;
