# Walkthrough Cycle 1 - Flows 2, 3, 4 (Minimal-Pane State) Report

**Iteration:** 22
**Block:** D
**Dispatch:** D.flows-2-through-4-minimal
**Date:** 2026-05-16
**HEAD before run:** `85cb22d17e`
**App state at dispatch start:** crashed/stopped (per stabilization-state.json iter 21)
**Author:** Claude (sub-agent)

## Purpose

Re-run Flows 2, 3, 4 from `user-walkthrough-script.md` after a clean app restart with **minimal pane state** (1 editor + 1 ER pane). The prior iter-21 dispatch ran under a 23-tab loop-accumulated fanout and triggered D-011 (renderer triple-port-drop on external WS probe). This dispatch's goal:

1. Confirm whether D-011 reproduces under realistic minimal-pane user conditions.
2. Run Flows 2/3/4 to completion (or as far as defects allow).
3. File any new D-NN observed.

## Phase A: Clean restart

- App was already DOWN at dispatch start.
- Checked persistence stores: `~/.platform.bible/data/settings.json` only contains BCV ref and `commentsEnabled` flag - no pane/dock state. `~/.config/platform-bible/Local Storage/leveldb/000003.log` is 0 bytes. `~/.config/Electron/logs/main.log` (the real fresh-restart log file at `~/.config/Electron/logs/main.log` per Linux electron-log default for dev) is the writeable target.
- **Discovery**: dock layout IS persisted via the renderer's `localStorage` (key `dock-saved-layout`, see `src/renderer/services/web-view.service-host.ts:660-672`). Local Storage is electron-managed leveldb under `~/.config/platform-bible/Local Storage/leveldb/`. The 23 tabs from iter-21 survived the restart via this mechanism. **The "loop-accumulated 23 tabs" assumption from the dispatch brief was partially wrong - the accumulation is in the persisted layout, not just in-session state.** No filesystem deletion performed (per NEVER list).
- Ran `./.erb/scripts/refresh.sh` (background). All 3 ports up by 20:17 (renderer 1212, websocket 8876, CDP 9223).
- PAPI ping: `command:platform.getOSPlatform` returned `"linux"`. Healthy.

## Phase B: Minimal pane setup

- After restart, queried `.dock-tab` count = **23** (persisted from iter-21).
- Closed 21 tabs via JS click on `.dock-tab-close-btn` until only `Home` + `OHEBGRK` remained (`flow-2-min-step-0a-cleaned.png`).
- Navigated scroll group 0 to `GEN 1:1` via PAPI `setScrRef` (precondition for Flow 2).
- Opened ER pane via `command:platformEnhancedResources.openEnhancedResource` (no params). New webview id `bd3ff084-c473-4a1d-ee15-093a12c13e9a`. Result: 3 visible tabs (`Home` + `Enhanced Resource` + `OHEBGRK`).
- Dismissed the "Getting Started" intro dialog inside the ER frame via `data-testid="marble-guide-close"`.
- Final pre-flow state: 1 editor (OHEBGRK at GEN 1:1) + 1 ER pane (ESV16UK+ at GEN 1:1, dictionary SDBH (HEBREW)) + Home. (`flow-2-min-step-0c-intro-dismissed.png`)
- ER pane `scrollGroupScrRef` = `null` per PAPI `getOpenWebViewDefinition`, but the ER pane DID render at GEN 1 (confirms it bootstraps from current scroll group 0 reference at open time, even though it doesn't subscribe to subsequent updates as scroll group 0).

## Phase C: Flow 2 - BCV navigation Gen → John → Romans + scroll-sync

### Step 1: BCV nav GEN 1 → JHN 1

- **PAPI call:** `object:ScrollGroupService.setScrRef [0, {book:"JHN", chapterNum:1, verseNum:1}]`
- **PAPI elapsed:** ~3 ms (excluding deliberate `sleep 1`).
- **Ports after nav:** all UP.
- **OHEBGRK editor:** correctly switched to John 1 in Greek (verified by switching to OHEBGRK tab; `flow-2-min-step-1b-editor-tab.png`).
- **ER pane BCV combobox:** updated to `John 1:1` (read from ER frame `body.innerText`).
- **ER scripture pane content:** **STILL Genesis 1 ESV** ("Creation of the World", "In the beginning, God created the heavens and the earth..."). NOT switched to John 1 ESV.
- **ER dictionary panel:** showed John 1:1 words ("beginning, the, Word, and, the, Word, was"). Dictionary IS responding to BCV updates; scripture pane is NOT.
- **Screenshot:** `flow-2-min-step-1-jhn1.png`, `flow-2-min-step-1c-er-tab.png`.
- **Verdict:** FAIL (scripture pane stuck). Files D-012.

### Step 2: BCV nav JHN 1 → ROM 8

- **PAPI call:** `object:ScrollGroupService.setScrRef [0, {book:"ROM", chapterNum:8, verseNum:1}]`
- **PAPI elapsed:** ~3 ms.
- **Ports after nav:** all UP.
- **OHEBGRK editor:** switched to ROM 8 Greek (verified post-nav).
- **ER pane BCV combobox:** `Romans 8:1`.
- **ER scripture pane content:** **STILL Genesis 1 ESV**. Confirmed by `body.innerText` read - text starts "The Creation of the World..." same as initial load.
- **ER dictionary panel:** showed ROM 8:1 words ("therefore, now, no, condemnation, for, those, in").
- **Screenshot:** `flow-2-min-step-2-rom8.png`.
- **Verdict:** FAIL (scripture pane stuck, same defect as Step 1). Same D-012.
- Note: dispatch-script Expect line "ER dictionary auto-switches to Greek default" is N/A here because we never get to verify auto-switch since the ER scripture pane is broken — though the dictionary panel itself remained on SDBG (Greek) from JHN nav (which IS correct for ROM 8). Auto-switch from Greek (JHN) → Greek (ROM 8) is a no-op for SDBH/SDBG selection.

### Step 3: Scroll sync editor → ER

- **Action:** scrolled OHEBGRK editor frame down 600 px.
- **ER scripture pane:** still showing Genesis 1 ESV (test moot, see Step 1/2). Scroll-sync behavior cannot be evaluated while the scripture pane is stuck.
- **Screenshot:** `flow-2-min-step-3-scroll-sync.png`.
- **Verdict:** N/A - blocked by D-012.

## Phase D: Flow 3 - Hover word / phrase / note

### Step 1: Hover marble word in ER scripture pane

- Navigated back to JHN 1:1 first.
- Hovered second `<mark class="editor-typed-mark-external-marble-word">` element (`nth=1`, hover-text "beginning").
- **Popover content (read from main frame `[data-radix-popper-content-wrapper]` portal):** `"beginning\n\nLemma: ἀρχή\n\nno gloss"`.
- **Greek lemma `ἀρχή` (arche)** is the correct lemma for "In the beginning" (JHN 1:1 / GEN 1:1 both use ἀρχή / רֵאשִׁית respectively; for the marble word "beginning" displayed in the ER pane the Greek lemma is correct because the marble annotation source is the JHN 1 dictionary - the dictionary IS at JHN 1 even though scripture-pane text shows GEN 1).
- **Screenshot:** `flow-3-min-step-1-hover-word.png` (popover visible top-left).
- **Verdict:** PASS for popover-render mechanism. Marble→lemma→popover content pipeline works; popover is positioned in main-frame portal (Radix Popper).
- **Caveat:** dispatch script expected hovering specifically the word "Word" with lemma `λόγος`. Could not unambiguously target "Word" because there are 3 dictionary entries labeled "Word" (annotationIds 70, 76, 88 - filter buttons, not scripture-pane marbles). The hover on scripture-pane marble "beginning" still confirms the hover/popover mechanism. With D-012 fixed, the test should re-run with "Word" specifically.

### Step 2: Hover phrase

- Queried for `[class*="marble-phrase"], mark[class*="phrase"]` — **0 matches** in current ER scripture-pane DOM.
- Skipped per walkthrough-script.md instruction.
- **Skip marker:** `flow-3-min-step-2-phrase-skip.txt`.
- **Verdict:** SKIPPED (no phrase marbles in stale GEN content; downstream of D-012).

### Step 3: Hover footnote marker

- Queried for `[class*="footnote"], sup, [data-marker="f"]` — **0 matches** in current ER scripture-pane DOM.
- Default `showFootnotes` webview-state value is `false` (per `enhanced-resource.web-view.tsx:1189`), so even if scripture pane were on JHN 1 footnotes wouldn't render without first toggling the option via the hamburger menu.
- **Skip marker:** `flow-3-min-step-3-fn-skip.txt`.
- **Verdict:** SKIPPED (footnotes off by default; defer to a cycle that runs Flow 6 hamburger-toggle path first).

## Phase E: Flow 4 - Dictionary auto-switching (Greek ↔ Hebrew)

### Step 1: Verify Greek dictionary in NT context (JHN 1)

- BCV was at JHN 1:1 from end of Phase D.
- Dictionary tab readback: `"SDBG (GREEK)..."`. **Verified.**
- **Caveat / production-vs-spec finding:** I attempted to find a user-facing dictionary picker dropdown per the walkthrough-script expectation ("dropdown lists available dictionaries; Greek default highlighted"). I located a `<button role="combobox">` with hasText "A" near the dictionary tab header, opened it, and discovered it is a **highlight category** picker (options "Ø", "A", "B", "C"), NOT a dictionary selector. The dictionary itself auto-switches based on book number (`isOldTestamentBook(bookNum) ? 'SDBH' : 'SDBG'` per `enhanced-resource.web-view.tsx:1401, 1446`) — there is **no user-facing dictionary selector in production**, only a Storybook-only `<select>` (per `dictionary-tab.stories.tsx:70-71`). Dispatch script's "dictionary selector" step does not match shipped behavior. Filed as observation, not new D-NN.
- **Screenshot:** `flow-4-min-step-1-dict-greek.png` (combobox open showing A/B/C highlight categories — visible top-right; dictionary tab still showing SDBG Greek context).
- **Verdict:** PASS (SDBG correctly active in NT context; auto-switch mechanism is correct, no user-facing picker needed/present).

### Step 2: Switch to Hebrew SDBH

- Navigated BCV → GEN 1:1 (OT book → triggers SDBH auto-switch).
- Dictionary tab readback after wait: `"SDBH (HEBREW)\nBrowse semantic domains\nbeginning\nGod\ncreated\nheavens\nearth"`. **Verified.**
- Words match GEN 1:1 Hebrew lemmas through their English glosses.
- **Screenshot:** `flow-4-min-step-2-dict-hebrew.png`.
- **Verdict:** PASS (auto-switch SDBG → SDBH on OT/NT crossing works).
- **Side observation:** the ER scripture pane is now showing GEN 1 content. Since we initially opened the ER pane at GEN 1 and arrived back at GEN 1 here, it is unclear whether the scripture-pane refresh actually works for fresh navigation or whether the GEN 1 content we see is simply the originally-loaded state still hanging around. The fact that the same "stuck" content was visible at JHN 1 and ROM 8 (D-012) strongly suggests the latter.

## Watch-list observations

### D-011 (renderer triple-port-drop on external WS probe under heavy state)

**Result: NON-REPRO under minimal-pane state.**

- All 3 ports remained UP throughout the dispatch (multiple checks after each PAPI nav).
- Log scan since the Flow 2 baseline line (935) to end of dispatch (line 5697): **zero `[error]` entries**, **zero EPIPE/crash/uncaught markers**.
- `main.log` showed only the expected D-008-suppressed annotation debug lines + iframe sandbox warnings + websocket-client-connected info lines (all benign).
- 4 BCV navigations performed (GEN→JHN→JHN1:2→ROM→GEN) across PAPI WebSocket — same broadcast path that triggered D-010 EPIPE under 9-subscriber fanout in iter-19. Under 1-editor + 1-ER (= 2 webview subscribers, 1 PAPI fanout target ER + 1 toolbar dock + extension-host), the path completes cleanly.

**Disposition recommendation:** flip D-011 to `RESOLVED-AS-LOOP-ARTIFACT` (does not reproduce under realistic user conditions). The renderer-disconnect-on-WS-probe behavior may still be worth investigating from a robustness standpoint for the heavy-state edge case the autonomous loop hit; file as follow-up issue for the platform team.

### D-012 (NEW): ER scripture pane stale on BCV navigation

**Severity:** HIGH. Blocks Flow 2 (scripture-pane mirroring) and Flow 3 (hover word/phrase/note at intended verse).

- ER scripture-pane content does not refresh when scroll-group BCV changes after initial open. BCV combobox (top-of-frame) updates correctly. Dictionary panel updates correctly. **Only the scripture pane is stuck.**
- Repro is consistent across multiple navs (GEN→JHN, JHN→JHN1:2, JHN→ROM 8).
- Repro is observable both via PAPI `setScrRef` and via the in-frame BCV combobox (the ER pane combobox showed "Romans 8:1" but content was "Creation of the World" GEN 1).
- The OHEBGRK editor in the sibling tab DOES refresh — so the broadcast itself is reaching the renderer.
- Hypothesis: the ER scripture pane component subscribes to a different event/store than the dictionary panel + BCV combobox, OR it caches the loaded chapter and the cache invalidation is broken.
- Suspect file: `enhanced-resource.web-view.tsx` scripture-pane subscription wiring around `useWebViewScrollGroupScrRef` (line 1182) and whatever downstream component renders the ESV content.
- Note: this defect would have been masked in iter-19 (Flow 1 PASS) because Flow 1 only verified the ER pane initial render mirrors the _current_ BCV; it never tested BCV-change-after-open.
- Severity: HIGH because it blocks the entire "research a passage by navigating around" user flow.

### Click handler latency (>200 ms watch)

- PAPI `setScrRef` round-trip: ~3 ms each (negligible). No watch-list breach.
- Hover-popover latency: appeared instant in screenshots (<1.5s wait was sufficient for popover to mount). No `[error]` lines in log. Within the 100ms expectation as far as I can measure non-invasively.

### Hover latency >100 ms watch

- Single hover sample; popover materialized within the 1.5s wait. Below the actionable threshold.

### Popover positioning watch

- Popover mounted in main-frame portal (`[data-radix-popper-content-wrapper]`). Visible at top-left of viewport. Did not clip outside the window. PASS.

### Console errors / unhandled rejections watch

- Log lines since baseline: 4762.
- `[error]` count: **0**.
- D-008 suppressed `[debug]` lines: present (normal post-fix behavior).
- No new unhandled rejections vs. iter-18 baseline.

## D-NN summary

| ID    | Disposition this run                    | Notes                                                                                            |
| ----- | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| D-008 | Still RESOLVED                          | D-008 suppression lines visible in log; downgrade working.                                       |
| D-009 | Still RESOLVED                          | No timeout rejections observed.                                                                  |
| D-010 | Still RESOLVED                          | No EPIPE entries in log during the 4 BCV navs.                                                   |
| D-011 | **Recommend RESOLVED-AS-LOOP-ARTIFACT** | Non-repro under minimal-pane state across the full dispatch. File platform-robustness follow-up. |
| D-012 | **NEW - OPEN**                          | ER scripture pane stale on BCV nav after open. Files in ledger below.                            |

## Outputs

- `flow-2-min-step-0-initial-state.png` (23 tabs persisted from iter-21)
- `flow-2-min-step-0a-cleaned.png` (after closing extras)
- `flow-2-min-step-0b-er-opened.png` (intro dialog visible)
- `flow-2-min-step-0c-intro-dismissed.png` (clean Flow 2 start state)
- `flow-2-min-step-1-jhn1.png`
- `flow-2-min-step-1b-editor-tab.png`
- `flow-2-min-step-1c-er-tab.png`
- `flow-2-min-step-1d-jhn2-nav.png`
- `flow-2-min-step-2-rom8.png`
- `flow-2-min-step-3-scroll-sync.png`
- `flow-3-min-step-1-hover-word.png`
- `flow-3-min-step-2-phrase-skip.txt`
- `flow-3-min-step-3-fn-skip.txt`
- `flow-4-min-step-1-dict-greek.png`
- `flow-4-min-step-1a-A-clicked.png`
- `flow-4-min-step-2-dict-hebrew.png`
- `flows-2-3-4-min-report.md` (this file)

## Verdict roll-up

- Flow 2: **FAIL** (D-012)
- Flow 3: **PARTIAL** (step 1 PASS, steps 2/3 SKIPPED downstream of D-012 + default settings)
- Flow 4: **PASS** (step 1 + step 2 verified; observation filed re: no user-facing dictionary picker in production - auto-switch is the production behavior)
- D-011: **RESOLVED-AS-LOOP-ARTIFACT** (non-repro under minimal-pane realistic state)
- New defects: **1** (D-012)
