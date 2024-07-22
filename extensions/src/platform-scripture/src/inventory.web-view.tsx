import { WebViewProps } from '@papi/core';
import { useLocalizedStrings, useProjectSetting, useSetting } from '@papi/frontend/react';
import { CharacterInventory, RepeatedWordsInventory, usePromise } from 'platform-bible-react';
import { ScriptureReference } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import type { ProjectSettingTypes } from 'papi-shared-types';
import { getText, INVENTORY_STRING_KEYS } from './util';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

global.webViewComponent = function InventoryWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(INVENTORY_STRING_KEYS);
  const [projectId] = useWebViewState('projectId', '');
  const [webViewType] = useWebViewState('webViewType', '');
  const [scriptureRef, setScriptureRef] = useSetting('platform.verseRef', defaultVerseRef);

  let InventoryVariant;
  let validItemsSetting: keyof ProjectSettingTypes;
  let invalidItemsSetting: keyof ProjectSettingTypes;
  if (webViewType === 'platformScripture.characterInventory') {
    InventoryVariant = CharacterInventory;
    validItemsSetting = 'platformScripture.validCharacters';
    invalidItemsSetting = 'platformScripture.invalidCharacters';
  } else if (webViewType === 'platformScripture.repeatedWordsInventory') {
    InventoryVariant = RepeatedWordsInventory;
    validItemsSetting = 'platformScripture.repeatableWords';
    invalidItemsSetting = 'platformScripture.nonRepeatableWords';
  } else {
    throw new Error(`${webViewType} is not a valid inventory type`);
  }

  const [validItems, setValidItems] = useProjectSetting(projectId, validItemsSetting, '');
  const [invalidItems, setInvalidItems] = useProjectSetting(projectId, invalidItemsSetting, '');
  const [scope, setScope] = useState<string>('');
  const [text] = usePromise(
    useCallback(async () => {
      return getText(scope, scriptureRef, projectId);
    }, [scope, scriptureRef, projectId]),
    useMemo(() => '', []),
  );

  return (
    <InventoryVariant
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
