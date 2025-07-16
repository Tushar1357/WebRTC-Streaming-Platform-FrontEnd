import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, redirect, useNavigate } from "react-router-dom";
import { loginCall } from "../../../services/auth/login";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated,loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await loginCall(values);
      if (response.status) {
        toast.success(response.message);
        dispatch(authActions.login(response.data));
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("There was some internal error. Please try again");
    }
  };

  return (
    <div className="container-fluid flex-grow-1 d-flex justify-content-center align-items-center">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-dark fw-bold">
          Login to Your Account
        </h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label text-dark">Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-dark">Password</label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <button
                type="submit"
                className="btn custom-solid w-100 rounded-pill"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-3 text-center text-secondary">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
