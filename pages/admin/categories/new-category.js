import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth-context";
import Spinner from "../../../components/reusable/Spinner";
import Joi from "joi-browser";
import useForm from "../../../hooks/useForm";
import createCategoryApi from "../../../api/createCategoryApi";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
};

const CreateNewCategory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user: adminUser, loading: loadingAdminUser } =
    useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!adminUser && !loadingAdminUser) return router.reaplace("/");
    if (adminUser && !adminUser.isAdmin) return router.replace("/");
    setLoading(false);
  }, [adminUser, loadingAdminUser, router]);

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      name: "",
    },
    async onSubmit(data) {
      const newCategory = await createCategoryApi(data);

      if (newCategory.error) {
        return setError(newCategory.error.error);
      }

      router.push("/admin/categories");
    },
    schema,
  });

  if (loading) return <Spinner />;

  const { name } = data;
  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <h2 className="text-center mb-3 mt-2">New Category</h2>
            <div
              className="mb-3"
              onClick={() => router.push("/admin/categories")}
            >
              <button className="btn btn-outline-dark">
                GO BACK TO CATEGORIES
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fs-5">
                Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
              <div id="emailHelp" className="form-text">
                {errors && errors.name ? errors.name : "Please enter your name"}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              CREATE CATEGORY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCategory;
