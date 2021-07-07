import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { Layout } from "../components/layout/Layout";
import { ProductsContextProvider } from "../context/products-context";
import { CartContextProvider } from "../context/cart-context";
import authStorage from "../auth/storage";
import AuthContext from "../context/auth-context";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();
  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ProductsContextProvider>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthContext.Provider>
  );
}

export default MyApp;
