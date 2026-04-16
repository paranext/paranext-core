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

| Package                      | Current  | Target     | Location              |
| ---------------------------- | -------- | ---------- | --------------------- |
| `react`                      | ^18.3.1  | ^19.0.0    | root, pbr peer dep    |
| `react-dom`                  | ^18.3.1  | ^19.0.0    | root, pbr peer dep    |
| `@types/react`               | ^18.3.18 | ^19.0.0    | root, pbr, extensions |
| `@types/react-dom`           | ^18.3.5  | ^19.0.0    | root, pbr, extensions |
| `react-test-renderer`        | ^18.3.1  | **remove** | root                  |
| `@types/react-test-renderer` | ^18.3.1  | **remove** | root                  |
| `eslint-plugin-react-hooks`  | ^4.6.2   | ^5.0.0     | root, extensions      |

### Compatibility Verification Required

These React-dependent packages must be verified for React 19 compatibility before proceeding:

| Package                                 | Version | Location  | Risk                                                    |
| --------------------------------------- | ------- | --------- | ------------------------------------------------------- |
| `rc-dock`                               | ^3.3.2  | root      | Low — verified no `findDOMNode` or deprecated API usage |
| `react-router-dom`                      | ^6.30.3 | root      | Low — v6 works with React 19, v7 is React 19 native     |
| `sonner`                                | ^1.7.4  | pbr       | Low                                                     |
| `vaul`                                  | ^1.1.2  | pbr       | Low                                                     |
| `cmdk`                                  | ^1.0.4  | pbr       | Low                                                     |
| `react-resizable-panels`                | ^3.0.6  | pbr       | Low                                                     |
| `react-hotkeys-hook`                    | ^4.6.1  | pbr       | Low                                                     |
| `next-themes`                           | ^0.4.4  | pbr       | Low                                                     |
| `markdown-to-jsx`                       | ^7.7.4  | pbr       | Low                                                     |
| `@eten-tech-foundation/platform-editor` | ~0.8.13 | root, pbr | Low — Lexical-based, Lexical supports React 19          |
| `@vitejs/plugin-react-swc`              | ^3.8.0  | pbr       | Low — handles JSX transform                             |
| `react-refresh`                         | ^0.14.2 | root      | Low — may need version bump                             |
| `@pmmmwh/react-refresh-webpack-plugin`  | ^0.5.15 | root      | Low                                                     |

### Code Changes

1. **`forwardRef` removal in shadcn components** — React 19 passes `ref` as a regular prop. All 112 `React.forwardRef` calls in `lib/platform-bible-react/src/components/shadcn-ui/` can be simplified to take `ref` directly in props. This is optional but recommended since we're touching these components in Phase 3 anyway.

2. **Type updates** — `React.ElementRef<T>` and `React.ComponentPropsWithoutRef<T>` patterns (140 occurrences in shadcn-ui) can be simplified. These still work in React 19 but are no longer necessary with the `forwardRef` removal.

3. **`eslint-plugin-react-hooks` v5** — New rules may flag existing code. Fix as needed. Note: exists in both root and extensions workspaces.

4. **Lexical** — `@lexical/react` ~0.41.0 has been React 19 compatible since v0.17+. No changes expected.

### Validation

- `npm run build` succeeds
- `npm run typecheck` passes
- `npm test` passes
- Storybook builds and renders

---

## Phase 2: Tailwind 3 → 4

### Dependency Changes

| Package                          | Current  | Target      | Location              | Notes                                                 |
| -------------------------------- | -------- | ----------- | --------------------- | ----------------------------------------------------- |
| `tailwindcss`                    | ^3.4.17  | ^4.0.0      | pbr, extensions       |                                                       |
| `@tailwindcss/postcss`           | _new_    | ^4.0.0      | extensions            | Replaces `tailwindcss` in postcss config              |
| `@tailwindcss/vite`              | _new_    | ^4.0.0      | pbr                   | For Vite build                                        |
| `autoprefixer`                   | ^10.4.20 | **remove**  | pbr, extensions       | Built into TW4 via Lightning CSS                      |
| `tailwindcss-animate`            | ^1.0.7   | **remove**  | pbr, extensions       | Replace with `tw-animate-css`                         |
| `tw-animate-css`                 | _new_    | latest      | pbr, extensions       | TW4-compatible animation utilities                    |
| `tailwindcss-scoped-preflight`   | ^2.2.4   | **remove**  | pbr                   | No TW4 support; use native CSS scoping                |
| `@tailwindcss/container-queries` | ^0.1.1   | **remove**  | pbr                   | Built into TW4 core                                   |
| `@tailwindcss/typography`        | ^0.5.16  | keep/update | pbr, extensions       | Loaded via `@plugin` in CSS                           |
| `tailwind-merge`                 | ^2.6.0   | ^3.0.0      | pbr                   | v3 required for TW4                                   |
| `stylelint-config-tailwindcss`   | ^0.0.7   | replace     | root, pbr, extensions | Use `@dreamsicle.io/stylelint-config-tailwindcss`     |
| `prettier-plugin-tailwindcss`    | ^0.6.11  | keep/update | pbr                   | Add `tailwindStylesheet` option pointing to CSS entry |
| `postcss`                        | ^8.5.3   | keep        | extensions            | Still needed for webpack                              |
| `postcss-loader`                 | ^8.1.1   | keep        | extensions            | Still needed for webpack                              |

### Config Migration (Two Stages)

#### Stage 1: Upgrade to TW4 while keeping JS config (done during initial TW4 upgrade)

Keep `tailwind.config.ts` files. TW4 supports referencing them from CSS via `@config`. This minimizes config risk during the upgrade.

PBR `index.css` adds:

```css
@import 'tailwindcss' prefix(tw);
@config './tailwind.config.ts';
```

The existing `tailwind.config.ts` will need minor updates for TW4 compatibility:

- Remove plugins that are now built-in (`@tailwindcss/container-queries`)
- Replace `tailwindcss-animate` with `tw-animate-css` (or load via CSS `@plugin`)
- Replace `tailwindcss-scoped-preflight` (see Scoped Preflight section)
- Remove the `prefix: 'tw-'` option (prefix is now set in the CSS import via `prefix(tw)`)
- Remove the `content` array (TW4 auto-detects content files)

**postcss.config** updates:

```js
// PBR: postcss.config.js — update plugin name
export default { plugins: { '@tailwindcss/postcss': {} } };

// Extensions: postcss.config.ts — same change
export default { plugins: { '@tailwindcss/postcss': {} } };
```

**Per-extension configs**: Each extension under `extensions/src/*/` has its own `tailwind.config.ts` and `postcss.config.ts` (10 extensions). All postcss configs update to use `@tailwindcss/postcss`. All tailwind configs stay but get the same minor updates as PBR's (remove built-in plugins, remove prefix/content).

**PBR Vite build**: Optionally add `@tailwindcss/vite` to `vite.config.ts` for better Vite integration. If used, PBR's `postcss.config.js` can be removed (the Vite plugin handles it). This is an optimization, not a requirement.

#### Stage 2: Migrate JS config to pure CSS config (separate follow-up, after everything is stable)

Once TW4 is working with the JS config bridge, optionally migrate theme tokens, plugins, and other config from `tailwind.config.ts` into CSS directives (`@theme`, `@plugin`, etc.) and delete the JS config files. This is a **separate effort** that can happen later and is not required for the TW4 upgrade to be complete.

Note: some config options like `corePlugins`, `safelist`, and `separator` are not supported in CSS config. If the JS config uses these, the `@config` bridge must remain.

### Scoped Preflight

**Status: Validated** — Approach determined via research spike (Task 0).

Replace `tailwindcss-scoped-preflight` plugin (no TW4 support) with the **"Disable + Copy-and-Scope"** approach described below.

#### Background

TW4 changes how Tailwind is imported. The default `@import "tailwindcss"` expands to three layer imports:

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css' layer(utilities);
```

TW4 officially documents that you can **disable preflight** by using the split imports and simply omitting the `preflight.css` line. This is the key enabler for our scoping approach.

#### Recommended Approach: Disable Preflight + Maintain Scoped Copy

**Step 1: Disable preflight in the TW4 import.** Replace `@import "tailwindcss"` with split imports that omit preflight:

```css
/* PBR index.css — TW4 split imports (no preflight) */
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
/* preflight.css intentionally omitted — we scope it below */
@import 'tailwindcss/utilities.css' layer(utilities);
```

When using modifiers like `prefix()`, apply them to the appropriate imports per TW4 docs:

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme) theme(static);
@import 'tailwindcss/utilities.css' layer(utilities) prefix(tw);
```

**Step 2: Create a scoped preflight file.** Copy TW4's `preflight.css` (~330 lines) and wrap every rule block under `.pr-twp`:

```css
/* lib/platform-bible-react/src/scoped-preflight.css */
/* Scoped version of Tailwind CSS v4 preflight.
 * Source: tailwindcss/preflight.css (v4.x)
 * All rules are nested under .pr-twp so they only apply within our component scope.
 * When upgrading Tailwind, re-copy preflight.css and re-apply the .pr-twp wrapper.
 */

@layer base {
  .pr-twp {
    /* === Universal reset === */
    & *,
    & ::after,
    & ::before {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: var(--default-border-color, currentColor);
    }

    /* === Document defaults (applied to .pr-twp itself instead of html/:host) === */
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(
      --default-font-family,
      ui-sans-serif,
      system-ui,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji'
    );
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;

    /* === Element resets (scoped to descendants) === */
    & hr {
      height: 0;
      color: inherit;
      border-top-width: 1px;
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
      font-size: inherit;
      font-weight: inherit;
    }

    & a {
      color: inherit;
      text-decoration: inherit;
    }

    /* ... remaining preflight rules, all nested under .pr-twp ... */
  }
}
```

The key transformation rules when scoping:

- **`*`, `::after`, `::before`** become `& *`, `& ::after`, `& ::before` (descendants of `.pr-twp`)
- **`html`, `:host`** properties move directly onto `.pr-twp` itself (it is the scoping root)
- **`body`** properties also move onto `.pr-twp` itself (or onto `& body.pr-twp` for the case where `<body>` has the class)
- **All element selectors** (`h1`, `a`, `img`, `button`, etc.) become `& h1`, `& a`, etc.
- **Pseudo-selectors and attribute selectors** are nested the same way: `& [hidden]`, `& ::placeholder`, etc.

**Step 3: Import the scoped preflight in `index.css`:**

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import './scoped-preflight.css';
@import 'tailwindcss/utilities.css' layer(utilities);
```

#### Why This Approach (Not the Others)

| Approach                                       | Verdict     | Reason                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CSS nesting with `@import` inside selector** | Not viable  | CSS spec requires `@import` at top level; `@import` inside `.pr-twp { }` or `@layer base { .pr-twp { @import ... } }` is invalid and will be ignored by browsers and build tools                                                                                                              |
| **PostCSS plugin (e.g., `postcss-nested`)**    | Unnecessary | TW4 uses Lightning CSS (not PostCSS) for its processing pipeline; adding PostCSS just for nesting adds complexity. Also, `@import` nesting is a build-tool limitation, not just a browser one                                                                                                 |
| **Disable + Copy-and-Scope**                   | Recommended | Leverages TW4's official split-import mechanism to disable preflight; uses standard CSS nesting (supported by Lightning CSS and all modern browsers) to scope the copied rules; no extra dependencies; works with both Vite (`@tailwindcss/vite`) and Webpack (`@tailwindcss/postcss`) builds |

#### Maintenance Cost

The scoped preflight file is a **vendored copy** of TW4's preflight with a mechanical `.pr-twp` wrapper transformation. Maintenance burden is low:

- Preflight changes rarely between minor Tailwind versions
- When updating Tailwind, diff `node_modules/tailwindcss/preflight.css` against the vendored copy
- The transformation is mechanical and could be scripted (copy preflight, apply nesting)
- A comment at the top of the file records which Tailwind version it was copied from

#### Extension Compatibility

Extensions use the same scoped preflight via PBR's published CSS. Extensions that use `@tailwindcss/postcss` in their Webpack builds will also use the split-import pattern with the same scoped preflight approach. The `postcss.config.ts` change from `tailwindcss` to `@tailwindcss/postcss` is orthogonal to preflight scoping.

#### Risk Assessment

This approach is **low risk**:

- Uses only officially documented TW4 features (split imports, omitting preflight)
- Uses standard CSS nesting (no preprocessor tricks)
- No new dependencies
- Degrades gracefully: if the scoped preflight has a bug, only `.pr-twp`-scoped elements are affected; the rest of the page is untouched

### Prefix Change: `tw-` → `tw:`

Tailwind 4 changes prefix syntax from hyphen-based (`tw-flex`) to variant-based (`tw:flex`). This also changes variant ordering:

| TW3                        | TW4                        |
| -------------------------- | -------------------------- |
| `tw-flex`                  | `tw:flex`                  |
| `hover:tw-bg-red-500`      | `tw:hover:bg-red-500`      |
| `dark:hover:tw-bg-red-500` | `tw:dark:hover:bg-red-500` |
| `sm:tw-p-4`                | `tw:sm:p-4`                |
| `group-hover:tw-flex`      | `tw:group-hover:flex`      |
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
- `group-hover:tw-flex` → split on `:` → `["group-hover", "tw-flex"]` → last segment has `tw-` → `tw:group-hover:flex`
- `peer-focus:group-hover:tw-text-red-500` → `tw:peer-focus:group-hover:text-red-500`

**Restoration (TW4 → TW3):**

- `tw:hover:bg-red-500` → split on `:` → `["tw", "hover", "bg-red-500"]` → first is `tw` → remove, add `tw-` to last segment → `hover:tw-bg-red-500`

**Negative value handling — three input forms:**

| TW3 form A       | TW3 form B       | TW4 form         |
| ---------------- | ---------------- | ---------------- |
| `tw--mt-4`       | `-tw-mt-4`       | `tw:-mt-4`       |
| `hover:tw--mt-4` | `hover:-tw-mt-4` | `tw:hover:-mt-4` |

All three forms normalize to the TW4 form for merging. Restoration preserves the exact original form that won (was last in input order).

**Implementation note:** The restoration map keys must match exactly what `twMerge` outputs. If `twMerge` internally normalizes class names (e.g., reordering variants), the map lookup may miss. This needs testing against `tailwind-merge` v3's actual output behavior.

**Performance note:** The shim adds string splitting, per-token regex matching, map construction, and post-merge restoration to every `cn()` call. Since `cn()` is called on every render of every shadcn component, profile after implementation to verify the overhead is acceptable.

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

// Responsive variants
cn('sm:tw-p-4', 'tw:sm:p-8')                   → 'tw:sm:p-8'
cn('tw:sm:p-8', 'sm:tw-p-4')                   → 'sm:tw-p-4'
cn('md:lg:tw-flex', 'tw:md:lg:hidden')          → 'tw:md:lg:hidden'

// Compound variants (group/peer)
cn('group-hover:tw-flex', 'tw:group-hover:hidden') → 'tw:group-hover:hidden'
cn('peer-focus:group-hover:tw-text-red-500', 'tw:peer-focus:group-hover:text-blue-500') → 'tw:peer-focus:group-hover:text-blue-500'

// Negative form A (tw--X)
cn('tw--mt-4', 'tw:-mt-4')                     → 'tw:-mt-4'
cn('tw:-mt-4', 'tw--mt-4')                     → 'tw--mt-4'

// Negative form B (-tw-X)
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

// Arbitrary properties (colons inside brackets must not confuse parser)
cn('tw-[color:red]', 'tw:[color:blue]')         → 'tw:[color:blue]'
cn('tw:[color:blue]', 'tw-[color:red]')         → 'tw-[color:red]'
```

**Deprecation:** The shim is temporary. After 1-2 release cycles, drop `tw-` support and simplify `cn()` back to a direct `twMerge(clsx(...))` call with `prefix: 'tw:'`.

### Class Rename Strategy

A codemod script (regex-aware find-and-replace) targeting `tw-` in class strings and JSX but not in:

- CSS custom properties (`--tw-*`)
- The `.pr-twp` class
- Package names or imports containing `tw-`
- Comments (unless they contain class examples that should be updated)

### Webpack CSS Handling

Extensions use Webpack with `css-loader` and `postcss-loader`. Verify that `css-loader` correctly handles TW4's CSS output, which may include `@layer` rules and modern CSS features processed by Lightning CSS. May need `css-loader` configuration adjustments.

### `@senojs/rollup-plugin-style-inject`

This plugin injects PBR's built CSS into consuming applications at runtime. If TW4's output uses CSS `@layer` declarations, verify the injected styles still cascade correctly over extension styles. This is a **potential blocking risk** — if layer ordering breaks the PBR-over-extensions precedence, the `insertAt: 'after-all'` strategy may need rethinking.

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

Incrementally diff each of the 32 shadcn components against the latest new york shadcn source. Apply only the style differences while preserving all custom code (marked with comments). Some files in `src/components/shadcn-ui/` may be custom additions (e.g., `button-group.tsx`) rather than stock shadcn — these should be left unchanged.

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
  },
  "registries": {
    "@shadcn-editor": "https://shadcn-editor.vercel.app/r/{name}.json"
  }
}
```

Note: `prefix` changes from `"tw-"` to `"tw"` for TW4 compatibility. The `registries` section is preserved from the current config.

### CSS Variables

Update `--radius` and any color variable defaults to match new york style.

### What NOT to Change

- Custom components in `src/components/advanced/` — not shadcn
- Custom logic inside shadcn components (marked with comments)
- The `pr-twp` scoping class
- Component API surfaces (props, exports)

### Type Declaration Output

PBR uses `dts-bundle-generator` to produce bundled `.d.ts` files. After removing `forwardRef` (Phase 1), component type signatures change. Verify the generated type declarations are correct and don't break consumers.

### Validation

- Storybook visual comparison against shadcn new york reference
- All existing tests pass
- No API surface changes (exports, props)
- Generated `.d.ts` types are correct

---

## Execution Order

| Step | Phase                      | Scope                                                                           | Risk              |
| ---- | -------------------------- | ------------------------------------------------------------------------------- | ----------------- |
| 0    | Prototype                  | Scoped preflight approach for TW4 — **DONE** (Disable + Copy-and-Scope)         | Resolved          |
| 1    | React 19                   | Root + pbr + extensions deps, types, remove test-renderer                       | Low               |
| 2    | Tailwind 4 — deps & config | Update packages, postcss configs, add `@config` bridge in CSS                   | Medium            |
| 3    | Tailwind 4 — `cn()` shim   | `shadcn-ui.util.ts` + comprehensive unit tests                                  | Medium            |
| 4    | Tailwind 4 — class rename  | All `.tsx` files: `tw-` → `tw:`, variant reorder                                | High (mechanical) |
| 5    | Tailwind 4 — validate      | Build, test, Storybook visual check, scoped preflight check                     | —                 |
| 6    | shadcn new york            | Diff + apply per-component style changes                                        | Low               |
| 7    | shadcn new york — validate | Storybook visual check                                                          | —                 |
| 8    | (Optional) Pure CSS config | Migrate `tailwind.config.ts` → `@theme`/`@plugin` directives, delete JS configs | Low               |

Note: Step 3 (cn() shim) is validated primarily via unit tests at that point. Full integration testing of mixed `tw-`/`tw:` classes happens at Step 5 after the class rename. Step 8 is a separate follow-up that can happen at any point after Step 5 is stable.

## Cross-Cutting Concerns

- **Storybook**: Verify `@storybook/react-vite` (^9.1.19) and `@storybook/react-webpack5` (9.1.19) work with React 19 + TW4.
- **Extension templates**: Document all changes after implementation. Write migration guide from real experience.
- **`@senojs/rollup-plugin-style-inject`**: Verify CSS layer compatibility with TW4 output (see Phase 2 section).
- **Shared config regions**: Tailwind and PostCSS configs in PBR and extensions are marked `#region shared` with template repos. Update comments/links after migration.
- **`tailwind-merge` v3**: Breaking change — theme scale keys match TW4 variable namespaces; prefix config changes to `tw:`.
- **`class-variance-authority`**: Framework-agnostic, no changes needed.
- **`prettier-plugin-tailwindcss`**: Needs `tailwindStylesheet` option in Prettier config pointing to the CSS entry file so it can sort TW4 classes correctly.
- **Per-extension configs**: 10 extensions each have their own `tailwind.config.ts` and `postcss.config.ts`. PostCSS configs update to `@tailwindcss/postcss`; tailwind configs stay but get minor updates (remove built-in plugins, prefix, content). Full CSS config migration is optional (Step 8).

## Rollback Strategy

Each phase is committed separately. If a phase introduces a blocking issue:

- **Phase 1 (React 19)**: Git revert the React version bumps. Most likely blocker: a dependency that doesn't support React 19.
- **Phase 2 (Tailwind 4)**: Git revert to pre-TW4 commits. Most likely blockers: scoped preflight, `styleInject` layer handling, or webpack CSS processing.
- **Phase 3 (shadcn new york)**: Git revert style changes. Low risk of needing rollback.
