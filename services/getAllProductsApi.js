import http from "./http";
import authStorage from "../auth/storage";

const getAllProductsApi = async () => {
  try {
    const { data } = await http.get(`/items/`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getAllProductsApi;
