import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signupCall } from "../../../services/auth/signup";
import { toast } from "react-toastify";

const SignupPage = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await signupCall(values);
      if (response.status) {
        toast.success(response.message);
        navigate("/login")
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
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4 text-dark fw-bold">
          Create an Account
        </h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label text-dark">First Name</label>
                  <Field
                    name="first_name"
                    className={`form-control ${
                      touched.first_name && errors.first_name
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="John"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="col">
                  <label className="form-label text-dark">Last Name</label>
                  <Field
                    name="last_name"
                    className={`form-control ${
                      touched.last_name && errors.last_name ? "is-invalid" : ""
                    }`}
                    placeholder="Doe"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label text-dark">Username</label>
                <Field
                  name="username"
                  className={`form-control ${
                    touched.username && errors.username ? "is-invalid" : ""
                  }`}
                  placeholder="johndoe123"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark">Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="example@email.com"
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
                  placeholder="Enter a strong password"
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
                Sign Up
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-3 text-center text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
