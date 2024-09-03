import { WebViewProps } from '@papi/core';
import { useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { Scope, usePromise, INVENTORY_STRING_KEYS } from 'platform-bible-react';
import { ScriptureReference } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import type { ProjectSettingTypes } from 'papi-shared-types';
import { VerseRef } from '@sillsdev/scripture';
import papi from '@papi/frontend';
import CharacterInventory from './character-inventory.component';
import RepeatedWordsInventory from './repeated-words-inventory.component';

/**
 * Get scripture text for the provided scope and reference for the specified projectId
 *
 * @param scope Scope of text. Can be 'book', 'chapter' or 'verse'.
 * @param scriptureRef Reference to requested part of scripture
 * @param projectId Id of the project from which the scripture is requested
 * @returns Promise of scripture text, that can either resolve to a string or undefined
 * @throws If the provided scope does not match any of the allowed values
 */
const getText = async (
  scope: Scope,
  scriptureRef: ScriptureReference,
  projectId: string,
): Promise<string | undefined> => {
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

global.webViewComponent = function InventoryWebView({
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(INVENTORY_STRING_KEYS);
    }, []),
  );
  const [projectId] = useWebViewState('projectId', '');
  const [webViewType] = useWebViewState('webViewType', '');
  const [scriptureRef, setScriptureRef] = useWebViewScrollGroupScrRef();

  let InventoryVariant;
  let validItemsSetting: keyof ProjectSettingTypes;
  let invalidItemsSetting: keyof ProjectSettingTypes;
  switch (webViewType) {
    case 'platformScripture.characterInventory':
      InventoryVariant = CharacterInventory;
      validItemsSetting = 'platformScripture.validCharacters';
      invalidItemsSetting = 'platformScripture.invalidCharacters';
      break;
    case 'platformScripture.repeatedWordsInventory':
      InventoryVariant = RepeatedWordsInventory;
      validItemsSetting = 'platformScripture.repeatableWords';
      invalidItemsSetting = 'platformScripture.nonRepeatableWords';
      break;
    default:
      throw new Error(`${webViewType} is not a valid inventory type`);
  }

  const [validItems, setValidItems] = useProjectSetting(projectId, validItemsSetting, '');
  const [invalidItems, setInvalidItems] = useProjectSetting(projectId, invalidItemsSetting, '');
  const [scope, setScope] = useState<Scope>('book');
  const [text] = usePromise(
    useCallback(
      async () => getText(scope, scriptureRef, projectId),
      [scope, scriptureRef, projectId],
    ),
    useMemo(() => '', []),
  );

  const validItemsArray = useMemo(() => validItems.split(' '), [validItems]);
  const invalidItemsArray = useMemo(() => invalidItems.split(' '), [invalidItems]);

  return (
    <InventoryVariant
      scriptureReference={scriptureRef}
      setScriptureReference={setScriptureRef}
      localizedStrings={localizedStrings}
      approvedItems={validItemsArray}
      onApprovedItemsChange={(items: string[]) => setValidItems?.(items.join(' '))}
      unapprovedItems={invalidItemsArray}
      onUnapprovedItemsChange={(items: string[]) => setInvalidItems?.(items.join(' '))}
      text={text}
      scope={scope}
      onScopeChange={(newScope: Scope) => setScope(newScope)}
    />
  );
};
