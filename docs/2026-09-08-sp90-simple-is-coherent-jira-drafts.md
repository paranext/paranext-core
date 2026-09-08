# Sprint 90 — "Simple is coherent for Saroj": Jira drafts

**Status: DRAFT — nothing created in Jira yet.** Review, then migrate.

Source brief: `.context/research/investigations/simple-is-coherent-for-saroj/brief.md`
Shape modelled on: [PT-4336](https://paratextstudio.atlassian.net/browse/PT-4336) (Combined + Sub-tasks, Open Questions, non-negotiables table) and [PT-4419](https://paratextstudio.atlassian.net/browse/PT-4419) (NN → sub-task grouping, lanes/dependency chart).

**Verification basis (rev3 of this draft, 8 Sep 2026).** Every `file:line` citation below was re-checked against **`origin/main`** in both repos, not against a local branch:

- `paranext-core` `origin/main` = **`b921a4f59e6`**. This moved twice during drafting: #2529 "Integrate get resources into Home" and #2765 landed first, then **#2768 (PT-4466) merged at 16:01 on 8 Sep**. #2768 matters more than the others — it rebuilt **all five committed `dist/` artifacts**, created `paragraph-style-trigger.component.tsx` and `paragraph-style-label.component.tsx`, edited `book-chapter-control.component.tsx`, `simple-layout.data.ts`/`.test.ts` and `platform-scripture-editor.web-view.tsx`, and **deleted** `marker-slot-width.test.ts`. **Baselines for WI-7, WI-9, WI-12, WI-13, WI-14, WI-16 and WI-22 all moved, and every cluster branch must rebase before the merge queue means anything.**
- `eten-tech-foundation/scripture-editors` `origin/main` = **`ebf47d0b`** (#538 "Add read-only block-verse view mode" is the tip).
- Issue types confirmed live in project PT: **Combined** (id 10219, hierarchy 0) and **Sub-task** (id 10035).
- The open-PR sweep was redone with `gh api --paginate` over all **154** currently-open PRs (3,537 file rows), on the `b921a4f59e6` baseline. `gh pr view --json files` must not be used for this: it **silently caps at 100 files**, which is why #2340 (407 files) was invisible to the first attempt.
- **Contention counts are reported two ways** — raw, and _substantive_ (excluding dependabot, drafts, and PRs whose only match is a Storybook `.stories.` file). Earlier revs quoted raw counts and used them to grade startability, which overstated contention badly in both directions.

**On estimates:** per `/prd-to-jira` there are **no per-item estimates, sizes or complexity labels** in any sub-task. The parent quotes the **PRD's own appetite** (dev-days), matching PT-4336's Appetite section — that is PRD context, not an engineering estimate.

> **Revision history.** This document was red-teamed twice. Pass 1 found that six ticket premises were wrong or inverted (inherited from the brief, which is **not** authoritative — it wrongly called `platform.selectProject` product-dead), that the pbr cluster plan did not hold, and that the PR sweep was methodologically unsound. Pass 2 found that three of rev2's _fixes_ were themselves wrong. Rev3 re-derives every disputed claim from code rather than from a review report.
>
> **Forward-facing only.** The revision diff is not carried into the tickets: per `.claude/rules/code-quality/forward-facing-comments.md`, "an earlier draft said X" is provenance an engineer opening the ticket cold has never needed. What the tickets keep is what points forward — **provisional-scope banners**, explicit **"do not do X"** warnings where the wrong path is attractive, and **recorded measurements** a future reporter would otherwise re-derive.

---

## Recommendation: one parent for both halves

**Agreed — one Combined parent covering both Ian's and Todd's PRDs.** Reasons:

1. **One engineering team, one sprint.** The brief's §4a plan is a single five-lane staffing plan sized to ~4.5–5 developers over one two-week sprint for the combined 6-week appetite. Split across two parents, no issue owns that plan.
2. **The lanes cut across the split.** L1/L2/L3 are all-Todd, L4 is all-Ian, but **L5 is mixed** (Ian NN-1 comments + Ian NTH-4 themes + the shared BCV hover item). A per-PRD parent cannot express L5.
3. **The `platform-bible-react` land order is one serialized queue** (clusters C → A → B) spanning both halves. `lib/platform-bible-react/dist/` is committed, so any two pbr branches conflict regardless of source files. That merge order is the single highest-risk coordination artifact in the sprint and needs one home.
4. **There is a genuine cross-PRD duplicate that must be built once** — shortname-first is IAN-NN-2.4 (non-negotiable) ≡ TODD-NTH-3.1 (nice-to-have), and Ian's rev2 cross-references Todd's item by name. One ticket, two priorities: only a shared parent makes that visible.
5. **`assets/localization/en.json` (+5 locales) is a second chokepoint** touched by L1, L3, L4 and L5 — again, cross-half.

Each sub-task states its PRD half (Ian or Todd) and the NN/NTH IDs it serves, so per-PO reporting stays possible with a JQL filter on the half. Suggested label set on the parent: `sp90-simple-coherent`.

---

## Open-PR duplication analysis

Redone with `gh api --paginate` over all **154** open PRs (3,560 file rows) — see the verification note above for why the first pass was unsound. Method per `.claude/rules/grep-safety-net.md`: a deterministic grep of each work item's file surface over the complete corpus, with **every hit a mandatory candidate** that is either carried below or dismissed as a false positive. Findings are tagged **[grep]** (surfaced deterministically) or **[judgment]** (reasoned from a ticket's file list).

### Review states

| PR    | Review state          | Mergeable       | Created        | Note                                         |
| :---- | :-------------------- | :-------------- | :------------- | :------------------------------------------- |
| #2750 | **APPROVED**          | **CONFLICTING** | 2026-09-01     | Needs a rebase, not a review                 |
| #2229 | **CHANGES_REQUESTED** | CONFLICTING     | **2026-04-27** | Two outstanding change requests, no approval |
| #2761 | **APPROVED**          | **MERGEABLE**   | 2026-09-02     | Landable now                                 |
| #2577 | **APPROVED**          | **MERGEABLE**   | 2026-07-20     | Landable now — matters for WI-15             |
| #2746 | **CHANGES_REQUESTED** | MERGEABLE       | 2026-09-01     | —                                            |
| #2673 | REVIEW_REQUIRED       | CONFLICTING     | 2026-08-13     | Not landing unattended                       |
| #2674 | REVIEW_REQUIRED       | CONFLICTING     | 2026-08-13     | —                                            |

Of the 27 open PRs these tickets depend on or collide with, **18 are `CONFLICTING`** and **5 are drafts** (#2422, #2653, #2614, #2389, #2440). A draft is not a blocker; treat it as notice.

### Contention by surface — raw vs substantive

_Substantive_ excludes dependabot PRs, drafts, and PRs whose only match on the surface is a Storybook `.stories.` file. Only the substantive column should inform startability.

| Surface                                                             | Raw | **Substantive** | The substantive PRs                                           |
| :------------------------------------------------------------------ | :-- | :-------------- | :------------------------------------------------------------ |
| `advanced/menus/` + `menus.model.ts` + `keyboard-shortcuts.data.ts` | 6   | **0**           | —                                                             |
| `advanced/comment-list/` + `comment-editor/` (components)           | 4   | **1**           | #2211                                                         |
| `platform-bible-react/src/index.css` + shadcn radio/toggle          | 4   | **2**           | #2191, #2324                                                  |
| Dictionary + supplement + simple-layout                             | 6   | **3**           | #2324, #2632, #2758                                           |
| `contributions/menus.json` + `menu.data.json`                       | 7   | **4**           | #2211, #2340, #2632, #2752                                    |
| `book-chapter-control/`                                             | 10  | **5**           | #2229, #2239, #2340, #2694, #2750                             |
| Editor + marker surface                                             | 12  | **7**           | #1896, #2340, #2577, #2717, #2745, #2761, #2775               |
| Grid + scroll                                                       | 12  | **7**           | #2340, #2632, #2736, #2744, #2745, #2748, #2774               |
| `resource-picker*`                                                  | 6   | **6**           | #2275, #2282, #2291, #2349, #2746, #2774                      |
| Pickers (project-selector + toolbar + settings-sidebar)             | 17  | **9**           | #2294, #2340, #2632, #2672, #2673, #2674, #2675, #2742, #2750 |

**Two startability gradings change as a result:**

- **WI-3′ has zero substantive contenders.** All six raw hits are dependabot, drafts, or Storybook-only. It is genuinely startable on day one.
- **WI-19′ has one** (#2211, per-view zoom, touching `legacy-comment-manager/comment-list.web-view.tsx`). #2191's real overlap with this epic is `src/index.css` — WI-8's tokens — not comments. So the comments runway is nearly clear, and WI-19′ is startable.

**Still genuinely crowded:** the picker surface (9) and `resource-picker*` (6, none dismissible) — which is why WI-22's queue reconciliation is real work — plus the editor/marker and grid surfaces (7 each).

### Free wins — land the existing PR instead of building

| PR                                 | Work item | What it gives us                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#2761** (approved, mergeable)    | **WI-14** | Restores block markers to the **Formatted/Markers** view palette by walking `usfmMarkers[parentMarker].children`. A different surface from Simple's gutter dropdown, but it removes part of the reported symptom and sets the `usfmMarkers`-derived precedent. **Land it first.** Its body's detail differs from the running app: the adjudication found `p` **is** present; `s1` and bare `q` are the missing ones. |
| **#2577** (approved, mergeable)    | **WI-15** | Adds an `enabled?: boolean` gating every hover handler in `paragraph-marker-tooltip-overlay.component.tsx`. **Land it before WI-15 starts** and build the timer on top.                                                                                                                                                                                                                                              |
| **#2674**                          | **WI-24** | A genuine **data** fix, not a display patch: it changes `settings-sidebar.component.tsx` _and_ `src/renderer/components/settings-tabs/settings-tab.component.tsx`, adding a real full-name fetch instead of mirroring `shortName`.                                                                                                                                                                                   |
| **#2529** (**merged**)             | **WI-26** | "Integrate get resources into Home." WI-26 plans to reuse Home's not-on-disk row pattern — **re-read Home before sizing**, it changed after the brief.                                                                                                                                                                                                                                                               |
| **#2750** (approved, needs rebase) | **WI-7**  | The BCV work plus `.claude/rules/ux/z-index-tiers.md` and ordering tests. See WI-7 for what it does _not_ contain.                                                                                                                                                                                                                                                                                                   |

### A z-index scale already exists

`lib/platform-bible-react/src/components/z-index.ts` and `z-index.test.ts` ship on `origin/main`, and the file's own docstring documents exactly the incoherence PT-4476 reports ("a popover renders OVER a modal dialog"). #2750 **repairs** that scale (tooltip tier 550→675) and adds the rules doc; it does not introduce one. **WI-6 is not blocked on #2750** — it builds on the shipped scale and reconciles with #2750's repair.

### `RowSection.label` already exists — this de-fuses Q11

`label?: string` ships on `origin/main` at `project-selector.rows.ts:332-334`, used by `kind: 'versification'` for "a custom-labeled section". **#2673 does not add it** — its diff carries that line as context. #2673's actual change is widening the union (4 members → 7: `+ 'language' | 'type' | 'lastUsed'`), adding `partitionByLanguage`/`ByType`/`ByLastUsed`, and adding `type?: string` to `ProjectSelectorProject` with TSDoc arguing against ever closing `type` to a union.

**Consequence:** whether a consumer-supplied section heading is already expressible is answerable **against main today**, without waiting for #2673. See Q11, which is narrower than it first appeared.

### Missed PRs that change a ticket's baseline

| PR                                                 | Work item                                         | Why it matters                                                                                                                                                                                                                                                                                                                                                                              | Tag      |
| :------------------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------- |
| **#2768** — **MERGED 8 Sep**                       | **WI-7, WI-9, WI-12, WI-13, WI-14, WI-16, WI-22** | Now part of the baseline, not a PR to coordinate with. It rebuilt all five committed `dist/` artifacts and created the `paragraph-style-trigger` surface WI-14 edits. **Rebase before sizing anything in those tickets.**                                                                                                                                                                   | grep     |
| **#2340** (407 files)                              | **WI-22, WI-7, WI-6, WI-24, WI-2**                | `project-selector.component.tsx`, `.rows.ts`, six `book-chapter-control/` files, `z-index.ts`, `settings-sidebar.component.tsx`, three `contributions/menus.json`. Substantive on five surfaces — the single most entangled PR in the queue.                                                                                                                                                | grep     |
| **#2223** (draft)                                  | **WI-22, Q11**                                    | **Only found by diff-content search, not by path.** It keeps the flat `advanced/project-selector.component.tsx` / `.rows.ts` layout while #2673 has **moved the same symbols into `advanced/project-selector/`** — so a path grep on the directory matches #2673 and misses #2223 entirely. These two are the pair most likely to conflict structurally, and #2223 is a third party to Q11. | judgment |
| **#2632**                                          | **WI-2, WI-3′, WI-6, WI-18**                      | `menu.data.json`, **`src/stories/keyboard-shortcuts.data.ts`** (the file WI-3′ proposes to move), `z-index.ts`, `simple-layout*`, toolbar, `en.json`.                                                                                                                                                                                                                                       | grep     |
| **#2752**                                          | **WI-2, WI-4**                                    | `menu.data.json` + `menu-data.service-host.test.tsx`. Also collides with **#2758** on `interfaceMode` in the same test file, and with **#2700** on `hiddenInterfaceModes` — both diff-level, invisible to a path grep.                                                                                                                                                                      | grep     |
| **#2758**                                          | **WI-9, WI-18**                                   | `default-layout-supplement.util.ts`, `simple-layout.builder.test.ts`, `shipped-simple-layout-order.test.ts` — the tab-order tests WI-9 must update.                                                                                                                                                                                                                                         | grep     |
| **#2743 ↔ #2761**                                 | **WI-14**                                         | Both touch `usfmMarkers` at diff level. Note `blockMarkerToBlockNames` — WI-14's actual edit site — appears in **no** open PR by path or diff, so that specific site is uncontended.                                                                                                                                                                                                        | judgment |
| **#2294**                                          | **WI-24**                                         | `settings-sidebar.component.tsx` + `settings-tab.component.tsx`, making that surface three-deep with #2674 and #2340.                                                                                                                                                                                                                                                                       | grep     |
| **#2422** (draft)                                  | **WI-22, WI-23**                                  | The only PR on `use-project-picker-data.hook.ts`, a file WI-23 names.                                                                                                                                                                                                                                                                                                                       | judgment |
| **#2748**                                          | **WI-16/18, WI-28**                               | `scripture-text-grid/resource-cell.component.test.tsx`, `resource-text-panel.web-view.tsx`, **`dialogs/share-layout.utils.ts`**.                                                                                                                                                                                                                                                            | grep     |
| **#2664**, **#2717**, **#2775**, **#2653** (draft) | **WI-12, WI-13, WI-14**                           | `marker-menu.stories.tsx`; `platform-scripture-editor.web-view.tsx`; `usj-reader-writer.ts`; editor context-menu + `menus.json`.                                                                                                                                                                                                                                                            | grep     |
| **#2614** (draft)                                  | **WI-3′**                                         | Rewrites `.claude/rules/keyboard-shortcuts-catalog.md`, the rule governing WI-3′'s file move.                                                                                                                                                                                                                                                                                               | grep     |
| **#2654**                                          | **WI-11**                                         | Touches `platform-lexical-tools/lib/download-db.ts` — a merge-conflict risk for the Dictionary data work.                                                                                                                                                                                                                                                                                   | grep     |

### Dismissed as false positives

~20 PRs touching `assets/localization/en.json` only (repo-wide chokepoint, already flagged; none touches menu, marker or picker keys). Package-manifest-only sweeps: #2195, #2196, #2723, #2771. #2382 (Help-menu e2e flake). #2440's `theme.service-host.ts` (init plumbing, not tokens). #2389's `dialog-scroll`. **#2250 / #2253** — two dependabot PRs with byte-identical 369-file revert-style diffs that appear on 8 of 10 surfaces; they conflict textually but carry no intent, and counting them as contention inflates every surface they appear on.

### Method limitation, and what probing it found

The path corpus cannot see identifier-level collisions. A diff-content search over the open set found five that a path grep misses: **#2223 ↔ #2673** (`RowSection`, `defaultGroupByOpenTabs` — the most consequential, see above), **#2752 ↔ #2758** (`interfaceMode`, same test file), **#2700 ↔ #2752** (`hiddenInterfaceModes` — relevant to WI-2), **#2743 ↔ #2761** (`usfmMarkers` — relevant to WI-14). Four PRs' diffs could not be retrieved (#2250, #2253, #2340, #2654) and remain unprobed at identifier level.

### Genuinely unbuilt, with no overlapping open PR

**WI-17** — `scrollToRange` appears nowhere in core, by path or diff. **WI-11** — the conclusion holds (`lexical.db` appears in no open PR), but note the rationale is _not_ "different repo, no contention": `extensions/src/platform-lexical-tools/` **is** in `paranext-core`, and 8 open PRs touch it, including #2654 on `lib/download-db.ts`.

---

# PARENT ISSUE

**Project:** PT · **Issue type:** Combined · **Labels:** `sp90-simple-coherent` · **Parent:** none

**Summary:** `Sprint 90 — Simple is coherent for Saroj (Ian + Todd)`

## Description

### Problem

> Saroj is a translator using Paratext 10 **Simple**. Across a normal translation session he hits a steady drip of friction — menus, comments, project and resource pickers, paragraph markers, synced scrolling — each irritation small, but cumulatively leaving him feeling Simple is not ready for field work. Trainers can't confidently point translators at Simple, and the team keeps re-fixing the same defects across three or four parallel pickers.

Nothing here is catastrophic on its own. Together they are why a trainer will not yet put a translator in front of Simple.

### Background

Two sibling PRDs, both titled **"Simple is coherent for Saroj"** (Sprint 90), split so two product owners can each manage half. **One engineering team builds both** — which is why this is one parent.

- **Ian's PRD** — rev2, 27 Aug 2026. Product owner Ian · **Implementation owner: Jolie**. [PRD](https://docs.google.com/document/d/1MDcnFZr8-lyO_THvOm5UyvYJMArjihHcDSgLE0GRPZs/edit?tab=t.9uysecxzmcmk)
- **Todd's PRD** — rev2, 27 Aug 2026. Product owner Todd · **Implementation owner: Tom**. [PRD](https://docs.google.com/document/d/1j7Aob_f6AN7xlgtw6zrMAJjD2pFRdE85cAPtHM-Pgj4/edit?tab=t.wqrx4org9qcl)
- Both derive from one shared **"Proposed NN and NTHs"** second tab carried verbatim in both exports. That tab is the authoritative master list; the split assigns 3 of its 6 non-negotiables to each PRD.
- **Implementation owners are split by half: Tom owns Todd's half, Jolie owns Ian's half.** Every sub-task below states its half, so the owning implementation lead is unambiguous. The two cross-half items (WI-7 and WI-24) name their owner explicitly.
- Investigation brief: `.context/research/investigations/simple-is-coherent-for-saroj/brief.md`

⚠️ **Version hazard.** An earlier **rev1** export of Ian's PRD is in circulation and disagrees materially with rev2 — rev1 carried Menus, synced scrolling, copy-paste control, BCV hover, Dictionary, text collections and five Share-layout non-negotiables that rev2 either moved to Todd's PRD, demoted, or dropped. Numbering differs too. **Everything in this epic is rev2.** If a discussion cites a non-negotiable that doesn't appear below, it is rev1.

**Master list, split 3/3:**

| Master tab | Assigned to                               | Subject                          |
| :--------- | :---------------------------------------- | :------------------------------- |
| NN1        | Todd NN1                                  | Menus                            |
| NN2        | Todd NN2                                  | Paragraph markers                |
| NN3        | Ian NN1                                   | Comments                         |
| NN4        | Ian NN2                                   | Titlebar project selection       |
| NN5        | Ian NN3 _(labelled Stretch Goal in rev2)_ | Unify project/resource selection |
| NN6        | Todd NN3                                  | Synced scrolling                 |

### Appetite

PRD appetite: **3 weeks each, 30 dev days total** — set deliberately so 3 + 3 matches what five developers (not all full time) deliver across two physical weeks. **Buffer is zero by construction.**

### Runtime adjudication (already done)

The brief's WI-1 ran on `main` @ `49c26ed0237` in the live app (Simple mode, project TPD, editor engine `platform-editor` 0.8.16). Every number below was measured, not read from code. It changed the plan:

| Claim                                               | Verdict                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TODD-NN-2.2 marker + editable-region positioning    | **NOT REPRODUCED.** `\li1`/`\li2` glyphs at x 22–58, first-line text at 77–139, no collision at 958/620/460/380 px. Both `--para-indent` and `--verse-text-start` are set. → **regression test only**                                                                                                                                             |
| TODD-NN-2.3 select the marker itself                | **CONFIRMED.** A programmatic range over the glyph _is_ accepted, then cleared within ~900 ms by a policy guard. This is a **predicate change, not a new selection model** — the planning artifact's "new Lexical selection model" reading is wrong.                                                                                              |
| TODD-NN-2.1 insert the core marker set              | **CONFIRMED, worse than described.** The dropdown offers 26 items; `li1`, `li2`, `s1`, bare `q`, `q3` are **absent**, while non-paragraph `h`/`h1-3`/`ide`/`toc1-3`/`cl` are **present**. A paragraph already carrying `li2` reports as "li2 – Miscellaneous Marker".                                                                             |
| Premise: structure protection disables the dropdown | **CONTRADICTED.** All 26 items open `aria-disabled="false"`, `pointer-events: auto`. Two structure controls exist, both enabled, neither disables it. → **Q1 reframed**                                                                                                                                                                           |
| TODD-NN-3.2 scroll to the highlighted match         | **CONFIRMED — two distinct failure modes.** Same-chapter: reference updates, editor **does not scroll at all** (match 2094 px below viewport). Cross-chapter: scrolls, but only until the target verse scrapes the bottom edge (match 216 px _below_ the viewport bottom). Fails at full width too — the narrow-column condition is not required. |
| TODD-NTH-2 empty-verse caret                        | **CONFIRMED NOT FIXED.** Three intermediate keystrokes in both directions; on the middle one the selection disappears entirely. Engine PRs #520/#536 landed but do not cover an empty verse _between two verses inside one paragraph_.                                                                                                            |

**Caveat carried forward:** the dropdown's _items_ are enabled, but no marker was **applied** (that writes project data). Whether an apply succeeds in Simple is the open half of Q1 and is the first task under WI-14.

### Open Questions

- [ ] **Q1 — Does Simple get paragraph-marker editing, and on what terms?** _(reframed — the original premise was wrong.)_ Simple's dropdown is **not** disabled by structure protection; all 26 items are enabled. The blocker is narrower: the dropdown's **contents are wrong** (`li1`/`li2`/`s1`/bare `q` absent, `h`/`ide`/`toc1-3`/`cl` offered), the **glyph cannot be selected** (a guard clears the selection), and what an **apply** actually does in Simple is untested. So the decision is not "does Simple get Standard view" but: **should the core paragraph markers be editable in Simple while structure protection is on by default?** _Suggested:_ yes — curate the dropdown to the core paragraph set, let those apply in Simple, leave Standard view Power-only. That keeps the protection story intact while unblocking what the PRD asks for. **Gates WI-14 → WI-13, the whole marker block.**
- [ ] **Q2 — Which markers are the core paragraph set?** The 10Power "tier 1" list the PRD links exists nowhere in code, config, docs or localization in either repo. Someone must supply it as an explicit list before TODD-NN-2.1 can be built or tested. _Suggested:_ have 10Power export the list into the PRD as text; engineering declares it in core's markers map. **Also please stop calling it "tier 1" in cross-repo conversation** — that phrase already means the marker-_rename_ engine strategy in `scripture-editors` (`markerEditTier1.utils.ts`). Use "core paragraph markers".
- [ ] **Q3 — Should "All projects…" reach the S/R server at all this cycle?** Reaching S/R projects works **only in Paratext 10 Studio** (`getSharedProjects` is registered solely via Studio's patch layer), would **throw** in plain Platform.Bible, has **no cached list** to fall back on, and there is **no app-wide offline signal**. _Suggested:_ ship "Your projects" clarified and correct, defer the server-reaching half. rev2 already prefers a projects-filtered Home over the S/R dialog "because S/R is intended to be replaced with Home" — which argues for waiting for Home rather than building a second server-reaching surface now. An absent affordance is honest; a present one that errors adds a defect in the cycle meant to remove defects. **Gates WI-26.**
- [ ] **Q4 — "Manage extensions" doesn't exist.** TODD-NN-1.1's screenshot marks it for removal, but no such item exists; the nearest is `%mainMenu_openExtensionMarketplace%` = "Open Extension Marketplace". Confirm that is the intended target. **Gates the last line of WI-2.**
- [ ] **Q5 — Two items are duplicated across the PRDs at different priorities; each needs one owner.** **Still open — please confirm both halves.** The sub-tasks have been drafted to the suggested answers so work is not blocked, but neither is decided; if you answer differently, WI-24 and WI-7 need re-scoping.
  - **(a) Shortname-first** — IAN-NN-2.4 (non-negotiable) ≡ TODD-NTH-3.1 (nice-to-have), and Ian's rev2 cross-references Todd's item by name. _Suggested, and **drafted this way in WI-24**:_ keep it as **Ian's non-negotiable scoped to the titlebar** (implementation owner Jolie), leaving **TODD-NTH-3.2/3.3** — responsive long name, and search on short _or_ long name — as separately-owned nice-to-haves under Tom's half, currently cut-first. **What to check when you come back to this:** WI-24 as drafted ships the titlebar scope _plus_ the responsive and search halves, because they share one formatting helper and #2674 already fixes the search half — so if you confirm the split, WI-24's Definition of Done must be trimmed to the titlebar and the other two split into a Todd-half sub-task. Deciding this late costs a ticket split, not rework.
  - **(b) BCV chapter hover** — nice-to-have in both PRDs. **DECIDED by Jolie (implementation owner) on 8 Sep 2026: the ticket sits on Todd's half; Jolie lands it as cluster-C work.** Todd's wording carries the fact that a PR exists, so the requirement is his; the code is in Jolie's lane L5 and lands first in her pbr cluster C, and the work is really just merging #2750. So the half and the lane deliberately disagree here, and that is fine because the item is a merge, not a build. **Still to confirm:** whether to **promote it out of nice-to-have**, given it is a merge rather than a build.
- [ ] **Q6 — Three requirements are largely already shipped.** TODD-NN-3.1 (third-column sync — done for 3 of 4 tabs), IAN-NN-1.3 (comment filters — 5 dropdowns shipped) and TODD-NTH-1.3 (text order — done). _Suggested:_ re-scope each to its actual remainder — Text Collection's missing verse scroll, date/author filter UI, and a verse-mode drag grip. Recovers budget without cutting anything Saroj asked for.
- [ ] **Q7 — Where should the Dictionary extension live?** `platform-bible-extensions`'s remote 404s, its `origin/main` is a bare "Initial commit", and a Dictionary extension exists there only as a local branch plus uncommitted files with no PR. That is unbacked work-in-progress and worth resolving on its own merits.

  **Q7 does _not_ gate WI-9 or WI-10.** `extensions/src/platform-lexical-tools/` **already exists in `paranext-core`** with its own contributions and localized strings. WI-9's edits are in core (`default-layout-supplement.json`, `simple-layout.data.test.ts`, `shipped-simple-layout-order.test.ts`); WI-10's are in core (`platform-lexical-tools/`). **Neither ticket touches `platform-bible-extensions` at all**, so both are day-one startable. Q7 remains a real housekeeping question about the _other_, unbacked Dictionary work.

- [ ] **Q8 — Are the PT9 comment-filter omissions deliberate?** The PRD excludes plain-text search and a sort control; PT10 additionally has **no** tag/category comment filter at any layer while PT9 does. Confirm all three are intended omissions.
- [ ] **Q9 — Confirm the seven "new in Paratext 10" items are intentional.** _(This is the brief's §3 table. **WI-18 item 4 is a hard dependency** — it is the layout spec.)_ For each, PT9 either does something different or has no equivalent:
  1. **"Select the paragraph marker itself"** — PT9 has **no equivalent gesture**; its marker changes go through the dropdown against the caret's paragraph, which is what PT10 already does. Confirm this is a **new PT10 affordance, not parity**.
  2. **Keyboard-shortcut hints in the Project menu** — PT9 _does_ show accelerators, so this **is** parity; but PT10 has no shortcut declaration in its menu contribution model at all. Confirm parity is the goal and worth the model change.
  3. **"Community support" replacing "FAQs"** — PT9 has no such item; PT10-only naming. Confirm the wording.
  4. **Text-collection layout "same as PT9"** — **confirm the screenshot is authoritative over any prose reading.** _(This is the one WI-18 depends on.)_
  5. **"All projects…" reaching S/R server projects** — PT9's open dialog lists local projects; reaching the server is a separate flow, so a _combined_ local+server picker is new. **Load-bearing — see Q3.**
  6. **Dictionary in column three** — PT9 has no three-column Simple layout; net-new by construction.
  7. **PT9 capabilities the PRDs don't mention** — PT9's comment filters include plain-text search and a sort control (both excluded here), and PT9 has tag/category comment filtering which PT10 has at **no** layer. Confirm all three are deliberate omissions rather than oversights. _(Overlaps Q8.)_

**The three below are engineering decisions, not product-owner questions** — they are recorded here because they are **cross-ticket**: each one changes the scope or start order of more than one sub-task, so no single sub-task can own it. Q10 and Q11 should be settled **before the sprint starts**; Q12 is a short verification that can happen on day one.

- [ ] **Q10 — Re-cut the `platform-bible-react` merge order for FOUR participants, not three.** _(Owners: Tom + Jolie together.)_ The land-order plan above assumed three pbr clusters — C (L5), A (L1), B (L4) — and asserted that L2 and L3 touch no pbr. **Two file-location errors made that wrong:**

  - **L2 does land pbr.** The marker dropdown's UI is in `platform-bible-react`: `components/advanced/marker-menu.component.tsx`, `marker-palette-filter.util.ts`, `marker-palette-keydown.util.ts`, `marker-palette-session.util.ts`, `hooks/use-extra-valid-markers.hook.ts`, and `MarkerMenuItem` is imported from the package. **WI-13 and WI-14 both land pbr.**
  - **The titlebar does _not_.** `platform-bible-toolbar.tsx` is at `src/renderer/components/`, so WI-23's toolbar work is outside pbr and cluster B is smaller than planned.

  Since `lib/platform-bible-react/dist/` is committed, **any** two pbr branches conflict on generated output regardless of source files — so the number of participants is the whole basis of the serialized queue. **Decide:** give L2's marker work its own slot in the order, or fold WI-13/WI-14's pbr edits into cluster A (which already owns pbr menu components). The second option is tidier but **crosses the owner boundary** — cluster A is Tom's and so is L2, but it changes what Tom holds concurrently. _No suggested answer: this is a staffing call, and L3 remains genuinely pbr-free either way._ **Affects WI-13, WI-14, WI-23, and the land order for every pbr ticket.**

- [ ] **Q11 — What is actually missing at `ProjectSelector`'s prop layer, and does #2673's `type` design stand?** _(Owners: Jolie + #2673's author.)_ Narrower than it first looked, because **`RowSection.label` already ships on main** (`project-selector.rows.ts:332-334`, used by `kind: 'versification'` for "a custom-labeled section"). #2673 does not add it. So "can a labelled section be represented?" is already yes, internally — and the open question is only whether a **caller** can define one, which is a **prop-layer** question answerable against main today without waiting for #2673.

  Two things still need a person:

  1. **Name the public API.** WI-22's change (2) currently names `RowSection`, which is **not exported** (`experimental.ts` exports `ProjectSelector` plus four types; `RowSection`'s only consumer is `project-selector.component.tsx`). Decide the prop, then decide whether the internal `kind` union needs touching at all.
  2. **Settle `type`.** #2673 adds `type?: string` to `ProjectSelectorProject` with TSDoc **arguing against ever closing it to a union**; WI-22's change (3) proposes a closed `type`/`kind` discriminator. Directly opposed, and it is a design call rather than a merge conflict.

  Also note **#2223** (draft), which no path grep surfaces: it keeps the flat `advanced/project-selector.component.tsx` layout while #2673 has moved the same symbols into `advanced/project-selector/`. Structurally the likeliest pair to collide.

  _Suggested:_ answer (1) against main **now** — it is a code question, not a discussion, and it may shrink WI-22 substantially. Then settle (2) with #2673's author before either lands. **This no longer needs to gate L4's start**, only WI-22's final scope. **Affects WI-22, WI-23.**

- [ ] **Q12 — Does emitting the existing column `label` satisfy TODD-NN-1.6c?** _(Owner: Tom. A short verification, not a discussion.)_ Menu **columns already carry a required `label`** (`menus.model.ts`, `required: ['label', 'order']`), and the Project menu **already declares five of them** — `%webView_platformScriptureEditor_edit%`, `_options%`, `_tools%`, `_insert%`, `_info%`. The renderer discards them (`tab-dropdown-menu.component.tsx:126-127` says so verbatim). The v0 target sections map onto **columns**, not groups.

  **Two facts now verified that make this worth doing first.** Columns **stack vertically** in `TabDropdownMenu` (no `grid`/`flex-row`), so a column label reads as a section heading rather than a sideways column header — the layout objection does not apply. And groups emit **no separators** (`getGroupContent` `flatMap`s them at `:49-97`); separators sit **between columns** (`:164`).

  **But the answer is only a partial yes, and the ticket says so:** the five declared columns are `edit`/`options`/`tools`/`insert`/`info`, and the v0 sections are PROJECT/VIEW/INSERT/TOOLS/QUALITY CHECKS. **There is no VIEW column and no QUALITY CHECKS column**, so WI-4 must re-author the column set in `menus.json` regardless. Q12 removes the _schema_ work, not the manifest work.

  **One hazard to fix in the same pass:** `filterItemsForInterfaceMode` prunes items, never columns, and column `platformScriptureEditor.info` is **already empty in every mode** (its only group, `platformScriptureEditor.general`, receives no item from any manifest). Naive label emission ships a heading "Info" with nothing under it, and Simple's pruning will create more. **Suppress zero-item columns.**

  _Suggested:_ do the renderer pass plus the empty-column guard. If it works, **WI-3′ needs no model or schema edit**. Only if columns prove insufficient should a group `label` be added — and note the group schema is a two-branch `oneOf` with `additionalProperties: false`, a harder shape to extend than the `menuItem` schema. **Affects WI-3′'s size and WI-4's hiding approach.**

### Non-negotiables

| #             | Requirement                                                                                                                                                                                                                                                                                       | Jira Ticket(s)             | Related Nice-To-Haves                                        |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------- | :----------------------------------------------------------- |
| **IAN-NN-1**  | **Comments.** Reduce whitespace without significantly moving content locations; better visibility of the active comment; basic PT9-style filters (two controls, options displayed, no plain-text search or sort); fix the styling-buttons-above-toolbar bug. _No-go: annotations in the editor._  | WI-19′                     | IAN-NTH-4 themes (WI-8) — active-comment visibility overlaps |
| **IAN-NN-2**  | **Improve the titlebar project-selection component.** Blue-box menu must disappear while selecting; "Your projects" content must be comprehensible with a way to reach the rest; shortname first everywhere.                                                                                      | WI-23, WI-24, WI-26        | TODD-NTH-3 (WI-24) — 3.1 is the same work                    |
| **IAN-NN-3**  | **_Stretch Goal —_ Adapt/unify project/resource selection in dialogs and components.** 3–4 UIs do nearly the same thing with different defects. Target a small number of UIs, primarily eliminate defects, so fixing one benefits all. _No-go: full unification into one component — cap at two._ | WI-22, WI-23, WI-25        | —                                                            |
| **TODD-NN-1** | **Menus.** Prune main + Help menus for Simple; rename FAQs → "Community support"; fix the always-on Project-menu border/shadow; make menus and popovers opaque; regroup the Project menu to the v0 structure with section headings, an Edit flyout and shortcut hints.                            | WI-2, WI-3′, WI-4, WI-6    | —                                                            |
| **TODD-NN-2** | **Fix inserting, selecting and displaying paragraph markers** (leftover from Sp87). Insert the core paragraph marker set from the dropdown; position marker + editable region correctly; be able to select the marker itself, not only the paragraph content; delay the marker tooltip.           | WI-12, WI-13, WI-14, WI-15 | —                                                            |
| **TODD-NN-3** | **Synced scrolling.** All columns respond to each other; scrolling to a highlighted check/find result scrolls to the _highlighted content_, not the start of the verse.                                                                                                                           | WI-16, WI-17               | TODD-NTH-1 (WI-18) — same grid files                         |

**Nice-to-haves** (a prioritized menu, not committed scope): IAN-NTH-1/2/3 Team layout → **WI-28**; IAN-NTH-4 themes → **WI-8**; IAN-NTH-5 Report a problem → **WI-29**; TODD-NTH-1.1/1.2 text collections → **WI-18**; TODD-NTH-1.3 text order → **already done** (PT-4078), only a verse-mode drag grip missing; TODD-NTH-2 empty-verse caret → **WI-21**; TODD-NTH-3 name display → **WI-24**; TODD-NTH-4 ≡ IAN-NTH-4 BCV hover → **WI-7**; TODD-NTH-5.1/5.2/5.3 Dictionary → **WI-11 / WI-9 / WI-10**.

### Already shipped — re-scope, don't plan in full

| Requirement                    | Status                                                                                                                                                                                                                                                                                                                           |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TODD-NN-3.1 third-column sync  | **Largely done.** Column 3's exclusion was deliberate (`platform-scripture-editor/src/main.ts:1119-1122`) and has since been reversed for 3 of Simple's 4 column-3 tabs (PT-4467 #2749; PT-4080 #2543/2554/2558/2562). Remaining: **Text Collection has no `scrollToVerse` at all**, the stale comment, and no Simple-mode test. |
| TODD-NTH-1.3 text order        | **Done** (PT-4078 #2542). Gap: no drag grip in verse mode.                                                                                                                                                                                                                                                                       |
| TODD-NTH-1.1 verse/chapter     | **Capability done** (PT-4062 #2540). New work is the click affordance + toggle-back only.                                                                                                                                                                                                                                        |
| IAN-NN-1.3 comment filters     | **Largely done** (PT-4027 #2508). Gap: `dateFilter`/`author` are backend-supported with no UI; no tag/category filter at any layer.                                                                                                                                                                                              |
| TODD-NTH-5.2 Dictionary        | **Project-menu item done.** Column-3 tab not done, pinned by `simple-layout.data.test.ts:46` ("exactly 4 tabs").                                                                                                                                                                                                                 |
| IAN-NTH-5 Report a problem     | **Machinery done** — Usersnap router/shard + 2 Help items. Entry-point refinement only (WI-29); **WI-2 must not prune the two Help items it refines**.                                                                                                                                                                           |
| IAN-NN-2.2 "Recent" projects   | PRD states it already works as expected. **Verify, don't build.**                                                                                                                                                                                                                                                                |
| IAN-NTH-3 Share/Cancel buttons | Buttons exist; the confirm reads **"Save"** (`en.json:468`). Relabel only.                                                                                                                                                                                                                                                       |
| TODD-NTH-5.1 semantic domains  | Diagnosed as a **data off-by-one** in `lexical.db`. **No spike needed** — but the fix lives in `paranext/dependencies`, outside all five repos.                                                                                                                                                                                  |
| TODD-NN-1.x menus              | **Not done.** Every item still contributed with no `hiddenInterfaceModes`; `en.json:116` still reads "FAQs"; Project menu columns are Edit/Options/Tools/Insert/Info — no VIEW, no QUALITY CHECKS.                                                                                                                               |

### Lanes, land order and dependencies

Five lanes, one owner each holding a contiguous set of files for the whole sprint so nobody rebases onto a half-finished surface.

| Lane   | Scope                                             | Impl. owner                                                 | Ordered items                                           | pbr cluster |
| :----- | :------------------------------------------------ | :---------------------------------------------------------- | :------------------------------------------------------ | :---------- |
| **L1** | Menus (Todd NN1)                                  | Tom                                                         | WI-3′ → WI-2 → WI-4 → WI-6                              | **A**       |
| **L2** | Editor & engine (Todd NN2, NN3.2, NTH2)           | Tom                                                         | WI-15 → WI-21 → WI-14 → WI-13 → WI-17 (WI-12 as filler) | none        |
| **L3** | Grid & Dictionary (Todd NN3.1, NTH1, NTH5)        | Tom                                                         | WI-16 → WI-18 → WI-9 → WI-10 (WI-11 async)              | none        |
| **L4** | Pickers (Ian NN2, NN3)                            | Jolie                                                       | WI-22 → WI-23 → WI-24 → WI-25 → WI-26                   | **B**       |
| **L5** | Comments, theme & BCV (Ian NN1, NTH4; shared NTH) | Jolie _(WI-7's requirement is Todd's half; Jolie lands it)_ | WI-7 → WI-19′ → WI-8                                    | **C**       |

**Note on the lane/owner split:** the lanes map cleanly onto the two implementation owners — L1–L3 are Tom's (all-Todd), L4–L5 are Jolie's (all-Ian, except WI-7, whose requirement is Todd's but which Jolie lands). That is a happy accident of the 3/3 PRD split, not a constraint the plan imposed, and it means the **`platform-bible-react` cluster order C → A → B crosses the owner boundary** (Jolie's cluster C lands first, then Tom's A, then Jolie's B). The merge queue therefore needs both owners to agree the order up front — it cannot be run by either one alone.

⚠️ **The partition is four clusters, not three.** Two file locations decide this:

1. **L2 does touch `platform-bible-react`.** The marker dropdown's UI lives there — `components/advanced/marker-menu.component.tsx`, `marker-palette-filter.util.ts`, `marker-palette-keydown.util.ts`, `marker-palette-session.util.ts`, `hooks/use-extra-valid-markers.hook.ts` (9 files) — and `MarkerMenuItem` is imported from `platform-bible-react`. **WI-13 and WI-14 will land pbr**, so Tom's L2 is a fourth participant in a queue described as having three. This is the plan's central coordination claim and it was wrong.
2. **The titlebar is _not_ in `platform-bible-react`.** `platform-bible-toolbar.tsx` is at **`src/renderer/components/platform-bible-toolbar.tsx`** — zero matches under `lib/platform-bible-react/`. So WI-23's toolbar work is outside pbr, and cluster B is smaller than drafted (its pbr exposure is `project-selector/` and `resource-picker-dialog/` only).

**Net effect:** the queue has **four** pbr participants, not three — C (L5), A (L1), **L2's marker files**, B (L4's selector files). Either give L2's marker work its own slot in the order, or fold WI-13/WI-14's pbr edits into cluster A (which already owns pbr menu components) and accept the cross-owner handoff. **This needs deciding before the sprint starts; it is not a detail.**

**`platform-bible-react` land order: C → A → B (to be re-cut for four participants).** `lib/platform-bible-react/dist/` is committed (14 generated files), so **any** two pbr branches conflict on generated output regardless of which source files they touched. The merge protocol is fixed and cannot change this sprint, and the team has ruled out both a single pbr owner and a single pbr issue — so the only available mitigation is consolidation plus a serialized merge queue. Clusters develop in parallel; only the _merge_ is serialized. C is smallest and is mostly landing an existing PR; A must precede B because B is the longest-running branch and should rebase least; B lands last because the picker slice is most likely to slip or be cut. The owner rebuilds `dist` immediately before merging, and a later cluster resolves `dist` by **rebuilding, never hand-merging bundles**. Within cluster A, WI-3′ lands before WI-6.

**Residual risk to accept explicitly:** cluster B is both the longest-running branch and the last to land, so it carries the most `dist` rebases. If that becomes what sinks the sprint, the recovery is to land **WI-22 early on its own** — it is the enabling change and is useful even if WI-23/24 slip.

**Day-one startability, derived from each ticket's own Dependencies section.** Note up front: **L4 cannot begin in its stated order**, so "no lane waits on a decision" does not hold.

**Startable and completable on day one (10):** WI-3′ (zero substantive PR contention), WI-9, WI-10, WI-11, WI-12, WI-15, WI-16, WI-17, WI-19′ (one substantive contender), WI-21.

**Startable, completion gated (3):**

- **WI-2** — its last line is Q4-gated.
- **WI-8 Tier 1** (`--input`) is day-one work; **Tier 2 is cut-first**, so "WI-8 is done" is not a day-one outcome. Tier 1 also requires reconciling #2324 and #2191.
- **WI-25** — startable, but defect (d) routes through WI-24's shared helper, so it cannot fully close until WI-24 lands.

**Not startable (the rest):** WI-4 needs WI-3′; WI-7 needs its triage call; WI-13/WI-14 need Q1 **and Q2**; WI-22 needs the picker-queue reconciliation; WI-23/24/26 chain off WI-22; WI-18 needs WI-16.

⚠️ **L4 cannot begin in its stated order.** Its first three items (WI-22, WI-23, WI-24) are all blocked; its only startable item is WI-25, the _fourth_ — and WI-25 cannot finish without WI-24. So the claim "one owner holds a contiguous set for the whole sprint" and the claim "no lane waits on a decision" cannot both be true for L4. **Either clear the picker queue before the sprint starts, or accept that L4 begins out of order.**

**The critical path carries four product answers plus two engineering decisions.**

_Engineering decisions, recorded as **Q10** and **Q11** on the parent:_ the pbr merge order must be re-cut for four participants (Q10), and WI-22 vs #2673 must be settled before L4 can start in order (Q11). **Q12** is a short verification that can happen on day one. These are not product-owner questions but they gate work the same way, so they belong on the critical path alongside the four below.

_Product answers:_

- **Q1** gates WI-14 → WI-13 (the marker block).
- **Q2** gates the same block independently: its own text says "someone must supply it as an explicit list **before TODD-NN-2.1 can be built or tested**". WI-14's Dependencies list it. Naming only Q1 understated the marker block's exposure.
- **Q3** gates WI-26.
- **Q7** gates neither WI-9 nor WI-10 — both are day-one startable in core (see Q7).

L2 has WI-15/WI-21/WI-17/WI-12 to work through meanwhile, so late answers cost _sequence_ rather than idle time — but they compress the marker work into the back half of the sprint.

**Second chokepoint — `assets/localization/en.json` (+5 locales).** L1 (menu labels), L3 (Dictionary strings), L4 (picker strings) and L5 (comment + theme strings) all add keys to the same files. Key additions rarely conflict semantically but do conflict textually. Have each lane append its keys in a distinct region, or accept trivial conflicts — **do not have two lanes re-sort or reformat it.**

### Cut-first, unassigned

Team layout (IAN-NTH-1/2/3 → WI-28), WI-27 (retire the dead dialogs), IAN-NTH-5 (WI-29), TODD-NTH-3.2/3.3, and WI-8's **Tier 2** (the theme pass except the `--input` token, which is a real WCAG 1.4.11 failure at ≈1.3:1 and is Tier 1).

### Known constraints (both PRDs, §5)

- Shared components **must not regress PT10 Power** (which will eventually adopt them).
- Performance neutral or better.
- **No breaking changes to Simple's public menu-command API.**

### Conditions for approval

- Every non-negotiable maps to at least one landed sub-task with a regression test.
- No fix regresses Power — explicitly checked for every shared `platform-bible-react` component.
- The three mostly-shipped requirements (TODD-NN-3.1, IAN-NN-1.3, IAN-NN-2.2) are closed on their _actual remainder_, with the verification recorded, not re-planned in full.
- **Every gating decision is answered in writing before the work it gates is sized**, not only Q1 and Q3. The full set: **Q1 + Q2** (marker block — WI-14, WI-13), **Q3** (WI-26), **Q4** (WI-2's last line), **Q5(a)** (WI-24's scope), **Q9 item 4** (WI-18's layout spec), **Q10** (the pbr merge order, and therefore every pbr ticket), **Q11** (WI-22's final scope), **Q12** (WI-3′'s size and WI-4's approach). Fourteen of the 26 sub-tasks cannot start or cannot be scoped until one of these lands.
- **The `hiddenInterfaceModes` reversal in WI-4 is confirmed by the product owner** — un-hiding Comments in Simple reverses a documented deliberate decision.

---

# SUB-TASKS

All: **Project** PT · **Issue type** Sub-task · **Parent** the Combined issue above. No assignee, no status transition, no estimates.

---

## WI-2 (Todd NN-1.1/1.2/1.3): Prune Simple's main and Help menus

**PRD half:** Todd · **Serves:** TODD-NN-1.1, TODD-NN-1.2, TODD-NN-1.3 · **Lane:** L1 (Menus) · **pbr cluster:** A

### User Story

As Saroj using Simple, I want the main and Help menus to show only what Simple actually does, so that I am not offered commands that lead nowhere and I can find community support when I need it.

### Description

Data-only edits plus one localization value. Owns the **contribution-manifest half** of TODD-NN-1: which items are declared visible in Simple. It does **not** touch grouping, ordering or headings — those are WI-3′ and WI-4.

Transcribed from the PRD's screenshots (which are screenshot-only in the doc):

- **Main menu — keep:** Send/Receive projects, Settings, Exit. **Remove:** "Open…", "Manage extensions" _(see Q4)_, "Open Dictionary: SDBH/SDBG", "Open enhanced resource".
- **Help menu — keep:** FAQs, Submit an idea, Report a bug / Send feedback, and the About item — **core's string is "About Platform.Bible" (`en.json:105`), not the PRD's "About Paratext 10 Studio", which is Studio's wording.** **Remove:** "Paratext Registration Information", "Getting started", "Feature roadmap", "Open Developer Documentation".
- **Rename:** "FAQs" → "Community support", same link to support.bible.

### Implementation ideas from Claude

Per-mode filtering already exists and needs no new machinery: `hiddenInterfaceModes` + `filterItemsForInterfaceMode` in `menu-data.service-host.ts:36-41`, applied at 5 sites, modelled at `menus.model.ts:73`. Set `hiddenInterfaceModes: ['simple']` on the owning items.

The items live across several extensions, so this is a multi-file, single-pattern change:

- "Open…" → `platform-get-resources/contributions/menus.json:7`
- "Open Dictionary: SDBH/SDBG" → `platform-lexical-tools/contributions/menus.json:7`
- "Open enhanced resource" → `platform-enhanced-resources/contributions/menus.json:7`
- "Paratext Registration Information" → `paratext-registration/contributions/menus.json:7`
- Getting started / Feature roadmap / Developer Documentation → `menu.data.json`
- "Manage extensions" → **no such item exists.** Nearest is `%mainMenu_openExtensionMarketplace%` = "Open Extension Marketplace" (`paratext-bible-marketplace/contributions/menus.json:7`). **Settle Q4 before removing it.**

For the rename, change the value at `assets/localization/en.json:116`. The target URL at `src/shared/data/platform-bible-menu.commands.ts:63` **stays put** — this is a label change only. Mirror the key into the five other locale files (see the parent's `en.json` chokepoint note) rather than leaving them stale.

Note **PT-4503** (menus don't re-localize on UI-language change) will be hit by any menu restructure — file or reference it, don't silently absorb it.

### Testing Ideas

- Per removed item: assert it is absent from the Simple menu model and **still present in Power**. The Power assertion is the one that catches an over-broad `hiddenInterfaceModes`.
- Assert the Help item's label resolves to "Community support" and its command still targets the unchanged support.bible URL — the label and the target are the two things that can drift apart here.
- Assert every locale file that carries the FAQs key has been updated, so no locale silently falls back to English.
- Snapshot the Simple main-menu and Help-menu item lists so a future extension adding an item without `hiddenInterfaceModes` fails loudly rather than appearing in Simple.

### Definition of Done

- In Simple, the main menu shows only Send/Receive projects, Settings and Exit; the Help menu shows only Community support, Submit an idea, Report a bug / Send feedback and the About item ("About Platform.Bible" in core).
- Power's menus are unchanged, asserted by test.
- "Community support" links to the same support.bible URL as "FAQs" did.
- All six locale files carry the renamed key.
- Q4 is answered and the Extension Marketplace item is handled accordingly (removed or explicitly kept, with the decision recorded).

### Dependencies

- **Depends on:** Q4 (the Extension Marketplace question) for its last line only — the rest can start on day one.
- **Blocks:** WI-4 (regroup works on the pruned set).
- **Parallel with:** WI-3′ (file-disjoint — WI-3′ is model + renderer, this is manifests + strings).
- **Serves:** TODD-NN-1.1, TODD-NN-1.2, TODD-NN-1.3.

---

## WI-3′ (Todd NN-1.6c/1.6d): Menu renderer — group headings and shortcut hints

**PRD half:** Todd · **Serves:** TODD-NN-1.6c, TODD-NN-1.6d · **Lane:** L1 (Menus), lands **first** in cluster A · **pbr cluster:** A

### Description

Consolidates two items that share a model, a renderer and one `dist` rebuild. Owns the **rendering-capability half** of TODD-NN-1: making it _possible_ to express a titled section and a shortcut hint in a menu. WI-4 then uses that capability. Splitting these would mean two `platform-bible-react` landing events on the same files.

**Half one — section headings.** ⚠️ **Aim this at menu _columns_, not groups — and expect it to be renderer-only.**

**Menu _columns_ already carry a required `label`.** `menus.model.ts` declares it in both the TS type and the JSON schema (`required: ['label', 'order']` at `:310`), and the Project menu **already uses it today** — `platform-scripture-editor/contributions/menus.json` declares five labelled columns: `%webView_platformScriptureEditor_edit%`, `_options%`, `_tools%`, `_insert%`, `_info%`. The v0 target sections (PROJECT / VIEW / INSERT / TOOLS / QUALITY CHECKS) map onto **columns**, not groups.

The renderer simply discards them — `tab-dropdown-menu.component.tsx:126-127` says so verbatim: _"Column headers are ignored… groups are not distinguishable."_ So **TODD-NN-1.6c is plausibly satisfied by teaching the renderer to emit the label that already exists**, with no model or schema change at all.

**Do the renderer change first and re-evaluate.** Only if columns prove insufficient should a group-level `label` be added — and note that groups genuinely have none (`MenuGroupDetailsInColumn`, `menus.model.ts:40-44`).

Corollary for **WI-4**: hiding a whole section becomes **column-level**, not group-level, hiding.

**Half two — shortcut hints.** The render side already exists; the work is _sourcing_ the shortcut strings.

### User Story

As Saroj opening the Project menu, I want its items gathered under readable section headings with their keyboard shortcuts shown alongside, so that I can find a command by scanning rather than reading every item, and learn its shortcut in passing.

### Implementation ideas from Claude

**Headings — start with the renderer, not the model.** Teach `tab-dropdown-menu.component.tsx` (and the menubar + context-menu renderers) to emit `DropdownMenuLabel` / `MenubarLabel` from the **column `label` that already exists**, instead of relying on separators. Verify against the five labelled columns already declared in `platform-scripture-editor/contributions/menus.json`.

**Only if that is insufficient** should the schema be touched. If it is, note which guard applies: **`unevaluatedProperties: false` at `menus.model.ts:467` closes the _menuItem_ schema** (three occurrences: `:467`, `:490`, `:507`), while the **group** schema is a two-branch `oneOf`, each branch `additionalProperties: false` — a materially harder shape to extend. Add a schema test for an unknown property alongside any new one, and note that a schema slip is not a local failure: it takes the contributing extension's whole `menus.json` down.

**Two facts that are easy to get backwards:**

1. **Groups do not render separators.** `getGroupContent` (`tab-dropdown-menu.component.tsx:49-97`) `flatMap`s a column's groups with **no separator between them**; separators are emitted **between columns** only (`:164`, `{index < array.length - 1 && <DropdownMenuSeparator />}`). So "an emptied group still renders its separator" is false, and it is not a reason to do anything.
2. **The real hazard is an empty _column_.** `filterItemsForInterfaceMode` prunes **items only, never columns** — so a column whose items are all hidden still renders. This already happens without any change: column **`platformScriptureEditor.info`** contains one group (`platformScriptureEditor.general`) that **receives no item from any manifest**, so it is empty in every mode today. Emit labels naively and it ships a heading reading "Info" with nothing under it, and Simple's pruning will create more such columns. **Suppress a column whose visible item count is zero** — that is the guard WI-4 needs, and it belongs here.

**Contention on this surface is 6 raw but 0 substantive** — every hit is dependabot, a draft, or Storybook-only. Two to know about rather than wait for: **#2632** edits `keyboard-shortcuts.data.ts` directly, and **#2614** (draft) rewrites the catalog rule governing the file move. **This ticket is startable on day one.**

**Shortcut hints.** The render half is already implemented as `ms-auto text-xs text-muted-foreground` — `DropdownMenuShortcut:301-313` / `MenubarShortcut:254-266`, RTL-safe, already in production at `overlay-context-menu.component.tsx:212`.

The sourcing is the real work. Shortcuts are declared in **three unrelated places**: Electron `before-input-event` (`src/main/main.ts:1411-1470` — note there are **zero** `accelerator:` declarations anywhere in `src/main/`), one `useHotkeys` call (`platform-menubar.component.tsx:172-201`, two of whose bindings are dead), and per-web-view handlers.

`src/stories/keyboard-shortcuts.data.ts` already holds per-OS **display strings in exactly the right shape** — but lives in a Storybook-only path, is exported from no package, and is keyed by ad-hoc slugs with **no link to a PAPI command name**. So: **move it to `src/shared/data/`, add a `command` join key, and read it from the menu renderer.**

Chosen over adding a `shortcut` field to `menus.model.ts` because that means re-authoring 14 manifests against a closed schema. **Trade-off to accept explicitly:** hints then live outside the contribution model, so a third-party extension cannot declare one. Note `OverlayContextMenuItem.shortcut` already renders but is populated by nobody.

Read **PR #2583** (docs-only) before rendering: it reconciles Kbd/KbdGroup guidance — one `<Kbd>` per key inside a `<KbdGroup>`, macOS symbols adjacent with no separator, Windows/Linux joined with a literal `+`. Keep `.claude/rules/keyboard-shortcuts-catalog.md` satisfied either way — the catalog is hand-maintained and this change moves the file it names.

Also **fix or file PT-4143**: the main-process handlers claim chords app-wide and focus-blind, so Ctrl/Cmd+B never reaches the editor as "bold". A displayed hint for a shortcut that doesn't work is worse than no hint — **a displayed hint must not be a lie.**

### Testing Ideas

- Render the Project menu and assert a `DropdownMenuLabel` is emitted **from each column's existing `label`**, in **all three** recursive renderers (menubar, tab dropdown, context menu) — the bug class here is fixing one renderer and missing the others.
- **Assert an empty column emits no heading**, using `platformScriptureEditor.info` (empty today) as the fixture — the regression this change would otherwise introduce.
- Assert a column whose items are all hidden in Simple emits no heading and no orphan separator.
- Assert the five labelled columns' headings resolve to localized strings, not raw `%webView_*%` keys.
- **Only if the schema is touched:** feed the combiner a manifest with an unknown property and assert it is rejected with a useful message _and_ that other extensions' manifests still load.
- For hints: assert the per-OS display string for the same command differs correctly on macOS vs Windows/Linux, and that a command with **no** registered shortcut renders no hint element at all.
- Assert the `command` join key resolves for every entry in the moved catalog — an unjoined entry is a silent no-hint.
- RTL: assert the hint stays end-justified under `dir="rtl"`.

### Definition of Done

- All three renderers emit each column's **existing** `label` as a heading — **with no model or JSON-schema change**, unless Q12 finds columns insufficient (in which case record why before adding a group `label`).
- **An empty or fully-hidden column emits no heading**, pinned by a test against `platformScriptureEditor.info`.
- WI-4 can suppress a whole section via column-level hiding.
- Shortcut display strings live in `src/shared/data/`, carry a `command` join key, and the menu renderer reads them; the Storybook catalog page still renders from the same source, and `.claude/rules/keyboard-shortcuts-catalog.md` is satisfied.
- No displayed hint names a chord that does not actually reach its target (PT-4143 fixed or filed and the affected hints withheld).
- Power's menus are visually unchanged where no group declares a label.

### Dependencies

- **Depends on:** nothing — **can start day one** (zero substantive PR contention). **Q12** determines its size, and is a short verification rather than a wait.
- **Blocks:** WI-4 (needs column-label emission **and** empty-column suppression).
- **Lands before:** WI-6 within cluster A, so the renderer change and the shadcn opacity change never regenerate `dist` concurrently.
- **Note:** the PRD **pre-authorises postponing** the shortcut-hints half (TODD-NN-1.6d) if it proves difficult. If it fights the schema or PT-4143, cut that half and ship headings.
- **Serves:** TODD-NN-1.6c, TODD-NN-1.6d.

---

## WI-4 (Todd NN-1.6a/1.6b/1.6e/1.6f): Regroup the Project menu to the v0 structure

**PRD half:** Todd · **Serves:** TODD-NN-1.6a, TODD-NN-1.6b, TODD-NN-1.6e, TODD-NN-1.6f · **Lane:** L1 · **pbr cluster:** A

### User Story

As Saroj opening the Project menu, I want it laid out in the order and grouping the design specifies, so that the commands I use most are where I expect them and I am not shown sections that do not apply to Simple.

### Description

Mostly **relabel and reorder** — the good news is that the nine target items already exist as contributions. Owns the **content-and-order half** of TODD-NN-1, consuming the capability WI-3′ builds and the pruned set WI-2 leaves.

Target structure, transcribed from the PRD screenshot and the [v0 demo](https://10simple-project-menu.vercel.app/):

- **PROJECT** — Send/Receive this project · Project settings ⌃J · Edit ▸
- **VIEW** — Switch Scripture view ⌃E · Show footnotes F7 · Change footnote pane location
- **INSERT** — Insert footnote ⌃T · Insert cross-reference ⌃⇧T · Insert comment ⌃⇧N _(disabled)_
- **TOOLS** — Bible texts · Commentaries · Text collection · Find ⌃F · Comments
- **QUALITY CHECKS** — Checking assistant _(hidden in Simple)_

### Implementation ideas from Claude

Switch Scripture view, Show footnotes, Change footnote pane location, Insert footnote, Insert cross-reference, Insert comment, Find, Comments and Checking assistant **all already exist** as contributed items — across `platform-scripture-editor` (16 items, columns Edit/Options/Tools/Insert/Info) and `paratext-bible-send-receive` (2 items). So 1.6a/1.6c/1.6f are largely a **regroup + relabel**, not new commands.

New work: add Bible texts / Commentaries / Text collection entries, hide the 5-item inventory group, add the Edit section flyout, and hide Quality checks.

⚠️ **One item must be UN-hidden, and no other ticket says so.** The v0 TOOLS section requires **Comments** in Simple's Project menu, but the shipping manifest sets `"hiddenInterfaceModes": ["simple"]` on `%webView_legacyCommentManager_openComments%` (`platform-scripture-editor/contributions/menus.json:168`) — and the sibling Manage Books entry documents that gate as a deliberate product decision. So this ticket **removes** a hide that someone chose on purpose. **Confirm that reversal with the product owner before doing it**; it is not a typo to clean up.

⚠️ **The column inventory is not the v0 section list.** The manifest declares **five** columns — `platformScriptureEditor.{edit, options, tools, insert, info}` — plus whatever the merged defaults contribute. **There is no VIEW column and no QUALITY CHECKS column.** So reaching the v0 structure means **re-authoring the column set in `menus.json`**, not just reordering items. Q12's "no schema edit" holds, but "relabel and reorder" understates it: PROJECT/VIEW/INSERT/TOOLS/QUALITY CHECKS is a different column set from Edit/Options/Tools/Insert/Info.

Note also that `platformScriptureEditor.colors` and `platformScriptureEditor.general` are groups with **zero items** today — WI-3′'s empty-column suppression is what keeps them from rendering as bare headings.

For the flyout (1.6b), reuse the existing submenu machinery — three recursive renderers already handle it, with `platform.moveTabToWindow` as a shipping example (`platform-menubar.component.tsx:88-98`, `tab-dropdown-menu.component.tsx:75-88`). No new renderer needed.

**Caveat that shapes the order of work:** only _items_ are filtered, never groups or columns, so **an emptied group still renders its separator**. Hiding the whole Quality-checks section therefore needs WI-3′'s model change (or its renderer fix) first. 1.6e explicitly allows _omitting_ the section if hiding proves impossible — take that escape rather than shipping a stray separator.

1.6f ("order of items in Tools should reflect the order in the UI") means the Tools order is **derived from the column-3 tab order**, not independently authored — so it must be kept consistent with WI-9's tab insertion. Worth a comment at the declaration site saying so.

Note **PT-4503** (menus don't re-localize on UI-language change) will be hit by this restructure.

### Testing Ideas

- Assert the Simple Project menu's section order and per-section item order match the v0 structure exactly — a single ordered snapshot is the simplest guard against a later contribution silently inserting itself mid-section.
- Assert the Quality-checks section is **absent** in Simple and **present** in Power. _(No separator assertion needed — separators sit between columns, not groups; WI-3′'s empty-column suppression is what prevents a bare heading.)_
- **Assert Comments is present in Simple's TOOLS section** — i.e. that the `hiddenInterfaceModes: ["simple"]` gate at `menus.json:168` was deliberately removed — and that Power is unaffected.
- Assert the Edit flyout opens and its children are reachable by keyboard as well as pointer.
- Assert "Insert comment" renders in a disabled state (not omitted) — the PRD specifies disabled, and omitted-vs-disabled is exactly the kind of detail that drifts.
- Assert Tools' order matches the live column-3 tab order, so WI-9's Dictionary insertion cannot desynchronize them unnoticed.
- Re-run after a UI-language switch to characterize PT-4503's effect on the restructured menu.

### Definition of Done

- Simple's Project menu matches the v0 demo's sections, order and labels — including the **re-authored column set** (the v0 sections are not the five columns that ship today).
- **Comments appears in TOOLS in Simple**, with the removal of its Simple hide confirmed by the product owner and recorded.
- No column renders a heading with nothing under it.
- The Edit flyout works by pointer and keyboard.
- Quality checks is hidden (or deliberately omitted, with the reason recorded) with no stray separator.
- Tools' order is derived from, and asserted against, the column-3 tab order.
- Power's Project menu is unaffected.

### Dependencies

- **Depends on:** **WI-3′** (needs the group-label model and group-level hiding) and **WI-2** (works on the pruned set). **Cannot start day one.**
- ⚠️ **Hard cross-lane edge, not just coordination:** this ticket's DoD asserts Tools order against the column-3 tab order that **WI-9 changes** (it inserts Dictionary). Both sit third in their lanes, in different lanes with different owners. **Sequence WI-9 before WI-4's Tools assertion, or assert the order dynamically rather than as a fixed list.**
- **Serves:** TODD-NN-1.6a, TODD-NN-1.6b, TODD-NN-1.6e, TODD-NN-1.6f.

---

## WI-6 (Todd NN-1.4/1.5): Make menus and popovers opaque; remove the stray border and shadow

**PRD half:** Todd · **Serves:** TODD-NN-1.4, TODD-NN-1.5 · **Lane:** L1, lands **last** in cluster A · **pbr cluster:** A

### User Story

As Saroj using any menu or popover, I want it opaque and readable — including while the content behind it scrolls — and I want the Project menu's border and shadow to appear only when the menu is actually under my pointer.

### Description

Two chrome defects with one systemic cause. Owns the **overlay-appearance half** of TODD-NN-1.

**Do not write this from scratch — adopt PT-4101.** It is an unclaimed, well-specified ticket carried through Sprints 88 and 89, and its description **already covers the always-on-border half of TODD-NN-1.4**.

### Implementation ideas from Claude

The systemic cause is **PT-4476**: an incoherent z-index scale in which popovers outrank modals and tooltips.

⚠️ **A z-index scale already exists — do not add a second one.** `lib/platform-bible-react/src/components/z-index.ts` and `z-index.test.ts` ship on `origin/main`, and the file's docstring documents exactly the PT-4476 incoherence ("a popover renders OVER a modal dialog"). #2750 **repairs** that scale (tooltip tier 550→675) and adds `.claude/rules/ux/z-index-tiers.md` (that directory currently holds only `apply-model.md`). **This ticket is not blocked on #2750** — build on the shipped scale and reconcile with #2750's repair.

⚠️ **Three open PRs are independently editing overlay layering** — #2750, #2672 (project-selector tooltip and filter dropdown rendering behind a popover), and #2718. **Pick one owner for the scale before touching the three shadcn menu content files**, or three branches will each invent a different ordering.

Every edit under `lib/platform-bible-react/src/components/shadcn-ui/` **must** carry a `// CUSTOM:` comment naming the class/prop changed, what it does and why — no exceptions, including mechanical find-and-replace. See `.claude/rules/code-quality/shadcn-discipline.md`.

For the stray border/shadow: the symptom is that hover-conditional chrome renders while the pointer is outside the menu, which usually means the hover state is being read from a container rather than the trigger, or a `data-state` is not cleared on close. Verify against the actual element before restyling.

### Testing Ideas

- Assert menu and popover content has a fully opaque background token in **both** light and dark themes, and in the `paratext` theme — the brief notes contrast behavior inverts there.
- Scroll content behind an open menu and assert the menu stays opaque (this is the specific PT-4101 repro, and it is the one a static snapshot misses).
- Assert the layering order across the full stack — tooltip over popover over menu over modal — as a single test that pins the tier scale rather than one pair at a time.
- Move the pointer outside the Project menu and assert border and shadow are gone; assert they return on re-entry.
- Visually verify in the running app, not only in Storybook: the transparency is a composited effect.

### Definition of Done

- Menus and popovers are opaque and readable in all themes, including while background content scrolls.
- The Project menu's border and shadow track pointer presence.
- Changes are made to the **existing** `z-index.ts` scale rather than to local `z-index` values, and the layering assertions extend `z-index.test.ts`.
- #2750's repair is reconciled with this work (whichever lands second rebases onto the other), and #2672's project-selector layering fix is checked against the same tiers.
- Every shadcn edit carries a `// CUSTOM:` annotation.
- PT-4101 is closed by this work rather than left open in parallel.

### Dependencies

- **Depends on:** nothing hard, but **reconcile with #2750's z-index scale first** (shares the scale with WI-7).
- **Land last in cluster A** — it rebuilds `dist`.
- **Serves:** TODD-NN-1.4, TODD-NN-1.5. Adopts PT-4101.

---

## WI-7 (Todd NTH-4 ≡ Ian NTH-4): Land the BCV chapter-hover alignment fix

**PRD half:** Todd (TODD-NTH-4 ≡ IAN-NTH-4 — nice-to-have in both PRDs; assigned to Todd's half) · **Landed by:** Jolie · **Lane:** L5, lands **first** in cluster C · **pbr cluster:** C

**Ownership (decided 8 Sep 2026, Q5b):** the requirement is **Todd's** — his wording carries the fact that a PR already exists — but **Jolie lands the code**, because it sits in lane L5 and is the first item in her `platform-bible-react` cluster C. The half and the lane disagree here **on purpose**: this item is a _merge decision_, not a build, so the requirement's owner and the person clicking merge need not match. **Still open:** whether to promote it out of nice-to-have, given that it is a merge rather than a build.

### User Story

As Saroj using the book/chapter control, I want the chapter hover highlight aligned with the chapter it belongs to, so that I do not select the wrong chapter.

### Description

**This is a triage-then-decide item, and it may turn out to be a build.** Three open PRs restyle `book-chapter-control`, but **it is not established that any of them fixes the reported hover-alignment defect** — #2750's diff adds row-hover styling and realigns the top-match chevron column, and its own title is "keyboard navigation, styling, and the z-index scale".

So the first task is **reproduce the defect and determine whether a fix for it exists at all**. Two outcomes, and the ticket should be re-labelled once known:

- **A fix exists** → this is a merge decision (which PR lands, what the others keep).
- **No fix exists** → this is a small build, and the three PRs are context rather than candidates.

Earlier drafts asserted "no new code, the fix is written three times over" _and_ "#2750 may not contain an alignment fix" in the same ticket. Those cannot both be true; resolve it before scoping.

⚠️ **Review states — this is a three-way collision, not "two equal PRs, pick one".**

- **#2750** (PT-4345) — **APPROVED but CONFLICTING** (created 1 Sep). Needs a rebase, not a review. Adds `.claude/rules/ux/z-index-tiers.md` and repairs the **existing** `z-index.ts` scale (it does not introduce one — see WI-6).
- **#2229** (Sebastian) — **CHANGES_REQUESTED and CONFLICTING**, created **27 April** (30 June is its last _update_). Two outstanding change requests, **no approval of any kind** — do not treat it as UX-approved.
- **#2239** (MattGyverLee) — edits `book-chapter-control.navigation.ts`, **which #2750 rewrites**. A third party to the same collision, not a side note.

⚠️ **#2750 does not appear to contain a chapter-hover _alignment_ fix.** Its diff adds row-hover styling and realigns the top-match chevron column; its title is "keyboard navigation, styling, and the z-index scale". **Confirm which PR actually fixes the reported alignment defect before closing this as "just land #2750".**

**Contention on `book-chapter-control/`: 10 raw, 5 substantive** — #2229, #2239, #2340, #2694, #2750. (#2768 has **merged** and is now baseline; #2191's only book-chapter file is a Storybook story; #2250/#2253 are dependabot; #2131/#2212 are drafts.) They cannot all merge as-is (engineering decision D7).

### Implementation ideas from Claude

Diff the two branches over `lib/platform-bible-react/src/components/advanced/book-chapter-control/` and decide per-change, not per-PR: #2750 carries the sprint tracking and the z-index scale WI-6 needs, so it is the natural base; #2229 carries the keyboarding and arrow work that is genuinely additional and should not be lost. The likely outcome is **land #2750, then rebase #2229 down to only what it uniquely adds** — but confirm that #2229's keyboarding overhaul is not itself a scope the sprint has no room for.

Note **#2239** also touches this component (a `hideVerse` prop on the trigger label) — check it against whichever base is chosen.

Also note the brief's incidental finding: **opening the BCV chapter grid clips its top row (PT-3121)**, and **BCV silently refuses a reference whose book is not in the active project (PT-4471)**. Neither is in scope here; do not let them expand the item, but reference them so a reviewer looking at this component knows they are known.

### Testing Ideas

- Assert the hover highlight's bounding box aligns with its chapter cell across a range of grid widths — misalignment is a geometry bug, so pin geometry, not a class name.
- Keyboard-traverse the grid and assert the highlight follows focus and matches the pointer-hover appearance.
- Assert the chosen z-index tiers are consistent with WI-6's stack test (one scale, two consumers).
- Whichever PR is dropped: confirm nothing it uniquely fixed regresses — carry its test cases onto the surviving branch.

### Definition of Done

- **The alignment defect is reproduced, and it is established whether any open PR fixes it** — this is the first task, and it decides whether this ticket is a merge or a build.
- If a fix exists: one PR is merged and the others are closed or rebased to their unique remainders, with the decision recorded on each of #2750, #2229 and #2239. If none does: the fix is written, on top of whichever PR lands first.
- The chapter hover highlight aligns with its cell by pointer and by keyboard.
- Nothing uniquely fixed by a dropped PR is lost.

### Dependencies

- **Depends on:** reconciling #2229 against #2750 — no code work otherwise. **Can start day one** once that call is made.
- **Blocks:** WI-6 (shares the z-index scale).
- **Ownership:** Todd's half (requirement), Jolie lands it (lane L5 / cluster C) — decided 8 Sep 2026. Only the promote-out-of-NTH question remains open.
- **Serves:** TODD-NTH-4 ≡ IAN-NTH-4. Engineering decision D7.

---

## WI-8 (Ian NTH-4): Theme contrast pass — `--input`, radio buttons, selection colours

**PRD half:** Ian · **Serves:** IAN-NTH-4 · **Lane:** L5 · **pbr cluster:** C

### User Story

As Saroj working in either light or dark theme, I want controls and text selections to be visibly distinguishable, so that I can tell which radio button is chosen and see what I have selected in an inactive column.

### Description

Review the UI against shadcn/ui, Tailwind and WCAG.

**This ticket has two tiers and its Definition of Done is split to match**, so "cut first except `--input`" is actually evaluable:

- **Tier 1 — do regardless:** the `--input` token, a **real WCAG 1.4.11 failure at ≈1.3:1**.
- **Tier 2 — cut first:** everything else below.

Known issues from rev2:

1. Radio buttons are low contrast (e.g. Internet settings).
2. Text-collection checkboxes in Simple's "Share" dialog are low contrast.
3. Text-selection colours need to be more visible — the left/right columns should **match the editor pane's** selection colour, and an inactive column's selection should be _less_ visible than the active one **but not near-invisible**.
4. A focused+selected radio button can get a double highlight+selection state (low priority if difficult).
5. Active-comment visibility — **should be fixed by IAN-NN-1.2 in WI-19′**; do not fix it twice.

### Implementation ideas from Claude

Measure before changing. The brief records the current active-comment contrast as **ΔL ≈ 1.6% in light, inverted in the `paratext` dark theme** — an inverted relationship means a token nudge that fixes light can worsen dark, so treat every theme as a separate check, not a follow-on.

The tokens live in `lib/platform-bible-react/src/index.css`. **PR #2324 already edits that file** (distinguishing accent from muted) — reconcile with it rather than landing a competing token set.

Item 3 is a three-way relationship, not a single colour: active column selection = editor pane selection, inactive column selection = _dimmer but still visible_. Express that as a derived token pair so the relationship survives a later palette change, rather than three hand-picked hex values.

For the radio work, edits land in shadcn `radio-group` — **each needs a `// CUSTOM:` annotation**. The `toggle.tsx` change originally bundled with WI-10 **moves into this lane** (decision D8), so that L3 touches no `platform-bible-react` at all.

### Testing Ideas

- Compute contrast ratios programmatically for the changed tokens in **every** shipped theme (light, dark, `paratext`) and assert them against the WCAG 1.4.11 threshold — this is the only way the inverted-dark case stays fixed.
- Assert the inactive-column selection is measurably dimmer than the active one **and** measurably distinct from the unselected background — two assertions, because "dimmer" alone permits invisible.
- Assert a focused+selected radio renders one combined state, not two stacked indicators.
- Verify the active-comment case is already satisfied by WI-19′ before touching it here.

### Definition of Done

**Tier 1 (required):**

- `--input` meets WCAG 1.4.11 in all themes, with the ratio asserted by test.
- Reconciled with **#2324** and **#2191** (both edit `src/index.css`); no competing token definitions remain. _(Tier 1 is a token change in `index.css` and touches no shadcn file, so no `// CUSTOM:` annotation applies to it.)_

**Tier 2 (satisfied only if not cut — state on the ticket which shipped):**

- Radio buttons and the Share dialog's checkboxes meet the contrast threshold in all themes.
- Selection colours follow the documented three-way relationship, expressed as derived tokens.
- A focused+selected radio renders one combined state, not two stacked indicators (issue 4).
- Every shadcn edit in this tier carries a `// CUSTOM:` annotation.

### Dependencies

- **Depends on:** nothing — can start, but is **cut-first except `--input`**.
- **Coordinate with:** **#2324 and #2191** (both edit `src/index.css`; #2191 also touches shadcn radio-group/toggle **and** `comment-list/`), plus #2250/#2253's Tailwind-v4 rewrites. WI-19′ owns active-comment contrast, not this ticket.
- **Absorbs:** the `toggle.tsx` change moved out of WI-10.
- **Serves:** IAN-NTH-4.

---

## WI-9 (Todd NTH-5.2): Add the Dictionary tab to column three

**PRD half:** Todd · **Serves:** TODD-NTH-5.2 · **Lane:** L3

### User Story

As Saroj looking up a word while drafting, I want a Dictionary tab in column three after Commentaries, so that I can consult it without leaving my layout.

### Description

The **Project-menu item is already done**; the column-3 tab is not. Adds the tab in the specified position and deliberately updates the test that currently pins the tab count.

### Implementation ideas from Claude

Follow the proven pattern rather than inventing placement logic: a supplement entry with `anchorWebViewType` + `insertBeforeWebViewType`, per `adr-tab-order-anchor-insert-before` — exactly what PT-4068/4069 (#2500) did to put Comments in column 3.

Two things will bite:

1. **`simple-layout.data.test.ts:46` asserts "exactly 4 tabs".** Update it deliberately, as a decision, with the new expected set spelled out — not by loosening the assertion.
2. **Two supplement JSONs exist** — core's and Studio's overwriting copy, and the Studio copy **omits `insertBeforeWebViewType`** and uses a different tab `id`. That drift means the shipped product **already appends Text Collection _after_ Find**, contrary to core's intent. Fix the drift here or file it; adding a fifth tab on top of an undiagnosed ordering bug will make the ordering look arbitrary.

Column-3 tab order also feeds **WI-4's** Tools section (TODD-NN-1.6f says Tools order reflects the UI order), so land these two consistently.

Note the brief's accessibility finding: **column-3's icon-only tabs expose no accessible name** — no `title`, no `aria-label`, no `<title>` in the SVG. Do not ship a fifth nameless tab; give the Dictionary tab an accessible name and consider fixing the existing four in the same pass.

**Not blocked on Q7.** `extensions/src/platform-lexical-tools/` is already in `paranext-core` with the components this work needs, and every edit here is in core — `default-layout-supplement.json`, `simple-layout.data.test.ts`, `shipped-simple-layout-order.test.ts`. Q7 concerns separate unbacked Dictionary work in `platform-bible-extensions`, which this ticket never touches.

### Testing Ideas

- **Two assertions, because there are two layers.** (a) `simple-layout.data.test.ts` asserts the **base** column-3 set, which goes from four to **five** with Dictionary. (b) `shipped-simple-layout-order.test.ts:211-220` asserts the **shipped merged** order, which goes from five to **six**: `bibleTexts`, `commentaries`, `commentListPanel`, `scriptureTextGrid` (Text Collection), `find`, plus Dictionary in its chosen position. Update both deliberately, as ordered assertions, rather than loosening either.
- Assert the supplement's resulting order in core. **Studio is out of scope for the test** — core has exactly one supplement JSON, and Studio's overwriting copy lives in a repo outside this sprint's footprint. If the drift is real, file it against Studio.
- Coordinate with **#2758**, which edits `default-layout-supplement.util.ts`, `simple-layout.builder.test.ts` and `shipped-simple-layout-order.test.ts` — the very tab-order tests this ticket updates.
- Assert every column-3 tab exposes an accessible name.
- Assert WI-4's Tools section order matches the resulting tab order.

### Definition of Done

- The Dictionary tab appears in column three after Commentaries **in core**. (Studio's build is out of scope; see below.)
- `simple-layout.data.test.ts` asserts the new ordered tab set.
- The core/Studio supplement drift is filed as a ticket against Studio if confirmed.
- The Dictionary tab has an accessible name.

### Dependencies

- **Depends on:** nothing — **startable day one.** `extensions/src/platform-lexical-tools/` already exists in `paranext-core` and every edit here is in core; Q7 concerns unbacked Dictionary work in `platform-bible-extensions`, which this ticket never touches.
- **Coordinate with:** WI-4 (Tools order), WI-10 (same extension), **#2758** (tab-order tests), **#2209** (draft design on the same Dictionary list component).
- **Serves:** TODD-NTH-5.2.

---

## WI-10 (Todd NTH-5.3): Fix Senses card formatting and strip definition-string artefacts

**PRD half:** Todd · **Serves:** TODD-NTH-5.3 · **Lane:** L3

### User Story

As Saroj reading a dictionary entry, I want definitions to wrap inside reasonably sized cards and to start with the definition itself, so that I can read them without horizontal scanning or mentally deleting stray punctuation.

### Description

Three symptoms from rev2: text wrapping is missing; cards are too wide (possibly _caused by_ the wrap failure); and an unexpected `=` precedes each definition. Scoped to `platform-lexical-tools` card layout plus a data-cleanup utility — **the `toggle.tsx` change originally bundled here moves to WI-8** (decision D8), which keeps L3 free of `platform-bible-react` entirely.

### Implementation ideas from Claude

Diagnose the width before styling it: if the cards are wide _because_ nothing wraps, fixing the wrap fixes the width and a width cap would just mask it. Fix wrapping first, then measure whether a cap is still needed.

The leading `=` is a **data** artefact, not a rendering one: **12,315 dictionary rows begin with `=`**, and the data also leaks `{L:}`, `{D:}`, `{S:}` and `►`/`◄`. So this needs **a definition-string cleanup utility**, not a `slice(1)` at the render site — the other markers will surface the moment the `=` is gone. Write it as a pure function over a definition string, with the full artefact set as its test corpus, so the same util can be reused wherever definitions are displayed.

Do **not** fix this by editing the database — that is WI-11's repo and a different failure (a semantic-domain off-by-one). Cleanup at read time is the right layer here.

### Testing Ideas

- Table-drive the cleanup util over all four artefact classes (`=` prefix, `{L:}`/`{D:}`/`{S:}` tags, `►`/`◄`) plus strings that legitimately contain `=` mid-definition — the false-positive case is what a naive prefix strip gets wrong.
- Assert a long definition wraps within a fixed-width card and that the card's width does not grow with content length.
- Render a Senses card at narrow and wide panel widths and assert no horizontal overflow.
- Spot-check against real rows from the shipped dictionary, not only synthetic strings.

### Definition of Done

- Senses card text wraps; card width is bounded and does not track content length.
- Definitions render without leading `=` or leaked `{L:}`/`{D:}`/`{S:}`/`►`/`◄` markers, via a reusable cleanup util with a table-driven test.
- No horizontal overflow at any panel width.
- No database edits in this item.

### Dependencies

- **Depends on:** nothing — **startable day one.** Q7 concerns unbacked Dictionary work in `platform-bible-extensions`; this ticket's edits are in core's `platform-lexical-tools/`.
- **Hands off:** the `toggle.tsx` change → WI-8. ⚠️ **This crosses the owner boundary:** WI-10 is Todd's half (Tom), WI-8 is Ian's half (Jolie), so TODD-NTH-5.3 ends up split across both implementation owners. D8 reads as a lane optimisation but is also an ownership split.
- **Serves:** TODD-NTH-5.3.

---

## WI-11 (Todd NTH-5.1): Correct the `lexical.db` semantic-domain off-by-one

**PRD half:** Todd · **Serves:** TODD-NTH-5.1 · **Lane:** L3 (async — different repo, no contention)

### User Story

As Saroj checking a word's semantic domain, I want the domain shown to be the word's actual domain, so that the Dictionary does not tell me "Land" means "Lamp".

### Description

**Repo: `paranext/dependencies` — outside all five repos in the sprint's normal footprint.** The PRD's instruction was to _investigate_ and, if large, stop and report the likely size in PT-3848. That investigation is **done, and the answer is a bounded data correction**: this is a **data off-by-one** in `lexical.db`, not a lookup-logic bug. Land↦Lamp is 98 vs 99; God↦Destruction is 49 vs 50. **No spike needed.**

### Implementation ideas from Claude

Because the symptom is a uniform ±1 index shift, the fix is a data correction plus a guard that the shift cannot silently return. Before correcting, confirm the shift is **uniform across the whole table** rather than localized — a partial shift means a different (and larger) problem, and that determination changes the fix.

Establish which side is authoritative (the domain numbering source, not the database) and correct toward it. Record the mapping decision in the PR, because a future reader looking at corrected data cannot tell a fix from a corruption without it.

Add a fixture-backed assertion using the PRD's own reproductions — EXO 20:12 Land, God, Woman — so the specific cases the product owner reported are the ones pinned.

**Cross-repo consequence:** the fix ships on `paranext/dependencies`' cadence, not the sprint's. Note in PT-3848 what core version picks it up, or the sprint can close with the ticket green and the app still wrong.

### Testing Ideas

- Assert EXO 20:12's Land, God and Woman resolve to their correct domains (the reported cases).
- Assert the shift is uniform: sample across the table's full index range and confirm no residual off-by-one anywhere, rather than testing only the three reported rows.
- Add a boundary case at each end of the index range — off-by-one bugs hide at the edges.
- Verify through the running Dictionary UI, not only against the database, so the consuming query is covered too.

### Definition of Done

- The domain mapping is corrected in `lexical.db`, with the authoritative source and direction recorded in the PR.
- Uniformity of the original shift is confirmed (or a non-uniform shift is escalated rather than partially patched).
- EXO 20:12's reported cases resolve correctly in the running app.
- PT-3848 records which core version picks up the dependency bump. ⚠️ **This cannot close inside the sprint by construction** — the fix ships on `paranext/dependencies`' cadence. **Treat the ticket as done when the corrected data is merged there and the bump is recorded**, and track the core pickup separately; otherwise the sprint closes green with the app still wrong.

### Dependencies

- **Depends on:** nothing — **can start day one.** _(The data fix itself is in `paranext/dependencies` and `lexical.db` appears in no open PR. But note `extensions/src/platform-lexical-tools/` **is** in `paranext-core` and 8 open PRs touch it, including **#2654** on `lib/download-db.ts` — so "different repo, no contention" is not the right reason.)_
- **Serves:** TODD-NTH-5.1. Closes the investigation the PRD asked for.

---

## WI-12 (Todd NN-2.2): Pin marker and editable-region positioning with a regression test

**PRD half:** Todd · **Serves:** TODD-NN-2.2 · **Lane:** L2 (filler)

### User Story

As Saroj drafting in Simple with hanging-indent markers, I want the marker glyph and the editable text to stay clear of each other at any column width, so that a narrow column never makes my text unreadable.

### Description

**Reduced from a fix to a regression test.** The runtime adjudication did **not** reproduce the reported defect: in Simple's gutter view the `\li1`/`\li2` glyphs sit at **x 22–58** with first-line text at **77–139**, with **no collision at 958 / 620 / 460 / 380 px**, and both `--para-indent` (`10vw`/`15vw`) **and** `--verse-text-start` (`-7.5vw`) are set on the `li` paragraphs.

So **WI-12 drops out of the critical path.** What it leaves behind is worth having: nothing currently pins the no-collision property, and two copies of the stylesheet can drift.

### Implementation ideas from Claude

Pin the **property**, not the pixel values: assert that the marker glyph's box and the first-line text box do not overlap, evaluated across the same column widths that were measured (958 / 620 / 460 / 380 px). A test asserting `x == 22` would fail on every legitimate design tweak; a test asserting non-overlap fails only when the defect returns.

Both `--para-indent` and `--verse-text-start` must be present for the geometry to hold, so assert their presence on `li` paragraphs too — that is the mechanism, and it is what a refactor would drop.

⚠️ **There is no core/engine pair of `_usj-nodes.scss` — do not plan a cross-repo assertion.** Verified on both `origin/main`s:

- **Both `_usj-nodes.scss` copies are in `paranext-core`** — `extensions/src/platform-scripture-editor/src/` and `extensions/src/platform-enhanced-resources/src/`.
- **The engine has no `.scss` at all**; its equivalent is `packages/platform/src/usj-nodes.css` (with its own `usj-nodes.css.test.ts`). A **third** copy exists at `lib/platform-bible-react/src/components/demo/scripture-editor/usj-nodes.css` — five usj-nodes stylesheets across the two repos, none of them guarded against the others.
- **`usj-nodes-scss-coverage.test.ts` reads only its own sibling** (`resolve(dir, '_usj-nodes.scss')`). It cannot see the second copy. "Put the assertion where that guard can see both" describes a capability it does not have, and the enhanced-resources copy is guarded by nothing but a "keep manually in sync" comment.

**Revised instruction:** put the regression assertion against the `platform-scripture-editor` copy (the one Simple renders). If cross-copy drift is worth guarding, that is a **separate** ticket to extend the coverage test to both paths — don't smuggle it in here.

**Sequencing:** PR #2745 builds the editor from source and moves the repo. It does **not** delete `packages/scribe` — that directory is still present on engine `origin/main` (73 files) and is removed by a different, still-open PR in the engine repo. Confirm paths before writing the test, but don't plan around a deletion that hasn't happened.

### Testing Ideas

- Non-overlap of glyph box and first-line text box at 958 / 620 / 460 / 380 px, for `li1` and `li2` (and `q2`/`lim2` if inexpensive).
- Presence of `--para-indent` and `--verse-text-start` on `li` paragraphs.
- `usj-nodes-scss-coverage.test.ts` still passes.
- **Deliberately not tested:** exact pixel positions, and the second (`platform-enhanced-resources`) stylesheet copy — cross-copy drift is out of scope here; file it separately if wanted.

### Definition of Done

- A regression test asserts glyph/text non-overlap across the four measured column widths in Simple's gutter view.
- The custom-property mechanism (`--para-indent`, `--verse-text-start`) is asserted alongside the outcome, since it is what a refactor would drop.
- TODD-NN-2.2 is closed as **not reproduced**, with the measurements recorded on the ticket so the next reporter starts from evidence.

### Dependencies

- **Depends on:** nothing — **can start day one**. Filler work for L2.
- **Sequence around:** #2745 (engine move).
- **Serves:** TODD-NN-2.2. Reduced by the runtime adjudication.

---

## WI-13 (Todd NN-2.3): Make the paragraph marker itself a selection target

**PRD half:** Todd · **Serves:** TODD-NN-2.3 · **Lane:** L2 · **Repos:** engine + core · **Highest-risk item in the sprint**

### User Story

As Saroj wanting to change a paragraph's marker, I want to select the marker itself — not only the paragraph's content — so that I can be confident about which marker I am about to change.

### Description

Today Saroj can select the _content_ of a paragraph and change its marker via the dropdown, but **cannot select the marker itself**. Both should be possible. Owns the **selection-model half** of TODD-NN-2, downstream of WI-14's curated marker set.

**The runtime adjudication pinned the mechanism.** A programmatic range over the glyph **is accepted** (`selection.toString() === "\li2 "`, anchor inside the glyph) and is then **cleared within ~900 ms** by a deliberate policy guard. A dispatched real click puts the caret on the paragraph's _text_ instead. So this is a **predicate change, not a new selection model** — the planning artifact's "new Lexical selection model" reading is **wrong**.

### Implementation ideas from Claude

Most of what this needs already exists and ships:

- A paragraph marker already **is** a selectable Lexical node — `MarkerNode extends TextNode`.
- `NodeSelection` over a marker is already implemented, styled and shipped for the guarded-delete arming path: `StructureKeyboardPlugin.tsx:129` → `useLexicalNodeSelection` → `VERSE_SELECTED_CLASS_NAME`.

⚠️ **The guard is per-node, not per-view.** `libs/shared-react/src/plugins/usj/ParaMarkerPrefixCursorGuardPlugin.tsx:30` (engine `origin/main` `ebf47d0b`):

> _"WHICH marker is caret territory is decided one NODE at a time, **never per view**: a marker rendered in the gutter is an aid to reading, so it is never a caret position, while a marker rendered as editable text in the flow IS content the user clicks into on purpose. A document can carry both at once…"_

The predicate is deliberately **per-node**, because one document can carry gutter and in-flow markers simultaneously. **Do not add a view-conditional branch** — that is precisely what the guard is built to avoid.

**The mechanism to extend is `gutterMarkerState`.** "Derive it from the node" is only actionable because the node already carries the answer: `gutterMarkerState` is a Lexical **NodeState** created at `libs/shared/src/nodes/features/ImmutableTypedTextNode.ts:48` and read back by the `$isGutterMarker`-style helper at `:237`; glyphs are stamped with it at creation (`:224`) and the flag round-trips through `updateFromJSON` (`:186`). The adaptor stamps it from the `viewOptions` **it** holds — so the view decision is made once, at adaptor time, and the guard afterwards only reads node state.

This matters practically: the guard runs inside a Lexical read with **no DOM handle** (`decorate()` returns `null`), and `libs/shared/` **cannot import `ViewOptions`** — so "inspect how the node is rendered" is not implementable literally. **Read the NodeState.** Add the third state as another NodeState-derived branch alongside the existing two.

One irreducibly per-view piece remains, and it belongs on the _styling_ side rather than the predicate: `useLexicalNodeSelection` reads the editor's selection, and `StructureKeyboardPlugin`'s armed state is plugin `useState`. Keep that separation — predicate from node state, selection styling from editor state.

⚠️ **The existing `NodeSelection` support is for _verses_, not markers — it is not a ready-made kit.** The arming code is at `StructureKeyboardPlugin.tsx:129` (`$createNodeSelection()`), but `useLexicalNodeSelection` and `VERSE_SELECTED_CLASS_NAME` live in **`libs/shared-react/src/nodes/usj/ImmutableVerseNode.tsx`**. Extending it to markers is real work, not a re-wire.

So the work is:

1. Add a **third state** to the per-node predicate: _"not a caret position, but a valid selection target"_ — decided from how the node is rendered, **not** from the active view.
2. Add a marker selected-state class, modelled on (but not shared with) the verse one in `ImmutableVerseNode.tsx`.
3. Teach `markerMenuContext.utils.ts:176` (`packages/platform/src/editor/markerMenu/`) to accept the `NodeSelection` it currently declines — feeding the existing single entry point `$applyParaMarker`.

**New input to read first: engine #538 "PT-4304: Add read-only block-verse view mode"**, now the tip of engine `main` (30 files, +2681/−125). It leaves `ParaMarkerPrefixCursorGuardPlugin.tsx`, `ImmutableTypedTextNode.ts` and `glyphPositions.utils.ts` **untouched**, so it does not disturb this ticket's mechanism — but it changes the surrounding contract in ways that matter more to **WI-12 and WI-14** than to this ticket: it rewrites `getViewMode` as an inversion over `getViewOptions` with default-canonicalization, adds a fifth view mode, introduces **`isBlockVerseLayout` as the predicate anything offering editing must call**, extends `assertEditable` to `cut`/`paste`/`formatPara`/`insertNote`, and gates comment authoring in `Marginal.tsx`. **Any ticket that offers an edit affordance must now call `isBlockVerseLayout`** — check WI-13, WI-14 and WI-12 against it.

Per the rabbit-hole decision, the visual feedback can be as simple as **highlighting the whole row containing the marker in column 1 and the text in column 2**, "if not difficult" — do not design a novel affordance here.

**Two unknowns to resolve, not assume:**

- Closed-unmerged engine **PR #548** documents Lexical boundary normalization **re-anchoring carets _into_ marker nodes** in editable mode, with **no successor PR**. Read it before changing the predicate; it may describe the same guard from the other direction.
- `ImmutableVerseNode.isKeyboardSelectable()` returns **false**, so keyboard-reachable selection needs that override revisited — and a pointer-only selection target is an accessibility regression waiting to be filed.

⚠️ **This crosses a Standard-View invariant.** `glyphPositions.utils.ts` (`libs/shared/src/nodes/usj/`) exists specifically to re-express positions so that **no glyph is an operand of the edit about to run** — and a marker selection deliberately makes a glyph _the_ operand. **This needs the invariants owner, not a judgment call in the PR.**

_Citation corrected:_ "Invariant II" is the **engine** doc's numbering (`docs/standard-view-invariants.md` in `scripture-editors`). The host doc, `.context/standards/Standard-View-Invariants.md`, numbers its sections **1–6**, and the relevant one is **§6 "One position language"**. Read both halves and cite the right one in the PR.

### Testing Ideas

- Assert a programmatic range over a marker glyph **survives** — the current bug is that it is cleared ~900 ms later, so the test must assert _after_ the guard would have fired, not synchronously.
- Assert a real click (dispatched, not synthetic-range) on the glyph selects the marker rather than putting the caret on the paragraph text at offset 0 — and that the scripture reference does **not** move as a side effect (it currently jumps to the next verse).
- Assert the selected-state class appears on the marker and, per the chosen affordance, on the corresponding rows.
- Assert `$applyParaMarker` succeeds from a `NodeSelection`, not only from a caret-in-paragraph selection.
- Keyboard: assert the marker is reachable and selectable by keyboard, or that `isKeyboardSelectable` was deliberately left false with a filed follow-up.
- **Invariant regression:** assert that with a marker selected, the edits the glyph-as-operand invariant protects against still behave (engine `docs/standard-view-invariants.md` §II ≡ host `Standard-View-Invariants.md` §6) — the invariants owner specifies this test, so **agree it before starting**.
- Assert Power/Standard view behavior is unchanged. **Drive that from `gutterMarkerState`, not from the active view** — a test that flips a view mode to exercise the predicate would encode the very coupling the guard forbids.

### Definition of Done

- Saroj can select a paragraph marker by pointer, sees clear visual feedback, and can change it via the dropdown.
- Selecting the marker does not move the scripture reference.
- The guard predicate's third state is documented at the declaration site, deriving the answer **per node** (consistent with the existing docstring), not per view.
- The invariants owner has reviewed the glyph-as-operand crossing against engine `docs/standard-view-invariants.md` §II / host `Standard-View-Invariants.md` §6, and the agreed regression test is in place. **Consult them before starting, not at review time** — otherwise this criterion cannot be evaluated and the ticket stalls at review.
- PR #548's boundary-normalization finding is either resolved or explicitly recorded as still-open with a ticket.
- Keyboard selectability is either implemented or deliberately deferred with a filed ticket.

### Dependencies

- **Depends on:** **Q1** (does Simple get marker editing, and on what terms), **WI-14** (the curated marker set), and **invariants-owner sign-off**. **Cannot start day one.**
- **Sequence around:** #2745 (engine move).
- **Serves:** TODD-NN-2.3. Confirmed by the runtime adjudication; mechanism pinned.

---

## WI-14 (Todd NN-2.1): Declare the core paragraph-marker set host-side and fix palette coverage

**PRD half:** Todd · **Serves:** TODD-NN-2.1 · **Lane:** L2

### User Story

As Saroj marking up a list or a section heading, I want the paragraph markers I actually use offered in the marker dropdown — and not offered markers that are not paragraph markers — so that I can apply the right marker without guessing.

### Description

Owns the **marker-set half** of TODD-NN-2 and is the prerequisite for WI-13.

**The live dropdown offers 26 items** — `cl h h1 h2 h3 ide m ms ms1 ms2 ms3 mt mt1 mt2 mt3 mt4 nb p pi q1 q2 r s toc1 toc2 toc3` — exactly the 26 entries of `blockMarkerToBlockNames`. **`li1`, `li2`, `s1`, bare `q` and `q3` are absent**, while `h`/`h1-3`/`ide`/`toc1-3`/`cl` are **present**. A paragraph already carrying `li2` reports as **"li2 – Miscellaneous Marker"**.

⚠️ **The right discriminator is `MarkerCategoryType`, not `MarkerType`.** Do not describe the unwanted entries as "non-paragraph markers" and do not try to exclude them by type — **all 26 are `MarkerType.Paragraph`**, so `isBlockMarker` returns `true` for every one of them:

|                                                   | Category                                          |
| :------------------------------------------------ | :------------------------------------------------ |
| **Wanted** — `p s m mt1 nb pi q q1 q3 s1 li1 li2` | `Paragraphs`, `Poetry`, `Lists`, `TitlesHeadings` |
| **Unwanted** — `h h1 h2 h3 toc1 toc2 toc3 ide cl` | `Headers`, `FileIdentification`, `DivisionMarks`  |

So the curation predicate is **`type === MarkerType.Paragraph && category ∈ {Paragraphs, Poetry, Lists, TitlesHeadings}`**, subject to Q2's explicit list. That single predicate both adds the missing markers and drops the unwanted ones — the two "sides" of this item are one derivation.

### Implementation ideas from Claude

**The list belongs in core, not the engine.** Engine PR #495 deliberately _removed_ the handbook marker list; marker sets arrive from the host as `StyleInfo`; and the Standard-view invariants prefer a declared property over a new exception list.

**Two things already exist that this work should use rather than rebuild:**

- **`isBlockMarker(marker)` exists** at `lib/platform-bible-utils/src/markers/usfm-markers.ts:3079` and is **exported from the package index** (`src/index.ts:56`). It derives from `usfmMarkers` by `MarkerType.Paragraph` (plus a `v` special case) rather than a hand list. Use it as the **first** half of the predicate — but it is **not sufficient on its own**, because it admits all nine unwanted markers. Add the category filter above. _(`isCharacterMarker` at `:3111` derives from `MarkerType.Character` minus `DivisionMarks` and is not used here.)_
- **The edit site is `blockMarkerToBlockNames` at `extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts:503`** — 26 entries, comment _"This list is incomplete."_ at `:502`, consumed by `generateParagraphMenuListItems` (`:562`) and reaching the dropdown via `platform-scripture-editor.web-view.tsx`. It is the sole source of the dropdown's contents, and it is uncontended by any open PR.

So the work is: **replace the hand-maintained list with the type+category derivation**, curated to Q2's explicit set.

⚠️ **Two costs to budget:**

1. **Localization.** Only 26 `%paragraphMenu_*%` keys exist, one per current entry, and the generator has **no title fallback** — any newly admitted marker renders a **raw localize key** in the UI until a key is added. Every marker Q2 adds needs a key in `en.json` plus the five other locales.
2. **Trigger width.** `paragraph-style-trigger.component.tsx` (created by #2768, now on main) records that the trigger already overruns at Simple's 297px column floor. Widening the marker set makes that worse, and the trigger is #2768's fresh surface — **rebase onto `b921a4f59e6` before sizing.**

⚠️ **Baseline warning:** **#2768 is creating `paragraph-style-trigger.component.tsx`**, which **does not exist on `origin/main`** — it is building this ticket's UI surface right now. **Do not size WI-14 against `main`.** Additionally, 13 open PRs touch the editor/marker surface, and the marker UI itself is in `platform-bible-react` (`marker-menu.component.tsx` + 4 palette utils + `use-extra-valid-markers.hook.ts`), so this ticket **lands pbr** — see the corrected cluster note in the parent.

**Check PR #2761 first.** It reports that block markers `p`/`q`/`s1` have been missing from the **Formatted-view** marker palette since #2565 and reverts that palette to walking `usfmMarkers[parentMarker].children`. Two consequences: part of this work is a **revert, not new coverage**, and #2761 establishes the very `usfmMarkers`-derived source this item wants. **Its claim differs in detail from what ships, though** — the adjudication found `p` **is** present in the Simple dropdown; `s1` and bare `q` are the ones missing. Verify against the live app, not against the PR body.

**Rename the concept.** "Tier 1" already means the marker-_rename_ engine strategy in `scripture-editors` (`markerEditTier1.utils.ts`). Use **`coreParagraphMarkers`**. This is not cosmetic — the collision has already caused cross-repo confusion.

⚠️ **Widening the insertion set widens the corpus that must satisfy the transform fixed point** (`tier2Rebuild.corpus.test.tsx`). And **multi-node selections that `$isCloseAndReopenEligible` declines are known to mangle the spans they cross** — so **do not route more traffic there** without checking each newly admitted marker against that path.

**First task, before sizing the rest:** confirm whether **applying** a curated marker in Simple succeeds or is refused by the protection gate. The adjudication deliberately stopped short of applying, because that writes project data — so this is a genuine unknown, and it is the open half of Q1.

### Testing Ideas

- Assert the Simple dropdown's item set **equals** the set the predicate yields — an equality assertion, so both a missing marker and a stray unwanted entry fail.
- Assert `li1`, `li2`, `s1`, bare `q` and `q3` are present, and `h`, `h1-3`, `ide`, `toc1-3`, `cl` are absent — **and assert the mechanism is the category filter**, since all nine excluded markers pass `isBlockMarker` and a type-only predicate would silently readmit them.
- Assert every marker in the yielded set resolves a **localized title**, not a raw `%paragraphMenu_*%` key.
- Assert a paragraph carrying `li2` reports **"li2"** with its correct name, not "Miscellaneous Marker".
- Assert an **apply** of each newly admitted marker round-trips through the USJ/USFM writer, and extend `tier2Rebuild.corpus.test.tsx`'s corpus accordingly — the fixed-point property is what the widening threatens.
- For each newly admitted marker, assert `$isCloseAndReopenEligible` accepts it, or that the decline path does not mangle crossed spans.
- Assert the set is derived via the **existing exported** `isBlockMarker` / `usfmMarkers` path, so a marker added upstream does not need a second hand edit — and assert `blockMarkerToBlockNames`' hand-maintained list is gone rather than merely extended.
- Assert Power/Formatted-view palettes are unaffected (or affected only as #2761 intends).

### Definition of Done

- `coreParagraphMarkers` is declared in core as a **type + category** derivation over `usfmMarkers` (not a new hand-maintained list), `blockMarkerToBlockNames`' incomplete list is retired, and the Simple dropdown's contents equal the derived set exactly.
- Every marker in the set has a localized title in all six locale files — no raw keys reach the UI.
- The trigger still fits at Simple's 297px column floor with the widened set, or the overflow behavior is deliberately chosen and recorded.
- Applying each marker in the set succeeds in Simple (or Q1's answer explicitly scopes which do), verified in the running app.
- The transform fixed-point corpus covers every newly admitted marker.
- The "tier 1" name is not used for this concept anywhere in the change.
- #2761 is landed (it is approved and mergeable).
- **PT-4488 is re-read before being claimed.** It is filed as "remove non-paragraph entries", but those entries _are_ paragraph-typed — confirm what it actually asks for and either close it with the category filter or correct its description.
- The C# serialization approval gate, if touched, is satisfied per the Standard-View invariants.

### Dependencies

- **Depends on:** **Q1** (terms of marker editing in Simple), **Q2** (someone must supply the explicit marker list — it exists nowhere in code, config, docs or localization in either repo, and it is a critical-path blocker in its own right), a **#2761 check** (approved + mergeable — land it), and **#2768's baseline**. **Cannot start day one.**
- **Blocks:** WI-13.
- **Serves:** TODD-NN-2.1. Grown slightly by the runtime adjudication (removal as well as addition).

---

## WI-15 (Todd NN-2.4): Add a real hover delay to the paragraph-marker tooltip

**PRD half:** Todd · **Serves:** TODD-NN-2.4 · **Lane:** L2, **first item**

### User Story

As Saroj moving the pointer across the editor, I do not want paragraph-marker tooltips flashing at me, so that the gutter stays calm while I read.

### Description

Small, well-understood, and startable on day one — which is why it leads L2 while Q1 is outstanding.

**`delayDuration` is currently inert.** The overlay renders `<Tooltip open={!!hoveredData}>` at `paragraph-marker-tooltip-overlay.component.tsx:176`; because `open` is controlled by hover state directly, Radix's delay never applies. **A real timer is needed** — passing a `delayDuration` will change nothing.

### Implementation ideas from Claude

Add the delay to the state that drives `open`, not to the `Tooltip`: start a timer on hover-enter, set `hoveredData` only when it fires, and clear the timer on hover-leave so a fast pass sets nothing at all. That is what removes the flashing; a delay on an already-controlled `Tooltip` is a no-op.

`TOOLTIP_DELAY = 300` already exists at `platform-bible-toolbar.tsx:71` — reuse the constant rather than introducing a second number, so the app has one hover-delay feel.

Two details worth getting right: moving between two adjacent markers should not re-pay the full delay from scratch (the usual tooltip-group behavior), and the timer must be cleared on unmount or a hover-then-navigate leaves a pending setState.

⚠️ **PR #2577 is APPROVED and MERGEABLE today**, and edits **this exact component** to remove the paragraph-marker tooltip from Power (it adds an `enabled?: boolean` gating every hover handler). **Land it first and build the timer on top** — do not develop in parallel and merge-resolve later. It may also narrow this item to Simple only; if so, record that on the ticket rather than silently scoping down.

_Citation confirmed:_ the inert `<Tooltip open={!!hoveredData} onOpenChange={() => {}}>` is at **`:176`** on `origin/main`, and there is **no timer anywhere in the file** — this ticket's premise holds exactly as written.

### Testing Ideas

- Assert no tooltip appears before the delay elapses, and that one appears after — with fake timers, since this is a timing property.
- Assert a hover shorter than the delay produces **no** tooltip and leaves no pending state.
- Assert moving between adjacent markers does not restart the full delay (or that the chosen behavior is deliberate).
- Assert the timer is cleared on unmount — a pending setState after unmount is the classic leak here.
- Confirm in the running app that the flashing is actually gone; this is a perceptual defect and a passing timer test does not prove it.

### Definition of Done

- Marker tooltips appear only after the shared delay and never flash on a quick pass.
- The delay reuses `TOOLTIP_DELAY`, with no second constant introduced.
- No pending timer survives unmount.
- Reconciled with #2577, and any narrowing to Simple-only is recorded.
- Verified in the running app, not only in tests.

### Dependencies

- **Depends on:** nothing — **can start day one**, first item in L2.
- **Conflicts with:** **#2577** (same file). Coordinate with Sebastian.
- **Serves:** TODD-NN-2.4.

---

## WI-16 (Todd NN-3.1): Add settle-loop `scrollToVerse` to the Scripture Text Grid

**PRD half:** Todd · **Serves:** TODD-NN-3.1 · **Lane:** L3, **first item**

### User Story

As Saroj reading Text Collection alongside the editor, I want it to follow the verse I am on like the other column-3 tabs do, so that the third column is not the one pane that ignores me.

### Description

TODD-NN-3.1 is **largely already shipped** and should be closed on its actual remainder (Q6). Column 3's exclusion from scroll sync was deliberate and documented (`platform-scripture-editor/src/main.ts:1120-1122`), and that decision has since been reversed for Bible texts + Commentaries (PT-4467 #2749) and Comments (PT-4080 #2543/2554/2558/2562).

**The exact inventory — worth reading before scoping, because the tab counts are easy to get wrong:**

- Simple's **base** column 3 (`src/renderer/components/docking/simple-layout.data.ts:111-144`) is four tabs: `bibleTexts`, `commentaries`, `legacyCommentManager.commentListPanel`, `platformScripture.find`.
- **Text Collection** (`platformScriptureEditor.scriptureTextGrid`) is merged in from `default-layout-supplement.json`, anchored on `bibleTexts` and inserted before `find`, gated on `platformScriptureEditor.enableScriptureTextGrid` — whose **default is `true`** (`contributions/settings.json:9`). So it **ships visible to Saroj**; there is no "the fix might be invisible" risk.
- The **shipped** merged column 3 is therefore **five** tabs, and `shipped-simple-layout-order.test.ts:211-220` asserts exactly that order under the name _"merging the real supplement puts Text Collection before Find"_.
- **Find is not unsynced — it is the most explicitly synced tab of the five.** `resolveFindScrollGroupScrRef` returns `0` unconditionally in Simple (`extensions/src/platform-scripture/src/find/find-web-view-state.utils.ts:18-24`), with a docstring stating "Find follows the single reference the top-toolbar BCV drives." Find is also a results list, not a verse-scrolling surface, so it needs no `scrollToVerse`.

**What actually remains:** **Text Collection has no `scrollToVerse` at all** (zero occurrences in `scripture-text-grid*` on `origin/main`), and there is **no Simple-mode scroll-group test** — `scroll-group-sync.spec.ts:63` is `interfaceMode: 'power'` and editor-only, so nothing pins any of this. That is the whole scope.

**On the comment at `main.ts:1120-1122`:** it says these panels are "not scroll-synced with the scripture editor in simple mode". That is **wrong today, and was wrong before this ticket** — declining to force `scrollGroupScrRef` leaves it `undefined`, which `use-scroll-group-scr-ref.hook.ts` resolves to group 0, so Bible texts and Commentaries do follow the reference. **Correct or delete it; do not preserve it.**

### Implementation ideas from Claude

Copy the settle loop from `resource-text-panel.web-view.tsx:604-763` (PT-4467 #2749) — the same defect, fixed next door, one panel over. Key it on `isViewVisible` and the reference fields, as that implementation does.

**Fix the comment at `main.ts:1120-1122`** — its claim that these panels are not scroll-synced in Simple is false (see the Description). Replace it with what is actually true: the code declines to _force_ `scrollGroupScrRef`, and the hook defaults the resulting `undefined` to group 0.

⚠️ **The hidden-tab case is mandatory here, not optional.** Per `.claude/rules/cross-view-sync-hidden-views.md`: rc-dock keeps inactive tabs **mounted but hidden with `display: none`**, so JavaScript and subscriptions keep running but **there is no layout** — geometry reads return zero and `scrollIntoView` no-ops. In Simple, with one visible tab per stack, **hidden is the common case**. Use `useViewVisibility` / `useRunWhenVisible` from `platform-bible-react` (reference consumers: `useBcvSyncScroll` in `legacy-comment-manager/`, `find.web-view.tsx` in `platform-scripture/`), defer the layout-dependent side effect while hidden, collapse repeats into one pending catch-up, and consume it **instantly, not animated**, on visibility. Document the decision **both** at the sync site and in the PR description.

**Add the missing Simple-mode test** — `scroll-group-sync.spec.ts:64` is `interfaceMode: 'power'` and editor-only, so **nothing currently pins any of this**.

⚠️ **Sequencing:** PT-4270/4351/4352 are sharding the scroll-group machinery for Power this cycle — coordinate. **7 substantive PRs** touch the grid/scroll surface — #2340, #2632, #2736, #2744, #2745, #2748, #2774 (12 raw, the rest being drafts and dependabot). #2773 is **not** among them: it touches only `use-buffered-layout-setting.hook.ts`.

### Testing Ideas

- Simple-mode scroll-group test (the one that doesn't exist): move the reference and assert Text Collection scrolls to the verse, not merely the chapter.
- **Hidden-tab catch-up test, required by the rule:** mount the sync while hidden, change the reference, flip visibility, assert the pending catch-up fires — and that repeats collapsed into **one** run, not a queue.
- Assert the catch-up is instant rather than animated on activation.
- Assert the settle loop terminates (bounded) when the target verse never appears — a settle loop that never settles is the failure mode this pattern brings with it.
- Assert Bible texts and Commentaries **do** follow the group reference in Simple — the fact the stale comment denies, and the reason it must not be preserved.
- Assert the shipped merged column-3 order still matches `shipped-simple-layout-order.test.ts:211-220` after any supplement change.

### Definition of Done

- Text Collection follows the scroll group's verse in Simple, visible and hidden.
- A hidden-mount → change → activate catch-up test passes, and the hidden-case decision is documented at the sync site **and** in the PR description.
- The false comment at `main.ts:1120-1122` is corrected or removed, with a test pinning the behavior it denied.
- A Simple-mode scroll-group test exists (the suite is Power-only today).
- Coordinated with PT-4270/4351/4352 and the **7 substantive** open PRs on the grid/scroll surface (#2340, #2632, #2736, #2744, #2745, #2748, #2774).
- TODD-NN-3.1 is closed on its remainder — Text Collection's verse scroll plus the missing Simple-mode test — with the already-shipped tabs recorded rather than re-verified.

### Dependencies

- **Depends on:** nothing — **can start day one**, first item in L3.
- **Blocks:** WI-18 (same grid files).
- **Coordinate with:** PT-4270/4351/4352; PRs #2776, #2736, #2744, #2773, #2718.
- **Serves:** TODD-NN-3.1. Re-scoped per Q6.

---

## WI-17 (Todd NN-3.2): Add `scrollToRange` so find and check results scroll to the match

**PRD half:** Todd · **Serves:** TODD-NN-3.2 · **Lane:** L2

### User Story

As Saroj jumping to a find or check result, I want the view to scroll to the highlighted text itself, so that I can see the match instead of hunting for it below the fold.

### Description

Confirmed by the runtime adjudication, and **larger than the PRD describes — two distinct failure modes, and the narrow-column condition is not required; it fails at full width too.**

- **Same-chapter** (Gen 10:3 → 10:18-19, "Lasha"): the reference updates and the match **is** highlighted, but the editor **does not scroll at all** — `scrollTop` stays 88 with the match **2094 px below** the viewport top.
- **Cross-chapter** (Gen 1:1 → 10:18-19): it _does_ scroll (`scrollTop` 0 → 1011), but only until the target verse's **start** scrapes the bottom edge (verse 18 at rel 961 of a 981 px viewport) — verse 8 is at the top and the match is **216 px below the viewport bottom**.

Read together: verse-granular scrolling is not enough. The PRD's own wording says it — "scrolls to the beginning of the verse, which may leave the content off screen".

### Implementation ideas from Claude

**The engine owns no scrolling**, so this is host-side. But `scrollToAnnotation` (`editor-dom.util.ts:263-319`) **has reusable geometry** — start there rather than writing new measurement code.

The two failure modes want different things and both must be fixed: the same-chapter case is a **missing trigger** (a reference change within the current chapter doesn't initiate a scroll at all), while the cross-chapter case is a **wrong target** (it scrolls to the verse start and stops when that start is merely on screen). So: (1) make an intra-chapter match trigger a scroll, and (2) target the **match range**, not the verse start, and require it fully within the viewport rather than just its leading edge.

Because a match can be longer than the viewport, define the desired end state explicitly — e.g. the match's start positioned some way down from the top — rather than "scroll until visible", which is the rule that produced the bottom-edge behavior.

Apply the same hidden-view discipline as WI-16 (`.claude/rules/cross-view-sync-hidden-views.md`): geometry-driven sync **silently does nothing** inside a `display: none` iframe, so a result activated from a hidden tab must defer and catch up.

Substitute repros are fine — the adjudication used TPD, which carries equivalent cases to HPUXR.

### Testing Ideas

- **Both** failure modes as separate cases: same-chapter (assert `scrollTop` actually changes) and cross-chapter (assert the **match**, not the verse start, is fully inside the viewport).
- Assert at **full** column width as well as narrow — the defect is not narrow-only, and a narrow-only test would let the common case regress.
- Assert a match longer than the viewport lands at the defined position rather than off-screen.
- Assert a match at the very start and very end of a chapter both land in view.
- Hidden-tab: activate a result while the tab is hidden and assert the catch-up scroll fires on activation.
- Use the PRD's repro (Find "Notting" in GEN 14:1-4) plus the adjudication's ("Lasha", Gen 10:18-19) so both reported cases are pinned.

### Definition of Done

- Both failure modes are fixed: an intra-chapter match scrolls, and a cross-chapter match lands fully in view rather than at the bottom edge.
- The desired scroll end state is documented at the call site, not implied by "until visible".
- Works at full and narrow column widths.
- The hidden-tab case is handled and documented per the cross-view-sync rule.
- Verified in the running app against both repros.

### Dependencies

- **Depends on:** nothing — can start.
- **Reuses:** `scrollToAnnotation` (`editor-dom.util.ts:263-319`) geometry.
- **Serves:** TODD-NN-3.2. Confirmed and enlarged by the runtime adjudication.

---

## WI-18 (Todd NTH-1.1/1.2): Text collection — click-toggle verse/chapter view and tighten row layout

**PRD half:** Todd · **Serves:** TODD-NTH-1.1, TODD-NTH-1.2 · **Lane:** L3

### User Story

As Saroj scanning several texts side by side, I want to click a row to open its chapter and click again to return to the verse, and I want each row to start at the left edge with its short name inline, so that I see text instead of whitespace.

### Description

Two nice-to-haves on the same surface.

**1.1 — the capability is already done** (PT-4062 #2540 added chapter/verse `viewMode` plus a chapter-context panel, `grid.component.tsx:232-236`). New work is **only the click affordance and toggle-back**: first click activates chapter view, second returns to verse.

**1.2 — remove whitespace**: remove the left margin; show the short name inline in a **fixed-size area** (so rows align with each other) immediately followed by content; flow content after and beneath the short name — "same as PT9".

**Todd's screenshot is the specification** for 1.2 — **Q9 item 4** asks the product owner to confirm it is authoritative over any prose reading. PT9 flows content beneath a fixed-width inline short-name badge with no left margin.

### Implementation ideas from Claude

For 1.1, the toggle is a UI affordance over existing state — do not add a second source of truth for `viewMode`. Make the row's click handler toggle the existing mode, and give the row a visible affordance that it is clickable (the current version has the capability with no discoverable trigger).

For 1.2, "fixed-size area for the short name" is the load-bearing detail: it is what makes rows align, so implement it as a fixed inline box with overflow handling rather than letting the badge size to its content. Content flowing _after and beneath_ the badge is a text-wrap-around shape, not a two-column layout — choosing a flex/grid split here will get the second line wrong.

Files: `scripture-text-grid*`, `resource-cell-view.component.tsx`, `_editor.scss`.

Also close the small gap the brief notes on the already-done TODD-NTH-1.3: **no drag grip in verse mode**. It is one affordance on the same rows and belongs with the row work — TODD-NTH-1.3 itself is done (PT-4078 #2542, drag + keyboard + per-user persistence).

### Testing Ideas

- Assert first click enters chapter view and second returns to verse, and that the mode is the pre-existing `viewMode` state rather than a duplicate.
- Assert the short-name area has the same width across rows with short and long names, and that a long short-name is handled (truncated, not wrapped or overflowing).
- Assert no left margin remains and content begins immediately after the badge.
- Assert content wraps _beneath_ the badge on the second line, matching the PT9 shape — a screenshot-diff or an explicit geometry assertion, since this is the detail a flex layout gets wrong.
- Assert the verse-mode drag grip is present and reorders, matching chapter-mode behavior.
- Check RTL, since removing a left margin is direction-sensitive.

### Definition of Done

- Click toggles verse ↔ chapter view with a discoverable affordance, over the existing `viewMode`.
- Rows have no left margin; short names sit in a fixed inline area with content immediately following and wrapping beneath.
- The layout matches Todd's screenshot (confirmed authoritative per **Q9 item 4**).
- A verse-mode drag grip exists, closing TODD-NTH-1.3's remaining gap.
- RTL is correct.

### Dependencies

- **Depends on:** **WI-16** (same grid files — sequential within L3, not parallel), and **7 substantive PRs** touch that surface (#2340, #2632, #2736, #2744, #2745, #2748, #2774).
- **Confirm first:** **Q9 item 4** on the parent — that Todd's screenshot is authoritative over any prose reading.
- **Serves:** TODD-NTH-1.1, TODD-NTH-1.2, plus TODD-NTH-1.3's residual grip.

---

## WI-19′ (Ian NN-1.1/1.2/1.3/1.4): Comments — density, active-comment contrast, toolbar ordering, date and author filters

**PRD half:** Ian · **Serves:** IAN-NN-1.1, IAN-NN-1.2, IAN-NN-1.3, IAN-NN-1.4 · **Lane:** L5 · **pbr cluster:** C

### User Story

As Saroj working through comments, I want the comments tab to fit more on screen, to make obvious which comment is active, to keep its toolbars in the right order, and to let me filter by date and author, so that I can work the list instead of fighting it.

### Description

**Consolidates the whole of IAN-NN-1** into one item because every part lives in `comment-list/` + `comment-editor/` — one owner, one `platform-bible-react` landing event (decision D8).

1. **NN-1.1 whitespace** — reduce it _without significantly moving the locations of content within a comment_. If low cost, put the "@" and "↑" buttons **inside** the comment box to save space.
2. **NN-1.2 active-comment visibility** — the active comment must be obviously active.
3. **NN-1.3 basic PT9 filters** — two filter controls with their options displayed. **No plain-text search, no sort control** unless very low cost.
4. **NN-1.4 bug** — newly added comment styling buttons render **above** the comment-filter toolbar.

**No-go: annotations in the editor.**

### Implementation ideas from Claude

**NN-1.1:** `Card` already accepts `size="sm"` — the brief calls this a **low-blast-radius lever** and it is the right first move, because it reduces padding without relocating content, which is exactly the constraint the requirement states. Only then consider moving the "@"/"↑" buttons inside the box, and treat that as the "if low cost" half it is written as.

**NN-1.2:** measure first. Current active-comment contrast is **ΔL ≈ 1.6% in light and inverted in the `paratext` dark theme** — so a single token change cannot fix both, and this must be checked per theme. This requirement also **discharges IAN-NTH-4's item (5)**, so WI-8 should not fix it again.

**NN-1.3 is largely shipped** (PT-4027 #2508): the filter stack is five orthogonal dropdowns, and **`dateFilter` and `author` are already backed in C#** (`comment-list-filters.model.ts`, `CommentThreadSelector.cs`). So the remaining work is **UI only** for those two — not a new filter pipeline. Per Q6, close NN-1.3 on that remainder. Note there is **no tag/category filter at any layer** while PT9 has one — that is Q8, not silent scope.

**NN-1.4** is an ordering bug — likely a DOM/render-order issue where a newly mounted toolbar is inserted before the filter toolbar. Fix the order at its source rather than with a `z-index` or `order` override, which would leave the underlying insertion wrong.

**Contention on the comments surface: 4 raw, 1 substantive.** **#2191** (semantic tokens — `comment-list/` _and_ `comment-editor/`, plus shadcn and `index.css`), **#2211** (per-view zoom — `legacy-comment-manager/comment-list.web-view.tsx`), and **#2250 / #2253** (dependabot Tailwind-v4 rewrites across `comment-list/` and `comment-editor/`). Only **#2211** is substantive; #2250/#2253 are dependabot and #2191's comments hits are Storybook-only (its real overlap with this epic is `src/index.css`, which is WI-8's). **So the runway here is nearly clear and this ticket is startable day one** — just coordinate with #2211.

### Testing Ideas

- Assert comment card padding shrinks **and** that the relative order/position of content _within_ a comment is unchanged — that second assertion is the requirement's actual constraint.
- Compute active-vs-inactive contrast programmatically in light, dark and `paratext` themes and assert each meets the threshold — the inversion means one theme passing proves nothing about the others.
- Assert the date filter and author filter UIs drive the existing C#-backed `dateFilter`/`author` selectors, with options displayed as the PRD requires.
- Assert **no** plain-text search and **no** sort control were added (the PRD excludes them; a test keeps a well-meaning follow-up from adding them).
- Assert the styling toolbar renders **below** the filter toolbar, by DOM order rather than visual position.
- Assert the "@"/"↑" buttons remain keyboard reachable if moved inside the box.

### Definition of Done

- Comment density is reduced with no content relocation inside a comment.
- The active comment is clearly distinguishable in all three themes, with contrast asserted by test — and IAN-NTH-4(5) is closed by this, not by WI-8.
- Date and author filters have UI wired to the existing backend selectors, with options displayed.
- The styling-buttons-above-toolbar bug is fixed at its insertion site.
- No plain-text search, sort control, or editor annotations were added.
- IAN-NN-1.3 is closed on its remainder per Q6, with the already-shipped filters recorded.

### Dependencies

- **Depends on:** nothing — **can start day one**.
- **Answers pending, non-blocking:** Q8 (are the PT9 filter omissions deliberate).
- **Hands off:** active-comment contrast is **this** item's, not WI-8's.
- **Serves:** IAN-NN-1.1, 1.2, 1.3, 1.4. Consolidates the former WI-19 + WI-20.

---

## WI-21 (Todd NTH-2): Make the caret visible while arrowing through an empty verse

**PRD half:** Todd · **Serves:** TODD-NTH-2 · **Lane:** L2 · **Repo:** engine

### User Story

As Saroj arrowing left and right through a passage with an empty verse, I want to see where my caret is and have my typing land there, so that I do not lose my place in the text.

### Description

**This is real work, not a verify-and-close item** — and that is a change from the earlier reading. An engine sweep had it as "mostly done" on the strength of PRs #520/#536; the runtime adjudication **reproduced it on `main`**.

Measured: crossing an empty verse takes **3 intermediate keystrokes in both directions**. During them the caret rect is height 0 at (-4, -46) — **outside the editor box** — anchored on the `<p>` element at offset 0/2, and **on the middle keystroke the selection disappears entirely** (`NO RANGE`).

ZWSP placeholders **are** present in the DOM (`\p @ZWSP@3@ZWSP@@ZWSP@4@ZWSP@`), so `EmptyVerseCaretGuardPlugin`'s host mechanism exists but **yields no visible caret for this shape** — an empty verse **between two verses inside one paragraph**. #520/#536 landed but do not cover that shape.

**Caveat to respect:** a collapsed range anchored on an element node can legitimately return a zero-height rect in Chromium, so "caret height 0" alone is **not** proof the user sees no caret. The unambiguous evidence is the **three-keystroke traversal** and the **vanished selection** — test against those, not against the rect.

### Implementation ideas from Claude

Since the ZWSP placeholders are already in the DOM, the gap is that the caret anchors on the **`<p>` element** rather than inside a placeholder text node. So look at where `EmptyVerseCaretGuardPlugin` decides to place the selection for this shape, rather than adding more placeholders.

The three-keystroke traversal is itself the specification of the bug: each arrow press should advance to a position the user can see, so the intermediate element-anchored positions are the thing to eliminate. And the middle-keystroke `NO RANGE` is a stronger signal than the geometry — a selection that vanishes is unambiguous.

Reproduce on TPD Gen 1:3 (empty verse), which the adjudication used, in addition to the PRD's HPUXR 2 Kings 2:7.

**Sequence around #2745**, which moves the engine to `paranext/scripture-editors` and deletes `packages/scribe`.

### Testing Ideas

- Assert arrowing across an empty verse between two verses **in one paragraph** takes no keystroke at which the selection is absent — the `NO RANGE` case is the crisp assertion.
- Assert the number of keystrokes to cross is the intended one, in **both** directions (the defect is symmetric).
- Assert typed text lands at the visible insertion point, which is the requirement's actual promise.
- Cover the shapes #520/#536 already fixed as well, so this does not regress them.
- **Do not** assert on caret rect height alone — a zero-height rect is legitimate for an element-anchored collapsed range.
- Verify visually in the running app; caret visibility is perceptual.

### Definition of Done

- Arrowing across an empty verse between two verses in one paragraph never produces a keystroke with no selection.
- Typed text appears at the visible insertion point.
- Traversal takes the intended number of keystrokes in both directions.
- The shapes covered by #520/#536 still pass.
- Verified in the running app on both repros (TPD Gen 1:3 and HPUXR 2 Kings 2:7).

### Dependencies

- **Depends on:** nothing — **can start day one**.
- **Sequence around:** #2745 (engine move).
- **Serves:** TODD-NTH-2. Reclassified from "verify and close" to real work by the runtime adjudication.

---

## WI-22 (Ian NN-3.1): Promote `ProjectSelector` to the stable barrel and open up `RowSection`

**PRD half:** Ian · **Serves:** IAN-NN-3.1 _(Stretch Goal in rev2)_ · **Lane:** L4, **enabling change** · **pbr cluster:** B

### User Story

As a developer building any project- or resource-selection surface, I want one supported, composable selector that can express the sections my surface needs, so that a defect fixed once is fixed everywhere Saroj sees a picker.

### Description

The enabling change for the picker lane. **No spike is needed and no design question is open** (engineering decision D1) — this is a **consolidation**.

**The unified multi-select already exists.** `ProjectSelector` has a **`project-multi` mode** with multi-select over `(projectId, scrollGroupId)`, select-all/clear-all and show-selected-only (`project-selector.component.tsx:212-258`, `:643-645`, `:951-960`), three row-grouping schemes including auto-collapse to flat (`project-selector.rows.ts:373-452`), and `triggerLabelFormat: 'shortNameAndFullName'` (`:225`). Sprint 88's Find selector already ships on it in both Simple and Power configurations.

**Ian's no-go caps this:** do **not** unify into a single component. The shaped approach allows **two** shared components (a picker and a management modal) and accepts some divergence. The Simple-local shim option is closed out.

### Implementation ideas from Claude

Four concrete changes:

1. **Promote** `ProjectSelector` from `experimental.ts:15-21` to the stable barrel.
2. **Give consumers a way to supply their own sections** — so "Recent / Your projects / All projects…" can be expressed.

   ⚠️ **Specify this as a prop on `ProjectSelector`, not as a change to `RowSection`.** `RowSection` is **internal**: it is not exported from `experimental.ts` (which exports only `ProjectSelector` and four types), and its sole consumer is `project-selector.component.tsx`. Naming an unexported type as the deliverable leaves an engineer unable to tell what public API to add.

   Also note **`label?: string` already ships** on `RowSection` (`project-selector.rows.ts:332-334`), used by `kind: 'versification'` for "a custom-labeled section". So a labelled section is already representable internally; the gap is only that a **caller** cannot define one. Establish what is actually missing at the prop layer before widening or replacing the `kind` union (`:328`). See **Q11**.

3. **Add the `type`/`kind` discriminator to `ProjectSelectorProject`** that merged PR #2671 documented as missing: projects and resources currently render **identically**, with the distinction living only in localized strings.
4. ⚠️ **Do NOT drop `getSelectedText` or `defaultGroupByOpenTabs` — neither is dead.**

   - `defaultGroupByOpenTabs` is documented at `project-selector.component.tsx:177`, **consumed at `:574`** (`useState(props.defaultGroupByOpenTabs ?? true)`), and referenced by `hideFilterMenu`'s TSDoc at `:207` as the thing that still applies grouping when the toggle is hidden. _(Find does not pass the prop — `find.component.tsx:805` is a comment about the power-mode section headings, not a call site. The default at `:574` is the reason it works, which is exactly why removing the prop is risky.)_
   - `getSelectedText` is live at `project-selector.component.tsx:810-811` and is the documented default trigger-label path.

   Deleting either would be **a behavior change dressed as cleanup**. Out of scope. If a prop audit is wanted, it needs its own ticket.

⚠️ **The blocker is the PR queue, not a design question.** The picker surface carries **17 raw / 9 substantive** open PRs (#2294, #2340, #2632, #2672, #2673, #2674, #2675, #2742, #2750), of which **5 edit `project-selector.component.tsx` itself** (#2340, #2672, #2673, #2675, #2750). **#2340 is the most entangled PR in the whole queue** — 407 files, substantive on five of this epic's surfaces. Draft **#2223** is a tenth party that no path grep surfaces (see Q11).

**#2673 overlaps changes (2) and (3) and must be reconciled, but it is not the blocker it first appeared.** It widens `RowSection.kind` 4 → 7 (`+ 'language' | 'type' | 'lastUsed'`), adds `partitionByLanguage`/`ByType`/`ByLastUsed`, and adds `type?: string` to `ProjectSelectorProject` with TSDoc **arguing against ever closing `type` to a union** — the opposite of change (3). It does **not** add `label`; that already ships.

Two consequences:

- The `type` disagreement is a genuine design decision to settle with #2673's author, not a merge conflict.
- **#2223** (draft) is a third party here and is invisible to a path grep: it keeps the flat `advanced/project-selector.component.tsx` layout while #2673 has moved the same symbols into `advanced/project-selector/`. Structurally these two are the likeliest pair to collide.

#2673 is `REVIEW_REQUIRED` + `CONFLICTING`, so it is not landing unattended. See **Q11**.

**#2349 does _not_ contradict this** — it targets `ResourcePickerDialog`, the DBL-resource picker, a different component. Stating that explicitly so it stops reading as a blocker.

**Constraint:** shared components must **not regress PT10 Power**, which will eventually adopt them.

### Testing Ideas

- Assert a consumer can supply its own named sections and that they render in the supplied order — the capability WI-23 needs.
- Assert the previously fixed section kinds still render identically, so existing consumers are untouched.
- Assert projects and resources render distinguishably from the new discriminator, **without** relying on localized strings.
- Assert every existing consumer (Find, manage-books, checks side panel, settings sidebar) still compiles and behaves after the promotion and the dead-prop removal.
- Assert `project-multi` mode's select-all / clear-all / show-selected-only still work — the mode this item exposes rather than builds.
- Run Power's consumers explicitly; "must not regress Power" needs a test, not an intention.

### Definition of Done

- `ProjectSelector` is exported from the stable barrel and no longer from `experimental`.
- Consumers can supply their own row sections; the old fixed kinds still work.
- `ProjectSelectorProject` carries a `type`/`kind` discriminator and rendering uses it.
- `getSelectedText` and `defaultGroupByOpenTabs` are **retained and still working**, and Find's power-mode section headings are asserted unregressed.
- The public prop for consumer-supplied sections is named and documented (**not** a change to the unexported `RowSection`), the `type` open-vs-closed disagreement with #2673 is settled with its author and recorded, and the 9-PR picker queue is reconciled.
- All existing consumers — Find, manage-books, checks side panel, settings sidebar — are asserted unregressed in Simple **and** Power.
- No third shared selection component is introduced.

### Dependencies

- **Depends on:** **reconciling the picker queue — 9 substantive PRs** (#2294, #2340, #2632, #2672, #2673, #2674, #2675, #2742, #2750), of which #2340 is the most entangled, plus draft **#2223** which no path grep surfaces. **Q11** decides the final scope, and part of it is answerable against main today.
- **Blocks:** WI-23, WI-24.
- **Recovery lever:** if cluster B slips, **land WI-22 alone** — it is useful even if WI-23/24 are cut (decision D8).
- **Serves:** IAN-NN-3.1.

---

## WI-23 (Ian NN-2.1, NN-2.3 part, NN-3.2): Migrate the titlebar picker onto `ProjectSelector`

**PRD half:** Ian · **Serves:** IAN-NN-2.1, IAN-NN-2.3 (in part), IAN-NN-3.2 · **Lane:** L4 · **pbr cluster:** B

### User Story

As Saroj switching projects from the titlebar, I want the blue-box menu to get out of the way, and I want the list to make sense about which projects it is showing me, so that on a small screen I can actually pick the project I mean.

### Description

**This is the concrete duplication the PRD complains about.** The titlebar is a **bespoke picker** and does **not** use `ProjectSelector`; its list is a **flat either/or** — `projectPickerItems = recentProjects.length > 0 ? recentProjects : allProjects` at **`:354`** — not two sections.

⚠️ **This file is not in `platform-bible-react`.** It is at **`src/renderer/components/platform-bible-toolbar.tsx`** (zero matches under `lib/platform-bible-react/`). Consequence: **the titlebar half of this ticket is outside pbr**, so cluster B's pbr exposure is only `project-selector/` and `resource-picker-dialog/`. The bespoke picker block is ~`:582-640`.

**Live confirmation of the symptom:** the titlebar picker lists **one** project ("Test Project Demo (TPD)") plus "More projects…", despite **9 projects (5 editable)** existing. That is IAN-NN-2.3's "'Your projects' content is unclear" seen directly.

Requirements owned here: the blue-box menu must disappear while selecting projects (especially on small screens where they overlap), and the flat either/or list becomes comprehensible sections with a way to reach the rest.

**IAN-NN-2.2 is explicitly out of scope** — the PRD states "Recent" already works as expected. **Verify, don't build.**

### Implementation ideas from Claude

Migrate onto the `ProjectSelector` WI-22 exposes, using consumer-supplied sections for **Recent / Your projects / All projects…** — replacing the flat either/or. The three existing row-grouping schemes, including auto-collapse to flat, cover the sectioning behavior.

**Preserve `useShrinkStep` / `ShrinkStepContext`.** Per `adr-toolbar-shrink-measurement`, **container queries have failed three times on this toolbar** — do not reintroduce them as part of the migration.

**Two live bugs to fix while here, both about the affordance disappearing exactly when needed:**

- **"More projects…" vanishes when there are zero local projects** — precisely when it matters most. The cause is `disabled={!hasProjectPickerItems}` at **`:594`** and the `{hasProjectPickerItems && (<SelectContent>` guard at **`:611`** — not `:598`, which is only a placeholder ternary.
- **"More projects…" lists TPD, zzzz11, GTP8, RWB but T_90 is absent** — 4 of 5 editable projects; possibly PT-4511's read-only exclusion. Confirm against PT-4511 before treating it as new.

For the blue box, the overlap is a layering/dismissal problem — coordinate with **WI-6**'s z-index tier scale rather than picking a local `z-index`.

Note the accessibility finding while in the toolbar: **column-3's icon-only tabs expose no accessible name** (see WI-9).

### Testing Ideas

- Assert the titlebar picker renders **sections** (Recent, Your projects, All projects…), not a flat either/or, with all editable projects accounted for.
- Assert the 9-project / 5-editable fixture surfaces every project Saroj can reach — the specific live symptom.
- Assert "More projects…" is reachable when there are **zero** local projects — the cause is `disabled={!hasProjectPickerItems}` at `:594` and the `{hasProjectPickerItems && (<SelectContent>` guard at `:611`.
- Assert T_90-shaped projects appear, or that their exclusion is PT-4511's intended read-only behavior.
- Assert the blue-box menu is dismissed when the picker opens, at a **small window width** where they overlap.
- Assert `useShrinkStep` behavior is preserved across shrink steps; no container queries introduced.
- Assert "Recent" still behaves as the PRD says it already does (the verify-only requirement).

### Definition of Done

- The titlebar uses the shared `ProjectSelector`; the bespoke picker is gone.
- The list is sectioned and shows every project Saroj can reach on the current server, or explains what it is filtering.
- The blue-box menu dismisses on picker open, verified at small widths.
- "More projects…" is present with zero local projects.
- `useShrinkStep` is preserved; no container queries.
- IAN-NN-2.2 is verified (not rebuilt) and recorded.
- Power is unregressed.

### Dependencies

- **Depends on:** **WI-22**.
- **Blocks:** WI-26.
- **Coordinate with:** WI-6 (z-index scale for the blue box), PT-4511 (read-only exclusion).
- **Serves:** IAN-NN-2.1, IAN-NN-2.3 (part), IAN-NN-3.2.

---

## WI-24 (Ian NN-2.4 ≡ Todd NTH-3): Make shortname-first consistent across tab titles, dialogs and components

**PRD half:** **Both** — IAN-NN-2.4 (non-negotiable) ≡ TODD-NTH-3.1 (nice-to-have). **Build once.** · **Implementation owner:** Jolie (Ian's half) · **Lane:** L4 · **pbr cluster:** B

⚠️ **Scope is provisional — Q5(a) is still open on the parent.** This ticket is drafted to Q5(a)'s _suggested_ answer: it lives on **Ian's half as a non-negotiable**, and it currently carries **all three** parts of TODD-NTH-3 because they share one formatting helper. **If Q5(a) is confirmed as suggested, trim this ticket to the titlebar scope and split parts (2) and (3) — responsive long name, search on either name — into a Todd-half nice-to-have sub-task owned by Tom.** The Definition of Done below marks which items belong to which scope so the split is mechanical.

### User Story

As Saroj identifying a project anywhere in the app, I want its short name first and consistently, and I want to find it by typing either its short or its long name, so that the same project looks like the same project in every surface.

### Description

**The only intentional cross-PRD overlap in the pair.** Ian's rev2 links Todd's item by name; it is one piece of work at two priorities and must be built once.

Three parts, from TODD-NTH-3: (1) always show the short name first — in tab titles, dialogs and components; (2) show the long name **responsively** when space allows (as Power's Home does — short when narrow, long when wide); (3) allow find on short **or** long name (Settings currently searches short names only).

### Implementation ideas from Claude

`triggerLabelFormat: 'shortNameAndFullName'` already exists (`project-selector.component.tsx:225`) — the format is available; the problem is **inconsistent adoption and a data gap**.

**Part 3 is a data-plumbing gap, not a search bug.** Settings searches short names only because its adapter sets `fullName = shortName` (`settings-sidebar.component.tsx:93-101`), which also trips `ProjectSelector`'s `fullName === shortName` de-dup rule. **PR #2674 already fixes exactly this** — adopt it rather than rewriting it.

Also note the sort inconsistency: **Find sorts by `fullName` while `ProjectSelector` sorts by `shortName`.** Pick one and make it explicit, or the same project list orders differently in two places.

For part 2, use **`useShrinkStep` / `ShrinkStepContext`**, not container queries — they have failed three times on this toolbar (`adr-toolbar-shrink-measurement`).

⚠️ **Constraint: PT-4216 documents implicit coupling between the Share Layout dialog and real tab titles.** Changing tab-title formatting can move the Share Layout dialog. Check it before touching tab titles.

**Scope note:** if Q5(a) is answered as suggested, this item is scoped to the titlebar as Ian's non-negotiable, and TODD-NTH-3.2/3.3 (responsive long name, search-on-either-name) become separately-owned nice-to-haves — currently listed cut-first. Do not silently deliver all three under a non-negotiable.

### Testing Ideas

- Assert short-name-first in tab titles, dialogs and components — one shared formatting helper asserted at each consumer, so a new consumer cannot format it its own way.
- Assert the long name appears at wide widths and is dropped at narrow ones, driven by shrink steps.
- Assert a search matches on both short and long name, with `fullName` genuinely distinct from `shortName` in the Settings adapter (the #2674 fix).
- Assert Find and `ProjectSelector` sort the same list into the same order.
- Assert the Share Layout dialog is unaffected, per PT-4216's coupling.
- Assert `fullName === shortName` de-dup still suppresses a genuine duplicate (don't fix the adapter by breaking the rule).

### Definition of Done

Tagged by scope so a Q5(a) split is mechanical — **[IAN-NN]** stays on this ticket, **[TODD-NTH]** moves to a Todd-half sub-task if the split is confirmed:

- **[IAN-NN]** Short name appears first in tab titles, dialogs and components, via one shared helper.
- **[IAN-NN]** Find and `ProjectSelector` agree on sort order.
- **[IAN-NN]** The Share Layout dialog is verified unaffected (PT-4216).
- **[TODD-NTH-3.2]** Long name shows responsively via shrink steps; no container queries.
- **[TODD-NTH-3.3]** Search matches short or long name; the Settings adapter no longer mirrors one into the other, and #2674 is landed or absorbed rather than duplicated.
- **[IAN-NN]** `fullName === shortName` de-dup still suppresses a genuine duplicate. _(Assigned to the IAN-NN half so a Q5(a) split leaves nothing unowned.)_
- Q5(a) is answered and this ticket's scope matches the answer.

### Dependencies

- **Depends on:** **WI-22**.
- **Free win:** **#2674** already fixes the Settings adapter half.
- **Constrained by:** PT-4216 (Share Layout ↔ tab-title coupling).
- **Provisional on:** **Q5(a)** — if confirmed as suggested, split the `[TODD-NTH]` items above into a Tom-owned nice-to-have sub-task.
- **Serves:** IAN-NN-2.4 ≡ TODD-NTH-3. **Build once, two priorities.**

---

## WI-25 (Ian NN-3.3): Fix the four named picker defects in place

**PRD half:** Ian · **Serves:** IAN-NN-3.3 · **Lane:** L4 · **pbr cluster:** B

### User Story

As Saroj using any of the project or resource pickers, I want long names not to force horizontal scrolling, a second modal to replace the first rather than hide behind it, the project picker to get out of the way when More Resources opens, and short names aligned the same way everywhere.

### Description

**The part Saroj actually feels, and it is shippable without WI-22/WI-23.** Per the rabbit-hole decision, fix the **top 3 Saroj hits** and **punt the long tail with a tracking issue** — do not attempt every reported picker defect.

The four named in IAN-NN-3.3:

- **(a)** Horizontal scroll on long resource names or in a small modal.
- **(b)** Layout with Team (modal) → Manage Commentaries treats the modal like a popover; the second modal should go **overtop/replace** the first.
- **(c)** The project picker stays visible when the More Resources modal is open.
- **(d)** Inconsistent short-name layout — Project → More projects **right**-aligns the short name; More resources **left**-aligns it.

### Implementation ideas from Claude

Fix these **in place**, independent of WI-22 — that independence is the point of the item and it is why it can start on day one while the picker queue is still being reconciled.

**(b)** and **(c)** are the same class of problem as WI-6: overlay layering and dismissal. Coordinate with **#2750**'s z-index tier scale rather than picking local values, and note **#2672** is already fixing a project-selector tooltip/filter-dropdown that renders behind a popover.

**(a)** overlaps **#2746** (PT-4430), which adds ordering, scope and a **scroll affordance** to the language picker across `resource-picker-dialog`, `filter.component.tsx` and `multi-select-combo-box`. **Check what #2746 leaves before building.**

**(d)** should be fixed by making both surfaces use the same formatting helper as **WI-24**, not by flipping one alignment — otherwise the third surface added next sprint picks a third alignment.

For **(a)** more generally: horizontal scroll on long names is usually a missing truncation/wrap decision. Decide it once (truncate with the full name available on hover, presumably) and apply it to both pickers.

### Testing Ideas

- Assert no horizontal overflow with a very long resource name, at a small modal width — the two conditions together, since either alone may pass.
- Assert opening Manage Commentaries from Layout-with-Team replaces/overlays the first modal rather than rendering behind it, and that dismissing returns to a sane state.
- Assert the project picker is not visible while the More Resources modal is open.
- Assert short-name alignment is identical in More projects and More resources, and that both read it from the shared helper.
- Assert the layering assertions use WI-6's tier scale, so the four fixes cannot each encode a different z-index.
- Re-check after #2746 lands, so (a) is not fixed twice or half-fixed.

### Definition of Done

- The defects taken on are fixed, each with a regression test. **Reconcile the count first:** the Description says fix the top 3 Saroj hits and punt the tail, while IAN-NN-3.3 names four — decide whether (d) is in or out, and record it rather than leaving both numbers standing.
- (b)/(c) use the shared z-index tier scale, not local values.
- (d) is fixed via WI-24's shared formatting helper.
- (a) is reconciled with #2746.
- The remaining long-tail picker defects are filed as one tracking issue rather than absorbed.

### Dependencies

- **Depends on:** nothing to _start_ — independent of WI-22 by design. ⚠️ **But not completable day one:** defect (d) is routed through WI-24's shared formatting helper, and WI-24 depends on WI-22 → the picker queue. Either accept that (d) lands later than (a)/(b)/(c), or fix (d) locally and refactor onto the shared helper when WI-24 arrives — **decide which, and say so on the ticket.**
- **Coordinate with:** #2746 (overlaps (a)), #2672 and #2750 (layering), WI-24 (shared name helper for (d)). ⚠️ **Cross-lane, cross-cluster dependency:** (b) and (c) use **WI-6's** tier scale, which is L1/cluster A while this is L4/cluster B — so "nothing to start" is true only for (a). Sequence (b)/(c) after WI-6, or use the shipped `z-index.ts` scale directly and rebase onto WI-6's repair.
- **Serves:** IAN-NN-3.3.

---

## WI-26 (Ian NN-2.3): Reach S/R server projects from "All projects…"

**PRD half:** Ian · **Serves:** IAN-NN-2.3 · **Lane:** L4, **last** · **Repos:** core + studio · **Most likely item to fire a valve**

### User Story

As Saroj who has access to projects on the Send/Receive server that are not yet on this machine, I want "All projects…" to show them and let me get one, so that I am not told my only projects are the ones already downloaded.

### Description

**The PRD's complaint is correct.** The affordance is live and works; what sits behind it is a **local-disk-only** list — `use-project-picker-data.hook.ts:334-391` builds `recent` + `allProjects` from local metadata and **never calls `getSharedProjects`**.

⚠️ **Hard constraint: `getSharedProjects` is registered only in Studio's patch layer** — declared at `src/@types/paratext-bible-send-receive/index.d.ts:443`, registered only via `paratext-10-studio/repo-patches/paranext-core.patch:7501-7506`. **A server-reaching picker would throw in plain Platform.Bible.**

Three further gaps: there is **no cached S/R project list anywhere** (unlike the DBL catalog, which has a persisted offline cache with outage-vs-empty messaging at `platform-get-resources/src/main.ts:169-216` and `resource-picker.utils.ts:30-79`); there is **no app-wide offline signal** (three identical `// TODO: Hook into something that checks for whether the platform is in offline mode` sit in the socket and XHR services); and machinery exists with **three consumers — Home, the S/R dialog, and Simple's default-project auto-open — none of which is a picker**.

**rev2's stated product preference:** expand inline or show a projects-filtered Home. **The S/R dialog is _least_ favourable "because S/R is intended to be replaced with Home."**

### Implementation ideas from Claude

**Answer Q3 before building.** The suggested answer is to **ship "Your projects" clarified and correct (WI-23) and defer the server-reaching half** — an absent affordance is honest; a present one that errors adds a defect in the cycle meant to remove defects.

If Q3 comes back "yes, build it":

- **Reuse Home's pattern**, don't invent one: `home.component.tsx` already renders not-on-disk projects as muted rows (`:520` `tw:text-muted-foreground/70`) with a distinct action (`:377` returns `syncText` vs `getText` — so the alternative is **Sync**, not "Open" as the first draft said), and `SharedProjectInfo.editedStatus: 'new'` already models "not on disk, available for download".
- ⚠️ **Re-read Home first: it changed after the brief was written.** **#2529 "Integrate get resources into Home" merged on 8 Sep** (it is one of the two commits this working branch was behind). Any plan built on the brief's reading of Home is already stale.
- **The Studio-only registration is the real problem.** Either move `getSharedProjects` into core, or make the picker degrade explicitly when the command is unregistered. Do **not** let it throw — that turns a missing feature into a crash.
- **Model the DBL catalog's cache** for the offline case, including its **outage-vs-empty distinction**. Without a cached list, "no projects" and "server unreachable" are indistinguishable, and that ambiguity is exactly the kind of dishonest message this epic exists to remove.
- The absent offline signal means the picker cannot ask "are we offline?" — so design around **command failure**, not around a global flag, or fix the three TODOs first as a separate item.

### Testing Ideas

- Assert the picker degrades gracefully — **no throw, an explicit message** — when `getSharedProjects` is unregistered (i.e. plain Platform.Bible). This is the highest-value test in the item.
- Assert not-on-disk projects render as muted rows with **Get**, matching Home.
- Assert "server unreachable" and "no projects on server" produce **different** messages.
- Assert the cached list serves the offline case and that a stale cache is marked as such.
- Assert local and server projects are de-duplicated (a project on disk **and** on the server must appear once).
- Test in both a Studio build and a plain Platform.Bible build — the whole risk is the difference between them.

### Definition of Done

- Q3 is answered in writing, and the item is either built to that answer or **closed as deferred with the reason recorded**.
- If built: the picker lists S/R server projects with Get affordances matching Home's, never throws in plain Platform.Bible, distinguishes outage from empty, and de-duplicates against local projects.
- If deferred: IAN-NN-2.3's remaining half is closed by WI-23, and the deferral is on the ticket rather than implicit.

### Dependencies

- **Depends on:** **WI-23** and **Q3**. **Cannot start day one.**
- **Serves:** IAN-NN-2.3 (the Studio-gated half).
- **Note:** the brief flags this as **the most likely item to fire a valve**.

---

## WI-27 (no NN/NTH — cleanup): Retire the dead `selectProject` / `selectMultipleProjects` dialogs

**PRD half:** Neither — engineering cleanup. **Cut first.** · **Serves:** no NN or NTH · **Lane:** unassigned

### User Story

As a developer fixing a picker defect, I want no dead picker surfaces left in the codebase, so that "3–4 UIs doing the same thing" stops being true rather than merely stopping being visible.

### Description

🛑 **Scope guard: `platform.selectProject` is a live, shipping picker. Do not touch it.**

It is **not product-dead.** It is called at **`extensions/src/platform-scripture-editor/src/main.ts:248`** (`papi.dialogs.selectProject(...)`) — it **is** the "Open Scripture Editor / Open Resource Viewer" picker, i.e. the very _open-project dialog_ the brief's own §2 counts as one of Simple's four live project pickers. The brief calls it product-dead and simultaneously counts it among Simple's four live pickers — **the brief is wrong on this point.** It is also the canonical fixture for the dialog service's tab-path tests in four files (`dialog.service-shard.{test,float.test,unload.test,layout-load.test}.ts`).

Only **`platform.selectMultipleProjects`** is genuinely sample-only (`hello-rock3` at `web-views/hello-rock3.web-view.tsx:263`; the dialog itself at `src/renderer/components/dialogs/select-multiple-projects.dialog.tsx`).

The correct file path is **`src/renderer/services/dialog.service-shard.ts:357`**, not `components/dialogs/…:358-360`.

**Revised scope: retire `selectMultipleProjects` only, and leave `selectProject` alone.** Serves no non-negotiable and no nice-to-have. **Cut first.** The honest framing: this removes _one_ dead picker, not two, and the PRD's "3–4 parallel pickers" complaint is untouched by it.

### Implementation ideas from Claude

⚠️ **Deleting it is an API break** (engineering decision D6). `selectMultipleProjects` is a public PAPI type, so removal is breaking for any third-party extension even though no product surface calls it.

**First step, before any deletion: verify the consumer list yourself rather than trusting a prior claim of deadness.** Grep both `papi.dialogs.selectMultipleProjects` and the string `'platform.selectMultipleProjects'` across all five repos — the dialog type is reachable by string, so a symbol grep alone is insufficient.

**The edit list is larger than "delete a dialog".** Retiring `selectMultipleProjects` also means `dialog-definition.model.ts:12,132`; `src/renderer/components/dialogs/index.ts:4,22` (a registry whose `DIALOGS` map is exhaustive over `DialogTabTypes`, so removing a member is a type-level change); deleting `select-multiple-projects.dialog.tsx`; removing two localization keys across six locale files; **two E2E tests** (`dialog-rendering.spec.ts:422,453`); and lines mirrored into `paratext-10-studio/repo-patches/paranext-core.patch:203,250` — so this touches Studio's patch layer, outside this repo.

Follow the project's PAPI deprecation path rather than deleting outright, update `hello-rock3`, and regenerate `lib/papi-dts/papi.d.ts` — noting **`build:types` is cached**, so use `build:clean` in `lib/papi-dts` or the regeneration silently no-ops (decision D3).

**Worth checking while here:** `platform.selectBooks` is marked `@deprecated` with e2e-only consumers and may be the genuinely dead surface this ticket was reaching for. Confirm before assuming.

**Do not touch `selectProject`.** If the item is dropped entirely, record that: "one dead dialog remains public PAPI, deliberately" is a better record than a silently-closed cleanup item.

### Testing Ideas

- Assert `hello-rock3` still builds and runs after the change.
- Assert `papi.d.ts` actually regenerated (the caching failure mode is a stale file that looks correct).
- Assert no production code path references either dialog — the premise of the removal, worth pinning before acting on it.
- If a deprecation shim is used, assert calling the old name still works and warns.

### Definition of Done

- The consumer list is re-verified by string **and** symbol grep across all five repos, and recorded on the ticket.
- `selectProject` is **untouched** and the Open Scripture Editor / Open Resource Viewer flow still works.
- Either `selectMultipleProjects` is retired through the PAPI deprecation path with `hello-rock3` updated and `papi.d.ts` regenerated via `build:clean`, or the item is closed as deliberately-not-done with the API-break reasoning recorded.

### Dependencies

- **Depends on:** nothing. **Cut first.**
- **Serves:** nothing. Engineering decision D6.

---

## WI-28 (Ian NTH-1/2/3): Team layout — rename, icon, dialog grouping, lock-structure UI, "Share with team"

**PRD half:** Ian · **Serves:** IAN-NTH-1, IAN-NTH-2, IAN-NTH-3 · **Lane:** unassigned. **First thing to cut.**

### User Story

As Saroj sharing a layout with my team, I want the dialog to say what it does — "Share with team", not "Save" — with a layout icon rather than a share icon, related settings grouped together, and a lock control that tells me its current state, so that I know what will happen before I click.

### Description

**Deliberately not itemized in the brief's coverage table**, and the **first thing to cut.** It is refinement of a feature that **already shipped** (#2528, #2563, #2547, #2488, #2681): a rename, an icon swap, dialog regrouping, lock-structure UI, and a "Save" → "Share with team" relabel.

Per the rabbit-hole decision, the three NTHs were **split into three sections workable in isolation and in sequence** if time is short — so this can ship partially, in order.

- **NTH-1 (PT1)** — rename "Share layout" to "Shareable layout" or "Team layout"; change the share icon to a layout icon; improve visual grouping ("default tab" relates to items in the selection component and should be grouped with them).
- **NTH-2 (PT2)** — improve the "lock structure" UI: a single button for translators vs a popover for admins; better labelling for both, each showing **current** state in its tooltip ("USFM structure editable / protected", "USFM structure unlocked for team / locked for team").
- **NTH-3 (PT3)** — provide a **"Share with team"** button ("Save" does not convey "share immediately"). Buttons: Share with team; Cancel. ~~Close~~ (not useful). ~~Select preferred text for commentary, bible texts~~ — **struck through in rev2 as "too costly"**; do not build it.

### Implementation ideas from Claude

The relabel is a string change: the confirm button currently reads **"Save"** at `assets/localization/en.json:468` — change the value and mirror it into the five other locales. **Buttons already exist**; this is a string change, not new UI.

For NTH-2's tooltips, the requirement is that each shows the **current** state, which means the tooltip text is derived from state rather than static — the easy wrong implementation is a fixed string describing the action.

⚠️ **PT-4216 is the only real risk:** it documents implicit coupling between the Share Layout dialog and real tab titles. **WI-24 changes tab-title formatting**, so if both ship, sequence them and check the dialog after WI-24 lands.

Take the three sections in order (PT1 → PT2 → PT3) so a partial ship is coherent.

### Testing Ideas

- Assert the confirm button reads "Share with team" and that all six locale files carry the key.
- Assert the "Close" button is gone and only Share with team / Cancel remain.
- Assert each lock-structure tooltip reflects **current** state — both states, both audiences (translator single button vs admin popover).
- Assert the admin popover and translator button render per role.
- Assert the dialog is unaffected by WI-24's tab-title changes (PT-4216).
- Assert the struck-through "select preferred text" option was **not** added.

### Definition of Done

- Either all three sections ship (rename + icon + grouping; lock-structure UI with state-reflecting tooltips; "Share with team" / Cancel only) — or the sections that ship do so in PT1 → PT2 → PT3 order with the remainder explicitly deferred.
- All six locales updated for any changed string.
- PT-4216's coupling verified against WI-24.
- The rev2-struck "select preferred text" scope is not built.

### Dependencies

- **Depends on:** nothing. **Cut first.**
- **Sequence after:** WI-24, per PT-4216.
- **Serves:** IAN-NTH-1, IAN-NTH-2, IAN-NTH-3.

---

## WI-29 (Ian NTH-5): Reinstate the "Report a problem" and "Submit an idea" entry points

**PRD half:** Ian · **Serves:** IAN-NTH-5 · **Implementation owner:** Jolie · **Lane:** unassigned. **Cut first.**

### User Story

As Saroj hitting a problem mid-session, I want a working "Report a problem" and "Submit an idea" entry point, so that my report reaches the team instead of dying in a menu that does nothing useful.

### Description

**The machinery is already done** — the Usersnap router/shard ships, and two Help menu items already exist. What remains is **entry-point refinement only**, which is why this is cut-first rather than a build.

The two Help items live in group `platform.helpFeedback` (`menu.data.json:76-88`) and invoke `platform.usersnapSubmitIdea` / `platform.usersnapReportIssue`. **WI-2 prunes `platform.helpInfo`/`helpMisc` and explicitly keeps both of these**, so the two tickets are group-disjoint and WI-2 poses no risk to them — worth stating so nobody re-derives a conflict. This ticket exists because the requirement is real, not because WI-2 threatens it.

### Implementation ideas from Claude

Confirm what the two existing Help items actually do today before changing anything — the brief says the machinery is complete, so the likely gap is labelling, placement, or a disabled/no-op handler rather than missing plumbing. Verify against the running app, not the contribution manifest.

If the refinement is only labelling, it is a localization change plus the five other locale files, and it should be sequenced with WI-2 (same Help menu, same `en.json` region) rather than landed independently.

### Testing Ideas

- Assert both Help items are present in Simple after WI-2's pruning, and that each invokes a handler that actually reaches Usersnap.
- Assert the labels resolve in all six locales.
- Verify end-to-end in the running app that a submitted report leaves the client — a present-but-broken entry point is the defect this epic exists to remove.

### Definition of Done

- Both entry points are present in Simple and functional end-to-end, or the ticket is closed as deliberately-deferred with what was verified recorded.

### Dependencies

- **Coordinate with:** **WI-2** (same Help menu and `en.json` region). They are group-disjoint, so this is sequencing, not a dependency.
- **Serves:** IAN-NTH-5. **Cut first.**

---

## Creation plan

1. Create the **Combined** parent (`Sprint 90 — Simple is coherent for Saroj (Ian + Todd)`), label `sp90-simple-coherent`.
2. Read the live template off the created issue, fit the parent content into its headings, push, verify — per the `jira-creation` skill (creating in PT replaces the description with the work-item type's default template).
3. Create the **26** Sub-tasks, one at a time, filling and verifying each before the next. **In each lane's execution order** (which is not numeric order — the lane table above is authoritative):
   - **L1:** WI-3′ → WI-2 → WI-4 → WI-6
   - **L2:** WI-15 → WI-21 → WI-14 → WI-13 → WI-17 (WI-12 as filler). _Note: if Q1/Q2 are late, pull **WI-17** forward — it is unblocked, and the stated mitigation ("L2 has other work meanwhile") depends on doing so._
   - **L3:** WI-16 → WI-18 → WI-9 → WI-10 (WI-11 async)
   - **L4:** WI-22 → WI-23 → WI-24 → WI-25 → WI-26 — **but WI-25 is the only startable item**, so expect to begin out of order (see Q11)
   - **L5:** WI-7 → WI-19′ → WI-8
   - **Unassigned / cut-first:** WI-27, WI-28, WI-29
4. Back-fill the parent's non-negotiables table with the created ticket URLs.
5. Update the brief's §4 work-item table with WI-n → PT-xxxx.

### Status of this draft (rev2)

**PRD links and owners are settled** — both Google Doc links are in the parent's Background, and implementation owners are split by half (Tom → Todd's, Jolie → Ian's).

**All disputed claims were re-derived from code on `origin/main` in both repos** — `paranext-core` `b921a4f59e6`, engine `ebf47d0b` — and the open-PR sweep was redone with pagination and split into raw vs substantive counts. Nine ticket premises were rewritten across two revisions, WI-29 was added for the one requirement that had no ticket, and the Q7 gate on WI-9/WI-10 was removed.

**Three things a reader should know about this draft's own reliability:** the two facts most often gotten wrong here are the **column-3 tab inventory** (base 4, shipped 5, and Text Collection is a default-on supplement, not a base tab) and the **marker discriminator** (all 26 dropdown entries are `MarkerType.Paragraph`; the axis that separates wanted from unwanted is `MarkerCategoryType`). Both are stated explicitly in WI-16, WI-9 and WI-14. And **PR contention counts must be read from the substantive column** — the raw counts include dependabot, drafts and Storybook-only hits, and grading startability from them overstates it badly.

**Three cross-ticket engineering decisions are now recorded on the parent as Q10, Q11 and Q12** — the pbr merge order for four participants, WI-22 vs #2673, and whether the existing column `label` satisfies TODD-NN-1.6c. They live in Open Questions rather than in any one sub-task because each changes the scope or start order of several. Q10 and Q11 want settling before the sprint starts; Q12 is a short day-one verification.

**Q5 remains deliberately open on the parent _and_ drafted into the tickets**, so nothing is blocked but the decision is not lost:

- **WI-24** is drafted to Q5(a)'s suggested answer with its Definition of Done tagged `[IAN-NN]` / `[TODD-NTH]`, so confirming the split is a ticket split rather than rework.
- **WI-7's ownership is decided** (8 Sep 2026): Todd's half owns the requirement, Jolie lands the code. Only "promote it out of nice-to-have?" remains open on it.
- Both tickets carry a **⚠️ provisional-scope** banner, and Q5 stays an unchecked box on the parent, so it resurfaces at every review of the epic.
