import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise } from 'platform-bible-react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import ScriptureContextMenu from './scripture-context-menu.component';
import FootnotesPane from './footnotes-pane.component';

/** Localized string keys used by the scripture pane */
const SCRIPTURE_LOCALIZED_KEYS = [
  '%platformEnhancedResources_ctx_find_sense%',
  '%platformEnhancedResources_ctx_copy_surface%',
  '%platformEnhancedResources_ctx_find_lemma%',
  '%platformEnhancedResources_ctx_copy_lemma%',
  '%platformEnhancedResources_scripture_loading%',
] as const;

/** Result from generateScriptureHtml PAPI call */
interface ScriptureHtmlResult {
  /** The scripture chapter HTML with linked word spans */
  scriptureHtml: string;
  /** Footnotes HTML content */
  footnotesHtml: string;
}

/** Result from generateTooltip PAPI call */
interface TooltipResult {
  /** The gloss/definition text for the tooltip */
  glossText: string;
}

/** Result from parseLexicalLinks PAPI call */
interface LexicalLinkResult {
  /** The lemma identifier */
  lemma: string;
  /** Display text (transliteration) */
  displayText: string;
}

/** Props for the ScripturePane component */
interface ScripturePaneProps {
  /** Current scripture reference from scroll group */
  scrRef: SerializedVerseRef | undefined;
  /** Callback when a linked word is clicked to filter the research pane */
  onWordClick?: (lemma: string, displayText: string) => void;
  /** Callback when filter should be cleared (clicking empty area) */
  onClearFilter?: () => void;
  /** Whether a word filter is currently active */
  isFilterActive?: boolean;
  /** Whether Research Terms highlight (blue) is on - controls showeverylink class */
  researchTermsOn?: boolean;
  /** Whether Found highlight (gray) is on - controls showfound class */
  foundOn?: boolean;
  /** Whether Missing highlight (orange) is on - controls showmissing class */
  missingOn?: boolean;
}

/**
 * Scripture pane component that displays formatted scripture text with interactive linked words.
 * Renders HTML from the backend, supports context menu, tooltips, footnotes toggle, and highlight
 * CSS classes.
 *
 * @param props - ScripturePaneProps
 * @returns The scripture pane with linked words, context menu, and footnotes
 */
export default function ScripturePane({
  scrRef,
  onWordClick,
  onClearFilter,
  isFilterActive = false,
  researchTermsOn = true,
  foundOn = false,
  missingOn = false,
}: ScripturePaneProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => [...SCRIPTURE_LOCALIZED_KEYS], []));
  const [footnotesVisible, setFootnotesVisible] = useState(false);
  const [activeContextWord, setActiveContextWord] = useState('');
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showTooltip, setShowTooltip] = useState(false);
  // eslint-disable-next-line no-null/no-null
  const contentRef = useRef<HTMLDivElement>(null);

  // Connect to the enhanced resources backend service
  const [erService] = usePromise(
    useCallback(async () => {
      try {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return (await papi.networkObjects.get('enhancedResources')) as
          | {
              generateScriptureHtml: (input: {
                verseRef: SerializedVerseRef;
              }) => Promise<ScriptureHtmlResult>;
              generateTooltip: (input: { lemma: string }) => Promise<TooltipResult>;
              parseLexicalLinks: (input: { tokenId: string }) => Promise<LexicalLinkResult>;
            }
          | undefined;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Load scripture HTML when reference changes
  const [scriptureData] = usePromise(
    useCallback(async () => {
      if (!erService || !scrRef) return undefined;
      try {
        const result = await erService.generateScriptureHtml({ verseRef: scrRef });
        return result;
      } catch {
        return undefined;
      }
    }, [erService, scrRef]),
    undefined,
  );

  // Fallback scripture HTML when backend is unavailable (BHV-608)
  // Provides sample linked words so toolbar interactions can be verified
  const fallbackScriptureHtml =
    '<p><sup>1</sup> In the beginning ' +
    '<span class="researchable-word" data-token-id="t001" data-lemma="elohim" data-gloss="God" tabindex="0">God</span> ' +
    'created the ' +
    '<span class="researchable-word" data-token-id="t002" data-lemma="shamayim" data-gloss="heavens" tabindex="0">heavens</span> ' +
    'and the ' +
    '<span class="researchable-word" data-token-id="t003" data-lemma="erets" data-gloss="earth" tabindex="0">earth</span>. ' +
    '<sup>2</sup> Now the earth was formless and empty, darkness was over the surface of the deep, and the ' +
    '<span class="researchable-word" data-token-id="t004" data-lemma="ruach" data-gloss="Spirit" tabindex="0">Spirit</span> ' +
    'of God was hovering over the waters.</p>';

  const scriptureHtml = scriptureData?.scriptureHtml || fallbackScriptureHtml;
  const footnotesHtml = scriptureData?.footnotesHtml ?? '';

  // Build the HTML content for dangerouslySetInnerHTML
  const contentHtml = useMemo(() => ({ __html: scriptureHtml }), [scriptureHtml]);

  // Build CSS class string for scripture content based on highlight flags (BHV-404)
  const contentClassName = useMemo(() => {
    const classes: string[] = [];
    if (researchTermsOn) classes.push('showeverylink');
    if (foundOn) classes.push('showfound');
    if (missingOn) classes.push('showmissing');
    return classes.join(' ');
  }, [researchTermsOn, foundOn, missingOn]);

  // Handle F7 key to toggle footnotes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F7') {
        e.preventDefault();
        setFootnotesVisible((prev) => !prev);
      }
    };
    // Listen on the document so F7 works regardless of focus
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle clicks on linked words or empty space
  const handleContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const target = e.target as HTMLElement;

      // Check if clicked on a linked (researchable) word
      if (target.classList.contains('researchable-word')) {
        const tokenId = target.getAttribute('data-token-id') ?? '';
        const lemma = target.getAttribute('data-lemma') ?? '';
        const displayText = target.textContent ?? '';

        if (onWordClick && lemma) {
          onWordClick(lemma, displayText);
        }

        // Also try to parse via PAPI if service is available
        if (erService && tokenId) {
          erService.parseLexicalLinks({ tokenId }).catch(() => {
            // Silently handle errors
          });
        }

        e.stopPropagation();
        return;
      }

      // Clicking empty area clears filter if active
      if (isFilterActive && onClearFilter) {
        onClearFilter();
      }
    },
    [onWordClick, onClearFilter, isFilterActive, erService],
  );

  // Handle keyboard events for accessibility (mirrors click behavior)
  const handleContentKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const target = e.target as HTMLElement;
        if (target.classList.contains('researchable-word')) {
          const lemma = target.getAttribute('data-lemma') ?? '';
          const displayText = target.textContent ?? '';
          if (onWordClick && lemma) {
            onWordClick(lemma, displayText);
          }
          e.preventDefault();
        }
      }
    },
    [onWordClick],
  );

  // Handle right-click for context menu - capture the word being right-clicked
  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const target = e.target as HTMLElement;
    if (target.classList.contains('researchable-word')) {
      setActiveContextWord(target.textContent ?? '');
    } else {
      setActiveContextWord('');
    }
  }, []);

  // Handle hover for tooltip on linked words
  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const target = e.target as HTMLElement;
      if (target.classList.contains('researchable-word')) {
        const lemma = target.getAttribute('data-lemma') ?? '';
        const rect = target.getBoundingClientRect();
        setTooltipPosition({ x: rect.left, y: rect.bottom });

        if (erService && lemma) {
          erService
            .generateTooltip({ lemma })
            .then((result) => {
              setTooltipText(result.glossText);
              setShowTooltip(true);
              return undefined;
            })
            .catch(() => {
              setTooltipText(lemma);
              setShowTooltip(true);
            });
        } else {
          setTooltipText(target.getAttribute('data-gloss') ?? lemma);
          setShowTooltip(true);
        }
      }
    },
    [erService],
  );

  const handleMouseOut = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const target = e.target as HTMLElement;
    if (target.classList.contains('researchable-word')) {
      setShowTooltip(false);
    }
  }, []);

  // Handle focus/blur for accessibility (mirrors mouse hover behavior)
  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const target = e.target as HTMLElement;
    if (target.classList.contains('researchable-word')) {
      const lemma = target.getAttribute('data-lemma') ?? '';
      setTooltipText(target.getAttribute('data-gloss') ?? lemma);
      const rect = target.getBoundingClientRect();
      setTooltipPosition({ x: rect.left, y: rect.bottom });
      setShowTooltip(true);
    }
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const target = e.target as HTMLElement;
    if (target.classList.contains('researchable-word')) {
      setShowTooltip(false);
    }
  }, []);

  // Handle "Copy surface form" context menu action
  const handleCopySurfaceForm = useCallback((word: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(word).catch(() => {
        // Silently handle clipboard errors
      });
    }
  }, []);

  // Handle "Find this sense" context menu action
  const handleFindSense = useCallback(
    (word: string) => {
      if (onWordClick) {
        onWordClick(word, word);
      }
    },
    [onWordClick],
  );

  const loadingText =
    localizedStrings['%platformEnhancedResources_scripture_loading%'] || 'Loading...';

  return (
    <div className="tw-h-full tw-flex tw-flex-col tw-overflow-hidden">
      <ScriptureContextMenu
        activeWord={activeContextWord}
        localizedStrings={localizedStrings}
        onFindSense={handleFindSense}
        onCopySurfaceForm={handleCopySurfaceForm}
        onFindLemma={handleFindSense}
        onCopyLemma={handleCopySurfaceForm}
      >
        <div className="tw-flex-1 tw-overflow-auto tw-p-4">
          {/* Scripture content area with interactive linked words - requires event handlers */}
          {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
          <div
            ref={contentRef}
            data-testid="scripture-content"
            className={contentClassName}
            role="document"
            aria-label="Scripture content"
            onClick={handleContentClick}
            onKeyDown={handleContentKeyDown}
            onContextMenu={handleContextMenu}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {scriptureHtml ? (
              // eslint-disable-next-line react/no-danger
              <div dangerouslySetInnerHTML={contentHtml} />
            ) : (
              <p className="tw-text-sm tw-text-muted-foreground">{loadingText}</p>
            )}
          </div>
          {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}

          {/* Tooltip on hover */}
          {showTooltip && tooltipText && (
            <div
              data-testid="word-tooltip"
              className="tw-fixed tw-z-50 tw-bg-popover tw-text-popover-foreground tw-px-3 tw-py-1.5 tw-text-sm tw-rounded-md tw-shadow-md tw-border"
              style={{
                left: `${tooltipPosition.x}px`,
                top: `${tooltipPosition.y + 4}px`,
              }}
            >
              {tooltipText}
            </div>
          )}
        </div>
      </ScriptureContextMenu>

      {/* Footnotes pane (hidden by default, toggled with F7) */}
      <FootnotesPane footnotesHtml={footnotesHtml} isVisible={footnotesVisible} />
    </div>
  );
}
