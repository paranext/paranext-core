import { logger } from '@papi/frontend';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getChapterKey } from './platform-scripture-editor.web-view.utils';

/** A chapter whose latest edits were lost, as the warning and the user's notification name it. */
export type EditsLostInChapter = {
  /** The chapter's key from `getChapterKey`, for the log */
  chapterKey: string;
  /** Localized name of the chapter's book, for the notification */
  book: string;
  chapterNum: number;
};

/**
 * What holds back edits the editor has not sent: a save of the chapter still in flight, or the user
 * having moved on to another chapter, so a save of them is refused while the editor goes on showing
 * this one.
 */
export type EditsHeldBy = 'runningSave' | 'navigation';

/** What took the edits away. */
export type LostEditsCause = 'leftChapter' | 'editorClosed' | 'replacedByUpdate';

/**
 * Tells the user that their latest edits in a chapter were not saved.
 *
 * @param replacedByUpdate Whether a change made outside the editor replaced them, which the notice
 *   then names as the reason
 * @param routeToThisEditor Whether to show it in the window holding this editor. False when the
 *   editor is closing, since a notice routed to it might never be shown.
 */
export type NotifyLostEdits = (
  book: string,
  chapterNum: number,
  replacedByUpdate: boolean,
  routeToThisEditor: boolean,
) => void;

/** The editor's record of edits it holds without having sent them, and the report of their loss. */
export type LostEditsReport = {
  /**
   * Names a chapter for reporting edits lost in it, by the localized name of its book. The book id
   * stands in for a book this editor has not shown.
   */
  describeChapter: (chapter: {
    book: string;
    chapterNum: number;
    versificationStr: string;
  }) => EditsLostInChapter;
  /**
   * Records that the editor holds edits in `chapter` that it has not sent, and that only a later
   * save can send. Replaces any edits recorded before: the editor holds one chapter at a time.
   */
  recordHeld: (chapter: EditsLostInChapter, heldBy: EditsHeldBy) => void;
  /**
   * Forgets the held edits recorded for `chapterKey`, if any. Call wherever the editor turns out to
   * hold nothing newer than what the backend has or is being sent: a write of the chapter starts, a
   * save finds nothing to send, or the edits are taken back.
   */
  forgetHeld: (chapterKey: string) => void;
  /**
   * Warns and notifies the user, once, that their latest edits in a chapter were lost: the held
   * edits if any are recorded, otherwise `discardedIn`. Call it at the moments edits the editor
   * holds are lost — when an incoming chapter replaces the editor, and when the editor closes —
   * straight after flushing the pending save, so a flush held back is counted. Not on a chapter
   * switch: the editor goes on showing the chapter it is leaving until the next one arrives, and if
   * the user comes back to it first, its held edits are still sent.
   *
   * TODO(PT-5043): send the held edits instead of losing them when the editor leaves the chapter or
   * closes.
   *
   * @param cause What took the edits away
   * @param discardedIn The chapter whose unsent edits were just thrown away, if any
   */
  report: (cause: LostEditsCause, discardedIn?: EditsLostInChapter) => void;
  /**
   * Marks the editor as closing (`pagehide`), so no loss reported from then on is routed to it,
   * whatever reports it: a save the flush on closing sends can be refused and report too.
   */
  markClosing: () => void;
};

/**
 * Keeps the editor's record of edits it holds without having sent them, and reports them to the
 * user when they are lost. Every function it returns keeps a stable identity, so an effect cleanup
 * that reports never runs because the report changed.
 *
 * @param bookId The book on screen
 * @param localizedBookName The localized name of that book, remembered so a chapter of it can be
 *   named after the editor has moved on
 * @param notify Sends the user's notification. Read when a loss is reported, so it may change
 *   identity freely.
 */
export function useLostEditsReport(
  bookId: string,
  localizedBookName: string,
  notify: NotifyLostEdits,
): LostEditsReport {
  const notifyRef = useRef(notify);
  useEffect(() => {
    notifyRef.current = notify;
  }, [notify]);

  // Localized names of the books this editor has shown, for naming a chapter it has since moved off
  // (the editor keeps showing the chapter it is leaving until the next one loads).
  const localizedBookNames = useRef(new Map<string, string>());
  useEffect(() => {
    localizedBookNames.current.set(bookId, localizedBookName);
  }, [bookId, localizedBookName]);

  const held = useRef<(EditsLostInChapter & { heldBy: EditsHeldBy }) | undefined>(undefined);
  const isClosing = useRef(false);

  const describeChapter = useCallback<LostEditsReport['describeChapter']>(
    (chapter) => ({
      chapterKey: getChapterKey(chapter.book, chapter.chapterNum, chapter.versificationStr),
      book: localizedBookNames.current.get(chapter.book) ?? chapter.book,
      chapterNum: chapter.chapterNum,
    }),
    [],
  );

  const recordHeld = useCallback<LostEditsReport['recordHeld']>((chapter, heldBy) => {
    held.current = { ...chapter, heldBy };
  }, []);

  const forgetHeld = useCallback<LostEditsReport['forgetHeld']>((chapterKey) => {
    if (held.current?.chapterKey === chapterKey) held.current = undefined;
  }, []);

  const report = useCallback<LostEditsReport['report']>((cause, discardedIn) => {
    const heldEdits = held.current;
    const lost = heldEdits ?? discardedIn;
    if (!lost) return;
    held.current = undefined;
    const what = {
      leftChapter: `Left ${lost.chapterKey}`,
      editorClosed: `The editor closed on ${lost.chapterKey}`,
      replacedByUpdate: `An incoming update replaced ${lost.chapterKey}`,
    }[cause];
    const why = {
      runningSave: 'a save of it was still in progress',
      navigation: 'their save was refused because the user had moved on to another chapter',
      none: 'they were never sent',
    }[heldEdits?.heldBy ?? 'none'];
    logger.warn(`${what} before its latest edits were saved (${why}); those edits are lost`);
    // Held edits get the plain notice even when an update replaced them: that update can be the
    // running write's own, reformatted by the backend, so "changed outside" might not be true.
    notifyRef.current(
      lost.book,
      lost.chapterNum,
      cause === 'replacedByUpdate' && !heldEdits,
      cause !== 'editorClosed' && !isClosing.current,
    );
  }, []);

  const markClosing = useCallback(() => {
    isClosing.current = true;
  }, []);

  return useMemo(
    () => ({ describeChapter, recordHeld, forgetHeld, report, markClosing }),
    [describeChapter, recordHeld, forgetHeld, report, markClosing],
  );
}
