# Sync: open the dialog on the active project, block Study Bible Additions, show the open project's details

> **Frozen record** — approved design as of 2026-10-27, for the `pt-4704-sync-consistency` branch in
> paranext-core and the matching branch in paratext-bible-internal-extensions.
> Once implemented, the code is the authority; read the current files rather than this document.

PT-4704 · Timing: Release Required · related PT-4936 (the rest of the ticket), PT-4483 (startup scope)

## Problem

PT-4704 lists thirteen sync problems. Its Definition of Done narrows this ticket to four:

1. **Item 6.** Switching from Simple to Power syncs only the active Simple project, in the
   background, with a Sonner. Already reported as working; confirm on the release-candidate build.
   **No code.**
2. **Item 10.** Sync from the main menu or Ctrl+Shift+S opens the "sync projects" dialog with the
   active project selected, selected projects at the top, and corrected badge colors.
3. **Item 11.** Study Bible Additions (SBA) projects can't be selected or synced from the sync
   projects dialog or from Home.
4. **Interim fix for Observed Problem 5.3.** The Sync status window (title bar sync button →
   "View sync details") shows the project the user just left. It must show the open project.

Everything else in the ticket (items 1–5, 7–9, 12, 13, the full fix for 5.3/5.4, and parts 6.1/7.1)
is out of scope — see [Out of scope](#out-of-scope).

### What the code does today (origin/main, 2026-10-27)

- **Sync command.** The menu item (`paratext-bible-internal-extensions:src/paratext-bible-send-receive/contributions/menus.json`)
  and the Ctrl+Shift+S chord (a main-process `before-input-event` branch that exists only in
  `paratext-10-studio:repo-patches/paranext-core.patch`, `isOpenSyncChord`) both run
  `paratextBibleSendReceive.openSendReceive` with **no arguments**. Its handler
  (`paratext-bible-internal-extensions:src/paratext-bible-send-receive/src/main.ts`, ~line 731)
  opens the floating web view with `existingId: '?'`, so an already-open dialog is only brought to
  the front. Nothing looks at the active project, and nothing branches on interface mode.
- **Dialog selection.** `send-receive.web-view.tsx` keeps the ticks in the hidden user setting
  `paratextBibleSendReceive.selectedProjectIds`. It is **shared by both modes** and saved on every
  tick. IDs not in the shared-project list are pruned once the list loads.
- **Dialog order.** `send-receive-view.component.tsx` sorts by a selection *snapshot* first, then
  edited → new → rest. The snapshot starts empty and is only taken when the user clicks the Edited
  or New quick-select buttons, so on open ticked projects are **not** at the top.
- **Dialog badges.** Row status: `new` → `default` (primary), `edited` → `secondary`. Filter counts:
  Edited → `secondary`, New → `default`. The ticket wants the reverse: edited `primary`, new `muted`.
- **SBA.** The C# side marks SBA projects with a `%project_unsupported_studyBibleAdditions%` reason
  (`c-sharp/Projects/ScrTextExtensions.cs`, `GetOpenBlockedReason`). It reaches the UI as
  `SharedProjectInfo.unsupportedReason` (filled server-side by the Send/Receive service in the
  paratext-10-studio core patch) and as `ProjectMetadata.unsupportedReason`. The dialog
  (`useUnsupportedReasons` hook) greys the row out and shows the reason, **but it stays selectable**,
  and All/Edited/New include it. Home greys the row and disables **Open**, but **Sync/Get stay
  enabled**. This is deliberate: `adr-unsupported-project-reason` in
  `.context/standards/Architecture-Decisions.md` says SBA projects "must stay syncable", and
  `Paranext-Core-Patterns.md` repeats it.
- **Sync status window.** `sync-status-button.component.tsx` (paranext-core) "View sync details"
  sends `paratextBibleSendReceive.openSyncStatus` with no arguments. The provider ignores options;
  the web view (`sync-status.web-view.tsx`) renders `getSyncState()` — **one in-memory, app-wide
  record of the last completed run** (`sync-state.ts`, overwritten by every `setResults`). Only the
  extension's own wrappers write it (`runManualSync`, `syncOpenProjects`, `runScheduledSync`). The
  Simple project-switch sync (`syncOnProjectSwitch` in
  `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts`) and the Simple
  startup sync (`src/main/startup-tasks.ts`) call the C# commands directly and never write it. So
  after a switch the window still shows the old project. Its "Sync now" calls `syncOpenProjects`,
  which syncs every open editor's project — the current one.

## Decisions

These were decided with the developer (Levi) and, for 10.1, by UX (Ian, in the ticket).

1. **Both modes open the dialog.** In Simple, Sync from the main menu or Ctrl+Shift+S does not
   sync directly; it opens the sync projects dialog, as in Power. (Ticket DoD 10.1, as updated by
   Ian.) Both entry points already open the dialog in both modes today; the change is which project
   is ticked.
   - **Tentative (Levi is confirming with the ticket author):** the Scripture editor's own toolbar
     item "Sync &lt;project name&gt;" (`paratextBibleSendReceive.sendReceiveProjectsByWebViewId`,
     group `platform.projectTop`) is unchanged. It keeps syncing that editor's project directly,
     in both modes. If this flips, it would instead call `openSendReceive` with that editor's
     project in `projectIdsToSelect`.
2. **Keep the saved ticks, add the active project.** In both modes the remembered selection stays
   ticked; the active project is ticked in addition if it isn't already. The addition is saved like
   a user tick. The dialog does not reset the selection, and Simple and Power keep sharing one saved
   list.
3. **Active project.** Simple: the project shown in the editor. Power: the project of the active
   (focused) tab.
4. **Selected projects float to the top on open.** The selection snapshot is taken when the dialog
   opens (after the active project is added), so ticked projects lead the list. Ticking and
   unticking afterwards does not re-sort; Edited/New quick-select re-snapshot as today.
5. **Badge colors.** `edited` → `primary` (`default` variant); `new` → `muted`. The same for the
   Edited/New filter-count badges.
6. **SBA projects are greyed out and can't be selected.** In the dialog they stay listed and greyed
   with the reason icon, but the checkbox is disabled. They are not removed from the list. On Home,
   their Sync/Get action is disabled with the same reason, alongside the Open that is already
   disabled. This supersedes the "must stay syncable" part of `adr-unsupported-project-reason`:
   the most recent UX decision (this ticket) wins.
7. **The Sync status window shows the open project.** It shows the project the user has open — the
   one its "Sync now" syncs — with that project's last recorded result this session, or a "no
   details for this project yet" message. It re-targets when the window is reopened or the project
   changes while it is open. Recording the automatic startup/switch syncs is PT-4936; until then,
   "no details yet" right after a switch is the accepted interim state (ticket DoD wording).

### Calls made by the author (not discussed — check these)

- **Power, no project in the active tab** (Home, a dialog, a non-project web view): nothing is
  added; the dialog opens with the saved ticks as today.
- **Dialog already open** when Sync is triggered again: it comes to the front **and** the active
  project is ticked in it.
- **Active project is an SBA:** it is not ticked (decision 6 wins over decision 2).
- **A saved tick that is an SBA** (ticked before this change) is dropped from the selection once the
  shared-project list loads, so it can't be synced by accident.
- **All / Edited / New quick-select skip SBA projects, and the Edited/New counts leave them out.**
- **Home double-click** on a server-only SBA no longer Gets it (it is the same action as Get).
- **Scheduled and automatic syncs are left alone.** Only the dialog and Home change, as the ticket
  names. A Power user who already scheduled an SBA keeps that schedule. Simple can't open an SBA, so
  the switch sync never targets one.
- **Last result per project, in memory.** `sync-state.ts` keeps the latest result per project
  (merged on each `setResults`) instead of only the last run. Not persisted across restarts.
- **The window's "Sync now" syncs the project the window shows**, not every open editor. In Simple
  those are the same project.
- **The window's spinner shows only while the displayed project is syncing**
  (`syncingProjectIds`), not while any sync runs.
- **The window only exists in Simple.** It is opened from the title-bar sync button, which renders
  only in Simple (`platform-bible-toolbar.tsx`), so its project resolution needs no Power branch.
- **No last-sync-time fallback** in the window. `SharedProjectInfo.lastSendReceiveDate` exists but
  needs the server; the ticket's wording ("or a message that there are no details for it yet")
  doesn't ask for it.

## Components

Three repos. All changes branch from each repo's **origin/main** — the local
paratext-bible-internal-extensions checkout is on an old feature branch, and the other two local
`main`s were behind at the time of writing.

### paratext-bible-internal-extensions — `src/paratext-bible-send-receive/`

**`main.ts` — `openSendReceive`**

- Resolves the active project itself, so the menu item (which can't pass arguments) and the
  Ctrl+Shift+S chord both work without changes to the core patch:
  - read `platform.interfaceMode`;
  - Simple: the first `platformScriptureEditor.react` web view's `projectId`
    (`findFirstEditorWebViewDefinition` over `papi.webViews.getAllOpenWebViewDefinitions()` — the
    same rule the renderer's project picker uses);
  - Power: `papi.window.getFocus()` → `getWebViewIdFromFocusSubject` →
    `papi.webViews.getOpenWebViewDefinition(id)?.projectId` (the pattern `runAppChord` uses for
    Project settings).
- Optionally accepts `projectIdsToSelect?: string[]` for other callers; when given, it is used
  instead of resolving. Update the command's type in
  `src/types/paratext-bible-send-receive.d.ts` **and** core's copy in
  `paranext-core:src/@types/paratext-bible-send-receive/index.d.ts`.
- Adds the resolved project to `paratextBibleSendReceive.selectedProjectIds` (skip if already there,
  or if its metadata carries an `unsupportedReason`), then opens or fronts the web view. Writing the
  setting before opening means an already-open dialog picks the tick up through `useSetting`.
- The builder must verify that clicking the main menu doesn't move the focus subject off the
  active tab. If it does, resolve the project in a way that survives the menu click (for example the
  last-focused tab).

**`send-receive.web-view.tsx` / `components/send-receive-view.component.tsx`**

- Take the selection snapshot once the shared-project list and the saved selection are both loaded
  on open, and again whenever `openSendReceive` adds a tick to an open dialog. The builder chooses the
  mechanism; a counter or timestamp the command writes would work.
- Badge variants per decision 5, for the row status and the two filter counts.
- SBA rows (any project in `unsupportedReasons`): checkbox disabled; excluded from All/Edited/New
  and from the counts; pruned from the saved selection alongside the existing invalid-ID prune.
  Keep the existing greyed style and reason icon. Update the `unsupportedReasons` prop doc
  ("stay selectable and syncable") to match.

**`sync-state.ts`, `sync-status.web-view.tsx`, `main.ts` — Sync status window**

- `sync-state.ts`: keep a `Map<projectId, ResultInfo>` (latest per project), merged on each
  `setResults`. Keep the existing last-run fields if other consumers need them.
- The window targets one project: the open project, resolved the same way as Simple's active
  project above. It re-resolves when the window opens or is fronted and when the open editor's project
  changes (`onDidOpenWebView`/`onDidUpdateWebView`/`onDidCloseWebView`, or the scripture editor's
  `onDidSwitchProject`). The builder chooses whether the web view or the extension backend resolves
  it.
- Render that project's stored result, or a new "no details for this project yet" string (add a
  localized-string key; don't reuse `%syncStatus_dialog_idle%`, which says no sync has run at all).
- "Sync now" syncs the displayed project (through the same wrapper, so its result is recorded),
  not all open editors. Keep `syncOpenProjects` itself unchanged for its other callers.

### paranext-core

**`extensions/src/platform-get-resources/src/home.component.tsx`**

- For a row with an `unsupportedReason`, disable Sync/Get the same way Open is already disabled:
  `DisabledActionTooltip` with the reason, `aria-disabled` menu items, and no Get on double-click.

**`src/renderer/components/sync-status-button.component.tsx`**

- No change is required if the extension resolves the open project itself. If the builder chooses
  instead to pass the current project from the title bar (`useProjectPickerData().currentSimpleProject`),
  `openSyncStatus` gains an optional `projectId` and core's type copy is updated.

**`.context/standards/Architecture-Decisions.md`**

- Add a new entry, in byte-order slug position, recording that SBA projects can't be selected or
  synced from the sync projects dialog or Home, and why (UX, PT-4704). Include the author's call
  about scheduled syncs. Mark the "must stay syncable" parts of `adr-unsupported-project-reason` as
  superseded by it, without deleting them.
- Update the matching rule in `.context/standards/Paranext-Core-Patterns.md`, and the doc comments
  on `GetOpenBlockedReason` and `ThrowIfOpenBlocked` in `c-sharp/Projects/ScrTextExtensions.cs`
  that say SBA projects can still be synced. (As of origin/main on 2026-10-27, SBA is the only type
  `GetOpenBlockedReason` blocks, so "has an `unsupportedReason`" means SBA.)

**`src/shared/data/keyboard-shortcuts.data.ts`** — no change. The Ctrl+Shift+S entry lives in the
studio patch, and the chord's command is unchanged.

### paratext-10-studio

No change. The chord handler keeps sending `openSendReceive` with no arguments. This ticket does
not regenerate `repo-patches/paranext-core.patch`; that happens once at the end-of-week build.

## Hidden case

The dialog and the Sync status window are floating web views, not docked tabs, so they are visible
whenever they are open. The one hidden-tab case is the **Sync status window following a project
switch**: it reacts to data (which project is open), not layout. While it is open it re-targets on
the change event, and on reopen or front it re-resolves. No catch-up mechanism is needed.

## Testing

- **internal-extensions, unit (Vitest):**
  - active-project resolution: Simple (first editor), Power (focused tab), Power with no project,
    SBA active project not added, already-ticked project not duplicated;
  - dialog: ticked projects sorted first on open; SBA checkbox disabled; All/Edited/New skip SBA
    and the counts exclude it; saved SBA tick pruned; badge variants;
  - `sync-state.ts`: per-project results merge, so A's result survives a later run for B;
  - Sync status window: renders the open project's result, the "no details yet" message, and
    re-targets on a project change; its "Sync now" syncs only the displayed project.
- **paranext-core, unit:** Home row with an `unsupportedReason` has Sync/Get disabled with the
  reason, and double-click doesn't Get.
- **Manual, on the release-candidate build:**
  - Item 6: Simple → Power syncs only the active Simple project, in the background, with a Sonner.
  - Menu and Ctrl+Shift+S in both modes.
  - Switch project in Simple, then "View sync details".

## Out of scope

- **PT-4936 (Release Required):** items 4, 5, 7, 8, 9; the full fix for 5.3 and 5.4 (recording the
  results of automatic startup and switch syncs so the title bar and the window know them); and the
  "ideally" parts 6.1 and 7.1.
- **Not this release:** items 1, 2, 3 (tracked in PT-4483), 12 and 13.
- Blocking SBA in scheduled or automatic syncs.
