import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}

          <div>
            <span className="inline-block rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-300">
              Trusted Local Services
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Find the right
              <span className="text-blue-500"> professional </span>
              for your job.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              HomeConnect makes it easy to find skilled professionals for
              cleaning, plumbing, electrical work, repairs, and more.
            </p>

            {/* Buttons */}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {user ? (
                <>
                  {user.role === "CUSTOMER" ? (
                    <Link
                      to="/dashboard/create-job"
                      className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-700"
                    >
                      Post a Job
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard/browse-jobs"
                      className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-700"
                    >
                      Find Jobs
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    className="rounded-lg border border-slate-600 px-6 py-3 text-center font-semibold transition hover:bg-slate-800"
                  >
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold transition hover:bg-blue-700"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/login"
                    className="rounded-lg border border-slate-600 px-6 py-3 text-center font-semibold transition hover:bg-slate-800"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Trust indicators */}

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
              <span>✓ Skilled Professionals</span>
              <span>✓ Easy Hiring</span>
              <span>✓ Transparent Pricing</span>
            </div>
          </div>

          {/* Right Visual */}

          <div className="relative">
            <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
              {/* Fake Job Card */}

              <div className="rounded-2xl bg-white p-6 text-gray-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      CLEANING
                    </p>

                    <h3 className="mt-2 text-xl font-bold">House Cleaning</h3>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    OPEN
                  </span>
                </div>

                <p className="mt-4 text-gray-500">
                  Need a professional to clean my home including kitchen and
                  bathroom.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="mt-1 font-semibold">Noida</p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="mt-1 font-semibold">₹1,500</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Applications</span>

                    <span className="font-semibold">8 Workers</span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-3/4 rounded-full bg-blue-600" />
                  </div>
                </div>
              </div>

              {/* Floating card */}

              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 text-gray-800 shadow-xl">
                <p className="text-xs text-gray-500">Verified Worker</p>

                <p className="mt-1 font-bold">Skilled Professional</p>

                <div className="mt-1 text-sm text-yellow-500">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
