import http from "./http";

const shippingApi = async ({ name, address, city, postalCode, country }) => {
  try {
    const { data } = await http.post("/customer", {
      name,
      address,
      postalCode,
      city,
      country,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return error.response.data;
    }
  }
};

export default shippingApi;
