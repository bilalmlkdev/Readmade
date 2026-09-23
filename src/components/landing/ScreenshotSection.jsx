import dashboardImg from "/home.webp";

export default function ScreenshotSection() {
  return (
    <section className="px-15 pb-24 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="mx-auto max-w-full">
        <figure className="m-0 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
          <figcaption className="order-2 m-0 flex items-end text-[13px] leading-relaxed text-gray-400 dark:text-gray-500 lg:order-1 lg:col-span-5 lg:max-w-sm">
            Your README takes shape as you build it. Every block, every edit,
            visible in real time. What you see is exactly what GitHub renders.
          </figcaption>
          <div className="order-1 overflow-hidden border border-gray-200 dark:border-white/10 lg:order-2 lg:col-span-7">
            <img
              src={dashboardImg}
              alt="Readmade editor showing drag-and-drop blocks on the left and a live GitHub-faithful preview on the right" loading="lazy" decoding="async" className="block h-64 w-full object-conver sm:h-80 lg:h-96"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
