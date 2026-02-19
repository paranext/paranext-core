import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { Button, Checkbox, Label } from 'platform-bible-react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import DictionaryItem from './dictionary-item.component';
import type { DictionaryDisplayItem } from './dictionary-item.component';

// --- Types ---

/** Sort field identifiers for dictionary columns */
export type DictionarySortField = 'translations' | 'source' | 'definition' | 'count';

/** Props for the DictionaryTab component */
export interface DictionaryTabProps {
  /** Dictionary items to display */
  items: DictionaryDisplayItem[];
  /** Current sort column */
  sortColumn: DictionarySortField | undefined;
  /** Whether sort is ascending */
  sortAscending: boolean;
  /** Callback when sort changes */
  onSortChange: (column: DictionarySortField, ascending: boolean) => void;
  /** Callback when an item is expanded/collapsed */
  onToggleExpand: (term: string) => void;
  /** Whether a word filter is currently active */
  isWordFilterActive: boolean;
  /** Whether to hide irrelevant meanings */
  hideIrrelevantMeanings: boolean;
  /** Callback when hide irrelevant meanings toggle changes */
  onHideIrrelevantChange: (value: boolean) => void;
  /** Callback when a semantic domain link is clicked */
  onSemanticDomainClick: (domainNumber: string) => void;
  /** Callback when a "Was this helpful?" assessment changes */
  onAssessmentChange: (term: string, isHelpful: boolean) => void;
  /** Map of term -> assessment value (true=yes, false=no, undefined=not assessed) */
  assessments: Record<string, boolean | undefined>;
}

// --- Constants ---

const DICTIONARY_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_dict_colExpand%',
  '%enhancedResources_dict_colStatus%',
  '%enhancedResources_dict_colTranslations%',
  '%enhancedResources_dict_colSource%',
  '%enhancedResources_dict_colDefinition%',
  '%enhancedResources_dict_colCount%',
  '%enhancedResources_dict_sortAscending%',
  '%enhancedResources_dict_sortDescending%',
  '%enhancedResources_dict_hideIrrelevant%',
  '%enhancedResources_emptyState%',
];

/** Column definitions for the header row */
interface ColumnDef {
  key: string;
  labelKey: LocalizeKey;
  widthClass: string;
  sortField?: DictionarySortField;
}

const COLUMNS: ColumnDef[] = [
  {
    key: 'expand',
    labelKey: '%enhancedResources_dict_colExpand%',
    widthClass: 'tw-w-[22px]',
  },
  {
    key: 'status',
    labelKey: '%enhancedResources_dict_colStatus%',
    widthClass: 'tw-w-[22px]',
  },
  {
    key: 'translations',
    labelKey: '%enhancedResources_dict_colTranslations%',
    widthClass: 'tw-w-[165px]',
    sortField: 'translations',
  },
  {
    key: 'source',
    labelKey: '%enhancedResources_dict_colSource%',
    widthClass: 'tw-w-[165px]',
    sortField: 'source',
  },
  {
    key: 'definition',
    labelKey: '%enhancedResources_dict_colDefinition%',
    widthClass: 'tw-flex-1',
    sortField: 'definition',
  },
  {
    key: 'count',
    labelKey: '%enhancedResources_dict_colCount%',
    widthClass: 'tw-w-[40px]',
    sortField: 'count',
  },
];

// --- Sort icon helper ---

function SortIcon({
  column,
  currentSortColumn,
  sortAscending,
}: {
  column: DictionarySortField;
  currentSortColumn: DictionarySortField | undefined;
  sortAscending: boolean;
}) {
  if (currentSortColumn !== column) {
    return <ArrowUpDown className="tw-h-3 tw-w-3 tw-opacity-40" />;
  }
  if (sortAscending) {
    return <ArrowUp className="tw-h-3 tw-w-3" />;
  }
  return <ArrowDown className="tw-h-3 tw-w-3" />;
}

// --- Component ---

/**
 * DictionaryTab renders the Dictionary research tab content. It displays a sortable, expandable
 * list of dictionary items with found-status indicators, translations, source text, definitions,
 * semantic domain links, and "Was this helpful?" assessments.
 *
 * This component is rendered within the ResearchPane's dictionary TabsContent area.
 */
export default function DictionaryTab({
  items,
  sortColumn,
  sortAscending,
  onSortChange,
  onToggleExpand,
  isWordFilterActive,
  hideIrrelevantMeanings,
  onHideIrrelevantChange,
  onSemanticDomainClick,
  onAssessmentChange,
  assessments,
}: DictionaryTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => DICTIONARY_TAB_LOCALIZED_KEYS, []));

  // --- Sort handler ---
  const handleSortClick = useCallback(
    (field: DictionarySortField) => {
      if (sortColumn === field) {
        // Toggle direction
        onSortChange(field, !sortAscending);
      } else {
        // New column, default to ascending
        onSortChange(field, true);
      }
    },
    [sortColumn, sortAscending, onSortChange],
  );

  // --- Hide irrelevant toggle handler ---
  const handleHideIrrelevantToggle = useCallback(
    (checked: boolean) => {
      onHideIrrelevantChange(checked);
    },
    [onHideIrrelevantChange],
  );

  return (
    <div data-testid="dictionary-tab" className="tw-flex tw-flex-col tw-h-full tw-min-h-0">
      {/* Hide irrelevant meanings toggle */}
      <div className="tw-flex tw-items-center tw-gap-2 tw-px-2 tw-py-1.5 tw-border-b tw-border-border tw-shrink-0">
        <Checkbox
          id="hide-irrelevant-meanings"
          checked={hideIrrelevantMeanings}
          onCheckedChange={handleHideIrrelevantToggle}
        />
        <Label htmlFor="hide-irrelevant-meanings" className="tw-text-xs tw-cursor-pointer">
          {localizedStrings['%enhancedResources_dict_hideIrrelevant%']}
        </Label>
      </div>

      {/* Column headers */}
      <div className="tw-flex tw-items-center tw-px-1 tw-py-1 tw-border-b tw-border-border tw-bg-muted/30 tw-shrink-0">
        {COLUMNS.map((col) => {
          if (col.sortField) {
            const sortLabel =
              sortColumn === col.sortField && sortAscending
                ? localizedStrings['%enhancedResources_dict_sortDescending%']
                : localizedStrings['%enhancedResources_dict_sortAscending%'];

            return (
              <Button
                key={col.key}
                type="button"
                variant="ghost"
                size="sm"
                className={`${col.widthClass} tw-shrink-0 tw-h-6 tw-px-1 tw-justify-start tw-text-xs tw-font-medium tw-text-muted-foreground`}
                onClick={() => {
                  if (col.sortField) handleSortClick(col.sortField);
                }}
                aria-label={`${localizedStrings[col.labelKey]} - ${sortLabel}`}
              >
                <span className="tw-truncate">{localizedStrings[col.labelKey]}</span>
                <SortIcon
                  column={col.sortField}
                  currentSortColumn={sortColumn}
                  sortAscending={sortAscending}
                />
              </Button>
            );
          }

          return (
            <span
              key={col.key}
              className={`${col.widthClass} tw-shrink-0 tw-text-xs tw-font-medium tw-text-muted-foreground tw-px-1`}
              aria-hidden="true"
            >
              {/* Non-sortable columns: expand and status have no visible label */}
            </span>
          );
        })}
      </div>

      {/* Item list */}
      <div className="tw-flex-1 tw-overflow-auto tw-min-h-0">
        {items.length === 0 ? (
          <div className="tw-p-4 tw-text-center">
            <p className="tw-text-muted-foreground tw-text-sm">
              {localizedStrings['%enhancedResources_emptyState%']}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <DictionaryItem
              key={`${item.term}-${item.lexicalLinks}`}
              item={item}
              onToggleExpand={onToggleExpand}
              isWordFilterActive={isWordFilterActive}
              hideIrrelevantMeanings={hideIrrelevantMeanings}
              onSemanticDomainClick={onSemanticDomainClick}
              onAssessmentChange={onAssessmentChange}
              assessmentValue={assessments[item.term]}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Re-export types that consumers of DictionaryTab will need
export type {
  DictionaryDisplayItem,
  TermRenderingStatusCode,
  DictionaryDisplaySubItem,
  DictionarySense,
} from './dictionary-item.component';
