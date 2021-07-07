import { useContext } from "react";
import styles from "../../styles/TotalTable.module.css";
import CartContext from "../../context/cart-context";

const TotalTable = ({ totalAmount, totalQuantity, updateCart }) => {
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
              <p className={styles.para}>SUBTOTAL {totalQuantity} ITEMS</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className={styles.listDiv}>
              <p className={styles.para}>$ {totalAmount}</p>
            </div>
          </li>
          <li className="list-group-item">
            <div className={styles.buttonsContainer}>
              <button className="btn btn-secondary" onClick={handleClear}>
                {" "}
                CLEAR CART
              </button>
              <button className="btn btn-dark">CHECK OUT</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TotalTable;
