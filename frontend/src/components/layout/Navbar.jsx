import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import LiveClock from "./LiveClock";

const Navbar = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  // TODO(dynamic): replace with real unread-notification count from API/socket
  const notificationCount = 3;

  // TODO(dynamic): replace with real quick-stat counts (active jobs / applications)
  // based on user.role — CUSTOMER sees "Active jobs", WORKER sees "Applications"
  const quickStat =
    user?.role === "WORKER"
      ? { label: "Applications", value: 4 }
      : { label: "Active jobs", value: 2 };

  const [notifOpen, setNotifOpen] = useState(false);

  // Get first letter of user's name
  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Open navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
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

        {/* ================= CENTER: SEARCH ================= */}
        {/* TODO(dynamic): wire up onChange/onSubmit to real job/worker search */}
        <div className="hidden flex-1 max-w-md items-center md:flex">
          <div className="flex h-11 w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition-colors focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4 shrink-0 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder={
                user?.role === "WORKER" ? "Search jobs..." : "Search workers..."
              }
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick stat pill */}
          {/* TODO(dynamic): make clickable, route to /jobs or /applications */}
          <div className="hidden items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2 lg:flex">
            <span className="text-sm font-bold text-blue-700">
              {quickStat.value}
            </span>
            <span className="text-xs font-medium text-blue-600">
              {quickStat.label}
            </span>
          </div>

          {/* Live Clock */}
          <div className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 xl:flex">
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

          {/* Notifications */}
          {/* TODO(dynamic): fetch real notifications list, mark-as-read, socket updates */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.85 23.85 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>

              {notificationCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {notificationCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Notifications
                </p>
                {/* TODO(dynamic): map over real notifications array */}
                <div className="flex flex-col gap-1">
                  <div className="rounded-lg px-2.5 py-2 text-sm text-slate-600 hover:bg-slate-50">
                    Sample notification — connect your data source
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="hidden h-9 w-px bg-slate-200 sm:block" />

          {/* User Section */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white shadow-sm ring-4 ring-blue-50">
              {userInitial}
              {/* Online status dot — static true for now */}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
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
