import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { LayoutBase } from 'rc-dock';

// Tab IDs and the `TAB_TYPE_WEBVIEW` literal are inlined here rather than imported from
// `simple-layout.data` or `web-view.component`. Importing either would create a dependency cycle
// (this file is imported by `web-view.service-host`, and both of those files transitively import
// back into the service). The IDs are stable UUIDs that match the static `simpleLayout`, and the
// type literal `'webView'` is the docking-framework contract — duplicating them here is safe and
// keeps the cycle broken. If the static-layout IDs ever change, update them here too.
const MODEL_TEXT_TAB_ID = '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2';
const SCRIPTURE_EDITOR_TAB_ID = '3cf575f0-2cc2-464b-8765-b588f216dfce';
const BIBLE_TEXTS_TAB_ID = '27616073-bf60-4f2b-9518-922d1a7d3601';
const COMMENTARIES_TAB_ID = '6c950d23-f8d7-4482-a384-93ea0481698b';
const TAB_TYPE_WEBVIEW = 'webView';

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
                  id: MODEL_TEXT_TAB_ID,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.modelText',
                    id: MODEL_TEXT_TAB_ID,
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
                  id: SCRIPTURE_EDITOR_TAB_ID,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.react',
                    id: SCRIPTURE_EDITOR_TAB_ID,
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
                  id: BIBLE_TEXTS_TAB_ID,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.bibleTexts',
                    id: BIBLE_TEXTS_TAB_ID,
                    contentType: 'react',
                    projectId,
                    state: {},
                  },
                },
                {
                  id: COMMENTARIES_TAB_ID,
                  tabType: TAB_TYPE_WEBVIEW,
                  data: {
                    webViewType: 'platformScriptureEditor.commentaries',
                    id: COMMENTARIES_TAB_ID,
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
