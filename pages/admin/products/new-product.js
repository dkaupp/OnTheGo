import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth-context";
import Spinner from "../../../components/reusable/Spinner";
import useForm from "../../../hooks/useForm";
import Joi from "joi-browser";
import getCategoriesApi from "../../../services/getCategoriesApi";
import createProductApi from "../../../services/createProductApi";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  price: Joi.number().required().label("Price"),
  stock: Joi.number().required().label("Stock"),
};

const NewProduct = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("Choose File");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

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

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      name: "",
      price: "",
      stock: "",
    },
    async onSubmit(data) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      setUploading(true);
      formData.append("image", selectedFile);
      const newProduct = await createProductApi(formData);

      if (newProduct.error) {
        setUploading(false);
        return setError(newProduct.error.error);
      }

      if (newProduct) {
        setUploading(false);
        router.push("/");
      }
    },
    schema,
  });

  if (loading || !adminUser || !categories || uploading) return <Spinner />;

  const { name, stock, price } = data;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <div className="mb-3">
              <h2 className="text-center mb-3">ADD NEW PRODUCT</h2>
              <div
                className="mb-3"
                onClick={() => router.push("/admin/products")}
              >
                <button className="btn btn-outline-dark">
                  GO BACK TO PRODUCTS
                </button>
              </div>
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
                  : "Please enter product name"}
              </div>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="category" className="form-label fs-5">
                Category
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div id="categoryHelp" className="form-text">
                {errors && errors.categoryId
                  ? errors.categoryId
                  : categoryId !== ""
                  ? "Ok"
                  : "Please enter a category"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label fs-5">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                aria-describedby="priceHelp"
                name="price"
                value={price}
                onChange={handleChange}
              />
              <div id="priceHelp" className="form-text">
                {errors && errors.price
                  ? errors.price
                  : price !== ""
                  ? "Ok"
                  : "Please enter the price"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label fs-5">
                Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                aria-describedby="stockHelp"
                name="stock"
                value={stock}
                onChange={handleChange}
              />
              <div id="stockHelp" className="form-text">
                {errors && errors.stock
                  ? errors.stock
                  : stock !== ""
                  ? "Ok"
                  : "Please enter number in stock"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fs-5">
                Description
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div id="descriptionHelp" className="form-text">
                  {errors && errors.description
                    ? errors.description
                    : description !== ""
                    ? "Ok"
                    : "Please enter number in stock"}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label fs-5">
                Image
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              ADD NEW PRODUCT
            </button>
          </form>
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

export default NewProduct;
