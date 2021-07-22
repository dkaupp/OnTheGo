import RatingIcons from "../icons/RatingIcons";
import styles from "../../styles/Rating.module.css";

function Rating({ rating, numReviews }) {
  return (
    <div className="d-flex align-items-center">
      <span className={styles.ratingSpan}>
        {rating >= 1 ? (
          <RatingIcons type="full" />
        ) : rating >= 0.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons type="non" />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 2 ? (
          <RatingIcons type="full" />
        ) : rating >= 1.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons type="none" />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 3 ? (
          <RatingIcons type="full" />
        ) : rating >= 2.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons type="none" />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 4 ? (
          <RatingIcons type="full" />
        ) : rating >= 3.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons type="none" />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 5 ? (
          <RatingIcons type="full" />
        ) : rating >= 4.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons type="none" />
        )}
      </span>
      <span
        className={styles.ratingSpan}
        style={{ marginLeft: 10, marginTop: 3 }}
      >
        {numReviews} reviews
      </span>
    </div>
  );
}

export default Rating;
