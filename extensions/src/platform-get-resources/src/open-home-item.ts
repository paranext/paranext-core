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
 * reference tab instead — Bible texts or Commentaries — and is added to this user's own list for
 * the project that tab shows unless the team's list has it. It opens in the resource viewer only
 * when no project is open, and so there is nothing in that column to replace, or when it is of a
 * kind neither tab lists. If the tab could not be shown, nothing else is opened in its place.
 *
 * @param projectId The resource's local project id
 * @throws If the resource could not be opened and the user has not been told
 */
async function openResource(projectId: string): Promise<void> {
  if (await isSimpleMode()) {
    // The command itself never rejects, so a rejection means it was not reached (the editor
    // extension is not loaded yet, say) or PAPI's request timeout elapsed first; that propagates,
    // and the user is told. The resource viewer belongs to the same extension, so it is no fallback.
    const result = await papi.commands.sendCommand(
      'platformScriptureEditor.showResourceInReferencePanel',
      projectId,
    );
    // `notShown`: the command has told the user, and nothing else should open in the tab's place.
    if (result.status !== 'openElsewhere') return;
  }
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
 * Opens a resource the way Home does — in Simple mode, in its reference tab — from another view
 * that lists resources, such as Get Resources. Never rejects: a failure has been logged, and the
 * user told, by the time this resolves.
 *
 * @param where Which view the resource was opened from, for the log
 * @param projectId The resource's local project id
 */
export async function openResourceFrom(where: string, projectId: string): Promise<void> {
  try {
    await openResource(projectId);
  } catch (e) {
    await reportCouldNotOpen(where, projectId, e);
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
