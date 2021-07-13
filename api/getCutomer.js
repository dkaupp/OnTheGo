import http from "./http";
import authStorage from "../auth/storage";

const getCustomer = async () => {
  const authToken = authStorage.getAuthToken();

  if (!authToken) return null;
  http.setJWT(authToken);

  try {
    const { data } = await http.get(`/customer/`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getCustomer;
