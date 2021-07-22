import { createContext, useState, useEffect } from "react";
import getCategoriesApi from "../api/getCategoriesApi";

const CategoriesContext = createContext(null);

export function CategoriesContextProvider({ children, initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    const response = await getCategoriesApi();
    if (response.error) {
      console.log(error);
      setError(response.error);
    }
    setCategories(response);
  };

  useEffect(() => {
    getCategories();
    setLoading(false);
  }, []);

  const context = {
    categories,
    loading,
    setSelectedCategory,
    selectedCategory,
  };
  return (
    <CategoriesContext.Provider value={context}>
      {children}
    </CategoriesContext.Provider>
  );
}

export default CategoriesContext;
