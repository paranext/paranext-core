import { useCallback, useEffect, type MutableRefObject, type RefObject } from 'react';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import type { EditorContentSnapshot } from '@/components/advanced/marker-palette-change-guard.util';
import { clearPaletteSessionIfCurrent } from '@/components/advanced/marker-palette-keydown.util';
import type { MarkerPaletteOpenSession } from '@/components/advanced/marker-palette-session.util';

/** What {@link useMarkerPaletteSessionWriters} needs from its consumer. */
export interface UseMarkerPaletteSessionWritersOptions<TItem extends { marker: string }> {
  /** The consumer's session ref. These writers are its ONLY writers. */
  sessionRef: MutableRefObject<MarkerPaletteOpenSession<TItem> | undefined>;
  /** The editor whose settle clocks are suspended for the life of a session. */
  editorRef: RefObject<EditorRef | null>;
  /** The change-guard baseline, cleared whenever the session changes. */
  baselineRef: MutableRefObject<EditorContentSnapshot | undefined>;
}

/**
 * The ONE pair of writers for a marker-palette session ref, and the only place marker settling is
 * suspended and resumed.
 *
 * Putting the suspension here rather than at each call site is what makes it exhaustive: every way
 * a session starts or ends goes through these two functions — commit, Escape, click-away, the
 * change-guard close, read-only, a chapter change, a composition, and an orphaned dismissal — so
 * none of them can forget. A missed resume is the failure the editor then has to heal itself from.
 *
 * SUSPEND HAPPENS SYNCHRONOUSLY, as the session is set, which is inside the trigger's keydown and
 * therefore BEFORE focus moves to the palette. That ordering is the whole point:
 * `EditorRef.setMarkerSettleSuspended` holds the blur settle, and `BLUR_COMMAND` fires on the focus
 * move itself — a suspend issued after it cannot undo a settle that has already run.
 *
 * RESUME HAPPENS ONLY WHEN NO SESSION IS LEFT. The `\` commit-and-reopen hand-off sets the
 * replacement session before the old one clears, so settling is never resumed in between — the
 * document would otherwise reformat under a palette that is still open, in the one flow where a
 * palette is replaced rather than closed.
 *
 * Also resumes on unmount, so an editor torn down mid-session does not leave its own clocks
 * suspended for whatever is rendered next.
 */
export function useMarkerPaletteSessionWriters<TItem extends { marker: string }>({
  sessionRef,
  editorRef,
  baselineRef,
}: UseMarkerPaletteSessionWritersOptions<TItem>): {
  setSession: (session: MarkerPaletteOpenSession<TItem> | undefined) => void;
  clearSessionIfCurrent: (token: number) => void;
} {
  const setSession = useCallback(
    (session: MarkerPaletteOpenSession<TItem> | undefined) => {
      sessionRef.current = session;
      // A baseline outlives nothing: it describes the editor as THIS session's palette took focus,
      // so carrying it into the next one would compare against a document two edits old and refuse
      // a commit the user did choose.
      baselineRef.current = undefined;
      editorRef.current?.setMarkerSettleSuspended(!!session);
    },
    [sessionRef, baselineRef, editorRef],
  );

  const clearSessionIfCurrent = useCallback(
    (token: number) => {
      clearPaletteSessionIfCurrent(sessionRef, token);
      if (sessionRef.current) return;
      baselineRef.current = undefined;
      editorRef.current?.setMarkerSettleSuspended(false);
    },
    [sessionRef, baselineRef, editorRef],
  );

  useEffect(
    () => () => {
      editorRef.current?.setMarkerSettleSuspended(false);
    },
    [editorRef],
  );

  return { setSession, clearSessionIfCurrent };
}
