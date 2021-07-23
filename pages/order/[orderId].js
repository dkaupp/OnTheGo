import { useEffect, useContext, useState } from "react";
import OrderContext from "../../context/order-context";
import getOrderApi from "../../api/getOrderApi";
import Spinner from "../../components/reusable/Spinner";
import TotalOrderTable from "../../components/reusable/TotalOrderTable";
import OrderListItem from "../../components/reusable/OrderListItem";
import ShippingAddress from "../../components/reusable/ShippingAddress";
import PaymentMethod from "../../components/reusable/PaymenMethod";
import PaymentStatus from "../../components/reusable/PaymentStatus";
import DeliveryStatus from "../../components/reusable/DeliveryStatus";
import { PayPalButton } from "react-paypal-button-v2";
import http from "../../api/http";
import router from "next/router";
import Head from "next/head";

const OrderPage = ({ id }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { payOrder } = useContext(OrderContext);

  const paypalScript = async () => {
    const { data: paypalId } = await http.get(
      `${process.env.NEXT_PUBLIC_API_URL}config/paypal`
    );

    const script = document.createElement("script");
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }

    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalId}`;
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
  };

  const getOrderById = async () => {
    const response = await getOrderApi(id);

    if (response.error) {
      return setError(response.error.error);
    }
    setOrder(response);
  };

  useEffect(() => {
    getOrderById();
    paypalScript();
    setLoading(false);
  }, []);

  const handleSuccess = async (paymentResult) => {
    const paidOrder = await payOrder(order._id, paymentResult);
    if (!paidOrder)
      return setError({
        message: "There was and error while paying the order.",
      });
    router.reload();
  };

  if (loading || !order) return <Spinner />;
  const { cart: items } = order;

  return (
    <>
      <Head>
        <title>User Order</title>
        <meta name="description" content="Order review page" />
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-md-center">
          <div className="col col-xs-12 col-md-6">
            <h2 className="text-center mb-2 mt-2">{order._id.toUpperCase()}</h2>
          </div>
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
              deliveredAt={order.deliveredAt}
            />
            <hr />
            {error && (
              <div className="success mt-3 bg-danger text-white p-2">
                {error.toUpperCase()}
              </div>
            )}
            <div className="d-flex justify-content-end">
              {!order.isPaid && scriptLoaded && (
                <PayPalButton
                  amount={order.orderTotal}
                  onSuccess={handleSuccess}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.orderId,
    },
  };
}
