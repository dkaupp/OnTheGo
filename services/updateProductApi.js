import http from "./http";
import authStorage from "../auth/storage";

const updateProductApi = async (formData, id) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await http.put(`/items/${id}`, formData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default updateProductApi;
