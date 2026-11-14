import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from './scripture-editor-web-view-type.const';

// The four web view type consts below are the read-only scripture reference panels and the Text
// Collection, as this extension sees them. `platform-scripture` cannot import
// `platform-scripture-editor`'s source, so these values are mirrored here. They must equal the
// corresponding consts in `extensions/src/platform-scripture-editor/src/main.ts` (the panels) and
// `platform-scripture-editor.utils.ts` (`SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE`); a pinning test in
// `resource-panel-web-view-types.const.test.ts` catches an accidental edit to these copies.

/** Web view type of the Model text panel. Mirrored — see the note above. */
export const MODEL_TEXT_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.modelText';

/** Web view type of the Bible texts panel. Mirrored — see the note above. */
export const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';

/** Web view type of the Commentaries panel. Mirrored — see the note above. */
export const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

/** Web view type of the Text Collection. Mirrored — see the note above. */
export const SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';

/** The Text Collection, as a set, for helpers that resolve a tab by a set of web view types. */
export const TEXT_COLLECTION_WEB_VIEW_TYPES = new Set<string>([SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE]);

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
 * Tab types whose container project is not the scripture they display: the reference panels and the
 * Text Collection. Each declares what it displays under `NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY`,
 * so Find offers those declared projects and drops the container one.
 */
export const DECLARING_WEB_VIEW_TYPES = new Set<string>([
  ...REFERENCE_PANEL_WEB_VIEW_TYPES,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
]);

/**
 * Tab types whose scripture Find can search, and therefore the ones whose projects the Find project
 * picker lists.
 *
 * Each of these tabs displays scripture Find can search, and each already routes Ctrl+F to Find for
 * it (`useOpenFindShortcut` in `platform-scripture-editor`): the editor passes its own project, the
 * reference panels pass the resource they display, and the Text Collection passes the resource the
 * user last clicked or focused in, or that Find last revealed.
 *
 * "Go to result" on a resource shown only in the Text Collection activates that tab and asks its
 * controller to reveal the resource's cell at the result's verse; the match itself is not
 * selected.
 */
export const FIND_SEARCHABLE_WEB_VIEW_TYPES = new Set<string>([
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  ...REFERENCE_PANEL_WEB_VIEW_TYPES,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
]);
