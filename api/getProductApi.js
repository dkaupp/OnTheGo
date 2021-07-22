import http from "./http";

const getProductApi = async (id) => {
  try {
    const { data } = await http.get(`/items/${id}`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default getProductApi;
