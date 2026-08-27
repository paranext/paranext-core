# Standard View Invariants

> Read this before changing anything in the Standard-view editing path — the marker-edit engine, the
> settle machinery, display runs, the USFM tokenizer, or the USJ/USFM writers. It is the contract
> those pieces keep with each other. Ignoring one of these is how the same defect class keeps coming
> back.

Standard view shows USFM markers as editable text. That one product decision is what generates
everything below: if a marker glyph is on screen and the caret can enter it, the glyph is part of
the document, and every layer has to agree on what "the document" means.

**Scope.** These govern code in two repos. Paths are labelled: bare paths are `paranext-core`;
`scripture-editors` paths say so. Most enforcement lives in `scripture-editors` (the editor engine);
`paranext-core` holds the host, the writers, and the markers map.

**What this is not.** Not a design doc and not a work plan. It records only the rules that more than
one area depends on, so parallel work cannot drift.

---

## 1. Governing invariants

### I. Displayed bytes are the document

Every byte the user can place a caret in is document text. Changing it changes the file, by
**re-tokenizing the displayed bytes**.

Corollaries:

- **Never heal against a user edit.** Healing exists for drift introduced by non-user code paths.
- **Structural truth is re-tokenization.** In-place mutation is an optimization, valid only where
  re-tokenization is provably identity.
- **No silent no-ops.** A keystroke either changes the document or is visibly refused. Accepting a
  keystroke and discarding it later is the failure this rule exists to prevent.

The one ratified exception is space-run collapse — see §4.

### II. One position language

Display bytes (marker glyphs, separators, attribute-run text, verse glyphs, para prefixes) are
excluded from document positions in exactly ONE place. Caret anchoring across a rebuild, OT content
op offsets, and delta-doc positions all resolve through it.

The caret/selection half of this landed: `scripture-editors`
`libs/shared/src/nodes/usj/glyphPositions.utils.ts` decides which rendered bytes are display by the
property that *a node's text is a picture of its own state*, and re-expresses a point so no glyph is
an operand of the edit about to run. Three separately-reported bugs turned out to be one cut reached
from three gestures.

**The collab half is still outstanding** — the ops stream and the delta-doc length side maintain
separate exclusion predicates that already differ by one arm. Tracked as PT-4399. Do not add a
fourth private exclusion; extend the shared one.

### III. One lifecycle for engine-owned display things

Every kind the engine owns — attribute runs, milestone runs, verse `\va`/`\vp` runs, opener glyphs,
closing glyphs, the nested `+`, opener separators, para-marker prefixes, optbreak bytes — carries
the same four duties:

1. **construct** canonically,
2. **heal** non-user drift,
3. **pend** on user edit or deletion,
4. **settle** on departure.

A kind wired for some duties and not others is the recurring defect shape ("missing quadrant"). New
kinds join the registry (`scripture-editors` `libs/shared/src/displayRun/displayRunRegistry.ts`);
they do not hand-wire a fifth quartet.

### IV. Settle has two clocks and one definition

- **On screen**: caret departure, OR a Paratext-9-style debounce timer.
- **For consumers**: `getUsj()` returns settled output without mutating the editor.

All paths run the SAME settle computation. Divergence between them is a defect, not a trade-off.

A settle is **never its own undo entry**. Undo undoes what the USER did, so every settle merges into
the history entry of the edit that provoked it. A settle commit is still a real content change and
must reach USJ-change consumers, which is why it carries `MARKER_SETTLE_TAG` alongside the merge
tag. A narrower gate — merge only settles that are USFM-equivalent, by comparing canonical USJ
before and after — was considered and **rejected on cost** (two full-document serializations per
settle, on both clocks). Do not reintroduce it.

### V. A loaded document is a transform fixed point

Load a document, dirty every node, run the update, serialize. The output must equal the input.

Any difference means a transform fabricated content, deleted content, or the load shape was not
canonical. All three are bugs. This is machine-checkable, and it is checked: `scripture-editors`
`packages/platform/src/editor/markerEdit/tier2Rebuild.corpus.test.tsx` runs it over the 2SA corpus.
Transforms do not run on `setEditorState` — they run when a node is dirtied — so a transform that
fabricates or deletes content does so on the user's first edit to a region, not at load. That is why
the net has to dirty nodes rather than merely load them.

---

## 2. Derived rules

Each was settled by investigation or product decision. Do not re-derive them.

### Heal by provenance, never by caret proximity

Whether to restore an engine-owned byte depends on WHO removed it, not on where the caret is.
Caret-proximity heuristics are what let deletions silently miss their pend. Machine drift heals; a
user edit pends.

### The tokenize-identity predicate

> Restore a removed engine-owned byte iff the bytes tokenize IDENTICALLY without it.

Applied to the opener separator:

| Bytes | Without the space | Same meaning? |
| --- | --- | --- |
| `\nd` + `\wj stuff` | `\nd\wj stuff` | yes — the name scan stops at `\` either way. **Heal.** |
| `\nd` + `\|x="y"` | `\nd\|x="y"` | yes — the name scan stops at `\|` either way. **Heal.** |
| `\nd` + `things` | `\ndthings` | no — the marker is now `ndthings`. **Rename.** |
| `\nd` + `*stuff` | `\nd*stuff` | **no — that is a CLOSING marker.** Do not heal. |

The last row is why the rule is defined by MEANING and not by a character class: `*` is one of the
tokenizer's four name-scan terminators (`\`, `|`, whitespace, `*`), so an allowlist built from
terminators would wrongly heal it and silently stop the user typing a closer.

The predicate lives beside the tokenizer, in `scripture-editors`
`libs/shared/src/nodes/usj/markerSeparators.utils.ts`, so it cannot drift from it.

### Leading-attribute whitespace collapses

Whitespace between a marker and its leading-attribute value is structural and collapses to one.

Which markers have leading attributes, and in what order, comes from the markers map's
`leadingAttributes` field — **not** from a list maintained in the editor. So `\v  5` is verse 5,
`\c  3` is chapter 3, `\f  +` has caller `+`, `\id  MAT` has code `MAT`: one rule, no per-marker
exceptions.

Consequence: a space typed next to a verse cannot demote its number. Only a non-space character
after the number does that — `\v 7 5` is verse 7 followed by body text `5`.

### Note callers are atomic in Standard view

A collapsed note caller is ONE unit: arrow keys step over it whole, deletion removes it whole, and
its text is not editable by typing. This matches Paratext 9; the caller is changed through the
footnote editor's UI instead.

This is a VIEW-level rule keyed on `noteMode === "collapsed"`, not a node-level one — a
Paratext-9-parity unformatted view would want direct caller editing, and will not use collapsed
notes, so the two axes cannot collide.

### Prefer a declared property over a new exception list

Before adding a per-marker special case, check whether the markers map already declares the
property. `leadingAttributes`, `attributeMarkers`, `textContentAttribute`, and `defaultAttribute`
are all declared there, ordered, and versioned (3.0/3.1, spec/Paratext).

But the map cannot express everything, and the duplication with the editor's own `ATTRIBUTE_MARKERS`
table is deliberate. The two were checked against each other and **agree on every marker, attribute
name, shape, and host**; each holds facts the other cannot represent:

- **Map only:** `hasStructuralSpaceAfterCloseAttributeMarker`; the map-level
  `isSpaceAfterAttributeMarkersContent` spec-vs-Paratext switch; version and spec/Paratext variants.
- **Editor only, and load-bearing:** a same-line space before an attribute marker BLOCKS the fold
  (Paratext parse behavior, no map representation); markup inside the content aborts the fold; an
  empty span is never an empty attribute; `cat` is receptive only directly after `\esb` or right
  after a note's caller.

The map models the SERIALIZER (USJ to USFM, spec-declarative). The editor's table models the PARSER
(USFM to USJ, deliberately matching ParatextData rather than the spec). **Derive the shared facts
from the map; keep the parser-behavior deltas local, explicit, and named.** Do not collapse one into
the other.

---

## 3. The USJ-to-USFM writer contract

`UsjReaderWriter.toUsfm()` — `lib/platform-bible-utils/src/scripture/usj-reader-writer.ts`. Nothing
here is obvious from the editor side, and several editor behaviors exist only to satisfy it.

1. **No separators between content items.** Text chunks are concatenated verbatim.

   *Consequence:* word separation between a text run and whatever follows lives entirely inside the
   USJ text strings. A text node that loses its trailing space before a verse, char span, or note
   produces jammed words in the file. This is why trailing-space maintenance exists and why it
   cannot simply be deleted.

2. **A structural space is emitted after an opening marker.** Removed only when the marker's type
   has an EMPTY closing marker (milestones) and the marker closes with no content and no closing
   attributes.

3. **A newline before a block marker consumes one trailing space.**

   *Consequence:* a trailing space at the end of a paragraph is free in the file. The editor should
   allow it and let the writer normalize it, rather than deleting it early.

4. **End of file always gets a newline**, likely replacing a space.

---

## 4. Ratified behavior — do not "fix" these

**Space runs collapse on save; the display is deliberately NOT collapsed to match.** Type `a  b` and
after a settle the screen keeps both spaces while the file gets one, indefinitely. That is a real,
permanent screen-vs-file divergence, ratified anyway: it models Paratext 9's `RegularizeSpaces`, and
normalizing the display instead would delete a byte under the user's caret.

**This is a one-off and must not be generalized.** It is the single place where the answer to "the
screen and the file disagree" is "leave it". Every other divergence is a defect. If a new case looks
like this one, it is not — bring it to the owner rather than reasoning from this row.

The related-but-opposite rule, and NOT an exception to anything: a space the user TYPES beside a
marker is inserted, stays visible, and leaves the caret immediately after it — in a verse or chapter
glyph's separator run, after a char opener, and inside any of the five display runs (`va`, `vp`,
`ca`, `cp`, `cat`). The file is unaffected either way because the writer emits structural whitespace
itself. Accepting that keystroke and discarding it would be the no-silent-no-ops failure.

**The `\` palette is ACTIVE.** The trigger never lands in the document, in any selection shape, and
subsequent typing filters the palette rather than reaching the document.

| Behavior | `\marker` + Space | `\marker` + Enter |
| --- | --- | --- |
| Marker chosen | whatever was literally typed (the palette query) | whatever is highlighted |
| Closing marker | **none** — the span records `closed="false"` | **inserted** |
| Unknown marker | settles as unknown (the materialized literal settles as typed) | cannot commit one not in the list |
| `\f` specifically | commits like Enter (emergent: `\f ` tokenizes to the full note) | commits |
| Zero matches | commits the typed text as the marker and closes | **no-op — the palette stays open** (P9 parity) |
| Escape | closes the palette, document untouched | closes the palette, document untouched |
| Over a non-collapsed selection | wraps the selection in the typed marker's closed span; a marker not offered refuses visibly (palette closed, selection intact) | commits the highlighted item, wrapping the selection |

**`*` is a commit key in every selection shape.** Typing `\nd*` with text selected DELETES the
selection and lands the literal `\nd*` in its place — unmatched unless an open `\nd` precedes it.
That is a different gesture from Space's WRAP, so the two are not interchangeable over a selection,
and `*` is therefore not a filter character anywhere.

**`\` is a third commit key.** With a palette open and a NON-EMPTY filter, `\` commits what was
typed exactly as Space does but with NO terminating space, then opens a FRESH palette for the
backslash just pressed — so `\qt-s\qt-e` is one continuous flow. Dropping the separator is safe
because a marker-name scan terminates at the next `\`. With an EMPTY filter there is nothing to
commit, so `\` stays an ordinary character.

**Multi-step undo for palette item applies** is intentional. (Settles are not part of this — see
Invariant IV.)

---

## 5. Fixed points

Extend these; never weaken them.

- The tokenizer and losslessness core: `usfmFragmentToUsjContent`, `extractAttributes`,
  `scanMilestone`, NBSP/space flattening.
- `canonicalAttributeText`.
- The editor-to-USJ and delta exclusion gating.
- Tier 2's preserve-or-refuse machinery: fixed-point signature, sentinel symmetry, guard rails.
- The corpus losslessness and round-trip property tests, at zero skips.

---

## 6. Approval gate: C# serialization

**Do not change C# serialization code without discussing it with the repo owner first.** This is a
human approval gate, not a technical constraint.

Investigating the USJ-to-USFM and USX-to-USFM paths is expected and encouraged; fixing them
unilaterally is not. If you find a defect in those paths that lives in C#:

1. Stop before editing.
2. Bring the owner the PROBLEM and your PROPOSED SOLUTION together — what the defect is, how you
   established it, and what you would change.
3. Wait for a decision.

Capture tests that RECORD ParatextData's behavior are encouraged and are **not** covered by this
gate — pinning what the C# side does today is how these questions get settled. The gate is on
changing the serialization behavior itself.
