import Image from "next/image";
import styles from "../../styles/CartList.module.css";

const OrderListItem = ({ items: { item, quantity }, final = false }) => {
  const itemTotalPrice = item.price * quantity;

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 pt-2  items rounded">
      <div className="d-flex flex-row">
        <Image
          className="rounded"
          src={item.image.url}
          width={80}
          height={60}
        />
        <div className="m-2">
          <span className={styles.spanName}>{item.name.toUpperCase()}</span>
          <span className="spec">{item.description}</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center">
        <span className={final ? styles.spanFinal : styles.spanPrice}>
          $ {item.price}
        </span>
        <span className={final ? styles.spanFinal : styles.spanPrice}>X</span>
        <span className={final ? styles.spanFinal : styles.spanPrice}>
          {quantity}
        </span>
        <span className={final ? styles.spanFinal : styles.spanPrice}> =</span>
        <span className={final ? styles.spanFinal : styles.spanPrice}>
          $ {itemTotalPrice}
        </span>
      </div>
    </div>
  );
};

export default OrderListItem;
