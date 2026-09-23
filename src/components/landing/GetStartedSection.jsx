import { useState } from "react";
import { Link } from "react-router-dom";

export default function GetStartedSection() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("web");

  const commands = {
    web: "https://readmade.vercel.app",
    npx: "npx readmade",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="get-started" className="px-15 py-24 bg-[#FAFAFA] dark:bg-[#0c0c0c]">
      <div className="mx-auto max-w-full">
        <div className="mb-3 section-label">Get started</div>
        <h3 className="m-0 mb-10 max-w-2xl section-heading">
          Your README, in 60 seconds.
          <span className="text-gray-400 dark:text-gray-500"> Wherever you are.</span>
        </h3>

        <div className="w-full border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="flex items-stretch border-b border-gray-200 dark:border-white/10">
            <button
              type="button" onClick={() => setActiveTab("web")}
              className={`relative px-7 py-3 text-[13px] tracking-tight transition font-medium ${
                activeTab === "web"
                  ? "text-black dark:text-white"
                  : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              }`}
            >
              web
              {activeTab === "web" && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-black" />
              )}
            </button>
            <button
              type="button" onClick={() => setActiveTab("npx")}
              className={`relative px-7 py-3 text-[13px] tracking-tight transition font-normal ${
                activeTab === "npx"
                  ? "text-black dark:text-white"
                  : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              }`}
            >
              npx
              {activeTab === "npx" && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-black" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 px-7 py-3.5 font-mono text-sm">
            <span className="text-gray-300 select-none">$</span>
            <span className="flex-1 truncate text-gray-700 dark:text-gray-200">
              {commands[activeTab]}
            </span>
            <button
              onClick={handleCopy}
              className="-mr-2 ml-1 shrink-0 p-2 text-gray-400 dark:text-gray-500 transition hover:text-gray-700 dark:text-gray-200" type="button" aria-label="Copy command"
            >
              {copied ? (
                <svg
                  className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 max-w-xl section-body">
            One link. No account required. Open it anywhere.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              View on GitHub
              <svg
                className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <Link
              to="/docs" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              Read the docs
              <svg
                className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
