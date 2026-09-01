# Saroj (and Donna) can trust the app: investigation

> **Living document** — Last updated 2026-08-14. Originally frozen 2026-08-13; unfrozen to capture
> post-freeze comment activity (Tom Bogle PRs, Alex/Sebastian NN-4 design dispute, Replace NTHs
> moved to Power PRD). Follow the current files and open PRs for live status.

## 1. What the PRD asks for
*(for: everyone)*

Five clusters of PT10 reliability failures are eroding translators' trust. The most severe is a
destructive Find/Replace that strips USFM markers with no undo; the PRD's stated resolution is to
**block Replace entirely for this appetite** (NN-1d: show feedback that it is not available) and fix
it in a follow-on PRD. The other clusters are a Find tab that doesn't work across all tab types,
toolbar/titlebar items that silently disappear at narrow widths, semi-transparent menus, and
contradictory Send/Receive notifications with no single-click cancel. Appetite: **4 weeks, 1
developer.**

| ID | Non-negotiable |
|---|---|
| NN-1a | Saroj/Donna can use Find on all Scripture texts (model text, commentary, Bible text tabs). **Confirmed: single-source-at-a-time search (one at a time, not simultaneous).** |
| NN-1b | Saroj/Donna see and can select which project/resource Find is running on [PT-3362]. **Mode-specific:** Saroj (Simple) picks from current project + all resources. Donna (Power) picks from all projects + resources via the Power project/resource picker. |
| NN-1c | Saroj sees the Find tab on the 3rd column; calling Find (via Ctrl+F or context menus on existing scripture editors — not via tab menus) brings this tab to the front. **State persistence confirmed:** Find shares column 3 with the Bible texts tab — the workflow is search → switch to Bible texts → switch back to Find. Results survive this switch: rc-dock keeps the Find iframe mounted with `display:none` (never unmounts), so all plain `useState` (results, status, focused index) are intact on return. Search term and options are additionally backed by `useWebViewState` (survive web-view reload). No re-search fires on tab activation. |
| NN-1d | Saroj/Donna always see feedback (results, placeholder, or error) — no silent empty states. **Confirmed: the Find/Replace toggle is removed entirely from the UI** — Replace is not an option until a future PRD makes it safe. No "unavailable" message needed; the tab simply does not exist. |
| NN-1f | Find results are always as expected [PT-3299, PT-3408, PT-3609] |
| NN-2a | Tab toolbar: items shrink/truncate/scroll — never silently disappear at narrow widths. **Specific items confirmed:** paragraph style dropdown shrinks to a minimal size; model text tab title truncates with ellipsis (and becomes non-bold); BCV control in Power mode also shrinks. Earlier designs expected toolbar items to be duplicated in menus so disappearance was acceptable — that approach was abandoned, so shrinking is now required. |
| NN-2b | App titlebar: no controls cut off at min width, controls shrink/truncate [PT-4218] |
| NN-4 | Single truthful S/R or Sync notification at a time; single-click cancel. **Design intent (from PRD comments):** primarily a persistent status indicator — notifications only when user intervention is warranted, not for routine sync progress. |
| NN-5a | Honest availability/loading messages across all tabs [PT-4111, PT-4132, PT-1646]. **Remaining incorrect loading state observed on Bible text tab.** |
| NN-5b | Opening a resource always correctly loads it. **Reproduction confirmed (Roopa):** a model text resource that only has NT books (e.g., `TPN2023` in `<ModelTexts>` in `settings.xml`) shows "Enter some scripture" when BCV navigates to an OT reference. Root cause: the model text panel is rendering the scripture editor's editable empty-state placeholder instead of a "book not available in this resource" message. Not a loading race — a missing-book-in-resource message problem. |
| NN-5c | Saroj can view all content of a read-only project in Simple. **Epic Owner clarification (Sebastian, 2026-08-11):** "Include read-only projects in the list and when selected make them load their resources like editable projects do." Failure mode B (PT-4148, resource deleted from disk — re-download problem) is **out of scope** per the resource-download no-go (§6-Q5, resolved). Failure mode C (S/R resource gap, >5 projects — panels show "No project selected.") is **out of scope** per Sebastian: "Do not fix special loading cases with more than x projects" (§6-Q6, resolved). **In-scope fix:** ensure read-only projects appear in the Simple mode project list and load their resources when selected, identical to editable projects. |
| NN-5d | Saroj can navigate to books that exist in a resource but not in the project (global BCV) |

| ID | Nice-to-have |
|---|---|
| NTH-1a | Find pre-populates from editor selection (PT9 parity) [PT-3216] |
| NTH-1b | Full keyboard navigation of Find UI [PT-4099, PT-4100] |
| NTH-1c | Find gracefully handles books not in project [PT-4089] — **already fixed** |
| NTH-1d | Book list not overflowing [PT-4092] |
| NTH-3 | Opaque readable menus/popovers while scrolling [PT-4101] |
| NTH-5a | Donna offered direct "Manage Books" entry for non-existing books |
| NTH-5b | Non-project resource books show up in BCV control |
| NTH-5c | BCV styling and keyboard fixes [PR #2229] |
| NTH-4a | S/R unexpected message in specific cases [PT-3978] — Epic Owner: include as NTH for NN-4 (2026-08-11) |
| NTH-4b | S/R unexpected message in specific cases [PT-3975] — Epic Owner: include as NTH for NN-4 (2026-08-11) |
| NTH-6 | Locale picker filtered to available translations + restart prompt |

**No-gos:** No new regex or advanced-replace features. No Replace for Saroj or Donna (this appetite). No full responsive/fluid toolbar reflow. Menu rendering only — no menu restructuring. No S/R flow redesign — notification messaging only. No full versification handling, BCV localization, or scrollgroups.

**Replace NTHs deferred to a separate Power PRD (Sebastian, 2026-08-14):** The following Replace-related NTHs are explicitly out of scope for this appetite and must be tracked in a future Power PRD:
1. (Saroj and) Donna can undo a Replace and Replace All — PT-3925
2. A Replace never destroys surrounding USFM markers — no Jira ticket yet
3. (Saroj and) Donna see the Replace UI disabled for a project/resource that is read-only or that they are not allowed to edit — no Jira ticket yet
4. (Saroj and) Donna do not see "Replace" buttons for results in chapters they have no edit permission for; Replace All excludes those chapters and informs the user — no Jira ticket yet

---

## 1.5 Risks and largest work items
*(for: everyone)*

Five items carry most of the risk for this appetite. Ordered by impact on delivery.

---

**~~RISK 1 — NN-1a/1b (WI-4): Scope of simultaneous vs. single-source search~~ — RESOLVED**

Ian confirmed: **single-source-at-a-time**. Find opens from any tab type and a mode-aware selector lets Saroj/Donna choose which source to search — same existing Find engine, different source wiring. WI-4 is firmly **Moderate**. No architectural spike needed. The appetite concern is eliminated.

What remains is the selector design (Saroj: current project + resources; Donna: all via Power picker) and ensuring `openFind` resolves the source from model text and commentary tab types — both tractable.

---

**RISK 2 — NN-4 (WI-8): The S/R work crosses team boundaries and requires a design decision before implementation.**

Three compounding problems:

1. **Design not yet defined:** PRD comments reveal that NN-4 is meant to be a *persistent status indicator* that updates in place, with notifications only when user intervention is needed — not just deduplicated toasts. The current Sonner toast model is fire-and-forget; a persistent indicator is a meaningfully different pattern. Where it lives (toolbar, docked area, etc.) is a product design decision (§6-Q3) that must be answered before implementation can begin. If the chosen design is underestimated, WI-8 grows from Moderate to Complex.

2. **Design feasibility is unverified:** Until §6-Q3 has an answer, it's unclear whether the chosen persistent-indicator design fits inside the appetite. The display-side work lives in paranext-core; the notification emission work lives in PT10 Studio's `SyncProjects` patch (where `cancelSync` and `onSyncStateChanged`/`onSyncProgress` are emitted). Both repos are owned by the same team — implementation spans `~/dev/paratext-10-studio` and `paranext-core` within one sprint, with no coordination cost.

3. **Hidden scope — lifecycle triggers:** `startup-tasks.ts` and `shutdown-tasks.ts` fire S/R at boot and shutdown unconditionally. Any notification fix must account for these lifecycle sources, not just manually triggered syncs. PR #2640 (OPEN as of 2026-08-06) addresses Simple-mode single-project scoping; verify whether it fully covers NN-4 before sizing WI-8.

---

**RISK 3 — NN-2a (WI-6): The toolbar overflow fix touches a shared component used everywhere.**

`TabToolbar` is a shared component in `lib/platform-bible-react` consumed by every tab in the platform and all extensions. Changing its overflow behavior from `overflow-clip` to shrink/scroll affects every toolbar consumer — Simple mode, Power mode, and any extension that contributes toolbar items. The risk is regression: an overflow fix that works for the scripture editor toolbar may clip or wrap unexpectedly in a commentary toolbar or a tools panel.

The PRD comments add specific known items (paragraph dropdown, model text tab title, BCV control in Power) but an implementation that only fixes these named items may leave other consumers broken. **Testing across all toolbar consumers in both modes is required** — this can't be verified by unit tests alone.

---

**~~RISK 4 — Blocking pre-work: PR #2154 must be resolved before Find work begins.~~ — LARGELY RESOLVED**

PR #2154 was re-submitted for re-review on 2026-08-12 with the Replace UI removed (confirmed by Epic Owner Sebastian and implementation owner conversation with Katherine). Once this PR merges, NTH-1a (pre-populate) and NTH-1b/PT-4100 (ResultsCard keyboard) are free — WI-3 shrinks to the book-list overflow CSS change only, and WI-2 can proceed. Monitor the re-review; don't start WI-2 or WI-3 until #2154 merges or is confirmed closed.

---

**RISK 5 — NN-5a/5b/5c (WI-9): Well-understood but multi-component, and NN-5b/5c were previously invisible.**

WI-9 now covers three confirmed bugs in two different components:
- `model-text-panel.component.tsx` merged loading/empty conditional → "No resource selected" before data arrives (NN-5c)
- `platform-scripture-editor.web-view.tsx` `defaultUsj` ambiguity → "Enter some scripture" placeholder on first resource load (NN-5b)
- `resource-text-panel.web-view.tsx` / PT-4111 remaining incorrect loading state on Bible text tab (NN-5a)

Each is Moderate alone. Together, plus new localized strings for each distinct state, WI-9 is the densest single work item by bug count. The good news: all three now have confirmed reproduction scenarios, the root causes are located, and the fixes are local (no architectural decisions needed). The risk is underestimating the total — treat WI-9 as Moderate-to-High, not Simple.

---

## 1.6 In-flight work
*(for: implementation owner — read before touching any file in this PRD)*

| PR | Status (as of 2026-08-06) | Covers | Conflicts with | What to do |
|---|---|---|---|---|
| [PR #2154](https://github.com/paranext/paranext-core/pull/2154) | OPEN, re-submitted 2026-08-12 (Replace UI removed; pending re-review) | NTH-1a (pre-populate Find from selection), NTH-1b PT-4100 (ResultsCard keyboard) | None (conflict resolved by removing Replace UI) | Do not start WI-2 or WI-3 until this merges. Once merged: NTH-1a and NTH-1b are free, WI-3 shrinks to the book-list overflow CSS change only. |
| [PR #2229](https://github.com/paranext/paranext-core/pull/2229) | OPEN, changes requested | NTH-5c — BCV shadcn style fixes + keyboard nav | None | Land this PR before or as part of WI-10. Read the diff before touching BCV components. |
| [PR #2640](https://github.com/paranext/paranext-core/pull/2640) | OPEN | NN-4 (partial) — S/R notification scoping for Simple mode (single-project) | None | Verify whether it fully covers NN-4 or only the scoping aspect before sizing WI-8. See §6-Q4. |
| [PR #2622](https://github.com/paranext/paranext-core/pull/2622) | Merged 2026-07-31 | Sync toolbar fail-open | None (merged) | Read this diff before touching `platform-bible-toolbar.tsx` in WI-6 — it modified the same file. |
| [PR #2425](https://github.com/paranext/paranext-core/pull/2425) | OPEN (Tom Bogle, as of 2026-08-13) | NN-5c (partial) — loads side panels even when active project is read-only | None known | Read this diff before touching model-text or resource-text panel loading logic in WI-9. May eliminate part of WI-9's NN-5c scope; verify before implementing. |
| [paratext-10-studio/pull/171](https://github.com/paranext/paratext-10-studio/pull/171) | Merged (confirmed 2026-08-14) | NTH-4a (PT-3978), NTH-4b (PT-3975) — S/R notification behavior | None known | Read this diff before sizing WI-8's NTH-4a/4b scope. Original test scenarios (Sync button failure cases) may no longer reproduce the same way — re-verify against current build. |

**PR #2154 — Find pre-populate + keyboard fixes (55 files, OPEN — re-submitted 2026-08-12).**
PT-3897. Re-submitted for re-review with the Replace preview UI removed per Epic Owner confirmation and implementation owner coordination with Katherine. Once merged: NTH-1a (pre-populate from editor selection) and NTH-1b/PT-4100 (ResultsCard keyboard nav) are covered. Sebastian confirmed (2026-08-11): "Agree it's good to merge it in for the keyboarding (NTH 1b). With 1e removing replace, these replace improvements will then only be visible in Power, but that is fine." Do not start WI-2 or WI-3 until this merges.

**PR #2229 — BCV shadcn styling and keyboard nav (OPEN).**
NTH-5c. Fixes BCV control keyboard navigation and Tailwind/shadcn styling. No conflict with other work items. Should land before WI-10 so the implementation owner can build on top of it rather than duplicating the same fixes.

**PR #2640 — S/R notification scoping for Simple mode (OPEN).**
NN-4 (partial). Scopes S/R notifications to the single project in focus in Simple mode — prevents notifications from other users' syncs appearing. This is one layer of NN-4 but likely not the full persistent-status-indicator design the PRD comments describe. Verify scope (§6-Q4) before writing WI-8.

**PR #2425 — Side panels load for read-only projects (OPEN, Tom Bogle, as of 2026-08-13).**
NN-5c (partial). Tom Bogle is implementing side-panel loading when the active project is read-only. This directly covers part of WI-9's NN-5c scope ("include read-only projects and make them load resources when selected"). Read the diff before touching model-text or resource-text panel loading in WI-9; it may eliminate the need for some of that work.

**PT-4339 — "Editable" reactive in Scripture editor (Tom Bogle, in progress as of 2026-08-13).**
Tom is making the `editable` state in the Scripture editor fully reactive — it will reflect both whether the project is set to read-only in settings AND whether the current user has a non-Observer role. Not yet a PR. Relevant to WI-9 because the editable/read-only distinction affects which empty-state or loading message is correct to show. Check with Tom before finalizing WI-9's loading-message logic.

---

## 2. What already exists
*(for: engineers — §3 carries the product-owner view)*

### Paratext 9
- **Find:** `FindReplaceForm.cs` is a tabbed dialog (Basic/Multi-Word/Replace/Source Language). Project selector (`cmbProjects`) lists all Scripture-type projects via `LoadAllScripture()` — includes DBL and XmlResource resources, excludes Marble/Enhanced Resources. Selector disabled for Enhanced Resources. Pre-population from editor selection: `uiScriptureEditor.Selection.SelectedText` (trimmed) unconditionally populates three fields across all tabs, overriding persisted search text. Find result list is a *separate* List Window — not inline in the form. No-results state: inline ribbon warning inside the form with three context-sensitive messages (`FindReplaceForm_18/19/20`). Never a silent empty state. Results for a missing book contribute zero results; normal "No matches found" appears.
- **BCV:** Navigation toolbar (`ToolStripVerseControl`) from SIL library (binary only — internals opaque). Book-missing ribbon banner in `TextForm.UpdateRibbonMessages()`: two variants — "Book does not exist in project" with Create/Import links, or "This book used to be part of the project" with Restore/Create/Import links (version-history-aware). Links are permission-gated with tooltip. Navigation does NOT block on missing book — the window loads and shows the ribbon.

### Paratext 10 — what already works today
- **Find engine:** Full Find/Replace web view at `extensions/src/platform-scripture/src/find.web-view.tsx` (~1200 lines) wired to a single `projectId` PDP. Presentational `find.component.tsx` already handles no-results, error, progress-bar, and structure-protected feedback states. Replace tab is gated by PDPE at lines 749–767 (Simple-mode restriction exists). `openFind` command (`main.ts:276`) opens to the `direction: 'right'` panel.
- **NTH-1c (PT-4089) — ALREADY FIXED:** `platform-scripture-finder-pdpe.model.ts:57` skips books absent from the project. No work needed.
- **Toolbar:** `TabToolbar`/`TabToolbarContainer` components exist in `lib/platform-bible-react` but use `overflow-clip` on all zones — the root of the NN-2a silent-disappearance bug.
- **Menu opacity (NTH-3):** Root cause is glassmorphism CSS — `tw:bg-popover/70 tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150` — in four shadcn components: `dropdown-menu.tsx:128`, `menubar.tsx:113`, `select.tsx:107`, `context-menu.tsx:73,151`. Pure CSS fix.
- **S/R infrastructure:** `PlatformNotification` model, Sonner-based toast display, `cancelSync` command, `onSyncStateChanged`/`onSyncProgress` events all wired. Single-click cancel pattern established in `sync-blocked-banner.component.tsx`. PR #2640 (OPEN) addresses Simple-mode single-project scoping.
- **BCV:** `BookChapterControl.getActiveBookIds` driven by `booksPresent` of current project only (blocks NN-5d). Model text and resource text panels have loading/empty states but with a merged conditional bug (PT-4132) and no empty-book detection in the scripture editor (PT-1646).
- **In-flight PRs:** see §1.6 for the full table and descriptions. Summary: PR #2154 (OPEN) gives NTH-1a + NTH-1b free if landed with Replace UI removed — conflicts with NN-1d; resolve §6-Q2 first. PR #2229 (OPEN) covers NTH-5c — land before WI-10. PR #2640 (OPEN) covers NN-4 partially — verify scope before WI-8. PR #2622 (merged 2026-07-31) touched `platform-bible-toolbar.tsx` — read before WI-6.

### Reusable as-is
`find.component.tsx` (full presentational UI), `ProjectSelector` component (for NN-1b selector), `sync-blocked-banner.component.tsx` (cancel pattern), PDPE Replace gate (lines 749–767), notification infrastructure.

### Needs building / changing
Multi-source Find wiring (`find.web-view.tsx` single-`projectId` assumption), toolbar overflow behavior, S/R persistent status indicator (paranext-core display + PT10 Studio emission — same team, `~/dev/paratext-10-studio`), BCV cross-resource navigation, BCV loading messages, Replace disabled feedback.

---

## 3. New in Paratext 10 — confirm these are intentional
*(for: product owner)*

| PRD item | What Paratext 9 actually does | Intentional? |
|---|---|---|
| NN-1a: "Find on all Scripture texts incl. model text, commentary, Bible text tabs" | PT9 Find is always single-project-at-a-time. There is no simultaneous multi-source search. Find opened from a resource searches that resource; the selector then lets the user switch to another project, one at a time. | **Confirmed intentional (§6-Q1 resolved):** NN-1a means "Find works when opened from any tab type" — single-source-at-a-time, PT9-parity. WI-4 is Moderate. |
| NN-1b: "project/resource selector" | PT9's selector is single-selection (one project at a time), Scripture-type + DBL + XmlResource, disabled for Marble. The selector is hidden inside "More >>" — not top-level. | Confirmed as intentional difference: PT10 should surface the selector prominently (not hidden). Scope of "resource" needs definition — does it include non-Scripture resources (commentaries, Bible texts) that PT9 excluded? |
| NN-1c: "Find tab on 3rd column" | PT9 Find is a floating dialog, not a column panel. | PT10's `openFind` opens Find to the `direction: 'right'` of the calling editor. The canonical Simple-mode layout (`simple-layout.data.ts`) has no Find tab in column 3 — Find is an on-demand overlay panel. **Needs confirmation (§6-Q2):** Does "3rd column" mean the right-side Resources & Tools panel, or a new persistent slot? |
| NN-1d: Replace blocked with feedback | PT9 never blocks Replace entirely — it disables the Replace tab only when the project is not editable. | Intentional new behavior: Replace is blocked for all users in this appetite. The PDPE already blocks it in Simple mode; NN-1d requires surfacing a message explaining why. The in-flight PR #2154 (Replace preview) conflicts — **needs coordination (§6-Q3)**. |
| NN-5a: consistent messages across all tabs | PT9's book-missing ribbon is per-window and context-sensitive (version history, permissions). | PT10 has simpler states. The intent to surface loading vs. missing vs. empty as distinct states is an intentional UX improvement. The PT9 message strings (exact text in §2) are reference points for PT10 localized equivalents. |
| NN-5d: navigate to resource books absent from project | PT9 has no equivalent: each window navigates independently; there is no concept of "the resource has Genesis but my project doesn't." | Net-new. Requires `BookChapterControl.getActiveBookIds` to union current project + open resources. |

---

## 4. Proposed work items
*(for: epic lead + engineers)*

> **Appetite note:** §6-Q1 resolved — NN-1a means "Find works from any tab type, one source at a time." WI-4 is **Moderate** and the full NN list fits the 4-week budget.

| # | Work item | Repo | Complexity | Depends on | Covers |
|---|---|---|---|---|---|
| WI-1 | Fix three Find result accuracy bugs: multi-space collapse (PT-3408), GLO preview (PT-3299), Unicode normalization (PT-3609) | paranext-core | Moderate | — | NN-1f |
| WI-2 | Find tab: always-feedback states + Replace-disabled message (NN-1d) | paranext-core | Moderate | — | NN-1d |
| WI-3 | Find tab: pre-populate from editor selection + book list overflow fix | paranext-core | Simple | — | NTH-1a, NTH-1d |
| WI-4 | Find tab: open from any Scripture tab type + project/resource selector | paranext-core | Moderate | — | NN-1a, NN-1b |
| WI-5 | Dock Find tab in Simple layout column 3 + bring-to-front on invoke | paranext-core | Simple | — | NN-1c |
| WI-6 | Tab toolbar + titlebar overflow: shrink/truncate/scroll instead of clip | paranext-core | Moderate | — | NN-2a, NN-2b |
| WI-7 | Menu and popover opacity: remove glassmorphism from 4 shadcn components | paranext-core | Simple | — | NTH-3 |
| WI-8 | S/R: persistent status indicator + notification only when intervention needed + single-click cancel | paranext-core + PT10 Studio | Moderate | Verify PR #2640 scope | NN-4 |
| WI-9 | BCV: honest loading and empty-state messages (PT-4132, PT-1646, NN-5b, NN-5c) | paranext-core | Moderate | — | NN-5a, NN-5b, NN-5c |
| WI-10 | BCV: cross-resource book navigation in global BCV control | paranext-core | Moderate | — | NN-5d |

---

**WI-1 — Fix three Find result accuracy bugs.**
Three independent bugs in the same code area. PT-3408 (`find.utils.ts:199`): whitespace collapsing is gated on `ignoreWhitespaceDifferences` but should always apply — search text with multiple spaces never matches normalized scripture text. Fix: unconditionally collapse runs of whitespace in the regex builder, or always treat multiple search-string spaces as a single-space pattern. Simple part of this work item. PT-3299 (`platform-scripture-finder-pdpe.model.ts:958–970` + `platform-bible-utils` UsjReaderWriter): GLO uses `\k`/`\kt` glossary markers, not `\v` verse markers; `usjDocumentLocationToUsfmVerseRefVerseLocation()` returns incorrect positions for non-verse structure. Requires non-verse book type handling in location mapping. PT-3609 (`find.utils.ts:152–155,242–245` + PDPE:953–956): Unicode normalization form (NFC vs NFD) mismatch when `ignoreDiacritics` is false; word-boundary suppression for CJK characters incorrectly applies globally. Both need auditing against PT9 behavior. Likely touches `platform-bible-utils` for PT-3299. **PT-3609 #4 (new, from live testing 2026-08-13):** text that spans a footnote or inline marker is not found even when the surrounding plain text would otherwise match — same marker-in-path problem as the verse-marker case. Concrete mechanism confirmed (Roopa + Sebastian, 2026-08-13): copy/paste from the scripture editor **expands `\ft` (footnote) markers inline**, so the pasted text contains the full expanded footnote content rather than just the surrounding plain text; this persists even after the user appears to clean up the input. Observed in both Simple and Power modes. **PT-3609 #5 (new, from live testing 2026-08-13):** copy-pasting text from the scripture editor into the Find input may retain invisible characters; after the user strips the visible text down to something that looks like a match, the query still fails because the invisible characters prevent an exact match.

**WI-2 — Find tab: remove Replace toggle + always-feedback in all lifecycle states.**
Two parts:

1. **Remove the Replace toggle entirely.** Ian confirmed: "Find/Replace toggle should be removed, until replace is an option someday in the future." Remove the Replace tab/button from `find.component.tsx` and `find.web-view.tsx` — not just disabled, not a "not available" message, simply absent. The PDPE's existing Simple-mode gate can remain as a backend safety net. Coordinate with PR #2154 before touching this: if #2154 lands first, the Replace toggle may have moved or been refactored.

2. **Always-feedback in all lifecycle states.** `find.component.tsx` already has no-results, error, progress, and structure-protected states. The gaps: feedback is not guaranteed after project switch, mode switch, tab restore, extended idle, or permission change. Audit lifecycle states in `find.web-view.tsx` and add re-fetch/placeholder logic for each case.

**Two new bugs from live testing (2026-08-13, Sebastian):** (a) Clearing the search input does not clear the results list — stale results remain visible. (b) Typing new search text does not trigger a fresh search — results stay stale. A `webViewController` timeout error appears in the console (`"Timeout reached when waiting for wait-for-net-obj with details {"id":"webViewController..."} to settle"`) and is likely the root cause of both; may need a new Jira ticket distinct from PT-3609.

**WI-3 — Find tab: pre-populate from editor selection + book list overflow.**
Pre-populate (NTH-1a): PT9 pre-populates three fields unconditionally when selected text is non-empty. In PT10, extend `openFind` (`main.ts:276`) to pass the calling editor's selected text as a web view state prop; read it in `find.web-view.tsx` to pre-fill the search field on mount. Small addition; does not touch the search architecture. Book list overflow (NTH-1d): `ScopeSelector` book list has no `max-height` or scroll; add `tw:max-h-64 tw:overflow-y-auto` to the book list container. One CSS change.

**WI-4 — Find tab: open from any Scripture tab type + mode-specific project/resource selector.**
*Single-source-at-a-time confirmed (§6-Q1 resolved). Selector design:*
- **Saroj (Simple):** picks from current project + all resources using the shared flat-list component from Manage Books / Get Resources, configured without scroll groups, search, or filter (same component, different configuration — Ira/Ian/Sebastian confirmed 2026-08-13). Sebastian is adding a Storybook demo in the "Multiselect project/resources" channel; reference that before building the selector.
- **Donna (Power):** picks from all projects + resources via the existing Power project/resource picker

Extend `openFind` (`main.ts` `openFind`) to resolve the source from model text and commentary tab types (currently only resolves from scripture editor web views). Add a mode-aware source-selector component above the Find UI: Simple variant reuses/renames the existing "Select resources" dialog; Power variant reuses the Power project/resource picker. The selector changes which PDP is queried — same single-source Find engine. Files: `main.ts` `openFind`, `find.web-view-provider.ts`, `find.web-view.tsx`. **Complexity: Moderate.** No architecture spike needed.

**WI-5 — Dock Find tab in Simple layout column 3 + bring-to-front on invoke.**
Confirmed behavior: Find should be docked as a persistent tab in the column 3 Resources & Tools panel in Simple mode, and invoking Find (Ctrl+F, toolbar button, or `openFind` command) should select/front that tab rather than opening a new overlay panel. The canonical Simple layout definition (`simple-layout.data.ts`) currently has no Find slot — update it to add a Find tab to the column 3 panel. `openFind` (`main.ts` `openFind` command) currently opens with `direction: 'right'`; change the behavior to focus the existing docked tab when one exists. Also ensure the bring-to-front path works when Find is hidden behind another column-3 tab (e.g., a Bible texts or commentary panel is active).

**Find results survive tab switching — no extra work needed.** The Bible texts tab shares column 3 with Find; the expected workflow is search → switch to Bible texts → read → switch back. rc-dock keeps the Find iframe mounted with `display:none` — the React component never unmounts, so `results`, `searchStatus`, and `focusedResultIndex` (all plain `useState`) are intact on return. Search term and options are additionally backed by `useWebViewState` (survive web-view reload). The PDPE subscription stays open; no re-subscription fires on tab activation. No extra lifecycle handling is needed for this case.

**WI-6 — Tab toolbar + titlebar overflow.**
`TabToolbar` (`tab-toolbar.component.tsx`) uses `overflow-clip` on all three zones (start, center, end). Replace start-zone clip with a scroll or priority-truncate pattern so items remain accessible at narrow widths. `TabToolbarContainer` (`tab-toolbar-container.component.tsx`) has fixed `h-14`; may need `min-h-14 h-auto` if items need to wrap. This change affects every toolbar consumer in the platform and all extensions — test regressions in both Simple and Power layouts.

**Specific items confirmed by PRD comments that must shrink gracefully:**
- Paragraph style dropdown: shrinks to a minimal icon/abbreviated size
- Model text tab title: truncates with ellipsis, also change from bold to non-bold
- BCV control (Power mode): shrinks (`book-chapter-control.component.tsx` already has `min-w-16 max-w-48 overflow-hidden` — this is the only toolbar item with encoded min/max width bounds)

**Guideline conflict that must be resolved before implementation:**
The Storybook responsiveness spec (`lib/platform-bible-react/src/stories/guidelines/responsiveness.mdx`) says: "Toolbars shrink and finally **hide items** in smaller widths. It is important to always keep the menu button visible." — items that cannot fit go to the menu. But PRD comments explicitly rejected this approach: "The earlier approach of duplicating toolbar items into menus so they could safely disappear was abandoned — items MUST be accessible in the toolbar itself, not fall back to a menu." **WI-6 requires updating the `responsiveness.mdx` guideline to match the new intent** (items shrink/truncate/scroll instead of hide), and the implementation must reconcile with the guideline before the PR can be approved. Sebastian asked Alex to document the new responsiveness principles directly in that file (2026-08-13); check whether Alex has added them before deriving your own values.

**Shrinkability range (Alex Mercado, 2026-08-12):** Alex provided a general design spec for how individual toolbar items should progress as width decreases:
1. icon + full label + details (full size)
2. icon + full label
3. icon + abbreviated label
4. icon button only

This is described as a general range, not fully formalized, and some ambiguity exists (e.g., whether a truncated-label-without-icon step belongs). Use this as the implementation guide per item; confirm edge cases with Alex before finalizing.

**Flex-truncation idiom to follow** (established across `scope-selector.component.tsx`, `project-selector.component.tsx`, `multi-select-combo-box.component.tsx`, `toolbar.component.tsx`): outer wrapper `tw:flex tw:min-w-0`; text span `tw:min-w-0 tw:flex-1 tw:truncate`; icons `tw:shrink-0`. This is the pattern to apply per item.

Note: for the titlebar (NN-2b, PT-4218), `platform-bible-toolbar.tsx` handles `windowControlsOverlayRect` for Windows; ensure controls truncate rather than clip at minimum app width. This file was modified by PR #2622 (merged 2026-07-31) — read that diff before touching it.

**WI-7 — Menu and popover opacity.**
Four shadcn components carry identical glassmorphism: `dropdown-menu.tsx:128`, `menubar.tsx:113`, `select.tsx:107`, `context-menu.tsx:73,151`. Change `tw:bg-popover/70` → `tw:bg-popover` and remove `tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150` from each. Every changed line requires a `// CUSTOM:` marker per the shadcn edit discipline rule. Pure CSS; no logic changes. Covers PT-4101. Nice-to-have — cut first if time is tight, but it's the smallest item on the list.

**WI-8 — S/R: persistent status indicator + intervention-warranted notifications + single-click cancel.**
**Design intent from PRD comments:** NN-4 is primarily a persistent status indicator showing current sync state, with notifications only when user intervention is actually needed — not routine progress toasts. This is a more significant design change than simple deduplication: the current Sonner-based toast model (fire-and-forget) likely needs to evolve toward a persistent, replaceable indicator (e.g., in the toolbar area or a docked status area) that updates in place rather than stacking.

**Implementation spans two repos (same team).** The display-side work (receiving, deduplicating, and rendering the status indicator) lives in paranext-core; the notification emission work (what events PT10 Studio fires and when) lives in `~/dev/paratext-10-studio`'s `SyncProjects` patch. paranext-core's `ParatextProjectSendReceiveService.SyncProjects` is currently a DEBUG stub — real emission is in PT10 Studio. Both are same-team, no coordination cost.

Infrastructure already in paranext-core: `PlatformNotification` model, `cancelSync` command, `onSyncStateChanged`/`onSyncProgress` events, `sync-blocked-banner.component.tsx` (single-click cancel pattern). PR #2640 (OPEN as of 2026-08-06) addresses Simple-mode single-project scoping; verify whether it fully covers NN-4 or only the scoping aspect before sizing this item.

**Tom's S/R performance work (flagged by Ira Hopkinson, 2026-08-11):** Tom Bogle's S/R performance work is in **paratext-10-studio/pull/171** (merged, confirmed 2026-08-14). Tom flagged on 2026-08-13 that this PR probably affects the behavior described in PT-3978 and PT-3975 (NTH-4a/4b), but has not re-tested those scenarios — the original test scenarios rely on the Sync button, which Tom notes may no longer be reliably reproducible. **Before sizing WI-8: read the paratext-10-studio/pull/171 diff, and re-verify whether PT-3978 and PT-3975 still reproduce against the current build.** His changes may also alter what events are emitted or when, affecting the broader notification logic. See also PT-4339 (§1.6) which makes `editable` state reactive following S/R. Critical lifecycle gap: `startup-tasks.ts` and `shutdown-tasks.ts` fire S/R at boot/shutdown unconditionally — any notification fix must account for these lifecycle sources, not just manually triggered syncs. Single-click cancel: `cancelSync(notificationId?)` is wired; confirm it surfaces in the new persistent indicator for all sync variants (manual, auto, boot, shutdown).

**Power vs. Simple split (Epic Owner, 2026-08-11):** Power mode work — add single-click cancel to the existing notification model — can begin immediately, no design dependency. Simple mode work — new persistent indicator design — waits on Alex's design decision (§6-Q3). Consider splitting WI-8 into Power cancel + Simple indicator so Power work doesn't block on the Simple design. If the Simple design is more than a toolbar badge, the Simple portion of WI-8 may grow from Moderate to Complex.

**WI-9 — BCV: honest loading and empty-state messages (covers NN-5a, NN-5b, NN-5c).**
Three confirmed bug paths, but NN-5c now has two distinct failure modes that may require separate work:

NN-5c (Epic Owner clarified 2026-08-11): **include read-only projects in the project list and make them load their resources when selected** — same behavior as editable projects. Failure mode B (PT-4148, resource deleted from disk) and failure mode C (S/R resource gap, >5 projects) are both confirmed out of scope (§6-Q5/Q6 resolved). The `model-text-panel.component.tsx` merged loading conditional (loading and zero-state branches merged — "No resource selected" fires before data finishes loading) still needs fixing for NN-5a/5b; disentangle into separate guards (loading → spinner, loaded+empty → appropriate message).

PT-1646 / NN-5b (`platform-scripture-editor.web-view.tsx` `defaultUsj` path): NT-only model text resource (e.g. `TPN2023` in `<ModelTexts>` in `settings.xml`) shows "Enter some scripture" when BCV navigates to an OT reference. Root cause: `defaultUsj` is used both as the pre-load initial value and as the empty-book fallback; no branch detects "data arrived but this book doesn't exist in the resource." Fix: add a new localized string key for the missing-book-in-resource case and a detection branch that distinguishes `defaultUsj` (still loading) from a returned empty USJ (book absent from resource).

PT-4111 / NN-5a (remaining incorrect loading state on Bible text tab): also in scope; investigate whether the PT-4132 fix resolves it or a separate branch is needed.

**WI-10 — BCV: cross-resource book navigation.**
NN-5d: `BookChapterControl.getActiveBookIds` in `platform-bible-toolbar.tsx:152` currently uses only `platformScripture.booksPresent` of the current project. Expand to union current project books with books present in all open resources (model text, commentary, Bible text panels). Requires a new `additionalBookIds` prop or composite callback in `BookChapterControl`. **Book-list UX direction (Ian, Sp89 PRD — flagged by Ira as applying here):** show project books by default, plus a "show all books" button that expands to the full union — not always-all, not filtered-only. Alex's input on Sp88 specifics is pending; confirm this shape with Alex before implementing the expanded book list. NN-5c ("view all content of read-only project in Simple"): `selectProjectIdsForOpenMode` handles read-only open but the specific failure mode is unlocated — needs reproduction. NTH-5b (resource books in BCV) is served by the same `getActiveBookIds` expansion. NTH-5c (BCV styling/keyboard): land PR #2229 (currently has changes requested). NTH-5a (Manage Books entry for Donna): near `bookNotFoundRegex` in `platform-scripture-editor.web-view.tsx:251`; cut first if time is tight.

---

## 5. Requirement coverage
*(for: everyone)*

| Requirement | Work item(s) | Notes |
|---|---|---|
| NN-1a Find on all Scripture tab types | WI-4 | **Single-source-at-a-time confirmed (§6-Q1 resolved)** — WI-4 is Moderate |
| NN-1b Project/resource selector in Find | WI-4 | Mode-specific selector confirmed (Saroj: project + resources; Donna: all via Power picker) |
| NN-1c Find in 3rd column, brought to front | WI-5 | Confirmed: dock in column 3 of Simple layout; update `simple-layout.data.ts` |
| NN-1d Always show feedback; Replace disabled | WI-2 | PDPE gate exists; UI message and lifecycle states need work |
| NN-1f Find results accuracy (PT-3299, PT-3408, PT-3609) | WI-1 | Three bugs, same code area |
| NN-2a Tab toolbar no silent disappearance | WI-6 | Shared TabToolbar component; affects all consumers |
| NN-2b Titlebar no cutoff (PT-4218) | WI-6 | Same work item; platform-bible-toolbar.tsx recently touched by #2622 |
| NN-4 Single S/R notification + single-click cancel | WI-8 | Spans paranext-core + PT10 Studio (same team, `~/dev/paratext-10-studio`); startup/shutdown lifecycle triggers must be covered; design placement (§6-Q3) blocks accurate sizing |
| NN-5a Honest availability/loading messages | WI-9 | PT-4132 and PT-1646 both in scope |
| NN-5b Opening resource always loads | WI-9 | Reproduction confirmed: empty editor shows "Enter some scripture" on first load. Root cause: `platform-scripture-editor.web-view.tsx` `defaultUsj` path does not distinguish loading from empty-book. In scope for WI-9. |
| NN-5c Read-only project viewable in Simple | WI-9 | **Scope clarified by Epic Owner (2026-08-11).** Fix: include read-only projects in the project list + make them load resources when selected. Failure mode B (PT-4148, deleted resource) and failure mode C (S/R resource gap) are both out of scope. In scope for WI-9. |
| NN-5d Navigate to resource books via global BCV | WI-10 | getActiveBookIds expansion |
| NTH-1a Pre-populate Find from selection | WI-3 | Already implemented in PR #2154 (as of 2026-08-06, open) — if that PR lands first, WI-3 drops this item |
| NTH-1b Keyboard nav in Find (PT-4099, PT-4100) | — | PT-4100 already in PR #2154; PT-4099 (toggle filters) still open. Cut first if #2154 doesn't land. |
| NTH-1c Books not in project no error (PT-4089) | — | **Already fixed** — no work item needed |
| NTH-1d Book list overflow (PT-4092) | WI-3 | One CSS change; include in WI-3 |
| NTH-3 Opaque menus (PT-4101) | WI-7 | 4 shadcn files; Simple; cut first if time is tight — but fastest item on the list |
| NTH-5a Manage Books for Donna | WI-10 | Cut first |
| NTH-5b Resource books in BCV | WI-10 | Served by same getActiveBookIds expansion as NN-5d |
| NTH-5c BCV styling/keyboard (PR #2229) | WI-10 | Land the open PR |
| NTH-4a S/R unexpected message — specific case (PT-3978) | WI-8 | NTH for NN-4 per Epic Owner (2026-08-11). Distinct case from NN-4 — specific unexpected S/R message, not deduplication. Include in WI-8 or as a follow-on if WI-8 is tight. |
| NTH-4b S/R unexpected message — specific case (PT-3975) | WI-8 | NTH for NN-4 per Epic Owner (2026-08-11). Same category as NTH-4a. |
| NTH-6 Locale picker filtering | — | Cut first — localization lifecycle unknown (§7-Q3) |

---

## 6. Questions for the product owner
*(for: product owner)*

**~~Q1 — NN-1a: simultaneous multi-source search, or still single-source-at-a-time?~~ — RESOLVED**
Ian confirmed: **single-source-at-a-time.** "Find on all Scripture texts" means Find can be opened from any tab type and the selector lets Saroj/Donna pick which source to search — one at a time. No simultaneous merge. WI-4 is Moderate. No appetite risk.

**~~Q2 — PR #2154: land, gate the Replace preview portion, or close?~~ — RESOLVED**
PR #2154 re-submitted 2026-08-12 with Replace UI removed. Sebastian confirmed (2026-08-11): "Agree it's good to merge it in for the keyboarding (NTH 1b). With 1e removing replace, these replace improvements will then only be visible in Power." Once merged, NTH-1a and NTH-1b are covered at no cost to this sprint.

**Q3 — NN-4 status indicator: what should it look like and where does it live? (DISPUTED — see Discord)**
Epic Owner clarified scope (2026-08-11): "The core of NN-4 is to have a single notification (or indicator) instead of the current 2 + have it cancellable with a single click." Power mode: keep the existing notification model but add single-click cancel (Power work can start immediately — no design dependency). Simple mode: design is contested — see timeline below.

Alex proposed a persistent "Sync pill" (2026-08-11): a graphical status indicator with small status text covering 7 states (Syncing, Sync conflict, Connection problem, Unsaved changes, Unsynced changes, All synced), each with a lucide icon. Sebastian responded (2026-08-12) that "a redesign was not the intended scope" and asked about appetite. Alex pushed back (2026-08-12) that the pill was the original design, not a redesign. Sebastian redirected the discussion to Discord (2026-08-13): `discord.com/channels/892072317436448768/1530196692568113172/1536782957602148422`.

**Before sizing or starting Simple-mode WI-8 work, read that Discord thread.** The design question is unresolved as of 2026-08-14. WI-8 can be split: Power single-click cancel can begin; Simple indicator work waits for Discord resolution.

**Q7 — NN-1f: is searching for USFM markers themselves (e.g., `\p`, `\s1`) in scope? (NEW — 2026-08-14)**
Testing on 2026-08-13 confirmed: searching for marker text in Find is not currently supported in PT10. Sebastian verified this on the current version; earlier versions could not be tested (no projects/resources loaded). Roopa's earlier belief that she'd seen `\p` searches work was a misremembrance — it was a Replace demo, not a Find. PT9 allowed partial marker searching (e.g., "s1" worked; "\s1" did not). NN-1f ("Find results are always as expected") currently covers PT-3299, PT-3408, and PT-3609 (result accuracy for plain-text searches). **Confirm: does NN-1f also require that users can search for marker text itself? If yes, this is new scope for WI-1. If no, it is a no-go and should be noted explicitly.** (Relevant Discord thread: `[Sp 87] Saroj (and Donna) smooth…` in `teamwide-epic-discussions`.)

**~~Q6 — NN-5c failure mode C: should S/R download associated resources (not just projects), and is that in scope here?~~ — RESOLVED**
Epic Owner clarified (2026-08-11): "Do not fix special loading cases with more than x projects." The S/R resource gap (>5 projects, resources not synced) is out of scope. NN-5c scope is: include read-only projects in the project list and make them load their resources when selected — same as editable projects.

**~~Q5 — NN-5c: is PT-4148 (resource re-download after deletion) in scope, given the resource-download no-go?~~ — RESOLVED**
Out of scope per the no-go ("Resource download and access → not covered"), confirmed by Epic Owner clarification (2026-08-11). Escalate PT-4148 to the resource-download PRD.

**~~Q4 — NN-4 S/R ownership: PT10 Studio work included or just paranext-core wiring?~~ — RESOLVED**
Both repos (paranext-core and PT10 Studio at `~/dev/paratext-10-studio`) are owned by the same team — no coordination cost. The PT10 Studio notification emission work is fully in scope. PR #2640 (OPEN as of 2026-08-06) covers Simple-mode single-project scoping; verify whether it fully addresses NN-4 or leaves a gap before sizing WI-8.

---

## 7. Engineering decisions
*(for: epic lead / implementation owner)*

**~~E1 — Multi-source Find architecture~~ — RESOLVED (§6-Q1 confirmed single-source-at-a-time).**
WI-4 stays with the existing single-PDP Find engine; the mode-aware selector simply changes which PDP is queried. No architectural spike needed.

**~~E2 — NN-5b and NN-5c need reproduction before classification~~ — RESOLVED.**
Both are now anchored to code and have confirmed reproduction scenarios (see §1 NN-5b/5c and WI-9). NN-5b: `platform-scripture-editor.web-view.tsx` `defaultUsj` path — missing-book-in-resource shows "Enter some scripture" instead of a resource-availability message. NN-5c: `model-text-panel.component.tsx` merged loading/empty conditional. Both are Moderate; no separate work items needed beyond WI-9.

**E3 — NTH-6 locale picker restart prompt: is a restart actually required?**
Changing `platform.interfaceLanguage` may be hot-reloadable (no restart needed). If it is, the restart prompt in the PRD is unnecessary. Confirm with the localization team before implementing NTH-6.

**E4 — PR coordination and sequencing before starting.**
Resolve §6-Q2 (PR #2154 disposition) first — if #2154 lands before this PRD's work, NTH-1a and NTH-1b come for free and WI-3 shrinks. Then coordinate with owners of open PRs before touching their files: PR #2640 (S/R scoping, same notification area as WI-8), PR #2622 (toolbar/Sync button, merged 2026-07-31, same file as WI-6). Read each diff before working in those areas.
