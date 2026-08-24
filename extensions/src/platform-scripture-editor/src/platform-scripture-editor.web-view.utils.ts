/**
 * WEB-VIEW-ONLY utility helpers for the platform-scripture-editor extension.
 *
 * IMPORTANT: this module imports RUNTIME VALUES (`getMarkerMenuItems`, `defaultStyleInfo`) from
 * `@eten-tech-foundation/platform-editor`, whose dist is a single, non-splittable library bundle
 * that also contains the React editor components and a top-level `react/jsx-runtime` import.
 * Importing any value from it pulls the whole bundle into the importer's webpack module graph. That
 * is fine in the web view (browser iframe, live React), but FATAL in the extension host: `main.js`
 * runs in a sandboxed Node context with no React runtime and a `require` that rejects anything but
 * `@papi/*`-family modules, so the editor bundle's eager `react/jsx-runtime` import throws during
 * `activate()` and the whole extension fails to activate.
 *
 * Therefore this module must ONLY ever be imported by web-view code (and its tests) — NEVER by
 * `main.ts` or anything `main.ts` reaches. Main-bundle-safe helpers live in
 * `platform-scripture-editor.utils.ts`, which is restricted to `import type` from the editor
 * package.
 */

import { isBlockMarker, isLocalizeKey, LanguageStrings } from 'platform-bible-utils';
import type { MutableRefObject } from 'react';
import {
  defaultStyleInfo,
  getMarkerMenuItems,
  type EditorRef,
  type SelectionRange,
  type StyleInfo,
} from '@eten-tech-foundation/platform-editor';
import type { MarkerMenuItem } from 'platform-bible-react';
import type { ScriptureEditorViewType } from 'platform-scripture-editor';

/**
 * Resolves the display title for a stylesheet-sourced marker-menu item: localizes `description`
 * when it happens to be a `LocalizeKey` (`%...%`), uses it as-is otherwise — the bundled usfm.sty's
 * descriptions are raw English text, not localization keys, so this is the common case — and falls
 * back to the marker code itself when the stylesheet gives no description at all.
 */
function resolveMarkerMenuItemTitle(
  marker: string,
  description: string | undefined,
  localizedStrings: LanguageStrings,
): string {
  if (!description) return marker;
  return isLocalizeKey(description) ? (localizedStrings[description] ?? description) : description;
}

/**
 * Function that generates the inline marker menu items that will update as the cursor location
 * changes. Sourced from the project's stylesheet (usfm.sty + custom.sty, merged and serialized by
 * the host) via the shared library's `getMarkerMenuItems` — the same PT9-derived classification
 * used by the standard-view `\`/Enter palettes — so a project's custom.sty markers are offered and
 * markers the project's stylesheet doesn't define are not, instead of walking a static built-in
 * marker list.
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
 * @param styleInfo The project's stylesheet data; falls back to the bundled default stylesheet when
 *   absent (e.g. no project stylesheet loaded yet)
 * @returns The list of inline marker menu items, in the library's PT9-derived order (basic markers
 *   first)
 */
export function generateInlineMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  isStructureProtected: boolean,
  notifyStructureProtected: () => void,
  restoreSelection?: () => void,
  parentMarker?: string,
  styleInfo?: StyleInfo,
): MarkerMenuItem[] {
  if (!parentMarker) return [];

  const items = getMarkerMenuItems(styleInfo ?? defaultStyleInfo, {
    source: 'character',
    paraMarker: parentMarker,
    previousParaMarkers: [],
    openCharMarkers: [],
    hasTextSelection: false,
    inMarkerText: false,
  });

  return items.map((item): MarkerMenuItem => {
    const isDisallowed = isStructureProtected && isBlockMarker(item.marker);
    return {
      marker: item.marker,
      title: resolveMarkerMenuItemTitle(item.marker, item.description, localizedStrings),
      isDisallowed,
      action: () => {
        // Defense-in-depth: unreachable while the menu renders `isDisallowed` items as disabled
        // `CommandItem`s (a disabled cmdk item never fires `onSelect`). Kept as a second layer of
        // protection in case that disabled rendering is ever loosened or the menu wiring changes.
        if (isDisallowed) {
          notifyStructureProtected();
          closeMarkersMenu();
          return;
        }
        // This menu focuses its own search input on open, which takes focus off `.editor-input` —
        // and Lexical's blur processing can null the selection `insertMarker` needs, so the insert
        // would land nowhere. Restore it first, as every other marker-apply surface does.
        restoreSelection?.();
        editorRef.current?.insertMarker(item.marker);
        closeMarkersMenu();
      },
    };
  });
}

/** Inputs to {@link resolveFootnotesPaneAutoVisibility}. */
export interface FootnotesPaneAutoVisibilityInput {
  /** Whether the footnotes pane's auto-show/hide behavior is turned on. */
  isAutoShowEnabled: boolean;
  /** The editor view the pane belongs to. */
  viewType: ScriptureEditorViewType;
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
 * Auto-show/hide is a PT9 divergence and defaults to off, so PT9's manual, persistent pane
 * visibility is what ships unless the user turns it on. It is also scoped to Standard view; the
 * other views keep manual visibility whatever the setting says. When it does apply, the pane
 * follows the loaded chapter: shown for a chapter that has notes, hidden for one that doesn't.
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
  viewType,
  chapterHasNotes,
  manualOverrideChapterKey,
  currentChapterKey,
}: FootnotesPaneAutoVisibilityInput): boolean | undefined {
  if (!isAutoShowEnabled) return undefined;
  if (viewType !== 'standard') return undefined;
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
