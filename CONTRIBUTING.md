# Contributing to Readmade

Thanks for wanting to improve Readmade. This project is local-first and intentionally small, so focused changes are easiest to review.

## Getting started

```bash
git clone https://github.com/bilalmlkdev/readmade.git
cd readmade
npm install
npm run dev
```

## Before you open a PR

Run both checks and make sure they pass:

```bash
npm run lint
npm run build
```

## Guidelines

- Prefer small, single-purpose pull requests with a clear description.
- Keep files under 180 lines. Split large components into pieces.
- Put pure JavaScript logic in `.js` files, not inside `.jsx` components.
- Remove unnecessary comments. Add a short hint only when the intent is not obvious.
- Use simple hyphens (`-`) in copy and docs, not em dashes (`-`).
- Match the existing dark and light theme styles when touching UI.
- Do not commit secrets, keys, or personal data.

## Reporting bugs

Open an issue with:

1. What you expected and what happened.
2. Steps to reproduce.
3. Browser and OS if relevant.

## Feature requests

Open an issue first for anything substantial so scope can be agreed before a large PR.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
