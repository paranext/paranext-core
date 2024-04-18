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

function scrollToScrRef(scrRef: ScriptureReference) {
  // We are querying for a span, so this Element will be an HTMLElement
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const verseElement = document.querySelector(
    `.editor-container span[data-marker="v"][data-number="${scrRef.verseNum}"]`,
  ) as HTMLElement | undefined;
  if (verseElement) {
    window.scrollTo({
      top: verseElement.getBoundingClientRect().top + window.scrollY - 55,
      behavior: 'smooth',
    });
  }
  return verseElement;
}

globalThis.webViewComponent = function ResourceViewer({
  useWebViewState,
}: WebViewProps): JSX.Element {
  const [projectId] = useWebViewState<string>('projectId', '');
  logger.debug(`Resource Viewer project ID: ${projectId}`);

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const [scrRef, setScrRefInternal] = useSetting('platform.verseRef', defaultScrRef);

  /**
   * Scripture reference we set most recently. Used so we don't scroll on updates to scrRef that
   * come from us
   */
  const internallySetScrRefRef = useRef<ScriptureReference | undefined>(undefined);

  const setScrRef = useCallback(
    (newScrRef: ScriptureReference) => {
      internallySetScrRefRef.current = newScrRef;
      return setScrRefInternal(newScrRef);
    },
    [setScrRefInternal],
  );

  /**
   * Whether we have gotten the Scripture data for the very first time. Used to scroll to the
   * current scrRef on startup
   */
  const hasFirstRetrievedScripture = useRef(false);

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

  useEffect(() => {
    if (usx && !hasFirstRetrievedScripture.current) {
      hasFirstRetrievedScripture.current = true;
      // Wait 100 ms before scrolling to make sure there is plenty of time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      setTimeout(() => scrollToScrRef(scrRef), 100);
    }
  }, [usx, scrRef]);

  const viewOptions = useMemo(() => getViewOptions('formatted'), []);

  // Scroll the selected verse into view
  useEffect(() => {
    // If we made this latest scrRef change, don't scroll
    if (
      internallySetScrRefRef.current &&
      internallySetScrRefRef.current.bookNum === scrRef.bookNum &&
      internallySetScrRefRef.current.chapterNum === scrRef.chapterNum &&
      internallySetScrRefRef.current.verseNum === scrRef.verseNum
    ) {
      internallySetScrRefRef.current = undefined;
      return () => {};
    }

    // Add a highlight to the current verse element
    const highlightedVerseElement = scrollToScrRef(scrRef);
    if (highlightedVerseElement) highlightedVerseElement.classList.add('highlighted');

    internallySetScrRefRef.current = undefined;

    return () => {
      // Remove highlight from the current verse element
      if (highlightedVerseElement) highlightedVerseElement.classList.remove('highlighted');
    };
  }, [scrRef]);

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
