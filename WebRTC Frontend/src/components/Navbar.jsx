import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm p-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          MeetNow
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            <Link to="/login" className="btn custom-outline px-4">
              Login
            </Link>
            <Link to="/sign-up" className="btn custom-solid px-4">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
