import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { formatReplacementString } from 'platform-bible-utils';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import type { UIEvent } from 'react';
import {
  ResourceList,
  RESOURCE_LIST_STRING_KEYS,
  type ResourceListItem,
} from '../shared/resource-list.component';
import {
  DictionaryDisplayItem,
  DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
  type DictionaryDisplayItemData,
} from './dictionary-display-item.component';
import {
  DictionaryEntryDetail,
  type VerseOccurrenceLink,
} from './dictionary-entry-detail.component';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_TAB_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_columnHeader_translations%',
  '%enhancedResources_dictionary_columnHeader_sourceLanguage%',
  '%enhancedResources_dictionary_columnHeader_definitions%',
  '%enhancedResources_dictionary_columnHeader_count%',
  '%enhancedResources_dictionary_expandAll%',
  '%enhancedResources_dictionary_collapseAll%',
  '%enhancedResources_dictionary_emptyState_noData%',
  '%enhancedResources_dictionary_emptyState_noMatch%',
  '%enhancedResources_dictionary_emptyState_wordNotInScope%',
  '%enhancedResources_dictionary_dictionaryLabel_sdbh%',
  '%enhancedResources_dictionary_dictionaryLabel_sdbg%',
  '%enhancedResources_dictionary_occurrenceCountTooltip%',
  ...RESOURCE_LIST_STRING_KEYS,
  ...DICTIONARY_DISPLAY_ITEM_STRING_KEYS,
] as const);

type DictionaryTabLocalizedStringKey = (typeof DICTIONARY_TAB_STRING_KEYS)[number];
type DictionaryTabLocalizedStrings = {
  [key in DictionaryTabLocalizedStringKey]?: LocalizedStringValue;
};

export type DictionaryEmptyStateVariant = 'none' | 'no-data' | 'no-match' | 'word-not-in-scope';

export type DictionaryTabProps = {
  /** Dictionary entries to render. */
  items: DictionaryDisplayItemData[];
  /** Set of expanded token ids (controlled). */
  expandedTokenIds?: Set<string>;
  /** Whether all entries are expanded (drives the expand/collapse-all button label). */
  allExpanded?: boolean;
  /** Loading flag - shows skeleton rows. */
  isLoading?: boolean;
  /** Empty state variant when items.length === 0. */
  emptyState?: DictionaryEmptyStateVariant;
  /** Filter word for the no-match empty state ('{word}' replacement). */
  filterWord?: string;
  /** Scope label for empty state messages ('{scope}' replacement, already localized). */
  scopeLabel?: string;
  /** Whether the Translations column is shown (column 1). */
  showTranslations?: boolean;
  /** Active dictionary - drives the dictionary label. */
  activeDictionary?: 'SDBH' | 'SDBG';
  /** Whether non-relevant senses are hidden in expanded details. */
  hideNonRelevantSenses?: boolean;

  /** Expansion / list callbacks. */
  onExpandToggle?: (tokenId: string) => void;
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;

  /** Per-row callbacks (forwarded to DictionaryDisplayItem + DictionaryEntryDetail). */
  onSourceTextClick?: (tokenId: string) => void;
  onOccurrenceCountClick?: (tokenId: string) => void;
  onSemanticDomainClick?: (domainId: string) => void;
  onRelatedLexemeClick?: (lemma: string) => void;
  onEncyclopediaLinkClick?: (articleId: string) => void;
  onVerseOccurrenceClick?: (verse: VerseOccurrenceLink) => void;
  onToggleHideNonRelevantSenses?: (hide: boolean) => void;
  onCopySurfaceForm?: (item: DictionaryDisplayItemData) => void;
  onCopyLemma?: (item: DictionaryDisplayItemData) => void;

  localizedStringsWithLoadingState?: [DictionaryTabLocalizedStrings, boolean];
};

/**
 * Pure presentational DictionaryTab. Renders a header with column labels + expand-all /
 * collapse-all controls, then a ResourceList of dictionary entries (text variant). Each row is a
 * DictionaryDisplayItem; expanded rows render DictionaryEntryDetail below.
 *
 * Empty state handling (BHV-352):
 *
 * - `no-data` -> "No data found for current {scope}"
 * - `no-match` -> "{word} does not occur in {scope}"
 * - `word-not-in-scope` -> "{word} does not occur in {scope}"
 *
 * Layout follows ui-spec-dictionary-tab.md wireframes.
 */
export function DictionaryTab({
  items,
  expandedTokenIds,
  allExpanded = false,
  isLoading = false,
  emptyState = 'none',
  filterWord,
  scopeLabel = '',
  showTranslations = false,
  activeDictionary = 'SDBH',
  hideNonRelevantSenses = false,

  onExpandToggle = () => {},
  onExpandAll = () => {},
  onCollapseAll = () => {},
  onScroll,

  onSourceTextClick = () => {},
  onOccurrenceCountClick = () => {},
  onSemanticDomainClick = () => {},
  onRelatedLexemeClick = () => {},
  onEncyclopediaLinkClick = () => {},
  onVerseOccurrenceClick = () => {},
  onToggleHideNonRelevantSenses = () => {},
  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: DictionaryTabProps) {
  const getLocalizedString = (key: DictionaryTabLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const headerTranslations = String(
    getLocalizedString('%enhancedResources_dictionary_columnHeader_translations%'),
  );
  const headerSource = String(
    getLocalizedString('%enhancedResources_dictionary_columnHeader_sourceLanguage%'),
  );
  const headerDefinitions = String(
    getLocalizedString('%enhancedResources_dictionary_columnHeader_definitions%'),
  );
  const headerCount = String(
    getLocalizedString('%enhancedResources_dictionary_columnHeader_count%'),
  );
  const expandAllLabel = String(getLocalizedString('%enhancedResources_dictionary_expandAll%'));
  const collapseAllLabel = String(getLocalizedString('%enhancedResources_dictionary_collapseAll%'));
  const occurrenceTooltip = String(
    getLocalizedString('%enhancedResources_dictionary_occurrenceCountTooltip%'),
  );
  const dictionaryLabel = String(
    getLocalizedString(
      activeDictionary === 'SDBH'
        ? '%enhancedResources_dictionary_dictionaryLabel_sdbh%'
        : '%enhancedResources_dictionary_dictionaryLabel_sdbg%',
    ),
  );

  const emptyMessageRaw = (() => {
    if (emptyState === 'no-data')
      return String(getLocalizedString('%enhancedResources_dictionary_emptyState_noData%'));
    if (emptyState === 'no-match')
      return String(getLocalizedString('%enhancedResources_dictionary_emptyState_noMatch%'));
    if (emptyState === 'word-not-in-scope')
      return String(getLocalizedString('%enhancedResources_dictionary_emptyState_wordNotInScope%'));
    return undefined;
  })();

  const emptyMessage = emptyMessageRaw
    ? formatReplacementString(emptyMessageRaw, {
        word: filterWord ?? '',
        scope: scopeLabel,
      })
    : undefined;

  // Forward all child localization
  const childStrings: [DictionaryTabLocalizedStrings, boolean] = localizedStringsWithLoadingState;

  // Build header row matching the wireframe's grid (5 columns, Found removed per RF-023)
  const header = (
    <div className="tw-flex tw-w-full tw-flex-row tw-items-center tw-gap-3 tw-text-xs tw-uppercase">
      <div className="tw-w-6" aria-hidden />
      {showTranslations && <div className="tw-w-[120px] tw-shrink-0">{headerTranslations}</div>}
      <div className="tw-w-[160px] tw-shrink-0">{headerSource}</div>
      <div className="tw-flex-1">{headerDefinitions}</div>
      <div className="tw-w-12 tw-text-end">{headerCount}</div>
    </div>
  );

  // Map dictionary entries -> ResourceListItem
  const listItems: ResourceListItem[] = items.map((entry) => ({
    id: entry.tokenId,
    primary: (
      <DictionaryDisplayItem
        item={entry}
        showTranslations={showTranslations}
        onSourceTextClick={onSourceTextClick}
        onCopySurfaceForm={onCopySurfaceForm}
        onCopyLemma={onCopyLemma}
        localizedStringsWithLoadingState={childStrings}
      />
    ),
    secondary: (
      <span className="tw-line-clamp-2 tw-text-sm tw-text-muted-foreground">
        {entry.glosses.join(', ')}
      </span>
    ),
    trailing:
      entry.occurrenceCount > 0 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="tw-h-5 tw-min-w-5 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0 tw-text-xs"
                aria-label={occurrenceTooltip}
                onClick={(e) => {
                  // Prevent the row body click from bubbling and triggering selection
                  e.stopPropagation();
                  onOccurrenceCountClick(entry.tokenId);
                }}
              >
                {entry.occurrenceCount}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{occurrenceTooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : undefined,
    expanded: (
      <DictionaryEntryDetail
        definition={entry.definition}
        senses={entry.senses}
        hideNonRelevantSenses={hideNonRelevantSenses}
        onToggleHideNonRelevantSenses={onToggleHideNonRelevantSenses}
        semanticDomains={entry.semanticDomains}
        relatedLexemes={entry.relatedLexemes}
        encyclopediaLinks={entry.encyclopediaLinks}
        verseOccurrences={entry.verseOccurrences}
        onSemanticDomainClick={onSemanticDomainClick}
        onRelatedLexemeClick={onRelatedLexemeClick}
        onEncyclopediaLinkClick={onEncyclopediaLinkClick}
        onVerseOccurrenceClick={onVerseOccurrenceClick}
        localizedStringsWithLoadingState={childStrings}
      />
    ),
  }));

  return (
    <div
      className="tw-flex tw-h-full tw-min-h-0 tw-flex-col"
      data-testid="dictionary-tab"
      aria-label={dictionaryLabel}
    >
      <div className="tw-flex tw-shrink-0 tw-items-center tw-justify-between tw-border-b tw-border-border tw-px-2 tw-py-1">
        <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
          {dictionaryLabel}
        </span>
        <div className="tw-flex tw-gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={items.length === 0 || allExpanded}
            aria-label={expandAllLabel}
            onClick={onExpandAll}
            className="tw-h-7 tw-w-7"
          >
            <ChevronsUpDown className="tw-h-4 tw-w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={items.length === 0 || (!allExpanded && (expandedTokenIds?.size ?? 0) === 0)}
            aria-label={collapseAllLabel}
            onClick={onCollapseAll}
            className="tw-h-7 tw-w-7"
          >
            <ChevronsDownUp className="tw-h-4 tw-w-4" />
          </Button>
        </div>
      </div>
      <div className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col">
        <ResourceList
          items={listItems}
          variant="text"
          showSecondaryColumn
          expandedIds={expandedTokenIds}
          onExpandToggle={onExpandToggle}
          header={header}
          emptyMessage={
            emptyMessage ? (
              <div data-testid="dictionary-empty-state" className="tw-text-sm">
                {emptyMessage}
              </div>
            ) : undefined
          }
          isLoading={isLoading}
          onScroll={onScroll}
          ariaLabel={dictionaryLabel}
          testId="dictionary-entry-list"
          localizedStringsWithLoadingState={childStrings}
        />
      </div>
    </div>
  );
}

export default DictionaryTab;
