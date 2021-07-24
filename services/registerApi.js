import http from "./http";

const registerApi = async ({ name, email, password }) => {
  try {
    const { data } = await http.post("/users", { name, email, password });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default registerApi;
