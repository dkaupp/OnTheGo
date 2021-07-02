import styles from "../../styles/Layout.module.css";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Header />
      <div className={styles.mainContainer}>{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "On The Go",
  description: "Stop by and check out our fashion so you can get goin.",
  keywords: "fashion , hats , shoes , bags , online store",
};
