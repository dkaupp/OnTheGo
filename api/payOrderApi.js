import authStorage from "../auth/storage";
import http from "../api/http";

const payorderApi = async (id, paymentResult) => {
  const authToken = authStorage.getAuthToken();
  http.setJWT(authToken);
  try {
    const { data } = await http.put(`/order/${id}/pay`, {
      paymentResult,
    });
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default payorderApi;
