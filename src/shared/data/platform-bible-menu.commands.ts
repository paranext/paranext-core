import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { Command } from 'platform-bible-react';
import { CommandNames } from 'papi-shared-types';

/**
 * Run a command from a menu
 *
 * @param command Info about the command to run
 * @param tabId The id of the dock layout tab on which the menu command is being run (if the tab is
 *   a web view, this is the same as the web view id) or `undefined` if run from the top menu
 */
export default function handleMenuCommand(command: Command, tabId?: string) {
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
    case 'platform.visitSupportPage':
      (async () => {
        try {
          // Assert the more specific type.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          await commandService.sendCommand('platform.openWindow', 'https://support.bible');
        } catch (e) {
          throw new Error(
            `handleMenuCommand error: command: ${command.command}, tabId: ${tabId}. ${e}`,
          );
        }
      })();
      break;
    case 'platform.about':
      logger.info(`TODO: display about. tabId: ${tabId}`);
      break;
    default:
      (async () => {
        try {
          // Assert the more specific type.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          await commandService.sendCommand(command.command as CommandNames, tabId);
        } catch (e) {
          throw new Error(
            `handleMenuCommand error: command: ${command.command}, tabId: ${tabId}. ${e}`,
          );
        }
      })();
  }
}
