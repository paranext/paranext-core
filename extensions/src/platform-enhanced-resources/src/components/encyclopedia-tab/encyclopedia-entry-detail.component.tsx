import { Button, Skeleton } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import type { ArticleRendererData } from '../shared/article-renderer.component';
import type { EncyclopediaEntryRefData } from './encyclopedia-display-item.component';

/** Object containing all keys used for localization in this component. */
export const ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS = Object.freeze([
  '%enhancedResources_encyclopedia_articleLoading%',
  '%enhancedResources_encyclopedia_emptyDetail%',
  '%enhancedResources_encyclopedia_viewArticle%',
] as const);

type EncyclopediaEntryDetailLocalizedStringKey =
  (typeof ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS)[number];
type EncyclopediaEntryDetailLocalizedStrings = {
  [key in EncyclopediaEntryDetailLocalizedStringKey]?: LocalizedStringValue;
};

export type EncyclopediaEntryDetailProps = {
  /** The encyclopedia entry reference being expanded. */
  entry: EncyclopediaEntryRefData;
  /**
   * Loaded ArticleData for the entry. When undefined the detail shows a loading skeleton (the
   * wiring layer fires getArticle on expand and this prop becomes defined when the response
   * arrives).
   */
  articleData?: ArticleRendererData;
  /** Number of preview paragraphs to show (default 2). */
  previewParagraphCount?: number;

  /**
   * Click handler for the "View article" link that surfaces the full ArticleViewer Dialog
   * (UI-PKG-006). When omitted, the link is hidden.
   */
  onArticleLinkClick?: (articleId: string) => void;

  localizedStringsWithLoadingState?: [EncyclopediaEntryDetailLocalizedStrings, boolean];
};

/**
 * Pure presentational expanded-detail panel for a single encyclopedia article reference.
 *
 * [Revised: 2026-04-29] Theme 14 / audit `working-docs/2026-04-29-marble-data-shape-audit.md#8`:
 * Per the Marble data audit, `LEXLinks` is 0% populated across all shipped dictionaries, so PT9's
 * encyclopedia surface is just headline + content — there are no `References`, `See also`, or `View
 * full article` sections, and dropping them aligns with the actual data. The detail now renders
 * ONLY the article title (headline) plus a paragraph preview of the article content. We no longer
 * delegate to `ArticleRenderer` (which still carries those structures for the `ArticleViewer`
 * UI-PKG-006 full-mode surface) — the encyclopedia preview path is rendered inline here.
 *
 * If multiple article references are attached to the same lemma, the parent renders multiple
 * EncyclopediaEntryDetail instances stacked vertically inside the side drawer.
 */
export function EncyclopediaEntryDetail({
  entry,
  articleData,
  previewParagraphCount = 2,

  onArticleLinkClick,

  localizedStringsWithLoadingState = [{}, false],
}: EncyclopediaEntryDetailProps) {
  const getLocalizedString = (key: EncyclopediaEntryDetailLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const loadingLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_articleLoading%'),
  );
  const emptyDetail = String(getLocalizedString('%enhancedResources_encyclopedia_emptyDetail%'));
  const viewArticleLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_viewArticle%'),
  );

  const renderBody = () => {
    if (!articleData) {
      return (
        <div aria-busy="true" aria-label={loadingLabel} className="tw-flex tw-flex-col tw-gap-2">
          <Skeleton className="tw-h-4 tw-w-full" />
          <Skeleton className="tw-h-4 tw-w-11/12" />
          <Skeleton className="tw-h-4 tw-w-3/4" />
        </div>
      );
    }
    if (articleData.paragraphs.length === 0) {
      return (
        <div role="status" className="tw-text-xs tw-italic tw-text-muted-foreground">
          {emptyDetail}
        </div>
      );
    }
    const paragraphsToShow = articleData.paragraphs.slice(0, Math.max(0, previewParagraphCount));
    return (
      <div className="tw-flex tw-flex-col tw-gap-2">
        {paragraphsToShow.map((paragraph, idx) => (
          // Paragraph order is the only stable identity; backend doesn't ship paragraph ids.
          // eslint-disable-next-line react/no-array-index-key
          <p key={idx} className="tw-text-sm tw-leading-relaxed">
            {paragraph.text}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div
      data-testid={`encyclopedia-entry-detail-${entry.articleId}`}
      className="tw-flex tw-flex-col tw-gap-2 tw-pt-2"
    >
      <header className="tw-flex tw-items-baseline tw-justify-between tw-gap-2">
        <h4 className="tw-text-sm tw-font-semibold">{entry.title}</h4>
      </header>

      {renderBody()}

      {onArticleLinkClick ? (
        <Button
          variant="link"
          size="sm"
          data-testid={`encyclopedia-article-link-${entry.articleId}`}
          className="tw-h-auto tw-self-start tw-p-0 tw-text-sm"
          onClick={() => onArticleLinkClick(entry.articleId)}
        >
          {viewArticleLabel}
        </Button>
      ) : undefined}
    </div>
  );
}

export default EncyclopediaEntryDetail;
