import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { CommandNames } from 'papi-shared-types';
import { getErrorMessage, MenuItemContainingCommand } from 'platform-bible-utils';

/**
 * Helper function to execute a command with error handling
 *
 * @param commandName The command to execute
 * @param commandArg The argument to pass to the command
 * @param originalCommand The original menu command for error context
 * @param tabId The tab ID for error context
 */
async function executeCommandWithErrorHandling(
  commandName: CommandNames | string,
  commandArg: string | undefined,
  originalCommand: string,
  tabId?: string,
) {
  try {
    // Assert the more specific type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await commandService.sendCommand(commandName as CommandNames, commandArg);
  } catch (e) {
    throw new Error(
      `handleMenuCommand error: command: ${originalCommand}, tabId: ${tabId}. ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Run a command from a menu
 *
 * @param command Info about the command to run
 * @param tabId The id of the dock layout tab on which the menu command is being run (if the tab is
 *   a web view, this is the same as the web view id) or `undefined` if run from the top menu
 */
export function handleMenuCommand(command: MenuItemContainingCommand, tabId?: string) {
  switch (command.command) {
    case 'platform.openProjectDialog':
      logger.info(`Open Project Dialog. tabId: ${tabId}`);
      break;
    case 'platform.openDownloadUpdateProjectDialog':
      logger.info(`Download/Update Project Dialog. tabId: ${tabId}`);
      break;
    case 'platform.downloadAndInstallResources':
      logger.info(`TODO: display UI to select resources. tabId: ${tabId}`);
      break;
    case 'platform.openTextCollection':
      logger.info(`TODO: display text collection modal. tabId: ${tabId}`);
      break;
    case 'platform.visitGettingStartedPage':
      executeCommandWithErrorHandling(
        'platform.openWindow',
        'https://studio.paratext.org/start ',
        command.command,
        tabId,
      );
      break;
    case 'platform.visitFAQsPage':
      executeCommandWithErrorHandling(
        'platform.openWindow',
        'https://support.bible/paratext-10-studio',
        command.command,
        tabId,
      );
      break;
    case 'platform.visitFeatureRoadmapPage':
      executeCommandWithErrorHandling(
        'platform.openWindow',
        'https://studio.paratext.org/roadmap',
        command.command,
        tabId,
      );
      break;
    case 'platform.emailDevelopers':
      executeCommandWithErrorHandling(
        'platform.openWindow',
        'mailto:feedback+studio@paratext.org',
        command.command,
        tabId,
      );
      break;
    default:
      executeCommandWithErrorHandling(command.command, tabId, command.command, tabId);
  }
}
