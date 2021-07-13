import styles from "../../styles/CartList.module.css";

const ShippingAddress = ({
  shippingAddress: { address, city, postalCode, country },
}) => {
  return (
    <div className="d-flex justify-content-between align-items-centeritems rounded">
      <span className={styles.spanName}>DELIVERY ADDRESS</span>
      <span className={styles.spanName}></span>
      <span className={styles.spanName}>
        {address.toUpperCase()} {city.toUpperCase()} {postalCode}{" "}
        {country.toUpperCase()}
      </span>
    </div>
  );
};

export default ShippingAddress;
