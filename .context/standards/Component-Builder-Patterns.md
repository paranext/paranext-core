---
title: Component Builder Patterns Reference
description: Reference patterns and examples for building React UI components — file naming, structure, shadcn/ui conventions.
version: 1.7.6
status: active
created: 2026-03-04
last_updated: 2026-09-23
toc: true
---

# Component Builder Patterns Reference

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

This is a reference document containing patterns and examples for building Platform.Bible UI components.

<!-- TOC:BEGIN -->
<!-- | Line | Section | -->
<!-- | --- | --- | -->
<!-- | 36 | File Naming Conventions | -->
<!-- | 52 | TypeScript & Build Configuration | -->
<!-- | 88 | Web View Provider Patterns | -->
<!-- | 167 | PAPI Integration Patterns | -->
<!-- | 233 | Styling Patterns | -->
<!-- | 274 | Localization Patterns | -->
<!-- | 400 | EXPLANATION Comments for Complex Logic | -->
<!-- | 422 | Common Component Patterns | -->
<!-- | 452 | Debounce Usage Guidelines | -->
<!-- | 483 | Wire UI to Real PAPI — No Stubbing | -->
<!-- | 491 | Presentational Components and Their Stories | -->
<!-- | 521 | Controlled Radix Popover with Custom Outside-Pointer Handler | -->
<!-- | 566 | Disabled Button with Tooltip Pattern | -->
<!-- | 588 | Test File Patterns | -->
<!-- | 633 | Reference Extensions | -->
<!-- | 646 | Design Reference Resources | -->
<!-- | 653 | Visual Review | -->
<!-- | 657 | Version Log | -->
<!-- TOC:END -->

## File Naming Conventions

Use kebab-case for all file names with the appropriate suffix:

| Type      | Pattern                               | Example                        |
| --------- | ------------------------------------- | ------------------------------ |
| Web View  | `{feature-name}.web-view.tsx`         | `find.web-view.tsx`            |
| Provider  | `{feature-name}.web-view-provider.ts` | `find.web-view-provider.ts`    |
| Component | `{component-name}.component.tsx`      | `search-result.component.tsx`  |
| Hook      | `use-{hook-name}.hook.ts`             | `use-project-settings.hook.ts` |
| Types     | `{extension-name}.d.ts`               | `platform-scripture.d.ts`      |
| Styles    | `{feature-name}.web-view.scss`        | `find.web-view.scss`           |
| Tests     | `{feature-name}.test.tsx`             | `find.test.tsx`                |

---

## TypeScript & Build Configuration

### Extension `tsconfig.json`

Reference: `extensions/src/platform-scripture/tsconfig.json`. Each extension's `tsconfig.json` `typeRoots` must use **`../../../`** relative paths (the extension is three directories deep under `paranext-core/extensions/src/{ext}/`). Including:

- `../../../node_modules/@types` — default type declarations
- `../../../lib` — `papi-dts` type declarations (for `papi.d.ts`)
- `../../../extensions/src` — sibling extensions' type declarations
- `../../../src/@types` — core's React 19 / library compat type shims — **required**: without it, the auto-loaded broken `@types/*` packages (e.g. `@types/mdx`) fail typecheck
- `src/types` — this extension's own `.d.ts`

Do **not** use `../paranext-core/...` — that's a path from outside the repo and will silently miss type roots.

### Required `typecheck` script

Each extension's `package.json` MUST declare:

```json
"scripts": {
  "typecheck": "tsc -p ./tsconfig.json"
}
```

Without it, the repo-wide `npm run typecheck` silently skips that extension. When building UI components, run `npx tsc --noEmit -p extensions/src/{ext}/tsconfig.json` per extension after creating or modifying files.

### `npm run build` does NOT typecheck

Webpack is configured to skip type checking for speed:

- **Renderer / main**: `ts-loader` with `transpileOnly: true` (`.erb/configs/webpack.config.base.ts`)
- **Extensions**: `swc-loader` (no type checking at all — `extensions/webpack/webpack.config.base.ts`)

A successful `npm run build` therefore guarantees nothing about type safety. Always run per-extension `tsc --noEmit` (or repo-wide `npm run typecheck`) before declaring work done. CI runs typecheck separately, so untyped code that "builds locally" will block the PR.

---

## Web View Provider Patterns

Every extension web view requires two files:

### Web View Component (`{feature}.web-view.tsx`)

```typescript
import { WebViewProps } from '@papi/core';
import { Button, Card, cn } from 'platform-bible-react';
import './feature-name.web-view.scss'; // Optional SCSS

// papi.d.ts documents `globalThis.webViewComponent` as the canonical form;
// `global.webViewComponent` also works and appears in some shipped web views.
globalThis.webViewComponent = function FeatureWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  // Component implementation using platform-bible-react components
  return (
    <div className={cn('tw:flex tw:flex-col tw:gap-2')}>
      {/* Your UI here */}
    </div>
  );
};
```

### Web View Provider (`{feature}.web-view-provider.ts`)

```typescript
import { IWebViewProvider, WebViewDefinition } from '@papi/core';
import featureWebView from './feature-name.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export class FeatureWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: WebViewDefinition,
    options: FeatureWebViewOptions,
  ): Promise<WebViewDefinition> {
    return {
      ...savedWebView,
      title: 'Feature Title',
      content: featureWebView,
      styles: tailwindStyles,
      projectId: options.projectId,
    };
  }
}
```

**Note:** Use `?inline` imports for content and styles in providers.

### Web View UI-State Persistence Caveat (`useWebViewState`)

`useWebViewState<T>(key, default)` is scoped **per `webViewId`**, not per project or per user. Each `openWebView` call without a reuse strategy mints a **new** web view id, so closing and reopening a tool creates a fresh instance with empty state — slots persisted via `useWebViewState` do **not** survive close/reopen.

There is no id-reuse idiom that survives a close: `existingId: '?'` resolves through the **live** dock layout (`findFirstWebViewDefinitionByType` in `src/renderer/services/web-view.service-shard.ts`), so it only finds a currently-open instance — it is a **dedupe** mechanism (don't open a second instance while one is already open; see `openFind` in `extensions/src/platform-scripture/src/main.ts`), not a persistence mechanism. Once a tab is closed it is removed from the layout, and the next `openWebView` mints a fresh id with empty state. For state that must survive close/reopen (or across sessions), use user-scoped `papi.settings` instead of `useWebViewState`.

### Custom Web View Options

When a web view accepts custom options (project IDs, mode flags, etc.), declare a typed interface that **extends `OpenWebViewOptions`** — do not pass an inline object literal.

```typescript
import type { OpenWebViewOptions } from '@papi/core';

export interface FeatureWebViewOptions extends OpenWebViewOptions {
  projectId?: string;
  mode?: 'edit' | 'review';
}

// At the call site, pass a typed variable — not an inline literal:
const options: FeatureWebViewOptions = { projectId, mode: 'edit' };
await papi.webViews.openWebView(FEATURE_WEB_VIEW_TYPE, undefined, options);
```

Reference implementations: `extensions/src/platform-scripture/src/find.web-view-provider.ts`, `extensions/src/platform-scripture/src/checks-side-panel.web-view-provider.ts`, `extensions/src/platform-scripture-editor/src/main.ts`.

### Content Zoom Opt-In (experimental)

Per-pane content zoom scales a web view's **project text** — scripture, note bodies, result snippets, resource text in its own font — and nothing else. A view opts in by marking each element that renders that text with `ContentZoomRoot` from `platform-bible-react`. Buttons, inputs, filters, headers, badges, card frames and pop-ups stay outside every marked element and keep interface scale:

```tsx
import { ContentZoomRoot } from 'platform-bible-react';

<ul>
  {results.map((result) => (
    <li key={result.id} className="tw:flex tw:items-baseline tw:gap-2">
      <Button variant="ghost" onClick={() => goTo(result.ref)}>
        {result.refLabel}
      </Button>
      <ContentZoomRoot as="span" className="scripture-font">
        {result.text}
      </ContentZoomRoot>
    </li>
  ))}
</ul>;
```

The platform then scales the marked elements on Ctrl/⌘+`+`/`-`/`0`, Ctrl/⌘+wheel and the tab context menu, keeps the level in the pane's own web view definition state, remembers it per project and kind of pane, and shows the level indicator. The view contributes no handler, no state and no CSS.

`ContentZoomRoot` renders a `<div>` by default and a `<span>` with `as="span"` — use the span inside phrasing content such as a `<p>` or a table cell's inline text. It applies **no** classes of its own, forwards its ref (an `HTMLElement`) and every other prop. Flowing, editor-like text keeps one marker around the text body with every control moved out: the Scripture editor marks its editor tree and leaves the Simple-mode character-marker bar and the empty-chapter and book-not-available views outside.

**Text rendered by `platform-bible-react` components.** Library components that render project text — the comment cards' scripture snippet, bodies, conflict diffs and composer — mark it only inside a `ContentZoomTextProvider`. Wrap the list in `<ContentZoomTextProvider>` (or `area="…"` for a named area) rather than in a `ContentZoomRoot`, and never both: a marked element inside another is ignored. A component that renders project text inline can take part the same way by spreading `useContentZoomTextProps()` onto the existing text element — it returns the marker attribute inside a provider and nothing outside one — never onto pop-up content or an element that contains another marker.

**Several elements share one area id.** No `area` prop means the view's `main` area; a view with several independently zoomable panes gives each its own id (`area="footnotes"`; ids are `[a-z][a-z0-9-]*`, and `default` is reserved). Card, list and table views mark every text element with the same id, and the platform zooms them as one area with one level and one memory: the shortcuts act on the area holding keyboard focus, the wheel on the area under the pointer, and the tab menu on the area last used — a click or wheel over an unmarked control or gap targets the area used last, because the bootstrap resolves the area from the nearest marked ancestor. **Areas must not nest** — a marked element inside another marked element is ignored — and resize handles, dividers and panel headers stay outside every area so they do not change size. A view with its own zoom of some text (the Text Collection's per-resource factor) keeps that inline `zoom` on an element inside the marker, never on the marker itself, where it would replace the platform's level instead of multiplying with it. A view that marks nothing, and whose web view type the platform does not declare zoomable, is not zoomed at all: it renders at 100 % content zoom, with no zoom items in its tab menu and no zoom shortcuts. Such a view is zoomable only while a marked element is rendered, so render an empty marked element while it has nothing to show.

First reference implementations: the Scripture editor (`main` around the editor tree, `footnotes`), the Comments list (`ContentZoomTextProvider` around the cards), and the Text Collection grid (one `text-collection` marker per cell).

Card, list and table reference implementations mark each project-text element with the view's one area id: Find's result snippet, verse context and replace preview (`extensions/src/platform-scripture/src/find/search-result.component.tsx`); the four inventories' item column (`checks/inventories/inventory-item-column.tsx`) plus PBR's occurrence table, opted in with `ContentZoomTextProvider`; the Checks card's item text (`checks/checks-side-panel/check-card.component.tsx`); the Markers Checklist's text and marker tokens (`components/checklist.component.tsx`); and the Lexical Tools dictionary's lemmas, glosses and definitions (`extensions/src/platform-lexical-tools/src/components/dictionary/`). Each of these web-view types is also declared zoomable in core's content-zoom declaration map, so its zoom items and shortcuts exist before any text is rendered.

**Pop-ups stay at interface scale.** Menus, popovers, dropdowns and tooltips from
`platform-bible-react`, the pop-ups requested through `papi.overlays` (`showCommandPalette`,
`showPopover`, `showContextMenu`) and the Scripture editor's own right-click menu never take content
zoom, even when they open from zoomed text: content zoom makes project text readable, it does not
resize controls. Only their position follows the zoomed content. A pop-up you anchor to a position
in the text should read that position live — `useLivePopoverAnchor` from `platform-bible-react`
re-measures on scroll, resize and reflow — because `getBoundingClientRect()` inside a zoomed element
already reports viewport pixels, which is what the pop-up is placed in. Never put
`data-platform-content-zoom-root` on pop-up content: the platform zooms every element that carries it.

---

## Async Hook State Shape

Two shapes are both correct; pick by whether the payload is **state-specific**. See
[`adr-async-hook-state-shape`](Architecture-Decisions.md) for the full rationale.

> **Provisional.** `adr-async-hook-state-shape` is **Proposed**, not Accepted: the rule is drawn
> from exactly two hooks, both introduced by PT-4347. Follow it as the default for new async hook
> state, but a hook that fits neither shape should reopen the decision rather than contort to
> satisfy it.

**Discriminated union** — when data exists in only one state, so the type can make the other
combinations unrepresentable:

```ts
type EffectiveResourceReferenceListState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; list: EffectiveResourceReferenceList };
```

There is no list to hand out while loading or on error, and the union is what stops a caller reading
one anyway. Reference: `useEffectiveResourceReferenceList`.

**Flat named state object** — when the values are always present and the flags describe them:

```ts
type DblResourceCatalogState = {
  dblResources: DblResourceData[]; // always present (coerced to [])
  isLoadingResources: boolean;
  isCatalogReady: boolean;
  hasCatalogError: boolean;
  refetchCatalog: () => void;
};
```

Nothing here needs making unrepresentable. References: `useDblResourceCatalog`,
`useStructureProtectionState`.

### Never unpack a union at a boundary

A union's guarantee dies the moment a consumer splits it into a nullable payload plus a bare status.
Indexing the discriminant strips the payload and hands the callee two values free to disagree — the
exact shape the union existed to forbid:

```tsx
// WRONG — `status: 'ready'` with `list: undefined` is now expressible
type Props = {
  modelTexts: EffectiveResourceReferenceList | undefined;
  modelTextsStatus: EffectiveResourceReferenceListState['status'];
};

// RIGHT — narrowing survives into the component
type Props = { modelTextsState: EffectiveResourceReferenceListState };
```

Pass the whole state and narrow inside. If a component needs the payload in several places, derive it
once from the narrowed union rather than accepting it as a second prop.

## PAPI Integration Patterns

### Standard imports for extension web views

```typescript
import {
  Button,
  Card,
  CardContent,
  Badge,
  cn,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { SomeIcon } from 'lucide-react';
```

### Component Usage Guidelines

**Always import from `platform-bible-react`:**

- Generic UI: Button, Card, Dialog, Input, Checkbox, Label, Badge, Alert, Tooltip, Popover, etc.
- Complex components: DataTable, Inventory, CommentList, Editor, ScriptureResultsViewer, etc.
- Utilities: `cn()` for class composition
- Hooks: `useEvent`, `usePromise`, `useEventAsync`
- Icons: Import from `lucide-react`

**Create locally only when:**

- Building domain-specific compositions that combine multiple library components
- Adding custom logic specific to the extension's domain
- Example: `CheckCard` that combines Badge + Tooltip + ResultsCard with check-specific logic

### `ComboBox` Option Shape

`ComboBox` does **not** take `{ label, value }[]` — that's the most common wrong guess. The accepted option type is:

```typescript
type ComboBoxOption = string | number | ComboBoxLabelOption;
type ComboBoxLabelOption = { label: string; secondaryLabel?: string };
// Note: NO `value` field. The option's identity IS its label/string/number.
```

So pass either an array of plain strings/numbers, or an array of `{ label, secondaryLabel? }` objects. If you need a separate machine value, look up the selected option by label in your local data.

```typescript
// String options — simplest case
<ComboBox options={['Genesis', 'Exodus', 'Leviticus']} value={book} onChange={setBook} />

// Label objects — when you want a secondary line of text under each option
<ComboBox
  options={[
    { label: 'Genesis', secondaryLabel: 'GEN' },
    { label: 'Exodus', secondaryLabel: 'EXO' },
  ]}
  value={selected}
  onChange={setSelected}
/>
```

Source: `lib/platform-bible-react/src/components/basics/combo-box.component.tsx`.

---

## Styling Patterns

### Primary Approach: Tailwind CSS with `tw:` prefix

```typescript
// Tailwind with tw: prefix (primary approach)
<div className="tw:flex tw:flex-col tw:gap-4 tw:p-4">

// Conditional classes with cn()
import { cn } from 'platform-bible-react';
<div className={cn('tw:flex tw:gap-2', { 'tw:hidden': !visible })}>

// Using platform-bible-react components
import { Button, Card, CardContent, Input, Label } from 'platform-bible-react';
<Card>
  <CardContent>
    <Label htmlFor="name">Name</Label>
    <Input id="name" />
    <Button variant="default">Submit</Button>
  </CardContent>
</Card>
```

### Styling Rules (Enforced by ESLint)

These patterns are enforced by linting rules:

| Prohibited | Allowed | Rule |
|------------|---------|------|
| Hardcoded colors (`tw:bg-black`, `tw:text-white`, `#fff`) | Theme tokens (`tw:bg-background`, `tw:text-foreground`) | `paranext/no-hardcoded-tailwind-colors` |
| Shadow classes (`tw:shadow*`) | (Disallowed in AI-authored extension/web-view code via the AI-strict lint config; the platform-bible-react shadcn-ui components themselves do use shadows like `tw:shadow-md`) | `paranext/no-tailwind-shadows` |

**Theme tokens to use**:
- Backgrounds: `tw:bg-background`, `tw:bg-muted`, `tw:bg-primary`, `tw:bg-secondary`
- Text: `tw:text-foreground`, `tw:text-muted-foreground`, `tw:text-destructive`
- Borders: `tw:border-border`, `tw:border-input`, `tw:border-primary`

See [Code-Style-Guide.md](Code-Style-Guide.md#theming) for details.

### Content Zoom and Measurement (experimental)

Content zoom is CSS `zoom`, applied by the platform to each element carrying `data-platform-content-zoom-root` (see [Content Zoom Opt-In](#content-zoom-opt-in-experimental)). Never set `zoom`, a font-size cascade or `transform: scale` on your own content to imitate it: a font-size cascade does not reach the editor's rendered scripture (PT-4167), and `transform: scale` breaks hit-testing.

Inside a zoomed area, geometry and computed styles disagree — **`getBoundingClientRect()` is in zoomed pixels and `getComputedStyle(element).fontSize` is not.** Code that mixes the two (virtualized lists, canvas overlays, popover anchoring, "is this taller than N lines" checks) has to read the factor and apply it itself:

```ts
const factor =
  Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--platform-content-zoom-main'),
  ) || 1;
```

For a named area read `--platform-content-zoom-<areaId>`; `--platform-content-zoom-default` holds the Settings default that any area without its own level follows.

If a component owns Ctrl/⌘+wheel for a sub-region of its own — the Text Collection grid's per-resource zoom does — register that listener in the **capture** phase and call `stopPropagation()`. The platform's own zoom listener sits on the bubble phase precisely so that a capture-phase handler wins.

---

## Localization Patterns

**Reference implementation**: `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx`

### Define Localized String Keys

```typescript
// {feature}.utils.ts
import { LocalizeKey } from 'platform-bible-utils';

export const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_{feature}_title%',
  '%webView_{feature}_submitButton%',
  '%webView_{feature}_cancelButton%',
  '%webView_{feature}_loadingMessage%',
  // Add ALL user-facing strings
];
```

### Use the useLocalizedStrings Hook

```typescript
import { useLocalizedStrings } from '@papi/frontend/react';
import { useMemo } from 'react';
import { LOCALIZED_STRINGS } from './{feature}.utils';

global.webViewComponent = function FeatureWebView({ ... }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  return (
    <div>
      <h1>{localizedStrings['%webView_{feature}_title%']}</h1>
      <Button>{localizedStrings['%webView_{feature}_submitButton%']}</Button>
    </div>
  );
};
```

**Return type gotcha**: `useLocalizedStrings` returns `[localizedStrings: LocalizationData, isLoading: boolean]`. `LocalizationData` aliases `LanguageStrings`, whose keys are `LocalizeKey` (i.e. `` `%${string}%` ``) — **not** plain `Record<string, string>`. Index lookups must use the `%key%` form (`localizedStrings['%webView_foo_title%']`); typing the variable as `Record<string, string>` will compile via `any` but breaks IDE completion and type-checks. Source: `src/renderer/hooks/papi-hooks/use-localized-strings-hook.ts` and `lib/platform-bible-utils/src/extension-contributions/localized-strings.model.ts`.

### Add Translations to localizedStrings.json

```json
{
  "localizedStrings": {
    "en": {
      "%webView_{feature}_title%": "Feature Title",
      "%webView_{feature}_submitButton%": "Submit",
      "%webView_{feature}_cancelButton%": "Cancel"
    },
    "es": {
      "%webView_{feature}_title%": "Titulo de la funcion",
      "%webView_{feature}_submitButton%": "Enviar",
      "%webView_{feature}_cancelButton%": "Cancelar"
    }
  }
}
```

### Conventions

- Key format: `%webView_{feature}_{elementDescription}%`
- Use ellipsis (`...`) for items that open dialogs: "New Project..."
- Always provide BOTH English (`en`) AND Spanish (`es`) translations

### Dynamic Values with formatReplacementString

```typescript
import { formatReplacementString } from 'platform-bible-utils';

const message = formatReplacementString(
  localizedStrings['%webView_{feature}_resultsCount%'], // "{count} results found"
  { count: results.length }
);
```

### Localized Accessibility Attributes

All accessibility attributes with user-facing text MUST be localized:

```typescript
// BAD - hardcoded English in accessibility
<Input aria-label="Search projects" />
<Button aria-label="Close dialog" />

// GOOD - localized accessibility
<Input aria-label={localizedStrings['%search_ariaLabel%']} />
<Button aria-label={localizedStrings['%dialog_close_ariaLabel%']} />
```

**Enforced by ESLint**: `paranext/require-localized-aria`

### Reuse Existing Strings

Before creating new keys, scan the extension's `localizedStrings.json` for existing strings:

```bash
grep -i "cancel\|ok\|save\|close\|submit\|error\|loading" \
  extensions/src/{ext}/contributions/localizedStrings.json
```

Common reusable keys (verify in `assets/localization/en.json` before using — the set changes): `%general_cancel%`, `%general_ok%`, `%general_loading%`, `%general_open%`, `%general_run%`

### Existing Strings Are Immutable

**NEVER modify existing key/value pairs.** If a string needs replacement:

1. Create a NEW key with the desired value
2. Add a fallback mapping in the `metadata` section:

```json
{
  "metadata": {
    "%oldKey_toReplace%": {
      "fallbackKey": "%newKey_withCorrectValue%"
    }
  },
  "localizedStrings": {
    "en": { "%newKey_withCorrectValue%": "Correct text" },
    "es": { "%newKey_withCorrectValue%": "Texto correcto" }
  }
}
```

---

## EXPLANATION Comments for Complex Logic

For functions that are >30 lines or contain regexes, place an `EXPLANATION:` block as `//` line comments **alongside the implementation** — inside the function body for normal functions, or directly above a class-level constant (e.g. a regex pattern field) when the constant *is* the algorithm — never inside TSDoc. Consumers reading the API surface don't need internals; future maintainers reading the implementation do.

```typescript
/**
 * Sorts projects for display in the dropdown. Returns a new array; input
 * is not mutated.
 */
export function sortProjects(projects: ProjectInfo[]): ProjectInfo[] {
    // EXPLANATION:
    // This sorting algorithm orders projects in the dropdown:
    // 1. Active projects first, sorted alphabetically
    // 2. Archived projects second, sorted by last modified date
    // 3. Resources last, sorted by type then name

    // Implementation
}
```

---

## Common Component Patterns

### Grid/Table Components (Checklists, Parallel Passages)

- Use virtualization for lists > 100 items
- Implement row selection with visual feedback
- Handle column sorting and filtering
- Support full keyboard navigation (arrow keys, Enter, Escape)
- Manage focus correctly when rows are added/removed

### Form Components (Project Settings)

- Use controlled inputs exclusively
- Implement validation with clear error messages
- Display error states adjacent to invalid fields
- Handle submit/cancel with loading states
- Track dirty state to warn on unsaved changes

Any state that flips a loading/spinner flag true (`setIsLoading(true)`) must clear it to false on **every** exit path — success, early return, and the catch/error path — or the component hangs in a spinner forever; the codebase idiom is a `try`/`finally` that calls `setIsLoading(false)` in the `finally` block, guarded by a mounted-ref check so it doesn't set state on an unmounted component (see `use-inventory.ts`, `registration-form.component.tsx`).

### Dialog Components (Conflict Resolution)

- Manage modal overlay with proper z-index
- Implement focus trapping within dialog
- Handle Escape key to close
- Disable action buttons during processing
- Return focus to trigger element on close

---

## Debounce Usage Guidelines

**When to use debounce:**
- Search-as-you-type that triggers API calls
- Autocomplete suggestions
- Input that updates expensive derived calculations
- Typing in a shared/synchronized view

**When NOT to use debounce:**
- Input in a modal dialog (user will click OK/Submit anyway)
- Immediate local state updates
- Toggle switches and checkboxes
- Selections from dropdowns

**Typical debounce values:**
- Search/autocomplete: 300-500ms
- Validation: 200-300ms

```typescript
// Use debounce for search in a main view
const debouncedSearch = useDebouncedCallback(
  (query: string) => papi.commands.sendCommand('search', query),
  300
);

// DON'T debounce in a dialog - user will click Submit
const handleNameChange = (name: string) => setProjectName(name);
```

---

## Wire UI to Real PAPI — No Stubbing

A web view's data providers and submit handlers must call the real `papi.commands.sendCommand` (or `papi.dataProviders` / `usePromise` over real commands) backed by actual backend services. Do **not** ship a component wired to mocked/stubbed PAPI, and do **not** substitute hardcoded arrays, static objects, or `// TODO` placeholders for data that is supposed to come from PAPI — that produces a UI that demos green but is dead in the running app.

If the backend functionality a handler needs is genuinely out of scope, leave the call site wired and mark it clearly as DEFERRED (with the missing command named) rather than faking the data — so the gap is visible instead of hidden behind a plausible-looking stub.

---

## Presentational Components and Their Stories

A presentational `*.component.tsx` takes all of its data through props and is decoupled from PAPI (no `@papi`/`useData`/`useSetting`/`globalThis.webViewComponent` — see the purity rule in [Extension-Development-Guide.md](Extension-Development-Guide.md)). The same component code must run unchanged in production and in Storybook. Keep these three discipline rules when building such a component and its stories.

### Keep demo/mock scaffolding out of the component

The component file must be production-clean. Demo data, mock toggles, "load sample data" controls, and environment-gated branches (`process.env.NODE_ENV` / `process.env.STORYBOOK`, `demoMode`/`isDemo`/`sampleData`/`mockData`) belong in the **story decorator**, never in the component. If the component branches on whether it is running in Storybook, it is no longer the thing that ships.

### Cover every wireframe state variant with a story

Each distinct state a wireframe describes — typically `Default`, `Loading`, `Empty`, `Error`, and any populated/selected variants — gets its own named story export so a reviewer can see each state in isolation. A component with a loading and an error state but only a `Default` story is under-covered; add `Loading` and `Error` stories (e.g. `export const Loading: Story = { args: { isLoading: true } }`).

### The `Default` story wires every callback to real `useState`

Stories are interactive sessions, not static snapshots. In the `Default` story, every `on*` callback prop must be wired to a state-mutating handler whose state lives in a `useState` hook in the story's decorator (or render function) — not a `() => {}` stub. The decorator owns the sample data via `useState`, so a reviewer opening the story can click through the full flow and watch the component react to real-shape data.

```tsx
// Default story: decorator owns sample state; callbacks mutate it.
export const Default: Story = {
  render: () => {
    const [name, setName] = useState('My Project');
    return <ProjectSettingsForm projectName={name} onSave={setName} onCancel={() => setName('My Project')} />;
  },
};
```

Stub callbacks (`() => {}`) ARE fine in the non-`Default` stories whose whole point is a frozen state — `Loading`, `Empty`, `Error` — since those are not meant to be exercised. The "wire every callback to `useState`" rule applies only to `Default`.

---

## Controlled Radix Popover with Custom Outside-Pointer Handler

### When this pattern applies

Most `<Popover>` / `<DropdownMenu>` consumers can rely on Radix's defaults: the trigger toggles, outside clicks dismiss, no custom handlers needed. You only end up writing a custom `onPointerDownOutside` handler when you also need a "user clicked the trigger to close while we're already open" interlock — a flag the trigger's `onClick` reads to call `event.preventDefault()`, suppressing Radix's `onOpenToggle` and preventing it from re-opening the popover that was just closed by the outside-pointer path.

That interlock pattern is how you avoid the "controlled state lags React render → click re-toggles → popover flickers back open" race in a fully-controlled `<Popover open={…} onOpenChange={…}>`.

### The bug to avoid

If you write that handler but **don't guard it with your controlled-open state**, it fires during the fade-out animation cleanup window after the popover has already closed:

- Radix keeps `PopoverContent` mounted during the close animation (so `tw:data-[state=closed]:fade-out-0` can play).
- During that cleanup window, `onPointerDownOutside`, `onInteractOutside`, and `onFocusOutside` are all still attached.
- If the user clicks the trigger to **re-open** before the fade-out finishes, your handler still sees a pointerdown on the trigger, treats it as "user wants to close again", sets the interlock flag — and the legitimate reopen click is dropped by `preventDefault()` in the trigger's `onClick`.

### Correct pattern

Guard the handler with the controlled-open state your component owns. The same fix applies to `onInteractOutside` and `onFocusOutside` if you've attached custom handlers to them too.

```tsx
// `open` is your controlled state, `triggerRef` points at your trigger element,
// `triggerJustClosedRef` is the interlock flag your trigger's onClick reads.
<PopoverContent
  // ...
  onPointerDownOutside={(event) => {
    if (
      open &&  // ← only act while logically open; skip the fade-out window
      triggerRef.current &&
      event.target instanceof Node &&
      triggerRef.current.contains(event.target)
    ) {
      triggerJustClosedRef.current = true;
      setOpen(false);
    }
  }}
>
```

### Reference incident

Fixed in `lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.component.tsx` (markers-checklist branch). The four story interaction tests `Smart Parsing Demo`, `Book Search And Navigation`, `Single Chapter Book Demo`, and `Comprehensive Interaction Test` were all red and went green with the one-condition guard. Investigation writeup: paranext/ai-prompts#210; fix landed via paranext/paranext-core#2219.

---

## Disabled Button with Tooltip Pattern

**CRITICAL:** Wrap disabled buttons in `<span>` - disabled elements don't fire mouse events.

```typescript
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';

// Wrap disabled button in span so tooltip works
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span>
        <Button disabled>Choose...</Button>
      </span>
    </TooltipTrigger>
    <TooltipContent>This feature is not yet available</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Explaining Why a Control Is Disabled

**A disabled control is out of the tab order, so hover- and focus-only affordances reach nobody.**
The tooltip pattern above works for a disabled `Button` because the wrapping `<span>` is what the
`Tooltip` listens on — but it costs a tab stop, and that is only acceptable where the wrapper is not
inside a composite widget that owns focus.

Do NOT add a focusable wrapper inside a `radiogroup`, a menu, a listbox, or any other roving-focus
container. A wrapper takes a `role` the container does not own among its children, and adds tab
stops to a group whose contract is exactly one. Radix goes further in menus: a `disabled`
`DropdownMenuItem` is dropped from the menu's roving focus entirely, and a `Tooltip` inside
`DropdownMenuContent` competes with the menu for the same pointer.

**Inside a composite widget, render the explanation as inline text** beneath the option's label,
and point the disabled control at it with `aria-describedby`:

```tsx
<div className="tw:flex tw:flex-col tw:gap-0.5">
  <div className="tw:flex tw:items-center">
    <RadioGroupItem
      value={value}
      id={optionId}
      disabled={!!disabledExplanation}
      aria-describedby={disabledExplanation ? `${optionId}-explanation` : undefined}
    />
    <Label htmlFor={optionId}>{label}</Label>
  </div>
  {disabledExplanation && (
    <span id={`${optionId}-explanation`} className="tw:ms-6 tw:text-xs tw:text-muted-foreground">
      {disabledExplanation}
    </span>
  )}
</div>
```

Two things to watch when the text goes inside a menu item:

- **Contrast.** `DropdownMenuItem` renders a disabled item at half opacity, and a parent `opacity`
  is a compositing ceiling children cannot exceed. A `tw:text-muted-foreground` explanation under
  that veil lands around 2:1. Use `tw:text-foreground` there.
- **Width.** Give the column `tw:min-w-0` so a long explanation wraps instead of pushing the menu
  past `--radix-dropdown-menu-trigger-width`.

Reference implementation: `ScopeSelector`'s `disabledScopeExplanations`
(`lib/platform-bible-react/src/components/advanced/scope-selector/`).

---

## Test File Patterns

### Interaction Tests

```typescript
// {feature-name}.test.tsx - co-located with component
import { render, fireEvent } from '@testing-library/react';

describe('FeatureName interactions', () => {
  it('handles row selection', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(<FeatureName onSelect={onSelect} />);
    fireEvent.click(getByRole('row'));
    expect(onSelect).toHaveBeenCalled();
  });
});
```

### Snapshot Tests (optional)

```typescript
// {feature-name}.test.tsx - same file as interaction tests
describe('FeatureName snapshots', () => {
  it('renders default state', () => {
    const { container } = render(<FeatureName {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  // Add snapshots for loading, error, empty, and populated states
});
```

### Accessibility Tests

```typescript
import { axe } from 'jest-axe';

it('has no accessibility violations', async () => {
  const { container } = render(<FeatureName />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Reference Extensions

Find similar React components in the codebase for patterns to follow:

| Extension | Pattern | Location |
|-----------|---------|----------|
| checks-side-panel | Filter + results list | `extensions/src/platform-scripture/src/checks-side-panel.web-view.tsx` |
| find | Search + results | `extensions/src/platform-scripture/src/find.web-view.tsx` |
| inventory | Data grid | `extensions/src/platform-scripture/src/inventory.web-view.tsx` |
| settings tab (core) | Settings/form | `src/renderer/components/settings-tabs/settings-tab.component.tsx` |

---

## Design Reference Resources

- `lib/platform-bible-react/src/stories/guidelines/` - Component choices, responsiveness, interactions
- `Component-Selection-Quick-Reference.md` - Component decision tree, patterns, and detailed use cases
- `extensions/src/platform-scripture/` - Reference implementation patterns
- Run Storybook (`npm run storybook`) for live component examples

## Visual Review

After completing UI work on a feature PR, apply the `storybook-review` GitHub label to the paranext-core PR to trigger Chromatic snapshots for UX review. This is the recommended way to get UX sign-off on component visual fidelity before merge. See [Chromatic Visual Review](Testing-Guide.md#chromatic-visual-review) for details on how the workflow operates and cost considerations.

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
| 1.1.0   | 2026-04-01 | Add Visual Review subsection for Chromatic/storybook-review label |
| 1.1.1   | 2026-04-22 | Refresh TOC line numbers (drift fix) |
| 1.2.0   | 2026-04-30 | Add "Controlled Radix Popover with Custom Outside-Pointer Handler" section — guard custom outside-pointer handlers with the controlled-open state to avoid firing during the fade-out animation window. Covers `onPointerDownOutside`, `onInteractOutside`, and `onFocusOutside`. (markers-checklist BookChapterControl fix; writeup paranext/ai-prompts#210, fix paranext/paranext-core#2219.) |
| 1.3.0   | 2026-05-01 | Add TypeScript & Build Configuration section (typeRoots, typecheck script, build-doesn't-typecheck). Add Custom Web View Options pattern (extend `OpenWebViewOptions`). Add `ComboBox` option shape callout (NOT `{label,value}[]`). Add return-type gotcha to useLocalizedStrings (`LocalizationData`/`LanguageStrings`, `LocalizeKey` indices). |
| 1.4.0   | 2026-05-11 | Move `EXPLANATION:` blocks into the function body rather than TSDoc. |
| 1.4.1   | 2026-05-11 | Code-review fix: align `EXPLANATION:` placement wording with the Code-Style-Guide v1.2.1 relaxation — also accommodate class-level constants (e.g. regex pattern fields) when the constant *is* the algorithm. |
| 1.5.0   | 2026-06-18 | Add "Presentational Components and Their Stories" section (keep demo/mock scaffolding out of the component, cover every wireframe state variant, `Default` story wires callbacks to `useState`). Add "Web View UI-State Persistence Caveat" (`useWebViewState` is per-`webViewId`; `existingId`/`createNewIfNotFound: false` dedupes currently-open instances only — for state that survives close/reopen use `papi.settings`). |
| 1.6.0   | 2026-09-12 | Add "Explaining Why a Control Is Disabled" section — a disabled control is out of the tab order, so a focusable tooltip wrapper is wrong inside a `radiogroup`/menu/listbox; render the explanation inline with `aria-describedby`, and watch the half-opacity contrast and `tw:min-w-0` in a `DropdownMenuItem`. |
| 1.7.0 | 2026-09-15 | Add "Content Zoom Opt-In (experimental)" (the `ContentZoomRoot` / `data-platform-content-zoom-root` marker, one root per zoom area, no nesting, the unmarked-view whole-iframe fallback) and "Content Zoom and Measurement (experimental)" (never imitate content zoom with font-size or `transform: scale`; zoomed `getBoundingClientRect` vs unzoomed `fontSize`; read `--platform-content-zoom-<area>`; capture-phase `stopPropagation` for a view owning Ctrl+wheel). Front-matter version also caught up with the 1.6.0 log row. |
| 1.7.1 | 2026-09-18 | Note that a command palette, popover or context menu requested through `papi.overlays` follows the requesting pane's content scale automatically — nothing for the extension author to opt in. |
| 1.7.2 | 2026-09-21 | Note that a view mounting the Scripture editor inside a zoom area hands it that area's element (`EditorOptions.contextMenuContainer`) so the editor's right-click menu takes the area's zoom. |
| 1.7.3 | 2026-09-23 | Content Zoom Opt-In: an unmarked, undeclared view is not zoomed (no whole-view fallback); a view is zoomable only while a marked element is rendered. |
| 1.7.4 | 2026-09-23 | Pop-ups stay at interface scale: replace "Pop-ups follow their area" and the `papi.overlays` scaling note with one rule; `ContentZoomAreaProvider`, the pop-up attribute and `EditorOptions.contextMenuContainer` are gone. |
| 1.7.5 | 2026-09-23 | "Content Zoom Opt-In": mark the project text, not a content root — `ContentZoomRoot as="span"`, `ContentZoomTextProvider` / `useContentZoomTextProps` for library text, one id across many text elements, per-view inline zoom inside the marker. |
| 1.7.6 | 2026-09-23 | List the card, list and table reference implementations of text-level zoom markers (Find, the inventories, Checks, the Markers Checklist, the Lexical Tools dictionary) and note that these types are declared zoomable in core. |
