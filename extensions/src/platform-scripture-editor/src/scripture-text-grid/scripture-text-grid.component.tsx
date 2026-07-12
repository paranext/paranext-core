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
   * Selects the layout: `'verse'` → horizontal verse-cell list (with the chapter-context split);
   * `'chapter'` → vertical full-chapter stack. Defaults to `'verse'` because the row is
   * verse-priority (the product default); `ResourceCell` defaults to `'chapter'` because it is the
   * generic cell reused by the chapter-context panel and the stack. The two defaults intentionally
   * differ — every caller here passes `viewMode` explicitly, so the defaults only document each
   * component's own primary use.
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
 * to the active scrRef: `verse` → a horizontal list of verse listitems (described below); `chapter`
 * → a vertical group of labeled regions, one per resource, each scrolling independently and with no
 * split. The active scrRef is owned by the web-view root (via
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

  // Chapter view: a vertical group of labeled regions (full-chapter cells), one per resource, each
  // bounded-height so it scrolls independently. Selection stays in sync across columns via the
  // shared scrRef — each cell's read-only Editorial reports clicks through onScrRefChange ->
  // setScrRef, and every cell re-navigates to the new ref. No chapter-context split and no per-cell
  // activation here (that is verse-only).
  //
  // `layout` is derived from viewMode only. B4 hard-codes the default; PT-4168 (deferred
  // single-flag orientation override) will later make this `orientation ?? deriveLayout(viewMode)`
  // — a seam, not the feature.
  const layout: 'row' | 'column' = viewMode === 'chapter' ? 'column' : 'row';
  if (layout === 'column') {
    return (
      <div
        role="group"
        aria-label={ariaLabel}
        className="tw:flex tw:h-full tw:min-h-0 tw:flex-col tw:divide-y tw:overflow-hidden"
      >
        {resources.map((resource) => (
          // `flex-1 min-h-0` shares the height evenly and floors each cell so its inner
          // `overflow-auto` (in ResourceCellView) scrolls the chapter internally instead of pushing
          // the stack past the viewport. Block-direction flow is dir-agnostic (no RTL reversal).
          // Each resource is its own landmark region (may be rotor-heavy at very high counts —
          // flagged for AT validation, PT-4057).
          <div
            key={resource.projectId}
            role="region"
            aria-label={resource.label}
            data-project-id={resource.projectId}
            className="tw:flex tw:min-h-0 tw:min-w-0 tw:flex-1 tw:shrink-0"
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

  // The Scripture reference is constant across verse items in a render, so format it once. The
  // accessible name is `"{name}, {ref}"` when the localized template is provided (else just the name).
  const reference = formatScrRef(scrRef);
  const verseItemName = (label: string) =>
    cellAccessibleNameTemplate
      ? formatReplacementString(cellAccessibleNameTemplate, { resourceName: label, reference })
      : label;

  const verseRow = (
    <div
      ref={gridRef}
      role="list"
      aria-label={ariaLabel}
      className="tw:flex tw:h-full tw:flex-row tw:divide-x tw:overflow-x-auto tw:overflow-y-hidden"
    >
      {resources.map((resource) => (
        // `flex-1` shares width evenly when the list fits; `min-w-3xs` floors each cell so a
        // many-resource list scrolls horizontally instead of collapsing into unreadable slivers.
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
          tabIndex={onChapterContextChange ? 0 : undefined}
          onClick={
            onChapterContextChange
              ? () => {
                  focusRestoreProjectIdRef.current = resource.projectId;
                  onChapterContextChange(resource);
                }
              : undefined
          }
          onKeyDown={
            onChapterContextChange
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    focusRestoreProjectIdRef.current = resource.projectId;
                    onChapterContextChange(resource);
                  }
                }
              : undefined
          }
          className={`tw:flex tw:min-w-3xs tw:flex-1 tw:shrink-0 tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring${onChapterContextChange ? ' tw:cursor-pointer' : ''}`}
        >
          <ResourceCell
            resourceRef={resource}
            scrRef={scrRef}
            setScrRef={setScrRef}
            viewMode={viewMode}
          />
        </div>
        /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */
      ))}
    </div>
  );

  if (!chapterContext) {
    return verseRow;
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="tw:h-full tw:min-h-0">
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
