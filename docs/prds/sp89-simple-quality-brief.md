# PRD — Sprint 89: Simple Quality Improvements (brief)

> **Generated document** — this brief is produced from the detailed plan
> [sp89-simple-quality.md](./sp89-simple-quality.md), which is the source of truth and
> carries full context, citations, and boundary notes. The brief is regenerated at
> draft milestones; edit the plan, not this file.

|                          |                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Sprint Statement**     | "Saroj navigates all Simple functionality with as few problems for users as possible (breaks, freezes, bugs, etc.)" |
| **Owner (PO)**           | Ian Hewerdine — signs off                                                                                           |
| **Epic Lead**            | Todd Hoatson — runs the PRD                                                                                         |
| **Prepared by**          | Ira Hopkinson (Simple Engineering Lead)                                                                             |
| **Implementation Owner** | Katherine Jensen                                                                                                    |
| **Appetite**             | 6 developer-weeks across 2 calendar weeks, immediately following Sp 88                                              |
| **Timing**               | Sprint entry gated on the PR #2425 assessment and the Sp 88 close-out review                                        |
| **Status**               | Draft 5 — as of 2026-08-25                                                                                          |

## 1. The Problem

P10 Simple now covers Saroj's core workflow end to end — but the seams show. The editor
can blank out entirely with no way forward; panes can silently show the previous
project's Scripture; switching modes can destroy the Power layout; startup takes tens
of seconds; a connection can die silently leaving a dead app; and Send/Receive talks in
several inconsistent voices. None of these blocks a demo; together they make Simple
feel untrustworthy for daily work. This sprint is a deliberate quality pass: no new
functionality, just making what exists behave.

## 2. Appetite & Boundaries

**Commitment (PO, 13 Aug 2026): 5 non-negotiables committed; the 6th is a stretch
goal — designated 25 Aug 2026 by the Epic Lead: NN-3 is the stretch** (sequenced last
behind #2425; its fixes ship via NN-4 regardless; NN-6 parallelizes). Unbounded items
are time-boxed as "materially improve and report", not benchmark promises. NTH capacity
is expected to be minimal (per the IO's feasibility check) — the NTH list is a
prioritized menu, not committed scope.

### Non-negotiables

1. **The editor never blanks out** — fix the identified root cause (a render-race in
   the shared data hook) and add an error boundary so the worst case is a visible
   crash message with a restart action, never a silent blank.
2. **Panes never show the wrong project's or book's text** — fix the stale-content /
   re-render failures on project switch and missing books (PT-4238, PT-4139's
   re-render half). The missing-book _messaging_ is Sp 88's.
3. **Mode switching never corrupts the layout or the project** — verify PR #2425's
   coverage of the layout-overwrite and current-project-bleed bugs, add a
   Simple↔Power switching regression test (mid-load switch included), fix residuals.
4. **Startup performance** (the Sp 87 NN carry-over) — land PR #2425 and the startup
   follow-on; verify the improved numbers (~12 s → target) in a packaged P10 build;
   adopt the string-utils rework (a verified ~1–2.5 s startup lever).
5. **Project/resource selection works reliably** — fix the dead-end selection bugs
   (can't download, missing projects, broken search, loading-vs-empty confusion), in
   the environments they were reported in (incl. the dev-server case). Consolidation
   of the duplicate surfaces is Sp 90's; general offline/disconnected selection
   reliability is not committed this sprint (input to Sp 90's redesign).
6. **The app never dies silently** — diagnose the silent WebSocket disconnect
   (PT-1641); ship automatic reconnect or a visible "connection lost" state.
   Mitigation shipped + diagnosis reported = done (PO-ratified).

### Nice-to-haves (prioritized menu)

1. Localizable sync progress messages (verify where the "Syncing …" concatenation
   lives first)
2. Auto-sync banner overlays the editor instead of pushing it down
3. Bible Texts follows versification (port the merged model-text fix)
4. BCV history dropdown renders above floating tabs (PT-4226)
5. English fallbacks where raw `%…%` localization keys leak (PT-4103; nine sites)
6. Markers can't be deleted while structure is locked (PT-4121; may land in the shared
   editor package)
7. Simple zero-state dead-end: a registered user with no projects gets a path forward
   (PT-4317 / PT-3998)
8. Small visual set: checkbox contrast; "Show footnotes" reaches all three columns
   (completing an existing toggle — carve-out ratified); verify intended scroll-sync
   scope

### No-gos

- New functionality of any kind — completing a partially-shipped feature whose control
  already exists counts as finishing, not new functionality (PO-ratified).
- Owned elsewhere: S/R notification consolidation (Sp 88; fully unified solution
  later), missing-book messaging + "show all books" (Sp 88), toolbar/titlebar
  truncation (Sp 88), selection-surface consolidation and picker behavior redesign
  (Sp 90).
- Dev-infra suggestions (docs migration, lint-rule hoisting, internal type merges) —
  considered, ranked below user-facing items.
- Deferred edge cases: PT-4307; PT-3033 pending repro triage; next-in-line bugs
  (PT-4218 is Sp 88's, PT-4022, PT-4137, lock-tooltip polish).
- BCV history carrying across Power/Simple scroll groups — confirmed working as
  intended (UX).

## 3. Shaped Solution

Each NN embeds its own shape in the [plan](./sp89-simple-quality.md) (this is a bugfix
PRD of independent items, not one workflow). The moments that matter: land PR #2425
early or trigger the pre-defined fallbacks; fix bugs in place with minimal
restructuring so Sp 90's consolidation isn't pre-empted.

### Rabbit holes

| NN     | Hole                                                                                         | Fence                                                                                                                       |
| ------ | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| NN-1   | No reliable manual repro (render race)                                                       | Use the deterministic threshold-driven repro for verification; error boundary guarantees the user-facing outcome regardless |
| NN-2   | "Broader re-rendering cluster" is unbounded                                                  | Commit only to ticketed/reproduced items; new finds go to the pool                                                          |
| NN-3/4 | PR #2425 has unresolved review feedback; coverage of NN-3's bugs unverified                  | Sprint-entry gate: Tom's landing assessment; fallback scopes pre-defined if it can't land week 1                            |
| NN-5   | Adopting the shared selector could become consolidation                                      | Verify the component's own bugs are fixed first; per-bug fix-in-place vs adopt-shared; consolidation stays Sp 90            |
| NN-5   | "Reliably" implies an environment matrix (offline/disconnected/dev server)                   | Committed in reported environments only (incl. dev server); offline/disconnected reliability → pool / Sp 90 redesign        |
| NN-6   | Reconnect is not a drop-in (server forgets registrations; data-provider exits on disconnect) | Mitigation-first acceptance ratified; time-boxed diagnosis                                                                  |
| NTH-1  | The string concatenation couldn't be found in this codebase                                  | Verify against the packaged build before scoping                                                                            |

## 4. Risks

| Risk        | Level | Notes                                                                                                                                                         |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value       | 🟢    | Every item is reported user pain from devs/testers                                                                                                            |
| Usability   | 🟢    | No new UI patterns; where UI is touched, UX has approved (selector, carve-out)                                                                                |
| Feasibility | 🟡    | IO's feasibility check: 5 NNs is the commit, 6 the stretch; PR #2425 is the critical path for two NNs — mitigated by the entry gate and pre-defined fallbacks |
| Viability   | 🟢    | Roadmap sprint; boundaries agreed with Sp 88/Sp 90 owners                                                                                                     |

## 5. Technical Context

Systems touched: editor web view, pane/web-view data plumbing, mode-switch layout
handling, startup path, selection components, WebSocket/RPC layer, S/R notifications.
Detail and citations per item in the [plan](./sp89-simple-quality.md).

**Open questions: none remain.** The #2425 sprint-entry gate is answered (Tom,
25 Aug: PR very close, hand-off viable once his conflict push lands), and the
dual-guard decision is ratified (Epic Lead, 25 Aug: merge as-is; fold the
redundant-guard deletion into NN-3's verification). All earlier questions are resolved
and recorded in the plan (book list, PT-1641 acceptance, Sp 87 leftovers, Sp 88
overlap, commitment level, Sp 90 split).

## Changelog

| Date        | Change                                                                                                                                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10 Aug 2026 | Draft 1 — candidates gathered (Discord + Sp 87 leftovers + Jira sweep), prioritized 6 NN + 10 NTH                                                                                                                                                                                |
| 12 Aug 2026 | Draft 2 — two refine passes incorporated; IO feasibility check received                                                                                                                                                                                                          |
| 13 Aug 2026 | Draft 3 — Sp 88 overlap resolved; PO decisions on book list, PT-1641, carve-out                                                                                                                                                                                                  |
| 14 Aug 2026 | Draft 4 — PO decisions: 5+1 commitment, Sp 90 split; string-utils folded into NN-4 (release-build numbers); NN-1 repro status; this brief generated                                                                                                                              |
| 25 Aug 2026 | Draft 5 — NN-5 environment fence added after Sebastian's doc question (reported environments only; offline/disconnected → pool / Sp 90); #2425 entry gate substantially answered by Tom, dual-guard (ADR-0019) decision recorded; stretch slot designated by the Epic Lead: NN-3 |
