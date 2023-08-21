import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { Toolbar, RefSelector, ScriptureReference } from 'papi-components';
import { handleMenuCommand } from './platform-bible-menu.commands';
import { handleMenuData } from './platform-bible-menu.data';
import './platform-bible-toolbar.css';

const defaultScrRef = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

export default function PlatformBibleToolbar() {
  const [scrRef, setScrRef] = useSetting('globalVerseRef', defaultScrRef);

  const handleReferenceChanged = (newScrRef: {
    bookNum: number;
    chapterNum: number;
    verseNum: number;
  }) => {
    setScrRef(newScrRef);
  };

  return (
    <Toolbar className="toolbar" dataHandler={handleMenuData} commandHandler={handleMenuCommand}>
      <RefSelector handleSubmit={handleReferenceChanged} scrRef={scrRef as ScriptureReference} />
    </Toolbar>
  );
}
