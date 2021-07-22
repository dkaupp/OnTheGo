import Link from "next/link";

const AdminNavigation = ({ page }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href={"/admin/users"}>
            <a
              className={`nav-link ${page === "users" && "active"}`}
              aria-current="page"
            >
              Users
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin">
            <a
              className={`nav-link ${page === "orders" && "active"}`}
              aria-current="page"
            >
              Orders
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin/products">
            <a
              className={`nav-link ${page === "products" && "active"}`}
              aria-current="page"
            >
              Products
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/admin/categories">
            <a
              className={`nav-link ${page === "categories" && "active"}`}
              aria-current="page"
            >
              Categories
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
