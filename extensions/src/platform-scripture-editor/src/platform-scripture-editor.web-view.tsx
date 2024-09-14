import {
  EditorOptions,
  Editorial,
  EditorRef,
  Marginal,
  MarginalRef,
} from '@biblionexus-foundation/platform-editor';
import { Usj } from '@biblionexus-foundation/scripture-utilities';
import { VerseRef } from '@sillsdev/scripture';
import { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData } from '@papi/frontend/react';
import { ScriptureReference } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';

/** The offset in pixels from the top of the window to scroll to show the verse number */
const VERSE_NUMBER_SCROLL_OFFSET = 80;

/**
 * Time in ms to delay taking action to wait for the editor to load. Hope to be obsoleted by a way
 * to listen for the editor to finish loading
 */
const EDITOR_LOAD_DELAY_TIME = 100;

const usjDocumentDefault: Usj = { type: 'USJ', version: '0.2.1', content: [] };

/**
 * Check deep equality of two values such that two equal objects or arrays created in two different
 * iframes successfully test as equal
 *
 * @param a
 * @param b
 * @returns
 */
function deepEqualAcrossIframes(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function scrollToScrRef(scrRef: ScriptureReference): HTMLElement | undefined {
  const verseElement =
    document.querySelector<HTMLElement>(
      `.editor-container span[data-marker="v"][data-number="${scrRef.verseNum}"]`,
    ) ?? undefined;

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
  projectId,
  useWebViewState,
  useWebViewScrollGroupScrRef,
}: WebViewProps): JSX.Element {
  const [isReadOnly] = useWebViewState<boolean>('isReadOnly', true);
  const Editor = isReadOnly ? Editorial : Marginal;

  // Using react's ref api which uses null, so we must use null
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | MarginalRef | null>(null);
  const [scrRef, setScrRefInternal] = useWebViewScrollGroupScrRef();

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

  const [usj] = useProjectData('platformScripture.USJ_Chapter', projectId).ChapterUSJ(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    usjDocumentDefault,
  );

  // Editor's current usj state
  const editorUsj = useRef(usj);

  // Update the editor if a change comes in
  useEffect(() => {
    // Deep compare the old and current state of the usj to make sure we don't change the editor's
    // state without a need. Note that it already does that internally using a different algorithm,
    // but we need to compare in such a way that the same object across iframes works fine
    if (usj && !deepEqualAcrossIframes(usj, editorUsj.current)) {
      editorUsj.current = usj;
      editorRef.current?.setUsj(usj);
    }
  }, [usj]);

  // On loading the first time, scroll the selected verse into view
  useEffect(() => {
    if (usj && !hasFirstRetrievedScripture.current) {
      hasFirstRetrievedScripture.current = true;
      // Wait before scrolling to make sure there is time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      setTimeout(() => scrollToScrRef(scrRef), EDITOR_LOAD_DELAY_TIME);
    }
  }, [usj, scrRef]);

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

    let highlightedVerseElement: HTMLElement | undefined;

    // Wait before scrolling to make sure there is time for the editor to load
    // TODO: hook into the editor and detect when it has loaded somehow
    const scrollTimeout = setTimeout(() => {
      // Scroll to and add a highlight to the current verse element
      highlightedVerseElement = scrollToScrRef(scrRef);
      highlightedVerseElement?.classList.add('highlighted');

      internallySetScrRefRef.current = undefined;
    }, EDITOR_LOAD_DELAY_TIME);

    return () => {
      // Cancel this timeout to scroll if it is running because the scrRef changed and we need to
      // scroll somewhere else
      clearTimeout(scrollTimeout);

      // Remove highlight from the current verse element
      highlightedVerseElement?.classList.remove('highlighted');
    };
  }, [scrRef]);

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnly,
      hasSpellCheck: false,
      textDirection: 'ltr',
    }),
    [isReadOnly],
  );

  return (
    <>
      {/* Workaround to pull in platform-bible-react styles into the editor */}
      <Button className="pr-hidden" />
      <Editor
        ref={editorRef}
        projectId={projectId}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        options={options}
        logger={logger}
      />
    </>
  );
};
