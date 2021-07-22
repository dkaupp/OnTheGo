import { useState } from "react";

const initialFilter = {
  id: "1",
  name: "Posted",
  key: "date",
  order: "desc",
};

const useSearch = (products = [], categories) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [searchInput, setSearchInput] = useState("");

  const onSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredByCategory = selectedCategory
    ? products.filter(
        (product) => product.category._id === selectedCategory._id
      )
    : products;

  const filteredBySearchInput = searchInput
    ? filteredByCategory.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase())
      )
    : filteredByCategory;

  const sortProducts = (products, key, order) => {
    if (key === "price") {
      return order !== "asc"
        ? product.sort((a, b) => (a.price < b.price ? -1 : 1))
        : product.sort((a, b) => (a.price < b.price ? -1 : 1)).reverse();
    }
    if (key === "date") {
      return order !== "asc"
        ? products
            .sort((a, b) =>
              a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
            )
            .reverse()
        : products.sort((a, b) =>
            a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
          );
    }
    return order !== "asc"
      ? products.sort((a, b) =>
          a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
        )
      : products
          .sort((a, b) =>
            a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 1
          )
          .reverse();
  };

  const filtered = sortProducts(
    filteredBySearchInput,
    selectedFilter.key,
    selectedFilter.order
  );

  const getCategory = (id) =>
    categories.find((category) => category._id === id);

  const onSelectedFilter = (item) => {
    setSelectedFilter(item);
  };

  const onSelectedCategory = (id) => {
    const category = getCategory(id);
    setSelectedCategory(category);
  };

  const clearSelectedCategory = () => setSelectedCategory(null);
  const clearSelectedFilter = () => setSelectedFilter(initialFilter);

  const onClearFilters = () => {
    clearSelectedCategory();
    clearSelectedFilter();
  };

  return {
    filtered,
    onSearch,
    searchInput,
    sortProducts,
    onSelectedFilter,
    onSelectedCategory,
    selectedFilter,
    selectedCategory,
    onClearFilters,
  };
};

export default useSearch;
