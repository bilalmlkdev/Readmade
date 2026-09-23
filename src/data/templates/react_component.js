import {
  Component,
} from "lucide-react";

export const TPL_REACT_COMPONENT = {
    id: "react-component",
    name: "React Component",
    desc: "For UI component libraries and React packages",
    icon: Component,
    blocks: [
      {
        type: "title",
        content: {
          name: "ui-kit",
          tagline: "Beautiful, accessible React components",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "npm",
              url: "https://img.shields.io/badge/npm-4.0.0-blue",
              link: "#",
            },
            {
              label: "React",
              url: "https://img.shields.io/badge/React-18-61dafb",
              link: "#",
            },
            {
              label: "Bundle",
              url: "https://img.shields.io/badge/bundle-12kb-success",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "**ui-kit** provides a set of accessible, customizable React components. Built with TypeScript, styled with CSS variables, and tree-shakeable.",
        },
      },
      {
        type: "features",
        content: {
          items: [ "30+ accessible components", "TypeScript definitions included", "CSS variables for easy theming", "Tree-shakeable", "Zero runtime CSS",
          ],
        },
      },
      {
        type: "installation",
        content: { manager: "npm", package: "@ui-kit/react", extra: "" },
      },
      {
        type: "usage",
        content: {
          language: "tsx",
          code: "import { Button, Card, Input } from '@ui-kit/react'\nimport '@ui-kit/react/styles.css'\n\nexport function Form() {\n return (\n <Card>\n <Input placeholder='Enter your name' />\n <Button variant='primary'>Submit</Button>\n </Card>\n )\n}",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "<Button />",
              description: "Clickable button with variants",
              params: "variant: 'primary' | 'secondary' | 'ghost'",
            },
            {
              name: "<Input />",
              description: "Text input with label and error support",
              params: "placeholder, label, error",
            },
            {
              name: "<Card />",
              description: "Container component with padding",
              params: "children, className",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "Contributions welcome! Check our Storybook for component docs.",
          steps: [ "Clone the repo", "Run `npm run storybook`","Add or update components","Write stories and tests","Submit PR",
          ],
        },
      },
      {
        type: "license",
        content: { type: "MIT", year: "2024", author: "ui-kit team" },
      },
    ],
  };
