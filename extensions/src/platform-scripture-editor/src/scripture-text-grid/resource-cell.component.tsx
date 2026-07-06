import { Editorial, EditorOptions, EditorRef } from '@eten-tech-foundation/platform-editor';
import { EMPTY_USJ } from '@eten-tech-foundation/scripture-utilities';
import { logger } from '@papi/frontend';
import { useLocalizedStrings, useProjectData, useProjectSetting } from '@papi/frontend/react';
import { Spinner } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { useEffect, useMemo, useRef } from 'react';
import { deriveCellState } from './resource-cell.utils';

const DEFAULT_TEXT_DIRECTION = 'ltr';
const UNAVAILABLE_KEY = '%webView_scriptureTextGrid_cell_unavailable%';
const DOWNLOADING_KEY = '%webView_scriptureTextGrid_cell_unavailable_downloading%';
const FAILED_KEY = '%webView_scriptureTextGrid_cell_unavailable_failed%';
const STRING_KEYS: LocalizeKey[] = [UNAVAILABLE_KEY, DOWNLOADING_KEY, FAILED_KEY];

type GridResource = { projectId: string; label: string };
type ResourceCellProps = {
  resourceRef: GridResource;
  scrRef: SerializedVerseRef;
  setScrRef: (scrRef: SerializedVerseRef) => void;
};

/**
 * One resource, the focused chapter. Reuses the resource-text-panel render path: fetch the chapter,
 * feed it to Editorial, which navigates to `scrRef`. Visualizes downloading/failed locally.
 */
export function ResourceCell({ resourceRef, scrRef, setScrRef }: ResourceCellProps) {
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

  const state = deriveCellState({ usjPossiblyError, isLoading });

  // #region Editor
  // EditorRef requires null initial value per React ref convention
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const options: EditorOptions = useMemo(
    () => ({ isReadonly: true, hasSpellCheck: false, textDirection }),
    [textDirection],
  );
  useEffect(() => {
    if (state === 'ready' && usjPossiblyError && !isPlatformError(usjPossiblyError))
      editorRef.current?.setUsj(usjPossiblyError);
  }, [state, usjPossiblyError]);
  // #endregion

  return (
    <div role="gridcell" aria-label={resourceRef.label} className="tw:flex tw:min-w-0 tw:flex-col">
      <div className="tw:border-b tw:px-2 tw:py-1 tw:text-sm tw:font-medium">
        {resourceRef.label}
      </div>
      <div className="tw:flex-1 tw:overflow-auto tw:p-2" dir={textDirection}>
        {state === 'ready' ? (
          <Editorial
            ref={editorRef}
            scrRef={scrRef}
            onScrRefChange={setScrRef}
            options={options}
            logger={logger}
          />
        ) : (
          <div className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-2 tw:text-center">
            {state === 'downloading' && <Spinner />}
            <span className="tw:font-medium">{localizedStrings[UNAVAILABLE_KEY]}</span>
            <span className="tw:text-sm tw:text-muted-foreground">
              {state === 'failed'
                ? localizedStrings[FAILED_KEY]
                : localizedStrings[DOWNLOADING_KEY]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResourceCell;
