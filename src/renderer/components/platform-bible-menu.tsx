import { GridMenu } from 'papi-components';
import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';

export default function PlatformBibleMenu() {
  const onExit = () => {
    commandService.sendCommand<[number], void>('quit', 1);
  };

  const visitSupportPage = () => {
    window.open('https://support.bible');
  };

  function sendCommand(command: string) {
    logger.info(`command:echoExtensionHost '${command}'`);
  }

  // TODO: Figure out how to pass "children" so the menu items can have text, icons, etc.

  return (
    <GridMenu
      columns={[
        {
          name: 'Project',
          items: [
            {
              // name:'Download/Install Resources...'
              onClick: () => {
                sendCommand('Download/Install Resources');
              },
            },
            {
              // name:'Open Text Collection...'
              hasDivider: true,
              onClick: () => {
                sendCommand('Open Text Collection');
              },
            },
            {
              // name:'Settings...'
              hasDivider: true,
              onClick: () => {
                sendCommand('Settings');
              },
            },
            {
              // name:'Exit'
              hasDivider: true,
              onClick: () => {
                onExit();
              },
            },
          ],
        },
        {
          name: 'Window',
          items: [],
        },
        {
          name: 'Layout',
          items: [],
        },
        {
          name: 'Help',
          items: [
            {
              // name:'Visit Support.Bible'
              onClick: () => {
                visitSupportPage();
              },
            },
            {
              // name:'About Platform.Bible...'
              onClick: () => {},
            },
          ],
        },
      ]}
    />
  );
}
