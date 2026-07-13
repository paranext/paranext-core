import type PapiBackend from '@papi/backend';
import { getErrorMessage } from 'platform-bible-utils';

const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

/** Maps a `sharedLayoutDefaultTab` value to the col-3 panel web view type, or `undefined`. */
function webViewTypeForTab(tab: string | undefined): string | undefined {
  if (tab === 'ScriptureResource') return BIBLE_TEXTS_PANEL_WEBVIEW_TYPE;
  if (tab === 'CommentaryResource') return COMMENTARIES_PANEL_WEBVIEW_TYPE;
  return undefined;
}

/**
 * Applies the admin's col-3 active tab for a project by bringing the matching resource panel to
 * front (PAPI has no direct `focusTab` for extensions; bring-to-front on an existing web view is
 * equivalent). No-op when the setting is unset/unrecognized. Never throws.
 */
export async function focusSharedLayoutDefaultTab(
  papi: typeof PapiBackend,
  projectId: string,
): Promise<void> {
  try {
    const pdp = await papi.projectDataProviders.get('platform.base', projectId);
    const tab = await pdp.getSetting('platformScripture.sharedLayoutDefaultTab');
    const webViewType = webViewTypeForTab(typeof tab === 'string' ? tab : undefined);
    if (!webViewType) return;
    await papi.webViews.openWebView(webViewType, undefined, {
      existingId: '?',
      createNewIfNotFound: false,
      bringToFront: true,
    });
  } catch (e) {
    papi.logger.warn(`focusSharedLayoutDefaultTab failed for ${projectId}: ${getErrorMessage(e)}`);
  }
}
