import { useEffect, useRef } from "react";

// Wire preview image zoom toggle and broken-image handling
export function usePreviewImages(activeTab, html) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const onClick = (e) => {
      const img = e.target.closest(".md-img");
      if (img && root.contains(img)) {
        img.classList.toggle("zoomed");
      }
    };
    const onError = (e) => {
      const img = e.target;
      if (img instanceof HTMLImageElement && img.classList.contains("md-img")) {
        img.style.display = "none";
        img.closest(".md-figure")?.classList.add("img-failed");
      }
    };

    root.addEventListener("click", onClick);
    root.addEventListener("error", onError, true);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("error", onError, true);
    };
  }, [activeTab, html]);

  return scrollRef;
}
