import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import registerApi from "../../api/registerApi";
import Joi from "joi-browser";
import AuthContext from "../../context/auth-context";
import Spinner from "../../components/reusable/Spinner";

const schema = {
  name: Joi.string().min(5).max(30).required().label("Name"),
  email: Joi.string().email().min(5).max(30).required().label("Email"),
  password: Joi.string().min(5).max(30).required().label("Password"),
  repassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .options({
      language: {
        any: {
          allowOnly: "!!Passwords do not match",
        },
      },
    }),
};

const Register = () => {
  const [loading, setLoading] = useState(true);
  const { user, register } = useContext(AuthContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const router = useRouter();

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
    async onSubmit(data) {
      const response = await registerApi(data);
      if (response.error) {
        return setErrors({ email: response.error, password: response.error });
      }
      register(response);
      router.push("/");
    },
    schema,
  });

  const { email, password, repassword, name } = data;

  if (loading) return <Spinner />;
  if (user) {
    return (window.location.href = "/");
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-md-center">
        <div className="col col-xs-12 col-md-6">
          <form>
            <div className="mb-3">
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
              <div id="passwordHelp" className="form-text">
                {errors && errors.password
                  ? errors.password
                  : password !== ""
                  ? "Ok"
                  : "Please enter your password"}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="repassword" className="form-label fs-5">
                Confirm Password
              </label>
              <input
                type="repassword"
                className="form-control"
                id="repassword"
                name="repassword"
                value={repassword}
                onChange={handleChange}
              />
              <div id="repasswordHelp" className="form-text">
                {errors && errors.repassword
                  ? "Please re enter your password"
                  : repassword !== ""
                  ? "Ok"
                  : "Please re enter your password"}
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
        </div>
      </div>
    </div>
  );
};

export default Register;
