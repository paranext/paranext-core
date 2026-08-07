import { EditorRef } from '@eten-tech-foundation/platform-editor';
import papi, { logger } from '@papi/frontend';
import { deepEqual, getErrorMessage, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { MutableRefObject, useCallback } from 'react';

const COMMIT_MESSAGE_KEY: LocalizeKey = '%versionHistoryCommit_beforeRemoveCharacterMarker%';
const REMOVE_FAILED_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_error_removeCharacterMarkerFailed%';
const NOT_NARROWABLE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_error_removeCharacterMarkerNotNarrowable%';
/** Reuses the shipped sync-blocked wording rather than adding a second phrasing of it. */
const SYNC_BLOCKED_KEY: LocalizeKey = '%webView_platformScriptureEditor_error_syncEditBlocked%';

/**
 * Localize keys used by {@link useRemoveCharacterMarker}. Spread these into the editor web view's
 * localized-strings list so the values are loaded and passed into `localizedStrings`.
 */
export const REMOVE_CHARACTER_MARKER_STRING_KEYS = Object.freeze([
  COMMIT_MESSAGE_KEY,
  REMOVE_FAILED_KEY,
  NOT_NARROWABLE_KEY,
  SYNC_BLOCKED_KEY,
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

/** Send a notification, self-catching so a fire-and-forget caller never sees a rejection. */
async function notify(message: string) {
  try {
    await papi.notifications.send({ message, severity: 'warning' });
  } catch (e) {
    logger.warn(`Failed to send a character-marker removal notification: ${getErrorMessage(e)}`);
  }
}

/**
 * Commit a version-history snapshot before a destructive edit — the user's undo of last resort.
 *
 * Best-effort by design, matching the insert-footnote and insert-cross-reference paths in
 * `platform-scripture-editor.web-view.tsx`: a version history that is unavailable (older host) or
 * failing must not block the edit the user asked for.
 */
async function commitSnapshot(projectId: string | undefined, message: string) {
  if (!projectId) return;
  try {
    await papi.commands.sendCommand(
      'paratextBibleSendReceive.commitChanges',
      projectId,
      message,
      true,
    );
  } catch (e) {
    const errMessage = getErrorMessage(e);
    // Requires the `commitChanges` command handler to throw `PlatformUnimplementedException`
    // having the `ERROR_UNIMPLEMENTED` prefix to successfully handle if this command is not
    // implemented in the application version
    if (errMessage.includes('ERROR_UNIMPLEMENTED')) logger.info(errMessage);
    else
      logger.warn(
        `Error committing changes to version history before removing a character marker: ${errMessage}`,
      );
  }
}

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
        await notify(localizedStrings[SYNC_BLOCKED_KEY] ?? SYNC_BLOCKED_KEY);
        return;
      }

      await commitSnapshot(projectId, localizedStrings[COMMIT_MESSAGE_KEY] ?? COMMIT_MESSAGE_KEY);

      const usjBefore = editorRef.current?.getUsj();
      try {
        editorRef.current?.removeCharacterMarker(marker);
      } catch (e) {
        logger.warn(`Error removing character marker ${marker ?? '(all)'}: ${getErrorMessage(e)}`);
        await notify(localizedStrings[REMOVE_FAILED_KEY] ?? REMOVE_FAILED_KEY);
        return;
      }

      // The editor declines, without throwing, when the removal could not be confined to the
      // selection — a range selection covering only part of a NESTED marker whose OUTER marker is
      // the target. Refusing is correct (removing would alter text the user never selected), but
      // silently doing nothing is not, so the unchanged document is what surfaces it. Lexical's
      // `editor.update()` is synchronous, so the USJ read here already reflects the removal.
      const usjAfter = editorRef.current?.getUsj();
      if (usjBefore && usjAfter && deepEqual(usjBefore, usjAfter))
        await notify(localizedStrings[NOT_NARROWABLE_KEY] ?? NOT_NARROWABLE_KEY);
    },
    [editorRef, projectId, isSyncBlocked, localizedStrings],
  );
}

export default useRemoveCharacterMarker;
