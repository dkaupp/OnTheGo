import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { Layout } from "../components/layout/Layout";
import { ProductsContextProvider } from "../context/products-context";
import { CartContextProvider } from "../context/cart-context";
import { CustomerContextProvider } from "../context/customer-context";
import { AuthContextProvider } from "../context/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CustomerContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartContextProvider>
        </ProductsContextProvider>
      </CustomerContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
