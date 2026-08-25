# PR Review Report: PR #2692

**Repository**: paranext/paranext-core
**PR**: PT-3216: Pass the editor tab-menu selection to Find
**Author**: katherinejensen00
**Date**: 2026-08-24
**Reviewed by**: Claude AI (via `/review-pr`) for jolierabideau
**Event**: COMMENT (no blocking findings)
**Reviewers**: security, scope, tests, clarity (no C# files → contracts and architecture dropped)

---

## Your Original Feedback — Status

| # | Blocker | Status |
|---|---------|--------|
| 1 | Editor Ctrl+F lost its trim | ✅ **Fixed** — `resolveFindSelectionText` now called from `useOpenFindShortcut`, test added |
| 2 | Branch behind its base / 15 commits in diff | ✅ **Fixed** — Rebased onto `main`, squashed to one commit |
| 3 | Premise behind snapshot never executed in real app | ⚠️ **Partially addressed** — Confirmed on a stand-in Chromium page; PR explicitly asks you to run the 2-minute manual test |

**PR is `mergeable_state: dirty`** — branch may have drifted from `main` again since the rebase.

---

## New Review Panel Summary

| Perspective | Blocking | Warning | Suggestion |
|-------------|----------|---------|------------|
| Security    | 0        | 0       | 2          |
| Scope       | 0        | 3       | 3          |
| Tests       | 0        | 1       | 5          |
| Clarity     | 0        | 1       | 4          |
| **Total**   | **0**    | **5**   | **14**     |

---

## Warnings (need decisions)

### [Scope] Multi-line rejection is a behavior change on the already-shipped Ctrl+F path
**File**: `extensions/src/platform-scripture-editor/src/find-trigger.util.ts` line 13
**Severity**: warning — decision needed

`resolveFindSelectionText` is now called from `useOpenFindShortcut`, which means the multi-line rejection now applies to Ctrl+F across all four scripture tab types (editor, model-text panel, resource-text panel, scripture-text-grid). Previously, Ctrl+A → Ctrl+F would pre-fill the whole selection; now it opens Find empty. This is a behavior change to shipped PT-4341 code that the PR description itself flags as a judgment call: "say the word and I'll drop it." No test exercises the multi-line rejection through `useOpenFindShortcut` (only the trim is covered there), so the change on the Ctrl+F path is unpinned.

**Decision needed**: Should the multi-line rejection apply to the Ctrl+F path (all four tab types), or only to the new tab-menu path?

---

### [Scope] PT-3216 DoD not fully met — "last/focused editor" semantics deferred without explicit ticket
**File**: `.context/standards/Architecture-Decisions.md` line 931
**Severity**: warning — decision needed

The ticket's DoD reads "the text of the **last / focused** selected editor window (be it read-only or not) is passed to the find tab." This PR delivers tab-scoped selection only — the triggering tab's own selection. The cross-tab "last focused editor" case is deferred in ADR-0020 alternative (b) with sound reasoning (every entry point today is tab-scoped). But the deferred scope lives only in the PR description (which disappears at merge) and a note in the ADR.

**Decision needed**: Is PT-3216 being closed by this PR? If so, either amend the DoD or file a follow-up ticket for the cross-tab case before merge.

---

### [Scope] Tailwind v4 selector repair includes a semantic change (`not([role="status"])`)
**File**: `e2e-tests/tests/isolated/find/find-replace.spec.ts` line 56
**Severity**: warning — decision needed

The repair goes beyond a mechanical v3→v4 rename: the new `SEARCH_OUTCOME_MESSAGE_SELECTOR` adds `:not([role="status"])` which excludes the EmptyState placeholder that was previously a false-positive match. This fixes a second latent bug unrelated to PT-3216. The PR description offers to split it. Note that neither the repair nor the new test can run in CI (`test:e2e:isolated` appears in no workflow).

**Decision needed**: Split the Tailwind selector repair into its own PR, or accept it here as a prerequisite for the new test?

---

### [Scope] ADR-0017 vs Find's conditional spreading — contradiction unresolved
**File**: `.context/standards/Architecture-Decisions.md` line 638
**Severity**: suggestion — decision needed

ADR-0017 requires unconditional assignment of launch parameters and explicitly rejects conditional spreading, yet cites `openFind`'s `selectedText` as the pattern it generalizes — while `buildFindWebViewState` conditionally spreads `initialSearchText` (with 3 tests pinning that behavior). This PR adds a second trigger through `selectedText` without resolving the contradiction. The PR description raises it explicitly ("One question raised by the rebase, not acted on"). Leaving it only in the PR description means it disappears at merge.

**Decision needed**: Does ADR-0017 need a carve-out for Find, or does `buildFindWebViewState` need to change? Should this be recorded in the standards file or as a follow-up ticket?

---

### [Tests] `vi.spyOn(window, 'getSelection')` leaks if assertion throws
**File**: `extensions/src/platform-scripture-editor/src/use-open-find-shortcut.hook.test.ts` line 93
**Severity**: warning

`vi.restoreAllMocks()` is called at the end of the test body (not in `afterEach`), so the spy leaks into subsequent tests if any assertion above it throws. This could cause hard-to-diagnose order-dependent failures. Move restore to `afterEach` or configure `restoreMocks: true` in the vitest config.

---

### [Clarity] Backward-facing comment in snapshot hook test
**File**: `extensions/src/platform-scripture-editor/src/use-selection-snapshot.hook.test.ts` line 113
**Severity**: warning

"Without that step the hook would never record anything in the real editor while every element-anchored test here stayed green" narrates a bug found during development. After the PR merges, a future reader learns only that a past test suite was misleadingly green. Per `.claude/rules/code-quality/forward-facing-comments.md`, this belongs in the commit message, not the source.

---

## Suggestions (informational)

**Security**
- `use-selection-snapshot.hook.ts:55` — Anchor-only scope guard: a selection starting inside `.editor-input` but extending to chrome passes the check. Consider validating `focusNode` or `commonAncestorContainer` as well.
- `find-trigger.util.ts:36` — No length cap on selection-derived pre-fill; selections can be interpreted as regex if the user left regex mode on (suggestion-level: impact is limited to the user's own search history).

**Tests**
- `use-open-find-shortcut.hook.test.ts:42` — Headline test uses `expect.any(String)` for the selection arg; would be stronger with a concrete stubbed value like the trimming test does.
- `e2e-tests:324` — E2E selects text with a programmatic Range, not a UI double-click — diverges from E2E testing guidance ("don't skip UI interactions").
- `e2e-tests:366` — Cleanup helper dispatches synthetic `pointerdown` rather than a real click, encodes hook internals into teardown.
- `e2e-tests:56` — Class-name selectors remain brittle; `data-testid` attributes on the counter/result paragraph would survive the next styling change.
- `platform-scripture-editor.web-view.tsx:1953` — No unit test for the new Find branch in `menuCommandHandler`; only covered by the 360-second E2E.

**Clarity**
- Five copies of the same "only menu uses snapshot / Ctrl+F doesn't fall back" rationale — consider keeping full argument in ADR-0020 and reducing code-site copies to pointers.
- `.editor-input` is a magic string repeated in ~4 places; a named constant would make it refactorable.
- `find-trigger.util.ts` TSDoc is scoped to "when Ctrl+F is pressed" but the util now serves both triggers — either route the menu through `getOpenFindTriggerArgs` too or update the doc.
- `'.tw\\:tabular-nums'` inline at 9 sites in the spec; a `RESULTS_COUNTER_SELECTOR` constant would match the style of the already-extracted `SEARCH_OUTCOME_MESSAGE_SELECTOR`.

---

## Should You Approve?

**Not yet** — three things still need to happen:

1. **Your 2-minute manual test** (original blocker #3): the feature has never been exercised in the real app. The author asks you to: (a) select a word → click a toolbar button → open tab menu → Find… → confirm pre-fill; (b) select a word → open tab menu → Find… → confirm pre-fill.

2. **Multi-line rejection decision**: this changes shipped Ctrl+F behavior on four tab types. Katherine offered to drop it — needs an explicit call.

3. **Rebase**: `mergeable_state: dirty`. The branch needs another rebase before merge.

The code is in good shape otherwise — the trim fix is correct and tested, the snapshot hook is well-designed and well-tested in isolation, the ADR is excellent, and no blocking code issues were found.
