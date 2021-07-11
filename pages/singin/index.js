import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useForm from "../../hooks/useForm";
import Joi, { shallow } from "joi-browser";
import AuthContext from "../../context/auth-context";
import Checkout from "../../components/reusable/Checkout";
import Spinner from "../../components/reusable/Spinner";

const schema = {
  email: Joi.string().email().min(5).max(30).required().label("Email"),
  password: Joi.string().min(5).max(30).required().label("Password"),
};

const SingIn = () => {
  const { user, logIn, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user && loading === false) window.location.href = "/";
  }, [user, loading]);

  loading && <Spinner />;

  const router = useRouter();

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      email: "",
      password: "",
    },
    async onSubmit(data) {
      const { errors } = await logIn(data);
      if (errors !== null) {
        console.log(errors);
        return setErrors({ email: errors, password: errors });
      }
      if (router.query.checkout) {
        return router.push("/checkout/shipping", null, { shallow: true });
      } else {
        return router.push("/", null, { shallow: true });
      }
    },
    schema,
  });

  const { email, password } = data;

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            {router.query.checkout && <Checkout step1 page="signin" />}
            <h2 className="text-center mb-2 mt-2">Sign In</h2>
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
                autoFocus
              />
              <div id="emailHelp" className="form-text">
                {errors && errors.email
                  ? errors.email
                  : "Please enter your email"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fs-5">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <div id="emailHelp" className="form-text">
                {errors && errors.password
                  ? errors.password
                  : "Please enter password"}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={handleSubmit}
            >
              SING IN
            </button>
          </form>
          <div className="mt-3">
            <Link href="/register">Register new user</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
