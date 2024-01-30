import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { Toolbar, RefSelector, ScriptureReference, Button } from 'platform-bible-react';
import menuStoreService from '@shared/services/menu-store.service';
import logger from '@shared/services/logger.service';
import { useData } from '@renderer/hooks/papi-hooks';
import { handleMenuCommand } from './platform-bible-menu.commands';
import { handleMenuData } from './platform-bible-menu.data';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

export default function PlatformBibleToolbar() {
  const [mainContent] = useData(menuStoreService.name).MenuData('mainMenu', {});

  logger.warn('MENU STORE TEST', JSON.stringify(mainContent));

  const [scrRef, setScrRef, resetScrRef] = useSetting('platform.verseRef', defaultScrRef);

  const handleReferenceChanged = (newScrRef: ScriptureReference) => {
    setScrRef(newScrRef);
  };

  return (
    <Toolbar className="toolbar" dataHandler={handleMenuData} commandHandler={handleMenuCommand}>
      <RefSelector handleSubmit={handleReferenceChanged} scrRef={scrRef} />
      <Button
        onClick={() => {
          resetScrRef();
        }}
      >
        Reset
      </Button>
    </Toolbar>
  );
}
