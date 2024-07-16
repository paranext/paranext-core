import { WebViewProps } from '@papi/core';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
// import { RepeatedWordsInventory } from 'platform-bible-react';
import { CharacterInventory } from 'platform-bible-react';
import { ScriptureReference } from 'platform-bible-utils';
import { INVENTORY_STRING_KEYS, getSetting, getText, setSetting } from './util';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

global.webViewComponent = function CharacterInventoryWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(INVENTORY_STRING_KEYS);
  const [projectId] = useWebViewState('projectId', '');
  const [scriptureRef, setScriptureRef] = useSetting('platform.verseRef', defaultVerseRef);

  return (
    <CharacterInventory
      scriptureReference={scriptureRef}
      setScriptureReference={setScriptureRef}
      localizedStrings={localizedStrings}
      projectId={projectId}
      getSetting={getSetting}
      setSetting={setSetting}
      getText={getText}
    />
  );
};
