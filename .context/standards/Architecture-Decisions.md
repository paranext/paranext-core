# Architecture Decisions

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

A lightweight, append-only log of **significant architecture decisions** and the reasoning behind
them. It holds the one thing the prescriptive standards (`Architecture.md`,
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
  it; add the new decision as a new entry.
- **Append at the end**, newest last. Number entries `ADR-NNNN`.
- **Numbers are claimed at merge, not at write.** Several branches in flight at once each append the
  next free number as of the day they branched, so two unmerged branches routinely carry the SAME
  number for different decisions — and because the file is append-only, nothing catches it: the
  second merge simply leaves `main` with two identical headings. Before merging a PR that adds an
  entry, re-read the last heading on `main` and renumber yours to follow it, updating any
  cross-references. Whoever merges second does the renumbering.

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
  command names). The pre-existing generic name is kept working via a routing proxy (ADR-0008).
- **Alternatives:** One shared instance for all windows — rejected: state (open web views, toasts,
  dialogs) is inherently per-window. A single object internally keyed by window id under the old
  generic name only — rejected: reinvents what `networkObjectService`'s per-name registration and
  `rpc.discover` already give for free.
- **Consequences:** every window-scoped service now has a scoped identity and (via the proxy) a
  generic one; new window-scoped services must follow the same convention and get a routing proxy if
  generic-name callers exist. **Do not rely on a window disposing its own registrations as it
  closes** — it cannot: a closing window drops its RPC connection without disposing anything it
  hosted, and `destroy()` does not run `beforeunload` at all. Scoped registrations are instead
  cleaned up by the surviving processes: main announces the close on
  `EVENT_NAME_ON_DID_CLOSE_WINDOW`, and every process sweeps the registrations that announcement
  makes unreachable (`sweepUnreachableRemoteObjectsAfterWindowClose` in `network-object.service.ts`,
  with one retry for the sweep that runs before the connection teardown lands). A window-scoped
  service therefore has to tolerate its own registrations outliving its window for a moment, and
  consumers have to tolerate resolving one that is already gone.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0008: Generic-name routing proxies in main forward to the focused/owning window's scoped service

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Existing PAPI consumers call services by their historical generic name
  (`platform.webViewService`, `dialog:showDialog`, `platform.about`, ...) with no window argument.
  After ADR-0007 scoped each window's copy under its own name, nothing answers the generic name.
- **Decision:** Main registers one routing proxy per generic name (`command-routing.service.ts` —
  which also registers the dialog-request proxies, `notification-routing.service.ts`,
  `web-view-routing.service.ts`, `window-routing.service.ts`) that forwards to the scoped service of
  the window that should handle it: the owning window when ownership is determinable (e.g. a command
  whose first argument names a web view routes to the window that owns that web view), otherwise the
  routing target (ADR-0010). A few read-only queries fan out and merge across all windows instead,
  where a merged view is the meaningful answer.
- **Alternatives:** Push a window-id argument onto every external caller — rejected: breaks every
  existing extension/PAPI consumer and the documented `papi.d.ts` signatures. Always fan out to every
  window — rejected as the general answer: most of these calls are single-target actions where
  fanning out isn't meaningful, and forwarding to a not-yet-ready window is measurably costly.
- **Consequences:** external callers of the generic name are unaffected by multi-window; the
  owner/target-selection logic in each proxy is now load-bearing, and two rules fell out of getting
  it wrong first. Fan-outs ask only the windows that can answer (`getReadyWindowIds`), because
  forwarding to a window whose renderer has not registered costs that call the network service's
  whole registration retry. And an owner probe that could not reach a window fails the call rather
  than falling back to the routing target: "could not ask" is not "answered no", and the window that
  did not answer may be the one that owns the web view.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0009: App-global singleton services elect a host window first-come, with takeover on host-window close

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Some services are conceptually app-global, not per-window (the theme engine, the
  scroll group service) — exactly one instance for the whole app — but every window's renderer runs
  the same startup code, so no window is distinguished as host in advance.
- **Decision:** Every window's renderer races to register the same singleton network-object name at
  startup; the winner becomes the host, and every other window attaches to (proxies through) it
  instead of registering its own. If the host window closes, surviving windows sweep for the
  now-unreachable registration and re-run the same election so a new host takes over.
- **Alternatives:** Always host the singleton in main — rejected: these services' state and
  registration machinery already live in renderer-side service-host modules built around
  `dataProviderService`/`networkObjectService`; moving them to main is a larger rewrite for the same
  effect. A fixed "primary" window as host — rejected: any window, including the first, can be
  closed by the user, so a fixed designation would still need a takeover path.
- **Consequences:** the app has exactly one theme engine and one scroll group service at all times,
  transparent to consumers. The election/sweep/re-host machinery is implemented twice today (theme,
  scroll group) and has already drifted between the two copies, so the duplication is worth
  extracting into a shared helper.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0010: Window readiness is tracked in main via window-service registration, used to pick routing targets

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** A window's `BrowserWindow` exists (and is enumerable) well before its renderer has
  registered any window-scoped service, because window creation and renderer service startup are
  asynchronous. Routing proxies (ADR-0008) need to avoid picking a window that can't yet answer.
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
  either the target window id, or the same window flipping ready/not-ready — so routing proxies and
  other consumers can react without polling.
- **Alternatives:** Wait for every window-scoped service to individually confirm registration before
  considering a window ready — more correct but heavier; the window service starts reliably early and
  stands in well enough for "this window is alive," at the cost of a startup-ordering gap (a window
  can be ready while its other services are still registering). No readiness tracking, always try the
  target and eat the retry cost — rejected: this is exactly where the ~9s registration-race retries in
  `network.service.ts` come from.
- **Consequences:** routing proxies get a cheap way to skip an unready window in the common case, at
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
  `InstallFailedView` (then at
  `extensions/src/platform-scripture-editor/src/install-state-views.component.tsx`; renamed
  `RetryableErrorView` in `panel-state-views.component.tsx` by PT-4347 — see ADR-0022,
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

## ADR-0019: Verse 0 resolves to verse 1 on single-verse display surfaces (display-only)

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** A verse-0 reference means "everything preceding verse 1" — book/chapter intros,
  titles, outlines, Psalm `\d` superscriptions. It is reachable three ways: placing the cursor in
  pre-verse-1 editor content (`usj-reader-writer.ts` reports `verseNum: 0`); the toolbar
  previous-verse button, which calls `getPreviousVerseRef` **without** `bounds`
  (`book-chapter-control.navigation.ts`), so its no-versification branch floors at verse 0 in any
  chapter, not just chapter 1; and typing a `C:0` reference. A one-verse-tall surface has no useful
  way to render that content, so the Text Collection showed an empty cell at Luke 1:0 —
  [PT-3133](https://paratextstudio.atlassian.net/browse/PT-3133). PT9's
  Text Collection shows verse 1 there instead. A4/PT-4052 (PR #2509) shipped a "No text for this
  verse" ghost-text state, contradicting PT-3133's written acceptance (display verse 1); the
  divergence went unflagged until PT-4061.
- **Decision:** Single-verse display surfaces resolve a verse-0 reference to verse 1 via
  `resolveDisplayVerseNum` (`extensions/src/platform-scripture-editor/src/scripture-text-grid/verse-display.utils.ts`),
  confirmed by Ian Hewerdine 2026-08-05. Three constraints make this safe:
  - **Display-only, and it carries an explicit guard.** The resolved verse is never written back to
    the scroll group — writing it back would yank the Scripture Editor off the intro the user came
    from. `Editorial`'s `ScriptureReferencePlugin` mounts even when `isReadonly` is set (`Editor.tsx`
    gates it on `scrRef && onScrRefChange` only) and reports a selection whose book, chapter, or
    verse disagrees with `scrRef`, so `ResourceCell` swallows the echo.

    **The guard is defense-in-depth, not a fix for a live report.** `$resolvePosition` refuses to
    describe a position in a document with no `BookNode` and no `ChapterNode` (upstream invariant I5),
    and `sliceUsjToVerse` drops both — so the plugin is silent in verse mode, and the
    `viewMode === 'verse'` branch of `handleScrRefChange` is unreachable. It is kept because it costs
    nothing and is the right shape if a future editor makes slices addressable; do not read it as
    evidence that a write-back currently occurs.

    Verified 2026-08-16 against `@eten-tech-foundation/platform-editor` **0.8.15**, in both places it
    can be read: the published npm package, and `dev-packages/scripture-editors` `packages/platform`,
    which `postinstall` → `link-dev-packages` builds and yalc-links over `node_modules`. They agree
    on this mechanism (the vendored copy trails published 0.8.15 by one caret-placement line in
    `$moveCaretToVerseStart`). **Verify against the linked build, not `package-lock.json`** — the lock
    still named 0.8.14 when this was written, and reading that stale tarball is exactly how an earlier
    draft of this ADR came to describe `$findAndSetChapterAndVerse` and its chapter-1 fallback as the
    live mechanism. That was wrong; that plugin does not exist in 0.8.15. Corrected in review of
    #2663.

    **The guard belongs in the consumer, not upstream in the plugin.** Gating the plugin on
    `isReadonly` was considered and is rejected on the merits, not merely deferred: the plugin is
    **bidirectional** — `$moveCaretToVerseStart` applies `scrRef` to the caret, and `$resolvePosition`
    → `onSelectionSettled` → `report` reports the caret back — and read-only surfaces need both
    halves. Not mounting it when read-only would break navigation-to-verse in every read-only editor
    and would break read-only click-to-sync, which **this grid's chapter mode and the Resource Viewer
    rely on** — those feed a whole chapter, so the document carries the book and chapter nodes
    `$resolvePosition` needs. (Scoped deliberately: click-to-sync is *not* load-bearing in verse mode,
    where the slice is unaddressable and no click reports anything. That predates this decision —
    `sliceUsjToVerse` has dropped chapter chrome since #2509 — and is not a lost capability, since a
    verse cell holds only the verse you are already on and so has nowhere to sync TO. Deliberately
    not filed.) `isReadonly` is therefore the wrong predicate: a read-only editor reporting its
    caret position is correct behavior, not the bug. The bug is narrower and entirely host-made —
    *we* hand the editor verse 1's USJ while telling it verse 0, so the only component that knows
    the reference is a deliberate lie is the one that told it. Whoever creates the mismatch owns
    swallowing it. The generalizable fix, if a third surface ever wants one, is not an `isReadonly`
    gate but for the promoted helper to carry the guard with it (see Consequences) — the rule and
    its guard are one unit.
  - **Chapter surfaces are exempt.** Anything rendering a whole chapter shows verse-0 front matter
    directly: the Text Collection's chapter mode, its chapter-context split, its single-resource
    path (`ScriptureTextGrid` renders one shown resource as `viewMode="chapter"`, so verse-0
    behavior differs between one and several resources), and the Resource Viewer
    (`resource-text-panel.web-view.tsx`). Correct behavior, signed off by Ian on PT-3133.
  - **Genuinely-missing verses keep the ghost text.** Fall-forward applies only to verse 0. A verse
    absent from a resource (an NT-only resource at an OT reference, an untranslated verse) still
    renders "No text for this verse".
  Accessible names resolve the same way, so the announcement names the verse the cells display. It
  names the row, not its contents: a resource lacking verse 1 shows the empty state under the same
  label, and a combined opener renders a "1-3" verse number under a label saying "1".
- **Alternatives:** (a) *Keep the ghost-text empty state* — rejected: it blanks every cell at once
  exactly when the user crosses a chapter or book boundary, so the tool reads as broken at the
  moment it should be most useful; it also contradicts PT-3133's written acceptance. (b) *Normalize
  the reference — forbid verse 0 in the Text Collection, or write verse 1 back to the scroll group*
  (Todd Hoatson's suggestion on PT-3133) — rejected: the scroll group is shared, so it would move
  every other view off the intro. (c) *Put the rule inside `sliceUsjToVerse`* — rejected: the
  decision is about the **reference**, not the USJ, and the accessible-name site needs it without
  having any USJ; burying a copy there would centralize nothing while making
  `sliceUsjToVerse(usj, 0)` silently return verse 1. (d) *Fall forward only when verse 0 has no
  content of its own* — a content-aware rule (raised in review of #2663). The distinction it draws is
  real in the source: a `\d` superscription is one short line that a one-verse-tall cell renders
  fine, whereas book/chapter intros and outlines are what genuinely cannot be rendered there. Under
  it, PT9 parity would hold where it actually matters (the intro case), `<` from Psalms verse 1 would
  produce a visible change instead of a silent one, and no real Scripture would be hidden in verse
  view. Rejected on cost and consistency: the helper would need the chapter USJ, and the
  accessible-name site in `ScriptureTextGrid` has none — it names the row before any resource has
  fetched anything — which is exactly why the rule is reference-only. Making it content-aware would
  either force a USJ through the naming path or split the rule in two (a USJ-aware version for cells,
  a reference-only version for labels), and per-resource content-awareness would make the *same*
  reference fall forward in one cell and not in its neighbor, so a row of cells would disagree about
  which verse they are showing. Worth revisiting if the superscription case draws real complaints,
  since it is the one place this decision hides genuine content.
- **Consequences:** verse-0 content is not shown in verse view — deliberately. It stays one click
  away via the chapter-context split, which renders the chapter unsliced; that escape hatch is what
  makes the trade acceptable, so **revisit if the chapter-context split is ever removed or made
  non-obvious**. Verse 0 and verse 1 now render identically and carry the same accessible name, so
  stepping backward across that boundary produces no visible or announced change **within the grid**
  — accepted, since the alternative is a row of ghost text at every chapter boundary.

  **Verse 0 becomes unobservable inside the Text Collection, including to assistive tech** (raised
  in review of #2663). At a verse-0 reference the row label announces "MAT 5:1", the cells render
  verse 1, and nothing in the grid states that the shared reference is actually 5:0 — so a
  screen-reader user has no in-grid signal that they are at the boundary. This is a genuine accepted
  cost of naming the row after what it displays, not an oversight: the alternative is a label that
  announces a verse the cells demonstrably do not show, which is worse. Two things keep it from
  being a true silent dead end, and both live outside the grid: the BCV control still displays the
  real reference (`5:0`), and its **previous-verse button is disabled** at verse 0, which is an
  announced state change rather than an inert control — `isNoOpNavigation` in
  `book-chapter-control.navigation.ts` disables a step that would return the same ref, pinned by the
  `'Is disabled when at verse 0'` test in `book-chapter-control.navigation.test.ts`. (An earlier
  draft of this ADR called the button "inert" and claimed fall-forward removed its "last remaining
  cue"; that was wrong on both counts and is corrected here.) What the button cannot do is roll
  backward to the previous chapter's last verse: with no `bounds`, `getPreviousVerseRef` floors at
  `{chapterNum, verseNum: 0}` in every chapter rather than only chapter 1, so the reference dead-ends
  there. That pin predates this decision and is now tracked as
  [PT-4379](https://paratextstudio.atlassian.net/browse/PT-4379) — out of scope here because the fix
  is not passing an argument but threading an async, PAPI-built `ScriptureBounds` through a
  `platform-bible-react` component into every consumer of the BCV control.

  Any future single-verse surface must call `resolveDisplayVerseNum` — `sliceUsjToVerse` is
  deliberately mechanical and slices a raw verse 0 to nothing (pinned by a test) — and must carry the
  write-back guard with it. The helper is currently private to `platform-scripture-editor`, so a
  surface in another extension cannot import it; **promote it to
  `lib/platform-bible-utils/src/scripture/` (which already owns `getPreviousVerseRef`, the producer
  of verse-0 refs) at the second consumer _of this rule_** rather than re-typing it. The qualifier is
  load-bearing: "second consumer" counted as surfaces would be wrong, because other surfaces already
  handle verse-0 references under deliberately different rules. The worked example is the
  interlinearizer extension (`sillsdev/interlinearizer-extension`, `InterlinearizerLoader.tsx`, the
  `activeScrRef` memo): it renders a whole chapter and treats verse 0 as tokenizable content, so it
  **keeps** verse 0 whenever a segment covers it — its USJ extractor emits a synthetic verse-0 scope
  with SID `"<book> <chapter>:0"` for pre-verse-1 content — and falls back to verse 1 only when the
  loaded book has no verse-0 segment for that chapter. That is content-awareness this rule
  deliberately rejects (alternative (d) above), affordable there precisely because the whole book is
  already parsed into segments before a reference is resolved. A whole-chapter surface should look
  like the chapter-surface exemption above, not like this rule. Promoting on a surface count would
  turn a deliberate single-verse-vs-whole-chapter difference into apparent drift from a shared util.
- **Source:** PT-4061 (B3), which resolves PT-3133; Ian Hewerdine confirmed parity 2026-08-05.

## ADR-0020: Find follows the editor onto read-only resources, with replace withheld

- **Date:** 2026-08-17
- **Status:** Accepted
- **Context:** Simple mode's Column 3 panels follow the *active translation project*: the editor gates
  `openOrUpdateRelatedPanels` on `projectForWebView.isEditable` precisely so that opening a published
  resource in the editor column does not switch the related panels over to the resource. Making Find a
  permanent Column 3 tab put it inside that contract for the first time, and it was the one panel
  exempt from it — `openFind` took whatever project the triggering editor held, with no editability
  check, so Ctrl+F on a resource re-pointed the always-visible Find tab at the resource while its
  three siblings stayed on the translation project.
- **Decision:** Find is deliberately *not* held to the follow-the-translation-project rule. It may
  bind to a read-only resource, because searching a resource is a legitimate read operation and the
  panel's whole purpose is search. What it may not do is offer edits the project will reject, so the
  Find web view reads `platform.isEditable` for whatever project it is currently bound to
  (`useProjectSetting` in `find.web-view.tsx`, failing closed while the read is in flight or if it
  errors) and withholds Replace, Replace All, and the per-result replace affordances while it is
  false. The per-result gate matters separately: each result's own Replace button and its Enter/Space
  shortcut call `onReplace` directly and would otherwise bypass the disabled top-level buttons.
  Separately, `platformScripture.updateFindProject` re-points an already-open Find from
  `openOrUpdateRelatedPanels`, which is what returns Find to the translation project after a switch —
  Find is the only Column 3 panel that command re-points without also being able to open it.
- **Alternatives:** **Hold Find to the sibling contract** (refuse to follow a resource; keep the
  current project and just bring the tab to front) — rejected: consistent with the other three panels,
  but it makes resource text unsearchable from the panel built to search, for a data-safety benefit
  already obtained by withholding replace. **Hide the replace UI entirely when read-only**, reusing
  the `hideModeToggle` path Simple mode uses — rejected: it removes the control with no explanation;
  a disabled control with a reason mirrors the nearest precedent (structure protection) and tells the
  user why. **Thread the editor's already-resolved `state.isReadOnly` through `FindWebViewOptions`**
  — rejected: it only answers for editor-triggered opens, so the seeded Column 3 tab (which exists
  from startup with no triggering editor) would have no answer, and a Find bound to a project by any
  other route would silently fall back to "writable".
- **Consequences:** Find can search resources in both modes; only Power mode ever shows the withheld
  replace controls, since Simple-mode Find has no replace UI at all. Editability is re-read per bound
  project rather than latched, so it cannot go stale across a switch back to a translation project.
  Column 3 now has one panel that can legitimately show a different project from its siblings;
  anything that later assumes all four are on the same project must account for Find.
- **Source:** Review of the `pt-4342-dock-find-in-simple` branch — merge-blocking findings on Find
  re-binding to read-only resources and on Find not following project switches. Mechanism reconciled
  with PT-4343's `platform.isEditable` read (ADR-0015's sibling work) when the branch rebased.

## ADR-0021: Column 3 tab order is expressed as anchor + insert-before in the layout supplement, not as a pinning mechanism

- **Date:** 2026-08-17
- **Status:** Accepted
- **Context:** Simple mode's Column 3 is assembled from two sources: `simple-layout.data.ts`, baked
  into the build, and `default-layout-supplement.json`, whose entries are merged in afterward behind
  feature flags. Making Find a permanent Column 3 tab meant Find had to sit *last* while Text
  Collection — a supplement entry — had to land ahead of it, even though supplements merge in after
  the static tabs exist. The PR asked the team to confirm this shape "versus a different way of
  pinning a static tab last", which is the question this entry answers so it is not re-derived when
  the next Column 3 tab is added.
- **Decision:** Order stays a property of the supplement entry (`anchorWebViewType` plus optional
  `insertBeforeWebViewType`), not a property of the static tab. A static tab does not declare "I am
  last"; a supplement declares where it goes relative to tabs that already exist. Since the merge's
  append fallback is indistinguishable from success once applied, an `insertBeforeWebViewType` that
  does not resolve is now reported as a placement anomaly, and the shipped order is pinned by tests
  that use the real layout data and the real supplement JSON together
  (`shipped-simple-layout-order.test.ts`) rather than synthetic fixtures.

  A **supplement entry is therefore scoped to Simple mode** in two of its properties, and the merge
  takes the interface mode as a required argument rather than inferring it. The merge runs against
  both modes' layouts — Simple mode's build-baked one and Power mode's persisted one — while
  ordering and pinning only describe Simple mode's fixed columns. Applying an entry's
  `insertBeforeWebViewType` in Power mode means logging a placement anomaly on every load of a
  correct layout, because the target is a fixed-layout tab that mode does not have; applying its
  `isClosable: false` means handing `getTabGroup` a pinned tab and getting back a column group
  `getGroups` registers only in Simple mode, so the tab lands in rc-dock's unknown-group fallback
  with no close button until the provider's async answer replaces it. Making the mode an argument is
  what keeps a mode-agnostic mechanism from silently carrying mode-specific data across.
- **Alternatives:** **An explicit `isPinnedLast` / sort-order field on the static tab** — rejected:
  it splits ordering across two files, so reading either one alone tells you the wrong answer, and
  two tabs both claiming last has no defined resolution. **Move Find into the supplement too, so all
  of Column 3 is ordered in one place** — rejected: Find is not feature-flagged and ships in every
  build; putting an unconditional tab behind the flag-gated merge path would make its presence depend
  on machinery it has no reason to touch. **Sort Column 3 after merging, by a central ordered list of
  webViewTypes** — rejected as premature for one constrained insert, though it becomes the better
  shape if a third or fourth supplement entry ever needs ordering against each other rather than
  against static tabs.
- **Consequences:** Adding a Column 3 tab means deciding, in one place, which existing tab it goes
  before. The static layout stays a plain ordered list. The ordering is only as good as the
  `webViewType` strings on both sides, which core cannot type-check against the extensions that own
  them — so a drift guard reads the extension sources and fails if a pinned `webViewType` stops being
  declared in production code. Every future supplement property has to be classified as
  mode-independent or Simple-mode-only, and a Simple-mode-only one needs a Power-mode test case —
  both modes' behavior for the shipped entry is asserted, so a property that leaks across fails.
  **Revisit** if supplement entries start needing to order against each other, which
  anchor/insert-before cannot express.
- **Source:** Review of the `pt-4342-dock-find-in-simple` branch — findings on the supplement's silent
  append fallback and the untested shipped column order; open question raised in the PR body.

## ADR-0022: A book selection is summarized, not listed, on a scope trigger; its details surface is the picker, not a tooltip

- **Date:** 2026-08-24
- **Status:** Accepted
- **Context:** The Find panel's "Showing" row rendered a selected-books scope by joining every
  selected book ID with commas. Past a handful of books the row outgrew the panel and forced a
  horizontal scrollbar across the whole web view (PT-4092). Any fix has to answer two questions:
  what short form replaces the full list, and where — if anywhere — a reader can still see the
  books the short form drops.
- **Decision:** `summarizeSelectedBooks`
  (`lib/platform-bible-react/src/components/advanced/scope-selector/scope-selector.utils.ts`)
  collapses a selection to one of three forms: the localized "All books" when the selection is
  exactly the project's available books, the books listed individually at five or fewer, and a
  canon-order `first - last` range beyond that. The dropped books get **no dedicated details
  surface**: `Guidelines/Responsiveness` asks truncated text to be backed by "either a Tooltip or
  any details view", and the details view already exists — the popover the trigger opens contains
  the real selection as checkboxes and badges. The separator is ` - `, matching `formatScrRefRange`,
  so `…` keeps its `Guidelines/Ellipses` meaning of "opens a dialog".
- **Alternatives considered:**
  - **A hover tooltip on the trigger carrying the full canon-ordered list.** Implemented first and
    reverted. A full selection is ~570 characters against a `Guidelines/Tooltips` "avoid" example of
    69, Radix opens tooltips on focus so every programmatic focus restore fired it uninvited, Radix
    renders a visually-hidden duplicate so the payload also became an `aria-describedby` on the
    combobox, and `TooltipContent` has no height cap — reintroducing the same clipping bug on the
    surface meant to explain it.
  - **`+N more` after the first five books,** matching `SelectBooks`' badge rule. Rejected: it tells
    a reader how many books they cannot see rather than which range they picked, and the two
    surfaces order their books differently (canon vs. click), so agreement would be cosmetic.
  - **A separate expandable row under the trigger.** Rejected as more chrome than a scope line
    warrants when opening the popover already shows the selection.
- **Consequences:** The summary is deliberately lossy and there is no way to read the exact
  selection without opening the popover — accepted, because opening it is one click and it is the
  only surface where the selection can also be *changed*. A selection that is CSS-truncated inside a
  narrow column (`GEN, EXO, LEV, NU…`) likewise has no tooltip; `useTruncationTooltip` exists if
  that becomes a real complaint. **Revisit if a books-scope summary is ever needed somewhere the
  reader cannot open the picker** — that surface would need its own details view.

  Two known deferrals sit against this entry. First, the summary is applied only at Find's "Showing"
  row: `ScopeSelector`'s `variant="dropdown"` trigger still joins every selected ID, so the original
  overflow remains latent there. It has no consumer today (the one dropdown consumer does not offer
  the `selectedBooks` scope) and `summarizeSelectedBooks` is exported for whoever adds one, so this
  is a deliberate deferral rather than an oversight — a future dropdown consumer that offers
  `selectedBooks` must adopt the summary. Second, the ` - ` separator is a fifth deliberate
  divergence from Paratext 9's `BookSetX.Summary` (alongside the collapse threshold, short IDs vs.
  localized full names, and the empty-selection placeholder); the whole set belongs to PT-3363's UX
  owner rather than to this change.

## ADR-0023: `BooksPresent` decoding degrades to a partial read; `platform-bible-utils` owns the wire format

- **Date:** 2026-08-24
- **Status:** Accepted
- **Context:** `getAvailableBookIds` (platform-bible-react) threw when its input length did not
  equal `Canon.allBookIds.length`. That input is the `platformScripture.booksPresent` project
  setting, whose default is the empty string until the setting resolves — and which stays empty
  permanently if the read returns a `PlatformError`. The throw therefore happened during render,
  and with no error boundary above these components it tore down the whole web view. Separately,
  `platform-bible-utils` already owned the same wire format in `getBookIdsFromBooksPresent`, which
  clamps to the canon length rather than rejecting, so the two functions returned different answers
  for the same string.
- **Decision:** `platform-bible-utils`' `getBookIdsFromBooksPresent` is the single decoder for the
  `booksPresent` flag string. `getAvailableBookIds` delegates to it and adds only the obsolete-book
  filter its callers need, so a malformed or partial string yields the flags it does carry instead
  of throwing or discarding the read. Neither function is on `platform-bible-react`'s stable root
  export; both live behind the `experimental` entry point alongside their nearest relatives, so
  folding them together later is not a breaking change.
- **Alternatives considered:**
  - **Keep throwing and add an error boundary.** Rejected for this change: an error boundary is a
    larger platform decision, and an unresolved setting is an expected state, not an exception.
  - **Thread the decoded `string[]` down as a prop** instead of passing the raw string to
    `ScopeSelector`/`SelectBooks`/`SelectBooksPicker`. Rejected as a breaking prop change across
    three public components for a decode that is microseconds and already memoized at each site.
- **Consequences:** Degrading means callers must now handle "no books known" as a real state rather
  than trusting the decode. Every control that acts on the whole list needs an explicit guard —
  `SelectBooksPicker`'s "Select all" is disabled while the list is empty, because selecting all of
  nothing would commit an empty array and silently wipe the user's existing selection. **Any new
  control that maps over the available books must add the same guard**; the pattern to copy is
  `SectionButton`'s `isDisabled`.
- **Source:** PT-4092, review of #2699.

## ADR-0024: The toolbar's sync status is local renderer UI, and names in-progress projects from a new upstream field

- **Date:** 2026-08-17
- **Status:** Accepted
- **Context:** PT-4336 NN-4 asks for a single truthful sync status with a one-click cancel. Two
  obstacles surfaced while implementing PT-4348. First, the existing toolbar button's only action was
  `paratextBibleSendReceive.openSyncStatus`, which opens a second sync surface — a web view that
  updates on its own schedule — alongside the button, which is exactly the "two messages that seem to
  contradict each other" the NN exists to remove. Second, the ticket specified naming the syncing
  projects from `SyncState.lastRequestedProjectIds`, but that field is written only by the Send/Receive
  extension's `setResults` (on completion), never at `beginSync` — deliberately, so a failed sync
  cannot pair its ids with the previous run's results. Read during a sync it names the PREVIOUS
  sync's projects, so implementing the ticket as written would have shipped a confidently wrong label.
- **Decision:** The status lives entirely in the renderer: `SyncStatusButton` renders a
  `platform-bible-react` `Popover` in place (no overlay service, no web view) with the project list
  and a single-shot Cancel wired to `paratextBibleSendReceive.cancelSync`. `useSyncStatus` seeds from
  a one-shot `paratextBibleSendReceive.getSyncState` on mount, because `onSyncStateChanged` fires on
  transitions only and a consumer mounting mid-sync would otherwise read idle until that sync ended.
  For the names, a companion change to `paratext-bible-internal-extensions` adds
  `SyncState.syncingProjectIds` (derived from the live claim map, so it cannot drift from `isSyncing`),
  and core declares that field **optional** in its mirrored `src/@types/paratext-bible-send-receive`
  copy so core merges independently of the upstream release. Absent field ⇒ a bare "Syncing" that
  names no project.
- **Alternatives:** **Read `lastRequestedProjectIds` during a sync** (the ticket as written) —
  rejected: names the wrong projects, which is the specific failure NN-4 exists to fix. **Derive names
  from `onSyncProgress.progressText`** — rejected: it carries the current *item*, not the set, and for
  indeterminate progress it is a full localized sentence, so the label's meaning would change shape
  mid-sync. **Ship without names** — viable and fully truthful, but misses the NN's explicit "shows
  which project(s) are syncing". **Declare `syncingProjectIds` required in core** — rejected: it would
  make core's types lie for any Studio build predating the upstream change.
- **Consequences:** Core now ships a type declaration for a field that only exists once the companion
  extension PR lands; the optional marker plus a fallback path is what makes that safe, and the same
  pattern is available the next time core needs to consume an upstream contract addition ahead of its
  release. `getSyncState` reflects only syncs run through the Send/Receive extension's own wrappers —
  callers reaching the dotnet commands directly stay invisible (upstream PT-4214) — so this status is
  best-effort, not ground truth. **Corrected 2026-08-17, after this decision was first written:** an
  earlier draft of this entry claimed core's startup syncs were unaffected because they route through
  `runScheduledSessionSync`. That holds for Power mode only. In Simple mode — the only mode this
  button renders in — `main/startup-tasks.ts` calls the dotnet `syncProjects` command directly, and
  the picker's `syncOnProjectSwitch` (`platform-scripture-editor`) does the same, so neither raises a
  claim and nothing in `c-sharp/` emits `onSyncStateChanged`. The practical effect: NN-4's "status is
  correct from app startup" is met for manual and scheduled syncs, but the Simple-mode startup sync
  still shows no status. Closing that needs either PT-4214 or routing those two call sites through a
  claiming wrapper (e.g. `runManualSync`); this decision deliberately does neither, since both are
  changes to sync behavior rather than to how status is reported. Of the four richer UX
  states in the NN-4 design, three ("Connection problem", "Unsaved changes", "Unsynced changes") are
  deferred and marked as such in `sync-status-button.component.tsx`: none is derivable from what
  Send/Receive currently emits, and inventing them would reintroduce the untruthfulness this work
  removes. Sync FAILURE is the exception and IS reported, because it is derivable: the snapshot's
  `lastResults.resultsInfo` carries a per-project `resultStatus`, so a completed sync that did not
  succeed everywhere shows a failure state rather than a green check. A user-cancelled sync lands
  there too, which is the case that most obviously must not read as "Synced". The detail behind a
  failure (per-project conflicts, `failureMessage`, warnings) lives only in the sync status web view,
  so the popover keeps a link to it via `paratextBibleSendReceive.openSyncStatus` — this decision
  removes that command from the button's CLICK, not from the product. **A second sync surface exists outside core's tree, and it overlaps this one on most
  syncs.** As of 2026-08-18, Paratext 10 Studio carries (in its unmerged `repo-patches/paranext-core.patch`)
  a C#-side sync toast in `ParatextProjectSendReceiveService`, tracked by `_syncNotificationId` and
  created by `RunWithSyncNotification`. Traced through that patch: `RunWithSyncNotification` defaults
  `showNotification` to `true`; `SyncProjects` omits the argument entirely, so the `syncProjects` path
  always toasts; and `SendReceiveProjects` derives it from a `suppressNotification` parameter that
  defaults to `false`. Only the open S/R dialog opts out. The toast is `Duration = 0` (persistent) with
  `ClickCommand = "paratextBibleSendReceive.cancelSync"`, i.e. the same cancel affordance this popover
  offers. The resulting overlap in Simple mode:

  | Sync | C# toast | This button | Result |
  | --- | --- | --- | --- |
  | Simple-mode startup (`startup-tasks.ts` → `syncProjects`) | yes | no claim | toast only |
  | Picker `syncOnProjectSwitch` (direct dotnet) | yes | no claim | toast only |
  | Scheduled / auto-sync engine (`runSync` → `syncProjects`) | yes | claims | **both** |
  | Manual hamburger / background (`sendReceiveProjects`) | yes | claims | **both** |
  | Open S/R dialog (`suppressNotification: true`) | no | claims | button only |

  **A second cancel surface also exists INSIDE core.**
  `extensions/src/platform-scripture-editor/src/sync-blocked-banner.component.tsx` renders its own
  `role="status"` region with a single-shot Cancel wired to the same
  `paratextBibleSendReceive.cancelSync`, shown while a sync is blocking the editor. During a blocking
  scheduled sync in Simple mode both it and this popover can be on screen at once: two live regions,
  two differently-labelled Cancel buttons, and neither aware the other was clicked, so cancelling in
  one leaves the other reading as armed. They are not merged here because they answer different
  questions — the banner explains why the editor is unavailable *right now* and is modal to that
  editor, while the popover is an ambient whole-app indicator the user opens deliberately — and
  because a shared cancel state would have to live in a service neither currently uses. The concrete
  defect (a spent cancel still reading as armed in the other surface) is what a follow-up should fix,
  by having both read one piece of cancel-requested state.

  Two consequences worth carrying forward. First, the C# service is *broader* coverage than this
  button, not narrower: it sits where every sync converges on the `_sendReceiveSemaphore`, so it sees
  the direct-command syncs this button is blind to — which is the same reason a semaphore-derived
  signal is the proper general fix. Second, each surface is individually sound; Power mode does not
  render this button at all, so the toast is its sole truthful indicator there. The defect is
  specifically the **Simple-mode overlap**, not the toast's existence. Note also that suppressing the
  toast is only wired for `sendReceiveProjects`; `syncProjects` has no such parameter, so quieting the
  scheduled path needs a C# change in Studio's patch plus a contract addition in both copies of the
  Send/Receive declaration. NN-4's "a single, truthful notification" is therefore not achieved in the
  shipped product by this decision alone, and the remaining work is cross-repo rather than a change to
  this component.
  One more consequence of the status resting on `resultStatus`: the green check is decided by the
  *complement* of a three-value failure set, so any value outside `ResultStatus` would read as a
  success. Because this contract is demonstrably still moving — `syncingProjectIds` was added to it by
  this very work — the snapshot validator checks `resultStatus` for membership in the known union
  rather than merely for being a string, and a snapshot carrying an unrecognised status reports
  `unknown` instead of a possibly-false `synced`. `unknown` carries no icon and shares the plain
  "Sync" label with `idle` — it is distinguished only in the popover text and the live region, which
  is deliberate: a degraded read is not an error worth a persistent badge in the toolbar, and the
  honest answer is available the moment the user asks for it. The cost is deliberate: a seventh
  status added upstream degrades this button to `unknown` until core's mirrored declaration is
  re-synced, which is the failure direction this whole entry chooses everywhere else.

  **A pending Cancel cannot be settled by the project ids.** Upstream derives `syncingProjectIds`
  from live, ref-counted per-project claims (`sync-state.ts` `initSyncState`), and a single
  continuous `isSyncing: true` window spans however many overlapping claims the sync paths take out.
  A project can therefore release and re-claim without a new sync having started, so "an id this
  cancel did not cover" is not evidence of a different sync and cannot re-arm Cancel. The button
  settles a pending cancel on the two signals that are sound — the status leaving `syncing`, and the
  popover being reopened — and accepts the cost: a genuinely new overlapping sync keeps a dim
  "Cancelling…" until the whole union goes idle. That is the safe half of the trade, since the
  alternative offers a live Cancel while a cancel is still in flight. Settling this properly needs a
  monotonic sync-episode identifier in `SyncState`, which is an upstream contract change.

- **Follow-up (needs tickets under PT-4336, none filed as of this entry):** the items above are
  deliberately out of this decision's scope and will not happen on their own.
  1. *Close the Simple-mode startup-sync blind spot* — route `main/startup-tasks.ts` and the picker's
     `syncOnProjectSwitch` through a claiming wrapper, or land upstream PT-4214. Owner: core.
  2. *Achieve NN-4's "single, truthful notification"* — suppress the C# toast on the paths this
     button covers. Needs a `suppressNotification` parameter on `syncProjects` in Studio's
     `repo-patches/paranext-core.patch`, plus the matching contract addition in BOTH copies of the
     Send/Receive declaration. Owner: whoever owns Studio's patch — this cannot be done from core.
  3. *Reconcile the two in-core cancel surfaces* — share one piece of cancel-requested state between
     this popover and `sync-blocked-banner.component.tsx`. Owner: core.
  4. *Make a new sync episode provable* — add a monotonic episode id to `SyncState` so a pending
     Cancel can be settled positively rather than waited out. Owner: upstream Send/Receive, then
     core. Unblocks the "dim Cancelling…" cost recorded above.
  5. *Validate the snapshot field-by-field rather than all-or-nothing* — `isValidSyncState` rejects a
     whole snapshot for an unrecognised historical `resultStatus`, discarding live, well-formed
     `isSyncing`/`syncingProjectIds` with it. Answer the completed-sync question with `unknown` and
     keep the live fields. Owner: core.
  6. *Close the remaining sync-status timing holes* — a newer sync starting before a finished sync's
     follow-up read returns swallows that sync's `failed`; the first event ends the seed's retry
     budget without the event path having a retry of its own; a cancel rejected just as the sync ends
     can toast beside a popover that says it finished; a cancel accepted but not acted on leaves the
     button wedged. All need a specific timing collision. Owner: core.
  7. *Debounce the syncing-project metadata lookup* — it calls the retrying
     `getMetadataForAllProjects` on every id-set change, including the transient blank each event
     produces, and this component is mounted in every window's toolbar.
     `use-project-picker-data.hook.ts` debounces the identical call. Owner: core.
  8. *Resolve the shared-layout contradiction* — `shared-layout-receiver.model.ts` rests on
     "`onSyncStateChanged` only fires for manual Send/Receives", while this work's declaration says
     the state controller also covers `runScheduledSessionSync` and the auto-sync engine. Under the
     new semantics a background sync raises the interactive "Apply now" prompt to someone who took no
     action. This decision establishes the contradiction rather than causing it. Owner: core.
- **Source:** PT-4348, under PT-4336 NN-4; `sync-state.ts` in `paratext-bible-internal-extensions` for
  the `lastRequestedProjectIds` and `syncingProjectIds` contracts.

## ADR-0025: Find excludes extra material by narrowing its book lists, not by gating its scopes

- **Date:** 2026-08-24
- **Status:** Accepted
- **Context:** Find reports a result's location by walking the `\c` and `\v` markers of the book it
  matched in. Extra material (GLO, FRT, INT, XXA, … — `Canon.nonCanonicalIds`) is organized by
  paragraph markers rather than verses, so every match in one resolves to the same useless reference
  (`GLO 1:0`), and the platform cannot open such a book to act on the result anyway. Find had three
  independent paths to those books: the flag string the book picker offers, the book ids the search
  runs over, and the `book`/`chapter` scopes, which build their scope from the current scripture
  reference rather than from any book list.
- **Decision:** Exclude extra material by clearing its flags in the `booksPresent` string Find
  derives its lists from (`deriveFindBookLists`), which covers the picker and the search together.
  Flags are cleared **in place** rather than removed, because consumers index into the string by
  book number and reject a length that does not match the canon. The `book`/`chapter` scopes are
  **deliberately not gated** in this change; PT-4415 covers them, and PT-4414 covers dropping the
  whole exclusion once extra material can be opened and addressed.
- **Alternatives considered:**
  - **Filter `findScope` before the search runs**, as a second line of defence behind the prune.
    Rejected here: it half-solves the `book`/`chapter` bypass, which would make PT-4415's real fix
    harder to reason about — two partial filters in different layers rather than one gate.
  - **Drop the excluded positions from the flag string.** Rejected: it breaks the canon-length
    invariant every downstream decoder relies on.
  - **Filter at each consumer.** Rejected: filtering the search but not the picker (or the reverse)
    lets a user pick a book the search never covers.
- **Consequences:** Find now needs two book lists where it had one — `availableBookIds` (what the
  search covers) and `localizableBookIds` (every book, so a scope label reading from the current
  reference can still name a book the search excludes). That split exists only to compensate for
  the exclusion and collapses back to one list under PT-4414. Because a project can now hold
  nothing but extra material, "no searchable books" became a real answer, which forced the
  unknown-vs-empty distinction below to be explicit: `deriveFindBookLists(undefined)` reports
  `availableBookIds: undefined` while the setting is unread OR its read errored, and only a genuine
  empty list prunes the user's persisted selection. Treating a delivered `PlatformError` as an
  answer would have wiped that selection permanently — `useProjectSetting` reports an error as
  loaded, so the error branch has to be recognized on its own.
- **Source:** PT-3299, review of #2708.

## ADR-0026: A tab’s own web view supplies its selection to Find, rather than a shared selection store

- **Date:** 2026-08-16
- **Status:** Accepted
- **Source:** PT-3216 (pass editor text selection to Find), PR #2692; builds on the shared Ctrl+F
  hook from ADR-0015 / PT-4341.
- **Context:** Opening Find from a scripture editor tab's menu needed that tab's text selection. The
  work item proposed publishing the selection into the platform's shared store so a command handler
  could read it. Two facts made that unnecessary and unavailable: (a) the scripture editor sets
  `shouldShowToolbar: false` (`extensions/src/platform-scripture-editor/src/main.ts`) and instead
  renders its own `TabToolbar` *inside* its web view
  (`extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`), so its
  menu handler already runs in the document that owns the selection; (b) `sharedStoreService`
  (`src/shared/services/shared-store.service.ts`) is explicitly not part of the public API and is not
  reachable from extensions.
- **Decision:** Find takes the selection of the tab it was triggered from, read in that tab's own web
  view via `window.getSelection()` and passed through the existing `platformScripture.openFind`
  `selectedText` parameter. No cross-tab selection state. `resolveFindSelectionText`
  (`extensions/src/platform-scripture-editor/src/find-trigger.util.ts`) is the single normalizer
  every trigger goes through, so all of them apply the same two rules: trim (a double-click word
  selection often carries a trailing space), and reject anything spanning lines (Find's search box is
  a single-line input, so a Ctrl+A selection cannot be shown honestly and must not be flattened into
  a run-on term). The two trigger paths deliberately
  differ in one respect: the tab menu additionally consults a capture-phase pointer-press snapshot
  (`use-selection-snapshot.hook.ts`), because the click that opens the dropdown is itself what
  collapses the selection; Ctrl+F (`use-open-find-shortcut.hook.ts`, ADR-0015) reads only the live
  selection, because a keystroke destroys nothing, and a fallback there would let a long-abandoned
  selection pre-fill and immediately re-run a search over whatever term an open Find panel already
  held.
- **Alternatives:** (a) Shared store — rejected: not extension-accessible, and unnecessary once the
  menu handler's location is understood. (b) A global "last selection" registry in the editor
  extension built on the existing `platformScriptureEditor.onDidSelectionChange` event — deferred:
  every Find entry point today is tab-scoped, so the triggering tab *is* the focused editor; a
  registry would add cross-tab state with no current consumer. (c) Deriving the text from the
  existing `PlatformScriptureEditorWebViewController.getSelection()` — rejected: that carries USJ
  document offsets, not text, so it would mean re-reading and slicing USJ to recover a string the
  triggering document already has.
- **Consequences:** The selection path stays inside one file per tab type and needs no new
  cross-process state. The snapshot is deliberately narrow, because a remembered selection that
  outlives the interaction that produced it would pre-fill — and immediately re-run — a search over
  whatever term the user had since typed into an open Find panel. Three bounds keep it honest: it
  only remembers selections anchored inside the tab's text content (chrome has its own selectable
  text — a reference input, a search box — that is not scripture); a press inside that content clears
  it; and reading it consumes it, so it bridges exactly the one pointer press it exists for.
  **Revisit** if a Find entry point ever lives outside a tab (a top-toolbar or application-menu Find,
  or an extension asking "what is selected right now" to enable/disable menu items) — that is the
  point where alternative (b) becomes the right answer. The snapshot is load-bearing, not defensive: in Chromium, a menu item's `click` handler
  reads an empty `window.getSelection()` even though the same selection is still live at the
  capture-phase `pointerdown` on that item — the collapse lands between the two, which is exactly the
  window the snapshot covers. The end-to-end test written to prove this inside the real editor could
  not be run in this development environment, and `test:e2e:isolated` (the only runner that reaches
  `e2e-tests/tests/isolated/find/`) appears in no CI workflow, so that verification gap is closed by
  a manual pass rather than by automation.
## ADR-0027: Panel readiness is derived from whether data sources arrived, never from a filtered result

- **Date:** 2026-08-19
- **Status:** Accepted
- **Context:** The Model Text and Resource (Bible Texts / Commentaries) panels each decided "is
  anything configured?" from a value that is only meaningful *after* its data had arrived, and each
  did it differently. `useEffectiveResourceReferenceList` returned `[list | undefined, boolean]`
  where the list accounted for two async sources (the project-level setting and a user-level PDP
  subscription) but the boolean reported only the first — so the normal interleaving on essentially
  every mount, where the project setting resolves before the user subscription delivers, was
  reported as "not loading, nothing configured". The resource panel separately gated its spinner on
  `filteredResources.length !== 0`, a list filtered against a DBL catalog that had not loaded yet,
  so the guard could not fire during the exact window it existed for. Both rendered "No … selected"
  with a Pick button for a correctly-configured resource, inviting the user to replace something
  that was already set. A read failure compounded it: `useBufferedLayoutSetting` applied a
  `PlatformError` to its held copy and disarmed, so a transient failure latched for the session.
- **Decision:** Readiness is a first-class, data-derived signal evaluated before any empty or
  not-found branch. `useEffectiveResourceReferenceList` returns a discriminated
  `{ status: 'loading' | 'error' | 'ready' }` whose `loading` covers *both* sources and whose
  `ready` may legitimately carry zero items — the only state in which a panel may render its empty
  prompt. `getResourcePanelReadiness` (`resource-panel-readiness.utils.ts`) maps list status
  plus catalog arrival to `loading | error | catalogError | empty | configured`, and
  `PanelReadinessView` renders those states. **Both** panels route through them: the Model Text
  panel takes the list status as one prop rather than separate loading/error booleans, so neither
  panel can drift from the other on the question that caused this bug. The catalog itself is fetched
  by one hook, `useDblResourceCatalog`, which owns the "has it arrived?" distinction the whole fix
  hinges on and catches a rejected fetch — `usePromise` has no rejection path, so an uncaught
  rejection never clears its loading flag and would strand the panel on a spinner forever. `useBufferedLayoutSetting` no longer latches a read error:
  its mount arm skips a `PlatformError` and stays armed, and reports the live error on a third
  tuple element, because at that point the held value is the placeholder and is indistinguishable
  from a genuinely empty setting.
- **Alternatives:** **Split the model panel's merged loading/empty conditional, as the ticket
  proposed** — rejected as insufficient: in the failing window both `isEffectiveModelTextsLoading`
  and `isLoadingResources` are `false`, so there is no honest signal to split on; the hook's
  contract had to be fixed first. **Keep the tuple and widen the boolean** — rejected: it makes the
  error state unrepresentable, and an unreadable setting would have to masquerade as either loading
  (spins forever) or ready-and-empty (the original bug). **Treat an unreadable setting as
  not-ready** — rejected: it trades a premature empty state for an endless spinner with no recovery.
- **Consequences:** "Nothing configured at all" is deliberately kept catalog-independent, so a
  genuinely unconfigured project still gets its pick prompt immediately rather than waiting on a
  fetch; only "does a configured item belong to *this* panel?" waits for the catalog. The two failure
  states differ in whether they offer a control, and that difference is the point. A catalog fetch
  can genuinely be re-driven, so `catalogError` carries a working retry. A project-setting read
  cannot be — nothing in either panel can force one, and user-layer errors are swallowed to the
  default list — so `error` shows a message alone. An inert control in a state that withholds every
  other affordance is worse than no control, so that message carries the recovery expectation
  instead: the setting stays watched and the panel recovers on its own. The error is also reported only while no
  readable value has ever been applied; once one has, holding it across a failed re-read is the job
  the buffer exists to do, so a later failure must not replace working content. Un-latching is not a free
  improvement for existing consumers: because the held value is now the placeholder rather than the
  error, any consumer that detected failure via `isPlatformError(heldValue)` alone silently starts
  reading an unreadable setting as an empty one. `useTextCollectionSources`, the hook's other
  consumer, had to be updated to read the error channel for exactly this reason — a new consumer of
  `useBufferedLayoutSetting` must check the third tuple element, not just the held value.
  `RetryableErrorView` (renamed from `InstallFailedView` and moved to
  `panel-state-views.component.tsx`) is scoped to failures a retry can act on — a failed install or a
  failed catalog fetch. The settings-read failure is not one, so it renders a message alone. All
  four front states compose the shadcn `Empty` primitive per ADR-0016, each with its own icon:
  without one, the pick prompt and the catalog error rendered as identical screens whose buttons did
  opposite things (reconfigure vs. retry), which is what AC-4 asks these states to prevent. Panels that grow a third async source must extend the readiness
  signal rather than add another flag — the bug class here is precisely one guard being unaware of
  one source.
- **Source:** PT-4347 (NN 5C Resource panel shows correct loading state), whose named root cause —
  the merged conditional in `model-text-panel.component.tsx` — proved to be the symptom site rather
  than the defect.

## ADR-0028: Async hook state shape — discriminated union when the payload is state-specific, flat object otherwise

- **Date:** 2026-08-21
- **Status:** Proposed — the rule is drawn from exactly two hooks, both introduced by PT-4347. It
  stands as the default for new async hook state, but the next hook that does not fit either shape
  should reopen it rather than contort to satisfy it. Promote to Accepted once a third hook has
  exercised it independently.
- **Context:** PT-4347 introduced `useEffectiveResourceReferenceList`'s
  `EffectiveResourceReferenceListState` — the repo's first discriminated-union async state. A review
  grep confirmed no other exists: siblings use a tuple (`useBufferedLayoutSetting` →
  `[value, isLoading, settingError]`) or a flat named state object (`useStructureProtectionState` →
  `StructureProtectionState.adminSettingError`). The same PR also added `useDblResourceCatalog`, which
  uses the flat-object shape, so one change shipped two shapes. The reviewer flagged the divergence as
  a pattern question: either converge, or say why not.
- **Decision:** Keep both, chosen by whether the payload is state-specific.
  - **Discriminated union** when data exists in only one state, so the type can make the other
    combinations unrepresentable. `useEffectiveResourceReferenceList` returns
    `{ status: 'loading' } | { status: 'error' } | { status: 'ready'; list }` — there is no list to
    hand out while loading or on error, and the union is what prevents a caller reading one anyway.
  - **Flat named state object** when the values are always present and the flags describe them.
    `useDblResourceCatalog` returns a catalog (coerced to `[]`), loading/ready/error flags, and a
    refetch callback — all meaningful together, with nothing to make unrepresentable.
  - **Corollary — do not unpack a union at a boundary.** A union's guarantee is lost the moment a
    consumer splits it into a nullable payload plus a bare status: indexing the discriminant
    (`SomeState['status']`) strips the payload and hands the callee two values free to disagree, which
    is the shape the union existed to forbid. Pass the whole state so narrowing survives. PT-4347 hit
    this exactly — `ModelTextPanelProps` took `modelTextsStatus` plus an `undefined`-able list until it
    was corrected to take `modelTextsState`.
- **Alternatives:** **Converge everything on the flat object** for consistency with the existing
  majority — rejected: it makes `ready`-implies-`list` unenforceable and reintroduces the
  nullable-payload-plus-flag shape this epic spent its effort removing. **Converge everything on the
  union** — rejected: it would force a discriminant onto hooks like `useDblResourceCatalog` whose
  values are all always present, inventing states to satisfy a form. **Leave it unstated** — rejected:
  with one instance of each shape and no rule, the next hook re-litigates it.
- **Consequences:** Reviewers should expect both shapes and ask which fits rather than flagging
  either as wrong. The union costs something real: consumers must narrow, and it cannot be spread into
  props piecemeal — that constraint is the point. `resource-panel-readiness.utils.ts` keeps a
  `*.utils.ts` → `*.hook.ts` type import to derive the status union, which is the only such import in
  the extension and would have become moot had the flat shape won; with the union kept it stands as a
  known wart, and moving the union into the utils module (or a `.types.ts`) is the fix if it bothers a
  future reader.
- **Source:** PT-4347 review (PR #2697), where the pattern question was raised and referred to the
  author rather than decided in the review pass.

## layout-persistence-guard-retirement (ADR-0024): Two layout-persistence guards kept side by side pending deliberate retirement of the older one

- **Date:** 2026-08-20
- **Status:** Accepted (interim — retirement of the superseded guard is deferred, not decided against)
- **Context:** Two PRs independently added a guard to `saveLayout` in
  `src/renderer/services/web-view.service-host.ts` to stop a stale/wrong layout from being persisted
  during a Power↔Simple interface-mode switch. PR #2425 ("Improve performance when switching to
  Simple") added a **content-based** guard: refuse to persist any layout that still contains one of
  the fixed `SIMPLE_LAYOUT_TAB_IDS`. PR #2681 ("Hold layout pushes while a layout load is in flight",
  merged 2026-08-19) added a **structural** guard: track which `loadLayout` generation's layout the
  dock actually holds (`layoutLoadGenerationInDock` vs `layoutLoadGeneration`) and hold pushes until
  they match. The two guards were discussed directly in the #2681 PR thread
  (https://github.com/paranext/paranext-core/pull/2681#issuecomment-5297967135) before either branch
  merged: the structural guard is a strict superset of the content-based one (it also catches the
  empty-initial-dock case and a scoped-id case the content check's `.has(id)` misses), so the
  content-based guard is a reasonable one to retire — but as a **deliberate follow-up step with
  #2425's tests still green**, not silently as part of the branches' eventual merge conflict, since a
  content guard failing open looks identical to a structural guard working and the two could
  otherwise be lost together without anyone noticing.
- **Decision:** When merging main (carrying #2681) into `improve_simple-power_switching` (carrying
  #2425), keep **both** guards in `saveLayout`, structural check first (cheap, and a strict superset
  makes it the more useful early-exit), content-based check second with a `TODO` marking it for
  retirement. Neither branch's guard, or its tests, was dropped by the merge itself.
- **Alternatives:** (a) Drop the content-based guard during the merge, keeping only the structural
  one — rejected per the PR-thread agreement: correct in the end state, but conflict-resolution time
  is exactly the moment a silent, unverified drop is easiest to miss. (b) Keep only the content-based
  guard and skip integrating the structural one — rejected: the structural guard fixes two real gaps
  (initial-load and scoped-id cases) the content-based guard cannot reach.
- **Consequences:** `saveLayout` currently runs a redundant check on every save while both guards are
  live. Retiring the content-based guard (`SIMPLE_LAYOUT_TAB_IDS`/`collectWebViewIdsFromLayoutInfo`
  branch, marked with a `TODO` at the call site) is tracked as explicit follow-up work: verify the
  structural guard's test suite already covers every case `web-view.service-host.test.ts`'s
  content-based-guard test exercises, then delete the content-based branch and that guard's
  now-redundant test in one deliberate commit.
- **Source:** PR #2425 / PR #2681 merge conflict resolution. Renamed from its original numeric-only
  `ADR-0024` to the `layout-persistence-guard-retirement` slug on 2026-08-26 (team decision to
  identify ADRs by kebab-case slug going forward; the number is kept parenthetically since it was
  already referenced in Discord before the rename).
