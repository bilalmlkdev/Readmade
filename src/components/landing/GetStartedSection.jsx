import { useState } from "react";

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
    <section id="get-started" className="px-5 py-24 lg:px-15 bg-[#FAFAFA] text-[#1a1a1a]">
      <div className="mx-auto max-w-full">
        <div className="mb-3 section-label">Get started</div>
        <h3 className="m-0 mb-10 max-w-2xl section-heading">
          Your README, in 60 seconds.
          <span className="opacity-60"> Wherever you are.</span>
        </h3>

        <div className="w-full border border-black/10">
          <div className="flex items-stretch border-b border-black/10">
            <button
              type="button"
              onClick={() => setActiveTab("web")}
              className={`relative px-7 py-3 text-[13px] tracking-tight transition font-medium ${
                activeTab === "web"
                  ? "text-black"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              web
              {activeTab === "web" && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-black" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("npx")}
              className={`relative px-7 py-3 text-[13px] tracking-tight transition font-normal ${
                activeTab === "npx"
                  ? "text-black"
                  : "text-black/40 hover:text-black/70"
              }`}
            >
              npx
              {activeTab === "npx" && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] bg-black" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 px-7 py-3.5 font-mono text-sm">
            <span className="opacity-30 select-none">$</span>
            <span className="flex-1 truncate">{commands[activeTab]}</span>
            <button
              onClick={handleCopy}
              className="-mr-2 ml-1 shrink-0 p-2 opacity-50 transition hover:opacity-100"
              type="button"
              aria-label="Copy command"
            >
              {copied ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
              href="https://github.com/bilalmlkdev/readmade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border-b border-black/20 pb-1 text-sm transition hover:border-black/60"
            >
              View on GitHub
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://github.com/bilalmlkdev/readmade/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border-b border-black/20 pb-1 text-sm transition hover:border-black/60"
            >
              Read the docs
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
