# Sync: active project in the dialog, SBA blocking, sync details project — Implementation Plan

> **Frozen record** — plan as of 2026-10-27 for PT-4704. Once executed, the code is the authority.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync from the main menu or Ctrl+Shift+S ticks the active project in the sync projects dialog, Study Bible Additions (SBA) projects can't be selected or synced from the dialog or Home, and the Sync status window shows the open project.

**Architecture:** Nearly all of it is in the Send/Receive extension (paratext-bible-internal-extensions). `openSendReceive` resolves the active project with the window service, adds it to the saved selection, and tells an open dialog to re-sort. The dialog disables SBA rows. The sync state keeps the latest result per project, and the Sync status window reads the active project from the window service. paranext-core changes Home's Sync/Get, the type mirror, the C# doc comments, and the standards docs.

**Tech Stack:** TypeScript, React, Vitest + Testing Library, PAPI (`@papi/backend`, `@papi/frontend`).

**Spec:** [2026-10-27-sync-consistency-design.md](2026-10-27-sync-consistency-design.md)

## Global Constraints

- **Repos and branches:**
  - **paratext-bible-internal-extensions** (shortened to **PBIE** in this plan): create a new branch `pt-4704-sync-consistency` from `origin/main`. The local checkout is on an unrelated branch, so run `git fetch` first.
  - **paranext-core:** use the existing branch `pt-4704-sync-consistency`, which already holds the design.
  - **paratext-10-studio:** no change, and do not regenerate `repo-patches/*.patch` (that happens at the end-of-week build).
- PBIE paths below are relative to `src/paratext-bible-send-receive/` unless they start with `src/`.
- **Type mirror:** every PBIE change to `src/types/paratext-bible-send-receive.d.ts` is mirrored by hand into `paranext-core:src/@types/paratext-bible-send-receive/index.d.ts` (Task 7).
- **"Unsupported" means "has an `unsupportedReason`".** As of 2026-10-27 only SBA has one. Code checks `isUnsupportedProject(unsupportedReasons, id)`, never the project type.
- **Compare project IDs with `normalizeProjectId`** from `platform-bible-utils`, which upper-cases them. The shared-project list and editor web views are not guaranteed to agree on case.
- **Badge variants:** edited → `'default'` (primary); new → `'muted'`; unregistered → `'outline'` (unchanged).
- **New localized string:** `%syncStatus_noDetailsForProject%`, English "No sync details for this project yet." Add it wherever the existing `%syncStatus_noOpenProjects%` key appears in `contributions/localizedStrings.json`, following that file's convention for other languages.
- **Comments must be forward-facing:** no "previously" or ticket narration (`.claude/rules/code-quality/forward-facing-comments.md`).
- **Verification:** run lint, test and build per repo. Skip `npm run typecheck` in core; lint + build are enough.

## Review Focus

1. **Case mismatch between the active project ID and the shared list.** The pre-tick must still show as ticked, must not be pruned, and must not be duplicated. Test in Task 2.
2. **No focused window.** `getActiveEditorProjectId` throws, but the dialog must still open with the saved ticks. Test in Task 3.
3. **The shared list fails to load (offline), and a saved tick is an SBA.** The prune never runs, so Submit must still leave the SBA out. Test in Task 1.
4. **The active project is SBA, or not in the shared list (a resource tab in Power).** It must not end up ticked. Tests in Tasks 2 and 3.
5. **Sync is triggered while the dialog is already open with a different sort or a search filter.** The new tick is applied, the selection sort is re-taken only when the selection column is active, and the hidden-selected warning counts it. Test in Task 2.

---

### Task 1: SBA rows can't be selected in the dialog (PBIE)

**Files:**
- Modify: `components/send-receive-view.component.tsx`
- Modify: `send-receive.web-view.tsx`: the prune effect (`selectedProjectIds` / `sharedProjectsInfo`) and `submitSendReceive`
- Modify: `utils/unsupported-reasons.util.ts`: change the `UnsupportedReasons` doc ("They can still be synced") to say they can't be selected or synced from the dialog or Home
- Create: `utils/selection.util.ts`, `utils/selection.util.test.ts`
- Test: `components/send-receive-view.component.test.tsx` (flip any existing "stays selectable" assertions)

**Interfaces:**
- Produces, in new `utils/selection.util.ts`:
  - `pruneSelection(selectedIds: string[], sharedProjectsInfo: SharedProjectsInfo, unsupportedReasons: ReadonlyMap<string, unknown>): string[]`
    - Keeps only IDs present in the shared list, compared with `normalizeProjectId`.
    - Rewrites each kept ID to the shared list's own key spelling.
    - Drops unsupported projects and duplicates.
    - Preserves order.
  - `withoutUnsupported(ids: string[], unsupportedReasons: ReadonlyMap<string, unknown>): string[]`

- [ ] **Step 1: Write failing component tests**
  - `it('disables the checkbox of an unsupported project and ignores a row click')`:
    - `getRowCheckbox('SBA1')` is disabled.
    - Clicking `getRow('SBA1')` does not call `onChangeSelectedProjectIds`.
  - `it('leaves unsupported projects out of All, Edited and New, and out of their counts')`:
    - Fixtures: `abc` edited, `sba` edited + SBA.
    - Clicking All calls `onChangeSelectedProjectIds(['abc'])`.
    - The Edited badge reads `1`.
  - Keep the row's `unsupported-project` class and its reason text, and assert both.
- [ ] **Step 2: Write failing util tests in `utils/selection.util.test.ts`**
  - `pruneSelection(['abc', 'sba', 'gone'], {ABC, SBA}, reasons{SBA})` → `['ABC']`, where the shared keys are `'ABC'` and `'SBA'`.
  - `pruneSelection(['abc', 'ABC'], …)` → `['ABC']`.
  - `withoutUnsupported(['ABC', 'SBA'], reasons{SBA})` → `['ABC']`.
- [ ] **Step 3: Run and see them fail.** Run `npx vitest run src/paratext-bible-send-receive` from the PBIE root. Expect failures on the new tests.
- [ ] **Step 4: Implement.**
  - Component:
    - Pass `disabled={isUnsupported}` to the checkbox.
    - Make the row `onClick` a no-op when unsupported.
    - Build `filteredProjects`, used by All/Edited/New and the counts, without unsupported projects. Use a separate `selectableProjects` memo, so the rows still render.
    - Update the prop doc and the "Muted, not disabled" comment.
  - Web view: the prune effect uses `pruneSelection`, and writes only when the result differs from the current selection by value.
  - Submit passes `withoutUnsupported(selectedProjectIds, unsupportedReasons)` (Review Focus 3).
- [ ] **Step 5: Run the tests and see them pass.** Same command; expect all to pass.
- [ ] **Step 6: Commit** with message `PT-4704: Study Bible Additions projects can't be selected in the sync dialog`.

### Task 2: Badge colors, and the selection sorts first when the dialog opens or is asked to (PBIE)

**Files:**
- Modify: `components/send-receive-view.component.tsx`: `getBadgeVariantForEditedStatus`, the two filter-count `Badge`s, and a new prop
- Modify: `send-receive.web-view.tsx`: drives the new prop
- Test: `components/send-receive-view.component.test.tsx`

**Interfaces:**
- Produces a new prop on `SendReceiveViewProps`:
  - `selectionSortRequest: number`
  - Whenever its value changes and `sharedProjectsInfo` is loaded, the view takes the selection snapshot from `selectedProjectIds`, but only if `sortColumn === 'selection'`.
  - The web view starts it at `0`. It increments it once when both the shared list and the saved selection have loaded, and on every `onDidRequestProjectSelection` event (Task 3).
- Consumes `pruneSelection` from Task 1.

- [ ] **Step 1: Write failing tests**
  - `it('shows edited as primary and new as muted, in rows and filter counts')`: assert on the rendered badge's variant class. Check `platform-bible-react`'s `badge.tsx` for the class that identifies each variant.
  - `it('floats the saved selection to the top once a selection sort is requested')`:
    - Render with `selectedProjectIds: ['zzz']`, where `zzz` is unedited and last by default, and `selectionSortRequest: 0`.
    - Rerender with `selectionSortRequest: 1`. The first data row is now `zzz`.
  - `it('does not reorder on a request while sorted by name')`: click the Name header first, then raise the request; the order is unchanged.
  - `it('counts a newly ticked project hidden by the search filter')`:
    - Type a search that hides `abc`.
    - Rerender with `selectedProjectIds: ['abc']`.
    - The hidden-selected warning shows `1` (Review Focus 5).
- [ ] **Step 2: Run and see them fail.** Run `npx vitest run src/paratext-bible-send-receive/src/components`.
- [ ] **Step 3: Implement** the variant map, the two count badges (Edited `default`, New `muted`), the prop with a `useEffect` keyed on it, and the web view's counter.
- [ ] **Step 4: Run and see them pass.**
- [ ] **Step 5: Commit** with message `PT-4704: Sync dialog badge colors and selection-first order on open`.

### Task 3: `openSendReceive` ticks the active project (PBIE)

**Files:**
- Create: `select-active-project.ts`
- Create: `select-active-project.test.ts`
- Modify: `main.ts`: the `openSendReceive` handler, and a new network event
- Modify: `src/types/paratext-bible-send-receive.d.ts`:
  - the command signature
  - the event payload type
  - the `NetworkEvents` entry, matching how the file declares `onSyncStateChanged`
- Modify: `send-receive.web-view.tsx`: subscribe to the event with `useEvent`, as `sync-status.web-view.tsx` does

**Interfaces:**
- Produces:
  ```ts
  export type SelectActiveProjectDeps = {
    getActiveEditorProjectId: () => Promise<string | undefined>; // papi.window.getActiveEditorProjectId
    isUnsupported: (projectId: string) => Promise<boolean>; // local ProjectMetadata.unsupportedReason
    getSelectedProjectIds: () => Promise<string[]>; // papi.settings.get('paratextBibleSendReceive.selectedProjectIds')
    setSelectedProjectIds: (ids: string[]) => Promise<void>;
  };
  /** Adds the active project to the saved selection. Returns the id it ensured is ticked, or undefined. Never throws. */
  export async function selectActiveProject(
    deps: SelectActiveProjectDeps,
    projectIdsToSelect?: string[],
  ): Promise<string | undefined>;
  ```
- Command type: `'paratextBibleSendReceive.openSendReceive': (projectIdsToSelect?: string[]) => Promise<string | undefined>`
- Event: `'paratextBibleSendReceive.onDidRequestProjectSelection'`, payload `{ projectIds: string[] }`.
  - Fired after the setting is written, and only when a project was ticked.
  - The web view handles it by raising `selectionSortRequest`.
- `isUnsupported`: use the existing local-metadata lookup in `utils/local-project-metadata.util.ts` or `utils/unsupported-reasons.util.ts`. Read both and reuse whichever already returns a project's `unsupportedReason` from the backend. Don't add a second lookup.

- [ ] **Step 1: Write failing tests in `select-active-project.test.ts`**
  - It adds the active ID to an existing selection: `['A']` with active `'B'` → set to `['A', 'B']`; returns `'B'`.
  - It doesn't duplicate across case: `['abc']` with active `'ABC'` → no write; returns `'abc'`.
  - It skips an unsupported active project: no write; returns `undefined`.
  - When `getActiveEditorProjectId` rejects, there's no write and no throw; it returns `undefined` (Review Focus 2).
  - When there's no active project (`undefined`): no write.
  - When `projectIdsToSelect: ['C']` is given, `getActiveEditorProjectId` is not called and `'C'` is added.
- [ ] **Step 2: Run and see them fail.** Run `npx vitest run src/paratext-bible-send-receive/src/select-active-project.test.ts`.
- [ ] **Step 3: Implement `selectActiveProject`.** Then wire up `openSendReceive` in `main.ts`:
  1. `await selectActiveProject(realDeps, projectIdsToSelect)`.
  2. If it returned an ID, emit the event.
  3. Open or front the web view as today.
- [ ] **Step 4: Run and see them pass.** Run the full PBIE suite, `npm test`.
- [ ] **Step 5: Commit** with message `PT-4704: Sync ticks the active project in the sync projects dialog`.

### Task 4: Sync state keeps the latest result per project (PBIE)

**Files:**
- Modify: `sync-state.ts`
- Modify: `src/types/paratext-bible-send-receive.d.ts` (`SyncState`)
- Test: `sync-state.test.ts`

**Interfaces:**
- Produces a new `SyncState` field, `lastResultByProjectId: Record<string, ResultInfo>`.
  - It is keyed by `normalizeProjectId(id)`, and `getState` returns a fresh copy.
  - TSDoc: "The latest completed result for each project synced through this extension's wrappers this session. Syncs core runs directly (startup, project switch) are not included."
- The existing `lastResults` and `lastRequestedProjectIds` fields are unchanged.

- [ ] **Step 1: Write failing tests**
  - After `setResults(resultsFor('A'), ['A'])` and then `setResults(resultsFor('B'), ['B'])`, `getState().lastResultByProjectId` has both A and B.
  - A second result for A replaces the first one.
  - Only IDs in `projectIds` are stored. Connected resources in `resultsInfo` that aren't in `projectIds` are skipped, matching the window's existing rule.
- [ ] **Step 2: Run and see them fail.** Run `npx vitest run src/paratext-bible-send-receive/src/sync-state.test.ts`.
- [ ] **Step 3: Implement** with a `Map` inside `initSyncState`, merged in `setResults`.
- [ ] **Step 4: Run and see them pass.**
- [ ] **Step 5: Commit** with message `PT-4704: Keep the latest sync result per project`.

### Task 5: The Sync status window shows the open project (PBIE)

**Files:**
- Modify: `sync-status.web-view.tsx`
- Modify: `contributions/localizedStrings.json`: add `%syncStatus_noDetailsForProject%`
- Test: create `sync-status.web-view.test.tsx` if this view has no test yet. Follow the papi mocking used by the existing component tests. If mounting the whole web view is impractical, extract the render logic into `components/sync-status-view.component.tsx` with props and test that instead.

**Interfaces:**
- Consumes:
  - `SyncState.lastResultByProjectId` from Task 4
  - `useData(papi.window.dataProviderName).ActiveEditorProjectId(undefined, undefined)`; treat a `PlatformError` as `undefined`
- If extracted, the component props are:
  ```ts
  type SyncStatusViewProps = {
    projectId: string | undefined;
    syncState: SyncState | undefined;
    isLoading: boolean;
    localizedStrings: LocalizedStrings;
    unsupportedReasons: UnsupportedReasons;
    onSyncNow: (projectId: string) => void;
  };
  ```

- [ ] **Step 1: Write failing tests**
  - With project `B` and `lastResultByProjectId` holding only `A`, the window shows "No sync details for this project yet." and not A's row.
  - With project `A`, it shows A's full name and status.
  - Changing `projectId` from `A` to `B` re-renders to B's state.
  - The spinner shows only when `syncingProjectIds` contains the displayed project. With `isSyncing: true` but only `'Z'` syncing, it shows the project's result, not the spinner.
  - "Sync now" calls `onSyncNow('A')`.
  - With no project, the button is disabled and `%syncStatus_noOpenProjects%` shows.
- [ ] **Step 2: Run and see them fail.**
- [ ] **Step 3: Implement.**
  - "Sync now" sends `paratextBibleSendReceive.runManualSync` with `[projectId]` and `true`. This suppresses the toast, since in Simple the title bar shows progress, and records the result.
  - Remove the `syncTriggeredRef`/`noProjectsMessage` path; a missing project is now known up front.
  - Leave `syncOpenProjects` unchanged.
- [ ] **Step 4: Run and see them pass.** Run `npm test`.
- [ ] **Step 5: Commit** with message `PT-4704: Sync status window shows the open project`.

### Task 6: Home blocks Sync/Get for SBA (paranext-core)

**Files:**
- Modify: `extensions/src/platform-get-resources/src/home.component.tsx`: `syncOrGetButton`, `openButton`, and the row `onDoubleClick`
- Test: `extensions/src/platform-get-resources/src/home.component.test.tsx`

**Interfaces:**
- Hoist the reason-text logic from `openButton` into a component-local `getUnsupportedReasonText(project: MergedProjectInfo): string | undefined`, used by both buttons.
- `syncOrGetButton` mirrors `openButton`'s blocked form:
  - The button is `disabled`, inside `DisabledActionTooltip`.
  - The menu item is `aria-disabled` with `tw:opacity-50`, shows the reason inline, and its `onSelect` calls `preventDefault`.

- [ ] **Step 1: Write failing tests**
  - For an edited local SBA row, the Sync button is disabled and its tooltip shows the reason. In the narrow menu, Sync is `aria-disabled` and selecting it doesn't call `onSendReceiveProject`.
  - For a server-only SBA row, Get is disabled, and double-click doesn't call `onSendReceiveProject`.
  - A normal row's Sync still works. Use the existing SBA fixtures in this test file if it has them.
- [ ] **Step 2: Run and see them fail.** Run `npm test -- extensions/src/platform-get-resources/src/home.component.test.tsx`.
- [ ] **Step 3: Implement.** In `onDoubleClick`, return early on `project.unsupportedReason` before both branches, and update the "Only Open is blocked" comment.
- [ ] **Step 4: Run and see them pass.**
- [ ] **Step 5: Commit** with message `PT-4704: Home blocks Sync/Get for Study Bible Additions projects`.

### Task 7: Core type mirror, architecture decision, standards, and C# comments (paranext-core)

**Files:**
- Modify: `src/@types/paratext-bible-send-receive/index.d.ts`: mirror Tasks 3 and 4
  - the `openSendReceive` signature
  - the `onDidRequestProjectSelection` event
  - `SyncState.lastResultByProjectId`
  - the `getSyncState` doc
- Modify: `.context/standards/Architecture-Decisions.md`
  - Add a new entry `adr-sba-not-syncable-from-dialog-or-home`, inserted at its `LC_ALL=C sort` position. It records:
    - the decision
    - the UX source (PT-4704 DoD item 11, 2026-10-27)
    - the alternative it replaces
    - the consequence that scheduled syncs are left alone
  - In `adr-unsupported-project-reason`, mark the "must stay syncable" lines as superseded by the new slug. Don't delete them.
- Modify: `.context/standards/Paranext-Core-Patterns.md`: the rule that Send/Receive lists keep SBA selectable
- Modify: `c-sharp/Projects/ScrTextExtensions.cs`: the doc comments on `GetOpenBlockedReason` and `ThrowIfOpenBlocked` that say SBA can still be synced

- [ ] **Step 1: Find every place that needs changing.**
  - Run `grep -rn -i "syncable\|can still be synced\|stay selectable" .context/standards c-sharp/Projects extensions/src src/@types`.
  - Every hit is a candidate. Change it, or note why it's a false positive (per `.claude/rules/grep-safety-net.md`).
- [ ] **Step 2: Make the edits.**
- [ ] **Step 3: Verify.**
  - `LC_ALL=C sort` check: the new entry sits between the slugs before and after it.
  - Run `npm run lint`; it should be clean.
  - Run `dotnet build c-sharp/` (comments only); it should succeed.
- [ ] **Step 4: Commit** with message `PT-4704: Record that SBA projects can't be synced from the dialog or Home`.

### Task 8: Verify both repos and the app

- [ ] **Step 1: PBIE.** Run `npm run lint && npm test && npm run build`. All three should succeed.
- [ ] **Step 2: Core.** Run `npm run lint && npm test && npm run build`. All three should succeed.
- [ ] **Step 3: Manual check in the app** with both branches, using `/app-runner` and `/visual-verification`:
  1. **Simple:** with project A open and saved ticks `[B]`, use the main menu Project → Sync. The dialog shows A and B ticked, at the top.
  2. **Ctrl+Shift+S** behaves the same, on a studio build where the patch carries the chord.
  3. **Power:** focus a tab on project C, click the main menu, then Sync. C is added to the saved ticks.
  4. **Badges:** edited is primary and new is muted, in both the rows and the counts.
  5. **SBA in the dialog:** the row is greyed out, the checkbox is disabled, and All/Edited/New skip it.
  6. **SBA on Home:** Sync/Get are disabled with a tooltip.
  7. **Simple, Sync status window:** switch A → B, then "View sync details". It shows B with "No sync details for this project yet." Click "Sync now" and B's result appears. Switch back to A and A's earlier result shows, if one was recorded.
  8. **Item 6:** going from Simple to Power syncs only the active Simple project, in the background, with a Sonner.
- [ ] **Step 4: Push both branches.** Report the results of each manual check, including any that couldn't be run.
