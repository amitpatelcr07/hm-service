const features = [
  {
    icon: "✓",
    title: "Skilled Professionals",
    description:
      "Connect with workers who have profiles showing their skills and experience.",
  },
  {
    icon: "⚡",
    title: "Easy Hiring",
    description:
      "Post your job, review applications and choose the right professional.",
  },
  {
    icon: "💬",
    title: "Direct Communication",
    description:
      "Communicate directly with your selected worker about the job.",
  },
  {
    icon: "₹",
    title: "Transparent Pricing",
    description:
      "Workers provide their expected price before you choose who to hire.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}

          <div>
            <p className="font-semibold text-blue-600">WHY HOMECONNECT</p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to get your job done
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-500">
              Whether you need help around your home or you're looking for your
              next job, HomeConnect connects customers and skilled professionals
              in one simple platform.
            </p>
          </div>

          {/* Features */}

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
