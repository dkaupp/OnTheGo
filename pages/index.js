import { useContext, useEffect, useState } from "react";
import ProductsContext from "../context/products-context";
import CardItem from "../components/reusable/CardItem";
import http from "../api/http";
import Spinner from "../components/reusable/Spiner";

export default function Home({ data }) {
  const [loading, setLoading] = useState(false);
  const { updateProducts } = useContext(ProductsContext);

  useEffect(() => {
    setLoading(true);
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

  if (!data) return { notFound: true };
  return {
    props: { data },
    revalidate: 6000,
  };
}
