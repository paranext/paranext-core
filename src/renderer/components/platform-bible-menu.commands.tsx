import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';
import { Command } from 'papi-components';

export function VisitPage(url: string) {
  window.open(url);
}

export function HandleMenuCommand(command: Command) {
  switch (command.command) {
    case 'platformBible.downloadAndInstallResources':
      logger.info(`TODO: display UI to select resources'`);
      break;
    case 'platformBible.quit':
      commandService.sendCommand<[number], void>('quit', 1);
      break;
    default:
      logger.info(`command:echoExtensionHost '${command}'`);
      break;
  }
}
