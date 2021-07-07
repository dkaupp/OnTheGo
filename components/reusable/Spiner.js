import styles from "../../styles/Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
