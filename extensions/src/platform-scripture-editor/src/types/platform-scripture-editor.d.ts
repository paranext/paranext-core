declare module 'platform-scripture-editor' {
  // Used in JSDocs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { CheckLocation } from 'platform-scripture';
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { NetworkableObject } from '@papi/core';
  import type { ScriptureReference } from 'platform-bible-utils';

  // #region copied from @biblionexus-foundation/platform-editor because they are not yet properly
  // exported

  type UsjLocation = {
    jsonPath: string;
    offset: number;
  };

  export type SelectionRange = {
    start: UsjLocation;
    end?: UsjLocation;
  };

  // #endregion

  /** Messages sent to the editor web view */
  export type EditorWebViewMessage = {
    method: 'selectRange';
    /** Goes to this Scripture Reference before setting the selection */
    scrRef: ScriptureReference;
    /** Endpoints of the selection. Should start at the same place as the scrRef */
    range: SelectionRange;
  };

  /**
   * Position in Scripture. See {@link CheckLocation} for more information as this is mostly a
   * {@link CheckLocation} but using a `ScriptureReference` instead of a `VerseRef` since `VerseRef`
   * doesn't travel across processes well
   *
   * Also added `bookNum` and `chapterNum` to the `jsonPath` result
   */
  export type ScriptureLocation =
    | {
        /** To which book this jsonPath is relative */
        bookNum: number;
        /** To which chapter this jsonPath is relative */
        chapterNum: number;
        /** JSONPath expression pointing to a location within USJ data */
        jsonPath: string;
        /**
         * Offset to apply to the content inside of the property indicated by `jsonPath` to
         * determine the start of the range.
         *
         * @example Given the following USJ, if the offset is 1, then this is pointing to the "a" in
         * Matthew. If no offset is provided, then the entire object with type "para" is being
         * pointed to.
         *
         * { "type": "para", "marker": "h", "content": [ "Matthew" ] }
         */
        offset?: number;
      }
    | {
        /** Verse reference to a location with the document */
        scrRef: ScriptureReference;
        /** Offset to apply to start of the verse indicated by `verseRef` */
        offset?: number;
      };

  /** A pair of Scripture positions that are either in USFM or USJ format */
  export type ScriptureRange = {
    /** Starting point where the check result applies in the document */
    start: ScriptureLocation;
    /** Ending point where the check result applies in the document */
    end: ScriptureLocation;
  };

  export type PlatformScriptureEditorWebViewController = NetworkableObject<{
    /** Set the current selection on the editor */
    selectRange(range: ScriptureRange): Promise<void>;
  }>;
}

declare module 'papi-shared-types' {
  import type { PlatformScriptureEditorWebViewController } from 'platform-scripture-editor';

  export interface CommandHandlers {
    /**
     * Opens a new editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a resource ID (not
     *   editable) is provided, this will properly open the resource viewer. Prompts the user to
     *   select a project if this parameter is not provided.
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openScriptureEditor': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;

    /**
     * Opens a new read-only editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a project ID
     *   (editable) is provided, this will properly open the Scripture editor. Prompts the user to
     *   select a resource if this parameter is not provided.
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openResourceViewer': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;
  }

  export interface WebViewControllers {
    'platformScriptureEditor.react': PlatformScriptureEditorWebViewController;
  }
}
