import {
  FocusEvent,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import {
  Button,
  ContentZoomRoot,
  EmptyState,
  FootnoteCaretPosition,
  FootnoteList,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { getErrorMessage, getPaneSizeLimits, LanguageStrings } from 'platform-bible-utils';
import { EditorWebViewMessage } from 'platform-scripture-editor';
import { UseWebViewStateHook } from '@papi/core';
import { logger } from '@papi/frontend';
import { X } from 'lucide-react';
import {
  findEditorUsjNotes,
  valuesAreDeeplyEqual as deepEqualAcrossIframes,
} from './platform-scripture-editor.utils';

// TODO (PT-3657): calculate these dynamically:
const footnoteRowHeightPx = 20; // DOM says 32, and yet at 20, a full row is visible.
const footnoteCloseButtonSizePx = 24; // The close button floats over the list; it is 24px square.
const minimumEditorHeightPx = 60; // This has to account for toolbar height + some text.
const footnoteHeaderWidthPx = 50;
const minimumEditorWidthPx = 100;
const minimumFootnotesPaneWidthPercent = 10;
const maximumFootnotesPaneWidthPercent = 50;

/**
 * Overlay content the pane's own row editor puts on screen. Radix renders dropdown and popover
 * content through a React portal at `document.body`, so it is nowhere inside the pane's DOM even
 * though the pane is what opened it - the row editor's note-type and caller dropdowns and its
 * marker menu are all this shape. The editor's right-click menu (`.typeahead-popover`) is portalled
 * the same way, and its items take focus on mousedown.
 */
const paneOverlaySelector =
  '[data-slot="dropdown-menu-content"], [data-slot="popover-content"], .typeahead-popover';

/**
 * Whether a focus target counts as still being in the pane, including {@link paneOverlaySelector}
 * content.
 *
 * Erring toward "inside" is deliberate: a dropdown opened elsewhere in this web view also matches,
 * so a session can outlive a gesture PT9 would have ended it on. The other way round ends the
 * editing session - and with it the overlay - the instant the user opens one of the row editor's
 * own dropdowns, which makes those controls unusable.
 */
function isInsidePaneOrItsOverlays(
  target: Element,
  paneContainerRef: RefObject<HTMLDivElement | null>,
): boolean {
  if (paneContainerRef.current?.contains(target)) return true;
  return !!target.closest(paneOverlaySelector);
}

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
   * Fires when DOM focus lands on an element in the SAME document outside the pane — clicking into
   * the Scripture text, the toolbar, anywhere the user has visibly moved on to. PT9 treats that as
   * leaving the note being edited, so this is what tells the host to end a row-editing session.
   *
   * Fires on every such landing, not only on a move straight out of the pane: focus can leave the
   * document first (another panel, the tab strip) and come back to the text later, and that return
   * is the user moving on just the same.
   *
   * Deliberately NOT fired while focus is outside the document (a command palette or dialog in the
   * host frame outside this web view's iframe, or the window itself losing focus): the user has not
   * moved off the row editor, and ending the session there would close the editor they are still
   * working in.
   *
   * @param target The element focus landed on
   */
  onPaneFocusLeft?: (target: Element) => void;
  /**
   * Whether `usj` is still a placeholder for a chapter that has not arrived. The pane then says
   * nothing rather than announcing that the chapter has no footnotes.
   */
  isLoading?: boolean;
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
  isLoading = false,
}: FootnotesLayoutProps) {
  const [footnotes, setFootnotes] = useState<MarkerObject[]>([]);

  /**
   * How many notes the list currently holds, readable outside a state updater: whether the list id
   * has to change is decided in the USJ effect's body, which cannot read `footnotes` (the effect
   * depends on `usj` alone, so its closure's copy can be a commit stale).
   */
  const footnotesCountRef = useRef(0);

  const [footnoteListKey, setFootnoteListKey] = useState(0);

  /**
   * The selected row. `request` is minted fresh by each selection the user or the host makes, and
   * is carried unchanged when the selection is only re-pointed at a re-parsed list: its identity is
   * the list's "reveal the row again" signal, which must not fire for a content update the user did
   * not ask to be taken to.
   */
  const [selectedFootnote, setSelectedFootnote] = useState<
    { footnote: MarkerObject; index: number; request: object } | undefined
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
    // Rows are `li`s in the Tab order, so the selected row takes focus directly. Scrolling is left
    // on: the list reveals the row for the same request, and suppressing it here would fight that.
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
    setSelectedFootnote({ footnote: footnotes[index], index, request: {} });
  }, [focusRequest, footnotes, focusRowOnFocusRequest]);

  // Mirrors `editingFootnoteIndex` into a ref so the USJ-processing effect below can read its
  // current value without depending on it: that effect parses the document, and a row entering or
  // leaving edit mode changes nothing to parse. Declared BEFORE the USJ effect so the ref is already
  // current when that effect reads it within the same commit.
  const editingFootnoteIndexRef = useRef(editingFootnoteIndex);
  /**
   * The row whose editing just ended, honored only by the parse effect below IN THE SAME COMMIT —
   * an effect declared after that one clears it again once the commit is done, whether or not the
   * parse ran (see that effect's own comment). Ending a session by committing new content flushes
   * the row editor's last keystrokes, so the row's final content and the end of editing arrive in
   * the same commit: this effect has already cleared `editingFootnoteIndexRef` by the time the
   * parse below runs, and it reads content the selection has not, so that row is still the
   * selection. Ending a session with nothing left to flush (e.g. Escape well after the last
   * keystroke) changes nothing for the parse to react to, so no parse runs that commit, and the
   * marker must not linger to be misread by whatever unrelated notes change parses next.
   */
  const endedEditingFootnoteIndexRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    // Only an END: an editing row that moved (a note added ahead of it) is followed by the index.
    endedEditingFootnoteIndexRef.current =
      editingFootnoteIndex === undefined ? editingFootnoteIndexRef.current : undefined;
    editingFootnoteIndexRef.current = editingFootnoteIndex;
  }, [editingFootnoteIndex]);

  useEffect(() => {
    try {
      const newFootnotes = findEditorUsjNotes(usj);

      // The list id tells FootnoteList its rows are new. Only additions and deletions make them
      // new; a content edit (every live-applied keystroke in the row editor) or a same-shape
      // echo must keep the rows — and the editing row's editor — mounted. Reordering with an
      // unchanged count is not detected; the listId contract already treats it as unlikely.
      if (newFootnotes.length !== footnotesCountRef.current) setFootnoteListKey((prev) => prev + 1);
      footnotesCountRef.current = newFootnotes.length;
      setFootnotes(newFootnotes);

      // Read here, not in the updater, which runs after this ref is cleared.
      const endedEditingIndex = endedEditingFootnoteIndexRef.current;
      endedEditingFootnoteIndexRef.current = undefined;
      setSelectedFootnote((currentSelected) => {
        if (!currentSelected) return undefined;
        const { index, footnote } = currentSelected;
        if (index < 0 || index >= newFootnotes.length) return undefined;
        const fresh = newFootnotes[index];
        // The row being edited is the selection by definition: its content changes on every
        // live-apply, so content equality must not decide whether it stays selected.
        const isEditingRow =
          (editingFootnoteIndexRef.current !== undefined &&
            index === editingFootnoteIndexRef.current) ||
          (endedEditingIndex !== undefined && index === endedEditingIndex);
        if (
          isEditingRow ||
          (fresh.marker === footnote.marker &&
            deepEqualAcrossIframes(fresh.content, footnote.content))
        ) {
          // Re-point at the new list's object: FootnoteList marks the selected row by identity, so
          // holding onto the old object would lose the highlight the moment a PDP echo re-parses
          // `usj` into fresh objects, even when the note's content is unchanged. The `request` is
          // kept, so the list does not scroll a row the user has scrolled away from back into view.
          // The fresh state object still re-fires `onSelectedFootnoteChange(index)` with the same
          // index (the consumer's `highlightNote` is idempotent).
          return { ...currentSelected, footnote: fresh };
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

  // Clears the ended-editing marker at the end of every commit that changed `editingFootnoteIndex`,
  // whether or not the parse effect above ran in that same commit. Declared AFTER that effect so it
  // still sees the marker in the commit editing ended in (effects run in declaration order): when
  // the parse ran there, it already cleared the marker itself and this is a no-op; when it did not
  // (the USJ prop did not change in that commit), this is what keeps the marker from surviving into
  // a later, unrelated parse, where it would misread that parse's row as still being edited.
  useEffect(() => {
    endedEditingFootnoteIndexRef.current = undefined;
  }, [editingFootnoteIndex]);

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

      setSelectedFootnote({ footnote: footnotes[index], index, request: {} });
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

      setSelectedFootnote({ footnote: footnotes[index], index, request: {} });
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

  const reportPaneFocusLost = useCallback(() => {
    if (!paneHasFocusRef.current) return;
    paneHasFocusRef.current = false;
    onPaneFocusChange?.(false);
  }, [onPaneFocusChange]);

  const handlePaneBlur = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      // Focus landing on another element inside the pane (the list to the row editor and back)
      // never leaves it. A null `relatedTarget` — focus going nowhere, e.g. the window losing it —
      // does count as leaving, matching what the user sees: no caret in the pane. Where focus
      // LANDS is the document listener's to judge (see `onPaneFocusLeft`).
      if (event.relatedTarget && isInsidePaneOrItsOverlays(event.relatedTarget, paneContainerRef))
        return;
      reportPaneFocusLost();
    },
    [reportPaneFocusLost],
  );

  // Where focus lands, judged from the document rather than from the pane's own blur: the blur
  // cannot see a return to the text after focus first left the document, nor a move out of an
  // overlay the HOST renders as a SIBLING of this component (e.g. the comment-editor popover in the
  // real app) - not a React descendant of the pane, so its blur never reaches the pane's own
  // handler. (A portal does not itself create that gap: the row editor's OWN dropdowns and menus,
  // rendered from inside this component's `renderEditingFootnote`, are still React descendants of
  // the pane wherever the portal places them in the DOM, so their blur reaches `handlePaneBlur` the
  // ordinary way.)
  useEffect(() => {
    const doc = paneContainerRef.current?.ownerDocument ?? document;
    const handleFocusIn = (event: globalThis.FocusEvent) => {
      const { target } = event;
      if (!(target instanceof Element) || isInsidePaneOrItsOverlays(target, paneContainerRef))
        return;
      reportPaneFocusLost();
      onPaneFocusLeft?.(target);
    };
    doc.addEventListener('focusin', handleFocusIn);
    return () => doc.removeEventListener('focusin', handleFocusIn);
  }, [reportPaneFocusLost, onPaneFocusLeft]);

  /**
   * `editingFootnoteIndex` as of the previous commit, read by the re-check effect below before it
   * overwrites this with the current value — the "was editing" half of the transition it cares
   * about.
   */
  const previousEditingFootnoteIndexRef = useRef(editingFootnoteIndex);

  // A focused row editor that unmounts (a reload or a chapter change closing it) takes focus with
  // it without a blur the pane can see, leaving focus nowhere - so re-check when editing ENDS.
  // Scoped to that transition alone: entering edit mode also swaps the row's element (a focused
  // `<li>` for the editor), and the editor claims focus itself only after a zero-delay timeout, so
  // checking on that transition too would read the in-between frame - where nothing in the pane
  // holds focus yet - as the pane having lost focus.
  useEffect(() => {
    const wasEditing = previousEditingFootnoteIndexRef.current !== undefined;
    previousEditingFootnoteIndexRef.current = editingFootnoteIndex;
    if (!wasEditing || editingFootnoteIndex !== undefined) return;
    const { activeElement } = paneContainerRef.current?.ownerDocument ?? document;
    if (activeElement && isInsidePaneOrItsOverlays(activeElement, paneContainerRef)) return;
    reportPaneFocusLost();
  }, [editingFootnoteIndex, reportPaneFocusLost]);

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
            // Kept as a literal rather than `{...{ [FOOTNOTES_PANE_ATTRIBUTE]: '' }}`:
            // `react/jsx-props-no-spreading` forbids spreading onto a DOM element. Must match
            // `FOOTNOTES_PANE_ATTRIBUTE` in `editor-dom.util.ts`, which `focusPaneSelectedRow`
            // queries for — pinned by a test that finds this element through that constant.
            data-footnotes-pane=""
            className="tw:relative tw:flex tw:flex-col tw:flex-1 tw:min-h-0"
            onFocus={handlePaneFocus}
            onBlur={handlePaneBlur}
          >
            {/* Floats over the list's top trailing corner (leading corner in RTL, which
                `inset-inline-end` follows on its own) rather than taking a row of its own, so the
                pane spends all of its height on notes. Held clear of the scrollbar so that stays
                grabbable, and carrying the pane's own background so the note text it covers does
                not read through it. */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>{localizedStrings['%webView_footnoteList_close%']}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* The close button floats over whichever row is scrolled to the top of the list, so
                every row reserves trailing room for it - the pane keeps all of its height for
                notes without the button painting over (or a click aimed at the text landing on)
                a note. */}
            {/* Footnotes zoom area: the close button above, the pane's own padding (on the
                ResizablePanel) and its resize handle stay outside so they keep their size while
                the list content scales. */}
            <ContentZoomRoot
              ref={setFootnoteListWrapperRef}
              area="footnotes"
              className="tw:flex tw:flex-col tw:flex-1 tw:min-h-0 tw:[&_li]:pe-7"
            >
              {footnotes.length === 0 && !isLoading && (
                <EmptyState
                  className="tw:p-2"
                  message={localizedStrings['%webView_footnoteList_empty%']}
                />
              )}
              <FootnoteList
                classNameForItems="scripture-font"
                listId={footnoteListKey}
                layout={footnotesPanePosition === 'bottom' ? 'horizontal' : 'vertical'}
                footnotes={footnotes}
                showMarkers={showMarkers}
                formatCaller={showMarkers ? (c) => c : undefined}
                ariaLabel={localizedStrings['%webView_footnoteList_header%']}
                selectedFootnote={selectedFootnote?.footnote}
                // Minted fresh on every selection application (pane click or focus request), so a
                // repeat focusRequest for the same footnote re-scrolls even though the derived
                // footnote object and index are unchanged.
                selectionRequest={selectedFootnote?.request}
                onFootnoteSelected={handleFootnoteSelected}
                onFootnoteEditRequested={
                  onFootnoteEditRequested ? handleFootnoteEditRequested : undefined
                }
                // Clamped for the one commit in which a note inserted ahead of the edited LAST row
                // has moved the index but not yet the list (derived in an effect below): out of
                // range, no row would be the editing row and the row editor would remount.
                editingFootnoteIndex={
                  editingFootnoteIndex === undefined
                    ? undefined
                    : Math.min(editingFootnoteIndex, footnotes.length - 1)
                }
                renderEditingFootnote={renderEditingFootnote}
              />
            </ContentZoomRoot>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
