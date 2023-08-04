import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';
import { Command } from 'papi-components';
import { CommandNames } from 'papi-commands';

export function VisitPage(url: string) {
  window.open(url);
}

export function HandleMenuCommand(command: Command) {
  switch (command.command) {
    case 'platformBible.downloadAndInstallResources':
      logger.info(`TODO: display UI to select resources'`);
      break;
    case 'platformBible.openTextCollection':
      logger.info(`TODO: display text collection modal'`);
      break;
    case 'platformBible.settings':
      logger.info(`TODO: display settings'`);
      break;
    case 'platformBible.visitSupportPage':
      VisitPage('https://support.bible');
      break;
    case 'platformBible.about':
      logger.info(`TODO: display about'`);
      break;
    default:
      commandService.sendCommand(command.command as CommandNames);
  }
}
