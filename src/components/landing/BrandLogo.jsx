import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import Logo from "../ui/Logo.tsx";

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

export function BrandLogo({ size = "md", className, withIcon = true }) {
  return (
    <span className={cn("inline-flex select-none items-center gap-2", className)}>
      {withIcon && <Logo className="size-6 text-foreground" />}
      <span
        className={cn(
          "dancing-script font-normal tracking-normal text-foreground",
          sizes[size] ?? sizes.md,
        )}
      >
        Readmade
      </span>
    </span>
  );
}

export function BrandLogoLink({ size = "md", className }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Readmade home">
      <BrandLogo size={size} className={className} />
    </Link>
  );
}
