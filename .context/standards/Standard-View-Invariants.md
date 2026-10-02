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

`lib/platform-bible-react/src/components/advanced/marker-palette-keydown.util.ts` is the single key
table for BOTH the scripture editor web view and the footnote-editor popover. The per-consumer
copies drifted once already; there is one table now.

**All three session kinds obey the same rules.** Two palettes that look alike must not behave
differently — a user should not have to know which one is open to predict what a key does. Paratext
9 works this way (`MarkerDropdownControl.cs` KeyDown/KeyPress), and these are its rules. The kinds
differ only in which markers they list and in how a HIGHLIGHTED item is applied: `'enter'` splits
the paragraph with it, `'backslash'` retags or lands at the caret, `'selection'` wraps the selected
text.

| Key                                                              | Behaviour                                                                                                                                       |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `a`–`z`, `A`–`Z`, `0`–`9`, `+`, `-`                              | narrows the filter. Letters and digits come from the PHYSICAL key (§3.1)                                                                         |
| Backspace                                                        | widens the filter; with nothing typed, CLOSES the palette                                                                                       |
| ArrowUp / ArrowDown                                              | moves the highlight                                                                                                                             |
| Enter / Tab, unmodified or with Shift                            | commits the highlighted item; with 0 matches, a claimed no-op and the palette stays open (P9 parity)                                             |
| Space                                                            | commits the marker literally TYPED; with nothing typed, closes and inserts nothing. Over a selection: wraps on an EXACT match, else refuses visibly with the selection intact |
| `*`                                                              | commits the typed marker's CLOSING form, no terminating space. Over a selection: replaces it — except with nothing typed, where it closes and leaves the selection intact |
| `\`                                                              | commits what was typed with no terminating space, then reopens a fresh palette, so `\qt-s\qt-e` is one flow; with nothing typed, ignored. Not a commit key over a selection — the wrap consumes it |
| Escape                                                           | closes the palette, document untouched                                                                                                          |
| Ctrl/Cmd/Alt chord (never AltGr)                                 | CLOSES the palette and does its normal job. Chord+Enter is still claimed on the way out, or the list would act on it too                         |
| modifier and lock keys (Shift, CapsLock, …)                      | passed through: they are how a marker gets typed                                                                                                |
| everything else — punctuation, accented Latin, non-Latin scripts, `Dead`, Delete, Left/Right/Home/End/PageUp/PageDown | IGNORED: claimed, so nothing reaches the text, and the palette stays open (P9's `IsMarkerCharacter`) |

`\f` specifically commits like Enter on Space, emergently: `\f ` tokenizes to the full note. An
unknown marker settles as typed at a caret, and cannot be committed from the list.

### 3.1 Letters and digits come from the physical key

USFM marker names are always basic Latin; the translator's keyboard may not be. So the character the
layout produced wins whenever it can name a marker, and the PHYSICAL key is the fallback only when
it cannot: on a Cyrillic or Greek layout the `q` key produces `й` or `;`, and `keyCode` 65–90 turns
that back into `q`.

Reading `keyCode` first does not work. It is not portable — Chromium takes it from the native
virtual key, which Windows assigns per layout but macOS and Linux map through a US-layout table, so
the same French AZERTY `a` reported 65 on Windows and 81 on macOS and the key filtered differently
per OS. And several layouts put marker characters where `keyCode` says otherwise: AZERTY keeps
VK_0–VK_9 on the number row while producing `&é"'(-è_çà` unshifted, so its `-` key reports 54 and
every milestone marker (`qt-s`, `ts-s`) became `qt6`; Czech QWERTZ puts `+` unshifted on Digit1.

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
  line instead of retagging it.

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

**The editor stays fully editable and keeps its caret throughout.** An earlier design made the
content element non-editable for the life of a session; that worked, but it blurred the editor, so
keys landed on the page body, the caret was lost, focus did not come back after a `\` palette
closed, and the popover and the footnote pane each needed their own copy. Routing is now simply
"the editor has focus", in both consumers.

**Known gap — the editor's own settles can close a palette.** A pending marker edit settles on
blur, and again one second after the last change. Both fire while a palette is open: the blur
settle as focus moves to the palette, the idle settle a second later. A settle updates the editor,
which moves the selection, which makes Lexical focus the editor root and pull focus out of the
palette — and the renderer then dismisses it on window blur. Reproducible as `\qt-s`, `\`, wait:
the reopened palette closes by itself.

Settling before the palette opens does NOT fix this. `commitPendingMarkerEdits` deliberately skips
the node under a live caret while the editor holds DOM focus, which is exactly where the pending
edit is at trigger time — so it cannot settle the one node that matters, while it can force-settle
unrelated pending nodes and push a history entry the user never asked for. Closing this needs a
pause/resume API on `EditorRef` in `scripture-editors` (setting `markerSettleDelayMs` to `-1` is
not enough: it does not cancel an already-armed timer), which has to land there first.

**The one accepted gap:** the session is created synchronously in the trigger's keydown, and for a
short window before the palette has focus the editor still does. Keys in that window are routed to
the same table by each consumer's capture-phase listener, but a COMPOSITION begun there cannot be
forwarded — so the consumer closes the palette on `compositionstart` and lets the composed text land
as ordinary typing. Both consumers have their own handler for this, because each owns its own
session.

**Known gap — `paste`, `cut` and `drop` are no longer blocked.** The input lock used to cancel them
in document capture, because the editor's own listeners check its editable FLAG rather than the DOM
attribute. Nothing replaces that. Once the palette holds focus a paste goes to the palette, so the
common case is covered by focus alone — but these events need neither a keydown nor focus: a drop
is dispatched at the element under the pointer, and a context-menu or middle-click paste carries no
keydown at all. So during the pre-focus window, or from the mouse at any time, content can still
reach the text while a palette is open. The change guard (§3.3) is what answers this: the content
change closes the palette and refuses the commit, so the dropped text is the user's own edit rather
than a marker landing somewhere they never chose. The drop itself still lands — that is the
remaining difference from the old lock, which cancelled it outright.

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

It acts twice. The editor's change callback closes the palette at the moment of the change, because
a palette floating over text it no longer describes is confusing and refusing later just looks like
nothing happening. The shared spine then refuses the apply as a backstop, which is what covers a
change arriving between the user's choice and the commit. This is also what covers `paste`, `cut`
and `drop`: they are no longer blocked, so instead the content change they cause closes the palette.

### 3.4 Every way a session ends restores the caret

A mouse click on the palette blurs the editor (the overlay renders outside its document) and
Lexical's blur processing can NULL the editor-state selection; `focus()` then falls back to
selecting the document END. So dismissals restore the caret from the focus-out capture exactly as
commits do, before focusing. It is a no-op when the selection survived.

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
