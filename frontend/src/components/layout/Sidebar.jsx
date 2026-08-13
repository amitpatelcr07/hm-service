import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-4 py-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"
    }`;

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-slate-800 text-white overflow-y-auto">
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-8">HomeConnect</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" end className={linkClass}>
            Dashboard
          </NavLink>

          {user?.role === "CUSTOMER" && (
            <>
              <NavLink to="/dashboard/create-job" className={linkClass}>
                Create Job
              </NavLink>

              <NavLink to="/dashboard/my-jobs" className={linkClass}>
                My Jobs
              </NavLink>
            </>
          )}

          {user?.role === "WORKER" && (
            <>
              <NavLink to="/dashboard/browse-jobs" className={linkClass}>
                Browse Jobs
              </NavLink>

              <NavLink to="/dashboard/my-applications" className={linkClass}>
                My Applications
              </NavLink>

              <NavLink to="/dashboard/profile" className={linkClass}>
                Profile
              </NavLink>
            </>
          )}

          <NavLink to="/dashboard/payments" className={linkClass}>
            Payments
          </NavLink>

          <NavLink to="/dashboard/reviews" className={linkClass}>
            Reviews
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
