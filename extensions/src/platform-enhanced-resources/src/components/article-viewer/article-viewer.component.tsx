import { useCallback, useMemo, type KeyboardEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
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
  '%enhancedResources_articleViewer_back%',
  '%enhancedResources_articleViewer_close%',
  '%enhancedResources_articleViewer_previousArticle%',
  '%enhancedResources_articleViewer_nextArticle%',
  '%enhancedResources_articleViewer_loading%',
  '%enhancedResources_articleViewer_empty%',
  '%enhancedResources_articleViewer_abbreviationsHeader%',
  '%enhancedResources_articleViewer_abbreviationTooltipLabel%',
  ...ARTICLE_RENDERER_STRING_KEYS,
] as const);

type ArticleViewerLocalizedStringKey = (typeof ARTICLE_VIEWER_STRING_KEYS)[number];
type ArticleViewerLocalizedStrings = {
  [key in ArticleViewerLocalizedStringKey]?: LocalizedStringValue;
};

export type ArticleViewerProps = {
  /** Whether the drawer is open (controlled by parent). */
  open: boolean;
  /**
   * Article currently displayed in the drawer. When undefined and `isLoading` is false the empty
   * placeholder is shown. The parent updates this prop when the user follows a "see also" link, so
   * the drawer transparently swaps articles without remount.
   */
  currentArticle?: ArticleRendererData;
  /** Loading flag for the article body (shown while getArticle is in flight). */
  isLoading?: boolean;
  /** Whether a previous article in the sequence is available. Drives the Previous control. */
  previousArticleAvailable?: boolean;
  /** Whether a next article in the sequence is available. Drives the Next control. */
  nextArticleAvailable?: boolean;
  /**
   * FN-009 seam: production maps imageId -> `papi-er://images/{id}`; stories use placehold.co.
   * Forwarded to the inner ArticleRenderer.
   */
  imageUrlResolver?: (imageId: string) => string;

  /** Close handler - parent flips `open` to false and restores focus to trigger. */
  onClose?: () => void;
  /** Previous-in-sequence handler. Only fires when `previousArticleAvailable` is true. */
  onPrevious?: () => void;
  /** Next-in-sequence handler. Only fires when `nextArticleAvailable` is true. */
  onNext?: () => void;
  /** Verse reference link click - parent navigates MarbleForm via scroll group sync. */
  onVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  /**
   * Cross-reference click. Parent loads the new article and updates `currentArticle` (the drawer
   * stays open for `seealso`). For `launchViewer` the parent opens the MediaViewer.
   */
  onCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  /** Inline image click - parent opens MediaViewer with the image. */
  onImageClick?: (imageId: string) => void;

  localizedStringsWithLoadingState?: [ArticleViewerLocalizedStrings, boolean];
};

/**
 * Pure presentational ArticleViewer rendered as an in-tab Drawer (vaul + shadcn). Implements
 * UI-PKG-006: a slide-in side panel that shows a full encyclopedia article using the shared
 * `ArticleRenderer` (mode='full') from UI-PKG-003. No HTML strings are rendered - the article DTO
 * (data-contracts.md Section 4.10) flows through structured props.
 *
 * Controlled API: parent owns `open`, `currentArticle`, sequence availability flags, and reacts to
 * the callback props. The component reflects state into the DOM (disabled buttons, loading
 * skeletons) but never mutates parent state directly.
 *
 * Acceptance criteria (UI-PKG-006):
 *
 * - Shadcn `Drawer` (slide-in from side; direction='right')
 * - Article body via `ArticleRenderer` mode='full' - never HTML strings
 * - Verse-reference links forward `onVerseLinkClick` for MarbleForm scroll-group sync
 * - "See also" links forward `onCrossReferenceClick`; parent swaps `currentArticle` for nested nav
 * - Inline images forward `onImageClick` for MediaViewer
 * - Abbreviation tooltips on hover via shadcn `Tooltip` in the Abbreviations footer
 * - Back button (`ArrowLeft` icon) closes the drawer
 * - Escape and click-outside dismiss (built into vaul Drawer via `onOpenChange`)
 * - ArrowLeft/ArrowRight navigate the article sequence when the corresponding flag is true
 * - Focus trap and focus return - provided by vaul Drawer
 * - Accessibility: DrawerTitle announces article title; ARIA labels on nav buttons; renderer's own
 *   link aria-labels surface link purpose for assistive tech.
 */
export function ArticleViewer({
  open,
  currentArticle,
  isLoading = false,
  previousArticleAvailable = false,
  nextArticleAvailable = false,
  imageUrlResolver,
  onClose = () => {},
  onPrevious = () => {},
  onNext = () => {},
  onVerseLinkClick = () => {},
  onCrossReferenceClick = () => {},
  onImageClick = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: ArticleViewerProps) {
  const getLocalizedString = (key: ArticleViewerLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleFallback = String(getLocalizedString('%enhancedResources_articleViewer_title%'));
  const backLabel = String(getLocalizedString('%enhancedResources_articleViewer_back%'));
  const closeLabel = String(getLocalizedString('%enhancedResources_articleViewer_close%'));
  const previousLabel = String(
    getLocalizedString('%enhancedResources_articleViewer_previousArticle%'),
  );
  const nextLabel = String(getLocalizedString('%enhancedResources_articleViewer_nextArticle%'));
  const loadingLabel = String(getLocalizedString('%enhancedResources_articleViewer_loading%'));
  const emptyLabel = String(getLocalizedString('%enhancedResources_articleViewer_empty%'));
  const abbreviationsHeader = String(
    getLocalizedString('%enhancedResources_articleViewer_abbreviationsHeader%'),
  );
  const abbreviationTooltipLabel = String(
    getLocalizedString('%enhancedResources_articleViewer_abbreviationTooltipLabel%'),
  );

  // Aggregate paragraph-level abbreviations into a deduplicated list so they can render as
  // hover-tooltipped surfaces in the footer. The shared ArticleRenderer keeps paragraph text
  // plain; surfacing abbreviations here lets the viewer satisfy the AC without mutating the
  // shared component contract (UI-PKG-003 stays untouched).
  const abbreviations = useMemo(() => {
    if (!currentArticle) return [];
    const seen = new Set<string>();
    const result: { abbrev: string; fullText: string }[] = [];
    currentArticle.paragraphs.forEach((paragraph) => {
      paragraph.abbreviations.forEach(({ abbrev, fullText }) => {
        if (seen.has(abbrev)) return;
        seen.add(abbrev);
        result.push({ abbrev, fullText });
      });
    });
    return result;
  }, [currentArticle]);

  // Sequence availability gates Previous/Next. Hidden entirely when neither side is available -
  // matches AC "Previous and Next hidden when no sequence".
  const showSequenceControls = previousArticleAvailable || nextArticleAvailable;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Escape is handled by Drawer's built-in onOpenChange, no need to intercept here.
      switch (event.key) {
        case 'ArrowLeft':
          if (previousArticleAvailable) {
            event.preventDefault();
            onPrevious();
          }
          break;
        case 'ArrowRight':
          if (nextArticleAvailable) {
            event.preventDefault();
            onNext();
          }
          break;
        default:
          break;
      }
    },
    [nextArticleAvailable, onNext, onPrevious, previousArticleAvailable],
  );

  // Drawer onOpenChange: vaul fires this for Escape, click-outside, and the close button. We
  // surface it through onClose so the parent can restore focus and unset its `open` state.
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) onClose();
    },
    [onClose],
  );

  const headingText = currentArticle?.title ?? titleFallback;

  const renderBody = () => {
    if (isLoading) {
      return (
        <div
          aria-busy="true"
          aria-label={loadingLabel}
          className="tw-flex tw-flex-col tw-gap-3"
          data-testid="article-viewer-loading"
        >
          <Skeleton className="tw-h-5 tw-w-1/2" />
          <Skeleton className="tw-h-4 tw-w-full" />
          <Skeleton className="tw-h-4 tw-w-11/12" />
          <Skeleton className="tw-h-4 tw-w-10/12" />
          <Skeleton className="tw-h-4 tw-w-3/4" />
        </div>
      );
    }
    if (!currentArticle) {
      return (
        <div
          role="status"
          className="tw-py-4 tw-text-sm tw-italic tw-text-muted-foreground"
          data-testid="article-viewer-empty"
        >
          {emptyLabel}
        </div>
      );
    }
    return (
      <ArticleRenderer
        article={currentArticle}
        mode="full"
        imageUrlResolver={imageUrlResolver}
        onVerseLinkClick={onVerseLinkClick}
        onCrossReferenceClick={onCrossReferenceClick}
        onImageClick={onImageClick}
        localizedStringsWithLoadingState={localizedStringsWithLoadingState}
      />
    );
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction="right">
      <DrawerContent
        className="tw-ml-auto tw-flex tw-h-full tw-w-full tw-max-w-[480px] tw-flex-col"
        data-testid="article-viewer"
        hideDrawerHandle
        onKeyDown={handleKeyDown}
      >
        <DrawerHeader className="tw-flex tw-flex-row tw-items-start tw-justify-between tw-gap-2 tw-border-b tw-border-border">
          <div className="tw-flex tw-items-start tw-gap-2">
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={backLabel}
                data-testid="article-viewer-back"
              >
                <ArrowLeft className="tw-h-5 tw-w-5" aria-hidden="true" />
              </Button>
            </DrawerClose>
            <div className="tw-min-w-0 tw-flex-1 tw-text-start">
              <DrawerTitle className="tw-truncate tw-text-base" data-testid="article-viewer-title">
                {headingText}
              </DrawerTitle>
              <DrawerDescription className="tw-sr-only">{titleFallback}</DrawerDescription>
            </div>
          </div>
          <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-1">
            {showSequenceControls && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={previousLabel}
                  data-testid="article-viewer-previous"
                  disabled={!previousArticleAvailable}
                  onClick={onPrevious}
                >
                  <ChevronLeft className="tw-h-5 tw-w-5" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={nextLabel}
                  data-testid="article-viewer-next"
                  disabled={!nextArticleAvailable}
                  onClick={onNext}
                >
                  <ChevronRight className="tw-h-5 tw-w-5" aria-hidden="true" />
                </Button>
              </>
            )}
            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={closeLabel}
                data-testid="article-viewer-close"
              >
                <X className="tw-h-5 tw-w-5" aria-hidden="true" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div
          className="tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-4 tw-overflow-y-auto tw-px-4 tw-py-3"
          data-testid="article-viewer-content"
        >
          {renderBody()}

          {abbreviations.length > 0 && (
            <section
              aria-label={abbreviationsHeader}
              data-testid="article-viewer-abbreviations"
              className="tw-border-t tw-border-border tw-pt-3"
            >
              <h4 className="tw-mb-2 tw-text-xs tw-font-semibold tw-uppercase tw-text-muted-foreground">
                {abbreviationsHeader}
              </h4>
              <TooltipProvider>
                <ul className="tw-flex tw-flex-wrap tw-gap-2">
                  {abbreviations.map(({ abbrev, fullText }) => (
                    <li key={abbrev}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            aria-label={abbreviationTooltipLabel}
                            data-testid={`article-viewer-abbreviation-${abbrev}`}
                            className="tw-rounded tw-border tw-border-border tw-bg-muted/40 tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium tw-text-foreground hover:tw-bg-muted"
                          >
                            <abbr title={fullText} className="tw-no-underline">
                              {abbrev}
                            </abbr>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{fullText}</TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </TooltipProvider>
            </section>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ArticleViewer;
