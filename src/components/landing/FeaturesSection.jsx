import { Link } from "react-router-dom";

export default function FeaturesSection() {
  return (
    <section className="px-15 py-24 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="mx-auto max-w-full">
        <h3 className="m-0 max-w-2xl section-heading">
          A home for every project's story.
        </h3>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:gap-20">
          <div>
            <div className="mb-4 section-label">Built for developers</div>
            <p className="m-0 text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 lg:text-base">
              Every block, every preview, every export in one place. Drag and
              drop to reorder. Choose from 11 block types - title, badges,
              description, features, installation, usage, screenshots, API,
              contributing, license, or custom Markdown. Data stays exactly
              where it belongs: in your browser.
            </p>
            <Link to="/docs" className="arrow-link mt-6 inline-flex">
              Documentation
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div>
            <div className="mb-4 section-label">Built for speed</div>
            <p className="m-0 text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 lg:text-base">
              From idea to polished README in minutes. No Markdown syntax to
              memorize. The live preview shows exactly what GitHub will render -
              badges, images, code blocks, tables, all of it. Copy to clipboard
              or download the file. Ship faster.
            </p>
            <a href="#get-started" className="arrow-link mt-6 inline-flex">
              Get started
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
