import { useEffect, useContext, useState } from "react";
import getOrderApi from "../../../api/getOrderApi";
import Spinner from "../../../components/reusable/Spinner";
import TotalOrderTable from "../../../components/reusable/TotalOrderTable";
import OrderListItem from "../../../components/reusable/OrderListItem";
import ShippingAddress from "../../../components/reusable/ShippingAddress";
import PaymentMethod from "../../../components/reusable/PaymenMethod";
import PaymentStatus from "../../../components/reusable/PaymentStatus";
import DeliveryStatus from "../../../components/reusable/DeliveryStatus";
import AuthContext from "../../../context/auth-context";
import { useRouter } from "next/router";
import setOrderStatus from "../../../api/setOrderStatus";
import Link from "next/link";

const EditOrder = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDelivery, setEditDelivery] = useState(false);
  const [initialData, setInitialData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const { user, loading: loadingUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingUser && !user.isAdmin) {
      return router.replace("/");
    }

    const getOrderById = async () => {
      const response = await getOrderApi(id);

      if (response.error) {
        return setError(response.error.error);
      }
      setOrder(response);
    };

    getOrderById();
    setLoading(false);
  }, [user, loadingUser, router, id]);

  if (loading || !order || loadingUser) return <Spinner />;
  const { cart: items } = order;
  const editDeliveryStatus = () => setEditDelivery(!editDelivery);

  const handleStatusChange = async () => {
    const response = await setOrderStatus(order._id);
    if (response.error) return setError(response.error);

    setOrder(response);
    setEditDelivery(false);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <h2 className="text-center mb-2 mt-2">{order._id.toUpperCase()}</h2>
        </div>
      </div>
      <div>
        <Link href="/admin" passHref>
          <button className="btn btn-outline-dark mt-2">
            GO BACK TO ORDERS
          </button>
        </Link>
      </div>
      <div className="row no-gutters justify-content-md-center">
        <div className="col-md-12 col-lg-12 col-xl-12">
          {items &&
            items.map((item) => (
              <OrderListItem key={item.item._id} items={item} final={true} />
            ))}
          <hr />
          <TotalOrderTable
            totalAmount={order.subTotal}
            totalQuantity={items.length}
            final={true}
          />
          <PaymentMethod paymentMethod={order.paymentMethod} />
          <hr />
          <PaymentStatus isPaid={order.isPaid} />
          <hr />
          <ShippingAddress shippingAddress={order.shippingAddress} />
          <hr />
          <DeliveryStatus
            delivery={order.delivery}
            admin={user.isAdmin}
            deliveredAt={order.deliveredAt}
            editDeliveryStatus={editDeliveryStatus}
          />
          <hr />
          {editDelivery && (
            <div className="d-flex justify-content-end">
              <button className="btn btn-success" onClick={handleStatusChange}>
                SET TO DELIVERED
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditOrder;

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.orderId,
    },
  };
}
