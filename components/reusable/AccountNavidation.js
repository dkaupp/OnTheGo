import Link from "next/link";

const AccountNavigation = ({ page }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href={"/account/change-email"}>
            <a
              className={`nav-link ${page === "email" && "active"}`}
              aria-current="page"
            >
              Change Email
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/account/orders">
            <a
              className={`nav-link ${page === "orders" && "active"}`}
              aria-current="page"
            >
              Orders
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/account/change-password">
            <a
              className={`nav-link ${page === "password" && "active"}`}
              aria-current="page"
            >
              Change Password
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AccountNavigation;
