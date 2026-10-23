/**
 * The `webViewType` of this extension's fixed Column 3 Comment List Panel.
 *
 * In a module of its own, with no imports, so core's tests can import it: Simple mode's layout pins
 * a tab of this type by a string literal in
 * `src/renderer/components/docking/simple-layout.data.ts`, and core checks that the two still
 * match. A stale literal would not fail loudly: the tab would name a type no provider serves and
 * silently fail to load.
 *
 * Shared between `main.ts`, which registers the provider, and the web view itself, which reads its
 * own `webViewType` prop to tell the panel apart from the editor-anchored comment list.
 */
export const COMMENT_LIST_PANEL_WEB_VIEW_TYPE = 'legacyCommentManager.commentListPanel';
