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
  from them) but are no longer how anything FINDS a window's implementation — see ADR-0013.
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
- **Amended 2026-08-07 (ADR-0014):** the original decision also included
  `command.service-router.ts`, a transitional router that forwarded a list of generic COMMAND names
  to per-window scoped command names (`platform.about` → `platform.about-1`). That module is gone.
  Commands are no longer forwarded name-to-name at all: each is registered by the router for its own
  service and calls a method on a window's shard. What remains of this ADR is the routers for
  network-object services, which is what it was always about — the command list was the part that
  needed a name-keeping mechanism, and that is what ADR-0014 removes.
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

## ADR-0009: App-global singleton services elect a host window first-come, with takeover on host-window close

- **Date:** 2026-08-05
- **Status:** **Superseded** — the scroll-group half by ADR-0012, the theme half by ADR-0013. Nothing uses this any more.
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
  will re-enter the election for it. Both copies are now gone — the scroll group's with ADR-0012 and
  the theme's with ADR-0013 — and the shared-helper idea was overtaken by moving the hosts instead:
  the duplication that was worth extracting turned out to be worth deleting. What went with the theme
  copy: `createReattachingSubscribeCurrentTheme` (a subscription that followed the engine between
  windows), the mirror that kept a non-hosting window's synchronous read honest, the re-arm in every
  consumer facade, and `name-taken-error.util.ts`, whose only job was telling "someone else won the
  race" apart from a real registration failure.
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
- **Source:** PT-4275 epic (multi-window architecture plan step 2).

## ADR-0012: The scroll group service is hosted in main, and each renderer keeps a predicting cache

- **Date:** 2026-08-07
- **Status:** Accepted (supersedes the scroll-group half of ADR-0009)
- **Context:** A scroll group is app-global — group 1 is on one reference for the whole app — but it
  was hosted in whichever renderer won the election of ADR-0009, and any window can be closed. The
  election worked, at the cost of a takeover path, a re-arm in every consumer of the network object,
  and a cross-window mirror handler that kept each window's own `*Sync` readers current because the
  host's state was module state in one renderer. The scroll group service's whole job is holding
  app-global state, so the state had a home problem, not a routing problem: ADR-0008's routers
  forward to a window, and there is no per-window answer to forward to.
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
- **Alternatives:** (a) Keep the election and extract the duplication into a shared helper (what
  ADR-0009 anticipated) — rejected: it makes the takeover cheaper to maintain without making it
  unnecessary, and the same window-death hazard stays. (b) A service router for scroll groups —
  rejected: a router picks one window to answer, and no window has the right answer for state that
  belongs to all of them. (c) Route every read through main and drop the sync API — rejected: the UI
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
  window, which discards its copy on either answer; a profile that downgrades, navigates on the old
  build, and upgrades again loses that navigation, because the host refuses an offer once it has
  state of its own. Because the window's URL is a SEED rather than a one-off argument, the renderer
  rewrites its own query parameter (`history.replaceState`) whenever the cache changes: a RELOAD
  replays that URL, and the pre-host store a reloaded document would otherwise fall back to has been
  handed over and deleted by then, so a URL left as old as the window would put a reloaded window
  back on the reference it opened on — which for a restored Scripture editor is the extra chapter
  load the seed exists to avoid. The theme service moved the same way in ADR-0013.
- **Source:** PT-4275 epic (multi-window architecture plan §6).


## ADR-0013: The theme service is hosted in main, and each window caches the current theme

- **Date:** 2026-08-07
- **Status:** Accepted (supersedes the theme half of ADR-0009)
- **Context:** The theme is app-global — one current theme, one should-match-system setting, one set
  of user-defined themes — but the engine that owned it was hosted in whichever renderer won the
  election of ADR-0009, and any window can be closed. That cost a takeover path, a re-arm in every
  consumer of the provider, a subscription helper that followed the engine between windows, and a
  cross-window mirror to keep a non-hosting window's `getCurrentThemeSync` honest. The mirror only
  covered the window's own engine object; a window that ATTACHED rather than hosted still answered
  `getCurrentThemeSync` from its module-load snapshot in the places the mirror did not reach, which
  is what baked a stale theme into a new web view's `srcdoc` (the staleness noted in §9.2 of the
  plan).
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
- **Alternatives:** (a) Keep the election and extract the duplication into a shared helper (what
  ADR-0009 anticipated) — rejected for the same reason as in ADR-0012, and the theme was the second
  copy that would have justified the helper. (b) Fix the §9.2 staleness in place and leave the
  election — rejected: it treats the symptom of state living somewhere closable. (c) Keep the OS
  preference in the renderer and send it to main — rejected: it is one fact about the machine, so N
  windows watching it is N chances to disagree, and `nativeTheme` is strictly better placed. (d) Put
  the migration on a command instead of the provider — rejected: it is one caller reaching one host,
  which is what the provider already is; a command would add a globally-unique name for it. (e) Seed
  the renderer's cache from the host's snapshot alone and accept the default theme on the first frame
  — rejected: that frame is the flash of unstyled content `index.tsx` reads `getCurrentThemeSync`
  before React renders specifically to beat, and every web view bakes the same value into its
  `srcdoc`.
- **Consequences:** the app-global invariant of `Architecture.md` §2 now holds for every platform
  service — no renderer registers a globally-unique name, so ADR-0009's machinery is gone with no
  consumers left, including a dispose-hook leak inside `createReattachingSubscribeCurrentTheme`
  (every re-attach added an `onDidDispose` handler whose unsubscriber was discarded). A window that
  is RELOADED replays the URL main built when the window was created, whose theme would otherwise be
  as old as the window, so the renderer rewrites its own query parameter on every change — the same
  mechanism the scroll group uses (ADR-0012), rather than a second seed source and a navigation-type
  sniff to choose between them. `shouldMatchSystem` is computed in main only; a renderer that starts
  applying its own `matchMedia` would double-apply it. `hasOwnThemeState` — what makes the host
  refuse a migration offer — is seeded from a DEDICATED marker key that only the three public
  setters and an adoption write, deliberately not from the presence of the three value keys, because
  the engine also writes those on its own while extension themes load (matching the theme type to
  the machine's dark-mode preference does it on the first start of a dark-mode machine) and those
  writes say nothing about what the user chose; reading them back as a user choice would refuse a
  handover that had not happened yet, and a refusal is what makes the offering window delete its
  copy. "Do I have a theme worth handing a new window?" is deliberately a DIFFERENT question,
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

## ADR-0014: Renderer platform code registers no command or request names; routers call shard methods

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
  `RENDERER_HOSTED_DIALOG_REQUEST_NAMES`) and grows by nothing — a breaking change for anyone who
  imported them, which is why they were experimental. `command.service-router.ts`,
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
  to" and never "this could not run". Two behavior changes. The navigation mutex was per-renderer
  and is now app-global, since the handler runs in main: two windows driving one scroll group are
  serialized against each other, which a per-renderer lock could not do, at the cost of a slow
  window being able to delay another window's navigation — so the round trip that asks a window what
  to navigate is deliberately outside the lock, leaving only main's own read-compute-write inside
  it. And a go-to now steps from the reference main holds rather than from the asking window's
  predicting cache, which is what keeps a held key advancing one step per repeat; a navigation the
  window itself just made reaches main one hop later. Cross-window navigation ordering beyond this
  is PT-4270. Registering three routers plus the navigation commands adds four entries to main's
  awaited startup batch; they are in-process registrations against main's own RPC server.
- **Source:** PT-4275 (multi-window epic), multi-window architecture plan §7 and §9.1; branch
  `pt-4275-commands-to-main`.
