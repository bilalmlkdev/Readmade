import { useCallback, useEffect, useRef, useState } from "react";

export function useDocsScroll() {
  const [el, setEl] = useState(null);

  const scrollToTop = useCallback(() => {
    el?.scrollTo({ top: 0, behavior: "instant" });
  }, [el]);

  const scrollToId = useCallback(
    (id, offset = 16) => {
      if (!el || !id) return;
      const target =
        el.querySelector(`#${CSS.escape(id)}`) ||
        document.getElementById(id);
      if (!target) return;
      const top =
        target.getBoundingClientRect().top -
        el.getBoundingClientRect().top +
        el.scrollTop -
        offset;
      el.scrollTo({ top, behavior: "smooth" });
    },
    [el],
  );

  return { el, setRef: setEl, scrollToTop, scrollToId };
}

export function useModK(onOpen) {
  const ref = useRef(onOpen);

  useEffect(() => {
    ref.current = onOpen;
  }, [onOpen]);

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
