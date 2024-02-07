import { VerseRef } from '@sillsdev/scripture';
import { logger } from '@papi/frontend';
import { useProjectData, useSetting } from '@papi/frontend/react';
import { ScriptureReference } from 'platform-bible-utils';
import { JSX, useEffect, useMemo, useState } from 'react';
import type { WebViewProps } from '@papi/core';
import { Editor, Usj, usxStringToJson } from '@biblionexus-foundation/platform-editor';

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

  const [scrRef, setScrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [usx] = useProjectData('ParatextStandard', projectId).ChapterUSX(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    '',
  );

  const [usj, setUsj] = useState<Usj>();
  useEffect(() => {
    if (usx) {
      try {
        setUsj(usxStringToJson(usx));
      } catch (e) {
        logger.warn(`ResourceViewer convert error: ${e}`);
      }
    }
  }, [usx]);

  return (
    <>
      <Editor usj={usj} scrRefState={[scrRef, setScrRef]} logger={logger} />
      {/* <pre>{JSON.stringify(usj, undefined, 2)}</pre> */}
      {/* <pre>{usx}</pre> */}
    </>
  );
};
