import { useContext, useEffect, useState } from "react";
import updateApi from "../../api/updateApi";
import Joi from "joi-browser";
import AuthContext from "../../context/auth-context";
import Spinner from "../../components/reusable/Spinner";
import useFormShipping from "../../hooks/userFormShipping";
import AccountNavigation from "../../components/reusable/AccountNavidation";
import { useRouter } from "next/router";
import Head from "next/head";

const schema = {
  password: Joi.string().min(5).max(30).required().label("Password"),
  repassword: Joi.string().min(5).max(30).required().label("Password"),
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(true);
  const { user, register, loading: loadingUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [initialData, setInitialData] = useState({
    password: "",
    repassword: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingUser) {
      router.push("/");
    }

    if (user) {
      setInitialData({
        password: "",
        repassword: "",
      });
    }
    setLoading(false);
  }, [user, loadingUser, router]);

  const { data, errors, handleChange, handleSubmit, setErrors } =
    useFormShipping({
      initialData,
      async onSubmit(data) {
        if (password !== repassword) return setError("Password does not match");
        const response = await updateApi(data);
        if (response.error) {
          return setErrors({ email: response.error, password: response.error });
        }
        register(response);
        setError(null);
        setUpdated(true);
        router.push("/account/change-password");
      },
      schema,
      mode: true,
    });

  if (loading || loadingUser) return <Spinner />;

  const { password, repassword } = data;

  return (
    <>
      <Head>
        <title>Change Password</title>
        <meta name="description" content="User can change password page" />
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-md-center">
          <div className="col col-xs-12 col-md-6">
            <form>
              <AccountNavigation page="password" />
              <h2 className="text-center mb-2 mt-2">CHANGE PASSWORD</h2>
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
                    : error
                    ? error
                    : "Change password"}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="repassword" className="form-label fs-5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="repassword"
                  name="repassword"
                  value={repassword}
                  onChange={handleChange}
                />
                <div id="repasswordHelp" className="form-text">
                  {errors && errors.repassword
                    ? errors.repassword
                    : repassword !== ""
                    ? "Ok"
                    : error
                    ? error
                    : "Confirm password"}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                UPDATE
              </button>
            </form>
            {updated && !error && (
              <div className="success mt-3 bg-success text-white p-2">
                PASSWORD UPDATED SUCCESSFULLY
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
    </>
  );
};

export default ChangePassword;
