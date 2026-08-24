# Architecture Decisions

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

A lightweight, append-only log — with one narrow carve-out, described under "Don't rewrite history"
below — of **significant architecture decisions** and the reasoning behind them. It holds the one
thing the prescriptive standards (`Architecture.md`,
`Paranext-Core-Patterns.md`, `.claude/rules/`) can't: the **why**, the **alternatives we rejected**,
and the **history** (including superseded decisions).

This is **not** a gate and **not** the old ai-porting decision registry — no schema, no approval
step, no automation. Just a record.

## How to use it

- **Record significant decisions as they happen, in any code work** — not only during
  `/investigate-prd`. "Significant" = cross-cutting choices, a new pattern or top-level structure,
  deferring a platform capability, where a feature lives, or choosing one approach over viable
  alternatives. Skip routine/local choices.
- **Promote settled conventions.** When a decision hardens into a rule everyone should follow, also
  fold the rule into the relevant standard (`Architecture.md`, `Paranext-Core-Patterns.md`) or a
  `.claude/rules/` file — that is what the agents read and enforce on the next feature. This log
  keeps the rationale and history; the standards keep the current rule.
- **Don't rewrite history.** Mark a superseded decision `Superseded by ADR-NNNN` instead of deleting
  it; add the new decision as a new entry. **The one carve-out:** delete a superseded entry outright
  when leaving it would keep a dead approach readable as available prior art. This log is surveyed
  for precedent by people and by agents (`.claude/agents/pt10-reuse-scout.md` reads it during
  `/investigate-prd`), and an entry that reads as a considered option is one they can propose again.
  When you take the carve-out, retire the number rather than reusing it and leave a stub in its place
  so the gap is explained; git history keeps the text.
- **Append at the end**, newest last. Number entries `ADR-NNNN`.

### Entry template

```markdown
## ADR-NNNN: {short title}

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by ADR-NNNN
- **Context:** what situation forced a decision (with file:line / source where useful).
- **Decision:** what we chose.
- **Alternatives:** what we considered and why we rejected/deferred them.
- **Consequences:** what this enables or constrains; when to revisit.
```

---

## ADR-0001: Keep a lightweight, gate-free architecture-decisions log

- **Date:** 2026-06-18
- **Status:** Accepted
- **Context:** Feature and PRD work surfaces cross-cutting architecture decisions whose rationale
  would otherwise be stranded in PR descriptions and commit messages and re-litigated later. The
  retired ai-porting workflow had a gated decision registry (`decision-registry.json` + schema +
  `Decisions.md` + per-feature folders); the gate and bookkeeping were deliberately dropped with the
  rest of that harness, but the value of recording rationale remained unaddressed.
- **Decision:** Maintain this file as the home for significant architecture decisions + rationale.
  No gate, no schema, no automation. CLAUDE.md instructs all code work to update it; settled
  conventions are additionally promoted into the standards/rules; `pt10-reuse-scout` reads it during
  `/investigate-prd` so future investigations inherit prior decisions.
- **Alternatives:** (a) standards-only — rejected: the standards capture current rules but not the
  *why*, the rejected options, or the history. (b) Reinstate the ai-porting gated registry —
  rejected: that is exactly the harness we shed.
- **Consequences:** low-friction capture; the next PRD's scout benefits automatically. The cost is
  discipline — the log only helps if it is actually updated, which is why CLAUDE.md makes updating it
  a standing instruction rather than an optional nicety.

## ADR-0002: App-global keyboard shortcuts go through the main-process `before-input-event` handler

- **Date:** 2026-06-18
- **Status:** Accepted (current approach)
- **Context:** The core Send/Receive investigation found paranext-core has **no declarative
  keybinding/accelerator contribution API** — the menu-item contribution schema even rejects an
  `accelerator` field (`unevaluatedProperties: false`). The only existing app-global keyboard
  handling is the Electron main-process `before-input-event` handler in `src/main/main.ts`
  (~lines 663-798: F12, Ctrl+Tab, tab-group navigation, zoom), which already imports
  `commandService` and calls `commandService.sendCommand`.
- **Decision:** Add new app-global keyboard shortcuts as branches in that `before-input-event`
  handler, each invoking the target PAPI command (e.g. F6 → `command:paratextBibleSendReceive.openSendReceive`;
  pick a key that is genuinely free — F8/F9 are taken by chapter/book navigation in
  `src/main/verse-navigation-shortcuts.util.ts`). Do **not** build a general declarative keybinding
  API for a single shortcut. Every added branch also requires a matching `KeyboardShortcutEntry` in
  `src/stories/keyboard-shortcuts.data.ts` (mandated by `.claude/rules/keyboard-shortcuts-catalog.md`).
- **Alternatives:** (a) renderer-level global `keydown` — rejected: web-view iframes are
  `about:srcdoc`, so their key events don't bubble to the top renderer; coverage gaps unless
  duplicated into every web-view. (b) Build a declarative keybinding-contribution API — **deferred**:
  multi-week, touches the menu schema, `platform-bible-utils` types, the macOS/renderer menubars,
  generated `papi.d.ts`, and docs.
- **Consequences:** shortcuts are app-global and cross-platform from one place; couples `main.ts` to
  an extension's command name by string (degrades gracefully if the extension is absent). **Revisit**
  (and likely supersede this) once enough shortcuts accumulate to justify the declarative API.
  Narrowed by ADR-0015: this applies to shortcuts whose command needs nothing from the focused view;
  a shortcut whose command needs the focused web view's id, project, or text selection stays in the
  renderer, in one shared hook.
- **Source:** discovery brief for "Donna syncs her project with the team (core Send/Receive)".

## ADR-0003: Menus stay always-available; back ends gate at submission. Writers of mutable shared state are DataProviders, not NetworkObjects

- **Date:** 2026-06-18
- **Status:** Accepted
- **Context:** Two placement questions recur when porting a PT9 tool that mutates project data.
  (a) PT9 menu items hide/disable themselves via predicate evaluation before render
  (permission checks, project-state guards). paranext-core's menu system has **no arbitrary
  predicate/expression gating** of menu visibility — the one supported declarative axis is
  `MenuItemBase.hiddenInterfaceModes` (`lib/platform-bible-utils/src/extension-contributions/menus.model.ts`,
  enforced by `filterItemsForInterfaceMode` in `src/extension-host/services/menu-data.service-host.ts`), which hides an item per interface mode; beyond
  that the schema cannot express "show only if X." (b) When a
  C# layer mutates shared state that DataProvider subscribers observe (via `useProjectSetting` and
  similar), where the mutation lives determines whether external PAPI callers stay in sync. A
  `NetworkObject` method is a publicly callable mutation with **no subscribable surface** — any
  consumer (another extension, a debug tool, another part of the platform) can call it, and
  subscribers do not learn the state changed (surfaced in the keyboard-switching port:
  an OS-keyboard `activate(id)` on a NetworkObject let the activation service's cached state silently
  diverge from reality).
- **Decision:**
  - **Menus stay always-available.** Do not build per-feature predicate-gated menu visibility. The
    back end performs permission/state checks **at submission time** and surfaces failures as
    `PlatformError` codes (`PERMISSION_DENIED`, `FAILED_PRECONDITION`, etc.). Document the PT9
    visibility/enable rules inline at the command/handler, not in a separate file.
  - **The actual writer of mutable shared state should be a DataProvider, not a NetworkObject**, so
    the `set` action propagates a change event to subscribers automatically. Reserve `NetworkObject`
    for stateless query/command functions with no subscription semantics. (Precedent for the
    promotion: `c-sharp/Checks/InventoryDataProvider.cs` — subclass `NetworkObjects.DataProvider`,
    return `(functionName, Delegate)` pairs from `GetFunctions()` (paired `getX`/`setX`, with
    `subscribeX` auto-generated per data type), and fire updates via the inherited
    `SendDataUpdateEvent(dataType, …)`.)
- **Alternatives:** (menus) build a declarative predicate-visibility API — deferred: large surface
  (menu schema, utils types, generated `papi.d.ts`, docs) for marginal benefit when submission-time
  checks already give correct behavior. (writer placement) keep the NetworkObject and require all
  callers to round-trip through a higher-level service — rejected: a registered PAPI object's surface
  is public and direct calls cannot be prevented; adding a custom event on the NetworkObject just
  reinvents the DataProvider pattern poorly.
- **Consequences:** simpler menu wiring at the cost of a worse error experience for actions the user
  could have been prevented from triggering (acceptable today; **revisit** if predicate visibility
  becomes common enough to justify the API). Promoting a writer to a DataProvider adds modest
  boilerplate (base class + data-type triples + update plumbing) but keeps external mutations
  observable, which is load-bearing whenever any subscriber caches the state.
- **Source:** manage-books port (menu-availability deferred); keyboard-switching port (OS-keyboard
  NetworkObject → DataProvider promotion). See `Entry-Point-Guide.md` for the menu mechanics
  and `Paranext-Core-Patterns.md` for the DataProvider-vs-NetworkObject pattern.

## ADR-0004: Surface ParatextData alerts via `AlertCapture` instead of swallowing them

- **Date:** 2026-06-18
- **Status:** Accepted
- **Context:** Many ParatextData operations report user-facing warnings/errors through `Alert.Show` /
  `Alert.ShowLater` (e.g. an SFM import can raise a dozen alerts in one call). Headless PT10 has no
  dialog to show them, so the prior `AlertStub` returned `AlertResult.Negative` and **discarded the
  message** — the caller silently lost every warning. Both `c-sharp/ParatextUtils/AlertCapture.cs`
  and the consuming call sites in `c-sharp/ManageBooks/` already ship; this records *why* so the next
  feature applies the pattern instead of reinventing alert handling.
- **Decision:** Install `AlertCapture : Alert` as the `Alert.Implementation` at startup. Wrap any
  ParatextData call that may raise alerts in `using var scope = AlertCapture.StartCapture();` and
  project `scope.Entries` (`AlertEntry[]`) into the wire result (partition by level into
  `Warnings`/`Errors`). `AsyncLocal` isolates the capture scope per async flow so concurrent wire
  calls do not cross-contaminate; nested scopes save/restore the parent on dispose; an allow-list
  drops the recurring English-language-definition probe alert. The no-scope path falls back to
  `Console.WriteLine` + `AlertResult.Negative`.
- **Alternatives:** keep `AlertStub` (swallow alerts) — rejected: import-style flows legitimately
  produce warnings/errors the user must see. Reinstall a fresh `Alert.Implementation` per request —
  rejected: `AsyncLocal` scoping is cleaner and inherently concurrency-safe. Use `Alert.Show` from
  orchestrator code as poor-man's logging — rejected: return the structured `AlertEntry[]` field
  instead.
- **Consequences:** ParatextData warnings become structured, returnable data rather than lost
  side-effects; any future ParatextData wrapper that raises alerts can opt in by opening a scope.
  The cost is remembering to open a scope around the call — outside a scope, alerts still vanish.
- **Source:** manage-books port (`AlertCapture` introduced for `ImportBooks`). See
  `Paranext-Core-Patterns.md` for the code pattern.

## ADR-0005: PT10 has no production create-project primitive

- **Date:** 2026-06-18
- **Status:** Accepted
- **Context:** Porting the project backup-and-restore feature surfaced a "restore as a **new**
  project" goal that assumed PT10 could create a project from nothing (PT9 does this via
  `ProjectPropertiesForm` + `VersioningManager.EnsureHasGuid` + `ScrTextCollection.Add`). A
  verification grep (2026-05-19, re-confirmed against the current tree) found **no production
  create-project primitive** in paranext-core: no `CreateProject` / `AddProject` for new projects, no
  `ProjectPropertiesForm` equivalent. The C# factory only registers PDPs for projects **already on
  disk** (`createProjectDataProviderEngine` is PDP-**engine** registration, not project creation); the
  only create-project references are the `hello-rock3.createNewProject` sample extension (registered
  and handled, but it creates its own non-ParatextData sample data, not a ParatextData/ScrText
  project) and unregistered test/menu fixtures. Reading an existing project's Guid works
  (via `ScrText.Guid`, a ParatextData primitive); **creating** a Guid for a brand-new project does
  not, because that path is Mercurial-backed and PT10 does not touch Mercurial.
- **Decision:** Treat "create a new project" as an **unavailable platform capability**. Features that
  would need it must scope to existing-project flows only (backup-and-restore ships overlay-restore
  to an existing destination, not restore-to-new-project). `/investigate-prd` should flag any PRD
  that depends on project creation as blocked on this gap rather than designing around a primitive
  that does not exist.
- **Alternatives:** build a create-project primitive as part of the feature — rejected: it is a
  cross-cutting platform capability (storage layout, Guid assignment, ScrTextCollection indexing,
  the PT9-coexistence `shortName_projectGuid` folder-naming question), not a per-feature concern. A
  not-necessarily-unique fallback Guid in paranext-core with the real Mercurial-backed mechanism in
  paratext-10-studio was floated but not built.
- **Consequences:** restore-to-new-project and any similar net-new-project flow stay out of scope
  until the platform grows the primitive. **Revisit** when a production create-project capability
  lands — at which point the Guid-**creation** question (and PT9-coexistence folder naming) must be
  resolved before such flows can be wired end-to-end.
- **Source:** project backup-and-restore port (restore-to-new-project scope cut, PT10 source grep
  2026-05-19).

## ADR-0006: Reuse the shared checklist framework when porting a new checklist tool

- **Date:** 2026-06-18
- **Status:** Accepted
- **Context:** PT9 has a family of checklist tools (markers, punctuation, ...) sharing one WinForms
  framework. The markers checklist was ported first and deliberately landed the reusable pieces in
  `c-sharp/Checklists/` and `extensions/src/platform-scripture/`. Inspecting the merged markers port
  showed that a second checklist (punctuation) needs far less net-new code than a from-scratch port
  implied — most of the framework is already there to consume.
- **Decision:** When porting any additional checklist tool, **reuse the shared framework** rather
  than re-extracting it from PT9:
  - **Consume directly** (no new C#): the `IChecklistService` network object
    (`platformScripture.checklistService`, `c-sharp/Checklists/ChecklistService.cs` /
    `ChecklistNetworkObject.cs`), including `resolveComparativeTexts`; the shared data model
    (`ChecklistResult` / `ChecklistRow` / `ChecklistCell` / `ChecklistParagraph` and the polymorphic
    `ChecklistContentItem` subtypes — `text` / `verse` / `editLink` / `link` / `error` / `message` —
    plus their TS mirrors); the goto-link callback + linked-reference button.
  - **Re-extract small pieces into the new tool's own service** (tens of LOC): the per-tool
    comparison loop and the row-count cap + `Truncated` flag.
  - **Small upstream addition**: add a non-merging row builder
    (`ChecklistRowBuilder.BuildRowsNonMergingCells`, by parameterizing `MaxCellsToGrab`) — today
    `ChecklistRowBuilder` only exposes `BuildRowsMergingCells`, which markers uses. Keep markers on
    the merging mode.
  - **Pattern-copy, no shared class yet**: the `useWebViewState` slot pattern and the
    `checklist.component.tsx` structure (a shared `ChecklistTable` extraction is plausible only once
    the markers UI settles).
- **Alternatives:** extract the whole framework abstractly from PT9 for each new tool — rejected:
  markers already landed what is reusable; per-tool re-extraction would produce parallel/duplicate
  code.
- **Consequences:** a new checklist is mostly TS + a thin per-tool service. **Watch the verse-range
  divergence:** PT9's checklist verse range is **global** across checklist tools, but PT10 markers
  stores it **per-instance** via `useWebViewState`; a new sibling that copies markers inherits the
  per-instance behavior. The global-range fix is tracked upstream and will apply to all siblings when
  it lands — do not re-solve it per tool.
- **Source:** punctuation-checklist port (markers-consumption verdict); see `08_Checklists.md` in the
  PT9 feature inventory for the per-tool behavior and the verse-range divergence.

## ADR-0007: Per-window service scoping via `${name}-${windowId}` network-object names

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Multi-window support needs each window to run its own instance of window-scoped
  services (web view service, notification service, dialog request handlers, navigation commands,
  the window service itself), but the single-window app registered each as one fixed PAPI name
  (e.g. `dialog:showDialog`), and `networkObjectService` registrations are name-keyed — two windows
  cannot both register under the same name.
- **Decision:** Each window's renderer registers its own copy of these services under its own
  `globalThis.windowId` suffix (e.g. `${NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE}-${windowId}`,
  `${NotificationServiceNetworkObjectName}-${windowId}`, per-window dialog request names, per-window
  command names). The pre-existing generic name is kept working via a service router (ADR-0008).
- **Alternatives:** One shared instance for all windows — rejected: state (open web views, toasts,
  dialogs) is inherently per-window. A single object internally keyed by window id under the old
  generic name only — rejected: reinvents what `networkObjectService`'s per-name registration and
  `rpc.discover` already give for free.
- **Consequences:** every window-scoped service now has a scoped identity and (via the router) a
  generic one; new window-scoped services must follow the same convention and get a service router
  if generic-name callers exist. **Do not rely on a window disposing its own registrations as it
  closes** — it cannot: a closing window drops its RPC connection without disposing anything it
  hosted, and `destroy()` does not run `beforeunload` at all. Scoped registrations are instead
  cleaned up by the process that owns the websocket connections, which derives the death from the
  connection teardown and announces the departed window's network objects as disposed once their
  methods are out of the central registry (`onDidDisconnectClient` handling in
  `network-object.service.ts`). A window-scoped service therefore has to tolerate its own
  registrations outliving its window for a moment, and consumers have to tolerate resolving one that
  is already gone. The scoped ids remain the registration name (`object:{id}.{method}` derives
  from them) but are no longer how anything FINDS a window's implementation — see ADR-0019.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0008: Generic-name service routers in main forward to the focused/owning window's scoped service

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Existing PAPI consumers call services by their historical generic name
  (`platform.webViewService`, `dialog:showDialog`, `platform.about`, ...) with no window argument.
  After ADR-0007 scoped each window's copy under its own name, nothing answers the generic name.
- **Decision:** Main registers one service router per generic name (`notification.service-router.ts`,
  `web-view.service-router.ts`, `window.service-router.ts`, `dialog.service-router.ts`,
  `usersnap.service-router.ts`, `book-chapter-control.service-router.ts`) that forwards to the
  scoped service of the window that should handle it: the owning window when ownership is
  determinable (e.g. a command that names a web view routes to the window that owns that web view),
  otherwise the routing target (ADR-0010). A few read-only queries fan out and merge across all
  windows instead, where a merged view is the meaningful answer.
- **Amended 2026-08-07 (ADR-0022):** the original decision also included
  `command.service-router.ts`, a transitional router that forwarded a list of generic COMMAND names
  to per-window scoped command names (`platform.about` → `platform.about-1`). That module is gone.
  Commands are no longer forwarded name-to-name at all: each is registered by the router for its own
  service and calls a method on a window's shard. What remains of this ADR is the routers for
  network-object services, which is what it was always about — the command list was the part that
  needed a name-keeping mechanism, and that is what ADR-0022 removes.
- **Alternatives:** Push a window-id argument onto every external caller — rejected: breaks every
  existing extension/PAPI consumer and the documented `papi.d.ts` signatures. Always fan out to every
  window — rejected as the general answer: most of these calls are single-target actions where
  fanning out isn't meaningful, and forwarding to a not-yet-ready window is measurably costly.
- **Consequences:** external callers of the generic name are unaffected by multi-window; the
  owner/target-selection logic in each router is now load-bearing, and two rules fell out of getting
  it wrong first. Fan-outs ask only the windows that can answer (`getReadyWindowIds`), because
  forwarding to a window whose renderer has not registered costs that call the network service's
  whole registration retry. Whether an owner probe that could not reach a window fails the call,
  answers not-found, or degrades to the routing target is a decision each caller makes by weighing
  what guessing wrong costs there: an `existingId` search that would create refuses to guess, since
  a wrong guess mints a duplicate of a view meant to be unique app-wide; a probe that creates
  nothing answers not-found, since "could not ask" costs it nothing there; and a layout target
  degrades to the routing target with a warning, since a wrong guess there costs only placement.
  The main-side piece is a **service router**
  (`*.service-router.ts`) and the per-window implementation it forwards to is a **service shard**
  (`*.service-shard.ts`); both are documented in `Architecture.md` § "Service router and service
  shard".
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0009: Withdrawn

- **Status:** Withdrawn. The number is retired and will not be reused, so this log runs 0008 → 0010
  by intent rather than by accident.
- **Why the entry is not here:** the approach it recorded is not available in this repo, and an
  entry describing a considered approach is exactly what a survey of this log — by a person or by
  `.claude/agents/pt10-reuse-scout.md` — surfaces as reusable prior art. Deleting it rather than
  marking it superseded is the carve-out described under "Don't rewrite history" above. Git history
  keeps the text.
- **What covers this ground instead:** ADR-0020 (the scroll group service) and ADR-0021 (the theme
  service).

## ADR-0010: Window readiness is tracked in main via window-service registration, used to pick routing targets

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** A window's `BrowserWindow` exists (and is enumerable) well before its renderer has
  registered any window-scoped service, because window creation and renderer service startup are
  asynchronous. Service routers (ADR-0008) need to avoid picking a window that can't yet answer.
- **Decision:** Main tracks a `readyWindowIds` set (`window-state.service.ts`); a window is marked
  ready when its `platform.windowServiceDataProvider-{id}-data` registration appears (observed via
  `onDidCreateNetworkObject`), used as a single proxy signal for "this window's services are up," and
  marked not-ready on close. `getTargetWindowId()` prefers the focused window if it is ready; failing
  that, the most recently focused window that is still ready (an MRU list, since a window can lose
  its "ready" status without losing focus); failing that, the first ready window in creation order.
  Every rung passes over a window that has begun closing, however ready and however focused it still
  is: a close runs that window's shutdown work first and the window keeps focus and keeps serving
  throughout, so new work would otherwise land in a window that is on its way out. Once every window
  is closing there is no window that is not closing left to prefer, so readiness takes over again and
  the target is the first window that can still answer: a quit's own progress reports and prompts go
  through this target, and the window holding focus during a quit is often one the user opened
  moments earlier whose renderer never finished starting. A
  dedicated `onDidChangeRoutingTarget` event fires whenever this computed target actually changes —
  either the target window id, or the same window flipping ready/not-ready — so service routers and
  other consumers can react without polling.
- **Alternatives:** Wait for every window-scoped service to individually confirm registration before
  considering a window ready — more correct but heavier; the window service starts reliably early and
  stands in well enough for "this window is alive," at the cost of a startup-ordering gap (a window
  can be ready while its other services are still registering). No readiness tracking, always try the
  target and eat the retry cost — rejected: this is exactly where the ~9s registration-race retries in
  `network.service.ts` come from.
- **Consequences:** service routers get a cheap way to skip an unready window in the common case, at
  the cost of the signal being an approximation (one service standing in for all of them) rather than
  a true invariant.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0011: Character-marker removal peels one nesting layer per activation; the row is labelled to match rather than looping

- **Date:** 2026-08-10
- **Status:** Accepted
- **Context:** The character-marker menu's catch-all remove row calls the editor's
  `removeCharacterMarker()` with no argument. In `@eten-tech-foundation/platform-editor`,
  `$getCharNodeToRemove` matches only the **innermost** `CharNode` when the marker is `undefined`,
  but matches a **named** marker at any nesting depth. So one activation of the catch-all row peels
  a single layer from each covered run, while a per-marker row removes that marker exactly, however
  deeply nested. Coverage (`getAncestorCharacterMarkers`) reports every enclosing character marker,
  so a nested stack surfaces one enabled row per layer. The row had been labelled "Remove all
  character markers", which overstated what a single activation does.
- **Decision:** Keep the single argument-less call and **relabel** the row to "Remove character
  markers" (`%…_characterMarkerMenu_removeMarkers%`), which is true in every case. Treat the
  per-marker rows as the exact path for removing a specific nested marker. Neither remove row
  carries a `selectionState`: `MarkerMenu` maps that prop onto `aria-checked` and a checkbox
  affordance, and its contract is "how much of the selection **this marker** covers" — a question a
  markerless action row does not pose, and whose common answer (`'none'` on a fully-marked
  selection) announces as "not checked" beside an action certain to remove markers.
- **Alternatives:** **Loop until coverage is empty** — rejected: each `removeCharacterMarker()` call
  is its own `editor.update()`, so undo would gain one entry per layer, and the loop's termination
  condition is not readable synchronously because `getUsj()` returns the cached `editedUsjRef` that
  a non-discrete update does not refresh. **Keep the menu open after a removal so remaining markers
  stay visible** — rejected for the same staleness reason: coverage is sampled on open from
  `getUsj()`, so a re-sample immediately after the update reads the same stale object.
  **Nested-aware removal in the editor** — deferred: it is a change to the editor package, outside
  this epic's 2-week appetite.
- **Consequences:** A user clearing a nested stack activates the row once per layer, or uses the
  per-marker rows to target a layer directly. Undo stays one step per activation. The PRD's
  non-negotiable — "UI for deleting markers only removes markers, not the content within markers" —
  holds either way, since one-layer removal never touches content. **Revisit** if the editor grows
  an outcome signal from `removeCharacterMarker` (a return value, or discrete-update-plus-re-derive):
  that would also let the currently-silent partial refusal — a run whose innermost marker is nested
  and only partly covered is skipped without notification — be reported to the user.
- **Source:** PRD "Saroj easily works with character-level markers" (appetite 2 developer weeks);
  character-marker removal work on `remove-character-marker`.

## ADR-0012: Editor edit side effects (version-history snapshot, sync-blocked notice) live in one shared module

- **Date:** 2026-08-11
- **Status:** Accepted
- **Context:** Every destructive or sync-gated edit in `platform-scripture-editor` needs the same two
  side effects around it: a best-effort version-history snapshot before the edit, and the standard
  "editing paused during Send/Receive" notice when the S/R gate refuses it. Both had been inlined per
  call site — the snapshot block three times (insert footnote, insert cross-reference, remove
  character marker) and the sync notice twice. The snapshot block carries a non-obvious contract (the
  `ERROR_UNIMPLEMENTED` sentinel that lets an older host without version history still perform the
  edit), so a change to it had to be made in every copy, and the sync notice's severity and message
  key could drift between copies. The character-marker work added the third and second copies
  respectively, which is what surfaced this.
- **Decision:** Consolidate both into `extensions/src/platform-scripture-editor/src/editor-side-effects.utils.ts`
  and route every call site through it. `commitVersionHistorySnapshot(projectId, message,
  editDescription)` owns the `ERROR_UNIMPLEMENTED` handling and the "no project means no snapshot, and
  that is not an error" rule. `notifySyncEditBlocked(localizedStrings)` takes the strings rather than a
  resolved message, so `SYNC_EDIT_BLOCKED_KEY` is named exactly once in the codebase and is listed in
  the web view's key list via that const — a caller cannot reach the notice while spelling the key
  itself. The module value-imports `@papi/frontend`, so it must stay out of `main.ts`'s import graph;
  `extension-host-import-boundary.test.ts` enforces that.
- **Alternatives:** **Extract only for the new character-marker path** — rejected: it reduces the
  invariant from three copies to two rather than one, leaving the same drift risk with an extra
  indirection. **Have the helper take a resolved message string** — rejected: the message key would
  still be spelled at each call site, which is the specific thing that can drift. **A React hook
  instead of plain async functions** — rejected: the insert paths call these from inside a message
  handler, not at render time; the web view wraps the plain function in its own `useCallback` where it
  needs a stable identity for dependency lists.
- **Consequences:** One place to change either contract. The removal path additionally gates its
  snapshot on a resolved editor ref, because unlike the insert paths it has a reachable no-op (the ref
  is null until the editor mounts) and would otherwise write a restore point for an edit that never
  happened. One no-op remains documented-but-undefended — the editor silently declines a removal it
  cannot confine to the selection — for the same reason ADR-0011 records: there is no outcome signal
  from `removeCharacterMarker` to branch on. New edit paths should route through this module rather
  than inlining a fourth copy.
- **Source:** Review of PR #2665 (`remove-character-marker`) — reuse findings on duplicated snapshot
  and sync-notice blocks.

## ADR-0013: `InstalledExtensions.packaged` reports discovered extensions, not activated ones

- **Date:** 2026-08-13
- **Status:** Accepted
- **Context:** `getInstalledExtensions` in `extension.service.ts` built its `packaged` list from the
  live `activeExtensions` map, so the answer moved as startup progressed. Extensions activate
  sequentially in a deterministic order that places every `platform*` extension before every
  `paratext*` one, which means `platformGetResources` — the extension that answers
  `platformGetResources.isSendReceiveAvailable` — is always running while `paratextBibleSendReceive`
  is still queued. A Paratext 10 Studio log measured that gap at ~1.5s, widened by whatever the
  extensions in between (notably the network-bound marketplace extension) take. Callers asking inside
  the gap got a truthful `false` to "is send/receive installed?" and had no way to know it was
  temporary; the toolbar's Sync button therefore stayed hidden for the session (PT-3954), since
  `platform.onDidReloadExtensions` does not fire on a cold start.
- **Decision:** `packaged` is derived from the extensions **discovered** for this build
  (`availableExtensions`, assigned in `reloadExtensions` before any activation begins) via
  `derivePackagedExtensionIdentifiers` in `extension-host/utils/extension-data.util.ts`. The list now
  answers "did this ship with the application?" — a question whose answer does not change during
  startup — and its TSDoc in `manage-extensions-privilege.model.ts` says so explicitly, including that
  it is *not* an answer to "can I call this extension's commands right now?".
- **Alternatives:** **Add a separate `available` field and leave `packaged` on activation state** —
  rejected: `packaged` is already documented as "explicitly bundled to be part of the application …
  at runtime no extensions can be added or removed from this set", which describes the build, not the
  activation queue; two near-identical lists would invite callers to pick the wrong one. **Fix only
  the toolbar with a retry** — rejected as the sole fix: it leaves every other caller of this list
  with the same trap. To be clear about which change does what: this decision is the fix. The
  renderer's re-checks and the Home web view's retries are fallbacks for a different failure — the
  extension answering the check not having activated yet, which no change to this list can address.
  **Emit `platform.onDidReloadExtensions` on cold start** — rejected: it would trigger refetch
  storms across all consumers at startup, and a renderer that subscribes late would still miss it;
  making the query stable beats making the event more frequent.
- **Consequences:** An extension that fails or times out during activation (5s cap, see
  `getExtensionActivationTimeoutMs`) is now reported as packaged, so callers may show affordances for
  an extension that cannot answer — the toolbar accepts this trade deliberately, as the user already
  receives an `%extension_failed_to_start%` notification in that case. Consumers that need "is it
  usable right now?" must ask that question directly rather than inferring it from this list.
  This also inherits `availableExtensions`' staleness, which `packaged` did not have before: during a
  reload the previous list stands until `reloadExtensions` reassigns it, so an extension mid-disable
  can briefly be reported as packaged (i.e. bundled and undisableable), and a failed `getExtensions()`
  leaves the list stale for the session. Both windows are short and only observable by a caller
  polling during a reload, but they are new here, not pre-existing. Because the inputs are
  module-private (`availableExtensions` is only populated by a full reload), the invariant is guarded
  by a source check — `extension.service.packaged-extensions.test.ts` — rather than a behavioral test.
  Revisit if a caller genuinely needs activation state: that wants a new, honestly-named signal, not a
  redefinition of this one. The same "don't answer a question you can't answer" rule applies one level
  up: `platformGetResources.isSendReceiveAvailable` returns `undefined` — not `false` — when it lacks
  the `manageExtensions` privilege to check with, and its consumers treat `undefined` and a thrown
  error alike as unknown, failing open.
- **Source:** PT-3954 (Sync button on toolbar sometimes does not show), with the activation timeline
  measured from a Paratext 10 Studio `main.log`.

## ADR-0014: Analytics abstraction layer hosted in extension-host; environment resolved once and fail-safe toward test

- **Date:** 2026-08-14
- **Status:** Accepted
- **Context:** PT-4337 asked for a provider-agnostic analytics abstraction (call sites never touch a
  vendor SDK or write-key directly) that is fire-and-forget and fail-safe, and that correctly targets
  a "test" vs "production" analytics audience so dev/tester activity never pollutes production
  numbers. Determining which audience applies requires reading the current Send/Receive server
  target, which is only reachable via the `paratextRegistration.internetSettingsDataProvider` PAPI
  data provider (`c-sharp/Users/InternetSettingsDataProvider.cs`) — a lookup available only from the
  extension-host and renderer processes, not from Electron's main process. This ticket's own DoD was
  narrow (wire up one proof-of-concept `app_launch` event with a console-log stand-in provider), but
  the abstraction itself — shared types, the resolution/queueing engine, and the provider seam — is
  the actual deliverable and shapes every later analytics call site under epic PT-1797.
- **Decision:** New top-level structure `analytics-providers/` under
  `src/extension-host/services/`, holding provider implementations behind the shared
  `AnalyticsProvider` interface (`src/shared/models/analytics.model.ts`). The engine
  (`analytics.service.ts`) lives in extension-host — chosen over main or a shared/cross-process
  module specifically because it's the process that can reach the PAPI data provider the resolution
  needs. `AnalyticsEvent.environment` is decided once, when an event is fired (or when it leaves the
  service's `unresolved` queue), never re-decided at transmission time, so an event that sits queued
  through an app upgrade still lands with the vendor account that was correct when it happened.
  Environment resolution itself is fail-safe: any timeout or error resolves to `'test'` rather than
  `'production'`, since under-counting is an acceptable cost and mis-tagging test/dev activity as
  production data is not. `ConsoleAnalyticsProvider` — the only provider this ticket ships — is not
  disposable proof-of-concept scaffolding; it is expected to remain the permanent "don't actually hit
  the vendor" implementation for normal dev/tester activity and for most automated E2E runs, even
  after a real vendor provider exists.
- **Alternatives:** **Host the engine in main**, closest to true process-start timing — rejected: main
  cannot consume PAPI data providers, so the S/R-target check would need new cross-process plumbing
  just to relocate a process boundary the design doesn't otherwise need yet. **Build the full
  cross-process facade now** (a `src/shared/services/analytics.service.ts` every process imports,
  mirroring `logger.service.ts`) so call sites already look ubiquitous — rejected for this ticket:
  logger's ubiquity comes from being a dumb per-process module needing no IPC, but environment
  resolution genuinely needs one process to own the PAPI round-trip, so a shared facade would need
  real IPC transport built now for zero current call sites outside extension-host. Types were still
  placed in `src/shared/models/` immediately so this facade can be added later additively, without a
  call-site rename. **Re-resolve environment fresh at transmission time instead of stamping at fire
  time** — rejected: an event can sit queued indefinitely while offline, and by send time the app may
  have upgraded to a different vendor; stamping at fire time is what lets the queue design extend
  cleanly to a durable, cross-restart queue later. **Resolve environment reactively when the user
  changes S/R server mid-session** — deferred to PT-4378; this ticket resolves once per session and
  caches it, an accepted simplification for the POC's single startup-time event.
- **Consequences:** Every future analytics call site funnels through `trackEvent()`/the
  `AnalyticsProvider` seam rather than touching a vendor SDK directly, so swapping vendors later means
  writing one new provider, not auditing call sites. Until PT-4378 lands, an event fired after a
  mid-session S/R server change still targets the environment resolved at startup. Until a follow-on
  ticket adds cross-process transport, only extension-host can call `trackEvent()`/`initialize()` —
  main and renderer cannot yet emit analytics events. Until a follow-on ticket adds durable
  persistence, the `test`/`production`/`unresolved` in-memory queue is lost on crash or restart; its
  three-bucket shape was chosen specifically so that ticket can persist three queues without a format
  rewrite. No user-consent gating exists yet (PT-4366 builds the actual setting), though the design
  leaves the same async-resolve-once seam open for it that environment resolution uses.

  **Core depending on an extension-owned data provider:** `analytics.service.ts` calls
  `dataProviderService.get('paratextRegistration.internetSettingsDataProvider')` — a data provider
  namespaced under the `paratextRegistration` **extension**, not a core-owned one sourced from a
  shared `*.service-model.ts`/`*.service.ts` file the way every other core `dataProviderService.get`
  call site is (`themeServiceDataProviderName`, `localizationServiceProviderName`,
  `settingsServiceDataProviderName`, `menuDataServiceProviderName`). This typechecks only because
  `tsconfig.json` puts `./extensions/src` on `typeRoots`, making the extension's ambient
  `DataProviders` augmentation (`paratext-registration.d.ts`) visible from core without an explicit
  import — that's an incidental property of the typeRoots configuration, not a reviewed decision
  that core may depend on extension-provided data providers in general. The dependency exists here
  because the S/R server target has no core-owned equivalent; it does not establish that pattern as
  generally sanctioned. Code that wants to depend on a different extension-provided data provider
  from core should treat this as a one-off, not a precedent, and reconsider whether a core-owned
  alternative should exist instead.
- **Source:** PT-4337 (epic PT-1797, "Analytics II (Implementation)"); design spec
  `docs/superpowers/specs/2026-08-13-analytics-abstraction-layer-design.md`; final whole-branch review
  of the implementing branch, which surfaced and fixed a startup-path regression (analytics
  initialization briefly gated extension-host activation) before merge.

## ADR-0015: Per-web-view Ctrl+F for Find, not a main-process `before-input-event` branch

- **Date:** 2026-08-18
- **Status:** Accepted (narrows ADR-0002 rather than superseding it)
- **Context:** PT-4341 makes Find (Ctrl+F) reachable from every scripture tab type, not just the
  Scripture editor. ADR-0002 says app-global shortcuts belong in the Electron main-process
  `before-input-event` handler (`src/main/main.ts`) and explicitly rejects "renderer-level global
  `keydown` — duplicated into every web-view" as the alternative. Find is app-wide in the sense that
  the user expects Ctrl+F to work wherever scripture is on screen, so on its face this work looks
  like an ADR-0002 case. But `platformScripture.openFind` is not a zero-argument command: it needs
  the id of the web view the user is *in*, the project of the scripture that web view is *showing*
  (for a reference panel this is the displayed resource, not the tab's own `projectId`), and that
  web view's current **text selection** to pre-fill the search box. `before-input-event` fires in the
  main process, which has none of those: it can identify the focused window, not the focused tab, and
  it cannot read a selection inside an `about:srcdoc` iframe. Routing them back would mean inventing
  a "focused scripture tab reports its selection" channel — a platform capability that does not exist.
- **Decision:** Keep the Ctrl+F handler in the renderer, inside the web views, but hold it in **one
  shared hook** — `useOpenFindShortcut` in
  `extensions/src/platform-scripture-editor/src/use-open-find-shortcut.hook.ts` — that every
  scripture tab type mounts (Scripture editor, model text, Bible text, commentary, Text Collection).
  The hook owns the key match, the "no scripture resolved yet" no-op, the selection read, and the
  error logging; a tab supplies only its web view id and the project id of the scripture it is
  showing. ADR-0002 continues to govern shortcuts whose command needs nothing from the focused view.
  The Text Collection tab shows several resources at once and so has no single displayed resource: it
  supplies the project of the resource holding the **caret**, tracked by `useFocusedResourceProjectId`
  off the cells' `data-project-id`.
- **Alternatives:** (a) **A `before-input-event` branch per ADR-0002** — rejected: it cannot supply
  the triggering web view id, the displayed resource's project, or the selection, so Find would open
  against the wrong scripture and never pre-fill. (b) **`before-input-event` plus a new "focused
  scripture tab" PAPI channel that reports id + project + selection** — deferred: that is the
  general fix (and the honest precondition for making Ctrl+F app-global), but it is a platform
  capability well beyond this ticket's scope. (c) **Duplicate the listener per web view** (what the
  first draft of this branch did, with the editor keeping its own inline copy) — rejected: two
  implementations of the same shortcut drift, which is exactly ADR-0002's stated objection.
- **Consequences:** Ctrl+F works only in tabs that mount the hook, so **each new scripture tab type
  is an opt-in** — the real coverage gap of the renderer-level approach, and the one thing the
  main-process handler would have given for free. Adding a tab type is one hook call plus a resolved
  source project. The catalog entry `scripture-find` in `src/stories/keyboard-shortcuts.data.ts` lists
  the hook plus every mount site, so the current coverage is greppable in one place; keeping it
  accurate is what stops the gap from going unnoticed. **Revisit** if (b) is ever built, or once
  enough view-context-dependent shortcuts accumulate to justify a general channel.
- **Source:** PT-4341 "Open Find from any scripture tab type" (PR #2677) — review finding that the
  branch diverged from ADR-0002 without recording why.

## ADR-0016: shadcn `Empty` is the zero-state-with-action primitive; `EmptyState` stays message-only

- **Date:** 2026-08-18
- **Status:** Accepted
- **Context:** PT-4111 needed a zero-state carrying a title, a description, and an optional action
  button (the scripture editor's "this book is not in this project" state, whose Power-mode variant
  offers a Manage Books button). Three candidate shapes already existed and nothing said which to
  reach for. `EmptyState` (`lib/platform-bible-react/src/components/basics/empty-state.component.tsx`,
  2 consumers) renders a single `role="status"` message and has no slot for a title or an action.
  `InstallFailedView` (`extensions/src/platform-scripture-editor/src/install-state-views.component.tsx`,
  2 consumers) is genuinely "full-panel message + action button" but is scoped to DBL install
  recovery. Neither is a general primitive, and the next three tickets in the same epic (PT-4132,
  PT-4347, PT-4349) each need a zero-state too, so an ad-hoc fourth shape would have compounded.
- **Decision:** Vendor shadcn's `empty` into `lib/platform-bible-react/src/components/shadcn-ui/` and
  treat it as the primitive for any zero-state that needs more than a bare sentence — title,
  description, media, or an action. `EmptyState` keeps its existing consumers and remains the
  message-only case; it did NOT gain `title`/`icon`/`action` props. `InstallFailedView` stays local to
  install recovery. Feature-specific zero-states compose `Empty` inside their own extension (see
  `book-not-available-view.component.tsx`) rather than adding variants to the shared library.
- **Alternatives:** **Extend `EmptyState` with optional `title`/`icon`/`action`** — rejected: it
  changes a shared design-system component for the benefit of consumers that do not need the new
  props, and still would not be the primitive UX specified. **Follow the `InstallFailedView` idiom
  with a new local view** — rejected: cheapest for one ticket, but it is an install-recovery view by
  intent, and copying its shape for a fourth time is exactly the drift ADR-0012 warns about; UX also
  specified the shadcn primitive by name. **Hand-write an equivalent component** — rejected: forfeits
  the upstream-diffable baseline that `/add-shadcn-component` exists to preserve.
- **Consequences:** `empty.tsx` must keep its two-commit history (raw shadcn baseline, then the
  standard `pr-twp`/TSDoc customizations) so future shadcn upgrades can diff generated against
  customized — its PR must not be squash-merged. One upstream quirk was kept deliberately:
  `EmptyDescription` is typed `React.ComponentProps<'p'>` but renders a `<div>`; do not "fix" it
  locally, since that would diverge from the baseline for no behavioral gain. Adding a shadcn
  component is its own PR with its own branch, so any feature depending on a not-yet-vendored
  primitive stacks on that PR rather than bundling it — which is how PT-4111 shipped it: the vendoring
  is PR #2690 and the feature PR #2691 is based on it, so squash-merging the feature cannot flatten the
  baseline.

  **Accessibility is the caller's job, and this decision is what makes it so.** `EmptyState` came with
  `role="status"`; `Empty` sets no role, and `EmptyTitle` renders a `<div>` rather than a heading.
  Choosing `Empty` therefore silently drops an announcement that the rejected component provided —
  something this entry originally failed to record, and which a review caught only after the first
  implementation shipped without it. Every `Empty` consumer must pass `role="status"` and nest its own
  heading; a zero state that REPLACES focused content (as the editor canvas one does) must also move
  focus into the region, guarded on the document already having focus. Recorded as a rule in
  [Component-Selection-Quick-Reference.md](Component-Selection-Quick-Reference.md#zero-states-no-content-to-show).
- **Source:** PT-4111 design + implementation. (The original design note lives under gitignored
  `docs/superpowers/specs/`, so it is not a citable reference — the reasoning is reproduced here
  precisely because that path is not readable from the repo.)

## ADR-0017: One-shot launch parameters on `open*` commands: optional scalar, options field, scrubbed on rebuild

- **Date:** 2026-08-18
- **Status:** Accepted. (Briefly amended by ADR-0018, now withdrawn: ADR-0018 asserted that point (4)
  rested on a false premise about `reloadWebView`. Tracing the nonce showed the opposite — the premise
  here is correct and the mechanism is stronger than stated. Point (4)'s wording is corrected below to
  say why the reload works, and the "a nonce or launch token — rejected" alternative stands.)
- **Context:** Opening a tool web view sometimes needs a value that applies to *this* launch only —
  text to pre-fill, a section to land on, a row to pre-select — as distinct from the durable state the
  web view persists. The pattern existed in the codebase but was never written down: `openFind` takes
  `selectedText` and threads it through `FindWebViewOptions.initialSearchText`, and two providers
  force a transient key back to its inert value on every rebuild
  (`platform-scripture-editor/src/main.ts` `isSyncBlocked: false`, and
  `legacy-comment-manager/src/main.ts`, whose comment explicitly cites the former). Because it was
  undocumented, PT-4111's first design independently invented a consume-once protocol plus a launch
  token — machinery the existing pattern does not need — and only discarded it after reading the
  precedents.
- **Decision:** A one-shot launch parameter is (1) an **optional scalar** appended to the `open*`
  command's signature — never a structured request object, and never a new sibling command; (2)
  carried as a field on that web view's `*WebViewOptions`; (3) written into the web view's `state` in
  `getWebView` by **unconditional assignment from the current options**, which is what scrubs a stale
  value off a restored layout; and (4) delivered to an already-open instance by force-calling
  `reloadWebView` when the value is present. Point (4) works because `reloadWebView` **remounts** the
  web view: it re-runs the provider's `getWebView`, and `srcNonce = newNonce()` is regenerated on every
  call and interpolated into the generated `content`
  (`src/renderer/services/web-view.service-host.ts`), so `content` differs each time and the `srcDoc`
  bound in `web-view.component.tsx` changes, reloading the iframe and recreating the React root. The
  mount-time initializers therefore see the new values with no re-apply machinery at all. Note the
  trap: `getWebViewNonce(id)` IS stable per id, but it is not the nonce that reaches `content`. Contextual inputs that can be derived — `projectId`, the
  current reference, the current book — are resolved from the triggering web view's definition
  (`getOpenWebViewDefinition`, `scrollGroupScrRef`), not added as parameters. Only the caller's
  *intent* is passed, because intent is the one thing not derivable.
- **Alternatives:** **A second command** (e.g. `openManageBooksToCreateBook`) — rejected: duplicates
  the resolve-and-open body and grows the command surface for one flag. **A structured options object**
  — rejected by the command-signature rule in `.claude/rules/architecture/extension-patterns.md`
  absent a behavior the bare shape cannot express. **Consume-once in the web view** (read the value,
  then clear the state slot) — rejected: the provider-side scrub already guarantees the value cannot
  outlive its launch, so a second mechanism is redundant and gives two places to get it wrong.
  **A nonce or launch token to make repeat launches re-trigger** — rejected: the force-reload already
  does that. **Conditionally spreading the key only when present** — rejected, and this is the
  subtle one: it reads as tidier but lets a stale value survive a layout restore, which is precisely
  the bug the scrub prevents.
- **Consequences:** Consumers read the value as ordinary mount-time state (a lazy `useState`
  initializer), with no clearing logic and no re-apply effect — re-applying would override the user's
  own in-dialog navigation. Two costs come with the remount that makes this work. First, it discards
  the web view's transient UI state on every relaunch — for Manage Books that is attached import files,
  filter text, presence filter, group-by, copy source and scroll position — which is accepted because a
  relaunch is an explicit user action on a dialog they are choosing to re-target, but it should be
  weighed for any tool a user may be mid-task in. Second, the mechanism rests on a nonce the service
  host has a standing TODO to make stable; if that TODO is ever acted on, every consumer of this
  pattern silently stops seeing new options, so that TODO is the place to look if a launch parameter
  ever stops arriving. A one-shot scroll or other launch side effect must be owned ABOVE any
  conditionally-rendered child that performs it — otherwise the child's own remount (a filter clearing,
  say) re-fires it long after the launch. The scrub is easy to regress into a conditional spread, so it warrants a
  test that fails when the assignment becomes conditional (see
  `manage-books.web-view-provider.test.ts`). Note `useWebViewState` is per-`webViewId` and does not
  survive close/reopen, which is why this pattern flows through provider options rather than relying
  on persisted slots.
- **Source:** PT-4111 implementation; generalizes `openFind`'s `selectedText` and the two existing
  transient-state scrubs.

## ADR-0018: A launch token is required to deliver launch parameters to an already-open web view — WITHDRAWN

- **Date:** 2026-08-18 (withdrawn 2026-08-19)
- **Status:** **Withdrawn.** Its central factual claim is wrong, and the mechanism it introduced was
  dead code. ADR-0017 stands unamended in substance. Kept rather than deleted because the *way* it was
  wrong is the useful part: it is a worked example of a plausible mechanism claim that survived
  implementation, five duplicated code comments and a passing test, and was caught only by tracing the
  nonce to its use site.
- **What was wrong:** it asserted "the generated `content` string and per-id nonce are unchanged." Two
  nonces exist and they were conflated. `getWebViewNonce(id)` is indeed stable per id — but it never
  enters `content`. `srcNonce = newNonce()` does, regenerating on every `getWebView` call and
  interpolated throughout the generated document, so `content` differs on every reload,
  `web-view.component.tsx`'s `srcDoc={content}` changes, the iframe reloads, and the React root IS
  destroyed and recreated. The service host even carries a standing TODO saying so in as many words
  ("Generating nonces every time causes webviews to rerender every time `getWebView` is used on an
  existing webview").
- **Consequences of the withdrawal:** the launch token could never have fired — every guard seeded its
  ref from the incoming token at mount, so `launchToken === ref.current` was always true and no effect
  body ever ran. The feature worked throughout because ADR-0017's lazy initializers were correct all
  along. The token plumbing has been removed from all five files, and the inverted trade-off ADR-0018
  claimed to avoid is recorded honestly in ADR-0017's consequences instead: the remount really does
  discard in-dialog state, which is the cost of the mechanism rather than something a token avoided.
  The sibling `projectId` bug ADR-0018 reported is likewise not a bug: a mount-only initializer is
  correct precisely because the reload remounts.
- **Process lesson:** a claim about platform behavior belongs in ONE place. This one was duplicated into
  five code comments, and when it turned out false all five were wrong together — and their number read
  as corroboration. Assert platform mechanics once, at the site that depends on them, and link to it.
- **Superseded content follows, for the record.**
- **Original status:** Accepted (supersedes ADR-0017's delivery mechanism)
- **Context:** ADR-0017 rejected a launch token on the stated premise that force-calling
  `reloadWebView` re-triggers the launch. Code review traced the call and found the premise false.
  `reloadWebView` -> `openOrReloadWebView` (`src/renderer/services/web-view.service-host.ts`) calls the
  provider's `getWebView` and saves the new state, but the iframe is **not** reloaded: the generated
  `content` string and per-id nonce are unchanged, so only `onDidUpdateWebView` fires
  (`src/renderer/components/web-view.component.tsx` re-sets `srcDoc` only when `content` changes). The
  existing React root re-renders and never unmounts. `useWebViewState` does surface the new values, but
  ADR-0017's prescribed consumer shape — a lazy `useState` initializer — does not re-run on re-render,
  and a mount-only `useLayoutEffect([])` does not re-fire. Net user-visible effect for PT-4111: with
  Manage Books already open, choosing "Manage books" from the not-available view fronted the tab but
  left it on the previous section with no preselection and no scroll — the feature's core affordance
  silently no-opped. Implementing the fix surfaced a second latent bug: a `useEffect` resetting
  `selectionsByAction` on `projectId` also ran on mount, wiping the lazy-initialized preselection, so
  even the *first*-launch case never worked.
- **Decision:** Carry a monotonically increasing **launch token** in the web view's options alongside
  the launch parameters, bumped on every `open*` invocation, scrubbed by the same unconditional
  assignment ADR-0017 point (3) prescribes. Consumers apply launch parameters in an **effect keyed on
  the token**, not in a lazy `useState` initializer. A token — rather than comparing the parameter
  values — is required because two consecutive identical launches produce identical parameters and are
  otherwise indistinguishable.
- **Alternatives:** **Compare parameter values and re-apply on change** — rejected: cannot distinguish
  a repeat launch with the same parameters, which is a normal case. **Remount via a `key` derived from
  the token** — viable and simpler to reason about, but discards all unrelated in-dialog state (scroll,
  other sections' selections) that the user may care about; the keyed effect preserves it. **Make
  `reloadWebView` genuinely reload the iframe** — rejected as out of scope and far more disruptive: it
  would change behavior for every existing caller.
- **Consequences:** ADR-0017's "no re-apply effect" consequence is reversed; the re-apply is scoped so
  it overrides only the launched-to section's selection and leaves the user's other in-dialog state
  intact. The same token fixes the sibling case where `projectId` was seeded by a mount-only
  initializer, so "reload updates the existing tab with the new project context" now holds. The
  already-open relaunch path needs a test — it is invisible in the mount-only tests that previously
  covered this feature (see `manage-books-dialog.component.test.tsx`). More generally: `reloadWebView`
  should not be assumed to remount anything.
- **Source:** PT-4111 `/review-paratext` code review. Withdrawn after PR #2691 review traced
  `srcNonce` to its use site.
## ADR-0019: Service routers discover shards by network-object type, not by rebuilding the scoped name

- **Date:** 2026-08-06
- **Status:** Accepted
- **Context:** ADR-0007 gave every per-window service a `${name}-${windowId}` registration name, and
  main's routers found a window's implementation by building that string again. So did window
  readiness (ADR-0010), which parsed a window id back out of a network object id. That made the
  name shape a contract between two processes that no type could check, spread across a dozen sites,
  and it needed `as` assertions to defeat the typed provider-name system. It also meant a router
  asked the network object service for a name that might not exist, paying its registration retry to
  learn nothing.
- **Decision:** A shard registers with a distinct `objectType` per service (`'webViewServiceShard'`,
  `'notificationServiceShard'`, `'windowServiceShard'`) and a `windowId` attribute
  (`src/shared/models/service-shard.model.ts`). Each router keeps an index built from the
  `onDidCreateNetworkObject` / `onDidDisposeNetworkObject` announcements, filtered on that type
  (`createServiceShardIndex`), and resolves a window's shard through it. Window readiness listens to
  the same index rather than parsing ids. The scoped names stay exactly as they were — this changes
  discovery only.
- **Alternatives:** One generic `'windowScopedService'` type for every shard — rejected: filtering
  for exactly the thing you want beats filtering everything and re-filtering on an attribute, and
  `'webViewService'` already means something else here. Scanning
  `getAllNetworkObjectDetails` per call — rejected: an index is O(1) and gets window close right for
  free. Converting the network object shards to data providers to reuse `getByType` — unnecessary:
  `registerEngine` passes `dataProviderType`/`dataProviderAttributes` straight to
  `networkObjectService.set`, so transport is orthogonal to discovery.
- **Consequences:** a router asking about a window that has not registered gets `undefined`
  immediately instead of after a retry; a shard leaves its router's view the moment its network
  object is announced as disposed, which is what happens when its window closes. The index is built
  from announcements, so a router MUST start before any window is created — the same assumption
  `network-object-status.service-host.ts` already makes. This does not yet apply to
  `command.service-router.ts`, which forwards request names rather than resolving a network object
  and still builds `${name}-${targetWindowId}` strings; it keeps no index. That module is
  transitional — each of its commands moves into the router for its own service — so it is expected
  to go away rather than to be converted.
- **Amended 2026-08-07 (ADR-0022):** `command.service-router.ts` is gone, so the exception above is
  spent — every ROUTER now discovers its shards through an index. The index also answers with the id
  a shard ANNOUNCED (`getShardNetworkObjectId`), which is what lets a router name one of a shard's
  methods — `object:{id}.{method}`, for a request timeout — without that being a second rebuild of
  the same name. It reports a shard's departure as well as its arrival, so a router that did
  something outside itself on arrival can undo it.
- **Carve-out — `src/shared/services/window.service.ts`:** one module outside the routers still
  builds a window-scoped name, spelling `${windowServiceProviderName}-${windowId}` to reach a
  window's window-service DATA PROVIDER — for its own window, and (after a
  `platform.getFocusedWindowId` round trip) for the focused one. Deliberate, and stated in the file
  itself: a data provider is not a network object shard, and this module runs in every process
  including the extension host, where there is no window of its own to ask. Main does publish a
  generic `windowServiceProviderName` backed by an engine that forwards to the routing target, so
  the carve-out could be retired by resolving that name instead — but the two do not answer
  identically. `platform.getFocusedWindowId` is raw Electron focus, while the router's target is
  focus PLUS readiness PLUS not-closing, so swapping them changes what `papi.window` answers during
  startup, teardown and quit. That is its own change with its own tests, not a rename.
- **Source:** PT-4275 epic (multi-window architecture plan step 2).

## ADR-0020: The scroll group service is hosted in main, and each renderer keeps a predicting cache

- **Date:** 2026-08-07
- **Status:** Accepted
- **Context:** A scroll group is app-global — group 1 is on one reference for the whole app — but a
  renderer was holding it, and any window can be closed. The scroll group service's whole job is
  holding app-global state, so the state had a home problem, not a routing problem: ADR-0008's
  routers forward to a window, and there is no per-window answer to forward to.
- **Decision:** Main owns the scroll group state — each group's Scripture reference and source
  project (persisted through main's file-backed `localStorage` polyfill, under the keys the renderer
  used) and its session-only reference history — and registers the `ScrollGroupService` network
  object before any window is created. Each renderer's `scroll-group.service.ts` becomes what the
  Service/Service Host pattern already calls it: a local representation. It seeds a copy of the
  host's state at startup, keeps it current from the host's events, serves the `*Sync` readers from
  it, and predicts the host's answer for a `*Sync` write — returning the prediction immediately,
  sending the write on, and resyncing the group from the host if the host declines it or the write
  never lands. Two operations exist for that cache-keeping alone (a whole-state snapshot, and a
  one-time handover of state persisted where main cannot read it); they are on the network object but
  off `IScrollGroupService`, so `papi.scrollGroups` does not offer them. Three things follow from the
  cache being a cache rather than the authority: (1) main hands each window the state it holds on the
  window's URL — the channel `WINDOW_ID` already travels on — so the cache is right on the first
  render instead of after a round trip; (2) `papi.scrollGroups` in the renderer resolves to that same
  cache rather than to the shared network proxy, so everything in one window gives one answer about
  where a scroll group is; and (3) main's store is written on a short debounce with a flush at
  shutdown, because each write is a synchronous fsync on the event loop the whole app's JSON-RPC
  traffic shares.
- **Alternatives:** (a) Leave the state in a renderer and give the app a way to move it to another
  window when that one closes — rejected: it makes losing the host cheaper to recover from without
  making it impossible, and the state still sits behind a window the user can close at any moment.
  (b) A service router for scroll groups — rejected: a router picks one window to answer, and no
  window has the right answer for state that belongs to all of them. (c) Route every read through
  main and drop the sync API — rejected: the UI
  reads a group's reference during render and inside keystroke handlers, where there is no room to
  await. (d) Keep versification conversion with the state in main — rejected: the hot-path consumer
  is in the renderer, so converting in main would add a hop per navigation AND leave the renderer
  needing its own cache anyway for the synchronous reader; main keeps an uncached pass-through for
  remote callers, which cannot go stale, at the price of a round trip per remote conversion —
  acceptable while remote conversion requests are occasional, and worth revisiting if a consumer
  outside the renderer starts converting per navigation. (e) Let the renderer's cache fill from the
  host's snapshot alone and accept the default reference on the first render — rejected: the sync
  readers run during that render, so the toolbar, the keyboard navigation commands, and every
  scroll-group-following web view would start on Genesis 1:1 and jump, which for a restored Scripture
  editor is a whole extra chapter load on the startup path this epic is trying to shorten. (f) Await
  the cache's startup before rendering React — rejected: it puts a round trip on the critical startup
  path to fix a problem the window's own URL already solves.
- **Consequences:** the app-global invariant of `Architecture.md` §2 now holds for the scroll group
  service outright — no window registers its name, so no window can lose it. Two `*Sync` booleans
  (`setScrRefSync`, `navigateReferenceHistorySync`) become predictions rather than confirmations;
  they can differ from the host only while a change from another window is in flight, which is the
  same instant-race the single host has always resolved by arrival order, and the loser converges on
  the host's next event. Reads from OTHER processes (`papi.scrollGroups` in the extension host) can
  briefly sit behind what a window's own UI is showing, for the length of a predicted write; the
  host's event is what everything converges on. Reference history is deliberately app-global and
  single-authority: windows sharing a group are on the same reference by definition, so per-window
  trails could only diverge through a mirroring race or pre-join state. Serialization semantics for
  concurrent navigation from several windows are PT-4270's. Persistence lags memory by the debounce
  interval, so a crash — not a quit, which flushes — loses at most one navigation's worth of scroll
  position. The one-time handover of pre-host state is adopt-then-flag and answers the offering
  window, which stops offering on either answer — by writing a renderer-local marker key rather than
  by deleting the pre-host keys, so an older build downgraded onto the profile still finds the
  reference the user left off at. What a downgrade still cannot do is round-trip: a profile that
  downgrades, navigates on the old build, and upgrades again loses that navigation, because the host
  refuses an offer once it has state of its own. Because the window's URL is a SEED rather than a one-off argument, the renderer
  rewrites its own query parameter (`history.replaceState`) whenever the cache changes: a RELOAD
  replays that URL, and the pre-host store a reloaded document would otherwise fall back to has been
  handed over by then, so a URL left as old as the window would put a reloaded window
  back on the reference it opened on — which for a restored Scripture editor is the extra chapter
  load the seed exists to avoid. The theme service is hosted the same way in ADR-0021.
- **Source:** PT-4275 epic (multi-window architecture plan §6).


## ADR-0021: The theme service is hosted in main, and each window caches the current theme

- **Date:** 2026-08-07
- **Status:** Accepted
- **Context:** The theme is app-global — one current theme, one should-match-system setting, one set
  of user-defined themes — but the engine that owned it was hosted in a renderer, and any window can
  be closed. A window that did not hold the engine also answered `getCurrentThemeSync` from its
  module-load snapshot, which is what baked a stale theme into a new web view's `srcdoc` (the
  staleness noted in §9.2 of the plan).
- **Decision:** Main owns the three persisted values and registers the theme data provider under its
  existing name before any window is created. Each renderer's `theme.service.ts` becomes a local
  representation: it seeds a copy of the current theme synchronously at module load, keeps it current
  from the host's `subscribeCurrentTheme`, and serves `getCurrentThemeSync` from it — so the sync
  answer is fed by the update event rather than being a module-load snapshot, and the §9.2 staleness
  is gone by construction. Everything else on the service is a plain pass-through: unlike the scroll
  group there is no synchronous WRITER, so nothing is predicted. The OS dark-mode preference is read
  in main from Electron's `nativeTheme` (`shouldUseDarkColors` plus `on('updated')`) instead of a
  `matchMedia` listener per window. One `migrateStoredThemeState` method, off `IThemeService` and
  marked experimental on both surfaces, adopts state persisted in a renderer's store before this
  change — adopt-then-flag, first offer wins, and the offering window drops its keys on either
  answer. Main's own consumer (the Windows title-bar overlay colours) reads and subscribes locally
  rather than through the provider its own process registers.
- **Alternatives:** (a) Leave the engine in a renderer and give the app a way to move it to another
  window when that one closes — rejected for the same reason as in ADR-0020, and the theme would
  have been the second service to need that machinery, which is what made hosting both in main
  better than building it once. (b) Fix the §9.2 staleness in place and leave the engine in a
  renderer — rejected: it treats the symptom of state living somewhere closable. (c) Keep the OS
  preference in the renderer and send it to main — rejected: it is one fact about the machine, so N
  windows watching it is N chances to disagree, and `nativeTheme` is strictly better placed. (d) Put
  the migration on a command instead of the provider — rejected: it is one caller reaching one host,
  which is what the provider already is; a command would add a globally-unique name for it. (e) Seed
  the renderer's cache from the host's snapshot alone and accept the default theme on the first frame
  — rejected: that frame is the flash of unstyled content `index.tsx` reads `getCurrentThemeSync`
  before React renders specifically to beat, and every web view bakes the same value into its
  `srcdoc`.
- **Consequences:** the app-global invariant of `Architecture.md` §2 now holds for every platform
  service — no renderer registers a globally-unique name, so no window's close can take one down or
  leave it for another window to claim. A window that is RELOADED replays the URL main built when the
  window was created, whose theme would otherwise be as old as the window, so the renderer rewrites
  its own query parameter on every change — the same
  mechanism the scroll group uses (ADR-0020), rather than a second seed source and a navigation-type
  sniff to choose between them. `shouldMatchSystem` is computed in main only; a renderer that starts
  applying its own `matchMedia` would double-apply it. `hasOwnThemeState` — what makes the host
  refuse a migration offer — is seeded from a DEDICATED marker key that only the three public
  setters and an adoption write, deliberately not from the presence of the three value keys, because
  the engine also writes those on its own while extension themes load (matching the theme type to
  the machine's dark-mode preference does it on the first start of a dark-mode machine) and those
  writes say nothing about what the user chose; reading them back as a user choice would refuse a
  handover that had not happened yet, and a refusal is what makes the offering window delete its
  copy. The offering renderer records that it has finished offering with a marker key of its own
  rather than by deleting the three pre-host value keys, so an older build downgraded onto the
  profile still paints the theme the user chose; a downgrade cannot round-trip a theme changed on
  the old build, which was true before the marker existed too. "Do I have a theme worth handing a
  new window?" is deliberately a DIFFERENT question,
  answered by "is this still the compile-time default?", so a theme derived from the OS preference
  still travels on the URL. The theme list comes from a provider the extension host registers, which
  does not exist when this host starts and which `platform.restartExtensionHost` replaces, so the
  subscription is taken whenever that provider is announced rather than once — and the deadline for
  "the current theme no longer exists, reset it" runs from that list's first payload rather than
  from this process's age, which is not a bound on when the extension host publishes. `nativeTheme`
  cannot be touched before Electron's `ready` event, so the host awaits `app.whenReady()` before
  building its engine, which makes it the one app-global registration that is not purely synchronous
  in startup order — and everything main awaits after that batch, including the .NET and
  extension-host spawns, is behind `ready` too. Measured rather than assumed (`PT_STARTUP_MARKS`,
  dev build, Linux): the wait ends at +152 ms from process start, and `extension-host-forked`
  lands at +188 ms against +175 ms without the theme host at all — inside run-to-run noise,
  because `ready` fires while main is still doing work it would have done anyway. The mark
  `theme-host-electron-ready` is emitted where the wait ends so this stays checkable. What is NOT
  free is resolving the theme data provider: an unregistered data provider is only answered after
  the whole RPC retry budget (~10 s), so the host's first subscribe attempt is deliberately not
  awaited — awaiting it put ten seconds in front of both process spawns.
- **Source:** PT-4275 epic (multi-window architecture plan §6, theme half; §9.2 for the staleness it
  closes).

## ADR-0022: Renderer platform code registers no command or request names; routers call shard methods

- **Date:** 2026-08-07
- **Status:** Accepted
- **Context:** ADR-0007 scoped each window's copy of the renderer-hosted commands and dialog requests
  under a `${name}-${windowId}` suffix, and ADR-0008's `command.service-router.ts` forwarded the
  generic name to the right window's scoped name. That worked, but it made the set of per-window
  commands a **list** — `RENDERER_HOSTED_COMMAND_NAMES`, `RENDERER_HOSTED_COMMAND_DOCS`,
  `RENDERER_HOSTED_DIALOG_REQUEST_NAMES` — that a renderer had to register against and that nothing
  could check across module boundaries. Two startup coverage checks and two registry modules existed
  only to catch a name on the list that no module had registered, and a command whose handler had a
  web view id as its first documented parameter had to be sorted into owner-routed rather than
  focus-routed by reading its own OpenRPC docs.
- **Decision:** Move every one of those commands into the router for its own service, where the
  router registers the generic name in main and calls a **method on the window's service shard**
  instead of forwarding to a scoped command name. The dialog service, the Usersnap feedback widget,
  and the BookChapterControl each got a shard and a router; the settings commands joined the WebView
  router, which already knew how to find a web view's owning window; the scripture navigation
  commands moved into main outright, asking the window one question (`getNavigationContext`) and then
  computing and writing in main. Renderer platform code now registers no command or request name,
  scoped or otherwise.
- **Alternatives:** Keep the transitional router and its name lists — rejected: the lists are the
  cost, not the routing. Give the platform a per-window command facility so a renderer could keep
  registering — rejected: it would make the shape this ADR removes into supported API, and the shard
  interface already expresses "one window's implementation of a service" with compile-time checking
  that a name list cannot have. Put the new methods on the existing public services
  (`WebViewServiceType`, `IWindowService`) — rejected: both are emitted into `papi.d.ts`, so a UI
  affordance would become permanent extension-facing API; the shards extend those types privately
  instead, and the router objects stay typed as the public service so the public surface is
  byte-identical.
- **Consequences:** `papi.d.ts` **shrinks** by three `@experimental` exports
  (`RENDERER_HOSTED_COMMAND_NAMES`, `RENDERER_HOSTED_COMMAND_DOCS`,
  `RENDERER_HOSTED_DIALOG_REQUEST_NAMES`) and grows by one, also `@experimental`
  (`getNetworkObjectMethodRequestType`, which is how a router names one of a shard's methods to give
  that one method a request timeout). Removing the three is a breaking change for anyone who
  imported them, which is why they were experimental — and all three were introduced within this
  same epic, never on a release. `command.service-router.ts`,
  `renderer-hosted-command-registry.ts`, `renderer-hosted-dialog-registry.ts`, and both startup
  coverage checks are deleted; what replaces their guarantee is that each router's registration list
  is asserted by its own test, and each shard's methods are checked by its interface. Owner-vs-focus
  routing is no longer derived from OpenRPC parameter names as a routing INPUT — it is written per
  command in the router, so `platform.openSettings` naming a web view routes by ownership while
  `platform.openUserSettings` follows focus, and each is pinned by a test; the parameter names are
  kept as a startup assertion instead, so a command that documents `webViewId` first and is not
  owner-routed is reported rather than silently following focus. All twenty moved names report an
  unreachable window the same way — by throwing at call time, as the transitional router did — which
  the eight navigation commands need stating explicitly because they resolve a value: a go-to
  resolves `undefined` and a history command resolves a boolean, so `false` means "nothing to move
  to" and never "this could not run". Two behavior changes. The go-to commands are serialized by two
  locks, not one; the two history commands take neither. The per-renderer mutex became app-global,
  since the handler runs in main: two windows driving one scroll group are serialized against each
  other, which a per-renderer lock could not do. That lock holds main's own read-compute-write plus
  the versification-bounds fetch and the `availableBooks` await, so everything the write depends on
  is decided inside it. Outside it, a second mutex keyed per WINDOW
  (`navigationCommandMutexesByWindowId`) wraps the whole handler, including the round trip that asks
  a window what to navigate. That ask has to be inside a lock because for a detached target it IS
  the read: overlapping runs that each ask before taking the inner lock all compute from the same
  reference, so a held key — one fire-and-forget command per OS auto-repeat — advanced one verse N
  times instead of N verses. It is keyed by window rather than app-global because the ask is a
  request to another process, and a window that has stopped answering takes the whole request
  timeout to say so; behind one shared lock that wait would stall every other window's navigation
  for its duration. And a go-to now steps from the reference main holds rather than from the asking
  window's predicting cache, which is what keeps a held key advancing one step per repeat; a
  navigation the window itself just made reaches main one hop later. Cross-window navigation
  ordering beyond this is PT-4270. Registering three routers plus the navigation commands adds four
  entries to main's awaited startup batch; they are in-process registrations against main's own RPC
  server.
- **Marking pre-existing names experimental:** this epic republishes names that already existed, and
  it treats them two ways on purpose, so the rule is written down here rather than re-argued at each
  router move. **Mark the OBJECT when the contract behind its name changed** — `WebViewService`,
  `NotificationService` and `platform.windowServiceDataProvider` are all old names whose whole method
  surface is now `x-experimental`, because several of their methods fan out over windows or route by
  ownership and can fail in ways a single-window caller never had to handle. **Leave an individual
  legacy COMMAND's flag alone** — `platform.about`, the three settings commands and the four Usersnap
  commands stay unmarked, and tests pin that they do not drift, because moving where a command's
  handler runs is not a change to what a caller of that command may rely on. New names, of course,
  are marked on both surfaces regardless.
- **Source:** PT-4275 (multi-window epic), multi-window architecture plan §7 and §9.1; branch
  `pt-4275-commands-to-main`.
