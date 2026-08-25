# PR Review Report: PR #2697

**Repository**: paranext/paranext-core
**Title**: PT-4347: Panels never show a premature empty state while resolving
**Author**: captaincrazybro
**Date**: 2026-08-24
**Posted by**: Claude AI (via `/review-pr`)
**Mode**: local report (not yet posted to GitHub)
**Event**: COMMENT (no blocking findings)
**Reviewers**: security, scope, ux, tests, clarity

---

## Your Feedback — Verified Addressed

Both blocking items from @jolierabideau's CHANGES_REQUESTED review are confirmed fixed at head SHA `e6034d01554255c206244f9ac01ddf55d387a4d3`:

| Finding | Status | Verification |
|---------|--------|--------------|
| Stale TSDoc in `panel-readiness-view.component.tsx:10-14` claiming Model Text renders inline | ✅ Fixed | TSDoc now reads "Used by BOTH…" |
| Stale-write race in `useDblResourceCatalog` — `setHasCatalogError` with no currency guard | ✅ Fixed | `fetchGenerationRef` guards both `setHasCatalogError` calls |

All Important and Minor items from your review round are also marked addressed in the PR body. Three open items remain explicitly as "author's call" or deferred tickets.

---

## New Findings Summary

| Perspective  | Blocking | Warning | Suggestion |
|--------------|----------|---------|------------|
| Security     | 0        | 2       | 0          |
| Scope        | 0        | 6       | 4          |
| UX           | 0        | 3       | 4          |
| Tests        | 0        | 2       | 5          |
| Clarity      | 0        | 1       | 2          |
| **Total**    | **0**    | **14**  | **15**     |

---

## Findings Requiring a Decision (would be posted inline)

### Security

#### [Security] `extensions/src/platform-scripture-editor/src/use-effective-resource-reference-list.hook.ts:28` — warning

**Should both `console.error` calls here switch to `logger.error` from `@papi/frontend`?**

This is the only non-test production file in the extension using raw `console.*` — every other module including both new hooks added in this PR use `logger`. Console output from a web view iframe doesn't reach the Platform.Bible log files, so both failure paths (a discarded resource reference and a failed settings subscription) are invisible to log-based diagnosis. The second call at line 127 also uses `${err}` rather than `getErrorMessage(err)`, which can emit `[object Object]` for non-Error rejections.

---

#### [Security] `extensions/src/platform-scripture-editor/src/use-effective-resource-reference-list.hook.ts:57` — warning

**Should the container shape of `projectResourceReferenceList.items` and `userResourceReferenceList.items` be guarded with `Array.isArray` before calling `.filter`?**

The values are guarded against `PlatformError` and `undefined`, but not against a non-array `items` field. These are project settings that arrive from the project file — reachable via send/receive or hand-edited files without passing through `resourceReferenceListValidator` (which only runs on write). A missing or non-array `items` would throw a TypeError inside the `useMemo`, unmounting the React tree with no error boundary — the opposite of the graceful `error` readiness state this PR builds. The item-level code is already defensive; the container shape is the unguarded hop.

---

### Scope

#### [Scope] `extensions/src/platform-scripture-editor/src/panel-readiness-view.component.tsx:82-85` — warning (merged)

**Two related scope questions about the readiness state views:**

1. **AC-4 only partially met**: Three of four front states (`empty`, `error`, `catalogError`) render as centred body text in near-identical containers; only `loading` is distinguishable at a glance. The PR body lists this as "AC-4 is half met (design call)". Is PT-4347 allowed to merge with this AC only partly satisfied?

2. **ADR-0016 compliance**: ADR-0016 ("shadcn `Empty` is the zero-state-with-action primitive") names PT-4347 explicitly and directs that any zero-state needing prompt text + an action (like the `empty` and `catalogError` branches) compose the vendored `Empty` primitive. `PanelReadinessView` hand-rolls a fifth ad-hoc container instead. Is this divergence deliberate? If so, an ADR-0022+ entry should record why per CLAUDE.md's decision-recording rule — and composing `Empty` would also close AC-4 largely for free since it carries an icon/media slot.

---

#### [Scope] `.context/standards/Architecture-Decisions.md:1046` — warning

**Should ADR-0022's Consequences be updated to say `RetryableErrorView` (not `InstallFailedView`)?**

ADR-0022 currently asserts "InstallFailedView keeps its name and its scope." But this PR renames it to `RetryableErrorView` and moves it precisely because it now serves catalog-fetch failures as well as installs. The ADR records the opposite of what shipped.

---

#### [Scope] `extensions/src/platform-scripture-editor/src/resource-panel-readiness.utils.ts:70` — warning

**Is a new user-facing `catalogError` state with a retry control in scope for PT-4347, given the PRD's "Resource download and access → not covered" no-go?**

On main, a rejected catalog fetch fell through to the (wrong but harmless) empty prompt. This PR introduces a distinct failure screen, a retry control that re-drives `platformGetResources.getCachedResources`, and four new localized strings in two locales. The PR body flags it as new behaviour. The ticket itself separates out "PT-4148 and the S/R resource gap" as conflicting with the PRD no-go — this retry sits near that line.

---

#### [Scope] `extensions/src/platform-scripture-editor/src/use-buffered-layout-setting.hook.ts:96` — warning

**Should the `useBufferedLayoutSetting` un-latching change stay in this PR, or be split into its own ticket?**

This is a second, independent defect fix bundled here. It changes the contract of a shared hook — the return tuple gains a third element, and the held value's meaning changes. The blast radius was demonstrated during review when it silently regressed `useTextCollectionSources`. ADR-0022 records the third-tuple-element trap for future consumers. The change is coupled to the readiness fix (without a distinguishable error channel the new `error` status is underivable), but the decision of whether to keep them together is yours.

---

#### [Scope] `extensions/src/platform-scripture-editor/contributions/localizedStrings.json:161` — warning ⚠️

**Has the PT-4339 / NN-5b coordination check with Tom Bogle happened?**

The PR body explicitly states: "Merge should wait on this." PT-4336's NN-5b row calls for this check before finalizing NN-5b/5c loading-message logic because reactive `editable` affects which message is correct — and this PR ships exactly that: new loading and unavailable messages in two locales across both panels. These keys remain unconfirmed against Tom's expected NN-5b/5c design. This item is still open on the PR's checklist at the current SHA.

---

#### [Scope/Tests] `extensions/src/platform-scripture-editor/src/resource-text-panel.web-view.tsx:1` — warning

**Should at least one integration-level test for the Resource panel land in this PR rather than a follow-up ticket?**

The Resource panel is where the bug was originally reported against, but its readiness wiring has no test. `getResourcePanelReadiness` is covered as a pure function and `PanelReadinessView` as a component, but nothing asserts this call site passes the right arguments (notably `configuredCount` from the unfiltered list vs `matchingCount` from `filteredResources` — the exact pair the options object exists to keep straight). The PR notes this as a known gap and proposes filing a ticket.

---

#### [Scope] `.context/standards/Component-Builder-Patterns.md:172` — suggestion

**Should the async-hook-shape convention be a binding repo standard now, or remain ADR-0023 "Proposed" until a third hook exercises it?**

The new standard was established from exactly two instances this PR itself created. It binds all future hooks. CLAUDE.md directs settling conventions into standards, so this is compliant — but it's a broader commitment than a loading-state fix normally carries, decided by the author in a review round.

---

#### [Clarity] `extensions/src/platform-scripture-editor/src/resource-panel-readiness.utils.ts:20` — suggestion

**Should `getResourcePanelReadiness` take the whole `EffectiveResourceReferenceListState` to match the new standard it's adjacent to?**

This PR adds a standard ("Never unpack a union at a boundary") whose wrong example is literally `EffectiveResourceReferenceListState['status']` alongside a separately-passed payload — and `getResourcePanelReadiness` takes exactly that: `listStatus` plus `configuredCount`/`matchingCount` derived from the list. The two artifacts in the same diff teach opposite things. Either the function should take the whole state (or a counting strategy), or the standard should be scoped explicitly to component props so a pure derivation function is clearly out of scope.

---

## Informational Findings (summary only, no inline comment)

### Security
*(none beyond the two above)*

### Scope
- **ADR-0016 stale path** (`.context/standards/Architecture-Decisions.md:599`): cites `install-state-views.component.tsx`, which this PR deletes. `/verify-standards` will flag it. A parenthetical note ("renamed panel-state-views.component.tsx in ADR-0022") would keep the log honest.
- **`useTextCollectionSources` change is in scope**: judged a forced consequence of the `useBufferedLayoutSetting` change, not independent widening. Included correctly.
- **Resource panel test gap** (`resource-text-panel.web-view.tsx:287`): The PR proposes filing a ticket — that is the right resolution.
- **ADR-0022 formatting** (`.context/standards/Architecture-Decisions.md:992`): ADR-0022's heading is missing a blank line from ADR-0021's Source bullet.

### UX
- **Resource selector has no accessible name** (`resource-text-panel.web-view.tsx:125`): The dropdown trigger's label depends on `selectedRef` resolving to a non-empty string; when undefined it's announced as just "button." Add a stable `aria-label`.
- **Failed chapter fetch has no error state** (`model-text-panel.component.tsx:226`): The `.catch` clears `usj` and sets loading to false, leaving the user with a silent empty editor when a chapter fetch fails. Consider a `RetryableErrorView` or at least distinguishing "failed" from "no data."
- **`notFoundState` missing `role="alert"`** (`model-text-panel.component.tsx:375`): The other error views added in this PR (`RetryableErrorView`, `PanelReadinessView`'s error branch) got `role="alert"`. This one didn't, leaving screen-reader users without an announcement when the spinner flips to "could not be found."
- **Live region mount timing** (`panel-state-views.component.tsx:21`): `role="status"` on an element that is mounted together with its text is unreliably announced across screen readers. A persistent live region at the panel root whose text changes between states is more reliable.
- **`aria-label` on generic `div`** (`model-text-panel.component.tsx:504`): The generic role doesn't support naming, so the `aria-label` has no reliable effect. A heading element or `role="heading"` would make it meaningful and avoid the `jsx-a11y/no-noninteractive-tabindex` suppression.
- **"No project selected" has no live region** (`model-text-panel.component.tsx:386`): The deliberate exclusion is invisible from the diff. A short comment or a `role="status"` would make it explicit.
- **`notFoundState` built unconditionally** (`model-text-panel.component.tsx:374`): JSX allocated on every render but used in only two branches. Minor perf nit.

### Tests
- **Test cannot fail for stated reason** (`use-effective-resource-reference-list.hook.test.ts:250`): The `'reports loading when projectId is undefined'` test actually passes because `isLoading: true` fires the loading guard first — `projectId` is never consulted. The assertion is guaranteed by the loading flag, not the undefined projectId.
- **Stale-fetch test should also assert `isCatalogReady`** (`use-dbl-resource-catalog.hook.test.ts:93`): The comment names a three-part outcome; the test only pins `hasCatalogError`. Adding `expect(result.current.isCatalogReady).toBe(false)` closes the gap.
- **Trivial pass-through test** (`use-text-collection-sources.hook.test.ts:388`): Asserts identity of a mock value, caught by TypeScript everywhere anyway.
- **Implementation-mirroring assertion** (`use-buffered-layout-setting.hook.test.ts:91`): `toHaveBeenCalled()` check on `useEvent` — redundant with the behavior assertions two lines later.
- **Structural assertion on `svg`** (`panel-readiness-view.component.test.tsx:43`): Redundant with the `getByRole('status')` assertion; breaks on spinner re-implementation.
- **Over-wide mock** (`use-effective-resource-reference-list.hook.test.ts:27`): Three test files replace all of `platform-bible-react` with a single `useEvent` stub. `model-text-panel.component.test.tsx` already shows the safer `importOriginal()` + override pattern.

### Clarity
- **Backward-facing comments pervasive** (`resource-panel-readiness.utils.ts` and others): Many doc blocks explain how code reached its current state during this PR ("the old bug", "what went wrong", "what the review found"). Apply the strip-the-PR-context test. Affected sites: `resource-panel-readiness.utils.ts:40-44`, `use-dbl-resource-catalog.hook.ts:29-32`, `panel-readiness-view.component.tsx:10-17`, `resource-text-panel.web-view.tsx:557-560`, `use-effective-resource-reference-list.hook.ts:128-130` and `:141-145`, `model-text-panel.component.tsx:162-163`, `:392-395`, `:422-423`, `panel-readiness-view.component.stories.tsx:31-33`.
- **`isLoadingResources` unused by callers** (`use-dbl-resource-catalog.hook.ts:11`): Neither web view reads it; only the hook's own test does. Consider dropping it from the public surface.

---

## Merge Readiness Assessment

**Your two blocking items: ✅ both verified fixed.**

**Hard gate still open**: PT-4339 coordination check with Tom Bogle. The PR explicitly says "Merge should wait on this." Until that check happens, this shouldn't be approved.

**Design calls for you to make before approving:**
1. ADR-0016 / `Empty` primitive compliance — intentional divergence needs an ADR update
2. ADR-0022 contradiction — the rename isn't reflected in the ADR Consequences
3. AC-4 visual distinction — three states look nearly identical, stated acceptance criterion
4. `catalogError` vs PRD no-go boundary — is this new behavior in scope?
5. `useBufferedLayoutSetting` contract change — keep in this PR or split?

Everything else is advisory (UX, tests, clarity improvements that don't block correctness).
