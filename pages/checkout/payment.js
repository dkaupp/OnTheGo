import { useContext, useEffect, useState } from "react";
import Checkout from "../../components/reusable/Checkout";
import CustomerContext from "../../context/customer-context";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { customer, loading, addPaymentMethod } = useContext(CustomerContext);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  useEffect(() => {
    if (!customer && loading === false) router.push("/checkout/shipping");
  }, [customer, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPaymentMethod(paymentMethod);
    router.push("/checkout/placeorder");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <Checkout step1 step2 step3 page="payment" />
            <h2 className="text-center mb-2 mt-2">PAYMENT METHOD</h2>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="Paypal"
                  id="payment"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="payment">
                  Use Paypal
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              PAYMENT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
