import { useState, useEffect } from "react";

export default function DocsToc({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || "");
  const current =
    headings.some((h) => h.id === activeId) || !headings[0]
      ? activeId
      : headings[0].id;

  useEffect(() => {
    if (headings.length === 0) return undefined;
    const root = document.getElementById("docs-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root,
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [headings]);

  function scrollToHeading(e, id) {
    e.preventDefault();
    const target = document.getElementById(id);
    const scroller = document.getElementById("docs-scroll");
    if (!target || !scroller) return;
    const top =
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop -
      16;
    scroller.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  if (headings.length === 0) {
    return <div className="hidden w-52 shrink-0 xl:block" aria-hidden="true" />;
  }

  return (
    <nav
      className="hidden w-52 shrink-0 overflow-x-hidden overflow-y-auto border-l border-gray-200 px-4 py-8 xl:block dark:border-white/10"
      aria-label="On this page"
    >
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        On this page
      </div>
      <ul className="space-y-1 border-l border-gray-200 dark:border-white/10">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => scrollToHeading(e, h.id)}
              className={[
                "-ml-px block border-l py-1 text-[13px] transition",
                h.depth === 3 ? "pl-6" : "pl-3",
                current === h.id
                  ? "border-black font-medium text-black dark:border-white dark:text-white"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-black dark:text-gray-400 dark:hover:border-white/30 dark:hover:text-white",
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
