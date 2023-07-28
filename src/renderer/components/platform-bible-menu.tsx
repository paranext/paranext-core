import Grid from '@mui/material/Grid';
import { MenuItem } from 'papi-components';
import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';

export type PlatformMenuProps = {
  isSupportAndDevelopment?: boolean;
  closeMenu: () => void;
};

export default function PlatformBibleMenu({
  isSupportAndDevelopment = false,
  closeMenu,
}: PlatformMenuProps) {
  const onRestartExtensionHost = () => {
    commandService.sendCommand('platform.restartExtensionHost');
    closeMenu();
  };

  const onExit = () => {
    commandService.sendCommand('platform.quit');
    closeMenu();
  };

  const visitSupportPage = () => {
    window.open('https://support.bible');
    closeMenu();
  };

  function sendCommand(command: string) {
    logger.info(`command:test.echoExtensionHost '${command}'`);
  }

  return (
    <Grid container spacing={0} className="multi-colum-menu" columns={4}>
      <Grid item xs={1}>
        <h3 className="menu">Platform</h3>
        <MenuItem
          className="menu-item"
          isDense
          onClick={() => {
            sendCommand('Download/Install Resources');
            closeMenu();
          }}
        >
          Download/Install Resources...
        </MenuItem>
        <MenuItem
          className="menu-item"
          isDense
          hasDivider
          onClick={() => {
            sendCommand('Open Text Collection');
            closeMenu();
          }}
        >
          Open Text Collection...
        </MenuItem>
        <MenuItem
          className="menu-item"
          isDense
          hasDivider
          onClick={() => {
            sendCommand('Settings');
            closeMenu();
          }}
        >
          Settings...
        </MenuItem>
        {isSupportAndDevelopment ? (
          <MenuItem className="menu-item" isDense onClick={onRestartExtensionHost}>
            Reload Extensions
          </MenuItem>
        ) : undefined}
        <MenuItem className="menu-item" isDense onClick={onExit}>
          Exit
        </MenuItem>
      </Grid>
      <Grid item xs={1}>
        <h3 className="menu">Window</h3>
      </Grid>
      <Grid item xs={1}>
        <h3 className="menu">Layout</h3>
      </Grid>
      <Grid item xs={1}>
        <h3 className="menu">Help</h3>
        <MenuItem className="menu-item" isDense onClick={visitSupportPage}>
          Visit Support.Bible
        </MenuItem>
        <MenuItem className="menu-item" isDense onClick={closeMenu}>
          About Platform.Bible...
        </MenuItem>
      </Grid>
    </Grid>
  );
}
