---
paths:
  - "lib/platform-bible-react/**"
  - "**/*.web-view.tsx"
---

# React Component Decisions

Design decisions for React components (not enforceable by linting).

## Colocation Principle

Create folder when component has 2+ of: test, story, types, utils

```
component-name/
├── component-name.component.tsx
├── component-name.stories.tsx
├── component-name.test.tsx
├── component-name.types.ts    # If props > 20 lines
└── component-name.utils.ts    # If has helpers
```

## Component placement: extension `src/` vs `lib/platform-bible-react`

- **Feature-specific UI lives in `extensions/src/{ext}/src/`.** `lib/platform-bible-react/` is the shared design system, reserved ONLY for multi-consumer reusable components.
  - Avoid: placing UI in `lib/platform-bible-react/` when only one feature ever consumes it; placing a genuinely cross-feature primitive inside a single extension's `src/`.
  - Why: a component with no multi-consumer story belongs to the owning extension. `inventory` (consumed by markers, characters, etc.) is a correct `lib/` resident; a single-feature dialog is not.

## Component Style Decisions

Terse decisions (choice → what to avoid → one-line why). Add only the net-new; don't restate what's already covered above.

### Component authoring

- **Functional components with hooks.**
  - Avoid: class components; HOCs for state management.
  - Why: modern React, simpler testing, cleaner code.

### Web view self-close (stopgap)

- **A web view closes itself with a DOM walk** (PAPI has no self-close method yet): from `window.top.document`, find the iframe whose `contentWindow === window`, walk up to the enclosing `.dock-panel`, then click `.dock-tab-active .dock-tab-close-btn`.
  - Avoid: re-deriving this each time; relying on it long-term once a PAPI self-close ships.
  - Why: documented stopgap until `papi.webViews.closeSelf()` exists on `@papi/frontend`. Web views are same-origin iframes, so `top.document` walking works; it is fragile against rc-dock DOM changes, so it is recorded here so agents don't re-invent it.

### Single-instance web views

- **Detect-and-reuse with the two-call pattern**: `papi.webViews.openWebView(type, layout, { ...options, existingId: '?', createNewIfNotFound: false })` → if the returned id is truthy, `papi.webViews.reloadWebView(type, id, options)` and return that id; otherwise call `openWebView` again without `existingId`.
  - Avoid: opening a second instance when only one of a web-view-type should be open at a time.
  - Why: `existingId: '?'` is PAPI's documented detect-and-reuse mechanism; `reloadWebView` hands fresh options to the existing instance. See `openManageBooks` / `openFind` in `extensions/src/platform-scripture/src/main.ts`.

### Web-view UI-state persistence

- **`useWebViewState<T>(key, default)` is scoped per-`webViewId`.** `openWebView` mints a new id on each call, so closing and reopening a web view starts with empty slots unless the tool deterministically reuses its id.
  - Avoid: assuming `useWebViewState` survives close/reopen; reaching for `papi.settings` (user-scoped) when you only meant per-instance state.
  - Why: id reuse is what makes state durable across reopen — the Find tool reuses the same id for the same project (see "Single-instance web views" above, the `existingId: '?'` detect-and-reuse path). Use `papi.settings` only when the state is genuinely per-user, not per-web-view. See [Component-Builder-Patterns.md](../../../.context/standards/Component-Builder-Patterns.md).

### Decoupling from unmerged lib work

- **When a component must depend on unmerged/unstable lib work (draft PRs), isolate via abstract props + callbacks** so a later phase swaps in the real component.
  - Avoid: importing a component from a branch you don't control; blocking a design-phase component on an unmerged dependency.
  - Why: a stand-in trigger that exposes the eventual component's surface as props (e.g. `comparativeTextsLabel` + `onComparativeTextsTriggerClick`) lets the integration step drop in the real component, a vendored copy, or a rebuilt one without rewriting the consumer.

### Variant/visibility logic from `projectInterfaces`

- **Drive variant/visibility logic from `projectInterfaces` capability predicates ("what can this project do?"), not a PT9-style `ProjectKind` typology.**
  - Avoid: a `'standard' | 'resource' | ...` enum gating which controls render or are enabled.
  - Why: PT10's extensibility model is interface-based — a project's interface list honestly reflects per-project capability, and adding a new project type via an extension PDPF should not require a global enum update. See `Paranext-Core-Patterns.md` for the full rationale and the metadata-read mechanics.

## Storybook Conventions

- **Hierarchy**: `'Basics/'`, `'Advanced/'`, `'Shadcn/'` based on complexity
- **Tags**: `['autodocs', 'test']` - enables docs + a11y checks
- **Sample data**: Extract to `.data.ts` if reused across stories

## Handler Naming Convention

| Prefix     | When to Use                                             |
| ---------- | ------------------------------------------------------- |
| `on*`      | Simple callbacks passed as props: `onSave`, `onChange`  |
| `handle*`  | Internal/story handlers: `handleUpdateComment`          |
| `can*`     | Permission checks: `canUserAssignThread`                |

## Accessibility Checklist

- Interactive elements need `aria-label` or visible text
- Keyboard navigation for custom controls (arrow keys, escape)
- Focus management with `aria-activedescendant` for listboxes

## shadcn Customization Markers

When you modify any vendored shadcn component (under `lib/platform-bible-react/src/components/shadcn-ui/` or any other `shadcn-ui/` subdir), every changed/added line MUST carry a `CUSTOM` marker so the diff against upstream is greppable.

**Patterns** (mirror the existing files for consistency):

- Multi-line regions → `/* #region CUSTOM <description> */ ... /* #endregion CUSTOM */`
- Inline single-line changes → `// CUSTOM: <description>` or `// CUSTOM <short description>` at end of line
- New top-level exports / functions / variables → `// CUSTOM: <description>` immediately above the declaration
- JSX additions → `{/* CUSTOM <description> */}`

**Examples**: `alert.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `menubar.tsx`.

**Verification**: before committing changes to any `shadcn-ui/` file, diff against the prior commit on the base branch and confirm every changed line is covered by a `CUSTOM` marker. Reviewers will grep for `CUSTOM` to find all customizations.

## What's Enforced by Linting (Don't Duplicate)

- Tailwind `tw:` prefix on utility classes → enforced by the project's Tailwind/ESLint config
- Localized strings → ESLint: no-hardcoded-jsx-strings
- ARIA localization → ESLint: require-localized-aria
- Theme colors → ESLint: no-hardcoded-tailwind-colors

See [Component-Selection-Quick-Reference.md](../../../.context/standards/Component-Selection-Quick-Reference.md).
