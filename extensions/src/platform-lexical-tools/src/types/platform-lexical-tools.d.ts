declare module 'platform-lexical-tools' {
  // Add extension types exposed on the papi for other extensions to use here
  // More instructions can be found in the README
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /** Opens the dictionary web view */
    'platformLexicalTools.openDictionary': () => Promise<string | undefined>;
  }
}
