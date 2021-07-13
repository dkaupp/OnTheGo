import { createContext, useState, useEffect } from "react";
import orderApi from "../api/orderApi";
import payorderApi from "../api/payOrderApi";

const tokenKey = "orderToken";

const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paySuccess, setPaySuccess] = useState(false);
  const [payingError, setPayingError] = useState(null);

  useEffect(() => {
    const storedOrder = getOrderFromLocalStorage();
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
    setLoading(false);
  }, []);

  const storeOrderData = (orderData) => {
    localStorage.setItem(tokenKey, JSON.stringify(orderData));
    setOrder(orderData);
  };

  const placeOrder = async (shipping, paymentMethod) => {
    const newOrder = await orderApi(shipping, paymentMethod);
    if (newOrder.error) {
      console.log(newOrder.error);
      return setError(newOrder.error);
    }
    storeOrderData(newOrder);
    return newOrder;
  };

  const getOrderFromLocalStorage = () => {
    return localStorage.getItem(tokenKey);
  };

  const payOrder = async (id, paymentResult) => {
    const paidOrder = await payorderApi(id, paymentResult);

    if (paidOrder.error) {
      console.log(paidOrder.error);
      return setPayingError(paidOrder.error);
    }
    setPaySuccess(true);
    localStorage.removeItem("cartToken");
    localStorage.removeItem(tokenKey);
    setOrder(null);
    return paidOrder;
  };

  const context = { order, loading, error, placeOrder, payOrder, paySuccess };

  return (
    <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
