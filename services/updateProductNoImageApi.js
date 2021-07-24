import http from "./http";
import authStorage from "../auth/storage";

const updateProductNoImageApi = async (formData, id) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await http.put(`/items/${id}/noimage`, formData, config);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default updateProductNoImageApi;
