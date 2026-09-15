import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { LuGithub } from "react-icons/lu";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="px-15 py-16 lg:py-20 bg-[#FAFAFA] border-t border-gray-100">
      <div className="mx-auto max-w-full">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="-mx-2 mb-8">
              <img src={logo} alt="Readmade" className="block size-10" />
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/bilalmlkdev/readmade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-colors"
                aria-label="GitHub"
              >
                <LuGithub size={22} className="text-gray-400 hover:text-black" />
              </a>
              <a
                href="https://x.com/readmade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-colors"
                aria-label="X"
              >
                <BsTwitterX size={22} className="text-gray-400 hover:text-black" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/app"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Open Editor
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#get-started"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black">
              Community
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bilalmlkdev/readmade/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium text-black">Author</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/bilalmlkdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 transition-colors hover:text-black"
                >
                  Bilal Malik
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-18 mb-6 w-full overflow-hidden md:mb-12">
          <div className="footer-wordmark text-center leading-none tracking-tighter text-black md:text-right">
            readmade
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-400">
            &copy; 2026 Readmade. MIT License.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="transition-colors hover:text-black">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
