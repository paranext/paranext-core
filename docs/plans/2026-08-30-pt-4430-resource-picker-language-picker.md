# PT-4430 (NN5a) — Fix the language picker in the resource picker

**Ticket:** PT-4430 · sub-task of PT-4419 (Sprint 89 — Simple Quality: Non-Negotiables)
**Source bug:** PT-4135 "Issues with Language picker in resource picker"
**Repo:** paranext-core · **Branch:** `pt-4430-resource-picker-language-picker`
**Estimate in sprint plan:** S–M, ~1.5 person-days

> Revised after an adversarial review pass. Review findings are folded into the body; §11 records
> what the review changed, including one suspicion it disproved.

---

## 1. What the bug actually is

PT-4135 lists three complaints plus one follow-up comment:

| #   | Complaint (verbatim from PT-4135)                                                                             | Status after static analysis             |
| --- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| C1  | "lacks **scroll affordance**"                                                                                 | **Must reproduce** — may be partly stale |
| C2  | "**illusion of completeness**: height of list make list appear to be complete (lack of 'below-the-fold cue')" | **Must reproduce**                       |
| C3  | "top languages appear to be ordered by the _download_ list and ignore the languages of installed resources"   | **Confirmed broken** in code             |
| C4  | Comment (Roopa, 2026-07-14): "Get Resources Language dropdown also does not have scroll"                      | **Likely already fixed** — see §2        |

The review added four defects found while auditing the same component (§4). They are all inside the
language picker the ticket names, so they belong to "the language picker works".

Repro path from the ticket: Simple mode → Bible Text column-3 dropdown → "Download Resources" → click "All Languages".

### The two affected surfaces

Both language pickers route through the **same** component, which is what makes this one fix rather than two:

| Surface                | Host                                       | Language control                 |
| ---------------------- | ------------------------------------------ | -------------------------------- |
| Resource picker dialog | `resource-picker-dialog.component.tsx:256` | `MultiSelectComboBox` (direct)   |
| Get Resources          | `get-resources.component.tsx:417`          | `Filter` → `MultiSelectComboBox` |

`Filter` (`filter.component.tsx`) is a thin wrapper that forwards to `MultiSelectComboBox` and adds badges. So a change inside `MultiSelectComboBox` reaches **both** surfaces, and reaches nothing else that matters (see §7 blast radius).

---

## 2. Why C1/C4 may be stale — and why we reproduce before touching them

`CommandList` (`command.tsx:168`) already carries:

```
'pr-twp tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none'
```

with an existing `// CUSTOM:` note saying `tw:no-scrollbar` was **removed** so the vertical scrollbar shows when the list overflows, "needed for long filter lists like language pickers".

That landed in `091bebf912b` "re-add scrollbar to command (#2530)" on **2026-07-17**. PT-4135 was filed **2026-07-08** and Roopa's Get-Resources comment is **2026-07-14** — both _before_ that commit. The ticket was tested on "Pkg : 217".

So the list very likely _does_ scroll today, and what survives is the weaker, genuinely-UX complaint: the scrollbar is subtle and the list clips flush at an item boundary, so it reads as complete.

**Therefore step 0 is reproduction, not code.** We fix what still reproduces and close out what does not, rather than re-fixing #2530.

---

## 3. C3 — the ordering bug (confirmed, no reproduction needed)

`resource-picker-dialog.component.tsx:200`:

```ts
const languageOptions: MultiSelectComboBoxEntry[] = useMemo(
  () =>
    Array.from(new Set(allResources.map((r) => r.bestLanguageName))).map((lang) => ({
      label: lang,
      value: lang,
    })),
  [allResources],
);
```

No sort, no `starred`, no `secondaryLabel` — and `sortSelected` is never passed to the combo box at line 256. So the order is **first-appearance order in `allResources`**, i.e. whatever order the DBL catalogue came back in. That is exactly "ordered by the download list, ignoring installed resources".

Get Resources already does this correctly via `getLanguageOptions` (`get-resources.component.tsx:96`): it stars installed languages, prioritises selected + starred, alphabetises within each group, and puts a per-language resource count in `secondaryLabel`.

### The fix leans on an existing contract

`MultiSelectComboBox` already implements the whole ordering rule in `sortedOptions` when `sortSelected` is true:

```
starred        → alphabetical
non-starred    → selected first, then alphabetical
```

So `getLanguageOptions`'s own pre-sort is redundant with it. The resource-picker dialog only needs to **supply the flags and opt in**:

1. Compute the set of languages that have at least one `installed` resource.
2. Set `starred` from that set, and `secondaryLabel` to the per-language count (matching Get Resources).
3. Pass `sortSelected` to `MultiSelectComboBox`.

---

## 4. Defects found during the review (same component, same user-visible symptom)

**R1 — the language list ignores `resourceType`, creating a dead-end. (Confirmed.)**
`languageOptions` (line 200) is derived from `allResources`, while the rows below it are derived from
`filteredResources`, which _does_ apply `resourceType`. So when the dialog is opened for one type,
the dropdown still offers languages that have **no resource of that type** — picking one lands on
"No results found". Fix: build `languageOptions` from the type-filtered set. See §9.3 for the scope
call, since this overlaps NN5d.

**R2 — the language search box is hardcoded English. (Confirmed.)**
`multi-select-combo-box.component.tsx:166`:

```tsx
placeholder={`Search ${placeholder.toLowerCase()}...`}
```

Three problems in one line: the word "Search" is never localised; the ellipsis is `...` rather than
`…`; and `.toLowerCase()` is applied to an already-localised string, which is wrong in any language
whose casing rules differ (Turkish dotless i, German nouns). This is the search field _inside_ the
language picker, so it is squarely in scope.

**R3 — the empty state is hardcoded English. (Confirmed.)**
`commandEmptyMessage` defaults to `'No entries found'` and **neither** surface passes a value. Search
for a language that does not exist and the user gets untranslated English.

**R4 — `lib/platform-bible-react/dist` is committed (14 tracked files).**
Not a code defect but a process gap the first draft missed: a change to `MultiSelectComboBox` is not
picked up by `platform-get-resources` until the library is rebuilt, and the rebuilt bundle must be
committed. See §8.

R2 and R3 require **new localization keys**, which the first draft claimed would not be needed.
That pulls in the immutable-strings rule: add new keys rather than editing existing ones, and add
them to `assets/localization/en.json`.

---

## 5. C1/C2 — the affordance fix (only what still reproduces)

Scoped to `MultiSelectComboBox` so it lands on both PT-4135 surfaces and nothing else.
**Do not** change the vendored shadcn `CommandList` — that would also move `InterfaceLanguagePicker`,
`scope-selector`, and every command palette.

The review rejected the first draft's primary proposal. It had been: set a max-height that clips a
row **mid-item** so a half-row peeks below the fold. That is brittle — rendered item height moves
with theme, font scaling, browser zoom, RTL, and long language names that wrap to two lines, so a
hand-tuned pixel value silently degrades to a flush clip in exactly the conditions we cannot test.

Revised, in order of robustness:

1. **Per-language counts** (from §3) — the strongest and cheapest completeness cue, because it makes
   each row read as a data row rather than a short menu item, and it costs no new string.
2. **A bottom fade/gradient mask** on the list while it is scrollable — height-independent, so it
   survives the conditions that defeat the half-row trick. Promoted from "optional" to the primary
   below-the-fold cue.
3. **Half-row max-height** — keep only as a supplement if repro shows 1 and 2 are not enough, and
   express it relative to item height rather than as a magic pixel constant.

Implementation site: `MultiSelectComboBox` passes a `className` to its own `<CommandList>`
(currently bare, `multi-select-combo-box.component.tsx:~185`).

---

## 6. Step 0 — reproduction protocol (blocking)

The existing stories **cannot** reproduce any of this, which is itself a finding:

- `SAMPLE_RESOURCES` → **4** distinct languages (English ×6, Spanish, Hebrew, Greek).
- `LARGE_SAMPLE_RESOURCES` → `generateResources(2500)` cycles **10** hard-coded languages, and every generated row is `installed: false`.

`max-h-72` is 288px; a `CommandItem` is roughly 32px. So ~9 rows fit — 4 languages never overflow and 10 barely do. And with **zero** installed resources in the large set, C3's "installed should sort to the top" is **not demonstrable at all**.

**Task 0.1 — extend the story data.** Add a fixture with a realistic language spread (~100+ distinct
languages), a realistic installed subset (a handful of languages with `installed: true`), and a
**mixed `type` distribution** so R1's dead-end is visible under `resourceType`.

**Task 0.2 — reproduce each complaint** against that fixture, in Storybook
(`npm run storybook:platform-bible-react`, port 6007), recording per complaint:
still-reproduces / already-fixed. While there, also check whether `PopoverContent`'s `tw:w-full`
(line ~163) gives the language popover a sensible width when portaled — it is a suspicious class on
a portaled Radix popover, but it is an _observation to make_, not a diagnosis to assume.

**Task 0.3 — record the C4 verdict.** Get Resources shares `MultiSelectComboBox`, so if the shared
fix lands, C4 is covered; if C4 was already fixed by #2530, say so in the PR rather than silently
dropping it.

---

## 7. Blast radius

`MultiSelectComboBox` has four consumers:

| Consumer                                                                          | Affected?                                                                                                      |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `resource-picker-dialog.component.tsx`                                            | Yes — target                                                                                                   |
| `get-resources.component.tsx` (via `Filter`)                                      | Yes — target (C4)                                                                                              |
| `checks-side-panel.component.tsx` (via `Filter`)                                  | Inherits the R2/R3 localization fix and the fade cue; its filter lists are short, so height changes stay inert |
| `filter.stories.tsx`, `multi-select-combo-box.stories.tsx`, `tooltip.stories.tsx` | Stories only                                                                                                   |

The `sortSelected` + `starred` + R1 changes are **local to the resource-picker dialog** — no other consumer's props change.

Not touched: vendored shadcn `command.tsx`, `InterfaceLanguagePicker` (that is PT-4431's component — separate ticket, and its search bug appears already fixed by PR #2580).

---

## 8. Build and commit steps that are easy to miss

- `lib/platform-bible-react/dist` is **tracked** (14 files). Rebuild the library and commit the
  regenerated bundle, or `platform-get-resources` keeps the old combo box. Expect the bundle to be
  the bulk of the diff, and expect it to be the conflict surface on any rebase.
- No `src/shared` change here, so `papi.d.ts` should **not** move. If `npm run build:types` dirties
  it, that is a signal something drifted — investigate rather than committing it blindly.
- New localization keys (R2, R3) go in `assets/localization/en.json`. New keys only; do not reword
  existing ones.
- No keyboard handler is added or changed, so the keyboard-shortcuts catalog needs no edit.
  (`spaceSelectsHighlightedItem` already exists and is not being touched.)

---

## 9. Tests

Split by what each runner can actually observe:

**Unit (`--project=unit`, jsdom)** — ordering and filtering, in `resource-picker-dialog.component.test.tsx`:

- Languages with an installed resource sort above languages without one.
- Within each group, ordering is alphabetical (not catalogue order) — seed `allResources` in
  deliberately non-alphabetical, non-installed-first order so the test is falsifiable.
- Per-language counts are correct.
- **Negative case for R1:** a language whose only resources are of a _different_ `type` is **absent**
  from the options when `resourceType` is set. Without this the R1 fix is untested.

Prefer asserting against a **pure exported helper** that builds the options array, rather than driving
the Radix popover open in jsdom — Radix in jsdom usually needs `hasPointerCapture`/`scrollIntoView`
stubs and the test ends up testing Radix. If the helper stays inline, the popover route needs those
stubs; decide during implementation.

**Browser (`--project=storybook`, Playwright/chromium)** — layout, which jsdom cannot see at all:

- With the §6 fixture, the language `CommandList` is genuinely scrollable: `scrollHeight > clientHeight`.
- The chosen below-the-fold cue is present while scrollable and absent when the list fits.

`resource-picker-dialog.stories.tsx` already has `tags: ['autodocs', 'test']`, so it is already in the storybook project's include set — a new story inherits that.

Commands:

```
cd lib/platform-bible-react && npm run test:unit:run
cd lib/platform-bible-react && npx vitest run --project=storybook
```

Full pre-commit gate (per repo convention):

```
npm run format:check && npm run typecheck && npm run lint && npm test
```

Note that `npm run lint` is very slow repo-wide; scope it to changed workspaces while iterating.

**Packaged-build verification** (DoD). On Windows `refresh.sh` gets reaped and CDP never opens, so
use `npm start` as a background task and verify the picker by eye against the PT-4135 repro path.

---

## 10. Open questions

1. ~~**Screenshots.**~~ **Received 2026-08-30 — see §13.**
2. ~~**R1 ownership.**~~ **Decided 2026-08-30: fix R1 in this ticket.** The type-filter dead-end
   stays with PT-4430 rather than moving to NN5d (PT-4059). Flag it in the PR description so NN5d
   does not redo it.
3. **Deduplicate `getLanguageOptions`?** Get Resources' copy becomes largely redundant once the
   dialog opts into `sortSelected`. Extracting one shared helper removes duplication but touches an
   extension outside NN5a's stated scope. Defaulting to **leaving Get Resources alone** and noting
   the duplication for Sprint 90's consolidation work, which already owns picker restructuring.

## 11. What the adversarial review changed

- **Added R1–R4** (§4): the `resourceType` dead-end, two hardcoded-English strings, and the committed
  `dist` build step. R1–R3 are confirmed defects in the very control the ticket is about.
- **Reversed the affordance approach** (§5): the half-row max-height trick was demoted from primary
  fix to optional supplement because it is brittle under theme/zoom/RTL/wrapping; the fade mask was
  promoted in its place.
- **Retracted a false suspicion.** The review suspected cmdk lowercases the value passed to
  `onSelect`, which would break `handleSelect`'s `entries.find((e) => e.label === label)` lookup for
  every capitalised language name and would have been the headline bug. Checked cmdk 1.1.1's
  `dist/index.mjs`: it contains no `toLowerCase()` at all. **Not a bug** — recorded so nobody
  re-raises it.
- **Corrected "no new localization keys"** to the opposite: R2 and R3 require them, which engages the
  immutable-strings rule.
- **Added a falsifiable negative test** for R1 (§9), and a mixed-`type` requirement to the fixture (§6).

## 12. Out of scope

- PT-4431 / NN5b (interface language picker search) — different component, appears already fixed by #2580.
- Two-surface consolidation (picker + management modal) — explicitly transferred to Sprint 90 by PT-4419.
- NN5c (PT-4232 Get Resources disabled), NN5d (PT-4059 dead-ends) — sibling sub-tasks, except R1 per §10.2.

## 13. Evidence from the PT-4135 screenshots

Two attachments, both from **before** `#2530` (2026-07-17): the resource picker shot is 2026-07-08,
the Get Resources shot is 2026-07-14.

**Resource picker (2026-07-08) — C3 confirmed visually.** The dropdown reads

```
Tsakhur · Sanskrit · English · Cishingini · Tamil (tam-IN) · Tamil (tam) · Oriya · Gamo · Chinese
```

which is row-for-row the order of the AVAILABLE TO DOWNLOAD list beneath it (TKR, SANTIB, LSV, ASG,
OTCV, IRVTam, IRVOry, GaFBEV, FEB). At the same time the INSTALLED section holds English, Taiwan
Pinuyumayan and Arabic, none of which are promoted in the dropdown. That is precisely "ordered by the
download list, ignoring the languages of installed resources", and it corroborates the code reading
in §3 from the UI side.

**R2 confirmed visually.** The search field renders `Search any language...` — the unlocalised
"Search", the `.toLowerCase()` applied to the localised "Any language", and the three-period `...`,
all visible in one control.

**Counts asymmetry confirmed.** Get Resources shows a per-language count on every row (1, 1, 1, 2, …);
the resource picker shows none. §3's `secondaryLabel` change closes the gap.

**What the screenshots do NOT establish.** Both predate `#2530`, so neither can say whether the
missing scrollbar is still current. C1/C2 reproduction (§6) remains blocking. What they do give us is
the _definition_ of the complaint: the list clips flush at the final row with no visible bar and no
partial row.

**One suspicion dropped.** The popover renders at a sensible width in both shots, so
`PopoverContent`'s `tw:w-full` is not implicated. Removed from the §6.2 observation list.

## 14. Progress

Done:

- **Fixture** — `MANY_LANGUAGE_RESOURCES` in `resource-picker-dialog.data.ts`: ~130 real language
  names, six of them with an installed resource, four carrying only non-Scripture resources, emitted
  on a coprime stride so the order is stable but non-alphabetical.
- **Helper** — `buildLanguageFilterOptions` + `matchesResourceType` in
  `resource-picker-dialog.utils.ts`, with 8 tests (red first, then green; 13/13 in the file).
- **C3 + R1 wired** — the dialog's `languageOptions` now comes from the helper and is type-scoped;
  `sortSelected` passed so installed languages are promoted.
- **R2 + R3** — `searchPlaceholder` prop added to `MultiSelectComboBox` (replacing the hardcoded
  `` `Search ${placeholder.toLowerCase()}...` ``), forwarded through `Filter`; both new keys added to
  `en.json` and to the three literal string maps in stories/tests.
- **Stories** — `ManyLanguages` and `ManyLanguagesScopedToScripture`.

- **C1/C2 reproduced and fixed.** The browser probe measured the language list at
  `clientHeight 288` / `scrollHeight 4232` over `132` options, with `gutterWidth 0`. Item height is
  `4232/132 ≈ 32px` and `288 = 32 × 9` exactly, so the list clipped **flush on a row boundary** with
  no partial row and a scrollbar thumb ~7% of the track that reserved no width. Both complaints
  confirmed on current `main`, not stale.
  Fix: `OptionListScrollCue` in `multi-select-combo-box.component.tsx` draws a bottom fade whenever
  content remains below the fold, driven by `useHasContentBelow`.
- **Browser regression tests** — `ManyLanguages` asserts overflow, installed-first ordering, the
  localized placeholder, and the cue's presence; `Default` is the negative control asserting the cue
  is **absent** when the list fits. 7/7 green.
- **`dist` rebuilt and staged**, including the renamed hashed `resizable-*` chunks.

Verification run:

| Check                                         | Result                                                                                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resource-picker-dialog.utils.test.ts` (unit) | 13/13                                                                                                                                                   |
| `--project=storybook` (chromium)              | 7/7                                                                                                                                                     |
| `platform-bible-react` unit suite             | 763/764 — the 1 failure is the known `book-chapter-control` load flake (different tests fail per run; 39/39 in isolation; imports nothing changed here) |
| `src/renderer/components/dialogs`             | 44/44                                                                                                                                                   |
| `prettier --check` on changed files           | clean                                                                                                                                                   |
| `eslint` on changed files                     | clean                                                                                                                                                   |
| `tsc` (platform-bible-react)                  | clean                                                                                                                                                   |
| `npm run typecheck` (repo)                    | 1 error, environmental: missing gitignored `release/app/buildInfo.json`                                                                                 |

Packaged build:

`npm run package` succeeded (exit 0), producing `release/build/win-unpacked`, the NSIS installer,
and the portable exe. Two levels of check against that build:

- **The change is in the shipped bundle.** Grepping `resources/app.asar` finds
  `command-list-scroll-cue`, both new localization keys, and the string `Search languages`. A
  sentinel string that should not be there returns no match, so the grep discriminates rather than
  matching everything.
- **The dialog renders the localized strings.** Launched the packaged exe with
  `--remote-debugging-port=9223`, opened a project, clicked **Pick model text…** to open the
  resource picker, and opened the language filter. Its search box reads `Search languages…` and its
  empty state reads `No languages found` — the two strings that were hardcoded English before.

What the packaged build could **not** exercise: the DBL catalogue fetch fails in this environment
(`Background DBL resources fetch failed after 10 attempts`), so the picker holds zero resources and
therefore zero languages. Ordering, the per-language counts, the installed stars, and the scroll cue
have no data to act on here. Those are covered instead by the chromium browser-mode story tests,
which assert against real layout — but a reviewer with DBL access should still open the filter once
and confirm it by eye.

Remaining:

- `npm run build:pbr` exits non-zero on a **pre-existing** typedoc warning,
  `Failed to resolve link to "Z_INDEX_TOOLTIP" in comment for Z_INDEX_ABOVE_DOCK`
  (`components/z-index.ts`, untouched here — the `{@link}` on line 11 precedes the export on
  line 38). `build:basic` succeeds, which is what regenerates `dist`. Worth its own ticket.

### A note for the PR description

`OptionListScrollCue` has to be its own component, not markup inline in `MultiSelectComboBox`. An
effect in the combo box measures the list before Radix has mounted the portal, and the combo box
does not re-render when that mount happens — so it concludes there is nothing to scroll and the cue
never appears. This was diagnosed by DOM probe (wrapper present, geometry correct, cue absent), not
guessed.

## 15. Definition of Done (from the ticket)

- [x] Language picker works in the resource picker
- [x] Regression test added
- [x] Packaged-build verified — shipped-bundle grep plus the two localized strings rendering in the
      running packaged app; see the caveat above about the empty DBL catalogue
