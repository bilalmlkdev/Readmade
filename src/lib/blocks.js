import {
  Heading,
  ShieldCheck,
  AlignLeft,
  Star,
  Download,
  Play,
  Image,
  Braces,
  GitPullRequest,
  Scale,
  Code,
} from "lucide-react";

export const BLOCK_TYPES = {
  TITLE: "title",
  BADGES: "badges",
  DESCRIPTION: "description",
  FEATURES: "features",
  INSTALLATION: "installation",
  USAGE: "usage",
  SCREENSHOTS: "screenshots",
  API: "api",
  CONTRIBUTING: "contributing",
  LICENSE: "license",
  CUSTOM: "custom",
};

export const BLOCK_META = {
  [BLOCK_TYPES.TITLE]: { label: "Title", color: "#111111", desc: "project heading" },
  [BLOCK_TYPES.BADGES]: { label: "Badges", color: "#111111", desc: "status shields" },
  [BLOCK_TYPES.DESCRIPTION]: { label: "Description", color: "#111111", desc: "overview text" },
  [BLOCK_TYPES.FEATURES]: { label: "Features", color: "#111111", desc: "highlight list" },
  [BLOCK_TYPES.INSTALLATION]: { label: "Installation", color: "#111111", desc: "install steps" },
  [BLOCK_TYPES.USAGE]: { label: "Usage", color: "#111111", desc: "code examples" },
  [BLOCK_TYPES.SCREENSHOTS]: { label: "Screenshots", color: "#111111", desc: "images" },
  [BLOCK_TYPES.API]: { label: "API Docs", color: "#111111", desc: "method ref" },
  [BLOCK_TYPES.CONTRIBUTING]: { label: "Contributing", color: "#111111", desc: "guidelines" },
  [BLOCK_TYPES.LICENSE]: { label: "License", color: "#111111", desc: "MIT etc" },
  [BLOCK_TYPES.CUSTOM]: { label: "Custom", color: "#111111", desc: "freeform md" },
};

export const BLOCK_ICONS = {
  [BLOCK_TYPES.TITLE]: Heading,
  [BLOCK_TYPES.BADGES]: ShieldCheck,
  [BLOCK_TYPES.DESCRIPTION]: AlignLeft,
  [BLOCK_TYPES.FEATURES]: Star,
  [BLOCK_TYPES.INSTALLATION]: Download,
  [BLOCK_TYPES.USAGE]: Play,
  [BLOCK_TYPES.SCREENSHOTS]: Image,
  [BLOCK_TYPES.API]: Braces,
  [BLOCK_TYPES.CONTRIBUTING]: GitPullRequest,
  [BLOCK_TYPES.LICENSE]: Scale,
  [BLOCK_TYPES.CUSTOM]: Code,
};

const DEFAULTS = {
  title: {
    name: "Untitled Project",
    tagline: "One line that explains what this project does",
  },
  badges: {
    badges: [
      {
        label: "build",
        url: "https://img.shields.io/badge/build-passing-brightgreen",
        link: "",
      },
      {
        label: "version",
        url: "https://img.shields.io/badge/version-1.0.0-blue",
        link: "",
      },
      {
        label: "license",
        url: "https://img.shields.io/badge/license-MIT-green",
        link: "",
      },
    ],
  },
  description: {
    text: "Describe your project in a sentence or two. What problem does it solve, and who is it for?",
  },
  features: {
    items: [ "First feature - what it does", "Second feature - what it does", "Third feature - what it does",
    ],
  },
  installation: {
    manager: "npm",
    package: "your-package-name",
    extra: "",
  },
  usage: {
    language: "js",
    code: "import { init } from 'your-package-name'\n\ninit({\n option: 'value',\n})",
  },
  screenshots: {
    items: [{ url: "", alt: "", caption: "" }],
  },
  api: {
    entries: [
      {
        name: "init(options)",
        description: "Initialize the library with the given options.",
        options: "options - configuration object",
      },
    ],
  },
  contributing: {
    text: "Contributions are welcome. Open an issue first to discuss what you would like to change.",
    steps: [ "Fork the repository", "Create your branch (`git checkout -b feature/amazing-feature`)","Commit your changes (`git commit -m 'Add amazing feature'`)","Push to the branch (`git push origin feature/amazing-feature`)","Open a Pull Request",
    ],
  },
  license: {
    type: "MIT",
    year: String(new Date().getFullYear()),
    author: "Your Name",
  },
  custom: {
    markdown: "## Custom Section\n\nWrite any **markdown** here.",
  },
};

let _id = 1;
export function createBlock(type, contentOverride) {
  const defaults = JSON.parse(JSON.stringify(DEFAULTS[type] || {}));
  return {
    id: `block_${_id++}_${Date.now()}`,
    type,
    content: contentOverride
      ? { ...defaults, ...contentOverride }
      : defaults,
  };
}