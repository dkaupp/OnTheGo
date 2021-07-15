import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import CustomerContext from "../../context/customer-context";
import Spinner from "../../components/reusable/Spinner";
import getOrdersApi from "../../api/getOrdersApi";
import Link from "next/link";
import styles from "../../styles/Account.module.css";
import AccountNavigation from "../../components/reusable/AccountNavidation";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const { user, register, loading: loadingUser } = useContext(AuthContext);
  const { customer, loading: loadingCustomer } = useContext(CustomerContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
    setLoading(false);
    setLoadingOrders(false);
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12">
          <AccountNavigation page="orders" />
          <h2 className="text-center mb-4 mt-2">Orders</h2>
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
                    <td className={styles.spanFinal}>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className={styles.spanFinal}>$ {order.orderTotal}</td>
                    <td className={styles.spanFinal}>
                      {order.isPaid ? "Paid" : "Not Paid"}
                    </td>
                    <td className={styles.spanFinal}>{order.delivery}</td>
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

export default Orders;
