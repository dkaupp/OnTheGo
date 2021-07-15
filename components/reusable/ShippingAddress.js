import styles from "../../styles/CartList.module.css";

const ShippingAddress = ({
  shippingAddress: { address, city, postalCode, country },
}) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>Delivety Address</span>
      <span className={styles.spanName}>
        {address}, {city}, {postalCode}, {country}
      </span>
    </div>
  );
};

export default ShippingAddress;
