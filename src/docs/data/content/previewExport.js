export const previewExport = `# Preview & Export

The right panel shows your README as it will render on GitHub. You can flip to raw Markdown at any time, then copy or download the result.

## Preview tab

The Preview tab renders the same Markdown Readmade exports:

- Headings, lists, tables, and blockquotes
- Code blocks with language labels
- Badges and figures
- GitHub-like typography and spacing

It uses a dedicated Markdown renderer with sanitization, so embedded HTML in Custom blocks is cleaned before display.

## Code tab

The Code tab shows the generated Markdown source with syntax highlighting. Use it to:

- Verify heading levels and list markers
- Check badge URLs
- Copy the raw file contents
- Diff mentally against what you expect to commit

## Toolbar actions

| Action | What it does |
| --- | --- |
| Preview / Code | Switch rendering mode |
| Copy | Copy Markdown to the clipboard |
| Download | Save \`README.md\` (or \`.txt\` / \`.html\`) |
| Stats | Word count and file size |

## Export formats

- **Markdown (\`.md\`)** - the default commit target
- **Text (\`.txt\`)** - plain text without extension concerns
- **HTML (\`.html\`)** - standalone page for sharing a rendered snapshot

Download uses the browser file API - nothing is uploaded.

## Screenshots in export

Screenshots stay as HTTPS image URLs in the Markdown. GitHub and GitLab resolve them when the README renders. Host images wherever you already host assets (repo \`docs/\`, CDN, issue attachments).

## Filename

The download name follows your workspace project name. Rename the title block if you want a different file base name.

## Related

- [Editor guide](/docs/editor)
- [Keyboard shortcuts](/docs/shortcuts)
`;
