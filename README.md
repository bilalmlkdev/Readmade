# Readmade

**The README editor that helps your project make sense before anyone runs it.**

Readmade is a local-first workspace for building the documentation your repository deserves. Start with a handful of useful sections, arrange the story visually, and watch the GitHub-ready Markdown take shape as you work. When it reads right, copy it or download it-then ship it with your project.

## Why Readmade

A README is often the first real conversation someone has with a project. It should explain what matters, show how to begin, and make the next step obvious. Readmade keeps that work focused: no Markdown syntax to wrestle, no account to create, and no dashboard full of distractions.

Your workspace lives in the browser. You can experiment freely, return to it later, and export plain Markdown that belongs in your repository-not locked inside a platform.

## What you can make

- Compose a README from title, badges, description, features, installation, usage, screenshots, API, contribution, license, and custom Markdown blocks.
- Reorder, duplicate, expand, and remove sections without breaking the document’s structure.
- Review a live GitHub-style preview or switch to the generated source at any time.
- Add screenshots by dropping files, pasting from the clipboard, or providing a URL; Readmade compresses uploads before sending them through its image proxy.
- Copy the result or download a ready-to-commit `README.md`.
- Keep separate browser-local workspaces by email, without sign-up or verification.

## The Readmade workflow

1. Open a workspace using any email address.
2. Choose the blocks that fit the project and fill in the details.
3. Put the sections in the order a new contributor or user needs them.
4. Use the preview to read the page as they will.
5. Export clean Markdown and commit it to the repository.

## Run Readmade locally

Readmade is a Vite + React application. You’ll need a current Node.js LTS release and npm.

```bash
git clone https://github.com/bilalmlkdev/readmade.git
cd readmade
npm install
npm run dev
```

Vite will print the local URL after the development server starts.

To create a production build:

```bash
npm run build
npm run preview
```

## How it is built

The editor is intentionally client-first. React renders the workspace, Zustand persists the blocks in `localStorage`, and the preview is generated from the same Markdown Readmade exports. Images are the exception: uploads pass through a small Vercel serverless endpoint so exported documents contain portable URLs rather than embedded image data.

The main pieces are:

- `src/components/blocks` - editable documentation sections
- `src/components/editor` - the block palette and sortable canvas
- `src/components/preview` - Markdown and rendered-document views
- `src/store` - workspace state and browser persistence
- `api/upload.js` - image upload proxy

## Privacy and storage

Readmade does not require an account. Workspace identity and content are stored locally in the browser under the `readmade` namespace. Clearing browser storage, resetting the workspace, or logging out removes that local data. Uploaded screenshots are hosted externally so the Markdown can reference ordinary HTTPS image URLs.

## Contributing

If you see a way to make project documentation easier to write or easier to read, we’d love the help. Open an issue for a substantial change, or send a focused pull request with a clear description and a passing build.

```bash
npm run lint
npm run build
```

## License

Readmade is available under the [MIT License](LICENSE).
