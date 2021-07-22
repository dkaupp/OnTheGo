import { useContext, useEffect, useState } from "react";
import ProductsContext from "../context/products-context";
import CardItem from "../components/reusable/CardItem";
import http from "../api/http";
import Spinner from "../components/reusable/Spinner";
import CategoriesContext from "../context/categories-context";

export default function Home({ data, categories }) {
  const [loading, setLoading] = useState(true);
  const { updateProducts } = useContext(ProductsContext);
  const { updateCategories } = useContext(CategoriesContext);

  useEffect(() => {
    updateProducts(data);
    setLoading(false);
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container">
      <div className="row">
        {data.map((product) => (
          <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 xl-3">
            <CardItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await http.get("/items");
  const { data: categories } = await http.get("/category");

  if (!data) return { notFound: true };
  if (!categories) return { notFound: true };
  return {
    props: { data, categories },
    revalidate: 6000,
  };
}
