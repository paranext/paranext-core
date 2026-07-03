import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
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
import { EditorWebViewMessage } from 'platform-scripture-editor';
import { UseWebViewStateHook } from '@papi/core';
import { logger } from '@papi/frontend';
import { valuesAreDeeplyEqual as deepEqualAcrossIframes } from './platform-scripture-editor.utils';

// TODO (PT-3657): calculate these dynamically:
const footnoteRowHeightPx = 20; // DOM says 32, and yet at 20, a full row is visible.
const minimumEditorHeightPx = 60; // This has to account for toolbar height + some text.
const footnoteHeaderWidthPx = 50;
const minimumEditorWidthPx = 100;
const minimumFootnotesPaneWidthPercent = 10;
const maximumFootnotesPaneWidthPercent = 50;

export type FootnotesLayoutProps = PropsWithChildren<{
  usj: Usj;
  showMarkers: boolean;
  useWebViewState: UseWebViewStateHook;
  onFootnoteSelected?: (index: number) => void;
  /**
   * When set to a new object reference, requests that the pane select/highlight the footnote at
   * `index` — applying the same `selectedFootnote` state a real pane-row click would, but driven
   * externally. Used for the reverse navigation direction: a caller click in the editor body while
   * the pane is visible (PT9 navigate-to-note; see `noteCallerOnClick` in
   * `platform-scripture-editor.web-view.tsx`).
   *
   * Pass a fresh object each time selection should (re)apply, even if `index` repeats — object
   * identity (not `index`'s value) is what triggers the effect below, so clicking the same
   * already-selected note's caller again still re-applies (a no-op highlight-wise, but
   * consistent).
   */
  focusRequest?: { index: number };
}>;

export function FootnotesLayout({
  children,
  usj,
  showMarkers,
  useWebViewState,
  onFootnoteSelected,
  focusRequest,
}: FootnotesLayoutProps) {
  const [footnotes, setFootnotes] = useState<MarkerObject[]>([]);

  const [footnoteListKey, setFootnoteListKey] = useState(0);

  const [selectedFootnote, setSelectedFootnote] = useState<
    { footnote: MarkerObject; index: number } | undefined
  >();

  useEffect(() => {
    try {
      const usjReaderWriter = new UsjReaderWriter(usj, {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      });
      const newFootnotes = usjReaderWriter.findAllNotes();

      setFootnotes(newFootnotes);
      setFootnoteListKey((prev) => prev + 1);

      setSelectedFootnote((currentSelected) => {
        if (!currentSelected) return undefined;
        const { index, footnote } = currentSelected;
        if (index < 0 || index >= newFootnotes.length) return undefined;
        const f = newFootnotes[index];
        if (f.marker === footnote.marker && deepEqualAcrossIframes(f.content, footnote.content)) {
          return currentSelected;
        }
        return undefined;
      });
    } catch (e) {
      logger.warn(
        `FootnotesLayout failed to process USJ: ${getErrorMessage(e)}. USJ: ${JSON.stringify(usj)}`,
      );
    }
  }, [usj]);

  // Apply an externally-requested selection (a caller click in the editor body while the pane is
  // visible), mirroring what a real pane-row click does to `selectedFootnote`. Guarded by object
  // identity (not `usj`/`footnotes` changing) so unrelated content edits don't re-apply a stale
  // request or fight with the "preserve selection across edits" logic above.
  const lastAppliedFocusRequestRef = useRef<FootnotesLayoutProps['focusRequest']>(undefined);
  useEffect(() => {
    if (!focusRequest || focusRequest === lastAppliedFocusRequestRef.current) return;

    const { index } = focusRequest;
    if (index < 0 || index >= footnotes.length) return;
    // Mark applied only AFTER the bounds check passes, so a request that arrives while `footnotes`
    // is still empty (pane-mount frame) is retried when the `footnotes` dep repopulates.
    lastAppliedFocusRequestRef.current = focusRequest;
    setSelectedFootnote({ footnote: footnotes[index], index });
  }, [focusRequest, footnotes]);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const observerRef = useRef<ResizeObserver | undefined>(undefined);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = undefined;
    }

    // If node is undefined, we're unmounting - cleanup already done above
    if (!node) return;

    const observer = new ResizeObserver(() => {
      setContainerHeight(node.clientHeight);
      setContainerWidth(node.clientWidth);
    });

    observer.observe(node);
    setContainerHeight(node.clientHeight);
    setContainerWidth(node.clientWidth);

    observerRef.current = observer;
  }, []);

  const [footnotesPanePosition, setFootnotesPanePosition] = useWebViewState<'bottom' | 'trailing'>(
    'footnotesPanePosition',
    'bottom',
  );

  const footnotesPanePositionRef = useRef(footnotesPanePosition);

  useEffect(() => {
    footnotesPanePositionRef.current = footnotesPanePosition;
  }, [footnotesPanePosition]);

  // listen to messages from the web view controller
  useEffect(() => {
    const webViewMessageListener = ({
      data: editorMessage,
    }: MessageEvent<EditorWebViewMessage>) => {
      switch (editorMessage.method) {
        case 'changeFootnotesPaneLocation': {
          const { current } = footnotesPanePositionRef;
          setFootnotesPanePosition(current === 'bottom' ? 'trailing' : 'bottom');
          break;
        }
        default:
          // Probably handled elsewhere
          break;
      }
    };

    window.addEventListener('message', webViewMessageListener);

    return () => {
      window.removeEventListener('message', webViewMessageListener);
    };
  }, [setFootnotesPanePosition]);

  const [footnotesPaneSizePercent, setFootnotesPaneSizePercent] = useWebViewState<number>(
    'footnotesPaneSizePercent',
    20,
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const debouncedSetFootnotesPaneSize = useCallback(
    (size: number) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setFootnotesPaneSizePercent(size), 50);
    },
    [setFootnotesPaneSizePercent],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const {
    minPercent: calculatedFootnotesPaneMinPercent,
    maxPercent: calculatedFootnotesPaneMaxPercent,
  } =
    footnotesPanePosition === 'bottom'
      ? getPaneSizeLimits(containerHeight, {
          secondaryPaneMinSizePx: footnoteRowHeightPx,
          mainPaneMinSizePx: minimumEditorHeightPx,
        })
      : getPaneSizeLimits(containerWidth, {
          secondaryPaneMinSizePx: footnoteHeaderWidthPx,
          mainPaneMinSizePx: minimumEditorWidthPx,
          absoluteMinPercent: minimumFootnotesPaneWidthPercent,
          absoluteMaxPercent: maximumFootnotesPaneWidthPercent,
        });

  // Make sure the calculated range accommodates the current saved size. There is an off-chance this
  // could allow for the splitter to get dragged to a size we're not happy about, but it is very
  // unlikely and this is better than having the size jump around unexpectedly. I assume it could
  // only happen if for some reason the WebView came up at a very different size than when it was
  // last used and the split percentage was saved.
  const footnotesPaneMaxPercent = Math.max(
    calculatedFootnotesPaneMaxPercent,
    footnotesPaneSizePercent,
  );
  const footnotesPaneMinPercent = Math.min(
    calculatedFootnotesPaneMinPercent,
    footnotesPaneSizePercent,
  );

  useEffect(() => {
    if (containerHeight <= 0) return;

    const clampedSize = Math.min(
      Math.max(footnotesPaneSizePercent, calculatedFootnotesPaneMinPercent),
      calculatedFootnotesPaneMaxPercent,
    );

    if (clampedSize !== footnotesPaneSizePercent) {
      setFootnotesPaneSizePercent(clampedSize);
    }
  }, [
    containerHeight,
    footnotesPaneSizePercent,
    setFootnotesPaneSizePercent,
    calculatedFootnotesPaneMaxPercent,
    calculatedFootnotesPaneMinPercent,
  ]);

  const onLayoutFootnotesPane = useCallback(
    (sizes: number[]) => {
      if (!sizes || sizes.length < 2) return;
      debouncedSetFootnotesPaneSize(sizes[1]);
    },
    [debouncedSetFootnotesPaneSize],
  );

  /** Handle a footnote selection request. */
  const handleFootnoteSelected = useCallback(
    (_footnote: MarkerObject, index: number, listId: string | number) => {
      if (index < 0 || index >= footnotes.length || listId !== footnoteListKey) return;

      setSelectedFootnote({ footnote: footnotes[index], index });
      onFootnoteSelected?.(index);
    },
    [footnotes, footnoteListKey, onFootnoteSelected],
  );

  return (
    <div ref={setContainerRef} className="tw:h-full tw:w-full tw:min-h-0">
      <ResizablePanelGroup
        direction={footnotesPanePosition === 'bottom' ? 'vertical' : 'horizontal'}
        className="tw:h-full tw:w-full tw:min-h-0"
        onLayout={onLayoutFootnotesPane}
      >
        {children && (
          <>
            <ResizablePanel className="tw:flex tw:flex-col tw:min-h-0">
              <div className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0">{children}</div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}
        <ResizablePanel
          defaultSize={footnotesPaneSizePercent}
          className="tw:bg-sidebar tw:pl-2 tw:pt-2 tw:pb-0 tw:pr-0 tw:flex tw:flex-col tw:min-h-0"
          minSize={footnotesPaneMinPercent}
          maxSize={footnotesPaneMaxPercent}
        >
          <div className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0">
            <FootnoteList
              classNameForItems="scripture-font"
              listId={footnoteListKey}
              layout={footnotesPanePosition === 'bottom' ? 'horizontal' : 'vertical'}
              footnotes={footnotes}
              showMarkers={showMarkers}
              formatCaller={showMarkers ? (c) => c : undefined}
              selectedFootnote={selectedFootnote?.footnote}
              onFootnoteSelected={handleFootnoteSelected}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
