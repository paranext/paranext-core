import { VerseRef } from '@sillsdev/scripture';
import { logger } from '@papi/frontend';
import { useProjectData, useSetting } from '@papi/frontend/react';
import { ScriptureReference, debounce } from 'platform-bible-utils';
import { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import type { WebViewProps } from '@papi/core';
import {
  Editor,
  EditorRef,
  Usj,
  getViewOptions,
  usjToUsxString,
  usxStringToUsj,
} from '@biblionexus-foundation/platform-editor';

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

globalThis.webViewComponent = function ResourceViewer({
  useWebViewState,
}: WebViewProps): JSX.Element {
  const [projectId] = useWebViewState<string>('projectId', '');
  logger.debug(`Resource Viewer project ID: ${projectId}`);

  // This ref becomes defined when passed to the editor.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, no-null/no-null
  const editorRef = useRef<EditorRef>(null!);
  const [scrRef, setScrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [usx, setUsx] = useProjectData('ParatextStandard', projectId).ChapterUSX(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    '',
  );

  const debouncedSetUsx = useMemo(
    () => debounce((usj: Usj) => setUsx?.(usjToUsxString(usj)), 300),
    [setUsx],
  );

  // TODO: remove debounce when issue #826 is done.
  const onChange = useCallback(debouncedSetUsx, [debouncedSetUsx]);

  useEffect(() => {
    if (usx) editorRef.current?.setUsj(usxStringToUsj(usx));
  }, [usx]);

  const viewOptions = useMemo(() => getViewOptions('formatted'), []);

  return (
    <Editor
      ref={editorRef}
      scrRef={scrRef}
      setScrRef={setScrRef}
      onChange={onChange}
      viewOptions={viewOptions}
      logger={logger}
    />
  );
};
