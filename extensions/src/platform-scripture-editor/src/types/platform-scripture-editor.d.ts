declare module 'platform-scripture-editor' {
  import {
    AnnotationRange,
    SelectionRange as PlatformEditorSelectionRange,
    TypedMarkRemovalCause,
  } from '@eten-tech-foundation/platform-editor';
  // Used in TSDocs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { CheckLocation } from 'platform-scripture';
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { DataProviderDataType, IDataProvider, NetworkableObject } from '@papi/core';
  import type {
    KebabCase,
    LocalizeKey,
    UsfmScrRefVerseLocation,
    UsfmVerseLocation,
    UsjChapterLocation,
    UsjFlatTextChapterLocation,
    UsjVerseRefChapterLocation,
  } from 'platform-bible-utils';
  import { CSSProperties } from 'react';
  import { SerializedVerseRef } from '@sillsdev/scripture';
  import type { CommandNames } from 'papi-shared-types';

  // #region editor WebViewController messages

  /** Tell the editor to select a specific range */
  export type EditorMessageSelectRange = {
    method: 'selectRange';
    /** Goes to this Scripture Reference before setting the selection */
    scrRef: SerializedVerseRef;
    /** Endpoints of the selection. Should start at the same place as the scrRef */
    range: SelectionRange;
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

  /** Tell the editor to open the comment editor for inserting a new comment at the current verse */
  export type EditorMessageInsertCommentAtSelection = {
    method: 'insertCommentAtSelection';
  };

  /**
   * The action that triggered an annotation interaction.
   *
   * - `'clicked'` - The user clicked on the annotation
   * - {@link TypedMarkRemovalCause} - The annotation was removed for the specified reason
   *
   *   - `removed` - when the annotation is removed programmatically (manual remove action)
   *   - `destroyed` - when the text the annotation was on is completely deleted
   */
  export type AnnotationAction = 'clicked' | TypedMarkRemovalCause;

  /**
   * Handler function for annotation interactions. To handle annotation interactions, register a
   * command with this type and pass the command's name to the editor WebViewController with
   * {@link PlatformScriptureEditorWebViewController.setAnnotation}
   *
   * @param type The type of annotation (e.g., 'translator-comment')
   * @param id The unique identifier of the annotation
   * @param action The action that triggered the interaction
   */
  export type AnnotationActionHandler = (
    type: string,
    id: string,
    action: AnnotationAction,
  ) => Promise<void>;

  /** Tell the editor to set an annotation on the specified range */
  export type EditorMessageSetAnnotation = {
    method: 'setAnnotation';
    /**
     * Target verse ref for the annotation. If this reference is not displayed in the editor, the
     * annotation will not be added
     */
    verseRef: SerializedVerseRef;
    /** The annotation range in editor-usable format */
    annotationRange: AnnotationRange;
    /** The type of annotation (e.g., 'translator-comment') */
    annotationType: string;
    /** Unique identifier for this annotation */
    annotationId: string;
    /**
     * Optional command to execute when the annotation is interacted with. The command will be
     * called with the following parameters:
     *
     * - `type: string` - The type of annotation (e.g., 'translator-comment')
     * - `annotationId: string` - The unique identifier of the annotation
     * - `action: AnnotationAction` - The action that triggered the interaction
     *
     * We expect that the command handler has the function signature of
     * {@link AnnotationActionHandler}
     */
    interactionCommand?: CommandNames;
  };

  /** Tell the editor to run a command on an annotation */
  export type EditorMessageRunAnnotationAction = {
    method: 'runAnnotationAction';
    /** The unique identifier of the annotation */
    annotationId: string;
    /** The action to run on the annotation */
    action: AnnotationAction;
  };

  /** Messages sent to the editor web view */
  export type EditorWebViewMessage =
    | EditorMessageSelectRange
    | EditorMessageUpdateDecorations
    | EditorMessageChangeScriptureView
    | EditorMessageToggleFootnotesPaneVisibility
    | EditorMessageChangeFootnotesPaneLocation
    | EditorMessageInsertTextualNoteAtSelection
    | EditorMessageInsertCommentAtSelection
    | EditorMessageSetAnnotation
    | EditorMessageRunAnnotationAction;

  // #endregion editor WebViewController messages

  // #region editor selection tracking

  /**
   * Data emitted when an editor's selection changes. Subscribe to the
   * `platformScriptureEditor.onDidSelectionChange` network event using
   * `papi.network.getNetworkEvent()` to receive these events.
   *
   * @example
   *
   * ```typescript
   * const unsubscribe = papi.network
   *   .getNetworkEvent('platformScriptureEditor.onDidSelectionChange')
   *   .event((data: SelectionChangeEvent) => {
   *     console.log(`Editor ${data.webViewId} selection changed:`, data.selection);
   *   });
   * ```
   */
  export type SelectionChangeEvent = {
    /** The WebView ID of the editor whose selection changed */
    webViewId: string;
    /** The current selection in the editor, or undefined if there is no selection */
    selection: ScriptureRangeUsjVerseRefChapterLocation | undefined;
  };

  // #endregion editor selection tracking

  // #region USFM locations and ranges

  /**
   * @deprecated 4 September 2025. Use `SelectionRange` from '@eten-tech-foundation/platform-editor'
   *   instead.
   */
  export type SelectionRange = PlatformEditorSelectionRange;

  /**
   * Position in Scripture. See {@link CheckLocation} for more information as this is mostly a
   * {@link CheckLocation}.
   *
   * Also added `bookNum` and `chapterNum` to the `jsonPath` result
   *
   * @deprecated 13 November 2025. This type of location is not generic enough to support all
   *   positions we need to be able to represent in USJ space. Use {@link UsjChapterLocation} and
   *   {@link UsfmVerseLocation} instead.
   */
  export type ScriptureLocation = UsjFlatTextChapterLocation | UsfmScrRefVerseLocation;

  /**
   * A pair of Scripture positions that are either in USFM or USJ format
   *
   * Note: some forms of properties in this type are deprecated; see {@link ScriptureLocation} for
   * details.
   */
  export type ScriptureRange = {
    /**
     * Starting point where the check result applies in the document
     *
     * Note: some forms of this type are deprecated and will be removed eventually; see
     * {@link ScriptureLocation} for details.
     */
    start: UsjChapterLocation | UsfmVerseLocation | ScriptureLocation;
    /**
     * Ending point where the check result applies in the document
     *
     * Note: some forms of this type are deprecated and will be removed eventually; see
     * {@link ScriptureLocation} for details.
     */
    end: UsjChapterLocation | UsfmVerseLocation | ScriptureLocation;
  };

  /**
   * A pair of Scripture positions that are in USJ format specifically using
   * {@link UsjVerseRefChapterLocation}
   */
  export type ScriptureRangeUsjVerseRefChapterLocation = {
    /** Starting point of the Scripture range in the document */
    start: UsjVerseRefChapterLocation;
    /** Ending point of the Scripture range in the document */
    end: UsjVerseRefChapterLocation;
  };

  // #endregion USFM locations and ranges

  // #region editor decorations

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

  // #endregion editor decorations

  // #region editor WebView types

  export type ScriptureEditorViewType = 'formatted' | 'markers';

  /** Options for configuring the editor you are opening */
  export type OpenEditorOptions = {
    /** Decorations to add to the editor */
    decorations: EditorDecorations;
    /**
     * Ways Scripture project text can be viewed in the editor
     *
     * Defaults to 'formatted'.
     */
    viewType?: ScriptureEditorViewType;
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
    footnotesPaneSizePercent?: number;
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
     * WebView.
     *
     * If a localized string is passed in, the following replacement strings will be processed in
     * the localized string:
     *
     * - `{projectId}`: The name of the project opened in the editor (`platform.name` setting)
     * - `{editable}`: Will be replaced with an empty string for non-editable projects and the
     *   localized value of `%webView_platformScriptureEditor_title_editable_indicator%` (in
     *   English, `(Editable)`) for editable projects.
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
    /**
     * Function to open the comment editor for inserting a new project comment at the current verse.
     * Checks permissions and fetches assignable users before opening the editor.
     */
    insertCommentAtSelection(): Promise<void>;
    /**
     * Set an annotation on the specified Scripture range. The annotation will be highlighted in the
     * editor.
     *
     * @param range The Scripture range to annotate. If this reference is not displayed in the
     *   editor, the annotation will not be added
     * @param annotationType The type of annotation (e.g., 'translator-comment', 'spelling')
     * @param annotationId Unique identifier for this annotation
     * @param interactionCommand Optional command to execute when the annotation is interacted with.
     *   The command will be called with the following parameters:
     *
     *   - `type: string` - The type of annotation (e.g., 'translator-comment')
     *   - `annotationId: string` - The unique identifier of the annotation
     *   - `action: AnnotationAction` - The action that triggered the interaction
     *
     *   We expect that the command handler has the function signature of
     *   {@link AnnotationActionHandler}
     */
    setAnnotation(
      range: ScriptureRange,
      annotationType: string,
      annotationId: string,
      interactionCommand?: CommandNames,
    ): Promise<void>;
    /**
     * Focus on a specific comment thread. Opens the Comments List web view for this project (or
     * focuses it if already open) and scrolls to the specified thread.
     *
     * @param threadId The ID of the thread to focus on
     */
    focusComment(threadId: string): Promise<void>;
    /**
     * Manually run an action on an annotation.
     *
     * @param annotationId The ID of the annotation to run the action on
     * @param action The action to run on the annotation. Note: running `destroyed` will trigger the
     *   annotation `removed` action because `destroyed` is specifically due to the text being
     *   deleted whereas `removed` is a programmatic removal
     */
    runAnnotationAction(annotationId: string, action: AnnotationAction): Promise<void>;
    /**
     * Get the current selection in the editor.
     *
     * @returns The current selection range, or undefined if there is no selection
     */
    getSelection(): Promise<ScriptureRangeUsjVerseRefChapterLocation | undefined>;
    /**
     * **INTERNAL - DO NOT USE DIRECTLY.** This method is intended to be called only by the
     * Scripture editor WebView itself to notify the backend of selection changes. External callers
     * should subscribe to the `platformScriptureEditor.onDidSelectionChange` network event or use
     * `getSelection()` instead.
     *
     * @param selection The new selection in Scripture range format, or undefined if there is no
     *   selection
     * @internal
     */
    updateSelectionInternal(
      selection: ScriptureRangeUsjVerseRefChapterLocation | undefined,
    ): Promise<void>;
  }>;

  // #endregion editor WebView types

  // #region annotation style data provider types

  /**
   * CSS-like style properties for annotations. This is a constrained subset of CSS that allows
   * extensions to define custom annotation styles while supporting theme variables.
   *
   * Supports CSS custom properties (e.g., `var(--primary)`) for theme-aware styling.
   */
  export type AnnotationStyleProperties = {
    /**
     * Background color. Supports CSS color values including theme variables.
     *
     * @example 'yellow'
     *
     * @example 'rgba(255, 255, 0, 0.3)'
     *
     * @example 'hsl(var(--accent))'
     */
    backgroundColor?: string;

    /**
     * Border style.
     *
     * @example '1px solid red'
     *
     * @example '2px dashed hsl(var(--border))'
     */
    border?: string;

    /**
     * Border radius for rounded corners.
     *
     * @example '4px'
     *
     * @example '0.25rem'
     */
    borderRadius?: string;

    /**
     * Text color. Supports CSS color values including theme variables.
     *
     * @example 'red'
     *
     * @example '#ff0000'
     *
     * @example 'hsl(var(--primary))'
     *
     * @example 'var(--destructive)'
     */
    color?: string;

    /**
     * Cursor style when hovering over annotated text.
     *
     * @example 'pointer'
     *
     * @example 'help'
     */
    cursor?: string;

    /**
     * Font style.
     *
     * @example 'italic'
     *
     * @example 'oblique'
     */
    fontStyle?: string;

    /**
     * Font weight (normal, bold, or numeric values 100-900).
     *
     * @example 'bold'
     *
     * @example '600'
     */
    fontWeight?: string | number;

    /**
     * Margin.
     *
     * @example '2px'
     *
     * @example '0.25rem 0.5rem'
     */
    margin?: string;

    /**
     * Opacity (0 to 1).
     *
     * @example 0.5
     *
     * @example '0.8'
     */
    opacity?: string | number;

    /**
     * Padding.
     *
     * @example '2px'
     *
     * @example '0.25rem 0.5rem'
     */
    padding?: string;

    /**
     * Text decoration color. Supports CSS color values including theme variables.
     *
     * @example 'red'
     *
     * @example 'hsl(var(--destructive))'
     */
    textDecorationColor?: string;

    /**
     * Text decoration line (underline, overline, line-through, or combinations).
     *
     * @example 'underline'
     *
     * @example 'underline wavy'
     *
     * @example 'line-through'
     */
    textDecorationLine?: string;

    /**
     * Text decoration style (solid, double, dotted, dashed, wavy).
     *
     * @example 'wavy'
     *
     * @example 'dotted'
     */
    textDecorationStyle?: string;

    /**
     * Text decoration thickness.
     *
     * @example '2px'
     *
     * @example '0.1em'
     */
    textDecorationThickness?: string;
  };

  /**
   * A nonce (unique identifier) returned when setting an annotation style, used for deleting that
   * style later.
   */
  export type AnnotationStyleNonce = string;

  /** Data types for the annotation style data provider. */
  export type AnnotationStyleDataProviderDataTypes = {
    /** Complete CSS stylesheet containing all registered annotation styles. */
    AnnotationStylesheet: DataProviderDataType<undefined, string, never>;
  };

  /** Custom methods for the annotation style data provider. */
  export type AnnotationStyleDataProviderMethods = {
    /**
     * Register a new annotation style or update an existing one.
     *
     * Note that if the same `typeName` is used again, it will throw an error. Each annotation style
     * must have a unique `typeName`. To update an existing style, delete it first using its nonce
     * and then register the new style.
     *
     * @example
     *
     * ```typescript
     * const nonce = await annotationStyleDataProvider.registerAnnotationStyle(
     *   'spelling-error',
     *   {
     *     textDecorationLine: 'underline',
     *     textDecorationStyle: 'wavy',
     *     textDecorationColor: 'hsl(var(--destructive))',
     *     cursor: 'pointer',
     *   },
     * );
     * ```
     *
     * @param typeName A unique name for the annotation style type. This should be in kebab-case
     *   (lowercase letters and hyphens only) to ensure valid CSS class naming.
     * @param definition The annotation style definition containing style properties
     * @returns A nonce (unique identifier) that can be used to delete this style later
     */
    registerAnnotationStyle<T extends string>(
      typeName: KebabCase<T>,
      definition: AnnotationStyleProperties,
    ): Promise<AnnotationStyleNonce>;

    /**
     * Delete an annotation style using its nonce.
     *
     * @example
     *
     * ```typescript
     * const deleted = await annotationStyleDataProvider?.deleteAnnotationStyle(nonce);
     * if (deleted) {
     *   console.debug('Annotation style successfully deleted');
     * } else {
     *   console.warn('Annotation style not found');
     * }
     * ```
     *
     * @param nonce The nonce returned from registerAnnotationStyle
     * @returns True if the style was successfully deleted, false if the nonce was not found
     */
    deleteAnnotationStyle(nonce: AnnotationStyleNonce): Promise<boolean>;

    /**
     * Provides all registered annotation styles in stylesheet form
     *
     * @example
     *
     * ```typescript
     * const stylesheet = await annotationStyleDataProvider.getAnnotationStylesheet();
     * console.log('Current annotation styles stylesheet:', stylesheet);
     * ```
     *
     * @returns Complete CSS stylesheet containing all registered annotation styles
     */
    getAnnotationStylesheet(): Promise<string>;
  };

  /**
   * Data provider for managing annotation styles. Allows extensions to register custom annotation
   * styles that are converted to CSS stylesheets for use in the editor.
   */
  export type AnnotationStyleDataProvider = IDataProvider<AnnotationStyleDataProviderDataTypes> &
    AnnotationStyleDataProviderMethods;

  // #endregion annotation style data provider types
}

declare module 'papi-shared-types' {
  import type {
    AnnotationStyleDataProvider,
    OpenEditorOptions,
    PlatformScriptureEditorWebViewController,
  } from 'platform-scripture-editor';
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { NotificationClickCommandHandler } from '@papi/core';

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
    'platformScriptureEditor.changeView': (webViewId: string | undefined) => Promise<void>;

    /**
     * Toggles the visibility of the footnotes pane for the given the WebView ID
     *
     * @param webViewId The WebView ID of the scripture editor or resource viewer.
     */
    'platformScriptureEditor.toggleFootnotes': (webViewId: string | undefined) => Promise<void>;

    /**
     * Changes the location of the footnotes pane (if visible) for the given the WebView ID,
     * toggling between showing it at the bottom or side-by-side.
     *
     * @param webViewId The WebView ID of the scripture editor or resource viewer.
     */
    'platformScriptureEditor.changeFootnotesPaneLocation': (
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

    /**
     * Command to insert a project comment at the current verse in a given editor web view. Opens a
     * comment editor popover for drafting the comment content and optionally assigning to a user.
     *
     * @param editorWebViewId The ID of the web view to insert the comment for
     */
    'platformScriptureEditor.insertCommentAtSelection': (
      editorWebViewId?: string | undefined,
    ) => Promise<void>;
    /**
     * Dismiss the marker-view readonly notification for a given notification ID. The command
     * receives the `notificationId` when the notification's click action is used.
     */
    'platformScriptureEditor.dismissMarkerNotificationForProjectToday': NotificationClickCommandHandler;
  }

  export interface DataProviders {
    'platformScriptureEditor.annotationStyle': AnnotationStyleDataProvider;
  }

  export interface WebViewControllers {
    'platformScriptureEditor.react': PlatformScriptureEditorWebViewController;
  }
}
