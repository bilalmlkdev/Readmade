import {
  AppWindow,
} from "lucide-react";

export const TPL_APPLICATION = {
    id: "application",
    name: "Application",
    desc: "For desktop apps, web apps, and services",
    icon: AppWindow,
    blocks: [
      {
        type: "title",
        content: {
          name: "NoteVault",
          tagline: "End-to-end encrypted note taking",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "Version",
              url: "https://img.shields.io/badge/version-3.2.0-blue",
              link: "#",
            },
            {
              label: "Platform",
              url: "https://img.shields.io/badge/platform-Win%20%7C%20Mac%20%7C%20Linux-lightgrey",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "**NoteVault** is a secure, end-to-end encrypted note-taking application. Your notes stay private - we can't read them, even if we wanted to.",
        },
      },
      {
        type: "features",
        content: {
          items: [ "End-to-end encryption with AES-256", "Offline-first with sync", "Markdown support", "Tags and folders", "Export to PDF",
          ],
        },
      },
      {
        type: "installation",
        content: {
          manager: "npm",
          package: "notevault",
          extra: "# Or download from https://notevault.app/download",
        },
      },
      {
        type: "usage",
        content: {
          language: "bash",
          code: "# Launch the app\nnotevault\n\n# Import notes from file\nnotevault import ./backup.json\n\n# Sync with server\nnotevault sync",
        },
      },
      {
        type: "screenshots",
        content: {
          items: [
            {
              url: "https://placehold.co/800x450/111111/ffffff?text=NoteVault+Editor",
              alt: "Editor View",
              caption: "Clean, distraction-free editor",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "See our [contributing guide](CONTRIBUTING.md).",
          steps: [ "Report bugs via GitHub Issues", "Submit PRs for features", "Join our Discord",
          ],
        },
      },
      {
        type: "license",
        content: { type: "AGPL-3.0", year: "2024", author: "NoteVault Team" },
      },
    ],
  };
