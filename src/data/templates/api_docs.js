import {
  BookOpen,
} from "lucide-react";

export const TPL_API_DOCS = {
    id: "api-docs",
    name: "API Documentation",
    desc: "Structured documentation for REST and GraphQL APIs",
    icon: BookOpen,
    blocks: [
      {
        type: "title",
        content: { name: "Acme API", tagline: "RESTful API for the Acme platform" },
      },
      {
        type: "badges",
        content: {
          badges: [
            {
              label: "API Version",
              url: "https://img.shields.io/badge/API-v2-blue",
              link: "#",
            },
            {
              label: "Status",
              url: "https://img.shields.io/badge/status-operational-brightgreen",
              link: "#",
            },
          ],
        },
      },
      {
        type: "description",
        content: {
          text: "The **Acme API** provides programmatic access to the Acme platform. Create, read, update, and manage resources using standard HTTP methods.",
        },
      },
      {
        type: "installation",
        content: { manager: "npm", package: "@acme/sdk", extra: "" },
      },
      {
        type: "usage",
        content: {
          language: "js",
          code: "import { AcmeClient } from '@acme/sdk'\n\nconst client = new AcmeClient({ apiKey: 'your-key' })\nconst users = await client.users.list()",
        },
      },
      {
        type: "api",
        content: {
          entries: [
            {
              name: "GET /users",
              description: "List all users with pagination",
              params: "page (int), limit (int)",
            },
            {
              name: "POST /users",
              description: "Create a new user",
              params: "name (string), email (string)",
            },
            {
              name: "GET /users/:id",
              description: "Get a user by ID",
              params: "id (string) - User ID",
            },
            {
              name: "PUT /users/:id",
              description: "Update a user",
              params: "id (string), name? (string), email? (string)",
            },
            {
              name: "DELETE /users/:id",
              description: "Delete a user",
              params: "id (string) - User ID",
            },
          ],
        },
      },
      {
        type: "contributing",
        content: {
          text: "Found a bug? Open an issue with reproduction steps.",
          steps: [
            "Check existing issues",
            "Open a new issue",
            "Include API version and request/response",
          ],
        },
      },
      {
        type: "license",
        content: { type: "MIT", year: "2024", author: "Acme Inc" },
      },
    ],
  };
