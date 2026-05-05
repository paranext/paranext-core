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

    /**
     * Asks the extension whether the MarbleGuide ("Getting started in Enhanced Resources") tutorial
     * should auto-show on this Enhanced Resource open. Returns `true` only on the first call per
     * application session AND only when the `platformEnhancedResources.showMarbleGuide` setting is
     * `true`. Subsequent calls within the same session always return `false` (per BHV-461 /
     * TS-067).
     *
     * The Enhanced Resource web view dispatches this on mount; a `true` response opens the guide
     * locally inside the web view (UI-PKG-008).
     */
    'platformEnhancedResources.requestAutoShowGuide': () => Promise<boolean>;

    /**
     * Builds the marble-dictionary tooltip payload for the given annotation token id. Backed by the
     * C# EnhancedResourceFactory; emitted on hover by the Enhanced Resource scripture pane.
     *
     * @todo Type registration is incomplete. C# `TooltipInput` actually requires `{ tokenId,
     *   resourceId, glossLanguage, currentReference }`. The consumer currently only passes `{
     *   tokenId }` because the additional context isn't yet plumbed to the scripture-pane. When
     *   that wiring lands (separate milestone), update both this registration and the
     *   `papi.commands.sendCommand` call site in scripture-pane.component.tsx to match the full
     *   input shape. See c-sharp/EnhancedResources/TooltipData.cs for the full TooltipInput
     *   record.
     */
    'platform.enhancedResources.buildTooltipData': (args: { tokenId: string }) => Promise<{
      lemma: string;
      gloss?: string;
      partOfSpeech?: string;
      strongNumber?: string;
      notes: string[];
      morphology?: string;
    }>;
  }

  export interface SettingTypes {
    /**
     * Whether the MarbleGuide ("Getting started in enhanced resources") tutorial dialog should
     * auto-show the first time the user opens an Enhanced Resource each application session. The
     * user can flip this off via the "Don't show this again" checkbox inside the guide; toggling it
     * off and clicking Close persists `false`. The user can re-enable from inside the guide by
     * unchecking the box and clicking Close. Per BHV-461.
     */
    'platformEnhancedResources.showMarbleGuide': boolean;
  }
}
