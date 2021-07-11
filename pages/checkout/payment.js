import { useContext, useEffect, useState } from "react";
import Checkout from "../../components/reusable/Checkout";
import CustomerContext from "../../context/customer-context";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { customer, loading } = useContext(CustomerContext);

  useEffect(() => {
    if (!customer && loading === false) router.push("/checkout/shipping");
  }, [customer, loading]);

  console.log(customer);

  return (
    <div className="container mt-4 ">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <Checkout step1 step2 step3 page="payment" />
          <h2 className="text-center">Payment</h2>
        </div>
      </div>
    </div>
  );
};

export default index;
