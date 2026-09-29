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

**The Enter-split palette (`'enter'` kind) is PASSIVE and fully table-driven.** Its overlay does
not hold browser focus, so the forwarding table owns every key of the session, as it does for
`'backslash'`.

It guards its keys the way `'selection'` does, and for the same reason: it holds something that a
landing key would destroy. The web view claims the Enter and WITHHOLDS the paragraph split until the
palette commits, so a key that reached Lexical would both land in the text and discard the split.
The product ruling is that **only selecting a marker may change the scripture text**, so nothing
lands and nothing dismisses implicitly. "Inert" below means claimed and ignored, with the palette
left open:

| Key                                                                            | Enter-split palette                                                                |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `a`–`z`, `A`–`Z`, `0`–`9`, `+`, `-`                                            | narrows the filter                                                                 |
| Backspace                                                                      | widens the filter; with nothing typed, inert                                       |
| ArrowUp / ArrowDown                                                            | moves the highlight                                                                |
| Enter / Tab, unmodified                                                        | commits the highlighted item; with 0 matches, inert                                |
| Enter / Tab with any modifier (Ctrl, Cmd, Alt or Shift)                        | inert                                                                              |
| Escape                                                                         | closes the palette, document untouched                                             |
| Space, `*`, `\`                                                                | inert — Space does NOT commit here, unlike in the `\` palette                      |
| any other chord (Ctrl/Cmd/Alt + a key, e.g. Cmd+S, Cmd+C)                      | passed through unclaimed; the palette stays open and the chord does its normal job |
| modifier-only, IME composition and dead keys                                   | passed through unclaimed; the palette stays open                                   |
| every other key (punctuation, non-Latin and accented letters, navigation keys) | inert                                                                              |

**Non-basic-Latin input is ignored, like every other non-selection key.** PT9's palette ignores
non-basic-Latin and PT10 matches (product ruling). The table cannot stop a composed character on its
own — measured in this Electron build, `beforeinput` for `insertCompositionText` is not cancelable
and `compositionstart` accepts `preventDefault()` and composes regardless. Instead each editor that
hosts a palette (the web view's main editor and the footnote popover) makes its content element
non-editable for the life of any palette session, so composed input has nowhere to land. With the
element non-editable the browser starts no composition at all, so a dead key arrives as an ordinary
keydown carrying its physical key code rather than 229, and the table passes it through with nothing
to land. The same lock cancels `paste`, `cut` and `drop` into the element, which the editor would
otherwise still apply because it checks its own editable flag rather than the DOM attribute; that is
what keeps a passed-through Cmd+V or Cmd+X from changing the text. Both come from the shared
`createMarkerPaletteInputLock` (`marker-palette-input-lock.util.ts` in `platform-bible-react`).

With the editor blurred by the lock, keys land on the page, so both editors route a session's keys
from the page and from the editor, but never from any other element (a comment box, say). If the
editor turns read-only mid-session (an automatic Send/Receive), the web view ends the session, and
until it does only Escape is routed: the editor's commit methods throw in read-only mode.

Contrast `'backslash'`: an unrelated key dismisses that palette and lands, and Backspace with nothing
typed dismisses it. That is safe there because nothing is pending — the `\` trigger never landed and
no split is withheld — so dismissing discards only the palette itself.

Every keyboard handler change here must also update `src/shared/data/keyboard-shortcuts.data.ts` — see
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
  confirming gesture — the same commit Enter performs. Escape is not a commit: the caller
  dropdown's `onEscapeKeyDown` discards the pending caller. Two consequences worth knowing before
  touching it: the check's indicator is `pointer-events-none`, so a click on it arrives on the ROW,
  and Radix resolves selection on POINTER-UP, so by click time the row already reads as checked —
  whether the click is arming or confirming can only be answered from before the press.
- **A dropdown hands focus to the note only after it changed something.** The note-type and caller
  dropdowns apply a choice by replacing the note, which discards the editor's selection, and the
  user reached the dropdown mid-edit. After a committed change each one claims Radix's
  `onCloseAutoFocus` and calls the popover's `focusNoteText`, which restores a lost selection before
  focusing — a bare `focus()` with no selection resolves to the document end, outside the note's
  text, where typing joins nothing. After a dismissal (Escape, or re-picking the value already
  applied) nothing changed, so Radix's own restore to the trigger stands, as WCAG 2.4.3 asks.
- **The inline markers menu falls back to the enclosing note's marker.** With the caret in a
  character run (`ft`, `xt`, …) the context marker defines no children, so
  `generateInlineMarkerMenuListItems` (`footnote-editor.utils.ts`) builds the menu from the note's
  own marker instead. That marker has to be the live note type, not a fixed one: `xo` belongs to
  `\x` alone, so a note switched to a cross-reference must offer it.
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
