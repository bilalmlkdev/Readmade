export const SECTIONS = [
  {
    title: "Getting Started",
    pages: ["intro", "quick-start"],
  },
  {
    title: "Guide",
    pages: ["editor", "blocks", "templates", "preview-export", "shortcuts"],
  },
  {
    title: "Reference",
    pages: [
      "storage",
      "architecture",
      "contributing",
      "security",
      "changelog",
      "license",
      "faq",
    ],
  },
];

export const FLAT_ORDER = SECTIONS.flatMap((s) => s.pages);

export function getNeighbors(slug) {
  const i = FLAT_ORDER.indexOf(slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? FLAT_ORDER[i - 1] : null,
    next: i < FLAT_ORDER.length - 1 ? FLAT_ORDER[i + 1] : null,
  };
}

export function getSectionFor(slug) {
  return SECTIONS.find((s) => s.pages.includes(slug)) || null;
}
