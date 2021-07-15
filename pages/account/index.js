import router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import updateApi from "../../api/updateApi";
import Joi from "joi-browser";
import AuthContext from "../../context/auth-context";
import CustomerContext from "../../context/customer-context";
import Spinner from "../../components/reusable/Spinner";
import getOrdersApi from "../../api/getOrdersApi";
import Link from "next/link";
import useFormShipping from "../../hooks/userFormShipping";
import styles from "../../styles/Account.module.css";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  email: Joi.string().email().min(5).max(30).required().label("Email"),
  password: Joi.string().min(5).max(30).required().label("Password"),
  repassword: Joi.string().min(5).max(30).required().label("Password"),
};

const Account = () => {
  const [loading, setLoading] = useState(true);
  const { user, register, loading: loadingUser } = useContext(AuthContext);
  const { customer, loading: loadingCustomer } = useContext(CustomerContext);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const getOrders = async (customerId) => {
    if (!customerId) return;
    const response = await getOrdersApi(customerId);

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
    if (user) {
      setInitialData({
        name: user.name,
        email: user.email,
        password: "",
        repassword: "",
      });
    }
    setLoading(false);
    setLoadingOrders(false);
  }, [user]);

  const { data, errors, handleChange, handleSubmit, setErrors } =
    useFormShipping({
      initialData,
      async onSubmit(data) {
        if (password !== repassword) return setError("Password does not match");
        const response = await updateApi(data);
        if (response.error) {
          return setErrors({ email: response.error, password: response.error });
        }
        register(response);
        setUpdated(true);
        router.push("/account");
      },
      schema,
      mode: true,
    });

  const { email, password, repassword, name } = data;

  if (loading || loadingCustomer || loadingUser) return <Spinner />;
  if (!user) {
    return (window.location.href = "/");
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <h2>Update Account</h2>
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
        <div className="col col-xs-12 col-md-9 col-sm-12">
          <h2 style={{ marginLeft: 20 }}>Orders</h2>
          {loadingOrders ? (
            <Spinner />
          ) : !orders.length ? (
            <div>You have not place any orders</div>
          ) : (
            <table className="table" style={{ marginLeft: 20 }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">PAID</th>
                  <th scope="col">DELIVERY</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <Link href={`/order/${order._id}`}>
                      <td className={styles.tableLink}>{order._id}</td>
                    </Link>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>$ {order.orderTotal}</td>
                    <td>{order.isPaid ? "PAID" : "PENDING"}</td>
                    <td>{order.delivery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
