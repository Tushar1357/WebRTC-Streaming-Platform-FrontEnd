import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "../features/home/pages/HomePage";
import SignupPage from "../features/auth/pages/SignUpPage";
import LoginPage from "../features/auth/pages/LoginPage";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import MeetingPage from "../features/meeting/pages/MeetingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/meeting/:meetingId" element={<MeetingPage />}>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
