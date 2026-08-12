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
- **Don't rewrite history.** Mark a superseded decision `Superseded by adr-<slug>` instead of
  deleting it; add the new decision as a new entry.
- **Append at the end**, newest last. Identify entries by an `adr-`-prefixed kebab-case **slug**,
  not a number: `## adr-per-window-service-scoping: {short title}`. Choose a slug that reads as the
  decision itself, short enough to type in a code comment, and cross-reference it in backticks.
  Name the decision, never its status — a slug never changes, but a status does, so record
  `Withdrawn`/`Superseded` on the entry's `**Status:**` line rather than in its slug.
- **Slugs are chosen at write time and never change.** Two branches in flight pick different slugs
  on their own, so nothing has to be claimed, reserved, or reconciled at merge. If both branches
  append at the end of this file and git reports a conflict there, resolve it by **keeping both
  entries** — there is nothing to renumber and no cross-reference to update. (Entries through
  `adr-async-hook-state-shape` were originally numbered `ADR-NNNN`; each carries a `**Formerly:**`
  line so older references still resolve. Don't add `**Formerly:**` to new entries.)

### Entry template

```markdown
## adr-{slug}: {short title}

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Accepted | Superseded by adr-{slug}
- **Context:** what situation forced a decision (with file:line / source where useful).
- **Decision:** what we chose.
- **Alternatives:** what we considered and why we rejected/deferred them.
- **Consequences:** what this enables or constrains; when to revisit.
```

---

## adr-lightweight-decision-log: Keep a lightweight, gate-free architecture-decisions log

- **Formerly:** ADR-0001
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

## adr-app-global-shortcuts-in-main: App-global keyboard shortcuts go through the main-process `before-input-event` handler

- **Formerly:** ADR-0002
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
  an extension's command name by string (degrades gracefully if the extension is absent).
  **Revisit** (and likely supersede this) once enough shortcuts accumulate to justify the
  declarative API. Narrowed by `adr-per-web-view-ctrl-f-for-find`: this applies to shortcuts whose
  command needs nothing from the focused view; a shortcut whose command needs the focused web view's
  id, project, or text selection stays in the renderer, in one shared hook.
- **Source:** discovery brief for "Donna syncs her project with the team (core Send/Receive)".

## adr-menus-always-available-gate-at-submission: Menus stay always-available; back ends gate at submission. Writers of mutable shared state are DataProviders, not NetworkObjects

- **Formerly:** ADR-0003
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

## adr-paratext-data-alerts-via-alert-capture: Surface ParatextData alerts via `AlertCapture` instead of swallowing them

- **Formerly:** ADR-0004
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

## adr-no-production-create-project: PT10 has no production create-project primitive

- **Formerly:** ADR-0005
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

## adr-reuse-shared-checklist-framework: Reuse the shared checklist framework when porting a new checklist tool

- **Formerly:** ADR-0006
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

## adr-per-window-service-scoping: Per-window service scoping via `${name}-${windowId}` network-object names

- **Formerly:** ADR-0007
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
  command names). The pre-existing generic name is kept working via a service router
  (`adr-generic-name-routing-proxies`).
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

## adr-generic-name-routing-proxies: Generic-name service routers in main forward to the focused/owning window's scoped service

- **Formerly:** ADR-0008
- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** Existing PAPI consumers call services by their historical generic name
  (`platform.webViewService`, `dialog:showDialog`, `platform.about`, ...) with no window argument.
  After `adr-per-window-service-scoping` scoped each window's copy under its own name, nothing
  answers the generic name.
- **Decision:** Main registers one service router per generic name (`command.service-router.ts` —
  which also registers the dialog-request routes, `notification.service-router.ts`,
  `web-view.service-router.ts`, `window.service-router.ts`) that forwards to the scoped service of
  the window that should handle it: the owning window when ownership is determinable (e.g. a command
  whose first argument names a web view routes to the window that owns that web view), otherwise the
  routing target (`adr-window-readiness-in-main`). A few read-only queries fan out and merge across
  all windows instead, where a merged view is the meaningful answer.
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

## adr-singleton-services-elect-host-window: App-global singleton services elect a host window first-come, with takeover on host-window close

- **Formerly:** ADR-0009
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

## adr-window-readiness-in-main: Window readiness is tracked in main via window-service registration, used to pick routing targets

- **Formerly:** ADR-0010
- **Date:** 2026-08-05
- **Status:** Accepted
- **Context:** A window's `BrowserWindow` exists (and is enumerable) well before its renderer has
  registered any window-scoped service, because window creation and renderer service startup are
  asynchronous. Service routers (`adr-generic-name-routing-proxies`) need to avoid picking a window
  that can't yet answer.
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

## adr-character-marker-removal-peels-one-layer: Character-marker removal peels one nesting layer per activation; the row is labelled to match rather than looping

- **Formerly:** ADR-0011
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

## adr-editor-edit-side-effects-shared-module: Editor edit side effects (version-history snapshot, sync-blocked notice) live in one shared module

- **Formerly:** ADR-0012
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
  snapshot on a resolved editor ref, because unlike the insert paths it has a reachable no-op (the
  ref is null until the editor mounts) and would otherwise write a restore point for an edit that
  never happened. One no-op remains documented-but-undefended — the editor silently declines a
  removal it cannot confine to the selection — for the same reason
  `adr-character-marker-removal-peels-one-layer` records: there is no outcome signal from
  `removeCharacterMarker` to branch on. New edit paths should route through this module rather than
  inlining a fourth copy.
- **Source:** Review of PR #2665 (`remove-character-marker`) — reuse findings on duplicated snapshot
  and sync-notice blocks.

## adr-packaged-extensions-are-discovered: `InstalledExtensions.packaged` reports discovered extensions, not activated ones

- **Formerly:** ADR-0013
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

## adr-analytics-in-extension-host: Analytics abstraction layer hosted in extension-host; environment resolved once and fail-safe toward test

- **Formerly:** ADR-0014
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

## adr-per-web-view-ctrl-f-for-find: Per-web-view Ctrl+F for Find, not a main-process `before-input-event` branch

- **Formerly:** ADR-0015
- **Date:** 2026-08-18
- **Status:** Accepted (narrows `adr-app-global-shortcuts-in-main` rather than superseding it)
- **Context:** PT-4341 makes Find (Ctrl+F) reachable from every scripture tab type, not just the
  Scripture editor. `adr-app-global-shortcuts-in-main` says app-global shortcuts belong in the
  Electron main-process `before-input-event` handler (`src/main/main.ts`) and explicitly rejects
  "renderer-level global `keydown` — duplicated into every web-view" as the alternative. Find is
  app-wide in the sense that the user expects Ctrl+F to work wherever scripture is on screen, so on
  its face this work looks like an `adr-app-global-shortcuts-in-main` case. But
  `platformScripture.openFind` is not a zero-argument command: it needs the id of the web view the
  user is *in*, the project of the scripture that web view is *showing* (for a reference panel this
  is the displayed resource, not the tab's own `projectId`), and that web view's current **text
  selection** to pre-fill the search box. `before-input-event` fires in the main process, which has
  none of those: it can identify the focused window, not the focused tab, and it cannot read a
  selection inside an `about:srcdoc` iframe. Routing them back would mean inventing a "focused
  scripture tab reports its selection" channel — a platform capability that does not exist.
- **Decision:** Keep the Ctrl+F handler in the renderer, inside the web views, but hold it in **one
  shared hook** — `useOpenFindShortcut` in
  `extensions/src/platform-scripture-editor/src/use-open-find-shortcut.hook.ts` — that every
  scripture tab type mounts (Scripture editor, model text, Bible text, commentary, Text Collection).
  The hook owns the key match, the "no scripture resolved yet" no-op, the selection read, and the
  error logging; a tab supplies only its web view id and the project id of the scripture it is
  showing. `adr-app-global-shortcuts-in-main` continues to govern shortcuts whose command needs
  nothing from the focused view. The Text Collection tab shows several resources at once and so has
  no single displayed resource: it supplies the project of the resource holding the **caret**,
  tracked by `useFocusedResourceProjectId` off the cells' `data-project-id`.
- **Alternatives:** (a) **A `before-input-event` branch per `adr-app-global-shortcuts-in-main`** —
  rejected: it cannot supply the triggering web view id, the displayed resource's project, or the
  selection, so Find would open against the wrong scripture and never pre-fill. (b)
  **`before-input-event` plus a new "focused scripture tab" PAPI channel that reports id + project +
  selection** — deferred: that is the general fix (and the honest precondition for making Ctrl+F
  app-global), but it is a platform capability well beyond this ticket's scope. (c) **Duplicate the
  listener per web view** (what the first draft of this branch did, with the editor keeping its own
  inline copy) — rejected: two implementations of the same shortcut drift, which is exactly
  `adr-app-global-shortcuts-in-main`'s stated objection.
- **Consequences:** Ctrl+F works only in tabs that mount the hook, so **each new scripture tab type
  is an opt-in** — the real coverage gap of the renderer-level approach, and the one thing the
  main-process handler would have given for free. Adding a tab type is one hook call plus a resolved
  source project. The catalog entry `scripture-find` in `src/stories/keyboard-shortcuts.data.ts` lists
  the hook plus every mount site, so the current coverage is greppable in one place; keeping it
  accurate is what stops the gap from going unnoticed. **Revisit** if (b) is ever built, or once
  enough view-context-dependent shortcuts accumulate to justify a general channel.
- **Source:** PT-4341 "Open Find from any scripture tab type" (PR #2677) — review finding that the
  branch diverged from `adr-app-global-shortcuts-in-main` without recording why.

## adr-empty-is-zero-state-primitive: shadcn `Empty` is the zero-state-with-action primitive; `EmptyState` stays message-only

- **Formerly:** ADR-0016
- **Date:** 2026-08-18
- **Status:** Accepted
- **Context:** PT-4111 needed a zero-state carrying a title, a description, and an optional action
  button (the scripture editor's "this book is not in this project" state, whose Power-mode variant
  offers a Manage Books button). Three candidate shapes already existed and nothing said which to
  reach for. `EmptyState`
  (`lib/platform-bible-react/src/components/basics/empty-state.component.tsx`, 2 consumers) renders
  a single `role="status"` message and has no slot for a title or an action. `InstallFailedView`
  (then at `extensions/src/platform-scripture-editor/src/install-state-views.component.tsx`; renamed
  `RetryableErrorView` in `panel-state-views.component.tsx` by PT-4347 — see
  `adr-panel-readiness-from-sources`, 2 consumers) is genuinely "full-panel message + action button"
  but is scoped to DBL install recovery. Neither is a general primitive, and the next three tickets
  in the same epic (PT-4132, PT-4347, PT-4349) each need a zero-state too, so an ad-hoc fourth shape
  would have compounded.
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
  intent, and copying its shape for a fourth time is exactly the drift
  `adr-editor-edit-side-effects-shared-module` warns about; UX also specified the shadcn primitive
  by name. **Hand-write an equivalent component** — rejected: forfeits the upstream-diffable
  baseline that `/add-shadcn-component` exists to preserve.
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

## adr-one-shot-launch-parameters: One-shot launch parameters on `open*` commands: optional scalar, options field, scrubbed on rebuild

- **Formerly:** ADR-0017
- **Date:** 2026-08-18
- **Status:** Accepted. (Briefly amended by `adr-launch-token-withdrawn`, now withdrawn:
  `adr-launch-token-withdrawn` asserted that point (4) rested on a false premise about
  `reloadWebView`. Tracing the nonce showed the opposite — the premise here is correct and the
  mechanism is stronger than stated. Point (4)'s wording is corrected below to say why the reload
  works, and the "a nonce or launch token — rejected" alternative stands.)
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

## adr-launch-token-withdrawn: A launch token is required to deliver launch parameters to an already-open web view — WITHDRAWN

- **Formerly:** ADR-0018
- **Date:** 2026-08-18 (withdrawn 2026-08-19)
- **Status:** **Withdrawn.** Its central factual claim is wrong, and the mechanism it introduced was
  dead code. `adr-one-shot-launch-parameters` stands unamended in substance. Kept rather than
  deleted because the *way* it was wrong is the useful part: it is a worked example of a plausible
  mechanism claim that survived implementation, five duplicated code comments and a passing test,
  and was caught only by tracing the nonce to its use site.
- **What was wrong:** it asserted "the generated `content` string and per-id nonce are unchanged." Two
  nonces exist and they were conflated. `getWebViewNonce(id)` is indeed stable per id — but it never
  enters `content`. `srcNonce = newNonce()` does, regenerating on every `getWebView` call and
  interpolated throughout the generated document, so `content` differs on every reload,
  `web-view.component.tsx`'s `srcDoc={content}` changes, the iframe reloads, and the React root IS
  destroyed and recreated. The service host even carries a standing TODO saying so in as many words
  ("Generating nonces every time causes webviews to rerender every time `getWebView` is used on an
  existing webview").
- **Consequences of the withdrawal:** the launch token could never have fired — every guard seeded
  its ref from the incoming token at mount, so `launchToken === ref.current` was always true and no
  effect body ever ran. The feature worked throughout because `adr-one-shot-launch-parameters`'s
  lazy initializers were correct all along. The token plumbing has been removed from all five files,
  and the inverted trade-off this withdrawn decision claimed to avoid is recorded honestly in
  `adr-one-shot-launch-parameters`'s consequences instead: the remount really does discard in-dialog
  state, which is the cost of the mechanism rather than something a token avoided. The sibling
  `projectId` bug reported here is likewise not a bug: a mount-only initializer is correct
  precisely because the reload remounts.
- **Process lesson:** a claim about platform behavior belongs in ONE place. This one was duplicated into
  five code comments, and when it turned out false all five were wrong together — and their number read
  as corroboration. Assert platform mechanics once, at the site that depends on them, and link to it.
- **Superseded content follows, for the record.**
- **Original status:** Accepted (supersedes `adr-one-shot-launch-parameters`'s delivery mechanism)
- **Context:** `adr-one-shot-launch-parameters` rejected a launch token on the stated premise that
  force-calling `reloadWebView` re-triggers the launch. Code review traced the call and found the
  premise false. `reloadWebView` -> `openOrReloadWebView`
  (`src/renderer/services/web-view.service-host.ts`) calls the provider's `getWebView` and saves the
  new state, but the iframe is **not** reloaded: the generated `content` string and per-id nonce are
  unchanged, so only `onDidUpdateWebView` fires (`src/renderer/components/web-view.component.tsx`
  re-sets `srcDoc` only when `content` changes). The existing React root re-renders and never
  unmounts. `useWebViewState` does surface the new values, but `adr-one-shot-launch-parameters`'s
  prescribed consumer shape — a lazy `useState` initializer — does not re-run on re-render, and a
  mount-only `useLayoutEffect([])` does not re-fire. Net user-visible effect for PT-4111: with
  Manage Books already open, choosing "Manage books" from the not-available view fronted the tab but
  left it on the previous section with no preselection and no scroll — the feature's core affordance
  silently no-opped. Implementing the fix surfaced a second latent bug: a `useEffect` resetting
  `selectionsByAction` on `projectId` also ran on mount, wiping the lazy-initialized preselection,
  so even the *first*-launch case never worked.
- **Decision:** Carry a monotonically increasing **launch token** in the web view's options
  alongside the launch parameters, bumped on every `open*` invocation, scrubbed by the same
  unconditional assignment `adr-one-shot-launch-parameters` point (3) prescribes. Consumers apply
  launch parameters in an **effect keyed on the token**, not in a lazy `useState` initializer. A
  token — rather than comparing the parameter values — is required because two consecutive identical
  launches produce identical parameters and are otherwise indistinguishable.
- **Alternatives:** **Compare parameter values and re-apply on change** — rejected: cannot distinguish
  a repeat launch with the same parameters, which is a normal case. **Remount via a `key` derived from
  the token** — viable and simpler to reason about, but discards all unrelated in-dialog state (scroll,
  other sections' selections) that the user may care about; the keyed effect preserves it. **Make
  `reloadWebView` genuinely reload the iframe** — rejected as out of scope and far more disruptive: it
  would change behavior for every existing caller.
- **Consequences:** `adr-one-shot-launch-parameters`'s "no re-apply effect" consequence is reversed;
  the re-apply is scoped so it overrides only the launched-to section's selection and leaves the
  user's other in-dialog state intact. The same token fixes the sibling case where `projectId` was
  seeded by a mount-only initializer, so "reload updates the existing tab with the new project
  context" now holds. The already-open relaunch path needs a test — it is invisible in the
  mount-only tests that previously covered this feature (see
  `manage-books-dialog.component.test.tsx`). More generally: `reloadWebView` should not be assumed
  to remount anything.
- **Source:** PT-4111 `/review-paratext` code review. Withdrawn after PR #2691 review traced
  `srcNonce` to its use site.

## adr-single-verse-surfaces-resolve-verse-zero-to-one: Verse 0 resolves to verse 1 on single-verse display surfaces (display-only)

- **Formerly:** ADR-0019
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

## adr-find-follows-editor-to-read-only: Find follows the editor onto read-only resources, with replace withheld

- **Formerly:** ADR-0020
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
  with PT-4343's `platform.isEditable` read (`adr-per-web-view-ctrl-f-for-find`'s sibling work) when
  the branch rebased.

## adr-tab-order-anchor-insert-before: Column 3 tab order is expressed as anchor + insert-before in the layout supplement, not as a pinning mechanism

- **Formerly:** ADR-0021
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

## adr-book-selection-is-summarized: A book selection is summarized, not listed, on a scope trigger; its details surface is the picker, not a tooltip

- **Formerly:** ADR-0022
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

## adr-books-present-partial-decode: `BooksPresent` decoding degrades to a partial read; `platform-bible-utils` owns the wire format

- **Formerly:** ADR-0023
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

## adr-toolbar-sync-status-is-local: The toolbar's sync status is local renderer UI, and names in-progress projects from a new upstream field

- **Formerly:** ADR-0024
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

## adr-find-narrows-book-lists: Find excludes extra material by narrowing its book lists, not by gating its scopes

- **Formerly:** ADR-0025
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

## adr-tab-supplies-its-own-selection: A tab’s own web view supplies its selection to Find, rather than a shared selection store

- **Formerly:** ADR-0026
- **Date:** 2026-08-16
- **Status:** Accepted
- **Source:** PT-3216 (pass editor text selection to Find), PR #2692; builds on the shared Ctrl+F
  hook from `adr-per-web-view-ctrl-f-for-find` / PT-4341.
- **Context:** Opening Find from a scripture editor tab's menu needed that tab's text selection. The
  work item proposed publishing the selection into the platform's shared store so a command handler
  could read it. Two facts made that unnecessary and unavailable: (a) the scripture editor sets
  `shouldShowToolbar: false` (`extensions/src/platform-scripture-editor/src/main.ts`) and instead
  renders its own `TabToolbar` *inside* its web view
  (`extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx`), so its
  menu handler already runs in the document that owns the selection; (b) `sharedStoreService`
  (`src/shared/services/shared-store.service.ts`) is explicitly not part of the public API and is not
  reachable from extensions.
- **Decision:** Find takes the selection of the tab it was triggered from, read in that tab's own
  web view via `window.getSelection()` and passed through the existing `platformScripture.openFind`
  `selectedText` parameter. No cross-tab selection state. `resolveFindSelectionText`
  (`extensions/src/platform-scripture-editor/src/find-trigger.util.ts`) is the single normalizer
  every trigger goes through, so all of them apply the same two rules: trim (a double-click word
  selection often carries a trailing space), and reject anything spanning lines (Find's search box
  is a single-line input, so a Ctrl+A selection cannot be shown honestly and must not be flattened
  into a run-on term). The two trigger paths deliberately differ in one respect: the tab menu
  additionally consults a capture-phase pointer-press snapshot (`use-selection-snapshot.hook.ts`),
  because the click that opens the dropdown is itself what collapses the selection; Ctrl+F
  (`use-open-find-shortcut.hook.ts`, `adr-per-web-view-ctrl-f-for-find`) reads only the live
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
## adr-panel-readiness-from-sources: Panel readiness is derived from whether data sources arrived, never from a filtered result

- **Formerly:** ADR-0027
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
  fetch; only "does a configured item belong to *this* panel?" waits for the catalog. The two
  failure states differ in whether they offer a control, and that difference is the point. A catalog
  fetch can genuinely be re-driven, so `catalogError` carries a working retry. A project-setting
  read cannot be — nothing in either panel can force one, and user-layer errors are swallowed to the
  default list — so `error` shows a message alone. An inert control in a state that withholds every
  other affordance is worse than no control, so that message carries the recovery expectation
  instead: the setting stays watched and the panel recovers on its own. The error is also reported
  only while no readable value has ever been applied; once one has, holding it across a failed
  re-read is the job the buffer exists to do, so a later failure must not replace working content.
  Un-latching is not a free improvement for existing consumers: because the held value is now the
  placeholder rather than the error, any consumer that detected failure via
  `isPlatformError(heldValue)` alone silently starts reading an unreadable setting as an empty one.
  `useTextCollectionSources`, the hook's other consumer, had to be updated to read the error channel
  for exactly this reason — a new consumer of `useBufferedLayoutSetting` must check the third tuple
  element, not just the held value. `RetryableErrorView` (renamed from `InstallFailedView` and moved
  to `panel-state-views.component.tsx`) is scoped to failures a retry can act on — a failed install
  or a failed catalog fetch. The settings-read failure is not one, so it renders a message alone.
  All four front states compose the shadcn `Empty` primitive per
  `adr-empty-is-zero-state-primitive`, each with its own icon: without one, the pick prompt and the
  catalog error rendered as identical screens whose buttons did opposite things (reconfigure vs.
  retry), which is what AC-4 asks these states to prevent. Panels that grow a third async source
  must extend the readiness signal rather than add another flag — the bug class here is precisely
  one guard being unaware of one source.
- **Source:** PT-4347 (NN 5C Resource panel shows correct loading state), whose named root cause —
  the merged conditional in `model-text-panel.component.tsx` — proved to be the symptom site rather
  than the defect.

## adr-async-hook-state-shape: Async hook state shape — discriminated union when the payload is state-specific, flat object otherwise

- **Formerly:** ADR-0028
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

## adr-toolbar-shrink-measurement: Responsive toolbars measure their own width in JS, not with CSS container queries

- **Date:** 2026-08-19
- **Status:** Accepted
- **Context:** Toolbar items were disappearing at narrow widths — most seriously the
  structure-protection lock, a safety indicator, which vanished entirely in Simple mode at the
  smallest window. Making items shrink in steps instead needs a width signal. Tailwind container
  queries are the obvious mechanism and were already used in two places, but both were broken:
  `platform-enhanced-resources`' tab bar had written `tw-@container/toolbar` with a dash where
  Tailwind v4's prefix needs `tw:`, so the class emitted nothing, the container was never
  established, and its four tab labels were hidden at every width — silently, for as long as that
  code had shipped. `manage-books-dialog.component.tsx` records the same conclusion reached
  independently (its `@md/…:` variants never reached the web view bundle), and
  `platform-tab-title.component.tsx` records a third failure, where `container-type: inline-size`
  corrupted rc-dock's content-driven ancestor sizing.
- **Decision:** Width-driven collapse goes through `useShrinkStep` — a `ResizeObserver` on the
  toolbar root that maps width to a discrete step, published to descendants via
  `ShrinkStepContext`. Items read the step and pick a label form. `ToolbarCompoundLabel` encodes the
  shared rule that a two-field label always sacrifices its second field first.
- **Alternatives:** **Fix the prefix and keep container queries** — rejected: it repairs one
  instance of a mechanism that has now failed three times in this repo, and its failure mode is
  silent (no class, no error, no visible difference until someone resizes). **A hook per component**
  — rejected: three toolbars would each grow their own observer and thresholds. **Measure in the
  consumer and pass a prop** — rejected: every consumer would re-derive the same ladder.
- **Consequences:** One observer per toolbar rather than per item. Steps are testable under
  jsdom, which CSS queries are not. The cost is that thresholds are pixel constants that must be
  tuned by eye, and that a consumer reading the step must render *inside* the toolbar — a component
  that renders the provider sits above it and silently reads the default. Two existing hand-rolled
  `ResizeObserver` width thresholds (`platform-tab-title`, `manage-books-dialog`) were left alone
  and could migrate later.
- **Source:** PT-4344.

## adr-simple-mode-column-minimums: Simple-mode column minimums are derived from the window minimum, dividers included

- **Date:** 2026-08-19
- **Status:** Accepted
- **Context:** Simple mode's three columns each carried `panelLock.minWidth: 300`, totalling 900px
  inside a window that could be dragged to 800px. The dock overflowed and the third column was
  reachable only by scrolling. UX then confirmed a 900px window minimum is safe (2025 analytics:
  99.83% of 11,587 users on screens 900px or wider), which appears to make three 300px columns fit
  exactly — but it does not. rc-dock adds `(children - 1) * 4` to a box's minimum width in its own
  arithmetic, a hard-coded 4px per divider unrelated to the 2px Simple mode paints, so three 300px
  columns demand 902px.
- **Decision:** Raise the window minimum to 900 and derive the column floor from it, budgeting
  rc-dock's reserve: `SIMPLE_COLUMN_MIN_WIDTH_PX = 297`, since `3 × 297 + 2 × 4 = 899`. Both numbers
  are named constants, and `simple-layout.data.test.ts` asserts the arithmetic including the divider
  reserve.
- **Alternatives:** **Clip the 2px overrun** (`min-width: 0 !important` + `overflow-x: clip` on the
  dock box) — implemented first, then reverted: it treated a 2px arithmetic error as a layout
  problem, and clipping the dock box also clips rc-dock's float and max boxes, cutting off dialogs
  wider than the window. **Patch rc-dock's divider constant** via the existing `patches/` mechanism —
  viable, and it would also fix Power mode, where 8px dividers are under-reserved by the same
  hard-coded 4; deferred as a larger change than this ticket warranted. **Equal-thirds column
  weights** — rejected: it would give the editor 266px at the minimum window, below what its own
  toolbar needs, and would narrow the editor at every width, not just the smallest.
- **Consequences:** No horizontal scrollbar at any supported window size — measured in the running
  app on macOS 2026-08-24, during review of PR #2701. At a 900px window the columns come out
  297 / 302 / 297 = 896, plus rc-dock's 4px-per-divider reserve, for exactly 900; the dock box
  reports `min-width: 899px` and `scrollWidth === clientWidth`. A 1600px window is clean too
  (399 / 798 / 399). That confirms the model this floor was derived from — rc-dock's `Algorithm.js`
  sums child `minWidth`s and then adds `(children - 1) * 4` — rather than only the arithmetic.
  Worth knowing if this is ever re-measured: `simple-layout.data.test.ts` asserts that arithmetic
  and nothing else, so it cannot fail if the model turns out to be wrong; only an app run can catch
  that. The 1:2:1 weighting is retained and pinned by a test, so the editor grows twice as fast as
  its neighbours above the floor. Columns are proportional with no JS: rc-dock renders each as
  `flex: (size) (size × 1e6) (size)px`, so removing the floor is all that "proportional resize"
  required. The window minimum and the column floor are two constants in different files that must
  move together; the test cannot import the Electron-side value, so its comment says to change both.
- **Source:** PT-4344; Jolie Rabideau measured the shipped floor in the running app on macOS during review of PR #2701, 2026-08-24.

## adr-resource-missing-book-message: A missing book in a *published resource* is mode-agnostic and action-free; a *project* splits Simple/Power

- **Date:** 2026-08-20
- **Status:** Accepted
- **Context:** PT-4132 needed the "book not in this text" state for the Model text and Bible
  texts/Commentaries panels, and the ticket asked to "compare expected behavior for PT-4111", which
  had just built `BookNotAvailableView` with a deliberate Simple/Power split. The obvious reading was
  to reuse that view, or to mirror its shape with a second interface-mode branch.
- **Decision:** Resource panels get ONE message for both interface modes, with no action button, via
  a separate `ResourceBookNotAvailable` component. The Simple/Power split in `BookNotAvailableView`
  exists solely because a *project* missing a book is **actionable** in Power (Manage Books can
  create it). A published resource cannot gain a book in either mode, so both arms would say the same
  thing. PT-4111's own `isResource` branch already ignores interface mode for exactly this reason.
  The panels swap only their content area, leaving the header mounted — the resource panel's selector
  is the user's real remedy (switch to a text that has the book), and the model panel's label at
  least attributes the message to a named text.

  **Scope limit, known and deliberate.** "Published resource" is not the whole of what these panels
  display. The Bible texts tab also lists real Paratext projects (`isProjectReference` in
  `resource-text-panel.web-view.tsx`, whose `resourceProjectId` is then the project's own id), and
  that panel is available in Power mode. Such a project CAN gain a book, so for it the premise above
  does not hold and the action-free message is a weaker answer than the main editor's one-click
  **Manage books**. This is accepted for now rather than unnoticed: giving a side panel a
  project-data-mutating action is a product decision, and it reopens exactly the Simple/Power split
  this ADR avoids for the resource case. Tracked as PT-4416.

  Detection is centralized in `platform-scripture-editor.utils.ts`, which replaced a
  `bookNotFoundRegex` local to `platform-scripture-editor.web-view.tsx`. All FOUR surfaces — the main
  editor, the Bible texts/Commentaries panel, the Model text panel, and the Scripture Text Grid's
  cells — answer "is the book on screen missing from the text on screen" through one function,
  `isMissingBookOnScreen`, regardless of whether they read the error from a subscription hook or from
  an awaited call.

  **What is NOT yet shared is the decision that leaf predicate feeds.** Each surface still spells out
  its own ordering — `resolveResourceContentState`, `deriveCellState`, the model panel's
  `renderContent` chain, and the main editor's `bookExists`. The two that disagreed have since been
  brought into line: `resolveResourceContentState` now reads a missing-book failure naming some other
  book or resource as `'loading'` and any other failure as `'failed'`, which is the ordering
  `deriveCellState` already used, so a grid cell and a panel can no longer give opposite answers about
  one error. The model panel derives the same three answers from its own local fetch state. Converging
  all of them on one resolver returning a discriminated union — so the disagreement is unrepresentable
  rather than merely absent today — is tracked as PT-4416.

  The message itself is `EmptyState`, per `adr-empty-is-zero-state-primitive`'s reservation of that component for the
  bare-sentence case; `ResourceBookNotAvailable` contributes only panel-sized centring and the focus
  target, and does not repeat the `role="status"` that `EmptyState` already sets. Every surface that
  shows this sentence renders it through that one component — the two resource panels and the main
  editor's `isResource` branch — so the wording, styling, live-region announcement, and focus repair
  cannot drift apart between them.

  The message is shown only when the failure names BOTH the book and the project the view is
  displaying right now, compared in the RENDER BODY rather than latched when the failure arrived.
  `parseMissingBookError` returns the `bookNum` and `projectId` the C# `MissingBookException` message
  carries, and `isMissingBookOnScreen` compares them against what is on screen. Every surface that
  can report a missing book goes through it — the main editor, both resource panels, and the
  Scripture Text Grid's cells, which re-key their chapter subscription on the grid's shared
  reference and so navigate exactly as the full-panel surfaces do. A data hook keeps serving the
  previous selector's result until the new subscription's first update lands, so an error in hand may
  describe a book the user has navigated away from or a resource they have switched off.
  Project ids are compared case-insensitively via `normalizeProjectId`: C# canonicalizes them to
  uppercase and reports that form, while a view's own id arrives verbatim from a resource reference,
  and the PDP lookup folds case — so a casing mismatch would be invisible everywhere except here.
  Non-`PlatformError` values are rejected structurally inside the shared helpers before any message is
  read, because `getErrorMessage` falls back to `JSON.stringify` for an object with no string
  `message`: letting a success value through would serialize the whole chapter USJ on every render and
  match the regex against the scripture text itself.
- **Alternatives considered:** **Reuse `BookNotAvailableView` with `isPowerMode`** — rejected: it
  would drag in the `isLoading` gating hazard that view documents at length (a setting's default is
  indistinguishable from an answer, so branching on it requires a spinner gate) to decide between two
  identical messages. The model text panel reads `platform.interfaceMode` zero times today, so this
  would also mean threading mode through a presentational component boundary. **One generic
  "…in this resource" string** — rejected: the resource panel already keeps four `bibleTexts_` /
  `commentaries_` key pairs selected by a `resourceType` ternary, including the sibling
  `emptyState_prompt`; a shared string would be the deviation. **Promote the stale-data window to
  `'loading'`** — rejected: it returns `'loading'` on every reference change, remounting the editor
  on every chapter navigation. **Gate the message on the data hook's `isLoading`** — implemented
  first, then withdrawn during `/review-paratext`. `isLoading` is raised by an effect keyed on the
  data provider and selector (`create-use-data-hook.util.ts`), and effects run after the commit, so
  the render that first pairs a new selector with the previous result still sees `isLoading` false and
  would assert "this book does not exist in this Bible text" about a book that does. **A boolean
  latched per fetch in the imperative panel** — rejected for the same reason in a different disguise:
  clearing a flag at fetch start happens in an effect, one render after the navigation it is meant to
  cover. Only deriving the answer from the failure's own identities makes the wrong frame
  unrepresentable.
- **Consequences:** Two book-not-available views coexist, and the distinction between them is
  "can this thing gain a book", NOT "is this editable" and NOT "which mode are we in" — the same
  project-kind-vs-permission distinction `adr-empty-is-zero-state-primitive`'s feature draws via `platform.isPublished`. Because
  the Bible texts tab can display a project, that distinction is currently drawn by *surface* rather
  than by what is on screen; PT-4416 covers closing the gap.

  A resource panel now has FOUR content states, not three, because deciding that a missing book earns
  a dedicated message forced the question of what the other failures earn. Once the panel stops
  mounting an editor it has no scripture for, "no USJ" can no longer stand for both "still arriving"
  and "this read failed" — the first is a spinner and the second is terminal, and a spinner shown for
  a terminal failure claims progress that never comes. So an unreadable project or a permissions
  failure gets its own named message (`%webView_resourcePanel_textUnavailable%`, shared by both
  panels) and a `logger.error`, which is the only place the cause survives, since every terminal
  failure looks the same on screen. This is a change of behaviour from before the feature, where such
  a failure fell through to an editor with nothing in it.

  Detection still rests on matching a C# exception message, now in one place: reword
  `MissingBookException` and every consumer silently reports "book present". `MissingBookExceptionTests`
  pins the exact wording on the C# side so that rewording fails a test rather than a user. Reordering
  or renaming its two interpolated values is also breaking, since the identity regex reads them
  positionally. Detection and identity use two different patterns on purpose: the identity pattern
  captures the two values and so can fail on an unexpected message shape, while detection matches only
  the invariant part of the sentence and so still succeeds there. What a caller does with that gap
  depends on whether it has a neutral outcome. The resource panels do: an identity failure falls to
  `'failed'`, which names the failure on screen and logs it — not silently correct, but diagnosable,
  and terminal rather than a spinner that never resolves. The main editor does NOT —
  its gate is the identity comparison, and a miss means `bookExists` stays true while no USJ ever
  arrives, i.e. an indefinite spinner rather than the pre-feature book-not-available view. It
  therefore falls back to detection alone when the identities cannot be parsed, which is sound
  because a *stale* failure always parses (it names some other book or project), so an unparseable
  message cannot be a stale one. The stale-content flash on navigation is untouched and remains
  PT-4139's scope.

  The focus repair both book-not-available views perform lives in `useFocusReplacedContent`
  (`extensions/src/platform-scripture-editor/src/use-focus-replaced-content.hook.ts`). It requires
  focus to have fallen to the document body, not merely `document.hasFocus()`: a panel that keeps a
  header mounted beside the swapped content has focusable siblings in the SAME document, so the
  looser guard stole focus off the resource selector — the one control that can remedy a missing
  book. The cost is that the repair no-ops when focus rests on a control elsewhere in the same
  document, including the main editor's own reference control; that is the intended trade, since
  taking focus from a control the user is operating is the worse failure.
- **Source:** PT-4132 (Empty state needs to be improved for the Model and Bible texts). Premise
  scope, the shared-decision correction, and the `isLoading` mechanism correction from PR #2704
  review.

## adr-blank-chapter-simple-mode-only: The blank-chapter view stays Simple-mode-only, because it removes the editing surface

- **Date:** 2026-08-25
- **Status:** Accepted
- **Context:** PT-4403 (#2710), squash-merged into PT-4132's branch, dropped the `!isPowerMode` gate
  on `EmptyChapterView` in `platform-scripture-editor.web-view.tsx` so that a Power user would also
  get the honest "this chapter is empty" message and the "Add chapter number" scaffold action.
- **Decision:** Keep the gate. `EmptyChapterView` does not sit BESIDE the editor — it applies
  `tw:hidden` to the editor subtree, and `display: none` removes it from the accessibility tree and
  the tab order. The scaffold button is then the only way back to typing, and `showButton` withholds
  it in three reachable cases: a read-only project, `chapterNum: 0` front matter (which
  `calculateTopMatch('GEN 0')` produces and `handleTopMatchSelect` passes through), and the window
  while versification is still loading (`usePromise(..., { preserveValue: false })`). In Power mode
  — where typing straight into a blank chapter IS the workflow — each of those becomes a dead end
  with no editor and no button. Simple mode accepts that trade because the scaffold, not free
  typing, is its model for creating chapter content.
- **Alternatives considered:** **Keep the unification and fix `showButton`'s three gaps** — the
  better end state, but it is a Power-mode *editing* behaviour change that belongs in its own ticket
  with a test pinning the new invariant, not folded into a PR about resource panels. **Show the
  message without hiding the editor** — plausible, and it would make the mode question moot; it
  changes the Simple-mode layout that PT-4403 shipped and reviewed, so it is not a drive-by either.
  Both are PT-4416.
- **Consequences:** A Power user sees an ordinary empty editor for a blank chapter, exactly as
  before PT-4403 — no message, and no scaffold shortcut. `EmptyChapterView`'s docstring saying
  "Simple mode only" stays true. The main editor's `isResource` case now passes `isResource` into
  `EmptyChapterView` so a published resource gets
  `%webView_platformScriptureEditor_emptyChapter_messageResource%` rather than the project-oriented
  wording, matching the side panels.
- **Source:** PT-4132, PR #2704 round-6 review (blocking finding 1).
## adr-find-tolerance-as-engine-options: Find expresses whitespace and diacritic tolerance as engine options, never by rewriting the query

- **Date:** 2026-08-26
- **Status:** Accepted
- **Context:** PT-3408 reported that a term typed with extra spaces returned no results. The first
  fix collapsed runs of spaces in the query inside the Find web view's option builder, on the
  premise that the searched text can never contain consecutive spaces because ParatextData's
  `UsfmToken.RegularizeSpaces` normalizes them on write. **That premise is false.** Find searches
  USJ, not USFM: `UsjReaderWriter` concatenates adjacent text nodes with `textChunks.join('')` and
  no separator, so a trailing space in one node followed by a leading space in the next is a real
  double space in the searched text. Running the engine against a fixture of that shape
  (`<char style="it">Salvador. </char><unmatched/> porque`) confirmed it: the exact two-space query
  matched, and the same query routed through the collapse matched nothing. Rewriting the query also
  made the reported match span include the user's padding, so a replace spliced the surrounding
  spaces away and fused the neighboring words; and it did nothing at all under any word restriction.
- **Decision:** The search term reaches the engine **byte-identical**. Whitespace and diacritic
  tolerance are expressed only as `FindOptions` the engine applies when _matching_
  (`ignoreWhitespaceDifferences`, `ignoreDiacritics`, both already implemented in
  `buildSearchRegex`), and both are surfaced as user-togglable Find filters, mirroring PT9's
  `FindReplaceOptions`. Both default to off, so an exact search — including for a specific invisible
  character such as NBSP or ZWSP, which the Find UI deliberately renders in results — is what the
  user gets unless they opt out of exactness. The UI adapter that maps Find's state onto
  `FindOptions` lives in its own module (`find/find-options.utils.ts`) rather than in `find.utils.ts`,
  which the backend PDP engine imports.
- **Alternatives:**
  - **Set `ignoreWhitespaceDifferences: true` unconditionally.** Rejected: it makes every invisible
    character interchangeable with an ordinary space, removing any way to search for an exact
    invisible character outside regex mode. Correct as an option, wrong as a default.
  - **Keep the collapse but also trim, and widen it to all whitespace via `normalizeScriptureSpaces`.**
    Rejected: no amount of tuning fixes it. Any query rewrite destroys information the user typed,
    so real consecutive whitespace in the text stays unsearchable whatever the pattern.
  - **Revert and return PT-3408 to UX.** Viable — the ticket's Definition of Done still asks whether
    spaces should be forgiven — but it ships no fix, and the toggle answers the question in the
    user's hands rather than guessing at a global default.
- **Consequences:** Extra spaces are forgiven only when the user asks for it, so the reported
  PT-3408 symptom now has a remedy that costs nothing by default. Real consecutive whitespace stays
  searchable, which the collapse had made impossible. Two more persisted web-view state keys and two
  more search-invalidating dependencies. `ignoreDiacritics`, already implemented and tested at the
  engine level but never reachable from the UI, becomes user-visible in the same change — it is the
  sibling flag on the same PT9 dialog and gains its control alongside. The Storybook harness
  approximates `ignoreWhitespaceDifferences` but not `ignoreDiacritics`, which its TSDoc records,
  since emulating NFD normalization over the fixture text is out of proportion to a story.
  Upstream ParatextData is separately moving to preserve consecutive spaces
  (`PreserveConsecutiveSpacesInTextTokens`); this decision is unaffected by that, since it never
  relied on the normalization holding.
- **Source:** PT-3408, review of PR #2715.

## adr-pt9-legacy-data-as-parsed-models: PT9 legacy interlinear data is served as parsed models through a read-only projectInterface

- **Date:** 2026-08-25
- **Status:** Accepted
- **Context:** Importing Paratext 9 interlinear data into a Platform.Bible extension requires core
  to expose project-folder files extensions cannot otherwise reach (extensions have no filesystem
  access, and `ExtensionData` is confined to its own store). PT9 keeps this data in per-language
  interlinear book files plus `Lexicon.xml`, `WordAnalyses.xml`, and `InterlinearSetup.xml`. This
  is the first projectInterface serving PT9-legacy per-project file data, and the next PT9 import
  (hyphenation, renderings, and spelling are all existing PT9 `ProjectFileType` categories) will
  follow whatever precedent it sets. Decided on PR #2707.
- **Decision:** Four coupled choices. (1) **Parsed models, not raw file text:**
  `platformScripture.Pt9Interlinear` serves typed records deserialized through ParatextData's own
  XML classes, read via each project's live `FileManager`, with PT9's own read semantics and never
  stricter ones - duplicate keys keep the last occurrence, a missing range defaults, and a
  malformed boolean or unknown enum name fails the file exactly as it would fail in Paratext 9.
  Core owns the payload schema; consumers never re-derive PT9's file formats from bytes. (2)
  **Change detection is a polled manifest, not events:** the interface emits no file-change
  events; a manifest getter serves an opaque SHA-256 change token per covered file (the
  interlinear book files, the lexicon, and the stored word analyses; the setups file rides the
  payload without change detection). Content hashes rather than mtimes, because Send/Receive
  rewrites timestamps without changing content.
  (3) **Advertisement by project class:** the interface joins the unpublished-only list beside
  `legacyCommentManager.comments` - published projects are distributed archives that do not carry
  interlinear authoring data - and wire-method registration is gated on the advertised list, so
  the wire surface always matches the advertisement. (4) **Namespace:** the interface lives under
  `platformScripture.*` like the other Paratext-project interfaces; the project is the subject,
  and the legacy on-disk format is an implementation detail of what the getters read.
- **Alternatives:** (a) **Raw file text keyed by path** (the PR's original shape) - rejected after
  building both and comparing: every consumer re-implements PT9's parsers and inherits their
  divergences, raw text inflates ~1.65x when escaped into JSON, and path-keyed payloads leak
  storage layout into the contract. (b) **File-watcher change events** - deferred to the planned
  sync work; poll-on-open serves the importer today, and the manifest keeps the poll honest. (c)
  **Advertising by editability** - rejected: `platform.isEditable` is a separate per-project
  setting, and an unpublished project with `Editable=F` still carries importable interlinear
  data. (d) **A command instead of a projectInterface** - rejected: per-project capability
  advertisement is what projectInterfaces exist for, and "interface unsupported" doubling as "no
  PT9 data channel" is load-bearing for consumer UX.
- **Consequences:** The transport shapes the contract: a single WebSocket message past its limit
  tears down the whole C# connection (an unaddressed platform-level issue), so the response is
  bounded by an aggregate size cap and fails with a documented error whose machine-readable
  contract is the RESOURCE_EXHAUSTED platform error code (exception types do not cross the RPC
  boundary, but Exception.Data does); the documented message prefix remains the fallback for
  consumers that see only the message. Schema evolution now moves at platform speed: a field the
  payload drops costs a core release to recover, which is why the setup records deliberately
  carry the model text's identity even though nothing consumes it yet. A future PT9-legacy import
  should follow this shape - parsed models with PT9-parity semantics, a hashed manifest for
  change detection, unpublished-only advertisement - rather than re-litigating it.
- **Source:** PR #2707 review of the PT9 interlinear projectInterface - finding that the PR's
  architecture decisions had no recorded precedent for the next PT9-legacy import to follow.

## adr-shard-discovery-by-type: Service routers discover shards by network-object type, not by rebuilding the scoped name

- **Date:** 2026-08-06
- **Status:** Accepted
- **Context:** `adr-per-window-service-scoping` gave every per-window service a `${name}-${windowId}` registration name, and
  main's routers found a window's implementation by building that string again. So did window
  readiness (`adr-window-readiness-in-main`), which parsed a window id back out of a network object id. That made the
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
