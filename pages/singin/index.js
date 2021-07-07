import useAuth from "../../auth/useAuth";
import useForm from "../../hooks/useForm";
import singInApi from "../../api/siningApi";
import styles from "../../styles/SingIn.module.css";
import Joi from "joi-browser";
import { useRouter } from "next/router";

const schema = {
  email: Joi.string().email().min(5).max(30).required().label("Email"),
  password: Joi.string().min(5).max(30).required().label("Password"),
};

const SingIn = () => {
  const { logIn } = useAuth();
  const router = useRouter();

  const { data, errors, handleChange, handleSubmit, setErrors } = useForm({
    initialData: {
      email: "",
      password: "",
    },
    async onSubmit(data) {
      const response = await singInApi(data);
      if (response.error) {
        return setErrors({ email: response.error, password: response.error });
      }
      logIn(response);
      router.push("/", null, { shallow: true });
    },
    schema,
  });

  const { email, password } = data;

  return (
    <div className="container">
      <div className={styles.singInContainer}>
        <form className={styles.formDiv}>
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
          <button type="submit" className="btn btn-dark" onClick={handleSubmit}>
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingIn;
