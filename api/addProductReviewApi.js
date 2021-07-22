import http from "./http";
import authStorage from "../auth/storage";

const addProductReviewApi = async (id, review) => {
  const authToken = authStorage.getAuthToken();

  if (!authToken) return null;
  http.setJWT(authToken);

  try {
    const { data } = await http.post(`/items/${id}/reviews`, review);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { error: error.response.data };
    }
  }
};

export default addProductReviewApi;
