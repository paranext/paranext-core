# React 19 + Tailwind 4 + shadcn New York Upgrade

## Overview

Upgrade the three core UI dependencies in `paranext-core`:

- **React** 18.3 → 19.x
- **Tailwind CSS** 3.4 → 4.x
- **shadcn/ui** default style → new york style

These upgrades affect `lib/platform-bible-react` (PBR), the root app, all core extensions, and downstream extension templates.

## Approach: Sequential Phases

Upgrade in dependency order, validating after each phase. This allows isolating breakage to the responsible upgrade.

---

## Phase 1: React 18 → 19

### Dependency Changes

| Package                      | Current  | Target     | Location           |
| ---------------------------- | -------- | ---------- | ------------------ |
| `react`                      | ^18.3.1  | ^19.0.0    | root, pbr peer dep |
| `react-dom`                  | ^18.3.1  | ^19.0.0    | root, pbr peer dep |
| `@types/react`               | ^18.3.18 | ^19.0.0    | root, pbr          |
| `@types/react-dom`           | ^18.3.5  | ^19.0.0    | root, pbr          |
| `react-test-renderer`        | ^18.3.1  | **remove** | root               |
| `@types/react-test-renderer` | ^18.3.1  | **remove** | root               |
| `eslint-plugin-react-hooks`  | ^4.6.2   | ^5.0.0     | root               |

### Code Changes

1. **`forwardRef` removal in shadcn components** — React 19 passes `ref` as a regular prop. All 112 `React.forwardRef` calls in `lib/platform-bible-react/src/components/shadcn-ui/` can be simplified to take `ref` directly in props. This is optional but recommended since we're touching these components in Phase 3 anyway.

2. **Type updates** — `React.ElementRef<T>` and `React.ComponentPropsWithoutRef<T>` patterns (140 occurrences in shadcn-ui) can be simplified. These still work in React 19 but are no longer necessary with the `forwardRef` removal.

3. **`react-refresh`** — Verify ^0.14.2 compatibility with React 19.

4. **`@pmmmwh/react-refresh-webpack-plugin`** — Verify compatibility.

5. **`eslint-plugin-react-hooks` v5** — New rules may flag existing code. Fix as needed.

6. **Lexical** — `@lexical/react` ~0.41.0 has been React 19 compatible since v0.17+. No changes expected.

### Validation

- `npm run build` succeeds
- `npm run typecheck` passes
- `npm test` passes
- Storybook builds and renders

---

## Phase 2: Tailwind 3 → 4

### Dependency Changes

| Package                          | Current  | Target      | Location              | Notes                                             |
| -------------------------------- | -------- | ----------- | --------------------- | ------------------------------------------------- |
| `tailwindcss`                    | ^3.4.17  | ^4.0.0      | pbr, extensions       |                                                   |
| `@tailwindcss/postcss`           | _new_    | ^4.0.0      | extensions            | Replaces `tailwindcss` in postcss config          |
| `@tailwindcss/vite`              | _new_    | ^4.0.0      | pbr                   | For Vite build                                    |
| `autoprefixer`                   | ^10.4.20 | **remove**  | pbr, extensions       | Built into TW4 via Lightning CSS                  |
| `tailwindcss-animate`            | ^1.0.7   | **remove**  | pbr, extensions       | Replace with `tw-animate-css`                     |
| `tw-animate-css`                 | _new_    | latest      | pbr, extensions       | TW4-compatible animation utilities                |
| `tailwindcss-scoped-preflight`   | ^2.2.4   | **remove**  | pbr                   | No TW4 support; use native CSS scoping            |
| `@tailwindcss/container-queries` | ^0.1.1   | **remove**  | pbr                   | Built into TW4 core                               |
| `@tailwindcss/typography`        | ^0.5.16  | keep/update | pbr, extensions       | Loaded via `@plugin` in CSS                       |
| `tailwind-merge`                 | ^2.6.0   | ^3.0.0      | pbr                   | v3 required for TW4                               |
| `stylelint-config-tailwindcss`   | ^0.0.7   | replace     | root, pbr, extensions | Use `@dreamsicle.io/stylelint-config-tailwindcss` |
| `prettier-plugin-tailwindcss`    | ^0.6.11  | keep/update | pbr                   | Add `tailwindStylesheet` option                   |
| `postcss`                        | ^8.5.3   | keep        | extensions            | Still needed for webpack                          |
| `postcss-loader`                 | ^8.1.1   | keep        | extensions            | Still needed for webpack                          |

### Config Migration

**tailwind.config.ts** (JS-based) → **CSS-based config** (no JS config file)

PBR `index.css` becomes:

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
.pr-twp {
  @import 'tailwindcss/preflight.css' layer(base);
}
@import 'tailwindcss/utilities.css' layer(utilities);

@plugin "@tailwindcss/typography";

@theme {
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  /* ... all color/radius/animation tokens from current tailwind.config.ts ... */
}
```

**postcss.config** (extensions only — PBR uses `@tailwindcss/vite`):

```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

### Scoped Preflight

Replace `tailwindcss-scoped-preflight` plugin with TW4's native CSS import splitting. Preflight is scoped under `.pr-twp` via nested `@import` as shown above.

### Prefix Change: `tw-` → `tw:`

Tailwind 4 changes prefix syntax from hyphen-based (`tw-flex`) to variant-based (`tw:flex`). This also changes variant ordering:

| TW3                        | TW4                        |
| -------------------------- | -------------------------- |
| `tw-flex`                  | `tw:flex`                  |
| `hover:tw-bg-red-500`      | `tw:hover:bg-red-500`      |
| `dark:hover:tw-bg-red-500` | `tw:dark:hover:bg-red-500` |
| `tw--mt-4`                 | `tw:-mt-4`                 |
| `-tw-mt-4`                 | `tw:-mt-4`                 |

Every Tailwind class in every `.tsx` file across PBR and extensions must be updated.

### `cn()` Backwards Compatibility Shim

To support a transition period where extensions may still use TW3 (`tw-*` classes) while PBR uses TW4 (`tw:*` classes), the `cn()` function in `shadcn-ui.util.ts` will be enhanced with prefix normalization and restoration.

**Algorithm:**

1. `clsx(inputs)` — flatten conditionals into a class string
2. Split into individual class tokens
3. For each token:
   - Detect if it's a `tw-` (TW3) or `tw:` (TW4) prefixed class
   - Normalize to `tw:` format (handling variant reordering and negative values)
   - Record a map: `normalizedForm → lastSeenOriginalForm`
4. Join normalized tokens and run through `twMerge` (configured with `prefix: 'tw:'`)
5. For each surviving class in the merged output, restore to the original prefix format of the winning (last-seen) input

**Variant reordering during normalization:**

- `hover:tw-bg-red-500` → split on `:` → `["hover", "tw-bg-red-500"]` → last segment has `tw-` → strip prefix, prepend `tw:` → `tw:hover:bg-red-500`

**Restoration (TW4 → TW3):**

- `tw:hover:bg-red-500` → split on `:` → `["tw", "hover", "bg-red-500"]` → first is `tw` → remove, add `tw-` to last segment → `hover:tw-bg-red-500`

**Negative value handling — three input forms:**

| TW3 form A       | TW3 form B       | TW4 form         |
| ---------------- | ---------------- | ---------------- |
| `tw--mt-4`       | `-tw-mt-4`       | `tw:-mt-4`       |
| `hover:tw--mt-4` | `hover:-tw-mt-4` | `tw:hover:-mt-4` |

All three forms normalize to the TW4 form for merging. Restoration preserves the exact original form that won (was last in input order).

**Test cases (non-exhaustive):**

```
// Basic dedup — last wins
cn('tw:p-4', 'tw-p-4')                         → 'tw-p-4'
cn('tw-p-4', 'tw:p-4')                         → 'tw:p-4'
cn({ 'tw:p-4': true }, 'tw-p-4')               → 'tw-p-4'

// Variant reordering
cn('hover:tw-bg-red-500', 'tw:hover:bg-red-500') → 'tw:hover:bg-red-500'
cn('tw:hover:bg-red-500', 'hover:tw-bg-red-500') → 'hover:tw-bg-red-500'

// Multi-variant
cn('dark:hover:tw-bg-red-500', 'tw:dark:hover:bg-blue-500') → 'tw:dark:hover:bg-blue-500'

// Negative form A
cn('tw--mt-4', 'tw:-mt-4')                     → 'tw:-mt-4'
cn('tw:-mt-4', 'tw--mt-4')                     → 'tw--mt-4'

// Negative form B
cn('-tw-mt-4', 'tw:-mt-4')                     → 'tw:-mt-4'
cn('tw:-mt-4', '-tw-mt-4')                     → '-tw-mt-4'

// Both TW3 negative forms compete
cn('tw--mt-4', '-tw-mt-4')                     → '-tw-mt-4'
cn('-tw-mt-4', 'tw--mt-4')                     → 'tw--mt-4'

// Negatives with variants
cn('hover:tw--mt-4', 'tw:hover:-mt-4')         → 'tw:hover:-mt-4'
cn('tw:hover:-mt-4', 'hover:-tw-mt-4')         → 'hover:-tw-mt-4'

// Negative dedup against positive
cn('tw-mt-4', 'tw:-mt-4')                      → 'tw:-mt-4'
cn('tw:-mt-4', 'tw-mt-4')                      → 'tw-mt-4'

// Non-tw classes pass through unchanged
cn('some-class', 'tw:p-4')                     → 'some-class tw:p-4'
cn('pr-twp', 'tw-flex', 'tw:flex')             → 'pr-twp tw:flex'

// Mixed: tw- unique + tw: unique (no conflict, both survive)
cn('tw-p-4', 'tw:bg-red-500')                  → 'tw-p-4 tw:bg-red-500'

// Arbitrary values
cn('tw-p-[12px]', 'tw:p-[16px]')               → 'tw:p-[16px]'
cn('tw:p-[16px]', 'tw-p-[12px]')               → 'tw-p-[12px]'
```

**Deprecation:** The shim is temporary. After 1-2 release cycles, drop `tw-` support and simplify `cn()` back to a direct `twMerge(clsx(...))` call with `prefix: 'tw:'`.

### Class Rename Strategy

A codemod script (regex-aware find-and-replace) targeting `tw-` in class strings and JSX but not in:

- CSS custom properties (`--tw-*`)
- The `.pr-twp` class
- Package names or imports containing `tw-`
- Comments (unless they contain class examples that should be updated)

### Validation

- `npm run build` succeeds (root + extensions)
- `npm run typecheck` passes
- `npm test` passes (especially cn() shim tests)
- `npm run lint` passes
- Storybook builds and renders correctly
- Visual spot-check that scoped preflight works (styles don't leak outside `.pr-twp`)

---

## Phase 3: shadcn Default → New York Style

### Approach

Incrementally diff each of the 32 shadcn components against the latest new york shadcn source. Apply only the style differences while preserving all custom code (marked with comments).

### Style Differences (new york vs default)

- Smaller border radius (more squared)
- More compact spacing/padding
- Smaller font sizes in some components
- Different icon sizing (generally tighter)
- More subtle shadows
- Flat button style

### `components.json` Update

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
  }
}
```

### CSS Variables

Update `--radius` and any color variable defaults to match new york style.

### What NOT to Change

- Custom components in `src/components/advanced/` — not shadcn
- Custom logic inside shadcn components (marked with comments)
- The `pr-twp` scoping class
- Component API surfaces (props, exports)

### Validation

- Storybook visual comparison against shadcn new york reference
- All existing tests pass
- No API surface changes (exports, props)

---

## Execution Order

| Step | Phase                         | Scope                                            | Risk              |
| ---- | ----------------------------- | ------------------------------------------------ | ----------------- |
| 1    | React 19                      | Root + pbr deps, types, remove test-renderer     | Low               |
| 2    | Tailwind 4 — deps & config    | pbr + extensions package.json, CSS config files  | Medium            |
| 3    | Tailwind 4 — `cn()` shim      | `shadcn-ui.util.ts` + comprehensive tests        | Medium            |
| 4    | Tailwind 4 — class rename     | All `.tsx` files: `tw-` → `tw:`, variant reorder | High (mechanical) |
| 5    | Tailwind 4 — scoped preflight | Replace plugin with native CSS nesting           | Medium            |
| 6    | Tailwind 4 — validate         | Build, test, Storybook visual check              | —                 |
| 7    | shadcn new york               | Diff + apply per-component style changes         | Low               |
| 8    | shadcn new york — validate    | Storybook visual check                           | —                 |

## Cross-Cutting Concerns

- **Storybook**: Verify `@storybook/react-vite` 9.x works with React 19 + TW4. May need config updates.
- **Extension templates**: Document all changes after implementation. Write migration guide from real experience.
- **`@senojs/rollup-plugin-style-inject`**: Verify compatibility with TW4 CSS output.
- **Shared config regions**: Tailwind and PostCSS configs in PBR and extensions are marked `#region shared` with template repos. Update comments/links after migration.
- **`tailwind-merge` v3**: Breaking change — theme scale keys match TW4 variable namespaces; prefix config changes to `tw:`.
- **`class-variance-authority`**: Framework-agnostic, no changes needed.
