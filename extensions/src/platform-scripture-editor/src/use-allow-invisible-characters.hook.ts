import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useEffect, useMemo, useRef } from 'react';

/** What is known of a project's `platformScripture.allowInvisibleCharacters`. */
export interface AllowInvisibleCharactersSetting {
  /**
   * The setting's value, or `undefined` while it is still loading or when it could not be read and
   * no value has been read for this project.
   */
  value: boolean | undefined;
  /** Whether the first read of the setting has not come back yet. */
  isLoading: boolean;
  /**
   * Whether reading the setting failed before any value was read for this project. A failure after
   * a value was read keeps that value and is not reported here.
   */
  isUnreadable: boolean;
}

/**
 * Reads the project's `platformScripture.allowInvisibleCharacters` (whether its USFM keeps `~` and
 * a no-break space distinct) without ever guessing it.
 *
 * Unlike the web view's other setting reads, neither a pending read nor a read error stands in a
 * default here: the value decides how the editor spells what it saves, so a wrong guess turns a
 * literal `~` into a no-break space (or the reverse) on the next save. A pending read reports
 * `isLoading` and an error reports `isUnreadable` (and is logged), both with no `value`, and the
 * caller decides what to hold back. A read error after a value was read for the same project keeps
 * that value: a failed read does not mean the setting changed, and the editor already built from
 * it. The remembered value is dropped when `projectId` changes.
 *
 * @param projectId The project to read from
 * @returns What is known of the setting
 */
export function useAllowInvisibleCharacters(
  projectId: string | undefined,
): AllowInvisibleCharactersSetting {
  const [valuePossiblyError, , , isLoading] = useProjectSetting(
    projectId,
    'platformScripture.allowInvisibleCharacters',
    false,
  );
  const lastKnown = useRef<{ projectId: string | undefined; value: boolean } | undefined>(
    undefined,
  );
  useEffect(() => {
    if (!isPlatformError(valuePossiblyError)) return;
    logger.warn(
      `Error getting whether the project allows invisible characters: ${getErrorMessage(valuePossiblyError)}`,
    );
  }, [valuePossiblyError]);
  return useMemo(() => {
    if (lastKnown.current && lastKnown.current.projectId !== projectId)
      lastKnown.current = undefined;
    if (isPlatformError(valuePossiblyError)) {
      if (lastKnown.current)
        return { value: lastKnown.current.value, isLoading: false, isUnreadable: false };
      return { value: undefined, isLoading: false, isUnreadable: true };
    }
    if (isLoading) return { value: undefined, isLoading: true, isUnreadable: false };
    lastKnown.current = { projectId, value: valuePossiblyError };
    return { value: valuePossiblyError, isLoading: false, isUnreadable: false };
  }, [valuePossiblyError, isLoading, projectId]);
}

/**
 * The chapter to give the editor: none until `allowInvisibleCharacters` has been read, because the
 * editor turns what it displays back into USJ by that setting, so content loaded under a guess
 * would be respelled the moment the real value arrives. A setting that cannot be read holds the
 * chapter back too, rather than showing it under a stand-in: the editor that mounts once the value
 * arrives loads the project's text under it, exactly as after a slow first read.
 *
 * @param chapter The chapter's USJ from the project
 * @param allowInvisibleCharacters What is known of the project's setting
 * @returns `chapter`, or `undefined` while the setting is loading or unreadable
 */
export function getChapterForEditor<T>(
  chapter: T,
  allowInvisibleCharacters: AllowInvisibleCharactersSetting,
): T | undefined {
  return allowInvisibleCharacters.isLoading || allowInvisibleCharacters.isUnreadable
    ? undefined
    : chapter;
}
