import { Link } from "react-router-dom";
import logo from "/logo.svg";

const links = [
  { name: "Product", href: "#product" },
  { name: "FAQ", href: "#faq" },
];

export default function LandingHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 backdrop-blur-2xl">
      <div className="landing-container flex h-14 items-center justify-between gap-6">
        <Link
          to="/"
          aria-label="Readmade — home"
          className="flex items-center gap-2.5"
        >
          <img src={logo} alt="" className="h-6.5 w-6.5" />
          {/* <span className="text-[1.05rem] font-semibold tracking-[-0.01em]">
            Readmade
          </span> */}
        </Link>

        <nav aria-label="Main navigation">
          <ul className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-black"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="hidden text-sm font-medium text-gray-600 transition-colors duration-300 bg-white shadow-sm px-3 py-1.5 rounded-lg hover:text-black sm:block"
          >
            Login
          </Link>
          <Link
            to="/app"
            className="inline-flex items-center rounded-lg bg-[#111111] px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-black/80 shadow-sm"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
