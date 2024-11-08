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
import { useProjectData, useProjectSetting, useSetting } from '@papi/frontend/react';
import { deepClone, ScriptureReference, UsjReaderWriter } from 'platform-bible-utils';
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

  const [commentsEnabled] = useSetting('platform.commentsEnabled', false);

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

  const [usjFromPdp, saveUsjToPdpRaw] = useProjectData(
    'platformScripture.USJ_Chapter',
    projectId,
  ).ChapterUSJ(
    useMemo(() => new VerseRef(scrRef.bookNum, scrRef.chapterNum, scrRef.verseNum), [scrRef]),
    usjDocumentDefault,
  );

  const usjSentToPdp = useRef(usjFromPdp);
  const currentlyWritingUsjToPdp = useRef(false);
  const saveUsjToPdp = useCallback(
    (newUsj: Usj) => {
      if (!saveUsjToPdpRaw) return;

      // Don't start writing to the PDP again if we're in the middle of writing now
      if (currentlyWritingUsjToPdp.current) return;

      // Remove the milestones that we inserted before writing back to the PDP
      const clonedUsj = deepClone(newUsj);
      const usjRW = new UsjReaderWriter(clonedUsj);
      usjRW.removeContentNodes((node: MarkerContent) => {
        if (typeof node === 'string') return false;
        if (node.type !== 'ms') return false;
        return node.marker === MILESTONE_START || node.marker === MILESTONE_END;
      });

      // Indicate we're in the process of writing to the PDP so we don't trigger multiple writes
      currentlyWritingUsjToPdp.current = true;
      usjSentToPdp.current = clonedUsj;
      saveUsjToPdpRaw(clonedUsj);
    },
    [saveUsjToPdpRaw],
  );

  const [legacyCommentsFromPdp, saveLegacyCommentsToPdp] = useProjectData(
    'legacyCommentManager.comments',
    projectId,
  ).Comments(
    useMemo(() => {
      return { bookId: Canon.bookNumberToId(scrRef.bookNum), chapterNum: scrRef.chapterNum };
    }, [scrRef]),
    [],
  );

  /**
   * Write the latest comments back to the PDP. We need `usjWithAnchors` to know where (e.g., verse
   * refs) the latest comments are in scripture text.
   */
  const saveCommentsToPdp = useCallback(
    (
      newComments: Comments | undefined,
      usjWithAnchors: Usj | undefined = editorRef.current?.getUsj(),
    ) => {
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
      if (!saveLegacyCommentsToPdp) {
        logger.warn('Updating comments without a way to save the comments to a PDP');
        return;
      }

      // Record all the IDs of previously known comments
      const legacyCommentIds = new Set<string>();
      legacyCommentsFromPdp.forEach((existingComment) => legacyCommentIds.add(existingComment.id));

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
      const newCommentArray = [...legacyCommentsFromPdp, ...legacyCommentsToAdd];
      saveLegacyCommentsToPdp(newCommentArray);
    },
    [legacyCommentsFromPdp, scrRef, saveLegacyCommentsToPdp],
  );

  /**
   * Modify `newUsj` to include anchors that the editor uses to highlight text where a comment
   * should be. The source of the comments is the legacy comment PDP.
   */
  const insertCommentAnchors = useCallback(
    (newUsj: Usj) => {
      try {
        insertCommentAnchorsIntoUsj(newUsj, legacyCommentsFromPdp);
        // Getting more information about the error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        logger.debug(`Error inserting anchors into USJ: ${error}, stack = ${error.stack}"`);
      }
    },
    [legacyCommentsFromPdp],
  );

  const onUsjAndCommentsChange = useCallback(
    (newUsjFromEditor: Usj, newCommentsFromEditor: Comments | undefined) => {
      saveCommentsToPdp(newCommentsFromEditor, newUsjFromEditor);
      saveUsjToPdp(newUsjFromEditor);
    },
    [saveUsjToPdp, saveCommentsToPdp],
  );

  // This should only be used in the following `useEffect`
  const mostRecentlySetLegacyComments = useRef(legacyCommentsFromPdp);

  // Update the editor if a change comes in from the PDP
  useEffect(() => {
    if (!usjFromPdp || !legacyCommentsFromPdp || !editorRef.current) return;

    // The PDP informed us of updates, so writing to it must be complete (if we were writing)
    currentlyWritingUsjToPdp.current = false;

    // The editor's USJ already has anchors, so insert them into the PDP's USJ before comparing
    const usjFromPdpWithAnchors = deepClone(usjFromPdp);
    insertCommentAnchors(usjFromPdpWithAnchors);

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (!deepEqualAcrossIframes(usjFromPdpWithAnchors, usjSentToPdp.current)) {
      usjSentToPdp.current = usjFromPdpWithAnchors;
      editorRef.current.setUsj(usjFromPdpWithAnchors);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else {
      const editorUsj = editorRef.current.getUsj();
      if (editorUsj && !deepEqualAcrossIframes(usjFromPdpWithAnchors, editorUsj))
        saveUsjToPdp(editorUsj);
    }

    // Make sure the editor has the latest comment data from the PDP
    if (
      'setComments' in editorRef.current &&
      !deepEqualAcrossIframes(legacyCommentsFromPdp, mostRecentlySetLegacyComments.current)
    ) {
      const threads = convertLegacyCommentsToEditorThreads(legacyCommentsFromPdp);
      mostRecentlySetLegacyComments.current = legacyCommentsFromPdp;
      // The editor's USJ needs to have anchors for these comments or the editor will error
      editorRef.current.setComments?.(threads);
    }
  }, [insertCommentAnchors, legacyCommentsFromPdp, saveUsjToPdp, usjFromPdp]);

  // On loading the first time, scroll the selected verse into view
  useEffect(() => {
    if (usjFromPdp && !hasFirstRetrievedScripture.current) {
      hasFirstRetrievedScripture.current = true;
      // Wait before scrolling to make sure there is time for the editor to load
      // TODO: hook into the editor and detect when it has loaded somehow
      setTimeout(() => scrollToScrRef(scrRef), EDITOR_LOAD_DELAY_TIME);
    }
  }, [usjFromPdp, scrRef]);

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

  if (isReadOnly) {
    return (
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
    );
  }
  if (commentsEnabled) {
    return (
      <>
        {/* Workaround to pull in platform-bible-react styles into the editor */}
        <Button className="tw-hidden" />
        <Marginal
          ref={editorRef}
          scrRef={scrRef}
          onScrRefChange={setScrRef}
          onUsjChange={onUsjAndCommentsChange}
          onCommentChange={saveCommentsToPdp}
          options={options}
          logger={logger}
        />
      </>
    );
  }
  return (
    <>
      {/* Workaround to pull in platform-bible-react styles into the editor */}
      <Button className="tw-hidden" />
      <Editorial
        ref={editorRef}
        scrRef={scrRef}
        onScrRefChange={setScrRef}
        onUsjChange={saveUsjToPdp}
        options={options}
        logger={logger}
      />
    </>
  );
};
