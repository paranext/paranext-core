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
  `network-object.service.ts`; see ADR-0009). A window-scoped service therefore has to tolerate its
  own registrations outliving its window for a moment, and consumers have to tolerate resolving one
  that is already gone. The scoped ids remain the registration name (`object:{id}.{method}` derives
  from them) but are no longer how anything FINDS a window's implementation — see ADR-0011.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0008: Generic-name service routers in main forward to the focused/owning window's scoped service

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Existing PAPI consumers call services by their historical generic name
  (`platform.webViewService`, `dialog:showDialog`, `platform.about`, ...) with no window argument.
  After ADR-0007 scoped each window's copy under its own name, nothing answers the generic name.
- **Decision:** Main registers one service router per generic name (`command.service-router.ts` —
  which also registers the dialog-request routes, `notification.service-router.ts`,
  `web-view.service-router.ts`, `window.service-router.ts`) that forwards to the scoped service of
  the window that should handle it: the owning window when ownership is determinable (e.g. a command
  whose first argument names a web view routes to the window that owns that web view), otherwise the
  routing target (ADR-0010). A few read-only queries fan out and merge across all windows instead,
  where a merged view is the meaningful answer.
- **Alternatives:** Push a window-id argument onto every external caller — rejected: breaks every
  existing extension/PAPI consumer and the documented `papi.d.ts` signatures. Always fan out to every
  window — rejected as the general answer: most of these calls are single-target actions where
  fanning out isn't meaningful, and forwarding to a not-yet-ready window is measurably costly.
- **Consequences:** external callers of the generic name are unaffected by multi-window; the
  owner/target-selection logic in each router is now load-bearing, and two rules fell out of getting
  it wrong first. Fan-outs ask only the windows that can answer (`getReadyWindowIds`), because
  forwarding to a window whose renderer has not registered costs that call the network service's
  whole registration retry. And an owner probe that could not reach a window fails the call rather
  than falling back to the routing target: "could not ask" is not "answered no", and the window that
  did not answer may be the one that owns the web view. The main-side piece is a **service router**
  (`*.service-router.ts`) and the per-window implementation it forwards to is a **service shard**
  (`*.service-shard.ts`); both are documented in `Architecture.md` § "Service router and service
  shard".
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

## ADR-0009: App-global singleton services elect a host window first-come, with takeover on host-window close

- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Some services are conceptually app-global, not per-window (the theme engine, the
  scroll group service) — exactly one instance for the whole app — but every window's renderer runs
  the same startup code, so no window is distinguished as host in advance.
- **Decision:** Every window's renderer races to register the same singleton network-object name at
  startup; the winner becomes the host, and every other window attaches to (proxies through) it
  instead of registering its own. A window that closes never disposes what it hosted, so the process
  owning the websocket connections derives the death from the connection teardown: it announces the
  departed window's network objects as disposed once their methods are out of the central registry.
  Every window hears that disposal on the object it attached to and re-runs the same election, so a
  new host takes over — no polling and no reachability probing, and the announcement cannot arrive
  before the object is genuinely unreachable.
- **Alternatives:** Always host the singleton in main — rejected: these services' state and
  registration machinery already live in renderer-side service-host modules built around
  `dataProviderService`/`networkObjectService`; moving them to main is a larger rewrite for the same
  effect. A fixed "primary" window as host — rejected: any window, including the first, can be
  closed by the user, so a fixed designation would still need a takeover path.
- **Consequences:** the app has exactly one theme engine and one scroll group service at all times,
  transparent to consumers. The election/re-host machinery is implemented twice today (theme, scroll
  group) and has already drifted between the two copies, so the duplication is worth extracting into
  a shared helper. Both copies also depend on the disposal announcement being the only trigger, so a
  run that neither wins the name nor finds the winner has to schedule its own retry — nothing else
  will re-enter the election for it.
- **Source:** PT-4275 (multi-window epic); introduced in PR #2621.

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

## ADR-0013: Service routers discover shards by network-object type, not by rebuilding the scoped name

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
- **Source:** multi-window architecture plan step 2 (PT-4275 epic; branch
  `pt-4275-router-shard-discovery`).
