import { MutableRefObject } from 'react';

/**
 * Runs a single PDP write under a self-clearing in-flight guard, so the guard means EXACTLY "a
 * write is currently in flight" and nothing more.
 *
 * `isWritingRef` is held for the duration of the `write` promise and cleared when it SETTLES
 * (resolve or reject), in a `finally` — never left stuck, and never dependent on when a PDP echo
 * happens to arrive. If a write is already in flight the call is a no-op (`{ ran: false }`) and the
 * guard is left untouched so the in-flight writer keeps ownership.
 *
 * This replaces the previous arrangement where a successful write's guard was cleared only when the
 * next PDP update reached `useEditorPdpSync` — which meant any unrelated update could reset the
 * guard mid-write, and the write path itself never owned the flag's full lifecycle.
 */
export async function withWriteInFlightGuard<T>(
  isWritingRef: MutableRefObject<boolean>,
  write: () => Promise<T>,
): Promise<{ ran: true; result: T } | { ran: false }> {
  if (isWritingRef.current) return { ran: false };
  isWritingRef.current = true;
  try {
    return { ran: true, result: await write() };
  } finally {
    isWritingRef.current = false;
  }
}
