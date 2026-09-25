# Standard View Invariants — the host side

> Read this before changing anything Standard view depends on in THIS repo: the USJ-to-USFM writer,
> the markers map, the marker palette's key semantics, the footnote editor, or the C# serialization
> paths.

Standard view shows USFM markers as editable text. Most of the machinery that makes that work lives
in the `scripture-editors` repo — the marker-edit engine, the settle clocks, the display-run
registry, the USFM tokenizer — and its invariants are documented there, at
`docs/standard-view-invariants.md`. **The two halves are deliberately separate so each is readable
with only one repo checked out.** If you have both, read both.

This half covers the contracts the editor engine depends on from here, and the ones nothing on the
editor side makes obvious.

---

## 1. The USJ-to-USFM writer contract

`lib/platform-bible-utils/src/scripture/usj-reader-writer.ts` — `UsjReaderWriter.toUsfm()`. Several
editor behaviors exist only to satisfy these, so changing one changes the editor.

1. **No separators between content items.** Text chunks are concatenated verbatim.

   _Consequence:_ word separation between a text run and whatever follows it lives entirely inside
   the USJ text strings. A text node that loses its trailing space before a verse, char span, or
   note produces jammed words in the file. This is why the editor's trailing-space maintenance
   exists and why it cannot simply be deleted.

2. **A structural space is emitted after an opening marker.** Removed only when the marker's type
   has an EMPTY closing marker (milestones) and the marker closes with no content and no closing
   attributes.

3. **A newline before a block marker consumes one trailing space.**

   _Consequence:_ a trailing space at the end of a paragraph is free in the file. The editor should
   allow it and let the writer normalize it, rather than deleting it early.

4. **End of file always gets a newline**, likely replacing a space.

---

## 2. The markers map is the declared-property source

`leadingAttributes`, `attributeMarkers`, `textContentAttribute`, and `defaultAttribute` are declared
here, ordered, and versioned (3.0/3.1, spec/Paratext). The editor derives shared facts from the map
rather than maintaining parallel lists — so a marker property added here is the way to change editor
behavior, ahead of a per-marker special case over there.

The map deliberately does NOT model everything. It models the SERIALIZER (USJ to USFM,
spec-declarative); the editor's own `ATTRIBUTE_MARKERS` table models the PARSER (USFM to USJ,
matching ParatextData rather than the spec). The two were checked against each other and agree on
every marker, attribute name, shape, and host. Do not collapse one into the other — see the editor
repo's half for the facts each side holds alone.

---

## 3. Marker palette key semantics

`lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts` is the single
forwarding table for BOTH the scripture editor web view and the footnote-editor popover. The
per-consumer copies drifted once already; there is one table now.

The palette is **ACTIVE**: the `\` trigger never lands in the document, in any selection shape, and
subsequent typing filters the palette rather than reaching the document.

| Key                   | Collapsed caret                                                             | Over a selection                                                                                            |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Space                 | commits the marker literally TYPED; the span records `closed="false"`       | wraps the selection in that marker's CLOSED span; a marker not offered refuses visibly, selection intact     |
| Space, nothing typed  | closes the palette, document untouched (P9 parity)                          | same                                                                                                          |
| Enter / Tab           | commits the highlighted item, closer inserted                               | commits the highlighted item, wrapping the selection                                                          |
| Enter / Tab, 0 matches| **no-op — the palette stays open** (P9 parity)                              | same                                                                                                          |
| `*`                   | commits the typed marker's CLOSING form, no terminating space               | DELETES the selection and lands the closer in its place (P9 parity)                                           |
| `\`                   | commits what was typed with no terminating space, then reopens a fresh palette | not a commit key — the wrap consumes the selection                                                         |
| `\`, nothing typed    | ordinary character; it lands and no palette reopens                         | —                                                                                                             |
| Escape                | closes the palette, document untouched                                      | same                                                                                                          |

`\f` specifically commits like Enter on Space, emergently: `\f ` tokenizes to the full note. An
unknown marker settles as typed at a caret, and cannot be committed from the list.

**The Enter-split palette (`'enter'` kind) is not otherwise table-driven.** It is always focused with
no key forwarding, so the overlay's own input owns its keys — except during the frames before that
input wins the cross-frame focus fight (the palette retries focus for up to twenty animation
frames). Enter and Escape are claimed there so they cannot reach the document: an Enter that reaches
Lexical performs the unmarked plain split the palette exists to prevent, and leaves the palette open
with nothing committed.

Every keyboard handler change here must also update `src/stories/keyboard-shortcuts.data.ts` — see
`.claude/rules/keyboard-shortcuts-catalog.md`.

---

## 4. The footnote editor popover

`lib/platform-bible-react/src/components/advanced/footnote-editor/`.

- **The editor owns the note.** The popover's note type and caller are applied to its own editor
  (`applyUpdate`) and read back from it; they are not re-derived from React state on the way out.
  State here is a mirror for the dropdowns. Re-deriving on save is how a stale value gets written:
  the state is set in the same React batch as the change, so a save triggered from inside that batch
  reads the pre-change value.
- **A dropdown opened inside the popover must clear it.** Radix portals such content to
  `document.body` instead of nesting it, so the dropdown and `PopoverContent` are stacking SIBLINGS
  and the popover's own z-index competes directly with the dropdown's. Use `Z_INDEX_ABOVE_POPOVER`;
  `lib/platform-bible-react/src/components/z-index.test.tsx` pins the ordering.
- **The note's shell is not typeable, and the view option alone does not achieve that.** The popover
  passes `isNoteShellEditable: false`, which renders `\f + ` in Lexical's `token` mode — necessary,
  but on its own that still lets a caret land among those characters, where a keystroke replaces the
  whole node: a lost caller, or a destroyed note. The editor's `NoteShellCaretGuardPlugin` is what
  keeps the caret out; the `scripture-editors` invariants carry the full rule. A `\cat` category run
  typed just after the caller belongs to the note's CONTENT, which is where the guard puts the caret.
- **The caller is ONE choice, applied in one call.** The applied caller is a function of both the
  type and the custom character (a type of `custom` means nothing without one), and the dropdown's
  React state is set asynchronously — so a per-half call would read its sibling's half from state
  that had not updated yet, and a visit changing both would write neither. `updateCaller` carries
  both, which also keeps one choice to one save: the note is replaced in the popover's editor on
  the way through.
- **Custom is the one caller row a click does not commit.** It keeps the menu open on purpose
  (`onSelect` preventDefault) so a character can be typed, which leaves its own check as the
  confirming gesture — the same commit Enter performs. Two consequences worth knowing before
  touching it: the check's indicator is `pointer-events-none`, so a click on it arrives on the ROW,
  and Radix resolves selection on POINTER-UP, so by click time the row already reads as checked —
  whether the click is arming or confirming can only be answered from before the press.
- **The footnotes pane renders a note's `category` from the note's own field.** It is the one part
  of a footnote that never appears in `content`: the parser folds the file's `\cat People\cat*` run
  onto the note as an attribute, so anything rendering a footnote from `content` alone drops it
  silently. `footnote-item.component.tsx` reads the field and renders the run after the caller, in
  the file's own order.

---

## 5. Approval gate: C# serialization

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

---

## 6. One position language (spans both repos)

Display bytes — marker glyphs, separators, attribute-run text, verse glyphs, paragraph prefixes —
are excluded from document positions in exactly ONE place. Caret anchoring, OT content-op offsets,
and delta-doc positions all resolve through it.

That is the rule. It is here because the cost of breaking it lands on both repos: each display-byte
class that got its own private exclusion had to be found and fixed separately, once per consumer,
each after a bug. **Do not add another private exclusion; extend the shared one.**

The caret/selection half is unified in the editor repo. The collab half is not yet — the ops stream
and the delta-doc length side still keep separate predicates.

Two rules follow from that one language, both of which a host has to get right:

**Every public editor position is a SETTLED coordinate.** `getSelection`, `onSelectionChange`,
`setSelection`, `setAnnotation` and `insertNote` all address the document `getUsj()` returns, never
the live Lexical tree — the editor does the live↔settled translation once, at its own API boundary.
So a host may resolve a jsonPath it received from the editor against the USJ it already holds, and a
path that fails to resolve (or an offset past the node it lands on) is a bug or a race, not an
expected state. Keep those host-side checks as fail-safes, log them, and do not write code that
compensates for an expected divergence — there isn't one.

**A position names the byte in front of which it sits, and snaps LEFT in BOTH directions.** It maps
through whatever contains that byte on its own side; where one side has bytes the other lacks, the
position in front of them snaps to the nearest byte both sides share, and the position just past
them is exact. There is no separate outbound-snap/inbound-refuse split — one aligner serves both
directions, each end of a range resolved on its own. Outbound: `getSelection` and `onSelectionChange`
answer `undefined` only when there is no selection (or the layout has no USJ locations at all), never
because a position could not be translated — every real caret has a location. While an edit is
pending, typed bytes the settled document carries as an attribute are reported as that attribute's
location (a typed `\cat x\cat*` is the note's `category`; a typed figure's `|src="…"` is its
`file`). With `|lemma="grace"` pending (settles to `|grace`), the settled value start
(`['lemma'] propertyOffset 0`) lands at the start of the VALUE — before `grace`, not just after `|`
— because the position sits in front of `grace`, and `grace` is a byte both sides carry. A host
should treat `undefined` as a cleared selection, not as an error. Inbound: `setSelection`,
`setAnnotation` and `insertNote` refuse (and log the refusal) ONLY a location that names nothing in
the settled document at all; a location inside a scope the editor can pair only in part is not a
whole-scope refusal — it snaps LEFT the same as outbound. A position basis the live tree has moved
on from is rebuilt, and the rebuild logged as an error, never refused. Rationale:
`adr-editor-outbound-positions-snap-left` in [`Architecture-Decisions.md`](Architecture-Decisions.md).

That holds across Standard view's space-run collapse too. A run the user types stays on screen while
`getUsj()` carries one space (ratified in the editor repo's invariants, §4), and the editor's
position model drops the run's extra spaces exactly where serialization does, from one shared
definition. The editor's position functions therefore take its view options; pass the view the
editor is running, never a default.

**`onUsjChange`'s `usj` payload is a SETTLED, synchronous snapshot.** It equals `getUsj()` at the
moment of emission, fires synchronously within the commit's own listener pass, exactly once per
content commit and in commit order — including once, not twice, after a `setUsj` reload. A
selection-only commit emits nothing. `ops` stay a LIVE view of the same commit, so a host that needs
both reads `usj` for content and `ops` for the tree-level change; neither substitutes for the other.

**Notes are counted in the SETTLED document.** `selectNote(index)` counts and selects against
`getUsj()`'s notes; a note still pending as a typed literal gets the caret placed at the literal's
`\`, not at a note index that does not exist yet. `getNoteOps` stays LIVE for both key and index, so
`getNoteOps(i)` and `selectNote(i)` can legitimately name different notes while a whole note literal
is pending — a host that keys UI state off one must not assume the other agrees.

**A typed table cell settles as `table:cell` under ParatextData parity.** The settle applies
`UsfmParser.IsCell`'s own rule: a Character-typed or undeclared cell-named marker inside an open row
is a cell; the same marker `+`-nested under another marker is never a cell; with no open row, it is
an ordinary character marker. The position and note-counting rules above apply to a settled cell the
same as to any other settled content.

Recorded as-is, not position defects: `\c 2 made` settles to a chapter followed by a bare root
string `"made"` — ParatextData produces the same USJ from that input. The settle keeps the space
before a typed `\c`, `\tr`, `\esb` or `\esbe` that ParatextData trims on save; positions count only
non-whitespace bytes, so the kept space never moves one.

**A position has one spelling.** Every USFM position has exactly ONE `UsjDocumentLocation`, and
the editor emits only that one; `UsjReaderWriter.usfmVerseLocationToUsjDocumentLocation` is the
oracle. `offset` means an index into text only, so a caret with no text beside it is never a
container plus a content index and never `$` plus one:

1. A gap in front of a marker object is that marker's location (`{ jsonPath: <item> }`).
2. The character after a token with no other home — the space after a marker name, a line's newline
   — is addressed on that token at its length: text `offset: length`, `['marker']` at
   `propertyOffset: marker.length` (inside an empty `\b`), `closingMarkerOffset` at the closer's
   length (a paragraph ending in a note is `\f*` at 3).
3. The end of the document is one past the final newline, on the last token: rule 2's form plus one.
   A text offset one past its string's end is therefore legitimate — it is the document end — and
   the comment-insertion guard brings it onto the text's end (`withDocumentEndOnText`) rather than
   treating it as a contract violation.
4. A root point between two blocks is the start of the next block.

The editor still accepts the older container-and-index shapes from a host. The full rule set, with
the one shape that has no distinct answer (an `optbreak` ending a line), is on the location model
(`usj-reader-writer.model.ts`) and in the editor repo's invariants. Rationale:
`adr-usj-locations-have-one-spelling` in [`Architecture-Decisions.md`](Architecture-Decisions.md).

**`ContentJsonPath` and `PropertyJsonPath` must be widened in lock-step across both repos.**
`platform-bible-utils` (`src/scripture/usj-reader-writer.model.ts`) and the editor's
`@eten-tech-foundation/scripture-utilities`
(`packages/utilities/src/converters/usj/usj-document-location.model.ts` in the `scripture-editors`
repo) each declare their own copy, and core assigns its copy into the editor's typed `EditorRef`
API. Both repos carry a compile-time depth test, so changing CORE's copy alone goes red in core's
own `npm run typecheck` immediately: narrowing it fails the eight-clause assignment, and widening it
turns the nine-clause `@ts-expect-error` into an unused-directive error. What nothing catches is
widening the EDITOR's copy alone — core's narrower type stays assignable into the wider one, so the
cross-repo assignment keeps type-checking and the two silently drift until core is widened to match.
Keep the two declarations, and their depth tests, mirrored.

Rationale and history: `adr-editor-positions-are-settled-coordinates` in
[`Architecture-Decisions.md`](Architecture-Decisions.md).
