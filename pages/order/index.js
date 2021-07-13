import { useEffect, useContext, useState } from "react";
import OrderContext from "../../context/order-context";
import { useRouter } from "next/router";
import TotalOrderTable from "../../components/reusable/TotalOrderTable";
import OrderListItem from "../../components/reusable/OrderListItem";
import ShippingAddress from "../../components/reusable/ShippingAddress";
import PaymentMethod from "../../components/reusable/PaymenMethod";
import PaymentStatus from "../../components/reusable/PaymentStatus";
import DeliveryStatus from "../../components/reusable/DeliveryStatus";
import http from "../../api/http";
import { PayPalButton } from "react-paypal-button-v2";

const Order = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { order, loading, paySuccess, payOrder } = useContext(OrderContext);
  const router = useRouter();

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

  useEffect(() => {
    if (!order && loading === false) return router.push("/cart");
    paypalScript();
  }, [order, loading]);

  if (loading || !order) return <div>Loading</div>;
  const { cart: items } = order;

  const handleSuccess = (paymentResult) => {
    console.log(paymentResult);

    payOrder(order._id, paymentResult);
    router.push(`/order/${order._id}`);
  };

  return (
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
          <DeliveryStatus delivery={order.delivery} />
          <hr />
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
  );
};

export default Order;
