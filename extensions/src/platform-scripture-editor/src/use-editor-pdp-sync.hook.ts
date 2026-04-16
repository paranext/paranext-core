import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';
import { MutableRefObject, useEffect } from 'react';

/**
 * Synchronizes the editor's displayed content with data received from the PDP.
 *
 * Runs on every PDP update (even ones with unchanged content) so we know when a write we initiated
 * has completed and `currentlyWritingUsjToPdp` can be cleared.
 *
 * When the editor is unmounted (e.g. book doesn't exist or data is loading), `usjSentToPdp` is
 * reset so that the editor is properly re-initialized with content when it remounts. Without this
 * reset, returning to the same chapter after passing through a non-existent book would leave the
 * fresh editor empty because the stale `usjSentToPdp` value would match the incoming PDP data and
 * skip the `setEditorUsj` call.
 */
export function useEditorPdpSync({
  usjFromPdp,
  editorRef,
  usjSentToPdp,
  setEditorUsj,
  currentlyWritingUsjToPdp,
  saveUsjToPdpIfUpdated,
}: {
  usjFromPdp: Usj | undefined;
  editorRef: MutableRefObject<EditorRef | null>;
  usjSentToPdp: MutableRefObject<Usj | undefined>;
  /** Stable ref whose `.current` is the function to call to update the editor's displayed content */
  setEditorUsj: MutableRefObject<(usj: Usj) => void>;
  currentlyWritingUsjToPdp: MutableRefObject<boolean>;
  saveUsjToPdpIfUpdated: () => void;
}): void {
  useEffect(() => {
    if (!usjFromPdp) return;
    if (!editorRef.current) {
      // Editor unmounted — reset so it re-initializes when it remounts (see JSDoc)
      usjSentToPdp.current = undefined;
      return;
    }

    // The PDP informed us of updates, so writing to it must be complete (if we were writing)
    currentlyWritingUsjToPdp.current = false;

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (!areUsjContentsEqualExceptWhitespace(usjFromPdp, usjSentToPdp.current)) {
      usjSentToPdp.current = usjFromPdp;
      setEditorUsj.current(usjFromPdp);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else saveUsjToPdpIfUpdated();
  }, [
    // usjFromPdp and saveUsjToPdpIfUpdated are the only deps that actually change and trigger
    // re-runs. The refs below are stable (their identities never change), but are listed to
    // satisfy the exhaustive-deps lint rule.
    currentlyWritingUsjToPdp,
    editorRef,
    saveUsjToPdpIfUpdated,
    setEditorUsj,
    usjFromPdp,
    usjSentToPdp,
  ]);
}
