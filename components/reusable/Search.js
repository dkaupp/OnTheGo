import { useState, useEffect, useContext } from "react";
import CategoriesContext from "../../context/categories-context";
import { useRouter } from "next/router";
import Link from "next/link";
import SearchContext from "../../context/search-context";

const Search = () => {
  const { categories } = useContext(CategoriesContext);

  const { selectedCategory, setSelectedCategory, setKey, key } =
    useContext(SearchContext);
  const router = useRouter();
  if (!categories) return <div></div>;

  const handleSearch = () => {
    return router.push(`/search`);
  };

  return (
    <div
      style={{ marginLeft: "auto" }}
      className="mt-lg-0 mt-md-2 mt-sm-2 mt-xs-2 mt-2"
    >
      <div className="input-group">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedCategory
            ? selectedCategory.name[0].toUpperCase() +
              selectedCategory.name.slice(1)
            : "Categories"}
        </button>
        <ul className="dropdown-menu">
          {categories.map((c) => (
            <li key={c._id}>
              <a
                className="dropdown-item"
                onClick={() => setSelectedCategory(c)}
                style={{ cursor: "pointer" }}
              >
                {c.name[0].toUpperCase() + c.name.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <input
          type="text"
          className="form-control"
          aria-label="Text input with dropdown button"
          onChange={(e) => setKey(e.target.value)}
          placeholder="Search..."
          value={key}
        />
        <button className="btn btn-outline-secondary" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
