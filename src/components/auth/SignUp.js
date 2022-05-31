import { useForm } from "react-hook-form";
import styles from "./SignUp.module.css";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, resetAuthState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";

const SignUp = () => {
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

  const [img, setImg] = useState();

  const [serverErr, setServerErr] = useState();

  const imageChangeEvent = (event) => {
    setImg(event.target.files[0]);
  };

  const handleOnSubmit = async (userObj) => {
    // console.log(userObj);
    const formData = new FormData();
    formData.append("userObj", JSON.stringify(userObj));
    formData.append("profileImg", img);

    try {
      dispatch(registerUser(formData));
    } catch (e) {
      alert("Something went wrong...");
      console.log(e.message);
    }
  };

  useEffect(() => {
    dispatch(resetAuthState());
  }, []);

  useEffect(() => {
    if ((isSuccess && message === "user created") || user) {
      navigate("/login");
      dispatch(resetAuthState());
    } else if (message !== "user created") {
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
        Join us! 🤠
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
        <div className="form-group">
          <label htmlFor="profileImg">Profile Image</label>
          <input
            type="file"
            name="profileImg"
            id="profileImg"
            className="form-control"
            {...register("profileImg", { required: true })}
            onChange={imageChangeEvent}
          />
          {errors.profileImg && (
            <p className="text-danger">Profile image is required</p>
          )}
        </div>
        <p className="my-2">
          Already have an account ?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </p>
        <div className="text-center">
          <button type="submit" className="mt-3 btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
