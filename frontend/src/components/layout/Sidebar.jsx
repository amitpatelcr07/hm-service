import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-4 py-3 rounded-lg transition ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-slate-700"
    }`;

  return (
    <>
      <button type="button" aria-label="Close navigation menu" onClick={onClose} className={`fixed inset-0 z-40 bg-slate-950/40 transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed top-[4.5rem] bottom-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-slate-800 text-white shadow-2xl transition-transform duration-300 lg:w-64 lg:translate-x-0 lg:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="p-5 lg:p-6">
        <h2 className="mb-7 text-2xl font-bold lg:text-3xl">HomeConnect</h2>

        <nav className="flex flex-col gap-3">
          <NavLink to="/dashboard" end className={linkClass} onClick={onClose}>
            Dashboard
          </NavLink>

          {user?.role === "CUSTOMER" && (
            <>
              <NavLink to="/dashboard/create-job" className={linkClass} onClick={onClose}>
                Create Job
              </NavLink>

              <NavLink to="/dashboard/my-jobs" className={linkClass} onClick={onClose}>
                My Jobs
              </NavLink>
            </>
          )}

          {user?.role === "WORKER" && (
            <>
              <NavLink to="/dashboard/browse-jobs" className={linkClass} onClick={onClose}>
                Browse Jobs
              </NavLink>

              <NavLink to="/dashboard/my-applications" className={linkClass} onClick={onClose}>
                My Applications
              </NavLink>

              <NavLink to="/dashboard/profile" className={linkClass} onClick={onClose}>
                Profile
              </NavLink>
              <NavLink to="/dashboard/cash-payments" className={linkClass} onClick={onClose}>
                Cash Payments
              </NavLink>
            </>
          )}

          {user?.role === "ADMIN" && (
            <NavLink to="/dashboard/admin/payment-reviews" className={linkClass} onClick={onClose}>
              Payment Reviews
            </NavLink>
          )}

          {user?.role === "CUSTOMER" && (
            <NavLink to="/dashboard/payments" className={linkClass} onClick={onClose}>
              Payments
            </NavLink>
          )}

          <NavLink to="/dashboard/reviews" className={linkClass} onClick={onClose}>
            Reviews
          </NavLink>
        </nav>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
