import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { MutableRefObject } from 'react';

/** A chapter save that could not go out because another PDP write was in flight. */
export interface PendingPdpSave {
  /** `getChapterKey` of the chapter the save was bound to. */
  chapterKey: string;
  /** The document the save carried when it was held. */
  usj: Usj;
  /** The save bound to {@link chapterKey}; takes the document to write, or reads the editor. */
  resend: (usj?: Usj) => Promise<boolean>;
}

/**
 * Holds the one save that arrived while another PDP write was in flight, so it can be sent when
 * that write settles instead of being lost.
 *
 * Latest wins: holding a second save replaces the first, so any number of edits made during one
 * write collapse into a single follow-up save. Whoever resends reads the editor's current document
 * at that moment rather than sending what was held.
 */
export interface PendingSaveSlot<TPending> {
  /** Keeps `pending` as the save to send next, replacing any save already held. */
  hold: (pending: TPending) => void;
  /**
   * Hands back the held save and empties the slot — but only while no write is in flight. While one
   * is, the slot keeps what it holds, because whoever owns the guard drains it when it settles.
   */
  takeIfIdle: () => TPending | undefined;
}

/**
 * @param isWritingRef The in-flight flag of `withWriteInFlightGuard`; the slot never hands out a
 *   save while it is set.
 */
export function createPendingSaveSlot<TPending>(
  isWritingRef: MutableRefObject<boolean>,
): PendingSaveSlot<TPending> {
  let held: { pending: TPending } | undefined;
  return {
    hold: (pending) => {
      held = { pending };
    },
    takeIfIdle: () => {
      if (isWritingRef.current || !held) return undefined;
      const { pending } = held;
      held = undefined;
      return pending;
    },
  };
}
