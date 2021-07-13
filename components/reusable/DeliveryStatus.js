import styles from "../../styles/CartList.module.css";

const DeliveryStatus = ({ delivery }) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>DELIVERY STATUS</span>
      <br />
      <span className={styles.spanName} style={{ color: "orange" }}>
        {delivery.toUpperCase()}
      </span>
    </div>
  );
};

export default DeliveryStatus;
