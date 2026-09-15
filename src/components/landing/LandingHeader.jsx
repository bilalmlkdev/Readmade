import { Link } from "react-router-dom";
import logo from "/logo.svg";

export default function LandingHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-5 py-3.5 transition-all duration-300 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-black/5 lg:px-15">
      <div className="mx-auto flex max-w-[90rem] flex-row items-center justify-between gap-2">
        <div className="flex shrink-0 items-center gap-3">
          <Link to="/" aria-label="Readmade — home" className="items-center md:self-center">
            <div className="flex justify-center self-center">
              <img src={logo} alt="Readmade" className="w-8 rounded-full" />
            </div>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 self-center sm:gap-1.5">
          <a
            href="#features"
            className="hidden self-center whitespace-nowrap rounded-full bg-transparent px-2.5 py-0.5 text-sm transition md:flex text-gray-500 hover:text-gray-900"
          >
            Features
          </a>
          <a
            href="https://github.com/bilalmlkdev/readmade"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden self-center whitespace-nowrap rounded-full bg-transparent px-2.5 py-0.5 text-sm transition sm:flex text-gray-500 hover:text-gray-900"
          >
            GitHub
          </a>
          <a
            href="#get-started"
            className="self-center whitespace-nowrap rounded-full bg-black/5 px-2.5 py-1 text-sm transition hover:bg-black/10 text-gray-600 hover:text-gray-900"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
