export default function ToolkitSection() {
  const features = [
    { title: "Blocks", description: "11 pre-built section types" },
    { title: "Preview", description: "GitHub-faithful live rendering" },
    { title: "Export", description: "One-click copy or download" },
    { title: "Mobile", description: "Works on any device" },
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="landing-container">
        <div className="mb-3 section-label">Full toolkit</div>
        <h3 className="m-0 mb-6 max-w-2xl section-heading">
          Everything a great README needs. Available now.
        </h3>
        <p className="m-0 mb-16 max-w-2xl section-body">
          Blocks, preview, export, drag-and-drop, mobile-ready. No sign-up,
          no cloud, no complexity. Ready from day one.
        </p>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="feature-item">
              <div className="text-sm font-medium text-black dark:text-white">{feature.title}</div>
              <div className="mt-2 text-[13px] leading-6 text-gray-500 dark:text-gray-400">
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
