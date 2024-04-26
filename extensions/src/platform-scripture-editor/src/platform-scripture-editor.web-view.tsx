import { VerseRef } from '@sillsdev/scripture';
import { logger } from '@papi/frontend';
import { useProjectData, useSetting } from '@papi/frontend/react';
import { ScriptureReference, debounce } from 'platform-bible-utils';
import { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import type { WebViewProps } from '@papi/core';
import {
  Editor,
  EditorOptions,
  EditorRef,
  Usj,
  usjToUsxString,
  usxStringToUsj,
} from '@biblionexus-foundation/platform-editor';

/** The offset in pixels from the top of the window to scroll to show the verse number */
const VERSE_NUMBER_SCROLL_OFFSET = 80;

/**
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 */
const EDITOR_LOAD_DELAY_TIME = 100;

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

function scrollToScrRef(scrRef: ScriptureReference) {
  const verseElement = document.querySelector<HTMLElement>(
    `.editor-container span[data-marker="v"][data-number="${scrRef.verseNum}"]`,
  );

  // Scroll if we find the verse or we're at the start of the chapter
  if (verseElement || scrRef.verseNum === 1) {
    // If we're at the first verse, scroll to the top so we can see intro material
    let scrollTop = 0;
    if (verseElement && scrRef.verseNum > 1)
      scrollTop =
        verseElement.getBoundingClientRect().top + window.scrollY - VERSE_NUMBER_SCROLL_OFFSET;

    window.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });
  }
  return verseElement;
}

globalThis.webViewComponent = function PlatformScriptureEditor({
  useWebViewState,
}: WebViewProps): JSX.Element {
  const [projectId] = useWebViewState<string>('projectId', '');
  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);

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
      // Wait before scrolling to make sure there is time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      setTimeout(() => scrollToScrRef(scrRef), EDITOR_LOAD_DELAY_TIME);
    }
  }, [usx, scrRef]);

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

    // Using react's ref api which uses null, so we must use null
    // eslint-disable-next-line no-null/no-null
    let highlightedVerseElement: HTMLElement | null;

    // Wait before scrolling to make sure there is time for the editor to load
    // TODO: hook into the editor and detect when it has loaded somehow
    const scrollTimeout = setTimeout(() => {
      // Scroll to and add a highlight to the current verse element
      highlightedVerseElement = scrollToScrRef(scrRef);
      if (highlightedVerseElement) highlightedVerseElement.classList.add('highlighted');

      internallySetScrRefRef.current = undefined;
    }, EDITOR_LOAD_DELAY_TIME);

    return () => {
      // Cancel this timeout to scroll if it is running because the scrRef changed and we need to
      // scroll somewhere else
      clearTimeout(scrollTimeout);

      // Remove highlight from the current verse element
      if (highlightedVerseElement) highlightedVerseElement.classList.remove('highlighted');
    };
  }, [scrRef]);

  const options: EditorOptions = { hasSpellCheck: false, isReadonly: isReadOnly };

  return (
    <Editor
      ref={editorRef}
      scrRef={scrRef}
      setScrRef={setScrRef}
      options={options}
      onChange={onChange}
      logger={logger}
    />
  );
};
