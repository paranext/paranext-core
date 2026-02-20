import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import DOMPurify from 'dompurify';
import type { EncyclopediaEntry } from './encyclopedia-item.component';

// --- Types ---

/** Overlay stack entry representing a single article viewer in the overlay stack */
export interface OverlayStackEntry {
  /** The encyclopedia entry being displayed */
  entry: EncyclopediaEntry;
  /** Index in the display list for prev/next navigation */
  displayIndex: number;
  /** Total items in the display list */
  totalItems: number;
}

/** Props for the ArticleViewer component */
export interface ArticleViewerProps {
  /** The overlay stack of article entries (newest on top) */
  overlayStack: OverlayStackEntry[];
  /** Callback when the top overlay is closed (pop from stack) */
  onClose: () => void;
  /** Callback to navigate to a scripture verse reference */
  onNavigateVerse: (verseRef: string) => void;
  /** Callback to open a linked article (push onto stack) */
  onOpenArticle: (entry: EncyclopediaEntry) => void;
  /** Callback to open an image in the MediaViewer */
  onOpenImage: (imageId: string) => void;
  /** Callback to navigate to the previous article in the display list */
  onNavigatePrev: () => void;
  /** Callback to navigate to the next article in the display list */
  onNavigateNext: () => void;
}

// --- Constants ---

/** Maximum depth for nested article overlays to prevent infinite recursion */
const MAX_OVERLAY_DEPTH = 10;

/** Localization keys used by the ArticleViewer */
const ARTICLE_VIEWER_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_articleViewer_close%',
  '%enhancedResources_articleViewer_prevArticle%',
  '%enhancedResources_articleViewer_nextArticle%',
  '%enhancedResources_articleViewer_depthLimitReached%',
];

// --- Sanitizer configuration ---

/**
 * Sanitizes article HTML content from the backend. Uses DOMPurify with a configuration that allows
 * standard HTML formatting elements plus data attributes used for interactive links (scripture
 * references, cross-references, and image links).
 */
function sanitizeArticleHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['sup', 'sub', 'img'],
    ADD_ATTR: ['data-verse-ref', 'data-article-id', 'data-image-id', 'data-link-type'],
    ALLOWED_TAGS: [
      'p',
      'br',
      'b',
      'i',
      'strong',
      'em',
      'u',
      's',
      'span',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
      'code',
      'pre',
      'sup',
      'sub',
      'img',
      'table',
      'tr',
      'td',
      'th',
      'thead',
      'tbody',
    ],
    ALLOWED_ATTR: [
      'style',
      'href',
      'target',
      'rel',
      'class',
      'dir',
      'src',
      'alt',
      'width',
      'height',
      'data-verse-ref',
      'data-article-id',
      'data-image-id',
      'data-link-type',
    ],
  });
}

// --- Component ---

/**
 * ArticleViewer is an overlay component that displays full encyclopedia articles within the
 * research pane area. It is triggered when a user clicks "Read full article" from the
 * EncyclopediaTab or when a cross-reference (see-also) link is followed from within an article.
 *
 * The overlay fills the parent content area and provides:
 *
 * - Navigation between articles (prev/next buttons, arrow keys)
 * - Close button (X) or Escape key to return to the encyclopedia tab list
 * - Scripture reference links that navigate the main viewer verse
 * - "See also" links that open nested ArticleViewer overlays (push/pop stack)
 * - Inline image links that launch MediaViewer overlay
 *
 * The overlay stack manages recursive nesting with a depth limit of 10.
 */
export default function ArticleViewer({
  overlayStack,
  onClose,
  onNavigateVerse,
  onOpenArticle,
  onNavigatePrev,
  onNavigateNext,
  onOpenImage,
}: ArticleViewerProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => ARTICLE_VIEWER_LOCALIZED_KEYS, []));

  const contentRef = useRef<HTMLDivElement | undefined>(undefined);

  // Callback ref for the content container
  const setContentRef = useCallback((element: HTMLDivElement) => {
    contentRef.current = element;
  }, []);

  // Current overlay entry is the top of the stack
  const currentEntry = overlayStack.length > 0 ? overlayStack[overlayStack.length - 1] : undefined;

  // Navigation state
  const hasPrev = currentEntry ? currentEntry.displayIndex > 0 : false;
  const hasNext = currentEntry ? currentEntry.displayIndex < currentEntry.totalItems - 1 : false;

  // Whether we can push more overlays onto the stack
  const canPushMore = overlayStack.length < MAX_OVERLAY_DEPTH;

  // Sanitize article HTML
  const sanitizedHtml = useMemo(() => {
    if (!currentEntry) return '';
    return sanitizeArticleHtml(currentEntry.entry.articleHtml);
  }, [currentEntry]);

  // --- Keyboard navigation ---
  useEffect(() => {
    if (!currentEntry) return undefined;

    function handleKeyDown(event: KeyboardEvent) {
      // Only handle keys when this overlay is the active one
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose();
      } else if (event.key === 'ArrowLeft' && hasPrev) {
        event.preventDefault();
        onNavigatePrev();
      } else if (event.key === 'ArrowRight' && hasNext) {
        event.preventDefault();
        onNavigateNext();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentEntry, hasPrev, hasNext, onClose, onNavigatePrev, onNavigateNext]);

  // --- Focus management: focus the content area when overlay opens ---
  useEffect(() => {
    if (currentEntry && contentRef.current) {
      contentRef.current.focus();
    }
  }, [currentEntry]);

  // --- Event delegation: handle clicks on interactive links within article HTML ---
  const handleContentClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { target } = event;
      if (!(target instanceof HTMLElement)) return;

      // Check for scripture reference link
      const verseLink = target.closest('[data-verse-ref]');
      if (verseLink instanceof HTMLElement) {
        event.preventDefault();
        const verseRef = verseLink.getAttribute('data-verse-ref');
        if (verseRef) onNavigateVerse(verseRef);
        return;
      }

      // Check for see-also / cross-reference link
      const articleLink = target.closest('[data-article-id]');
      if (articleLink instanceof HTMLElement) {
        event.preventDefault();
        if (!canPushMore) return;
        const articleId = articleLink.getAttribute('data-article-id');
        if (articleId) {
          // Create a minimal entry for the linked article
          const linkedEntry: EncyclopediaEntry = {
            id: articleId,
            title: articleLink.textContent ?? articleId,
            articleHtml: '',
            scriptureRefs: [],
          };
          onOpenArticle(linkedEntry);
        }
        return;
      }

      // Check for image link
      const imageLink = target.closest('[data-image-id]');
      if (imageLink instanceof HTMLElement) {
        event.preventDefault();
        const imageId = imageLink.getAttribute('data-image-id');
        if (imageId) onOpenImage(imageId);
      }
    },
    [canPushMore, onNavigateVerse, onOpenArticle, onOpenImage],
  );

  // Don't render if overlay stack is empty
  if (!currentEntry) return undefined;

  return (
    <div
      data-testid="article-viewer-overlay"
      className="tw-absolute tw-inset-0 tw-z-50 tw-flex tw-flex-col tw-bg-background tw-border tw-border-border tw-shadow-lg"
      role="dialog"
      aria-label={currentEntry.entry.title}
      aria-modal="true"
    >
      {/* Header bar: prev, title, next, close */}
      <div className="tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1.5 tw-border-b tw-bg-muted/30 tw-shrink-0">
        {/* Previous button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="tw-h-7 tw-w-7 tw-p-0 tw-shrink-0"
          onClick={onNavigatePrev}
          disabled={!hasPrev}
          aria-label={localizedStrings['%enhancedResources_articleViewer_prevArticle%']}
        >
          <ArrowLeft className="tw-h-4 tw-w-4" />
        </Button>

        {/* Article title */}
        <span className="tw-flex-1 tw-text-sm tw-font-medium tw-truncate tw-px-2">
          {currentEntry.entry.title}
        </span>

        {/* Next button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="tw-h-7 tw-w-7 tw-p-0 tw-shrink-0"
          onClick={onNavigateNext}
          disabled={!hasNext}
          aria-label={localizedStrings['%enhancedResources_articleViewer_nextArticle%']}
        >
          <ArrowRight className="tw-h-4 tw-w-4" />
        </Button>

        {/* Close button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="tw-h-7 tw-w-7 tw-p-0 tw-shrink-0"
          onClick={onClose}
          aria-label={localizedStrings['%enhancedResources_articleViewer_close%']}
        >
          <X className="tw-h-4 tw-w-4" />
        </Button>
      </div>

      {/* Depth limit warning */}
      {!canPushMore ? (
        <div className="tw-px-3 tw-py-1 tw-text-xs tw-text-muted-foreground tw-bg-yellow-50 tw-border-b tw-border-yellow-200 tw-shrink-0">
          {localizedStrings['%enhancedResources_articleViewer_depthLimitReached%']}
        </div>
      ) : undefined}

      {/* Article content area */}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
      <div
        ref={setContentRef}
        role="document"
        tabIndex={0}
        data-testid="article-viewer-content"
        className="tw-flex-1 tw-overflow-auto tw-p-4 tw-min-h-0"
        onClick={handleContentClick}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
      {/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
    </div>
  );
}
