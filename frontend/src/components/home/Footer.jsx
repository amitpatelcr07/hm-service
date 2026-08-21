import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-500">HomeConnect</h2>

            <p className="mt-4 max-w-md leading-7 text-slate-400">
              A simple platform connecting customers with skilled professionals
              for everyday services.
            </p>
          </div>

          {/* Platform */}

          <div>
            <h3 className="font-semibold">Platform</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>

              <Link to="/register" className="transition hover:text-white">
                Register
              </Link>

              <Link to="/login" className="transition hover:text-white">
                Login
              </Link>
            </div>
          </div>

          {/* Services */}

          <div>
            <h3 className="font-semibold">Services</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <span>Cleaning</span>
              <span>Plumbing</span>
              <span>Electrical</span>
              <span>Painting</span>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} HomeConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
