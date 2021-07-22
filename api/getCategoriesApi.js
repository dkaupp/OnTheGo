import http from "./http";

const getCategoriesApi = async () => {
  try {
    const { data } = await http.get(`/category`);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
};

export default getCategoriesApi;
