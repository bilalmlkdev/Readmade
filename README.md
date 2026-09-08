<div align="center">

  <a href="https://thereadmeforge.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/readmeforge/main/src/assets/favicon.svg" alt="readmeforge logo" width="100%" height="120">
  </a>

# Readmeforge

 ReadmeForge is a visual, block-based README builder that lets developers create <br> polished GitHub documentation without manually writing Markdown.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://thereadmeforge.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/readmeforge?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/readmeforge.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

<p align="center">
  <i>Created by <a href="https://bilalmlkdev.vercel.app" target="_blank">Bilal Malik</a></i><br>
  <i>Follow on Github <a href="https://github.com/bilalmlkdev" target="_blank">bilalmlkdev</a></i>
</p>



[![readmeforge Dashboard](https://raw.githubusercontent.com/bilalmlkdev/readmeforge/main/src/assets/preview.png)](https://thereadmeforge.vercel.app/)
[![readmeforge Dashboard](https://raw.githubusercontent.com/bilalmlkdev/readmeforge/main/src/assets/dashboard.png)](https://thereadmeforge.vercel.app/)

# About Readmeforge

**ReadmeForge** is an open-source **visual README builder** that helps developers create polished GitHub documentation without manually writing Markdown. Using reusable content blocks, you can build, rearrange, preview, and export professional README files entirely from your browser.

Everything updates in **real-time**, allowing you to switch between a live GitHub preview and raw Markdown whenever needed. Images are automatically compressed and uploaded through a lightweight serverless proxy, keeping exported README files clean and portable.

**No sign-up, no tracking.** Your data is saved **locally in your browser**, keyed by a unique user ID derived from the email you enter-giving you multiple isolated workspaces for different projects.



# Highlights

- Build README files visually with reusable blocks
- Live GitHub-style Markdown preview
- Syntax-highlighted code editor
- Built-in screenshot management
- One-click Markdown export
- Local-first workspace storage
- Fully responsive interface
- Privacy-focused with no accounts


# Features

## 1. Editor

- **11 documentation blocks** covering everything from project titles to API docs.
- **Drag & drop reordering** powered by `@dnd-kit`.
- **Duplicate, remove & rearrange** blocks effortlessly.
- **Collapsible sidebar** for a distraction-free workspace.

## 2. Preview

- **Live Markdown rendering** powered by `marked`.
- **Syntax-highlighted code view** using Prism.
- **Instant Preview ↔ Code switching** with synchronized updates.

## 3. Export

- **Copy Markdown** directly to your clipboard.
- **Download a production-ready `README.md`.**
- **Real-time statistics** including word count, file size, and image count.

## 4. Media

- **Drag & drop**, **clipboard paste**, or **URL imports** for screenshots.
- **Automatic image compression** before upload.
- **Hosted image URLs** instead of Base64.
- **Alt text, captions, reorder, and replace** support.

## 5. Storage

- **Email-based workspaces** with isolated projects.
- **Persistent local storage** using Zustand.
- **Serverless image hosting** via a Vercel proxy.
- **No backend or user accounts.**

## 6. Experience

- **Interactive onboarding** for first-time users.
- **Responsive layout** across desktop and mobile.
- **Keyboard shortcuts** for faster navigation.
- **Minimal, distraction-free interface.**



# Block Types

| Block | Icon | Description |
|---|---|---|
| Title | Heading | Project name & tagline |
| Badges | ShieldCheck | shields.io badges with live preview |
| Description | AlignLeft | Long-form project overview |
| Features | Star | Bulleted feature list |
| Installation | Download | Package manager selector + commands |
| Usage | Play | Language selector + code editor |
| Screenshots | Image | Upload, URL, captions, reorder |
| API Docs | Braces | Function signature, description, params |
| Contributing | GitPullRequest | Intro text + numbered steps |
| License | Scale | License type, year, author |
| Custom | Code | Free-form markdown textarea |



# How It Works / Usage

1. **Create a workspace** – Enter any email on the login screen. Your workspace ID is generated instantly-no verification needed.
2. **Add documentation blocks** – Browse the **Blocks** panel on the left and click any block to add it to your README.
3. **Arrange them** – Drag blocks to reorder them in the center panel. Humanity really looked at sticky notes and thought, “what if software.”
4. **Fill each block** – Click a block header to expand its editor and enter your project information.
5. **Preview in real-time** – The right panel shows a live preview of your README. Switch to **Code View** to see raw Markdown.
6. **Export** – Use the **Copy** and **Download** buttons in the toolbar to export your README.
7. **Upload screenshots** – Drag & drop or use the file picker. The app compresses them and hosts them externally, keeping your markdown clean.
8. **Replay the tour** – Click **"How it works"** (top of the center panel) to replay the onboarding walkthrough. Because apparently we now need tutorials for tutorials.
9. **Mobile editing** – On small screens, use the bottom navbar to access **Blocks** and **Palette** drawers. Press `Escape` to close them.



# How Data Is Stored

| Setting | Description |
|---|---|
| Workspace key | `readmeforge:{userId}:blocks` in `localStorage` |
| Active user ID | Stored in `localStorage` under `readmeforge_active_user_id` (UUID generated from your email) |
| User email & name | Stored in `localStorage` for identity preview |
| Images | Uploaded to an external host via Vercel proxy; returned as clean `https://` URLs |
| Onboarding | `localStorage` – shown once per session (`readmeforge:onboarded`) |
| Clear data | Clear all `localStorage` keys or switch to a different email on the login screen |



# Architecture

ReadmeForge follows a simple **client-first architecture** where editing, previewing, and exporting documentation happen inside the browser.

- Block-based editing system
- Live Markdown rendering
- LocalStorage persistence
- Serverless image uploads
- Zero backend database
- Fast client-side rendering


### Libraries & Packages

- **@dnd-kit** - Accessible drag-and-drop interactions
- **Zustand** - Lightweight global state management
- **Marked** - Markdown parsing and rendering
- **DOMPurify** - Secure HTML sanitization
- **React Syntax Highlighter** - Prism-powered code highlighting
- **Lucide React** - Modern icon library
- **React Icons** - Additional icon collections
- **React Joyride** - Interactive onboarding tours

### Deployment

- **Vercel** - Hosting & Serverless Functions


# Project Structure

```text
readmeforge/
├── api/                 # Serverless functions for image uploads
├── public/              # Static assets, icons, and metadata
├── src/
│   ├── components/      # Reusable blocks, editor, preview, pages & UI
│   ├── lib/             # Markdown generation and shared utilities
│   ├── store/           # Zustand state management with persistence
│   ├── App.jsx          # Application routing (Auth → Dashboard)
│   ├── Home.jsx         # Main three-panel editor interface
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind + custom preview styles
├── package.json
├── vite.config.js
└── README.md
```

# Getting Started

Before running the project locally, ensure you have:

- Node.js (Latest LTS)
- npm
- A modern web browser

## Installation

```bash
git clone https://github.com/bilalmlkdev/readmeforge.git

cd readmeforge

npm install

npm run dev
```

Open the local development URL shown in your terminal.

### Production Build

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```



# Contributing

Contributions of all sizes are welcome.

You can help by:

- Adding new documentation blocks
- Improving Markdown generation
- Fixing bugs
- Enhancing accessibility
- Optimizing performance
- Improving the editor experience
- Building new features

## Development Workflow

```bash
# Fork the repository

git checkout -b feat/your-feature

git commit -m "feat: add your feature"

git push origin feat/your-feature
```

Open a Pull Request once your changes are ready.

For larger features or architectural changes, opening an issue before implementation is recommended.

# License (MIT)

This project is licensed under the **MIT License**.

```text

MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software.The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
