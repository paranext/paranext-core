# PRD — Sprint 89: Simple Quality Improvements

|                                |                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sprint Statement (roadmap)** | "Saroj navigates all Simple functionality with as few problems for users as possible (breaks, freezes, bugs, etc.)"                                 |
| **Roadmap description**        | "Engineers identify and fix at least 6 NN (+ 10 NTHs) of the most serious bugs and performance issues for Simple, to make Simple 'nice to use'."    |
| **Epic Lead (PO)**             | Ian Hewerdine                                                                                                                                       |
| **Prepared by**                | Ira Hopkinson (Simple Engineering Lead) — first pass for PO review                                                                                  |
| **Implementation Owner**       | Katherine Jensen                                                                                                                                    |
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

One sprint (sprint 89): **6 developer-weeks across 2 calendar weeks**, immediately
following Sp 88 (no calendar overlap). Per the roadmap: at least **6 non-negotiables**
fixed, plus up to **10 nice-to-haves** as time allows. Where a candidate has unbounded discovery risk
(PT-1641, startup performance), the NN is scoped as a time-boxed "materially improve and
report", not a benchmark promise — the lesson Matt Lyons flagged in Sp 87. Per the
Implementation Owner's feasibility check (12 Aug 2026), NTH capacity is expected to be
minimal — the NTH list is a prioritized menu, not committed scope (see also Open
question 6 on the NN commitment level).

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

Sp 88 boundary (13 Aug 2026): Sp 88's Trust-the-App NN5 owns the honest
missing-book/loading **messaging** across tabs (PT-4111, PT-4132) and navigating to
books that exist in a resource but not the project. This NN keeps the
**stale-content/rerender** failures: PT-4238 (Text Collection is a Sp 88 no-go), the
project-switch rerender cluster, and PT-4139's don't-rerender half. Re-check at Sp 88
close: any unfinished Sp 88 NN5 messaging work re-enters this pool.

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
to packaged P10 is not yet verified. The follow-on startup work depended on
paratext-10-studio [#171](https://github.com/paranext/paratext-10-studio/pull/171)
(**merged 12 Aug 2026**), and Tom reports PR #2425 has enough serious code-review
feedback that it did not merge in Sp 87 and is unlikely to merge during Sp 88 either —
so this carry-over is confirmed, not hypothetical. Note (Tom, 12 Aug 2026): #2425 also
contains Sync-affecting changes — analyze it for overlap/landmines before S/R-adjacent
work builds on or around it.

Note the split: Sp 87's NN was **startup** speed; PR #2425 primarily delivers the
Power → Simple **switch** (an Sp 87 NTH), though it contains fixes the startup case
builds on. The startup work itself is not done — Tom describes a "smallish" amount of
follow-on work for startup, dependent on #2425 and paratext-10-studio #171.

Scope for sprint 89, in priority order (priority = importance, not sequence — item 2 is
item 1's prerequisite, so execution order is 2 → 1 → 3):

1. **Startup** (the carried-over NN): complete the startup follow-on work (depends on
   PR #2425; the paratext-10-studio #171 dependency merged 12 Aug 2026) and land it.
2. Resolve the review feedback and land PR #2425 (fast-switch-to-simple) — prerequisite
   for item 1 and delivers the switch improvement.
3. Verify the improved numbers hold in a packaged P10 build, reported before/after
   (`PT_STARTUP_MARKS` waterfall); further time-boxed improvement as appetite allows.
   The 5-second startup figure remains an aspiration/NTH indicator, as in Sp 87 — not an
   NN benchmark. Candidate lever: the string-utils rework (NTH-1, PT-2626) consumed
   ~13 s of a **debug** startup — measure its release-build contribution as part of
   this NN's verification.

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

Sp 88 boundary (13 Aug 2026): Sp 88's Find work (its NN1b) adds a project/resource
selector to Find — for Saroj, reusing (and renaming) the existing resource dialog. By
the time this NN starts, that is one more live consumer of the selection surfaces:
include it in the convergence inventory, and don't break what Sp 88 just shipped.

Sp 90 boundary — **recommended split, pending PO agreement** (13 Aug 2026): Sp 90's
NN4 (titlebar project selector behavior) and NN5 (unify the 3–4 selection UIs, 2 wks)
restate this NN's items 2–3 almost verbatim — including the "not necessarily one
component; different for single vs multi selection" conclusion that matches the
two-surface design above. Recommended: **Sp 89 keeps item 1 only** (the dead-end bug
fixes, fixed in place with deliberately minimal restructuring); **items 2–3 transfer to
Sp 90**, inheriting the recorded design decisions (two-surface design, fold in PR
#2291's work, Sp 88's Find selector in the inventory). The IO concurs both sprints are
needed to cover the area; this draws the line at fix-what's-broken (89) vs
restructure (90). If agreed, the escape valve below becomes the plan rather than the
contingency, and NN-5 shrinks to its bug core (relevant to Open question 6).

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

Listed in priority order, ranked by the same criteria as the non-negotiables
(Appendix A). Reordered 13 Aug 2026 when the string-utils findings landed.

1. **String-utils performance improvements + integration** (Matt Getgen; PT-2626) —
   the user-visible metric gate is now **satisfied** (Matt G, 12–13 Aug 2026,
   [findings thread](https://discord.com/channels/892072317436448768/1536890498906853418)):
   the current grapheme-aware string functions re-segment on every call and consumed
   **~13 s of a debug startup**; typing 5 characters in the editor triggered **13.7 s**
   of background work; opening Enhanced Resources in Simple spent **12.2 s** in the
   foreground; Power startup spends 5.8 s. His PT-2626 rework is ~0.02 ms per call and
   a drop-in replacement for the most common function (45% of ~200 call sites); the
   sweep also surfaced latent index bugs (UTF-16 vs grapheme mixing) and sites that
   don't need grapheme awareness at all. Note: these measurements are debug builds —
   the release-build contribution (relevant to NN-4) is unverified. Open adoption
   question (TJ): the new API is internally consistent rather than
   native-`String`-compatible — decide match-native vs adopt-consistent before
   integration.
2. _(Moved out of scope 13 Aug 2026 — owned by Sp 88.)_ **One coherent Send/Receive
   feedback story** is Sp 88 Trust-the-App **NN4** ("a single, truthful S/R or Sync
   notification at a time; cancel with a single click") — see Out of scope. Slot kept
   to preserve numbering; re-check at Sp 88 close.
3. **Localizable sync progress messages** — raw S/R progress strings are concatenated
   onto "Syncing", producing non-grammatical, non-localizable toasts, e.g.
   `Syncing Searching local 'SPAN' for most recent change (65%).` (Tom Bogle;
   [discussion](https://discord.com/channels/892072317436448768/1529901003401461933/1530268266885283941)).
   First step: verify against the packaged build — the 2026-08-10 refine pass could not
   find the concatenation in paranext-core; the strings come back from the S/R library
   and the join likely lives in paratext-10-studio or a repo it pulls in. Coordinate
   with Sp 88 NN4's notification consolidation — localize against the notification
   surface that work lands on, not the current toasts.
4. **Auto-sync banner shouldn't jump the editor** — banner pushes the text down and back
   up; overlay it instead. Ian agrees it's real but not urgent.
5. **Bible Texts follows versification** — port the model-text fix (PR #2537) to the
   Bible Texts WebView, or do TJ's recommended structural fix (`projectId` = the project
   actually open in the WebView). Versification is explicitly a Sp 88 no-go, so this
   stays here. The "show all books" BCV affordance from the
   [BCV thread](https://discord.com/channels/892072317436448768/1526591296968593579)
   is owned by **Sp 88 NN5d/NTH5b** (navigate to books in a resource but not the
   project) — Ian's decision (Open question 1) transfers there as input; re-check at
   Sp 88 close.
6. **PT-4226** — BCV history dropdown renders behind floating tabs.
7. **PT-4103** — platform-bible-react components leak raw `%…%` localization keys when
   a string is missing; give them English defaults (the ticket lists six components;
   the 2026-08-10 refine pass found nine sites — sweep, don't just fix the listed six).
8. **PT-4121** — markers can be deleted while the project structure is locked
   (delete-guard can be bypassed by emptying the block first; mechanism understood).
   Cross-package risk: the fix likely lands in the shared editor package (its own
   release path), not in this codebase — confirm before committing to the sprint.
9. **PT-4317 / PT-3998** — Simple zero-state dead-ends: registered user with no projects
   has no way to get one after setup.
10. **Small visual/behavior verification set** (Levi): checkbox borders too light;
    "Show footnotes" (project hamburger menu) only affects the middle editor column — it
    should also apply to model text (column 1) and the Bible texts / commentaries tabs
    (column 3). Not a bug per se but an incomplete feature (clarified by Ira,
    2026-08-11); those panes currently have no footnote rendering at all, so this is
    completing an existing toggle across panes — in scope under the epic's "didn't quite
    get finished" framing. Also: verify scroll sync across model text / editor /
    commentaries / Bible texts — noting Bible Texts / Commentaries are deliberately
    outside Simple's scroll sync today, so "verify" must first pin down the intended
    behavior.

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
  columns (NTH-10) — counts as finishing, not new functionality. _(Ratified by Ian,
  12 Aug 2026.)_
- BCV history carrying over between Power and Simple via shared scroll groups (Roopa,
  BCV History thread) — confirmed working as intended by Alex (UX), 2026-08-10; history
  is per scroll group and deliberately project/mode-agnostic.
- **One coherent S/R feedback story** (was NTH-2) — the narrow scope (single truthful
  sync notification, single-click cancel-all) is **Sp 88 Trust-the-App NN4**; ownership
  of the fuller story is under discussion in the
  ["Send-receive issues split across PRDs" thread](https://discord.com/channels/892072317436448768/1451249981565702214/threads/1537081655586717857)
  (13 Aug 2026): Ian's direction (titlebar sync status over toasts, one-click
  cancel-all) exceeds Sp 88's "messaging only" no-go per Sebastian. Hand our detail to
  that thread as input: PT-4240, PT-4002, the unticketed duplicate Power+Simple toasts,
  PT-3954/PT-4007, and the cancel-verification concern. Whatever the thread doesn't
  assign — and any unfinished Sp 88 part — re-enters this pool at Sp 88 close.
- **PT-4218** (min-width cuts controls) — covered by Sp 88 Trust-the-App NN2b.

## Open questions

1. **BCV book list: filtered vs all books** — **Resolved (Ian, 12 Aug 2026):** filtered
   to the project's books plus a "show all books" button; Ian is seeking UX input to
   confirm the detail. Unblocks NTH-5's book-list part.
2. **Sp 87 final leftover set** — **Resolved (12 Aug 2026):** the leftover set is PR
   #2425 plus the startup follow-on work; paratext-10-studio #171 merged 12 Aug 2026.
   The live tracking point is now question 4 (the #2425 entry gate).
3. **PT-1641 acceptance** — **Resolved (Ian, 12 Aug 2026):** mitigation shipped +
   diagnosis reported counts as done if the root cause remains unidentified within the
   time box.
4. **What will it take to land PR #2425?** (Tom) — **sprint-entry gate, answer needed
   before sprint start.** It has serious code-review feedback outstanding and both NN-3
   (verify coverage, fix residuals) and NN-4 (startup follow-on; its other dependency,
   paratext-10-studio #171, merged 12 Aug 2026) depend on it landing first — it is the
   critical path for two of the six NNs. Need Tom's read on the remaining effort, any
   blockers, and the viability of handing it to someone else to complete; if #2425
   cannot plausibly land in week 1 of the sprint, define fallback scopes for NN-3/NN-4
   up front rather than mid-sprint.
5. **Sprint 88 overlap check** — **Resolved (13 Aug 2026)** against the Sp 88
   Trust-the-App PRD, with one live remainder: S/R feedback story → narrow scope is
   Sp 88 NN4; the fuller story's ownership is being decided in the
   "Send-receive issues split across PRDs" thread (Ian's titlebar-status direction
   exceeds Sp 88's messaging-only no-go — it may land here or later); missing-book
   messaging + "show all books" BCV affordance → Sp 88 NN5 (this PRD keeps the
   stale-content/rerender half of NN-2 and the versification port); PT-4218 → Sp 88
   NN2b; sync-string localization (NTH-3) coordinates with Sp 88 NN4's landing surface;
   NN-5's convergence inventory gains Sp 88's new Find selector consumer. Remaining
   action, folded into the sprint-entry gate (question 4): **Sp 88 close-out review** —
   any unfinished Sp 88 NN4/NN5 item and the split-thread outcome re-enter this pool,
   and Tom's #2425 Sync-overlap warning applies to whatever Sp 88 ships.
6. **Commit to 6 NNs, or 5 + a stretch?** (Ian) — the Implementation Owner's
   feasibility check of draft 2
   ([frozen record](./sp89-simple-quality-feasibility-draft2.md), 12 Aug 2026) reads
   the roadmap's "at least 6 NN" as a stretch, not a plan: effective capacity is
   roughly 20–40% short of the NN midpoints even with NN-5's escape valve fired, and
   the 6th NN hinges on PR #2425 landing in the sprint's first days. Options: commit
   to 5 NNs with the 6th as stretch, or hold "at least 6" and accept the risk. Note:
   if question 7's recommended split is agreed, NN-5 shrinks to its bug core, which
   eases (but does not eliminate) this gap.
7. **Sp 90 crossover on selection surfaces** (Ian, flagged 13 Aug 2026) — Sp 90's NN4
   and NN5 overlap this PRD's NN-5. **Recommended split** (see NN-5's Sp 90 boundary
   note): Sp 89 fixes the dead-end bugs in place; Sp 90 takes the convergence and
   behavior redesign, inheriting the recorded design decisions. Honors the IO's view
   that both sprints are needed; reduces Sp 89 load where the feasibility check says
   it's tightest.

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
| S/R notification/Cancel streamlining                                                                              | Roopa                                    | NTH-2                                      |
| Non-localizable "Syncing …" strings                                                                               | Tom                                      | NTH-3                                      |
| Auto-sync banner jump                                                                                             | Roopa → Auto Sync thread (Ira, Ian)      | NTH-4                                      |
| Bible Texts versification + book-list UX                                                                          | Roopa → BCV thread (TJ, Sebastian, Alex) | NTH-5                                      |
| BCV history behind floating tabs (PT-4226)                                                                        | Roopa → History Depth thread             | NTH-6                                      |
| Raw `%…%` key leaks (PT-4103)                                                                                     | Tom (standup)                            | NTH-7                                      |
| Marker deletion while locked (PT-4121)                                                                            | Jolie                                    | NTH-8                                      |
| Zero-state dead-end (PT-4317, PT-3998)                                                                            | Jira sweep                               | NTH-9                                      |
| Checkbox borders / footnote toggle / scroll-sync check                                                            | Levi                                     | NTH-10                                     |
| String-utils performance                                                                                          | Matt Getgen                              | NTH-1 (metric confirmed 12–13 Aug 2026)    |
| PAPI modal type merge                                                                                             | Matt Getgen                              | Out of scope                               |
| Docs update/migration                                                                                             | Jolie                                    | Out of scope                               |
| Lint-rule hoisting                                                                                                | Matt Lyons                               | Out of scope                               |
| PT-4307 recovery-sync edge                                                                                        | Tom                                      | Out of scope (deferred)                    |
| PT-3033 app won't restart (Critical)                                                                              | Jira sweep                               | Out of scope (repro triage; may join NN-6) |
| PT-4218 min-width cuts controls, PT-4022 missing `\id`, PT-4137 char-style editing, PT-4123/PT-4138 lock tooltips | Jira sweep                               | Out of scope (would be next NTHs)          |
