import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { DictionarySenseDisplay } from '../shared/dictionary-sense-item.component';

/** Preview length for the first-sense description shown in the collapsed row. */
const FIRST_SENSE_PREVIEW_CHARS = 80;

/** Object containing all keys used for localization in this component. */
export const DICTIONARY_DISPLAY_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_dictionary_copySurfaceForm%',
  '%enhancedResources_dictionary_copyLemma%',
  '%enhancedResources_dictionary_copy_originalScript%',
  '%enhancedResources_dictionary_copy_transliteration%',
  '%enhancedResources_dictionary_findSense%',
  '%enhancedResources_dictionary_findLemma%',
  '%enhancedResources_dictionary_findText%',
  '%enhancedResources_dictionary_sourceTextTooltip%',
] as const);

type DictionaryDisplayItemLocalizedStringKey = (typeof DICTIONARY_DISPLAY_ITEM_STRING_KEYS)[number];
type DictionaryDisplayItemLocalizedStrings = {
  [key in DictionaryDisplayItemLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Display data for a single dictionary entry row [Revised: 2026-04-29 Theme 13c]. Per the data
 * shape audit (#7c) the collapsed row is reduced to the source-language word (clickable) plus a
 * first-N-chars preview of the first sense's description. The previously-rendered `glosses`,
 * `partOfSpeech`, `occurrenceCount`, and `translations` columns were dropped - they have no
 * collapsed-row analog in PT9.
 */
export type DictionaryDisplayItemData = {
  tokenId: string;
  /** Lemma in original Hebrew/Greek script. */
  sourceText: string;
  /** Transliteration. */
  translit: string;
  /** Detail data (loaded lazily when expanded). */
  senses?: DictionarySenseDisplay[];
  /**
   * Total occurrences in all books for the entire entry. Consumed by `DictionaryEntryDetail` for
   * the entry-level "Occurrences in all books ({x})" link. Optional during loading; production data
   * provider always populates it (see data-contracts.md M-006 readDictionaryEntry). [Revised:
   * 2026-04-30 SB#5d]
   */
  totalOccurrencesInAllBooks?: number;
};

export type DictionaryDisplayItemProps = {
  /** Entry data to render. */
  item: DictionaryDisplayItemData;

  /** Click handler for the source-language word; routes to MarbleForm word filter. */
  onSourceTextClick?: (tokenId: string) => void;

  /**
   * Context menu handlers (Theme 16). Identical surface to `DictionaryEntryDetail` so reviewers see
   * one consistent menu pattern across both controls.
   */
  onCopySurfaceForm?: (
    item: DictionaryDisplayItemData,
    variant: 'original' | 'transliteration',
  ) => void;
  onCopyLemma?: (item: DictionaryDisplayItemData, variant: 'original' | 'transliteration') => void;
  onFindSense?: (item: DictionaryDisplayItemData) => void;
  onFindLemma?: (item: DictionaryDisplayItemData) => void;
  onFindText?: (item: DictionaryDisplayItemData) => void;

  localizedStringsWithLoadingState?: [DictionaryDisplayItemLocalizedStrings, boolean];
};

/** Truncate `text` at `maxChars`, appending an ellipsis when truncation occurs. */
function previewText(text: string | undefined, maxChars: number): string {
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}…`;
}

/**
 * Pure presentational entry row content used inside `SourceLanguageIndexedList`'s `renderItem`
 * slot. The surrounding `<li>` (selection, focus, keyboard nav) is owned by the list component.
 *
 * [Revised: 2026-04-29 Theme 13c]
 *
 * Body layout:
 *
 * <source-language word (clickable)> <first ~80 chars of first sense's definition>
 *
 * `e.stopPropagation()` on the source-text button prevents the row's parent `<li>` selection click
 * from firing when the dedicated source-text handler is invoked.
 *
 * Right-click anywhere on the row opens the ContextMenu with copySurfaceForm / copyLemma (with
 * Original / Transliteration sub-items) plus findSense / findLemma / findText (Theme 16).
 *
 * Selectors for tests (per ui-spec-dictionary-tab.md test contract):
 *
 * - `data-testid="dictionary-entry-{tokenId}"`
 */
export function DictionaryDisplayItem({
  item,
  onSourceTextClick = () => {},
  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},
  onFindSense = () => {},
  onFindLemma = () => {},
  onFindText = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: DictionaryDisplayItemProps) {
  const getLocalizedString = (key: DictionaryDisplayItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const copySurfaceFormLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copySurfaceForm%'),
  );
  const copyLemmaLabel = String(getLocalizedString('%enhancedResources_dictionary_copyLemma%'));
  const copyOriginalScriptLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copy_originalScript%'),
  );
  const copyTransliterationLabel = String(
    getLocalizedString('%enhancedResources_dictionary_copy_transliteration%'),
  );
  const findSenseLabel = String(getLocalizedString('%enhancedResources_dictionary_findSense%'));
  const findLemmaLabel = String(getLocalizedString('%enhancedResources_dictionary_findLemma%'));
  const findTextLabel = String(getLocalizedString('%enhancedResources_dictionary_findText%'));
  const sourceTextTooltip = String(
    getLocalizedString('%enhancedResources_dictionary_sourceTextTooltip%'),
  );

  const firstSenseDefinition = item.senses?.[0]?.definition;
  const preview = previewText(firstSenseDefinition, FIRST_SENSE_PREVIEW_CHARS);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          data-testid={`dictionary-entry-${item.tokenId}`}
          className="tw-flex tw-w-full tw-items-baseline tw-gap-3"
        >
          <div className="tw-flex tw-min-w-0 tw-shrink-0 tw-flex-col">
            <Button
              variant="link"
              className="tw-h-auto tw-justify-start tw-p-0 tw-text-start tw-text-sm"
              aria-label={sourceTextTooltip}
              onClick={(e) => {
                e.stopPropagation();
                onSourceTextClick(item.tokenId);
              }}
            >
              <span className="tw-truncate tw-font-semibold">{item.sourceText}</span>
            </Button>
            {item.translit && (
              <span className="tw-truncate tw-text-xs tw-italic tw-text-muted-foreground">
                {item.translit}
              </span>
            )}
          </div>
          {preview && (
            <span className="tw-flex-1 tw-truncate tw-text-sm tw-text-muted-foreground">
              {preview}
            </span>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger>{copySurfaceFormLabel}</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem onClick={() => onCopySurfaceForm(item, 'original')}>
              {copyOriginalScriptLabel}
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onCopySurfaceForm(item, 'transliteration')}>
              {copyTransliterationLabel}
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>{copyLemmaLabel}</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem onClick={() => onCopyLemma(item, 'original')}>
              {copyOriginalScriptLabel}
            </ContextMenuItem>
            <ContextMenuItem onClick={() => onCopyLemma(item, 'transliteration')}>
              {copyTransliterationLabel}
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem onClick={() => onFindSense(item)}>{findSenseLabel}</ContextMenuItem>
        <ContextMenuItem onClick={() => onFindLemma(item)}>{findLemmaLabel}</ContextMenuItem>
        <ContextMenuItem onClick={() => onFindText(item)}>{findTextLabel}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default DictionaryDisplayItem;
