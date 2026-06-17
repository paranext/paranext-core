import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';
import { SIMPLE_LAYOUT_TAB_ID } from './simple-layout.tab-ids';

export { SIMPLE_LAYOUT_TAB_IDS } from './simple-layout.tab-ids';

// `TAB_TYPE_WEBVIEW` is inlined here rather than imported from `web-view.component`. That import
// would close a dependency cycle (this file is imported by `web-view.service-host`, which
// transitively imports `web-view.component`). The string literal `'webView'` is the
// docking-framework contract — duplicating the single literal is safe and keeps the cycle broken.
const TAB_TYPE_WEBVIEW = 'webView';

const { modelText, scriptureEditor, bibleTexts, commentaries } = SIMPLE_LAYOUT_TAB_ID;

/**
 * Builds a clone of the static simple layout with `projectId` baked into each tab's saved web-view
 * definition. When the dock layout restores from this, each web-view provider's `getWebView`
 * receives the `projectId` via `savedWebView.projectId` (or `state.isReadOnly` for the scripture
 * editor) and renders the real project content immediately — no empty-placeholder mount followed by
 * a `reloadWebView` round-trip. This is the simple-mode equivalent of how power mode restores its
 * persisted layout: state baked in, no follow-up commands required.
 *
 * If the caller can't resolve a project (cold start, no recents), load the bare `simpleLayout`
 * instead — the default-project picker in `platform-scripture-editor` will still fill the empty
 * Scripture Editor placeholder after the layout swap (the slower path, but a valid fallback).
 */
export function buildSimpleLayoutForProject(projectId: string): LayoutBase {
  // Using `as` here simplifies type changes.
  /* eslint-disable no-type-assertion/no-type-assertion */
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          size: 1,
          children: [
            {
              tabs: [
                {
                  id: modelText,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.modelText',
                    id: modelText,
                    contentType: 'react',
                    projectId,
                    state: {},
                  },
                },
              ] as SavedTabInfo[],
            },
          ],
        },
        {
          mode: 'vertical',
          size: 2,
          children: [
            {
              tabs: [
                {
                  id: scriptureEditor,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.react',
                    id: scriptureEditor,
                    contentType: 'react',
                    projectId,
                    // The factory reads `state.isReadOnly` when restoring from saved state. Set
                    // it explicitly so the restore matches what the editable open-flow would
                    // produce (`isReadOnly: false`).
                    state: { isReadOnly: false },
                  },
                },
              ] as SavedTabInfo[],
            },
          ],
        },
        {
          mode: 'vertical',
          size: 1,
          children: [
            {
              tabs: [
                {
                  id: bibleTexts,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.bibleTexts',
                    id: bibleTexts,
                    contentType: 'react',
                    projectId,
                    state: {},
                  },
                },
                {
                  id: commentaries,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.commentaries',
                    id: commentaries,
                    contentType: 'react',
                    projectId,
                    state: {},
                  },
                },
              ] as SavedTabInfo[],
            },
          ],
        },
      ],
    },
  };
  /* eslint-enable no-type-assertion/no-type-assertion */
}
