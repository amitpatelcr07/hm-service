import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      <div className="flex">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Scrollable Content */}
        <main className="flex-1 ml-64 mt-16 p-6 overflow-y-auto min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
