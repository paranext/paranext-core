import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Whether the app is in Simple mode, read when it is needed so a mode switch is never missed. An
 * unreadable setting counts as Power mode, which opens the resource the way Home always has.
 */
async function isSimpleMode(): Promise<boolean> {
  try {
    return (await papi.settings.get('platform.interfaceMode')) === 'simple';
  } catch (e) {
    logger.warn(`Home could not read the interface mode: ${getErrorMessage(e)}`);
    return false;
  }
}

/**
 * Opens a resource from Home.
 *
 * Simple mode's middle column only ever shows the project, so there a resource goes to its
 * reference tab instead — Bible texts or Commentaries — added to this user's own list for the
 * project that tab shows. Only with no project open, and so nothing in that column to replace, does
 * it open in the resource viewer. If the tab could not be shown, the user has been told and nothing
 * else is opened in its place.
 *
 * @param projectId The resource's local project id
 */
async function openResource(projectId: string): Promise<void> {
  if (await isSimpleMode()) {
    let shownWebViewId: string | undefined;
    try {
      shownWebViewId = await papi.commands.sendCommand(
        'platformScriptureEditor.showResourceInReferencePanel',
        projectId,
      );
    } catch (e) {
      logger.warn(
        `Home could not show resource ${projectId} in its reference tab: ${getErrorMessage(e)}`,
      );
      return;
    }
    if (shownWebViewId) return;
  }
  await papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId);
}

/**
 * Opens a project in the Scripture editor and records it as recently opened.
 *
 * Recorded for editable projects only, matching what the title bar's picker lists. Home is the
 * title bar's route to a project that is not in that list yet, so a project opened here has to join
 * it — otherwise the escape hatch for finding a non-recent project never makes it recent.
 *
 * @param projectId The project's id
 */
async function openProject(projectId: string): Promise<void> {
  await papi.commands.sendCommand('platformScriptureEditor.openScriptureEditor', projectId);
  try {
    const recentlyOpenedProjects = await papi.dataProviders.get(
      'platformScripture.recentlyOpenedProjects',
    );
    await recentlyOpenedProjects?.recordProjectOpened(projectId);
  } catch (e) {
    // The project did open; failing to remember it is not worth reporting to the user.
    logger.warn(
      `Home could not record project ${projectId} as recently opened: ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Opens a row of Home's list: a resource (`isPublished`) or a project. Never rejects: Home does not
 * await it, and a failure has already been logged by the time this resolves.
 *
 * @param projectId The row's project id
 * @param isPublished Whether the row is a resource
 */
export async function openHomeItem(projectId: string, isPublished: boolean): Promise<void> {
  try {
    if (isPublished) await openResource(projectId);
    else await openProject(projectId);
  } catch (e) {
    logger.warn(`Home could not open ${projectId}: ${getErrorMessage(e)}`);
  }
}
