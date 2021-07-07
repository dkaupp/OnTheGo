import { useContext, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Image from "next/image";
import TrashIcon from "../../components/icons/TrashIcon";
import QuantityIcons from "../icons/QuantityIcons";
import styles from "../../styles/CartList.module.css";
import CartContext from "../../context/cart-context";

const CartListItem = ({ items: { item, quantity }, updateCart }) => {
  const { removeItemFromCart, addItemToCart, deleteItemFromCart, clearCart } =
    useContext(CartContext);

  const handleQuantityChange = async (operator) => {
    if (operator === "-") {
      await removeItemFromCart(item._id);
      updateCart();
    } else {
      if (item.stock <= quantity) {
        console.log("Not enought items in stock");
      } else {
        await addItemToCart(item._id);
        updateCart();
      }
    }
  };

  const handleDelete = async () => {
    await deleteItemFromCart(item._id);
    updateCart();
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4 pt-2 pb-2 items rounded">
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
        <div onClick={() => handleQuantityChange("-")}>
          <QuantityIcons
            type="-"
            width="28"
            height="29"
            className={styles.qIcons}
          />
        </div>

        <span className={styles.spanQuantity}>{quantity}</span>
        <div onClick={() => handleQuantityChange("+")}>
          <QuantityIcons width="28" height="29" className={styles.qIcons} />
        </div>
        <span className={styles.spanPrice}>$ {item.price}</span>
        <div onClick={handleDelete}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};

export default CartListItem;
