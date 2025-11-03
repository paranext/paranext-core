import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  FOOTNOTE_LIST_STRING_KEYS,
  FootnoteList,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { getPaneSizeLimits, UsjReaderWriter } from 'platform-bible-utils';
import { EditorWebViewMessage } from 'platform-scripture-editor';
import { UseWebViewStateHook } from '@papi/core';
import { valuesAreDeeplyEqual as deepEqualAcrossIframes } from './platform-scripture-editor.utils';

// TODO: calculate these dynamically:
const footnoteRowHeightPx = 20; // DOM says 32, and yet at 20, a full row is visible.
const minimumEditorHeightPx = 60; // This has to account for toolbar height + some text.

export type FootnotesLayoutProps = PropsWithChildren<{
  usj: Usj;
  showMarkers: boolean;
  useWebViewState: UseWebViewStateHook;
  onFootnoteSelected?: (index: number) => void;
}>;

export function FootnotesLayout({
  children,
  usj,
  showMarkers,
  useWebViewState,
  onFootnoteSelected,
}: FootnotesLayoutProps) {
  const [footnotes, setFootnotes] = useState<MarkerObject[]>([]);

  const [footnoteListKey, setFootnoteListKey] = useState(0);

  const [selectedFootnote, setSelectedFootnote] = useState<
    { footnote: MarkerObject; index: number } | undefined
  >();

  useEffect(() => {
    const usjReaderWriter = new UsjReaderWriter(usj);
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
  }, [usj]);

  const [containerHeight, setContainerHeight] = useState(0);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return () => {};

    const observer = new ResizeObserver(() => {
      setContainerHeight(node.clientHeight);
    });

    observer.observe(node);
    setContainerHeight(node.clientHeight);

    return () => observer.disconnect(); // cleanup on unmount
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

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

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
    };
  }, []);

  const {
    minPercent: calculatedFootnotesPaneMinPercent,
    maxPercent: calculatedFootnotesPaneMaxPercent,
  } = getPaneSizeLimits(containerHeight, {
    secondaryPaneMinHeightPx: footnoteRowHeightPx,
    mainPaneMinHeightPx: minimumEditorHeightPx,
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

  const [localizedStrings] = useLocalizedStrings(FOOTNOTE_LIST_STRING_KEYS);

  return (
    <div ref={setContainerRef} className="tw-h-full tw-w-full tw-min-h-0">
      <ResizablePanelGroup
        direction={footnotesPanePosition === 'bottom' ? 'vertical' : 'horizontal'}
        className="tw-h-full tw-w-full tw-min-h-0"
        onLayout={onLayoutFootnotesPane}
      >
        {children && (
          <>
            <ResizablePanel className="tw-flex tw-flex-col tw-min-h-0">
              <div className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0">{children}</div>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}
        <ResizablePanel
          defaultSize={footnotesPaneSizePercent}
          className="tw-bg-sidebar tw-pl-2 tw-pt-2 tw-pb-0 tw-pr-0 tw-flex tw-flex-col tw-min-h-0"
          minSize={footnotesPaneMinPercent}
          maxSize={footnotesPaneMaxPercent}
        >
          <div className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0">
            <FootnoteList
              listId={footnoteListKey}
              layout={footnotesPanePosition === 'bottom' ? 'horizontal' : 'vertical'}
              footnotes={footnotes}
              localizedStrings={localizedStrings}
              showMarkers={showMarkers}
              selectedFootnote={selectedFootnote?.footnote}
              onFootnoteSelected={handleFootnoteSelected}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
