/**
 * The `webViewType` of this extension's Bible Texts panel.
 *
 * In a module of its own, with no imports, so core's tests can import it: Simple mode's layout pins
 * a tab of this type by a string literal in
 * `src/renderer/components/docking/simple-layout.data.ts`, and core checks that the two still
 * match. A stale literal would not fail loudly: the tab would name a type no provider serves and
 * silently fail to load.
 */
export const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
