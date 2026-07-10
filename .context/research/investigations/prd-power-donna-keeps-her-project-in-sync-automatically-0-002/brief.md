# Donna keeps her project in sync automatically: investigation

> PRD: `PRD-Power-Donna keeps her project in sync automatically_0-002.md` (v0-002, owner
> Vladimir). Validation run of the revised `/investigate-prd`, 2026-07-10. Product questions were
> carried with the interpreter's suggested assumptions (marked); engineering questions were
> answered by investigation.

## 1. What the PRD asks for
*(for: everyone)*

PT10 Simple automates S/R; Power users need controlled automatic sync — a few configurable
intervals, global plus per-project, silent unless something needs attention, never interrupting
active editing. Off by default in Power mode. Appetite: 1 week (1 developer); the PRD's own cut
line: "ship a single sensible default interval rather than the full configuration set."

| ID   | Non-negotiable                                                                     |
| ---- | ----------------------------------------------------------------------------------- |
| NN-1 | Background automatic S/R that runs without blocking editing or other work            |
| NN-2 | Per-project settings that override the global auto-sync setting                      |
| NN-3 | A small set of configurable intervals (e.g. startup/shutdown, hourly, 4-hourly, daily, weekly, never) |
| NN-4 | Silent operation: only errors or conflicts surface a notification                    |
| NN-5 | Never interrupt an active editing session — surface results non-intrusively          |

| ID    | Nice-to-have                                    |
| ----- | ------------------------------------------------ |
| NTH-1 | Easy global on/off toggle for auto-sync          |
| NTH-2 | Indicator of last successful automatic sync time |

No-gos: Paratext Live (separate epic) · conflict-resolution UI (separate PRD; auto-sync only
detects and notifies) · per-second or push-based sync.

## 2. What already exists
*(for: engineers — §3 carries the product-owner view of the same facts)*

- **Paratext 9:** `SendReceiveScheduleManager` (`Paratext/Repository/AutoSendReceiveManager.cs:41`,
  UI layer) — a 5-minute poll timer over **per-project** schedules
  (Never / OnStartupShutdown / Hourly / Every4Hours / Daily / Custom — **no weekly**). Timed
  schedules are **reminder-driven**: a toast appears and sync runs only when clicked; dismiss =
  snooze ~5 min. Only OnStartupShutdown syncs unprompted (synchronously, with progress UI — it
  delays app exit; skipped on non-user shutdown). A second subsystem polls for **remote** updates
  without syncing (menu pill + green-dot badges). Schedule persists per-user
  (`SendReceiveScheduleMemento`); manual S/R resets a project's clock. No behavior tests exist;
  two latent PT9 bugs (update-check `.Milliseconds` cadence bug; last-S/R times leak across
  machines in settings transfer) are documented in the archaeology — don't port them.
- **Paratext 10:** Simple-only auto-sync exists at **startup** (`src/main/startup-tasks.ts:26-56`,
  syncs all shared projects) and **shutdown** (`src/main/shutdown-tasks.ts:35-99`, holds quit up
  to 10 min for the open editor's project) — both return early in Power mode, and the shutdown
  file's own comment anticipates this PRD ("revisit if S/R on shutdown is ever extended to
  Power"). The S/R extension exposes everything a scheduler needs
  (`syncProjects` / `syncOpenProjects` / `runManualSync(suppressNotification)` / `cancelSync`,
  sync state + events); the studio C# transport has an exclusive semaphore and classified
  failure toasts, but one flag currently gates progress **and** failure toasts together. The
  notification service supports update-in-place + click-through. Periodic-timer precedent exists
  in `platform-get-resources` (12-hour mutex-guarded `setInterval`, `main.ts:25,329-345`) and
  marketplace polling — the earlier "no periodic timer anywhere" sweep claim was wrong
  (completeness-check catch). Internet-access gating (PT9: skip when internet disabled; PT10:
  registration extension's Internet Settings, with an in-flight immediate-apply design) must be
  respected. Settings contributions work today, but the core settings renderer has **no
  enum/dropdown widget** for an interval picker.
- **Reusable as-is:** transport + commands, sync state/events, notification service,
  startup/shutdown hold pattern, timer pattern, settings mechanism. **Needs building:**
  the scheduler itself, interval settings (global + per-project), the silent/failure toast
  split, the editing-session deferral policy, last-sync persistence.

## 3. New in Paratext 10 — confirm these are intentional
*(for: product owner)*

| PRD item | What Paratext 9 actually does | Intentional? |
| --- | --- | --- |
| "Weekly" interval option | PT9 has no weekly option (Never / startup-shutdown / hourly / 4-hourly / daily / custom) | New option, or copied in error? |
| Unattended background sync on timed schedules | PT9 never syncs a timed schedule unattended — it shows a reminder toast and syncs only when clicked | The PRD's core premise; presumably intentional — confirm, because it exceeds "PT9 already does this" |
| Fully silent clean syncs (no progress UI) | Every PT9 scheduled sync shows progress UI and alerts | Presumably intentional (NN-4) — confirm |
| Hold results until an editing session ends | No PT9 antecedent at all | New capability — confirm scope |
| Global auto-sync interval with per-project override | PT9 has no global sync interval — its model is per-project only (the grid); the global combo governs update **checks**, not syncs | Confirm the global+override model is the intent, not a misreading of PT9 |

The mirror — in PT9 but absent from the PRD (dropped deliberately?):
- The **update-check notification** subsystem: PT9 can tell Donna "teammates changed this
  project" (menu pill, green-dot badges) **without syncing**. The PRD's silent model has no
  equivalent; is passive "updates available" indication wanted?
- PT9's **"Custom…" per-project update-check** granularity.
- PRD correction, no decision needed: auto-S/R settings live inside PT9's Send/Receive dialog,
  not "Tools > Options" — the PRD's location reference (and our own reference doc, now fixed)
  was wrong.

## 4. Proposed work items
*(for: epic lead + engineers)*

| #    | Work item                                                        | Repo                               | Complexity | Depends on | Covers               |
| ---- | ----------------------------------------------------------------- | ---------------------------------- | ---------- | ---------- | -------------------- |
| WI-1 | Auto-sync settings: global interval + per-project override        | paratext-bible-internal-extensions | Moderate   | —          | NN-2, NN-3, NTH-1    |
| WI-2 | Interval-picker widget (enum dropdown in core settings renderer)  | paranext-core                      | Moderate   | —          | NN-3 (UI half)       |
| WI-3 | Background scheduler in the S/R extension                         | paratext-bible-internal-extensions | Complex    | WI-1       | NN-1, NN-3           |
| WI-4 | Power-mode startup/shutdown sync branches                         | paranext-core                      | Simple     | WI-1       | NN-3 (startup/shutdown) |
| WI-5 | Silent-operation split: suppress progress, keep error/conflict    | paratext-10-studio overlay + int-ext | Moderate | —          | NN-4                 |
| WI-6 | Editing-session deferral policy (spike first)                     | paranext-core + int-ext            | Moderate   | WI-3, WI-5 | NN-5, NN-1           |
| WI-7 | Last-successful-sync indicator (persist + surface)                | paratext-bible-internal-extensions | Simple     | WI-3       | NTH-2                |

**WI-1 — Auto-sync settings.** Settings contribution in `paratext-bible-send-receive`: global
interval + keyed per-project override map, with validators (precedent: `selectedProjectIds`).
Storage scope decision required first (§6 Q2): per-user setting, not team-shared project storage.
Leaves the picker UI to WI-2, consumption to WI-3/WI-4.

**WI-2 — Interval picker.** Add enum/dropdown support to the core settings renderer
(`setting.component.tsx` + `settings.model.ts` schema) — a platform gap every future enum setting
hits; the alternative (extension-local UI) is the fallback if design prefers it (§7).

**WI-3 — Scheduler.** Periodic due-ness check in the S/R extension's `activate()` (pattern:
`platform-get-resources`' mutex-guarded interval): per-project last-sync bookkeeping (persisted —
PT9 parity), invoke `syncProjects`/`syncOpenProjects` with `suppressNotification`, skip when
internet disabled / S/R unavailable / sync already running (transport semaphore exists), manual
sync resets the clock (PT9 parity). Produces the tick WI-4/WI-6/WI-7 consume.

**WI-4 — Startup/shutdown branches.** Extend the existing Simple-mode gates in
`startup-tasks.ts`/`shutdown-tasks.ts` with Power-mode branches consulting WI-1's settings; the
shutdown-hold mechanism (≤10 min) already exists. Required in core: extensions get no pre-quit
hook.

**WI-5 — Silent split.** In the studio overlay's sync-notification wrapper, split the single
flag so background runs suppress the progress toast but keep failure/role-change toasts; route
conflict notifications through the in-flight conflict hand-off (sibling-PRD work) with a
click-through to the unresolved-conflicts view. No transport logic changes.

**WI-6 — Deferral policy.** Spike first (the PRD's own pre-build design check): define "active
editing session" from available signals (writable editor open/focused; no idle API exists today)
and implement hold-then-surface for background results. Serves NN-5's testability.

**WI-7 — Last-sync indicator.** Persist per-project last-successful-sync (WI-3's bookkeeping)
and surface it (sync-status view / toolbar tooltip; the dialog already shows relative last-S/R).

## 5. Requirement coverage
*(for: everyone)*

| Requirement                  | Work item(s)        | Notes                                                          |
| ---------------------------- | ------------------- | --------------------------------------------------------------- |
| NN-1 background, non-blocking | WI-3, WI-5, WI-6   | Transport semaphore + suppressNotification already exist         |
| NN-2 per-project override     | WI-1               | Storage-scope decision gates it (§6 Q2)                          |
| NN-3 interval set             | WI-1, WI-2, WI-3, WI-4 | Exact list needs §6 Q1 (weekly is not a PT9 carry-over)      |
| NN-4 silent unless attention  | WI-5               | Conflict half rides the sibling-PRD hand-off                     |
| NN-5 never interrupt editing  | WI-6               | Not testable until the spike defines the policy                  |
| NTH-1 global on/off           | WI-1               | "Never" as the global value doubles as off                       |
| NTH-2 last-sync indicator     | WI-7               | Mostly surfacing; persistence is the new bit                     |

Appetite note: seven items exceed a 1-week appetite. The PRD's own fallback ("single sensible
default interval") maps to WI-3 + WI-5 with a hardcoded interval, deferring WI-1/WI-2/WI-4
configuration — a §6 decision.

## 6. Questions for the product owner
*(for: product owner)*

1. **Which intervals, exactly?** The PRD's list and its own rabbit hole disagree, and "weekly"
   exists nowhere in Paratext 9. Suggested: startup/shutdown, hourly, 4-hourly, daily, never —
   drop weekly unless wanted as a genuinely new option. *(Assumed for this brief.)*
2. **Is a per-project auto-sync setting personal or shared with the team?** The problem statement
   mentions admins wanting a predictable team cadence, but team-shared settings sync to everyone.
   Suggested: personal (per-user) for v1, like Paratext 9. *(Assumed.)*
3. **Do received changes ever notify?** The PRD says only errors/conflicts notify, but also names
   a "received-changes notification surface". Paratext 9 offers a passive "updates available"
   badge instead. Suggested: silent clean syncs; consider the passive indicator as a follow-up.
   *(Assumed.)*
4. **Reminder mode or fully unattended?** Paratext 9 never syncs a timed schedule without a
   click; the PRD's silent unattended model is new. Suggested: unattended is the point of this
   PRD — but confirm §3's first table row. *(Assumed unattended.)*
5. **Appetite vs scope**: accept the fallback cut (default interval only, no configuration UI in
   week one) if the full set doesn't fit? *(The work items are sliced so WI-3+WI-5 alone deliver
   the fallback.)*

## 7. Engineering decisions
*(for: epic lead / implementation owner)*

1. **Interval-picker approach**: extend the core settings renderer with enum support (WI-2,
   recommended — closes a platform gap) vs. an extension-local settings UI. Recommendation:
   core renderer.
2. **Scheduler tick design**: single 5-minute due-ness poll over per-project stamps (PT9's model,
   recommended) vs. per-project timers. Recommendation: single poll — simpler, matches the
   platform's existing interval pattern.
3. **"Active editing session" signal** for WI-6: writable-editor-open+focus proxy now vs. adding
   a real idle/activity platform capability. Recommendation: proxy for v1; document the ceiling.
