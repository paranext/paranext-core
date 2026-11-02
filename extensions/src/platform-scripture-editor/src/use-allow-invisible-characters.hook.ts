import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useEffect, useMemo, useState } from 'react';

/** What is known of a project's `platformScripture.allowInvisibleCharacters`. */
export interface AllowInvisibleCharactersSetting {
  /** The setting's value, or `undefined` while it is still loading or when it could not be read. */
  value: boolean | undefined;
  /** Whether the first read of the setting has not come back yet. */
  isLoading: boolean;
  /** Whether reading the setting failed. */
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
 * caller decides what to hold back.
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
  useEffect(() => {
    if (!isPlatformError(valuePossiblyError)) return;
    logger.warn(
      `Error getting whether the project allows invisible characters: ${getErrorMessage(valuePossiblyError)}`,
    );
  }, [valuePossiblyError]);
  return useMemo(() => {
    if (isPlatformError(valuePossiblyError))
      return { value: undefined, isLoading: false, isUnreadable: true };
    if (isLoading) return { value: undefined, isLoading: true, isUnreadable: false };
    return { value: valuePossiblyError, isLoading: false, isUnreadable: false };
  }, [valuePossiblyError, isLoading]);
}

/**
 * The chapter to give the editor: none until `allowInvisibleCharacters` has been read, because the
 * editor turns what it displays back into USJ by that setting, so content loaded under a guess
 * would be respelled the moment the real value arrives. A setting that could not be read still lets
 * the chapter through — the caller makes the editor read-only instead, so the text can be read but
 * nothing is saved under a guess.
 *
 * @param chapter The chapter's USJ from the project
 * @param allowInvisibleCharacters What is known of the project's setting
 * @returns `chapter`, or `undefined` while the setting is loading
 */
export function getChapterForEditor<T>(
  chapter: T,
  allowInvisibleCharacters: AllowInvisibleCharactersSetting,
): T | undefined {
  return allowInvisibleCharacters.isLoading ? undefined : chapter;
}

/**
 * Has the editor load the project's text again once a setting that could not be read is read.
 *
 * While the setting is unreadable the editor shows the chapter read-only under a stand-in value.
 * When the real value arrives the editor rebuilds from its own export, which it made under the
 * stand-in and so may have respelled: with the setting on, a literal `~` exported under `false`
 * comes back as a no-break space. So the project's text is loaded again, and the editor stays
 * read-only until it has been. A setting still loading needs none of this: the chapter is held back
 * from the editor until it is read, and the editor that mounts then loads the project's text.
 *
 * @param allowInvisibleCharacters What is known of the project's setting
 * @param reload Loads the project's text into the editor again. Called after the editor has been
 *   given the new value, since the editor's effects run before its host's.
 * @returns Whether the editor must stay read-only until the setting is read and the text reloaded
 */
export function useReloadOnceAllowInvisibleCharactersIsRead(
  allowInvisibleCharacters: AllowInvisibleCharactersSetting,
  reload: () => void,
): boolean {
  const { value, isLoading, isUnreadable } = allowInvisibleCharacters;
  const [hasShownTextUnderStandIn, setHasShownTextUnderStandIn] = useState(false);
  useEffect(() => {
    if (isUnreadable) {
      setHasShownTextUnderStandIn(true);
      return;
    }
    if (!hasShownTextUnderStandIn) return;
    if (isLoading) {
      setHasShownTextUnderStandIn(false);
      return;
    }
    if (value === undefined) return;
    reload();
    setHasShownTextUnderStandIn(false);
  }, [value, isLoading, isUnreadable, hasShownTextUnderStandIn, reload]);
  return isUnreadable || hasShownTextUnderStandIn;
}
