import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectData, useProjectSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEffect, useMemo, useRef } from 'react';
import { deriveCellState } from './resource-cell.utils';
import { RESOURCE_CELL_STRING_KEYS, ResourceCellView } from './resource-cell.view';
import { sliceUsjToVerse } from './verse-display.utils';

const DEFAULT_TEXT_DIRECTION = 'ltr';
const STRING_KEYS: LocalizeKey[] = [...RESOURCE_CELL_STRING_KEYS];

type GridResource = { projectId: string; label: string };
type ResourceCellProps = {
  resourceRef: GridResource;
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
  viewMode?: 'chapter' | 'verse';
};

/**
 * One resource, the focused chapter or verse. Reuses the resource-text-panel render path: fetch the
 * chapter, feed it to Editorial, which navigates to `scrRef`. In verse mode, feeds Editorial only
 * the slice for `scrRef.verseNum` (via `sliceUsjToVerse`) instead of the whole chapter. Delegates
 * layout and the downloading/failed visuals to `ResourceCellView`.
 */
export function ResourceCell({
  resourceRef,
  scrRef,
  setScrRef,
  viewMode = 'chapter',
}: ResourceCellProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);

  // #region Chapter fetch — data method returns [data, setData, isLoading]; isLoading is index 2.
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
    () => deriveCellState({ usjPossiblyError, isLoading }),
    [usjPossiblyError, isLoading],
  );

  // #region Editor
  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const options: EditorOptions = useMemo(
    () => ({ isReadonly: true, hasSpellCheck: false, textDirection }),
    [textDirection],
  );
  // Slice depends on scrRef.verseNum (unlike the chapter fetch memo above, which intentionally
  // omits it — the chapter is identical across verses, but the slice is not).
  const verseSlice = useMemo(() => {
    if (viewMode !== 'verse') return undefined;
    if (!usjPossiblyError || isPlatformError(usjPossiblyError)) return undefined;
    return sliceUsjToVerse(usjPossiblyError, scrRef.verseNum);
  }, [viewMode, usjPossiblyError, scrRef.verseNum]);

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
      editor={
        <Editorial
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={setScrRef}
          options={options}
          logger={logger}
        />
      }
    />
  );
}

export default ResourceCell;
