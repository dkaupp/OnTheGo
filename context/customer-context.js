import { createContext, useState, useEffect } from "react";

const CustomerContext = createContext();

export const CustomerContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const customer = localStorage.getItem("customer");
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
