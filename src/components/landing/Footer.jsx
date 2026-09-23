import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { LuGithub } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="py-16 lg:py-20 bg-[#FAFAFA] dark:bg-[#0c0c0c] border-t border-gray-100 dark:border-white/10">
      <div className="landing-container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="-mx-2 mb-8">
              <img src={logo} alt="Readmade" className="block size-10" />
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white" aria-label="GitHub"
              >
                <LuGithub size={22} className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white" />
              </a>
              <a
                href="https://x.com/readmade" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white" aria-label="X"
              >
                <BsTwitterX size={22} className="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black dark:text-white">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/app" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Open Editor
                </Link>
              </li>
              <li>
                <a
                  href="#features" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#get-started" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black dark:text-white">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  to="/docs" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black dark:text-white">
              Community
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black dark:text-white">Author</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/bilalmlkdev" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                  Bilal Malik
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-18 mb-6 w-full overflow-hidden md:mb-12">
          <div className="footer-wordmark text-center leading-none tracking-tighter text-black dark:text-white md:text-right">
            readmade
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-400 dark:text-gray-500">
            &copy; 2026 Readmade. MIT License.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-black dark:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-black dark:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
