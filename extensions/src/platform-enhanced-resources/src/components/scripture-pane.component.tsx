import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey } from 'platform-bible-utils';
import DOMPurify from 'dompurify';
import {
  Button,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { Minus, Plus } from 'lucide-react';

// --- Types ---

/** Word filter data passed to parent on word click or context menu selection */
export interface WordFilterData {
  lemma: string;
  lexicalLinks: string[];
  surfaceForm: string;
  sourcePane: 'scripture' | 'dictionary';
}

/** Highlight state controlling which term categories are visually highlighted */
export interface HighlightState {
  researchTerms: boolean;
  found: boolean;
  missing: boolean;
}

/** Props for the ScripturePane component */
export interface ScripturePaneProps {
  /** Pre-rendered HTML body for scripture content */
  scriptureHtml: string;
  /** Pre-rendered HTML for footnotes */
  footnoteHtml: string;
  /** Whether footnotes panel is visible */
  showFootnotes: boolean;
  /** Callback when footnote visibility toggles (F7) */
  onShowFootnotesChange: (show: boolean) => void;
  /** Current zoom level (percentage, e.g., 100) */
  zoomLevel: number;
  /** Callback when zoom level changes */
  onZoomChange: (zoom: number) => void;
  /** Callback when a word is clicked (word filter activation) */
  onWordClick: (wordFilter: WordFilterData) => void;
  /** Highlight state from toolbar */
  highlightState: HighlightState;
}

// --- Constants ---

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 10;

/** Localization keys used by this component */
const SCRIPTURE_PANE_LOCALIZED_KEYS: LocalizeKey[] = [
  '%enhancedResources_scripturePane_zoomIn%',
  '%enhancedResources_scripturePane_zoomOut%',
  '%enhancedResources_scripturePane_footnoteToggle%',
  '%enhancedResources_scripturePane_contextMenuSelect%',
  '%enhancedResources_scripturePane_noContent%',
];

/** CSS class for hover-highlighted words (same lemma) */
const HOVER_HIGHLIGHT_CLASS = 'er-lemma-hover';

// --- Sanitizer configuration ---

/**
 * Sanitizes scripture HTML from the backend. Uses a broader config than the default
 * platform-bible-utils sanitizeHtml because the scripture HTML includes data-* attributes on word
 * spans that are critical for click/hover/context-menu interactions.
 */
function sanitizeScriptureHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ['sup', 'sub'],
    ADD_ATTR: [
      'data-lemma',
      'data-lexical-links',
      'data-rendering-status',
      'data-surface-text',
      'data-token-type',
    ],
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
    ],
    ALLOWED_ATTR: [
      'style',
      'href',
      'target',
      'rel',
      'class',
      'dir',
      'data-lemma',
      'data-lexical-links',
      'data-rendering-status',
      'data-surface-text',
      'data-token-type',
    ],
  });
}

// --- Utility: find nearest word element from event target ---

function findWordElement(target: EventTarget | null): HTMLElement | undefined {
  if (!(target instanceof HTMLElement)) return undefined;
  const wordEl = target.closest('[data-lemma]');
  if (wordEl instanceof HTMLElement) return wordEl;
  return undefined;
}

/** Extract word filter data from a word element */
function extractWordFilterData(wordEl: HTMLElement): WordFilterData | undefined {
  const lemma = wordEl.getAttribute('data-lemma');
  if (!lemma) return undefined;

  const lexicalLinksRaw = wordEl.getAttribute('data-lexical-links') ?? '';
  const lexicalLinks = lexicalLinksRaw ? lexicalLinksRaw.split(';').filter(Boolean) : [];
  const surfaceForm = wordEl.getAttribute('data-surface-text') ?? wordEl.textContent ?? '';

  return {
    lemma,
    lexicalLinks,
    surfaceForm,
    sourcePane: 'scripture',
  };
}

// --- Component ---

/**
 * ScripturePane displays pre-rendered HTML scripture content from the Enhanced Resource backend. It
 * supports color-coded term highlights, hover highlighting of same-lemma words, click interaction
 * to activate word filter, right-click context menu, footnote panel toggle via F7, and zoom
 * controls via buttons and keyboard shortcuts.
 */
export default function ScripturePane({
  scriptureHtml,
  footnoteHtml,
  showFootnotes,
  onShowFootnotesChange,
  zoomLevel,
  onZoomChange,
  onWordClick,
  highlightState,
}: ScripturePaneProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => SCRIPTURE_PANE_LOCALIZED_KEYS, []));

  const scriptureContainerRef = useRef<HTMLDivElement | undefined>(undefined);
  const [contextMenuLemmas, setContextMenuLemmas] = useState<WordFilterData[]>([]);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);

  // Callback ref for the scripture container
  const setScriptureContainerRef = useCallback((element: HTMLDivElement) => {
    scriptureContainerRef.current = element;
  }, []);

  // --- Sanitize HTML ---
  const sanitizedScriptureHtml = useMemo(
    () => sanitizeScriptureHtml(scriptureHtml),
    [scriptureHtml],
  );
  const sanitizedFootnoteHtml = useMemo(() => sanitizeScriptureHtml(footnoteHtml), [footnoteHtml]);

  // --- Highlight CSS class based on toggle state ---
  const highlightClasses = useMemo(() => {
    const classes: string[] = [];
    if (highlightState.researchTerms) classes.push('er-highlight-research');
    if (highlightState.found) classes.push('er-highlight-found');
    if (highlightState.missing) classes.push('er-highlight-missing');
    return classes.join(' ');
  }, [highlightState]);

  // --- Zoom handlers ---
  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
    onZoomChange(newZoom);
  }, [zoomLevel, onZoomChange]);

  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
    onZoomChange(newZoom);
  }, [zoomLevel, onZoomChange]);

  // --- Keyboard shortcuts: F7 for footnotes, Ctrl+/- for zoom ---
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'F7') {
        event.preventDefault();
        onShowFootnotesChange(!showFootnotes);
      } else if (event.ctrlKey && (event.key === '=' || event.key === '+')) {
        event.preventDefault();
        const newZoom = Math.min(zoomLevel + ZOOM_STEP, MAX_ZOOM);
        onZoomChange(newZoom);
      } else if (event.ctrlKey && event.key === '-') {
        event.preventDefault();
        const newZoom = Math.max(zoomLevel - ZOOM_STEP, MIN_ZOOM);
        onZoomChange(newZoom);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showFootnotes, onShowFootnotesChange, zoomLevel, onZoomChange]);

  // --- Event delegation: word click ---
  const handleScriptureClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const wordEl = findWordElement(event.target);
      if (!wordEl) return;
      const wordData = extractWordFilterData(wordEl);
      if (wordData) onWordClick(wordData);
    },
    [onWordClick],
  );

  // --- Event delegation: hover highlighting ---
  const handleScriptureMouseOver = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const wordEl = findWordElement(event.target);
    if (!wordEl) return;
    const lemma = wordEl.getAttribute('data-lemma');
    if (!lemma) return;
    const container = scriptureContainerRef.current;
    if (!container) return;
    const sameWords = container.querySelectorAll(`[data-lemma="${CSS.escape(lemma)}"]`);
    for (let i = 0; i < sameWords.length; i += 1) {
      sameWords[i].classList.add(HOVER_HIGHLIGHT_CLASS);
    }
  }, []);

  const handleScriptureMouseOut = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const wordEl = findWordElement(event.target);
    if (!wordEl) return;
    const container = scriptureContainerRef.current;
    if (!container) return;
    const highlighted = container.querySelectorAll(`.${HOVER_HIGHLIGHT_CLASS}`);
    for (let i = 0; i < highlighted.length; i += 1) {
      highlighted[i].classList.remove(HOVER_HIGHLIGHT_CLASS);
    }
  }, []);

  // --- Event delegation: right-click context menu ---
  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const wordEl = findWordElement(event.target);
    if (!wordEl) {
      setContextMenuLemmas([]);
      return;
    }
    const wordData = extractWordFilterData(wordEl);
    if (wordData) {
      setContextMenuLemmas([wordData]);
      setContextMenuOpen(true);
    }
  }, []);

  const handleContextMenuSelect = useCallback(
    (wordData: WordFilterData) => {
      onWordClick(wordData);
      setContextMenuOpen(false);
    },
    [onWordClick],
  );

  // --- Zoom style for the scripture content ---
  const zoomStyle = useMemo(() => ({ fontSize: `${zoomLevel}%` }), [zoomLevel]);

  return (
    <TooltipProvider>
      <div data-testid="scripture-pane" className="tw-flex tw-flex-col tw-h-full tw-min-h-0">
        {/* Zoom controls bar */}
        <div className="tw-flex tw-items-center tw-gap-1 tw-px-2 tw-py-1 tw-border-b tw-bg-background tw-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="tw-h-6 tw-w-6 tw-p-0"
                onClick={handleZoomOut}
                disabled={zoomLevel <= MIN_ZOOM}
                aria-label={localizedStrings['%enhancedResources_scripturePane_zoomOut%']}
              >
                <Minus className="tw-h-3 tw-w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{localizedStrings['%enhancedResources_scripturePane_zoomOut%']}</p>
            </TooltipContent>
          </Tooltip>
          <span className="tw-text-xs tw-text-muted-foreground tw-min-w-[3ch] tw-text-center">
            {zoomLevel}%
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="tw-h-6 tw-w-6 tw-p-0"
                onClick={handleZoomIn}
                disabled={zoomLevel >= MAX_ZOOM}
                aria-label={localizedStrings['%enhancedResources_scripturePane_zoomIn%']}
              >
                <Plus className="tw-h-3 tw-w-3" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{localizedStrings['%enhancedResources_scripturePane_zoomIn%']}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Scripture HTML content area with context menu */}
        <ContextMenu
          onOpenChange={(open: boolean) => {
            if (!open) setContextMenuOpen(false);
          }}
        >
          {/* Word interactions use event delegation on this container div:
              - Click: activates word filter
              - MouseOver/Out: highlights same-lemma words (visual-only, no a11y impact)
              - ContextMenu: builds per-lemma right-click menu
              Keyboard interaction is handled globally via keydown listener (F7, Ctrl+/-) */}
          <ContextMenuTrigger asChild>
            {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-noninteractive-tabindex */}
            <div
              ref={setScriptureContainerRef}
              role="document"
              tabIndex={0}
              className={`tw-flex-1 tw-overflow-auto tw-p-4 tw-cursor-default er-scripture-content ${highlightClasses}`}
              style={zoomStyle}
              onClick={handleScriptureClick}
              onMouseOver={handleScriptureMouseOver}
              onMouseOut={handleScriptureMouseOut}
              onContextMenu={handleContextMenu}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: sanitizedScriptureHtml }}
            />
            {/* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-noninteractive-tabindex */}
          </ContextMenuTrigger>
          {contextMenuOpen && contextMenuLemmas.length > 0 ? (
            <ContextMenuContent>
              {contextMenuLemmas.map((wordData) => (
                <ContextMenuItem
                  key={wordData.lemma}
                  onClick={() => handleContextMenuSelect(wordData)}
                >
                  {localizedStrings['%enhancedResources_scripturePane_contextMenuSelect%']}{' '}
                  {wordData.surfaceForm} ({wordData.lemma})
                </ContextMenuItem>
              ))}
            </ContextMenuContent>
          ) : undefined}
        </ContextMenu>

        {/* Footnote panel (collapsible, toggled via F7) */}
        {showFootnotes && footnoteHtml ? (
          <div
            data-testid="scripture-pane-footnotes"
            className="tw-border-t tw-overflow-auto tw-p-4 tw-bg-muted/30 tw-max-h-[30%] tw-shrink-0"
            style={zoomStyle}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sanitizedFootnoteHtml }}
          />
        ) : undefined}
      </div>
    </TooltipProvider>
  );
}
