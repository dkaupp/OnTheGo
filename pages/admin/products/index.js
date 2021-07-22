import { useState, useEffect, useContext } from "react";
import getAllProductsApi from "../../../api/getAllProductsApi";
import AuthContext from "../../../context/auth-context";
import { useRouter } from "next/router";
import Spinner from "../../../components/reusable/Spinner";
import AdminNavigation from "../../../components/reusable/AdminNavigation";
import Link from "next/link";
import styles from "../../../styles/Account.module.css";
import TrashIcon from "../../../components/icons/TrashIcon";
import deleteProductApi from "../../../api/deleteProductApi";

const AdminProducts = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { user, loading: loadingUser } = useContext(AuthContext);

  const getProducts = async () => {
    const response = await getAllProductsApi();

    if (response.error) {
      console.log(error);
      return setError(response.error);
    }
    setProducts(response);
  };

  useEffect(() => {
    if (!user && !loadingUser) {
      return router.reaplace("/");
    }
    if (user && !user.isAdmin) return router.replace("/");

    getProducts();
    setLoading(false);
  }, []);

  const handleDelete = async (id) => {
    const deletedProduct = await deleteProductApi(id);

    if (deletedProduct.error) {
      console.log(deletedProduct.error);
      setError(deletedProduct.error);
    }

    getProducts();
  };

  if (loading || !products) return <Spinner />;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12">
          <AdminNavigation page="products" />
          <h2 className="text-center mb-4 mt-2">Users</h2>
          <table className="table" style={{ marginLeft: 20 }}>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <Link href={`/admin/products/${p._id}`}>
                    <td className={styles.tableLink}>{p._id}</td>
                  </Link>
                  <td className={styles.spanFinal}>{p.name}</td>
                  <td className={styles.spanFinal}>{p.category.name}</td>
                  <td className={styles.spanFinal}>$ {p.price}</td>
                  <td className={styles.spanFinal}>
                    <div onClick={() => handleDelete(p._id)}>
                      <TrashIcon width="22" height="21" color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Link href={"/admin/products/new-product"}>
              <button className="btn btn-dark">ADD NEW PRODUCT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
