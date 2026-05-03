# Enhanced Resources Completion - Design

**Date:** 2026-05-03
**Branch:** `ai/feature/enhanced-resources-rolf-03-04-2026`
**PR:** #2230
**Author:** Matt Lyons + Claude (collaborative)

## Problem

Enhanced Resources (PT9 → PT10 port) was left in a partially-finished state by the agent workflow:

1. **CI failing.** A new smoke test `e2e-tests/tests/smoke/enhanced-resources-render.spec.ts` runs in CI but depends on the `ESV16UK+` Marble resource - which only exists locally on the developer machine (`/home/lyonsm/Paratext/MarbleResources/Bibles/`). CI has no Marble resources, so the test times out and the Linux/Windows/macOS builds fail.
2. **128 of 134 ER E2E tests are orphaned.** The directory `e2e-tests/tests/enhanced-resources/` contains 8 per-WP functional spec files plus a journey spec (134 tests total), but it is **not registered as a Playwright project** in `playwright.config.ts`. Nothing in that directory runs anywhere.
3. **No real scripture content.** When the user opens an Enhanced Resource, the scripture pane shows a wall of wg-marker IDs (`"Greek 1234"`, `"Hebrew 5678"`) instead of actual verse text. This is because the webview uses `TempScripturePane`, a placeholder that only renders annotation IDs as chips. The agent workflow believed it had to wait for a mythical "FN-001 read-only mode" in `platform-scripture-editor` before real scripture rendering was possible.
4. **Webpack cache warning.** `npm run build` emits `[build:extensions] <w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT ... 1.pack.gz`. This is a benign warning (not an error - build exits 0), but the user reasonably worried it was fatal.

The user's goal: ship Enhanced Resources with real scripture content rendered, all planned features implemented, CI passing, and the test suite activated to the maximum extent possible against the current backend.

## Decisions

### D1. Use `<Editorial>` from `@eten-tech-foundation/platform-editor` directly inside the ER webview

The agent workflow incorrectly assumed it had to wait for `platform-scripture-editor` to expose a read-only mode. In reality, `<Editorial>` is a plain React component already in the dependency tree (used by `platform-scripture-editor.web-view.tsx`) and supports a `readonly` flag plus an `annotations` prop. It accepts USJ as input, which our existing `marble-converter.ts` already produces.

**Rejected alternative:** Embedding the `platform-scripture-editor` webview as a sub-iframe. More complex, requires nesting webviews, and brings along PAPI wiring (recent refs, project data) that ER's own backend already provides via its network object.

### D2. Move ER E2E tests to a local-only `enhanced-resources` Playwright project; do not run in CI

ER tests need real Marble resources (ESV16UK+ at minimum) to be meaningful. CI has no way to install these. Two long-term options exist (downloadable test fixtures, mocked PAPI responses) but both are scoped infrastructure work outside this effort.

For now: register `tests/enhanced-resources/` as its own Playwright project, add `npm run test:e2e:enhanced-resources` script, leave the CI workflow's `test:e2e:smoke` step alone. Tests run locally against an already-running dev instance via the existing CDP fixture. Worker-scoped Electron means all ER tests share the same app instance - no restart penalty.

**Rejected alternative:** Per-test `test.skip()` guards that check for `process.env.ER_TESTS_ENABLED`. More ceremony, easier to forget when adding new tests.

### D3. Delete the CI smoke test outright; do not preserve an empty-state version

The redundant smoke test added value when nothing else ran. Once the per-WP tests are activated against a real Editorial-backed scripture pane, the smoke test duplicates them while running in a context where it cannot succeed. Cleaner to remove than to maintain.

### D4. Activate aggressively; document genuinely deferred tests

With Editorial replacing TempScripturePane, the FN-001 / FN-013 / FN-016 / FN-017 / FN-020 blocking notes evaporate. ~50 of the 128 currently `test.fixme()` tests should pass; the rest fall into four well-bounded categories that stay fixme:

- Pre-release / metadata-update / missing-book ribbon tests (need fixture resources ESV16UK+ doesn't satisfy)
- MarbleGuide auto-show test (needs per-test extension-host reset hook)
- Force-new-window test (menu item not contributed by UI-PKG-009; deferred to GAP-009)
- @container query collapse test (CSS container query not yet wired)

Iteration budget: two full-suite runs after activation. Tests failing on both runs with the same root cause go back to `fixme` with documented reasons rather than burning more cycles.

### D5. Document the webpack cache warning; do not chase it

`PackFileCacheStrategy` losing pack files under concurrent compilation is a known webpack behavior (see webpack issue #16439). It self-heals on the next build. Suppressing it risks introducing real cache bugs while chasing a cosmetic issue. One paragraph in `post-phase-3-followups.md` explaining the warning is benign.

## Scope

### A. Real scripture pane (largest unit)

**Files removed (verified no external consumers):**

- `extensions/src/platform-enhanced-resources/src/components/Temp/temp-scripture-pane.{component,stories}.tsx`
- `extensions/src/platform-enhanced-resources/src/components/Temp/temp-tooltip-renderer.{component,stories}.tsx`
- `extensions/src/platform-enhanced-resources/src/components/Temp/temp-note-renderer.{component,stories}.tsx`
- `extensions/src/platform-enhanced-resources/src/components/Temp/` directory (empty after the above)

**Files added:**

- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.component.tsx` - real component
- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.stories.tsx` - Storybook stories under `'Advanced/'` hierarchy
- `extensions/src/platform-enhanced-resources/src/components/scripture-pane/scripture-pane.test.tsx` - unit tests for the component layer (annotation merging, click delegation)

**Files modified:**

- `extensions/src/platform-enhanced-resources/src/web-views/enhanced-resource.web-view.tsx`:
  - Replace `import { TempScripturePane, type MarbleTokenLike } from '../components/Temp/...'` with the new component import
  - Delete the `annotationsToTokens()` helper (the wg-marker-IDs-as-text projection is no longer needed)
  - Replace `useState<MarbleTokenLike[]>(undefined)` with two slots: `useState<Usj | undefined>(undefined)` and `useState<MarbleAnnotation[]>([])`
  - In the chapter-load `useEffect`, call `setUsj(result.usj); setAnnotations(result.annotations)` (the existing code already destructures `{ annotations }` from `convertMarbleChapterXml(xml)`; it just discards `usj` today)
  - JSX swap: `<TempScripturePane>` → `<EnhancedScripturePane>`

**Note on `marble-converter.ts`:** No changes needed. `convertMarbleChapterXml()` already returns `{ usj: Usj; annotations: MarbleAnnotation[] }` (verified in source). The web view discards `usj` today; we just stop discarding it.

**New component shape:**

```ts
export type EnhancedScripturePaneProps = {
  usj: Usj | undefined;
  annotations: AnnotationRange[];
  filteredTokenId?: string;
  highlightAllResearchTerms?: boolean;
  showFootnotes?: boolean;
  scripturePaneZoom?: number;
  isLoading?: boolean;
  errorMessage?: string;
  onTokenClick?: (tokenId: string, annotation: MarbleAnnotation) => void;
  onTokenContextMenu?: (
    tokenId: string,
    annotation: MarbleAnnotation,
    event: ReactMouseEvent,
  ) => void;
  localizedStringsWithLoadingState?: [Record<string, LocalizedStringValue | undefined>, boolean];
};
```

**Internals:**

- Renders `<Editorial readonly={true} usj={usj} annotations={mergedAnnotations} viewOptions={getDefaultViewOptions()} />`
- `mergedAnnotations` is a pure function combining base wg-marker ranges with filter-overlay and highlight-overlay decorations - returns a single `AnnotationRange[]` so React doesn't fight Lexical's reconciliation
- Click delegation via a wrapping div listening for `click` / `contextmenu` events, reading `data-annotation-id` from the target, looking up the annotation, dispatching `onTokenClick` / `onTokenContextMenu`. (If Editorial exposes `onAnnotationClick` directly, use that instead.)
- Footnotes pane stays as a separate region with `hidden` toggle, populated from USJ note nodes
- Loading / empty / error states preserved from `TempScripturePane`

**Wg-marker payload preservation:** The wg `<wg id="...">` markers carry `lemma`, `strongs`, `targetLinks`, `thematicLinks`, `lexicalLinks`, `imageLinks`, `mapLinks` already on `MarbleAnnotation.metadata`. We project this onto `AnnotationRange.metadata` so click handlers can read it back out. No new C# work required.

### B. CI test reorganization

**Files removed:**

- `e2e-tests/tests/smoke/enhanced-resources-render.spec.ts`

**Files modified:**

- `e2e-tests/playwright.config.ts`:
  ```ts
  projects: [
    { name: 'smoke', testDir: './tests/smoke' },
    { name: 'isolated', testDir: './tests/isolated' },
    {
      name: 'enhanced-resources',
      testDir: './tests/enhanced-resources',
      // Worker-scoped Electron via cdp.fixture.
      // NOT wired into CI - run locally after `./.erb/scripts/refresh.sh`:
      //   npm run test:e2e:enhanced-resources
    },
  ],
  ```
- `package.json`: add `"test:e2e:enhanced-resources": "playwright test --config e2e-tests/playwright.config.ts --project=enhanced-resources"`

**Invariant comment** added to `playwright.config.ts` documenting that every directory under `tests/` must be reachable from at least one project, so a future agent does not re-orphan a directory.

**CI workflow (`test.yml`):** unchanged. Continues to run only `test:e2e:smoke`.

### C. Test activation pass

For each spec under `tests/enhanced-resources/`, replace `test.fixme(` with `test(` for tests blocked on FN-001 / FN-013 / FN-016 / FN-017 / FN-020 (search the `// FN-XXX` comment markers). Run the suite, iterate up to 2 full passes on failures, then either fix or re-fixme with documented reason.

**Stays `test.fixme()` with explicit reason:**

| Test                                             | Reason                                                                      |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| TS-076 (rbnReviewStatus)                         | `// FIXME(GAP-pre-release-fixture)` - ESV16UK+ does not surface this ribbon |
| TS-052, TS-077 (rbnUpdateRequiredData)           | `// FIXME(GAP-update-fixture)`                                              |
| Missing-book empty pane test                     | `// FIXME(GAP-missing-book-fixture)` - ESV16UK+ has all books               |
| TS-045 force-new-window                          | `// FIXME(GAP-009)` - menu item not contributed                             |
| TS-061 MarbleGuide auto-show                     | `// FIXME(GAP-guide-reset)` - per-test extension-host reset hook missing    |
| FN-024 tab-bar @container collapse               | `// FIXME(GAP-024)` - container-type missing on parent                      |
| TS-053 BCV control external-reference reflection | Conditional - if Editorial integration doesn't expose this directly         |

### D. Build cleanup

- Add a paragraph to `.context/features/enhanced-resources/implementation/post-phase-3-followups.md` documenting the webpack cache warning as benign with a link to webpack issue #16439

### Out of scope (already deferred elsewhere)

- GAP-001 real resource picker (we keep the ESV16UK+ hardcode)
- GAP-003 Spanish localization bulk pass
- Backend exposures (GAP-014/015/016)
- Polish PRs (GAP-010/011/018/019/020)

These remain documented in `post-phase-3-followups.md`.

## Sequencing

1. **A. Scripture pane swap** - largest unit; unblocks most tests. Verify build clean and app shows real scripture content before continuing.
2. **C. Test activation** - run `npm run test:e2e:enhanced-resources`, iterate up to 2 passes, document deferred tests.
3. **D. Build cleanup** - one-paragraph documentation.
4. **B. CI test reorg** - pure config; can land first or last with no dependencies.

## Verification

**Pre-merge (local):**

1. `npm run build` exits 0; webpack cache warning is the only ER-related output.
2. `npm test -- platform-enhanced-resources` and `cd c-sharp-tests && dotnet test --filter EnhancedResources` both green.
3. `./.erb/scripts/refresh.sh` then open Platform menu → Open Enhanced Resource:
   - Scripture pane shows real verse text from ESV16UK+ (not annotation IDs)
   - Clicking a wg-annotated word activates the filter and dictionary detail
   - Encyclopedia / Media / Maps tabs populate
   - Capture screenshots under `proofs/` for the PR
4. `npm run test:e2e:enhanced-resources` against the running app; ~50 active tests pass; remaining `test.fixme()` is documented.
5. `npm run test:e2e:smoke` passes locally (the deleted ER smoke test was the only failing one).

**Post-merge (CI):**

6. PR-2230's three failed builds (Linux/Windows/macOS) pass.
7. CodeQL re-runs.

## Risks and mitigations

| Risk                                                                       | Likelihood | Mitigation                                                                                                   |
| -------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| Editorial doesn't expose annotation click metadata in the shape we need    | Medium     | Wrap Editorial in a delegated event listener reading `data-annotation-id` from the DOM target                |
| USJ from marble converter has structural surprises Editorial rejects       | Medium     | Test against ESV16UK+ John 1 before swapping; the marble-aware USX→USJ converter already produces parsed USJ |
| Editorial requires a USJ document-level wrapper we don't currently produce | Low        | Mirror what `platform-scripture-editor.web-view.tsx` does (lines 1199-1543)                                  |
| Activated tests reveal real wiring gaps                                    | High       | Iteration budget absorbs this; worst case re-fixme with documented reason                                    |
| Editorial CSS leaks into ER's tailwind theme                               | Low        | Editorial ships scoped CSS via `index.css`; verify import order                                              |

**Failure budget:** if the Editorial integration surfaces a real bug not fixable in ~2 iteration cycles, stop the activation pass (Section C), revert just that section, and ship A+B+D with the original `test.fixme()` set intact. The headline win (real scripture content + CI passing) lands either way.
