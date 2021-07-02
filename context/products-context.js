import { createContext, useState } from "react";

const ProductsContext = createContext(null);

export function ProductsContextProvider({ children, initialProduct }) {
  const [products, setProducts] = useState(initialProduct);
  function updateProducts(data) {
    setProducts(data);
  }

  const getProductById = (id) => products.find((product) => product.id === id);
  const context = {
    products,
    getProductById,
    updateProducts,
  };
  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext;
