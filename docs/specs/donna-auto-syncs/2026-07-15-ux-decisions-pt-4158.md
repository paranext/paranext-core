# PT-4158 — UX decisions, 2026-07-15

**Date:** 2026-07-15 · **Epic:** [PT-4158](https://paratextstudio.atlassian.net/browse/PT-4158)
**Decided by:** the UX lead and a senior engineer (UX meeting)
**Supersedes:** Q1/Q2 in `2026-07-14-q1-q2-decision-memo.md`; Q4 in
`2026-07-14-pt-4162-startup-shutdown-design.md`; the full-workspace-overlay scope of
`2026-07-14-pt-4159-edit-block-design.md`
**Status:** decided — feeds new/updated designs for PT-4193 (promoted), PT-4159 (rescoped),
PT-4164 Part B, PT-4162

## What this is

Today's UX pass answered Q1, Q2, and Q4 from the epic's open-question list, and corrected a
premise that had been silently wrong across all three: "no blocking" was read as "nothing blocks,"
but the actual decision is narrower — **editing** stays blocked during an automatic sync, the
**UI** does not. That correction changes PT-4159's shape (rework, not retirement) more than it
changes Q1/Q2/Q4 themselves.

## Q1 — consent toast (PT-4193): **Option B, promoted into v1**

Reverses the memo's recommendation (C, resolving to "stay cut"). PT-4193 ships in v1.

**Consent toast spec:**

- Non-blocking.
- **Position: top-center** — deliberately distinct from every other toast in the app (which are
  bottom-right), so a due-sync consent prompt reads as its own category, not just another
  notification in the pile.
- **No timeout.** Persists until a button is clicked (no auto-dismiss).
- **Primary button — "Send/Receive now":** starts the sync immediately.
- **Secondary button — "Postpone":** restarts the interval (`lastRunAt := now`), i.e. behaves like
  a no-op sync for scheduling purposes — the project goes due again one full interval later.
- **Merging:** multiple projects going due at once merge into **one** toast, update-in-place via
  `notificationId` (not N separate toasts).
- **Label logic:** show "Postpone until `<time>`" (computed as now + interval) only when that time
  is identical across all merged projects (i.e. they share a preset/interval); otherwise show plain
  "Postpone" — a mixed-interval merge has no single honest timestamp to show.
- **During the sync:** only the standard bottom-right S/R progress toast — no second consent-style
  surface. Confirmed the backend already raises that toast for `syncProjects` (no new plumbing
  needed here).
- **Outcomes:**
  - Clean sync → silent (unchanged from the engine's existing silent-success gate, PT-4164 Part A).
  - Conflicts, per-project failures (`failed`, `notUpgraded`, `projectVersionUpgraded`), or
    secondary-operation errors → **open the S/R results view directly** (not the Comments/conflict-
    list UI), seeded with that sync's `ResultsData`.
  - v1 accepts **stacking**: successive noteworthy syncs each open their own results dialog: no
    de-duplication/merging of result dialogs in v1.

**Feasibility (verified in `paranext-core` main, 2026-07-15):**

- **sonner 1.7.4** is the version in the tree (confirmed via the pnpm lockfile resolution).
  Supports a per-toast `position` override on individual `toast()` calls; there is a **single
  `Toaster`** instance and **no `toasterId` concept in 1.7.4** — adding a second `Toaster` would
  double-render, so per-call `position` is the only correct mechanism (not a second toast root).
- sonner's `cancel` slot gives a **native second button** alongside `action` — both auto-dismiss on
  click, matching the primary/secondary spec above with no custom close-handling.
- `duration: 0 → Infinity` is **already implemented**
  (`src/renderer/services/notification.service-host.ts:36-37`).
- Update-by-`notificationId` and `papi.notifications.dismiss` are **already implemented**
  (`notification.service-host.ts`'s `toastId` map + `INotificationService.dismiss`,
  `src/shared/models/notification.service-model.ts:68`).
- **Required public-core change** (additive, ~30-40 LoC, all in `paranext-core` — no private
  patch): add `secondaryClickCommandLabel` / `secondaryClickCommand` / `position` to
  `PlatformNotification` (`src/shared/models/notification.service-model.ts`) + build the matching
  `cancel` object and pass `position` through in `notification.service-host.ts`'s existing
  `action`-construction block (confirmed at **lines 43-49** — the
  `clickCommandLabel && clickCommand ? { label, onClick } : undefined` block that becomes the
  sonner `toastOptions`) + the OpenRPC schema entry for the new fields + regenerate `papi.d.ts` via
  `npm run build:types`.

## Blocking clarification (supersedes any "no blocking anywhere" reading)

**EDITING must stay blocked during automatic syncs. The UI must NOT be blocked.** This was the
implicit premise error behind treating Q2 as open (see below) and behind PT-4159 shipping a
full-workspace overlay.

- **PT-4159 is reworked, not retired.** Keep the `onAutoSyncBlockingChanged` event contract and the
  ref-counted store (PT-4159 design D1/D2) unchanged — those are the right shape. Replace the
  full-workspace focus-trapping overlay (`WorkspaceUpdatingOverlayPresentational`-based, PT-4159
  design D3, shipped core PR #2555) with an **editing-only** block. Mechanism is **TBD** — candidates
  named in the meeting, not yet chosen: editor read-only mode, an editor-scoped block (vs.
  workspace-scoped), or backend write rejection. This needs its own design pass; not resolved here.
- **PR #179's `setBlocking` wiring stays** — the interval engine (PT-4163) still brackets its fire
  path with `setBlocking(true)` / `setBlocking(false)` exactly as designed; only what the store's
  `true` _does_ to the UI changes.

## Q2 — moot as posed; surviving fragment decided as **PT-4164 Part B**

Q2 asked "does Donna stay blocked behind a conflict?" That question is moot once the blocking
clarification above lands: nothing blocks the _UI_, so there is no overlay to stay trapped behind.
What survives from Q2 is the piece the memo's "unblock and notify" recommendation was actually
gesturing at — **when does a noteworthy sync open the results view** — and that's now decided as
**PT-4164 Part B**: the conditional results-view open described under Q1's "Outcomes" above.

- **Mechanism verified:** the extension already opens the S/R dialog directly into its results view
  via `papi.webViews.openWebView(SEND_RECEIVE_WEB_VIEW_TYPE, { float }, { resultsData })` state.
  Precedent: the per-project S/R button flow in
  `src/paratext-bible-send-receive/src/main.ts` (~lines 140-306, the
  `sendReceiveProjectsByWebViewId` command through its OpenRPC registration around :323-398) already
  calls `syncProjects`, then opens the results web view seeded with the returned `resultsData` — the
  exact shape Part B needs for a scheduled sync.
- The engine (`auto-sync-engine.ts`, PT-4163) gains a new `openResults` dependency, called when the
  sync is noteworthy.
- **"Noteworthy" definition — explicitly includes per-project failure statuses.** Top-level
  `ResultsData.errors` only covers _secondary-operation_ errors; a per-project `failed`,
  `notUpgraded`, or `projectVersionUpgraded` status would NOT trip a check that only looks at
  `errors`. The noteworthy check must inspect both.

## Q4 — PT-4162 (startup/shutdown session syncs)

- **No consent toast, no UI blocking** for either startup or shutdown syncs — just start the sync
  and show the standard bottom-right progress toast.
- **Cancel cancels the whole batch**, not per-project — confirmed startup/shutdown syncs run as a
  single `ShareChanges` batch call (verified in the patch), so there's no finer-grained cancel
  available even if wanted.
- **Editing is blocked during the startup sync**, via the PT-4159 mechanism above (editing-only,
  not UI-wide, once PT-4159's rework lands).
- **Shutdown conflicts/errors are NOT surfaced — the app just closes.** This is deliberate PT9
  parity, verified in the PT9 source:
  `AutoSendReceiveManager.cs:97-118` and `SendReceiveProjectsForm.cs:2059-2077`
  (`suppressChangeListForm`). Note PT9 suppresses the conflict-review form on **all** automatic
  syncs — startup and the interval reminder too, not just shutdown — but PT9 still shows
  hard-failure alerts and a modal progress dialog; the shutdown sync itself only runs on
  `CloseReason.UserClosing`, and only for opt-in (`OnStartupShutdown`-scheduled) projects.
- **Startup conflicts/errors DO open the results view** — a **deliberate divergence from PT9**: the
  user is present and interactive at startup (unlike PT9, whose `Load` completes before the window
  is ever shown — see PT-4162 design F3), so there's someone to show it to.

**Implementation sketch** (not yet built): Power-mode branches at core's existing lifecycle gates
(`startup-tasks.ts:40`, `shutdown-tasks.ts:42`; PR #2434 lineage) call a new extension command
`runScheduledSessionSync('startup' | 'shutdown')`, which filters the schedule store for
`preset === 'onStartupShutdown'` and reuses the interval engine's fire path (PT-4163) via a shared
helper rather than re-implementing block→sync→stamp→results. The interval fire path keeps its
edit-block bracket unconditionally; whether the _session_ sync also brackets with the block is
settled for startup (**yes**) but **moot for shutdown** (nothing left to protect once the app is
closing — PT-4162 design D5). Shutdown reuses the existing bounded-wait scaffold
(`shutdown-tasks.ts:78-96`, the `AsyncVariable` + `SHUTDOWN_SYNC_TIME_OUT_MS` pattern) rather than a
new timeout mechanism.

## Doc updates made alongside this record (2026-07-15)

- `2026-07-14-pt-4162-startup-shutdown-design.md` — Status flipped from "draft — blocked on Q4
  decision" to answered; Q4 section annotated with the decision above; D6 revised to "raise the
  editing-block (not UI-block)."
- `2026-07-14-pt-4159-edit-block-design.md` — new "Scope revision 2026-07-15" section at the top
  flagging the overlay→editing-only-block rework.
- `2026-07-14-q1-q2-decision-memo.md` — one-line "ANSWERED 2026-07-15" pointer added under the
  header; original memo text left intact for the record.

## Open follow-ups (not decided today)

- **PT-4159 rework mechanism** — editor read-only vs. editor-scoped block vs. backend write
  rejection. Needs its own brainstorm/design pass before implementation.
- **PT-4164 Part B implementation** — the `openResults` dep, the noteworthy check (including the
  per-project-status gap noted above), and the results-view seeding wire-up are design-ready but
  not yet built.
- **PT-4193** — the core notification-model change (`secondaryClickCommandLabel` /
  `secondaryClickCommand` / `position`) and the toast itself are design-ready but not yet built.
- **PT-4162** — the `runScheduledSessionSync` command and the shared fire-path helper are
  design-ready but not yet built; branch not yet started (per the design doc's header).
