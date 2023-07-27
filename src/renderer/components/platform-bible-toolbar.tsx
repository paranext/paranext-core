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

  // eslint-disable-next-line no-console
  console.log(`Platform.bible ref: ${scrRef.bookNum} ${scrRef.chapterNum}:${scrRef.verseNum}`);

  return (
    <Toolbar menu={standardMenuLayout} commandHandler={HandleMenuCommand}>
      <RefSelector handleSubmit={referenceChanged} scrRef={scrRef} />
    </Toolbar>
  );
}
