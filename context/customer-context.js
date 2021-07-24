import { createContext, useState, useEffect } from "react";
import getCustomer from "../services/getCutomer";

const CustomerContext = createContext();

export const CustomerContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    if (!customer) {
      getCustomerFromDataBase();
    }
    setCustomer(JSON.parse(customer));
    setLoading(false);
  }, []);

  const storeCustomerData = (customer) => {
    localStorage.setItem("customer", JSON.stringify(customer));
    setCustomer(customer);
  };

  const addPaymentMethod = (paymentMethod) => {
    customer.paymentMethod = paymentMethod;
    storeCustomerData(customer);
  };

  const getCustomerFromDataBase = async () => {
    const response = await getCustomer();
    if (!response || response.error) {
      return setCustomer(null);
    }

    setCustomer(response);
    storeCustomerData(response);
  };

  const context = {
    customer,
    setCustomer,
    storeCustomerData,
    loading,
    addPaymentMethod,
  };
  return (
    <CustomerContext.Provider value={context}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
