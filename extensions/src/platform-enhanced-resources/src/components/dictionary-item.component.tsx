import { useCallback, useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { Badge, Button, Label, RadioGroup, RadioGroupItem } from 'platform-bible-react';
import { Check, AlertTriangle, Minus, X, ChevronDown, ChevronRight } from 'lucide-react';

// --- Types ---

/** Rendering status codes matching ui-state-contracts.md TermRenderingStatusCode */
export type TermRenderingStatusCode =
  | 'AllFound'
  | 'SomeFound'
  | 'NoneFound'
  | 'AllGuessed'
  | 'SomeGuessed'
  | 'AllMissing'
  | 'AutoAssigned'
  | 'Denied'
  | 'NotInProject'
  | 'NoRendering'
  | 'NotMapped'
  | 'Unknown';

/** A sense within a dictionary sub-item */
export interface DictionarySense {
  number: string;
  definition: string;
  isRelevant: boolean;
  partOfSpeech: string;
  renderings?: string[];
  renderingStatus?: TermRenderingStatusCode;
  semanticDomains: { number: string; name: string }[];
}

/** A sub-item within a dictionary display item (homograph groups) */
export interface DictionaryDisplaySubItem {
  homographSubscript: number;
  senses: DictionarySense[];
}

/** A dictionary display item matching ui-state-contracts.md */
export interface DictionaryDisplayItem {
  term: string;
  sourceText: string;
  lexicalLinks: string;
  subItems: DictionaryDisplaySubItem[];
  foundStatus: TermRenderingStatusCode;
  foundRenderings: string[];
  missingInVerses: { book: string; chapter: number; verse: number }[];
  occursInReferences: { book: string; chapter: number; verse: number }[];
  translations: string[];
  isGuess: boolean;
  multipleTokens: boolean;
  expanded: boolean;
}

/** Props for the DictionaryItem component */
export interface DictionaryItemProps {
  /** The dictionary display item data */
  item: DictionaryDisplayItem;
  /** Callback when expand/collapse is toggled */
  onToggleExpand: (term: string) => void;
  /** Whether a word filter is currently active (controls "Was this helpful?" visibility) */
  isWordFilterActive: boolean;
  /** Whether to hide irrelevant meanings */
  hideIrrelevantMeanings: boolean;
  /** Callback when a semantic domain link is clicked */
  onSemanticDomainClick: (domainNumber: string) => void;
  /** Callback when "Was this helpful?" assessment changes */
  onAssessmentChange: (term: string, isHelpful: boolean) => void;
  /** Current assessment value for this item (undefined if not yet assessed) */
  assessmentValue?: boolean;
}

// --- Constants ---

const DICTIONARY_ITEM_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_dict_translations%',
  '%enhancedResources_dict_renderings%',
  '%enhancedResources_dict_semanticDomains%',
  '%enhancedResources_dict_wasThisHelpful%',
  '%enhancedResources_dict_yes%',
  '%enhancedResources_dict_no%',
  '%enhancedResources_dict_notFound%',
  '%enhancedResources_dict_expandItem%',
  '%enhancedResources_dict_collapseItem%',
  '%enhancedResources_dict_statusFound%',
  '%enhancedResources_dict_statusGuessed%',
  '%enhancedResources_dict_statusMissing%',
  '%enhancedResources_dict_statusDenied%',
];

// --- Status icon mapping ---

interface StatusIconConfig {
  icon: typeof Check;
  className: string;
  labelKey: LocalizeKey;
}

function getStatusIconConfig(status: TermRenderingStatusCode): StatusIconConfig {
  switch (status) {
    case 'AllFound':
    case 'SomeFound':
      return {
        icon: Check,
        className: 'tw-text-green-600',
        labelKey: '%enhancedResources_dict_statusFound%',
      };
    case 'AllGuessed':
    case 'SomeGuessed':
    case 'AutoAssigned':
      return {
        icon: AlertTriangle,
        className: 'tw-text-amber-500',
        labelKey: '%enhancedResources_dict_statusGuessed%',
      };
    case 'Denied':
      return {
        icon: X,
        className: 'tw-text-red-500',
        labelKey: '%enhancedResources_dict_statusDenied%',
      };
    case 'NoneFound':
    case 'AllMissing':
    case 'NoRendering':
    case 'NotMapped':
    case 'Unknown':
    case 'NotInProject':
    default:
      return {
        icon: Minus,
        className: 'tw-text-gray-400',
        labelKey: '%enhancedResources_dict_statusMissing%',
      };
  }
}

// --- Component ---

/**
 * DictionaryItem renders a single dictionary entry row in the dictionary tab. It supports
 * expand/collapse, status icons, translations, definitions, semantic domain links, and a "Was this
 * helpful?" assessment when a word filter is active.
 *
 * Deferred features:
 *
 * - DEF-UI-004: "Edit" link is NOT rendered (hidden)
 * - DEF-UI-005: Occurrence count is plain text (non-clickable)
 * - DEF-UI-006: "Give feedback..." link is NOT rendered (hidden)
 */
export default function DictionaryItem({
  item,
  onToggleExpand,
  isWordFilterActive,
  hideIrrelevantMeanings,
  onSemanticDomainClick,
  onAssessmentChange,
  assessmentValue,
}: DictionaryItemProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => DICTIONARY_ITEM_LOCALIZED_KEYS, []));

  const statusConfig = useMemo(() => getStatusIconConfig(item.foundStatus), [item.foundStatus]);
  const StatusIcon = statusConfig.icon;

  const handleToggle = useCallback(() => {
    onToggleExpand(item.term);
  }, [item.term, onToggleExpand]);

  const handleAssessmentChange = useCallback(
    (value: string) => {
      onAssessmentChange(item.term, value === 'yes');
    },
    [item.term, onAssessmentChange],
  );

  // Get the first definition summary from the first sub-item's first sense
  const definitionSummary = useMemo(() => {
    for (let si = 0; si < item.subItems.length; si += 1) {
      const subItem = item.subItems[si];
      for (let s = 0; s < subItem.senses.length; s += 1) {
        const sense = subItem.senses[s];
        if (sense.definition) return sense.definition;
      }
    }
    return '';
  }, [item.subItems]);

  // Occurrence count display
  const occurrenceCount = item.occursInReferences.length;
  const countDisplay = occurrenceCount > 0 ? `(${occurrenceCount}x)` : '';

  // Determine the current assessment radio value
  const assessmentRadioValue = useMemo(() => {
    if (assessmentValue === true) return 'yes';
    if (assessmentValue === false) return 'no';
    return undefined;
  }, [assessmentValue]);

  return (
    <div data-testid={`dictionary-item-${item.term}`} className="tw-border-b tw-border-border">
      {/* Collapsed row: clickable to expand/collapse */}
      <button
        type="button"
        className="tw-flex tw-items-center tw-w-full tw-text-left tw-px-1 tw-py-1.5 hover:tw-bg-accent/50 tw-cursor-pointer tw-border-0 tw-bg-transparent"
        onClick={handleToggle}
        aria-expanded={item.expanded}
        aria-label={
          item.expanded
            ? `${localizedStrings['%enhancedResources_dict_collapseItem%']} ${item.term}`
            : `${localizedStrings['%enhancedResources_dict_expandItem%']} ${item.term}`
        }
      >
        {/* Expand/collapse icon - 22px */}
        <span className="tw-w-[22px] tw-shrink-0 tw-flex tw-items-center tw-justify-center">
          {item.expanded ? (
            <ChevronDown className="tw-h-4 tw-w-4" />
          ) : (
            <ChevronRight className="tw-h-4 tw-w-4" />
          )}
        </span>

        {/* Status icon - 22px */}
        <span className="tw-w-[22px] tw-shrink-0 tw-flex tw-items-center tw-justify-center">
          <StatusIcon
            className={`tw-h-4 tw-w-4 ${statusConfig.className}`}
            aria-label={localizedStrings[statusConfig.labelKey]}
          />
        </span>

        {/* Translations - 165px */}
        <span
          className="tw-w-[165px] tw-shrink-0 tw-text-sm tw-truncate tw-px-1"
          title={item.translations.join(', ')}
        >
          {item.translations.join(', ')}
        </span>

        {/* Source text - 165px */}
        <span
          className="tw-w-[165px] tw-shrink-0 tw-text-sm tw-truncate tw-px-1"
          dir="auto"
          title={item.sourceText}
        >
          {item.sourceText}
        </span>

        {/* Definition - fill remaining */}
        <span className="tw-flex-1 tw-text-sm tw-truncate tw-px-1 tw-text-muted-foreground">
          {definitionSummary}
        </span>

        {/* Occurrence count - plain text per DEF-UI-005 */}
        <span className="tw-w-[40px] tw-shrink-0 tw-text-xs tw-text-muted-foreground tw-text-right tw-px-1">
          {countDisplay}
        </span>
      </button>

      {/* Expanded detail section */}
      {item.expanded ? (
        <div className="tw-pl-[44px] tw-pr-2 tw-pb-3 tw-pt-1 tw-bg-accent/20">
          {/* Translations row */}
          {item.translations.length > 0 ? (
            <div className="tw-text-sm tw-mb-2">
              <span className="tw-font-medium">
                {localizedStrings['%enhancedResources_dict_translations%']}
              </span>{' '}
              {item.translations.join(', ')}
            </div>
          ) : undefined}

          {/* Sub-items (homograph groups) and their senses */}
          {item.subItems.map((subItem, subIdx) => (
            <div key={`${item.term}-sub-${String(subIdx)}`} className="tw-mb-2">
              {/* Homograph subscript if applicable */}
              {subItem.homographSubscript > 0 ? (
                <div className="tw-text-xs tw-text-muted-foreground tw-mb-1">
                  {item.sourceText}
                  <sub>{subItem.homographSubscript}</sub>
                </div>
              ) : undefined}

              {/* Senses */}
              {subItem.senses.map((sense) => {
                // Handle irrelevant senses
                if (!sense.isRelevant && hideIrrelevantMeanings) return undefined;

                const senseClasses = sense.isRelevant ? '' : 'tw-opacity-50';

                return (
                  <div
                    key={`${item.term}-sense-${sense.number}`}
                    className={`tw-mb-2 tw-text-sm ${senseClasses}`}
                  >
                    {/* Sense number + definition + part of speech */}
                    <div className="tw-flex tw-items-baseline tw-gap-1">
                      <span className="tw-font-medium">{sense.number}.</span>
                      <span>{sense.definition}</span>
                      {sense.partOfSpeech ? (
                        <span className="tw-text-xs tw-text-muted-foreground">
                          ({sense.partOfSpeech})
                        </span>
                      ) : undefined}
                    </div>

                    {/* Renderings for this sense */}
                    {sense.renderings && sense.renderings.length > 0 ? (
                      <div className="tw-flex tw-items-center tw-gap-1 tw-mt-1 tw-ml-4">
                        <span className="tw-text-xs tw-text-muted-foreground">
                          {localizedStrings['%enhancedResources_dict_renderings%']}
                        </span>
                        {sense.renderings.map((rendering) => (
                          <Badge key={rendering} variant="secondary" className="tw-text-xs">
                            {rendering}
                          </Badge>
                        ))}
                        {/* DEF-UI-004: "Edit" link is NOT rendered (hidden) */}
                      </div>
                    ) : (
                      <div className="tw-text-xs tw-text-muted-foreground tw-mt-1 tw-ml-4">
                        {localizedStrings['%enhancedResources_dict_renderings%']}{' '}
                        {localizedStrings['%enhancedResources_dict_notFound%']}
                        {/* DEF-UI-004: "Edit" link is NOT rendered (hidden) */}
                      </div>
                    )}

                    {/* Semantic domain links */}
                    {sense.semanticDomains.length > 0 ? (
                      <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1 tw-mt-1 tw-ml-4">
                        <span className="tw-text-xs tw-text-muted-foreground">
                          {localizedStrings['%enhancedResources_dict_semanticDomains%']}
                        </span>
                        {sense.semanticDomains.map((domain) => (
                          <Button
                            key={domain.number}
                            type="button"
                            variant="link"
                            size="sm"
                            className="tw-h-auto tw-p-0 tw-text-xs tw-text-blue-600 hover:tw-text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSemanticDomainClick(domain.number);
                            }}
                          >
                            [{domain.number} {domain.name}]
                          </Button>
                        ))}
                      </div>
                    ) : undefined}
                  </div>
                );
              })}
            </div>
          ))}

          {/* "Was this helpful?" assessment - only when word filter active + item expanded */}
          {/* DEF-UI-006: "Give feedback..." link is NOT rendered (hidden) */}
          {isWordFilterActive ? (
            <div className="tw-flex tw-items-center tw-gap-3 tw-mt-2 tw-pt-2 tw-border-t tw-border-border">
              <span className="tw-text-sm">
                {localizedStrings['%enhancedResources_dict_wasThisHelpful%']}
              </span>
              <RadioGroup
                value={assessmentRadioValue}
                onValueChange={handleAssessmentChange}
                className="tw-flex tw-items-center tw-gap-3"
              >
                <div className="tw-flex tw-items-center tw-gap-1">
                  <RadioGroupItem value="yes" id={`assessment-yes-${item.term}`} />
                  <Label
                    htmlFor={`assessment-yes-${item.term}`}
                    className="tw-text-sm tw-cursor-pointer"
                  >
                    {localizedStrings['%enhancedResources_dict_yes%']}
                  </Label>
                </div>
                <div className="tw-flex tw-items-center tw-gap-1">
                  <RadioGroupItem value="no" id={`assessment-no-${item.term}`} />
                  <Label
                    htmlFor={`assessment-no-${item.term}`}
                    className="tw-text-sm tw-cursor-pointer"
                  >
                    {localizedStrings['%enhancedResources_dict_no%']}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          ) : undefined}
        </div>
      ) : undefined}
    </div>
  );
}
