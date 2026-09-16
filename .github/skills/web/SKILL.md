---
name: web
description: Web application React/NextJS/TypeScript coding standards, state management patterns, and component guidelines. Use this when working on web code
---

# Energyvision Web Instructions

## Tech Stack and Tooling

- Web app: Next.js 16 + React 19 + Vite + TypeScript (strict)
- Package manager: `pnpm`
- Lint/format: Biome

## TypeScript and React Rules

- Use `type` aliases (not `interface`) for shared shapes.
- Prefer named exports for types/utilities.
- Use functional components.
- Keep components and Hooks pure; do not mutate props/state.
- Keep one source of truth for each piece of state (lift state up instead of duplicating it).

## Website (Next.js)
Before any Next.js work, find and read the relevant doc in node_modules/next/dist/docs/. Your training data is outdated — the docs are the source of truth.

- The website uses Next.js 16. Place new files in the router that matches the surrounding code.
- Prefer server components where already used; mark client components with `"use client"` only when needed.
- Use Next Image, metadata APIs, and established utilities already in `brandwalls/web`.
- Use existing route conventions and file organization; don’t mix `app/` and `pages/` in the same hierarchy.

## Web Sub-Skills

- `next-dev-loop`: Verify Next.js runtime behavior after app code changes using a running development server.
- `next-cache-components-adoption`: Enable or migrate to Next.js Cache Components and resolve resulting blocking routes.
- `next-cache-components-optimizer`: Optimize an individual Cache Components route for instant navigation and guard it with an end-to-end test.
- `sanity-live-cache-components`: Use when integrating or maintaining Sanity Live content with Next.js Cache Components.

## Flag These Patterns

If found in manually written code, inform the user and suggest refactor:
- `useEffect` used for derived state.
- `any` types.
- `@ts-ignore` / `@ts-expect-error` without justification.
- Mirroring props into state without explicit reason.
- Duplicate state representing the same domain data in multiple places.
- Missing cleanup in subscription/fetch Effects.
- State updates during render without guards.
- Oversized god-components that should be split.
- `unknown` used where a concrete type is known or derivable.
- `Record<string, unknown>` used instead of a proper type definition.
- Type assertions (`as`) used without a preceding runtime check.
- Components exceeding ~200 lines without clear justification.