import Grid from '@mui/material/Grid';
import { MenuItem } from 'papi-components';
import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';

export type PlatformMenuProps = {
  closeMenu: () => void;
};

export default function PlatformBibleMenu({ closeMenu }: PlatformMenuProps) {
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
