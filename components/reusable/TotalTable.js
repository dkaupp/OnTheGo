import { useContext } from "react";
import styles from "../../styles/TotalTable.module.css";
import CartContext from "../../context/cart-context";
import Link from "next/link";

const TotalTable = ({ totalAmount, totalQuantity, updateCart, user }) => {
  const { clearCart } = useContext(CartContext);

  const handleClear = async () => {
    await clearCart();
    updateCart();
  };
  return (
    <div className={styles.cardContainer}>
      <div className="card rounded">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className={styles.listDiv}>
              <p className={styles.title}>
                Subtotal ({totalQuantity} {totalQuantity > 1 ? "Items" : "Item"}
                )
              </p>
            </div>
          </li>
          <li className="list-group-item">
            <div className={styles.listDiv}>
              <p className={styles.para}>$ {totalAmount}</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className={styles.buttonsContainer}>
              <button
                className="btn btn-secondary"
                style={{ width: "100%", marginRight: 2 }}
                onClick={handleClear}
              >
                CLEAR CART
              </button>
              <Link
                href={{
                  pathname: user ? "/checkout/shipping" : "/singin",
                  query: { checkout: "activated" },
                }}
                passHref
              >
                <button
                  className="btn btn-dark"
                  style={{ width: "100%", marginLeft: 2 }}
                >
                  CHECK OUT
                </button>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TotalTable;
