import { useContext, useEffect } from "react";
import ProductsContext from "../context/products-context";
import CardItem from "../components/reusable/CardItem";
import { API_URL } from "../config/index";

export default function Home({ data }) {
  const { products, updateProducts } = useContext(ProductsContext);

  useEffect(() => {
    updateProducts(data);
  }, []);

  if (products === undefined) {
    <p>Loading....</p>;
  }

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
  const res = await fetch(`${API_URL}/api/items/`);
  const data = await res.json();

  if (!data) return { notFound: true };
  return {
    props: { data },
    revalidate: 1,
  };
}
