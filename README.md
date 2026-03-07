# Instagram GIF Library Prototype

React + TypeScript prototype for an Instagram-style GIF workflow where users can save GIFs into folders and reuse them in comment threads.

## Current Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Query for async state and optimistic mutations
- Zod for runtime response validation
- MSW for local API mocking in `api` mode
- Vitest + Testing Library for unit/integration coverage
- Playwright scaffolding for end-to-end coverage

## Architecture

- `src/features/feed`: feed rendering and feed query access
- `src/features/comments`: comment composer/thread UI, comment mutation logic
- `src/features/gif-library`: GIF search, foldered saved library, repository adapters, and library context
- `src/shared`: shared UI, environment helpers, query client, and toast state
- `src/mocks`: seeded data plus MSW handlers and in-memory mock API state

## Run

```bash
npm install
npm run dev
```

Default mode is `mock`.

To run against the HTTP-backed mock API layer instead:

```bash
VITE_DATA_MODE=api npm run dev
```

## Checks

```bash
npm run lint
npm test
npm run build
```

Playwright specs are included under `e2e/`. They are configured for `VITE_DATA_MODE=api`.
