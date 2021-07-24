import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../../context/auth-context";
import Spinner from "../../../components/reusable/Spinner";
import useFormShipping from "../../../hooks/userFormShipping";
import Joi from "joi-browser";
import getProductApi from "../../../services/getProductApi";
import getCategoriesApi from "../../../services/getCategoriesApi";
import updateProductApi from "../../../services/updateProductApi";
import updateProductNoImageApi from "../../../services/updateProductNoImageApi";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  price: Joi.number().required().label("Price"),
  stock: Joi.number().required().label("Stock"),
  description: Joi.string().min(10).max(255).required().label("Description"),
};

const EditProduct = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("Choose File");
  const [categoryId, setCategoryId] = useState("");
  const [initialData, setInitialData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const { user: adminUser, loading: loadingAdminUser } =
    useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!adminUser && !loadingAdminUser) return router.reaplace("/");
    if (adminUser && !adminUser.isAdmin) return router.replace("/");

    const getProduct = async () => {
      const response = await getProductApi(id);
      if (response.error) {
        setUserError(response.error.error);
      }
      setProduct(response);
      setInitialData({
        name: response.name,
        stock: response.stock,
        price: response.price,
        description: response.description,
      });

      setCategoryId(response.category._id);
    };

    const getCategories = async () => {
      const response = await getCategoriesApi();
      if (response.error) {
        setUserError(response.error.error);
      }
      setCategories(response);
    };

    getProduct();
    getCategories();
    setLoading(false);
  }, [adminUser, updated, router, loadingAdminUser, id]);

  const { data, errors, handleChange, handleSubmit } = useFormShipping({
    initialData,
    async onSubmit(data) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append("categoryId", categoryId);
      let newProduct;

      if (selectedFile === "Choose File") {
        setUploading(true);
        newProduct = await updateProductNoImageApi(formData, id);
      } else {
        setUploading(true);
        formData.append("image", selectedFile);
        newProduct = await updateProductApi(formData, id);
      }

      if (newProduct.error) {
        setUploading(false);
        return setError(newProduct.error.error);
      }

      if (newProduct) {
        setUploading(false);
        setUpdated(true);
      }
    },
    schema,
    mode: true,
  });

  if (loading || !adminUser || !categories || !product || uploading)
    return <Spinner />;

  const { name, stock, price, description } = data;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <div className="mb-3">
              <h2 className="text-center">Eddit Product</h2>
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
                  name="description"
                  onChange={handleChange}
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
              EDDIT PRODUCT
            </button>
          </form>
          {updated && !error && (
            <div className="success mt-3 bg-success text-white p-2">
              PRODUCT UPDATED SUCCESSFULLY
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

export default EditProduct;

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.productId,
    },
  };
}
