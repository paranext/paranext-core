import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useDataProvider, useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { ProjectSettingTypes } from 'papi-shared-types';
import { INVENTORY_STRING_KEYS, Scope, usePromise } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { CheckInputRange } from 'platform-scripture';
import { useCallback, useMemo, useState } from 'react';
import { CharacterInventory } from './checks/inventories/character-inventory.component';
import { MarkerInventory } from './checks/inventories/marker-inventory.component';
import { PunctuationInventory } from './checks/inventories/punctuation-inventory.component';
import { RepeatedWordsInventory } from './checks/inventories/repeated-words-inventory.component';

const VALID_ITEMS_DEFAULT = '';
const INVALID_ITEMS_DEFAULT = '';

// This set of check types is a subset of the CheckType enum in Paratext.Data.Checking
type CheckType = 'Character' | 'RepeatedWord' | 'Marker' | 'Punctuation';

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
  let checkId: CheckType;
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

  const [scope, setScope] = useState<Scope>('chapter');

  const checkInputRange: CheckInputRange = useMemo(() => {
    // Default is chapter
    const defaultScrRef: SerializedVerseRef = {
      book: verseRef.book,
      chapterNum: verseRef.chapterNum,
      verseNum: 1,
    };
    const start = { ...defaultScrRef };
    let end: SerializedVerseRef | undefined = { ...defaultScrRef };

    if (scope === 'book') {
      start.chapterNum = 1;
      start.verseNum = 0;
      end = undefined;
    } else if (scope === 'chapter') {
      start.verseNum = 0;
      // Using 999 indicate "end of chapter" per the ScriptureRange docs
      end.verseNum = 999;
    } else if (scope === 'verse') {
      start.verseNum = verseRef.verseNum;
      end.verseNum = verseRef.verseNum;
    }

    return {
      projectId: projectId ?? '',
      start,
      end,
    };
  }, [projectId, scope, verseRef]);

  const checkAggregator = useDataProvider('platformScripture.checkAggregator');

  const [inventoryItems, isLoadingInventoryItems] = usePromise(
    useCallback(async () => {
      if (checkAggregator && projectId) {
        const newInventoryItems = await checkAggregator.retrieveInventoryData(
          checkId,
          projectId,
          checkInputRange,
        );
        if (scope === 'verse') {
          return newInventoryItems.filter((item) => item.verseRef.verseNum === verseRef.verseNum);
        }
        return newInventoryItems;
      }
      return [];
    }, [checkAggregator, projectId, checkId, checkInputRange, scope, verseRef.verseNum]),
    undefined,
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
      areInventoryItemsLoading={inventoryItems === undefined || isLoadingInventoryItems}
    />
  );
};
