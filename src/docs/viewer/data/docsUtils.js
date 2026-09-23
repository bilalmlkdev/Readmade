export function slugifyHeading(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractHeadings(markdown) {
  const headings = [];
  const lines = String(markdown || "").split("\n");
  let inFence = false;

  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({
      id: slugifyHeading(text),
      text,
      depth: match[1].length,
    });
  }
  return headings;
}

export function findPage(pages, slug) {
  if (!slug) return null;
  return pages.find((page) => page.slug === slug) || null;
}

export function searchPages(pages, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return pages;
  return pages.filter((page) => {
    const body = String(page.body || "").toLowerCase().slice(0, 400);
    return (
      page.title.toLowerCase().includes(q) ||
      String(page.description || "").toLowerCase().includes(q) ||
      page.slug.includes(q) ||
      body.includes(q)
    );
  });
}

export function flattenOrder(sections) {
  return sections.flatMap((section) => section.pages || []);
}

export function getSection(sections, slug) {
  return sections.find((section) => section.pages?.includes(slug)) || null;
}

export function getNeighbors(sections, slug) {
  const order = flattenOrder(sections);
  const index = order.indexOf(slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? order[index - 1] : null,
    next: index < order.length - 1 ? order[index + 1] : null,
  };
}
