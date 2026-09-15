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
  [BLOCK_TYPES.TITLE]: { label: "Title", color: "#111111" },
  [BLOCK_TYPES.BADGES]: { label: "Badges", color: "#111111" },
  [BLOCK_TYPES.DESCRIPTION]: { label: "Description", color: "#111111" },
  [BLOCK_TYPES.FEATURES]: { label: "Features", color: "#111111" },
  [BLOCK_TYPES.INSTALLATION]: { label: "Installation", color: "#111111" },
  [BLOCK_TYPES.USAGE]: { label: "Usage", color: "#111111" },
  [BLOCK_TYPES.SCREENSHOTS]: { label: "Screenshots", color: "#111111" },
  [BLOCK_TYPES.API]: { label: "API Docs", color: "#111111" },
  [BLOCK_TYPES.CONTRIBUTING]: { label: "Contributing", color: "#111111" },
  [BLOCK_TYPES.LICENSE]: { label: "License", color: "#111111" },
  [BLOCK_TYPES.CUSTOM]: { label: "Custom", color: "#111111" },
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
    name: "Project Name",
    tagline: "A short description of what this project does",
  },
  badges: {
    badges: [
      {
        label: "Build",
        url: "https://img.shields.io/badge/build-passing-brightgreen",
        link: "#",
      },
      {
        label: "Version",
        url: "https://img.shields.io/badge/version-1.0.0-blue",
        link: "#",
      },
      {
        label: "License",
        url: "https://img.shields.io/badge/license-MIT-green",
        link: "#",
      },
    ],
  },
  description: {
    text: "A brief overview of your project. Explain what it does, why it exists, and who it's for. Keep it concise — one or two paragraphs is ideal.",
  },
  features: {
    items: [
      "Feature one — what it does",
      "Feature two — what it does",
      "Feature three — what it does",
      "Feature four — what it does",
      "Feature five — what it does",
    ],
  },
  installation: {
    manager: "npm",
    package: "your-package-name",
    extra: "",
  },
  usage: {
    language: "js",
    code: "import { yourPackage } from 'your-package-name'\n\nconst result = yourPackage({\n  option: 'value',\n})\n\nconsole.log(result)",
  },
  screenshots: {
    items: [],
  },
  api: {
    entries: [
      {
        name: "functionName(options)",
        description: "Describe what this function does and when to use it.",
        params: "options — object with configuration",
      },
    ],
  },
  contributing: {
    text: "Contributions are welcome. Please open an issue first to discuss what you would like to change.",
    steps: [
      "Fork the repository",
      "Create your branch (`git checkout -b feature/amazing-feature`)",
      "Commit your changes (`git commit -m 'Add amazing feature'`)",
      "Push to the branch (`git push origin feature/amazing-feature`)",
      "Open a Pull Request",
    ],
  },
  license: {
    type: "MIT",
    year: String(new Date().getFullYear()),
    author: "Your Name",
  },
  custom: {
    markdown: "## Custom Section\n\nWrite any **markdown** content here.",
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