import { useCallback, useEffect, useMemo, useState } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';

/** Article data shape from backend */
interface ArticleData {
  title: string;
  sections: ArticleSection[];
  seeAlso: SeeAlsoEntry[];
  gotoVerseRefs: GotoVerseEntry[];
  images: ArticleImage[];
  abbreviations: AbbreviationEntry[];
}

/** A section within an article (h2 + paragraphs) */
interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

/** Cross-reference "see also" link */
interface SeeAlsoEntry {
  entryId: string;
  label: string;
}

/** Scripture "goto verse" reference */
interface GotoVerseEntry {
  verseRef: string;
  label: string;
}

/** Inline image within article content */
interface ArticleImage {
  imageId: string;
  alt: string;
  base64Data?: string;
}

/** Abbreviation with tooltip expansion */
interface AbbreviationEntry {
  abbreviation: string;
  expansion: string;
}

/** Backend service interface for article data */
interface ERArticleService {
  getEncyclopediaArticle: (input: { entryId: string }) => Promise<ArticleData | undefined>;
}

/** Fallback article data keyed by entry ID */
const FALLBACK_ARTICLES: Record<string, ArticleData> = {
  'encyc-001': {
    title: 'Creation',
    sections: [
      {
        heading: 'Biblical Account',
        paragraphs: [
          'The creation narrative in Genesis describes how God created the heavens and the earth over six days, culminating in a day of rest.',
          'The account begins with the creation of light and the separation of light from darkness on the first day.',
        ],
      },
      {
        heading: 'Theological Significance',
        paragraphs: [
          'Creation theology establishes God as the sovereign creator of all things, laying the foundation for biblical cosmology and anthropology.',
        ],
      },
    ],
    seeAlso: [
      { entryId: 'encyc-002', label: 'Heaven' },
      { entryId: 'encyc-003', label: 'Earth' },
    ],
    gotoVerseRefs: [
      { verseRef: 'GEN 1:1', label: 'Gen. 1:1' },
      { verseRef: 'GEN 2:4', label: 'Gen. 2:4' },
    ],
    images: [
      {
        imageId: 'img-001',
        alt: 'Creation of the World',
      },
    ],
    abbreviations: [
      { abbreviation: 'Heb.', expansion: 'Hebrew' },
      { abbreviation: 'cf.', expansion: 'compare, confer' },
    ],
  },
  'encyc-002': {
    title: 'Heaven',
    sections: [
      {
        heading: 'Definition',
        paragraphs: [
          'In biblical usage, heaven refers to the sky or firmament, and also to the dwelling place of God.',
        ],
      },
      {
        heading: 'Old Testament Usage',
        paragraphs: [
          'The Hebrew word shamayim is used to describe the expanse above the earth where birds fly and rain originates.',
        ],
      },
    ],
    seeAlso: [
      { entryId: 'encyc-001', label: 'Creation' },
      { entryId: 'encyc-003', label: 'Earth' },
    ],
    gotoVerseRefs: [{ verseRef: 'GEN 1:1', label: 'Gen. 1:1' }],
    images: [],
    abbreviations: [
      { abbreviation: 'Heb.', expansion: 'Hebrew' },
      { abbreviation: 'OT', expansion: 'Old Testament' },
    ],
  },
  'encyc-003': {
    title: 'Earth',
    sections: [
      {
        heading: 'Biblical Concept',
        paragraphs: [
          'The earth in biblical literature refers to the physical world created by God as a habitation for humanity.',
        ],
      },
      {
        heading: 'Symbolism',
        paragraphs: [
          'Earth frequently symbolizes the domain of human activity, in contrast with heaven as the domain of God.',
        ],
      },
    ],
    seeAlso: [
      { entryId: 'encyc-001', label: 'Creation' },
      { entryId: 'encyc-002', label: 'Heaven' },
    ],
    gotoVerseRefs: [{ verseRef: 'GEN 1:1', label: 'Gen. 1:1' }],
    images: [],
    abbreviations: [{ abbreviation: 'cf.', expansion: 'compare, confer' }],
  },
};

/** Default fallback when entry not found */
const DEFAULT_ARTICLE: ArticleData = {
  title: 'Article',
  sections: [
    {
      heading: 'Content',
      paragraphs: ['Article content is not available.'],
    },
  ],
  seeAlso: [],
  gotoVerseRefs: [],
  images: [],
  abbreviations: [],
};

// Placeholder SVG for inline images when no real image data is available
const PLACEHOLDER_IMAGE_SVG = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='120' viewBox='0 0 160 120'>" +
    "<rect fill='#e5e7eb' width='160' height='120'/>" +
    "<text fill='#6b7280' font-family='sans-serif' font-size='12' text-anchor='middle' x='80' y='60'>Image</text>" +
    '</svg>',
)}`;

/** Localized string keys used by ArticleViewer */
const ARTICLE_VIEWER_LOCALIZED_KEYS = [
  '%platformEnhancedResources_articleViewer_close%',
  '%platformEnhancedResources_articleViewer_seeAlso%',
  '%platformEnhancedResources_articleViewer_scripture%',
] as const;

/** Props for the ArticleViewer component */
interface ArticleViewerProps {
  /** Encyclopedia entry ID to display */
  entryId: string;
  /** Callback when the viewer should be closed */
  onClose: () => void;
  /** Callback to open media viewer for an inline image */
  onOpenMedia?: (imageId: string) => void;
}

/**
 * ArticleViewer overlay component. Displays a full encyclopedia article with structured headings,
 * paragraphs, cross-reference links (see-also), scripture links (goto-verse), inline images, and
 * abbreviation tooltips. Replaces the Encyclopedia tab content area when an entry is clicked.
 *
 * @param props - ArticleViewerProps
 * @returns Article viewer overlay with formatted article content
 */
export default function ArticleViewer({ entryId, onClose, onOpenMedia }: ArticleViewerProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => [...ARTICLE_VIEWER_LOCALIZED_KEYS], []),
  );

  // Track current entry ID for see-also navigation
  const [currentEntryId, setCurrentEntryId] = useState(entryId);

  // Connect to backend service
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as ERArticleService | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load article data from backend or fallback
  const [articleFromBackend] = usePromise(
    useCallback(async () => {
      if (!erService) return undefined;
      try {
        return await erService.getEncyclopediaArticle({ entryId: currentEntryId });
      } catch {
        return undefined;
      }
    }, [erService, currentEntryId]),
    undefined,
  );

  const article: ArticleData =
    articleFromBackend ?? FALLBACK_ARTICLES[currentEntryId] ?? DEFAULT_ARTICLE;

  // Handle see-also link click: load new article in same viewer
  const handleSeeAlsoClick = useCallback((newEntryId: string) => {
    setCurrentEntryId(newEntryId);
  }, []);

  // Handle inline image click: open media viewer
  const handleImageClick = useCallback(
    (imageId: string) => {
      if (onOpenMedia) {
        onOpenMedia(imageId);
      }
    },
    [onOpenMedia],
  );

  // Keyboard handler for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Localized strings with fallbacks
  const closeLabel = localizedStrings['%platformEnhancedResources_articleViewer_close%'] || 'Close';
  const seeAlsoLabel =
    localizedStrings['%platformEnhancedResources_articleViewer_seeAlso%'] || 'See also';
  const scriptureLabel =
    localizedStrings['%platformEnhancedResources_articleViewer_scripture%'] || 'Scripture';

  return (
    <div data-testid="article-viewer" className="tw-flex tw-flex-col tw-h-full tw-bg-background">
      {/* Header with close button */}
      <div className="tw-flex tw-items-center tw-justify-end tw-px-3 tw-py-2 tw-border-b tw-border-border tw-shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="tw-text-muted-foreground hover:tw-text-foreground tw-transition-colors"
          aria-label={closeLabel}
        >
          {closeLabel}
        </button>
      </div>

      {/* Scrollable article content */}
      <div data-testid="er-article-content" className="tw-flex-1 tw-overflow-auto tw-px-4 tw-py-3">
        {/* Article title (H1) */}
        <h1 className="tw-text-xl tw-font-bold tw-mb-3">{article.title}</h1>

        {/* Inline images near the top of the article for visibility */}
        {article.images.length > 0 && (
          <div className="tw-flex tw-flex-wrap tw-gap-2 tw-mb-3">
            {article.images.map((image) => (
              <button
                key={image.imageId}
                type="button"
                data-testid={`er-article-image-${image.imageId}`}
                className="tw-cursor-pointer tw-border-0 tw-bg-transparent tw-p-0"
                onClick={() => handleImageClick(image.imageId)}
                aria-label={image.alt}
              >
                <img
                  src={
                    image.base64Data
                      ? `data:image/png;base64,${image.base64Data}`
                      : PLACEHOLDER_IMAGE_SVG
                  }
                  alt={image.alt}
                  className="tw-max-w-32 tw-max-h-24 tw-object-contain tw-rounded tw-border tw-border-border"
                />
              </button>
            ))}
          </div>
        )}

        {/* Article sections with H2 headings and paragraphs */}
        {article.sections.map((section, sectionIdx) => (
          <div key={`section-${section.heading}-${String(sectionIdx)}`} className="tw-mb-3">
            <h2 className="tw-text-base tw-font-semibold tw-mb-1">{section.heading}</h2>
            {section.paragraphs.map((paragraph, paraIdx) => (
              <p
                key={`para-${String(sectionIdx)}-${String(paraIdx)}`}
                className="tw-text-sm tw-leading-relaxed tw-mb-1"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        {/* Abbreviations inline in content (rendered as tooltip links) */}
        {article.abbreviations.length > 0 && (
          <div className="tw-mb-4 tw-text-sm">
            {article.abbreviations.map((abbrev) => (
              <a
                key={abbrev.abbreviation}
                title={abbrev.expansion}
                className="tw-text-muted-foreground tw-mr-2 tw-cursor-help tw-no-underline"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                {abbrev.abbreviation}
              </a>
            ))}
          </div>
        )}

        {/* Goto verse links */}
        {article.gotoVerseRefs.length > 0 && (
          <div className="tw-mb-4">
            <span className="tw-text-sm tw-font-medium tw-mr-2">{`${scriptureLabel}:`}</span>
            {article.gotoVerseRefs.map((ref, refIdx) => (
              <a
                key={`goto-${ref.verseRef}`}
                data-testid={`er-article-goto-${String(refIdx)}`}
                href="#"
                className="tw-text-sm tw-text-primary tw-underline tw-mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  // Goto verse action - article viewer stays open
                }}
              >
                {ref.label}
              </a>
            ))}
          </div>
        )}

        {/* See also cross-reference links */}
        {article.seeAlso.length > 0 && (
          <div className="tw-mb-4">
            <span className="tw-text-sm tw-font-medium tw-mr-2">{`${seeAlsoLabel}:`}</span>
            {article.seeAlso.map((link, linkIdx) => (
              <a
                key={`seealso-${link.entryId}`}
                data-testid={`er-article-seealso-${String(linkIdx)}`}
                href="#"
                className="tw-text-sm tw-text-primary tw-underline tw-mr-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleSeeAlsoClick(link.entryId);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
