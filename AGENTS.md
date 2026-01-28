# Agent Guidelines: OpenDealSite

This document provides essential information for AI agents working on the OpenDealSite repository. Adhere to these standards to ensure consistency, quality, and maintainability.

## 🛠 Build, Lint, and Test Commands

The project uses `npm` as the package manager.

- **Build:** `npm run build` - Compiles the Next.js application.
- **Development:** `npm run dev` - Starts development server with Turbopack.
- **Linting:**
  - `npm run lint`: Runs ESLint for the project.
  - `npm run lint:fix`: Runs ESLint and attempts to fix issues.
  - `npm run check`: Runs both `next lint` and `tsc --noEmit`.
- **Type Checking:** `npm run typecheck` (or `tsc --noEmit`).
- **Formatting:**
  - `npm run format:check`: Verifies code formatting with Prettier.
  - `npm run format:write`: Fixes code formatting with Prettier.
- **Testing:**
  - _Note: No formal test suite is currently configured in `package.json`._
  - When adding tests, prefer standard Next.js testing patterns (e.g., Vitest or Jest) and ensure they are added to the `scripts` section.
  - To run a single test (once configured): `npm test -- <path-to-file>` or use the specific runner's CLI.

## 📐 Code Style & Conventions

### 1. Architecture & Framework

- **Framework:** Next.js 16+ (App Router).
- **Paradigm:** Prefer **React Server Components (RSC)** for data fetching. Use Client Components (`"use client"`) only for user interactivity or when using React Hooks.
- **Localization:** All pages are localized under `src/app/[country]/`. Always respect the dynamic `country` route segment.
- **Proxy:** `src/proxy.ts` handles root redirects to detected countries (via `cf-ipcountry`).

### 2. Folder Structure

- `src/app/[country]/`: Main application logic.
  - `deal/[slug]/[id]/page.tsx`: Detail page with SEO-friendly slug.
- `src/components/`: Modular UI components.
  - `ads/`: Sidebar and content advertisements.
  - `custom/`: Site-specific UI overrides.
- `src/lib/`: Core logic and utilities.
  - `api.ts`: Centralized data fetching wrapper.
  - `link/`: Affiliate service logic.
- `src/styles/`: Global styles (Tailwind CSS 4).

### 3. Imports & Naming

- **Path Aliases:** Use the `@/` prefix for absolute imports from the `src` directory (e.g., `import { api } from "@/lib/api"`).
- **Naming:**
  - Components: PascalCase (e.g., `DealCard.tsx`).
  - Functions/Variables: camelCase.
  - Constants: UPPER_SNAKE_CASE.
  - Files: Match the primary export (PascalCase for components, camelCase for utilities).

### 4. TypeScript & Types

- **Strict Typing:** Avoid `any`. Use TypeScript's strict mode.
- **Shared Types:** Centralize and reuse interfaces in `src/types.ts`.
- **Zod:** Use Zod for environment variable validation (see `src/env.js`) and schema-based data validation.

### 5. Configuration System

- **Centralized Config:** Use `src/lib/constants.ts` to access configuration.
- **Analytics:** GTM is supported via `GTM_ID` in config or `NEXT_PUBLIC_GTM_ID` env var. It is optional.
- **Dynamic Overrides:**
  - The project supports `APP_CONFIG_FILE` environment variable.
  - Custom JSON configs are **deeply merged** into `config.default.json`.
  - Priority: Env Vars > `APP_CONFIG_FILE` > `config.default.json`.
- **Logic:** Merging happens server-side in `src/lib/constants.ts`.

### 6. Styling

- **Tailwind CSS 4:** Use utility classes exclusively. Avoid custom CSS files or modules unless strictly necessary.
- **Theme Colors:** Use CSS variables injected in `src/app/layout.tsx` from `THEME_CONFIG.COLORS`.

### 7. Data Fetching & Error Handling

- **API Wrapper:** Use the centralized `api` object in `src/lib/api.ts`.
- **Affiliate Processing:** The `api` wrapper automatically processes `origDealLink` via `LinkService.ts`.
- **Caching:** Leverage Next.js native `fetch` caching with `revalidate` and `tags` (default TTL: 300s).
- **Error Handling:** Handle "Not Found" or "Error" states gracefully at the page or component level using Next.js `loading.tsx` and `error.tsx` conventions.

### 8. Links & Navigation

- **Internal Links:** Use `next/link`.
- **Regional Awareness:** All internal paths must include the current `params.country` prefix.
- **Affiliate Links:** Process all external deal links through `src/lib/link/LinkService.ts` via `getAffiliateLink`.

## 🤖 Future Instructions for Agents

- Always check `src/lib/constants.ts` before implementing new features.
- Ensure all new pages interpret and pass down `params.country`.
- Maintain the "Open Source Friendly" philosophy: keep components modular and easy to override.
- Log startup configuration to console for debugging environment-specific issues.
- When adding new affiliate providers, extend logic in `src/lib/link/`.
