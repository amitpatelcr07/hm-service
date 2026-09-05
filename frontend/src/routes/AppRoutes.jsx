import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Customer Pages
import Dashboard from "../pages/customer/Dashboard";
import CreateJob from "../pages/customer/CreateJob";
import MyJobs from "../pages/customer/MyJobs";
import EditJob from "../pages/customer/EditJob";
import Applicants from "../pages/customer/Applicants";
import Payments from "../pages/customer/Payments";

// // Worker Pages
// import WorkerDashboard from "../pages/worker/Dashboard";
import BrowseJobs from "../pages/worker/BrowseJobs";
import JobDetails from "../pages/worker/JobDetails";
import MyApplications from "../pages/worker/MyApplications";
import ApplyJob from "../pages/worker/ApplyJob";
import WorkerProfile from "../pages/worker/Profile";
import CashPayments from "../pages/worker/CashPayments";
import PaymentReviews from "../pages/admin/PaymentReviews";

// // Shared Pages
// import Payments from "../pages/shared/Payments";
// import Reviews from "../pages/shared/Reviews";
// import Home from "../pages/shared/Home";
// import NotFound from "../pages/shared/NotFound";
import Chat from "../pages/shared/Chat";

import Home from "../pages/home/Home";

// Auth
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        {/* Customer Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Customer */}
          <Route path="create-job" element={<CreateJob />} />

          <Route path="my-jobs" element={<MyJobs />} />

          <Route path="edit-job/:id" element={<EditJob />} />

          <Route path="applicants/:jobId" element={<Applicants />} />

          {/* Worker */}
          <Route path="browse-jobs" element={<BrowseJobs />} />

          <Route path="job-details/:id" element={<JobDetails />} />

          <Route path="my-applications" element={<MyApplications />} />
          <Route path="apply-job/:jobId" element={<ApplyJob />} />
          <Route path="profile" element={<WorkerProfile />} />
          <Route path="cash-payments" element={<CashPayments />} />
          <Route path="admin/payment-reviews" element={<PaymentReviews />} />

          {/* Shared */}
          <Route path="payments" element={<Payments />} />

          {/* <Route path="reviews" element={<Reviews />} /> */}

          <Route path="chat/:jobId" element={<Chat />} />
        </Route>

        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
