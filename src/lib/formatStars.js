// Format GitHub star counts as compact strings (1.2k, 3.4M)
export function formatStars(count) {
  if (count == null || Number.isNaN(count)) return null;
  if (count >= 1_000_000) {
    const v = count / 1_000_000;
    return `${v >= 10 ? Math.round(v) : Math.round(v * 10) / 10}M`;
  }
  if (count >= 1_000) {
    const v = count / 1_000;
    return `${v >= 10 ? Math.round(v) : Math.round(v * 10) / 10}k`;
  }
  return String(count);
}
