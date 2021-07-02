import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { Layout } from "../components/layout/Layout";
import { ProductsContextProvider } from "../context/products-context";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductsContextProvider>
  );
}

export default MyApp;
