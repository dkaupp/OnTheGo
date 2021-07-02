import Image from "next/image";
import { API_URL } from "../../config";
import Rating from "../../components/reusable/Rating";

function Product({ product: { name, image, description, rating, price } }) {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <Image src={image.url} height={600} width={800} alt={name} />
        </div>
        <div className="col-md-3">
          <h2>{name.toUpperCase()}</h2>
          <p className="mt-4">{description}</p>
          <Rating rating={3.5} />
        </div>
      </div>
    </div>
  );
}

export default Product;

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/items/`);
  const products = await res.json();

  const paths = products.map((product) => ({ params: { id: product._id } }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/items/${id}`);
  const product = await res.json();
  return {
    props: {
      product,
      revalidate: 1,
    },
  };
}

// export async function getServerSideProps({ query: { id } }) {
//   const res = await fetch(`${API_URL}/api/items/${id}`);
//   const product = await res.json();
//   return {
//     props: {
//       product,
//     },
//   };
// }
