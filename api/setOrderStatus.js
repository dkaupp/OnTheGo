import http from "./http";
import authStorage from "../auth/storage";

const setOrderStatus = async (id) => {
  console.log(id);
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  try {
    const { data } = await http.put(`/order/${id}/delivered`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default setOrderStatus;
