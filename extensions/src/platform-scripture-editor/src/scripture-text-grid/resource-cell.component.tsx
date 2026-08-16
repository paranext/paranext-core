import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectData, useProjectSetting } from '@papi/frontend/react';
import { useExtraValidMarkers } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo, useRef, type KeyboardEvent } from 'react';
import { deriveCellState } from './resource-cell.utils';
import {
  RESOURCE_CELL_STRING_KEYS,
  ResourceCellView,
  type ZoomMenuLabels,
} from './resource-cell-view.component';
import { DEFAULT_ZOOM_FACTOR, MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from './resource-zoom.utils';
import type { ResourceZoomController } from './use-resource-zoom.hook';
import { resolveDisplayVerseNum, sliceUsjToVerse } from './verse-display.utils';

const DEFAULT_TEXT_DIRECTION = 'ltr';
const STRING_KEYS: LocalizeKey[] = [...RESOURCE_CELL_STRING_KEYS];

/**
 * A resource to render as a grid cell.
 *
 * `projectId` is `undefined` when the DBL reference could not be resolved to an installed project
 * (e.g., the resource has not been downloaded or is absent from the cached resource list). The cell
 * renders an `'unavailable'` placeholder in that case.
 */
export type GridResource = { resourceId: string; projectId: string | undefined; label: string };
type ResourceCellProps = {
  resourceRef: GridResource;
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  viewMode?: 'chapter' | 'verse';
  /** Per-resource zoom controller; when omitted the cell renders without zoom surfaces. */
  zoom?: ResourceZoomController;
  /** Localized zoom menu copy, passed straight to the view. */
  zoomMenuLabels?: ZoomMenuLabels;
  /**
   * When true, show a focusable reorder-handle grip in the header (reorder logic lives in the
   * parent).
   */
  showDragHandle?: boolean;
  /** Accessible name for the reorder grip (e.g. "Reorder Genesis"). */
  reorderHandleLabel?: string;
  /** Tooltip text shown on grip hover/focus. */
  reorderHint?: string;
  /** Keydown handler for the grip; the parent owns the arrow-key reorder logic. */
  onReorderKeyDown?: (event: KeyboardEvent) => void;
};

/**
 * One resource, the focused chapter or verse. Reuses the resource-text-panel render path: fetch the
 * chapter, feed it to Editorial, which navigates to `scrRef`. In verse mode, feeds Editorial only
 * that verse's slice instead of the whole chapter — a verse-0 reference shows verse 1
 * ({@link resolveDisplayVerseNum}). Delegates layout and the downloading/failed visuals to
 * `ResourceCellView`.
 */
export function ResourceCell({
  resourceRef,
  scrRef,
  setScrRef,
  viewMode = 'chapter',
  zoom,
  zoomMenuLabels,
  showDragHandle,
  reorderHandleLabel,
  reorderHint,
  onReorderKeyDown,
}: ResourceCellProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // #region Chapter fetch — data method returns [data, setData, isLoading]; isLoading is index 2.
  // `projectId` may be undefined for unavailable resources; both hooks must still be called
  // unconditionally (Rules of Hooks). The hooks accept undefined and return loading/empty state.
  const [usjPossiblyError, , isLoading] = useProjectData(
    'platformScripture.USJ_Chapter',
    resourceRef.projectId,
  ).ChapterUSJ(
    useMemo(
      () => ({
        book: scrRef.book,
        chapterNum: scrRef.chapterNum,
        verseNum: 1,
        versificationStr: scrRef.versificationStr,
      }),
      [scrRef.book, scrRef.chapterNum, scrRef.versificationStr],
    ),
    EMPTY_USJ,
  );
  // #endregion

  // #region Text direction (unwrapped)
  const [textDirectionPossiblyError] = useProjectSetting(
    resourceRef.projectId,
    'platform.textDirection',
    DEFAULT_TEXT_DIRECTION,
  );
  const textDirection = useMemo(() => {
    if (isPlatformError(textDirectionPossiblyError)) {
      logger.warn(
        `ScriptureTextGrid: text direction error: ${getErrorMessage(textDirectionPossiblyError)}`,
      );
      return DEFAULT_TEXT_DIRECTION;
    }
    return textDirectionPossiblyError || DEFAULT_TEXT_DIRECTION;
  }, [textDirectionPossiblyError]);
  // #endregion

  const state = useMemo(
    () =>
      resourceRef.projectId === undefined
        ? 'unavailable'
        : deriveCellState({ usjPossiblyError, isLoading }),
    [resourceRef.projectId, usjPossiblyError, isLoading],
  );

  // #region Zoom — computed here so the callbacks and bound-state are available for the view's
  // kebab dropdown and the right-click zoom menu rendered by ResourceCellView.
  const zoomFactor = zoom ? zoom.getZoom(resourceRef.resourceId) : undefined;
  const canZoomIn = zoomFactor === undefined || zoomFactor < MAX_ZOOM_FACTOR;
  const canZoomOut = zoomFactor === undefined || zoomFactor > MIN_ZOOM_FACTOR;
  const canReset = zoomFactor !== undefined && zoomFactor !== DEFAULT_ZOOM_FACTOR;
  const handleZoomIn = useCallback(
    () => zoom?.adjustZoom(resourceRef.resourceId, 1),
    [zoom, resourceRef.resourceId],
  );
  const handleZoomOut = useCallback(
    () => zoom?.adjustZoom(resourceRef.resourceId, -1),
    [zoom, resourceRef.resourceId],
  );
  const handleResetZoom = useCallback(
    () => zoom?.resetZoom(resourceRef.resourceId),
    [zoom, resourceRef.resourceId],
  );
  // #endregion

  // #region Editor
  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  // Give the editor this resource's valid markers so it recognizes them (footnote/apparatus and
  // other resource-specific markers) instead of rendering them inline as raw text. Mirrors the
  // resource-text-panel render path this cell reuses.
  const usj = useMemo(
    () => (isPlatformError(usjPossiblyError) ? undefined : usjPossiblyError),
    [usjPossiblyError],
  );
  const extraValidMarkers = useExtraValidMarkers(usj);
  const options: EditorOptions = useMemo(
    () => ({
      isReadonly: true,
      hasSpellCheck: false,
      textDirection,
      ...(extraValidMarkers.length > 0 ? { nodes: { extraValidMarkers } } : {}),
    }),
    [textDirection, extraValidMarkers],
  );
  // Only the USJ fed to the editor is resolved — `scrRef` passes through untouched. Keying the memo
  // on the resolved verse (not scrRef.verseNum) also keeps 1:0 -> 1:1 from re-feeding identical
  // content.
  const displayVerseNum = resolveDisplayVerseNum(scrRef.verseNum);
  const isFallenForward = displayVerseNum !== scrRef.verseNum;

  // Editorial's reference plugin is active even when read-only, and `$findAndSetChapterAndVerse`
  // reports a selection whose CHAPTER or VERSE disagrees with `scrRef` (a chapter mismatch when the
  // document has a chapter node, or a `scrRef` verse outside the selected verse marker's range) —
  // not the verse alone. Under fall-forward that disagreement is permanent: we hand the editor verse
  // 1's text while telling it verse 0, so `isVerseInRange(0, '1')` is false on every click. A single
  // click would therefore push verse 1 into the shared scroll group, dragging the Scripture Editor
  // off the intro the user came from. Worse, the slice carries no chapter marker, so
  // `parseInt(chapterNode?.getNumber() ?? '1', 10)` yields chapter 1 and Luke 5:0 reports Luke 1:1 —
  // a chapter jump. Swallow that echo: fall-forward is display-only.
  //
  // Non-fallen-forward cells report normally, but note what that means per mode. In CHAPTER mode the
  // document carries real chapter chrome, so click-to-sync works. In VERSE mode the slice holds
  // exactly the verse `scrRef` names, so a click resolves to that same verse, the plugin finds no
  // disagreement, and nothing is reported — clicking a verse cell has nowhere to sync TO. That is
  // pre-existing (the slice has dropped chapter chrome since #2509) and is not a lost capability.
  //
  // The trace above is against `@eten-tech-foundation/platform-editor` 0.8.14 (lockfile-resolved and
  // installed). Treat that as the floor, not the target: this repo's `main` already imports editor
  // APIs 0.8.14 does not export, so the build we actually run is newer. In the newer build the
  // plugin is rewritten around `$resolvePosition`, which refuses to describe a position in a
  // document with no BookNode and no ChapterNode — a chrome-free slice is exactly that, so it
  // reports nothing here. The guard is correct either way: a live fix against 0.8.14,
  // defense-in-depth against the rewrite. Don't delete it on the strength of the rewrite alone.
  //
  // This guard belongs here, not upstream in `ScriptureReferencePlugin`. Gating that plugin on
  // `isReadonly` would break the read-only surfaces that need it: it is bidirectional (it also moves
  // the caret to `scrRef`), and read-only click-to-sync — which this grid's CHAPTER mode and the
  // Resource Viewer depend on — would go with it. A read-only editor reporting its caret is correct;
  // the bug is that WE told it a reference we then contradicted, so the component that created the
  // mismatch is the one that owns it. Full reasoning, and what a future single-verse surface must
  // copy: ADR-0013.
  const handleScrRefChange = useCallback(
    (nextScrRef: SerializedVerseRef) => {
      if (viewMode === 'verse' && isFallenForward) return;
      setScrRef(nextScrRef);
    },
    [viewMode, isFallenForward, setScrRef],
  );

  // Slice depends on the verse, unlike the chapter fetch memo above, which intentionally omits it —
  // the chapter is identical across verses, but the slice is not.
  const verseSlice = useMemo(() => {
    if (viewMode !== 'verse') return undefined;
    if (!usjPossiblyError || isPlatformError(usjPossiblyError)) return undefined;
    return sliceUsjToVerse(usjPossiblyError, displayVerseNum);
  }, [viewMode, usjPossiblyError, displayVerseNum]);

  useEffect(() => {
    if (state !== 'ready' || !usjPossiblyError || isPlatformError(usjPossiblyError)) return;
    if (viewMode === 'verse' && verseSlice?.isEmpty) return; // nothing to show
    const usjToShow = viewMode === 'verse' && verseSlice ? verseSlice.usj : usjPossiblyError;
    editorRef.current?.setUsj(usjToShow);
  }, [state, usjPossiblyError, viewMode, verseSlice]);
  // #endregion

  const isVerseEmpty = viewMode === 'verse' && state === 'ready' && (verseSlice?.isEmpty ?? false);

  return (
    <ResourceCellView
      state={state}
      label={resourceRef.label}
      textDirection={textDirection}
      localizedStrings={localizedStrings}
      isVerseEmpty={isVerseEmpty}
      nameDisplay={viewMode === 'verse' ? 'inline' : 'header'}
      zoomFactor={zoomFactor}
      canZoomIn={canZoomIn}
      canZoomOut={canZoomOut}
      canReset={canReset}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onResetZoom={handleResetZoom}
      zoomMenuLabels={zoom && state !== 'unavailable' ? zoomMenuLabels : undefined}
      showDragHandle={showDragHandle}
      reorderHandleId={resourceRef.resourceId}
      reorderHandleLabel={reorderHandleLabel}
      reorderHint={reorderHint}
      onReorderKeyDown={onReorderKeyDown}
      editor={
        <Editorial
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={handleScrRefChange}
          options={options}
          logger={logger}
        />
      }
    />
  );
}

export default ResourceCell;
