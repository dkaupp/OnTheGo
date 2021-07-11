import Link from "next/link";

const Checkout = ({ step1, step2, step3, step4, page }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <ul className="navbar-nav">
        <li className="nav-item">
          {step1 ? (
            <Link href="/singin">
              <a
                className={`nav-link ${page === "signin" && "active"}`}
                aria-current="page"
              >
                Sign In
              </a>
            </Link>
          ) : (
            <a className="nav-link disabled" disabled>
              Sign In
            </a>
          )}
        </li>
        <li className="nav-item">
          {step2 ? (
            <Link
              href={{
                pathname: "/checkout/shipping",
                query: { checkout: true },
              }}
            >
              <a
                className={`nav-link ${page === "shipping" && "active"}`}
                aria-current="page"
              >
                Shipping
              </a>
            </Link>
          ) : (
            <a className="nav-link disabled">Shipping</a>
          )}
        </li>
        <li className="nav-item">
          {step3 ? (
            <Link href="/checkout/payment">
              <a
                className={`nav-link ${page === "payment" && "active"}`}
                aria-current="page"
              >
                Payment
              </a>
            </Link>
          ) : (
            <a className="nav-link disabled" disabled>
              Payment
            </a>
          )}
        </li>
        <li className="nav-item">
          {step4 ? (
            <Link href="/order">
              <a className="nav-link">Place Order</a>
            </Link>
          ) : (
            <a className="nav-link disabled" disabled>
              Place Order
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Checkout;
