import { MarkerObject, MarkerContent } from '@eten-tech-foundation/scripture-utilities';

/** Gets the default caller sequence to use to generate callers for textual notes. */
export function getDefaultCallerSequence(): string[] {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
}

/**
 * Gets a caller to be displayed for a textual note. This is primarily useful as a helper function
 * in {@link getFormatCallerFunction} , but it might be useful in stories, UI preview code, etc.
 *
 * @param callers Array of caller symbols, or `undefined` to use the default sequence, which is the
 *   lowercase Roman-script letters as sequenced in the English alphabet.
 * @param n Zero-based index into the caller list.
 */
export function getNthCaller(n: number, callers?: string[]): string {
  const callerList = callers && callers.length > 0 ? callers : getDefaultCallerSequence();
  return callerList[n % callerList.length];
}

/**
 * Gets a function that provides a (stable) caller based on a given sequence of textual notes.
 *
 * @param footnotes Sequence of footnotes, cross-references, and/or end-notes.
 * @param callers Array of caller symbols, or `undefined` to use the default sequence, which is the
 *   lowercase Roman-script letters as sequenced in the English alphabet.
 */
export function getFormatCallerFunction(footnotes: MarkerObject[], callers: string[] | undefined) {
  const callerList = callers && callers.length > 0 ? callers : getDefaultCallerSequence();
  // Precompute a stable sequence for '+' callers
  const plusSequenceMap = (() => {
    const map = new Map<number, string>();
    let autoCallerCounter = 0;
    footnotes.forEach((fn, idx) => {
      if (fn.caller === '+') {
        map.set(idx, getNthCaller(autoCallerCounter, callerList));
        autoCallerCounter += 1;
      }
    });
    return map;
  })();

  return (caller: string | undefined, index: number): string | undefined => {
    if (caller === '+') {
      const formattedCaller = plusSequenceMap.get(index);
      if (!formattedCaller) {
        console.warn(`Caller index ${index} out of range for '+' callers`);
        return '?'; // Out of range'
      }
      return formattedCaller;
    }
    if (caller === '-') return undefined;
    return caller;
  };
}

/**
 * Extract footnotes from an array of `MarkerContent` objects.
 *
 * @param contents - An array of `MarkerContent` objects
 * @param contextSid - The sid from the containing context, if any
 * @returns An array of MarkerObjects representing all textual notes found in the contents.
 */
export function extractFootnotesFromUsjContent(
  contents?: MarkerContent[],
  contextSid?: string, // pass the current sid along
): MarkerObject[] {
  console.debug('extractFootnotesFromUsjContent: sid propagation logic active');

  const footnotes: MarkerObject[] = [];
  if (!contents?.length) return footnotes;

  function traverse(item: MarkerContent, lastSid?: string): string | undefined {
    if (typeof item === 'string') return lastSid; // ignore plain text, propagate lastSid

    // Update sid if this node has one
    const currentSid = item.sid ?? lastSid;

    if (item.type === 'note') {
      footnotes.push({ ...item, sid: currentSid });
    }

    if (Array.isArray(item.content) && item.content.length > 0) {
      // Reduce through children, carrying forward the last seen sid
      return item.content.reduce((sidAcc, child) => traverse(child, sidAcc), currentSid);
    }

    return currentSid;
  }

  contents.reduce((sidAcc, item) => traverse(item, sidAcc), contextSid);

  return footnotes;
}
