import { SerializedVerseRef } from '@sillsdev/scripture';
import { Button, ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'platform-bible-react';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ResourceCell, GridResource } from './resource-cell.component';

export type ChapterContextResource = GridResource;

type ScriptureTextGridProps = {
  resources: GridResource[];
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  /** Accessible name for the grid region (the web view passes the localized tab title). */
  ariaLabel?: string;
  /**
   * Row cell view mode; the chapter-context panel always renders full chapters. Defaults to
   * `'verse'` because the row is verse-priority (the product default); `ResourceCell` defaults to
   * `'chapter'` because it is the generic cell reused by the chapter-context panel. The two
   * defaults intentionally differ — every caller here passes `viewMode` explicitly, so the defaults
   * only document each component's own primary use.
   */
  viewMode?: 'chapter' | 'verse';
  /** When set, the chapter-context split is open for this resource. */
  chapterContext?: ChapterContextResource;
  /** Opens or switches the chapter-context panel to the given resource. */
  onChapterContextChange?: (context: ChapterContextResource) => void;
  /** Closes the chapter-context panel. */
  onChapterContextClose?: () => void;
  /** Localized accessible name for the chapter-context close button. */
  closeChapterContextLabel?: string;
};

/**
 * Horizontal row of one ResourceCell per effective-list resource, all synced to the active scrRef.
 * The active scrRef is owned by the web-view root (via `WebViewProps.useWebViewScrollGroupScrRef`)
 * and passed in — this component is presentational and calls no scroll-group hook.
 *
 * Clicking (or pressing Enter on) a row cell opens a resizable chapter-context panel beside the row
 * showing that resource's full chapter. When the panel closes, focus returns to the cell that
 * opened it (WCAG 2.4.3).
 */
export function ScriptureTextGrid({
  resources,
  scrRef,
  setScrRef,
  ariaLabel,
  viewMode = 'verse',
  chapterContext,
  onChapterContextChange,
  onChapterContextClose,
  closeChapterContextLabel,
}: ScriptureTextGridProps) {
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const gridRef = useRef<HTMLDivElement>(null);
  // projectId of the cell that opened the split, so focus can return to it when the split closes.
  const focusRestoreProjectIdRef = useRef<string | undefined>(undefined);

  // On close, return focus to the cell that opened the split (WCAG 2.4.3). The row remounts when the
  // split toggles, so restore by identity (projectId) against the freshly-rendered DOM, not by a
  // stale element reference.
  useEffect(() => {
    if (chapterContext) return;
    const projectId = focusRestoreProjectIdRef.current;
    if (!projectId) return;
    focusRestoreProjectIdRef.current = undefined;
    gridRef.current
      ?.querySelector<HTMLElement>(`[data-project-id="${projectId}"] [role="gridcell"]`)
      ?.focus();
  }, [chapterContext]);

  // Single resource: render it as a full-width whole chapter — almost the standalone resource
  // viewer, minus its resource-selector dropdown (the web view header's View Options button covers
  // adding more texts). No verse-cell row chrome and no chapter-context split; the whole chapter is
  // already shown.
  const [onlyResource] = resources;
  if (resources.length === 1 && onlyResource) {
    return (
      <div role="region" aria-label={ariaLabel} className="tw:h-full tw:min-h-0 tw:overflow-auto">
        <ResourceCell
          resourceRef={onlyResource}
          scrRef={scrRef}
          setScrRef={setScrRef}
          viewMode="chapter"
        />
      </div>
    );
  }

  const verseRow = (
    <div
      ref={gridRef}
      role="grid"
      aria-label={ariaLabel}
      className="tw:h-full tw:overflow-x-auto tw:overflow-y-hidden"
    >
      <div role="row" className="tw:flex tw:h-full tw:flex-row tw:divide-x">
        {resources.map((resource) => (
          // `flex-1` lets cells share width evenly when the row fits; `min-inline-size` floors each
          // cell so a many-resource row scrolls horizontally (grid `overflow-x-auto`) instead of
          // collapsing cells into unreadable slivers in a narrow tab.
          <div
            key={resource.projectId}
            data-project-id={resource.projectId}
            className="tw:flex tw:min-w-3xs tw:flex-1 tw:shrink-0"
          >
            <ResourceCell
              resourceRef={resource}
              scrRef={scrRef}
              setScrRef={setScrRef}
              viewMode={viewMode}
              onActivate={
                onChapterContextChange
                  ? () => {
                      focusRestoreProjectIdRef.current = resource.projectId;
                      onChapterContextChange(resource);
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (!chapterContext) {
    return verseRow;
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="tw:h-full tw:min-h-0 tw:rtl:flex-row-reverse">
      <ResizablePanel defaultSize={55} minSize={30} className="tw:min-h-0">
        {verseRow}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={45} minSize={25} className="tw:min-h-0">
        <div
          role="region"
          aria-label={chapterContext.label}
          data-testid="scripture-text-grid-chapter-context"
          className="tw:flex tw:h-full tw:min-h-0 tw:flex-col"
        >
          <div className="tw:flex tw:items-center tw:justify-end tw:border-b tw:px-1 tw:py-0.5">
            <Button
              variant="ghost"
              size="icon"
              aria-label={closeChapterContextLabel}
              onClick={onChapterContextClose}
            >
              <X className="tw:h-4 tw:w-4" />
            </Button>
          </div>
          <div className="tw:flex tw:min-h-0 tw:flex-1">
            <ResourceCell
              resourceRef={chapterContext}
              scrRef={scrRef}
              setScrRef={setScrRef}
              viewMode="chapter"
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
