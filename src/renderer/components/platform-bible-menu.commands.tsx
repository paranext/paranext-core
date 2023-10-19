import * as commandService from '@shared/services/command.service';
import logger from '@shared/services/logger.service';
import { Command } from 'papi-components';
import { CommandNames } from 'papi-shared-types';

export function VisitPage(url: string) {
  window.open(url);
}

export function handleMenuCommand(command: Command) {
  switch (command.command) {
    case 'platform.openProjectDialog':
      logger.info(`Open Project Dialog`);
      break;
    case 'platform.openDownloadUpdateProjectDialog':
      logger.info(`Download/Update Project Dialog`);
      break;
    case 'platform.downloadAndInstallResources':
      logger.info(`TODO: display UI to select resources'`);
      break;
    case 'platform.openTextCollection':
      logger.info(`TODO: display text collection modal'`);
      break;
    case 'platform.settings':
      logger.info(`TODO: display settings'`);
      break;
    case 'platform.visitSupportPage':
      VisitPage('https://support.bible');
      break;
    case 'platform.about':
      logger.info(`TODO: display about'`);
      break;
    default:
      // Assert the more specific type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      commandService.sendCommand(command.command as CommandNames);
  }
}
