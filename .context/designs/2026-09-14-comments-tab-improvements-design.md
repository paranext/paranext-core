# Comments tab: density, active-comment visibility, filters, toolbar order

> **Frozen record** — approved 2026-09-14 against `014cdcd51d4`. Line citations reflect the tree
> at that commit; follow the current files and the named symbols, not these line numbers.

- **Date:** 2026-09-14
- **Branch:** `pt-4554-improving-comments`
- **Status:** Approved, ready for implementation planning
- **Serves:** IAN-NN-1.1, IAN-NN-1.2, IAN-NN-1.3, IAN-NN-1.4 (Lane L5, pbr cluster C)
- **Also closes:** IAN-NTH-4 item (5) — active-comment contrast. WI-8 must not fix this again.

## Goal

Saroj works a long list of comments. Today the list wastes vertical space, gives almost no
indication of which comment is active, cannot filter by date or author, and paints the comment
editor's styling buttons over the filter toolbar. This item fixes all four in one PR, because every
change lands in `comment-list/` + `comment-editor/` in `platform-bible-react` plus the
`legacy-comment-manager` panel — one owner, one landing event (decision D8).

## Corrections to the work item's stated premises

The work item's implementation ideas contain three claims that do not survive contact with the code.
They are recorded here because each one changes the approach.

1. **`Card size="sm"` is a no-op for this surface.** The work item calls it "a low-blast-radius
   lever and the right first move". `CommentThread` passes `tw:p-4` on the `Card`
   (`comment-thread.component.tsx:473`) and `tw:p-0` on `CardContent` (`:487`), which override every
   padding the `sm` variant changes. Density has to come from the explicit classes.

2. **The active-comment contrast problem is worse than "ΔL ≈ 1.6% in light and inverted in the
   paratext dark theme".** Selected is `tw:bg-background`, unselected-and-read is
   `tw:bg-primary-foreground` (`:476-479`). In **paratext-dark** `--primary-foreground` is
   `oklch(0.987 0.022 95.277)` — a near-white cream — against a `oklch(0.153 …)` background, so
   unselected cards render as near-white cards and the selected one goes dark. `primary-foreground`
   is a text-on-primary token, not a surface token. Two further gaps the work item does not mention:
   selection is not encoded *at all* for resolved threads (`tw:bg-muted` wins regardless of
   `isSelected`), and selected-and-unread collapses to plain `tw:bg-background`.

3. **NN-1.4 is not "a DOM/render-order issue where a newly mounted toolbar is inserted before the
   filter toolbar".** It is a paint-order collision between two `position: sticky; z-index: 10`
   elements that do not share a scroll container. Full mechanism under D5. The work item's
   instruction to fix at the source rather than with a z-index override still holds, and the source
   turns out to be different from what it assumed.

## Decisions

### D1 — Active comment gets its own visual channel (NN-1.2)

The background channel already carries three meanings (unread `tw:bg-accent`, resolved
`tw:bg-muted`, read `tw:bg-primary-foreground`). No single token swap can add a fourth, which is why
the current attempt reads as invisible in one theme and inverted in another.

**Decision.** Move every card to the semantically correct `tw:bg-card`, leave status on the
background channel, and encode "active" on a dedicated channel: a 4px leading-edge bar
(`tw:border-s-4 tw:border-foreground`, logical property so it follows RTL) plus `tw:shadow-md`. The
existing `tw:hover:shadow-md` on non-selected cards (`comment-thread.component.tsx:474`) becomes the
hover echo of the active state rather than an unrelated affordance. Inactive cards reserve the bar's
width with a transparent border so selecting a card does not shift its content sideways.

**The bar token is `foreground`, not `primary`, and that is measured rather than assumed.** WCAG
contrast of each candidate against the two surfaces the bar can sit on (`card` for active,
`muted` for active-and-resolved), computed with `chroma-js` from the token values in
`lib/platform-bible-react/src/index.css`:

| Theme | `foreground`/card | `foreground`/muted | `primary`/card | `ring`/card |
| --- | --- | --- | --- | --- |
| default-light | 19.99 | 17.75 | 17.84 | 19.99 |
| default-dark | 19.08 | 13.94 | 19.08 | 13.45 |
| paratext-light | 19.59 | 17.76 | 5.05 | **2.32 fail** |
| paratext-dark | 16.38 | 13.79 | **2.38 fail** | 3.98 |

`primary` and `ring` each fail the 3:1 non-text threshold, in *opposite* themes — the same
one-theme-passing-proves-nothing trap NN-1.2 already fell into. `foreground` clears it everywhere
with a 13.79 worst case. The cost is that the bar reads as a strong neutral marker rather than a
brand accent in the paratext themes; NN-1.2 asks for "obviously active", not for the brand colour.

Consequences:

- Contrast is checked against every surface in every theme by the test in strategy item 2, not
  assumed from the token's name.
- Fixes selected-and-resolved and selected-and-unread, which currently show no selection at all.
- **Requires a 1px divider between threads.** Cards are `tw:border-none tw:rounded-none` and rely on
  the list's 12px `tw:space-y-3` (`comment-list.component.tsx:139`) for separation. Once cards are
  `bg-card`, that gap is the same colour as the card in three of the four themes — `--card` equals
  `--background` everywhere except paratext-dark. The divider is load-bearing, not decoration.

Rejected: filled `bg-accent` for the active card (forces unread onto a dot, which is content
relocation NN-1.1 forbids); a ring outline (collides with the card's real focus ring,
`tw:focus:ring-2 tw:focus:ring-ring` on `:473`).

### D2 — Density: whitespace only, static (NN-1.1, first half)

| Lever | Site | Today | New |
| --- | --- | --- | --- |
| Card padding | `comment-thread.component.tsx:473` | `tw:p-4` | `tw:p-3` |
| Header/verse/comment stack gap | `comment-thread.component.tsx:488` | `tw:gap-4` | `tw:gap-2` |
| Stray `space-y-3` on a flex **row** | `comment-item.component.tsx:192` | present | removed |
| Avatar ↔ text gap | `comment-item.component.tsx:192` | `tw:gap-3` | `tw:gap-2` |
| Name ↔ body gap | `comment-item.component.tsx:199` | `tw:gap-2` | `tw:gap-1` |
| Between threads | `comment-list.component.tsx:139` | `tw:space-y-3` | 1px divider |

Roughly 25% more threads per screen. Nothing resizes and nothing truncates differently, so "reduce
whitespace without significantly moving the locations of content within a comment" holds trivially.

**`tw:space-y-3` is a latent bug, not a tradeoff.** `space-y-*` emits `margin-top` on siblings and it
sits on a `flex-row` that also has `items-baseline`. It costs 12px of dead space *and* knocks the
text column out of baseline alignment with the avatar.

Rejected: a "Compact" tier (24px avatar, `icon-sm` buttons, 2-line collapsed clamp). The clamp is
~80% of the saving and it changes how much *text* shows rather than how much *space*, which is
outside what NN-1.1 asks for; the size changes alone are ~4px per card.

Rejected: **height-responsive density**. `useShrinkStep`
(`lib/platform-bible-react/src/hooks/use-shrink-step.hook.ts`) already solves the hard parts —
`ResizeObserver`, hysteresis against splitter-drag flicker, and an explicit `display:none → 0` guard
citing `.claude/rules/cross-view-sync-hidden-views.md` — but it measures inline size, so height
needs an axis parameter or a sibling hook. Not worth it here: Compact saves too little over Reduced
to justify a new mechanism, and PR #2211 (per-view zoom) is a deliberate user-driven density control
over the same panel. Two systems deciding density at once is worse than one.

Noted for the record: a pure-CSS `@container (max-height:)` is **not** a viable alternative. Height
container queries need `container-type: size`, which needs a definite height, and D5's investigation
proves this panel has none.

Not a change: **selecting a comment already expands it to full text.** `tw:line-clamp-3` applies only
when `!isThreadExpanded` (`comment-item.component.tsx:309`) and `CommentThread` passes
`isThreadExpanded={isSelected}` (`comment-thread.component.tsx:454`).

### D3 — Compose buttons move inside the editor border (NN-1.1, "if low cost")

Add an optional `actions` slot to the internal `Editor`, rendered after the content area but inside
the bordered box. Apply it to the compose row (`comment-thread.component.tsx:695-765`, the `@` and
`↑` buttons) and to `CommentItem`'s edit-mode `✕`/`↑` row so both read the same. Buttons drop to
`icon-sm`.

- `Editor` is **not** exported from `platform-bible-react/src/index.ts`. Consumers are exactly
  `comment-thread`, `comment-item`, and `comment-editor`. This is an internal prop, not a public API
  decision.
- `CommentEditor` renders its buttons *above* the box already and is unaffected.
- The slot is after the contenteditable in DOM order, so tab order is unchanged.
- "Assigning to: {user}" keeps its place in the row.

**Scope honesty:** the compose editor renders only for the selected thread
(`comment-thread.component.tsx:581`), so this saves ~10px on one card at a time. It does not put
more threads on screen. It is in because it is genuinely cheap, not because it is a density win.

Rejected: chat-style overlay in the bottom-end corner. Saves ~40px empty but needs a permanent
~74px inline gutter so drafts never run under the buttons, evicts "Assigning to" below the box
anyway, and the saving shrinks as the draft grows.

### D4 — Filters collapse behind one button with active-filter chips (NN-1.3)

`dateFilter` and `author` are already backed end-to-end — `LegacyCommentThreadSelector`
(`legacy-comment-manager.d.ts:141,143`) and `CommentThreadSelector.cs:21-22`. Neither has a
`CommentFilters` axis or any UI. The remaining work is UI plus model wiring only.

**Decision.** Replace the five-dropdown toolbar with a single `Filters` trigger, a popover holding
all seven axes at full label width, and a chip per non-default axis.

Why not simply add two more dropdowns inline: the toolbar already wraps to three rows (~112px) in a
320px panel and would reach four rows (~148px) — most of a comment card spent on chrome, in the PR
whose headline is fitting more on screen. Collapsing takes it to one row (~48px), *below* today's
baseline.

Why not "drop `min-w-32` so triggers size to content" (considered and rejected on evidence): the
shipped defaults are `All resolved statuses`, `All read statuses`, `All assignments`. At `text-sm`
those already exceed the 128px floor, so removing it does not shrink the default state — it only
removes the floor that stops flex-shrink truncating harder. Two adjacent triggers reading
`All r…` and `All r…` are not a filter UI.

Axis order in the popover — Author sits next to Assignment because both concern people, and
adjacency makes "All authors" vs "All assignments" legible rather than accidental:

| # | Axis | Default label | Selector field | Status |
| --- | --- | --- | --- | --- |
| 1 | Resolved status | All resolved statuses | `isResolved` | shipped |
| 2 | Read status | All read statuses | `isRead` | shipped |
| 3 | Note type | All types | `type` | shipped |
| 4 | Assignment | All assignments | `assignedTo` | shipped |
| 5 | **Author** | All authors | `author` | **new UI** |
| 6 | **Date** | All dates | `dateFilter` | **new UI** |
| 7 | Scope | All books | `scriptureRanges` | shipped |

**Date** is a closed preset union (`all` / `today` / `last-7-days` / `last-30-days`) and drops into
the existing pattern unchanged: a `dateFilterToLabelKey` record plus an `isDateFilter` guard, exactly
like the other four axes. The preset resolves to a concrete `DateFilter` **inside
`buildCommentThreadSelector` at query-build time, never at selection time** — otherwise "today" goes
stale when the app is left open overnight. Presets map to `after`, not `exact`: `exact` compares the
calendar date in UTC, which is wrong for a user several hours off UTC.

**Author** does not fit `FilterDropdown`, which is generic over a closed union keyed by
`Record<T, LocalizeKey>`. Author values are arbitrary user names, so it needs a sibling control
taking an options array, with search for large teams. Options come from `findAssignableUsers()`,
already fetched in the web view (`comment-list.web-view.tsx:465`), minus the `Team` and `""`
sentinels — both constants (`TEAM_ASSIGNED_USER`, `UNASSIGNED_USER`) already exist in
`comment-list-filters.model.ts`.

**Accepted limitation:** assignable users ≠ historical authors. A comment written by someone since
removed from the project will not appear in the dropdown, so you cannot filter to them. The
alternative — deriving authors from loaded threads — is circular, since filtering to one author
hides every other author from the list. Accepted deliberately.

Model changes, all in `comment-list-filters.model.ts`: `DEFAULT_COMMENT_FILTERS`,
`areCommentFiltersAtDefault`, `applyFilterOverrides`, `buildCommentThreadSelector`.
`applyFilterOverrides` deliberately enumerates axes instead of spreading, with a comment stating a
new axis "forces a compile error here, which is the intended safety net" — so the compiler will point
at the sites that must change.

Explicitly **not** added, per the PRD: no plain-text search, no sort control, no tag/category filter
(that gap is Q8, not silent scope), no editor annotations.

### D5 — Fix the toolbar overlap at its source (NN-1.4)

**Reproduced live** against a running app (HPUX project, Comments panel, thread expanded, document
scrolled 420px). Measured: filter toolbar occupies viewport `0..93`, the editor's format toolbar
`38..75` — overlapping — and the B/I buttons paint over the "All types" dropdown.

Mechanism, in order:

1. **The web view has no inner scroll container.** `CommentListPanel`'s root is
   `tw:flex tw:flex-col tw:h-full` with the list as `tw:flex-1 tw:overflow-auto`
   (`comment-list.component.tsx:325`), but `h-full` does not resolve against the iframe body, so the
   whole document scrolls — measured `scrollHeight` 262,229px against `innerHeight` 981px. The
   filter toolbar's `sticky` (`:261`) therefore resolves against the **iframe viewport**.
2. The editor's format toolbar is `tw:sticky tw:top-0 tw:z-10` (`editor/plugins.tsx:59`), scoped to
   the `Editor` root's `tw:overflow-hidden` box (`editor/editor.tsx:59`).
3. Card content is non-positioned, so it paints below positioned elements — which is exactly why
   comment text scrolls *under* the header correctly and only the styling buttons do not.
4. The editor toolbar is the only positioned, z-indexed descendant competing with the header. Equal
   `z-index: 10`, later in DOM order, so it wins the paint.
5. **That `sticky` is dead code.** Measured `scrollHeight === clientHeight === 81` on the editor box:
   it never scrolls internally, so the toolbar can never stick. It is shadcn-editor boilerplate for a
   tall standalone editor.

**Fix.** Remove `tw:sticky tw:top-0 tw:z-10` from `editor/plugins.tsx:59`, leaving a static row at
the top of the editor box. Verified live by setting `position: static; z-index: auto` — the overlap
disappears and the buttons scroll under the header as they should. All three `Editor` consumers are
short comment editors, so none lose anything.

Not done: raising the filter toolbar's z-index. That is the override the work item warns against and
would leave a dead `sticky` competing for paint in every future consumer.

## Impact surface

`platform-bible-react`
- `comment-list/comment-thread.component.tsx` — D1 backgrounds + accent bar, D2 padding/gaps, D3 actions slot
- `comment-list/comment-item.component.tsx` — D2 gaps and the `space-y-3` removal, D3 edit-mode row
- `comment-list/comment-list.component.tsx` — D1/D2 divider replacing `space-y-3`
- `editor/editor.tsx`, `editor/plugins.tsx` — D3 `actions` slot, D5 sticky removal

`legacy-comment-manager`
- `comment-list-filters.model.ts` — D4 two new axes and their selector mapping
- `comment-list.component.tsx` — D4 popover, chips, author control
- `contributions/localizedStrings.json` — D4 new keys (date presets, author, popover labels, "Clear all", aria)

## Testing strategy

Derived from the work item's testing ideas, with the falsifiable version of each:

1. **Density** — assert the padding/gap classes shrink **and** that the relative order and nesting of
   content within a comment is unchanged. The second assertion is the requirement's actual
   constraint; the first alone would pass a layout rewrite.
2. **Contrast** — compute active-vs-inactive contrast programmatically in **all four**
   theme/mode combinations (default light, default dark, paratext light, paratext dark) and assert
   each clears the threshold. The work item says "three themes"; there are four combinations, and the
   inversion means one passing proves nothing about the others.
3. **`space-y-3` regression guard** — assert the `CommentItem` root carries no `space-y-*`, so the
   bug cannot be reintroduced by a future merge.
4. **Filters wiring** — assert the date preset and author selections produce the expected
   `dateFilter` / `author` fields on the built selector, with options rendered.
5. **Date freshness** — assert the same `'today'` preset produces a different concrete timestamp when
   the clock advances across midnight. This is the test that catches resolving at selection time.
6. **Exclusions** — assert no plain-text search input and no sort control exist in the toolbar, so a
   well-meaning follow-up cannot add them silently.
7. **Toolbar order** — assert the styling toolbar renders below the filter toolbar **by DOM order**,
   not visual position.
8. **Sticky regression** — assert the editor's format toolbar has no `sticky` positioning. This is
   the durable form of D5; a visual assertion would not survive a refactor.
9. **Keyboard** — assert the `@` and `↑` buttons remain keyboard reachable after moving inside the
   box.

Per `.claude/rules/cross-view-sync-hidden-views.md`: no geometry-dependent cross-view sync is added
(responsive density was rejected in D2), so the hidden-view case does not arise. Recorded here as a
deliberate answer rather than an unexamined default.

## Out of scope / follow-ups

- **No virtualization in the comment list.** The 262,229px document measured in D5 means every thread
  is laid out at all times, and `CommentListPanel`'s `h-full` + `flex-1 overflow-auto` reads as if
  there is an inner scroller when there is not. The source comment ("pinned to the top of whichever
  ancestor scrolls") papers over it. Worth its own ticket; touching it here would balloon the PR and
  risk the sticky behaviour D5 depends on.
- Tag/category filter — PT9 has one, Platform.Bible has none at any layer. That is Q8, unanswered as of 2026-09-14.
- Editor annotations — explicit no-go.

## Open items

1. **UX sign-off on D4.** NN-1.3 says "two filter controls **with their options displayed**". A
   popover arguably fails that reading. The decision to collapse is made; the sign-off is not.
   Blocking for merge, not for starting.
2. **Q8** — are the PT9 filter omissions deliberate? Unanswered as of 2026-09-14; non-blocking.
3. **Coordinate with PR #2211** (per-view zoom, same web view) — open as of 2026-09-14. D2's rejection of responsive density
   was partly to avoid fighting it.
4. **Architecture-Decisions entries.** Per `CLAUDE.md`, D1 (selection encoded on a dedicated visual
   channel rather than the overloaded background channel — a convention other list surfaces should
   follow) and D4 (collapsing a multi-axis filter toolbar behind one trigger with active-filter
   chips — a new pattern) are cross-cutting enough to record in
   `.context/standards/Architecture-Decisions.md`, inserted in byte-order slug position. D3 and D5
   are local and should not be recorded.
5. **Rule checks confirmed N/A.** No keyboard handlers are added or changed, so
   `.claude/rules/keyboard-shortcuts-catalog.md` needs no entry. No file under
   `components/shadcn-ui/` is currently expected to change; if one does, every edit needs a
   `// CUSTOM:` comment per `.claude/rules/code-quality/shadcn-discipline.md`.

## Provenance

Produced by a brainstorming session on 2026-09-14. D5's mechanism and its fix were verified against a
running instance (HPUX project, Comments panel) rather than derived from reading; every other
file:line citation in this document was checked against the tree at `014cdcd51d4`.

Filed under `.context/designs/`, which until now has held capability/tooling designs
(`/investigate-prd` and similar) rather than feature work items. This is the first feature-level
design here; the alternative default, `docs/superpowers/`, is gitignored (`.gitignore:67`).
