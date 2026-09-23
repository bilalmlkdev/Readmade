import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "../../lib/cn";
import { useScroll } from "../../hooks/useScroll";
import ThemeToggle from "../ui/ThemeToggle";
import { BrandLogoLink } from "./BrandLogo";
import { navLinks } from "./navLinks";

function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/docs"
          onClick={onClose}
          className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-foreground"
        >
          Docs
        </Link>
        <Link
          to="/app"
          onClick={onClose}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Open App
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export const Header = memo(function Header() {
  const scrolled = useScroll(10);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/80 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogoLink />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <Link
            to="/docs"
            className="ml-1 rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-accent hover:text-foreground"
          >
            Docs
          </Link>

          <div className="mr-1 ml-2 flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://github.com/bilalmlkdev/readmade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground/80 shadow-xs transition-all outline-none hover:bg-accent hover:text-accent-foreground"
            >
              <FaGithub className="size-4" />
              GitHub
            </a>
          </div>

          <Link
            to="/app"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm text-primary-foreground transition hover:bg-primary/90"
          >
            Open App
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <a
            href="https://github.com/bilalmlkdev/readmade"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground/80"
          >
            <FaGithub className="size-4" />
          </a>
          <button
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
});
