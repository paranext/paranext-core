import { WebViewProps } from '@papi/core';
import { useLocalizedStrings, useProjectSetting, useSetting } from '@papi/frontend/react';
import { usePromise, INVENTORY_STRING_KEYS } from 'platform-bible-react';
import { ScriptureReference } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import type { ProjectSettingTypes } from 'papi-shared-types';
import { VerseRef } from '@sillsdev/scripture';
import papi from '@papi/frontend';
import CharacterInventory from './character-inventory.component';
import RepeatedWordsInventory from './repeated-words-inventory.component';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

const getText = async (scope: string, scriptureRef: ScriptureReference, projectId: string) => {
  const verseRef = new VerseRef(
    scriptureRef.bookNum,
    scriptureRef.chapterNum,
    scriptureRef.verseNum,
  );

  if (scope === 'book') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Book', projectId);
    return PDP.getBookUSFM(verseRef);
  }
  if (scope === 'chapter') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Chapter', projectId);
    return PDP.getChapterUSFM(verseRef);
  }
  if (scope === 'verse') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Verse', projectId);
    return PDP.getVerseUSFM(verseRef);
  }

  throw new Error('Cannot get scripture for unknown scope');
};

global.webViewComponent = function InventoryWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(Array.from(INVENTORY_STRING_KEYS));
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
  const [scope, setScope] = useState<string>('book');
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
      scope={scope}
      onScopeChange={(newScope: string) => setScope(newScope)}
    />
  );
};
