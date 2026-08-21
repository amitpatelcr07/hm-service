const steps = [
  {
    number: "01",
    title: "Post a Job",
    description:
      "Tell us what service you need, describe the work, choose your location and set your budget.",
  },
  {
    number: "02",
    title: "Receive Applications",
    description:
      "Skilled workers can view your job and send applications with their proposal and expected price.",
  },
  {
    number: "03",
    title: "Choose a Worker",
    description:
      "Review worker profiles and applications, then choose the professional who fits your requirements.",
  },
  {
    number: "04",
    title: "Get the Job Done",
    description:
      "Communicate with your selected worker and get your work completed smoothly.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-blue-600">HOW IT WORKS</p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple from start to finish
          </h2>

          <p className="mt-4 text-gray-500">
            HomeConnect makes finding and hiring the right professional easy.
          </p>
        </div>

        {/* Steps */}

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
