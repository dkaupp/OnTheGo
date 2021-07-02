import Link from "next/link";
import styles from "../../styles/NavIcons.module.css";

function NavIcons({ icon, link, text }) {
  return (
    <Link href={link}>
      <a className="nav-link">
        <div className={styles.navIcons}>
          {icon}
          <span className={styles.span}>{text}</span>
        </div>
      </a>
    </Link>
  );
}

export default NavIcons;
