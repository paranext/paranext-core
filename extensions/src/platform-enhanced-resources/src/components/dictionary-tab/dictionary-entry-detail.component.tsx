import { Button, Switch, cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { ArrowLeft } from 'lucide-react';
import {
  DictionarySenseItem,
  DICTIONARY_SENSE_ITEM_STRING_KEYS,
  type DictionarySenseDisplay,
} from '../shared/dictionary-sense-item.component';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_ENTRY_DETAIL_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_definitionHeader%',
  '%enhancedResources_dictionary_sensesHeader%',
  '%enhancedResources_dictionary_hideNonRelevantToggle%',
  '%enhancedResources_dictionary_semanticDomainsHeader%',
  '%enhancedResources_dictionary_relatedLexemesHeader%',
  '%enhancedResources_dictionary_relatedLexemes_byGloss%',
  '%enhancedResources_dictionary_relatedLexemes_byDomain%',
  '%enhancedResources_dictionary_relatedLexemes_byLexical%',
  '%enhancedResources_dictionary_seeAlsoHeader%',
  '%enhancedResources_dictionary_occurrencesHeader%',
  '%enhancedResources_dictionary_emptyDetail%',
  '%enhancedResources_dictionary_backToList%',
  ...DICTIONARY_SENSE_ITEM_STRING_KEYS,
] as const);

type DictionaryEntryDetailLocalizedStringKey = (typeof DICTIONARY_ENTRY_DETAIL_STRING_KEYS)[number];
type DictionaryEntryDetailLocalizedStrings = {
  [key in DictionaryEntryDetailLocalizedStringKey]?: LocalizedStringValue;
};

export type SemanticDomainLink = { id: string; label: string };
export type RelatedLexemeLink = {
  lemma: string;
  translit: string;
  gloss: string;
  relationType: 'Gloss' | 'SemanticDomain' | 'Lexical';
};
export type EncyclopediaArticleLink = { articleId: string; title: string };
export type VerseOccurrenceLink = {
  book: number;
  chapter: number;
  verse: number;
  /** Display label, formatted by parent (e.g., "Gen 1:1"). */
  label: string;
};

export type DictionaryEntryDetailProps = {
  /** Definition / paragraph text (rich-text in PT9; plain string here). */
  definition?: string;
  /** Sense list (with relevance flags). */
  senses?: DictionarySenseDisplay[];
  /** When true, non-relevant senses are hidden entirely. */
  hideNonRelevantSenses?: boolean;
  /** Callback fired when the "hide non-relevant senses" switch is toggled. */
  onToggleHideNonRelevantSenses?: (hide: boolean) => void;
  /** Semantic domain refs - rendered as clickable buttons. */
  semanticDomains?: SemanticDomainLink[];
  /** Related lexemes - grouped by relation type. */
  relatedLexemes?: RelatedLexemeLink[];
  /** Encyclopedia links ("See also"). */
  encyclopediaLinks?: EncyclopediaArticleLink[];
  /** Verse occurrences - clickable; format: "goto:{verseRef}". */
  verseOccurrences?: VerseOccurrenceLink[];
  /** Click handlers (callback props - parent routes to MarbleForm / drawer). */
  onSemanticDomainClick?: (domainId: string) => void;
  onRelatedLexemeClick?: (lemma: string) => void;
  onEncyclopediaLinkClick?: (articleId: string) => void;
  onVerseOccurrenceClick?: (verse: VerseOccurrenceLink) => void;
  /** When provided, renders a "Back to list" button at the top that calls this. */
  onClose?: () => void;
  localizedStringsWithLoadingState?: [DictionaryEntryDetailLocalizedStrings, boolean];
};

/**
 * Pure presentational expanded-detail panel for a dictionary entry. Renders the DictionaryEntryData
 * DTO (data-contracts.md Section 3) as a series of labeled sections:
 *
 * 1. Definition (rich text)
 * 2. Senses (DictionarySenseItem list with hide/show non-relevant toggle - Theme 9)
 * 3. Semantic domains (clickable badges - dispatches displaydomain:{id})
 * 4. Related lexemes (grouped by relation type)
 * 5. See also / Encyclopedia links
 * 6. Verse occurrences (clickable - dispatches goto:{verseRef})
 *
 * Per BHV-354, all link clicks are routed via callback props - this component fires them with the
 * parsed payload and the parent dispatches to the appropriate handler.
 */
export function DictionaryEntryDetail({
  definition,
  senses,
  hideNonRelevantSenses = false,
  onToggleHideNonRelevantSenses = () => {},
  semanticDomains,
  relatedLexemes,
  encyclopediaLinks,
  verseOccurrences,
  onSemanticDomainClick = () => {},
  onRelatedLexemeClick = () => {},
  onEncyclopediaLinkClick = () => {},
  onVerseOccurrenceClick = () => {},
  onClose,
  localizedStringsWithLoadingState = [{}, false],
}: DictionaryEntryDetailProps) {
  const getLocalizedString = (key: DictionaryEntryDetailLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const definitionHeader = String(
    getLocalizedString('%enhancedResources_dictionary_definitionHeader%'),
  );
  const sensesHeader = String(getLocalizedString('%enhancedResources_dictionary_sensesHeader%'));
  const hideNonRelevantLabel = String(
    getLocalizedString('%enhancedResources_dictionary_hideNonRelevantToggle%'),
  );
  const semanticDomainsHeader = String(
    getLocalizedString('%enhancedResources_dictionary_semanticDomainsHeader%'),
  );
  const relatedLexemesHeader = String(
    getLocalizedString('%enhancedResources_dictionary_relatedLexemesHeader%'),
  );
  const relGloss = String(
    getLocalizedString('%enhancedResources_dictionary_relatedLexemes_byGloss%'),
  );
  const relDomain = String(
    getLocalizedString('%enhancedResources_dictionary_relatedLexemes_byDomain%'),
  );
  const relLexical = String(
    getLocalizedString('%enhancedResources_dictionary_relatedLexemes_byLexical%'),
  );
  const seeAlsoHeader = String(getLocalizedString('%enhancedResources_dictionary_seeAlsoHeader%'));
  const occurrencesHeader = String(
    getLocalizedString('%enhancedResources_dictionary_occurrencesHeader%'),
  );
  const emptyDetail = String(getLocalizedString('%enhancedResources_dictionary_emptyDetail%'));
  const backToListLabel = String(getLocalizedString('%enhancedResources_dictionary_backToList%'));

  const backButton = onClose ? (
    <Button
      data-back-to-list
      onClick={onClose}
      variant="ghost"
      size="sm"
      className="tw-mb-3 tw-self-start"
    >
      <ArrowLeft className="tw-mr-1 tw-h-4 tw-w-4" />
      {backToListLabel}
    </Button>
  ) : undefined;

  // Forward sense item localization
  const senseStrings: [DictionaryEntryDetailLocalizedStrings, boolean] =
    localizedStringsWithLoadingState;

  const hasAnyContent =
    Boolean(definition) ||
    (senses && senses.length > 0) ||
    (semanticDomains && semanticDomains.length > 0) ||
    (relatedLexemes && relatedLexemes.length > 0) ||
    (encyclopediaLinks && encyclopediaLinks.length > 0) ||
    (verseOccurrences && verseOccurrences.length > 0);

  if (!hasAnyContent) {
    return (
      <div className="tw-flex tw-flex-col">
        {backButton}
        <div role="status" className="tw-py-2 tw-text-xs tw-italic tw-text-muted-foreground">
          {emptyDetail}
        </div>
      </div>
    );
  }

  // Group related lexemes by relationType
  const lexemeGroups = (relatedLexemes ?? []).reduce<Record<string, RelatedLexemeLink[]>>(
    (acc, lex) => {
      acc[lex.relationType] = acc[lex.relationType] ?? [];
      acc[lex.relationType].push(lex);
      return acc;
    },
    {},
  );
  const groupLabels: Record<RelatedLexemeLink['relationType'], string> = {
    Gloss: relGloss,
    SemanticDomain: relDomain,
    Lexical: relLexical,
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-3 tw-pt-2">
      {backButton}
      {definition && (
        <section aria-label={definitionHeader}>
          <h4 className="tw-mb-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {definitionHeader}
          </h4>
          <p className="tw-text-sm">{definition}</p>
        </section>
      )}

      {senses && senses.length > 0 && (
        <section aria-label={sensesHeader}>
          <div className="tw-mb-2 tw-flex tw-items-center tw-justify-between">
            <h4 className="tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
              {sensesHeader}
            </h4>
            <label className="tw-flex tw-items-center tw-gap-2 tw-text-xs">
              <Switch
                checked={hideNonRelevantSenses}
                onCheckedChange={onToggleHideNonRelevantSenses}
                aria-label={hideNonRelevantLabel}
              />
              <span>{hideNonRelevantLabel}</span>
            </label>
          </div>
          <div className="tw-flex tw-flex-col tw-gap-2">
            {senses.map((sense) => (
              <DictionarySenseItem
                key={sense.id}
                sense={sense}
                hideNonRelevant={hideNonRelevantSenses}
                localizedStringsWithLoadingState={senseStrings}
              />
            ))}
          </div>
        </section>
      )}

      {semanticDomains && semanticDomains.length > 0 && (
        <section aria-label={semanticDomainsHeader}>
          <h4 className="tw-mb-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {semanticDomainsHeader}
          </h4>
          <div className="tw-flex tw-flex-wrap tw-gap-1">
            {semanticDomains.map((domain) => (
              <Button
                key={domain.id}
                variant="link"
                className="tw-h-auto tw-p-0 tw-text-sm"
                onClick={() => onSemanticDomainClick(domain.id)}
              >
                {domain.label}
              </Button>
            ))}
          </div>
        </section>
      )}

      {relatedLexemes && relatedLexemes.length > 0 && (
        <section aria-label={relatedLexemesHeader}>
          <h4 className="tw-mb-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {relatedLexemesHeader}
          </h4>
          <div className="tw-flex tw-flex-col tw-gap-1">
            {(['Gloss', 'SemanticDomain', 'Lexical'] as const).map((relType) => {
              const group = lexemeGroups[relType];
              if (!group || group.length === 0) return undefined;
              return (
                <div key={relType} className="tw-flex tw-flex-wrap tw-items-baseline tw-gap-2">
                  <span className="tw-text-xs tw-text-muted-foreground">
                    {groupLabels[relType]}:
                  </span>
                  {group.map((lex, idx) => (
                    <span
                      // Use a deterministic key combining relation + lemma + gloss + index
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${relType}-${lex.lemma}-${lex.gloss}-${idx}`}
                      className="tw-flex tw-items-baseline tw-gap-1"
                    >
                      <Button
                        variant="link"
                        className={cn('tw-h-auto tw-p-0 tw-text-sm')}
                        onClick={() => onRelatedLexemeClick(lex.lemma)}
                      >
                        {lex.lemma}
                      </Button>
                      <span className="tw-text-xs tw-text-muted-foreground">
                        ({lex.translit}; {lex.gloss})
                      </span>
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {encyclopediaLinks && encyclopediaLinks.length > 0 && (
        <section aria-label={seeAlsoHeader}>
          <h4 className="tw-mb-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {seeAlsoHeader}
          </h4>
          <ul className="tw-flex tw-flex-col tw-gap-1">
            {encyclopediaLinks.map((link) => (
              <li key={link.articleId}>
                <Button
                  variant="link"
                  className="tw-h-auto tw-p-0 tw-text-sm"
                  onClick={() => onEncyclopediaLinkClick(link.articleId)}
                >
                  {link.title}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {verseOccurrences && verseOccurrences.length > 0 && (
        <section aria-label={occurrencesHeader}>
          <h4 className="tw-mb-1 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
            {occurrencesHeader}
          </h4>
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {verseOccurrences.map((occ) => (
              <Button
                key={`${occ.book}-${occ.chapter}-${occ.verse}`}
                variant="link"
                className="tw-h-auto tw-p-0 tw-text-sm"
                onClick={() => onVerseOccurrenceClick(occ)}
              >
                {occ.label}
              </Button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default DictionaryEntryDetail;
