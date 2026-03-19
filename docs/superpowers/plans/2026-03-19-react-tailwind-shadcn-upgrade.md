# React 19 + Tailwind 4 + shadcn New York Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade React 18→19, Tailwind CSS 3→4, and shadcn/ui default→new york style across the paranext-core monorepo.

**Architecture:** Three sequential phases — React first (no TW/shadcn dependency), then Tailwind (no shadcn dependency), then shadcn style. Each phase validates independently. Tailwind config stays in JS via `@config` bridge; pure CSS config is a separate optional follow-up.

**Tech Stack:** React 19, Tailwind CSS 4, shadcn/ui (new york), TypeScript, Vite, Webpack, Vitest

**Spec:** `docs/superpowers/specs/2026-03-19-react-tailwind-shadcn-upgrade-design.md`

---

## Task 0: Prototype Scoped Preflight for TW4 (Blocking)

This is a spike to determine if TW4's preflight can be scoped under `.pr-twp` without `tailwindcss-scoped-preflight`. Must be resolved before committing to the TW4 upgrade.

**Files:**

- Create: `lib/platform-bible-react/src/preflight-prototype.css` (throwaway)

- [ ] **Step 1: Install TW4 temporarily in an isolated test**

Create a minimal CSS file that attempts the three approaches from the spec:

```css
/* Approach 1: Native CSS nesting */
@layer base {
  .pr-twp {
    @import 'tailwindcss/preflight.css';
  }
}

/* Approach 2: If approach 1 fails, try split imports */
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
/* Then manually scope preflight rules under .pr-twp */

/* Approach 3: Copy preflight, wrap in .pr-twp {} */
```

Try each approach with `@tailwindcss/postcss` or `@tailwindcss/vite` and verify:

- Preflight styles apply ONLY within `.pr-twp` elements
- Styles outside `.pr-twp` are unaffected
- The approach works with both the Vite build (PBR) and Webpack build (extensions)

- [ ] **Step 2: Document the winning approach**

Update the spec's "Scoped Preflight" section with the validated approach. Delete the prototype file.

- [ ] **Step 3: Commit findings**

```bash
git add docs/superpowers/specs/2026-03-19-react-tailwind-shadcn-upgrade-design.md
git commit -m "docs: document validated scoped preflight approach for TW4"
```

---

## Task 1: Upgrade React Dependencies

**Files:**

- Modify: `package.json` (root)
- Modify: `lib/platform-bible-react/package.json`
- Modify: `extensions/package.json`

- [ ] **Step 1: Update root package.json**

```bash
npm install react@^19.0.0 react-dom@^19.0.0
npm install -D @types/react@^19.0.0 @types/react-dom@^19.0.0
```

- [ ] **Step 2: Remove deprecated packages from root**

```bash
npm uninstall react-test-renderer @types/react-test-renderer
```

- [ ] **Step 3: Update PBR peer dependencies**

In `lib/platform-bible-react/package.json`, change:

- `"react": ">=18.3.1"` → `"react": ">=19.0.0"`
- `"react-dom": ">=18.3.1"` → `"react-dom": ">=19.0.0"`

And devDependencies:

- `"@types/react": "^18.3.18"` → `"@types/react": "^19.0.0"`
- `"@types/react-dom": "^18.3.5"` → `"@types/react-dom": "^19.0.0"`

- [ ] **Step 4: Update extensions workspace types**

In `extensions/package.json`, change:

- `"@types/react": "^18.3.18"` → `"@types/react": "^19.0.0"`
- `"@types/react-dom": "^18.3.5"` → `"@types/react-dom": "^19.0.0"`

- [ ] **Step 5: Update eslint-plugin-react-hooks in both workspaces**

```bash
npm install -D eslint-plugin-react-hooks@^5.0.0
cd extensions && npm install -D eslint-plugin-react-hooks@^5.0.0 && cd ..
```

- [ ] **Step 6: Run npm install to resolve the dependency tree**

```bash
npm install
```

- [ ] **Step 7: Verify the build compiles**

```bash
npm run typecheck
```

Fix any type errors that arise from `@types/react` v19 changes. Common issues:

- `React.ReactNode` no longer includes `{}` — may affect generic components
- Some event handler types tightened

- [ ] **Step 8: Run tests**

```bash
npm test
```

Fix any failures.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: upgrade React 18 to 19

- react, react-dom → ^19.0.0
- @types/react, @types/react-dom → ^19.0.0
- Remove react-test-renderer and @types/react-test-renderer
- eslint-plugin-react-hooks → ^5.0.0
- Fix any type errors from React 19 type changes"
```

---

## Task 2: Remove forwardRef from Shadcn Components

React 19 passes `ref` as a regular prop. Remove `forwardRef` wrappers from the 28 shadcn components that use it.

**Files:**

- Modify: 28 files in `lib/platform-bible-react/src/components/shadcn-ui/*.tsx` that use `forwardRef`
- Skip: `button-group.tsx`, `skeleton.tsx`, `resizable.tsx`, `sonner.tsx` (no `forwardRef`)

- [ ] **Step 1: Understand the two patterns to convert**

**Pattern A** — Simple forwardRef (most components):

```tsx
// BEFORE
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return <button ref={ref} className={className} {...props} />;
});
Button.displayName = 'Button';

// AFTER
function Button({
  className,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return <button ref={ref} className={className} {...props} />;
}
```

**Pattern B** — forwardRef with Radix primitives:

```tsx
// BEFORE
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn('...', className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// AFTER
function DialogOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>>;
}) {
  return <DialogPrimitive.Overlay ref={ref} className={cn('...', className)} {...props} />;
}
```

Note: `React.ElementRef<T>` becomes `React.ComponentRef<T>` in the ref type. `displayName` is no longer needed for function declarations (the function name is used).

- [ ] **Step 2: Convert the 28 shadcn component files that use forwardRef**

Apply the patterns above to each file in `lib/platform-bible-react/src/components/shadcn-ui/`. For each file:

1. Remove the `React.forwardRef` wrapper
2. Convert to a function declaration or `function` expression
3. Add `ref` to the props type with `React.Ref<T>`
4. Remove the `displayName` assignment (function name handles it)
5. Preserve ALL custom code marked with comments — only change the forwardRef wrapping

Files to convert (all in `lib/platform-bible-react/src/components/shadcn-ui/`):
`alert.tsx`, `avatar.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `checkbox.tsx`, `command.tsx`, `context-menu.tsx`, `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `input.tsx`, `label.tsx`, `menubar.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `select.tsx`, `separator.tsx`, `sidebar.tsx`, `slider.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`, `toggle-group.tsx`, `toggle.tsx`, `tooltip.tsx`

Files to SKIP (no `forwardRef`): `button-group.tsx`, `skeleton.tsx`, `resizable.tsx`, `sonner.tsx`

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Fix any type errors. The most common issue will be mismatched ref types.

- [ ] **Step 4: Run tests**

```bash
npm test
```

- [ ] **Step 5: Build PBR and verify .d.ts output**

```bash
cd lib/platform-bible-react && npm run build
```

Check that the generated `.d.ts` bundle has correct type signatures for the converted components. The public API should not change — components should still accept `ref` props.

- [ ] **Step 6: Commit**

```bash
git add lib/platform-bible-react/src/components/shadcn-ui/
git commit -m "refactor: remove forwardRef from shadcn components for React 19

React 19 passes ref as a regular prop. Convert all 28 shadcn
components from forwardRef pattern to direct ref prop. No API
changes — components still accept ref."
```

---

## Task 3: Validate React 19 Phase

- [ ] **Step 1: Full build**

```bash
npm run build
```

- [ ] **Step 2: Full test suite**

```bash
npm test
```

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Fix any new lint errors from `eslint-plugin-react-hooks` v5.

- [ ] **Step 4: Storybook build**

```bash
cd lib/platform-bible-react && npm run storybook:build
```

If Storybook fails, check `@storybook/react-vite` and `@storybook/react-webpack5` compatibility with React 19 and upgrade if needed.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve React 19 lint and storybook issues"
```

---

## Task 4: Upgrade Tailwind Dependencies

**Files:**

- Modify: `lib/platform-bible-react/package.json`
- Modify: `extensions/package.json`
- Modify: `package.json` (root — for stylelint-config)

- [ ] **Step 1: Update PBR dependencies**

In `lib/platform-bible-react/`, run:

```bash
cd lib/platform-bible-react
npm install tailwindcss@^4.0.0 tailwind-merge@^3.0.0
npm install -D @tailwindcss/vite@^4.0.0 @tailwindcss/postcss@^4.0.0
npm uninstall autoprefixer tailwindcss-scoped-preflight @tailwindcss/container-queries
npm uninstall tailwindcss-animate
npm install tw-animate-css
```

Replace stylelint config:

```bash
npm uninstall stylelint-config-tailwindcss
npm install -D @dreamsicle.io/stylelint-config-tailwindcss
```

- [ ] **Step 2: Update extensions dependencies**

In `extensions/`, run:

```bash
cd extensions
npm install tailwindcss@^4.0.0
npm install -D @tailwindcss/postcss@^4.0.0
npm uninstall autoprefixer tailwindcss-animate
npm install tw-animate-css
npm uninstall stylelint-config-tailwindcss
npm install -D @dreamsicle.io/stylelint-config-tailwindcss
```

- [ ] **Step 3: Update root stylelint config if applicable**

Check if root `package.json` has `stylelint-config-tailwindcss`. If so:

```bash
npm uninstall stylelint-config-tailwindcss
npm install -D @dreamsicle.io/stylelint-config-tailwindcss
```

- [ ] **Step 3b: Update ALL 12 stylelint config files**

All stylelint configs reference `stylelint-config-tailwindcss/scss` in their `extends` array. Update to the new package name. Also add TW4 at-rules to `ignoreAtRules`.

Files to update:

- `.stylelintrc.js` (root)
- `lib/platform-bible-react/.stylelintrc.cjs`
- `extensions/.stylelintrc.cjs`
- `extensions/src/hello-rock3/.stylelintrc.js`
- `extensions/src/hello-someone/.stylelintrc.js`
- `extensions/src/legacy-comment-manager/.stylelintrc.js`
- `extensions/src/paratext-registration/.stylelintrc.js`
- `extensions/src/platform-get-resources/.stylelintrc.js`
- `extensions/src/platform-lexical-tools/.stylelintrc.js`
- `extensions/src/platform-scripture-editor/.stylelintrc.js`
- `extensions/src/platform-scripture/.stylelintrc.js`
- `extensions/src/quick-verse/.stylelintrc.js`

In each file:

1. Change `'stylelint-config-tailwindcss/scss'` → the equivalent from `@dreamsicle.io/stylelint-config-tailwindcss` (check their docs for the correct extends path)
2. Add TW4 at-rules to `ignoreAtRules`: `['tailwind', 'apply', 'layer', 'screen', 'variants', 'config', 'theme', 'plugin', 'source']`

- [ ] **Step 4: Run npm install at root to resolve tree**

```bash
npm install
```

- [ ] **Step 5: Commit dependency changes**

```bash
git add package.json package-lock.json lib/platform-bible-react/package.json extensions/package.json
git commit -m "feat: upgrade Tailwind CSS 3 to 4 dependencies

- tailwindcss → ^4.0.0
- Add @tailwindcss/vite, @tailwindcss/postcss
- tailwind-merge → ^3.0.0
- Remove autoprefixer (built into TW4)
- Replace tailwindcss-animate with tw-animate-css
- Remove tailwindcss-scoped-preflight (no TW4 support)
- Remove @tailwindcss/container-queries (built into TW4)
- Replace stylelint-config-tailwindcss with @dreamsicle.io version"
```

---

## Task 5: Update Tailwind and PostCSS Config Files

**Files:**

- Modify: `lib/platform-bible-react/tailwind.config.ts`
- Modify: `lib/platform-bible-react/postcss.config.js`
- Modify: `lib/platform-bible-react/src/index.css`
- Modify: `lib/platform-bible-react/vite.config.ts` (optionally add @tailwindcss/vite)
- Modify: `extensions/tailwind.config.ts`
- Modify: `extensions/postcss.config.ts`
- Modify: All 9 per-extension `tailwind.config.ts` files
- Modify: All 9 per-extension `postcss.config.ts` files
- Modify: All 9 per-extension `src/tailwind.css` entry files
- Modify: `.prettierrc.js` or equivalent

- [ ] **Step 1: Update PBR index.css — add TW4 imports**

Replace the top of `lib/platform-bible-react/src/index.css`:

```css
/* BEFORE */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* AFTER */
@import 'tailwindcss' prefix(tw);
@config './tailwind.config.ts';
```

Keep everything else in the file (the `@layer base` blocks with CSS variables, etc.) — those are custom CSS and stay.

- [ ] **Step 2: Update PBR tailwind.config.ts for TW4 compatibility**

In `lib/platform-bible-react/tailwind.config.ts`:

- Remove `prefix: 'tw-'` (now handled by CSS `prefix(tw)`)
- Remove the `content` array (TW4 auto-detects)
- Remove `containerQueries` from plugins (built into TW4)
- Remove `tailwindCssAnimate` from plugins
- Remove `scopedPreflightStyles` plugin and its import
- Replace scoped preflight with the approach validated in Task 0
- Keep `typography()` plugin for now (will be loaded via JS config)
- Keep all `theme.extend` entries (colors, borderRadius, keyframes, animation, typography)

- [ ] **Step 3: Update PBR postcss.config.js**

```js
// #region shared with template repos

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;

// #endregion
```

Or if using `@tailwindcss/vite` in `vite.config.ts`, delete `postcss.config.js` entirely and add the Vite plugin:

```ts
// In lib/platform-bible-react/vite.config.ts
import tailwindcss from '@tailwindcss/vite';
// Add to plugins array:
tailwindcss(),
```

- [ ] **Step 4: Update extensions/tailwind.config.ts**

Same changes as PBR:

- Remove `prefix: 'tw-'`
- Remove `content` array
- Remove `tailwindCssAnimate` plugin and import
- Keep `typography()` and all theme config

- [ ] **Step 5: Update extensions/postcss.config.ts**

```ts
// #region shared with template repos

const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;

// #endregion
```

- [ ] **Step 6: Update all 9 per-extension configs**

Each extension under `extensions/src/*/` has identical `tailwind.config.ts` and `postcss.config.ts`. Apply the same changes:

**postcss.config.ts** (all 9): Replace `tailwindcss: {}` and `autoprefixer: {}` with `'@tailwindcss/postcss': {}`.

**tailwind.config.ts** (all 9): Same as Step 4 — remove `prefix`, `content`, `tailwindCssAnimate`.

Extensions to update:

- `extensions/src/hello-rock3/`
- `extensions/src/hello-someone/`
- `extensions/src/legacy-comment-manager/`
- `extensions/src/paratext-registration/`
- `extensions/src/platform-get-resources/`
- `extensions/src/platform-lexical-tools/`
- `extensions/src/platform-scripture-editor/`
- `extensions/src/platform-scripture/`
- `extensions/src/quick-verse/`

- [ ] **Step 6b: Update all 9 per-extension CSS entry files**

Each extension has a `src/tailwind.css` file that starts with `@tailwind base/components/utilities`. These need the same TW4 import migration:

```css
/* BEFORE */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* AFTER */
@import 'tailwindcss' prefix(tw);
@config '../tailwind.config.ts';
```

The `@config` path is relative to the CSS file — verify the path resolves correctly for each extension (tailwind config is in the extension root, CSS is in `src/`).

Keep the rest of the CSS (theme variables, `@layer base` blocks) unchanged.

Files:

- `extensions/src/hello-rock3/src/tailwind.css`
- `extensions/src/hello-someone/src/tailwind.css`
- `extensions/src/legacy-comment-manager/src/tailwind.css`
- `extensions/src/paratext-registration/src/tailwind.css`
- `extensions/src/platform-get-resources/src/tailwind.css`
- `extensions/src/platform-lexical-tools/src/tailwind.css`
- `extensions/src/platform-scripture-editor/src/tailwind.css`
- `extensions/src/platform-scripture/src/tailwind.css`
- `extensions/src/quick-verse/src/tailwind.css`

- [ ] **Step 7: Update prettier config**

Find the Prettier config (likely `.prettierrc` or `prettier.config.*`) and add:

```json
{
  "tailwindStylesheet": "./lib/platform-bible-react/src/index.css"
}
```

- [ ] **Step 8: Commit config changes**

```bash
git add -A
git commit -m "feat: migrate Tailwind and PostCSS configs for TW4

- Replace @tailwind directives with @import 'tailwindcss' prefix(tw)
- Add @config bridge to keep tailwind.config.ts
- Update postcss configs to use @tailwindcss/postcss
- Remove prefix/content/built-in plugins from tailwind configs
- Implement scoped preflight for TW4
- Update all 9 per-extension configs
- Add tailwindStylesheet to prettier config"
```

---

## Task 6: Implement the cn() Backwards Compatibility Shim

**Files:**

- Modify: `lib/platform-bible-react/src/utils/shadcn-ui.util.ts`
- Create: `lib/platform-bible-react/src/utils/shadcn-ui.util.test.ts`

**Important pre-work:** Before writing the shim, verify `tailwind-merge` v3's behavior:

1. Check if `twMerge` v3 normalizes/reorders variant modifiers in its output (e.g., does it reorder `tw:hover:dark:X` → `tw:dark:hover:X`?). If so, the restoration map lookup will fail for reordered keys and the fallback path will be hit.
2. Verify that `twMerge` v3 considers `tw:mt-4` and `tw:-mt-4` as conflicting (same CSS property group).
3. Check the `extendTailwindMerge({ prefix: 'tw:' })` API in v3 — ensure it accepts the colon prefix syntax.

If `twMerge` normalizes output, the restoration map may need to normalize keys the same way, or use a secondary lookup strategy.

- [ ] **Step 1: Write the failing tests**

Create `lib/platform-bible-react/src/utils/shadcn-ui.util.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { cn } from './shadcn-ui.util';

describe('cn() backwards compatibility shim', () => {
  describe('basic dedup — last wins', () => {
    it('tw- wins over earlier tw:', () => {
      expect(cn('tw:p-4', 'tw-p-4')).toBe('tw-p-4');
    });
    it('tw: wins over earlier tw-', () => {
      expect(cn('tw-p-4', 'tw:p-4')).toBe('tw:p-4');
    });
    it('tw- wins via conditional object', () => {
      expect(cn({ 'tw:p-4': true }, 'tw-p-4')).toBe('tw-p-4');
    });
  });

  describe('variant reordering', () => {
    it('tw: hover wins over tw- hover', () => {
      expect(cn('hover:tw-bg-red-500', 'tw:hover:bg-red-500')).toBe('tw:hover:bg-red-500');
    });
    it('tw- hover wins over tw: hover', () => {
      expect(cn('tw:hover:bg-red-500', 'hover:tw-bg-red-500')).toBe('hover:tw-bg-red-500');
    });
  });

  describe('multi-variant', () => {
    it('handles dark:hover compound', () => {
      expect(cn('dark:hover:tw-bg-red-500', 'tw:dark:hover:bg-blue-500')).toBe(
        'tw:dark:hover:bg-blue-500',
      );
    });
  });

  describe('responsive variants', () => {
    it('tw: sm wins over tw- sm', () => {
      expect(cn('sm:tw-p-4', 'tw:sm:p-8')).toBe('tw:sm:p-8');
    });
    it('tw- sm wins over tw: sm', () => {
      expect(cn('tw:sm:p-8', 'sm:tw-p-4')).toBe('sm:tw-p-4');
    });
    it('handles md:lg compound', () => {
      expect(cn('md:lg:tw-flex', 'tw:md:lg:hidden')).toBe('tw:md:lg:hidden');
    });
  });

  describe('compound variants (group/peer)', () => {
    it('handles group-hover', () => {
      expect(cn('group-hover:tw-flex', 'tw:group-hover:hidden')).toBe('tw:group-hover:hidden');
    });
    it('handles peer-focus:group-hover compound', () => {
      expect(
        cn('peer-focus:group-hover:tw-text-red-500', 'tw:peer-focus:group-hover:text-blue-500'),
      ).toBe('tw:peer-focus:group-hover:text-blue-500');
    });
  });

  describe('negative form A (tw--X)', () => {
    it('tw: wins over tw-- form', () => {
      expect(cn('tw--mt-4', 'tw:-mt-4')).toBe('tw:-mt-4');
    });
    it('tw-- form wins over tw:', () => {
      expect(cn('tw:-mt-4', 'tw--mt-4')).toBe('tw--mt-4');
    });
  });

  describe('negative form B (-tw-X)', () => {
    it('tw: wins over -tw- form', () => {
      expect(cn('-tw-mt-4', 'tw:-mt-4')).toBe('tw:-mt-4');
    });
    it('-tw- form wins over tw:', () => {
      expect(cn('tw:-mt-4', '-tw-mt-4')).toBe('-tw-mt-4');
    });
  });

  describe('both TW3 negative forms compete', () => {
    it('-tw- wins over tw-- when last', () => {
      expect(cn('tw--mt-4', '-tw-mt-4')).toBe('-tw-mt-4');
    });
    it('tw-- wins over -tw- when last', () => {
      expect(cn('-tw-mt-4', 'tw--mt-4')).toBe('tw--mt-4');
    });
  });

  describe('negatives with variants', () => {
    it('tw: hover wins over tw-- hover', () => {
      expect(cn('hover:tw--mt-4', 'tw:hover:-mt-4')).toBe('tw:hover:-mt-4');
    });
    it('-tw- hover wins over tw: hover', () => {
      expect(cn('tw:hover:-mt-4', 'hover:-tw-mt-4')).toBe('hover:-tw-mt-4');
    });
  });

  describe('negative vs positive dedup', () => {
    it('negative wins over positive when last', () => {
      expect(cn('tw-mt-4', 'tw:-mt-4')).toBe('tw:-mt-4');
    });
    it('positive wins over negative when last', () => {
      expect(cn('tw:-mt-4', 'tw-mt-4')).toBe('tw-mt-4');
    });
  });

  describe('non-tw classes pass through', () => {
    it('preserves non-tw classes', () => {
      expect(cn('some-class', 'tw:p-4')).toBe('some-class tw:p-4');
    });
    it('preserves pr-twp and deduplicates tw classes', () => {
      expect(cn('pr-twp', 'tw-flex', 'tw:flex')).toBe('pr-twp tw:flex');
    });
  });

  describe('mixed prefixes — no conflict', () => {
    it('both survive when no conflict', () => {
      expect(cn('tw-p-4', 'tw:bg-red-500')).toBe('tw-p-4 tw:bg-red-500');
    });
  });

  describe('arbitrary values', () => {
    it('tw: wins with arbitrary pixel value', () => {
      expect(cn('tw-p-[12px]', 'tw:p-[16px]')).toBe('tw:p-[16px]');
    });
    it('tw- wins with arbitrary pixel value', () => {
      expect(cn('tw:p-[16px]', 'tw-p-[12px]')).toBe('tw-p-[12px]');
    });
  });

  describe('arbitrary properties (colons inside brackets)', () => {
    it('tw: wins with arbitrary property', () => {
      expect(cn('tw-[color:red]', 'tw:[color:blue]')).toBe('tw:[color:blue]');
    });
    it('tw- wins with arbitrary property', () => {
      expect(cn('tw:[color:blue]', 'tw-[color:red]')).toBe('tw-[color:red]');
    });
  });

  describe('existing cn() behavior preserved', () => {
    it('merges TW4-only classes normally', () => {
      expect(cn('tw:bg-primary', 'tw:bg-secondary')).toBe('tw:bg-secondary');
    });
    it('handles conditional objects', () => {
      expect(cn('tw:p-4', { 'tw:p-8': true, 'tw:m-2': false })).toBe('tw:p-8');
    });
    it('passes through non-tailwind classes', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
cd lib/platform-bible-react && npx vitest run src/utils/shadcn-ui.util.test.ts
```

Expected: Most tests fail because current `cn()` doesn't handle the `tw:` prefix format.

- [ ] **Step 3: Implement the normalization and restoration logic**

Update `lib/platform-bible-react/src/utils/shadcn-ui.util.ts`:

```ts
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMergeCustom = extendTailwindMerge({ prefix: 'tw:' });

/**
 * Detects which prefix format a class uses and returns normalization info.
 *
 * Handles:
 *
 * - TW4: `tw:flex`, `tw:hover:bg-red-500`, `tw:-mt-4`
 * - TW3: `tw-flex`, `hover:tw-bg-red-500`, `tw--mt-4`, `-tw-mt-4`
 * - Non-TW: `some-class`, `pr-twp` → returned unchanged
 */
type PrefixInfo = {
  /** The class normalized to tw: format for tailwind-merge */
  normalized: string;
  /** The original class as provided */
  original: string;
  /** Whether this class had a tw- or tw: prefix at all */
  isTw: boolean;
};

/**
 * Normalize a single class token from TW3 `tw-` format to TW4 `tw:` format.
 *
 * TW3 variants come before prefix: `hover:tw-bg-red-500` TW4 prefix is first variant:
 * `tw:hover:bg-red-500`
 *
 * TW3 negatives: `tw--mt-4` or `-tw-mt-4` TW4 negatives: `tw:-mt-4`
 */
function normalizeTw3ToTw4(token: string): PrefixInfo {
  // Already TW4 format: starts with `tw:`
  if (token.startsWith('tw:')) {
    return { normalized: token, original: token, isTw: true };
  }

  // TW3 negative form B: starts with `-tw-` (e.g., `-tw-mt-4`, `hover:-tw-mt-4`)
  // Need to find `-tw-` anywhere in the colon-separated segments
  const segments = splitClassSegments(token);
  const negFormBIndex = segments.findIndex((s) => s.startsWith('-tw-'));
  if (negFormBIndex !== -1) {
    const utility = segments[negFormBIndex].slice(4); // Remove `-tw-` → `mt-4`
    const variants = segments.filter((_, i) => i !== negFormBIndex);
    const normalized = `tw:${[...variants, `-${utility}`].join(':')}`;
    return { normalized, original: token, isTw: true };
  }

  // TW3 regular or negative form A: last segment starts with `tw-`
  // e.g., `tw-flex`, `hover:tw-bg-red-500`, `tw--mt-4`, `hover:tw--mt-4`
  const lastSegment = segments[segments.length - 1];
  if (lastSegment.startsWith('tw-')) {
    const utility = lastSegment.slice(3); // Remove `tw-` → `flex` or `-mt-4`
    const variants = segments.slice(0, -1);
    const normalized = `tw:${[...variants, utility].join(':')}`;
    return { normalized, original: token, isTw: true };
  }

  // Not a TW-prefixed class
  return { normalized: token, original: token, isTw: false };
}

/**
 * Restore a TW4 normalized class back to its original TW3 format.
 *
 * `tw:hover:bg-red-500` → `hover:tw-bg-red-500` `tw:-mt-4` → `tw--mt-4` (form A) or `-tw-mt-4`
 * (form B) depending on original
 */
function restoreToOriginalFormat(normalizedClass: string, originalFormat: string): string {
  // If original was already tw: format, return as-is
  if (originalFormat.startsWith('tw:')) {
    return normalizedClass;
  }

  // Parse the normalized tw: class
  const segments = splitClassSegments(normalizedClass);
  if (segments[0] !== 'tw') return normalizedClass;

  const variants = segments.slice(1, -1);
  const utility = segments[segments.length - 1];

  // Detect which TW3 negative format the original used
  const origSegments = splitClassSegments(originalFormat);
  const wasNegFormB = origSegments.some((s) => s.startsWith('-tw-'));

  if (wasNegFormB && utility.startsWith('-')) {
    // Restore to form B: `-tw-mt-4` or `hover:-tw-mt-4`
    const positiveUtility = utility.slice(1); // Remove leading `-`
    return [...variants, `-tw-${positiveUtility}`].join(':');
  }

  // Restore to regular TW3 or negative form A: `hover:tw-bg-red-500` or `tw--mt-4`
  return [...variants, `tw-${utility}`].join(':');
}

/**
 * Split a class into colon-separated segments, respecting brackets. `tw:hover:bg-[color:red]` →
 * `["tw", "hover", "bg-[color:red]"]` Colons inside `[...]` are not split points.
 */
function splitClassSegments(cls: string): string[] {
  const segments: string[] = [];
  let current = '';
  let bracketDepth = 0;

  for (let i = 0; i < cls.length; i++) {
    const char = cls[i];
    if (char === '[') bracketDepth++;
    else if (char === ']') bracketDepth--;

    if (char === ':' && bracketDepth === 0) {
      segments.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  segments.push(current);
  return segments;
}

/**
 * Tailwind and CSS class application helper function. Uses
 * [`clsx`](https://www.npmjs.com/package/clsx) to make it easy to apply classes conditionally using
 * object syntax, and uses [`tailwind-merge`](https://www.npmjs.com/package/tailwind-merge) to make
 * it easy to merge/overwrite Tailwind classes in a programmer-logic-friendly way.
 *
 * This function includes a backwards compatibility shim that normalizes TW3 `tw-` prefixed classes
 * to TW4 `tw:` format for deduplication, then restores the winning class to its original prefix
 * format. This allows extensions still using TW3 to interoperate with PBR's TW4 classes during the
 * transition period.
 *
 * @param inputs Class strings or `clsx` conditional class objects to merge
 * @returns Merged class string with proper deduplication across prefix formats
 */
export function cn(...inputs: ClassValue[]) {
  const resolved = clsx(inputs);
  if (!resolved) return resolved;

  const tokens = resolved.split(' ').filter(Boolean);

  // Track: normalizedForm → lastSeenOriginal
  const lastSeenOriginal = new Map<string, string>();
  const normalizedTokens: string[] = [];

  for (const token of tokens) {
    const info = normalizeTw3ToTw4(token);
    lastSeenOriginal.set(info.normalized, info.original);
    normalizedTokens.push(info.normalized);
  }

  // Run tailwind-merge on normalized (all tw:) classes
  const merged = twMergeCustom(normalizedTokens.join(' '));

  // Restore each surviving class to its original prefix format
  const mergedTokens = merged.split(' ').filter(Boolean);
  const restored = mergedTokens.map((mergedToken) => {
    const original = lastSeenOriginal.get(mergedToken);
    if (!original) return mergedToken; // shouldn't happen, but safe fallback
    return restoreToOriginalFormat(mergedToken, original);
  });

  return restored.join(' ');
}
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
cd lib/platform-bible-react && npx vitest run src/utils/shadcn-ui.util.test.ts
```

Expected: All tests pass. If some fail, debug and fix the normalization/restoration logic.

- [ ] **Step 5: Commit**

```bash
git add lib/platform-bible-react/src/utils/shadcn-ui.util.ts lib/platform-bible-react/src/utils/shadcn-ui.util.test.ts
git commit -m "feat: add tw-/tw: backwards compatibility shim to cn()

cn() now normalizes TW3 (tw-*) and TW4 (tw:*) prefixed classes
to a common format for tailwind-merge deduplication, then restores
the winning class to its original prefix format. This allows
extensions on TW3 to interoperate with PBR on TW4 during the
transition period.

Handles: variant reordering, negative values (both TW3 forms),
arbitrary values/properties, compound variants (group/peer),
responsive variants."
```

---

## Task 7: Rename tw- Classes to tw: Across the Codebase

This is the largest mechanical change. ~2,300+ occurrences across PBR, extensions, and root src/.

**Files:**

- Modify: All `.tsx`, `.ts`, `.css` files containing `tw-` class names

- [ ] **Step 1: Write and run the codemod script**

Create a temporary script `scripts/tw-prefix-codemod.ts` (or run inline) that:

1. Finds all `.tsx`, `.ts`, `.css`, `.scss` files in `lib/platform-bible-react/src/`, `extensions/src/`, `src/`
2. For each file, applies regex replacements:
   - In class strings/JSX attributes: convert `tw-` prefixed utilities to `tw:` format
   - Handle variant reordering: `hover:tw-X` → `tw:hover:X`
   - Handle negative form A: `tw--X` → `tw:-X`
   - Handle negative form B: `-tw-X` → `tw:-X`
3. Does NOT replace:
   - CSS custom properties: `--tw-*` (double dash prefix)
   - The `.pr-twp` class
   - Import/package references containing `tw-`
   - The string `tw-animate-css` (package name)

**Important:** This codemod is complex because Tailwind classes appear in:

- String literals: `'tw-flex tw-p-4'`
- Template literals: `` `tw-flex ${condition ? 'tw-p-4' : ''}` ``
- Object keys in `cn()`: `{ 'tw-border-blue-500': borderShouldBeBlue }`
- CVA variant strings
- CSS `@apply` directives: `@apply tw-font-sans;`
- Comments containing class examples (these SHOULD be updated)

The safest approach is a per-token replacement that:

1. Splits on whitespace (for class strings) or operates on individual `tw-` tokens
2. For each token starting with `tw-` (but not `--tw-`), converts to `tw:` format
3. For tokens like `hover:tw-bg-red-500`, reorders to `tw:hover:bg-red-500`
4. For tokens like `-tw-mt-4` or `tw--mt-4`, converts to `tw:-mt-4`

- [ ] **Step 1b: Dry-run the codemod and review output**

Run the codemod in dry-run mode (print changes without writing). Review the diff to verify:

- No CSS custom properties (`--tw-*`) are being rewritten
- No package names (`tw-animate-css`) are being rewritten
- No `.pr-twp` references are touched
- Variant reordering looks correct (e.g., `hover:tw-bg-red-500` → `tw:hover:bg-red-500`)
- Negative values are correct (`tw--mt-4` → `tw:-mt-4`, `-tw-mt-4` → `tw:-mt-4`)

If anything looks wrong, fix the codemod before applying.

- [ ] **Step 2: Update the CSS @apply directives**

In CSS/SCSS files, `@apply tw-font-sans` becomes `@apply tw:font-sans`. The codemod should handle these too.

- [ ] **Step 3: Update `index.css` @apply directives**

`lib/platform-bible-react/src/index.css` contains:

```css
@apply tw-border-border tw-outline-ring/50;
@apply tw-bg-background tw-text-foreground;
@apply tw-font-sans;
```

These become:

```css
@apply tw:border-border tw:outline-ring/50;
@apply tw:bg-background tw:text-foreground;
@apply tw:font-sans;
```

- [ ] **Step 4: Update documentation and comments**

The `cn()` JSDoc in `shadcn-ui.util.ts` has `tw-` class examples that should be updated to `tw:` format (or show both formats since the shim supports both).

- [ ] **Step 5: Verify with grep that no stale tw- class references remain**

```bash
# Should return only legitimate non-class uses (CSS vars, package names, pr-twp)
grep -rn 'tw-' lib/platform-bible-react/src/ extensions/src/ src/ \
  --include='*.tsx' --include='*.ts' --include='*.css' --include='*.scss' \
  | grep -v 'node_modules' \
  | grep -v '\-\-tw-' \
  | grep -v 'pr-twp' \
  | grep -v 'tw-animate-css' \
  | grep -v 'import.*tw-' \
  | grep -v '\.d\.ts'
```

Any remaining hits should be either false positives or items that intentionally keep `tw-` (like the cn() shim internals or backwards-compat docs).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rename all tw- classes to tw: for Tailwind 4

Codemod all ~2300 tw- class occurrences to tw: format:
- tw-flex → tw:flex
- hover:tw-bg-red-500 → tw:hover:bg-red-500
- tw--mt-4 → tw:-mt-4
- -tw-mt-4 → tw:-mt-4
- @apply tw-font-sans → @apply tw:font-sans

Preserves: CSS variables (--tw-*), pr-twp class, package names"
```

---

## Task 8: Validate Tailwind 4 Phase

- [ ] **Step 1: Full build**

```bash
npm run build
```

If build fails, the most likely issues are:

- PostCSS config not found or wrong plugin name
- `@config` bridge path incorrect
- Missing TW4 plugin equivalents
- CSS syntax not supported by TW4

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Full test suite**

```bash
npm test
```

- [ ] **Step 4: Lint**

```bash
npm run lint
```

Stylelint may complain about TW4 directives (`@import 'tailwindcss'`, `@config`, etc.) — the `@dreamsicle.io/stylelint-config-tailwindcss` package should handle these. If not, update stylelint config.

- [ ] **Step 5: Storybook build and visual check**

```bash
cd lib/platform-bible-react && npm run storybook:build
```

If it builds, run Storybook and visually spot-check a few components:

- Button renders correctly
- Dialog opens with proper overlay
- Colors and spacing look right
- No Tailwind preflight leaking outside `.pr-twp`

- [ ] **Step 6: Verify scoped preflight**

Open Storybook and check that:

- Elements inside `.pr-twp` have Tailwind's base reset (margins, borders, etc.)
- Elements outside `.pr-twp` are NOT affected by preflight

- [ ] **Step 6b: Verify `@apply tw:` syntax works**

Check that CSS files containing `@apply tw:font-sans`, `@apply tw:border-border`, etc. compile correctly. The colon in `tw:` may confuse CSS parsers. If `@apply` with `tw:` prefix doesn't work in TW4, investigate alternatives (e.g., using the full CSS property instead of `@apply`).

- [ ] **Step 6c: Verify `@senojs/rollup-plugin-style-inject` handles TW4 output**

PBR's CSS is injected at runtime via `styleInject({ insertAt: 'after-all' })`. If TW4 outputs CSS `@layer` declarations, verify:

- The injected styles still cascade correctly over extension styles
- PBR styles override extension styles as expected
- `@layer` ordering doesn't break the `insertAt: 'after-all'` strategy

Test by building PBR (`cd lib/platform-bible-react && npm run build`), inspecting the built CSS output for `@layer` usage, and verifying with a running app or Storybook.

- [ ] **Step 6d: Verify extensions build independently**

```bash
cd extensions && npm run build
```

Each extension has its own webpack config with `postcss-loader`. Verify that `css-loader` handles TW4's CSS output (which may include `@layer` rules and modern CSS features). If any extension fails, check its webpack config for `css-loader` options that may need updating.

- [ ] **Step 6e: Profile cn() performance**

The cn() shim adds overhead to every render. Run a quick benchmark:

```ts
// Temporary test: run 10,000 cn() calls and measure time
console.time('cn');
for (let i = 0; i < 10000; i++) cn('tw:p-4', 'tw-bg-red-500', 'hover:tw-text-white');
console.timeEnd('cn');
```

If the overhead is > 1ms for 10k calls, consider memoization or optimizing the hot path (e.g., skip normalization when no `tw-` classes are detected).

- [ ] **Step 7: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve Tailwind 4 build and lint issues"
```

---

## Task 9: Migrate shadcn Components to New York Style

**Files:**

- Modify: `lib/platform-bible-react/components.json`
- Modify: `lib/platform-bible-react/src/index.css` (CSS variables)
- Modify: shadcn component files that differ between default and new york styles

- [ ] **Step 1: Update components.json**

In `lib/platform-bible-react/components.json`:

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": "tw"
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components/shadcn-ui",
    "utils": "@/utils/shadcn-ui.util",
    "ui": "@/components/shadcn-ui"
  },
  "registries": {
    "@shadcn-editor": "https://shadcn-editor.vercel.app/r/{name}.json"
  }
}
```

- [ ] **Step 2: Update --radius CSS variable**

New york uses a slightly smaller default radius. In `lib/platform-bible-react/src/index.css`, update:

```css
/* In :root */
--radius: 0.5rem;
/* Change to new york default: */
--radius: 0.5rem; /* Keep at 0.5rem — new york default is also 0.5rem for slate */
```

Check the latest shadcn new york slate theme for the exact value and update if different.

- [ ] **Step 3: Diff each shadcn component against new york source**

For each shadcn component file in `lib/platform-bible-react/src/components/shadcn-ui/`:

1. Look up the latest shadcn/ui new york source for that component at https://ui.shadcn.com
2. Compare the styling classes (spacing, radius, sizing, shadows)
3. Apply only the style differences
4. **PRESERVE** all custom code marked with comments (e.g., `pr-twp` class additions, RTL support, custom logic)
5. **SKIP** `button-group.tsx` — it's a custom component, not stock shadcn

Key new york style differences to look for:

- `tw:rounded-md` → `tw:rounded-sm` in some components
- `tw:h-10` → `tw:h-9` for default button size
- `tw:px-4` → `tw:px-3` for more compact padding
- `[&_svg]:tw:size-4` → `[&_svg]:tw:size-3.5` for tighter icons
- Shadow changes: `tw:shadow-lg` → `tw:shadow-md` etc.

- [ ] **Step 4: Commit**

```bash
git add lib/platform-bible-react/components.json lib/platform-bible-react/src/
git commit -m "feat: migrate shadcn components to new york style

Update all stock shadcn components with new york style differences:
- More compact spacing and padding
- Tighter icon sizing
- Adjusted border radii
- Updated components.json to new-york style
- Preserved all custom code and pr-twp scoping"
```

---

## Task 10: Validate shadcn New York Phase

- [ ] **Step 1: Full build**

```bash
npm run build
```

- [ ] **Step 2: Typecheck**

```bash
npm run typecheck
```

- [ ] **Step 3: Full test suite**

```bash
npm test
```

- [ ] **Step 4: Storybook visual check**

```bash
cd lib/platform-bible-react && npm run storybook:build
```

Run Storybook and compare components against shadcn/ui new york reference:

- Buttons should be more compact
- Border radii should be tighter
- Icons should be smaller
- Overall feel should be more "dense" than before

- [ ] **Step 5: Verify PBR .d.ts output**

```bash
cd lib/platform-bible-react && npm run build
```

Verify the generated type declarations haven't changed their public API signatures.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve shadcn new york style issues"
```

---

## Task 11: Final Validation and Cleanup

- [ ] **Step 1: Clean full build from scratch**

```bash
rm -rf node_modules lib/platform-bible-react/node_modules extensions/node_modules
npm install
npm run build
```

- [ ] **Step 2: Full test suite**

```bash
npm test
```

- [ ] **Step 3: Full lint suite**

```bash
npm run lint
npm run format
```

- [ ] **Step 4: Delete any temporary files**

Remove any prototype files, codemod scripts, or temporary test files created during the upgrade.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: cleanup after React 19 + Tailwind 4 + shadcn new york upgrade"
```

---

## Task 12 (Optional, Separate Follow-Up): Migrate to Pure CSS Config

This can be done at any point after the TW4 upgrade is stable. It replaces the `@config './tailwind.config.ts'` bridge with native CSS `@theme` and `@plugin` directives.

**Files:**

- Modify: `lib/platform-bible-react/src/index.css`
- Modify: `lib/platform-bible-react/tailwind.config.ts` → **delete**
- Modify: `extensions/tailwind.config.ts` → **delete**
- Modify: All 9 per-extension `tailwind.config.ts` → **delete**

- [ ] **Step 1: Migrate PBR tailwind config to CSS**

Move all `theme.extend` entries from `tailwind.config.ts` into `@theme {}` blocks in `index.css`.
Move plugin references to `@plugin` directives.
Remove the `@config` directive.
Delete `tailwind.config.ts`.

- [ ] **Step 2: Migrate extension configs similarly**

- [ ] **Step 3: Validate build, tests, Storybook**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: migrate Tailwind config from JS to pure CSS

Replace @config bridge with native @theme and @plugin directives.
Delete all tailwind.config.ts files."
```
