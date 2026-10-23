/**
 * The `webViewType` of this extension's Text Collection panel (the Scripture Text Grid) in Column
 * 3.
 *
 * In a module of its own, with no imports, so core's tests can import it: Simple mode's layout pins
 * a tab of this type by a string literal in
 * `src/renderer/components/docking/default-layout-supplement.json`, and confines it to Column 3 by
 * another in `platform-dock-layout-positioning.util.ts`. Core checks that they still match. A stale
 * literal would not fail loudly: the tab would name a type no provider serves and silently fail to
 * load.
 */
export const SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE = 'platformScriptureEditor.scriptureTextGrid';
