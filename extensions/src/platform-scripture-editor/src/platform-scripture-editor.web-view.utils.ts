/**
 * WEB-VIEW-ONLY utility helpers for the platform-scripture-editor extension.
 *
 * IMPORTANT: this module value-imports `platform-bible-react`, a React component library that calls
 * `forwardRef`/`createContext` at module-eval time. That is fine in the web view (browser iframe,
 * live React), but FATAL in the extension host: `main.js` runs in a sandboxed Node context with no
 * React runtime and a `require` that rejects anything but `@papi/*`-family modules, so the eager
 * `react` import throws during `activate()` and the whole extension fails to activate. The same
 * hazard applies to any RUNTIME VALUE from `@eten-tech-foundation/platform-editor`, whose dist is a
 * single non-splittable bundle carrying the React editor components — import types from it only.
 *
 * Therefore this module must ONLY ever be imported by web-view code (and its tests) — NEVER by
 * `main.ts` or anything `main.ts` reaches. Main-bundle-safe helpers live in
 * `platform-scripture-editor.utils.ts`. `extension-host-import-boundary.test.ts` walks the import
 * graph from `main.ts` and enforces this.
 */

import type { FocusSubject } from '@papi/core';
import { logger } from '@papi/frontend';
import {
  deepEqual,
  isBlockMarker,
  isLocalizeKey,
  LanguageStrings,
  LocalizeKey,
  usfmMarkers,
  type PaletteItem,
} from 'platform-bible-utils';
import type {
  EditorMessageInsertTextualNoteAtSelection,
  ScriptureEditorViewType,
} from 'platform-scripture-editor';
import type { MutableRefObject } from 'react';
import type {
  DeltaOpInsertNoteEmbed,
  EditorRef,
  MarkerMenuItem as EditorMarkerMenuItem,
  SelectionRange,
} from '@eten-tech-foundation/platform-editor';
import { type FootnoteEditorHandle, type MarkerMenuItem } from 'platform-bible-react';
import { markerMenuItemToPaletteItem } from 'platform-bible-react/experimental';
import type { FlushableDebouncer } from './flushable-debouncer.util';
import {
  showsReadOnlyPreview,
  type NoteSessionUpdateDecision,
} from './platform-scripture-editor.utils';
import { EDITOR_OWNERSHIP_WINDOW_MS, type EditorFocusLocation } from './use-editor-pdp-sync.hook';
import { WRITE_GUARD_RELEASE_AFTER_MS } from './write-in-flight-guard.util';

/**
 * Function that generates the inline marker menu items that will update as the cursor location
 * changes. In the future this function will take data from an `.sty` file so that users can define
 * their own markers.
 *
 * @param editorRef The ref for the editor component to be able to insert markers
 * @param closeMarkersMenu Callback to close the markers menu after an action
 * @param localizedStrings The localized strings to use to localize the marker titles
 * @param isStructureProtected Whether the project's paragraph structure is currently protected;
 *   when `true`, block-level markers will be disallowed and their action will call
 *   `notifyStructureProtected` instead of inserting
 * @param notifyStructureProtected Callback to invoke when the user attempts to insert a block-level
 *   marker while structure is protected
 * @param restoreSelection Callback to put back the selection the editor had before this menu took
 *   focus, run just before inserting. The menu focuses its own search input, so without this the
 *   insert can find no selection to act on
 * @param parentMarker The current parent marker which is used to determine which markers to include
 * @param isChapterLoading Reports whether another chapter is loading, during which the editor still
 *   shows the chapter being left and an edit would be dropped. A pick only closes the menu while it
 *   returns `true`. Omitting it never blocks.
 * @returns The list of inline marker menu items
 */
export function generateInlineMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  isStructureProtected: boolean,
  notifyStructureProtected: () => void,
  restoreSelection?: () => void,
  parentMarker?: string,
  isChapterLoading?: () => boolean,
): MarkerMenuItem[] {
  if (!parentMarker) return [];

  const markerDetails = usfmMarkers[parentMarker];
  if (!markerDetails?.children) return [];

  const markerMenuItems: MarkerMenuItem[] = [];
  Object.entries(markerDetails.children).forEach(([, markers]) => {
    markerMenuItems.push(
      ...markers.map((marker): MarkerMenuItem => {
        const isDisallowed = isStructureProtected && isBlockMarker(marker);
        return {
          marker,
          title:
            localizedStrings[usfmMarkers[marker].description] ?? usfmMarkers[marker].description,
          isDisallowed,
          action: () => {
            if (isChapterLoading?.()) {
              closeMarkersMenu();
              return;
            }
            // Defense-in-depth: unreachable while the menu renders `isDisallowed` items as
            // disabled `CommandItem`s (a disabled cmdk item never fires `onSelect`). Kept as a
            // second layer of protection in case that disabled rendering is ever loosened or the
            // menu wiring changes.
            if (isDisallowed) {
              notifyStructureProtected();
              closeMarkersMenu();
              return;
            }
            // This menu focuses its own search input on open, which takes focus off
            // `.editor-input` — and Lexical's blur processing can null the selection `insertMarker`
            // needs, so the insert would land nowhere. Restore it first, as every other
            // marker-apply surface does.
            restoreSelection?.();
            editorRef.current?.insertMarker(marker);
            closeMarkersMenu();
          },
        };
      }),
    );
  });
  return markerMenuItems.sort((a, b) => (a.marker ?? a.title).localeCompare(b.marker ?? b.title));
}

/**
 * Identity of one loaded chapter, for comparing "the chapter then" against "the chapter now" — used
 * by the debounced save's chapter-safety guard to tell whether a pending save still targets the
 * chapter it was scheduled for.
 *
 * Carries every identity field of the chapter-data selector (minus `verseNum`, which never changes
 * which document the subscription delivers): book, chapter number, AND versification. A
 * versification change re-selects the chapter document just as a chapter switch does, so a key
 * without it would let a pending debounced save scheduled under the old versification fire through
 * the NEW versification's save function as a "same chapter" save.
 */
export function getChapterKey(
  book: string,
  chapterNum: number,
  versificationStr: string | undefined,
): string {
  return `${book}|${chapterNum}|${versificationStr ?? ''}`;
}

/**
 * Restores an editor's selection from a focus-out snapshot when the live selection has been lost.
 *
 * A mouse click on a marker-palette overlay (rendered OUTSIDE the editor's document) blurs the
 * editor before the palette commit round-trips, and Lexical's blur processing can null the
 * editor-state selection outright. `focus()` cannot bring a nulled selection back — with nothing
 * remembered it falls back to selecting the document END — so a commit applied after `focus()`
 * alone lands the marker at the end of the document instead of at the caret the user last saw.
 * Restoring the focus-out snapshot BEFORE focusing re-establishes that caret, and `focus()` then
 * re-asserts it, so a mouse commit applies exactly like a keyboard one.
 *
 * A still-live selection is left completely alone, and with no snapshot there is nothing to restore
 * (`focus()` keeps its default behavior).
 *
 * A selected paragraph marker counts as a live selection too. `getSelection()` reports `undefined`
 * for it, because a USJ selection is a text range and cannot represent a selected node, so without
 * asking `getSelectedParaMarker()` this would restore the last caret over it and the paragraph
 * dropdown would retag whichever paragraph that caret was in.
 *
 * @param editor The live editor handle (e.g. `editorRef.current`); no-op when not mounted
 * @param lastFocusOutSelection The selection captured when focus last left the editor (a focusout
 *   listener reads it synchronously, ahead of the blur-path nulling), or `undefined` when none has
 *   been captured
 */
export function restoreSelectionIfLost(
  editor: Pick<EditorRef, 'getSelection' | 'setSelection' | 'getSelectedParaMarker'> | null,
  lastFocusOutSelection: SelectionRange | undefined,
): void {
  // TODO(PT-4905): Other selection consumers (insert comment among them) still read a selected
  // paragraph marker as no selection; this is the only check that accounts for it.
  if (!editor || editor.getSelection() || editor.getSelectedParaMarker()) return;
  if (lastFocusOutSelection) editor.setSelection(lastFocusOutSelection);
}

/**
 * Gives keyboard focus back to an editor without moving its selection. Call it after
 * {@link restoreSelectionIfLost}.
 *
 * The editor's `focus()` re-asserts the selection the editor holds, and with none it selects the
 * end of the document. It also re-reads the browser selection, which the editor's own copy leaves
 * at the end of the document (it copies by selecting a hidden element appended there). So `focus()`
 * is called only when the editor is editable and holds a selection to land on. Otherwise the
 * frame's window is focused instead: that lets keyboard shortcuts such as Ctrl+C reach the tab
 * again and leaves the selection, and the reference it drives, where they are. A read-only editor's
 * text cannot take focus in any case.
 *
 * @param editor The live editor handle (e.g. `editorRef.current`); only the frame is focused when
 *   it is not mounted
 * @param isEditable Whether the editor accepts edits (its `isReadonly` option is `false`)
 * @param frameWindow The window of the frame the editor is in
 */
export function focusEditorKeepingSelection(
  editor: Pick<EditorRef, 'focus' | 'getSelection' | 'getSelectedParaMarker'> | null | undefined,
  isEditable: boolean,
  frameWindow: Pick<Window, 'focus'> = window,
): void {
  if (editor && isEditable && (editor.getSelection() || editor.getSelectedParaMarker())) {
    editor.focus();
    return;
  }
  frameWindow.focus();
}

/**
 * Forgets the caret captured at focus-out while a paragraph marker is the selection, so nothing can
 * later restore that caret over it.
 *
 * The focus-out capture keeps its previous snapshot when there is no readable selection, and a
 * selected marker reads as none (see {@link restoreSelectionIfLost}), so the snapshot is an older
 * caret, possibly in another paragraph. Call this as the paragraph menu opens. If the marker
 * selection is then lost under the open menu (the document is replaced, or the editor becomes
 * read-only), a pick finds nothing to restore and `formatPara` refuses with a logged warning,
 * instead of retagging the paragraph that older caret was in.
 *
 * @param editor The live editor handle (e.g. `editorRef.current`); no-op when not mounted
 * @param lastFocusOutSelectionRef The focus-out snapshot, cleared when a marker is selected
 */
export function forgetCaretSnapshotIfParaMarkerSelected(
  editor: Pick<EditorRef, 'getSelectedParaMarker'> | null,
  lastFocusOutSelectionRef: MutableRefObject<SelectionRange | undefined>,
): void {
  if (editor?.getSelectedParaMarker()) lastFocusOutSelectionRef.current = undefined;
}

/**
 * Hands DOM focus back to the Scripture text, putting the caret back first — unless this web view's
 * document does not have focus.
 *
 * A close can be driven from outside this web view (a chapter change from another view or a global
 * shortcut closes an open popover), and web views share one window: focusing here would pull focus
 * into this editor, and the user's typing would then be saved into this text instead of the one
 * they are typing in. `hasFocus`, not the active element, because the note editor blurs itself as
 * it closes.
 *
 * @param editor The live editor handle; no-op when not mounted
 * @param restoreSelection Puts back the caret the user left in the text
 * @param afterNoteIndex The note to put the caret just past instead of restoring it
 * @param ownerDocument The web view's document
 */
export function returnFocusToScriptureTextIfDocumentFocused(
  editor: Pick<EditorRef, 'selectAfterNote' | 'focus'> | null | undefined,
  restoreSelection: () => void,
  afterNoteIndex?: number,
  ownerDocument: Pick<Document, 'hasFocus'> = document,
): void {
  if (!ownerDocument.hasFocus()) return;
  if (afterNoteIndex === undefined) restoreSelection();
  else editor?.selectAfterNote(afterNoteIndex);
  editor?.focus();
}

/**
 * Lands a footnotes-pane row editor's pending edits in the document, then flushes the debounced
 * save that reads the document — for the paths that must not lose the last few keystrokes (page
 * teardown, and an external replace about to overwrite the document).
 *
 * The order matters: the row's latest keystrokes sit in the row editor's own live-apply debounce,
 * not yet in the document, so a save flushed first would write the document without them. Landing
 * them can itself schedule the save, which is why the save's pending state is read only
 * afterwards.
 *
 * @param rowEditor The open row editor, or `undefined`/`null` when no row session is open
 * @param save The web view's debounced save
 * @returns The flushed save's promise, or `undefined` when no save was pending
 */
export function flushRowEditsThenSave(
  rowEditor: Pick<FootnoteEditorHandle, 'flushPendingEdits'> | null | undefined,
  save: Pick<FlushableDebouncer<unknown[]>, 'isPending' | 'flush'>,
): Promise<void> | undefined {
  rowEditor?.flushPendingEdits();
  if (!save.isPending()) return undefined;
  return save.flush();
}

/**
 * How long, in milliseconds, a note-editing session may sit without any interaction (opening it,
 * editing in it, or applying from it) before the PDP-sync deferral treats it as STALE — abandoned
 * bookkeeping rather than a live session — and stops letting it hold incoming updates at bay.
 *
 * Deliberately the same value as {@link WRITE_GUARD_RELEASE_AFTER_MS}: both bound how long one piece
 * of orphaned state (an unsettled write there, an editing-session key here) may wedge the editor's
 * save/sync pipeline before the pipeline recovers on its own.
 */
export const STALE_NOTE_EDITING_SESSION_MS = WRITE_GUARD_RELEASE_AFTER_MS;

/** Inputs to {@link resolveEditingSessionActivity}. */
export interface EditingSessionActivityInput {
  /** Whether a marker-palette session is currently open for the editor. */
  hasPaletteSession: boolean;
  /**
   * Lexical node key of the note whose editing session is open, or `undefined` when no note is
   * being edited.
   */
  editingNoteKey: string | undefined;
  /**
   * `Date.now()` when the note-editing session was opened, last edited in, or last saved from, or
   * `undefined` when that was never recorded. An open session with no recorded time cannot prove it
   * is live, so it counts as stale.
   */
  noteSessionRefreshedAtMs: number | undefined;
  /** `Date.now()` at the moment of the decision. */
  nowMs: number;
  /**
   * Set when the open note session is the footnotes pane's row editor. The row editor applies each
   * edit to the text as it is made, as the Scripture editor itself does, so it holds incoming
   * updates back on the Scripture editor's terms (see {@link doesPaneSessionOwnContent}). Without
   * it, an open note session holds updates back until it closes or goes stale.
   */
  paneSession?: PaneEditingSession;
}

/** An open note session in the footnotes pane's row editor. */
export interface PaneEditingSession {
  /** Whether DOM focus is inside the footnotes pane. */
  hasFocus: boolean;
  /**
   * Where the window's focus is. DOM focus in the pane survives a click into another web view, so
   * only `'thisEditor'` lets the pane claim the text. While focus is `'settling'`,
   * `useEditorPdpSync` holds the delivery instead, as it does for the Scripture text.
   */
  focusLocation: EditorFocusLocation;
  /**
   * `Date.now()` of the last edit made in this view — in the Scripture text or the pane's row
   * editor — or `undefined` if none was. One stamp for both, so a footnote just inserted from the
   * text (which puts the caret in its row before anything is typed there) or a row clicked right
   * after typing in the text is held for the rest of the window.
   */
  lastEditAtMs: number | undefined;
}

/**
 * Whether the footnotes pane owns the chapter's content, as the focused Scripture editor does: a
 * note session is open in the pane, focus is in the pane, and the view (the text or a pane row) was
 * edited within {@link EDITOR_OWNERSHIP_WINDOW_MS}. Says nothing about where the window's focus is;
 * {@link resolveEditingSessionActivity} and `useEditorPdpSync` each decide what that means for an
 * incoming update.
 */
export function doesPaneSessionOwnContent(
  editingNoteKey: string | undefined,
  paneSession: PaneEditingSession | undefined,
  nowMs: number,
): boolean {
  return (
    editingNoteKey !== undefined &&
    paneSession !== undefined &&
    paneSession.hasFocus &&
    paneSession.lastEditAtMs !== undefined &&
    nowMs - paneSession.lastEditAtMs < EDITOR_OWNERSHIP_WINDOW_MS
  );
}

/**
 * Decides whether an editing SESSION (marker palette, or a note edit in the footnotes pane) should
 * keep the PDP-sync deferral open, applying the {@link STALE_NOTE_EDITING_SESSION_MS} time bound to
 * a note session.
 *
 * The note-session bound exists because the session key alone is not proof of a live session: if
 * the row editor dies without cleanup, the orphaned key would otherwise defer every incoming PDP
 * update until the user happens to click another note caller (the only other stale-session recovery
 * path is click-triggered). A session the user is actively working in refreshes its timestamp on
 * every edit in and apply from the row editor, so a live long edit never trips the bound; a session
 * older than the bound is reported stale so the caller can clear it (via the normal footnote-editor
 * close path) and stop deferring.
 *
 * A palette session carries no time bound here: its lifecycle is owned by the overlay service's
 * show promise, which settles on select, dismiss, or replacement rejection.
 *
 * Settling is not bounded in time, though: an open palette closes only on Escape, a commit, a
 * chapter change, or a gesture that reaches the overlay service, so a palette the user leaves open
 * and untouched keeps `isActive` true for as long as it stays open. Known gap: while it does,
 * `useEditorPdpSync` treats every differing same-document PDP update as an echo to defer — it keeps
 * the incoming update unapplied and pushes the editor's content back up through
 * `saveUsjToPdpIfUpdated`, which writes whatever differs from the incoming update. An external
 * change that lands meanwhile (e.g. a Send/Receive merge delivering a collaborator's edit) is
 * therefore overwritten by the editor's pre-merge content as soon as a write is accepted (a push
 * made while an automatic Send/Receive holds the backend write gate is rejected; one after it
 * clears is not). The window-blur flush of the debounced save is the only save path a palette
 * session suppresses.
 *
 * Tracked as PT-4817. The intended fix is a staleness bound like the note session's refreshed-at
 * bound — a palette session defers only within the editor-ownership window of the last edit in this
 * view, after which the update applies and the change guard closes the palette — not dismissing the
 * palette on unrelated keys. An automatic Send/Receive dismisses the palette before it writes, so
 * that particular collision is closed; other external writers can still be overwritten.
 *
 * A pane session is never reported stale: it stops holding updates back once nothing in the view
 * has been edited for the window (see {@link EditingSessionActivityInput.paneSession}), and the
 * update it then lets through ends the session itself.
 *
 * @returns `isActive` — whether any live session should keep deferring incoming PDP updates;
 *   `isNoteSessionStale` — whether an open note session exceeded the bound (the caller must clear
 *   it even when a palette session keeps `isActive` true)
 */
export function resolveEditingSessionActivity({
  hasPaletteSession,
  editingNoteKey,
  noteSessionRefreshedAtMs,
  nowMs,
  paneSession,
}: EditingSessionActivityInput): { isActive: boolean; isNoteSessionStale: boolean } {
  const isNoteSessionOpen = editingNoteKey !== undefined;
  if (isNoteSessionOpen && paneSession) {
    return {
      isActive:
        hasPaletteSession ||
        (paneSession.focusLocation === 'thisEditor' &&
          doesPaneSessionOwnContent(editingNoteKey, paneSession, nowMs)),
      isNoteSessionStale: false,
    };
  }
  const isNoteSessionStale =
    isNoteSessionOpen &&
    (noteSessionRefreshedAtMs === undefined ||
      nowMs - noteSessionRefreshedAtMs >= STALE_NOTE_EDITING_SESSION_MS);
  return {
    isActive: hasPaletteSession || (isNoteSessionOpen && !isNoteSessionStale),
    isNoteSessionStale,
  };
}

/**
 * Maps marker-menu items to command-palette items with every `LocalizeKey` field already resolved
 * to its final display string, so the request handed to `papi.overlays.showCommandPalette` carries
 * NO unresolved keys.
 *
 * That pre-resolution is what keeps the palette open synchronously: the overlay host awaits the
 * localization service for any request whose items still contain `LocalizeKey` text, and keystrokes
 * typed during that await are dropped — marker palettes are opened MID-typing (the `\` trigger), so
 * that window is user-visible. `markerMenuItemToPaletteItem` (platform-bible-react) emits exactly
 * one `LocalizeKey` field, the close-tag badge; this wrapper resolves it (and any future
 * key-bearing field) from the `localizedStrings` the web view already holds. An unknown key keeps
 * its raw key text — the same fallback the overlay host and the palette component apply — so
 * display is unchanged, just resolved earlier.
 */
export function markerMenuItemsToResolvedPaletteItems(
  items: readonly EditorMarkerMenuItem[],
  localizedStrings: LanguageStrings,
): PaletteItem[] {
  return resolvePaletteItemStrings(items.map(markerMenuItemToPaletteItem), localizedStrings);
}

/**
 * Resolves every `LocalizeKey` field of already-built palette items, so a request handed to
 * `papi.overlays.showCommandPalette` carries NO unresolved keys.
 *
 * The single place the localizable `PaletteItem` fields are enumerated — every palette-opening path
 * routes through here so none of them can reintroduce the overlay host's localization await (and
 * with it the dropped-keystroke window) by forgetting a field.
 *
 * @param items Palette items whose text may still contain `LocalizeKey`s
 * @param localizedStrings Localized strings the caller already holds
 * @returns The items with each key-bearing field resolved; an unknown key keeps its raw key text,
 *   the same fallback the overlay host and the palette component apply
 */
export function resolvePaletteItemStrings(
  items: readonly PaletteItem[],
  localizedStrings: LanguageStrings,
): PaletteItem[] {
  const resolve = (value: string): string =>
    isLocalizeKey(value) ? (localizedStrings[value] ?? value) : value;
  return items.map((item) => ({
    ...item,
    label: resolve(item.label),
    description: item.description === undefined ? undefined : resolve(item.description),
    badge: item.badge === undefined ? undefined : resolve(item.badge),
  }));
}

/**
 * Parses a PT9 caller-sequence project setting value (`platformScripture.footnoteCallers` /
 * `platformScripture.crossRefCallers`) — a space-separated character-set string from the project's
 * LANGUAGE (`ScrLanguage.FootnoteCallers` / `.CrossReferenceCallers`, Paratext repo,
 * ParatextData/Languages/ScrLanguage.cs:290-300) — into the caller array the editor's
 * `UsjNodeOptions` takes.
 *
 * Mirrors PT9's own parsing (`UsfmXsltExtensions.GetNthCaller`, Paratext repo,
 * ParatextInternalShared/ScriptureEditor/UsfmXsltExtensions.cs:322): split on whitespace, dropping
 * empty entries. Returns `undefined` for an empty or whitespace-only value so each consumer can
 * apply the matching PT9 default (`a`–`z` for footnotes — GetNthCaller's own fallback, which the
 * editor's built-in default matches — and `†` for cross-references, the fallback PT9's view
 * converter passes at ViewUsfmXhtmlConverter.cs:73-74).
 */
export function parseCallerSequenceSetting(value: string): string[] | undefined {
  const callers = value.split(/\s+/).filter((caller) => caller.length > 0);
  return callers.length > 0 ? callers : undefined;
}

/**
 * The ops array a footnotes-pane note session holds after an editor change, given what
 * `decideNoteSessionUpdate` made of that change.
 *
 * The array's IDENTITY is what the mounted row editor reloads on, so:
 *
 * - `reloadRowEditor` (the note changed from elsewhere): a fresh array, which reloads the row.
 * - `rekey` (the row editor's own apply replaced the note): the SAME array with its op replaced in
 *   place. The mounted editor is left alone, but an editor remounted mid-session (its row keyed
 *   afresh) loads from this array, and must load what the note now holds rather than what it held
 *   when the session opened.
 * - Otherwise: the array as it was.
 *
 * @param editingNoteOps The session's current ops array
 * @param noteOp The session note's op as the document holds it now, if it resolved
 * @param decision What the change does to the session
 * @returns The array the session should hold next
 */
export function nextEditingNoteOps(
  editingNoteOps: DeltaOpInsertNoteEmbed[] | undefined,
  noteOp: DeltaOpInsertNoteEmbed | undefined,
  decision: Pick<NoteSessionUpdateDecision, 'action' | 'reloadRowEditor'>,
): DeltaOpInsertNoteEmbed[] | undefined {
  if (!noteOp) return editingNoteOps;
  if (decision.reloadRowEditor) return [noteOp];
  if (decision.action === 'rekey' && editingNoteOps) editingNoteOps[0] = noteOp;
  return editingNoteOps;
}

/** What one textual-note kind needs to insert itself and record why. */
export interface NoteInsertConfig {
  /** The USFM marker `EditorRef.insertMarker` takes for this kind. */
  marker: string;
  /** Version-history commit message shown for this kind's insert. */
  commitMessageKey: LocalizeKey;
  /** Names the edit in log lines, e.g. `'inserting footnote'`. */
  editDescription: string;
}

/**
 * ONE table for every textual-note kind, keyed by the same method union the editor message and the
 * command handlers use — the marker, the version-history commit message, and the log description
 * all move together for a given kind instead of being repeated at each of the four call sites that
 * need it (the context-menu wrappers, the top-menu message listener, the Ctrl+T/Ctrl+Shift+T
 * shortcut, and each hook's dependency array).
 */
export const NOTE_INSERT_CONFIG: Record<
  EditorMessageInsertTextualNoteAtSelection['method'],
  NoteInsertConfig
> = {
  insertFootnoteAtSelection: {
    marker: 'f',
    commitMessageKey: '%versionHistoryCommit_beforeInsertFootnote%',
    editDescription: 'inserting footnote',
  },
  insertCrossReferenceAtSelection: {
    marker: 'x',
    commitMessageKey: '%versionHistoryCommit_beforeInsertCrossReference%',
    editDescription: 'inserting cross-reference',
  },
  insertEndnoteAtSelection: {
    marker: 'fe',
    commitMessageKey: '%versionHistoryCommit_beforeInsertEndnote%',
    editDescription: 'inserting endnote',
  },
};

/**
 * Whether a note-insert callback should skip the version-history snapshot and the marker insert
 * entirely, checked BEFORE either runs: with no mounted editor, or a read-only one (which already
 * folds in a sync freeze), an insert can never land, and skipping ahead of the snapshot is what
 * stops a read-only top-menu click from writing a forced, empty version-history commit. The refusal
 * is silent to the user.
 */
export function shouldSkipNoteInsert(hasEditor: boolean, isReadOnlyEffective: boolean): boolean {
  return !hasEditor || isReadOnlyEffective;
}

/** Everything the read-only flags are derived from. */
export type ReadOnlyInputs = {
  /** The web view's own `isReadOnly` option */
  isReadOnly: boolean;
  /** Whether the project's `platform.isEditable` setting is still loading */
  isProjectEditableLoading: boolean;
  isProjectEditable: boolean;
  /** Whether the user's Scripture-edit permission is genuinely still resolving */
  isCanUserEditScriptureUnresolved: boolean;
  canUserEditScripture: boolean;
  /** Whether an automatic Send/Receive is freezing editing */
  isSyncBlocked: boolean;
  /** Whether `platform.interfaceMode` is still loading */
  isInterfaceModeLoading: boolean;
  /** The DISPLAYED view type (after the interface-mode fallback), not the saved one */
  viewType: ScriptureEditorViewType;
  isPowerMode: boolean;
};

/**
 * Derives the three read-only flags the editor web view uses.
 *
 * - `isReadOnlyEffective`: whether the editor is effectively read-only: the `isReadOnly` option, the
 *   project's `platform.isEditable` setting, the user's Scripture-edit permission, a sync block, or
 *   the read-only Preview (the formatted view in Power mode). Fails CLOSED (read-only) while
 *   editability or permission is genuinely still resolving and while `platform.interfaceMode` loads
 *   (which decides whether the formatted view is Preview), rather than relying on the fail-open
 *   default values during that window: a briefly-writable editor is worse than a briefly-read-only
 *   one.
 * - `isDurablyReadOnly`: the same reasons minus the loading states, minus `isSyncBlocked` (a
 *   transient freeze during an automatic Send/Receive rather than a real read-only state). Used for
 *   the tab title so it does not relabel "(Read-only)" and back on every scheduled sync; the
 *   sync-blocked banner already communicates that transient state.
 * - `isReadOnlyForTitle`: `isDurablyReadOnly`, or `undefined` while editability, permission or the
 *   interface mode is still resolving, so the title effect skips its update and the
 *   previously-persisted title stays showing.
 */
export function deriveReadOnlyFlags({
  isReadOnly,
  isProjectEditableLoading,
  isProjectEditable,
  isCanUserEditScriptureUnresolved,
  canUserEditScripture,
  isSyncBlocked,
  isInterfaceModeLoading,
  viewType,
  isPowerMode,
}: ReadOnlyInputs): {
  isReadOnlyEffective: boolean;
  isDurablyReadOnly: boolean;
  isReadOnlyForTitle: boolean | undefined;
} {
  const isPreview = showsReadOnlyPreview(viewType, isPowerMode);
  const isDurablyReadOnly = isReadOnly || !isProjectEditable || !canUserEditScripture || isPreview;
  const isReadOnlyEffective =
    isReadOnly ||
    isProjectEditableLoading ||
    !isProjectEditable ||
    isCanUserEditScriptureUnresolved ||
    !canUserEditScripture ||
    isSyncBlocked ||
    isInterfaceModeLoading ||
    isPreview;
  const isReadOnlyForTitle =
    isProjectEditableLoading || isCanUserEditScriptureUnresolved || isInterfaceModeLoading
      ? undefined
      : isDurablyReadOnly;
  return { isReadOnlyEffective, isDurablyReadOnly, isReadOnlyForTitle };
}

/**
 * Inserts a textual note (footnote, cross-reference, or endnote) at the current selection, per
 * {@link NOTE_INSERT_CONFIG}. The body of the web view's `insertNoteAtCurrentSelection` hook,
 * extracted so the ORDER of its two side effects — a version-history snapshot, then the marker
 * insert — is directly unit-testable against injected fakes rather than only observable end to
 * end.
 *
 * Checks read-only BEFORE calling `commitSnapshot`. The menu items are gated by `enabledWhen`
 * (`adr-menus-gate-declaratively-with-context-keys`), but a request can still reach this while the
 * editor is read-only — through the editor's keyboard shortcut, a direct command call, or a menu
 * gate that has not caught up with the editor's state — and a refused insert must not write a
 * forced, empty version-history commit. The refusal is logged, not shown to the user.
 *
 * @param kind Which textual note to insert.
 * @param hasEditor Whether the editor is currently mounted.
 * @param isReadOnlyEffective The editor's effective read-only state (already folds in a sync
 *   freeze).
 * @param insertMarker Inserts the kind's marker at the current selection, e.g. `(marker) =>
 *   editorRef.current?.insertMarker(marker)`.
 * @param commitSnapshot Commits a version-history snapshot before the insert, e.g.
 *   `commitVersionHistorySnapshot` bound to the current project id.
 * @param localizedStrings Resolves the kind's commit-message key.
 */
export async function insertNoteAtCurrentSelectionCore(
  kind: EditorMessageInsertTextualNoteAtSelection['method'],
  hasEditor: boolean,
  isReadOnlyEffective: boolean,
  insertMarker: (marker: string) => void,
  commitSnapshot: (message: string, editDescription: string) => Promise<void>,
  localizedStrings: LanguageStrings,
): Promise<void> {
  const { marker, commitMessageKey, editDescription } = NOTE_INSERT_CONFIG[kind];
  if (shouldSkipNoteInsert(hasEditor, isReadOnlyEffective)) {
    logger.debug(`Not ${editDescription}: no mounted editor or read-only`);
    return;
  }

  await commitSnapshot(localizedStrings[commitMessageKey], editDescription);
  insertMarker(marker);
}

/** The facts one editor web view publishes about itself; both key functions below map over this */
const EDITOR_WEB_VIEW_CONTEXT_FACTS = [
  'isReadOnly',
  'isPreview',
  'isSyncBlocked',
  'footnotesPaneVisible',
  'hasSelection',
  'editTargetIsEditable',
] as const;

function getEditorWebViewContextKeyPrefix(webViewId: string): string {
  return `platformScriptureEditor.webView.${webViewId}`;
}

/**
 * Lists the names of the context keys one editor web view publishes, for removing them when it
 * closes. Derived from the same fact list as {@link getEditorWebViewContextKeys}, so the two cannot
 * disagree.
 *
 * @param webViewId The web view's id
 * @returns The full context key names, one per published fact
 */
export function getEditorWebViewContextKeyNames(webViewId: string): string[] {
  const prefix = getEditorWebViewContextKeyPrefix(webViewId);
  return EDITOR_WEB_VIEW_CONTEXT_FACTS.map((fact) => `${prefix}.${fact}`);
}

/**
 * Where keyboard focus is, from this editor's point of view (see {@link EditorFocusLocation}).
 * Projects the subject to a web view id as core's `getWebViewIdFromFocusSubject` does (extensions
 * cannot import it at runtime).
 *
 * - Another web view, by its iframe or its tab: `'anotherWebView'`.
 * - This editor's iframe while its document lacks focus: `'settling'` (the subject is stale).
 * - Anything else is `'thisEditor'`, including `'other'` (menus outside the dock), dialog tabs and
 *   unknown focus, so the editor's own menus and confirm dialogs never release its hold.
 *
 * @param focusSubject The window's current focus subject, `undefined` if unknown
 * @param ownWebViewId This editor's web view id
 * @param doesEditorDocumentHaveFocus Whether this editor's document currently has focus
 */
export function getEditorFocusLocation(
  focusSubject: FocusSubject | undefined,
  ownWebViewId: string,
  doesEditorDocumentHaveFocus: boolean,
): EditorFocusLocation {
  let subjectWebViewId: string | undefined;
  if (focusSubject?.focusType === 'webView') subjectWebViewId = focusSubject.id;
  else if (focusSubject?.focusType === 'tab' && focusSubject.tabType === 'webView')
    subjectWebViewId = focusSubject.id;

  if (subjectWebViewId === undefined) return 'thisEditor';
  if (subjectWebViewId !== ownWebViewId) return 'anotherWebView';
  if (focusSubject?.focusType === 'webView' && !doesEditorDocumentHaveFocus) return 'settling';
  return 'thisEditor';
}

/**
 * Whether a selection is a range (start and end differ) rather than a caret.
 *
 * @param selection The editor's selection, `undefined` when it reports none
 * @returns `false` for no selection, a missing end or an end equal to the start
 */
export function hasNonCollapsedSelection(selection: SelectionRange | undefined): boolean {
  if (!selection?.end) return false;
  return !deepEqual(selection.end, selection.start);
}

/**
 * Names the context keys one editor web view publishes about itself, which its menu items'
 * `enabledWhen` / `checkedWhen` expressions read.
 *
 * @param webViewId The web view's id
 * @param state The facts to publish
 * @returns Context key name -> value, one entry per published fact
 */
export function getEditorWebViewContextKeys(
  webViewId: string,
  state: Record<(typeof EDITOR_WEB_VIEW_CONTEXT_FACTS)[number], boolean>,
): Record<string, boolean> {
  const prefix = getEditorWebViewContextKeyPrefix(webViewId);
  return Object.fromEntries(
    EDITOR_WEB_VIEW_CONTEXT_FACTS.map((fact) => [`${prefix}.${fact}`, state[fact]]),
  );
}
