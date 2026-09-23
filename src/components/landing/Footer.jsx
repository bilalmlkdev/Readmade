import { ArrowUp } from "lucide-react";
import { cn } from "../../lib/cn";
import { TextureButton } from "../ui/TextureButton";
import { BrandLogo } from "./BrandLogo";

const socialLinks = [
  {
    title: "GitHub",
    href: "https://github.com/bilalmlkdev/readmade",
    label: "GitHub",
  },
  {
    title: "Docs",
    href: "/docs",
    label: "Docs",
  },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer
      className={cn(
        "relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-t-4xl border-t border-border px-6 md:rounded-t-6xl md:px-8",
        "dark:bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.1),transparent)]",
      )}
    >
      <div className="absolute top-1/2 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

      <div className="flex w-full flex-col items-center gap-6 py-10 md:flex-row md:items-start md:justify-between md:py-12">
        <div className="flex max-w-sm flex-col items-center gap-4 md:items-start">
          <BrandLogo />
          <p className="text-center text-sm leading-relaxed text-muted-foreground md:text-left">
            Build stunning GitHub READMEs visually. Local-first, free, and open
            source.
          </p>

          <div className="mt-1 flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={link.title}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  "border border-border bg-muted/50",
                  "text-muted-foreground transition-all duration-200",
                  "hover:border-foreground/20 hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <TextureButton onClick={scrollToTop}>
            <span className="text-sm font-medium">Back to top</span>
            <ArrowUp className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </TextureButton>
        </div>
      </div>

      <div className="h-px w-full bg-linear-to-r via-border" />

      <div className="flex w-full items-center justify-center py-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Readmade. All rights reserved
        </p>
      </div>
    </footer>
  );
}
