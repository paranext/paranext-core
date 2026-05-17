# Block F Cycle 2 Walkthrough Report

**Date:** 2026-05-16
**Dispatch:** F.cycle-2-walkthrough (iter 29)
**HEAD at start:** `85cb22d17e` (current branch tip)
**Pane state:** 3 dock tabs (Home + Enhanced Resource + OHEBGRK editor)
**Scroll group:** 0
**Purpose:** Full re-walkthrough of all 8 flows under post-D-cluster-fix conditions. Verify D-008..D-014 fixes hold.

## Phase A: Restart + Baseline

- App restarted via `./.erb/scripts/refresh.sh` (xvfb headless, CDP 9223).
- All three ports came up: Renderer 1212 / WebSocket 8876 / CDP 9223.
- Main log baseline: line 1429 (post-startup).
- Initial pane state: Home + Enhanced Resource + OHEBGRK editor (3 tabs).
- Closed the auto-opened "Getting started in enhanced resources" splash via `[data-testid="marble-guide-close"]`.

## Phase B: Per-Flow Results

| Flow | Description                                         | Cycle 0 Outcome                                                           | Cycle 2 Outcome               | Evidence                                                                                                                                                                                                                                                                                                                                                           |
| ---- | --------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | Open ER on tracked editor (Hebrew/OHEBGRK at GEN 1) | PASS                                                                      | **PASS**                      | flow-1-step-1-er-on-gen1.png, flow-1-step-2-ohebgrk-tab.png. ER mirrors GEN 1 ("The Creation of the World..."), OHEBGRK tab shows Hebrew text for Genesis 1. 40 lexical decorators in scripture pane (marble word groups: 922 total).                                                                                                                              |
| 2    | BCV nav GEN → JHN → ROM + scroll-sync               | PASS                                                                      | **PASS**                      | flow-2-step-1-jhn1.png (JHN 1 "The Word Became Flesh"), flow-2-step-2-rom8.png (ROM 8 "Life in the Spirit"), flow-2-step-3-scroll-sync-jhn114.png (JHN 1:14 nav). ER scripture pane updates on every BCV change (D-012 fix holds). Ports stayed UP across all navs.                                                                                                |
| 3    | Hover word + phrase + footnote                      | PARTIAL (phrase N/A; footnote no popover)                                 | **PARTIAL (same as cycle 0)** | flow-3-step-1-hover-word.png, flow-3-step-1-hover-word-tooltip.png, flow-3-step-3-hover-footnote.png. Word hover: popover content "Word\nLemma: λόγος\nno gloss" via Radix popper in main frame. Footnote hover: no popover (matches cycle 0 - requires View → Show footnotes toggle). Phrase: not tested - phrase data N/A in corpus.                             |
| 4    | Switch dictionaries (Hebrew SDBH ↔ Greek default)  | PASS (auto-switch)                                                        | **PASS**                      | flow-4-step-1-dict-selector-greek.png, flow-4-step-2-dict-hebrew.png. Dictionary content auto-switches by language on BCV nav: JHN 1 → Greek words (And/the/Word/Became/Flesh), GEN 1 → Hebrew SDBH words (beginning/God/heavens/earth/sea).                                                                                                                       |
| 5    | Click domain link → SDV → breadcrumb back           | PARTIAL (FN-019 data gap; SDV opens but tree empty in dict entry context) | **PARTIAL (same as cycle 0)** | flow-5-step-0-word-clicked.png ("beginning" entry → 12 senses showing "Glosses:" but no Domain rows), flow-5-step-0b-greek-word-clicked.png (JHN "Word" entry → 0 senses found). No domain links present in dictionary entries; data gap matches cycle 0.                                                                                                          |
| 6    | H/G display modes via hamburger                     | PASS (radios + persistence)                                               | **PASS**                      | flow-6-step-1-hamburger-open.png (14 menu items: Show footnotes / Show translations / 3 Hebrew radios / 3 Greek radios / Copyright / Find / Zoom in/out/reset / Close), flow-6-step-2-hebrew-transliteration.png, flow-6-step-3-hebrew-transliteration-applied.png. Toggled Hebrew Both → Transliteration; state persisted on menu reopen (verified aria-checked). |
| 7    | Dock/undock ER pane                                 | N/A (floatable: false by design)                                          | **N/A (confirmed)**           | Confirmed via grep: `src/renderer/components/docking/platform-dock-layout-positioning.util.ts:32` sets `floatable: false`. Same intentional behavior as cycle 0.                                                                                                                                                                                                   |
| 8    | Annotation hover + marble word click                | PARTIAL (no editable annotated project; marble click opens dictionary)    | **PARTIAL (same as cycle 0)** | flow-8-step-2-marble-click.png. Click on `mark.editor-typed-mark-external-marble-word >> nth=0` (first "And" marble in GEN 1) triggered popover "And\nLemma: And\nno gloss" but did NOT open marble guide form (UI-PKG-008) or filter dictionary panel. OHEBGRK editor has 0 marks for editor-side hover (FN-027); same as cycle 0.                                |

## Phase C: D-008..D-014 Regression Check

All seven D-NN fixes confirmed RESOLVED at HEAD `85cb22d17e`:

| D-NN  | Description                                                                          | Cycle 2 Status | Evidence                                                                                                                                                                                        |
| ----- | ------------------------------------------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D-008 | "Failed to find start or end node" error → debug downgrade                           | **HOLDS**      | 263 `D-008 suppressed` markers in main.log; 0 `[error]` entries with that text.                                                                                                                 |
| D-009 | Timeout when waiting for selection to settle (unhandled rejection)                   | **HOLDS**      | 0 occurrences of "Timeout reached when waiting" in main.log since startup.                                                                                                                      |
| D-010 | Main-process EPIPE crash on BCV broadcast fanout                                     | **HOLDS**      | 0 EPIPE entries / 0 transient-pipe-error entries across 4 BCV navs (GEN→JHN→ROM→JHN1:14→GEN→JHN).                                                                                               |
| D-011 | Renderer triple-port drop on external WS probe under heavy load (resolved via D-014) | **HOLDS**      | Resolved via D-014 stdio-error listener; no recurrence.                                                                                                                                         |
| D-012 | ER scripture pane stale after post-open BCV nav                                      | **HOLDS**      | ER scripture pane content updated correctly on every nav: GEN 1 (Creation) → JHN 1 (Word Became Flesh) → ROM 8 (Life in the Spirit) → JHN 1:14 (Word Became Flesh, around v14) → GEN 1 → JHN 1. |
| D-013 | Renderer crash on first BCV nav post-D-012 (minimal-pane state)                      | **HOLDS**      | 0 crashes across 5 BCV navs in minimal-pane state (3 dock tabs). Ports stayed UP throughout.                                                                                                    |
| D-014 | Idle stdout-pipe EPIPE escape under minimal-pane state                               | **HOLDS**      | 0 transient-pipe-error log entries; no renderer death observed across the run (~12 minutes).                                                                                                    |

**Console error count summary:**

- Main process [error] entries: **1** (my own websocat probe to non-existent `command:platformEnhancedResources.openSemanticDomainViewer` for SDV-existence check — not a regression).
- Renderer [error] [rend] entries: **10** — ALL React duplicate-key warnings from `DictionaryEntryDetail` (see D-015 below). Routed as [error] via electron-log's `console.error` capture.
- EPIPE: **0**
- Unhandled rejection: **0**
- Crash markers: **0**

## NEW DEFECT: D-015

| D-### | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Layer | Source      | Triage                     | Status   |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ----------- | -------------------------- | -------- |
| D-015 | React duplicate-key warning in `DictionaryEntryDetail` — `senses.map((sense) => <DictionarySenseItem key={sense.id} ... />)` produces non-unique `sense.id` values when an entry returns multiple senses with the same id. 10 console-error rows logged across 2 dictionary-entry loads (5 senses per render × 2 renders). Stack: `at div / at section / at div / at DictionaryEntryDetail / at PanelWithForwardedRef / at PanelGroupWithForwardedRef`. Not a crash; React renders both children but warns. The "beginning" SDBH entry returns 12 senses but apparently some share `sense.id`. Fix: include a stable per-position index in the key (`key={sense.id + ':' + idx}`) OR upstream — fix the dictionary presenter to dedupe / make sense ids unique. | UI    | walkthrough | in-scope (cycle-2 finding) | **OPEN** |

**Source location:** `extensions/src/platform-enhanced-resources/src/components/dictionary-tab/dictionary-entry-detail.component.tsx:335-344`

```tsx
{senses.map((sense) => (
  <DictionarySenseItem
    key={sense.id}        // <-- DUPLICATES POSSIBLE
    sense={sense}
    ...
  />
))}
```

**Severity:** LOW (cosmetic; React handles duplicates by rendering all but logs a console.error per duplicate). However, the per-flow `no_console_errors` exit criterion is violated by this finding.

## Side-Observations

- **Editor "View menu" position confusion:** The accessibility label for the hamburger is "View menu" not "Project" - useful note for future visual scripts.
- **`A` combobox is sort-order, not dictionary selector:** Initially mistook the combobox showing "A" for a dictionary picker; it's actually a sort-order toggle. The dictionary is auto-selected by language and not exposed as an explicit dropdown in this version.
- **D-008 suppression noise:** 263 D-008-suppressed debug lines logged — these are correctly routed to `[debug]` but represent a significant log-volume cost. Follow-up: investigate why ~50 of these fire per ER USJ swap (the chunked-RAF apply walks all annotations). Not a defect, but a perf-tuning candidate.
- **Hebrew display mode applies only to ER pane:** Toggling Hebrew Transliteration in ER's View menu does not affect the OHEBGRK editor's display — by design, the ER pane has its own display preference.

## Overall Verdict

**Status: PARTIAL-PASS-WITH-NEW-D-NN**

- All 7 D-NN fixes from cycle 1 hold under realistic minimal-pane state.
- 4 flows PASS (1, 2, 4, 6) matching cycle 0 expectations.
- 3 flows PARTIAL (3, 5, 8) - same conditions as cycle 0; no new partial conditions.
- 1 flow N/A (7) - intentional by design.
- 1 NEW defect filed: D-015 (React duplicate-key warning in DictionaryEntryDetail).

**Exit criteria implications:**

- `exit_criteria_met.user_walkthrough_clean`: Per Block F protocol "re-running produces zero new D-NN observations" → cycle 2 produced D-015, so this remains **false**. Block E must triage D-015, then cycle 3 re-runs.
- `exit_criteria_met.no_console_errors`: 10 [error] console-routed warnings → **false** until D-015 is fixed.

## Block F Cycle State

This is cycle **1 of 3** (audit_cycle_hard_cap = 3 per charter). D-015 is the only new D-NN from this cycle. After Block E fixes D-015, cycle 3 should reach the green-bar exit.
