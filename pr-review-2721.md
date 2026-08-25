# Peer review — PR #2721 (PT-4346)

**PR**: [#2721](https://github.com/paranext/paranext-core/pull/2721) · **Author**: Matthew Getgen
· **Branch**: `pt-4346-show-books-from-open-resources` @ `c5ce2b93` · **Base**: `origin/main` @ `1cf0623e`
**Ticket**: [PT-4346](https://paratextstudio.atlassian.net/browse/PT-4346)
**Reviewer**: Jolie Rabideau · **Date**: 2026-08-26 · **Review model**: Claude Opus 5 (1M context)
**Scope reviewed**: 47 files (+6114), ~45 commits. `lib/*/dist/` treated as build artifacts.

Review method: four parallel static analysis passes (API/correctness, style/patterns,
coverage/compliance, UX), a dedicated acceptance-criteria audit, and **hands-on runtime testing** of
the built branch in both interface modes.

---

## Verdict

**Solid, well-tested work that does deliver the feature — but two things need your decision as the
ticket author before merge, and one is a genuine defect.**

The core ask works. I verified it end to end in the running app: in Simple mode with a project
(GTP8, 37 books) and a resource (Sanskrit NT) open, the BCV control shows 37 books by default,
"Show more books" expands to 44 with the 7 extras greyed and announced as "not in this project", and
clicking greyed **Hebrews → 1** navigated the whole window to Hebrews 1:1 with the resource panels
rendering it. `getActiveBookIds` is genuinely no longer the ceiling.

**Blocking-ish, needs your call:**
1. **AC 5 is not met** — a new dim style was invented instead of reusing the range picker's. Your
   ticket called this out as a hard requirement.
2. **AC 1 has an undeclared deviation** — search reaches non-project books even in the default
   collapsed state.

**Genuine defect:** the `aria-controls` on the new toggle points at an id that never reaches the DOM.

---

## Runtime verification (what I actually did)

Built and ran the branch on macOS; the build left the working tree **clean**, which independently
confirms the committed `dist/` artifacts match their sources.

| # | Test | Result |
|---|---|---|
| 1 | Power mode, project + resource open | No toggle, 49 books = project only. **Correct** — hook is deliberately disabled in Power mode |
| 2 | Simple mode, GTP8 active + Sanskrit NT open | 37 books collapsed, **"Show more books" toggle present** |
| 3 | Press "Show more books" | 37 → **44 books**; **7 dimmed** (`opacity: 0.7`), label flips to "Show project books only" |
| 4 | Dimmed row accessible name | `"Hebrews (HEB), not in this project"`, `aria-disabled="false"` |
| 5 | Hover a dimmed row | Tooltip "not in this project" appears |
| 6 | **Click greyed Hebrews → chapter 1** | **Navigated to Hebrews 1:1.** Resource panels render Hebrews; editor shows the existing "This book is not part of this project" empty state. **AC 4 met end-to-end** |
| 7 | Reopen picker while on Hebrews | Opens **pre-expanded** (44, "Show project books only") — the deliberate seed |
| 8 | Collapse while on Hebrews | Hebrews **disappears** from the list (37, absent) — picker no longer contains its own current book |
| 9 | Navigate back to Genesis, reopen | Opens **collapsed** (37, "Show more books") — AC 1 default holds for the normal case |
| 10 | Type "Hebrews" in the **collapsed** state | Jumps straight to **HEB 1:1** + Hebrews' chapter grid — a non-project book reached with the toggle never pressed |
| 11 | Arrow-key onto a dimmed row | `opacity: 1`, **no tooltip**. No visual signal at all that the book is outside the project |

Also confirmed: only one BCV trigger exists in Simple mode; the toggle correctly does **not** render
when there is nothing extra to offer (single project open), and does not render when the active
project is the superset (WEB active with 80 books, TPD open → no toggle).

Test 11 and test 6 are the two most important rows: the feature genuinely works, and the greying
genuinely vanishes for keyboard users.

---

## Acceptance criteria

| AC | Requirement | Verdict |
|---|---|---|
| 1 | Default = project books only, no baseline change | **Partially met** — 2 deviations (below) |
| 2 | "Show all books" control expands the list | **Met** (label shipped as "Show more books") |
| 3 | Non-project books appear greyed in expanded list | **Met** — greyed + tooltip + accessible name |
| 4 | Selecting a greyed book navigates | **Met** — verified live (test 6) |
| 5 | Greyed styling reused from existing range picker, no new style | **NOT MET** |
| 6 | NTH-5b served by the same implementation | **Partially met** — Simple mode only; commentaries unverified |

---

## Findings

### Critical

None. No correctness bug that breaks the feature, no security issue, no data-loss path.

### Important

- [ ] **AC 5 violated: a new greyed style was invented rather than reusing the range picker's.**
      `book-item.component.tsx:149` dims with `tw:opacity-70 tw:data-selected:opacity-100`. The
      existing dimmed-but-selectable treatment — the one your ticket points at — lives in
      `numbered-item-grid.component.tsx:69` as `tw:bg-muted/50 tw:text-muted-foreground/50`, is
      reached from the range picker via `chapter-grid.component.tsx:44` / `verse-grid.component.tsx:51`,
      and is **untouched by this PR**. `grep opacity-70` finds it nowhere else in the repo, so this is
      a third dim vocabulary alongside `opacity-40` (grid disabled), `opacity-50` (BookItem disabled),
      and the muted-token pair. Two independent analysis passes flagged this. Inside one popover,
      chapter/verse cells now grey via muted tokens while book rows grey via raw opacity.
      The author documented a real rationale (`book-item.component.tsx:141-148`): the book-id span
      already carries `text-muted-foreground`, so tinting text alone half-dims the row. That is a
      legitimate problem for a two-span row versus a single-digit cell — but the resolution is
      **your** call, not a unilateral one. Note the repo has already learned this lesson once:
      `book-grid.component.tsx:135,143` records that an `opacity-50`-only treatment was "nearly
      indistinguishable" and was replaced with `tw:bg-muted/40 tw:text-muted-foreground/70`.
      → Either amend the AC with the two-span rationale on record, or unify (e.g. a shared dimmed
      token both `NumberedItemGrid` and `BookItem` consume) so a third dim level doesn't accrete.

- [ ] **The greying disappears exactly when the user is on the row — keyboard users get no signal.**
      Verified live (test 11): `tw:data-selected:opacity-100` removes the dim from the highlighted
      row, and the reason is only reachable via a hover tooltip. cmdk items are never DOM-focused
      (the input keeps focus; highlighting is `data-selected`), so Radix's focus trigger never fires.
      Arrowing onto "James (JAS), not in this project" renders it at **full contrast with no
      tooltip**. Screen-reader users get the reason via `aria-label`; sighted keyboard users get
      nothing. Fixing the finding above with the muted-token approach on the *text* would also fix
      this, since it survives `data-selected`.

- [ ] **`aria-controls` on the new toggle is dead and dangling.** `book-chapter-control.component.tsx:1285`
      sets `aria-controls={bookListId}`, but `CommandList` forwards props to cmdk's `Command.List`,
      which builds its element as `createElement(Primitive.div, {ref, ...userProps, ..., id: listId})`
      — `id` is set **after** the user-prop spread, so `id={bookListId}` is overridden by cmdk's own
      id. Net effect: `useId()`/`bookListId` are dead code and the button carries an `aria-controls`
      that resolves to nothing (invalid ARIA). No test covers the linkage, which is why CI is green.
      Separately, the toggle can render while `isCommandListHidden` is `true` (quick-nav pressed,
      `viewMode` still `'books'`), pointing at an unmounted id and offering to expand a list that
      isn't on screen. → Drop `aria-controls`, or put the id on a wrapper you own and gate the toggle
      on `!isCommandListHidden`.

- [ ] **AC 1 deviation: search spans the widened list even while collapsed.** `filteredBooksByType`
      and `topMatch` use `reachableBooks` unconditionally (`book-chapter-control.component.tsx:190-193,
      206-208`; previously `availableBooks`). Verified live (test 10): typing "Hebrews" in the default
      collapsed state jumps straight to HEB 1:1. Matches are greyed and labelled, so it's defensible
      — arguably desirable — but it is an expansion of the *default* state that AC 1's "no change from
      today's baseline" does not authorize and the UX meeting didn't cover. Needs your explicit
      confirmation rather than shipping silently.

- [ ] **Baseline-project semantics are inverted for the very views this PR teaches to publish.**
      The "project books" baseline is `useProjectSetting(resolvedWebView?.definition.projectId, …)`
      (`platform-bible-toolbar.tsx:144`). For resource panels and the Scripture Text Grid, that
      definition `projectId` is the **container**, not what's on screen — the code says so itself
      (`resource-text-panel.web-view.tsx:361`, `model-text-panel.web-view.tsx`). So when the
      navigation target is a resource panel, the books of the resource actually being read are
      treated as *additional*: hidden by default and labelled "not in this project" when shown, while
      the container project's books are the unqualified list. Please confirm this is deliberate, or
      derive the baseline from the declared project when the target publishes one.

- [ ] **Localized fragments are concatenated to build user-facing text.**
      `book-item.component.tsx:136` builds `aria-label={`${baseAriaLabel}, ${dimmedReason}`}`, where
      `dimmedReason` is the standalone localized fragment "not in this project" / "no está en este
      proyecto". `.context/standards/Localization-Guide.md` is explicit that concatenating around a
      localized string "bakes in an assumption about word order and spacing that not every language
      shares" and that the localized string should place the `{placeholder}` itself. Some languages
      need the qualifier before the name, different punctuation, or a case-inflected book name — a
      translator can't fix any of that here. Two passes flagged this independently. → Make it a full
      template (`"{book} is not in this project"`) resolved with `formatReplacementString`. That also
      fixes the tooltip, which currently renders the bare lowercase fragment with no subject, against
      the sentence-case guideline.

- [ ] **The feature ships with no end-to-end coverage, and the E2E was written then deleted.**
      `8bf9a1bb` added `e2e-tests/tests/isolated/bcv-open-resource-books.spec.ts` plus a simple-mode
      sibling and a shared helper; `faa00940` deleted all 533 lines with a one-line message and no
      stated rationale. `git diff $MERGE_BASE -- e2e-tests/` is now empty. The unit layer is genuinely
      strong, but every test there stubs the PAPI boundary — so the one thing no automated test
      exercises is the mechanism this PR introduces: a container web view writing `navigableProjectIds`
      into real web view state and the toolbar reading it back through web-view events. I verified
      that path by hand today; nothing protects it tomorrow. → Restore one isolated spec, or state in
      the PR why it was dropped (flaky? runtime?) so the trade is accepted deliberately.

- [ ] **Reinvented plumbing that already exists in the module it imports from.**
      `use-open-project-book-ids.hook.ts:90-108` rebuilds `onDidOpenWebView` /
      `onDidUpdateWebView` / `onDidCloseWebView` with `getNetworkEvent(EVENT_NAME_ON_DID_*)`, but
      `web-view.service-host.ts:212-218` already exports those three events ready-made — costing
      three extra imports to reproduce. Beyond that, the whole surrounding block
      (`webViewRefreshCounter` + `refreshOpenWebViews` + three `useEvent`s +
      `getAllOpenWebViewDefinitionsSync()` in a try/catch) is a near-verbatim second copy of
      `use-project-picker-data.hook.ts:129-133, 249-277`; `navigation-target.util.ts:62` and
      `auto-sync-edit-block-driver.ts:125` are two more enumeration sites. → Reuse the exported
      events, and ideally extract the refresh-and-enumerate block into one shared
      `use-open-web-view-definitions.hook.ts` both consumers use.

- [ ] **The en/es parity guard only checks `en.json`.** `book-chapter-control-localization.test.ts`
      reads only English. The repo's own precedent guards both arms for exactly this failure mode —
      `sync-status-button.component.test.tsx` has separate `…in en.json` / `…in es.json` tests over
      the same key list, and `localized-strings.test.ts` spells out why ("Nothing in the build
      enforces en/es parity"). The three new keys are in `es.json` today, but nothing stops the next
      one from shipping English-only. Confirmed the test passes with en-only, so this is a coverage
      gap, not a failure.

### Minor

- [ ] `book-chapter-control.utils.ts`: `groupBooksBySection` re-implements the section classification
      `getSectionForBook` (`scripture-util.ts:610`) already owns — which this same component file
      already imports. The two disagree on the Extra test (`Canon.extraBooks().includes` vs
      `Canon.isExtraMaterial`), so they can drift. Logic was moved, not newly written, but it's now a
      named exported helper — the right moment to fold it onto the shared function.
- [ ] The NUL-joined membership fingerprint (`[...ids].sort().join(' ')`) appears in both
      `use-open-project-book-ids.hook.ts:118-122` and `use-publish-navigable-project-ids.hook.ts:41-46`,
      each with its own four-line copy of the same rationale comment (`find.web-view.tsx:237` is a
      third variant). A one-line helper in `platform-bible-utils` would share both the code and the why.
- [ ] ADR-0029's Decision paragraph calls `platform-bible-utils/experimental` "the one place both core
      and extension web views can import a runtime value from" — not accurate; the stable entry point
      is importable from both sides too, and this PR does exactly that (`UnsubscriberAsyncList`,
      `getErrorMessage`). The real reason for the experimental subpath is that the key is unstable.
      Worth rewording so the ADR doesn't record a constraint that doesn't exist. Everything else about
      the entry checks out — appended, correctly numbered 0028 → 0029, all required fields present.
- [ ] Collapsing the list while the current book is outside the project removes the current book from
      the picker (verified, test 8). The open-expanded seed guards the initial open but not this.
- [ ] `navigable-project-ids.utils.ts` exports two functions where one would do —
      `getNavigableProjectIdsToPublish` is called only by its own wrapper (and the tests).
- [ ] Per-caller readiness expressions (`effectiveResourcesState.status === 'ready' && isCatalogReady`,
      etc.) are untested, and that's exactly where a wrong gate would land — the hook's internal gate
      is well covered, the three call sites aren't. Cheap fix: extract each into the existing
      `resource-panel-readiness.utils.ts` and unit-test there.
- [ ] `book-chapter-control-localization.test.ts` sits in `src/renderer/components/` but tests no
      component there, and imports through the committed `dist` — a key added to source but not
      rebuilt would escape the guard. The failure mode is generic to every `*_STRING_KEYS` export.
- [ ] A `TooltipProvider` is instantiated per dimmed row rather than once for the list.
- [ ] The dim is applied to the `CommandItem` inside the testament-colour border wrapper, so the
      coloured OT/NT stripe stays fully saturated beside a dimmed row.
- [ ] The footer toggle vanishes the moment the user types and returns when search clears, shifting
      the popover height mid-interaction.
- [ ] `platform-scripture-editor.web-view.tsx:194-196` comment says "show-all-books" but the keys are
      `showMoreBooks` / `showProjectBooksOnly` — align so it's greppable.
- [ ] `new UnsubscriberAsyncList('Open resource book ids')` still names "resource" after the hook's
      rename to `useOpenProjectBookIds`; the label shows up in runtime logs.
- [ ] `getAdditionalBookIds` is silently ignored when `getActiveBookIds` is absent (TSDoc says so, but
      a caller passing only the former gets the full canon, undimmed, with no diagnostic).

### Scope observations

- **Power mode is excluded** (`platform-bible-toolbar.tsx:170-182`, asserted by
  `platform-bible-toolbar.test.tsx:820-828`). Deliberate, commented, and it saves real cost — but the
  ticket said "global BCV control" with no mode qualifier, and the toolbar BCV renders in both modes.
  Your call to accept as a scope narrowing.
- **Commentary resources unverified.** Your ticket names commentaries explicitly. A project that
  can't report `platformScripture.booksPresent` contributes nothing (logged at debug and dropped,
  `use-open-project-book-ids.hook.ts:169-175`). Whether commentary/enhanced-resource views expose that
  setting isn't determinable from the diff — worth one manual check.
- **The `navigableProjectIds` convention is roughly half the non-generated diff** and exists to serve
  one consumer. It's justified — the Scripture Text Grid is one web view hosting many projects, so
  without it the grid's resources are invisible and NTH-5b is unmet on the main Simple-mode surface —
  but it's a new inter-extension convention arriving with no lint or test guard on *writers*. This is
  the piece to scrutinize hardest, and the piece the author says he can't explain.
- **Drive-by changes worth naming in the PR body**: `"Select Chapter"` → `"Select chapter"` casing on
  two pre-existing labels; `??` → `||` (a consumer deliberately passing an empty string now gets
  English); and `BookItem`'s `aria-label` switching from the English canon name to the localized name
  — which changes accessible names for the public `SelectBooksPicker`/`SelectBooks` scope selector
  too, outside this PR's stated purpose.
- `scroll-group-navigation.commands.ts:97-105` is comment-only, documenting a **deliberate asymmetry**:
  the picker can reach a resource book but next/previous-book commands stay project-scoped. Not
  covered by any AC — confirm intended.

### Template propagation

No shared regions modified, no extension config, build config, CI, or dependency files changed.

---

## Positive observations

- **Forward-facing comments held across ~45 commits of heavy churn.** A scan of every added line for
  `previously` / `used to` / `no longer` / review-finding ids / in-PR ticket ids / stage tags turns up
  nothing. The only `PT-4346` in the diff is the ADR's `Source:` field — the correct home. Every added
  comment states a constraint or rationale rather than narrating the change. This is genuinely hard to
  sustain and it was sustained.
- **The hidden-view rule is satisfied properly**, not perfunctorily: an explicit `// Hidden case:
  intentionally handled by doing nothing special` at the sync site with correct reasoning (data-driven
  web-view-state write, not a geometry read, so it keeps running under `display:none`). Since there's
  no catch-up mechanism, the rule's test clause doesn't apply. Decidable straight from the diff.
- **The transient-empty hazard is named, gated, and tested from both sides** — including "does not
  publish when only the display order changes" and "replaces a persisted value that is not a list of
  ids". These pin the set-semantics and untrusted-read decisions, not just the happy path.
- **Pure logic extracted and directly tested**: `deriveBookChapterControlBookLists` and
  `getNavigableProjectIdsToPublish` are input-only functions, which is what keeps the component and
  hook tests small. ~150 new tests across four workspaces, all green locally.
- **Dimmed ≠ disabled is kept rigorously distinct**: `dimmedReason` never sets `aria-disabled`, never
  blocks `onSelect`, `disabled` takes precedence, and both behaviours are pinned by tests. The greying
  is not a colour-only signal for assistive tech.
- **`isNavigableProjectIds` is used on every read path** rather than trusting persisted state, with
  unit tests including the `null` case. Subscription teardown in `useOpenProjectBookIds` is correct
  against real `UnsubscriberAsyncList` semantics — late unsubscribers land on a sealed list, and the
  `disposed` flag correctly guards only the `setState` calls.
- **The `isEnabled` gate** means Power mode opens no data providers and no subscriptions at all,
  rather than computing and discarding.
- **`dist/` artifacts are reproducible** — a full build on my machine left the tree clean.
- ADR-0029 records the convention with its rejected alternatives and the stale-persisted-state
  consequence, so the next multi-project view can find it.
- Storybook's `WithBooksFromOpenResources` exercises the whole toggle round trip with a `play`
  function, asserting the accessible name and the absence of `aria-disabled` rather than just
  rendering.
- Adding the previously-missing `selectChapter`/`selectVerse` entries fixes keys that were silently
  resolving to code fallbacks; no keyboard handler changed, so no shortcuts-catalog update was owed
  (verified by grep).

---

## CI note

Two failures are red on this branch but **pre-existing**, not caused by it:
`use-remove-character-marker.hook.ts(91,16): Property 'removeCharacterMarker' does not exist on type
'EditorRef'` (typecheck) and the matching `editor-character-marker-contract.test.ts` failure. Neither
file is in the PR's 47 changed files, so this is pre-existing by construction. Worth confirming
they're tracked before merge, since they'll be red in CI regardless.

---

## Suggested agenda for the review meeting

1. **AC 5 — the dim style.** Your requirement, his rationale. Decide: amend the AC, or unify on a
   shared dimmed token. Fixing it via the muted-token route likely also fixes the keyboard-user gap.
2. **AC 1 — search reaching non-project books while collapsed.** Confirm or restrict.
3. **Walk through `navigableProjectIds` end to end** — the author states plainly he can't explain it,
   and it's roughly half the diff plus a new cross-extension convention. Cover: why the definition's
   own `projectId` isn't enough, the readiness gate per call site, the subscription fan-out, and the
   stale-persisted-list consequence.
4. **The container-vs-displayed project baseline** — resource-panel books currently land in the
   "additional, not in this project" bucket.
5. **The deleted E2E specs** — restore one, or record why not.
6. **Power mode exclusion and commentary resources** — accept the narrowing, and manually check a
   commentary.
7. **The dead `aria-controls`** — drop it or anchor it.
8. **The localized-fragment concatenation** — move to a `{book}` template.
