# Footnotes pane editing in Standard view (PT-4189) — design

Date: 2026-09-10. Status: approved for implementation by the requester's "make a plan, then
execute" instruction; assumptions are called out inline and in §9.

## 1. Goal

In Standard view (Power mode only), footnotes are edited the way Paratext 9 edits them: in the
footnotes pane, in place, never in a popover. Clicking a footnote caller opens the pane (if hidden)
and turns that note's row into an editor; clicking a row in the pane opens the row editor, scrolls
the text to the caller, and marks the caller with PT9's thin top-and-bottom border. Read-only
resources get the navigation half of all of this (scroll + highlight both ways) with no editor.

Two changes apply to every view and both interface modes:

- An X button in the top-right corner of the footnotes pane hides it.
- The "Auto-show footnote pane" menu item, its persisted choice, and the per-chapter
  auto-show/auto-hide behavior are removed. PT9 has no auto-hide; the pane hides manually only.

Nothing else changes for Simple mode or for the formatted view: the popover stays their editing
surface.

## 2. Behavior matrix

`mode` is `platform.interfaceMode`; Standard view exists only in Power mode.

| Event | Standard (Power), editable | Standard (Power), read-only | Formatted, Power | Formatted / Simple |
| --- | --- | --- | --- | --- |
| Caller click, pane hidden | show pane; select row; open row editor, caret at end | show pane; select row; scroll row into view | show pane; select row; open popover (unchanged) | open popover; pane untouched (unchanged) |
| Caller click, pane shown | select row; open row editor, caret at end | select row | select row; open popover | select row; open popover |
| Pane row click | open row editor with caret where clicked; scroll text to caller; highlight caller | select row; scroll text to caller; highlight caller | move text caret to the note (unchanged: `selectNote`) | same as Formatted, Power |
| Pane row selection changes (any cause) | highlight caller in text | highlight caller in text | no highlight (unchanged) | no highlight |
| Insert footnote / cross-reference | show pane; open row editor on the new note, caret at end | n/a | open popover (unchanged) | open popover (unchanged) |
| Pane X button / "Show footnotes" toggle | hide pane; end any row edit (flushes pending edits) | hide pane | hide pane | hide pane |
| Chapter change | end row edit; clear selection | clear selection | close popover (unchanged) | unchanged |

"Select row" means the pane highlights the row and scrolls it into view (existing focus-request
mechanism).

## 3. Architecture

### 3.1 Where things live

- **scripture-editors** (`@eten-tech-foundation/platform-editor`): two additive `EditorRef`
  methods. No behavior change for existing consumers.
  - `getNoteIndex(noteKey: string): number | undefined` — the document-order index the notes
    pane addresses notes by (same coordinate `noteCallerOnClick`'s `getNoteIndex` reports).
  - `highlightNote(noteKeyOrIndex: string | number | undefined): void` — applies the existing
    `.caller_highlight` class (PT9's selected-caller border, already in `usj-nodes.css` and in
    core's `_usj-nodes.scss` copy) to that note's caller element; `undefined` clears it. Backed by
    a small plugin that re-applies after every editor commit so DOM re-creation (collapse toggle,
    `replaceEmbedUpdate` re-key) never loses it, and clears when the note leaves the document.
- **platform-bible-react**: PR 2655's components as merged onto main (inline `FootnoteEditor`,
  `FootnoteList` row-swap seam). No further library change is planned.
- **platform-scripture-editor extension**: all wiring. The web view owns the note-editing
  session; `FootnotesLayout` stays a layout/pass-through component and gains a header with the X.

### 3.2 Data flow (Standard view)

```
caller click ──► noteCallerOnClick ──► decideNoteCallerClickAction (pure) ──┐
pane row click ─► FootnotesLayout.onFootnoteEditRequested ─────────────────┤
insert note ────► handleEditorialUsjChange (insertedNodeKey) ──────────────┤
                                                                            ▼
                                             web view: startPaneNoteEdit({ index, noteKey, noteOps, caret })
                                                │ setFootnotesPaneVisible(true) when hidden
                                                │ setFootnotePaneFocusRequest({ index })
                                                │ setPaneEditingIndex(index); editingNoteKey/Ops refs
                                                ▼
FootnotesLayout ──props──► FootnoteList editingFootnoteIndex + renderEditingFootnote
                                                ▼
                        <FootnoteEditor inline parentEditorRef=editorRef …>  ──live-apply──► main editor
                                                                                    (replaceEmbedUpdate → onUsjChange
                                                                                     re-keys editingNoteKey, updates pane USJ)
```

Selection → text: `FootnotesLayout` reports `onSelectedFootnoteChange(index | undefined)`; in
Standard view the web view calls `editorRef.highlightNote(index)` and, for row clicks,
`scrollToNoteCaller(index)` (a DOM helper in `editor-dom.util.ts`, cloned from
`scrollToAnnotation`). Formatted view keeps today's `selectNote(index)` path.

### 3.3 One document for both indexes (absorbs PT-4478)

The pane currently lists notes from `usjFromPdp` (last saved) while the editor's `getNoteIndex`
counts its live content; inside the save debounce window they disagree. The pane now renders from
`editorUsj ?? usjFromPdp`, where `editorUsj` is state set from every `onUsjChange` and from every
external load (`setEditorUsj`). Both sides then index the same document. `footnotesPaneRendered`
keeps its `usjFromPdp` gate.

### 3.4 Editing session state (web view)

Reuse the existing session refs (`editingNoteKey`, `editingNoteOps`, `editingNoteIsNew`,
`editingNoteSessionRefreshedAt`) — they mean "the note being edited" regardless of surface. Add:

- `paneEditingIndex: number | undefined` (state) + `paneEditingCaret: FootnoteCaretPosition`.
- The surface is exclusive: `showFootnoteEditor` (popover) and `paneEditingIndex` (pane) are never
  both set. A pure helper `resolveNoteEditingSurface({ viewType, isReadOnly })` →
  `'pane' | 'popover' | 'none'` decides, and is the single place the Standard-view rule lives.

Every existing site that clears `editingNoteKey` (close, chapter change, note deleted, stale-session
reaper) also clears `paneEditingIndex`. Additional pane-only ends: pane hidden, view leaves
Standard, editability lost, the document is reloaded in place (an external PDP update applied
through `setEditorUsj`, which regenerates every Lexical key including the note the row editor is
bound to).

The inline editor has no Save/Cancel; edits apply live (debounced) and flush on unmount. A newly
inserted note is never discarded on session end (PT9 keeps the inserted `\f + \fr … \ft ` note).

### 3.5 Caller click handler is stable and reads refs

`noteCallerOnClick` is baked into caller nodes at load time, so the handler is registered
unconditionally (also in read-only) and reads every gate from refs: `isReadOnlyEffectiveRef`,
`viewTypeRef`, `isPowerModeRef`, pane visibility/rendered refs. `decideNoteCallerClickAction`
gains inputs `{ surface: 'pane' | 'popover' | 'none', isPowerMode, isStandardView }` (replacing
`isAutoShowEnabled`) and returns `action: 'ignore-expanded' | 'ignore-popover-open' |
'ignore-read-only' | 'open-popover' | 'open-pane-editor' | 'navigate-only'`, with `showPane =
isPowerMode && !paneVisible` and `sendPaneFocusRequest = paneRendered || showPane`.
`navigate-only` is Standard view's read-only behavior; a read-only text in any other view resolves
to `ignore-read-only` and its caller stays inert, as it was before the pane became an editing
surface.

### 3.6 Footnotes pane header

`FootnotesLayout` renders a slim row above the list containing only an icon button (lucide `X`,
ghost variant) aligned to the end, `aria-label` from a new localized key
`%webView_footnoteList_close%` ("Close footnotes pane"). It calls a new `onClose` prop; the web
view sets `footnotesPaneVisible` to `false` and focuses the main editor, as PT9's close button does
(`CollapsibleMultipaneControl.cs:254-275`: a 14×14 flat button anchored top-right, then
`mainPane.Focus()`). No title (the title header was removed by team decision in Dec 2025).

### 3.8 PT9 evidence the behavior matrix rests on

- Caller click always shows the pane and puts the caret at the end of the note text, with no
  editability guard, so resources get it too (`CallerClickedEditHandler.cs:97-132`).
- Inserting a note lands the caret after `\ft ` inside the note, which routes the caret into the
  pane and expands it (`UsfmSnippetInserter.cs:74-81`, `UsfmPaneSynchronizer.cs:187-222`).
- The pane never auto-hides; F7 / "Show footnotes" and the X are the only closes.
- `.caller_highlight` is applied to the caller when the pane's caret is inside a note
  (`CallerHighlighter.cs:33-124`, CSS in `ScriptureBase.css:60-65`).
- PT9 scrolls the main text only to the note's verse on a pane click; scrolling to the caller itself
  is a deliberate PT10 improvement the ticket asks for.

### 3.7 Removal of auto-show

Delete the menu item, both localized strings, the `toggleFootnotesAutoShow` command/controller
method/message/type declarations, the `footnotesAutoShow` web-view state and refs, the
`chapterHasNotes` memo and auto-visibility effect, `resolveFootnotesPaneAutoVisibility` and its
tests, `footnotesManualOverrideChapterRef`, and the `isAutoShowEnabled` input of
`decideNoteCallerClickAction`. Persisted `footnotesAutoShow` web-view state from older sessions is
simply ignored.

## 4. Error handling

- A caller click whose note is already gone (`getNoteIndex()` undefined) logs a warning and does
  nothing (existing behavior).
- A pane edit request whose ops cannot be read (`getNoteOps(index)` empty or not a note embed)
  logs and falls back to selection only.
- `highlightNote` on a missing note clears the highlight and does not throw.
- Pane USJ parse failure keeps today's truncated warning and leaves the previous list.

## 5. Testing

Red → green per task. Unit and component tests only; hand QA in the running app is a final step.

- scripture-editors: `getNoteIndex` (key → index; unknown key → undefined; index shifts after
  deleting an earlier note); `highlightNote` (class applied to the caller element; switching notes
  moves it; `undefined` clears; survives a `replaceEmbedUpdate` re-key; clears when the note is
  removed).
- extension pure helpers: `resolveNoteEditingSurface`; `decideNoteCallerClickAction` new matrix
  (Standard editable / read-only, formatted Power / Simple, pane shown / hidden / rendered);
  `scrollToNoteCaller` (jsdom: scrolls the container when the caller is out of view, no-op when
  visible, no-op when absent).
- `FootnotesLayout` component test (new file): X button calls `onClose` and is labeled; edit
  request passes through with caret; `onSelectedFootnoteChange` fires on row click and on
  `focusRequest`; editing row renders the supplied editor.
- Web view has no component harness; its logic is pushed into the pure helpers above.
- Auto-show tests deleted with the feature; `localized-strings.test.ts` updated if it enumerates
  keys.
- Regression: PBR footnote suites, platform-enhanced-resources (other `FootnoteList` consumer),
  extension suite, repo typecheck + lint.

## 6. Hidden-view rule

The pane and the editor live in the same web view iframe, so tab visibility affects both
identically; there is no cross-view sync here. The one geometry-driven effect,
`scrollToNoteCaller`, runs on a user click, which cannot happen while hidden.

## 7. Out of scope

- Marker attributes in pane rows (PT-4322).
- Enter-in-pane `\fp` semantics beyond what the inline `FootnoteEditor` already does.
- Making `FootnoteList`'s hardcoded `aria-label="Footnotes"` localizable.

## 8. Delivery

- scripture-editors branch `pt-4189-footnote-pane-editing` off `main`, PR to `main`.
- paranext-core branch `pt-4189-footnote-pane-editing` off `main`, built on PR 2655's branch
  (merged with main first), PR to `main`. Core CI needs the editor change on `platform-yalc` (or
  published) before typecheck passes; flagged in the final report.

## 9. Assumptions made without the requester

1. Formatted view in Power mode keeps showing the pane on a caller click (today's interim behavior,
   and the ticket's "clicking a footnote in Power should open the footnotes pane").
2. Insertion in formatted view keeps the popover; only Standard routes new notes to the pane.
3. The pane header has no title, only the X.
4. PT-4478 is absorbed via the live-USJ data source rather than a separate ticket.
5. The editor-side API is added rather than emulated with DOM class hacks in the host.
