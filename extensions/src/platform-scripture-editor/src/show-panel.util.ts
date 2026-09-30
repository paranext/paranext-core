import papi, { logger } from '@papi/backend';
import type { OpenWebViewOptions } from '@papi/core';
import { getErrorMessage, includes, LocalizeKey } from 'platform-bible-utils';
import { SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE } from './platform-scripture-editor.utils';

export const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
export const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

const TEXT_COLLECTION_UNAVAILABLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_textCollectionNotOpen%';
const TAB_COULD_NOT_OPEN_KEY: LocalizeKey = '%webView_platformScriptureEditor_tabCouldNotOpen%';

/**
 * What the web view service's error says when no provider is registered for a web view type. The
 * error reaches this module wrapped in a JSON-RPC error message, so it is matched as a substring.
 */
const MISSING_WEB_VIEW_PROVIDER_MESSAGE = 'Cannot find Web View Provider';

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
 * Sends the user a warning notification. Self-catching: not every caller of these PAPI commands
 * awaits or catches their result, and a failed notification-send must not be reported as the
 * command's own failure.
 *
 * @param localizeKey The warning's message
 */
async function warnUser(localizeKey: LocalizeKey): Promise<void> {
  try {
    const message = await papi.localization.getLocalizedString({ localizeKey });
    await papi.notifications.send({ message, severity: 'warning' });
  } catch (e) {
    logger.warn(`Failed to send the ${localizeKey} warning: ${getErrorMessage(e)}`);
  }
}

/**
 * Resolves the project a web view is showing, for a "show/bring to front" command whose only
 * parameter is the triggering editor's web view id.
 *
 * @param webViewId The web view whose project to resolve
 * @returns The web view's project id, or `undefined` if `webViewId` is missing, names no open web
 *   view, or `getOpenWebViewDefinition` could not be answered
 */
export async function getProjectIdOfWebView(
  webViewId: string | undefined,
): Promise<string | undefined> {
  if (!webViewId) return undefined;
  // getOpenWebViewDefinition throws if no window claimed the web view and some window could not be
  // asked. That is not this command's problem to fail over — degrade to "no project id" so a newly
  // opened tab still opens, unlabeled, rather than rejecting the whole show/bring-to-front request.
  try {
    return (await papi.webViews.getOpenWebViewDefinition(webViewId))?.projectId;
  } catch (e) {
    logger.warn(`Could not resolve the project for web view ${webViewId}: ${getErrorMessage(e)}`);
    return undefined;
  }
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
 * {@link showOrCreateTab} for a panel that shows the editor's project, warning the user instead of
 * throwing when the tab cannot be shown.
 *
 * @param webViewType The web view type whose tab to show
 * @param editorWebViewId The scripture editor whose project a newly opened tab shows
 * @returns The shown web view's id, or `undefined` if it could not be shown
 */
async function showProjectPanelTab(
  webViewType: string,
  editorWebViewId: string | undefined,
): Promise<string | undefined> {
  try {
    return await showOrCreateTab(webViewType, () => getProjectIdOfWebView(editorWebViewId));
  } catch (e) {
    logger.warn(`Could not show the ${webViewType} tab: ${getErrorMessage(e)}`);
    await warnUser(TAB_COULD_NOT_OPEN_KEY);
    return undefined;
  }
}

/**
 * Brings the Bible texts tab to the front, opening one for the editor's project if none is open.
 *
 * @param editorWebViewId The scripture editor whose project a newly opened tab shows
 * @returns The Bible texts web view's id, or `undefined` if it could not be shown
 */
export function showBibleTextsTab(
  editorWebViewId: string | undefined,
): Promise<string | undefined> {
  return showProjectPanelTab(BIBLE_TEXTS_PANEL_WEBVIEW_TYPE, editorWebViewId);
}

/**
 * Brings the Commentaries tab to the front, opening one for the editor's project if none is open.
 *
 * @param editorWebViewId The scripture editor whose project a newly opened tab shows
 * @returns The Commentaries web view's id, or `undefined` if it could not be shown
 */
export function showCommentariesTab(
  editorWebViewId: string | undefined,
): Promise<string | undefined> {
  return showProjectPanelTab(COMMENTARIES_PANEL_WEBVIEW_TYPE, editorWebViewId);
}

/**
 * Brings the Text collection tab to the front like its siblings, opening one if it isn't already
 * open. Unlike its siblings, the Text collection's web view provider is only registered while
 * `platformScriptureEditor.enableScriptureTextGrid` was on at startup, so creation can genuinely be
 * unavailable; when it is, this tells the user the feature is unavailable instead of throwing. Any
 * other failure gets its siblings' generic warning. No `projectId` is passed for a newly created
 * tab — the same as the default-layout supplement that creates the tab at startup — because the
 * grid shows multiple projects at once and falls back to inferring one from the scroll group when
 * none is given.
 *
 * @returns The Text collection web view's id, or `undefined` if it could not be shown
 */
export async function showTextCollectionTab(): Promise<string | undefined> {
  try {
    const shownId = await showOrCreateTab(SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE, async () => undefined);
    if (shownId) return shownId;
  } catch (e) {
    const message = getErrorMessage(e);
    if (!includes(message, MISSING_WEB_VIEW_PROVIDER_MESSAGE)) {
      logger.warn(`Could not show the Text collection tab: ${message}`);
      await warnUser(TAB_COULD_NOT_OPEN_KEY);
      return undefined;
    }
    // The feature flag was off at startup — the expected reason creation fails. Log at debug
    // rather than warn since the notification below already tells the user.
    logger.debug(`Text collection tab could not be created: ${message}`);
  }
  await warnUser(TEXT_COLLECTION_UNAVAILABLE_KEY);
  return undefined;
}
