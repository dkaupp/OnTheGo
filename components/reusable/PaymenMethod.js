import styles from "../../styles/CartList.module.css";

const PaymentMethod = ({ paymentMethod }) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>PAYMENT METHOD</span>
      <br />
      <span className={styles.spanName}>{paymentMethod.toUpperCase()}</span>
    </div>
  );
};

export default PaymentMethod;
