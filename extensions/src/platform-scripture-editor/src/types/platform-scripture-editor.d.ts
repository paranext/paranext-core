declare module 'platform-scripture-editor' {
  import { SelectionRange as PlatformEditorSelectionRange } from '@eten-tech-foundation/platform-editor';
  // Used in TSDocs
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import type { CheckLocation } from 'platform-scripture';
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { DataProviderDataType, IDataProvider, NetworkableObject } from '@papi/core';
  import type { KebabCase, LocalizeKey } from 'platform-bible-utils';
  import { CSSProperties } from 'react';
  import { SerializedVerseRef } from '@sillsdev/scripture';

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

  /** Tell the editor to insert a footnote */
  export type EditorMessageInsertFootnoteAtSelection = {
    method: 'insertFootnoteAtSelection' | 'insertCrossReferenceAtSelection';
  };

  /** Messages sent to the editor web view */
  export type EditorWebViewMessage =
    | EditorMessageSelectRange
    | EditorMessageUpdateDecorations
    | EditorMessageInsertFootnoteAtSelection;

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
    AnnotationStyleDataProvider,
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
     * Command to insert a foot note into a given editor web view.
     *
     * @param editorWebViewId The ID of the web view to insert the footnote for
     * @returns
     */
    'platformScriptureEditor.insertFootnoteAtSelection': (
      editorWebViewId?: string | undefined,
    ) => Promise<void>;

    /**
     * Command to insert a cross-reference into a given editor web view.
     *
     * @param editorWebViewId The ID of the web view to insert the footnote for
     * @returns
     */
    'platformScriptureEditor.insertCrossReferenceAtSelection': (
      editorWebViewId?: string | undefined,
    ) => Promise<void>;
  }

  export interface DataProviders {
    'platformScriptureEditor.annotationStyle': AnnotationStyleDataProvider;
  }

  export interface WebViewControllers {
    'platformScriptureEditor.react': PlatformScriptureEditorWebViewController;
  }
}
