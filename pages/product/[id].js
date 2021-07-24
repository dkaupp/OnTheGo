import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import http from "../../services/http";
import Rating from "../../components/reusable/Rating";
import QuantyIcon from "../../components/icons/QuantityIcons";
import styles from "../../styles/Product.module.css";
import CartContext from "../../context/cart-context";
import Spinner from "../../components/reusable/Spinner";

function Product({
  product: {
    name,
    image,
    description,
    rating,
    price,
    stock,
    qty: initialQuantity,
    _id,
    numReviews,
  },
}) {
  const [loading, setLoading] = useState(true);
  const { getCartLocal } = useContext(CartContext);
  const [qty, setQty] = useState(initialQuantity);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    function getQuantity() {
      const cart = getCartLocal();
      if (cart) {
        const item = cart.cart.find((c) => c.item._id === _id);
        item && setCartQuantity(item.quantity);
      }
    }

    getQuantity();
    setLoading(false);
  }, [_id, getCartLocal]);

  const handleQtyChange = (operator) => {
    if (operator === "-" && qty > 1) {
      return setQty((q) => q - 1);
    }
    if (operator === "+" && qty + cartQuantity < stock) {
      return setQty((q) => q + 1);
    }
  };
  if (loading) return <Spinner />;

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <Image src={image.url} height={600} width={800} alt={description} />
          </div>
          <div className="col-lg-4 col-md-6">
            <h2>{name.toUpperCase()}</h2>
            <hr />
            <p className="mt-4">{description}</p>
            <hr />
            <p className={styles.para}>Price : ${price}</p>
            <hr />
            <Rating rating={rating} numReviews={numReviews} />
            <hr />
            <div>
              <div className="d-flex">
                <div onClick={() => handleQtyChange("-")}>
                  <QuantyIcon type="-" />
                </div>
                <span className={styles.spanRating}>{qty}</span>
                <div onClick={() => handleQtyChange("+")}>
                  <QuantyIcon />
                </div>
              </div>
            </div>
            <hr />
            <Link href={`/product/add-review/${_id}`} passHref>
              <button
                className="btn btn-outline-dark"
                disabled={stock <= 0 ? true : false}
                style={{ marginRight: 10 }}
              >
                ADD REVIEW
              </button>
            </Link>
            <Link
              href={`/cart/?id=${_id}&qty=${qty - cartQuantity}`}
              as="/cart"
              passHref
            >
              <button
                className="btn btn-dark"
                disabled={stock <= 0 ? true : false}
              >
                ADD TO CART
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;

export async function getServerSideProps({ params: { id } }) {
  const { data: product } = await http.get(`items/${id}`);
  product.qty = 1;

  return {
    props: {
      product,
      revalidate: 1,
    },
  };
}
