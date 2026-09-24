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

import { logger } from '@papi/frontend';
import {
  isBlockMarker,
  isLocalizeKey,
  LanguageStrings,
  LocalizeKey,
  usfmMarkers,
  type PaletteItem,
} from 'platform-bible-utils';
import type { EditorMessageInsertTextualNoteAtSelection } from 'platform-scripture-editor';
import type { MutableRefObject } from 'react';
import type {
  ContextMenuOptionConfig,
  EditorRef,
  MarkerMenuItem as EditorMarkerMenuItem,
  SelectionRange,
} from '@eten-tech-foundation/platform-editor';
import { markerMenuItemToPaletteItem, type MarkerMenuItem } from 'platform-bible-react';
import {
  isEditorContextMenuOpenFor,
  stripMarkerNestingPrefix,
} from 'platform-bible-react/experimental';
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
 * Identity of one loaded chapter, for the two places that need to compare "the chapter then"
 * against "the chapter now": the debounced save's chapter-safety guard and the footnotes pane's
 * per-chapter manual override. One helper so those two can never disagree about what counts as the
 * same chapter.
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

/** Inputs to {@link resolveFootnotesPaneAutoVisibility}. */
export interface FootnotesPaneAutoVisibilityInput {
  /** Whether the footnotes pane's auto-show/hide behavior is turned on. */
  isAutoShowEnabled: boolean;
  /** Whether the chapter currently loaded in the editor has at least one note. */
  chapterHasNotes: boolean;
  /**
   * The chapter the user last manually showed or hid the pane in, or `undefined` when they have not
   * done so. Same shape as {@link currentChapterKey}.
   */
  manualOverrideChapterKey: string | undefined;
  /** The chapter currently loaded in the editor. */
  currentChapterKey: string;
}

/**
 * Decides what the footnotes pane's auto-show/hide behavior should do right now: show the pane,
 * hide it, or leave it exactly as the user has it.
 *
 * Auto-show/hide is a PT9 divergence, off by default in Simple mode (so PT9's manual, persistent
 * pane visibility is what ships there) and on by default in Power mode — see the web view's
 * effective-setting derivation. It applies in EVERY editor view. When it applies, the pane follows
 * the loaded chapter: shown for a chapter that has notes, hidden for one that doesn't.
 *
 * A manual show/hide wins over that, but only for the chapter it was made in — the user asked for
 * THIS chapter to look a particular way, not for the feature to stop working. Recording the
 * override against a chapter, rather than as a flag some other code has to clear, is what makes it
 * expire on navigation without depending on which effect runs first.
 *
 * @returns `true` to show the pane, `false` to hide it, or `undefined` when the auto behavior has
 *   no opinion and the pane must be left however it already is
 */
export function resolveFootnotesPaneAutoVisibility({
  isAutoShowEnabled,
  chapterHasNotes,
  manualOverrideChapterKey,
  currentChapterKey,
}: FootnotesPaneAutoVisibilityInput): boolean | undefined {
  if (!isAutoShowEnabled) return undefined;
  if (manualOverrideChapterKey === currentChapterKey) return undefined;
  return chapterHasNotes;
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
 * @param editor The live editor handle (e.g. `editorRef.current`); no-op when not mounted
 * @param lastFocusOutSelection The selection captured when focus last left the editor (a focusout
 *   listener reads it synchronously, ahead of the blur-path nulling), or `undefined` when none has
 *   been captured
 */
export function restoreSelectionIfLost(
  editor: Pick<EditorRef, 'getSelection' | 'setSelection'> | null,
  lastFocusOutSelection: SelectionRange | undefined,
): void {
  if (!editor || editor.getSelection()) return;
  if (lastFocusOutSelection) editor.setSelection(lastFocusOutSelection);
}

/**
 * How long, in milliseconds, a footnote-popover editing session may sit without any interaction
 * (opening it, editing in it, or saving from it) before the PDP-sync deferral treats it as STALE —
 * abandoned bookkeeping rather than a live session — and stops letting it hold incoming updates at
 * bay.
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
   * Lexical node key of the note whose footnote-popover editing session is open, or `undefined`
   * when no note is being edited.
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
}

/**
 * Decides whether an editing SESSION (marker palette or footnote-popover note edit) should keep the
 * PDP-sync deferral open, applying the {@link STALE_NOTE_EDITING_SESSION_MS} time bound to the note
 * session.
 *
 * The note-session bound exists because the session key alone is not proof of a live session: if
 * the popover dies without cleanup, the orphaned key would otherwise defer every incoming PDP
 * update until the user happens to click another note caller (the only other stale-session recovery
 * path is click-triggered). A session the user is actively working in refreshes its timestamp on
 * every edit in and save from the popover, so a live long edit never trips the bound; a session
 * older than the bound is reported stale so the caller can clear it (via the normal footnote-editor
 * close path, keeping popover state consistent) and stop deferring.
 *
 * A palette session carries no time bound here: its lifecycle is owned by the overlay service's
 * show promise, which always settles (select, dismiss, or replacement rejection).
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
}: EditingSessionActivityInput): { isActive: boolean; isNoteSessionStale: boolean } {
  const isNoteSessionOpen = editingNoteKey !== undefined;
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
 * Whether the `\` palette's Space key should COMMIT the palette selection (like Enter) instead of
 * materializing the typed literal: true when the typed filter names a NOTE marker among the offered
 * items. A materialized note literal (`\f `) misbehaves mid-text — the Tier-2 tokenizer absorbs the
 * following word into the new footnote as its caller — so note markers route through the overlay
 * commit, which inserts an empty footnote exactly like `\f` + Enter (see
 * `MarkerPaletteSessionState.shouldSpaceCommit`).
 *
 * The comparison uses the shared marker normalization (case-fold, `+` nesting prefix stripped —
 * `stripMarkerNestingPrefix`), the same way the visible list matches: `\F` must hit the same `f`
 * entry the palette shows it matching.
 */
export function shouldSpaceCommitNoteMarker(
  items: readonly Pick<EditorMarkerMenuItem, 'kind' | 'marker'>[],
  filter: string,
): boolean {
  const typed = stripMarkerNestingPrefix(filter).toLowerCase();
  return items.some(
    (item) => item.kind === 'note' && stripMarkerNestingPrefix(item.marker).toLowerCase() === typed,
  );
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

/**
 * Inserts a textual note (footnote, cross-reference, or endnote) at the current selection, per
 * {@link NOTE_INSERT_CONFIG}. The body of the web view's `insertNoteAtCurrentSelection` hook,
 * extracted so the ORDER of its two side effects — a version-history snapshot, then the marker
 * insert — is directly unit-testable against injected fakes rather than only observable end to
 * end.
 *
 * Checks read-only BEFORE calling `commitSnapshot`: a read-only top-menu click (which reaches this
 * with no prior gate — the menu item itself has no enablement) must not write a forced, empty
 * version-history commit. The refusal is logged, not shown to the user.
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

/**
 * Which {@link NOTE_INSERT_CONFIG} kind each editor context-menu insert action inserts. One mapping
 * shared by the menu-item wiring and its tests, so a swap (e.g. the footnote action pointed at the
 * endnote kind) fails a test instead of only showing up as a user picking one menu item and getting
 * another note type.
 */
export const CONTEXT_MENU_ACTION_TO_NOTE_KIND: Record<
  keyof Pick<InsertContextMenuActions, 'insertFootnote' | 'insertCrossReference' | 'insertEndnote'>,
  EditorMessageInsertTextualNoteAtSelection['method']
> = {
  insertFootnote: 'insertFootnoteAtSelection',
  insertCrossReference: 'insertCrossReferenceAtSelection',
  insertEndnote: 'insertEndnoteAtSelection',
};

/**
 * Which {@link NOTE_INSERT_CONFIG} kind the Ctrl+T / Ctrl+Shift+T keyboard shortcut inserts: Ctrl+T
 * inserts a footnote, Ctrl+Shift+T inserts a cross-reference. One mapping shared by the shortcut
 * handler and its test, so swapping the two chords' kinds fails a test rather than only showing up
 * as Ctrl+T inserting the wrong note type.
 *
 * @param shiftKey Whether Shift was held (`KeyboardEvent.shiftKey`).
 */
export function noteKindForCtrlTChord(
  shiftKey: boolean,
): Extract<
  EditorMessageInsertTextualNoteAtSelection['method'],
  'insertFootnoteAtSelection' | 'insertCrossReferenceAtSelection'
> {
  return shiftKey ? 'insertCrossReferenceAtSelection' : 'insertFootnoteAtSelection';
}

const INSERT_FOOTNOTE_TITLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_insertFootnoteAtSelection%';
const INSERT_CROSS_REFERENCE_TITLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_insertCrossReferenceAtSelection%';
const INSERT_ENDNOTE_TITLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_insertEndnoteAtSelection%';
const INSERT_COMMENT_TITLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_insertCommentAtSelection%';

/**
 * Localize keys used by {@link createInsertContextMenuItems}. Spread these into the editor web
 * view's localized-strings list so the values are loaded and passed into `localizedStrings` —
 * mirrors the established `CHARACTER_MARKER_MENU_STRING_KEYS` pattern
 * (`character-marker-menu.utils.ts`), which ties a menu builder to its own keys the same way
 * instead of letting the builder and the web view's key list repeat the same literals
 * independently.
 */
export const INSERT_CONTEXT_MENU_STRING_KEYS = Object.freeze([
  INSERT_FOOTNOTE_TITLE_KEY,
  INSERT_CROSS_REFERENCE_TITLE_KEY,
  INSERT_ENDNOTE_TITLE_KEY,
  INSERT_COMMENT_TITLE_KEY,
] as const);

/** Callbacks the editor context menu's insert items dispatch to. */
export interface InsertContextMenuActions {
  insertFootnote: () => void;
  insertCrossReference: () => void;
  insertEndnote: () => void;
  insertComment: () => void;
}

/**
 * Editor state that decides which insert items are selectable. `isReadOnly` is the editor's
 * effective read-only state, which already folds in a sync freeze; `isSyncBlocked` is passed
 * separately because comment insertion does not go through the editor and so is not covered by it.
 */
export interface InsertContextMenuState {
  isReadOnly: boolean;
  canUserCreateComments: boolean;
  isSyncBlocked: boolean;
}

/**
 * Build the editor context-menu insert items. MUST stay in parity with the Insert top-menu's
 * `platformScriptureEditor.insert` column (`contributions/menus.json`, every group in that column)
 * — same items, same order; pinned by the parity test in
 * `platform-scripture-editor.web-view.utils.test.ts`.
 */
export function createInsertContextMenuItems(
  localizedStrings: LanguageStrings,
  actions: InsertContextMenuActions,
  state: InsertContextMenuState,
): ContextMenuOptionConfig[] {
  const { isReadOnly, canUserCreateComments, isSyncBlocked } = state;
  return [
    {
      title: localizedStrings[INSERT_FOOTNOTE_TITLE_KEY],
      onSelect: actions.insertFootnote,
      isDisabled: isReadOnly,
    },
    {
      title: localizedStrings[INSERT_CROSS_REFERENCE_TITLE_KEY],
      onSelect: actions.insertCrossReference,
      isDisabled: isReadOnly,
    },
    {
      title: localizedStrings[INSERT_ENDNOTE_TITLE_KEY],
      onSelect: actions.insertEndnote,
      isDisabled: isReadOnly,
    },
    {
      title: localizedStrings[INSERT_COMMENT_TITLE_KEY],
      onSelect: actions.insertComment,
      // Disabled while sync-blocked too, so the menu reflects the frozen state.
      isDisabled: !canUserCreateComments || isSyncBlocked,
    },
  ];
}

/**
 * Whether the given editor's own right-click context menu is open at all.
 *
 * Gates every key this web view acts on in the editor. While the menu is up it is the only keyboard
 * mode on screen, and nothing else opens underneath it or over it:
 *
 * - Both standard-view triggers: neither the `\\` marker palette nor the Enter paragraph palette may
 *   open, and neither key may reach the document behind the menu.
 * - The other views' `\\` inline markers menu, and the footnote, cross-reference and comment insert
 *   shortcuts. Each is swallowed rather than acted on: every one of them would open a popup (the
 *   markers menu, the footnote editor, the comment editor) over a menu that stays open.
 *
 * The menu has no idea the palettes exist and stays open across one. A palette session's own Escape
 * claims the key with `stopPropagation` on `window` — one capture step above the menu's `document`
 * listener — so THAT ESCAPE DISMISSES THE PALETTE, not the menu: the menu, never reached, survives
 * with its highlighted item still armed for the next Enter.
 *
 * Keyed on the menu being OPEN rather than on a highlighted item, because a menu holding nothing to
 * invoke still holds the keyboard. The two standard-view triggers then stand down differently,
 * because the menu wants one of the keys and not the other:
 *
 * - `\\` is CLAIMED by the caller. The editor keeps DOM focus while the menu is up, so an unclaimed
 *   `\\` falls through to Lexical and types a backslash into the document behind the menu. The menu
 *   has no use for the key either, so nothing acts on it at all.
 * - Enter is HANDED DOWN to the menu, which owns it outright while it is open — invoking its
 *   highlighted item when it has an enabled one and swallowing the press otherwise.
 *   `ContextMenuPlugin` claims Enter from a CAPTURE-phase listener on `document` while this web
 *   view's is on `window`; capture descends window → document, so a `stopPropagation()` here would
 *   end the press before the menu's listener ran at all.
 *
 * Scoped to ONE editor: `ContextMenuPlugin` mounts once per Lexical editor instance (the main
 * Standard-view editor and the footnote-editor popover each have their own), and every instance's
 * portal shares the same classes, so a document-wide check cannot tell whose menu is open. See
 * {@link isEditorContextMenuOpenFor} for the per-editor signal this reads.
 *
 * @param editorContainer The main editor's own container (or its `.editor-input` root).
 */
export function isEditorContextMenuOpen(editorContainer: Element | null | undefined): boolean {
  return isEditorContextMenuOpenFor(editorContainer);
}
