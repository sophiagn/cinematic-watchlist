# cinematic-watchlist

## Technologies

- React — frontend UI library for building the app's components and views.
- Vite — fast frontend build tooling and dev server for the React app.
- Supabase — hosted backend (authentication, database, and storage) for persisting watchlists and user data.

## Getting Started

Prerequisites: Node.js (recommended LTS, e.g., 18+). Then install dependencies and run the frontend from the `client/` folder.

Install dependencies (one-time):

```powershell
cd client
npm install
```

Run the development server (fast HMR):

```powershell
cd client
npm run dev
```

Run the linter (check code quality):

```powershell
cd client
npm run lint
# to auto-fix where possible:
npm run lint -- --fix
```

Build for production (type-check then bundle):

```powershell
cd client
npm run build
```

Preview the production build locally (serve `dist/`):

```powershell
cd client
npm run preview
```


The development server runs on a local port (Vite defaults to `http://localhost:5173`). Use the `preview` command after `build` to verify the production bundle locally.

## Repository layout (top-level)

This repository has a small top-level layout with the Vite React app inside the `client/` folder. Key top-level files/folders:

- `.gitignore` — repo-level ignore rules (covers `client/node_modules`, build `dist`, logs, editor files)
- `README.md` — project overview and docs
- `client/` — the frontend app scaffolded by Vite


## Project Structure (`client/`)

### Project Config

| File | Description |
|---|---|
| `package.json` | Defines the project name, dependencies (React, React DOM), dev dependencies (Vite, TypeScript, ESLint + plugins), and npm scripts: `dev`, `build`, `lint`, and `preview`. |
| `package-lock.json` | Auto-generated lockfile that pins the exact versions of every installed package for reproducible installs. |
| `vite.config.ts` | Vite configuration file. Loads the `@vitejs/plugin-react` plugin to enable JSX/TSX support and React Fast Refresh (HMR). |
| `tsconfig.json` | Root TypeScript config. References the two child configs below instead of setting compiler options directly. |
| `tsconfig.app.json` | TypeScript settings for the app source code (`src/`). Targets ES2023, enables strict mode, JSX with `react-jsx`, and bundler-style module resolution. |
| `tsconfig.node.json` | TypeScript settings for Node-side files (`vite.config.ts`). Uses Node types instead of DOM types. |
| `eslint.config.js` | ESLint flat-config. Sets up recommended JS rules, TypeScript-ESLint rules, React Hooks linting, and React Refresh linting. Ignores the `dist/` build folder. |
| `index.html` | The single HTML entry point. Contains a `<div id="root">` where React mounts and a `<script type="module">` tag that loads `src/main.tsx`. |

### `public/`

| File | Description |
|---|---|
| `favicon.svg` | The browser tab icon. |
| `icons.svg` | SVG sprite sheet referenced in `App.tsx` for documentation/community section icons. |

Files in `public/` are served as-is at the site root and are **not** processed by Vite's bundler.

### `src/`

| File / Folder | Purpose |
|---|---|
| `main.tsx` | App entry point. Imports global styles and mounts the React tree to `#root`. |
| `App.tsx` | Top-level app component / layout. Replace with your app's routing and pages. |
| `assets/` | Static assets (images, SVGs) imported by the app and optimized by Vite. |
| `components/` | Reusable UI components (buttons, lists, cards, etc.). |
| `pages/` | Page-level components or route targets (e.g., `Home`, `Watchlist`, `MovieDetail`). |
| `hooks/` | Custom React hooks (data fetching, form helpers, auth helpers). |
| `services/` | API clients and services (Supabase client, network wrappers, persistence). |
| `utils/` | Small utility functions and helpers used across the app. |
| `styles/` | Shared style files, design tokens, and global CSS modules. |

### `src/assets/`

| File | Description |
|---|---|
| `react.svg`, `vite.svg`, `hero.png` | Example assets from the Vite starter (logos, hero image). |

Files in `src/assets/` are processed by Vite — they get hashed filenames and optimized during builds.
