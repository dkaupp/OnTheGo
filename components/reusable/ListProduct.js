import Image from "next/image";
import styles from "../../styles/ListProduct.module.css";
import Rating from "../reusable/Rating";

const ListProduct = ({
  product: { image, description, name, price, rating, numReviews },
}) => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <Image
            className={styles.productImage}
            src={image.url}
            height={300}
            width={400}
            alt={description}
          />
        </div>
        <div className="col-lg-4 col-md-6 col-sm">
          <h2>{name.toUpperCase()}</h2>
          <p className="mt-1">{description}</p>
          <p className={styles.para}>Price : ${price}</p>
          <Rating rating={rating} numReviews={numReviews} />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
