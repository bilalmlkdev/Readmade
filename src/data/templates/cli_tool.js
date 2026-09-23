import {
  Terminal,
} from "lucide-react";

export const TPL_CLI_TOOL = {
    id: "cli-tool",
    name: "CLI Tool",
    desc: "For command-line tools and developer utilities",
    icon: Terminal,
    blocks: [
      {
        type: "title",
        content: {
          name: "create-app",
          tagline: "Scaffold new projects in seconds",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "npm",
              url: "https://img.shields.io/badge/npm-1.5.0-blue",
              link: "#",
            },
            {
              label: "Node",
              url: "https://img.shields.io/badge/Node-18+-339933",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "**create-app** is a CLI tool that scaffolds new projects with your preferred framework and configuration. Supports React, Vue, Svelte, and more.",
        },
      },
      {
        type: "features",
        content: {
          items: [ "Interactive prompts", "Multiple framework support", "Pre-configured ESLint + Prettier", "Git initialization", "First commit ready",
          ],
        },
      },
      {
        type: "installation",
        content: { manager: "npm", package: "create-app", extra: "" },
      },
      {
        type: "usage",
        content: {
          language: "bash",
          code: "# Create a new project\nnpx create-app my-project\n\n# With options\nnpx create-app my-project --template react-ts\n\n# List available templates\nnpx create-app --list",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "npx create-app <name>",
              description: "Create a new project interactively",
              params: "name - Project directory name",
            },
            {
              name: "--template <template>",
              description: "Skip prompts, use a specific template",
              params: "template - react, vue, svelte, vanilla",
            },
            {
              name: "--no-git",
              description: "Skip git initialization",
              params: "",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "Want to add a new template? We'd love your help!",
          steps: [ "Fork the repo", "Add template to `/templates`","Update the template registry","Test with `node bin/cli.js`","Submit PR",
          ],
        },
      },
      {
        type: "license",
        content: {
          type: "MIT",
          year: "2024",
          author: "create-app contributors",
        },
      },
    ],
  };
