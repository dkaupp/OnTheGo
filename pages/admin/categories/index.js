import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth-context";
import Spinner from "../../../components/reusable/Spinner";
import getCategoriesApi from "../../../api/getCategoriesApi";
import AdminNavigation from "../../../components/reusable/AdminNavigation";
import Link from "next/link";
import styles from "../../../styles/Account.module.css";
import TrashIcon from "../../../components/icons/TrashIcon";
import deleteCategoryApi from "../../../api/deleteCategoryApi";

const AdminCategories = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user: adminUser, loading: loadingAdminUser } =
    useContext(AuthContext);

  const router = useRouter();

  const getCategories = async () => {
    const response = await getCategoriesApi();
    if (response.error) {
      setUserError(response.error.error);
    }
    setCategories(response);
  };

  useEffect(() => {
    if (!adminUser && !loadingAdminUser) return router.reaplace("/");
    if (adminUser && !adminUser.isAdmin) return router.replace("/");

    getCategories();
    setLoading(false);
  }, [adminUser, loadingAdminUser, router]);

  const handleDelete = async (id) => {
    const deletedCategory = await deleteCategoryApi(id);

    if (deletedCategory.error) {
      setError(deletedCategory.error.error);
    }

    getCategories();
  };

  if (loading || !adminUser || !categories) return <Spinner />;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xl-6 col-md-8">
          <AdminNavigation page="categories" />
          <h2 className="text-center mb-4 mt-2">Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c._id}>
                  <Link href={`/admin/categories/${c._id}`} passHref>
                    <td className={styles.tableLink}>{c._id}</td>
                  </Link>
                  <td className={styles.spanFinal}>{c.name}</td>
                  <td>
                    <div
                      onClick={() => handleDelete(c._id)}
                      className="d-flex justify-content-end"
                    >
                      <TrashIcon width="22" height="21" color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Link href={"/admin/categories/new-category"} passHref>
              <button className="btn btn-dark">ADD NEW CATEGORY</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
