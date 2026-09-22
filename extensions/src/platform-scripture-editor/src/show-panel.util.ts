import papi, { logger } from '@papi/backend';
import type { OpenWebViewOptions } from '@papi/core';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

const TEXT_COLLECTION_UNAVAILABLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_textCollectionNotOpen%';

/** Options for opening a fresh tab of a panel type this module manages. */
interface NewPanelTabOptions extends OpenWebViewOptions {
  projectId?: string;
}

/**
 * Brings the first open web view of `webViewType` to the front, the way clicking its tab would.
 * Opens nothing and creates nothing if none is open.
 *
 * @param webViewType The web view type whose tab to raise
 * @returns The raised web view's id, or `undefined` if none is open
 */
function raiseExistingTab(webViewType: string): Promise<string | undefined> {
  return papi.webViews.openWebView(webViewType, undefined, {
    existingId: '?',
    createNewIfNotFound: false,
    bringToFront: true,
  });
}

/**
 * Brings the first open web view of `webViewType` to the front, the way clicking its tab would, or
 * opens one in a new tab if none is open. An open tab is never reloaded, so it keeps its scroll
 * position and any in-progress input.
 *
 * @param webViewType The web view type whose tab to show
 * @param projectIdForNewTab Resolves the project a newly created tab should show; only called when
 *   no tab is open
 * @returns The shown web view's id, or `undefined` if it could not be shown
 */
export async function showOrCreateTab(
  webViewType: string,
  projectIdForNewTab: () => Promise<string | undefined>,
): Promise<string | undefined> {
  const existingId = await raiseExistingTab(webViewType);
  if (existingId) return existingId;

  const newTabOptions: NewPanelTabOptions = { projectId: await projectIdForNewTab() };
  return papi.webViews.openWebView(webViewType, { type: 'tab' }, newTabOptions);
}

/**
 * Brings the Text collection tab to the front like its siblings, opening one if it isn't already
 * open. Unlike its siblings, the Text collection's web view provider is only registered while
 * `platformScriptureEditor.enableScriptureTextGrid` was on at startup, so creation can genuinely be
 * unavailable; when it is, this warns the user instead of throwing. No `projectId` is passed for a
 * newly created tab — the same as the default-layout supplement that creates the tab at startup —
 * because the grid shows multiple projects at once and falls back to inferring one from the scroll
 * group when none is given.
 *
 * @returns The Text collection web view's id, or `undefined` if it could not be shown
 */
export async function showTextCollectionTab(): Promise<string | undefined> {
  let shownId: string | undefined;
  try {
    shownId = await showOrCreateTab(SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE, async () => undefined);
  } catch (e) {
    // No provider is registered for this type when the feature flag was off at startup — the
    // expected reason creation fails. Log at debug rather than warn since the notification below
    // already tells the user.
    logger.debug(`Text collection tab could not be created: ${getErrorMessage(e)}`);
  }
  if (shownId) return shownId;

  // Self-catching: not every caller of this PAPI command awaits or catches its result, and a
  // failed notification-send must not be reported as this command's own failure.
  try {
    const message = await papi.localization.getLocalizedString({
      localizeKey: TEXT_COLLECTION_UNAVAILABLE_KEY,
    });
    await papi.notifications.send({ message, severity: 'warning' });
  } catch (e) {
    logger.warn(`Failed to warn that Text collection is unavailable: ${getErrorMessage(e)}`);
  }
  return undefined;
}
