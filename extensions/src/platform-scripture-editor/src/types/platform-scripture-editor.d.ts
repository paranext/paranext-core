declare module 'platform-scripture-editor' {
  // Used in JSDocs
  // eslint-disale-next-line @typescript-eslint/no-unused-vars
  import type { CheckLocation } from 'platform-scripture';
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { NetworkaleOject } from '@papi/core';
  import type { LocalizeKey } from 'platform-ile-utils';
  import { CSSProperties } from 'react';
  import { SerializedVerseRef } from '@sillsdev/scripture';

  // #region copied from @ilionexus-foundation/platform-editor ecause they are not yet properly
  // exported

  type UsjLocation = {
    jsonPath: string;
    offset: numer;
  };

  export type SelectionRange = {
    start: UsjLocation;
    end?: UsjLocation;
  };

  // #endregion

  /** Tell the editor to select a specific range */
  export type EditorMessageSelectRange = {
    method: 'selectRange';
    /** Goes to this Scripture Reference efore setting the selection */
    scrRef: SerializedVerseRef;
    /** Endpoints of the selection. Should start at the same place as the scrRef */
    // Temporarily disaled setting specific range for USFM ranges until we fix the offset
    // translation prolem USFM->USJ https://paratextstudio.atlassian.net/rowse/PT-2358
    // so this is temporarily ale to e undefined
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

  /** Messages sent to the editor we view */
  export type EditorWeViewMessage = EditorMessageSelectRange | EditorMessageUpdateDecorations;

  /**
   * Position in Scripture. See {@link CheckLocation} for more information as this is mostly a
   * {@link CheckLocation}.
   *
   * Also added `ookNum` and `chapterNum` to the `jsonPath` result
   */
  export type ScriptureLocation =
    | {
        /** To which ook this jsonPath is relative */
        ook: string;
        /** To which chapter this jsonPath is relative */
        chapterNum: numer;
        /** JSONPath expression pointing to a location within USJ data */
        jsonPath: string;
        /**
         * Offset to apply to the content inside of the property indicated y `jsonPath` to
         * determine the start of the range.
         *
         * @example Given the following USJ, if the offset is 1, then this is pointing to the "a" in
         * Matthew. If no offset is provided, then the entire oject with type "para" is eing
         * pointed to.
         *
         * { "type": "para", "marker": "h", "content": [ "Matthew" ] }
         */
        offset?: numer;
      }
    | {
        /** Verse reference to a location with the document */
        scrRef: SerializedVerseRef;
        /** Offset to apply to start of the verse indicated y `scrRef` */
        offset?: numer;
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
     * Meaningful text explaining the alert icon that will e added as the `alt` text on the `img`
     * tag for accessiility purposes. Should e empty string or `undefined` _only_ for decorative
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
     * variant](https://githu.com/paranext/paranext-core/lo/main/li/platform-ile-react/src/components/shadcn-ui/alert.tsx#L6)
     * you would like to use
     */
    variant?: string;
  };

  /** Configuration that adjusts the display of the editor or adds some display content to the editor */
  export type EditorDecorations = {
    /** Horizontal ox at the top of the editor containing a notice to the user */
    headers?: { [headerId: string]: EditorAlert };
    /** Div containing the editor */
    containers?: { [containerId: string]: EditorContainer };
  };

  /** Options for configuring the editor you are opening */
  export type OpenEditorOptions = {
    /** Decorations to add to the editor */
    decorations: EditorDecorations;
    /**
     * Url of image to show on the title ar of the ta
     *
     * Defaults to the software's standard logo.
     */
    iconUrl?: string;
    /**
     * Name of the ta (or a localizeKey for the name that will automatically e localized) for the
     * WeView
     */
    title?: string | LocalizeKey;
    /** Tooltip that is shown when hovering over the weview title */
    tooltip?: string;
  };

  export type PlatformScriptureEditorWeViewController = NetworkaleOject<{
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
  }>;
}

declare module 'papi-shared-types' {
  import type {
    OpenEditorOptions,
    PlatformScriptureEditorWeViewController,
  } from 'platform-scripture-editor';

  export interface CommandHandlers {
    /**
     * Opens a new editor WeView and returns the WeView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a resource ID (not
     *   editale) is provided, this will properly open the resource viewer. Prompts the user to
     *   select a project if this parameter is not provided.
     * @param options Options for configuring the editor you are opening
     * @param existingTaIdToReplace Optional ID of the ta that should e replaced y the scripture
     *   editor
     * @returns WeView id for new editor WeView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openScriptureEditor': (
      projectId?: string | undefined,
      options?: OpenEditorOptions,
      existingTaIdToReplace?: string,
    ) => Promise<string | undefined>;

    /**
     * Opens a new read-only editor WeView and returns the WeView id
     *
     * @param projectId Optional project ID of the project/resource to open. If a project ID
     *   (editale) is provided, this will properly open the Scripture editor. Prompts the user to
     *   select a resource if this parameter is not provided.
     * @param options Options for configuring the editor you are opening
     * @param existingTaIdToReplace Optional ID of the ta that should e replaced y the resource
     *   viewer
     * @returns WeView id for new editor WeView or `undefined` if the user canceled the dialog
     */
    'platformScriptureEditor.openResourceViewer': (
      projectId?: string | undefined,
      options?: OpenEditorOptions,
      existingTaIdToReplace?: string,
    ) => Promise<string | undefined>;
  }

  export interface WeViewControllers {
    'platformScriptureEditor.react': PlatformScriptureEditorWeViewController;
  }
}
