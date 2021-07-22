import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { Layout } from "../components/layout/Layout";
import { ProductsContextProvider } from "../context/products-context";
import { CartContextProvider } from "../context/cart-context";
import { CustomerContextProvider } from "../context/customer-context";
import { AuthContextProvider } from "../context/auth-context";
import { OrderContextProvider } from "../context/order-context";
import { CategoriesContextProvider } from "../context/categories-context";
import { SearchContextProvider } from "../context/search-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CustomerContextProvider>
        <SearchContextProvider>
          <ProductsContextProvider>
            <CategoriesContextProvider>
              <CartContextProvider>
                <OrderContextProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </OrderContextProvider>
              </CartContextProvider>
            </CategoriesContextProvider>
          </ProductsContextProvider>
        </SearchContextProvider>
      </CustomerContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
