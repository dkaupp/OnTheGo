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
  email: Joi.string().email().min(5).max(30).required().label("Email"),
};

const ChangeEmail = () => {
  const [loading, setLoading] = useState(true);
  const { user, register, loading: loadingUser } = useContext(AuthContext);
  const [updated, setUpdated] = useState(false);
  const [initialData, setInitialData] = useState({
    email: "",
    name: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingUser) {
      router.push("/");
    }
    if (user) {
      setInitialData({
        email: user.email,
      });
    }
    setLoading(false);
  }, [user, loadingUser, router]);

  const { data, errors, handleChange, handleSubmit, setErrors } =
    useFormShipping({
      initialData,
      async onSubmit(data) {
        console.log("something");
        const response = await updateApi(data);

        console.log(response);
        if (response.error) {
          return setErrors({ email: response.error, password: response.error });
        }
        register(response);
        setUpdated(true);
        router.push("/account/change-email");
      },
      schema,
      mode: true,
    });

  if (loading || loadingUser) return <Spinner />;

  const { email } = data;

  return (
    <>
      <Head>
        <title>Change Email</title>
        <meta name="description" content="User can change email page" />
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-md-center">
          <div className="col col-xs-12 col-md-6">
            <form>
              <AccountNavigation page="email" />
              <h2 className="text-center mb-2 mt-2">CHANGE EMAIL</h2>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fs-5">
                  Email
                </label>
                <input
                  type="text"
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
                    : email !== ""
                    ? "Ok"
                    : "Please enter your name"}
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
            {updated && (
              <div className="success mt-3 bg-success text-white p-2">
                EMAIL UPDATED SUCCESSFULLY
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;
