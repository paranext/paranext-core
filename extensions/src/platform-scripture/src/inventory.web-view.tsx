import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectSetting } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { INVENTORY_STRING_KEYS, Scope } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { InventoryInputRange, ItemizedInventoryItem } from 'platform-scripture';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { CharacterInventory } from './checks/inventories/character-inventory.component';
import { MarkerInventory } from './checks/inventories/marker-inventory.component';
import { PunctuationInventory } from './checks/inventories/punctuation-inventory.component';
import { RepeatedWordsInventory } from './checks/inventories/repeated-words-inventory.component';
import { useInventory } from './hooks/use-inventory';

const VALID_ITEMS_DEFAULT = '';
const INVALID_ITEMS_DEFAULT = '';

/** Subset of CheckType enum from Paratext.Data.Checking */
type CheckType = 'Character' | 'RepeatedWord' | 'Marker' | 'Punctuation';

/** Represents an occurrence item for display in the occurrences table */
type InventoryItemOccurrence = {
  /** Scripture reference where the occurrence is found */
  reference: SerializedVerseRef;
  /** Text content containing the occurrence */
  text: string;
};

/** Configuration mapping web view types to their corresponding components and check IDs */
const INVENTORY_TYPE_CONFIG = {
  'platformScripture.characterInventory': {
    component: CharacterInventory,
    checkId: 'Character' satisfies CheckType,
    validItemsSetting: 'platformScripture.validCharacters',
    invalidItemsSetting: 'platformScripture.invalidCharacters',
  },
  'platformScripture.repeatedWordsInventory': {
    component: RepeatedWordsInventory,
    checkId: 'RepeatedWord' satisfies CheckType,
    validItemsSetting: 'platformScripture.repeatableWords',
    invalidItemsSetting: 'platformScripture.nonRepeatableWords',
  },
  'platformScripture.markersInventory': {
    component: MarkerInventory,
    checkId: 'Marker' satisfies CheckType,
    validItemsSetting: 'platformScripture.validMarkers',
    invalidItemsSetting: 'platformScripture.invalidMarkers',
  },
  'platformScripture.punctuationInventory': {
    component: PunctuationInventory,
    checkId: 'Punctuation' satisfies CheckType,
    validItemsSetting: 'platformScripture.validPunctuation',
    invalidItemsSetting: 'platformScripture.invalidPunctuation',
  },
} as const;

type InventoryWebViewType = keyof typeof INVENTORY_TYPE_CONFIG;

/**
 * Creates a scripture range based on the current verse reference and scope.
 *
 * @param verseRef - Current verse reference
 * @param scope - Scope of analysis ('verse', 'chapter', or 'book')
 * @param projectId - Project identifier
 * @returns Formatted inventory input range for the data provider
 */
function createInventoryInputRange(
  verseRef: SerializedVerseRef,
  scope: Scope,
  projectId: string,
): InventoryInputRange {
  const start: SerializedVerseRef = {
    book: verseRef.book,
    chapterNum: verseRef.chapterNum,
    verseNum: verseRef.verseNum,
  };

  let end: SerializedVerseRef | undefined = { ...start };

  // Using 999 to indicate "end of chapter" and "end of book" per ScriptureRange docs
  switch (scope) {
    case 'book':
      start.chapterNum = 1;
      start.verseNum = 0;
      end.chapterNum = 999;
      end.verseNum = 999;
      break;
    case 'chapter':
      start.verseNum = 0;
      end.verseNum = 999;
      break;
    case 'verse':
      end = undefined; // Single verse, no end range needed
      break;
    default:
      throw new Error(`Unsupported scope: ${scope}`);
  }

  return {
    projectId,
    start,
    end,
  };
}

/**
 * Formats raw inventory occurrences for display in the occurrences table.
 *
 * @param occurrences - Raw occurrence data from the inventory service
 * @returns Formatted occurrences with reference and text fields
 */
function formatOccurrencesForDisplay(
  occurrences: ItemizedInventoryItem[],
): InventoryItemOccurrence[] {
  return occurrences.map((occurrence) => ({
    reference: occurrence.location.verseRef,
    text: occurrence.sourceText,
  }));
}

/**
 * Creates a stable inventory input range for the given verses reference, scope, and project
 * identifier.
 *
 * @param versesRef - Current verses reference
 * @param scope - Scope of analysis ('verse', 'chapter', or 'book')
 * @param projectId - Project identifier
 * @returns Formatted inventory input range and a stable verses reference for the given scope
 */
function useInventoryInputRange(
  verseRef: SerializedVerseRef,
  scope: Scope,
  projectId: string | undefined,
) {
  const dependencies = useMemo(
    () => ({
      projectId,
      scope,
      book: verseRef.book,
      chapterNum: verseRef.chapterNum,
      verseNum: verseRef.verseNum,
    }),
    // Leave out verseRef to avoid unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      projectId,
      scope,
      verseRef.book,
      // Always include chapterNum, but use stable value for 'book' scope
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scope === 'book' ? 1 : verseRef.chapterNum,
      // Always include verseNum, but use stable value for 'book' and 'chapter' scope
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scope === 'verse' ? verseRef.verseNum : 1,
    ],
  );

  const inventoryInputRange = useMemo(() => {
    return createInventoryInputRange(verseRef, scope, projectId ?? '');
    // Defining custom dependencies above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);

  const stableVerseRefForScope = useMemo(() => {
    switch (scope) {
      case 'book':
        return { book: verseRef.book, chapterNum: 1, verseNum: 1 };
      case 'chapter':
        return { book: verseRef.book, chapterNum: verseRef.chapterNum, verseNum: 1 };
      case 'verse':
        return verseRef;
      default:
        return verseRef;
    }
    // Defining custom dependencies above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependencies]);

  return { inventoryInputRange, stableVerseRefForScope };
}

/** Checks if the given type is a valid inventory web view type. */
function isValidInventoryWebViewType(type: string): type is InventoryWebViewType {
  return type in INVENTORY_TYPE_CONFIG;
}

/**
 * Main inventory web view component that handles different types of scripture inventories
 * (characters, repeated words, markers, punctuation). Provides functionality for viewing inventory
 * summaries, loading detailed occurrences, and managing item approval status.
 */
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
  const [scope, setScope] = useState<Scope>('chapter');

  const {
    component: InventoryComponent,
    checkId,
    validItemsSetting,
    invalidItemsSetting,
  } = useMemo(() => {
    // Validate and get inventory configuration
    if (!webViewType || !isValidInventoryWebViewType(webViewType)) {
      throw new Error(`"${webViewType}" is not a valid inventory type`);
    }
    return INVENTORY_TYPE_CONFIG[webViewType];
  }, [webViewType]);

  const { inventoryInputRange, stableVerseRefForScope } = useInventoryInputRange(
    verseRef,
    scope,
    projectId,
  );

  const {
    inventoryItems,
    isLoading: areInventoryItemsLoading,
    getItemOccurrences,
    cleanup,
  } = useInventory(checkId, inventoryInputRange, projectId);

  useEffect(() => {
    return () => {
      if (cleanup) {
        // Don't await - React cleanup must be synchronous
        cleanup().catch((error) => {
          logger.warn('Error during inventory cleanup:', error);
        });
      }
    };
  }, [cleanup]);

  const [inventoryItemsWithOccurrences, setInventoryItemsWithOccurrences] = useState<{
    [itemKey: string]: InventoryItemOccurrence[];
  }>({});

  // Use project settings for approved/unapproved items
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

  const approvedItems = useMemo(() => validItems.split(' '), [validItems]);
  const unapprovedItems = useMemo(() => invalidItems.split(' '), [invalidItems]);

  /**
   * Handles item selection by loading detailed occurrences for the selected item. Uses caching to
   * avoid reloading already-fetched occurrence data.
   */
  const handleItemSelected = useCallback(
    async (itemKey: string) => {
      // Skip if occurrences already loaded for this item
      if (inventoryItemsWithOccurrences[itemKey]) {
        return;
      }

      try {
        const rawOccurrences = await getItemOccurrences(itemKey);
        const formattedOccurrences = formatOccurrencesForDisplay(rawOccurrences);

        setInventoryItemsWithOccurrences((prev) => ({
          ...prev,
          [itemKey]: formattedOccurrences,
        }));
      } catch (error) {
        logger.error(`Error loading occurrences for "${itemKey}": ${getErrorMessage(error)}`);
      }
    },
    [getItemOccurrences, inventoryItemsWithOccurrences],
  );

  /** Handles changes to approved items by updating the project setting. */
  const handleApprovedItemsChange = useCallback(
    async (items: string[]) => {
      try {
        await setValidItems?.(items.join(' '));
      } catch (error) {
        logger.error(`Error updating approved items: ${getErrorMessage(error)}`);
      }
    },
    [setValidItems],
  );

  /** Handles changes to unapproved items by updating the project setting. */
  const handleUnapprovedItemsChange = useCallback(
    async (items: string[]) => {
      try {
        await setInvalidItems?.(items.join(' '));
      } catch (error) {
        logger.error(`Error updating unapproved items: ${getErrorMessage(error)}`);
      }
    },
    [setInvalidItems],
  );

  /** Transform inventory items to include loaded occurrence data for the UI components. */
  const enhancedInventoryItems = useMemo(
    () =>
      inventoryItems
        .filter((item) => item.count > 0)
        .map((item) => {
          const itemKey = String(item.key);

          // Calculate status based on approved/unapproved arrays
          let status: 'approved' | 'unapproved' | 'unknown' = 'unknown';
          if (approvedItems.includes(itemKey)) {
            status = 'approved';
          } else if (unapprovedItems.includes(itemKey)) {
            status = 'unapproved';
          }

          return {
            key: item.key,
            count: item.count,
            status,
            occurrences: inventoryItemsWithOccurrences[itemKey] || [],
          };
        }),
    [inventoryItems, inventoryItemsWithOccurrences, approvedItems, unapprovedItems],
  );

  return (
    <InventoryComponent
      inventoryItems={enhancedInventoryItems}
      verseRef={stableVerseRefForScope}
      setVerseRef={setVerseRef}
      localizedStrings={localizedStrings}
      approvedItems={approvedItems}
      onApprovedItemsChange={handleApprovedItemsChange}
      unapprovedItems={unapprovedItems}
      onUnapprovedItemsChange={handleUnapprovedItemsChange}
      scope={scope}
      onScopeChange={setScope}
      projectId={projectId}
      areInventoryItemsLoading={areInventoryItemsLoading}
      onItemSelected={handleItemSelected}
    />
  );
};
