import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
