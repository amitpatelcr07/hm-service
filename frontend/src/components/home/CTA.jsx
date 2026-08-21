import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const CTA = () => {
  const { user } = useAuth();

  return (
    <section className="bg-blue-600 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to get started?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
          Find the right professional for your job or join HomeConnect as a
          skilled worker today.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          {user ? (
            <Link
              to="/dashboard"
              className="rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-blue-400 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
