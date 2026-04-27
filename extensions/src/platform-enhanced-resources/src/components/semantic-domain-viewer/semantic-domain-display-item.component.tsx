import { cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  DICTIONARY_SENSE_ITEM_STRING_KEYS,
  DictionarySenseItem,
  type DictionarySenseDisplay,
} from '../shared/dictionary-sense-item.component';

/** Object containing all keys used for localization in this component. */
export const SEMANTIC_DOMAIN_DISPLAY_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_semanticDomain_glossesLabel%',
  ...DICTIONARY_SENSE_ITEM_STRING_KEYS,
] as const);

type SemanticDomainDisplayItemLocalizedStringKey =
  (typeof SEMANTIC_DOMAIN_DISPLAY_ITEM_STRING_KEYS)[number];
type SemanticDomainDisplayItemLocalizedStrings = {
  [key in SemanticDomainDisplayItemLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Display data for a dictionary entry filtered by semantic domain. A trimmed projection of
 * DictionaryEntryData (data-contracts.md) tailored to the SemanticDomainViewer: lemma plus
 * transliteration plus headline gloss plus sense list. Senses use the shared DictionarySenseDisplay
 * shape so consumers can render them through the existing DictionarySenseItem.
 */
export type SemanticDomainFilteredEntry = {
  /** Stable id (the lexicon entry id; used as ResourceList row key). */
  entryId: string;
  /** Lemma in the resource language (e.g. "logos"). */
  lemma: string;
  /** Original-script form (e.g. "λόγος"). */
  sourceText: string;
  /** Transliteration of the lemma. */
  translit: string;
  /** Headline gloss summary - already localised for the user's language. */
  gloss: string;
  /** Senses for this entry (already localised). */
  senses?: DictionarySenseDisplay[];
};

export type SemanticDomainDisplayItemProps = {
  /** The filtered entry to display. */
  item: SemanticDomainFilteredEntry;
  localizedStringsWithLoadingState?: [SemanticDomainDisplayItemLocalizedStrings, boolean];
};

/**
 * Pure presentational row body used inside the SemanticDomainViewer's filtered-entries
 * `ResourceList`. ResourceList owns the row chrome (hover, expand toggle, selection); this
 * component renders the lemma/source/translit header and an inline sense list.
 *
 * No PAPI coupling - all data flows through the `item` prop.
 */
export function SemanticDomainDisplayItem({
  item,
  localizedStringsWithLoadingState = [{}, false],
}: SemanticDomainDisplayItemProps) {
  const getLocalizedString = (key: SemanticDomainDisplayItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const glossesLabel = String(
    getLocalizedString('%enhancedResources_semanticDomain_glossesLabel%'),
  );

  return (
    <div
      data-testid={`semantic-domain-entry-${item.entryId}`}
      className={cn('tw-flex tw-w-full tw-flex-col tw-gap-2 tw-text-sm')}
    >
      <div className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-2">
        <span className="tw-font-semibold">{item.translit}</span>
        <span className="tw-text-muted-foreground">{item.sourceText}</span>
        {item.gloss && (
          <span className="tw-text-muted-foreground">
            <span className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {glossesLabel}{' '}
            </span>
            <span>{item.gloss}</span>
          </span>
        )}
      </div>
      {item.senses && item.senses.length > 0 && (
        <ul className="tw-flex tw-flex-col tw-gap-1">
          {item.senses.map((sense) => (
            <li key={sense.id}>
              <DictionarySenseItem
                sense={sense}
                localizedStringsWithLoadingState={localizedStringsWithLoadingState}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SemanticDomainDisplayItem;
