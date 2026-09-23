import {
  FileText,
} from "lucide-react";

export const TPL_MINIMAL = {
    id: "minimal",
    name: "Minimal",
    desc: "Clean, simple README with just the essentials",
    icon: FileText,
    blocks: [
      {
        type: "title",
        content: { name: "My Project", tagline: "A simple, lightweight tool" },
      },
      {
        type: "description",
        content: {
          text: "A minimal project that does one thing well. Built for developers who value simplicity.",
        },
      },
      {
        type: "installation",
        content: { manager: "npm", package: "my-project", extra: "" },
      },
      {
        type: "usage",
        content: {
          language: "js",
          code: "import { init } from 'my-project'\n\ninit()",
        },
      },
      {
        type: "license",
        content: { type: "MIT", year: "2024", author: "Your Name" },
      },
    ],
  };
