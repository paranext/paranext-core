# D-012 Evidence — ER scripture pane stale on BCV navigation

**Status:** RESOLVED
**Iteration:** 23
**Block:** E
**Date:** 2026-05-16
**HEAD before fix:** `85cb22d17e`
**Author:** Claude (sub-agent)

## Bug

When the user opened an Enhanced Resource pane on a verse (e.g., GEN 1:1) and then
navigated the scroll group to another verse (e.g., JHN 1, ROM 8) via the BCV picker or
PAPI `setScrRef`, the ER pane's **scripture pane** sub-component stayed frozen on the
chapter that was loaded when the ER pane was first opened. The ER pane's BCV combobox
(top of frame) updated correctly. The dictionary panel updated correctly to show entries
for the new ref. The sibling OHEBGRK editor in a different tab re-rendered the new
chapter. Only the ER pane's scripture-pane content was stuck.

## Hypotheses

The dispatch brief enumerated three possible root causes:

- (A) The `scrRef` state captured by `useWebViewScrollGroupScrRef` is correct but NOT
  passed down to `<EnhancedScripturePane>` (prop chain broken).
- (B) The prop IS passed but the scripture pane's internal effect dependency array
  omits the scrRef so it never re-runs the load.
- (C) The scripture pane uses a different ref source / consumes the new value in a
  way that prevents the visible editor from re-rendering.

## Hypothesis tested: (C) (variant)

I traced the prop chain and the chapter-load effect first:

1. **Prop chain (rules out A):** `enhanced-resource.web-view.tsx:1182` calls
   `useWebViewScrollGroupScrRef()` which returns the live `scrRef`. That value is
   passed to `<EnhancedResourceWebView>` at line 2930 (`scrRef={scrRef}`), and from
   there to `<EnhancedScripturePane>` at line 655. The prop chain is intact.
2. **Chapter-load effect (rules out B):** The chapter-load effect at
   `enhanced-resource.web-view.tsx:1237-1299` correctly depends on
   `[erProxy, resourceId, scrRef.book, scrRef.chapterNum]`. On a BCV change it does
   fire, calls `erProxy.loadMarbleChapterXml(...)`, and updates the `usj` state with
   the new chapter's USJ via `setUsj(convertedUsj)`. The fresh `usj` does reach the
   `<EnhancedScripturePane>` as a prop change.
3. **Root cause (confirms C):** The scripture pane renders `<Editorial
defaultUsj={usj} … />` (`scripture-pane.component.tsx:1046`). Editorial's
   `defaultUsj` prop is consumed **only at mount time** — see
   `@eten-tech-foundation/platform-editor` `EditorProps.defaultUsj` ("Initial Scripture
   data in USJ format", `index.d.ts:217`). To replace the displayed content after
   mount, callers must invoke the imperative `EditorRef.setUsj(usj)` API
   (`index.d.ts:257`). The platform-scripture-editor extension already follows this
   pattern (`platform-scripture-editor.web-view.tsx:451` → `editorRef.current?.setUsj(usj)`
   from `use-editor-pdp-sync.hook.ts`). The Enhanced Resource scripture pane was
   missing the equivalent sync effect, so the editor stayed on whatever USJ it
   received at first mount no matter how many times the wiring layer reloaded `usj`.

## Fix

`extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`,
inserted between the `lemmaIndex` `useMemo` and the existing "Effect A" annotation
loop (between lines 573 and 581 in the pre-fix file):

```tsx
// D-012 (2026-05-16): Editorial accepts the chapter USJ via `defaultUsj` at mount only - it does
// NOT re-read that prop on subsequent renders. When the wiring layer reloads a new chapter (BCV
// nav after the ER pane is open), the scripture pane was stuck on the originally-mounted USJ
// because nothing pushed the new value into the editor. Fix: sync subsequent USJ changes through
// the imperative `editor.setUsj()` ref API. Skip the initial run because Editorial already has
// the same value via `defaultUsj` - calling `setUsj` once more on mount would force a redundant
// Lexical re-init. (Pattern mirrors `platform-scripture-editor/use-editor-pdp-sync.hook.ts`.)
const lastSyncedUsjRef = useRef<Usj | undefined>(usj);
useEffect(() => {
  // First-mount: Editorial consumed `defaultUsj`. Record the value and skip the imperative push.
  if (lastSyncedUsjRef.current === usj) return;
  lastSyncedUsjRef.current = usj;
  const editor = editorRef.current;
  // When usj is undefined the component renders the empty state instead of Editorial, so there is
  // nothing to push. The next render with a defined usj will re-mount Editorial via `defaultUsj`.
  if (!editor || !usj) return;
  editor.setUsj(usj);
}, [usj]);
```

Behavior notes:

- The initial mount uses `defaultUsj={usj}` exactly as before. A guard against the
  first run (`lastSyncedUsjRef.current === usj`) skips the imperative call so we don't
  force a redundant Lexical re-init on mount.
- When `usj` changes (BCV nav reload), the effect invokes
  `editor.setUsj(newUsj)` which causes Editorial to rebuild its Lexical tree from the
  fresh document.
- The existing Effect A (base marble annotations) keys on `[usj, annotations, lemmaIndex]`
  (`scripture-pane.component.tsx:955`), so when `usj` changes the annotation set is
  re-applied to the new chapter's marks. No additional plumbing was needed for marble
  overlays.
- The `if (!editor || !usj) return;` guard handles the empty-state case: when `usj`
  becomes `undefined` the component renders the empty card instead of Editorial, so
  no imperative push is needed; the next defined `usj` will re-mount Editorial which
  consumes the value via `defaultUsj` again.

## Tests

Added a new describe block `D-012 chapter-USJ sync on prop change` in
`scripture-pane.test.tsx` with four cases:

1. `does not call setUsj on the initial mount (defaultUsj covers it)` — guards the
   no-redundant-init invariant.
2. `pushes the new USJ through editor.setUsj() when the usj prop changes after mount`
   — direct regression test for D-012.
3. `does not call setUsj when re-rendered with the same usj reference` — confirms we
   don't churn on unrelated prop changes.
4. `skips the setUsj push when the new usj is undefined (empty state takes over)` —
   confirms the empty-state path.

The mock Editorial in the existing test file was extended to expose a `setUsj` spy
alongside `setAnnotation` and `removeAnnotation`.

```
$ cd extensions && npx vitest --run scripture-pane
 ✓ src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx (56 tests) 354ms
 Test Files  1 passed (1)
      Tests  56 passed (56)
```

(All 4 new tests pass plus the 52 pre-existing tests — no regressions.)

## Live verification

App restarted with the fix via `./.erb/scripts/refresh.sh`. 3 dock tabs from prior
session preserved (Home + Enhanced Resource + OHEBGRK). ER pane already open.

| Step | Action                                    | Expected                      | Observed                                                                                                                                                                                                           | Screenshot                  |
| ---- | ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| 1    | BCV set to GEN 1:1 (no-op, already there) | ER scripture pane = GEN 1 ESV | `"1\n\nThe Creation of the World\n\n​1​In the beginning, God created the heavens and the earth. …"`                                                                                                                | `d-012-before-fix-gen1.png` |
| 2    | PAPI `setScrRef [0, JHN 1:1]`             | ER scripture pane = JHN 1 ESV | `"1\n\nThe Word Became Flesh\n\n​1​In the beginning was the Word, and the Word was with God, and the Word was God. ​2​He was in the beginning with God. …"`                                                        | `d-012-after-fix-jhn1.png`  |
| 3    | PAPI `setScrRef [0, ROM 8:1]`             | ER scripture pane = ROM 8 ESV | `"8\n\nLife in the Spirit\n\n​1​There is therefore now no condemnation for those who are in Christ Jesus. ​2​For the law of the Spirit of life has set you free in Christ Jesus from the law of sin and death. …"` | `d-012-after-fix-rom8.png`  |
| 4    | PAPI `setScrRef [0, GEN 1:1]` (back-nav)  | ER scripture pane = GEN 1 ESV | `"1\n\nThe Creation of the World\n\n​1​In the beginning, God created the heavens and the earth. …"`                                                                                                                | (text read; same as step 1) |

For comparison with the original iter-22 repro (`flows-2-3-4-min-report.md` Phase C
Steps 1-2): with the bug present, step 2 would have shown "Creation of the World" (GEN

1. and step 3 would have shown the same — both reads above now show the correct
   chapter, confirming the fix.

Application log scan (`~/.config/Electron/logs/main.log`, last 200 lines): zero
`[error]` entries, zero EPIPE / crash / uncaught markers, zero `setUsj`-related
exception lines.

## Files changed

- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx`
  (+13 lines: new sync effect; insertion point line 574)
- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx`
  (+4 test cases plus a `setUsj` spy added to the existing Editorial mock)

## Test name(s) (Vitest)

```
EnhancedScripturePane > D-012 chapter-USJ sync on prop change > does not call setUsj on the initial mount (defaultUsj covers it)
EnhancedScripturePane > D-012 chapter-USJ sync on prop change > pushes the new USJ through editor.setUsj() when the usj prop changes after mount
EnhancedScripturePane > D-012 chapter-USJ sync on prop change > does not call setUsj when re-rendered with the same usj reference
EnhancedScripturePane > D-012 chapter-USJ sync on prop change > skips the setUsj push when the new usj is undefined (empty state takes over)
```

## Risk / regression surface

- Mid-chunk annotation apply: Effect A applies marble annotations in 50-per-frame
  chunks. When the new `usj` arrives, Effect A's cancellation flag (`cancelled = true`
  in its cleanup) aborts any in-flight chunked apply against the old USJ; the next
  effect run applies annotations against the new USJ. The pre-existing behavior is
  unchanged - we simply unblocked the upstream `usj` prop change from reaching the
  editor.
- Hover popover lifecycle (D-14/D-15 fixes): the hover/match annotations layered on
  top of the base set are also keyed on `usj` in their respective effects; they
  rebuild against the new chapter's mark DOM after Editorial finishes the
  `setUsj()`-driven tree rebuild.
- No PAPI or backend contract changes.
