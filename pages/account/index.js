import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import updateApi from "../../api/updateApi";
import Joi from "joi-browser";
import AuthContext from "../../context/auth-context";
import CustomerContext from "../../context/customer-context";
import Spinner from "../../components/reusable/Spinner";
import getOrdersApi from "../../api/getOrdersApi";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  email: Joi.string().email().min(5).max(30).required().label("Email"),
  password: Joi.string().min(5).max(30).required().label("Password"),
  repassword: Joi.string().min(5).max(30).required().label("Password"),
};

const Account = () => {
  const [loading, setLoading] = useState(true);
  const { user, logIn } = useContext(AuthContext);
  const { customer, loading: loadingCustomer } = useContext(CustomerContext);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrders = async (customerId) => {
    console.log(customerId);
    if (!customerId) return;
    const response = await getOrdersApi(customerId);

    console.log(response);

    if (response.error) {
      console.log(response.error);
      return setOrdersError(response.error);
    }

    setOrders(response);
  };

  useEffect(() => {
    if (customer) {
      getOrders(customer._id);
    }
    setLoading(false);
  }, [user, loading]);

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
      repassword: "",
    },
    async onSubmit(data) {
      if (password !== repassword) return setError("Password does not match");
      const response = await updateApi(data);
      if (response.error) {
        return setErrors({ email: response.error, password: response.error });
      }
      logIn(response);
      setUpdated(true);
    },
    schema,
  });

  const { email, password, repassword, name } = data;

  if (loading || loadingCustomer) return <Spinner />;
  if (!user) {
    return (window.location.href = "/");
  }

  console.log(orders);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col col-xs-12 col-md-4">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-5">
                Name
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
              <label htmlFor="email" className="form-label fs-5">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                {errors && errors.email
                  ? errors.email
                  : email !== ""
                  ? "Ok"
                  : "Please enter your email"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fs-5">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <div id="passwordHelp" className="form-text">
                {errors && errors.password
                  ? errors.password
                  : password !== ""
                  ? "Ok"
                  : error
                  ? error
                  : "Change password"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="repassword" className="form-label fs-5">
                Confirm Password
              </label>
              <input
                type="repassword"
                className="form-control"
                id="repassword"
                name="repassword"
                value={repassword}
                onChange={handleChange}
              />
              <div id="repasswordHelp" className="form-text">
                {errors && errors.repassword
                  ? errors.repassword
                  : repassword !== ""
                  ? "Ok"
                  : error
                  ? error
                  : "Confirm password"}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              UPDATE
            </button>
          </form>
          {updated && (
            <div className="secondary mt-3 bg-secondary text-white p-2">
              UPDATED SUCCESSFULLY
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
