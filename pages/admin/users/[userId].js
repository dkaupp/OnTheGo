import { useEffect, useState, useContext } from "react";
import getUserApi from "../../../api/getUserApi";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth-context";
import Spinner from "../../../components/reusable/Spinner";
import useFormShipping from "../../../hooks/userFormShipping";
import Joi from "joi-browser";
import editUserApi from "../../../api/editUserApi";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  email: Joi.string().email().min(5).max(30).required().label("Email"),
};

const EditUser = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
  });

  const { user: adminUser, loading: loadingAdminUser } =
    useContext(AuthContext);

  const router = useRouter();

  const getUser = async () => {
    const response = await getUserApi(id);
    if (response.error) {
      console.log(error);
      setUserError(response.error);
    }
    setUser(response);
    setInitialData({
      name: response.name,
      email: response.email,
    });
    setAdmin(response.isAdmin ? true : false);
  };

  useEffect(() => {
    if (!adminUser && !loadingAdminUser) return router.reaplace("/");
    if (adminUser && !adminUser.isAdmin) return router.replace("/");

    getUser();
    setLoading(false);
  }, [adminUser, updated]);

  const { data, errors, handleChange, handleSubmit, setErrors } =
    useFormShipping({
      initialData,
      async onSubmit(data) {
        if (admin) {
          data.isAdmin = admin;
        }

        const response = await editUserApi(id, data);
        if (response.error) {
          return setError(response.error);
        }
        setUser(response);
        setUpdated(true);
      },
      schema,
      mode: true,
    });

  if (loading || !user) return <Spinner />;

  const { email, name, isAdmin } = data;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <div className="mb-3">
              <h2 className="text-center">Eddit User</h2>
              <label htmlFor="name" className="form-label fs-5">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                name="name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
              <div id="nameHelp" className="form-text">
                {errors && errors.name
                  ? errors.name
                  : name !== ""
                  ? "Ok"
                  : "Please enter your name"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fs-5">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                {errors && errors.email
                  ? errors.email
                  : email !== ""
                  ? "Ok"
                  : "Please enter your email"}
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={admin}
                  checked={admin}
                  id="admin"
                  onChange={(e) => setAdmin(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="admin">
                  Admin
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              REGISTER
            </button>
          </form>
          {updated && !error && (
            <div className="success mt-3 bg-success text-white p-2">
              USER UPDATED SUCCESSFULLY
            </div>
          )}
          {error && (
            <div className="success mt-3 bg-danger text-white p-2">
              {error.toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.userId,
    },
  };
}
