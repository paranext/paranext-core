import { Toolbar, RefSelector, ScriptureReference } from 'papi-components';
import { handleMenuCommand } from './platform-bible-menu.commands';
import { handleMenuData } from './platform-bible-menu.data';
import './platform-bible-toolbar.css';

export default function PlatformBibleToolbar(props: {
  scrRef: ScriptureReference;
  referenceChanged: (scrRef: ScriptureReference) => void;
}) {
  const { referenceChanged, scrRef } = props;

  return (
    <Toolbar className="toolbar" dataHandler={handleMenuData} commandHandler={handleMenuCommand}>
      <RefSelector handleSubmit={referenceChanged} scrRef={scrRef} />
    </Toolbar>
  );
}
