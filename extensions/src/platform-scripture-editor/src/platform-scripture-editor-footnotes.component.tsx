import {
  FocusEvent,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  Button,
  FootnoteCaretPosition,
  FootnoteList,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';
import {
  getErrorMessage,
  getPaneSizeLimits,
  LanguageStrings,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { EditorWebViewMessage } from 'platform-scripture-editor';
import { UseWebViewStateHook } from '@papi/core';
import { logger } from '@papi/frontend';
import { X } from 'lucide-react';
import { valuesAreDeeplyEqual as deepEqualAcrossIframes } from './platform-scripture-editor.utils';

// TODO (PT-3657): calculate these dynamically:
const footnoteRowHeightPx = 20; // DOM says 32, and yet at 20, a full row is visible.
const footnoteCloseButtonSizePx = 24; // The close button floats over the list; it is 24px square.
const minimumEditorHeightPx = 60; // This has to account for toolbar height + some text.
const footnoteHeaderWidthPx = 50;
const minimumEditorWidthPx = 100;
const minimumFootnotesPaneWidthPercent = 10;
const maximumFootnotesPaneWidthPercent = 50;

export type FootnotesLayoutProps = PropsWithChildren<{
  usj: Usj;
  showMarkers: boolean;
  useWebViewState: UseWebViewStateHook;
  localizedStrings: LanguageStrings;
  /** Closes the pane, mirroring PT9's notes-pane close button. */
  onClose: () => void;
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
  /** Index of the row rendered as an editor (pass-through to `FootnoteList`). */
  editingFootnoteIndex?: number;
  /**
   * Render prop for the in-place editor shown for `editingFootnoteIndex`'s row (pass-through to
   * `FootnoteList`).
   */
  renderEditingFootnote?: (footnote: MarkerObject, index: number) => ReactNode;
  /**
   * Row click/Enter when editing is possible (`FootnoteList`'s `onFootnoteEditRequested`). Also
   * selects the row.
   */
  onFootnoteEditRequested?: (index: number, caretPosition: FootnoteCaretPosition) => void;
  /** Fires whenever the selected row changes (row click, focus request, or cleared). */
  onSelectedFootnoteChange?: (index: number | undefined) => void;
  /**
   * Whether an applied `focusRequest` should put DOM focus on the selected row. Set where the pane
   * is the request's destination and opens no row editor of its own — a read-only Standard view,
   * where PT9 still moves the caret into the note, and the caller highlight follows the focused
   * pane. Views that answer a caller click with a popover leave it unset, so the pane never takes
   * focus off that editor.
   */
  focusRowOnFocusRequest?: boolean;
  /**
   * Fires when DOM focus enters or leaves the pane — the row list, the inline row editor, and the
   * pane's own chrome all count as inside it, so moving between them reports nothing. PT9's caller
   * highlight marks where the focused pane's caret is, so the web view pairs this with the selected
   * row to decide whether the caller border is on (see `resolveCallerHighlight`).
   */
  onPaneFocusChange?: (hasFocus: boolean) => void;
  /**
   * Fires when DOM focus leaves the pane for another element in the SAME document — clicking into
   * the Scripture text, the toolbar, anywhere the user has visibly moved on to. PT9 treats that as
   * leaving the note being edited, so this is what tells the host to end a row-editing session.
   *
   * Deliberately NOT fired when focus leaves the document entirely (`relatedTarget` is null): that
   * is a command palette or dialog rendered in the host frame outside this web view's iframe, or
   * the window itself losing focus. In neither case has the user moved off the row editor, and
   * ending the session there would close the editor they are still working in.
   */
  onPaneFocusLeft?: () => void;
}>;

export function FootnotesLayout({
  children,
  usj,
  showMarkers,
  useWebViewState,
  localizedStrings,
  onClose,
  onFootnoteSelected,
  focusRequest,
  editingFootnoteIndex,
  renderEditingFootnote,
  onFootnoteEditRequested,
  onSelectedFootnoteChange,
  focusRowOnFocusRequest,
  onPaneFocusChange,
  onPaneFocusLeft,
}: FootnotesLayoutProps) {
  const [footnotes, setFootnotes] = useState<MarkerObject[]>([]);

  /**
   * How many notes the list currently holds, readable outside a state updater: whether the list id
   * has to change is decided in the USJ effect's body, which cannot read `footnotes` (the effect
   * depends on `usj` alone, so its closure's copy can be a commit stale).
   */
  const footnotesCountRef = useRef(0);

  const [footnoteListKey, setFootnoteListKey] = useState(0);

  const [selectedFootnote, setSelectedFootnote] = useState<
    { footnote: MarkerObject; index: number } | undefined
  >();

  /**
   * The pane panel's own element. Bounds every focus question this component answers: whether a
   * blur left the pane at all, and which row a focus request should land on.
   */
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const paneContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Whether a focus request still owes the selected row a `.focus()` call — see
   * `focusRowOnFocusRequest`.
   */
  const pendingRowFocusRef = useRef(false);

  // Give the pane DOM focus for a focus request that asked for it, so the caller highlight (which
  // PT9 ties to the focused pane's caret) comes on for a caller click in a read-only text just as
  // it does when a row editor opens. Declared BEFORE the focus-request effect below so that within
  // any one commit this runs while `pendingRowFocusRef` is still clear: the row it looks for is
  // marked selected in the DOM only from the commit AFTER the request is applied, and running the
  // other way around would find the previously selected row instead.
  useEffect(() => {
    if (!pendingRowFocusRef.current) return;
    pendingRowFocusRef.current = false;
    const selectedRow = paneContainerRef.current?.querySelector(
      '[role="option"][aria-selected="true"]',
    );
    // The row is a roving-tabindex `li`, so it takes focus directly. Scrolling is left on: the
    // list reveals the row for the same request, and suppressing it here would fight that.
    if (selectedRow instanceof HTMLElement) selectedRow.focus({ preventScroll: false });
  }, [selectedFootnote]);

  // Apply an externally-requested selection (a caller click in the editor body while the pane is
  // visible), mirroring what a real pane-row click does to `selectedFootnote`. Guarded by object
  // identity (not `usj`/`footnotes` changing) so unrelated content edits don't re-apply a stale
  // request.
  //
  // Declared BEFORE the USJ-processing effect below so that when a `usj` change and a fresh
  // `focusRequest` land in the same commit, this runs first (React fires effects in declaration
  // order) and the USJ effect's functional `setSelectedFootnote` update — which reads the
  // just-enqueued result of this effect as its input — has the last word. That ordering matters
  // because `footnotes` here can still be one commit stale relative to the `usj` prop this render
  // (the USJ effect's own `setFootnotes` call from the previous commit hasn't been applied yet), so
  // a bounds check against it can wrongly pass against a list that's about to shrink; the
  // reconciliation below is the correction that always resolves against the freshly parsed list.
  const lastAppliedFocusRequestRef = useRef<FootnotesLayoutProps['focusRequest']>(undefined);
  useEffect(() => {
    if (!focusRequest || focusRequest === lastAppliedFocusRequestRef.current) return;

    const { index } = focusRequest;
    if (index < 0 || index >= footnotes.length) return;
    // Mark applied only AFTER the bounds check passes, so a request that arrives while `footnotes`
    // is still empty (pane-mount frame) is retried when the `footnotes` dep repopulates.
    lastAppliedFocusRequestRef.current = focusRequest;
    pendingRowFocusRef.current = focusRowOnFocusRequest === true;
    setSelectedFootnote({ footnote: footnotes[index], index });
  }, [focusRequest, footnotes, focusRowOnFocusRequest]);

  // Mirrors `editingFootnoteIndex` into a ref so the USJ-processing effect below can read its
  // current value without depending on it: `editingFootnoteIndex` changes far more often relative
  // to `usj` staying fixed (entering/leaving edit mode) than the reverse, and re-running the USJ
  // parse on every such change would re-mint every footnote's row key via `setFootnoteListKey`,
  // remounting the entire list (including the editing row itself) for no content change. Declared
  // BEFORE the USJ effect so the ref is already current when that effect reads it within the same
  // commit.
  const editingFootnoteIndexRef = useRef(editingFootnoteIndex);
  useEffect(() => {
    editingFootnoteIndexRef.current = editingFootnoteIndex;
  }, [editingFootnoteIndex]);

  useEffect(() => {
    try {
      const usjReaderWriter = new UsjReaderWriter(usj, {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      });
      const newFootnotes = usjReaderWriter.findAllNotes();

      // The list id tells FootnoteList its rows are new. Only additions and deletions make them
      // new; a content edit (every live-applied keystroke in the row editor) or a same-shape
      // echo must keep the rows — and the editing row's editor — mounted. Reordering with an
      // unchanged count is not detected; the listId contract already treats it as unlikely.
      if (newFootnotes.length !== footnotesCountRef.current) setFootnoteListKey((prev) => prev + 1);
      footnotesCountRef.current = newFootnotes.length;
      setFootnotes(newFootnotes);

      setSelectedFootnote((currentSelected) => {
        if (!currentSelected) return undefined;
        const { index, footnote } = currentSelected;
        if (index < 0 || index >= newFootnotes.length) return undefined;
        const fresh = newFootnotes[index];
        // The row being edited is the selection by definition: its content changes on every
        // live-apply, so content equality must not decide whether it stays selected.
        const isEditingRow =
          editingFootnoteIndexRef.current !== undefined &&
          index === editingFootnoteIndexRef.current;
        if (
          isEditingRow ||
          (fresh.marker === footnote.marker &&
            deepEqualAcrossIframes(fresh.content, footnote.content))
        ) {
          // Re-point at the new list's object: FootnoteList marks the selected row by identity, so
          // holding onto the old object would lose the highlight the moment a PDP echo re-parses
          // `usj` into fresh objects, even when the note's content is unchanged. Because the
          // returned object is minted fresh here every time, `selectionRequest` identity changes on
          // every echo too, which re-runs `FootnoteList`'s `scrollIntoView({ block: 'nearest' })` on
          // an already-visible row (a no-op) and re-fires `onSelectedFootnoteChange(index)` with the
          // same index (the consumer's `highlightNote` is idempotent).
          return { footnote: fresh, index };
        }
        return undefined;
      });
    } catch (e) {
      // Truncated like the divergence logger's snippets — a diagnostic line, never a full
      // chapter dump into the log.
      logger.warn(
        `FootnotesLayout failed to process USJ: ${getErrorMessage(e)}. ` +
          `USJ (truncated): ${JSON.stringify(usj).slice(0, 200)}`,
      );
    }
  }, [usj]);

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
          // The close button floats over the list rather than taking a row of its own, so the
          // pane's floor is whichever of the two is taller, not their sum.
          secondaryPaneMinSizePx: Math.max(footnoteRowHeightPx, footnoteCloseButtonSizePx),
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

  /**
   * Handle a footnote edit request (row click/Enter while editing is possible). Also selects the
   * row.
   */
  const handleFootnoteEditRequested = useCallback(
    (
      _footnote: MarkerObject,
      index: number,
      listId: string | number,
      caretPosition: FootnoteCaretPosition,
    ) => {
      if (index < 0 || index >= footnotes.length || listId !== footnoteListKey) return;

      setSelectedFootnote({ footnote: footnotes[index], index });
      onFootnoteEditRequested?.(index, caretPosition);
    },
    [footnotes, footnoteListKey, onFootnoteEditRequested],
  );

  /**
   * Width of the footnote list's scrollbar, in pixels — how far the floating close button has to
   * sit from the pane's trailing edge to leave the scrollbar grabbable. Measured rather than
   * assumed: it is 0 on overlay-scrollbar platforms and whenever the list does not overflow, and
   * ~15px with classic scrollbars, and it changes as content comes and goes.
   */
  const [listScrollbarWidthPx, setListScrollbarWidthPx] = useState(0);

  const listScrollbarObserverRef = useRef<ResizeObserver | undefined>(undefined);

  // The scrolling element is `FootnoteList`'s own root, which the list marks `role="listbox"` —
  // its ARIA role, not a styling hook, so this reads the list's semantics rather than its markup.
  // A ResizeObserver watches the CONTENT box, which is exactly what changes when a scrollbar
  // appears or disappears.
  const setFootnoteListWrapperRef = useCallback((node: HTMLDivElement | null) => {
    listScrollbarObserverRef.current?.disconnect();
    listScrollbarObserverRef.current = undefined;
    const scrollElement = node?.querySelector('[role="listbox"]');
    if (!(scrollElement instanceof HTMLElement)) {
      setListScrollbarWidthPx(0);
      return;
    }
    const measure = () =>
      setListScrollbarWidthPx(Math.max(scrollElement.offsetWidth - scrollElement.clientWidth, 0));
    const observer = new ResizeObserver(measure);
    observer.observe(scrollElement);
    measure();
    listScrollbarObserverRef.current = observer;
  }, []);

  useEffect(() => {
    return () => listScrollbarObserverRef.current?.disconnect();
  }, []);

  /**
   * Whether the pane currently holds DOM focus, so each crossing of its boundary is reported once.
   * `focus`/`blur` bubble here (they are `focusin`/`focusout` underneath), so every move between
   * elements inside the pane fires both.
   */
  const paneHasFocusRef = useRef(false);

  const handlePaneFocus = useCallback(() => {
    if (paneHasFocusRef.current) return;
    paneHasFocusRef.current = true;
    onPaneFocusChange?.(true);
  }, [onPaneFocusChange]);

  const handlePaneBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      // Focus landing on another element inside the pane (the list to the row editor and back)
      // never leaves it. A null `relatedTarget` — focus going nowhere, e.g. the window losing it —
      // does count as leaving, matching what the user sees: no caret in the pane.
      if (event.relatedTarget && paneContainerRef.current?.contains(event.relatedTarget)) return;
      if (!paneHasFocusRef.current) return;
      paneHasFocusRef.current = false;
      onPaneFocusChange?.(false);
      // Only a move to a real element in this document is the user leaving the pane behind — see
      // `onPaneFocusLeft` for why a null `relatedTarget` is not.
      if (event.relatedTarget) onPaneFocusLeft?.();
    },
    [onPaneFocusChange, onPaneFocusLeft],
  );

  // Report every change to which row is selected (row click, focus request, or cleared) so the web
  // view can highlight the corresponding caller in the text.
  useEffect(() => {
    onSelectedFootnoteChange?.(selectedFootnote?.index);
  }, [selectedFootnote, onSelectedFootnoteChange]);

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
          <div
            ref={paneContainerRef}
            className="tw:relative tw:flex tw:flex-col tw:flex-1 tw:min-h-0"
            onFocus={handlePaneFocus}
            onBlur={handlePaneBlur}
          >
            {/* Floats over the list's top trailing corner (leading corner in RTL, which
                `inset-inline-end` follows on its own) rather than taking a row of its own, so the
                pane spends all of its height on notes. Held clear of the scrollbar so that stays
                grabbable, carrying the pane's own background so the note text it covers does not
                read through it, and above the z-10 a focused row raises itself to. */}
            <Button
              variant="ghost"
              size="icon"
              className="tw:absolute tw:top-0 tw:z-20 tw:h-6 tw:w-6 tw:bg-sidebar"
              style={{ insetInlineEnd: listScrollbarWidthPx }}
              aria-label={localizedStrings['%webView_footnoteList_close%']}
              onClick={onClose}
            >
              <X className="tw:h-4 tw:w-4" />
            </Button>
            <div
              ref={setFootnoteListWrapperRef}
              className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0"
            >
              <FootnoteList
                classNameForItems="scripture-font"
                listId={footnoteListKey}
                layout={footnotesPanePosition === 'bottom' ? 'horizontal' : 'vertical'}
                footnotes={footnotes}
                showMarkers={showMarkers}
                formatCaller={showMarkers ? (c) => c : undefined}
                selectedFootnote={selectedFootnote?.footnote}
                // The wrapper state object is minted fresh on every selection application (pane
                // click or focus request), so its identity is the "reveal the row again" signal —
                // a repeat focusRequest for the same footnote re-scrolls even though the derived
                // footnote object and index are unchanged.
                selectionRequest={selectedFootnote}
                onFootnoteSelected={handleFootnoteSelected}
                onFootnoteEditRequested={
                  onFootnoteEditRequested ? handleFootnoteEditRequested : undefined
                }
                editingFootnoteIndex={editingFootnoteIndex}
                renderEditingFootnote={renderEditingFootnote}
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
