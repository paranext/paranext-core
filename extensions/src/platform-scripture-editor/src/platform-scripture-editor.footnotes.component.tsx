import { useEffect, useMemo, useRef, useState } from 'react';
import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  FootnoteList,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';
import { valuesAreDeeplyEqual as deepEqualAcrossIframes } from './platform-scripture-editor.utils';
import { useLocalizedStrings } from '@papi/frontend/react';
import { LocalizeKey, UsjReaderWriter } from 'platform-bible-utils';
import { EditorWebViewMessage } from 'platform-scripture-editor';

// REVIEW: Is there a proper way to get this from the list component rather than hardcoding here?
const FOOTNOTE_LIST_STRING_KEYS: LocalizeKey[] = ['%webView_footnoteList_header%'];

export type FootnotesLayoutProps = {
  children: React.ReactNode;
  usj: Usj;
  showMarkers: boolean;
  onFootnoteSelected: (index: number) => void;
};

export default function FootnotesLayout({
  children,
  usj,
  showMarkers,
  onFootnoteSelected,
}: FootnotesLayoutProps) {
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

  const [selectedFootnote, setSelectedFootnote] = useState<
    { footnote: MarkerObject; index: number } | undefined
  >();

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
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

  const [footnotesPaneSize, setFootnotesPaneSize] = useWebViewState<number>(
    'footnotesPaneSize',
    20,
  );

  const debouncedSetFootnotesPaneSize = useMemo(() => {
    let timeout: ReturnType<typeof setTimeout>;
    return (size: number) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setFootnotesPaneSize(size), 50);
    };
  }, [setFootnotesPaneSize]);

  /** Computes the footnotes pane min/max percentages based on total available height. */
  function getFootnotesPaneSizeLimits(availableHeightPx: number) {
    const splitterHeightPx = 4;
    const usableHeightPx = availableHeightPx - splitterHeightPx;
    // Ensure the footnotes pane never shrinks to nothing or takes over the world.
    const footnotesPaneAbsoluteMinPercent = 3;
    const footnotesPaneAbsoluteMaxPercent = 90;
    // TODO: calculate these dynamically:
    const footnoteRowHeightPx = 20; // DOM says 32, and yet at 20, a full row is visible.
    const minimumEditorHeightPx = 60; // This has to account for toolbar height + some text.

    let footnotesPaneMinPercent: number;
    let footnotesPaneMaxPercent: number;

    if (usableHeightPx < footnoteRowHeightPx + minimumEditorHeightPx) {
      // Fallback for very small or unmeasured container
      footnotesPaneMinPercent = footnotesPaneAbsoluteMinPercent;
      footnotesPaneMaxPercent = footnotesPaneAbsoluteMaxPercent;
    } else {
      // Max percent: leave enough space for the editor to show a little bit of actual text.
      footnotesPaneMaxPercent = Math.min(
        Math.floor(((usableHeightPx - minimumEditorHeightPx) / usableHeightPx) * 100),
        footnotesPaneAbsoluteMaxPercent,
      );

      // Min percent: enough for a single footnote row
      footnotesPaneMinPercent = Math.min(
        Math.max(
          Math.ceil((footnoteRowHeightPx / usableHeightPx) * 100),
          footnotesPaneAbsoluteMinPercent,
        ),
        footnotesPaneMaxPercent, // never exceed max
      );
    }

    return {
      calculatedFootnotesPaneMinPercent: footnotesPaneMinPercent,
      calculatedFootnotesPaneMaxPercent: footnotesPaneMaxPercent,
    };
  }

  const { calculatedFootnotesPaneMinPercent, calculatedFootnotesPaneMaxPercent } =
    getFootnotesPaneSizeLimits(containerHeight);

  // Make sure the calculated range accommodates the current saved size. There is an off-chance this
  // could allow for the splitter to get dragged to a size we're not happy about, but it is very
  // unlikely and this is better than having the size jump around unexpectedly. I assume it could
  // only happen if for some reason the WebView came up at a very different size than when it was
  // last used and the split percentage was saved.
  const footnotesPaneMaxPercent = Math.max(calculatedFootnotesPaneMaxPercent, footnotesPaneSize);
  const footnotesPaneMinPercent = Math.min(calculatedFootnotesPaneMinPercent, footnotesPaneSize);

  useEffect(() => {
    if (containerHeight <= 0) return;

    const clampedSize = Math.min(
      Math.max(footnotesPaneSize, calculatedFootnotesPaneMinPercent),
      calculatedFootnotesPaneMaxPercent,
    );

    if (clampedSize !== footnotesPaneSize) {
      setFootnotesPaneSize(clampedSize);
    }
  }, [
    containerHeight,
    footnotesPaneSize,
    setFootnotesPaneSize,
    calculatedFootnotesPaneMaxPercent,
    calculatedFootnotesPaneMinPercent,
  ]);

  const onLayoutFootnotesPane = (sizes: number[]) => {
    if (!sizes || sizes.length < 2) return;
    debouncedSetFootnotesPaneSize(sizes[1]);
  };

  const [footnotes, setFootnotes] = useState<MarkerObject[]>([]);

  const [footnoteListKey, setFootnoteListKey] = useState(0);

  /**
   * Handle a footnote selection request. Mirrors prior behavior but requires callers to pass
   * current state and setters.
   */
  function handleFootnoteSelected(footnote: MarkerObject, index: number, listId: string | number) {
    if (!footnote || index < 0 || index >= footnotes.length || listId !== footnoteListKey) return;

    setSelectedFootnote({ footnote: footnotes[index], index });
    onFootnoteSelected(index);
  }

  const [localizedStrings] = useLocalizedStrings(useMemo(() => FOOTNOTE_LIST_STRING_KEYS, []));

  return (
    <div ref={containerRef} className="tw-h-full tw-w-full tw-min-h-0">
      <ResizablePanelGroup
        direction={footnotesPanePosition === 'bottom' ? 'vertical' : 'horizontal'}
        className="tw-h-full tw-w-full tw-min-h-0"
        onLayout={onLayoutFootnotesPane}
      >
        <ResizablePanel className="tw-flex tw-flex-col tw-min-h-0">
          <div className="tw-flex tw-flex-col tw-flex-1 tw-min-h-0">{children}</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={footnotesPaneSize}
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
