import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { logger } from '@papi/frontend';
import { getErrorMessage, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { MutableRefObject, useCallback } from 'react';
import {
  commitVersionHistorySnapshot,
  notifyEditorWarning,
  notifySyncEditBlocked,
} from '../editor-side-effects.utils';

const COMMIT_MESSAGE_KEY: LocalizeKey = '%versionHistoryCommit_beforeRemoveCharacterMarker%';
const REMOVE_FAILED_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_error_removeCharacterMarkerFailed%';

/**
 * Localize keys used by {@link useRemoveCharacterMarker}. Spread these into the editor web view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 *
 * Deliberately does NOT list the sync-blocked key this hook also shows (via
 * {@link notifySyncEditBlocked}). The web view loads `SYNC_EDIT_BLOCKED_KEY` for its own sync guards
 * regardless of whether the bar mounts, so listing it here too would name the same key in two
 * places — and a later dedup of either list could look safe while silently breaking the other.
 */
export const REMOVE_CHARACTER_MARKER_STRING_KEYS = Object.freeze([
  COMMIT_MESSAGE_KEY,
  REMOVE_FAILED_KEY,
] as const);

export type UseRemoveCharacterMarkerOptions = {
  /** The editor to remove markers from, and to read USJ from before and after. */
  editorRef: MutableRefObject<EditorRef | null>;
  /** The project to snapshot before removing. No project means no snapshot. */
  projectId?: string;
  /** `true` while an automatic Send/Receive has editing paused. Removal refuses and explains. */
  isSyncBlocked: boolean;
  /** Localized strings for the snapshot message and the three notifications. */
  localizedStrings: LanguageStrings;
};

/**
 * The character-marker removal action, with every side effect the destructive edit needs around it.
 *
 * Returns a callback taking the marker to remove, or nothing to remove every character marker the
 * selection covers. Both go through one path so the snapshot, the sync guard, and the reporting
 * cannot drift apart.
 *
 * Lives here rather than in `useCharacterMarkerState` so that hook stays a pure composition of
 * props into props: this one needs papi and a `projectId`, which would make the shared state hook
 * untestable without mocking papi. Every placement that reuses `CharacterMarkerBar` inherits it.
 */
export function useRemoveCharacterMarker({
  editorRef,
  projectId,
  isSyncBlocked,
  localizedStrings,
}: UseRemoveCharacterMarkerOptions): (marker?: string) => Promise<void> {
  return useCallback(
    async (marker?: string) => {
      // The trigger is already disabled while sync-blocked, so this guards the race where a sync
      // starts while the menu is open — the same belt-and-braces the comment path uses.
      if (isSyncBlocked) {
        await notifySyncEditBlocked(localizedStrings);
        return;
      }

      // Resolved BEFORE the snapshot, deliberately. The snapshot is a write to version history, so
      // taking one for an edit that provably cannot run would leave a "Before removing character
      // marker" restore point with nothing behind it. Unlike the insert paths this shares its helper
      // with, removal has a reachable no-op: the editor ref is null until the editor mounts, and
      // `editorRef.current?.` would swallow that silently.
      //
      // Nothing downstream cleans that up. `commitChanges` DOES skip an unchanged tree, but only
      // when `forceCommit` is false, and every pre-edit snapshot in the app passes `true` — it has
      // to, since the point is to capture state before the edit lands. So an unguarded no-op leaves
      // a real empty restore point rather than one the backend quietly drops. (In plain
      // Platform.Bible the C# handler is an unimplemented stub that throws, so this only surfaces in
      // Paratext 10 Studio, where the command is actually implemented.)
      const editor = editorRef.current;
      if (!editor) {
        logger.warn('Cannot remove a character marker: the editor is not mounted.');
        return;
      }

      await commitVersionHistorySnapshot(
        projectId,
        localizedStrings[COMMIT_MESSAGE_KEY] ?? COMMIT_MESSAGE_KEY,
        'removing a character marker',
      );

      try {
        editor.removeCharacterMarker(marker);
      } catch (e) {
        logger.warn(`Error removing character marker ${marker ?? '(all)'}: ${getErrorMessage(e)}`);
        await notifyEditorWarning(
          localizedStrings[REMOVE_FAILED_KEY] ?? REMOVE_FAILED_KEY,
          'character-marker removal',
        );
      }

      // The null-ref no-op is gated above, but one no-op path remains: the editor declines, without
      // throwing, when a removal cannot be confined to the selection — a range selection covering
      // only part of a NESTED marker whose OUTER marker is the target. That case still takes a
      // snapshot for an edit that does not happen, and still reports nothing to the user. It is
      // reachable only in theory today (`isMarkerRowInert` disables the row that would ask for it),
      // which is why it is documented rather than defended against: the defense needs an outcome
      // signal the editor does not expose — either a return value from `removeCharacterMarker`, or
      // the discrete-update-plus-inline-re-derive that `applyUpdate` does elsewhere in this feature.
      //
      // A before/after `getUsj()` comparison cannot stand in for either: `getUsj()` returns
      // `editedUsjRef.current`, a cached ref, and the
      // `editor.update()` inside `removeCharacterMarker` runs without `{ discrete: true }`, so
      // Lexical defers the commit and that ref is not refreshed synchronously — a before/after
      // comparison would read the same stale object and report "unchanged" for every successful
      // removal, not just the declined ones.
    },
    [editorRef, projectId, isSyncBlocked, localizedStrings],
  );
}

export default useRemoveCharacterMarker;
