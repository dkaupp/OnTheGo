import { useContext, useEffect, useState } from "react";
import ProductsContext from "../context/products-context";
import CardItem from "../components/reusable/CardItem";
import http from "../services/http";
import Spinner from "../components/reusable/Spinner";

export default function Home({ data }) {
  const [loading, setLoading] = useState(true);
  const { updateProducts } = useContext(ProductsContext);

  useEffect(() => {
    updateProducts(data);
    setLoading(false);
  }, [updateProducts, data]);

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

export async function getServerSideProps() {
  const { data } = await http.get("/items");

  if (!data) return { notFound: true };
  return {
    props: { data },
  };
}
