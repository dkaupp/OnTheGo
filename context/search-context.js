import { createContext, useState, useEffect } from "react";

const SearchContext = createContext(null);

const initialFilter = {
  id: "1",
  name: "Posted",
  key: "date",
  order: "desc",
};

export function SearchContextProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [key, setKey] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const context = {
    setSelectedCategory,
    selectedCategory,
    key,
    setKey,
  };
  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
}

export default SearchContext;
