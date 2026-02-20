import React, { useCallback, useMemo } from 'react';

/** Represents a text item in the multi-pane display */
export interface MultiPaneTextItem {
  /** Project/resource short name (abbreviation) */
  name: string;
  /** Unique identifier */
  id: string;
  /** Full display name */
  fullName: string;
  /** Language name */
  language: string;
  /** Language identifier (BCP 47) */
  languageId: string;
  /** Font family name */
  fontName: string;
  /** Base font size in points */
  baseFontSize: number;
  /** Whether text is right-to-left */
  isRTL: boolean;
  /** Per-text zoom factor (default 1.0) */
  zoom: number;
  /** Verse text content to render */
  verseText: string;
}

/** Props for the MultiPaneRenderer component */
export interface MultiPaneRendererProps {
  /** Ordered list of text items to display */
  items: MultiPaneTextItem[];
  /** Overall multi-pane zoom factor */
  overallZoom: number;
  /** Index of the currently selected text (highlighted in the multi-pane) */
  selectedIndex: number;
  /** Callback when an abbreviation link is clicked */
  onAbbreviationClick: (index: number) => void;
  /** Callback for context menu on a text block */
  onContextMenu: (index: number, event: React.MouseEvent) => void;
  /** Localized verse reference string to display */
  verseRefDisplay: string;
  /** Aria-label for the multi-pane region */
  ariaLabel?: string;
}

/**
 * Renders the multi-pane view of a text collection. Each text item shows its abbreviation link and
 * verse content at the current reference. Abbreviation links are clickable to select the text for
 * the single-pane view. Right-click triggers a context menu for text management (zoom, reorder,
 * close).
 */
export default function MultiPaneRenderer({
  items,
  overallZoom,
  selectedIndex,
  onAbbreviationClick,
  onContextMenu,
  verseRefDisplay,
  ariaLabel,
}: MultiPaneRendererProps) {
  const handleAbbrevClick = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      onAbbreviationClick(index);
    },
    [onAbbreviationClick],
  );

  const handleCtxMenu = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      onContextMenu(index, e);
    },
    [onContextMenu],
  );

  const renderedItems = useMemo(
    () =>
      items.map((item, index) => {
        const effectiveSize = item.baseFontSize * item.zoom * overallZoom;
        const isSelected = index === selectedIndex;

        return (
          <div
            key={item.id}
            className={`tw-py-2 tw-px-3 ${index > 0 ? 'tw-border-t tw-border-border' : ''} ${isSelected ? 'tw-bg-muted/30' : ''}`}
            onContextMenu={handleCtxMenu(index)}
            data-testid={`multi-pane-text-${item.name}`}
          >
            <div
              className="tw-flex tw-gap-2"
              style={{
                direction: item.isRTL ? 'rtl' : 'ltr',
                textAlign: item.isRTL ? 'right' : 'left',
              }}
            >
              <button
                type="button"
                className="tw-text-primary tw-underline tw-cursor-pointer tw-font-sans tw-text-xs tw-flex-shrink-0 tw-self-start tw-bg-transparent tw-border-none tw-p-0 hover:tw-text-primary/80"
                onClick={handleAbbrevClick(index)}
                aria-label={`${item.name}: ${verseRefDisplay}`}
                data-testid={`abbrev-link-${item.name}`}
              >
                {item.name}
              </button>
              <span
                style={{
                  fontFamily: item.fontName || 'inherit',
                  fontSize: `${effectiveSize}pt`,
                }}
                className="tw-flex-1"
              >
                {item.verseText}
              </span>
            </div>
          </div>
        );
      }),
    [items, overallZoom, selectedIndex, handleAbbrevClick, handleCtxMenu, verseRefDisplay],
  );

  if (items.length === 0) {
    return (
      <div
        className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-muted-foreground"
        role="region"
        aria-label={ariaLabel}
        data-testid="multi-pane-empty"
      >
        <p className="tw-text-sm">No texts in collection</p>
      </div>
    );
  }

  return (
    <div
      className="tw-h-full tw-overflow-auto"
      role="region"
      aria-label={ariaLabel}
      data-testid="multi-pane-renderer"
    >
      {renderedItems}
    </div>
  );
}
