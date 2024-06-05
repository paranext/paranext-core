declare module 'platform-scripture' {
  // Add extension types exposed on the papi for other extensions to use here
  // More instructions can be found in the README
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Toggle the `platformScripture.includeMyParatext9Projects` setting on or off
     *
     * @param shouldIncludeMyParatext9Projects Provide this parameter to set it to `true` or `false`
     *   instead of toggling
     * @returns New value of the setting
     */
    'platformScripture.toggleIncludeMyParatext9Projects': (
      shouldIncludeMyParatext9Projects?: boolean,
    ) => Promise<boolean>;

    'platformScripture.openCharactersInventory': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;
  }

  export interface SettingTypes {
    /**
     * Whether to look in the Paratext 9 project storage folder for Paratext projects to load
     * (Windows only).
     *
     * Located at "C:\My Paratext 9 Projects"
     */
    'platformScripture.includeMyParatext9Projects': boolean;
  }
  export interface ProjectSettingTypes {
    /**
     * Which versification scheme this Scripture project uses
     *
     * WARNING: This setting is an example and needs to be updated to support proper versification
     * specification! For the moment, it simply corresponds to
     * [`ScrVersType`](https://github.com/sillsdev/libpalaso/blob/master/SIL.Scripture/Versification.cs#L1340),
     * but this is not correct and full design.
     */
    'platformScripture.versification': number;
    /**
     * Which books are present in this Scripture project. Represented as a string with 0 or 1 for
     * each possible book by [standardized book
     * code](https://github.com/sillsdev/libpalaso/blob/master/SIL.Scripture/Canon.cs#L226) (123
     * characters long)
     *
     * @example
     * '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000'
     */
    'platformScripture.booksPresent': string;

    'platformScripture.validCharacters': string;

    'platformScripture.invalidCharacters': string;
  }
}
