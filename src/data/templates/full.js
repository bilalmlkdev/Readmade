import {
  Star,
} from "lucide-react";

export const TPL_FULL = {
    id: "full",
    name: "Full Featured",
    desc: "Complete README with all sections for production apps",
    icon: Star,
    starred: true,
    blocks: [
      {
        type: "title",
        content: {
          name: "Readmade",
          tagline: "The fastest way to craft beautiful READMEs",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "npm",
              url: "https://img.shields.io/badge/npm-1.0.0-blue",
              link: "#",
            },
            {
              label: "License",
              url: "https://img.shields.io/badge/license-MIT-green",
              link: "#",
            },
            {
              label: "Build",
              url: "https://img.shields.io/badge/build-passing-brightgreen",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "**Readmade** is a visual drag-and-drop README builder. Create stunning documentation in minutes without writing a single line of markdown.",
        },
      },
      {
        type: "features",
        content: {
          items: [
            "Visual block editor",
            "Live preview",
            "One-click export",
            "Works offline",
            "Dark mode support",
          ],
        },
      },
      {
        type: "installation",
        content: {
          manager: "npm",
          package: "readmade",
          extra: "git clone https://github.com/user/readmade.git\ncd readmade\nnpm install",
        },
      },
      {
        type: "usage",
        content: {
          language: "js",
          code: "import { Readmade } from 'readmade'\n\nconst app = new Readmade()\napp.create({ title: 'My Project' })",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "new Readmade()",
              description: "Create a new instance",
              params: "options - Configuration object",
            },
            {
              name: ".create(config)",
              description: "Generate a README from config",
              params: "config - Project configuration",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "Contributions are welcome!",
          steps: ["Fork the repo", "Create a branch", "Make changes", "Submit PR"],
        },
      },
      {
        type: "license",
        content: { type: "MIT", year: "2024", author: "Readmade Team" },
      },
    ],
  };
