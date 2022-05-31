import { useForm } from "react-hook-form";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetAuthState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );

  const [serverErr, setServerErr] = useState();

  const handleOnSubmit = async (userObj) => {
    try {
      dispatch(loginUser(userObj));
    } catch (e) {
      alert("Something went wrong...");
      console.log(e.message);
    }
  };

  useEffect(() => {
    dispatch(resetAuthState());
  }, []);

  useEffect(() => {
    if ((isSuccess && message === "success") || user) {
      navigate("/home");
      dispatch(resetAuthState());
    } else if (message !== "success") {
      setServerErr(message);
    } else {
      dispatch(resetAuthState());
    }
  }, [isLoading, isSuccess, isError, message, user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className={`${styles["signup-heading"]} text-center my-3`}>
        Welcome back! ❤️
      </h1>
      {serverErr && <p className="text-danger text-center">{serverErr}</p>}
      <form
        className={styles["text-field"]}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-danger">Username is required</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="text-danger">Password is required</p>
          )}
        </div>
        <p className="my-2">
          Don't have an account ?{" "}
          <Link to="/sign-up" style={{ textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
        <div className="text-center">
          <button type="submit" className="mt-2 btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
