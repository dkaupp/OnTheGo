import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import CustomerContext from "../../context/customer-context";
import CartContext from "../../context/cart-context";
import Checkout from "../../components/reusable/Checkout";
import TotalOrderTable from "../../components/reusable/TotalOrderTable";
import OrderListItem from "../../components/reusable/OrderListItem";
import OrderContext from "../../context/order-context";
import { useRouter } from "next/router";
import Spinner from "../../components/reusable/Spinner";
import Head from "next/head";

const PlaceOrder = () => {
  const { customer, loading } = useContext(CustomerContext);
  const { cart, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!customer && loading === false) router.push("/cart");
  }, [customer, loading, cart, router]);

  if (loading) return <Spinner />;

  const { cart: items, totalAmount, totalQuantity } = cart || [];

  const handlePlaceOrder = async () => {
    const order = await placeOrder(5, customer.paymentMethod);

    if (order.error) {
      setError(order.error.error);
    }

    clearCart();
    localStorage.removeItem("orderToken");
    router.push(`/order/${order._id}`);
  };

  return (
    <>
      <Head>
        <title>Place Order</title>
        <meta name="description" content="Place order page" />
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-md-center">
          <div className="col col-xs-12 col-md-6">
            <Checkout step1 step2 step3 step4 page="order" />
            <h2 className="text-center mb-2 mt-2">Review Order</h2>
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
              totalAmount={totalAmount}
              totalQuantity={totalQuantity}
              final={true}
            />
            <div className="d-flex justify-content-end">
              <Link href={"/cart"} passHref>
                <div>
                  <button
                    className="btn btn-outline-dark"
                    style={{
                      border: "2px solid black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    CHANGE ORDER
                  </button>
                </div>
              </Link>
              <div style={{ marginLeft: 10 }}>
                <button
                  onClick={handlePlaceOrder}
                  className="btn btn-dark"
                  style={{
                    border: "2px solid black",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="success mt-3 bg-danger text-white p-2">
            {error.toUpperCase()}
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
