import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Skeleton,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import {
  ArticleRenderer,
  ARTICLE_RENDERER_STRING_KEYS,
  type ArticleCrossRefData,
  type ArticleRendererData,
  type ArticleVerseLinkData,
} from '../shared/article-renderer.component';

/** Object containing all keys used for localization in this component. */
export const ARTICLE_VIEWER_STRING_KEYS = Object.freeze([
  '%enhancedResources_articleViewer_title%',
  ...ARTICLE_RENDERER_STRING_KEYS,
] as const);

type ArticleViewerLocalizedStringKey = (typeof ARTICLE_VIEWER_STRING_KEYS)[number];
type ArticleViewerLocalizedStrings = {
  [key in ArticleViewerLocalizedStringKey]?: LocalizedStringValue;
};

export type ArticleViewerProps = {
  /** Whether the dialog is open (controlled by parent). */
  open: boolean;
  /**
   * Optional id of the article currently being shown. Used as the dialog title fallback when
   * `articleData` has not yet loaded.
   */
  articleId?: string;
  /**
   * Article DTO to render. When undefined a skeleton placeholder is shown - the parent toggles this
   * by re-fetching when `articleId` changes (or by passing undefined while a fetch is in flight).
   */
  articleData?: ArticleRendererData;
  /**
   * FN-009 seam: production maps imageId -> `papi-er://images/{id}`; stories use placehold.co.
   * Forwarded to the inner ArticleRenderer.
   */
  imageUrlResolver?: (imageId: string) => string;
  /** Open-state change handler - mirrors shadcn Dialog's onOpenChange. */
  onOpenChange: (open: boolean) => void;
  /** Verse reference link click - parent navigates MarbleForm via scroll group sync. */
  onVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  /**
   * Cross-reference click. Parent loads the new article and updates `articleData` (the dialog stays
   * open for `seealso`). For `launchViewer` the parent opens the MediaViewer.
   */
  onCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  /** Inline image click - parent opens MediaViewer with the image. */
  onImageClick?: (imageId: string) => void;
  localizedStringsWithLoadingState?: [ArticleViewerLocalizedStrings, boolean];
};

/**
 * Pure presentational ArticleViewer rendered as a centered shadcn Dialog wrapping the shared
 * `ArticleRenderer` (mode='full'). Implements the spec's "ArticleViewer Dialog wrapping
 * ArticleRenderer" surface (interrupts flow, opens via setActiveArticleId, reachable from dict
 * entry detail, encyclopedia entry detail, and the SemanticDomainViewer dialog).
 *
 * Replaces the previous in-tab Drawer surface (UI-PKG-006). Sequence prev/next, abbreviation
 * footer, and explicit Back/Close chrome are dropped - the Dialog's built-in close X button plus
 * Escape/click-outside handle dismissal, and the surrounding state model is now flat
 * (`activeArticleId`) rather than sequenced.
 *
 * Controlled API: parent owns `open` and `articleData`, and reacts to the callback props. The
 * component reflects state into the DOM (loading skeleton, dialog title) but never mutates parent
 * state directly.
 */
export function ArticleViewer({
  open,
  articleId,
  articleData,
  imageUrlResolver,
  onOpenChange,
  onVerseLinkClick = () => {},
  onCrossReferenceClick = () => {},
  onImageClick = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: ArticleViewerProps) {
  const getLocalizedString = (key: ArticleViewerLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleFallback = String(getLocalizedString('%enhancedResources_articleViewer_title%'));
  const headingText = articleData?.title ?? articleId ?? titleFallback;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="article-viewer"
        className="tw:flex tw:max-h-[90vh] tw:w-[90vw] tw:max-w-4xl tw:flex-col tw:overflow-hidden"
      >
        <DialogTitle className="tw:truncate" data-testid="article-viewer-title">
          {headingText}
        </DialogTitle>
        <DialogDescription className="tw:sr-only">{titleFallback}</DialogDescription>
        <div className="tw:flex-1 tw:overflow-y-auto" data-testid="article-viewer-content">
          {articleData ? (
            <ArticleRenderer
              article={articleData}
              mode="full"
              imageUrlResolver={imageUrlResolver}
              onVerseLinkClick={onVerseLinkClick}
              onCrossReferenceClick={onCrossReferenceClick}
              onImageClick={onImageClick}
              localizedStringsWithLoadingState={localizedStringsWithLoadingState}
            />
          ) : (
            <div className="tw:flex tw:flex-col tw:gap-3" data-testid="article-viewer-loading">
              <Skeleton className="tw:h-5 tw:w-1/2" />
              <Skeleton className="tw:h-4 tw:w-full" />
              <Skeleton className="tw:h-4 tw:w-11/12" />
              <Skeleton className="tw:h-4 tw:w-10/12" />
              <Skeleton className="tw:h-4 tw:w-3/4" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ArticleViewer;
