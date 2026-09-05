# Game App - Agent Guidelines

## Project Configuration

- **Language**: TypeScript
- **Toolchain CLI**: Vite+ (`vp`)
- **Framework**: SvelteKit with Svelte 5
- **Runtime**: Cloudflare Workers
- **Database**: Drizzle ORM with libSQL
- **Testing**: Vitest + Playwright
- **Styling**: Tailwind CSS v4 + daisyUI v5

---

## Commands

### Development

```bash
vp run dev              # Start dev server
vp run build            # Production build
vp run preview          # Preview production build (wrangler dev)
```

### Type Checking

```bash
vp run check            # svelte-check (TS + Svelte types)
vp run check:watch      # Watch mode for type checking
```

### Linting & Formatting

```bash
vp run lint             # Oxfmt + Oxlint check
vp run format           # Auto-format with Oxfmt
```

### Testing

```bash
vp run test             # Run all tests (unit + e2e)
vp run test:unit        # Unit tests only (Vitest)
vp run test:e2e         # E2E tests only (Playwright)

# Run single test file
vp run test:unit -- src/routes/page.svelte.spec.ts

# Run single test (via vitest filter)
vp run test:unit -- --testNamePattern "should render"
```

### Database

```bash
vp run db:push          # Push schema to database
vp run db:generate      # Generate migrations
vp run db:migrate       # Run migrations
vp run db:studio        # Open Drizzle Studio
```

### Deployment

```bash
vp run deploy           # Deploy to Cloudflare
vp run cf-typegen       # Generate Cloudflare types
```

---

## Code Style

### Formatting (Oxfmt)

- **Use tabs** for indentation
- **Single quotes** for strings
- **No trailing commas**
- **Print width**: 100 characters

### Linting (Oxlint)

- Uses Oxlint through Vite+.
- Oxfmt handles formatting and Tailwind class sorting.

### Tailwind CSS

- Uses Tailwind CSS v4 via `@tailwindcss/vite`
- Import in `src/routes/layout.css`: `@import "tailwindcss"`
- Oxfmt sorts Tailwind classes using `src/routes/layout.css`.

### daisyUI

- Uses daisyUI v5 via `@plugin "daisyui"`
- Configured with system theme: `light` (default) and `dark` (auto via `prefers-color-scheme`)
- Use component classes: `btn`, `card`, `input`, `modal`, `dropdown`, etc.
- Example: `<button class="btn btn-primary">Click</button>`

---

## TypeScript Guidelines

- **Strict mode** enabled
- **Avoid `any`** - use `unknown` or proper typing
- **Enable `noUncheckedIndexedAccess`** for array access
- Use **type inference** when obvious; explicit types for:
  - Function parameters and return types
  - Public API surfaces
  - Complex union/intersection types

---

## Svelte 5 Patterns

### State Management (Runes)

```typescript
// Reactive state
let count = $state(0);

// Derived values
let doubled = $derived(count * 2);

// Effects
$effect(() => {
	console.log('Count changed:', count);
});

// Resources (for async)
let data = $resource(fetchData());
```

### Component Props

```typescript
let {
	name = 'default',
	count = $bindable()
}: {
	name?: string;
	count?: number;
} = $props();
```

### Event Handling

```svelte
<button onclick={() => count++}>Click</button>
```

---

## Naming Conventions

| Type               | Convention  | Example               |
| ------------------ | ----------- | --------------------- |
| Files (components) | kebab-case  | `my-component.svelte` |
| Files (utilities)  | kebab-case  | `auth-utils.ts`       |
| Functions          | camelCase   | `getUserData()`       |
| Classes/Types      | PascalCase  | `UserProfile`         |
| Constants          | UPPER_SNAKE | `MAX_RETRIES`         |
| CSS classes        | kebab-case  | `.my-class`           |

---

## Project Structure

```
src/
├── lib/
│   ├── server/        # Server-only code (DB, secrets)
│   └── shared/       # Shared utilities
├── routes/           # SvelteKit routes
│   ├── +page.svelte  # Page component
│   ├── +page.server.ts # Server load
│   └── api/          # API endpoints
├── app.d.ts          # TypeScript declarations
└── app.html          # HTML template
```

### Route Organization

- **Page components**: `+page.svelte`
- **Server load**: `+page.server.ts`
- **API endpoints**: `+server.ts` in route folders
- **Layouts**: `+layout.svelte`

---

## Error Handling

### SvelteKit Load Functions

```typescript
import { error } from '@sveltejs/kit';

export function load() {
	if (!data) {
		throw error(404, 'Not found');
	}
	return { data };
}
```

### Try/Catch Patterns

```typescript
async function fetchUser(id: string) {
	try {
		const user = await db.query.users.findFirst({ where: eq(users.id, id) });
		if (!user) throw error(404, 'User not found');
		return user;
	} catch (e) {
		console.error('Fetch failed:', e);
		throw error(500, 'Internal server error');
	}
}
```

---

## Testing Guidelines

### Unit Tests (Vitest)

- Located in `src/**/*.spec.ts` or `src/**/*.test.ts`
- Use `vitest-browser-svelte` for component testing
- Example:

```typescript
import { render } from 'vitest-browser-svelte';
import { describe, expect, it } from 'vitest';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render h1', async () => {
		render(Page);
		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});
});
```

### E2E Tests (Playwright)

- Run with: `vp run test:e2e`
- Configure browser in `playwright.config.ts`

---

## Database (Drizzle ORM)

### Schema Location

`src/lib/server/db/schema.ts`

### Common Patterns

```typescript
import { eq } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';

const user = await db.query.users.findFirst({
	where: eq(users.id, userId)
});
```

---

## Imports

### Order

1. Svelte/Kit imports
2. External libraries
3. Internal imports (`$lib/`, `$lib/server/`)
4. Relative imports

```typescript
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { formatDate } from '$lib/shared/date';
import './local.css';
```

---

## Svelte MCP Tools

You have access to Svelte MCP server for documentation. **Use these tools when working with Svelte code:**

### 1. list-sections

Use FIRST to discover documentation sections. Returns titles, use_cases, and paths.

### 2. get-documentation

Fetch full documentation for specific sections. After `list-sections`, call this for ALL relevant sections.

### 3. svelte-autofixer

Analyze Svelte code and fix issues. **Use this before presenting Svelte code to users.**

### 4. playground-link

Generate Svelte Playground link. Ask user first; never call after writing to project files.
