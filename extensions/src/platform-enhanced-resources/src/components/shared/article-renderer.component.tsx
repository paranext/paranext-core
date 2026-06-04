import { Button, cn } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { Fragment, type ReactNode } from 'react';

/** Object containing all keys used for localization in this component. */
export const ARTICLE_RENDERER_STRING_KEYS = Object.freeze([
  '%enhancedResources_article_seeAlsoHeader%',
  '%enhancedResources_article_referencesHeader%',
  '%enhancedResources_article_imageAltLabel%',
  '%enhancedResources_article_inlineImageOpenLabel%',
  '%enhancedResources_article_crossReferenceOpenLabel%',
  '%enhancedResources_article_verseLinkOpenLabel%',
  '%enhancedResources_article_emptyArticle%',
  '%enhancedResources_article_truncatedNotice%',
] as const);

type ArticleRendererLocalizedStringKey = (typeof ARTICLE_RENDERER_STRING_KEYS)[number];
type ArticleRendererLocalizedStrings = {
  [key in ArticleRendererLocalizedStringKey]?: LocalizedStringValue;
};

/** Mirrors data-contracts.md ArticleVerseLink. */
export type ArticleVerseLinkData = {
  reference: { book: number; chapter: number; verse: number };
  displayText: string;
  /** Pattern: G04300301600000 = BookCode + Chapter + Verse + CharOffset. */
  rawReference: string;
};

/** Mirrors data-contracts.md ArticleCrossRef. */
export type ArticleCrossRefData = {
  targetArticleId: string;
  displayText: string;
  type: 'seealso' | 'launchViewer';
};

/** Mirrors data-contracts.md ArticleParagraph. */
export type ArticleParagraphData = {
  text: string;
  verseLinks: ArticleVerseLinkData[];
  abbreviations: { abbrev: string; fullText: string }[];
  inlineImageIds: string[];
};

/** Mirrors data-contracts.md ArticleData. */
export type ArticleRendererData = {
  articleId: string;
  title: string;
  paragraphs: ArticleParagraphData[];
  crossReferences: ArticleCrossRefData[];
  imageIds: string[];
};

export type ArticleRendererMode = 'preview' | 'full';

export type ArticleRendererProps = {
  /** Article DTO to render; when undefined the empty placeholder is shown. */
  article?: ArticleRendererData;
  /**
   * 'preview' truncates paragraphs to `previewParagraphCount` and skips abbreviation tooltips;
   * 'full' renders every paragraph with all inline structure. Defaults to 'full'.
   */
  mode?: ArticleRendererMode;
  /** Paragraph count to render when mode === 'preview'. Defaults to 2. */
  previewParagraphCount?: number;
  /**
   * Resolves an image id to a URL. Production wires this to `papi-er://images/{id}`; Storybook
   * stories supply placehold.co URLs (FN-009). When undefined images render with no `src`.
   */
  imageUrlResolver?: (imageId: string) => string;

  /** Click callbacks - parent dispatches navigation / overlays. */
  onVerseLinkClick?: (link: ArticleVerseLinkData) => void;
  onCrossReferenceClick?: (ref: ArticleCrossRefData) => void;
  onImageClick?: (imageId: string) => void;

  localizedStringsWithLoadingState?: [ArticleRendererLocalizedStrings, boolean];
};

/**
 * Splits paragraph text on each verse link's displayText so the link can be rendered inline as a
 * Button. Falls back to plain text when no verse links exist. Uses the simplest possible split -
 * exact occurrence of `displayText` - which matches the structure produced by the backend
 * (paragraph text contains the human-readable form; the structured link supplies the routing
 * payload). Each segment receives a stable key derived from the verse link's rawReference (which is
 * globally unique per link) plus a "pre"/"link"/"tail" suffix.
 */
function renderParagraphInline(
  paragraph: ArticleParagraphData,
  verseLinkAriaLabel: string,
  onVerseLinkClick: (link: ArticleVerseLinkData) => void,
): ReactNode {
  if (paragraph.verseLinks.length === 0) {
    return paragraph.text;
  }

  let remaining = paragraph.text;
  const segments: ReactNode[] = [];
  paragraph.verseLinks.forEach((link) => {
    const splitIndex = remaining.indexOf(link.displayText);
    if (splitIndex === -1) {
      // Link text not present in paragraph; emit the remaining prefix (if any) and the link
      // inline at the end of the prefix so the link still appears in the rendered output.
      if (remaining) {
        segments.push(<Fragment key={`pre-${link.rawReference}`}>{remaining}</Fragment>);
        remaining = '';
      }
      segments.push(
        <Button
          key={`link-${link.rawReference}`}
          variant="link"
          className="tw:h-auto tw:p-0 tw:align-baseline tw:text-sm"
          aria-label={verseLinkAriaLabel}
          data-testid={`verse-link-${link.rawReference}`}
          onClick={() => onVerseLinkClick(link)}
        >
          {link.displayText}
        </Button>,
      );
      return;
    }

    const before = remaining.slice(0, splitIndex);
    if (before) {
      segments.push(<Fragment key={`pre-${link.rawReference}`}>{before}</Fragment>);
    }
    segments.push(
      <Button
        key={`link-${link.rawReference}`}
        variant="link"
        className="tw:h-auto tw:p-0 tw:align-baseline tw:text-sm"
        aria-label={verseLinkAriaLabel}
        data-testid={`verse-link-${link.rawReference}`}
        onClick={() => onVerseLinkClick(link)}
      >
        {link.displayText}
      </Button>,
    );
    remaining = remaining.slice(splitIndex + link.displayText.length);
  });
  if (remaining) {
    segments.push(<Fragment key="tail">{remaining}</Fragment>);
  }
  return segments;
}

/**
 * Pure presentational component that renders an `ArticleData` DTO as React. Used by both the
 * EncyclopediaTab inline preview (mode='preview') and the ArticleViewer drawer (mode='full',
 * UI-PKG-006). Per Theme 3, no HTML strings are rendered - the backend ships structured paragraph
 * data and this component composes it with shadcn primitives.
 *
 * Mode behavior:
 *
 * - 'preview' renders up to `previewParagraphCount` paragraphs (default 2), omits abbreviation
 *   `<abbr>` tags, and skips inline images on truncated paragraphs. Cross-references are always
 *   shown so the user can pivot.
 * - 'full' renders every paragraph with inline images and abbreviation tooltips.
 */
export function ArticleRenderer({
  article,
  mode = 'full',
  previewParagraphCount = 2,
  imageUrlResolver,
  onVerseLinkClick = () => {},
  onCrossReferenceClick = () => {},
  onImageClick = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: ArticleRendererProps) {
  const getLocalizedString = (key: ArticleRendererLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const seeAlsoHeader = String(getLocalizedString('%enhancedResources_article_seeAlsoHeader%'));
  const referencesHeader = String(
    getLocalizedString('%enhancedResources_article_referencesHeader%'),
  );
  const imageAltLabel = String(getLocalizedString('%enhancedResources_article_imageAltLabel%'));
  const inlineImageOpenLabel = String(
    getLocalizedString('%enhancedResources_article_inlineImageOpenLabel%'),
  );
  const crossRefOpenLabel = String(
    getLocalizedString('%enhancedResources_article_crossReferenceOpenLabel%'),
  );
  const verseLinkOpenLabel = String(
    getLocalizedString('%enhancedResources_article_verseLinkOpenLabel%'),
  );
  const emptyMessage = String(getLocalizedString('%enhancedResources_article_emptyArticle%'));
  const truncatedNotice = String(getLocalizedString('%enhancedResources_article_truncatedNotice%'));

  if (!article) {
    return (
      <div role="status" className="tw:py-2 tw:text-xs tw:italic tw:text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const isPreview = mode === 'preview';
  const paragraphsToRender = isPreview
    ? article.paragraphs.slice(0, Math.max(0, previewParagraphCount))
    : article.paragraphs;
  const truncated = isPreview && article.paragraphs.length > paragraphsToRender.length;

  // Aggregate verse references to render as a "References" footer (mirrors the wireframe).
  const allVerseLinks: ArticleVerseLinkData[] = article.paragraphs.flatMap((p) => p.verseLinks);

  return (
    <article
      data-testid={`article-renderer-${article.articleId}`}
      className={cn('tw:flex tw:flex-col tw:gap-3', isPreview ? 'tw:text-sm' : 'tw:text-base')}
    >
      {!isPreview && <h3 className="tw:text-base tw:font-semibold">{article.title}</h3>}
      <div className="tw:flex tw:flex-col tw:gap-2">
        {paragraphsToRender.map((paragraph, idx) => {
          const showInlineImages = !isPreview && paragraph.inlineImageIds.length > 0;
          return (
            // Paragraph order is the only stable identity; backend doesn't ship paragraph ids.
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} className="tw:flex tw:flex-col tw:gap-2">
              <p className="tw:leading-relaxed">
                {renderParagraphInline(paragraph, verseLinkOpenLabel, onVerseLinkClick)}
              </p>
              {showInlineImages && (
                <div className="tw:flex tw:flex-wrap tw:gap-2">
                  {paragraph.inlineImageIds.map((imageId) => {
                    const url = imageUrlResolver?.(imageId);
                    return (
                      <button
                        type="button"
                        key={imageId}
                        aria-label={inlineImageOpenLabel}
                        data-testid={`article-image-${imageId}`}
                        onClick={() => onImageClick(imageId)}
                        className="tw:overflow-hidden tw:rounded tw:border tw:border-border tw:bg-muted/30 tw:p-0"
                      >
                        {url ? (
                          <img
                            src={url}
                            alt={`${imageAltLabel}: ${imageId}`}
                            className="tw:block tw:h-auto tw:max-w-[240px]"
                          />
                        ) : (
                          <span className="tw:block tw:px-3 tw:py-6 tw:text-xs tw:text-muted-foreground">
                            {imageId}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {truncated && (
          <p className="tw:text-xs tw:italic tw:text-muted-foreground">{truncatedNotice}</p>
        )}
      </div>

      {allVerseLinks.length > 0 && (
        <section aria-label={referencesHeader}>
          <h4 className="tw:mb-1 tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
            {referencesHeader}
          </h4>
          <div className="tw:flex tw:flex-wrap tw:gap-2">
            {allVerseLinks.map((link) => (
              <Button
                key={link.rawReference}
                variant="link"
                className="tw:h-auto tw:p-0 tw:text-sm"
                aria-label={verseLinkOpenLabel}
                data-testid={`verse-link-footer-${link.rawReference}`}
                onClick={() => onVerseLinkClick(link)}
              >
                {link.displayText}
              </Button>
            ))}
          </div>
        </section>
      )}

      {article.crossReferences.length > 0 && (
        <section aria-label={seeAlsoHeader}>
          <h4 className="tw:mb-1 tw:text-xs tw:font-semibold tw:uppercase tw:text-muted-foreground">
            {seeAlsoHeader}
          </h4>
          <ul className="tw:flex tw:flex-col tw:gap-1">
            {article.crossReferences.map((ref) => (
              <li key={`${ref.type}-${ref.targetArticleId}`}>
                <Button
                  variant="link"
                  className="tw:h-auto tw:p-0 tw:text-sm"
                  aria-label={crossRefOpenLabel}
                  data-testid={`see-also-${ref.targetArticleId}`}
                  onClick={() => onCrossReferenceClick(ref)}
                >
                  {ref.displayText}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

export default ArticleRenderer;
