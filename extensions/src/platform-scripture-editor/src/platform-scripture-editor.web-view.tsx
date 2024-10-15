import {
  Comments,
  EditorOptions,
  Editorial,
  EditorRef,
  Marginal,
  MarginalRef,
} from '@biblionexus-foundation/platform-editor';
import { MarkerContent, Usj } from '@biblionexus-foundation/scripture-utilities';
import { Canon, VerseRef } from '@sillsdev/scripture';
import { JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import type { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { useProjectData, useProjectSetting } from '@papi/frontend/react';
import { debounce, ScriptureReference, UsjReaderWriter } from 'platform-bible-utils';
import { Button } from 'platform-bible-react';
import { LegacyComment } from 'legacy-comment-manager';
import {
  convertEditorCommentsToLegacyComments,
  convertLegacyCommentsToEditorThreads,
  insertCommentAnchorsIntoUsj,
  MILESTONE_END,
  MILESTONE_START,
} from './comments';

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

  const [usj, setUsjRaw] = useProjectData('platformScripture.USJ_Chapter', projectId).ChapterUSJ(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    usjDocumentDefault,
  );

  const setUsj = useCallback(
    (newUsj: Usj) => {
      if (!setUsjRaw) return;
      const usjRW = new UsjReaderWriter(newUsj);
      // Remove the milestones that we inserted before writing back to the PDP
      usjRW.removeContentNodes((node: MarkerContent) => {
        if (typeof node === 'string') return false;
        if (node.type !== 'ms') return false;
        if (node.marker === MILESTONE_START || node.marker === MILESTONE_END) return true;
        return true;
      });
      setUsjRaw(newUsj);
    },
    [setUsjRaw],
  );

  const [legacyComments, setLegacyComments] = useProjectData(
    'legacyCommentManager.comments',
    projectId,
  ).Comments(
    useMemo(() => {
      return { bookId: Canon.bookNumberToId(scrRef.bookNum), chapterNum: scrRef.chapterNum };
    }, [scrRef]),
    [],
  );

  const debouncedSetUsj = useMemo(() => debounce((newUsj: Usj) => setUsj?.(newUsj), 300), [setUsj]);

  // Editor's current usj and comment state
  const editorUsj = useRef(usj);
  const editorLegacyComments = useRef(legacyComments);

  const updateComments = useCallback(
    (newComments: Comments | undefined, usjWithAnchors: Usj | undefined = editorUsj.current) => {
      // Cannot convert between legacy and current comments without access to corresponding USJ
      if (!usjWithAnchors) {
        logger.warn('Updating comments without providing USJ');
        return;
      }
      // We aren't currently overwriting comments, so if it's empty we have nothing to do
      if (!newComments) {
        logger.debug('Updating comments, but the comments are empty');
        return;
      }
      // If we can't save a newly merged set of comments, we have nothing to do
      if (!setLegacyComments) {
        logger.warn('Updating comments without a way to save the comments to a PDP');
        return;
      }

      // Record all the IDs of previously known comments
      const legacyCommentIds = new Set<string>();
      legacyComments.forEach((existingComment) => legacyCommentIds.add(existingComment.id));

      // Determine which "new" comments are actually new
      const usjRW = new UsjReaderWriter(usjWithAnchors);
      const newLegacyComments = convertEditorCommentsToLegacyComments(newComments, usjRW, scrRef);
      const legacyCommentsToAdd: LegacyComment[] = [];
      newLegacyComments.forEach((newComment) => {
        if (!legacyCommentIds.has(newComment.id)) legacyCommentsToAdd.push(newComment);
      });

      // Nothing to do
      if (legacyCommentsToAdd.length === 0) return;

      // Save the new comments to the data provider
      const newCommentArray = [...legacyComments, ...legacyCommentsToAdd];
      setLegacyComments(newCommentArray);
    },
    [legacyComments, scrRef, setLegacyComments],
  );

  const insertCommentAnchors = useCallback(
    (newUsj: Usj) => {
      try {
        insertCommentAnchorsIntoUsj(newUsj, legacyComments);
        // Getting more information about the error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.debug(`Error inserting anchors into USJ: ${error}, stack = ${error.stack}"`);
      }
    },
    [legacyComments],
  );

  // TODO: remove debounce when issue #826 is done.
  const onUsjChange = useCallback(
    (newUsj: Usj, newComments: Comments | undefined) => {
      insertCommentAnchors(newUsj);
      updateComments(newComments, newUsj);
      editorUsj.current = newUsj;
      debouncedSetUsj(newUsj);
    },
    [debouncedSetUsj, insertCommentAnchors, updateComments],
  );

  // Update the editor if a change comes in
  useEffect(() => {
    // We don't know if the USJ or comments will change first, but the USJ has to be correct before
    // comments can be set

    // Deep compare the old and current state of the usj to make sure we don't change the editor's
    // state without a need. Note that it already does that internally using a different algorithm,
    // but we need to compare in such a way that the same object across iframes works fine
    if (
      usj &&
      legacyComments &&
      editorRef.current &&
      (!deepEqualAcrossIframes(usj, editorUsj.current) ||
        !deepEqualAcrossIframes(legacyComments, editorLegacyComments.current))
    ) {
      insertCommentAnchors(usj);
      editorUsj.current = usj;
      editorRef.current.setUsj(usj);

      if ('setComments' in editorRef.current) {
        // Make sure that USJ has been loaded or setting comments will fail because the editor
        // won't see any anchors for them
        const threads = convertLegacyCommentsToEditorThreads(legacyComments);
        editorLegacyComments.current = legacyComments;
        editorRef.current.setComments?.(threads);
      }
    }
  }, [insertCommentAnchors, legacyComments, usj]);

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

  const [projectName] = useProjectSetting(projectId, 'platform.name', '');

  const options = useMemo<EditorOptions>(
    () => ({
      isReadonly: isReadOnly,
      hasSpellCheck: false,
      textDirection: projectName === 'OHEBGRK' && Canon.isBookOT(scrRef.bookNum) ? 'rtl' : 'ltr',
    }),
    [isReadOnly, projectName, scrRef],
  );

  return isReadOnly ? (
    <>
      {/* Workaround to pull in platform-bible-react styles into the editor */}
      <Button className="tw-hidden" />
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        options={options}
        logger={logger}
      />
    </>
  ) : (
    <>
      {/* Workaround to pull in platform-bible-react styles into the editor */}
      <Button className="tw-hidden" />
      <Marginal
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        onUsjChange={onUsjChange}
        onCommentChange={updateComments}
        options={options}
        logger={logger}
      />
    </>
  );
};
