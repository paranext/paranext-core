import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS = Object.freeze([
  '%enhancedResources_encyclopedia_copySurfaceForm%',
  '%enhancedResources_encyclopedia_copyLemma%',
  '%enhancedResources_encyclopedia_sourceTextTooltip%',
] as const);

type EncyclopediaDisplayItemLocalizedStringKey =
  (typeof ENCYCLOPEDIA_DISPLAY_ITEM_STRING_KEYS)[number];
type EncyclopediaDisplayItemLocalizedStrings = {
  [key in EncyclopediaDisplayItemLocalizedStringKey]?: LocalizedStringValue;
};

/** Single encyclopedia article reference attached to a display item. */
export type EncyclopediaEntryRefData = {
  articleId: string;
  key: string;
  title: string;
  teaserText: string;
  formatVersion: 1 | 2;
  inlineImageIds?: string[];
};

/**
 * Display data for a single encyclopedia entry row. Mirrors data-contracts.md
 * EncyclopediaDisplayItem (post-3B reconciled shape).
 */
export type EncyclopediaDisplayItemData = {
  tokenId: string;
  /** Lemma in original Hebrew/Greek script. */
  lemma: string;
  /**
   * Source text rendered in the row (may be a comma-separated set when the lemma includes related
   * forms, e.g. beker, bikrah).
   */
  sourceText: string;
  /** Transliteration. */
  translit: string;
  /** Article references (may be multiple per lemma when SDBH/SDBG group articles together). */
  entries: EncyclopediaEntryRefData[];
  /** Image ids referenced by the article(s). */
  imageIds: string[];
  /** Collection identifier (FAUNA / FLORA / REALIA). */
  collection: string;
};

export type EncyclopediaDisplayItemProps = {
  /** Entry data to render. */
  item: EncyclopediaDisplayItemData;

  /** Click handlers (parent routes to MarbleForm / drawer). */
  onSourceTextClick?: (tokenId: string) => void;

  /** Context menu handlers (BHV-353). */
  onCopySurfaceForm?: (item: EncyclopediaDisplayItemData) => void;
  onCopyLemma?: (item: EncyclopediaDisplayItemData) => void;

  localizedStringsWithLoadingState?: [EncyclopediaDisplayItemLocalizedStrings, boolean];
};

/**
 * Pure presentational entry-row body content used inside the `SourceLanguageIndexedList`'s
 * `renderItem` slot. The surrounding `<li>` (selection, focus, keyboard nav) is owned by the list
 * component.
 *
 * Body layout (single line + optional teaser):
 *
 * - Translit (clickable - routes to MarbleForm) + source text + collection italic
 * - Trailing entries-count badge (when > 0)
 * - Optional teaser line: first article's preview text (line-clamped to 2 lines)
 *
 * Right-clicking opens the ContextMenu (BHV-353: Copy surface form / Copy lemma). The article
 * details (full teaser, thumbnails, see-also, etc.) live in the side drawer via
 * `EncyclopediaEntryDetail`.
 *
 * Selectors for tests:
 *
 * - `data-testid="encyclopedia-entry-{tokenId}"` (root)
 */
export function EncyclopediaDisplayItem({
  item,

  onSourceTextClick = () => {},

  onCopySurfaceForm = () => {},
  onCopyLemma = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: EncyclopediaDisplayItemProps) {
  const getLocalizedString = (key: EncyclopediaDisplayItemLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const copySurfaceFormLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_copySurfaceForm%'),
  );
  const copyLemmaLabel = String(getLocalizedString('%enhancedResources_encyclopedia_copyLemma%'));
  const sourceTextTooltip = String(
    getLocalizedString('%enhancedResources_encyclopedia_sourceTextTooltip%'),
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          data-testid={`encyclopedia-entry-${item.tokenId}`}
          className="tw-flex tw-w-full tw-flex-col tw-gap-0.5"
        >
          <div className="tw-flex tw-items-baseline tw-gap-3">
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
            <span className="tw-text-xs tw-text-muted-foreground">
              {item.sourceText} <span className="tw-italic">{item.collection.toLowerCase()}</span>
            </span>
            {item.entries.length > 0 && (
              <span className="tw-ml-auto tw-shrink-0 tw-rounded tw-bg-accent tw-px-1.5 tw-py-0.5 tw-text-xs">
                {item.entries.length}
              </span>
            )}
          </div>
          {item.entries[0]?.teaserText && (
            <p className="tw-line-clamp-2 tw-text-xs tw-text-muted-foreground">
              {item.entries[0].teaserText}
            </p>
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

export default EncyclopediaDisplayItem;
