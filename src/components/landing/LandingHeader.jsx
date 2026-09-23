import { Link } from "react-router-dom";
import logo from "/logo.svg";
import ThemeToggle from "../ui/ThemeToggle.jsx";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-[#FAFAFA]/90 dark:bg-[#0c0c0c]/90 backdrop-blur-xl">
      <div className="landing-container flex h-14 items-center justify-between">
        <Link to="/" aria-label="Readmade - home" className="flex items-center gap-2.5">
          <img src={logo} alt="Readmade" className="h-7 w-7" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="#templates" className="px-3 py-1.5 text-[13px] text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Templates
          </a>
          <a
            href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-[13px] text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            GitHub
          </a>
          <Link
            to="/docs" className="px-3 py-1.5 text-[13px] text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            Docs
          </Link>
          <div className="mx-1.5 h-4 w-px bg-gray-200 dark:bg-white/10" />
          <a
            href="https://ko-fi.com/bilalmlkdev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z" />
            </svg>
            Support
          </a>
          <div className="mx-1.5 h-4 w-px bg-gray-200 dark:bg-white/10" />
          <ThemeToggle className="px-2" />
          <Link
            to="/app" className="ml-1 inline-flex items-center bg-black px-3 py-1.5 text-[13px] text-white dark:bg-white dark:text-black transition hover:bg-black/90 dark:hover:bg-white/90"
          >
            Open App
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="px-1.5" />
          <a
            href="https://ko-fi.com/bilalmlkdev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center p-1.5 text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311z" />
            </svg>
          </a>
          <Link
            to="/app" className="inline-flex items-center bg-black px-3 py-1.5 text-[13px] font-medium text-white dark:bg-white dark:text-black transition hover:bg-black/90 dark:hover:bg-white/90"
          >
            Open App
          </Link>
        </div>
      </div>
    </header>
  );
}
