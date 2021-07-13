import styles from "../../styles/CartList.module.css";

const PaimentStatus = ({ isPaid }) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>PAYMENT STATUS</span>
      <br />
      <span
        className={styles.spanName}
        style={isPaid ? { color: "green" } : { color: "red" }}
      >
        {isPaid ? "PAID" : "NOT PAID"}
      </span>
    </div>
  );
};

export default PaimentStatus;
