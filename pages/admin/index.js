import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/auth-context";
import AdminNavigation from "../../components/reusable/AdminNavigation";
import Spinner from "../../components/reusable/Spinner";
import getAllOrdersApi from "../../services/getAllOrders";
import Link from "next/link";
import styles from "../../styles/Account.module.css";
import TrashIcon from "../../components/icons/TrashIcon";
import deleteOrder from "../../services/deleteOrderApi";
import { useRouter } from "next/router";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [setOrdersError] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { user, loadin: loadingUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loadingUser) {
      return router.replace("/");
    }

    if (!user.isAdmin) return router.replace("/");
    const getOrders = async () => {
      const response = await getAllOrdersApi();

      if (response.error) {
        return setOrdersError(response.error);
      }

      setOrders(response);
    };

    getOrders();
    setLoadingOrders(false);
    setLoading(false);
  }, [loadingUser, router, user, setOrdersError]);

  if (loading) return <Spinner />;

  const handleDelete = async (id) => {
    const response = await deleteOrder(id);
    if (response.error) return setError(response.error);

    getOrders();
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12">
          <AdminNavigation page="orders" />
          <h2 className="text-center mb-4 mt-2">Customers Orders</h2>
          <table className="table" style={{ marginLeft: 20 }}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">DATE</th>
                <th scope="col">TOTAL</th>
                <th scope="col">PAID</th>
                <th scope="col">DELIVERY</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <Link href={`/admin/edit-order/${order._id}`} passHref>
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
                  <td className={styles.spanFinal}>
                    <div onClick={() => handleDelete(order._id)}>
                      <TrashIcon width="22" height="21" color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
