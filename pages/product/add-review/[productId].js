import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/auth-context";
import useForm from "../../../hooks/useForm";
import { useRouter } from "next/router";
import Joi from "joi-browser";
import Spinner from "../../../components/reusable/Spinner";
import addProductReviewApi from "../../../api/addProductReviewApi";

const schema = {
  comment: Joi.string().min(5).max(30).required().label("Comment"),
  rating: Joi.number().min(1).max(5).required().label("Rating"),
};

const addReview = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: loadingUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingUser) return router.replace("/");
    setLoading(false);
  }, [user]);

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      comment: "",
      rating: "",
    },
    async onSubmit(data) {
      const newReview = await addProductReviewApi(id, data);

      if (newReview.error) {
        return setError(newReview.error.error);
      }
      router.push(`/product/${id}`);
    },
    schema,
  });

  if (loading) return <Spinner />;

  const { comment, rating } = data;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <h2 className="text-center mb-3 mt-2">ADD REVIEW</h2>
            <div className="mb-3" onClick={() => router.push(`/product/${id}`)}>
              <button className="btn btn-outline-dark">
                GO BACK TO PRODUCT
              </button>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="category" className="form-label fs-5">
                Rating
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={rating}
                name="rating"
                onChange={handleChange}
              >
                <option value="">Please Rate Product</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <div id="categoryHelp" className="form-text">
                {errors && errors.rating
                  ? errors.rating
                  : rating !== ""
                  ? "Ok"
                  : "Please enter a category"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label fs-5">
                ADD COMMENT
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={handleChange}
                ></textarea>
                <div id="commentHelp" className="form-text">
                  {errors && errors.comment
                    ? errors.comment
                    : comment !== ""
                    ? "Ok"
                    : "Please enter comment"}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              ADD REVIEW
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

export default addReview;

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.productId,
    },
  };
}
