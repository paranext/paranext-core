import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
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

  return (
    <Grid container spacing={0} className="multi-colum-menu" columns={4}>
      <Grid item xs={1}>
        <h3 className="menu">Project</h3>
        <MenuItem
          className="menu-item"
          dense
          onClick={() => {
            sendCommand('Download/Install Resources');
          }}
          sx={{
            lineHeight: 0.8,
          }}
        >
          Download/Install Resources...
        </MenuItem>
        <MenuItem
          className="menu-item"
          dense
          divider
          onClick={() => {
            sendCommand('Open Text Collection');
          }}
        >
          Open Text Collection...
        </MenuItem>
        <MenuItem
          className="menu-item"
          dense
          divider
          onClick={() => {
            sendCommand('Settings');
          }}
        >
          Settings...
        </MenuItem>
        <MenuItem className="menu-item" dense onClick={onExit}>
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
        <MenuItem className="menu-item" dense onClick={visitSupportPage}>
          Visit Support.Bible
        </MenuItem>
        <MenuItem className="menu-item" dense>
          About Platform.Bible...
        </MenuItem>
      </Grid>
    </Grid>
  );
}
