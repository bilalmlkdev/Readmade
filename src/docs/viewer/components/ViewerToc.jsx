import { useEffect, useState } from "react";

export default function ViewerToc({ headings, scrollEl, onJump }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || "");
  const current =
    headings.some((h) => h.id === activeId) || !headings[0]
      ? activeId
      : headings[0].id;

  useEffect(() => {
    if (headings.length === 0) return undefined;
    const root = scrollEl || null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root, rootMargin: "-72px 0px -65% 0px", threshold: [0, 1] },
    );

    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings, scrollEl]);

  if (headings.length === 0) {
    return (
      <div className="hidden w-52 shrink-0 xl:block" aria-hidden="true" />
    );
  }

  return (
    <nav
      className="hidden w-52 shrink-0 overflow-x-hidden overflow-y-auto border-l border-gray-200 bg-white px-4 py-8 dark:border-white/10 dark:bg-[#111] xl:block"
      aria-label="On this page"
    >
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        On this page
      </div>
      <ul className="space-y-0.5 border-l border-gray-200 dark:border-white/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                onJump?.(h.id);
                setActiveId(h.id);
              }}
              className={[
                "-ml-px block border-l py-1 text-[13px]",
                h.depth === 3 ? "pl-5" : "pl-3",
                current === h.id
                  ? "border-gray-950 font-semibold text-gray-950 dark:border-white dark:text-white"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-white",
              ].join(" ")}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
