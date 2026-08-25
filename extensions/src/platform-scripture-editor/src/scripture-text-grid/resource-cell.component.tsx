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

  // Fall-forward is display-only: we hand the editor verse 1's text while telling it verse 0, and
  // that resolved verse must never reach the shared scroll group — it would drag the Scripture
  // Editor off the intro the user came from. `Editorial`'s reference plugin stays mounted when
  // read-only (`Editor.tsx` gates it on `scrRef && onScrRefChange` only) and reports selections that
  // disagree with `scrRef`, so this swallows any such echo in a fallen-forward verse cell.
  //
  // DEFENSE-IN-DEPTH, NOT A FIX FOR A LIVE REPORT. `$resolvePosition` refuses to describe a position
  // in a document with no BookNode and no ChapterNode (upstream invariant I5), and `sliceUsjToVerse`
  // drops both — so today the plugin is silent in verse mode and this branch is unreachable. It is
  // kept because it costs nothing and is the right shape if slices ever become addressable. Don't
  // read it as evidence that a write-back currently happens; the next person to touch this should
  // not reason from a mechanism that isn't there. Holds against platform-editor 0.8.15 — both the
  // published package and `dev-packages/scripture-editors`, which `postinstall` ->
  // `link-dev-packages` yalc-links over `node_modules`. Read the LINKED build when checking this,
  // not whatever version `package-lock.json` names; the two can disagree.
  //
  // The guard belongs here, not upstream in `ScriptureReferencePlugin`. Gating that plugin on
  // `isReadonly` would break the read-only surfaces that need it: it is bidirectional (it also moves
  // the caret to `scrRef`), and read-only click-to-sync — which this grid's CHAPTER mode and the
  // Resource Viewer depend on, both feeding a whole chapter so the document is addressable — would
  // go with it. A read-only editor reporting its caret is correct; the bug would be ours, since WE
  // told it a reference we then contradicted. Full reasoning, and what a future single-verse surface
  // must copy: adr-verse-zero-resolves-to-verse-one.
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
