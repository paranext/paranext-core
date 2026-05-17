# Block F Cycle 3 Walkthrough Report (Final Green-Bar)

**Date:** 2026-05-16
**Dispatch:** F.cycle-3-walkthrough (iter 31)
**HEAD at start:** `85cb22d17e` (commit on branch) -> post D-015 fix at `8afd31bd3c`
**Pane state:** 3 dock tabs (Home + Enhanced Resource + OHEBGRK editor)
**Scroll group:** 0
**Purpose:** Final walkthrough of all 8 flows post-D-015 fix. Confirm green-bar (`user_walkthrough_clean = true`, `no_console_errors = true`).

## Phase A: Restart + Baseline

- App restarted via `./.erb/scripts/refresh.sh` (xvfb headless, CDP 9223).
- All three ports came up: Renderer 1212 / WebSocket 8876 / CDP 9223.
- PAPI ping: `command:platform.getOSPlatform` -> `"linux"` (healthy).
- Main log baseline: line 3047 (post-startup).
- Initial pane state: Home + Enhanced Resource + OHEBGRK editor (3 tabs).
- Initial BCV: GEN 1:1.
- Marble guide auto-splash re-opened on first BCV nav into a new chapter; closed via `[data-testid="marble-guide-close"]`.

## Phase B: Per-Flow Results

| Flow | Description                                         | Cycle 2 Outcome                            | Cycle 3 Outcome     | Evidence                                                                                                                                                                                                                                                                                                                             |
| ---- | --------------------------------------------------- | ------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Open ER on tracked editor (Hebrew/OHEBGRK at GEN 1) | PASS                                       | **PASS**            | flow-1-step-1-er-on-gen1.png. ER scripture pane shows "The Creation of the World" (GEN 1). 504 marble-word decorators in ER frame.                                                                                                                                                                                                   |
| 2    | BCV nav GEN -> JHN -> ROM + scroll-sync             | PASS                                       | **PASS**            | flow-2-step-1-jhn1.png (JHN 1 "The Word Became Flesh"), flow-2-step-2-rom8.png (ROM 8 "Life in the Spirit"), flow-2-step-3-scroll-sync-jhn114.png (JHN 1:14 nav). ER content updated on every BCV nav. Ports stayed UP.                                                                                                              |
| 3    | Hover word + phrase + footnote                      | PARTIAL (no phrase data; footnote off)     | **PARTIAL (same)**  | flow-3-step-1-hover-word.png (popover "Word\nLemma: lambda-omicron-gamma-omicron-sigma\nno gloss"), flow-3-step-2-dict-entry-and.png, flow-3-step-3-dict-detail-beginning.png, flow-3-step-4-god-all-senses.png. Word hover and dict entry click both rendered without errors. D-015 fix verified: 0 duplicate-key warnings emitted. |
| 4    | Switch dictionaries Hebrew <-> Greek                | PASS (auto-switch by BCV)                  | **PASS**            | flow-4-step-1-dict-hebrew.png (SDBH/GEN 1 + entries beginning/God/created/heavens/earth), flow-4-step-2-dict-greek.png (SDBG/JHN 1 + entries In/beginning/the/Word/and/God). Auto-switch by language on BCV nav works.                                                                                                               |
| 5    | Domain link -> SDV -> breadcrumb                    | PARTIAL (no Domain rows in dict entries)   | **PARTIAL (same)**  | flow-5-step-1-beginning-greek.png. Greek "beginning" entry shows 8 senses, each "Glosses:" line only - no "Domain:" rows present. Data-gap (FN-019); SDV not triggered from current corpus. Confirmed via DOM probe: only 1 "domain" element on page = the "Browse semantic domains" header link, not a sense-level domain link.     |
| 6    | H/G display modes via hamburger                     | PASS (radios + persistence)                | **PASS**            | flow-6-step-1-hamburger-open.png (3 Hebrew + 3 Greek radios; previously persisted state observed: Hebrew=Transliteration, Greek=Both - confirms cross-run persistence). flow-6-step-2-hebrew-both.png. After toggle Hebrew Transliteration -> Both: state persisted on menu reopen (aria-checked=true on Both).                      |
| 7    | Dock/undock ER pane                                 | N/A (floatable: false by design)           | **N/A (confirmed)** | Same as cycle 2 - intentional design per `platform-dock-layout-positioning.util.ts:32`.                                                                                                                                                                                                                                              |
| 8    | Annotation hover + marble word click                | PARTIAL (no marble-guide form; opens dict) | **PARTIAL (same)**  | flow-8-step-2-marble-click.png. Clicking first marble in ER opens dictionary detail (not marble-guide form). Same conditions as cycle 2 - UI-PKG-008 form not triggered for ER-side marble clicks (by design or data limitation; matches cycle 0/2).                                                                                 |

## Phase C: D-008..D-015 Regression Check

All 8 D-NN fixes hold at HEAD `8afd31bd3c`:

| D-NN  | Description                                                         | Cycle 3 Status | Evidence                                                                                                                                                                                                                                                                                                                                 |
| ----- | ------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-008 | "Failed to find start or end node" error -> debug downgrade         | **HOLDS**      | 39 `D-008 suppressed` markers in main.log since baseline (all debug-routed, 0 [error]-routed).                                                                                                                                                                                                                                           |
| D-009 | Timeout when waiting for selection to settle (unhandled rejection)  | **HOLDS**      | 0 occurrences of "Timeout reached when waiting" since baseline.                                                                                                                                                                                                                                                                          |
| D-010 | Main-process EPIPE crash on BCV broadcast fanout                    | **HOLDS**      | 0 EPIPE entries / 0 transient-pipe-error entries across all BCV navs (GEN->JHN->ROM->JHN1:14->GEN->JHN).                                                                                                                                                                                                                                 |
| D-011 | Renderer triple-port drop on external WS probe (resolved via D-014) | **HOLDS**      | All 3 ports stayed UP for the entire walkthrough.                                                                                                                                                                                                                                                                                        |
| D-012 | ER scripture pane stale after post-open BCV nav                     | **HOLDS**      | ER scripture pane content updated on every nav: GEN1 -> JHN1 -> ROM8 -> JHN1:14 -> GEN1 -> JHN1. All correct.                                                                                                                                                                                                                            |
| D-013 | Renderer crash on first BCV nav post-D-012 (minimal-pane state)     | **HOLDS**      | 0 crashes across 5 BCV navs in minimal-pane state (3 dock tabs).                                                                                                                                                                                                                                                                         |
| D-014 | Idle stdout-pipe EPIPE escape under minimal-pane state              | **HOLDS**      | 0 transient-pipe-error log entries; no renderer death observed across the run.                                                                                                                                                                                                                                                           |
| D-015 | React duplicate-key warning in DictionaryEntryDetail                | **HOLDS**      | **0** duplicate-key warnings across 3 dict-entry detail loads (Hebrew "beginning"/12-senses-visible, Hebrew "God"/10-senses-visible, Greek "beginning"/8-senses). Was 10 in cycle 2 -> 0 in cycle 3. Fix verified at `dictionary-entry-detail.component.tsx:242-250,353` (per-position `senseKeys[idx]` with `id#N` collision suffixes). |

## Phase D: Console + main.log Error Counts

Final tallies for main.log lines `> 3047` (post-startup baseline):

| Metric                                            | Count | Notes                                                                                              |
| ------------------------------------------------- | ----- | -------------------------------------------------------------------------------------------------- |
| Total new lines                                   | 82    | Modest log volume across 8 flows                                                                   |
| `[error]` level entries                           | **0** | **GREEN**                                                                                          |
| `[warn]` level entries                            | 1     | Pre-existing USJ marker-map version mismatch (3.1 vs 3.0.7) - not new, not regression. Not a D-NN. |
| `[rend] [error]` (renderer console.error capture) | **0** | **GREEN** - the 10 React duplicate-key warnings from cycle 2 are gone.                             |
| `Encountered two children with the same key`      | **0** | **GREEN** - D-015 fix confirmed.                                                                   |
| EPIPE                                             | **0** | **GREEN** - D-010/D-014 fixes hold.                                                                |
| transient-pipe-error                              | **0** | **GREEN** - D-014 fix holds.                                                                       |
| Unhandled rejection                               | **0** | **GREEN**                                                                                          |
| Timeout reached when waiting                      | **0** | **GREEN** - D-009 fix holds.                                                                       |
| D-008 suppressed (debug-routed, expected)         | 39    | Debug-routed via D-008 fix - 0 routed to `[error]`. Expected behavior.                             |
| Page-context `window.__capturedErrors` array      | **0** | **GREEN** - no errors captured in renderer global.                                                 |

**Console error count for `no_console_errors` exit criterion: 0**

## Side-Observations

- **Hebrew/Greek mode state persisted across cycle 2 -> cycle 3 app restart**: Menu reopened on cycle 3 with Hebrew=Transliteration / Greek=Both (set by cycle 2). Confirms webview state survives full app restart, not just menu close/reopen.
- **Marble guide auto-splash reopens on first BCV nav of a new chapter**: Closed via `[data-testid="marble-guide-close"]`. Not a defect - the splash is intended behavior, but the auto-reopen-on-nav cadence may warrant follow-up if found annoying in practice (not in scope for this walkthrough).
- **`[warn] [rend] USJ provided has version 3.1, but provided markers map has version 3.0.7`**: 1 occurrence; pre-existing (not new in cycle 3). Cosmetic markers-map version warning - low severity; could be filed as follow-up.

## Overall Verdict

**Status: PASS - GREEN BAR**

- All 8 flows execute without app crash.
- 4 flows PASS (1, 2, 4, 6) - same as cycle 2.
- 3 flows PARTIAL (3, 5, 8) - identical conditions to cycle 2 (data gaps / by-design; not code bugs).
- 1 flow N/A (7) - intentional design.
- 0 new D-NN.
- D-008..D-015 all hold.
- Console error count: **0** (was 10 in cycle 2; D-015 fix eliminated them).
- main.log [error] count: **0**.

**Exit criteria implications:**

- `exit_criteria_met.user_walkthrough_clean` -> can flip **TRUE** (re-running produced zero new D-NN observations).
- `exit_criteria_met.no_console_errors` -> can flip **TRUE** (0 console errors during full-feature exercise).

## Block F Cycle State

This is cycle **3 of 3** (Block F cycle 2, walkthrough cycle 3 overall - per the dispatch naming convention). Per charter §"Audit-Cycle Hard Cap", cycle 3 produced zero new D-NN, so the loop reaches the green-bar exit without triggering STABILIZATION-OSCILLATING.

Next: Block G (Exit-Criteria Gate) can verify all 8 exit criteria and write `stabilization-complete.md`.
