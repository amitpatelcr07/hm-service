import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/shared/Home";
import About from "../pages/shared/About";
import Contact from "../pages/shared/Contact";
import NotFound from "../pages/shared/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import CustomerDashboard from "../pages/customer/Dashboard";
import CreateJob from "../pages/customer/CreateJob";
import MyJobs from "../pages/customer/MyJobs";
import Applicants from "../pages/customer/Applicants";
import WorkerDashboard from "../pages/worker/Dashboard";
import BrowseJobs from "../pages/worker/BrowseJobs";
import AppliedJobs from "../pages/worker/AppliedJobs";
import Profile from "../pages/worker/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/jobs/create" element={<CreateJob />} />
      <Route path="/customer/jobs" element={<MyJobs />} />
      <Route path="/customer/applicants" element={<Applicants />} />
      <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      <Route path="/worker/jobs" element={<BrowseJobs />} />
      <Route path="/worker/applied" element={<AppliedJobs />} />
      <Route path="/worker/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
