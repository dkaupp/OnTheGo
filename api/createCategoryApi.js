import http from "./http";
import authStorage from "../auth/storage";

const createCategoryApi = async ({ name }, id = false) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  try {
    if (!id) {
      const { data } = await http.post("/category", {
        name,
      });
      return data;
    } else {
      const { data } = await http.post("/category", {
        name,
        _id: id,
      });
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default createCategoryApi;
