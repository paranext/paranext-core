# PRD — Sprint 89: Simple Quality Improvements

|                                |                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint Statement (roadmap)** | "Saroj navigates all Simple functionality with as few problems for users as possible (breaks, freezes, bugs, etc.)"                                 |
| **Roadmap description**        | "Engineers identify and fix at least 6 NN (+ 10 NTHs) of the most serious bugs and performance issues for Simple, to make Simple 'nice to use'."    |
| **Epic Lead (PO)**             | Ian Hewerdine                                                                                                                                       |
| **Prepared by**                | Ira Hopkinson (Simple Engineering Lead) — first pass for PO review                                                                                  |
| **Status**                     | Draft for PO review, 2nd revision (post refine passes 1 & 2) — as of 2026-08-12                                                                     |
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

Likely one underlying area (mode-switch state handling); scope as a family. The open PR
#2425 already contains fixes for both the switch race and the current-project bleed —
how completely is unverified — so the shape of this NN is: land #2425 first (via NN-4,
avoiding collision), **verify** its coverage against each symptom above (PT-4116/PT-4297,
the current-project bleed, the mid-load trigger), write the regression test, then fix
whatever residuals the verification finds. Definition of done includes an automated
Simple ↔ Power switching regression test (none exists today, per the 2026-08-10 refine
pass) with the mid-load switch as an explicit case — this is the NN most likely to
regress silently.

### NN-4 · Startup and switching performance (Sp 87 carry-over — confirmed 11 Aug 2026)

Sp 87 measurements (Tom Bogle, 1 Aug 2026, local release build): startup into Simple
**~42 s**; Power → Simple **~12–14 s** (halved by PR
[#2425](https://github.com/paranext/paranext-core/pull/2425), still unmerged); project
switch within Simple **~16 s**.

Update (Tom Bogle, 11 Aug 2026, Sp 87 thread): with PR #2425 plus follow-on startup work,
a **Platform release build now starts in ~12 s** and switches projects in Simple in
**~4 s** (vs just under ~2 s to open a single new project in Power) — how that translates
to packaged P10 is not yet verified. The follow-on startup work depends on a WIP PR in
paratext-10-studio
([#171](https://github.com/paranext/paratext-10-studio/pull/171)), and Tom reports PR
#2425 has enough serious code-review feedback that it will **not** merge within Sp 87 —
so this carry-over is confirmed, not hypothetical.

Note the split: Sp 87's NN was **startup** speed; PR #2425 primarily delivers the
Power → Simple **switch** (an Sp 87 NTH), though it contains fixes the startup case
builds on. The startup work itself is not done — Tom describes a "smallish" amount of
follow-on work for startup, dependent on #2425 and paratext-10-studio #171.

Scope for sprint 89, in priority order (priority = importance, not sequence — item 2 is
item 1's prerequisite, so execution order is 2 → 1 → 3):

1. **Startup** (the carried-over NN): complete the startup follow-on work (depends on
   PR #2425 and paratext-10-studio #171) and land it.
2. Resolve the review feedback and land PR #2425 (fast-switch-to-simple) — prerequisite
   for item 1 and delivers the switch improvement.
3. Verify the improved numbers hold in a packaged P10 build, reported before/after
   (`PT_STARTUP_MARKS` waterfall); further time-boxed improvement as appetite allows.
   The 5-second startup figure remains an aspiration/NTH indicator, as in Sp 87 — not an
   NN benchmark.

### NN-5 · Project/resource selection works reliably

Sebastian counts ~5 important bugs across the project/resource selection surfaces: not
showing all projects, misleading label, unable to download, broken on dev server, content
cut off ([duplicate-components thread](https://discord.com/channels/892072317436448768/1531583516444201082)).
Related open Jira: PT-4059 (picker rework, PT-3887), PT-4135, PT-4264 (language search
broken), PT-4232 (Get Resources disabled), PT-4299 (open-project dropdown intermittently
empty at startup), PT-4225 (first-run picker UX). The PO has repeatedly signaled this
area as high priority.

Today there are more selection surfaces than distinct jobs — duplicate components plus
several callable dialogs, including unused ones (the 2026-08-10 refine pass found more
surfaces than TJ's original "two components + three dialogs" count). Scope:

1. Fix the known selection bugs above.
2. Converge the _accidental_ duplicates toward the outcome: **one implementation per
   distinct job; unused surfaces retired** (TJ's original ask, phrased as an outcome
   rather than exact counts).
3. **Explicitly keep** the two-surface design: a _picker_ (choose an item — single-pick
   or multi-pick — in context) and a _management modal_ (management functions: remove an
   item, install one locally from the remote server). Simple needs both actions, so at
   least two components exist **by design**; in many places the bottom of the picker
   opens the management modal, and that handoff is part of the design (rationale
   recorded in the resource-picker `DESIGN.md` on PR
   [#2291](https://github.com/paranext/paranext-core/pull/2291)). This is consolidation
   of implementations, not "one control to rule them all." Sequencing (decided
   2026-08-10): do **not** block on PR #2291 landing — fold its design (and its
   components where useful) into the convergence work.

Escape valve (decided 2026-08-10): if the sprint squeezes, the bug fixes (item 1) are
the non-negotiable core; the consolidation (items 2–3) degrades to a nice-to-have. In
that case it joins the NTH pool on its own merits — a squeeze that fires the valve makes
all NTHs unlikely alike, but within the pool the consolidation may still outrank other
NTHs (it is not automatically last).

### NN-6 · The app never dies silently (WebSocket disconnect)

**PT-1641** (🚀 Critical, open since Jan 2025) — WebSockets disconnect silently; the app
stops working with no indication and needs a restart. This is the SS's "freezes" verbatim.
No reliable repro exists, so the NN is scoped as:

1. Instrument + diagnose (logs already show `Tried to send payload while not connected`).
2. Ship a mitigation: automatic reconnect, or at minimum a visible "connection lost —
   restart needed" state so Saroj is never typing into a dead app. Prior art for
   reconnection: Scripture Forge uses the `reconnecting-websocket` npm package
   (sillsdev/web-xforge `ClientApp/package.json`, ^4.4.0, as of 2026-08-10) — evaluate
   it (or an equivalent) rather than hand-rolling reconnect logic. Caution (2026-08-10
   refine pass): reconnection is not a drop-in — the server forgets a connection's
   registrations when it drops (reconnect must re-establish them), and the data-provider
   process currently exits on disconnect — the mitigation design must handle both.

## Nice-to-haves

1. **One coherent Send/Receive feedback story** — multiple 'Sync' notifications appear
   (including duplicates: one toast from Power and one from Simple during the same sync
   — no ticket yet); Simple's toast 'Cancel' vs Power's banner 'Cancel' behave
   differently; verify Cancel actually cancels resource syncing (Roopa,
   [Auto Sync thread](https://discord.com/channels/892072317436448768/1532098144731664574)).
   Related: PT-4240 (Sync toolbar button wrongly appears in Power — and sometimes fails
   to appear in Simple), PT-3954, PT-4007
   ([Sync-in-Power thread](https://discord.com/channels/892072317436448768/1529901003401461933)).
2. **Localizable sync progress messages** — raw S/R progress strings are concatenated
   onto "Syncing", producing non-grammatical, non-localizable toasts, e.g.
   `Syncing Searching local 'SPAN' for most recent change (65%).` (Tom Bogle;
   [discussion](https://discord.com/channels/892072317436448768/1529901003401461933/1530268266885283941)).
   First step: verify against the packaged build — the 2026-08-10 refine pass could not
   find the concatenation in paranext-core; the strings come back from the S/R library
   and the join likely lives in paratext-10-studio or a repo it pulls in.
3. **Auto-sync banner shouldn't jump the editor** — banner pushes the text down and back
   up; overlay it instead. Ian agrees it's real but not urgent.
4. **Bible Texts follows versification** — port the model-text fix (PR #2537) to the
   Bible Texts WebView, or do TJ's recommended structural fix (`projectId` = the project
   actually open in the WebView). Include the "show all books" affordance question from
   the [BCV thread](https://discord.com/channels/892072317436448768/1526591296968593579)
   — needs a UX decision first (see Open questions).
5. **PT-4226** — BCV history dropdown renders behind floating tabs.
6. **PT-4103** — platform-bible-react components leak raw `%…%` localization keys when
   a string is missing; give them English defaults (the ticket lists six components;
   the 2026-08-10 refine pass found nine sites — sweep, don't just fix the listed six).
7. **PT-4121** — markers can be deleted while the project structure is locked
   (delete-guard can be bypassed by emptying the block first; mechanism understood).
   Cross-package risk: the fix likely lands in the shared editor package (its own
   release path), not in this codebase — confirm before committing to the sprint.
8. **PT-4317 / PT-3998** — Simple zero-state dead-ends: registered user with no projects
   has no way to get one after setup.
9. **Small visual/behavior verification set** (Levi): checkbox borders too light;
   "Show footnotes" (project hamburger menu) only affects the middle editor column — it
   should also apply to model text (column 1) and the Bible texts / commentaries tabs
   (column 3). Not a bug per se but an incomplete feature (clarified by Ira,
   2026-08-11); those panes currently have no footnote rendering at all, so this is
   completing an existing toggle across panes — in scope under the epic's "didn't quite
   get finished" framing. Also: verify scroll sync across model text / editor /
   commentaries / Bible texts — noting Bible Texts / Commentaries are deliberately
   outside Simple's scroll sync today, so "verify" must first pin down the intended
   behavior.
10. **String-utils performance improvements + integration** (Matt Getgen; PT-2626) —
    PT-2626 documents the observation: the custom `lastIndexOf` took ~20 seconds to scan
    half the book of John (built-ins are orders of magnitude faster but mishandle
    surrogate pairs, hence the custom implementation). Matt G is confirming where this
    bites users today — include with that user-visible metric attached.

## Out of scope (considered, cut first)

- PAPI modal type merge with project modal type (Matt Getgen) — internal consolidation,
  no direct Saroj impact this sprint.
- Extension/developer docs update & migration (Jolie) — valuable, but its own initiative;
  self-flagged as not a Simple-user improvement.
- Hoisting ai/-branch-only lint rules to all branches (Matt Lyons) — dev-infra.
- PT-4307 recovery-sync edge case — explicitly deferred by Tom (Low priority).
- PT-3033 (app doesn't start after close/reopen, Critical) — needs repro triage first;
  promote into NN-6's diagnosis work if it turns out related.
- New functionality of any kind (per the epic's framing). Completing a partially-shipped
  feature whose control already exists — e.g. the "Show footnotes" toggle reaching all
  columns (NTH-9) — counts as finishing, not new functionality. _(Carve-out for the PO
  to ratify.)_
- BCV history carrying over between Power and Simple via shared scroll groups (Roopa,
  BCV History thread) — confirmed working as intended by Alex (UX), 2026-08-10; history
  is per scroll group and deliberately project/mode-agnostic.

## Open questions

1. **BCV book list: filtered vs all books** — Sebastian proposes "show all books" or a
   filtered list + always-visible "show all books" button; Alex framed the three
   navigation questions (books not in translation, missing passages, published-Bible
   verseRef). Needs UX (Ian/Alex) before NTH-4's book-list part is implementable.
2. **Sp 87 final leftover set** — the carry-over is confirmed (11 Aug 2026: PR #2425
   will not merge in Sp 87), and NN-4's scope is drafted accordingly; re-confirm the
   exact state of PR #2425 and paratext-10-studio #171 when Sp 87 closes at end of
   week.
3. **PT-1641 acceptance** — is "visible failure + reconnect" acceptable as done if the
   root cause remains unidentified within the time box? (Recommended: yes.)
4. **What will it take to land PR #2425?** (Tom) — **sprint-entry gate, answer needed
   before sprint start.** It has serious code-review feedback outstanding and both NN-3
   (verify coverage, fix residuals) and NN-4 (startup follow-on, with the
   paratext-10-studio #171 dependency) depend on it landing first — it is the critical
   path for two of the six NNs. Need Tom's read on the remaining effort and any
   blockers; if #2425 cannot plausibly land in week 1 of the sprint, define fallback
   scopes for NN-3/NN-4 up front rather than mid-sprint.

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
