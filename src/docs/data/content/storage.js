export const storage = `# Storage & Privacy

Readmade is local-first. Your document never leaves the browser unless you export it yourself.

## No account required

You open a workspace with an email address for display only. There is no sign-up, password, or verification email. The address is stored locally and never sent to a backend.

## What is stored locally

| Key | Purpose |
| --- | --- |
| \`readmade:blocks\` | Current document blocks |
| \`readmade:history\` | Up to 8 autosaved snapshots |
| \`readmade:theme\` | Light or dark theme preference |
| \`readmade:paletteMinimized\` | Palette UI state |
| \`readmade:onboarded\` | Whether the tour was seen |
| \`readmade_browser_id\` | Anonymous local workspace id |
| \`readmade_user_name\` | Display name for the workspace |

All of these use \`localStorage\` under the \`readmade\` namespace.

## What is not stored

- No server-side copy of your README
- No analytics payload of document content
- No uploaded screenshots - images are referenced by URL only
- No passwords or secrets (do not put secrets in a public README anyway)

## Screenshots and images

The Screenshots block stores the URL you provide. Export contains that same URL. Host images in your repo or on any HTTPS host you trust.

## Clearing data

Local data is removed when you:

- Clear browser storage for the site
- Use reset / clear history in the app (for those keys)
- Log out of the workspace (display name and id)

Clearing site data removes everything under the \`readmade\` namespace.

## Export ownership

When you download or copy the Markdown, the file is yours. Commit it to git, paste it in a gist, or edit it elsewhere - Readmade does not lock content inside a platform.

## Related

- [Security policy](/docs/security)
- [Architecture](/docs/architecture)
`;
