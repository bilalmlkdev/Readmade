export default function StatsSection() {
  return (
    <section className="px-15 pt-12 pb-10 lg:pt-14 bg-[#FAFAFA]">
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="m-0 max-w-md section-heading">
              The visual README editor.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="m-0 mb-6 section-body max-w-xl">
              Readmade is the platform for building READMEs that actually help
              your project. Drag blocks, reorder sections, see a live preview.
              No Markdown syntax to learn. Export clean, GitHub-ready output.
              Yours to keep, wherever you take it.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#features" className="arrow-link">
                Learn more
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://github.com/bilalmlkdev/readmade"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link"
              >
                View source
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <div className="mb-5 section-label">The numbers</div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <div className="text-3xl font-light tracking-tight text-black whitespace-nowrap lg:text-4xl">
                11
              </div>
              <div className="mt-3 text-sm text-gray-500">block types</div>
            </div>
            <div>
              <div className="text-3xl font-light tracking-tight text-black whitespace-nowrap lg:text-4xl">
                0
              </div>
              <div className="mt-3 text-sm text-gray-500">sign-ups required</div>
            </div>
            <div>
              <div className="text-3xl font-light tracking-tight text-black whitespace-nowrap lg:text-4xl">
                100%
              </div>
              <div className="mt-3 text-sm text-gray-500">local-first data</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
