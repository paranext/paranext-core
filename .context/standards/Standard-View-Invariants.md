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
forwarding table for all three consumers: the scripture editor web view, the footnote editor
component (any host that runs it in editable marker mode), and the footnotes pane's inline row
editor (a pane-model view — Standard view, or Simple's Formatted view, which gives the pane
Standard's view options; Power's Preview is a pane-model view too, but read-only, so it opens no row
editor; see `usesPaneNoteModel` and `resolveNoteEditingSurface` in
`extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts`). The
per-consumer copies drifted once already; there is one table now.

**All three session kinds obey the same rules.** Two palettes that look alike must not behave
differently — a user should not have to know which one is open to predict what a key does. Paratext
9 works this way (`MarkerDropdownControl.cs` KeyDown/KeyPress), and these are its rules. The kinds
differ only in which markers they list and in how a HIGHLIGHTED item is applied: `'enter'` splits
the paragraph with it, `'backslash'` retags or lands at the caret, `'selection'` wraps the selected
text.

| Key                                                              | Behaviour                                                                                                                                       |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `a`–`z`, `A`–`Z`, `0`–`9`, `+`, `-`                              | narrows the filter. The TYPED character wins; the physical key is the fallback when it cannot name a marker (§3.1)                               |
| Backspace                                                        | widens the filter; with nothing typed, CLOSES the palette                                                                                       |
| ArrowUp / ArrowDown                                              | moves the highlight                                                                                                                             |
| Enter / Tab, unmodified or with Shift                            | commits the highlighted item; with 0 matches, a claimed no-op and the palette stays open (P9 parity)                                             |
| Space                                                            | commits the marker literally TYPED; with nothing typed, closes and inserts nothing. Over a selection: wraps on an EXACT match, else refuses visibly with the selection intact |
| `*`                                                              | commits the typed marker's CLOSING form, no terminating space. Over a selection: replaces it — except with nothing typed, where it closes and leaves the selection intact |
| `\`                                                              | commits what was typed with no terminating space, then reopens a fresh palette, so `\qt-s\qt-e` is one flow; with nothing typed, ignored. Not a commit key over a selection — the wrap consumes it |
| Escape                                                           | closes the palette, document untouched                                                                                                          |
| Ctrl/Cmd/Alt chord (never AltGr)                                 | CLOSES the palette. The table does not claim it, but with focus in the palette it does not reach the editor either — Ctrl+Z/B do nothing there. Chord+Enter IS claimed on the way out, or the list would act on it |
| modifier and lock keys (Shift, CapsLock, …)                      | passed through: they are how a marker gets typed                                                                                                |
| everything else — punctuation, accented Latin, non-Latin scripts, `Dead`, Delete, Left/Right/Home/End/PageUp/PageDown | IGNORED: claimed, so nothing reaches the text, and the palette stays open (P9's `IsMarkerCharacter`) |

Space on a typed NOTE marker is the one exception: it commits THAT marker when the list offers it,
and inserts nothing when it does not, because `\f ` left to materialize would tokenize into the full
note and absorb the following word as its caller. An unknown marker settles as typed at a caret, and
cannot be committed from the list.

### 3.1 Letters and digits come from the typed character, with the physical key as fallback

USFM marker names are always basic Latin; the translator's keyboard may not be. So the character the
layout produced wins whenever it can name a marker, and the PHYSICAL key is the fallback only when
it cannot: on a Cyrillic or Greek layout the `q` key produces `й` or `;`, and `keyCode` 65–90 turns
that back into `q`.

Reading `keyCode` first does not work, because several layouts put marker characters on keys whose
`keyCode` says otherwise: AZERTY keeps VK_0–VK_9 on the number row while producing `&é"'(-è_çà`
unshifted, so its `-` key reports 54 and every milestone marker (`qt-s`, `ts-s`) became `qt6`; Czech
QWERTZ puts `+` unshifted on Digit1, which became `1` and made the `\+w` nesting prefix untypeable.

Digits need no fallback — every layout that reaches a digit produces the digit character, numpad and
shifted number row included. Packet-key input (Keyman, `keyCode` 231) is covered for free: such a key
carries its character and no usable `keyCode`. Case is preserved for custom markers, from
`event.key` in both paths.

**Option is a typing modifier on macOS, not a chord modifier.** `Option+e` begins `é`, `Option+n`
begins `ñ`, `Option+a` types `å` outright — the role AltGr holds on Windows and Linux, which the
chord rule already excluded. Counting any `altKey` as a chord closed the palette the instant a Mac
user reached for an accent, because a dead key arrives with `altKey` set. Ctrl+Option and Cmd+Option
are still chords: the command modifier is what decides.

**What the palette OFFERS is the editor's to decide, not the host's.** Both Standard-view palettes
are built from the engine: `EditorRef.getMarkerMenuContext()` describes the caret, and
`getMarkerMenuItems` / `getEnterMenuItems` turn that into the list
(`platform-scripture-editor.web-view.tsx`). The host renders the list and forwards the pick to
`applyMarkerMenuSelection` / `splitParagraphWithMarker` — it must not filter the list or assemble
its own for a region, because the engine is what knows which markers the caret's block can take. Two
consequences worth knowing here:

- **`generateInlineMarkerMenuListItems` is a different menu.** It builds from the `usfmMarkers` map
  in `platform-bible-utils` and serves the OTHER view types. Its result is computed in EVERY view
  (the `inlineMarkerMenuItems` memo in `platform-scripture-editor.web-view.tsx` carries no
  `viewType` guard) but only ever OPENED outside Standard view (`viewType !== 'standard'`). A
  Standard-view palette question is never answered by that function.
- **Everything offered must be insertable, and the `\` only commits to the document through a
  palette that opened.** With nothing to offer, the `\` is an ordinary character and lands. The
  editor half owns the rule that no offered entry is a silent no-op — see "A menu offers nothing it
  cannot insert" in `docs/standard-view-invariants.md` (`scripture-editors`), which also covers the
  `\id` line, where `\` offers the inline list and the Enter palette's paragraph pick splits the
  line instead of retagging it. In a book with no chapters that list also offers `\c`, which the
  host must not filter out: it is the only way to start chapter 1 in Standard view.

**The editor's right-click menu outranks both palettes, and the hand-off rests on listener order
across the two repos.** While `ContextMenuPlugin`'s menu is open it is the only keyboard mode on
screen: the `\` trigger is claimed and does nothing, the Enter trigger stands down so the menu gets
the press, and the insert shortcuts are swallowed. `isEditorContextMenuOpen` in
`platform-scripture-editor.web-view.utils.ts` is the gate, and it depends on two facts owned by the
editor package:

- **The menu claims its keys from a capture-phase listener on the iframe's `document`, and this web
  view claims its own from one on `window`.** Capture runs window → document, so the web view always
  sees a key first, and handing Enter down means returning *without* `stopPropagation` — a
  `stopPropagation` there ends the press before the menu's listener runs. Were the menu's listener
  ever moved onto `window` too, the two would run in registration order, and neither side could
  count on seeing a key first.
- **The menu is found by the FOCUSED editor's `aria-controls="editor-context-menu"` attribute**,
  which the editor package sets on that editor's own root for exactly as long as its menu stays
  open (`isEditorContextMenuOpenFor` in `editor-context-menu.util.ts` reads it). Only
  scripture-editors#14 sets it — an earlier `platform-editor` build never marks the root, so every
  gate keyed on `isEditorContextMenuOpen` silently evaluates "menu closed" against it, all at once:
  the `\` trigger, the Enter hand-down, and the insert-shortcut swallow all fall through together,
  with no local signal that anything broke. `footnote-editor.context-menu-gate.test.tsx` and
  `editor-context-menu-merge-order-contract.test.tsx` both mount the real editor rather than a mock,
  so they exercise the actual attribute instead of assuming its shape.

Every keyboard handler change here must also update `src/shared/data/keyboard-shortcuts.data.ts` — see
`.claude/rules/keyboard-shortcuts-catalog.md`.

### 3.2 Nothing lands because the palette holds focus

**Non-basic-Latin input is ignored, like every other key that cannot name a marker** (product
ruling; P9 does the same). The table cannot stop a composed character on its own — measured in this
Electron build, `beforeinput` for `insertCompositionText` is not cancelable and `compositionstart`
accepts `preventDefault()` and composes regardless.

So the palette takes real keyboard focus, on its LIST rather than a text box (the overlay's
`focusTarget: 'list'`), and forwards every key it receives back to the table. Focusing something
that cannot be edited is what keeps composition out: an IME or dead key begins composing in any
focused input whatever a handler cancels, and once a composition is under way per-key rules no
longer apply to it. With the list focused no composition starts, so a dead key arrives as an
ordinary keydown and the ignore rule covers it.

**The editor stays fully editable for the life of a session.** It does not show a caret while a
palette is open — the palette holds focus — but the caret it had is captured on focus-out and
restored on every way the session ends, so the user lands back where they were. An earlier design
made the content element non-editable instead; that worked, but it blurred the editor, so keys
landed on the page body, the caret was lost for good, focus did not come back after a `\` palette
closed, and the popover and the footnote pane each needed their own copy. Routing is now simply
"the editor has focus", in both consumers.

**The editor's own settles are suspended while a palette is open.** Three clocks would otherwise
close one: the blur settle as focus moves to the palette, the idle settle a second later, and the
caret-departure settle on any commit at all. A settle commits dirty nodes, Lexical re-asserts the
DOM selection on such a commit and focuses the editor root when focus has left it, and the renderer
then dismisses the palette on the window blur that follows. It was reproducible as `\`, `nd`, `\`,
wait: the reopened palette closed by itself, on Windows and macOS alike.

`EditorRef.setMarkerSettleSuspended` holds all three for the life of a session. The session writers
are the only thing that calls it — suspend synchronously as a session is set, before focus moves,
because the blur settle fires on the focus move itself; resume when none is left. Settling before
the palette opens was considered and does not work: `commitPendingMarkerEdits` deliberately skips
the node under a live caret, which is exactly where the pending edit is at trigger time, so it
cannot settle the one node that matters while it can force-settle unrelated nodes and push a history
entry nobody asked for.

**The one accepted gap:** the session is created synchronously in the trigger's keydown, and for a
short window before the palette has focus the editor still does. Keys in that window are routed to
the same table by each consumer's capture-phase listener, but a COMPOSITION begun there cannot be
forwarded — so the consumer closes the palette on `compositionstart` and lets the composed text land
as ordinary typing. One shared hook does this for both consumers.

**Known gap — `paste`, `cut` and `drop` are not blocked.** Nothing cancels them while a palette is
open. Once the palette holds focus a paste goes to the palette, so the
common case is covered by focus alone — but these events need neither a keydown nor focus: a drop
is dispatched at the element under the pointer, and a context-menu or middle-click paste carries no
keydown at all. So during the pre-focus window, or from the mouse at any time, content can still
reach the text while a palette is open. The change guard (§3.3) is what answers this: the content
change closes the palette and refuses the commit, so the dropped text is the user's own edit rather
than a marker landing somewhere they never chose. The drop itself still lands; the guard answers
for the commit, not for the content.

If the editor turns read-only mid-session (an automatic Send/Receive), the web view ends the
session — including palettes it opened for the footnote popover's editor — because the editor's
commit methods throw in read-only mode.

### 3.3 Nothing may change the editor under an open palette

A commit applies AT THE CARET. If the content or the caret moves while a palette is open, applying
would put the marker somewhere the user never chose, and the caret restored from the focus-out
capture would address content that no longer exists. So a changed editor ends the session instead
of committing into it.

The baseline is taken when focus LEAVES the editor for the palette — the last moment the caret is
still readable, since Lexical's blur processing nulls the editor-state selection just after. Both
consumers already capture there for the same reason, so the guard rides along with that listener.

Two deliberate non-changes: a **missing** caret is not a move (that is the normal state while a
palette holds focus), and a missing baseline or sample never blocks — a guard that fires when it
cannot see would break the ordinary commit path, which is worse than not guarding. The comparison
is against actual content and the actual caret, never Lexical's dirty-node markers: the root is
marked dirty on every commit, so those report a change for every palette that applies anything.

It acts twice in the MAIN editor. That editor's change callback closes the palette at the moment of
the change, because a palette floating over text it no longer describes is confusing and refusing
later just looks like nothing happening. The refusal then covers a change arriving between the
user's choice and the commit. This is also what covers `paste`, `cut` and `drop`: they are no longer
blocked, so instead the content change they cause closes the palette.

The refusal itself is asked on BOTH commit routes, which is what makes it the backstop:

- a HIGHLIGHTED commit (Enter, Tab, click) comes back through the overlay into the session spine,
  which asks before applying;
- a TYPED commit (Space on the typed marker, `*`, the `\` commit-and-reopen, and the selection-wrap
  Space) applies straight from the key router, which asks the same function before each one.

**Known gap:** the footnote popover has no live close — nothing there closes its palette when the
note changes. It therefore relies entirely on the refusal, which is what protects the data: a note
that changes under an open palette (a mouse drop, say) refuses the next commit rather than applying
it at a caret pointing into different content. Closing at change time there is still worth adding.

### 3.4 Every way a session ends restores the caret

A mouse click on the palette blurs the editor (the overlay renders outside its document) and
Lexical's blur processing can NULL the editor-state selection; `focus()` then falls back to
selecting the document END. So dismissals restore the caret from the focus-out capture exactly as
commits do, before focusing. It is a no-op when the selection survived.

A selected paragraph marker counts as a surviving selection. It has no text range, so
`getSelection()` reports nothing, but the capture is a caret the user has since left: restoring it
would send a paragraph retag (or any other apply) to whichever paragraph that caret was in. So:

- `useMarkerPaletteFocusOutCapture` (`lib/platform-bible-react`) clears the capture when focus
  leaves while a marker is selected, instead of keeping the older caret;
- every restore — `restoreSelectionIfLost` in the editor web view's utils, and the footnote
  editor's own copy — returns early when `getSelectedParaMarker()` reports a marker.

The editor's `getSelectedParaMarker()` reports nothing while the editor is read-only, so neither
check sees a marker selected then.

## 4. The footnote editor

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
  keeps the caret out, and it narrows a selection that reaches into the shell (a double-click on
  the caller, select-all) to the note's content, so typing over it cannot remove the shell either;
  the `scripture-editors` invariants carry the full rule. A `\cat` category run
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
- **A click on a pane row lands the row editor's caret on the same character — markers included.**
  `getCaretPositionFromClick` and `EditorRef.selectNoteTextOffset` walk the same sequence: content
  text counted as an offset, and a run's marker glyphs (`\ft`, `\ft*`, `\+nd`, unmatched markers,
  and `\cat`/`\cat*` in the category field) addressed by their order among the glyphs at that
  offset. Both skip the note's own marker, caller and closing marker, every NBSP separator, and
  attribute text. A change to what `FootnoteItem` renders as a `.marker` (or to what the editor
  renders as a glyph) has to change the other side too, or clicks land off by the difference.
- **In a pane-model view (Standard view, or Simple's Formatted view, where the pane and its row
  editor get Standard's view options), the same component runs `inline` inside the footnotes pane
  — there is no popover.** The note-shell, caret-guard, and `updateCaller` invariants above apply
  unchanged. Its live-apply re-keys the note in the parent editor, so the host must re-sync its
  session key from `onUsjChange`'s `insertedNodeKey`, and must not hand the mounted editor a new
  `noteOps` identity for its own live-apply — that reloads the editor mid-typing. An unclosed note
  (the one kind the text shows the content of) is edited in place in the text as well, as PT9 does,
  and the row editor is not opened on one typed or pasted there; see
  `adr-footnote-unclosed-note-edited-in-place`.
- **The caller and note-type changes rebuild the note from `getNoteOps`, which reads the live tree
  unsettled.** Both must settle pending marker edits (`commitPendingMarkerEdits`, skipped while a
  marker-palette session is open) before reading — the same rule `closeAndSave` and
  `flushPendingEdits` follow, for the same reason: a mid-rename marker still under the caret would
  otherwise be read and saved as its stale pre-rename literal.

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

These rules follow from that one language, and a host has to get every one of them right:

**Every public editor position is a SETTLED coordinate.** `getSelection`, `onSelectionChange`,
`setSelection`, `setAnnotation` and `insertNote` all address the document `getUsj()` returns, never
the live Lexical tree — the editor does the live↔settled translation once, at its own API boundary.
So a host may resolve a jsonPath it received from the editor against the USJ it already holds. Not
every location is text: a property, closing-marker or attribute location (an empty `\b`'s
`['marker']`, a line-final verse's `['number']`) is a legitimate caret, so check
`UsjReaderWriter.isUsjDocumentLocationForTextContent` before resolving a location as text. A TEXT
path that fails to resolve, or a text offset past the end of its string, is a bug or a race, not an
expected state — except one past the end of the document's last text, which is the document end
(rule 3 below). Keep those host-side checks as fail-safes, log them, and do not write code that
compensates for an expected divergence — there isn't one.

One report is the exception: an update that creates the document's FIRST pending edit and moves the
selection within itself sends that one `onSelectionChange` report in live coordinates, immediately
followed by a settled one. So a host that needs a position it can resolve against `getUsj()` at
that moment calls `getSelection()` (which always answers settled) rather than reusing a cached
`onSelectionChange` report — `insertCommentAtCurrentSelection` does.

**An annotation may cover display bytes, and the host keeps its anchor.** `setAnnotation` accepts
a range over a marker glyph, a verse or chapter number, a note caller, or an attribute value
(`['lemma'] propertyOffset …`); the editor holds it on those bytes and never changes the document
for it. An annotation holds exactly the bytes its range names; a range into part of a char span,
note or figure holds only that part — the text is marked piece by piece, and the span's own marker
glyphs the range passes over without covering the span whole hold the annotation as display bytes
instead. `getUsj()` never carries it, and `setUsj` drops every annotation, so the host re-applies
from its own anchors — `annotationInfoByIdRef` in `platform-scripture-editor.web-view.tsx` keeps
each range.

**An annotation paints exactly what it holds, so find it by its ranges, never its class.** A display
byte held in full gets the same CSS classes as a `<mark>`, plus `display-annotation`; one held only
in part is painted with a CSS Custom Highlight that the editor styles from the host's own class
rules — `background-color`, `color`, `text-decoration` and `text-shadow` carry over and a bottom
border becomes an underline, while every other property and `:hover` apply only to bytes painted as
elements. Whitespace between two held bytes in one block is painted; whitespace at the edges never
is, and bytes the view does not display paint nothing. So no element carries `annotationId-<id>`
where a highlight paints: measure, scroll to or hit-test an annotation with
`EditorRef.getAnnotationRanges(type, id)`, as `editor-dom.util.ts` does. CSS keyed on the class
keeps working. An annotation inside a collapsed note's content — its undisplayed `\cat` included —
is not shown and never paints the caller, as in Paratext 9; it reappears when the note is expanded
and still reports its removal. Rationale: `adr-editor-annotations-paint-exactly` and
`adr-editor-collapsed-note-hides-its-annotations` in
[`Architecture-Decisions.md`](Architecture-Decisions.md).

`onRemove`: each `<mark>` reports its own removal when it goes away — one call per `<mark>`, whatever
else still holds the annotation — and only once; a `<mark>` an undo brings back stays quiet when it
goes again. Beyond that, the annotation's last holder — a `<mark>` or a display byte — leaving the
document without any `<mark>` having reported the annotation's removal since it was set fires ONE
more report through its display bytes: `"removed"` when `removeAnnotation` or setting the same id
again takes it away, `"destroyed"` when it drops out of the document (an edit, a collaborator's
edit, or a settle that discards those bytes). An annotation split across several carriers that all
leave in the same edit reports their text joined in document order; carriers lost across separate
edits report only the text of the piece(s) still present at the last one. A collapsed note caller's
text is reported as the note's caller. Undo, redo, and a `setUsj` reload report nothing; setting the
id again starts a fresh reporting cycle. An `onRemove` that throws while the editor reports a
`"destroyed"` after an edit does not stop that edit or the other reports: the error is handed to the
editor's error handler, which rethrows it, in a microtask once the edit has been committed.

**A position names the byte in front of which it sits, and snaps LEFT in BOTH directions.** It maps
through whatever contains that byte on its own side; where one side has bytes the other lacks, the
position in front of them snaps to the nearest byte both sides share, and the position just past
them is exact. There is no separate outbound-snap/inbound-refuse split — one aligner serves both
directions, each end of a range resolved on its own. Outbound: `getSelection` and `onSelectionChange`
answer `undefined` only when there is no selection, never because a position could not be
translated — every real caret has a location. While an edit is
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

**`getUsj()` while an edit is pending equals the document after it settles.** A host never has to
wait for a settle to read the document. A char opener renamed while pending (`\w grace\w*` typed to
`\wx grace\w*`) renames its closer too — on screen, in `getUsj()`, and once settled. The editor
repo holds this, the screen equal to the saved file byte for byte, and every pending caret position
exact (or the closest one to its left), with an oracle generated from single keystrokes. Rationale:
`adr-editor-opener-rename-renames-closer`.

**`onUsjChange`'s `usj` payload is a SETTLED, synchronous snapshot.** It equals `getUsj()` at the
moment of emission, fires synchronously within the commit's own listener pass, once per commit that
changes the settled document or carries delta ops, in commit order — including once, not twice,
after a `setUsj` reload. A commit that does neither emits nothing, and so does a selection-only
commit or one tagged as an annotation, cursor, or selection change. The block verse layout emits
nothing: it is read-only. `ops` stay a LIVE view of the same commit, so a host that needs both reads
`usj` for content and `ops` for the tree-level change; neither substitutes for the other.

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

The tokenizer folds each `\ca`, `\cp`, `\va`, `\vp` and `\cat` once, in ParatextData's order
(`ParatextData/UsfmParser.cs:320-339`, `:548-576`): after a chapter one `\ca` then one `\cp`, after
a verse one `\va` then one `\vp`, after a note one `\cat`. A later span of the same marker stays
content — `\c 1 \ca 2\ca*\ca 3\ca*` is altnumber `2` followed by a `\ca 3\ca*` char span — so no
typed byte is lost to a second fold overwriting the first.

Recorded as-is, not position defects: `\c 2 made` settles to a chapter followed by a bare root
string `"made"` — ParatextData produces the same USJ from that input. The settle keeps the space
before a typed `\c`, `\tr`, `\esb` or `\esbe` that ParatextData trims on save; positions count only
non-whitespace bytes, so the kept space never moves one.

**A position has one spelling.** Every USFM position has exactly ONE canonical
`UsjDocumentLocation`; `UsjReaderWriter.usfmVerseLocationToUsjDocumentLocation` is the oracle. One
alias is allowed: the end of a text string directly followed by a marker or closer may also be
spelled as that string's `offset` at its length, and the editor reports a caret held at the end of
the text that way (`{ <text>, offset: 16 }` at the end of `In the beginning` before `\f`, where the
oracle says the note's own location). So compare two locations by converting them with
`usjDocumentLocationToUsfmVerseRefVerseLocation`, never by their shape. `offset` means an index into text only, so a caret with no text beside it is never a
container plus a content index and never `$` plus one:

1. A gap in front of a marker object is that marker's location (`{ jsonPath: <item> }`).
2. The character after a token with no other home — the space after a marker name, a line's newline
   — is addressed on that token at its length: text `offset: length`, `['marker']` at
   `propertyOffset: marker.length` (inside an empty `\b`), `['number']` at the number's length (a
   line ending in `\v 1`), `closingMarkerOffset` at the closer's length (a paragraph ending in a
   note is `\f*` at 3). An `optbreak` has no location inside it, so every position from its start
   to the end of its line is its own marker location.
3. The end of the document is one past the final newline, on the last token: rule 2's form plus one.
   A text offset one past its string's end is therefore legitimate on the document's last text
   only — it is the document end — and the comment-insertion guard brings it onto the text's end (`withDocumentEndOnText`) rather than
   treating it as a contract violation.
4. A root point between two blocks is the start of the next block.

The editor still accepts the older container-and-index shapes from a host. The full rule set, with
an example of each tricky position, is on the location model (`UsjDocumentLocation` in
`@eten-tech-foundation/scripture-utilities`, re-exported by `platform-bible-utils`) and in the editor
repo's invariants. Rationale:
`adr-usj-locations-have-one-spelling` in [`Architecture-Decisions.md`](Architecture-Decisions.md).

**The USJ document-location types have one declaration, owned by the editor package.**
`ContentJsonPath`, `PropertyJsonPath`, `UsjDocumentLocation` and its seven member location types are
declared in `@eten-tech-foundation/scripture-utilities`
(`packages/utilities/src/converters/usj/usj-document-location.model.ts` in the `scripture-editors`
repo, with its depth test beside it). `platform-bible-utils` re-exports them from
`src/scripture/usj-reader-writer.model.ts` rather than declaring its own, so core and the editor
always agree on what a location is. Widening `ContentJsonPath` (or changing any of these types)
happens in the editor package; core picks it up when it stages that editor build. The seven member
types are `interface`s, so a location value is not assignable to an index-signature type such as
`Record<string, unknown>`. `PropertyJsonPath` has a catch-all `` `$.${string}` `` member, so its
depth members document shapes rather than bound them. Rationale:
`adr-usj-location-types-come-from-scripture-utilities` in
[`Architecture-Decisions.md`](Architecture-Decisions.md).

Rationale and history: `adr-editor-positions-are-settled-coordinates` in
[`Architecture-Decisions.md`](Architecture-Decisions.md).
