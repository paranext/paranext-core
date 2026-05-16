# Design patterns discovered building the Scripture Text Picker

> **Status:** Notes for future system-wide consideration. Nothing here is yet a formal design
> system rule. Captured so the reasoning behind specific choices in this component (and the
> sibling `…/language-multipicker/`) isn't lost.
>
> **Location:** Co-located with the component for now. See "Where this doc should live" at
> the bottom for alternatives.

Each entry has the same shape:

- **The pattern** — a name that's reusable.
- **Chosen** — what we shipped and why.
- **Rejected** — alternative(s) we considered and why we didn't choose them.

---

## 1 · Two-axis selection: membership vs surface state

**Pattern.** When a control governs both "what's *attached* to a project" and "what's *currently
visible* on the calling surface," keep them as two distinct concepts in the data model.

**Chosen.** `ItemStatus` distinguishes `included` / `installed` / `available` (membership). The
host separately owns `displayedIds: string[]` (surface state). The picker emphasizes displayed
rows visually and emits a `toggleDisplay` action; host applies semantics.

**Rejected.** A `displayed: boolean` flag on the `included` status. Collapsing the two
concepts into one field forced "currently displayed" to round-trip through the picker's data
model, which doesn't conceptually own it — it's the calling surface's state.

---

## 2 · Presentational picker, host owns mode

**Pattern.** When a control could plausibly be single-select or multi-select, prefer a single
picker that emits declarative actions, and let the host enforce its own selection cardinality
via state.

**Chosen.** `displayedIds: string[]` works for both. Single-select hosts keep length ≤ 1;
multi-select hosts toggle ids in the set. No `mode` prop is needed on the picker. The same
component serves both stories.

**Rejected.** A `mode: 'single' | 'multi'` prop on the picker that branched internal click
handling. Pushes selection cardinality into the picker even though it's a host policy. Also
made the picker harder to test in isolation (mode×state combos).

---

## 3 · View captured at open, not derived live

**Pattern.** When a control's initial layout depends on transient input state, *capture* the
initial value at mount rather than recomputing it on every render.

**Chosen.** Whether the picker opens in "Included only" or "Browse all" view depends on
whether the project is sparse (≤ 1 included). If we derived this live, adding a second
included item would yank the user out of Browse-all into Included-only mid-task. We use a
`useState` initializer to snapshot the sparse-ness at mount. The popover unmounts/remounts
on close/reopen, so the snapshot refreshes naturally.

**Rejected.** `const view = sparse ? 'all' : 'included'` evaluated on every render. Caused
the disorienting flip described above.

---

## 4 · Tertiary controls with graceful label degradation

**Pattern.** Controls that are useful but secondary to the main task ("filter by language"
next to a "search" input) should occupy minimal horizontal space until interacted with. Their
labels should degrade through a sequence of progressively-smaller forms.

**Chosen.** `LanguageMultipicker`'s trigger label:

| Selection state                | Label           |
|--------------------------------|-----------------|
| Empty                          | `Any`           |
| Matches `preferred` preset     | `Preferred`     |
| 1 selected                     | `en`            |
| Codes fit in char budget       | `en es fr`      |
| Too many                       | `5 langs`       |

The character budget is tuned to the width of the word "Preferred" so all states occupy a
similar slot in the row.

**Rejected.** Always rendering full names ("English, Spanish, French"). Crowded out the
search input visually and broke down badly with 4+ languages.

---

## 5 · Named-preset patterns ("Preferred")

**Pattern.** For a multi-select where one combination is overwhelmingly common, give that
combination a name and surface it both as a preset button and as a compact trigger label.

**Chosen.** "Preferred" represents the user's read-able language set (UI language + profile
languages). Single-click selects it; trigger label shows it as a word.

**Rejected.** Showing only "Any" / "Custom". Cost: the most common interaction is two-or-three
clicks. With "Preferred" it's one.

---

## 6 · Container queries for row text density

**Pattern.** Row layouts that need to adapt to the *container's* width (not the viewport's)
should use Tailwind `@container` queries. Container queries let the same component reflow
correctly whether it's in a wide panel or a narrow popover.

**Chosen.** Rows collapse independently of viewport:

- `<480px` → language chip collapses to BCP-47 code (monospace)
- `<360px` → text name collapses to its abbreviation

Tooltips on each piece carry the full information. All rows in a list collapse together —
the listbox container holds the `@container` declaration.

**Rejected.** Viewport-width media queries. Wrong axis: the picker may be in a 600px popover
inside a 1600px window — viewport queries say "wide" while the picker is "narrow."

**Rejected.** Per-row collapse decisions. Inconsistent look down the list.

---

## 7 · Listbox keyboard model with focus restoration

**Pattern.** Lists of many rows that change shape in response to user actions need an explicit
keyboard model. Roving tabindex moves focus among rows; action-driven re-renders (which may
remount the row's DOM node into a different group) need explicit focus restoration via a
`pendingFocusIdRef` + `useLayoutEffect`.

**Chosen.** Single key handler on the listbox container; rows are passive `role="option"` with
managed tabindex. Activation (Enter/Space) and removal (Delete/Backspace) happen at the
container, which knows where to restore focus afterward.

**Rejected.** Per-row keyboard handlers. Worked for navigation, but on Enter+include the row's
DOM node unmounted (moved from Installed to Included group) and focus was lost.

**Rejected.** `aria-activedescendant` pattern. Less native focus behavior, harder to style.

---

## 8 · Three distinct row states: selected, focused, hovered

**Pattern.** When a list row has *both* a "selected" semantic (this row represents current
state) *and* a "focused" semantic (this row will receive keystrokes), make the two visually
distinct. Hover, focus, and selected should not all use the same `bg-accent`.

**Chosen.**

- Selected → `bg-accent` (tinted background)
- Focused → inset 2px ring in the theme ring color, *no background change*
- Hovered → `bg-muted` (lighter than `bg-accent`)

Selected + focused at the same time = both signals visible without merging.

**Rejected.** All three using `bg-accent`. User could not tell whether they were hovering the
currently-displayed row, or whether keyboard navigation had landed on it.

---

## 9 · The popover never closes itself

**Pattern.** Picker components that live in popovers/dialogs should never call `setOpen(false)`
on the surrounding container. The host decides when to close, based on its own policy.

**Chosen.** Every interaction emits a `PickerAction`. The host updates its state and decides
whether to close. The picker stories' mock host explicitly does *not* close on any action —
the user has to Esc or click outside.

**Rejected.** Close-on-select. Right for single-select-and-done, wrong for the actual usage
patterns: switching among displayed texts (multiple actions per open), adding several texts
in a row, browsing.

---

## 10 · Spinner only for real waits

**Pattern.** Loading affordances (spinners, skeletons) should signal an *actual* wait, not
"the system is processing." Operations that complete in <100ms shouldn't show progress UI.

**Chosen.** Available → Included transitions show a `Loader2` spinner during the download.
Installed → Included is instant — no spinner.

**Rejected.** Spinner on every status change for "consistency". Created flickers on the
instant case that suggested something was wrong.

---

## 11 · Lock (not Pin) for "cannot be removed"

**Pattern.** Icons should match domain semantics, not feel. Pin says "I attached this here";
Lock says "you can't remove this."

**Chosen.** Lock icon + tooltip ("Locked in project — this text is required and cannot be
removed"). The tooltip is required — the icon alone is too ambiguous.

**Rejected.** Pin icon. Visually pretty, but the semantic is wrong: Pin doesn't communicate
the constraint.

---

## 12 · Footer view toggle, not inline collapse

**Pattern.** When a list has a primary section and a secondary "browse more" section that
should sometimes hide, prefer a sticky footer button toggling the whole view over an inline
collapse/expand affordance inside the list.

**Chosen.** "Browse all texts (N)" / "Show only included" button at the bottom of the picker.
Replaces the visible list contents.

**Rejected.** Inline `<Plus /> Add more (N) ▼` expander inside the list. Confusing visually
when expanded; the user couldn't tell where the "primary" section ended and the "secondary"
began.

**Rejected.** Tabs ("Included" / "Add more"). Made the user click to compare states; also
broke the unified search-across-all-groups behavior.

**Rejected.** Always-visible secondary zone with deprioritized styling. The list got too tall
on populated projects.

---

## 13 · Clickable informational elements

**Pattern.** When an inline informational badge (language chip on a row) usefully maps to a
filter the user might want to apply, make it interactive. The interactive variant needs to be
*visibly* different from the static badge — explicit hover/active states, focus ring,
`cursor: pointer`.

**Chosen.** Language chips on each row are buttons. Hover swaps from `bg-secondary` to
`bg-accent` (different color palette, not just a tint). Active state adds a slight scale-down.
Click filters the list by that language.

**Rejected.** `hover:bg-secondary/60`. Too close to the resting color to register as feedback —
users couldn't tell the chips were clickable.

**Rejected.** Hover-revealed icon hint. Adds an "what does this do?" puzzle and requires a
discovery action.

---

## 14 · Out-of-filter expansion: "Maybe you meant…"

**Pattern.** When a search returns very few in-filter results, surface out-of-filter matches
in a muted footer section with a conversational label. Don't widen the active filter
silently.

**Chosen.** Below the `FEW_RESULTS_THRESHOLD` (3), out-of-filter results render in a muted
group labeled "Maybe you meant." User can click chip → filter; user can ignore.

**Rejected.** Auto-relaxing the filter when results are few. Hides the user's filter from
them; can produce surprising mass-shifts in the list.

**Rejected.** Showing a "no results — clear filter?" link. Forces a click to discover what's
out there.

---

## 15 · Shrink to fit, but reserve space while typing

**Pattern.** Components that shrink to fit their content should still resist *jitter* during
input-driven content changes. Reserve a minimum height while the user is actively typing in
the search field; release it when search is cleared.

**Chosen.** List area: `max-h-[24rem]` always; `min-h-[14rem]` when search has text. The
picker is small when content is small (a 3-item Included view is just 3 rows tall), but
typing into search doesn't shrink it as results filter down.

**Rejected.** Static `flex-1` filling the container. Wasted space when content was small;
made the picker feel oversized in trigger contexts.

**Rejected.** Pure shrink-to-fit with no min-h. As the user typed, the picker bounced up the
screen each keystroke.

---

## 16 · String meaning as documentation

**Pattern.** Localizable strings should carry **meaning comments**, not just translation
target text. Translators and reviewers need to know *what's being communicated*, not just
substitute words.

**Chosen.** `scripture-text-picker.strings.ts` and `language-multipicker.strings.ts` both
define each string with a `// meaning:` comment describing intent, context, and constraints
(short / accessible-only / template-with-placeholder). The English defaults are the reference
implementation, applied automatically when a key isn't passed.

**Rejected.** Just an English string with a TSDoc comment naming the key. The key alone
("`%scriptureTextPicker_group_maybeYouMeant%`") doesn't tell a translator that the tone
should feel gentle rather than technical.

---

## 17 · Multi-name language data

**Pattern.** Languages are searchable by multiple names (canonical English, autonym, alternate
names). The data shape should include all of them, but the display should be opinionated:
canonical name first, autonym secondary, alternate names hidden but searchable.

**Chosen.** `LanguageInfo` has `name` (English/ISO), `code` (BCP-47), `autonym` (own script),
`otherNames` (searchable, not displayed). Search hits all four. Display shows name + autonym.

**Rejected.** Single `name` field. User types "Deutsche" expecting German; no match.

---

## Where this doc should live

This file currently sits next to the component at
`lib/platform-bible-react/src/components/advanced/scripture-text-picker/DESIGN.md` — the
`lib/platform-bible-react/docs/` folder is gitignored (typedoc target), so co-location is the
simplest non-ignored home. Other options:

1. **Co-located, here (current).** Travels with the component, easy to find when working on
   it. Downside: invisible to designers who don't browse `src/`. Cross-component patterns
   (everything except #11 Lock-not-Pin is arguably cross-component) live under one
   component's folder, which is a slight category mismatch.
2. **`design-notes/` or `decisions/` at the lib root** (`lib/platform-bible-react/decisions/`).
   Sibling to `src/`. Not gitignored if named anything other than `docs`. More findable for
   lib-wide patterns.
3. **`docs/design-system/`** at the repo root. Most discoverable for designers, but the repo
   root has no current design-system folder — would be creating a new convention.
4. **External design wiki / Notion / Obsidian vault.** Discoverable for designers, disconnected
   from code. Bad for "show me the rejected alternative" lookups during development.
5. **One ADR (Architecture Decision Record) per pattern** under `decisions/` or `.github/adr/`.
   Heavier per-pattern; better when patterns reach formal-decision status.

**Recommendation:** keep here for now (cheap to move later). When the lib accumulates a second
component-level DESIGN.md, graduate to option 2 (`lib/platform-bible-react/decisions/`).
When the project picks up a design-system convention, graduate the hardened patterns to
option 3 and leave the rejected alternatives in the per-component DESIGN.md as record.
