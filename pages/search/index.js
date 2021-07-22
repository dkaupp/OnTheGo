import { useState, useEffect, useContext } from "react";
import http from "../../api/http";
import SearchContext from "../../context/search-context";
import ListProduct from "../../components/reusable/ListProduct";

const initialFilter = {
  name: "Added: New to Old",
  key: "date",
  order: "desc",
};

const SearchPage = ({ products }) => {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const { selectedCategory, key: searchInput } = useContext(SearchContext);

  if (!products) return <div>Loading</div>;

  const filteredByCategory = selectedCategory
    ? products.filter((p) => p.category._id === selectedCategory._id)
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
        ? products.sort((a, b) => (a.price < b.price ? -1 : 1))
        : products.sort((a, b) => (a.price < b.price ? -1 : 1)).reverse();
    }
    if (key === "rating") {
      return order !== "asc"
        ? products.sort((a, b) => (a[key] < b[key] ? -1 : 1))
        : products.sort((a, b) => (a[key] < b[key] ? -1 : 1)).reverse();
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

  const handleSelectFilter = (name, filter, order = "desc") => {
    return setSelectedFilter((prevState) => ({
      name,
      key: filter,
      order,
    }));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="btn-group mt-3">
          <label
            type="button"
            className="btn  dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort by: {selectedFilter.name}
          </label>
          <ul className="dropdown-menu" style={{ width: "100%" }}>
            <li>
              <a
                className="dropdown-item "
                onClick={() =>
                  handleSelectFilter("Price: Low to Hight", "price", "desc")
                }
                style={{ cursor: "pointer" }}
              >
                Price: Low to Hight
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() =>
                  handleSelectFilter("Price: Hight to Low", "price", "asc")
                }
                style={{ cursor: "pointer" }}
              >
                Price: Hight to Low
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() =>
                  handleSelectFilter("Added: New to Old", "date", "desc")
                }
                style={{ cursor: "pointer" }}
              >
                Added: New to Old
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() =>
                  handleSelectFilter("Added: Old to New", "date", "asc")
                }
                style={{ cursor: "pointer" }}
              >
                Added: Old to New
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() =>
                  handleSelectFilter("Rating: Low to Hight", "rating", "desc")
                }
                style={{ cursor: "pointer" }}
              >
                Rating: Low to Hight
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() =>
                  handleSelectFilter("Rating: Hight to Low", "rating", "asc")
                }
                style={{ cursor: "pointer" }}
              >
                Rating: Hight to Low
              </a>
            </li>
          </ul>
        </div>
      </div>
      {filtered.length ? (
        <div className="row">
          {filtered.map((product) => (
            <ListProduct key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="row text-center mt-4">
          <h2>No products match your search input.</h2>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

export async function getServerSideProps() {
  const { data: products } = await http.get("/items");

  if (!products) return { notFound: true };
  return {
    props: {
      products,
    },
  };
}
