import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    toast.success("You have been logged out.");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg shadow-sm p-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          MeetNow Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            <Link
              to="/login"
              className="btn custom-outline px-4 d-flex justify-content-center align-items-center"
            >
              <CgProfile size={20} />
              <span className="mx-2">Profile</span>
            </Link>
            <Link
              to="/sign-up"
              className="btn custom-solid px-4 d-flex justify-content-center align-items-center"
            >
              <CiSettings size={25} />
              <span className="mx-2">Settings</span>
            </Link>
            <button
              onClick={() => handleLogout()}
              className="btn custom-solid px-4 d-flex justify-content-center align-items-center"
            >
              <CiLogout size={25} />
              <span className="mx-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
