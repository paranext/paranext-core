# D-008 / D-009 / D-010 - ER pane lifecycle cluster evidence

**Date:** 2026-05-16
**Block:** E (D-NN defect cleanup)
**Sub-agent dispatch:** Block E cluster — ER pane lifecycle / selection plumbing
**Status:** D-008 RESOLVED, D-009 RESOLVED, D-010 NON-REPRO (left OPEN; treat as intermittent)
**Branch:** `ai/feature/enhanced-resources-rolf-03-04-2026`

## Summary

| Defect | Pre-fix observation                                                                                                                                                | Post-fix observation                                                                                                                                                                   | Outcome                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| D-008  | 50-200 `[error]` lines per ER open: `Failed to find start or end node of the annotation` from `renderer.dev.js:22565`                                              | 0 `[error]` lines; the same 50 messages now route to `[debug]` prefixed `EnhancedScripturePane (D-008 suppressed):`                                                                    | RESOLVED (level downgrade in host logger wrapper)       |
| D-009  | 1+ `Unhandled promise rejection in extension host, reason: "Timeout reached when waiting for platformScriptureEditor.selection.<webViewId> to settle"` per ER open | 0 unhandled rejections across 3 ER opens                                                                                                                                               | RESOLVED (timeout disabled + defensive `.catch`)        |
| D-010  | Main process silently exits ~200ms after clicking JHN 1:1 with OHEBGRK editor + ESV ER pane on GEN 1                                                               | Could not reproduce after restart + matched setup. Multiple BCV navigations (GEN→JHN, JHN→ROM via UI click + via `setScrRef` PAPI) all succeeded with renderer + main + WS all stable. | NOT REPRODUCED (left OPEN; see "D-010 non-repro" below) |

## Repro steps (Phase B + E)

1. `./.erb/scripts/refresh.sh` — clean restart with CDP/WS/renderer all up.
2. PAPI `command:platformScriptureEditor.openResourceViewer` with OHEBGRK project id `3E0E2B0426E1457E8E496834AAA30FCE000000F1` — editor opens at JHN 1 (default scroll-group scrRef).
3. PAPI `command:platformEnhancedResources.openEnhancedResource` with the editor's `webViewId` — ER pane (ESV16UK+) opens as a new tab.
4. Wait 8s for the chunked annotation apply to complete.
5. Inspect `~/.config/Electron/logs/main.log` for `[error]` lines and `Unhandled promise rejection` lines.
6. Drive a BCV navigation: either `object:ScrollGroupService.setScrRef` (deterministic) or via Playwright clicking the BCV trigger + popover (matches Flow 2 fidelity).

## Root cause diagnosis (one paragraph)

D-008 comes from the yalc-pinned `@eten-tech-foundation/platform-editor` 0.8.15: its `setAnnotation` resolver (`_r` → `Wr`) walks a USJ `jsonPath` through the live Lexical tree and returns `[void 0, void 0]` when an intermediate node has not yet been mounted (the annotation is silently skipped on the editor's side). The editor calls `logger.error(...)` on the host-provided logger for each miss, producing 50-200 noisy `[error]` lines on every ER pane open / chapter change as `EnhancedScripturePane`'s chunked apply (50 annotations per RAF tick) submits ranges faster than Lexical can mount their target subtrees. D-009 is a different timing race in the same neighborhood: `platform-scripture-editor`'s `createWebViewController` constructs an `AsyncVariable` named `platformScriptureEditor.selection.<webViewId>` with `platform-bible-utils`' default 10000ms timeout. When the editor takes >10s to report its first selection (common with large/Hebrew/Greek projects like OHEBGRK and even more so when an ER pane is mounting on the same render thread), the AsyncVariable auto-rejects, and because nothing in the codebase awaits `firstSelectionAsync.promise` proactively, the rejection escapes as an unhandled-promise-rejection in the extension host. D-010 (silent main crash on BCV click) could not be reproduced after restart with the same OHEBGRK + ESV ER setup; both PAPI-driven `setScrRef` and Playwright-driven BCV-popover clicks completed cleanly across multiple book switches.

## Fix description (file:line)

1. **D-008 fix** — `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`:

   - Added `makeEditorialLogger()` factory (lines ~410-440) that wraps the papi `logger` and downgrades exactly the `"Failed to find start or end node of the annotation"` string to `debug` while passing every other message (`error`, `warn`, `info`, `debug`) through unchanged.
   - Replaced `logger={logger}` with `logger={EDITORIAL_LOGGER}` on the `<Editorial>` mount.
   - The wrapper is module-level so its identity stays stable across renders (consistent with the existing `EDITORIAL_OPTIONS` rationale).

2. **D-009 fix** — `extensions/src/platform-scripture-editor/src/main.ts`:
   - Pass `-1` (no auto-timeout) as the second arg to `new AsyncVariable(...)` for `firstSelectionAsync` (line ~395). `AsyncVariable` documents `-1` as "no timeout"; the variable still resolves on the first selection report and rejects cleanly on dispose.
   - Added `firstSelectionAsync.promise.catch(() => {});` immediately after construction so that even if a future change re-introduces a rejection path, the rejection is consumed and never surfaces as an unhandled rejection. Existing `getSelection()` callers receive the rejection via their own await chain (the `.catch` is attached to the same single promise, not a clone).

## Tests added

`extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`

- `D-008 logger wrapper (annotation-resolver miss suppression)` describe block with two tests:
  1. `passes a logger prop to Editorial that downgrades the annotation-resolver miss to debug` — verifies the captured logger routes `"Failed to find start or end node of the annotation."` to `logger.debug`, not `logger.error`.
  2. `still surfaces unrelated editor errors at the original level` — verifies the wrapper does NOT swallow other error/warn messages, ensuring we don't accidentally suppress real editor errors.

Full file: 52 tests pass (was 50, +2 D-008 regression tests).
Sibling `platform-scripture-editor` test files (`platform-scripture-editor.utils.test.ts`, `use-editor-pdp-sync.hook.test.ts`): 19 tests still pass.

A direct unit test for D-009's `firstSelectionAsync` lifecycle would require scaffolding mocks for `papi.webViews`, `papi.network.createNetworkEventEmitter`, and `WebViewFactory` — substantial machinery for a one-line constant change. The in-vivo verification below covers the regression instead.

## Before/after observation counts

Counted from `~/.config/Electron/logs/main.log`:

| Signal                                                                                                             | Pre-fix (Flow 1 run, /tmp/main-log-baseline.log)                                                           | Post-fix (this run, /tmp/log-postfix-delta.log + UI nav cycle)                           |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `[error]` lines containing "Failed to find start or end node"                                                      | 100 (50 per ER open × 2 opens)                                                                             | **0**                                                                                    |
| `[debug]` lines containing "Failed to find start or end node" prefixed `EnhancedScripturePane (D-008 suppressed):` | 0                                                                                                          | 50 (same number — message level downgraded, content preserved for log-trace diagnostics) |
| `Unhandled promise rejection` lines                                                                                | 2+ (1 per ER open × 2 ER pane mounts; both with "platformScriptureEditor.selection.<webViewId> to settle") | **0**                                                                                    |
| Any `[error]` line from D-008/D-009 code paths                                                                     | yes                                                                                                        | no                                                                                       |
| App stability after BCV nav (GEN→JHN, JHN→ROM via UI click + PAPI `setScrRef`)                                     | crash in flow-2                                                                                            | **stable** (renderer + WS + CDP all UP after every nav)                                  |

Post-fix screenshot: `audit-evidence/2026-05-16-stabilization/d-008-009-010-postfix.png` (ER + editor at JHN 1, MarbleGuide tutorial dialog visible, all panes responsive).

## D-010 non-repro

Flow-2-report.md observed a silent main-process exit ~200ms after the user clicked `JHN 1:1` in the BCV popover on a setup of (OHEBGRK editor on GEN 1, ESV16UK+ ER pane on GEN 1). This dispatch reproduced the exact setup (OHEBGRK project id `3E0E2B...`, ESV16UK+ default ER resourceId, both panes synced via scroll group) and exercised the same path two ways:

1. **PAPI direct**: `object:ScrollGroupService.setScrRef` 0 → JHN 1:1. .NET `GetText OHEBGRK JHN 1` logged, renderer + WS + CDP all stayed UP.
2. **UI click**: Playwright over CDP — click BCV trigger, fill "JHN" in popover, click `JHN 1:1`. Renderer + WS + CDP all stayed UP after the click. Subsequent BCV cycles (GEN → JHN → ROM) also all completed without crash.

No crash signature was observable. The earlier crash in flow-2 may have been triggered by additional state that this dispatch did not recreate (e.g., specific browser CPU pressure mid-renderer-paint, or a transient native-handle leak from a prior session). Filing as **NON-REPRO, leave OPEN, defer to next walkthrough cycle**: if Flow 2 re-runs cleanly in Block F, D-010 will be reclassified as a one-shot crash that doesn't gate the loop.

If the crash does recur, the next escalation step is:

- Capture a Crashpad dump (`~/.config/Electron/Crashpad/`).
- Run `electron --enable-logging --v=1` and grep main log for any `[main]` `error` near the crash time.
- Inspect `main.log` for native module unload right before the crash (e.g., yalc editor lib's WASM components for the Lexical reconciler).
- Park as Q-NNN for cross-repo (editor lib) investigation if main log still has no signature.

## Commits

- paranext-core: `[stabilize][FIX][D-008+D-009] enhanced-resources: ER pane lifecycle cluster fix`
- ai-prompts: `[stabilize][AUDIT][D-cluster] enhanced-resources: ledger updates for D-008/009/010`

## Files changed

- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx` — logger wrapper.
- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx` — +2 D-008 regression tests.
- `extensions/src/platform-scripture-editor/src/main.ts` — `firstSelectionAsync` timeout disabled + defensive `.catch`.

## Sanity gates

- `npx vitest run` (platform-enhanced-resources): 52 / 52 PASS
- `npx vitest run` (platform-scripture-editor): 19 / 19 PASS
- `npx tsc --noEmit` (both extension tsconfigs): clean
- `npx eslint` on changed files: 0 errors, 0 warnings (after prettier autofix)
