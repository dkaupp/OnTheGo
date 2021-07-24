import { createContext, useState, useEffect } from "react";
import http from "../services/http";
import jwtDecode from "jwt-decode";

const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const tokenKey = "cartToken";

  useEffect(() => {
    const storageCart = getCartLocal();
    setCart(storageCart);
  }, []);

  const addItemToCart = async (id, qty = 1) => {
    const token = localStorage.getItem(tokenKey);

    try {
      const { data: cartToken } = await http.post(`/cart/${id}`, {
        qty: parseInt(qty),
        token,
      });
      const { items: newCart } = jwtDecode(cartToken);
      localStorage.setItem(tokenKey, cartToken);
      setCart(newCart);
    } catch (error) {
      setError(error);
    }
  };

  const removeItemFromCart = async (id, qty = 1) => {
    const token = localStorage.getItem(tokenKey);

    try {
      const { data: cartToken } = await http.put(`/cart/${id}`, {
        qty: parseInt(qty),
        token,
      });

      const { items: newCart } = jwtDecode(cartToken);
      localStorage.setItem(tokenKey, cartToken);
      setCart(newCart);
    } catch (error) {
      setError(error);
    }
  };

  const deleteItemFromCart = async (id) => {
    const token = localStorage.getItem(tokenKey);

    try {
      const { data: cartToken } = await http.put(`/cart/delete/${id}`, {
        token,
      });

      const { items: newCart } = jwtDecode(cartToken);
      localStorage.setItem(tokenKey, cartToken);

      setCart(newCart);
    } catch (error) {
      setError(error);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem(tokenKey);

    try {
      const { data: cartToken } = await http.delete(`cart/`, {
        token,
      });

      const { items: newCart } = jwtDecode(cartToken);
      localStorage.setItem(tokenKey, cartToken);

      setCart(newCart);
    } catch (error) {}
  };

  const populateCart = async (id, qty) => {
    if (!id || !qty) return;

    const token = localStorage.getItem(tokenKey);

    try {
      const { data: cartToken } = await http.post(
        `/cart/${id}`,
        token ? { qty: parseInt(qty), token } : { qty: parseInt(qty) }
      );
      const { items: newCart } = jwtDecode(cartToken);
      localStorage.setItem(tokenKey, cartToken);
      setCart(newCart);

      return newCart;
    } catch (error) {
      setError(error);
    }
  };

  const getCartLocal = () => {
    const cartToken = localStorage.getItem(tokenKey);

    if (!cartToken) return null;

    const { items: newCart } = jwtDecode(cartToken);

    return newCart;
  };

  const context = {
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    clearCart,
    populateCart,
    getCartLocal,
    cart,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartContext;
