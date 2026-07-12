import { SerializedVerseRef } from '@sillsdev/scripture';
import { Button, ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'platform-bible-react';
import { formatReplacementString, formatScrRef } from 'platform-bible-utils';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ResourceCell, GridResource } from './resource-cell.component';

export type ChapterContextResource = GridResource;

type ScriptureTextGridProps = {
  resources: GridResource[];
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  /** Accessible name for the list/group region (the web view passes the localized tab title). */
  ariaLabel?: string;
  /**
   * Selects the layout: `'verse'` → vertical column of stacked verse-cell rows (with the
   * chapter-context split); `'chapter'` → horizontal row of side-by-side full-chapter columns.
   * Defaults to `'verse'` (the product default); `ResourceCell` defaults to `'chapter'` because it
   * is the generic cell reused by the chapter-context panel and the chapter columns. The two
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
  /**
   * Localized `"{resourceName}, {reference}"` template for each verse listitem's accessible name.
   * When omitted, the accessible name falls back to the resource label alone.
   */
  cellAccessibleNameTemplate?: string;
};

/**
 * Renders the effective-list resources in one of two layouts (selected by `viewMode`), all synced
 * to the active scrRef: `verse` → a vertical list of stacked verse listitems (described below);
 * `chapter` → a horizontal group of side-by-side full-chapter regions, one per resource, each
 * scrolling independently and with no split. The active scrRef is owned by the web-view root (via
 * `WebViewProps.useWebViewScrollGroupScrRef`) and passed in — this component is presentational and
 * calls no scroll-group hook.
 *
 * In verse mode, clicking (or pressing Enter/Space on) a listitem opens a resizable chapter-context
 * panel beside the list showing that resource's full chapter. When the panel closes, focus returns
 * to the listitem that opened it (WCAG 2.4.3).
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
  cellAccessibleNameTemplate,
}: ScriptureTextGridProps) {
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const gridRef = useRef<HTMLDivElement>(null);
  // projectId of the listitem that opened the split, so focus can return to it when the split closes.
  const focusRestoreProjectIdRef = useRef<string | undefined>(undefined);

  // On close, return focus to the listitem that opened the split (WCAG 2.4.3). The list remounts
  // when the split toggles, so restore by identity (projectId) against the freshly-rendered DOM,
  // not by a stale element reference.
  useEffect(() => {
    if (chapterContext) return;
    const projectId = focusRestoreProjectIdRef.current;
    if (!projectId) return;
    focusRestoreProjectIdRef.current = undefined;
    gridRef.current?.querySelector<HTMLElement>(`[data-project-id="${projectId}"]`)?.focus();
  }, [chapterContext]);

  // Single resource: render it as a full-width whole chapter — almost the standalone resource
  // viewer, minus its resource-selector dropdown (the web view header's View Options button covers
  // adding more texts). No verse-cell list chrome and no chapter-context split; the whole chapter is
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

  // Layout is derived from viewMode: verse view is a vertical column of stacked resource rows;
  // chapter view is a horizontal row of side-by-side full-chapter columns. B4 hard-codes this
  // mapping; PT-4168 (deferred single-flag orientation override) will later make it
  // `orientation ?? deriveLayout(viewMode)` — a seam, not the feature.
  const layout: 'row' | 'column' = viewMode === 'chapter' ? 'row' : 'column';

  // Chapter view: a horizontal row of labeled regions (full-chapter columns), one per resource. Each
  // column floors its width (`min-w-3xs`) so the row scrolls horizontally when the columns don't fit
  // (`overflow-x-auto`) instead of collapsing into unreadable slivers; each column is full-height with
  // its own vertical scroll (ResourceCellView's inner `overflow-auto`). Selection stays in sync across
  // columns via the shared scrRef — each read-only Editorial reports clicks through onScrRefChange ->
  // setScrRef and re-navigates. No chapter-context split and no per-cell activation here (that is
  // verse-only). Each resource is its own landmark region (may be rotor-heavy at very high counts —
  // flagged for AT validation, PT-4057).
  if (layout === 'row') {
    return (
      <div
        role="group"
        aria-label={ariaLabel}
        className="tw:flex tw:h-full tw:flex-row tw:divide-x tw:overflow-x-auto tw:overflow-y-hidden"
      >
        {resources.map((resource) => (
          <div
            key={resource.projectId}
            role="region"
            aria-label={resource.label}
            data-project-id={resource.projectId}
            className="tw:flex tw:min-w-3xs tw:flex-1 tw:shrink-0"
          >
            <ResourceCell
              resourceRef={resource}
              scrRef={scrRef}
              setScrRef={setScrRef}
              viewMode="chapter"
            />
          </div>
        ))}
      </div>
    );
  }

  // Verse view: a vertical column of stacked resource rows (one per resource); the column scrolls
  // vertically (`overflow-y-auto`) when the rows don't fit. Clicking (or Enter/Space on) a row opens
  // the chapter-context split beside the column. The Scripture reference is constant across rows in a
  // render, so format it once for the accessible name (`"{name}, {ref}"`, or just the name when no
  // template is provided).
  const reference = formatScrRef(scrRef);
  const verseItemName = (label: string) =>
    cellAccessibleNameTemplate
      ? formatReplacementString(cellAccessibleNameTemplate, { resourceName: label, reference })
      : label;

  const verseColumn = (
    <div
      ref={gridRef}
      role="list"
      aria-label={ariaLabel}
      className="tw:flex tw:h-full tw:min-h-0 tw:flex-col tw:divide-y tw:overflow-y-auto"
    >
      {resources.map((resource) => {
        // Activating a verse item latches the focus-restore target and reports the chapter context
        // change. Shared by the click and keyboard paths so they can never drift apart.
        const activate = onChapterContextChange
          ? () => {
              focusRestoreProjectIdRef.current = resource.projectId;
              onChapterContextChange(resource);
            }
          : undefined;
        return (
          // The listitem is an interactive resource entry. jsx-a11y flags role="listitem" with
          // tabIndex/handlers as "non-interactive", but it IS keyboard-accessible (Tab to focus,
          // Enter/Space to activate) per WCAG 2.1 §2.1.1 and the A12 ARIA spec — the suppression is
          // justified by the explicit handler and tabIndex below.
          /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
          <div
            key={resource.projectId}
            role="listitem"
            data-project-id={resource.projectId}
            aria-label={verseItemName(resource.label)}
            tabIndex={activate ? 0 : undefined}
            onClick={activate}
            onKeyDown={
              activate
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      activate();
                    }
                  }
                : undefined
            }
            className={`tw:flex tw:min-h-0 tw:min-w-0 tw:shrink-0 tw:flex-col tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring${activate ? ' tw:cursor-pointer' : ''}`}
          >
            <ResourceCell
              resourceRef={resource}
              scrRef={scrRef}
              setScrRef={setScrRef}
              viewMode={viewMode}
            />
          </div>
          /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
        );
      })}
    </div>
  );

  if (!chapterContext) {
    return verseColumn;
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="tw:h-full tw:min-h-0">
      <ResizablePanel defaultSize={55} minSize={30} className="tw:min-h-0">
        {verseColumn}
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
