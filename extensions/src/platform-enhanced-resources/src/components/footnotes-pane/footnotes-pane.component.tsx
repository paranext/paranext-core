import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import type { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  FootnoteList,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';
import {
  getErrorMessage,
  getPaneSizeLimits,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
} from 'platform-bible-utils';
import type { UseWebViewStateHook } from '@papi/core';
import { logger } from '@papi/frontend';

// Tunables (mirror of platform-scripture-editor-footnotes.component.tsx). Pixel constants
// drive ResizablePanel min/max percent calculations via getPaneSizeLimits.
const FOOTNOTE_ROW_HEIGHT_PX = 20;
const MINIMUM_EDITOR_HEIGHT_PX = 60;

export type EnhancedResourceFootnotesPaneProps = {
  /** USJ document; UsjReaderWriter.findAllNotes() walks this for note markers. */
  usj: Usj | undefined;
  /** When false, only the children (scripture pane) render; the footnotes pane is collapsed. */
  isVisible: boolean;
  /** WebView state hook used to persist the pane size. Pass-through from the WebView host. */
  useWebViewState: UseWebViewStateHook;
  /**
   * Externally-controlled selected footnote. When the scripture pane fires a click on a note
   * caller, the parent maps that to a MarkerObject and passes it here so the list focuses and
   * scrolls to it.
   */
  selectedFootnote?: MarkerObject;
  /** Fired when a row in the footnote list is clicked / focused. */
  onFootnoteSelected?: (footnote: MarkerObject, index: number) => void;
  children: ReactNode;
};

/**
 * Bottom-pane footnotes layout for the Enhanced Resources web view (gap G4).
 *
 * Wraps the scripture-pane children in a vertical ResizablePanelGroup, with a sibling panel below
 * that lists every chapter footnote via the platform-bible-react FootnoteList component. Mirrors
 * the pattern from platform-scripture-editor's FootnotesLayout, but minus the position-toggle (PT9
 * is bottom-only) and minus the EditorWebViewMessage coupling (ER doesn't have an equivalent).
 *
 * Note discovery uses UsjReaderWriter.findAllNotes() rather than the marble-converter's annotation
 * list - the USJ already carries the data.
 *
 * Selection is externally controlled via `selectedFootnote`. A future scripture-pane note-caller
 * click handler (Task 12 / Milestone 4) will resolve the click target to a MarkerObject from
 * findAllNotes()'s output and drive selection here.
 */
export function EnhancedResourceFootnotesPane({
  usj,
  isVisible,
  useWebViewState,
  selectedFootnote,
  onFootnoteSelected,
  children,
}: EnhancedResourceFootnotesPaneProps) {
  const [footnotes, setFootnotes] = useState<MarkerObject[]>([]);
  const [footnoteListKey, setFootnoteListKey] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const observerRef = useRef<ResizeObserver | undefined>(undefined);

  useEffect(() => {
    if (!usj) {
      setFootnotes([]);
      return;
    }
    try {
      const reader = new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });
      const newFootnotes = reader.findAllNotes();
      setFootnotes(newFootnotes);
      setFootnoteListKey((prev) => prev + 1);
    } catch (e) {
      logger.warn(`EnhancedResourceFootnotesPane failed to read notes: ${getErrorMessage(e)}`);
      setFootnotes([]);
    }
  }, [usj]);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
    }
    if (!node) return;
    const observer = new ResizeObserver(() => setContainerHeight(node.clientHeight));
    observer.observe(node);
    setContainerHeight(node.clientHeight);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const [paneSizePercent, setPaneSizePercent] = useWebViewState<number>(
    'footnotesPaneSizePercent',
    20,
  );

  const { minPercent, maxPercent } = getPaneSizeLimits(containerHeight, {
    secondaryPaneMinSizePx: FOOTNOTE_ROW_HEIGHT_PX,
    mainPaneMinSizePx: MINIMUM_EDITOR_HEIGHT_PX,
  });

  const handleFootnoteSelected = useCallback(
    (footnote: MarkerObject, index: number, listId: string | number) => {
      if (listId !== footnoteListKey) return;
      onFootnoteSelected?.(footnote, index);
    },
    [footnoteListKey, onFootnoteSelected],
  );

  // When the pane is hidden, render only the children (no panel group, no footnote list).
  if (!isVisible) {
    return <div className="tw-flex tw-h-full tw-w-full tw-flex-col tw-min-h-0">{children}</div>;
  }

  return (
    <div ref={setContainerRef} className="tw-h-full tw-w-full tw-min-h-0">
      <ResizablePanelGroup
        direction="vertical"
        className="tw-h-full tw-w-full tw-min-h-0"
        onLayout={(sizes) => sizes.length >= 2 && setPaneSizePercent(sizes[1])}
      >
        <ResizablePanel className="tw-flex tw-flex-col tw-min-h-0">
          <div className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0">{children}</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={paneSizePercent}
          minSize={minPercent}
          maxSize={Math.max(maxPercent, paneSizePercent)}
          className="tw-bg-sidebar tw-pl-2 tw-pt-2 tw-pb-0 tw-pr-0 tw-flex tw-flex-col tw-min-h-0"
        >
          <FootnoteList
            classNameForItems="scripture-font"
            listId={footnoteListKey}
            layout="horizontal"
            footnotes={footnotes}
            showMarkers={false}
            selectedFootnote={selectedFootnote}
            onFootnoteSelected={handleFootnoteSelected}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default EnhancedResourceFootnotesPane;
