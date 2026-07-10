# A6 — Scripture Text Grid empty state (PT-4054)

**Ticket:** [PT-4054](https://paratextstudio.atlassian.net/browse/PT-4054) · **Epic:** [PT-4047](https://paratextstudio.atlassian.net/browse/PT-4047) · Resolves [PT-2983](https://paratextstudio.atlassian.net/browse/PT-2983)
**Size:** S · **Depends on:** an integrated A1–A5 base branch (see Branch strategy)

## Goal

When the Scripture Text Grid has nothing to render, show the user where to go next instead of a
blank pane. This covers **two** empty states:

1. **Grid body** — when the effective contents list is empty, render directional copy in the grid
   body pointing at the View Options icon in the header (the PT-2983 non-negotiable, #9 in the
   parent epic).
2. **View Options TEXTS list** — when the panel's TEXTS list has no rows, show a one-line prompt
   pointing at the Get Resources button, so the panel explains its next action instead of showing
   just a header and a button. (A polish item flagged during A5 review; sibling panels
   `model-text-panel` / `resource-text-panel` already do this.)

## Branch strategy

**A6 is based on the integrated `pt-4047-mvp-demo` branch** rather than doing any fork
reconciliation itself. `pt-4054-empty-state` is rebased onto it; the A6 PR then contains only the
two empty states, their strings, and their tests. A6 must not merge before `pt-4047-mvp-demo`.

Why the integrated base rather than stacking A6 on A5 alone:

- **A4 and A5 were parallel forks** — both rewrote `scripture-text-grid.web-view.tsx`, the
  `useTextCollectionSources` hook, and related files, and neither contained the other. Reconciling
  them is real integration engineering; `pt-4047-mvp-demo` already did it. Bundling that into A6
  would bury a small empty-state change under a large, conflict-prone diff.
- **The empty state needs the real renderer to be meaningful and testable.** On the integrated
  base, A6's non-empty branch is the actual `<ScriptureTextGrid>`, so the empty state is verifiable
  end-to-end (empty → prompt; check a resource → cells) instead of against a placeholder.

The integrated web view (verified in `pt-4047-mvp-demo`) already assembles everything A6 builds on:
A5's header (View Options button, theme-adaptive icon, tooltip) **+** the grid body
(`<ScriptureTextGrid>`, chapter-context split, Escape handling), the `{ sources, textConnectionPdp }`
hook shape, and `projectId ?? activeEditorProjectId` binding. The body computes
`resources = toGridResources(getScriptureTextGridContents(sources), cachedResources)` and renders
`<ScriptureTextGrid resources={resources} … />`.

**File-location note (differs from the standalone A4 branch):** the contents util is at top-level
`src/scripture-text-grid-contents.utils.ts` (A5's location won in the merge). Only the grid
*components* live in the `scripture-text-grid/` subfolder (`resource-cell.component.tsx`,
`scripture-text-grid.component.tsx`, `grid-resources.utils.ts`). A6's new empty-state component
joins that subfolder alongside the other grid components.

## Non-goals

- The verse-cell renderer, the View Options panel, and the A4↔A5 reconciliation — all inherited
  from the integrated base, not authored by A6.
- A loading spinner or a no-project-specific body message. A single message covers both the
  "no project bound" and "project bound, nothing checked" cases; the renderer owns richer body
  states.
- Any change to the data layer (`scripture-text-grid-contents.utils.ts`) or the persistence /
  sources hooks.

## Part 1 — Grid body empty state

**File touched:** the unified web view
`extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx` (from the
integrated base). It already computes
`resources = toGridResources(getScriptureTextGridContents(sources), cachedResources)` and renders
`<ScriptureTextGrid resources={resources} … />` inside a `tw:flex-1 tw:overflow-hidden` body div,
below A5's header.

**New file:**
`extensions/src/platform-scripture-editor/src/scripture-text-grid/scripture-text-grid-empty-state.component.tsx`
(the grid-subcomponent subfolder, alongside `resource-cell.component.tsx` /
`scripture-text-grid.component.tsx`) — a small presentational component that renders the centered
directional copy. It takes the resolved prompt string as a prop and holds no PAPI/state coupling.

Rationale for extraction: the web view binds `globalThis.webViewComponent` and uses PAPI hooks, so
it is not unit-testable; the ticket asks for a snapshot test. A tiny presentational component is the
clean, testable seam, and it makes the empty/non-empty branch an explicit conditional. Verified
against the base: `ScriptureTextGrid` has **no** empty state (an empty `resources` list renders a
`role="grid"` with an empty `role="row"` — a blank pane), so A6 owns the empty state outright with
nothing to de-duplicate.

**Component shape** (follows the [comment-list pattern](../../../extensions/src/legacy-comment-manager/src/comment-list.component.tsx) —
centered `Label` in a flex container; there is no reusable `EmptyState` in platform-bible-react):

```tsx
export function ScriptureTextGridEmptyState({ prompt }: { prompt: string }) {
  return (
    <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:p-4">
      <Label className="tw:text-center tw:text-muted-foreground">{prompt}</Label>
    </div>
  );
}
```

**Web-view wiring:** the body currently renders the grid unconditionally. A6 wraps it in an empty
conditional inside the existing `tw:flex-1 tw:overflow-hidden` body div:

- **Trigger = `resources.length === 0`** (the renderable-cell count), not the raw selector count.
  `toGridResources` omits any reference that can't resolve to an installed project id (e.g. a
  selected-but-not-yet-downloaded DBL resource). Keying on `resources` guarantees the user never
  sees a blank grid: they always get either cells or the directional empty state. This is a
  superset of the ticket's literal "`getScriptureTextGridContents` returns empty" trigger — it also
  covers the transient all-unresolved case. `resources` is already computed in the web view; no new
  selector call is needed.
- Body becomes:
  - `resources.length === 0` (and `!isLoadingLocalizedStrings`, so a raw key never flashes — the
    same guard the title effect uses) →
    `<ScriptureTextGridEmptyState prompt={localizedStrings[EMPTY_STATE_KEY]} />`
  - otherwise → the existing `<ScriptureTextGrid resources={resources} … />`, unchanged.
- Add the new key to the web view's `ALL_STRING_KEYS` so `useLocalizedStrings` fetches it.

A6 touches only the body branch; the header (with the View Options button) always renders above it,
so the copy has an on-screen target, and the renderer path is untouched in the non-empty case.

**New localized string** — `%webView_scriptureTextGrid_emptyState_prompt%`
- English: **"No texts to display. Open View Options to choose which texts to show."**
- Spanish: AI-generated to match (e.g. *"No hay textos para mostrar. Abre Opciones de vista para
  elegir qué textos mostrar."* — finalize in implementation).

## Part 2 — View Options TEXTS-list empty prompt

**Files touched (A5's):**
- `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.component.tsx`
- `extensions/src/platform-scripture-editor/src/resource-collection-options/resource-collection-options.types.ts`

**Behavior:** in the TEXTS `<section>`, when `top.length === 0 && bottom.length === 0 &&
installingResourceNames.length === 0` **and** no `disabledMessage` is currently shown, render a
one-line prompt. Styled identically to the existing disabled-message paragraph
(`tw:py-1 tw:text-sm tw:text-muted-foreground tw:italic`) so it reads as a sibling of the other
resource panels.

Precedence in the section: `disabledMessage` (when `disabled`) wins → else the empty prompt (when
the list is empty) → else the rows. The two never show together.

**New key** — added to the component's own key registry so the reusable component stays
self-contained (the coworker's dialog that consumes it inherits the prompt):
- `emptyTexts: '%webView_scriptureTextGrid_viewOptions_emptyTexts%'` added to
  `RESOURCE_COLLECTION_OPTIONS_KEYS` and `RESOURCE_COLLECTION_OPTIONS_STRING_KEYS`.
- English: **"No texts added yet. Use Get Resources to add texts to your collection."**
- Spanish: AI-generated to match (finalize in implementation).

## Localization

Both new keys land in
`extensions/src/platform-scripture-editor/contributions/localizedStrings.json` under both `en` and
`es`. English authored here; AI Spanish is acceptable in-sprint per the ticket.

## Testing

- **Panel prompt (unit):** extend `resource-collection-options.component.test.tsx` —
  (a) empty `top`/`bottom`/`installing` → prompt present;
  (b) any row present → prompt absent;
  (c) `disabled` + `disabledMessage` set → disabled message shown, empty prompt absent (no double
  message).
- **Grid empty state (unit / snapshot):** new
  `scripture-text-grid/scripture-text-grid-empty-state.component.test.tsx` — snapshot of the
  rendered prompt; assert the prompt text is present. The empty-vs-non-empty *decision* is
  `getScriptureTextGridContents(...).length === 0`, already covered by the contents-util test.
- **E2E:** extend `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts`. Because the
  integrated base carries A4's renderer, both branches are verifiable end-to-end: first open with
  nothing checked → grid body empty state visible and pointing at View Options; check a resource in
  View Options → empty state gone and cells render; empty View Options TEXTS list → panel prompt
  visible. Plus a Spanish-locale smoke that renders the Spanish strings.
- **Keyboard shortcuts catalog:** no keyboard handlers added → no catalog change.

## Definition of Done (from the ticket)

- [ ] Empty state renders when nothing is renderable (`resources.length === 0`), which includes the
      ticket's `getScriptureTextGridContents`-empty case.
- [ ] Copy points at the View Options icon.
- [ ] View Options TEXTS list shows a prompt when empty (the NIT).
- [ ] English + AI Spanish strings shipped for both keys.
- [ ] Snapshot + unit + manual smoke pass.
- [ ] PT-2983 closable once this lands.
