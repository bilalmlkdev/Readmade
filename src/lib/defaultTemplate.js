import { createBlock } from "./blocks.js";

export function createDefaultBlocks() {
  return [
    createBlock("title", {
      name: "readmade",
      tagline: "Visual README builder - craft production-ready markdown in minutes",
    }),
    createBlock("badges", {
      badges: [
        {
          label: "npm",
          url: "https://img.shields.io/badge/npm-1.0.0-blue",
          link: "https://www.npmjs.com",
        },
        {
          label: "build",
          url: "https://img.shields.io/badge/build-passing-brightgreen",
          link: "",
        },
        {
          label: "license",
          url: "https://img.shields.io/badge/license-MIT-green",
          link: "",
        },
      ],
    }),
    createBlock("description", {
      text: "**Readmade** is a drag-and-drop README editor for developers who care about presentation. Arrange blocks, tweak content, and export clean markdown that renders perfectly on GitHub, GitLab, and anywhere else.",
    }),
    createBlock("features", {
      items: [ "Visual block editor - no raw markdown wrestling", "Live preview styled like GitHub / VS Code", "Export to `.md`, `.txt`, or standalone `.html`","Starter templates for apps, libraries, and APIs","Everything stays local in your browser",
      ],
    }),
    createBlock("installation", {
      manager: "npm",
      package: "readmade",
      extra: "",
    }),
    createBlock("usage", {
      language: "bash",
      code: "npm run dev\n\n# open http://localhost:5173\n# drag blocks on the left, watch the preview update",
    }),
    createBlock("screenshots", {
      items: [],
    }),
    createBlock("license", {
      type: "MIT",
      year: String(new Date().getFullYear()),
      author: "Your Name",
    }),
  ];
}
