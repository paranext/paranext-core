import type PapiBackend from '@papi/backend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Finishes an editor open that a view asked for: once the editor has opened, closes that view, and
 * only then lifts the "Updating project view" cover, so the view is gone before the project shows.
 *
 * A closed view cannot record the project as recently opened, so the project is recorded here
 * instead, after the cover lifts since nobody sees it. When the view could not be closed it is
 * still open and records the project itself.
 *
 * @param papi The PAPI backend handle. Injected for testability.
 * @param opening The editor open in progress
 * @param options.projectId The project being opened
 * @param options.webViewIdToClose The view to close once the editor has opened, or `undefined` to
 *   close nothing
 * @param options.reveal Lifts the cover. Called exactly once, whether or not the open succeeded.
 * @returns What `opening` resolved to
 * @throws What `opening` rejected with, after lifting the cover
 */
export async function finishOpenFromView(
  papi: typeof PapiBackend,
  opening: Promise<string | undefined>,
  {
    projectId,
    webViewIdToClose,
    reveal,
  }: { projectId: string; webViewIdToClose: string | undefined; reveal: () => void },
): Promise<string | undefined> {
  let openedWebViewId: string | undefined;
  try {
    openedWebViewId = await opening;
  } catch (e) {
    reveal();
    throw e;
  }

  let didClose = false;
  if (openedWebViewId !== undefined && webViewIdToClose !== undefined) {
    try {
      didClose = await papi.webViews.closeWebView(webViewIdToClose);
      if (!didClose)
        papi.logger.debug(
          `Web view ${webViewIdToClose} that opened project ${projectId} was already closed`,
        );
    } catch (e) {
      papi.logger.warn(
        `Could not close web view ${webViewIdToClose} after opening project ${projectId}: ${getErrorMessage(e)}`,
      );
    }
  }
  reveal();

  if (didClose) {
    try {
      const recentlyOpenedProjects = await papi.dataProviders.get(
        'platformScripture.recentlyOpenedProjects',
      );
      await recentlyOpenedProjects?.recordProjectOpened(projectId);
    } catch (e) {
      papi.logger.warn(
        `Could not record project ${projectId} as recently opened: ${getErrorMessage(e)}`,
      );
    }
  }
  return openedWebViewId;
}
