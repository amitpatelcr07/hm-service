import { useAuth } from "../../hooks/useAuth";
import LiveClock from "./LiveClock";

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  // Get first letter of user's name
  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuToggle} aria-label="Open navigation menu" className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          {/* Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9 21v-6h6v6"
              />
            </svg>
          </div>

          {/* Logo Text */}
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Home<span className="text-blue-600">Connect</span>
            </h1>

            <p className="text-[11px] font-medium text-slate-400">
              Home services marketplace
            </p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Live Clock */}
          <div className="hidden md:flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
            {/* Clock Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                />
              </svg>
            </div>

            <LiveClock />
          </div>

          {/* Vertical Divider */}
          <div className="hidden h-9 w-px bg-slate-200 sm:block" />

          {/* User Section */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white shadow-sm ring-4 ring-blue-50">
              {userInitial}
            </div>

            {/* User Information */}
            <div className="hidden text-left sm:block">
              <p className="max-w-[140px] truncate text-sm font-semibold text-slate-800">
                {user?.fullName || "User"}
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  {user?.role || "USER"}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              title="Logout"
              className="
                group
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-3
                text-sm
                font-semibold
                text-red-600
                transition-all
                duration-200
                hover:border-red-200
                hover:bg-red-500
                hover:text-white
                hover:shadow-md
                active:scale-95
              "
            >
              {/* Logout Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 12h9m0 0-3-3m3 3-3 3"
                />
              </svg>

              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
