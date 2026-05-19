# Design patterns discovered building the Resource Picker

> **Status:** Notes for future system-wide consideration. Nothing here is yet a formal design
> system rule. Captured so the reasoning behind specific choices in this component (and the
> sibling `…/language-multipicker/`, `…/resource-picker-dialog/`) isn't lost.
>
> **Location:** Co-located with the component. See "Where this doc should live" at the bottom.
>
> **History:** This component started as a "scripture text picker" with a single combined
> surface (Included + Browse-all toggled by a footer button). UX review concluded the two jobs
> deserve distinct surfaces. The picker was split into `ResourcePickerCompact` (everyday
> in-context dropdown) and `ResourcePicker` (full library, rendered in a dialog by
> `ResourcePickerDialog`). Patterns superseded by that split are marked **(superseded)** with
> the reasoning preserved.

Each entry has the same shape:

- **The pattern** — a name that's reusable.
- **Chosen** — what we shipped and why.
- **Rejected** — alternative(s) we considered and why we didn't choose them.

---

## 1 · Two-axis selection: project membership vs surface visibility

**Pattern.** When a control governs both "what's _attached_ to a project" and "what's _currently
visible_ on the calling surface," keep them as two distinct concepts in the data model. The
user usually wants to do both at once (add a resource _and_ see it) — handle that by having one
action imply the other, not by collapsing the concepts.

**Chosen.** `ItemStatus` distinguishes `included` / `installed` / `available` (membership). The
host separately owns `displayedIds: string[]` (surface state). The picker emphasizes displayed
rows visually and emits a `toggleDisplay` action; host applies semantics.

**Rejected.** A `displayed: boolean` flag on the `included` status. Collapsing the two concepts
into one field forced "currently displayed" to round-trip through the picker's data model,
which doesn't conceptually own it — it's the calling surface's state.

---

## 2 · Presentational picker, host owns mode

**Pattern.** When a control could plausibly be single-select or multi-select, prefer a single
picker that emits declarative actions, and let the host enforce its own selection cardinality
via state.

**Chosen.** `displayedIds: string[]` works for both. Single-select hosts keep length ≤ 1;
multi-select hosts toggle ids in the set. No `mode` prop is needed on the picker. The same
component serves both stories.

**Rejected.** A `mode: 'single' | 'multi'` prop on the picker that branched internal click
handling. Pushes selection cardinality into the picker even though it's a host policy.

---

## 3 · Distinct surfaces for distinct intents (compact + full split)

**Pattern.** When one control has to serve both "switch which resource I'm reading" (frequent,
shallow) and "manage which resources are in this project" (rare, deep), split it into two
sibling surfaces sharing internals. The shallow surface is in-context; the deep surface is a
modal/dialog. A clear handoff (a labeled button) links them.

**Chosen.**

- `ResourcePickerCompact` — popover dropdown anchored to a toolbar button. Shows only
  `included` items. Footer button labeled `Browse library` (or a consumer-provided
  `browseLabel` like `"Browse all scripture texts"`) opens the full surface.
- `ResourcePicker` — listbox showing all three groups (Included / On your computer / Available
  to download). Rendered inside `ResourcePickerDialog`.
- Both share `ResourcePickerItem`, the strings file, and the `PickerAction` contract.

The compact picker frames the modal as a _library_ (scope-expansion: "there's more behind this
door"), not as _management_ (settings/admin). The catalog includes resources the user doesn't
have yet, so "Browse" matches user intent better than "Manage" would. (See the alternatives
considered for the button label in the working notes.)

**Rejected.** Single combined picker with a view toggle ("Included only" ↔ "Browse all") at
the bottom. Worked, but mixed two distinct intents into one surface; users opening the picker
to _add_ a resource often had to flip the toggle first, and the captured-at-open view default
(see §4 below) was a brittle workaround for the conflated jobs. With the compact/full split,
each surface has a single job, and the captured-view machinery is unnecessary.

**Rejected.** Renaming the bridge button to `Manage resources`. "Manage" reads as
settings/admin and undersells the _discovery_ affordance — the modal's distinctive capability
is revealing resources the user doesn't have yet. "Browse" + "library" matches user mental
models from app-store-style discovery UIs.

---

## 4 · View captured at open, not derived live **(superseded)**

**Pattern (original).** When a control's initial layout depends on transient input state,
_capture_ the initial value at mount rather than recomputing it on every render.

**Original use.** The combined picker opened in "Included only" or "Browse all" view depending
on whether the project was sparse (≤ 1 included). Deriving live made the view flip mid-task as
the user added items.

**Superseded by §3.** With the compact/full split there's no view toggle. The compact picker
_always_ shows only Included; the full picker (in the dialog) _always_ shows all groups. No
captured state needed.

**Pattern still useful elsewhere.** The general idea — capture transient state at mount with
`useState` initializer to avoid disorienting mid-task UI flips — remains a valid technique for
other components.

---

## 5 · Tertiary controls with graceful label degradation

**Pattern.** Controls that are useful but secondary to the main task ("filter by language"
next to a "search" input) should occupy minimal horizontal space until interacted with. Their
labels should degrade through a sequence of progressively-smaller forms.

**Chosen.** `LanguageMultipicker`'s trigger label:

| Selection state            | Label       |
| -------------------------- | ----------- |
| Empty                      | `Any`       |
| Matches `preferred` preset | `Preferred` |
| 1 selected                 | `en`        |
| Codes fit in char budget   | `en es fr`  |
| Too many                   | `5 langs`   |

Character budget tuned to the width of the word "Preferred" so all states occupy a similar
horizontal slot.

**Rejected.** Always rendering full names ("English, Spanish, French"). Crowded out the search
input visually and broke down badly with 4+ languages.

---

## 6 · Named-preset patterns ("Preferred")

**Pattern.** For a multi-select where one combination is overwhelmingly common, give that
combination a name and surface it both as a preset button and as a compact trigger label.

**Chosen.** "Preferred" represents the user's read-able language set, **derived from their
content footprint** — the union of languages of the resources and projects they've engaged
with. Definition lives in
[PT-3980](https://paratextstudio.atlassian.net/browse/PT-3980). Single-click selects it;
trigger label shows it as a word.

**Rejected.** Sourcing "Preferred" from a profile-stored preference list. Profile-stored prefs
require the user to maintain a list explicitly; content-footprint derivation does it
automatically and matches the user's actual reading behavior.

**Rejected.** Showing only "Any" / "Custom". Cost: the most common interaction is two-or-three
clicks. With "Preferred" it's one.

---

## 7 · Container queries for row text density

**Pattern.** Row layouts that need to adapt to the _container's_ width (not the viewport's)
should use Tailwind `@container` queries. Container queries let the same component reflow
correctly whether it's in a wide panel or a narrow popover.

**Chosen.** Rows collapse independently of viewport:

- `<480px` → language chip collapses to BCP-47 code (monospace)
- `<360px` → resource name collapses to its abbreviation

Tooltips on each piece carry the full information. All rows in a list collapse together — the
listbox container holds the `@container` declaration.

**Rejected.** Viewport-width media queries. Wrong axis: the picker may be in a 600px popover
inside a 1600px window — viewport queries say "wide" while the picker is "narrow."

**Rejected.** Per-row collapse decisions. Inconsistent look down the list.

---

## 8 · Listbox keyboard model with focus restoration

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

## 9 · Three distinct row states: selected, focused, hovered

**Pattern.** When a list row has _both_ a "selected" semantic (this row represents current
state) _and_ a "focused" semantic (this row will receive keystrokes), make the two visually
distinct. Hover, focus, and selected should not all use the same `bg-accent`.

**Chosen.**

- Selected → `bg-accent` (tinted background)
- Focused → inset 2px ring in the theme ring color, _no background change_
- Hovered → `bg-muted` (lighter than `bg-accent`)

Selected + focused at the same time = both signals visible without merging.

---

## 10 · The picker never closes itself; the compact wrapper does

**Pattern.** Presentational picker components shouldn't call `setOpen(false)` on a surrounding
popover/dialog as a side-effect of every action. Closing is host policy.

**Chosen.**

- `ResourcePicker` (full) **never closes itself**. Every interaction emits a `PickerAction`;
  the host inside the dialog decides whether/when to close, and `ResourcePickerDialog` just
  keeps the modal open across actions.
- `ResourcePickerCompact` **owns its popover** (or accepts a controlled `open`/`onOpenChange`)
  because the dropdown UX requires a specific close-on-select behavior to match user
  expectations from native `<select>` and other compact pickers. The picker emits the action
  AND closes; the host can still no-op on the action.

The contract stays uniform — both surfaces emit the same `PickerAction` — but the compact
surface adds a UX-specific close that's invisible to action handlers.

**Rejected.** Compact picker also delegating close to the host. Forces every consumer to
write `setOpen(false)` in their `onAction`, which is the only sensible behavior anyway. Move
the obvious default into the component.

**Rejected.** Full picker auto-closing on `toggleDisplay`. Wrong for the dialog context: users
in the library often pick a resource and then keep browsing for another.

---

## 11 · Spinner only for real waits

**Pattern.** Loading affordances (spinners, skeletons) should signal an _actual_ wait, not
"the system is processing." Operations that complete in <100ms shouldn't show progress UI.

**Chosen.** Available → Included transitions show a `Loader2` spinner during the download.
Installed → Included is instant — no spinner.

---

## 12 · Lock (not Pin) for "cannot be removed"

**Pattern.** Icons should match domain semantics, not feel. Pin says "I attached this here";
Lock says "you can't remove this."

**Chosen.** Lock icon + tooltip ("Locked in project — this resource is required and cannot be
removed"). The tooltip is required — the icon alone is too ambiguous.

**Rejected.** Pin icon. Visually pretty, but the semantic is wrong: Pin doesn't communicate
the constraint.

---

## 13 · Footer view toggle, not inline collapse **(superseded)**

**Pattern (original).** When a list has a primary section and a secondary "browse more"
section that should sometimes hide, prefer a sticky footer button toggling the whole view over
an inline collapse/expand affordance inside the list.

**Superseded by §3.** With compact + full split, there is no "browse more" section to toggle
within a single picker. The compact picker's footer button instead opens a separate surface
(the dialog), which is a different pattern entirely:

> Footer "more…" affordance that opens a sibling surface, not toggles in-place.

The original pattern remains valid for cases where in-place toggling makes sense (e.g. a
"show advanced" expander in a settings form). It just wasn't right here.

---

## 14 · Clickable informational elements

**Pattern.** When an inline informational badge (language chip on a row) usefully maps to a
filter the user might want to apply, make it interactive. The interactive variant needs to be
_visibly_ different from the static badge — explicit hover/active states, focus ring,
`cursor: pointer`.

**Chosen.** Language chips on each row are buttons. Hover swaps from `bg-secondary` to
`bg-accent` (different color palette, not just a tint). Active state adds a slight scale-down.
Click filters the list by that language.

**Rejected.** `hover:bg-secondary/60`. Too close to the resting color to register as feedback —
users couldn't tell the chips were clickable.

---

## 15 · Out-of-filter expansion: "Maybe you meant…"

**Pattern.** When a search returns very few in-filter results, surface out-of-filter matches
in a muted footer section with a conversational label. Don't widen the active filter silently.

**Chosen.** Below the `FEW_RESULTS_THRESHOLD` (3), out-of-filter results render in a muted
group labeled "Maybe you meant." User can click chip → filter; user can ignore.

**Rejected.** Auto-relaxing the filter when results are few. Hides the user's filter from
them; can produce surprising mass-shifts in the list.

---

## 16 · Shrink to fit, but reserve space while typing

**Pattern.** Components that shrink to fit their content should still resist _jitter_ during
input-driven content changes. Reserve a minimum height while the user is actively typing in
the search field; release it when search is cleared.

**Chosen.** List area: `max-h-[24rem]` always; `min-h-[14rem]` when search has text. The
picker is small when content is small (a 3-item Included view is just 3 rows tall), but
typing into search doesn't shrink it as results filter down.

---

## 17 · String meaning as documentation

**Pattern.** Localizable strings should carry **meaning comments**, not just translation
target text. Translators and reviewers need to know _what's being communicated_, not just
substitute words.

**Chosen.** `resource-picker.strings.ts` and `language-multipicker.strings.ts` both define
each string with a `// meaning:` comment describing intent, context, and constraints (short /
accessible-only / template-with-placeholder).

---

## 18 · Multi-name language data

**Pattern.** Languages are searchable by multiple names (canonical English, autonym, alternate
names). Display should be opinionated: canonical name first, autonym secondary, alternate
names hidden but searchable.

**Chosen.** `LanguageInfo` has `name` (English/ISO), `code` (BCP-47), `autonym` (own script),
`otherNames` (searchable, not displayed). Search hits all four. Display shows name + autonym.

---

## 19 · Resource-type filter is consumer-supplied, not a separate component

**Pattern.** When a generic picker can serve multiple narrower use cases (scripture-only,
commentary-only) via a filter, expose the filter as a prop on the generic picker rather than
forking into per-type components. Pair with consumer-supplied UI hints (e.g. `browseLabel`)
that already-localized callers can specialize without re-localizing inside the picker.

**Chosen.** `allowedResourceTypes?: ResourceType[]` on both `ResourcePicker` and
`ResourcePickerCompact`. The compact picker also accepts `browseLabel?: string` — an
already-localized override of the default `"Browse library"` — so callers can render
`"Browse all scripture texts"` without growing the string table per type.

**Known gap.** `ResourceType` currently mirrors `DblResourceData.type` (a closed union of
DBL-sourced types). The likely-soon need is to admit resources sourced from other projects
(e.g. another team's scripture text the user has access to). Whoever extends `ResourceType`
should update `allowedResourceTypes` callers and revisit whether status (`included` /
`installed` / `available`) still fully expresses every resource's relationship to the
project. Tracked for review.

---

## Where this doc should live

This file currently sits next to the component at
`lib/platform-bible-react/src/components/advanced/resource-picker/DESIGN.md` — the
`lib/platform-bible-react/docs/` folder is gitignored (typedoc target), so co-location is the
simplest non-ignored home. Options:

1. **Co-located, here (current).** Travels with the component, easy to find when working on
   it. Downside: invisible to designers who don't browse `src/`.
2. **`lib/platform-bible-react/decisions/`.** Sibling to `src/`. More findable for lib-wide
   patterns.
3. **`docs/design-system/`** at the repo root. Most discoverable; creates a new convention.
4. **External wiki / Notion.** Discoverable for designers, disconnected from code.
5. **ADRs.** Heavier per-pattern; better when patterns reach formal-decision status.

**Recommendation:** keep here for now. When the lib accumulates a second component-level
DESIGN.md, graduate to option 2.
