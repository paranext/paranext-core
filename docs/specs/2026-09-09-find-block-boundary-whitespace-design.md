# Find: block-boundary whitespace tolerance (PT-3609)

**Ticket:** [PT-3609 — Unexpected results for Find](https://paratextstudio.atlassian.net/browse/PT-3609)
**Parent:** [PT-4336 — Saroj and Donna can trust the app](https://paratextstudio.atlassian.net/browse/PT-4336), non-negotiable 1F ("Find results are always as expected")
**Branch:** `pt-3609-unexpected-find-results`

## Problem

A user copies a phrase out of the Scripture editor, pastes it into Find, and gets no results — even
though the phrase is visibly there in the text. It happens when the phrase spans a marker that
renders as a line break (a section heading, a new paragraph, a poetry line).

`UsjReaderWriter.search` builds the text it searches by concatenating every text node with **no
separator** (`lib/platform-bible-utils/src/scripture/usj-reader-writer.ts:1735-1738`; the comment
there already flags this as an open question). Concatenating the text nodes of the real-WEB fixture
`usj-reader-writer-test-data/web-matthew-1-and-2.usj` exactly as `search()` does produces:

```
…the son of David, the son of Abraham.Abraham became the father of Isaac…
```

`Abraham.` and `Abraham` are adjacent with nothing between them. The editor renders them on separate
lines, so a copy-paste of that phrase yields `of Abraham. Abraham became`, which contains a space and
therefore cannot match.

### How widespread this is

Paragraph-final whitespace is **stripped during the USFM→USX conversion**, so it never reaches the
USJ that Find searches. The `.SFM` source does carry trailing spaces
(`c-sharp/assets/WEB/41MATengWEBUS.SFM:11` ends `…the son of Abraham. ` before `\p` on line 12), but
the USJ produced through the pipeline does not: in `web-matthew-1-and-2.usj`, **45 of 51** boundary
joins have no whitespace on either side, and in `web-matthew-5-section-header.usj`, 41 of 63.
Mid-paragraph whitespace _is_ preserved (`usj-reader-writer.test.ts:1202` asserts a text node keeping
its trailing space).

So this is not a property of unusual projects. The bundled WEB text reproduces the bug at nearly
every paragraph, poetry line, and section heading, which is why the E2E layer below needs no fixture
patching — and why the Risks section treats the change as broad rather than narrow.

## Scope

Of the five symptoms listed on PT-3609, this work covers **#3 only** (matching across a marker that
renders as a line break or whitespace). The others are dispositioned under [Non-goals](#non-goals).

## Measured facts

Two facts were measured rather than assumed, because the design depends on them.

**1. A pasted newline arrives as a space, not as `\n`.** Find's search box is a plain single-line
`<input type="text">` (`extensions/src/platform-scripture/src/find/find.component.tsx:909`). Probed
in Electron's own Chromium (`webContents.paste()` into a single-line input): `\n` and `\r\n` are both
converted to U+0020. NBSP (U+00A0) survives paste verbatim.

**2. No _UI_ path delivers a newline into the search term.** Besides paste, the UI route is PT-3216's
selection prefill, and `toSearchTerm`
(`extensions/src/platform-scripture-editor/src/find-trigger.util.ts:11-14`) deliberately returns an
empty string for any selection containing `[\r\n]`.

**No query-side CR/LF/TAB handling is built.** An earlier draft added a query-side whitespace class
extending `SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS` with `\n\r\t`; no UI path can exercise it,
so it is cut. `scripture-util.ts` is untouched, and `SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS`
remains the faithful translation of `ParatextData`'s `CharExtensions.IsInvisibleCharOrWhitespace` that
its documentation claims.

This is a product decision about the UI surface, **not** a reachability claim about the API. Two
non-UI paths accept arbitrary strings, newlines included, and neither is being changed here:
`beginFindJob` is a published project-data-provider method whose only validation is emptiness
(`platform-scripture-finder-pdpe.model.ts:353`), and the `platformScripture.openFind` command
(`main.ts:949`) passes `selectedText` through to persisted web view state without the `[\r\n]` filter,
which lives in one caller rather than in the command. A newline arriving that way behaves exactly as
it does today: escaped as a literal, matching nothing.

Fact 1 also rules out needing the reverse direction (a query _lacking_ whitespace matching text that
_has_ it): paste always produces the space, so the query is never the side that is missing it.

## Design

### Matching semantics

**An interior whitespace run in the query may match zero characters, but only at a break boundary.**
A run is interior when it has at least one query character on both sides; a leading, trailing, or
whitespace-only run stays required (matches one or more characters, per the existing
`ignoreWhitespaceDifferences`-off/on behavior below), because making one of those optional would let
the pattern match the empty string for a whitespace-only query — under a lazy zero-or-more the engine
prefers the empty match, producing an empty overall match that the existing zero-length-match handling
skips, so a whitespace-only search would stop matching real whitespace at all.

Using the concatenated text `…the son of Abraham.Abraham became the father of…`:

| Query                                         | _Ignore whitespace differences_ off                   | on                              |
| --------------------------------------------- | ----------------------------------------------------- | ------------------------------- |
| `of Abraham.Abraham became`                   | matches (unchanged)                                   | matches (unchanged)             |
| `of Abraham. Abraham became`                  | zero-length group at the boundary → **matches (new)** | **matches (new)**               |
| `of David,the son` (no boundary between them) | no match (unchanged)                                  | no match (unchanged)            |
| `the  son` mid-paragraph, text has one space  | no match (exact, unchanged)                           | matches (collapsing, unchanged) |

This closes DoD items 2 and 3 from PT-3609 comment 19918. Item 1 (the marker itself included in the
query) requires Find to search markers at all and stays deferred.

Mid-paragraph matching is unchanged. Regex mode is unchanged.

### What counts as a break boundary

A boundary between two adjacent text chunks whose nearest **block-level** ancestors are different
objects. The block-level set is `para`, `table`, `row`, `cell`, `sidebar`.

Three exclusions, all deliberate:

- **`char`-marker boundaries** (`the ` + `LORD` + ` said`) are not break boundaries. They render
  continuously, and their real whitespace lives inside a chunk, so exact matching already handles
  them. Treating them as boundaries would invent tolerance where the editor shows no break.
- **`note` boundaries** are not break boundaries. USJ nests a note _inside_ a para
  (`para → ["text A", note → […], "text B"]`), so an identity comparison that treated `note` as
  block-level would fire twice — entering and leaving the note — at positions where the editor
  renders continuous flowing text. That is the same objection as the `char` case. Excluding `note`
  also means this change adds no new matches that span a footnote, which matters: see
  [Risks](#risks).
- **Verse-marker boundaries within a single paragraph** are not break boundaries. The editor renders
  them inline and the USFM normally carries the space.

`chapter` is deliberately absent: chapter nodes carry no `content`
(`web-matthew-5-section-header.usj:5-10`), so a chapter can never be a text node's ancestor.

Each exclusion gets a comment at the code site, so the decision is checkable from the diff.

### Approach: one relaxed pass, boundary filter inside `search()`

`buildSearchRegex` compiles each **interior** whitespace run in the query as a named capture group
allowing zero-or-more; a leading, trailing, or whitespace-only run keeps today's required (one-or-
more) group instead, for the reason given under [Matching semantics](#matching-semantics). `search()`
runs the regex with the `d` flag and rejects any match where an interior group matched zero
characters at a position that is not a break boundary.

Group names must be **unique per run** — `new RegExp('(?<w>a)(?<w>b)')` throws
`SyntaxError: Duplicate capture group name`, and a query like `of Abraham. Abraham became` has three
whitespace runs. Names are therefore `<prefix><n>` (`ws0`, `ws1`, …) with the prefix an exported
constant shared by both sides rather than a literal duplicated across files.

The searched text and its index map are untouched, so offset mapping, result previews, highlighting,
and Replace all keep working exactly as they do today.

**Alternatives considered and declined:**

- **Sentinel character in the searched text** (insert U+FFFF at break boundaries and let query
  whitespace match it). Conceptually tidy, but every index in the map must account for synthetic
  characters, matches must be trimmed when they start or end on a sentinel, and regex mode changes
  behavior for everyone (`.` would match the sentinel). More blast radius for the same user-visible
  result.
- **Global whitespace looseness** (query whitespace always optional, PT9-style). Simple to explain,
  but introduces false positives mid-paragraph — including the case Sebastian himself flagged as
  "imo unexpected to match" (comment 18329).
- **Filter in the Find PDPE** (return group indices and the boundary set; apply policy in the
  extension). Keeps `platform-bible-utils` free of Find policy, but exposes regex-match plumbing
  through a published API. `search()` already carries `markerStylesToInclude` and
  `normalizationForm`, so a policy option there is the established pattern.

## Implementation

### `lib/platform-bible-utils/src/scripture/usj-reader-writer.ts` — `search()`

- During the existing tree walk, when a text chunk is pushed, capture its nearest block-level
  ancestor **object** and compare it by identity with the previous pushed chunk's. On a difference,
  record the new chunk's start index in a `Set<number>` of break-boundary positions. Computed inside
  the push path, so it reflects chunks skipped by `markerStylesToInclude` rather than the raw tree.
  Reading `workingStack[i].parent` inside the callback is safe: the walk mutates `StackItem.index`
  and pushes/pops the array (`:687, 705-728`) but never reassigns `parent`.
- **Advance `lastIndex` past a zero-length match.** The existing loop discards empty matches without
  advancing (`:1747`, `:1803`), which is unreachable today because every whitespace run compiles to
  `+?` and the overall pattern always requires at least one character. Making runs zero-or-more makes
  it reachable: a whitespace-only query produces a pattern that matches the empty string, `exec`
  leaves `lastIndex` at 0, and the find job spins forever in the extension host with no timeout.
  Verified in node. Guard both ends — advance on a zero-length match here, and reject a
  whitespace-only search string in the PDPE, whose only current validation is emptiness (`:353`).
- Add a `UsjSearchOptions` field gating the filter. When set, reject a match if any group carrying
  the shared prefix matched zero characters at a non-boundary position, and resume `exec` from
  `match.index + 1`. **The rewind applies only to rejected matches**; applying it to accepted ones
  would yield overlapping duplicates, which Replace All rejects outright with `Overlapping ranges
detected` (`platform-scripture-finder-pdpe.model.ts:578-585`).
- **Gate the `d`-flag rebuild on that option.** `search()` is published API, and rebuilding a
  caller's `RegExp` resets `lastIndex` (and changes more for a sticky `y` regex), so it must not
  happen on searches that did not ask for boundary tolerance. Guard the filter on
  `match.indices?.groups`, which is `undefined` for a pattern with no named groups.
- **NFD interaction:** group indices come from the NFD-normalized `searchText`, while boundary
  positions index the original `fullText`, so the zero-length group's index passes through
  `nfdToOriginalMap` before comparison. That map is nfd→original and pre-fills all `nfd.length + 1`
  entries (`:1616-1646`), so it is safely indexable at any position, the end included.

### `extensions/src/platform-scripture/src/find/find.utils.ts` — `buildSearchRegex`

- In the non-regex path, emit each whitespace run as a uniquely-named group with the shared prefix,
  allowed to match zero characters. The group body keeps today's option-driven meaning — the
  collapsing `+?` pattern when _Ignore whitespace differences_ is on, the literal escaped run when
  off — and the existing `~`-as-NBSP handling (`allowInvisibleCharacters`) moves inside the group
  unchanged.
- Emit the `d` flag only when groups were emitted. The `useRegex` branch is not touched.

### `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.model.ts`

- Pass the new option in the existing `usj.search(...)` options object (line 953), **gated on
  `!job.options.useRegex`**. Passing it unconditionally would apply zero-length-group rejection to
  any named group in a user's own pattern that happened to carry the prefix, and would rebuild their
  regex to add `d` — precisely what the existing code avoids for the `u` flag, "to avoid silently
  breaking user-supplied patterns" (`find.utils.ts:797-800`).
- Reject a whitespace-only search string, per the hang guard above.

### Generated output

- `npm run build:types` to regenerate `lib/platform-bible-utils/dist/index.d.ts` and
  `lib/papi-dts/papi.d.ts`. Neither is hand-edited.

## Reproducibility

The bug reproduces in the **unmodified bundled WEB text**, so every layer uses it directly. Working
example, MAT 1 (`\p` boundary between verse 1 and verse 2), whose searched form is
`…the son of David, the son of Abraham.Abraham became the father of Isaac…`:

| Query                                                                | Today     | After     |
| -------------------------------------------------------------------- | --------- | --------- |
| `of Abraham. Abraham became` (what copy-paste from the editor gives) | 0 results | 1 result  |
| `of Abraham.Abraham became`                                          | 1 result  | 1 result  |
| `of David,the son` (mid-paragraph, no boundary)                      | 0 results | 0 results |

`web-matthew-1-and-2.usj` offers 22 further note-free zero-whitespace boundaries if another phrase is
wanted (`the exile to Babylon.After the exile…`, `fourteen generations.Now the birth…`, and so on).

**Negative control:** the third row. A query missing a space _mid-paragraph_ must return nothing
before and after — that is what demonstrates the change is boundary-scoped rather than global
whitespace looseness. (A whole-corpus "no results change" control is **not** available: the bundled
text has boundary-spanning matches everywhere, so results legitimately change in many places.)

## Testing

TDD, outside-in, weighted toward the layer where the defect lives.

### Layer 1 — `lib/platform-bible-utils/src/scripture/usj-reader-writer.test.ts`

Extend `describe('Find USJ details for text searches')` (line 1209), using the real USJ fixtures in
`usj-reader-writer-test-data`.

| Case                                                                                     | Asserts                                                                       |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `\p`→`\p` boundary, query with a space                                                   | The reported bug is fixed                                                     |
| Same boundary, query with nothing between                                                | Today's behavior preserved (DoD item 3)                                       |
| `\q1`→`\q2` boundary where both text nodes nest inside `\wj` (MAT 5 fixture, verses 3–5) | Boundary is the nearest _block_ ancestor, not the nearest ancestor            |
| Zero-width whitespace mid-paragraph                                                      | Rejected — the falsifiable half                                               |
| `char`-marker boundary (`the ` + `LORD`)                                                 | Not a break boundary                                                          |
| Note re-entry inside one para (`"text A"`, note, `"text B"`)                             | Not a break boundary, in either search mode                                   |
| Whitespace-only query (a single space)                                                   | Terminates, and returns no results rather than hanging                        |
| `normalizationForm: 'NFD'`                                                               | The NFD→original index remap is applied before the boundary comparison        |
| `markerStylesToInclude` (verse-text-only), where note chunks are skipped                 | Boundary positions line up against the filtered chunk set                     |
| Option absent                                                                            | Results identical to today across the existing cases, and no `d`-flag rebuild |
| A rejected candidate followed by a legitimate match one character later                  | Resume from `index + 1`, rejected matches only                                |
| Two accepted adjacent matches                                                            | No overlapping duplicates                                                     |
| Boundary at the very start and very end of a match                                       | No off-by-one at the extremes                                                 |

### Layer 2 — `extensions/src/platform-scripture/src/find/find.utils.test.ts`

`buildSearchRegex` emits **uniquely** named whitespace groups (a three-run query compiles without
`SyntaxError`) and the `d` flag only when groups exist; group bodies keep their option-driven meaning
with _Ignore whitespace differences_ both on and off; `~` / `allowInvisibleCharacters` handling is
unchanged inside the group; the `useRegex` path emits no groups and no `d` flag.

### Layer 3 — E2E, `e2e-tests/tests/isolated/find/find.spec.ts`

`e2e-tests/fixtures/find.fixture.ts` already copies `c-sharp/assets/WEB` into a throwaway project
root. No patching is needed — the bundled text reproduces the bug as shipped. Two tests using the
phrases above: the copy-paste query returns a result; the mid-paragraph zero-width query returns
none. Run the whole `isolated/find` directory, since `replace.spec.ts` shares the fixture.

This layer covers the one defect no unit test can catch — that the new option is actually passed at
the PDPE call site, and gated on `!useRegex` — across the full PDPE→UI path.

### Layer 4 — Replace guard

In `platform-scripture-finder-pdpe.test.ts`: a match spanning a **paragraph** boundary, replaced
while structure protection is locked, is refused with `STRUCTURE_PROTECTED_ERROR`. This is the case
the guard actually covers; the note case does not hold and must not be asserted here. See
[Risks](#risks).

### Layer 5 — manual verification

Real copy-paste out of the Scripture editor into Find. The clipboard round-trip is the actual user
path. Record the project and exact phrase in the PR body so it can be re-run.

### Pre-commit verification

`npm run typecheck && npm run lint && npm test`, plus `npm run build:types`. No C# changes and no
keyboard handlers, so `dotnet test` and the keyboard-shortcuts catalog are untouched.
`.context/standards/Standard-View-Invariants.md` was checked and does not apply: this touches
`search()`, the read path, not the USJ/USFM writer contract.

## Risks

**More matches that Replace will refuse.** Because paragraph-final whitespace is stripped in
conversion, boundary-spanning matches become available at nearly every paragraph boundary in every
project — a broad change, not a narrow one. PT-4336's problem statement is precisely that Replace can
silently strip USFM markers.

For **paragraph** boundaries the existing guard holds: `usfmChangesStructure`
(`extensions/src/platform-scripture/src/find/structure-protection.util.ts`) compares the ordered
structural-marker sequence, and the PDP throws `STRUCTURE_PROTECTED_ERROR`. A replace dropping a `\p`
or `\q1` is refused with a localized message.

**The guard does not hold for notes**, and the spec must not claim otherwise. Structure protection
keys off `isBlockMarker`, and note markers are not block markers — verified against the built
library: `isBlockMarker('f')`, `('fe')`, `('x')`, `('fr')`, `('ft')` are all `false`, while `('p')`,
`('q1')`, `('v')` are `true`. So `extractStructuralMarkers` finds nothing structural in a
`\f + \fr … \ft … \f*` span and a replace spanning a footnote deletes it silently, with protection
engaged.

That is a **pre-existing** data-loss bug, not one this change introduces: the no-separator
concatenation already produces note-spanning matches today. This design deliberately keeps it that
way by excluding `note` from the block-level set, so it adds no new note-spanning matches. The gap
itself is filed as a follow-up and belongs to PT-4336's problem space.

**Decision:** accept the increase at paragraph boundaries and rely on the guard that covers them,
with the Layer 4 test asserting that refusal, and an explicit callout in the PR description — both
the breadth and the note gap — so a human reviewer scrutinizes this deliberately rather than having
to spot it in the diff.

**Note:** Replace is removed from the Simple UI (NN-1E), so this exposure is Power-mode only.

## Known limitations

Both are documented rather than fixed, and both are user-visible.

**Boundaries that end in a footnote or cross-reference are not fixed.** Zero-length tolerance bridges
a gap of zero characters only. When the visible line break follows a note, note content sits between
the two chunks: in the MAT 5 fixture the searched text reads
`inherit the earth.5:5 or, land.5:5 Psalm 37:11Blessed are those…`, so a pasted
`inherit the earth. Blessed are those` needs the query's space to match 28 characters. It fails
before and after. Turning on _Verse text only_ excludes note content (`:1723`), which makes the gap
zero and the fix apply — so the behavior is conditional on a filter setting. 42 of 142 chunks in that
fixture are note-origin, so this is common in poetry-heavy passages. Filed as a follow-up; the
tempting fix (let query whitespace swallow the note span) is unsafe until the structure-protection
gap above is closed.

**Whole-word Find is not fixed at these boundaries.** With `wordRestriction: 'wholeWord'`, the
concatenated text makes `Abraham.Abraham` one contiguous run, so the boundary lookarounds
(`find.utils.ts:673-678`) reject a match that ends at or starts just after a boundary: `of Abraham.`
and `Abraham became` both fail, before and after this change. Conversely a query that _spans_ the
boundary now matches inside what the searched text sees as one word. Same root cause (no separator);
out of scope here.

## Non-goals

| Symptom / item                                                    | Disposition                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marker included in the query (DoD item 1)                         | Needs Find to search markers at all — PT-1765 territory; deferred by the PT-3609 thread                                                                                                                                                                                                                   |
| #1 Missing `\c`, results reported at `1:0`                        | Data issue; warning tracked in PT-3738                                                                                                                                                                                                                                                                    |
| #2 Spanning verses                                                | Already fixed by the offset work                                                                                                                                                                                                                                                                          |
| #4 Copy-paste expands `\ft` footnote content                      | `scripture-editors` repo — follow-up                                                                                                                                                                                                                                                                      |
| #5 Copy-paste retains invisible characters                        | `scripture-editors` repo — follow-up. NBSP is already in `SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS` (`scripture-util.ts:707-708`), so Find tolerates it when _Ignore whitespace differences_ is on; the gap is the editor putting an invisible character on the clipboard, plus the exact-match case |
| Note-terminated boundaries                                        | See [Known limitations](#known-limitations) — follow-up                                                                                                                                                                                                                                                   |
| Replace can silently delete a footnote with protection on         | Pre-existing; see [Risks](#risks) — follow-up                                                                                                                                                                                                                                                             |
| Reverse-direction tolerance (query lacks whitespace, text has it) | Measured unreachable via paste; not built                                                                                                                                                                                                                                                                 |
| Sanitizing newlines in `beginFindJob` / `openFind`                | Published API surfaces accepting arbitrary strings; unchanged here                                                                                                                                                                                                                                        |

Follow-ups are recorded outside Jira in `~/Desktop/PT-3609-follow-ups.md`.

## Open questions

**Why could PT-3609 not be reproduced on Windows and Linux?** Comment 18120 reports no reproduction
on Preview 2 (Windows) or a development build (Linux), while the reporter reproduced consistently on
project HPUX. An earlier draft of this spec explained that as bundled-versus-HPUX trailing spaces;
that explanation is wrong — the trailing spaces are stripped in conversion, and the bundled text
reproduces the bug at nearly every paragraph boundary. The cause of the non-reproduction is unknown.
Worth resolving before closing PT-3609: a fix validated against a misunderstood reproduction is a fix
for the wrong bug.

## Architecture decision log

This adds a public option to `UsjReaderWriter.search` and establishes "block-boundary whitespace
tolerance" as a search semantic — the cross-cutting kind of choice
`.context/standards/Architecture-Decisions.md` exists for. Add an entry at its byte-order slug
position covering the boundary-only-versus-global decision, the block-level set and its exclusions,
and why the sentinel approach was declined.
