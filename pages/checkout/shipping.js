import { useEffect, useContext, useState } from "react";
import Joi from "joi-browser";
import useFormShipping from "../../hooks/userFormShipping";
import AuthContext from "../../context/auth-context";
import shippingApi from "../../api/shippingApi";
import Checkout from "../../components/reusable/Checkout";
import router from "next/router";
import customerApi from "../../api/customerApi";
import CustomerContext from "../../context/customer-context";
import Head from "next/head";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  address: Joi.string().min(5).max(30).required().label("Address"),
  city: Joi.string().min(5).max(30).required().label("City"),
  postalCode: Joi.string().min(5).max(5).required().label("Postal code"),
  country: Joi.string().min(3).max(30).required().label("Country"),
};

const Shipping = () => {
  const { user, loading } = useContext(AuthContext);
  const { storeCustomerData } = useContext(CustomerContext);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (!user && loading === false) window.location.href = "/";

    const fillCustomerShipping = async () => {
      const response = await customerApi();

      if (response.error) {
        return setError(response.error.error);
      }

      const {
        name,
        shippingAddress: { address, city, postalCode, country },
      } = response;

      setInitialData({
        name,
        address,
        city,
        postalCode,
        country,
      });
    };

    fillCustomerShipping();
  }, [user, loading, setError]);

  const { data, errors, handleChange, handleSubmit, setErrors } =
    useFormShipping({
      initialData,
      async onSubmit(data) {
        const response = await shippingApi(data);
        if (response.error) {
          return setErrors({ email: response.error, password: response.error });
        }
        storeCustomerData(response);
        router.push("/checkout/payment");
      },
      schema,
    });

  const { name, address, city, postalCode, country } = data;
  return (
    <>
      <Head>
        <title>Shipping</title>
        <meta name="description" content="Check out shipping page" />
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-md-center">
          <div className="col col-xs-12 col-md-6">
            <form>
              <Checkout step1 step2 page="shipping" />
              <h2 className="text-center mb-2 mt-2">Shipping</h2>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fs-5">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  autoFocus
                />
                <div id="nameHelp" className="form-text">
                  {errors && errors.name
                    ? errors.name
                    : name !== ""
                    ? "Ok"
                    : "Please enter your name"}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label fs-5">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  aria-describedby="addressHelp"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
                <div id="addressHelp" className="form-text">
                  {errors && errors.address
                    ? errors.address
                    : address !== ""
                    ? "Ok"
                    : "Please enter your address"}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label fs-5">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={city}
                  onChange={handleChange}
                />
                <div id="passwordHelp" className="form-text">
                  {errors && errors.city
                    ? errors.city
                    : city !== ""
                    ? "Ok"
                    : "Please enter your city"}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label fs-5">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleChange}
                />
                <div id="postalCodeHelp" className="form-text">
                  {errors && errors.postalCode
                    ? errors.postalCode
                    : postalCode !== ""
                    ? "Ok"
                    : "Please re enter your postal code"}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label fs-5">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={country}
                  onChange={handleChange}
                />
                <div id="postalCodeHelp" className="form-text">
                  {errors && errors.country
                    ? errors.country
                    : country !== ""
                    ? "Ok"
                    : "Please re enter your postal country"}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                NEXT PAYMENT
              </button>
            </form>
            {error && (
              <div className="success mt-3 bg-danger text-white p-2">
                {error.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
