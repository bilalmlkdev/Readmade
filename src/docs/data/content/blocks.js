export const blocks = `# Block Reference

Every README section in Readmade is a block. There are 11 types. Add them from the palette, edit them in place, and reorder them freely.

## Title

The project heading. Includes the project name and a one-line tagline.

| Field | Description |
| --- | --- |
| Name | Repository or package name |
| Tagline | Short promise of what the project does |

## Badges

Status shields for build, version, license, downloads, and more. Point each badge at a shields.io image (or any badge URL) and optionally a link target.

## Description

A short overview paragraph. Explain the problem, the audience, and what makes the project different.

## Features

A bullet list of highlights. Keep items short and concrete - what it does, not marketing fluff.

## Installation

Package-manager install steps.

| Field | Description |
| --- | --- |
| Manager | npm, yarn, pnpm, cargo, pip, go, etc. |
| Package | Package or repository name |
| Extra | Optional extra install lines |

## Usage

A code example with a language label. The preview and Code tab both highlight it.

| Field | Description |
| --- | --- |
| Language | js, ts, bash, python, go, ... |
| Code | The example source |

## Screenshots

Images linked by HTTPS URL.

| Field | Description |
| --- | --- |
| URL | Direct image URL |
| Alt | Accessibility text |
| Caption | Optional figure caption |

Images are never uploaded - the exported Markdown contains ordinary image URLs.

## API

A method or endpoint reference table.

| Field | Description |
| --- | --- |
| Name | Function, method, or route |
| Description | What it does |
| Params / options | Arguments or parameters |

## Contributing

Guidance for pull requests. Includes free text plus an ordered list of steps (fork, branch, commit, push, open PR).

## License

License type, year, and author. Renders as a short License section at the bottom of the README.

## Custom

Freeform Markdown. Write any headings, lists, tables, or code the structured blocks do not cover.

\`\`\`markdown
## Changelog

- 1.0.0 - first release
- 0.9.0 - public beta
\`\`\`

## Tips

- Prefer structured blocks so the preview stays consistent
- Use Custom only for sections that do not fit the others
- Reorder before you polish - structure first, wording second
`;
