import styles from "../../styles/CartList.module.css";

const TotalOrderTable = ({ totalAmount, totalQuantity }, final = false) => {
  const shipping = 5;
  const totalOrder = totalAmount + shipping;
  return (
    <>
      <div className="d-flex justify-content-between align-items-center items rounded">
        <div className="d-flex flex-row">
          <span
            className={final ? styles.spanName : styles.spanPrice}
            style={final ? null : { fontSize: "1.2rem" }}
          >
            SUBTOTAL
          </span>
        </div>
        <div className="d-flex flex-row align-items-center">
          <span className={final ? styles.spanName : styles.spanPrice}>
            $ {totalAmount}
          </span>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center items rounded">
        <div className="d-flex flex-row">
          <span
            className={final ? styles.spanName : styles.spanPrice}
            style={final ? null : { fontSize: "1.2rem" }}
          >
            SHIPPING
          </span>
        </div>

        <div className="d-flex flex-row align-items-center">
          <span className={final ? styles.spanName : styles.spanPrice}>
            $ 5
          </span>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center items rounded">
        <div className="d-flex flex-row">
          <span
            className={final ? styles.spanName : styles.spanPrice}
            style={final ? { textAlign: "initial" } : { fontSize: "1.2rem" }}
          >
            TOTAL
          </span>
        </div>

        <div className="d-flex flex-row align-items-center">
          <span className={final ? styles.spanName : styles.spanPrice}>
            $ {totalOrder}
          </span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default TotalOrderTable;
