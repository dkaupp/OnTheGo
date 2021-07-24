import Image from "next/image";
import styles from "../../styles/ListProduct.module.css";
import Rating from "../reusable/Rating";
import Link from "next/link";

const ListProduct = ({
  product: { image, description, name, price, rating, numReviews, _id },
}) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div
          className="col-lg-4 col-md-6 col-sm-12"
          style={{ cursor: "pointer" }}
        >
          <Link href={`/product/${_id}`} passHref>
            <Image
              className={styles.productImage}
              src={image.url}
              height={300}
              width={400}
              alt={description}
            />
          </Link>
        </div>
        <div className="col-lg-4 col-md-6 col-sm">
          <Link href={`/product/${_id}`} passHref>
            <h2 style={{ cursor: "pointer" }}>{name.toUpperCase()}</h2>
          </Link>
          <p className="mt-1">{description}</p>
          <p className={styles.para}>Price : ${price}</p>
          <Rating rating={rating} numReviews={numReviews} />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
