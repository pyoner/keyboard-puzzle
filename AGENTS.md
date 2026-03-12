# Keyboard Puzzle Monorepo

## Overview

This is a monorepo using bun workspaces.

## Structure

```
apps/*      # Applications
packages/*  # Shared packages (if any)
```

## Package Manager

**bun** - All commands use `bun run <script>`

## Main Application

The primary application is in `apps/game/`:

- **Framework**: SvelteKit with Svelte 5
- **Runtime**: Cloudflare Workers
- **Database**: Drizzle ORM with libSQL
- **Testing**: Vitest + Playwright
- **Styling**: Tailwind CSS v4

For detailed configuration, testing commands, and code style guidelines, see [apps/game/AGENTS.md](./apps/game/AGENTS.md).

## Quick Commands (apps/game)

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run check` | TypeScript check |
| `bun run lint` | Lint + format check |
| `bun run format` | Auto-format |
| `bun run test` | Run all tests |
| `bun run test:unit` | Unit tests only |
| `bun run test:e2e` | E2E tests only |
