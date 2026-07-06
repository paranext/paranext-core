# Reference History (Back/Forward Navigation) — Design

**Date:** 2026-07-06
**Tickets:** [PT-4034](https://paratextstudio.atlassian.net/browse/PT-4034) (history service + commands), [PT-4035](https://paratextstudio.atlassian.net/browse/PT-4035) (toolbar UI), [PT-4033](https://paratextstudio.atlassian.net/browse/PT-4033) (history keyboard shortcuts only)
**Epic:** [PT-4031](https://paratextstudio.atlassian.net/browse/PT-4031)
**Paratext 9 references:** `WindowCollectionBase.cs:56-351`, `ParatextBase.cs:22-59`, `WindowManagerHelper.cs`, `MainForm.cs:119-120`, `MainForm.Designer.cs:263,275`

## Goal

Give users browser-style back/forward navigation through the scripture references they have
visited, per scroll group, matching Paratext 9 behavior: toolbar split buttons with history
dropdowns, keyboard shortcuts, and PAPI commands.

## Non-goals

- BCV navigation commands and their shortcuts (next/previous chapter/book/verse, focus
  reference box) — those are PT-4032 and the rest of PT-4033.
- Persisting history across app restarts (session-only, matches PT9).
- A general user-configurable keybinding registry (explicit epic no-go).
- Wiring `platform.interfaceLanguage` to UI layout direction. Direction remains
  `localStorage['layoutDirection']` read via `readDirection()`; wiring the interface language to
  it is a possible follow-up ticket, not part of this work.

## Background

### Paratext 9 behavior (parity target)

- Two stacks per scroll group: back stack (index 0 = **current** location) and forward stack.
- On every navigation to a new reference:
  - Same book **and** chapter as the current top → replace the top entry in place (verse-only
    moves never add history entries; the forward stack is preserved).
  - Otherwise → clear the forward stack; if the top 4 back-stack entries are all the same book
    as the incoming ref, remove index 3 (caps runs of one book); insert at index 0; trim the
    back stack to depth 20.
- Back requires ≥ 2 back-stack entries (top is the current location); forward requires ≥ 1
  forward-stack entry. Back moves the top to the forward stack and navigates to the new top;
  forward is symmetric.
- Dropdown jump to an arbitrary entry transfers all intervening entries to the opposite stack.
- Dropdown items are labeled `<localized book id> <chapter>:<verse>` (e.g. `MRK 4:1`).
- Alt+Left/Alt+Right swap meaning when the UI is right-to-left (physical-direction-preserving);
  toolbar buttons mirror position and arrow glyphs, and tooltips swap their shortcut hints.

### Current Platform.Bible architecture facts this design builds on

- The scroll group service is renderer-hosted: `src/renderer/services/scroll-group.service-host.ts`
  is the network object host; `src/shared/services/scroll-group.service-model.ts` holds
  types/interfaces; `src/shared/services/scroll-group.service.ts` is the cross-process client.
  `setScrRefSync` is the single mutation point for scroll group references.
- The renderer registers commands (e.g. `platform.about` in `dialog.service-host.ts`), so
  history commands can be registered from the scroll group service host.
- The main-process `before-input-event` handler in `src/main/main.ts` (~line 619) handles
  Ctrl+Tab/zoom by matching `input.key` + modifier booleans and calling shared services
  directly. It already has per-platform (Mac vs non-Mac) branches.
- The top toolbar is `src/renderer/components/platform-bible-toolbar.tsx`. Its BCV control is
  bound to a toolbar-selected scroll group (localStorage-seeded, default `0`). A separate
  in-flight PR will make the toolbar follow the last active WebView's scroll group.
- UI direction: `readDirection()` (`lib/platform-bible-react/src/utils/dir-helper.util.ts`)
  reading `localStorage['layoutDirection']` is the source of truth all RTL-aware components use.
  Nothing derives it from `platform.interfaceLanguage` today. Direction changes effectively
  require a reload (components read it synchronously at render).
- `UndoRedoButtons` (`lib/platform-bible-react/src/components/basics/undo-redo-buttons.component.tsx`)
  is the precedent for a ButtonGroup pair with `Kbd` shortcut hints in tooltips and
  `navigator.userAgent`-based macOS detection.
- `platform-bible-react/experimental` (`lib/platform-bible-react/src/experimental.ts`) is the
  unstable API surface; components live in the normal component folders and are exported there.

## Design

### 1. History core (PT-4034) — inside the scroll group service host

Per-scroll-group back/forward stacks kept as **in-memory module state** in
`scroll-group.service-host.ts` — never written to localStorage or settings (session-only).

```ts
type ReferenceHistoryEntry = {
  scrRef: SerializedVerseRef;
  sourceProjectId?: string; // preserves versification context on re-navigation
};
type ReferenceHistory = {
  back: ReferenceHistoryEntry[]; // index 0 = current location
  forward: ReferenceHistoryEntry[];
};
```

- **Recording:** `setScrRefSync` records history on every genuine reference change (its
  existing no-op guards already skip identical refs). An internal `shouldRecordHistory`
  parameter — not exposed on the network API — lets history navigation itself skip recording.
  Because `setScrRefSync` is the single mutation point, history captures navigation from any
  source (toolbar BCV, editor scrolling across a chapter boundary, future PT-4032 commands),
  matching PT9.
- **Stack rules:** exactly the PT9 rules listed under Background, including the depth-20 cap
  and the same-book-run trim.
- **Seeding:** each group's back stack is lazily seeded with the group's current ref on first
  access, so the first navigation is immediately back-able (mirrors PT9's restore seeding).
- **Scope:** history exists only for real scroll groups (`ScrollGroupId` numbers). Refs not
  synced to a group have no history (matches PT9 excluding `ScrollGroup.None`).

The pure stack logic (push rules, jump transfers, seeding) lives in a colocated
`src/renderer/services/reference-history.util.ts` with unit tests; the service host owns the
state and wires it to `setScrRefSync`.

### 2. Service API and events

Added to `IScrollGroupRemoteService` (network object) and the client
(`IScrollGroupService`), plus sync exports for in-process renderer consumers (the pattern the
toolbar already uses with `availableScrollGroupIds`):

- `getReferenceHistory(scrollGroupId: ScrollGroupId): Promise<ReferenceHistory>` (+
  `getReferenceHistorySync`) — returns copies, not live references.
- `navigateReferenceHistory(scrollGroupId: ScrollGroupId, offset: number): Promise<boolean>`
  (+ sync variant) — signed, browser-`history.go`-style: negative = back, positive = forward,
  magnitude = number of steps. Serves back, forward, and dropdown jump-to with one method.
  Out-of-range offsets (and offset 0) are a no-op returning `false`; returns `true` when
  navigation happened.
- `onDidChangeReferenceHistory: PlatformEvent<{ scrollGroupId: ScrollGroupId; history: ReferenceHistory }>`
  — buffered network event emitter keeping the latest payload per scroll group, same pattern as
  `onDidUpdateScrRef`. Fired on every stack change (push, replace, navigate). Buffering may
  coalesce rapid updates; consumers only need the latest state, so that is acceptable.

New event name constant follows the existing pattern
(`'scrollGroup:onDidChangeReferenceHistory'`).

### 3. Commands (PT-4034)

Declared in `src/declarations/papi-shared-types.ts` `CommandHandlers`, registered by the
scroll group service host at startup (same pattern as `platform.about`), and
`lib/papi-dts/papi.d.ts` regenerated via `npm run build:types`:

- `platform.navigateBackInReferenceHistory(scrollGroupId: ScrollGroupId): Promise<boolean>` —
  wrapper over offset −1.
- `platform.navigateForwardInReferenceHistory(scrollGroupId: ScrollGroupId): Promise<boolean>` —
  wrapper over offset +1.
- `platform.navigateToReferenceHistoryEntry(scrollGroupId: ScrollGroupId, offset: number): Promise<boolean>`
  — the jump-to command.

`scrollGroupId` is **mandatory** on all three. We deliberately do not resolve a default from
the toolbar's localStorage because the toolbar's scroll-group tracking is about to be replaced
by the toolbar-sync PR (see Coordination). Callers that know their group (toolbar buttons)
pass it; the keyboard dispatch uses an interim constant (section 5).

### 4. Interface direction command

- `platform.getInterfaceDirection(): Promise<'ltr' | 'rtl'>` — declared in
  `papi-shared-types.ts`, registered in the renderer in a small new module
  (`src/renderer/services/interface-direction.command.ts`, registered from renderer startup in
  `index.tsx`). Handler returns `readDirection()`. `readDirection` and the `Direction` type are
  not currently exported from `platform-bible-react`; export them from
  `platform-bible-react/experimental` so the handler shares the single source of truth rather
  than duplicating the localStorage read.
- Type is `'ltr' | 'rtl'` (the existing `Direction` type), not
  `platform.textDirection`'s wider `'ltr' | 'rtl' | '' | undefined` — UI direction always
  resolves (`readDirection()` defaults `'ltr'`); the unset variants only make sense for
  per-project content direction.
- Rationale: the main process must not reach into the renderer (no
  `webContents.executeJavaScript`); a command keeps the Electron layer thin and matches
  existing patterns (`platform.getOSPlatform`, `platform.isFullScreen`).

### 5. Keyboard shortcuts (PT-4033, history subset)

In the existing `before-input-event` handler in `src/main/main.ts`, alongside Ctrl+Tab, same
match style (`input.key` + modifier booleans, keyDown only, `event.preventDefault()`
synchronously before async dispatch):

- **Windows/Linux:** Alt+Left / Alt+Right (no other modifiers). Dispatch:
  `await commandService.sendCommand('platform.getInterfaceDirection')`; in LTR, Alt+Left =
  back and Alt+Right = forward; in RTL the meanings swap (PT9's physical-direction-preserving
  behavior).
- **macOS:** Cmd+[ / Cmd+] — the platform's history-navigation convention (Safari, Chrome,
  Finder). We deliberately do **not** bind Option+Left/Right: Option (which Electron reports
  as `input.alt`) + arrows is the system-wide move-by-word shortcut and intercepting it would
  break text editing everywhere. Cmd+Shift+[ / ] are already taken by tab focus in this
  handler; plain Cmd+[ / ] are free. The bracket pair **also swaps in RTL**: Chromium's
  `accelerators_cocoa.mm` explicitly swaps ⌘[ / ⌘] between History Back and Forward when the
  UI is RTL, so the physical-direction-preserving rule applies uniformly to both key pairs,
  and the dispatch queries `platform.getInterfaceDirection` on every platform.
- Both dispatch `platform.navigateBackInReferenceHistory` / `...Forward...` with
  `INTERIM_KEYBOARD_HISTORY_SCROLL_GROUP_ID = 0` — a named constant with a comment stating it
  is temporary until the toolbar-sync PR provides an "active scroll group" to resolve. Group 0
  is the toolbar default and what Simple-mode users are effectively always on.
- Per the project rule, add `KeyboardShortcutEntry` items for both shortcuts to
  `src/stories/keyboard-shortcuts.data.ts` with per-OS keys (Windows/Linux: `Alt+Left` /
  `Alt+Right`; macOS: `⌘[` / `⌘]`), purpose, category, context, and locations.

### 6. Toolbar UI (PT-4035)

**Presentational component** `NavigationHistoryButtons` in
`lib/platform-bible-react/src/components/advanced/navigation-history-buttons/` (colocated
component + stories + test per convention), exported from **`experimental.ts`** (unstable API
surface, importable from `platform-bible-react/experimental`).

- Two split buttons (back, forward) composed from `ButtonGroup` + `Button` (Lucide arrow
  icons) + `DropdownMenu` (chevron trigger) — there is no prebuilt SplitButton and we are not
  adding a generic one.
- Props (modeled on `UndoRedoButtons`): `canGoBack`, `canGoForward`,
  `backItems: { label: string; offset: number }[]`, `forwardItems` (same shape),
  `onNavigate(offset: number)`, `localizedStrings` (+ exported
  `NAVIGATION_HISTORY_BUTTONS_STRING_KEYS`), optional `showKeyboardShortcuts`, `className`,
  `variant`. The component stays presentation-only; the consumer formats labels and supplies
  offsets.
- Tooltips use `Kbd` with OS-appropriate shortcut hints, macOS detected via
  `navigator.userAgent` like `UndoRedoButtons`: macOS `⌘[` / `⌘]`; Windows/Linux `Alt+Left` /
  `Alt+Right`.
- **RTL** (via `readDirection()`, manual because nothing sets `document.dir`): mirror the
  pair's order and arrow icons, and swap the tooltip shortcut hints on all platforms (in RTL,
  back shows `Alt+Right` on Windows/Linux and `⌘]` on macOS, matching the swapped physical
  keys). `DropdownMenu` already handles RTL via its CUSTOM `readDirection()` support.
- Accessibility: localized `aria-label`s on all four interactive elements (two action buttons,
  two dropdown triggers).

**Renderer container** `src/renderer/components/reference-history-buttons.component.tsx`,
rendered in `PlatformBibleToolbar` immediately before the `BookChapterControl` in **both**
Simple and Power modes. It:

- Receives the toolbar's `scrollGroupId`; reads history via `getReferenceHistorySync` and
  subscribes to `onDidChangeReferenceHistory` (also refreshing when the group changes).
- Computes enablement: back enabled when `back.length > 1`, forward when `forward.length > 0`.
- Builds labels with `formatScrRef` from `platform-bible-utils` — the same formatter the
  adjacent BCV control uses for its current value and its recent-searches dropdown
  (`formatScrRef(verseRef, 'English')` in `book-chapter-control.component.tsx`), keeping the
  two dropdowns consistent; when localized book names get threaded into the toolbar later,
  both controls pick them up the same way. Offsets: back list = `back[1..]` (offsets −1, −2,
  …), forward list = all of `forward` (offsets +1, +2, …).
- Calls `navigateReferenceHistorySync(scrollGroupId, offset)` on click.

**Localization:** new keys in `assets/localization/en.json` for the two tooltips/aria-labels
(e.g. `%toolbar_navigationHistory_back_tooltip%` "Go back one reference",
`%toolbar_navigationHistory_forward_tooltip%` "Go forward one reference"). Shortcut hints are
rendered separately via `Kbd`, not embedded in the localized strings.

## Testing

- **Unit (Vitest):** `reference-history.util.test.ts` — the PT9 parity core: push rules,
  same-chapter replace preserving forward stack, forward-clear on new push, same-book-run
  trim, depth-20 cap, back/forward stack transfers, multi-step jump transfers, seeding,
  out-of-range offsets.
- **Service wiring (Vitest):** `setScrRefSync` records history; history navigation updates the
  ref without re-recording; `onDidChangeReferenceHistory` fires.
- **Component (Vitest + Storybook):** `NavigationHistoryButtons` enablement, dropdown
  rendering, RTL mirroring and tooltip-hint swap, `onNavigate` offsets. Story added under the
  experimental component's folder.
- **E2E (Playwright):** new `e2e-tests/tests/isolated/navigation-history/` spec following the
  isolated-test patterns: navigate to several references via the toolbar BCV → back button
  enables → back returns to the prior chapter → forward returns; dropdown lists entries and a
  multi-step jump works; keyboard shortcut (per-OS key) triggers back/forward; buttons
  disabled with empty history.
- **Manual:** verify in both Simple and Power modes (app-runner + visual-verification skills)
  before the PR.

## Coordination and risks

- **Toolbar-sync PR (in flight, separate):** will make the toolbar follow the last active
  WebView's scroll group and replace the toolbar's localStorage group tracking. This design
  avoids touching that area (mandatory `scrollGroupId`; interim group-0 constant in main's
  keyboard dispatch). When it lands: replace the interim constant with active-group
  resolution, and optionally make the commands' `scrollGroupId` optional, defaulting to the
  active group. Until then, a Power user who moved the toolbar selector off group 0 will see
  keyboard history act on group 0 — accepted, temporary.
- **PT-4032 not yet implemented:** the epic's nav commands don't exist yet. No dependency —
  history records via `setScrRefSync`, which PT-4032's commands will also flow through.
- **`papi.d.ts`:** never hand-edited; regenerate with `npm run build:types` after
  `papi-shared-types.ts` changes.
- **One PR** covers all three tickets on branch `pt-4034-reference-history`.

## Files to touch

| File                                                                           | Change                                                                                                   |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `src/shared/services/scroll-group.service-model.ts`                            | `ReferenceHistoryEntry`/`ReferenceHistory` types, event name constant, new methods on service interfaces |
| `src/shared/services/scroll-group.service.ts`                                  | Client proxy additions (methods + event)                                                                 |
| `src/renderer/services/scroll-group.service-host.ts`                           | History state, recording in `setScrRefSync`, navigation, event, command registration                     |
| `src/renderer/services/reference-history.util.ts` (+ test)                     | Pure stack logic                                                                                         |
| `src/renderer/services/interface-direction.command.ts`                         | `platform.getInterfaceDirection` registration                                                            |
| `src/renderer/index.tsx`                                                       | Register interface-direction command at startup                                                          |
| `src/declarations/papi-shared-types.ts`                                        | Four new `CommandHandlers` declarations                                                                  |
| `lib/papi-dts/papi.d.ts`                                                       | Regenerated (`npm run build:types`)                                                                      |
| `src/main/main.ts`                                                             | Alt+Left/Right (Win/Linux) and Cmd+[ / ] (macOS) in `before-input-event`; interim group constant         |
| `src/stories/keyboard-shortcuts.data.ts`                                       | Catalog entries with per-OS keys                                                                         |
| `lib/platform-bible-react/src/components/advanced/navigation-history-buttons/` | New experimental component + stories + test                                                              |
| `lib/platform-bible-react/src/experimental.ts`                                 | Export the new component; export `readDirection` + `Direction` from `dir-helper.util`                    |
| `src/renderer/components/reference-history-buttons.component.tsx`              | Renderer container wiring service ↔ component                                                           |
| `src/renderer/components/platform-bible-toolbar.tsx`                           | Render the container before `BookChapterControl` (both modes)                                            |
| `assets/localization/en.json`                                                  | Tooltip/aria localized strings                                                                           |
| `e2e-tests/tests/isolated/navigation-history/`                                 | Playwright specs                                                                                         |
