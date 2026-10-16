import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Opens a resource from Home, in the resource viewer.
 *
 * @param projectId The resource's local project id
 */
async function openResource(projectId: string): Promise<void> {
  await papi.commands.sendCommand('platformScriptureEditor.openResourceViewer', projectId);
}

/**
 * Opens a project in the Scripture editor and records it as recently opened.
 *
 * Recorded for projects only, not resources, matching what the title bar's picker lists. Home is
 * the title bar's route to a project that is not in that list yet, so a project opened here has to
 * join it — otherwise the escape hatch for finding a non-recent project never makes it recent.
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
 * Opens a row of Home's list: a resource (`isPublished`) or a project. Never rejects: a failure has
 * been logged, and the user told, by the time this resolves.
 *
 * @param projectId The row's project id
 * @param isPublished Whether the row is a resource
 */
export async function openHomeItem(projectId: string, isPublished: boolean): Promise<void> {
  try {
    if (isPublished) await openResource(projectId);
    else await openProject(projectId);
  } catch (e) {
    await reportCouldNotOpen('Home', projectId, e);
  }
}

/**
 * Logs that an item a user asked to open did not open, and tells them so.
 *
 * @param where Which view the item was opened from, for the log
 * @param projectId The item's project id
 * @param error Why it did not open
 */
export async function reportCouldNotOpen(
  where: string,
  projectId: string,
  error: unknown,
): Promise<void> {
  logger.warn(`${where} could not open ${projectId}: ${getErrorMessage(error)}`);
  try {
    await papi.notifications.send({ severity: 'warning', message: '%resources_couldNotOpen%' });
  } catch (notifyError) {
    logger.warn(
      `${where} could not say ${projectId} did not open: ${getErrorMessage(notifyError)}`,
    );
  }
}
