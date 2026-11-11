import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { MutableRefObject } from 'react';
import {
  editorHoldsUnsavedChanges,
  withoutZeroWidthNoBreakSpaces,
} from './debounced-pdp-save.util';

/** A chapter save that could not go out because another PDP write was in flight. */
export interface PendingPdpSave {
  /** `getChapterKey` of the chapter the save was bound to. */
  chapterKey: string;
  /** The document the save carried when it was held. */
  usj: Usj;
  /**
   * Writes a document through the PDP save bound to {@link chapterKey} as it was when this save was
   * held, so it still reaches that chapter after the selection has moved on and without consulting
   * the editor. Resolves `false` when the save was held again or did not run.
   */
  write: (usj: Usj) => Promise<boolean>;
}

/**
 * Holds the saves that arrived while another PDP write was in flight, so each can be sent when that
 * write settles instead of being lost.
 *
 * One save per chapter, latest wins: holding a second save for the same chapter replaces the first,
 * so any number of edits made during one write collapse into a single follow-up save, while a save
 * held for another chapter is kept alongside it.
 *
 * A save held behind a write that never settles waits until that write settles or a later save
 * finishes: the in-flight guard's timed release does not drain the slot.
 */
export interface PendingSaveSlot<TPending extends { chapterKey: string }> {
  /** Keeps `pending` as the save to send next for its chapter, replacing any held for it. */
  hold: (pending: TPending) => void;
  /**
   * Hands back one held save and removes it — but only while no write is in flight. While one is,
   * the slot keeps everything it holds, because whoever owns the guard drains it when it settles.
   */
  takeNextIfIdle: () => TPending | undefined;
}

/**
 * @param isWritingRef The in-flight flag of `withWriteInFlightGuard`; the slot never hands out a
 *   save while it is set.
 */
export function createPendingSaveSlot<TPending extends { chapterKey: string }>(
  isWritingRef: MutableRefObject<boolean>,
): PendingSaveSlot<TPending> {
  const held = new Map<string, TPending>();
  return {
    hold: (pending) => {
      // Re-inserted so the chapter that was held longest is sent first.
      held.delete(pending.chapterKey);
      held.set(pending.chapterKey, pending);
    },
    takeNextIfIdle: () => {
      if (isWritingRef.current) return undefined;
      const next = held.entries().next();
      if (next.done) return undefined;
      const [chapterKey, pending] = next.value;
      held.delete(chapterKey);
      return pending;
    },
  };
}

/** What {@link sendPendingSaves} reads from the web view, so the drain runs the same code anywhere. */
export interface PendingSaveDrainDeps {
  slot: PendingSaveSlot<PendingPdpSave>;
  /** The editor's current settled document, or `undefined` when the editor is gone. */
  getEditorUsj: () => Usj | undefined;
  /** The document last sent to the PDP, or `undefined` when none has been. */
  getLastSentUsj: () => Usj | undefined;
  /** `getChapterKey` of the chapter selected now. */
  getCurrentChapterKey: () => string;
  /** The newest save for the selected chapter; it reads the PDP state the editor now sees. */
  getLatestSave: () => ((usj?: Usj) => Promise<boolean>) | undefined;
  logger: { debug: (message: string) => void; error: (message: string) => void };
}

/**
 * Sends the saves held while a write was in flight, once the guard is free. Never rejects.
 *
 * - Held for the chapter selected now, editor present: the editor's document as it is now, through
 *   the newest save, and only when it differs from what was last sent — edits made during the write
 *   go out as one save, and an unchanged editor sends nothing.
 * - Held for the chapter selected now, editor gone (unmount, page teardown): the held document,
 *   through the save bound when it was held.
 * - Held for another chapter: the held document through its bound save; the editor now shows another
 *   chapter and is not consulted.
 *
 * Each send goes back through the guard. One that finds it taken again is held afresh and drained
 * by the writer that took it, so a chain of follow-ups ends as soon as nothing newer is held.
 */
export async function sendPendingSaves(deps: PendingSaveDrainDeps): Promise<void> {
  const { slot, getEditorUsj, getLastSentUsj, getCurrentChapterKey, getLatestSave, logger } = deps;
  const pending = slot.takeNextIfIdle();
  if (!pending) return;

  try {
    if (pending.chapterKey !== getCurrentChapterKey()) {
      logger.debug(`Sending the held save for ${pending.chapterKey}, no longer the chapter shown`);
      await pending.write(pending.usj);
    } else {
      const editorUsj = getEditorUsj();
      const lastSent = getLastSentUsj();
      if (!editorUsj) {
        logger.debug(`Sending the held save for ${pending.chapterKey}: the editor is gone`);
        await pending.write(pending.usj);
      } else if (
        !lastSent ||
        editorHoldsUnsavedChanges(editorUsj, withoutZeroWidthNoBreakSpaces(lastSent))
      ) {
        logger.debug(`Sending the editor's current document for ${pending.chapterKey}`);
        await (getLatestSave() ?? pending.write)(editorUsj);
      }
    }
  } catch (error) {
    logger.error(
      `Error sending the save held back by a write in flight: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  // One send at a time, each through the guard; whatever else is held goes next.
  await sendPendingSaves(deps);
}

/**
 * Records `usj` as the document last sent to the PDP — the baseline the editor's echo comparison
 * and {@link sendPendingSaves} measure the editor against — but only when the write is for the
 * chapter the editor shows. A write for a chapter since left (a held save sent through its bound
 * save) says nothing about the chapter now on screen, and recording it would make that chapter's
 * own echo and its next save compare against another chapter's document.
 *
 * @returns Whether the baseline was recorded.
 */
export function recordSentUsjForShownChapter(
  sentRef: MutableRefObject<Usj | undefined>,
  usj: Usj,
  saveChapterKey: string,
  shownChapterKey: string,
): boolean {
  if (saveChapterKey !== shownChapterKey) return false;
  sentRef.current = usj;
  return true;
}

/**
 * After a write the backend refused, puts the PDP's last document back into the editor and makes it
 * the sent baseline — but only when the write was for the chapter the editor shows. A held save for
 * a chapter since left can be refused after navigation, and its snapshot would replace the chapter
 * now on screen.
 *
 * @returns Whether the editor was reverted.
 */
export function revertEditorAfterRefusedSave({
  saveChapterKey,
  shownChapterKey,
  usjFromPdp,
  hasEditor,
  sentRef,
  setEditorUsj,
}: {
  saveChapterKey: string;
  shownChapterKey: string;
  usjFromPdp: Usj | undefined;
  hasEditor: boolean;
  sentRef: MutableRefObject<Usj | undefined>;
  setEditorUsj: (usj: Usj) => void;
}): boolean {
  if (!usjFromPdp || !hasEditor || saveChapterKey !== shownChapterKey) return false;
  sentRef.current = usjFromPdp;
  setEditorUsj(usjFromPdp);
  return true;
}
