import { useEffect, useContext, useState } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import CartContext from "../../context/cart-context";
import CartListItem from "../../components/reusable/CartListItem";
import Spiner from "../../components/reusable/Spiner";
import TotalTable from "../../components/reusable/TotalTable";
import styles from "../../styles/Cart.module.css";

const Cart = ({ router }) => {
  const [loading, setLoading] = useState(false);
  const { populateCart, getCartLocal } = useContext(CartContext);

  const [cart, setCart] = useState([]);

  const { id, qty } = router.query;

  async function populateComponent(id, qty) {
    if (!id) {
      const storageCart = getCartLocal();
      setCart(storageCart);
    } else {
      const newCart = await populateCart(id, qty);
      setCart(newCart);
    }
  }

  useEffect(() => {
    setLoading(true);
    populateComponent(id, qty);
    setLoading(false);
  }, [id, qty]);

  if (loading) return <Spiner />;

  const updateCart = () => {
    const storageCart = getCartLocal();
    setCart(storageCart);
  };

  if (!cart) return <div>There are no items in the cart</div>;

  const { cart: items, totalAmount, totalQuantity } = cart;

  return (
    <div className="container">
      <div className="row no-gutters">
        <div className="col-md-8">
          {items &&
            items.map((item) => (
              <CartListItem
                key={item.item._id}
                items={item}
                updateCart={updateCart}
              />
            ))}
          <Link href={"/"}>
            <div className={styles.cartButton}>
              <button className="btn btn-outline-dark">
                CONTINUE SHOPPING
              </button>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <TotalTable
            totalAmount={totalAmount}
            totalQuantity={totalQuantity}
            updateCart={updateCart}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Cart);
