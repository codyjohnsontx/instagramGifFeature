# Social GIF Prototype

Standalone React prototype for a social comment workflow where users can save GIFs from comment threads into a personal library and reuse them in other posts.

## Features

- Three mock posts with mixed text and GIF comments
- Save or remove GIFs from comment threads
- Global `My GIFs` library shared across every composer
- Local search across a seeded GIF catalog
- Comment composer with GIF preview and post flow
- `localStorage` persistence for saved GIFs
- Empty states, saved states, remove actions, toasts, and GIF load fallback

## How To Run

```bash
npm install
npm run dev
```

Optional test run:

```bash
npm test
```

## What’s Next

- Add folders or collections inside `My GIFs`
- Add sorting and recently used GIFs
- Extend reuse beyond comments into other surfaces
