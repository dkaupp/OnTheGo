import http from "./http";

const singInApi = async ({ email, password }) => {
  try {
    const { data } = await http.post("/auth", { email, password });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default singInApi;
