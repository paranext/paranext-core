# PRD — Sprint 89: Simple Quality Improvements

|                                |                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint Statement (roadmap)** | "Saroj navigates all Simple functionality with as few problems for users as possible (breaks, freezes, bugs, etc.)"                                 |
| **Roadmap description**        | "Engineers identify and fix at least 6 NN (+ 10 NTHs) of the most serious bugs and performance issues for Simple, to make Simple 'nice to use'."    |
| **Epic Lead (PO)**             | Ian Hewerdine                                                                                                                                       |
| **Prepared by**                | Ira Hopkinson (Simple Engineering Lead) — first pass for PO review                                                                                  |
| **Status**                     | Draft for PO review — as of 2026-08-10                                                                                                              |
| **Candidate gathering**        | [Discord: [Sp 89] Simple Quality Improvements](https://discord.com/channels/892072317436448768/1533668454421495909) (dev suggestions, 3–8 Aug 2026) |

## Problem

P10 Simple now covers Saroj's core workflow end to end — but the seams show. Devs and
testers report the editor can blank out entirely, panes silently show the _previous_
project's Scripture, mode switching can destroy the Power layout, startup takes ~42
seconds, and Send/Receive talks to the user in three inconsistent voices. None of these
blocks a demo; together they make Simple feel untrustworthy for daily work. This sprint
is a deliberate quality pass: no new functionality, just making what exists behave.

## Appetite

One sprint (sprint 89). Per the roadmap: at least **6 non-negotiables** fixed, plus up
to **10 nice-to-haves** as time allows. Where a candidate has unbounded discovery risk
(PT-1641, startup performance), the NN is scoped as a time-boxed "materially improve and
report", not a benchmark promise — the lesson Matt Lyons flagged in Sp 87.

## Success criteria

- Saroj can run a full drafting session (open app → navigate → edit → sync → close)
  without hitting a blank editor, stale text, or a dead-end.
- Each NN below is fixed and covered by a regression test where feasible. Tester
  verification on a packaged build is the goal, but we have one tester and verification
  doesn't always land before sprint end — dev verification on a packaged build counts
  for sprint close; tester verification follows as capacity allows.
- No NN fix regresses Power (mode-switching work especially).

## Non-negotiables

### NN-1 · The editor never blanks out

The editor WebView can render completely blank after a restart, with no error shown and
no way forward ([Editor crash thread](https://discord.com/channels/892072317436448768/1530217280221352086),
Sebastian, seen repeatedly but no reliable repro). Root-cause analysis (attached in the
thread) points to a Rules-of-Hooks violation in `create-use-data-hook.util.ts` — the
"too many renders" guard changes the hook count between renders.

Two deliverables, deliberately separate:

1. Fix the identified root cause.
2. Add an error boundary / graceful-failure path so the editor can _never_ silently
   blank again — worst case, Saroj sees "Sorry, the editor crashed" with a restart
   action, and the error details are logged (Sebastian's proposal in the thread). An
   in-app "report this issue" link is planned before release but no reporting mechanism
   exists yet — logging is the sprint-89 scope.

### NN-2 · Panes never show the wrong project's or book's text

Two flavors of the same trust bug:

- **PT-4238** — Text Collection keeps showing the previous project's texts after a
  project switch (only reloads on a BCV change).
- **PT-4139** — Model Text / Bible Texts / Commentaries neither rerender nor show a
  banner when the BCV moves to a book the resource doesn't have; stale content from the
  previous location stays visible and mislabeled.

Includes Roopa's broader re-rendering cluster (rerendering when a book is unavailable or
when switching projects). Saroj must never read text labeled as one project/book that is
actually another.

### NN-3 · Mode switching never corrupts the layout or the project

- **PT-4116 / PT-4297** — switching Simple ↔ Power can overwrite the Power layout with
  the 3-column Simple layout (Simple-only panels appear in Power; layout unrecoverable).
  Levi reports the same leak. Known trigger: switching while Simple is still loading.
- Power's notion of the "current project" bleeds into Simple (confirmed by Tom Bogle in
  the released build, [Sp 87 thread](https://discord.com/channels/892072317436448768/1519582676355514470), 4 Aug 2026).

Likely one underlying area (mode-switch state handling); scope as a family.

### NN-4 · Startup and switching performance (Sp 87 carry-over) — _pending Sp 87 close_

Sp 87 measurements (Tom Bogle, 1 Aug 2026, local release build): startup into Simple
**~42 s**; Power → Simple **~12–14 s** (halved by PR
[#2425](https://github.com/paranext/paranext-core/pull/2425), still unmerged); project
switch within Simple **~16 s**.

Scope for sprint 89 = whatever remains when Sp 87 closes this week (Tom is at 30.5 h of
its 40 h appetite):

1. Land PR #2425 (fast-switch-to-simple).
2. Time-boxed improvement of startup-into-Simple and in-Simple project switching, with
   before/after numbers reported (`PT_STARTUP_MARKS` waterfall). The 5-second startup
   figure remains an aspiration/NTH indicator, as in Sp 87 — not an NN benchmark.

### NN-5 · Project/resource selection works reliably (converge the duplicates)

Sebastian counts ~5 important bugs across the project/resource selection surfaces: not
showing all projects, misleading label, unable to download, broken on dev server, content
cut off ([duplicate-components thread](https://discord.com/channels/892072317436448768/1531583516444201082)).
Related open Jira: PT-4059 (picker rework, PT-3887), PT-4135, PT-4264 (language search
broken), PT-4232 (Get Resources disabled), PT-4299 (open-project dropdown intermittently
empty at startup), PT-4225 (first-run picker UX). The PO has repeatedly signaled this
area as high priority.

Today there are two separate PBR components and three PAPI-callable dialogs (TJ). Scope:

1. Fix the known selection bugs above.
2. Converge the _accidental_ duplicates: unify the two components' internals; reduce the
   three dialogs to at most two (TJ's original ask).
3. **Explicitly keep** the compact-picker vs library-dialog split — "switch what I'm
   reading" (frequent, in-context, effectively single-select) and "manage what's in this
   project" (rare, deep, multi-select with selections visible in parallel) are distinct
   jobs per the UX review recorded in the resource-picker `DESIGN.md` (§2, §3 — PR
   [#2291](https://github.com/paranext/paranext-core/pull/2291)). This is consolidation
   of implementations, not "one control to rule them all."

### NN-6 · The app never dies silently (WebSocket disconnect)

**PT-1641** (🚀 Critical, open since Jan 2025) — WebSockets disconnect silently; the app
stops working with no indication and needs a restart. This is the SS's "freezes" verbatim.
No reliable repro exists, so the NN is scoped as:

1. Instrument + diagnose (logs already show `Tried to send payload while not connected`).
2. Ship a mitigation: automatic reconnect, or at minimum a visible "connection lost —
   restart needed" state so Saroj is never typing into a dead app. Prior art for
   reconnection: Scripture Forge uses the `reconnecting-websocket` npm package
   (sillsdev/web-xforge `ClientApp/package.json`, ^4.4.0, as of 2026-08-10) — evaluate
   it (or an equivalent) rather than hand-rolling reconnect logic.

## Nice-to-haves

1. **One coherent Send/Receive feedback story** — multiple 'Sync' notifications appear;
   Simple's toast 'Cancel' vs Power's banner 'Cancel' behave differently; verify Cancel
   actually cancels resource syncing (Roopa,
   [Auto Sync thread](https://discord.com/channels/892072317436448768/1532098144731664574)).
2. **Localizable sync progress messages** — raw C# S/R strings are concatenated onto
   "Syncing", producing non-grammatical, non-localizable toasts, e.g.
   `Syncing Searching local 'SPAN' for most recent change (65%).` (Tom Bogle).
3. **Auto-sync banner shouldn't jump the editor** — banner pushes the text down and back
   up; overlay it instead. Ian agrees it's real but not urgent.
4. **Bible Texts follows versification** — port the model-text fix (PR #2537) to the
   Bible Texts WebView, or do TJ's recommended structural fix (`projectId` = the project
   actually open in the WebView). Include the "show all books" affordance question from
   the [BCV thread](https://discord.com/channels/892072317436448768/1526591296968593579)
   — needs a UX decision first (see Open questions).
5. **PT-4226** — BCV history dropdown renders behind floating tabs.
6. **PT-4103** — six platform-bible-react components leak raw `%…%` localization keys
   when a string is missing; give them English defaults.
7. **PT-4121** — markers can be deleted while the project structure is locked
   (delete-guard can be bypassed by emptying the block first; mechanism understood).
8. **PT-4317 / PT-3998** — Simple zero-state dead-ends: registered user with no projects
   has no way to get one after setup.
9. **Small visual/behavior verification set** (Levi): checkbox borders too light;
   footnote toggle wrongly affects model text / Bible texts / commentaries; verify
   scroll sync across model text / editor / commentaries / Bible texts.
10. **String-utils performance improvements + integration** (Matt Getgen) — include only
    with a user-visible metric attached (e.g. measured render/typing latency win).

## Out of scope (considered, cut first)

- PAPI modal type merge with project modal type (Matt Getgen) — internal consolidation,
  no direct Saroj impact this sprint.
- Extension/developer docs update & migration (Jolie) — valuable, but its own initiative;
  self-flagged as not a Simple-user improvement.
- Hoisting ai/-branch-only lint rules to all branches (Matt Lyons) — dev-infra.
- PT-4307 recovery-sync edge case — explicitly deferred by Tom (Low priority).
- PT-3033 (app doesn't start after close/reopen, Critical) — needs repro triage first;
  promote into NN-6's diagnosis work if it turns out related.
- New functionality of any kind (per the epic's framing).

## Open questions

1. **BCV book list: filtered vs all books** — Sebastian proposes "show all books" or a
   filtered list + always-visible "show all books" button; Alex framed the three
   navigation questions (books not in translation, missing passages, published-Bible
   verseRef). Needs UX (Ian/Alex) before NTH-4's book-list part is implementable.
2. **Sp 87 final leftover set** — NN-4's exact scope is fixed when Sp 87 closes this
   week; re-check Tom's thread before sprint start.
3. **PT-1641 acceptance** — is "visible failure + reconnect" acceptable as done if the
   root cause remains unidentified within the time box? (Recommended: yes.)
4. **History carry-over between Power and Simple scroll groups** (Roopa, BCV History
   thread) — Alex leaned "works as intended"; confirm or ticket it.

---

## Appendix A — Prioritization rationale (for PO review)

Criteria, in order:

1. **Saroj hits it and the app is broken or lying** — data-trust failures and dead-ends
   outrank annoyances (drives NN-1, NN-2, NN-3, NN-6).
2. **Frequency in daily Simple use** — project switching and navigation are constant;
   floating-tab edge cases are not (why PT-4238/PT-4139 are NN and PT-4226 is NTH).
3. **The SS names performance explicitly** — 42 s startup is the largest single "nice to
   use" gap by the numbers (NN-4).
4. **Tractability inside one sprint** — a known root cause or understood mechanism
   raises rank (editor crash, PT-4121); unbounded discovery gets time-boxed framing
   (PT-1641, startup).
5. **Team/PO signal** — picker area called high priority by the PO; the epic-input
   thread reactions.

Judgment calls the PO should sanity-check:

- **NN-5 (picker) is a fix-plus-consolidation**, ranked above pure polish because its
  bugs are dead-ends (can't download, can't see all projects) and because fixing bugs
  twice in duplicate implementations is how this area got here. The consolidation
  deliberately preserves the picker-vs-dialog two-surface design (distinct use cases:
  quick single switch vs parallel multi-selection management) — see resource-picker
  `DESIGN.md` §2–3 on PR #2291.
- **NN-6 (PT-1641) kept despite repro risk** because it is the only literal "freeze" in
  the pool and has been Critical for 19 months; scoped to diagnosis + visible-failure
  mitigation so it can't consume the sprint.
- **Dev-infra suggestions were ruled fully eligible** (Simple engineering lead decision, 2026-08-10)
  but none outranked user-facing candidates on criteria 1–2; they appear in Out of scope
  with reasons rather than silently dropped.

## Appendix B — Full candidate pool and sources

Gathered 2026-08-10 from: the
[Sp 89 input thread](https://discord.com/channels/892072317436448768/1533668454421495909)
and its five linked sub-threads (Editor crash, How to avoid duplicate components?, BCV in
Simple mode, BCV History Depth, Auto Sync banner in Simple); the
[Sp 87 startup PRD thread](https://discord.com/channels/892072317436448768/1519582676355514470);
a Jira sweep (open Critical-priority issues + issues matching "Simple"/"picker" created in
the last ~4–6 months). Jira note: nearly all candidates sit in Triage/ToDo with priority
"Unassigned", so ranking is judgment-based, not Jira-priority-based.

| Candidate                                                                                                         | Source                                   | Disposition                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------ |
| Editor blank-out/crash + error boundary                                                                           | Ira → Editor crash thread (Sebastian)    | NN-1                                       |
| Text Collection stale after project switch (PT-4238)                                                              | Roopa                                    | NN-2                                       |
| No rerender/banner on missing book (PT-4139)                                                                      | Roopa                                    | NN-2                                       |
| Layout destroyed on mode switch (PT-4116, PT-4297)                                                                | Sebastian, Levi                          | NN-3                                       |
| Power "current project" bleeds into Simple                                                                        | Tom (Sp 87 thread)                       | NN-3                                       |
| Merge PR #2425 fast-switch                                                                                        | Sp 87 leftover                           | NN-4                                       |
| Startup ~42 s / project switch ~16 s                                                                              | Sp 87 leftover                           | NN-4                                       |
| Picker bugs + consolidation (PT-4059, PT-4135, PT-4264, PT-4232, PT-4299, PT-4225)                                | Sebastian, TJ, PO signal                 | NN-5                                       |
| WebSockets silent disconnect (PT-1641)                                                                            | Todd                                     | NN-6                                       |
| S/R notification/Cancel streamlining                                                                              | Roopa                                    | NTH-1                                      |
| Non-localizable "Syncing …" strings                                                                               | Tom                                      | NTH-2                                      |
| Auto-sync banner jump                                                                                             | Roopa → Auto Sync thread (Ira, Ian)      | NTH-3                                      |
| Bible Texts versification + book-list UX                                                                          | Roopa → BCV thread (TJ, Sebastian, Alex) | NTH-4                                      |
| BCV history behind floating tabs (PT-4226)                                                                        | Roopa → History Depth thread             | NTH-5                                      |
| Raw `%…%` key leaks (PT-4103)                                                                                     | Tom (standup)                            | NTH-6                                      |
| Marker deletion while locked (PT-4121)                                                                            | Jolie                                    | NTH-7                                      |
| Zero-state dead-end (PT-4317, PT-3998)                                                                            | Jira sweep                               | NTH-8                                      |
| Checkbox borders / footnote toggle / scroll-sync check                                                            | Levi                                     | NTH-9                                      |
| String-utils performance                                                                                          | Matt Getgen                              | NTH-10 (needs metric)                      |
| PAPI modal type merge                                                                                             | Matt Getgen                              | Out of scope                               |
| Docs update/migration                                                                                             | Jolie                                    | Out of scope                               |
| Lint-rule hoisting                                                                                                | Matt Lyons                               | Out of scope                               |
| PT-4307 recovery-sync edge                                                                                        | Tom                                      | Out of scope (deferred)                    |
| PT-3033 app won't restart (Critical)                                                                              | Jira sweep                               | Out of scope (repro triage; may join NN-6) |
| PT-4218 min-width cuts controls, PT-4022 missing `\id`, PT-4137 char-style editing, PT-4123/PT-4138 lock tooltips | Jira sweep                               | Out of scope (would be next NTHs)          |
