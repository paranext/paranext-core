declare module 'platform-scripture-editor' {
  import { SelectionRange as PlatformEditorSelectionRange } from '@eten-tech-foundation/platform-editor';
  // Used in TSDocs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { CheckLocation } from 'platform-scripture';
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { NetworkableObject } from '@papi/core';
  import type { LocalizeKey } from 'platform-bible-utils';
  import { CSSProperties } from 'react';
  import { SerializedVerseRef } from '@sillsdev/scripture';

  /**
   * @deprecated 4 September 2025. Use `SelectionRange` from '@eten-tech-foundation/platform-editor'
   *   instead.
   */
  export type SelectionRange = PlatformEditorSelectionRange;

  /** Tell the editor to select a specific range */
  export type EditorMessageSelectRange = {
    method: 'selectRange';
    /** Goes to this Scripture Reference before setting the selection */
    scrRef: SerializedVerseRef;
    /** Endpoints of the selection. Should start at the same place as the scrRef */
    // Temporarily disabled setting specific range for USFM ranges until we fix the offset
    // translation problem USFM->USJ https://paratextstudio.atlassian.net/browse/PT-2358
    // so this is temporarily able to be undefined
    range?: SelectionRange;
  };

  /** Tell the editor to merge these decorations into its existing decorations */
  export type EditorMessageUpdateDecorations = {
    method: 'updateDecorations';
    /** Decorations to add or update */
    decorationsToAdd?: EditorDecorations;
    /** List of IDs of decorations to remove completely */
    decorationsToRemove?: string[];
  };

  /**
   * Tell the editor to cycle between the Scripture view types (currently just a toggle between
   * formatted and Marker view)
   */
  export type EditorMessageChangeScriptureView = {
    method: 'changeScriptureView';
  };

  /** Tell the editor to toggle footnotes pane visibility */
  export type EditorMessageToggleFootnotesPaneVisibility = {
    method: 'toggleFootnotesPaneVisibility';
  };

  /** Tell the editor to change (toggle between bottom and side) footnotes pane location */
  export type EditorMessageChangeFootnotesPaneLocation = {
    method: 'changeFootnotesPaneLocation';
  };

  /** Tell the editor to insert a textual note (footnote or cross-reference) */
  export type EditorMessageInsertTextualNoteAtSelection = {
    method: 'insertFootnoteAtSelection' | 'insertCrossReferenceAtSelection';
  };

  /** Messages sent to the editor web view */
  export type EditorWebViewMessage =
    | EditorMessageSelectRange
    | EditorMessageUpdateDecorations
    | EditorMessageChangeScriptureView
    | EditorMessageToggleFootnotesPaneVisibility
    | EditorMessageChangeFootnotesPaneLocation
    | EditorMessageInsertTextualNoteAtSelection;

  /**
   * Position in Scripture. See {@link CheckLocation} for more information as this is mostly a
   * {@link CheckLocation}.
   *
   * Also added `bookNum` and `chapterNum` to the `jsonPath` result
   */
  export type ScriptureLocation =
    | {
        /** To which book this jsonPath is relative */
        book: string;
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
        scrRef: SerializedVerseRef;
        /** Offset to apply to start of the verse indicated by `scrRef` */
        offset?: number;
      };

  /** A pair of Scripture positions that are either in USFM or USJ format */
  export type ScriptureRange = {
    /** Starting point where the check result applies in the document */
    start: ScriptureLocation;
    /** Ending point where the check result applies in the document */
    end: ScriptureLocation;
  };

  export type EditorContainer = {
    /** Styles applied to the div */
    style: CSSProperties | undefined;
  };

  export type EditorAlert = {
    /** Url of alert icon */
    iconUrl?: string;
    /**
     * Meaningful text explaining the alert icon that will be added as the `alt` text on the `img`
     * tag for accessibility purposes. Should be empty string or `undefined` _only_ for decorative
     * images.
     *
     * Automatically localized if this is a {@link LocalizeKey}.
     */
    iconAltText?: string | LocalizeKey;
    /**
     * Title of the alert. Plain text.
     *
     * Automatically localized if this is a {@link LocalizeKey}.
     */
    title?: string | LocalizeKey;
    /**
     * Description of the alert in Markdown format.
     *
     * Automatically localized if this is a {@link LocalizeKey}.
     */
    descriptionMd?: string | LocalizeKey;
    /**
     * Which [alert
     * variant](https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/components/shadcn-ui/alert.tsx#L6)
     * you would like to use
     */
    variant?: string;
  };

  /** Configuration that adjusts the display of the editor or adds some display content to the editor */
  export type EditorDecorations = {
    /** Horizontal box at the top of the editor containing a notice to the user */
    headers?: { [headerId: string]: EditorAlert };
    /** Div containing the editor */
    containers?: { [containerId: string]: EditorContainer };
  };

  /** Options for configuring the editor you are opening */
  export type OpenEditorOptions = {
    /** Decorations to add to the editor */
    decorations: EditorDecorations;
    /** Ways Scripture project text can be viewed in the editor */
    scriptureViewType: 'formatted' | 'markers';
    /**
     * When the footnote pane is shown, where it should be positioned
     *
     * Defaults to 'bottom'.
     */
    footnotesPanePosition?: 'bottom' | 'trailing';
    /**
     * Percentage of the available space that the footnote pane should take up when it is shown.
     * This should be a number between 3 and 97. (0-100 are "legal" values for the components but
     * nonsensical from a UX perspective.)
     *
     * Defaults to 20.
     */
    footnotesPaneSize?: number;
    /**
     * Flag indicating whether the footnote pane should be displayed
     *
     * Defaults to false.
     */
    footnotesPaneVisible?: boolean;
    /**
     * Url of image to show on the title bar of the tab
     *
     * Defaults to the software's standard logo.
     */
    iconUrl?: string;
    /**
     * Name of the tab (or a localizeKey for the name that will automatically be localized) for the
     * WebView
     */
    title?: string | LocalizeKey;
    /** Tooltip that is shown when hovering over the webview title */
    tooltip?: string;
  };

  export type PlatformScriptureEditorWebViewController = NetworkableObject<{
    /** Set the current selection on the editor */
    selectRange(range: ScriptureRange): Promise<void>;
    /**
     * Cycle through the Scripture view types in the editor (currently just a toggle between
     * formatted and Marker view)
     */
    changeScriptureView(): Promise<void>;
    /** Toggle the visibility of the footnotes pane in the editor */
    toggleFootnotesPaneVisibility(): Promise<void>;
    /** Toggle the visibility of the footnotes pane in the editor */
    changeFootnotesPaneLocation(): Promise<'bottom' | 'trailing'>;
    /**
     * Add or update decorations in the editor. New decoration definitions with the same id
     * overwrite existing decorations
     *
     * @param decorationsToAdd Decorations to add or update
     * @param decorationsToRemove List of IDs of decorations to remove completely
     */
    updateDecorations(
      decorationsToAdd: EditorDecorations | undefined,
      decorationsToRemove?: string[],
    ): Promise<void>;
    /** Function to insert a footnote in the editor at the current selection */
    insertFootnoteAtSelection(): Promise<void>;
    /** Function to insert a cross-reference in the editor at the current selection */
    insertCrossReferenceAtSelection(): Promise<void>;
  }>;
}

declare module 'papi-shared-types' {
  import type {
    OpenEditorOptions,
    PlatformScriptureEditorWebViewController,
  } from 'platform-scripture-editor';

  export interface CommandHandlers {
    /**
     * Opens a new editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a resource ID (not
     *   editable) is provided, this will properly open the resource viewer. Prompts the user to
     *   select a project if this parameter is not provided.
     * @param options Options for configuring the editor you are opening
     * @param existingTabIdToReplace Optional ID of the tab that should be replaced by the scripture
     *   editor
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openScriptureEditor': (
      projectId?: string | undefined,
      options?: OpenEditorOptions,
      existingTabIdToReplace?: string,
    ) => Promise<string | undefined>;

    /**
     * Opens a new read-only editor WebView and returns the WebView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a project ID
     *   (editable) is provided, this will properly open the Scripture editor. Prompts the user to
     *   select a resource if this parameter is not provided.
     * @param options Options for configuring the editor you are opening
     * @param existingTabIdToReplace Optional ID of the tab that should be replaced by the resource
     *   viewer
     * @returns WebView id for new editor WebView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openResourceViewer': (
      projectId?: string | undefined,
      options?: OpenEditorOptions,
      existingTabIdToReplace?: string,
    ) => Promise<string | undefined>;

    /**
     * Cycles through the Scripture view types in the editor (currently just a toggle between
     * formatted and Marker view) for the given the WebView ID
     *
     * @param webViewId The WebView ID of the scripture editor or resource viewer.
     */
    'platformScripture.changeView': (webViewId: string | undefined) => Promise<void>;

    /**
     * Toggles the visibility of the footnotes pane for the given the WebView ID
     *
     * @param webViewId The WebView ID of the scripture editor or resource viewer.
     */
    'platformScripture.toggleFootnotes': (webViewId: string | undefined) => Promise<void>;

    /**
     * Changes the location of the footnotes pane (if visible) for the given the WebView ID,
     * toggling between showing it at the bottom or side-by-side.
     *
     * @param webViewId The WebView ID of the scripture editor or resource viewer.
     */
    'platformScripture.changeFootnotesPaneLocation': (
      webViewId: string | undefined,
    ) => Promise<void>;

    /**
     * Command to insert a footnote into a given editor web view.
     *
     * @param editorWebViewId The ID of the web view to insert the footnote for
     */
    'platformScriptureEditor.insertFootnoteAtSelection': (
      editorWebViewId?: string | undefined,
    ) => Promise<void>;

    /**
     * Command to insert a cross-reference into a given editor web view.
     *
     * @param editorWebViewId The ID of the web view to insert the footnote for
     */
    'platformScriptureEditor.insertCrossReferenceAtSelection': (
      editorWebViewId?: string | undefined,
    ) => Promise<void>;
  }

  export interface WebViewControllers {
    'platformScriptureEditor.react': PlatformScriptureEditorWebViewController;
  }
}
