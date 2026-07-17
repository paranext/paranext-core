# PT-4162 — Startup/shutdown unattended auto-sync for Power: design

**Date:** 2026-07-14 · **Ticket:** [PT-4162](https://paratextstudio.atlassian.net/browse/PT-4162) · **Epic:** PT-4158
**Repos:** `paranext-core` (the lifecycle triggers) + `paratext-bible-internal-extensions` (the session-sync command) — see D1
**Branch:** TBD — not started (design only)
**Depends on:** PT-4159 (the edit-block), PT-4160 (the schedule store); independent of PT-4163
**Status:** Q4 answered 2026-07-15 (see "Decision update" below) — design current, not yet started

## Decision update 2026-07-15

Q4 is answered: **UX chose non-blocking-UI.** No consent toast, no UI blocking for the startup
sync (or shutdown). Editing is still blocked, via PT-4159's mechanism — which is itself being
reworked from a full-workspace overlay to an editing-only block (event contract/store unchanged;
mechanism TBD). See D6 below (revised) and the Q4 section (annotated, original text kept for the
record). Full context, the consent-toast (PT-4193) spec, and PT-4164 Part B:
`2026-07-15-ux-decisions-pt-4158.md`.

## What this is

The session-boundary half of automatic Send/Receive for Power mode: sync the projects a user
scheduled **On startup/shutdown** when the app opens and closes — and _only_ those projects, not
Simple mode's "sync everything". Serves **NN-1, NN-2, NN-3**.

PT9's antecedent is `SendReceiveScheduleManager.Initialize()` / `.Shutdown()` (in
`AutoSendReceiveManager.cs`), which sync the OnStartupShutdown-scheduled projects at
`MainForm_Load` and at form-close. The `On startup/shutdown` preset is deliberately absent from the
interval loop (PT9 `TimeIntervalForType` returns −1 for it, `AutoSendReceiveManager.cs:476`; the
PT10 engine mirrors this — `auto-sync-engine.ts` `INTERVAL_MS_BY_PRESET` has no `onStartupShutdown`
key). So the interval engine (PT-4163) and this ticket partition the presets cleanly: **PT-4163 owns
hourly/4-hourly/daily; PT-4162 owns the two session events.** They never touch the same project.

The one genuinely open decision — **Q4: does the startup sync block editing?** — is framed at the end
of this doc and gates nothing above it. Everything in "Decisions" holds regardless of how Q4 lands.

## Facts that constrain this ticket (evidence)

Three findings shape every decision below; two of them the ticket did not have when it was written.

### F1 — Only core's main process can hold the app open at shutdown; an extension cannot delay quit

The quit-hold is pure Electron main-process machinery with **no papi surface**. When the main window
closes, `main.ts:557-573` calls `event.preventDefault()`, `await performShutdownTasks()`, then
`mainWindow.destroy()` — the comment at `main.ts:548-555` spells out that this lives in the window
`close` handler _specifically so it can hang the window until the sync completes_. The extension host
is only torn down later, in `app.on('will-quit')` (`main.ts:802-814`). A grep of core for
shutdown/quit hooks finds nothing exposed to extensions — there is no `onBeforeQuit`/`onShutdown`
papi event. **Therefore the shutdown sync must be _triggered_ from core's main process**
(`shutdown-tasks.ts`); an extension physically cannot postpone the quit to finish a sync.

### F2 — Only the S/R extension can raise the edit-block; core's main process cannot

PT-4159's overlay subscribes to the network event `paratextBibleSendReceive.onAutoSyncBlockingChanged`,
whose **emitter is owned by the S/R extension** (created in the extension's `activate()` via
`createNetworkEventEmitterAsync`, `main.ts:140-142` on `pt-4163-auto-sync-engine`; PT-4159 design D1
and PT-4163 design D5 both fix this ownership). A network event has a single emitter owner, and it is
in the extension host — **core's main process cannot emit it.** So if the startup sync is to block
(Q4=yes), the _block_ must be raised by the extension even though the _trigger_ comes from core.

### F3 — PT9 has no startup race because WinForms `Load` is synchronous and runs before `Shown`

PT9 calls `SendReceiveScheduleManager.Initialize()` from `MainForm_Load` (`MainForm.cs:2092`), and
`Initialize()` runs the startup S/R inline and synchronously (`AutoSendReceiveManager.cs:79-80` →
`SendReceiveProjectsForm.PerformSendReceive`, a blocking call that sets `SendReceiveInProgress = true`,
`SendReceiveProjectsForm.cs:211-214`). WinForms fires `Load` **before** `Shown` (`MainForm_Shown` is
`MainForm.cs:2034`), so the startup sync completes before the window is ever interactive — a PT9 user
_cannot_ type during it. PT10's `performStartupTasks` is instead fire-and-forget with the window
already up (`main.ts:236`, an un-awaited async IIFE) — the race is new in PT10. This is the whole
substance of Q4.

## Decisions (with evidence) — none of these are gated by Q4

### D1 — Module placement: core owns the _triggers_, the extension owns the _sync orchestration_

The ticket assigns PT-4162 to `paranext-core` and imagines `startup-tasks.ts` / `shutdown-tasks.ts`
reading the schedule and calling `syncProjects(subset)` directly. F1+F2 make a pure-core
implementation impossible for the blocking startup case, and awkward for everything else (stamping,
results, conflict routing to PT-4164 all live in the extension). Recommended split:

- **Core (`startup-tasks.ts` / `shutdown-tasks.ts`)** stays the _only_ trigger — it owns the
  lifecycle and, for shutdown, the quit-hold nothing else can do (F1). Its change is thin: branch the
  existing `interfaceMode` gate so Power no longer returns early, and invoke one extension command
  instead of Simple's `syncProjects(undefined)`.
- **The S/R extension** exposes a command — e.g. `paratextBibleSendReceive.runScheduledSessionSync(boundary: 'startup' | 'shutdown')` —
  that reads the OnStartupShutdown subset from its own store (direct import, PT-4160's in-process
  path), runs the sync, stamps, and (startup + Q4=yes) raises/clears the block through the
  extension-owned emitter (F2). This **reuses PT-4163's fire path** (`auto-sync-engine.ts`'s
  block→sync→stamp→results→busy-handling) rather than re-implementing it in core, and keeps the two
  session syncs consistent with the interval ones.

Net: the interval fire path and the session fire path become one function with two triggers (the
5-minute timer, and the two lifecycle events). **This deviates from the ticket's "code lands in
core" framing — flagged in "Other decisions" below — but it is the placement the emitter/quit-hold
facts force.** A pure-core alternative (core calls `syncProjects` itself + a minimal
`setAutoSyncBlocking(isBlocking)` command on the extension) is possible but duplicates the fire path
and disconnects session syncs from the extension's sync-state, results, and PT-4164 conflict routing.

### D2 — Trigger sources: the existing lifecycle hooks, unchanged invocation points

Startup: `performStartupTasks` (`startup-tasks.ts:18-56`), invoked fire-and-forget at `main.ts:236`.
Shutdown: `performShutdownTasks` (`shutdown-tasks.ts:25-97`), invoked from the window `close` handler
at `main.ts:557-573`. Both already gate on `platform.interfaceMode` and default to Simple behavior
when the setting can't be read (`startup-tasks.ts:29-40`, `shutdown-tasks.ts:34-42`). PT-4162 keeps
those invocation points and that default; it only adds a Power branch. Simple mode is untouched
(explicit DoD requirement).

### D3 — Which projects: the OnStartupShutdown subset, selected by _schedule_ (not by open editors)

PT9 selects by schedule: `Initialize()`/`Shutdown()` filter `ProjectSettingsById` for
`== OnStartupShutdown` (`AutoSendReceiveManager.cs:74-76`, `:109-111`) and sync **all** of them at
once, regardless of whether they are open. PT-4162 does the same, reading the subset from PT-4160.

- The ticket's phrase "extend shutdown to **all writable editors**" conflates Simple's open-editor
  mechanism (`shutdown-tasks.ts:62-67` `find()`s the one open writable Scripture Editor) with the
  schedule-based selection the DoD actually asks for ("sync exactly the projects scheduled On
  startup/shutdown … reading the schedule from PT-4160"). **Resolved in favour of schedule-based
  selection** (PT9 parity + DoD); a scheduled project syncs at the session boundary whether or not
  its editor is open. The single-`find()` logic is replaced wholesale, not extended.
- **Interval-scheduled projects do NOT sync at startup.** PT9's `Initialize()` syncs only
  OnStartupShutdown projects; hourly/daily projects wait for the timer (first check +10 s, then every
  5 min — `auto-sync-engine.ts` `FIRST_CHECK_MS`/`CHECK_INTERVAL_MS`). A daily project overdue at
  startup fires on the engine's first tick, not via this ticket. This keeps PT-4162 and PT-4163
  disjoint by preset.

### D4 — Store integration: read the schedule via PT-4160's command / in-process store

Per-user schedule data is not readable from the main process directly (PT-4160 design D5; ticket).
Two reads, depending on where orchestration sits (D1):

- The **extension** command reads the store by direct module import — PT-4160's in-process consumer
  path (`getSchedules()` on `initAutoSyncScheduleStore`).
- Were any read to happen in **core main**, it would use the `paratextBibleSendReceive.getAutoSyncSchedules`
  command by serialized request type — the proven idiom already used at `shutdown-tasks.ts:47-49`
  (`cancelSync`). With D1's split, core needs no schedule read at all; it just triggers the command.

### D5 — Shutdown behaviour: hold the quit, no overlay, bounded wait

Shutdown does **not** raise the edit-block — the app is closing, there is nothing to protect an edit
from (ticket: "Shutdown needs no block"). What it must do is the existing quit-hold: core
`preventDefault`s the window close, `await`s the extension sync command, then `destroy()`s the window
(F1; `main.ts:557-573`). Reuse the existing bounded-wait pattern — `shutdown-tasks.ts` already wraps
its sync in an `AsyncVariable` with `SHUTDOWN_SYNC_TIME_OUT_MS = 10 * 60 * 1000`
(`shutdown-tasks.ts:14,78-96`) so a hung sync can't wedge the app closed forever. PT9 likewise syncs
on shutdown only on a _normal_ user close (`Shutdown(e.CloseReason == CloseReason.UserClosing)`,
`MainForm.cs:2006`; guarded by `AutoSendReceiveManager.cs:107`) — PT10's equivalent is that the sync
runs in the window `close` handler, i.e. only when the user actually closes the app.

### D6 — Blocking _mechanism_ (for the startup case): reuse PT-4159's event via the extension emitter

> **Revised 2026-07-15:** now that Q4 is answered "yes, but editing-only" (see "Decision update"
> above), D6 becomes: **raise the editing-block (not a UI-block) during the startup sync; the
> `onAutoSyncBlockingChanged` emitter contract is unchanged.** Everything below about _how_ the
> raise is wired (event name, emitter ownership, grace/auto-clear) still holds — what changes is
> only what PT-4159's store causes on the renderer side once its overlay is replaced. Original text
> kept below for the record.

_Whether_ startup blocks is Q4. _How_ it would block is decided and not Q4-gated: through PT-4159's
`onAutoSyncBlockingChanged` event, raised by the extension (F2), which drives the same full-workspace
overlay the interval engine uses — including PT-4159's **200 ms show-grace** (a sub-200 ms startup
sync shows nothing) and **10-minute safety auto-clear** (belt-and-braces if the trigger dies without
clearing) (PT-4159 design D2). No new block surface, no second emitter, no core-owned event. If Q4
says "yes", D1's `runScheduledSessionSync('startup')` brackets its sync with the emitter exactly as
`auto-sync-engine.ts`'s `tick` brackets its due set (`setBlocking(true)` → `runSync` →
`finally setBlocking(false)`). If Q4 says "no", the command simply omits the bracket.

### D7 — Stamping `lastRunAt`: PT9 parity, but cosmetic for this preset

PT9 stamps `LastSendReceiveById` for the **successfully-synced** projects via
`PerformSendReceive → UpdateSendReceiveTime` (`SendReceiveProjectsForm.cs:2147,2152` — `projectsShared`
is the `Succeeded`-only set). For an OnStartupShutdown project this timestamp is **never consulted for
due-ness** (the interval loop skips the preset — `AutoSendReceiveManager.cs:338-339,476`), so stamping
only feeds a future "last successful sync" indicator (NTH-3, cut-first). Decision: **reuse the
engine's stamp** (`stampAutoSyncAttempt` / the store's `setLastRunAt`, PT-4163 design D3) so the store
stays coherent, and don't sweat the success-vs-attempt nuance — it's invisible to scheduling for this
preset. (The engine stamps on _attempt_; PT9's startup path stamps on _success_ only. Matching the
engine is fine and simpler because it's cosmetic here.)

### D8 — Offline: attempt-and-classify, no pre-check (inherited from PT-4163 D6)

The platform has no connectivity pre-check; the canonical offline signal is a thrown
`VpnDisconnectedException` classified C#-side. The session sync fires blind and no-ops fast when
offline, warn-logged — the ticket's "internet-off skips" is satisfied by the sync itself failing
cheaply, not by an invented pre-check (PT-4163 design D6). One PT9 nuance to note (not resolve here):
PT9 additionally skips _all_ auto-sync when the user has set internet to Disabled
(`AutoSendReceiveManager.cs:66`), which maps directly onto the PRD's "sensitive locations / full
control of internet use" persona — PT10 has no such setting today. That gap spans the whole epic
(PT-4163 too), not this ticket; flagged below.

## Q4 — Should the startup sync block editing? (**ANSWERED 2026-07-15**)

**Decision (2026-07-15, UX meeting):** yes, editing is blocked during the startup sync — but the
**UI is not**. No consent toast, no UI-wide blocking, for either startup or shutdown. This is a
narrower "yes" than Option 1 below argued for: Option 1's case for blocking _editing_ holds, but
its cost/benefit was weighed assuming a full UI block, which is no longer what gets raised (see
"Decision update 2026-07-15" at the top of this doc and D6 above). Startup conflicts/errors open
the results view directly (deliberate PT9 divergence — the user is present); shutdown conflicts
stay unsurfaced (PT9 parity, D5). Full spec and evidence: `2026-07-15-ux-decisions-pt-4158.md`.

The options/recommendation below are kept **as originally written, for the record** — they argued
the "block or don't" question before the UI-vs-editing distinction existed, and that framing is
now superseded by the decision above.

### Verbatim

From the epic **PT-4158** description (the canonical Q1–Q6 list):

> **Q4:** Should the startup sync block editing too? (A PT10 startup sync is async with the window up
> — a race PT9 does not have.) See PT-4162.

The **PT-4162** ticket itself states the fullest articulation, and _recommends yes_:

> ### ⚠️ The startup race — NEW in PT10, not ported
>
> A PT10 startup sync runs **asynchronously with the window already up**, so Donna can open an editor
> and start typing **while it is still running** — and a merge can land under her. That is precisely
> the hazard NN-3's block exists to prevent, and the PRD does not mention it.
> … **PT9 does not have this bug.** … WinForms fires `Load` before `Shown` and `Load` is synchronous,
> so PT9's startup sync completes behind its modal dialog **before the main window is ever
> interactive** … We would be _introducing_ this race.
> **Apply the same block (PT-4159) around the startup sync.** Shutdown needs no block — the app is
> closing. Worth a conversation with PO/UX …

The **session handoff** summarises it as: "Q4: should the startup sync block editing (ticket says yes
— apply PT-4159's block)." (Note: the ticket's cross-reference to "brief §6 Q4" is stale — the old
brief's §6 Q4 is a different question, "reminder mode or fully unattended?"; the authoritative Q4 is
the epic's.)

### Why this is a real decision, not a formality

Shutdown is settled (D5: no block). The live question is startup only, and it is a genuine
data-safety-vs-intrusiveness trade because a startup sync **writes the very project files Donna is
about to edit**, while the window is already interactive (F3).

### Options

**Option 1 — Block the startup sync (raise PT-4159's overlay), matching PT9's effective guarantee.**

- _PT9 evidence:_ PT9 gives "no editing during startup sync" structurally — the sync finishes before
  the window is interactive (F3). To reproduce that guarantee on PT10's async startup, the block must
  be added explicitly; it is the direct analogue of what WinForms gave PT9 for free.
- _Pros:_ closes the NN-3 concurrency hazard (a merge landing under a live keystroke — the one
  scenario NN-3 exists for); consistent with interval syncs, which already block per NN-3; only
  affects OnStartupShutdown projects the user explicitly opted into; the 200 ms grace hides fast
  syncs so short syncs are invisible (D6).
- _Cons:_ a large-repo startup sync could freeze the whole workspace for minutes right when Donna
  wants to start working — arguably felt as worse than PT9, which did it during "loading" before the
  window appeared rather than slamming an overlay over a live window. **Cancel is currently broken**
  (PT-4076, verified 2026-07-14), so there is no escape from a long block. That cost, however, is
  identical to the interval syncs the epic already accepts as blocking, and is governed by the same
  Q1/PT-4193 (consent Sonner / working Cancel) mitigations — not unique to startup.

**Option 2 — Don't block; run the startup sync silently in the background (fire-and-forget).**

- _PT9 evidence:_ none — PT9 never lets the user edit during a startup sync (F3). This is strictly
  _less_ protection than PT9.
- _Pros:_ never interrupts Donna at the moment she opens the app; least intrusive; the sync just
  happens.
- _Cons:_ reinstates exactly the race the ticket flags — Donna opens one of her startup-scheduled
  projects, types, and a merge lands under the cursor (lost keystroke / edit-into-conflict / possible
  corruption). Directly contradicts NN-3 ("blocking Donna from editing … while it runs") for the
  startup path, and contradicts the epic's stated approach of "follow PT9's model."

**Option 3 — Hybrid: block, but bound it (short cap, or block only until the first editor loads,
then background the remainder).**

- _Pros:_ caps the worst-case freeze while still catching the immediate race.
- _Cons:_ no PT9 antecedent; adds real complexity (partial-sync semantics, when to hand off) for a
  1-week appetite; a half-finished merge backgrounded into a live editor is arguably worse than
  either clean option. Over-engineered for v1.

### Recommendation

**Option 1 — block the startup sync.** The startup sync mutates the files Donna is about to edit, and
NN-3 is a numbered non-negotiable that says auto-sync blocks editing; leaving startup unblocked would
ship it with _less_ safety than PT9 and reopen the precise hazard the epic set out to prevent. The
intrusiveness cost is real but (a) is bounded by the 200 ms grace for the common fast sync, (b) only
touches projects the user opted into as "on startup/shutdown", and (c) is the _same_ cost already
accepted for interval syncs — so it should be governed by the epic-wide Q1/PT-4193 decision (consent
and/or a working Cancel), not solved differently here. If Q1 lands on "cut both protections", the
startup block inherits the same "no escape" risk as every other auto-sync — which is an argument to
fix Cancel (PT-4076) / keep PT-4193, not an argument to leave startup racing.

One caveat to log with the decision: even blocking, there is a sliver of a race between "window
interactive" and "overlay actually raised" (emit → subscribe latency). Mitigate by raising the block
as the first action of the startup path, before kicking off the sync; PT-4159's overlay takes focus
on show to catch a mid-keystroke (PT-4159 design D3). Testing must probe this window (below).

## Other decisions that need a human call (not silently resolved)

1. **Repo/module placement (D1) deviates from the ticket's "code lands in core".** The
   emitter-ownership (F2) and quit-hold (F1) facts push most new logic into the S/R extension, with
   core reduced to two thin triggers. This is the right engineering call, but it re-scopes the ticket
   across two repos and should be acknowledged before implementation. _Recommendation: accept the
   split; it maximises reuse of PT-4163's fire path._
2. **PT9's "internet disabled" skip has no PT10 equivalent (D8).** PT9 suppresses all auto-sync when
   the user has turned internet off — the PRD's sensitive-locations persona relies on exactly that.
   PT10's attempt-and-classify will make a (brief) connection attempt regardless. Epic-wide, already
   implicitly accepted by PT-4163 D6; raising it so it's a conscious choice, not an omission.
3. **Shutdown conflicts go unsurfaced until next session.** With the app closing, a conflict from the
   shutdown sync cannot be shown (no UI after quit). It will be detected on next startup. Reasonable,
   but a behavioural change from PT9 (which would block the close on its S/R form) — confirm this is
   acceptable. Distinct from Q2 (which is about interval-sync conflict blocking).

## Testing sketch

Behavioural (per the ticket's Testing Ideas), Power mode unless noted:

- A project scheduled On startup/shutdown syncs at app start and at a normal user quit; a
  _non_-scheduled project does not sync at either boundary.
- Multiple OnStartupShutdown projects all sync at each boundary (schedule-based selection, D3) — even
  ones whose editors are not open.
- Interval-only projects (hourly/daily) do **not** sync at startup (they belong to PT-4163).
- Internet off: the session sync fails cheaply and is warn-logged; startup/shutdown still complete.
- Simple mode startup ("sync all") and shutdown (single open editor) behaviour is unchanged.
- Shutdown holds the window closed until the sync finishes or `SHUTDOWN_SYNC_TIME_OUT_MS` elapses,
  then quits; a non-user close (e.g. OS shutdown path) does not trigger a shutdown sync.

Q4-conditional (only if Option 1 is chosen):

- Opening an editor while a startup sync is in flight **cannot** produce an edit that races the merge;
  the overlay is up and focused for the sync's duration and clears when it completes.
- A sub-200 ms startup sync shows no overlay (grace); a multi-second one does.
- Probe the emit→raise latency window: script an editor keystroke immediately after window-interactive
  and assert it is blocked (this is the residual-race caveat in the recommendation).

Unit-level: the shared fire path already has PT-4163's vitest coverage; add cases for the session
trigger selecting the OnStartupShutdown subset, and for the shutdown path awaiting completion within
the timeout.

## Out of scope

The interval engine (PT-4163); the edit-block surface itself (PT-4159, shipped); the schedule store
(PT-4160, shipped); conflict/outcome notification (PT-4164, Q2-gated); the consent Sonner (PT-4193);
config-UI run controls (PT-4194); fixing Cancel (PT-4076); a PT10 "internet disabled" setting; PT9
schedule-data migration (the PT10 store starts empty). The concrete block-wiring code is deferred
until Q4 is answered — this doc stops at framing that decision.
