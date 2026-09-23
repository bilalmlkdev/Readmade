import {
  Package,
} from "lucide-react";

export const TPL_LIBRARY = {
    id: "library",
    name: "Library / SDK",
    desc: "Optimized for npm packages and developer libraries",
    icon: Package,
    blocks: [
      {
        type: "title",
        content: {
          name: "data-transform",
          tagline: "Type-safe data transformation utilities",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "npm",
              url: "https://img.shields.io/badge/npm-2.1.0-blue",
              link: "#",
            },
            {
              label: "TypeScript",
              url: "https://img.shields.io/badge/TypeScript-5.0-blue",
              link: "#",
            },
            {
              label: "Bundle",
              url: "https://img.shields.io/badge/bundle-3kb-success",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "**data-transform** provides a collection of type-safe, tree-shakeable utilities for transforming, filtering, and mapping data structures. Zero dependencies, works in Node.js and browsers.",
        },
      },
      {
        type: "features",
        content: {
          items: [ "Full TypeScript support with generics", "Tree-shakeable - only import what you use", "Zero dependencies", "Works in Node.js 18+ and all modern browsers", "100% test coverage",
          ],
        },
      },
      {
        type: "installation",
        content: {
          manager: "npm",
          package: "data-transform",
          extra: "yarn add data-transform\npnpm add data-transform",
        },
      },
      {
        type: "usage",
        content: {
          language: "ts",
          code: "import { transform, filter, pipe } from 'data-transform'\n\nconst result = pipe(\n data,\n filter(item => item.active),\n transform(item => ({ ...item, name: item.name.toUpperCase() }))\n)",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "pipe(...fns)",
              description: "Compose functions left-to-right",
              params: "fns - Array of transformation functions",
            },
            {
              name: "filter(predicate)",
              description: "Create a filter function",
              params: "predicate - (item: T) => boolean",
            },
            {
              name: "transform(fn)",
              description: "Create a map function",
              params: "fn - (item: T) => U",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "PRs welcome! Please read CONTRIBUTING.md first.",
          steps: [ "Clone the repo", "Run `npm install`","Create a branch","Add tests","Submit PR",
          ],
        },
      },
      {
        type: "license",
        content: {
          type: "MIT",
          year: "2024",
          author: "data-transform contributors",
        },
      },
    ],
  };
