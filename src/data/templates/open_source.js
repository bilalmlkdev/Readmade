import {
  Users,
} from "lucide-react";

export const TPL_OPEN_SOURCE = {
    id: "open-source",
    name: "Open Source",
    desc: "Community-focused with detailed contributing guidelines",
    icon: Users,
    starred: true,
    blocks: [
      {
        type: "title",
        content: {
          name: "FastQuery",
          tagline: "Blazing fast query builder for any database",
        },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "Stars",
              url: "https://img.shields.io/github/stars/user/fastquery?style=social",
              link: "#",
            },
            {
              label: "Downloads",
              url: "https://img.shields.io/npm/dm/fastquery",
              link: "#",
            },
            {
              label: "License",
              url: "https://img.shields.io/badge/license-Apache--2.0-blue",
              link: "#",
            },
            {
              label: "PRs Welcome",
              url: "https://img.shields.io/badge/PRs-welcome-brightgreen",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "**FastQuery** is an open-source, universal query builder that works with PostgreSQL, MySQL, SQLite, and more. Write one query, run it anywhere.",
        },
      },
      {
        type: "features",
        content: {
          items: [ "Universal query builder for SQL databases", "TypeScript-first with full generics", "Chainable API", "Automatic query optimization", "Built-in migration support", "Comprehensive documentation",
          ],
        },
      },
      {
        type: "installation",
        content: { manager: "npm", package: "fastquery", extra: "" },
      },
      {
        type: "usage",
        content: {
          language: "ts",
          code: "import { Query } from 'fastquery'\n\nconst users = await Query.from('users')\n .where('age', '>', 18)\n .orderBy('name')\n .limit(10)\n .execute()",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "Query.from(table)",
              description: "Start a new query on a table",
              params: "table - Table name",
            },
            {
              name: ".where(col, op, val)",
              description: "Add a WHERE condition",
              params: "col - Column, op - Operator, val - Value",
            },
            {
              name: ".execute()",
              description: "Run the query and return results",
              params: "",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "We love contributions! Whether it's a bug report, feature request, or code contribution, we appreciate your help making FastQuery better.",
          steps: [ "Read our Code of Conduct", "Fork the repository", "Create a feature branch", "Write tests for your changes", "Ensure all tests pass", "Submit a pull request with a clear description",
          ],
        },
      },
      {
        type: "license",
        content: {
          type: "Apache-2.0",
          year: "2024",
          author: "FastQuery Contributors",
        },
      },
    ],
  };
