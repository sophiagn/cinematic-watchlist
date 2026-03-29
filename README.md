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

- `.vscode` — contains extension recommendations for VS Code
- `.gitignore` — repo-level ignore rules (covers `client/node_modules`, build `dist`, logs, editor files, Supabase temp files)
- `README.md` — project overview and docs
- `client/` — the frontend app scaffolded by Vite
- `supabase/` — Supabase CLI project config (local dev, Edge Functions, migrations)


## Project Structure (`client/`)

### Project Config

| File | Description |
|---|---|
| `package.json` | Defines the project name, dependencies (React, React DOM, React Router, dnd-kit, Supabase JS), dev dependencies (Vite, TypeScript, ESLint + plugins), and npm scripts: `dev`, `build`, `lint`, and `preview`. |
| `package-lock.json` | Auto-generated lockfile that pins the exact versions of every installed package for reproducible installs. |
| `.env` | Local environment variables (not committed). Must define `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLIC_KEY`. |
| `.env.example` | Template showing which env vars are required — copy to `.env` and fill in your Supabase credentials. |
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
| `main.tsx` | App entry point. Imports `global.css`, mounts the React tree inside `<StrictMode>` to `#root`. |
| `App.tsx` | Root app component. Sets up `<BrowserRouter>` and `<Routes>` — all page routes are registered here. |
| `assets/` | Files in here are processed by Vite — they get hashed filenames and optimized during builds. |
| `pages/` | Page-level route components (one file per route). |
| `components/` | Reusable UI components (buttons, cards, lists, modals, etc.). |
| `hooks/` | Custom React hooks (data fetching, form helpers, auth state, etc.). |
| `services/` | API clients and external service wrappers (Supabase client, etc.). |
| `styles/` | Shared/global CSS files and design tokens. |
| `assets/` | Static assets (images, SVGs) imported in code and optimized by Vite at build time. |
| `utils/` | Small utility/helper functions used across the app. |



## Project Structure (`supabase/`)

Created by `supabase init` (the [Supabase CLI](https://supabase.com/docs/guides/local-development/cli)). This folder is used for local development, database migrations, and Supabase Edge Functions.

| File / Folder | Description |
|---|---|
| `config.toml` | Supabase CLI configuration — project ID, local ports for the API/database/auth, storage settings, and feature flags. Used when running `supabase start` for local development. |
| `.env` | Local environment variables for Edge Functions (e.g., `SUPABASE_URL`, `SERVICE_ROLE_KEY`). Git-ignored. |
| `.temp/` | Temporary files generated by the CLI (git-ignored). |
| `functions/` | Supabase Edge Functions — serverless TypeScript functions that run on Deno at the edge. |

### `functions/_shared/`

Shared helper modules imported by Edge Functions. Not deployed as a standalone function.

| File | Description |
|---|---|
| `supabaseAdmin.ts` | Exports `getSupabaseAdmin()` (creates the admin client) and `getCallerFromRequest(req)` (verifies the JWT and returns the authenticated user). |

### `functions/deleteUser/`

Edge Function that deletes the currently authenticated user's account.

| File | Description |
|---|---|
| `index.ts` | Verifies the caller's JWT via `getCallerFromRequest`, then deletes their account using the admin API. Returns `{ deleted: true/false }`. |
| `deno.json` | Deno configuration for this function (import maps, permissions). |
| `.npmrc` | npm registry configuration (currently just comments — safe to commit). |
