# Copilot Instructions for DealSite (Next.js T3 Stack Migration)

This document provides context and guidelines for AI coding assistants working on the DealSite project.

## Project Overview

OpenDealSite is a community-driven deal site platform. It lists deals, allows searching, and highlights hot deals based on community engagement.

## key Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State/Data**: React Server Components (RSC) for data fetching, Standard React Hooks for client interactivity.
- **Config**: Application configuration is centralized in `config.default.json` and overrides via `src/env.js` or environment variables.

## Architecture & Structure

### Folder Structure
- `src/app/[country]/`: All pages are localized under a dynamic country route segment.
  - `page.tsx`: The main feed (Home).
  - `layout.tsx`: Country-specific layout (if needed) or root layout usage.
  - `loading.tsx`: Suspense loading states.
- `src/components/`: Reusable UI components.
  - `DealCard.tsx`: The primary display component for a deal.
  - `Header.tsx`, `Sidebar.tsx`: Navigation and layout shell.
- `src/lib/`: Utilities and API layers.
  - `api.ts`: server-side data fetching tailored for Next.js (using `fetch` with `next: { revalidate: ... }`).
  - `constants.ts`: App-wide constants sourced from config.
  - `utils.ts`: Helper functions (formatting, etc.).

### Routing & Middleware
- **Country Support**: The site is multi-regional. The proxy (`src/proxy.ts`) automatically detects the user's country (via `cf-ipcountry` header) and redirects root traffic `/` to `/[country]`.
- **Query Params**:
  - Search: `/[country]?q=keyword`
  - Hot Deals: `/[country]?hottest=24` (hours)

### Data Fetching
- **Server Components**: Prefer fetching data directly in Server Components using `src/lib/api.ts`.
- **Caching**: Use Next.js native fetch caching. 10-minute default TTL (Time-To-Live).
- **Client Components**: Use standard `useEffect` or React Query (if added later) for user-interactive data refetching, but prefer initializing state from Server Component props.

## Coding Standards

1. **Config Driven**: Do not hardcode feature flags or branding. properties. Use `src/lib/constants.ts` or `config.default.json`.
2. **Types**: Strictly reuse interfaces from `src/types.ts`.
3. **Links**: Use `next/link` for internal navigation. All internal links must include the current `params.country` prefix.
4. **Tailwind**: Use utility classes. Avoid custom CSS files unless necessary.
5. **Open Source Friendly**: Keep code modular. Avoid vendor lock-in where possible. Allow easy overriding of components.

## Future Instructions for AI

When generating code:
- Check `src/lib/constants.ts` first for configuration.
- Ensure all pages interpret `params.country`.
- Remember to handle "Not Found" or "Error" states gracefully.
