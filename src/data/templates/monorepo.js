import {
  Layers,
} from "lucide-react";

export const TPL_MONOREPO = {
    id: "monorepo",
    name: "Monorepo",
    desc: "For multi-package projects with shared tooling",
    icon: Layers,
    blocks: [
      {
        type: "title",
        content: {
          name: "acme-monorepo",
          tagline: "Shared packages for the Acme platform",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "Turborepo",
              url: "https://img.shields.io/badge/Built_with-Turborepo-ff6b6b",
              link: "#",
            },
            {
              label: "License",
              url: "https://img.shields.io/badge/license-MIT-green",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "This monorepo contains all Acme platform packages. Managed with Turborepo for fast builds and incremental development.",
        },
      },
      {
        type: "features",
        content: {
          items: [ "Shared TypeScript config", "Unified linting and formatting", "Incremental builds with Turborepo", "Shared testing utilities", "Automated publishing",
          ],
        },
      },
      {
        type: "installation",
        content: {
          manager: "npm",
          package: "",
          extra: "git clone https://github.com/acme/monorepo.git\ncd monorepo\nnpm install",
        },
      },
      {
        type: "usage",
        content: {
          language: "bash",
          code: "# Build all packages\nturbo build\n\n# Run tests\nturbo test\n\n# Start dev mode\nturbo dev\n\n# Add a new package\nnpm create package @acme/new-package",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "@acme/core",
              description: "Core utilities and shared types",
              params: "",
            },
            {
              name: "@acme/ui",
              description: "React component library",
              params: "",
            },
            {
              name: "@acme/sdk",
              description: "API client for Acme services",
              params: "",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "See [CONTRIBUTING.md](./CONTRIBUTING.md) for monorepo-specific guidelines.",
          steps: [ "Create a branch", "Make changes in relevant packages", "Run `turbo test` and `turbo build`","Submit PR with changeset",
          ],
        },
      },
      {
        type: "license",
        content: { type: "MIT", year: "2024", author: "Acme Inc" },
      },
    ],
  };
