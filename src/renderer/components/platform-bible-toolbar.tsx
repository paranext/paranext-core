import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import logger from '@shared/services/logger.service';
import { Toolbar, BookChapterControl, ScriptureReference } from 'platform-bible-react';
import { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { handleMenuCommand } from './platform-bible-menu.commands';
import provideMenuData from './platform-bible-menu.data';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

/**
 * Providing empty menu data if the software fails to load fully so we can shift click the menu and
 * click Reload Extensions if it fails the first time
 *
 * @param isSupportAndDevelopment
 * @returns
 */
async function getMenuData(isSupportAndDevelopment: boolean): Promise<Localized<MultiColumnMenu>> {
  try {
    return await provideMenuData(isSupportAndDevelopment);
  } catch (e) {
    logger.error(`Could not get platform-bible-toolbar menu data! ${e}`);
    return { columns: {}, groups: {}, items: [] };
  }
}

export default function PlatformBibleToolbar() {
  const [scrRef, setScrRef] = useSetting('platform.verseRef', defaultScrRef);

  const handleReferenceChanged = (newScrRef: ScriptureReference) => {
    setScrRef(newScrRef);
  };

  return (
    <Toolbar className="toolbar" menuProvider={getMenuData} commandHandler={handleMenuCommand}>
      <BookChapterControl scrRef={scrRef} handleSubmit={handleReferenceChanged} />
    </Toolbar>
  );
}
