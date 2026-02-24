import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { TextCollectionItem } from '../types/platform-scripture-text-collection';

export interface MultiPaneRendererProps {
  /** HTML content from backend for all text blocks */
  html: string;
  /** CSS content from backend for styling */
  css: string;
  /** Current items in the collection (for context menu actions) */
  items: TextCollectionItem[];
  /** Overall multi-pane zoom level */
  multiPaneZoom: number;
  /** Called when user clicks an abbreviation link */
  onAbbreviationClick?: (index: number) => void;
  /** Called when user selects a context menu action */
  onContextMenuAction?: (action: string, index: number) => void;
  /** Called when this pane gains focus */
  onFocus?: () => void;
  /** Localized strings for context menu */
  contextMenuLabels: {
    close: string;
    zoomIn: string;
    zoomOut: string;
    zoomActual: string;
    moveUp: string;
    moveDown: string;
  };
}

/** Renders the multi-pane HTML content with abbreviation links and context menus */
export default function MultiPaneRenderer({
  html,
  css,
  items,
  multiPaneZoom,
  onAbbreviationClick,
  onContextMenuAction,
  onFocus,
  contextMenuLabels,
}: MultiPaneRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    itemIndex: number;
  } | null>(null);

  // Handle clicks in the rendered HTML to detect abbreviation link clicks
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look for abbreviation links - they have class "abbrev-link" or are anchor elements
      const link = target.closest('a[href^="select:"], .abbrev-link, [data-select-index]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        const dataIndex = link.getAttribute('data-select-index');
        let index = -1;
        if (href && href.startsWith('select:')) {
          index = parseInt(href.replace('select:', ''), 10);
        } else if (dataIndex) {
          index = parseInt(dataIndex, 10);
        }
        if (index >= 0 && index < items.length) {
          onAbbreviationClick?.(index);
        }
      }
    },
    [items, onAbbreviationClick],
  );

  // Handle right-click for context menu
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      // Find which text block was right-clicked
      const target = e.target as HTMLElement;
      const resource = target.closest('.resource, [data-item-index]');
      if (resource) {
        const dataIndex = resource.getAttribute('data-item-index');
        const index = dataIndex !== null ? parseInt(dataIndex, 10) : -1;
        if (index >= 0 && index < items.length) {
          setContextMenu({ x: e.clientX, y: e.clientY, itemIndex: index });
          return;
        }
      }
      // If no specific resource, try to figure out by position
      setContextMenu(null);
    },
    [items],
  );

  const handleContextMenuAction = useCallback(
    (action: string) => {
      if (contextMenu) {
        onContextMenuAction?.(action, contextMenu.itemIndex);
      }
      setContextMenu(null);
    },
    [contextMenu, onContextMenuAction],
  );

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Build the complete HTML with injected CSS and interactivity hints
  const renderedHtml = useMemo(() => {
    if (!html) {
      return '<div class="multi-pane-empty">No texts loaded</div>';
    }
    // If backend doesn't inject per-item data attributes, we add them via simple wrapping
    // The actual content comes from the backend
    return html;
  }, [html]);

  const combinedStyles = useMemo(
    () => `
      ${css}
      .multi-pane-container {
        font-size: ${multiPaneZoom * 100}%;
        height: 100%;
        overflow-y: auto;
        padding: 8px;
      }
      .multi-pane-container .resource {
        border-top: 1px solid #ccc;
        padding: 6px 4px;
      }
      .multi-pane-container .resource:first-child {
        border-top: none;
      }
      .multi-pane-container a[href^="select:"],
      .multi-pane-container .abbrev-link {
        color: var(--pt-color-link, #0078d4);
        cursor: pointer;
        font-family: Verdana, sans-serif;
        font-size: 7pt;
        text-decoration: none;
        float: left;
        margin-right: 6px;
      }
      .multi-pane-container a[href^="select:"]:hover,
      .multi-pane-container .abbrev-link:hover {
        text-decoration: underline;
      }
      .multi-pane-empty {
        padding: 24px;
        text-align: center;
        color: var(--pt-color-text-muted, #666);
      }
      .multi-pane-context-menu {
        position: fixed;
        z-index: 9999;
        background: var(--pt-color-surface, white);
        border: 1px solid var(--pt-color-border, #ccc);
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        padding: 4px 0;
        min-width: 150px;
      }
      .multi-pane-context-menu button {
        display: block;
        width: 100%;
        text-align: left;
        padding: 6px 16px;
        border: none;
        background: none;
        cursor: pointer;
        font-size: 13px;
        color: var(--pt-color-text, #333);
      }
      .multi-pane-context-menu button:hover {
        background: var(--pt-color-surface-hover, #f0f0f0);
      }
      .multi-pane-context-menu hr {
        margin: 4px 0;
        border: none;
        border-top: 1px solid var(--pt-color-border, #e0e0e0);
      }
    `,
    [css, multiPaneZoom],
  );

  return (
    <div
      ref={containerRef}
      className="multi-pane-renderer"
      data-testid="multi-pane-renderer"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
      tabIndex={-1}
      role="region"
      aria-label="Multi-pane text comparison"
      style={{ height: '100%', position: 'relative' }}
    >
      <style>{combinedStyles}</style>
      <div
        className="multi-pane-container"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
      {contextMenu && (
        <>
          {/* Click outside to close */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
            onClick={closeContextMenu}
          />
          <div
            className="multi-pane-context-menu"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            role="menu"
            aria-label="Text context menu"
          >
            <button type="button" role="menuitem" onClick={() => handleContextMenuAction('close')}>
              {contextMenuLabels.close}
            </button>
            <hr />
            <button type="button" role="menuitem" onClick={() => handleContextMenuAction('zoomIn')}>
              {contextMenuLabels.zoomIn}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => handleContextMenuAction('zoomOut')}
            >
              {contextMenuLabels.zoomOut}
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => handleContextMenuAction('zoomActual')}
            >
              {contextMenuLabels.zoomActual}
            </button>
            <hr />
            {contextMenu.itemIndex > 0 && (
              <button
                type="button"
                role="menuitem"
                onClick={() => handleContextMenuAction('moveUp')}
              >
                {contextMenuLabels.moveUp}
              </button>
            )}
            {contextMenu.itemIndex < items.length - 1 && (
              <button
                type="button"
                role="menuitem"
                onClick={() => handleContextMenuAction('moveDown')}
              >
                {contextMenuLabels.moveDown}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
