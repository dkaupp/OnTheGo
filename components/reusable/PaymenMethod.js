import styles from "../../styles/CartList.module.css";

const PaymentMethod = ({ paymentMethod }) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>Payment Method</span>
      <br />
      <span className={styles.spanName}>{paymentMethod}</span>
    </div>
  );
};

export default PaymentMethod;
