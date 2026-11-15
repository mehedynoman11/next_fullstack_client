<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Greenfield Next.js app (marketing shell + better-auth/MongoDB auth). `README.md` is untouched `create-next-app` boilerplate — trust `package.json`, `next.config.ts`, and `biome.json` over it.

## Stack quirks
- Next.js 16.4.6 App Router on Turbopack, React 19.3, TypeScript `strict`, Tailwind v4.
- Tailwind is CSS-first: no `tailwind.config.*` and no PostCSS file. Theme tokens live in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, oklch vars). `next.config.ts` wires Tailwind through a Turbopack CSS rule and enables React Compiler.
- UI components are shadcn `base-nova` built on `@base-ui/react`, **not** Radix — don't reach for `@radix-ui/*`.
- `cn` is the `cn` npm package (compiled clsx + tailwind-merge). There is **no** `src/lib/utils.ts`; every `src/components/ui/*` file does `import { cn } from "cn"`. Keep that import style when adding components.
- `layout.tsx` uses Next 16's generated `LayoutProps<"/">` / `PageProps` globals — no import needed.
- Shiki is lazy-loaded: a language only highlights if it is registered in the `languages` map (and optionally `aliases`) in `src/lib/highlighter.tsx`; anything else silently returns `null`.

## Commands
- npm only (`package-lock.json` is the sole lockfile): `npm run dev`, `npm run build`, `npm start`.
- `npm run lint` is `biome check` — lint + format + import order, read-only, exits 1 on mere formatting diffs. Fix scoped files with `npx biome check --write <paths>`.
- No test runner, no CI workflows, and no `typecheck` script. Use `npx tsc --noEmit` to typecheck (clean at time of writing).
- **Lint baseline is already red** (~144 errors / 36 warnings, dominated by `useImportType` in generated `src/components/ui/*`). Do not run `npm run format` or blanket `--write` across the repo — it rewrites all generated components and buries your diff. Fix only files you touched.

## Env / build gotcha
- `src/lib/auth.ts` builds `new MongoClient(process.env.MONGODB_URL)` at module scope, so **`npm run build` currently fails** while collecting `/api/auth/[...all]` data: `MONGODB_URL` is undefined.
- `.env` only defines `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL` (and is gitignored). `MONGODB_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` must be supplied before a build/runtime failure means "code regression".
- `npm run dev` re-injects the nextjs block above; commit it rather than deleting it from diffs.

## Layout
- `src/app` — App Router pages/route handlers; auth is one catch-all route (`api/auth/[...all]/route.ts`).
- `src/components` — hand-written components (PascalCase, e.g. `Navbar.tsx`, `Hero.tsx`; interactive ones need `'use client'`).
- `src/components/ui` — shadcn-generated primitives (kebab-case). Prefer regeneration over hand-editing.
- `src/lib` — `auth.ts` (server, DB name hardcoded to `next_fullstack_client`), `auth-client.ts` (client hooks), `highlighter.tsx`; `src/hooks`, `src/assets`.
- Import alias `@/*` → `src/*`. Pages are built from `src/app/page.tsx` → `Hero` + `Navbar` in `src/app/layout.tsx`.
