import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './scripture-editor-web-view-type.const';

// The three consts below are the web view types of the read-only scripture reference panels, as
// this extension sees them. `platform-scripture` cannot import `platform-scripture-editor`'s
// source, so these values are mirrored here. They must equal the corresponding consts in
// `extensions/src/platform-scripture-editor/src/main.ts`; a pinning test in
// `resource-panel-web-view-types.const.test.ts` catches an accidental edit to these copies.

/** Web view type of the Model text panel. Mirrored — see the note above. */
export const MODEL_TEXT_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.modelText';

/** Web view type of the Bible texts panel. Mirrored — see the note above. */
export const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';

/** Web view type of the Commentaries panel. Mirrored — see the note above. */
export const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

/**
 * The read-only scripture reference panels, as a set.
 *
 * These share two properties Find depends on: the resource they display is not their definition
 * `projectId` (they declare it under `NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY` instead), and they
 * register no web view controller — so Find can activate their tab but cannot drive their content.
 */
export const REFERENCE_PANEL_WEB_VIEW_TYPES = new Set<string>([
  MODEL_TEXT_PANEL_WEBVIEW_TYPE,
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
]);

/**
 * The reference panels a "go to result" activation may bring to the front.
 *
 * The Model text panel is deliberately absent. It has no visibility-keyed scroll: its effect runs
 * on the reference alone, and a reference arriving while its tab is hidden finds no layout in a
 * `display: none` iframe, so the scroll silently no-ops and nothing re-runs on activation — the
 * revealed panel would show a stale position, with no controller to retry through. Simple mode is
 * unaffected either way, since Model text sits alone in Column 1 and is always visible, which is
 * also why withholding the reveal costs nothing there: the panel is already on screen and the
 * scroll group has already moved it. Model text remains fully searchable and listed in the picker;
 * only the reveal is withheld. Add it here once that panel handles the hidden case.
 */
export const REVEALABLE_REFERENCE_PANEL_WEB_VIEW_TYPES = new Set<string>([
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
]);

/**
 * Tab types whose scripture Find can search, and therefore the ones whose projects the Find project
 * picker lists.
 *
 * Each of these tabs displays scripture Find can search, and each already routes Ctrl+F to Find for
 * it (`useOpenFindShortcut` in `platform-scripture-editor`): the editor passes its own project, the
 * reference panels pass the resource they display.
 *
 * The Text Collection (`platformScriptureEditor.scriptureTextGrid`) is excluded, but NOT because it
 * has no project to offer — it declares every resource it hosts, and latches one focused resource
 * (`useFocusedResourceProjectId`) that it already hands to Ctrl+F. It is excluded because "go to
 * result" has no defined behavior there: each grid cell is its own editor, so revealing the grid
 * would land the user on a tab with no indication of which cell holds the match. Including it needs
 * that interaction designed first.
 */
export const FIND_SEARCHABLE_WEB_VIEW_TYPES = new Set<string>([
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  ...REFERENCE_PANEL_WEB_VIEW_TYPES,
]);
