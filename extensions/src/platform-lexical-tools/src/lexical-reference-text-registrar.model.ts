// This class moved out of `platform-lexical-tools.d.ts` to avoid exposing this early API on the PAPI
// It should probably be edited and moved back when we do https://paratextstudio.atlassian.net/browse/PT-3217

/** Object that receives and handles lexical reference texts */
export type LexicalReferenceTextRegistrar = {
  /**
   * Registers a lexical reference text to be used with lexical tools.
   *
   * Note: you do not have to run `unregisterLexicalReferenceText` unless you want to remove the
   * data from the lexical service. The lexical service will automatically unregister everything on
   * shutdown.
   *
   * Note: the guid returned is not cryptographically secure. It may be changed to be secure in the
   * future.
   *
   * @param extensionFileUri - The file URL of the SQLite database. This can only be an extension
   *   asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`. The SQLite
   *   database must follow [the Lexical Reference Text SQL
   *   schema](https://github.com/paranext/marble-tools/blob/main/sql/schema.sql)
   * @returns A guid that can be used to unregister this lexical reference text
   */
  registerLexicalReferenceText(extensionFileUri: string): Promise<string>;
  /**
   * Unregisters a lexical reference text that was previously registered with
   * `registerLexicalReferenceText`, removing its data from the lexical service.
   *
   * @param guid - The guid of the lexical reference text to close. Returned from
   *   `registerLexicalReferenceText`
   */
  unregisterLexicalReferenceText(guid: string): Promise<void>;
};
