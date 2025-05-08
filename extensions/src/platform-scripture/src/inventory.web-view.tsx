import { WebViewProps } from '@papi/core';
import { useDataProvider, useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { Scope, usePromise, INVENTORY_STRING_KEYS } from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ProjectSettingTypes } from 'papi-shared-types';
import { SerializedVerseRef } from '@sillsdev/scripture';
import papi, { logger } from '@papi/frontend';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { CharacterInventory } from './checks/inventories/character-inventory.component';
import { RepeatedWordsInventory } from './checks/inventories/repeated-words-inventory.component';
import { MarkerInventory } from './checks/inventories/marker-inventory.component';
import { PunctuationInventory } from './checks/inventories/punctuation-inventory.component';

const VALID_ITEMS_DEFAULT = '';
const INVALID_ITEMS_DEFAULT = '';

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
  scriptureRef: SerializedVerseRef,
  projectId: string,
): Promise<string | undefined> => {
  if (scope === 'book') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Book', projectId);
    return PDP.getBookUSFM(scriptureRef);
  }
  if (scope === 'chapter') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Chapter', projectId);
    return PDP.getChapterUSFM(scriptureRef);
  }
  if (scope === 'verse') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Verse', projectId);
    return PDP.getVerseUSFM(scriptureRef);
  }

  throw new Error('Cannot get scripture for unknown scope');
};

global.webViewComponent = function InventoryWebView({
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => {
      return Array.from(INVENTORY_STRING_KEYS);
    }, []),
  );
  const [webViewType] = useWebViewState('webViewType', '');
  const [verseRef, setVerseRef] = useWebViewScrollGroupScrRef();

  const checkAggregator = useDataProvider('platformScripture.checkAggregator');
  if (checkAggregator && projectId) {
    const invItems = checkAggregator.retrieveInventoryData('RepeatedWord', projectId);
    console.log('invItems', invItems);
  }

  useEffect(() => {
    const retrieveInventoryData = async () => {
      if (checkAggregator && projectId) {
        const invItems = await checkAggregator.retrieveInventoryData('RepeatedWord', projectId);
        console.log('invItems', invItems);
      }
    };

    retrieveInventoryData();
  }, [checkAggregator]);

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
    case 'platformScripture.markersInventory':
      InventoryVariant = MarkerInventory;
      validItemsSetting = 'platformScripture.validMarkers';
      invalidItemsSetting = 'platformScripture.invalidMarkers';
      break;
    case 'platformScripture.punctuationInventory':
      InventoryVariant = PunctuationInventory;
      validItemsSetting = 'platformScripture.validPunctuation';
      invalidItemsSetting = 'platformScripture.invalidPunctuation';
      break;
    default:
      throw new Error(`${webViewType} is not a valid inventory type`);
  }

  const [scope, setScope] = useState<Scope>('book');
  const [text] = usePromise(
    useCallback(
      async () => (projectId ? getText(scope, verseRef, projectId) : ''),
      [scope, verseRef, projectId],
    ),
    useMemo(() => '', []),
  );

  const [validItemsPossiblyError, setValidItems] = useProjectSetting(
    projectId,
    validItemsSetting,
    VALID_ITEMS_DEFAULT,
  );

  const validItems = useMemo(() => {
    if (isPlatformError(validItemsPossiblyError)) {
      logger.warn(`Error getting valid items: ${getErrorMessage(validItemsPossiblyError)}`);
      return VALID_ITEMS_DEFAULT;
    }
    return validItemsPossiblyError;
  }, [validItemsPossiblyError]);

  const [invalidItemsPossiblyError, setInvalidItems] = useProjectSetting(
    projectId,
    invalidItemsSetting,
    INVALID_ITEMS_DEFAULT,
  );

  const invalidItems = useMemo(() => {
    if (isPlatformError(invalidItemsPossiblyError)) {
      logger.warn(`Error getting invalid items: ${getErrorMessage(invalidItemsPossiblyError)}`);
      return INVALID_ITEMS_DEFAULT;
    }
    return invalidItemsPossiblyError;
  }, [invalidItemsPossiblyError]);

  const validItemsArray = useMemo(() => validItems.split(' '), [validItems]);
  const invalidItemsArray = useMemo(() => invalidItems.split(' '), [invalidItems]);

  return (
    <InventoryVariant
      verseRef={verseRef}
      setVerseRef={setVerseRef}
      localizedStrings={localizedStrings}
      approvedItems={validItemsArray}
      onApprovedItemsChange={(items: string[]) => setValidItems?.(items.join(' '))}
      unapprovedItems={invalidItemsArray}
      onUnapprovedItemsChange={(items: string[]) => setInvalidItems?.(items.join(' '))}
      text={text}
      scope={scope}
      onScopeChange={(newScope: Scope) => setScope(newScope)}
      projectId={projectId}
    />
  );
};
