# A6 — Scripture Text Grid empty state (PT-4054)

**Ticket:** [PT-4054](https://paratextstudio.atlassian.net/browse/PT-4054) · **Epic:** [PT-4047](https://paratextstudio.atlassian.net/browse/PT-4047) · Resolves [PT-2983](https://paratextstudio.atlassian.net/browse/PT-2983)
**Size:** S · **Depends on:** A1 (PT-4049), A3 (PT-4051) · **Pairs with / stacked on:** A5 (PT-4053)

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

Rebase `pt-4054-empty-state` onto `pt-4053-view-options-panel` (A5). A6 becomes a stacked PR
(A3 → A5 → A6) and must not merge before A5.

Rationale — A5 has already rewritten `scripture-text-grid.web-view.tsx` into its final shape and
that shape is what A6 depends on:

- **Real data.** A5 replaced A1's persisted stub (`gridContentsIds`) with
  `useTextCollectionSources(effectiveProjectId)`, which yields the `TextCollectionSources` object
  that A6's trigger, `getScriptureTextGridContents(sources)`, consumes. On plain A3 only the stub
  exists, so A6 would be built against fake data and rewritten anyway.
- **A target to point at.** A5 added the View Options gear button (`Settings2`) in the header. The
  directional copy only makes sense with that icon present.
- **No same-file collision.** Both A5 and A6 heavily edit the web view. Stacking A6 on A5 avoids a
  painful merge conflict.

A5 currently sits on an older A3 tip (it is missing A3's last two review commits). That drift is
A5's to reconcile, not A6's; A6 simply branches from A5's tip as it stands.

## Non-goals

- The verse-cell row renderer (A4 / PT-4052). A6 renders only the empty branch of the body; A4
  fills the non-empty branch of the same conditional later.
- A loading spinner or a no-project-specific body message. A single message covers both the
  "no project bound" and "project bound, nothing checked" cases; A4 owns richer body states.
- Any change to A3's data layer (`scripture-text-grid-contents.utils.ts`) or A5's persistence /
  sources hooks.

## Part 1 — Grid body empty state

**File touched:** `extensions/src/platform-scripture-editor/src/scripture-text-grid.web-view.tsx`
(A5's version).

**New file:**
`extensions/src/platform-scripture-editor/src/scripture-text-grid-empty-state.component.tsx`
— a small presentational component that renders the centered directional copy. It takes the
resolved prompt string as a prop and holds no PAPI/state coupling.

Rationale for extraction: the web view binds `globalThis.webViewComponent` and uses PAPI hooks, so
it is not unit-testable; the ticket asks for a snapshot test. A tiny presentational component is the
clean, testable seam, and it makes the empty/non-empty branch an explicit conditional that A4 slots
into.

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

**Web-view wiring:**

- Add `getScriptureTextGridContents` to the existing import from `./scripture-text-grid-contents.utils`.
- Compute contents from the `sources` A5 already provides:
  `const contents = useMemo(() => (sources ? getScriptureTextGridContents(sources) : []), [sources]);`
- Replace the body seam `<div className="tw:flex-1" />` with a conditional:
  - `contents.length === 0` (and `!isLoadingLocalizedStrings`, so a raw key never flashes — same
    guard the title effect uses) → `<ScriptureTextGridEmptyState prompt={localizedStrings[EMPTY_STATE_KEY]} />`
  - otherwise → the existing `<div className="tw:flex-1" />` placeholder (A4 replaces this with the
    verse-cell row).
- Add the new key to `ALL_STRING_KEYS` so `useLocalizedStrings` fetches it.

The header (with the View Options button) always renders above the body, so the copy has an
on-screen target.

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
  `scripture-text-grid-empty-state.component.test.tsx` — snapshot of the rendered prompt; assert the
  prompt text is present. The empty-vs-non-empty *decision* is `getScriptureTextGridContents(...)
  .length === 0`, already covered by A3's `scripture-text-grid-contents.utils.test.ts`.
- **E2E:** extend `e2e-tests/tests/enhanced-resources/scripture-text-grid.spec.ts` — first open with
  nothing checked → grid body empty state visible and points at View Options; Spanish-locale smoke
  renders the Spanish string.
- **Keyboard shortcuts catalog:** no keyboard handlers added → no catalog change.

## Definition of Done (from the ticket)

- [ ] Empty state renders when `getScriptureTextGridContents` returns empty.
- [ ] Copy points at the View Options icon.
- [ ] View Options TEXTS list shows a prompt when empty (the NIT).
- [ ] English + AI Spanish strings shipped for both keys.
- [ ] Snapshot + unit + manual smoke pass.
- [ ] PT-2983 closable once this lands.
