declare module 'platform-enhanced-resources' {
  // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  import type { OpenWebViewOptions, ScrollGroupScrRef } from '@papi/core';

  /**
   * Options for opening the Enhanced Resource web view.
   *
   * The launcher (UI-PKG-009) populates `editorScrollGroupId` from the editor web view that
   * triggered the command (so verse navigation stays in sync), and `resourceId` from the user's
   * selected Enhanced Resource. Both are optional - missing values cause the web view to render its
   * empty state (TS-043).
   */
  export interface EnhancedResourceWebViewOptions extends OpenWebViewOptions {
    /** Identifier of the Enhanced Resource to display (matches a backend factory entry). */
    resourceId: string | undefined;
    /** Scroll group of the editor that triggered the launcher (for cross-window verse sync). */
    editorScrollGroupId: ScrollGroupScrRef | undefined;
  }
}

declare module 'papi-shared-types' {
  export interface CommandHandlers {
    /**
     * Opens the Enhanced Resource web view.
     *
     * `resolveResourceObjectId` is NOT registered here - it is exposed by the C#
     * EnhancedResourceFactory as a network object method
     * (`object:platform.enhancedResources.resolveResourceObjectId`).
     *
     * @param editorWebViewId - The id of the editor web view the user opened the Enhanced Resource
     *   from. Used to inherit the editor's scroll group and project id when present.
     * @returns Web view id for the new Enhanced Resource web view, or `undefined` if not created.
     */
    'platformEnhancedResources.openEnhancedResource': (
      editorWebViewId?: string,
    ) => Promise<string | undefined>;
  }
}
