import Grid from '@mui/material/Grid';
import { MenuItem } from 'papi-components';
import * as commandService from '@shared/services/command.service';
import logger from 'electron-log';
import './platform-bible-menu.css';

export default function PlatformBibleMenu() {
  const onExit = () => {
    commandService.sendCommand('quit');
  };

  const visitSupportPage = () => {
    window.open('https://support.bible');
  };

  function sendCommand(command: string) {
    logger.info(`command:echoExtensionHost '${command}'`);
  }

  return (
    <Grid container spacing={0} className="multi-colum-menu" columns={4}>
      <Grid item xs={1}>
        <h3 className="menu">Project</h3>
        <MenuItem
          className="menu-item"
          isDense
          onClick={() => {
            sendCommand('Download/Install Resources');
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
        <MenuItem className="menu-item" isDense>
          About Platform.Bible...
        </MenuItem>
      </Grid>
    </Grid>
  );
}
