import http from "./http";
import authStorage from "../auth/storage";

const orderApi = async (shipping, paymentMethod) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  const token = localStorage.getItem("cartToken");
  try {
    const { data } = await http.post("/order", {
      paymentMethod,
      shipping,
      token,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default orderApi;
