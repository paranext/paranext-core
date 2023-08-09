import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';
import { Command } from 'papi-components';
import { CommandNames } from 'papi-commands';

export function VisitPage(url: string) {
  window.open(url);
}

export function handleMenuCommand(command: Command) {
  switch (command.command) {
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
      commandService.sendCommand(command.command as CommandNames);
  }
}
