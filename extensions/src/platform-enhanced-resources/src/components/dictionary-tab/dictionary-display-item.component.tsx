import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type {
  SemanticDomainLink,
  RelatedLexemeLink,
  EncyclopediaArticleLink,
  VerseOccurrenceLink,
} from './dictionary-entry-detail.component';
import type { DictionarySenseDisplay } from '../shared/dictionary-sense-item.component';

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_DISPLAY_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_copySurfaceForm%',
  '%enhancedResources_dictionary_copyLemma%',
  '%enhancedResources_dictionary_occurrenceCountTooltip%',
  '%enhancedResources_dictionary_sourceTextTooltip%',
] as const);

type DictionaryDisplayItemLocalizedStringKey = (typeof DICTIONARY_DISPLAY_ITEM_STRING_KEYS)[number];
type DictionaryDisplayItemLocalizedStrings = {
  [key in DictionaryDisplayItemLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Display data for a single dictionary entry row. Mirrors DictionaryDisplayItem from
 * data-contracts.md plus optional senses + translations fields used by the expanded detail.
 */
export type DictionaryDisplayItemData = {
  tokenId: string;
  /** Term in the user's language (column 1 - "Translations" when shown). */
  term: string;
  /** Lemma in original Hebrew/Greek script. */
  sourceText: string;
  /** Transliteration. */
  translit: string;
  /** Top-level glosses (comma-separated when rendered). */
  glosses: string[];
  /** Translated POS string (already localized via PartOfSpeechTranslator). */
  partOfSpeech: string;
  /** Number of occurrences in the current scope. */
  occurrenceCount: number;
  /** Translations from the tracked project (optional - hidden when showTranslations is false). */
  translations?: string[];
  /** Detail data (loaded lazily when expanded). */
  definition?: string;
  senses?: DictionarySenseDisplay[];
  semanticDomains?: SemanticDomainLink[];
  relatedLexemes?: RelatedLexemeLink[];
  encyclopediaLinks?: EncyclopediaArticleLink[];
  verseOccurrences?: VerseOccurrenceLink[];
};

export type DictionaryDisplayItemProps = {
  /** Entry data to render. */
  item: DictionaryDisplayItemData;
  /** Whether to show the Translations column (column 1). */
  showTranslations?: boolean;

  /** Click handlers (parent routes to MarbleForm / drawer). */
  onSourceTextClick?: (tokenId: string) => void;
  /** Trailing-badge click; routes to MarbleForm filtered by occurrences. */
  onOccurrenceCountClick?: (tokenId: string) => void;

  /** Context menu handlers (BHV-353 - Copy surface form / Copy lemma). */
  onCopySurfaceForm?: (item: DictionaryDisplayItemData) => void;
  onCopyLemma?: (item: DictionaryDisplayItemData) => void;

  localizedStringsWithLoadingState?: [DictionaryDisplayItemLocalizedStrings, boolean];
};

/**
 * Pure presentational entry row content used inside `ErDictionaryList`'s `renderItem` slot. The
 * surrounding `<li>` (selection, focus, keyboard nav) is owned by the list component.
 *
 * Body layout:
 *
 * - Column 1 (when showTranslations): translations from the tracked project
 * - Column 2: source text (translit) + script + POS - clickable, routes to MarbleForm
 * - Column 3: glosses (truncated)
 * - Column 4: occurrence-count button (when count > 0) - routes to MarbleForm filtered by occurrences
 *
 * `e.stopPropagation()` on the source-text and occurrence-count buttons prevents the row's parent
 * `<li>` selection click from firing when these dedicated handlers are invoked.
 *
 * Right-click anywhere on the row opens the ContextMenu (BHV-353: Copy surface form / Copy lemma).
 *
 * Selectors for tests (per ui-spec-dictionary-tab.md test contract):
 *
 * - `data-testid="dictionary-entry-{tokenId}"`
 */
export function DictionaryDisplayItem({
  item,
  showTranslations = false,

  onSourceTextClick = () => {},
  onOccurrenceCountClick = () => {},

  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: DictionaryDisplayItemProps) {
  const getLocalizedString = (key: DictionaryDisplayItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const copySurfaceFormLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copySurfaceForm%'),
  );
  const copyLemmaLabel = String(getLocalizedString('%enhancedResources_dictionary_copyLemma%'));
  const sourceTextTooltip = String(
    getLocalizedString('%enhancedResources_dictionary_sourceTextTooltip%'),
  );
  const occurrenceTooltip = String(
    getLocalizedString('%enhancedResources_dictionary_occurrenceCountTooltip%'),
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          data-testid={`dictionary-entry-${item.tokenId}`}
          className="tw-flex tw-w-full tw-items-baseline tw-gap-3"
        >
          {showTranslations && (
            <div className="tw-w-[120px] tw-shrink-0 tw-text-sm tw-text-muted-foreground">
              {(item.translations ?? []).join(', ') || '—'}
            </div>
          )}
          <div className="tw-flex tw-min-w-0 tw-flex-col">
            <Button
              variant="link"
              className="tw-h-auto tw-justify-start tw-p-0 tw-text-start tw-text-sm"
              aria-label={sourceTextTooltip}
              onClick={(e) => {
                e.stopPropagation();
                onSourceTextClick(item.tokenId);
              }}
            >
              <span className="tw-truncate tw-font-semibold">{item.translit}</span>
            </Button>
            <span className="tw-truncate tw-text-xs tw-text-muted-foreground">
              <span>{item.sourceText}</span> <span className="tw-italic">{item.partOfSpeech}</span>
            </span>
          </div>
          <span className="tw-ml-auto tw-flex-1 tw-truncate tw-text-sm tw-text-muted-foreground">
            {item.glosses.join(', ')}
          </span>
          {item.occurrenceCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="tw-h-5 tw-min-w-5 tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0 tw-text-xs"
              aria-label={occurrenceTooltip}
              onClick={(e) => {
                e.stopPropagation();
                onOccurrenceCountClick(item.tokenId);
              }}
            >
              {item.occurrenceCount}
            </Button>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onCopySurfaceForm(item)}>
          {copySurfaceFormLabel}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onCopyLemma(item)}>{copyLemmaLabel}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default DictionaryDisplayItem;
