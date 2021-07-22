import http from "./http";
import authStorage from "../auth/storage";

const createProductApi = async (formData) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await http.post(`/items/`, formData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default createProductApi;
