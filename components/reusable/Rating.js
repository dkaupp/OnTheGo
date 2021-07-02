import RatingIcons from "../icons/RatingIcons";
import styles from "../../styles/Rating.module.css";

function Rating({ rating }) {
  return (
    <div>
      <span className={styles.ratingSpan}>
        {rating >= 1 ? (
          <RatingIcons type="full" />
        ) : value >= 0.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 2 ? (
          <RatingIcons type="full" />
        ) : value >= 1.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 3 ? (
          <RatingIcons type="full" />
        ) : rating >= 2.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons />
        )}
      </span>
      <span className={styles.ratingSpan}>
        {rating >= 4 ? (
          <RatingIcons type="full" />
        ) : rating >= 3.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons />
        )}
      </span>
      <span mr-1>
        {rating >= 5 ? (
          <RatingIcons type="full" />
        ) : rating >= 4.5 ? (
          <RatingIcons type="half" />
        ) : (
          <RatingIcons />
        )}
      </span>
    </div>
  );
}

export default Rating;
