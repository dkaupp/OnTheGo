import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import AdminNavigation from "../../../components/reusable/AdminNavigation";
import Spinner from "../../../components/reusable/Spinner";
import Link from "next/link";
import styles from "../../../styles/Account.module.css";
import TrashIcon from "../../../components/icons/TrashIcon";
import { useRouter } from "next/router";
import getAllUsersApi from "../../../api/getAllUsersApi";
import deleteUserApi from "../../../api/deleteUserApi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersError, setUsersError] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { user, loadin: loadingUser } = useContext(AuthContext);

  const getAllUsers = async () => {
    const response = await getAllUsersApi();

    if (response.error) {
      return setUsersError(response.error.error);
    }

    setUsers(response);
    setLoadingUsers(false);
  };

  useEffect(() => {
    if (!user && !loadingUser) {
      return router.replace("/");
    }
    if (user && !user.isAdmin) return router.replace("/");
    getAllUsers();
    setLoading(false);
  }, [user, loadingUser, router]);

  if (loading || loadingUsers) return <Spinner />;

  const handleDelete = async (id) => {
    const response = await deleteUserApi(id);
    if (response.error) return setError(response.error);

    getAllUsers();
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12">
          <AdminNavigation page="users" />
          <h2 className="text-center mb-4 mt-2">Users</h2>
          <table className="table" style={{ marginLeft: 20 }}>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">User</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <Link href={`/admin/users/${u._id}`} passHref>
                    <td className={styles.tableLink}>{u._id}</td>
                  </Link>
                  <td className={styles.spanFinal}>{u.name}</td>
                  <td className={styles.spanFinal}>$ {u.email}</td>
                  <td className={styles.spanFinal}>
                    {u.isAdmin ? "True" : "False"}
                  </td>
                  <td className={styles.spanFinal}>
                    <div onClick={() => handleDelete(u._id)}>
                      <TrashIcon width="22" height="21" color="red" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
