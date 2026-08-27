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
  `lib/platform-bible-react/src/components/z-index.test.ts` pins the ordering.
- **The note's shell is not typeable, and the view option alone does not achieve that.** The popover
  passes `isNoteShellEditable: false`, which renders `\f + ` in Lexical's `token` mode — necessary,
  but on its own that still lets a caret land among those characters, where a keystroke replaces the
  whole node: a lost caller, or a destroyed note. The editor's `NoteShellCaretGuardPlugin` is what
  keeps the caret out; the `scripture-editors` invariants carry the full rule. A `\cat` category run
  typed just after the caller belongs to the note's CONTENT, which is where the guard puts the caret.
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
