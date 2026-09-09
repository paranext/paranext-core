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
there already flags this as an open question). So for this USFM:

```
\s Test heading test test test
\p
\v 1 Seeing the multitudes, he went up onto the mountain.
```

the searched text is `Test heading test testSeeing the multitudes, …` — the words `test` and
`Seeing` are adjacent with nothing between them. The editor renders them on separate lines, so a
copy-paste of that phrase yields `test test Seeing the`, which contains a space and therefore cannot
match.

### Why this reproduced for one person and not another

PT-3609's thread contains a reproduction (Sebastian, project HPUX) and a failure to reproduce (Matt,
Windows and Linux, comment 18120). The condition explains both:

**Reproduction requires a break boundary whose USFM line has no trailing whitespace.** When the line
does end with a space, that space lands in the concatenated text and the pasted query matches
exactly. Every paragraph-level line in the bundled WEB text (`c-sharp/assets/WEB`) ends with a
trailing space — a scan of `41MAT` and `42MRK` finds zero qualifying boundaries — so the bundled
text cannot reproduce this at all. HPUX-style text can.

This condition governs every layer of testing below: a test that does not remove that trailing space
is testing nothing.

## Scope

Of the five symptoms listed on PT-3609, this work covers **#3 only** (matching across a marker that
renders as a line break or whitespace). The others are dispositioned under [Non-goals](#non-goals).

## Measured facts

Two facts were measured rather than assumed, because the design depends on them and the wrong guess
produces dead code.

**1. A pasted newline arrives as a space, not as `\n`.** Find's search box is a plain single-line
`<input type="text">` (`extensions/src/platform-scripture/src/find/find.component.tsx:909`). Probed
in Electron's own Chromium (`webContents.paste()` into a single-line input): `\n` and `\r\n` are both
converted to U+0020. NBSP (U+00A0) survives paste verbatim.

**2. No shipped path can deliver a newline into the search term.** Besides paste, the only route is
PT-3216's selection prefill, and `toSearchTerm`
(`extensions/src/platform-scripture-editor/src/find-trigger.util.ts:11-14`) deliberately returns an
empty string for any selection containing `[\r\n]`.

Consequence: **no query-side CR/LF/TAB handling is built.** An earlier draft of this design added a
query-side whitespace class extending `SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS` with `\n\r\t`;
it would never fire, so it is cut. `scripture-util.ts` is untouched, and
`SELECTABLE_INVISIBLE_CHAR_OR_WHITESPACE_CLASS` remains the faithful translation of
`ParatextData`'s `CharExtensions.IsInvisibleCharOrWhitespace` that its documentation claims.

Fact 1 also rules out needing the reverse direction (a query _lacking_ whitespace matching text that
_has_ it): paste always produces the space, so the query is never the side that is missing it.

## Design

### Matching semantics

**A whitespace run in the query may match zero characters, but only at a break boundary.**

Using the reproduction text above, whose searched form is `…test testSeeing…`:

| Query                                           | _Ignore whitespace differences_ off                   | on                              |
| ----------------------------------------------- | ----------------------------------------------------- | ------------------------------- |
| `test testSeeing the`                           | matches (unchanged)                                   | matches (unchanged)             |
| `test test Seeing the`                          | zero-length group at the boundary → **matches (new)** | **matches (new)**               |
| `multitudes,he went` (no boundary between them) | no match (unchanged)                                  | no match (unchanged)            |
| `test  test` mid-paragraph, text has one space  | no match (exact, unchanged)                           | matches (collapsing, unchanged) |

This closes DoD items 2 and 3 from PT-3609 comment 19918. Item 1 (the marker itself included in the
query) requires Find to search markers at all and stays deferred.

Mid-paragraph matching is unchanged. Regex mode is unchanged — a user's pattern means exactly what
they wrote, with no groups injected and no tolerance applied.

### What counts as a break boundary

A boundary between two adjacent text chunks whose nearest **block-level** ancestors are different
objects. The block-level set is `para`, `chapter`, `table`, `row`, `cell`, `sidebar`, `note`.

Two exclusions, both deliberate:

- **`char`-marker boundaries** (`the ` + `LORD` + ` said`) are not break boundaries. They render
  continuously, and their real whitespace lives inside a chunk, so exact matching already handles
  them. Treating them as boundaries would invent tolerance where the editor shows no break.
- **Verse-marker boundaries within a single paragraph** are not break boundaries. The editor renders
  them inline and the USFM normally carries the space. Recorded as a comment at the code site so the
  decision is checkable from the diff.

### Approach: one relaxed pass, boundary filter inside `search()`

`buildSearchRegex` compiles each whitespace run in the query as a _named_ capture group allowing
zero-or-more; `search()` runs the regex with the `d` flag and rejects any match where such a group
matched zero characters at a position that is not a break boundary. The group-name prefix is an
exported constant shared by both sides rather than a literal duplicated across files.

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
  ancestor **object** (the working-stack array is mutated during the walk, so the reference is what
  is stable) and compare it by identity with the previous pushed chunk's. On a difference, record the
  new chunk's start index in a `Set<number>` of break-boundary positions. Computed inside the push
  path, so it reflects chunks skipped by `markerStylesToInclude` rather than the raw tree.
- Ensure the `d` flag before executing (rebuild the `RegExp` if the caller did not supply it), so
  `match.indices.groups` is available.
- Add a `UsjSearchOptions` field gating the filter. When set, reject a match if any named group
  carrying the shared prefix matched zero characters at a non-boundary position, and resume `exec`
  from `match.index + 1` rather than `lastIndex` — the relaxed regex is leftmost-first, so resuming
  from `lastIndex` could skip an overlapping legitimate match.
- **NFD interaction:** group indices come from the NFD-normalized `searchText`, while boundary
  positions index the original `fullText`. The zero-length group's index must pass through
  `nfdToOriginalMap` before comparison. Skipping this makes boundary tolerance fail silently on
  diacritic-insensitive searches.

### `extensions/src/platform-scripture/src/find/find.utils.ts` — `buildSearchRegex`

- In the non-regex path, emit each whitespace run as a named group with the shared prefix, allowed
  to match zero characters. The group body keeps today's option-driven meaning — the collapsing
  `+?` pattern when _Ignore whitespace differences_ is on, the literal escaped run when off — and
  the existing `~`-as-NBSP handling (`allowInvisibleCharacters`) moves inside the group unchanged.
- Emit the `d` flag alongside the existing flag logic. The `useRegex` branch is not touched.

### `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.model.ts`

- Pass the new option in the existing `usj.search(...)` options object (line 953). One added field.

### Generated output

- `npm run build:types` to regenerate `lib/platform-bible-utils/dist/index.d.ts` and
  `lib/papi-dts/papi.d.ts`. Neither is hand-edited.

## Reproducibility

Every layer uses the same minimal USFM, which is the in-repo fixture
`web-matthew-5-section-header.usfm` shape (`\s` line with **no** trailing space, followed by `\p`):

```
\c 1
\s Test heading test test test
\p
\v 1 Seeing the multitudes, he went up onto the mountain.
```

Searched text: `Test heading test testSeeing the multitudes, he went up onto the mountain.`

| Query                                                          | Today     | After     |
| -------------------------------------------------------------- | --------- | --------- |
| `test test Seeing the` (what copy-paste from the editor gives) | 0 results | 1 result  |
| `test testSeeing the`                                          | 1 result  | 1 result  |
| `multitudes,he went` (no boundary)                             | 0 results | 0 results |

**Negative control:** the same steps against the _unmodified_ bundled WEB show no change in behavior
before or after. This is what demonstrates the change is boundary-scoped rather than global
whitespace looseness.

## Testing

TDD, outside-in, weighted toward the layer where the defect actually lives.

### Layer 1 — `lib/platform-bible-utils/src/scripture/usj-reader-writer.test.ts`

Extend `describe('Find USJ details for text searches')` (line 1209), using the real USJ fixtures in
`usj-reader-writer-test-data`.

| Case                                                                              | Asserts                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `\s`→`\p` boundary, query with a space                                            | The reported bug is fixed                                              |
| Same boundary, query with nothing between                                         | Today's behavior preserved (DoD item 3)                                |
| `\q1`→`\q2` boundary where both text nodes nest inside `\wj` (fixture verses 3–5) | Boundary is the nearest _block_ ancestor, not the nearest ancestor     |
| Zero-width whitespace mid-paragraph                                               | Rejected — the falsifiable half                                        |
| `char`-marker boundary (`the ` + `LORD`)                                          | Not a break boundary                                                   |
| `normalizationForm: 'NFD'`                                                        | The NFD→original index remap is applied before the boundary comparison |
| `markerStylesToInclude` (verse-text-only), where note chunks are skipped          | Boundary positions line up against the filtered chunk set              |
| Option absent                                                                     | Results identical to today across the existing cases                   |
| A rejected candidate followed by a legitimate match one character later           | Resume from `index + 1`, not `lastIndex`                               |
| Boundary at the very start and very end of a match                                | No off-by-one at the extremes                                          |

### Layer 2 — `extensions/src/platform-scripture/src/find/find.utils.test.ts`

`buildSearchRegex` emits prefixed named whitespace groups and the `d` flag; group bodies keep their
option-driven meaning with _Ignore whitespace differences_ both on and off; `~` /
`allowInvisibleCharacters` handling is unchanged inside the group; the `useRegex` path emits no
groups and no `d` flag.

### Layer 3 — E2E, `e2e-tests/tests/isolated/find/find.spec.ts`

`e2e-tests/fixtures/find.fixture.ts` already copies `c-sharp/assets/WEB` into a throwaway project
root and patches it (new GUID, `Editable=T`). Extend that patching to remove the trailing space at
one paragraph boundary, which is the only way to produce a reproducing condition from the bundled
text. Two tests: the copy-paste query returns a result; a mid-paragraph zero-width query returns
none.

This layer exists to cover the one defect no unit test can catch — that the new option is actually
passed at the PDPE call site — across the full PDPE→UI path.

The patched project root is shared with the existing find/replace E2E tests. Those assert against a
common-word term and a deliberate no-match term rather than exact per-book counts, so removing one
trailing space is low risk — but choose a boundary those assertions do not touch, and run the whole
`isolated/find` directory, not just the new tests.

### Layer 4 — Replace guard

In `extensions/src/platform-scripture/src/project-data-provider/platform-scripture-finder-pdpe.test.ts`:
a boundary-spanning match, replaced while structure protection is locked, is refused with
`STRUCTURE_PROTECTED_ERROR`. See [Risks](#risks).

### Layer 5 — manual verification

Real copy-paste out of the Scripture editor into Find, against a project with the qualifying USFM.
The clipboard round-trip is the actual user path. Record the project and exact phrase in the PR body
so it can be re-run.

### Pre-commit verification

`npm run typecheck && npm run lint && npm test`, plus `npm run build:types`. No C# changes and no
keyboard handlers, so `dotnet test` and the keyboard-shortcuts catalog are untouched.

## Risks

**More matches that Replace will refuse.** This change increases the number of matches that span
block boundaries, and PT-4336's problem statement is precisely that Replace can silently strip USFM
markers.

Boundary-spanning matches already occur today — the ticket's original `.guys.\w` report is one, since
chunks are concatenated with no separator — so this raises their frequency rather than introducing a
new class of hazard. The existing guard covers it: `usfmChangesStructure`
(`extensions/src/platform-scripture/src/find/structure-protection.util.ts`) compares the ordered
structural-marker sequence before and after, and the PDP throws `STRUCTURE_PROTECTED_ERROR`. A
replace over a boundary-spanning match necessarily drops a block marker, so it is refused with a
localized message. Structure protection has a lock/unlock toggle (plus a `lockedByAdmin` state), so
this is not unconditional.

**Decision:** accept the increase and rely on the existing guard, with the Layer 4 test asserting the
refusal, and an explicit callout in the PR description so a human reviewer scrutinizes this
deliberately rather than having to spot it in the diff. The alternative — making boundary-spanning
matches unreplaceable regardless of the lock — is defensible but expands scope into Replace
semantics that this ticket does not ask about.

**Note:** Replace is removed from the Simple UI (NN-1E), so this exposure is Power-mode only.

## Non-goals

| Symptom / item                                                    | Disposition                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Marker included in the query (DoD item 1)                         | Needs Find to search markers at all — PT-1765 territory; deferred by the PT-3609 thread                                                                                                                                                                                                                        |
| #1 Missing `\c`, results reported at `1:0`                        | Data issue; warning tracked in PT-3738                                                                                                                                                                                                                                                                         |
| #2 Spanning verses                                                | Already fixed by the offset work                                                                                                                                                                                                                                                                               |
| #4 Copy-paste expands `\ft` footnote content                      | `scripture-editors` repo — **new ticket to file**                                                                                                                                                                                                                                                              |
| #5 Copy-paste retains invisible characters                        | `scripture-editors` repo — **new ticket to file**. Confirmed real by the paste probe: NBSP survives verbatim, so with _Ignore whitespace differences_ off a pasted NBSP demands a literal NBSP in the text. The named-whitespace-group structure introduced here is the natural home for a Find-side fix later |
| Reverse-direction tolerance (query lacks whitespace, text has it) | Measured unreachable via paste; not built                                                                                                                                                                                                                                                                      |

## Architecture decision log

This adds a public option to `UsjReaderWriter.search` and establishes "block-boundary whitespace
tolerance" as a search semantic — the cross-cutting kind of choice
`.context/standards/Architecture-Decisions.md` exists for. Add an entry at its byte-order slug
position covering the boundary-only-versus-global decision and why the sentinel approach was
declined.
