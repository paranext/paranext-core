import { WebViewProps } from '@papi/core';
import { useLocalizedStrings, useProjectSetting, useSetting } from '@papi/frontend/react';
import { CharacterInventory, usePromise } from 'platform-bible-react';
import { ScriptureReference } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import { getText, INVENTORY_STRING_KEYS } from './util';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

global.webViewComponent = function CharacterInventoryWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(INVENTORY_STRING_KEYS);
  const [projectId] = useWebViewState('projectId', '');
  const [scriptureRef, setScriptureRef] = useSetting('platform.verseRef', defaultVerseRef);
  const [validItems, setValidItems] = useProjectSetting(
    projectId,
    'platformScripture.validCharacters',
    '',
  );
  const [invalidItems, setInvalidItems] = useProjectSetting(
    projectId,
    'platformScripture.invalidCharacters',
    '',
  );
  const [scope, setScope] = useState<string>('');
  const [text] = usePromise(
    useCallback(async () => {
      return getText(scope, scriptureRef, projectId);
    }, [scope, scriptureRef, projectId]),
    useMemo(() => '', []),
  );

  return (
    <CharacterInventory
      scriptureReference={scriptureRef}
      setScriptureReference={setScriptureRef}
      localizedStrings={localizedStrings}
      approvedItems={validItems.split(' ')}
      onApprovedItemsChange={(items: string[]) => {
        if (setValidItems) setValidItems(items.join(' '));
      }}
      unapprovedItems={invalidItems.split(' ')}
      onUnapprovedItemsChange={(items: string[]) => {
        if (setInvalidItems) setInvalidItems(items.join(' '));
      }}
      text={text}
      onScopeChange={(newScope: string) => setScope(newScope)}
    />
  );
};
