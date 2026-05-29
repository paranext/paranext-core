import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectData, useProjectSetting } from '@papi/frontend/react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { INVENTORY_STRING_KEYS, Scope } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import type { InventoryInputRange, ItemizedInventoryItem } from 'platform-scripture';
import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import {
  CharacterInventory,
  CHARACTER_INVENTORY_STRING_KEYS,
} from './checks/inventories/character-inventory.component';
import {
  MarkerInventory,
  MARKER_INVENTORY_STRING_KEYS,
} from './checks/inventories/marker-inventory.component';
import {
  PunctuationInventory,
  PUNCTUATION_INVENTORY_STRING_KEYS,
} from './checks/inventories/punctuation-inventory.component';
import {
  RepeatedWordsInventory,
  REPEATED_WORDS_INVENTORY_STRING_KEYS,
} from './checks/inventories/repeated-words-inventory.component';
import { useInventory } from './hooks/use-inventory';

const VALID_ITEMS_DEFAULT = '';
const INVALID_ITEMS_DEFAULT = '';
const MARKER_NAMES_DEFAULT: string[] = [];

/**
 * Subset of CheckType enum from Paratext.Data.Checking.
 *
 * Note: `'MixexCapitalization'` preserves the PT9 `CheckType.InternalValue` misspelling verbatim;
 * it is the on-wire identity that round-trips with PT9-touched projects and must not be
 * "corrected".
 */
type CheckType = 'Character' | 'RepeatedWord' | 'Marker' | 'Punctuation' | 'MixexCapitalization';

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
    checkId: 'Character' satisfies CheckType,
    validItemsSetting: 'platformScripture.validCharacters',
    invalidItemsSetting: 'platformScripture.invalidCharacters',
    typeStringKeys: CHARACTER_INVENTORY_STRING_KEYS,
  },
  'platformScripture.repeatedWordsInventory': {
    checkId: 'RepeatedWord' satisfies CheckType,
    validItemsSetting: 'platformScripture.repeatableWords',
    invalidItemsSetting: 'platformScripture.nonRepeatableWords',
    typeStringKeys: REPEATED_WORDS_INVENTORY_STRING_KEYS,
  },
  'platformScripture.markersInventory': {
    checkId: 'Marker' satisfies CheckType,
    validItemsSetting: 'platformScripture.validMarkers',
    invalidItemsSetting: 'platformScripture.invalidMarkers',
    typeStringKeys: MARKER_INVENTORY_STRING_KEYS,
  },
  'platformScripture.punctuationInventory': {
    checkId: 'Punctuation' satisfies CheckType,
    validItemsSetting: 'platformScripture.validPunctuation',
    invalidItemsSetting: 'platformScripture.invalidPunctuation',
    typeStringKeys: PUNCTUATION_INVENTORY_STRING_KEYS,
  },
  'platformScripture.mixedCapitalizationInventory': {
    component: CharacterInventory,
    checkId: 'MixexCapitalization' satisfies CheckType,
    validItemsSetting: 'platformScripture.validMixedCapitalization',
    invalidItemsSetting: 'platformScripture.invalidMixedCapitalization',
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
 * identifier. The returned range only changes when the fields that actually affect the inventory
 * query change — so navigating within a book (in `'book'` scope) or within a chapter (in
 * `'chapter'` scope) does not refire the inventory request.
 *
 * @param verseRef - Current verses reference
 * @param scope - Scope of analysis ('verse', 'chapter', or 'book')
 * @param projectId - Project identifier
 * @returns Formatted, stable inventory input range
 */
function useInventoryInputRange(
  verseRef: SerializedVerseRef,
  scope: Scope,
  projectId: string | undefined,
) {
  // Intentionally narrowed dependency values: in `'book'` scope chapter/verse don't matter, and in
  // `'chapter'` scope verse doesn't matter — so we substitute stable sentinel values to avoid
  // recomputing the range as the user navigates within the scope. Extracted to named locals so
  // the dependency array stays statically analysable (see react-hooks/exhaustive-deps).
  const stableChapterNum = scope === 'book' ? 1 : verseRef.chapterNum;
  const stableVerseNum = scope === 'verse' ? verseRef.verseNum : 1;
  return useMemo(
    () => createInventoryInputRange(verseRef, scope, projectId ?? ''),
    // Leave `verseRef` out of the dependency array on purpose: we already track the fields that
    // actually drive the query via the narrowed locals above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectId, scope, verseRef.book, stableChapterNum, stableVerseNum],
  );
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
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [webViewType] = useWebViewState('webViewType', '');
  const [verseRef, setVerseRef] = useWebViewScrollGroupScrRef();
  const [scope, setScope] = useState<Scope>('chapter');

  const { checkId, validItemsSetting, invalidItemsSetting, typeStringKeys } = useMemo(() => {
    // Validate and get inventory configuration
    if (!webViewType || !isValidInventoryWebViewType(webViewType)) {
      throw new Error(`"${webViewType}" is not a valid inventory type`);
    }
    return INVENTORY_TYPE_CONFIG[webViewType];
  }, [webViewType]);

  // Resolve the shared inventory strings plus the rendered type's table-header strings (lifted out
  // of the per-type components so they no longer import `@papi`).
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => Array.from(INVENTORY_STRING_KEYS), []),
  );
  const [typeStrings] = useLocalizedStrings(useMemo(() => [...typeStringKeys], [typeStringKeys]));

  const inventoryInputRange = useInventoryInputRange(verseRef, scope, projectId);

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

  // Marker names for the current book (lifted out of MarkerInventory so it stays presentational).
  // Only the marker inventory consumes these; the hook runs harmlessly for the other types.
  const [markerNamesPossiblyError] = useProjectData(
    'platformScripture.MarkerNames',
    projectId ?? undefined,
  ).MarkerNames(Canon.bookIdToNumber(verseRef.book), []);

  const markerNames = useMemo(() => {
    if (isPlatformError(markerNamesPossiblyError)) {
      logger.warn(`Error getting marker names: ${getErrorMessage(markerNamesPossiblyError)}`);
      return MARKER_NAMES_DEFAULT;
    }
    return markerNamesPossiblyError;
  }, [markerNamesPossiblyError]);

  const [inventoryItemsWithOccurrences, setInventoryItemsWithOccurrences] = useState<{
    [itemKey: string]: InventoryItemOccurrence[];
  }>({});

  // Clear cached occurrences whenever the inventory items change (e.g., scope/navigation changes)
  useEffect(() => {
    setInventoryItemsWithOccurrences({});
  }, [inventoryItems]);

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

        if (!isMounted.current) return;

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

  // Props shared by every inventory type. The per-type table-header strings (and, for the marker
  // inventory, the resolved marker names) are supplied alongside these per `webViewType`.
  const sharedProps = {
    inventoryItems: enhancedInventoryItems,
    setVerseRef,
    localizedStrings,
    approvedItems,
    onApprovedItemsChange: handleApprovedItemsChange,
    unapprovedItems,
    onUnapprovedItemsChange: handleUnapprovedItemsChange,
    scope,
    onScopeChange: setScope,
    areInventoryItemsLoading,
    onItemSelected: handleItemSelected,
  };

  switch (webViewType) {
    case 'platformScripture.repeatedWordsInventory':
      return (
        <RepeatedWordsInventory {...sharedProps} repeatedWordsInventoryStrings={typeStrings} />
      );
    case 'platformScripture.markersInventory':
      return (
        <MarkerInventory
          {...sharedProps}
          markerInventoryStrings={typeStrings}
          markerNames={markerNames}
        />
      );
    case 'platformScripture.punctuationInventory':
      return <PunctuationInventory {...sharedProps} punctuationInventoryStrings={typeStrings} />;
    case 'platformScripture.characterInventory':
    default:
      return <CharacterInventory {...sharedProps} characterInventoryStrings={typeStrings} />;
  }
};
