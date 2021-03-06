import { useEffect, useContext, useState } from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";
import CartListItem from "../../components/reusable/CartListItem";
import Spiner from "../../components/reusable/Spinner";
import TotalTable from "../../components/reusable/TotalTable";
import styles from "../../styles/Cart.module.css";
import Head from "next/head";

const Cart = ({ router }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
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
    populateComponent(id, qty);
    setLoading(false);
  }, [id]);

  if (loading) return <Spiner />;

  const updateCart = () => {
    const storageCart = getCartLocal();
    setCart(storageCart);
  };

  if (!cart)
    return (
      <>
        <Head>
          <title>Shopping Cart</title>
          <meta name="description" content="Add items to the shopping cart" />
        </Head>
        <div className="container">
          <div className="row no-gutters mt-4 text-center">
            <h3>There are no items in the cart</h3>
            <Link href={"/"} passHref>
              <div className={styles.cartButton}>
                <button className="btn btn-outline-dark">
                  CONTINUE SHOPPING
                </button>
              </div>
            </Link>
          </div>
        </div>
      </>
    );

  const { cart: items, totalAmount, totalQuantity } = cart;

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="description" content="Shopping cart page" />
      </Head>

      <div className="container">
        <div className="row no-gutters">
          <div className="col-lg-8 col-md-12">
            {items &&
              items.map((item) => (
                <CartListItem
                  key={item.item._id}
                  items={item}
                  updateCart={updateCart}
                />
              ))}
            <Link href={"/"} passHref>
              <div className={styles.cartButton}>
                <button className="btn btn-outline-dark">
                  CONTINUE SHOPPING
                </button>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-12">
            <TotalTable
              totalAmount={totalAmount}
              totalQuantity={totalQuantity}
              updateCart={updateCart}
              user={user}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Cart);
