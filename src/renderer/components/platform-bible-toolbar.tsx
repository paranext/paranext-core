import Typography from '@mui/material/Typography';
import { Toolbar, RefSelector, ScriptureReference } from 'papi-components';
import standardMenuLayout from './platform-bible-menu.data';
import { HandleMenuCommand } from './platform-bible-menu.commands';
import './platform-bible-toolbar.css';

export default function PlatformBibleToolbar(props: {
  scrRef: ScriptureReference;
  referenceChanged: (scrRef: ScriptureReference) => void;
}) {
  const { referenceChanged } = props;
  const { scrRef } = props;

  return (
    <Toolbar menu={standardMenuLayout} commandHandler={HandleMenuCommand}>
      <Typography className="title" variant="h6" noWrap>
        <RefSelector handleSubmit={referenceChanged} scrRef={scrRef} />
      </Typography>
    </Toolbar>
  );
}
