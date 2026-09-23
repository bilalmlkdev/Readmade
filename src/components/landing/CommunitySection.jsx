export default function CommunitySection() {
  return (
    <section className="px-15 py-24 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-3 section-label">Open Source</div>
            <h3 className="m-0 max-w-md section-heading">
              Built in the open, for everyone.
            </h3>
          </div>
          <div className="lg:col-span-7">
            <p className="m-0 mb-8 max-w-xl section-body">
              Free, MIT-licensed, no tracking, no accounts required. Every
              feature is visible in the source code. Contribute, fork, or just
              use it. The project belongs to the community that builds it.
            </p>
            <a
              href="https://github.com/bilalmlkdev/readmade"
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link"
            >
              Explore on GitHub
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}