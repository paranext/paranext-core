import { cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_SENSE_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_sense_definitionLabel%',
  '%enhancedResources_sense_glossesLabel%',
  '%enhancedResources_sense_partOfSpeechLabel%',
  '%enhancedResources_sense_nonRelevantLabel%',
] as const);

type DictionarySenseItemLocalizedStringKey = (typeof DICTIONARY_SENSE_ITEM_STRING_KEYS)[number];
type DictionarySenseItemLocalizedStrings = {
  [key in DictionarySenseItemLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Display data for a single dictionary sense. Mirrors the sense subset of DictionaryEntryData
 * (data-contracts.md). Pure presentational - no domain-specific knowledge.
 */
export type DictionarySenseDisplay = {
  /** Sense id (used as key). */
  id: string;
  /** Definition text for this sense. */
  definition: string;
  /** Glosses for this sense (already localized for the user's language). */
  glosses?: string[];
  /** Translated POS string for this sense (already localized via PartOfSpeechTranslator). */
  partOfSpeech?: string;
  /**
   * Whether this sense is "relevant" for the current verse / context. Non-relevant senses are
   * grayed out (when shown) or hidden completely (when hideNonRelevant is true).
   */
  isRelevant: boolean;
};

export type DictionarySenseItemProps = {
  /** The sense data to display. */
  sense: DictionarySenseDisplay;
  /** When true non-relevant senses are hidden entirely; when false they are shown but grayed. */
  hideNonRelevant?: boolean;
  /** Forwarded localized strings. */
  localizedStringsWithLoadingState?: [DictionarySenseItemLocalizedStrings, boolean];
};

/**
 * Pure presentational sense row used by DictionaryEntryDetail and (future) SemanticDomainViewer.
 *
 * Renders: definition, optional gloss list, optional POS label. When the sense is non-relevant the
 * row is dimmed; when `hideNonRelevant` is true the component renders nothing.
 */
export function DictionarySenseItem({
  sense,
  hideNonRelevant = false,
  localizedStringsWithLoadingState = [{}, false],
}: DictionarySenseItemProps) {
  const getLocalizedString = (key: DictionarySenseItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  if (!sense.isRelevant && hideNonRelevant) {
    return undefined;
  }

  const dimmed = !sense.isRelevant;
  const definitionLabel = String(getLocalizedString('%enhancedResources_sense_definitionLabel%'));
  const glossesLabel = String(getLocalizedString('%enhancedResources_sense_glossesLabel%'));
  const posLabel = String(getLocalizedString('%enhancedResources_sense_partOfSpeechLabel%'));
  const nonRelevantLabel = String(getLocalizedString('%enhancedResources_sense_nonRelevantLabel%'));

  return (
    <div
      role="group"
      aria-label={dimmed ? nonRelevantLabel : undefined}
      className={cn(
        'tw-flex tw-flex-col tw-gap-1 tw-rounded tw-border tw-border-border tw-bg-background tw-p-2',
        dimmed && 'tw-opacity-60',
      )}
    >
      <div className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-2">
        <span className="tw-text-xs tw-font-semibold tw-text-muted-foreground">
          {definitionLabel}
        </span>
        <span className="tw-text-sm">{sense.definition}</span>
      </div>
      {sense.glosses && sense.glosses.length > 0 && (
        <div className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-2">
          <span className="tw-text-xs tw-font-semibold tw-text-muted-foreground">
            {glossesLabel}
          </span>
          <span className="tw-text-sm">{sense.glosses.join(', ')}</span>
        </div>
      )}
      {sense.partOfSpeech && (
        <div className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-2">
          <span className="tw-text-xs tw-font-semibold tw-text-muted-foreground">{posLabel}</span>
          <span className="tw-text-sm tw-italic">{sense.partOfSpeech}</span>
        </div>
      )}
    </div>
  );
}

export default DictionarySenseItem;
