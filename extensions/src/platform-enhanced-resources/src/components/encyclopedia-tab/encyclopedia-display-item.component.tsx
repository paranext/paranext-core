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

/** Number of teaser characters shown in the collapsed row (PT9 "first-x-chars" pattern). */
const TEASER_PREVIEW_CHAR_LIMIT = 80;

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
 * [Revised: 2026-04-29] Theme 14 / audit `working-docs/2026-04-29-marble-data-shape-audit.md#8`:
 * The collapsed row now follows PT9's simple "headline + first-x-chars" pattern — clickable
 * source-language headline plus a single-paragraph teaser preview truncated to ~80 characters. The
 * previous structured columns (count badge for multiple-article lemmas, collection italic suffix)
 * are gone; reviewers can still see article counts and collections in the side drawer detail.
 *
 * Body layout:
 *
 * - Translit (clickable - routes to MarbleForm) acting as the headline
 * - Optional original-script lemma row (FN-023 — present when `item.lemma` carries Hebrew/Greek
 *   characters and the active display mode is `script` or `both`)
 * - Optional teaser line: first article's preview text, truncated to ~80 chars
 *
 * Right-clicking opens the ContextMenu (BHV-353: Copy surface form / Copy lemma) — preserved.
 *
 * Selectors for tests:
 *
 * - `data-testid="encyclopedia-entry-{tokenId}"` (root)
 * - `[data-source-language-text]` (the original-script lemma element used by FN-023 e2e tests)
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

  const fullTeaser = item.entries[0]?.teaserText ?? '';
  const teaserPreview =
    fullTeaser.length > TEASER_PREVIEW_CHAR_LIMIT
      ? `${fullTeaser.slice(0, TEASER_PREVIEW_CHAR_LIMIT).trimEnd()}…`
      : fullTeaser;

  // FN-023 — render the original-script lemma alongside the translit headline so the row matches
  // the dictionary tab's source-language-aware shape. We render this whenever the lemma differs
  // from the translit (i.e., the row carries an actual original-script form). The presenter +
  // wiring layer drive whether the lemma is shown/hidden per the active display-mode setting; the
  // component only suppresses the row when the lemma is empty.
  const showSourceScript = item.lemma && item.lemma.length > 0 && item.lemma !== item.translit;

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          data-testid={`encyclopedia-entry-${item.tokenId}`}
          className="tw-flex tw-w-full tw-flex-col tw-gap-0.5"
        >
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
          {showSourceScript && (
            <span
              data-source-language-text
              aria-label={sourceTextTooltip}
              className="tw-truncate tw-text-xs tw-text-muted-foreground"
            >
              {item.lemma}
            </span>
          )}
          {teaserPreview && (
            <p className="tw-line-clamp-1 tw-text-xs tw-text-muted-foreground">{teaserPreview}</p>
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
