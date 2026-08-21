import { Link } from "react-router-dom";

const services = [
  {
    icon: "🧹",
    title: "Cleaning",
    description: "Home, kitchen, bathroom and deep cleaning services.",
  },
  {
    icon: "🔧",
    title: "Plumbing",
    description: "Professional plumbing installation and repair services.",
  },
  {
    icon: "⚡",
    title: "Electrical",
    description: "Electrical installation, maintenance and repair.",
  },
  {
    icon: "🎨",
    title: "Painting",
    description: "Interior and exterior painting professionals.",
  },
  {
    icon: "🛠️",
    title: "Repair",
    description: "Find skilled professionals for different repair needs.",
  },
  {
    icon: "📦",
    title: "Moving",
    description: "Get help with moving and relocation services.",
  },
];

const Services = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold text-blue-600">SERVICES</p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Popular services
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Find professionals for everyday jobs around your home.
            </p>
          </div>

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Get started →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl transition group-hover:bg-blue-100">
                {service.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mt-2 leading-7 text-gray-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
