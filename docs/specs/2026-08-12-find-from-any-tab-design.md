# Design — Open Find from any scripture tab type (PT-4341)

- **Ticket:** [PT-4341](https://paratextstudio.atlassian.net/browse/PT-4341) — "NN 1A Open Find from any scripture tab type"
- **Parent epic:** [PT-4336](https://paratextstudio.atlassian.net/browse/PT-4336) — "Saroj and Donna can trust the app"
- **Date:** 2026-08-12
- **Status:** Approved design, not yet implemented (living document — follow the code once it lands).

## Problem

Invoking Find (Ctrl+F) only resolves the correct source when it comes from a scripture
**editor** tab (`platformScriptureEditor.react`). Opening Find from a **model text**,
**commentary**, or **Bible text** tab either fails to set the right source or opens an extra
panel instead of bringing Find to the front with the right context.

Per the acceptance criteria, opening Find from each of those tabs must set the search source to
**the resource displayed in that tab**, and invoking Find must bring the Find tab to the front
with that source pre-selected.

## Findings (verified against the code)

### Tab-type taxonomy (all provided by the `platform-scripture-editor` extension)

| Tab (ticket wording) | Web view type | Column (Simple) | Find trigger today |
| --- | --- | --- | --- |
| Scripture editor | `platformScriptureEditor.react` (`SCRIPTURE_EDITOR_WEBVIEW_TYPE`) | 2 | ✅ Ctrl+F handler + top-menu item |
| Model text | `platformScriptureEditor.modelText` | 1 | ❌ none |
| Bible text | `platformScriptureEditor.bibleTexts` | 3 | ❌ none |
| Commentary | `platformScriptureEditor.commentaries` | 3 | ❌ none |

The Bible-texts and commentaries panels share one component,
`resource-text-panel.web-view.tsx` (the provider injects `resourceType`).

### Two real problems (not the one the ticket's "Implementation Ideas" assumed)

1. **No trigger.** Only `platformScriptureEditor.react` has a Find entry point — a menu item
   (`contributions/menus.json`) and a Ctrl+F handler
   (`platform-scripture-editor.web-view.tsx`, the `event.ctrlKey && key === 'f'` listener). The
   three panels have none.

2. **The source is not the panel's definition `projectId`.** `openFind`
   (`extensions/src/platform-scripture/src/main.ts`) resolves the source from
   `webViewDefinition.projectId`. For these panels that field is the **container / translation
   project**, not the resource on screen. The displayed resource lives in React state:
   - Resource panels → `resourceProjectId` (derived from `selectedResourceId`) in
     `resource-text-panel.web-view.tsx`.
   - Model text → `modelResourceProjectId` (from `effectiveModelTexts.items[0]` matched to an
     installed DBL resource) in `model-text-panel.web-view.tsx` — the file even carries a comment
     spelling out that the definition `projectId` ≠ the rendered resource.

   The ticket's suggestion to resolve the project from `getAllOpenWebViewDefinitions()` filtered
   by type would therefore return the **wrong** project. The correct source must come from the
   panel's own state at invocation time.

### Dependencies / neighbours

- **NN 1B / PT-3362** (a source picker inside Find) is **not** merged on this branch. Find's
  source is entirely whatever `openFind` passes as `projectId`. Nothing to integrate with; the
  passed `projectId` simply becomes Find's source.
- **NN 1C / PT-4342** (Find as a fixed Column-3 tab + bring-to-front) is **To Do**. Column 3
  today holds bibleTexts, commentaries, and the comment list — no Find tab. Today `openFind`
  opens Find as a panel to the *right* of the calling tab, which is exactly the "opens an
  additional panel" symptom — and that placement is PT-4342's domain. The epic's critical path
  lists PT-4341 *before* PT-4342, so this design makes PT-4341 self-contained (see Decisions).

## Decisions

1. **Entry point: Ctrl+F only** for the three panels (mirrors the editor's Ctrl+F). The panels
   have no menu bar today; adding menu infrastructure is out of scope. (User-approved.)
2. **Self-contained PT-4341**: include the minimal Column-3 Find-tab placement here so the ticket
   is demoable on its own, matching the epic's critical-path ordering. PT-4342 later owns/refines
   the layout. (User-approved.)

## Design

### 1. `openFind` — accept an explicit source, and type-gate `editorWebViewId`

`extensions/src/platform-scripture/src/main.ts`, function `openFind`.

New signature: `openFind(editorWebViewId?, selectedText?, sourceProjectId?)`.

- **Source:** `projectId = sourceProjectId ?? webViewDefinition?.projectId`. The editor path
  passes two args (unchanged); the panels pass an explicit `sourceProjectId` (the displayed
  resource). The `webViewId` still supplies scroll-group and (power-mode) placement context.
- **`editorWebViewId` type-gate (correctness fix from adversarial review):** only forward
  `editorWebViewId` to the Find web view when the triggering web view is actually
  `platformScriptureEditor.react`; otherwise pass `undefined`.

  *Why:* the read-only panels register **no** web view controller. If Find receives a panel id in
  its `editorWebViewId` slot, `useWebViewController('platformScriptureEditor.react', panelId)`
  does **not** resolve to `undefined` gracefully — it hangs ~20s in `waitForNetworkObject`, then
  rejects, and `usePromise` never catches it, producing an unhandled-rejection `logger.error` on
  every mount. Passing `undefined` is genuinely harmless (Find's controller uses are all guarded).
  This also honours the existing contract: `FindWebViewOptions.editorWebViewId`'s own TSDoc says it
  "should be of webViewType `platformScriptureEditor.react`".

Update the command metadata (`params`) and the `.d.ts` `CommandHandlers['platformScripture.openFind']`
signature + TSDoc to document the new `sourceProjectId` param and *why* it exists (displayed
resource ≠ the panel's definition project).

To keep this testable, extract the resolution into a small pure helper, e.g.
`resolveFindInvocation({ webViewDefinition, sourceProjectId, editorWebViewId })` →
`{ projectId, editorScrollGroupId, tabIdFromWebViewId, editorWebViewIdForFind }`, and unit-test the
source override/fallback **and** the `editorWebViewId` type-gate (a regression test for the defect
above).

### 2. Ctrl+F handler in the two panel web views

Mirror the editor's handler (`window` `keydown`, `event.ctrlKey && key.toLowerCase() === 'f'`,
`preventDefault`, capture `window.getSelection()?.toString()`).

- `model-text-panel.web-view.tsx`: on Ctrl+F, if `modelResourceProjectId` is defined, send
  `platformScripture.openFind(webViewId, selection, modelResourceProjectId)`.
- `resource-text-panel.web-view.tsx` (covers **both** Bible-texts and commentaries): on Ctrl+F,
  if `resourceProjectId` is defined, send
  `platformScripture.openFind(webViewId, selection, resourceProjectId)`.

Both **gate on a resolved resource** — if none is displayed (empty / loading / install-failed),
Ctrl+F is a no-op (never falls back to searching the container project). Both components must
destructure `webViewId` from `WebViewProps`.

Implementation notes:
- Register the `useEffect` **before** the components' early returns (rules of hooks), with
  `webViewId` + `resourceProjectId` / `modelResourceProjectId` in the dependency array to avoid a
  stale-closure source.
- macOS uses **⌃F** (Ctrl, not ⌘) intentionally, matching the editor handler.
- Each web view is its own iframe with its own `window`; a hidden (`display:none`) sibling panel
  receives no keydown, so there is no cross-panel double-fire.
- Extract the "should I open, and with what args" decision into a tiny pure helper so the
  no-resource no-op gate is unit-testable without mounting the web view.

### 3. Self-contained Column-3 placement

Add a Find tab to Column 3 of `src/renderer/components/docking/simple-layout.data.ts`, following
the existing bibleTexts/commentaries tab shape, and update the tab-count assertion in
`simple-layout.data.test.ts` (3 → 4).

- Seed the tab with the exact `findWebViewType` value (`'platformScripture.find'`) and a fresh
  unique GUID where the tab `id` and `data.id` are identical (matching the file's convention).
- **No `openFind` placement change is needed.** Its existing `existingId: '?'` +
  `bringToFront: true` finds the seeded tab and brings it to front *in place*, returning before
  the layout argument is consumed — which also removes the "stray additional panel" symptom (the
  `direction: 'right'` branch is only reached when no Find view exists). Power mode is untouched
  (it never loads `simpleLayout`), so a panel Ctrl+F in power mode still opens Find to the right
  of the panel with the correct source — acceptable.
- The seeded tab renders as a usable-but-inert Find shell until first invoked (verified: no crash,
  no log spam with `projectId === undefined`). It gains a source picker when PT-3362 lands.
- The tab lands in the `TAB_GROUP_RESOURCES` group — confirm this is the intended group for Find.

### 4. Keyboard shortcuts catalog

Update the existing `scripture-find` entry in `src/stories/keyboard-shortcuts.data.ts` — extend
its `context` and `locations` to include the model-text, Bible-texts, and commentaries panels (the
new handler files). Do not add a duplicate entry.

## Adversarial verification (what was checked before committing to this design)

- **Layout surfacing:** Simple mode is stateless — `loadLayout` re-reads the `simpleLayout`
  constant on every startup and mode switch; `saveLayout` no-ops in Simple. A new Column-3 tab
  surfaces for fresh installs *and* existing users with **no migration**.
- **Bring-to-front:** on the `existingId: '?'` found path, `openWebView` activates/reveals the tab
  in place and returns **before** the `{type:'panel',direction:'right'}` layout arg is used — no
  stray panel, no re-dock.
- **Search on resources:** the Scripture Finder PDPF layers over the five interfaces
  (`platform.base`, `USX_Book/Chapter`, `USFM_Book/Chapter`) that **every** resource advertises
  (DBL Bible text, DBL commentary, project reference), registered globally with no editability
  gate — so `findInScripture` genuinely works on all three. (Replace on a resource correctly
  throws `AttemptedResourceWritingException`; Replace is removed in Simple anyway.)
- **Undefined projectId + mismatched controller:** the seeded Find tab renders safely with
  `projectId === undefined`; the panel-id-as-`editorWebViewId` hazard is real (20s hang +
  unhandled rejection) and is the reason for the type-gate in change 1.

## Testing

- **Unit (meaningful, not trivial):**
  - `resolveFindInvocation` helper — `sourceProjectId` overrides the definition project; falls
    back to `def.projectId` when absent; `editorWebViewIdForFind` is passed through only for
    `platformScriptureEditor.react` and is `undefined` for panel types (regression test for the
    controller-hang defect).
  - Panel "should-open / with-what" helper — returns args when a resource is resolved, no-op when
    not.
- **Manual verification:** in Simple mode, open a project; from each of the model-text,
  Bible-texts, and commentaries tabs (with a resource displayed) press Ctrl+F and confirm Find
  comes to the front in Column 3 with that resource as the source and runs a search; confirm no
  second Find panel appears; confirm a cold-start first-invoke focuses the seeded tab (timing
  smoke test); confirm Ctrl+F is a no-op when no resource is displayed.
- **E2E:** full E2E for the panels needs installed DBL resources (enhanced-resources tier) and is
  left out of the default set; the editor Find E2E (`find-replace.spec-e2e.ts`) is unaffected.

## Scope

**In scope:** explicit source in `openFind` + `editorWebViewId` type-gate; Ctrl+F triggers in the
two panel web views; minimal Column-3 Find tab (+ test update); keyboard-shortcuts catalog update;
the unit tests above.

**Out of scope / follow-ups (flagged, not silently dropped):**
- Pre-fill from the current selection is passed exactly as the editor does it; it overlaps the
  NN 1A nice-to-have PT-3216 and is trivially trimmable if the team wants selection handled only
  there.
- Result-click navigation *into* a resource panel depends on that panel having a scroll group; the
  seeded col-3 resource tabs carry `state: {}` (likely no scroll group), so this may be a no-op.
  Documented as a deliberate limitation (per the cross-view-sync-hidden-views rule); refine under
  PT-4342 / PT-4343 if desired.
- No-resource Ctrl+F is a silent no-op; "let the user pick a source instead" belongs with PT-3362
  (picker) / PT-4343 (feedback).

## Risks & coordination

- **PT-4342 overlap:** the Column-3 layout change here *is* the core of NN 1C. When PT-4342 lands
  it must not double-add the Find tab, and its "3 → 4 tabs" test edit overlaps this one. Treat this
  layout change as "the 1C layout change, landed early via 1A," and coordinate the merge order.
- **Cold-start timing:** `existingId: '?'` reads the live rc-dock tree; the very first `openFind`
  after a cold start into Simple mode should be smoke-tested to confirm it focuses the seeded tab
  rather than opening a second one.
