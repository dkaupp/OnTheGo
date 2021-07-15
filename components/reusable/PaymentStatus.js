import styles from "../../styles/CartList.module.css";

const PaimentStatus = ({ isPaid }) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>Paymen Status</span>
      <br />
      <span
        className={styles.spanName}
        style={isPaid ? { color: "green" } : { color: "red" }}
      >
        {isPaid ? "Paid" : "Not Paid"}
      </span>
    </div>
  );
};

export default PaimentStatus;
