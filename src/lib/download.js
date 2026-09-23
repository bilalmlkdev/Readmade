export function downloadBlobFile(content, type, filename) {
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([content], { type })),
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

export function downloadMarkdown(raw, name) {
  const baseName = (name || "README").replace(/\.md$/i, "") || "README";
  downloadBlobFile(raw, "text/markdown", `${baseName}.md`);
}
