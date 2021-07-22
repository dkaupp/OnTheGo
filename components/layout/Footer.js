import styles from "../../styles/Footer.module.css";

function Footer() {
  return (
    <footer className="text-center mt-3">
      <p className={styles.text}>
        Copyright <span className={styles.copy}>&copy;</span> OnTheGo 2021
      </p>
    </footer>
  );
}

export default Footer;
