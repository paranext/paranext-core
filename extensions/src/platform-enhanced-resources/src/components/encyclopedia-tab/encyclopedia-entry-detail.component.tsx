import { Button, Skeleton } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  ArticleRenderer,
  ARTICLE_RENDERER_STRING_KEYS,
  type ArticleCrossRefData,
  type ArticleRendererData,
  type ArticleVerseLinkData,
} from '../shared/article-renderer.component';
import type { EncyclopediaEntryRefData } from './encyclopedia-display-item.component';

/** Object containing all keys used for localization in this component. */
export const ENCYCLOPEDIA_ENTRY_DETAIL_STRING_KEYS = Object.freeze([
  '%enhancedResources_encyclopedia_viewFullArticle%',
  '%enhancedResources_encyclopedia_articleLoading%',
  '%enhancedResources_encyclopedia_emptyDetail%',
  '%enhancedResources_encyclopedia_formatVersionLabel%',
  ...ARTICLE_RENDERER_STRING_KEYS,
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
  /** Image url resolver, forwarded to ArticleRenderer (FN-009). */
  imageUrlResolver?: (imageId: string) => string;
  /** Number of preview paragraphs (default 2). */
  previewParagraphCount?: number;

  /** Click callbacks - parent dispatches navigation / overlays. */
  onVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  onCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  onImageClick?: (imageId: string) => void;
  /** Fires when the user clicks the "View full article" footer link. */
  onViewFullArticle?: (entry: EncyclopediaEntryRefData) => void;

  localizedStringsWithLoadingState?: [EncyclopediaEntryDetailLocalizedStrings, boolean];
};

/**
 * Pure presentational expanded-detail panel for a single encyclopedia article reference. Renders
 * the ArticleRenderer in 'preview' mode (truncated paragraphs, see-also list, references), plus a
 * "View full article" button at the bottom that opens the ArticleViewer drawer (UI-PKG-006).
 *
 * If multiple article references are attached to the same lemma, the parent renders multiple
 * EncyclopediaEntryDetail instances stacked vertically inside the expanded ResourceList row.
 */
export function EncyclopediaEntryDetail({
  entry,
  articleData,
  imageUrlResolver,
  previewParagraphCount = 2,

  onVerseLinkClick = () => {},
  onCrossReferenceClick = () => {},
  onImageClick = () => {},
  onViewFullArticle = () => {},

  localizedStringsWithLoadingState = [{}, false],
}: EncyclopediaEntryDetailProps) {
  const getLocalizedString = (key: EncyclopediaEntryDetailLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const viewFullLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_viewFullArticle%'),
  );
  const loadingLabel = String(
    getLocalizedString('%enhancedResources_encyclopedia_articleLoading%'),
  );
  const emptyDetail = String(getLocalizedString('%enhancedResources_encyclopedia_emptyDetail%'));

  const childStrings: [EncyclopediaEntryDetailLocalizedStrings, boolean] =
    localizedStringsWithLoadingState;

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
    if (articleData.paragraphs.length === 0 && articleData.crossReferences.length === 0) {
      return (
        <div role="status" className="tw-text-xs tw-italic tw-text-muted-foreground">
          {emptyDetail}
        </div>
      );
    }
    return (
      <ArticleRenderer
        article={articleData}
        mode="preview"
        previewParagraphCount={previewParagraphCount}
        imageUrlResolver={imageUrlResolver}
        onVerseLinkClick={onVerseLinkClick}
        onCrossReferenceClick={onCrossReferenceClick}
        onImageClick={onImageClick}
        localizedStringsWithLoadingState={childStrings}
      />
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

      <div className="tw-flex tw-justify-end">
        <Button
          variant="link"
          className="tw-h-auto tw-p-0 tw-text-sm"
          onClick={() => onViewFullArticle(entry)}
        >
          {viewFullLabel}
        </Button>
      </div>
    </div>
  );
}

export default EncyclopediaEntryDetail;
