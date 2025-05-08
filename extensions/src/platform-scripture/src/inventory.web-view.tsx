import { WebViewProps } from '@papi/core';
import { useDataProvider, useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { Scope, InventoryItem, INVENTORY_STRING_KEYS } from 'platform-bible-react';
import { useEffect, useMemo, useState } from 'react';
import type { ProjectSettingTypes } from 'papi-shared-types';
import { logger } from '@papi/frontend';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { CharacterInventory } from './checks/inventories/character-inventory.component';
import { RepeatedWordsInventory } from './checks/inventories/repeated-words-inventory.component';
import { MarkerInventory } from './checks/inventories/marker-inventory.component';
import { PunctuationInventory } from './checks/inventories/punctuation-inventory.component';

const VALID_ITEMS_DEFAULT = '';
const INVALID_ITEMS_DEFAULT = '';

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

  let InventoryVariant;
  let validItemsSetting: keyof ProjectSettingTypes;
  let invalidItemsSetting: keyof ProjectSettingTypes;
  let checkId: string;
  switch (webViewType) {
    case 'platformScripture.characterInventory':
      InventoryVariant = CharacterInventory;
      validItemsSetting = 'platformScripture.validCharacters';
      invalidItemsSetting = 'platformScripture.invalidCharacters';
      checkId = 'Character';
      break;
    case 'platformScripture.repeatedWordsInventory':
      InventoryVariant = RepeatedWordsInventory;
      validItemsSetting = 'platformScripture.repeatableWords';
      invalidItemsSetting = 'platformScripture.nonRepeatableWords';
      checkId = 'RepeatedWord';
      break;
    case 'platformScripture.markersInventory':
      InventoryVariant = MarkerInventory;
      validItemsSetting = 'platformScripture.validMarkers';
      invalidItemsSetting = 'platformScripture.invalidMarkers';
      checkId = 'Marker';
      break;
    case 'platformScripture.punctuationInventory':
      InventoryVariant = PunctuationInventory;
      validItemsSetting = 'platformScripture.validPunctuation';
      invalidItemsSetting = 'platformScripture.invalidPunctuation';
      checkId = 'Punctuation';
      break;
    default:
      throw new Error(`${webViewType} is not a valid inventory type`);
  }

  const [scope, setScope] = useState<Scope>('book');

  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const retrieveInventoryData = async () => {
      if (checkAggregator && projectId) {
        const newInventoryItems = await checkAggregator.retrieveInventoryData(checkId, projectId);
        setInventoryItems(newInventoryItems);
      }
    };

    retrieveInventoryData();
  }, [checkAggregator, verseRef, scope, projectId, checkId]);

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
      inventoryItems={inventoryItems}
      verseRef={verseRef}
      setVerseRef={setVerseRef}
      localizedStrings={localizedStrings}
      approvedItems={validItemsArray}
      onApprovedItemsChange={(items: string[]) => setValidItems?.(items.join(' '))}
      unapprovedItems={invalidItemsArray}
      onUnapprovedItemsChange={(items: string[]) => setInvalidItems?.(items.join(' '))}
      scope={scope}
      onScopeChange={(newScope: Scope) => setScope(newScope)}
      projectId={projectId}
    />
  );
};
