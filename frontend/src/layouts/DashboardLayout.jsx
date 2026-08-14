import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <Navbar onMenuToggle={() => setIsSidebarOpen((open) => !open)} />

      <div>
        {/* Fixed Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Scrollable Content */}
        <main className="min-h-[calc(100vh-4.5rem)] p-4 pt-[4.5rem] sm:p-6 sm:pt-[5.5rem] lg:ml-64 lg:p-8 lg:pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
