export const editor = `# Editor Guide

The editor has three regions: the block palette on the left, your document in the middle, and the live preview on the right.

## Workspace layout

| Region | Purpose |
| --- | --- |
| Block palette | Add new sections to the document |
| Block list | Edit, reorder, duplicate, and remove sections |
| Preview panel | GitHub-style preview or raw Markdown source |
| Header bar | Workspace name, history, export, and account |

On narrower screens the palette and preview collapse so the block list can use the full width.

## Opening a workspace

Enter any email address to open a browser-local workspace. There is no sign-up flow. The address is only used as a display name - it is never sent to a server.

## The block palette

The left sidebar lists every block type. Click an icon to append that block to your document. Use the search popup when you know the name of the block you want.

The palette can be minimized so the block list gets more room. Your minimize choice is remembered.

## Editing blocks

- Click a block header to expand it
- Fill in the fields for that block type
- The preview updates as you type
- Use inline editing for quick text changes, or open the full block editor for larger fields

## Arranging sections

- Drag the handle on a block to move it
- Use the move actions in the block settings for keyboard-friendly reordering
- Duplicate a block when you need a similar section with different content
- Delete removes the block from the document

Order matters for readers. A common flow is:

1. Title and badges
2. Description and features
3. Installation and usage
4. Screenshots and API
5. Contributing and license

## Block settings

Each block can expose settings such as code language, package manager, or badge layout. Open the settings panel on a selected block to change them.

## History

Readmade keeps up to 8 autosaved snapshots in browser storage. Open the history gallery to restore an older state or clear history entirely.

## Onboarding tour

The first time you open the editor, a short tour highlights the palette, the block list, and the preview. You can dismiss it at any time - it will not show again.

## Reset

Reset clears the current document back to the default starter blocks. A confirmation dialog prevents accidental wipes.

## Related pages

- [Block types](/docs/blocks)
- [Preview and export](/docs/preview-export)
- [Keyboard shortcuts](/docs/shortcuts)
`;
