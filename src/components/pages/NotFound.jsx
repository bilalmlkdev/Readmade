import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../lib/utils.js";

export default function NotFound() {
  useDocumentTitle("404 - Page not found | Readmade");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--bg)" }}>
      <p className="text-[120px] md:text-[180px] font-light tracking-tighter text-gray-200 dark:text-white/10 leading-none select-none">
        404
      </p>

      <h1 className="mt-[-20px] md:mt-[-30px] text-[28px] md:text-[36px] font-normal tracking-tight text-black dark:text-white">
        Page not found
      </h1>

      <p className="mt-4 text-[15px] text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
        The page you're looking for was moved, renamed, or never existed.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-black text-white text-[14px] font-medium hover:bg-black/90 transition-colors dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          Back to Readmade
        </Link>
        <Link
          to="/app"
          className="inline-flex items-center px-6 py-3 text-[14px] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Open App
        </Link>
      </div>
    </div>
  );
}
