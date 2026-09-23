export const architecture = `# Architecture

Readmade is a Vite + React single-page app. Rendering, state, and export all happen in the browser.

## Stack

| Layer | Choice |
| --- | --- |
| Build | Vite |
| UI | React |
| Routing | React Router |
| State | Zustand |
| Styling | Tailwind CSS |
| Markdown | marked + DOMPurify |
| Icons | lucide-react, react-icons |
| Drag and drop | dnd-kit |

## Folder layout

| Path | Role |
| --- | --- |
| \`src/components\` | UI for app shell, editor, blocks, preview, landing, dialogs |
| \`src/data\` | Static content: templates, palette lists |
| \`src/docs\` | This documentation route |
| \`src/hooks\` | Shared hooks: shortcuts, autosave, focus trap, dismiss |
| \`src/lib\` | Pure JavaScript: markdown, tokenizer, theme, export |
| \`src/store\` | Workspace state and browser persistence |

## Data flow

1. Blocks live in the Zustand store and persist to \`localStorage\`
2. The Markdown string is derived from blocks on every change
3. Preview parses that string for display; Code shows the same string
4. Export writes the same string to a file or clipboard

There is no backend. The preview and the download are guaranteed to match because they share one source of truth.

## Theming

- Class-based dark mode: the \`.dark\` class sits on \`<html>\`
- An early inline script in \`index.html\` applies the stored theme before first paint
- Theme key: \`readmade:theme\`, change event: \`readmade:theme-change\`

## Routes

| Path | Page |
| --- | --- |
| \`/\` | Landing page |
| \`/app\` | Editor workspace |
| \`/docs\` | This documentation |
| \`*\` | Not found |

## Code style rules

- Keep each source file under 180 lines - split large components
- Put pure JavaScript logic in \`.js\` modules, not \`.jsx\` components
- Keep only short hint comments where intent is unclear
- Use simple hyphens (\`-\`) instead of em dashes in copy
- Match existing light and dark styles when touching UI

## Related

- [Contributing](/docs/contributing)
- [Storage and privacy](/docs/storage)
`;
