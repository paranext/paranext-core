import {
  getDefaultViewOptions,
  getViewOptions,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  STANDARD_VIEW_MODE,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import type { ScriptureEditorViewType } from 'platform-scripture-editor';

/** The view options for `viewType` before the project's own settings are applied. */
function getViewOptionsForType(
  viewType: ScriptureEditorViewType,
  isPowerMode: boolean,
): ViewOptions {
  if (viewType === 'standard') {
    return getViewOptions(STANDARD_VIEW_MODE) ?? getDefaultViewOptions();
  }
  // Power users get to choose their own view options, so don't force the paragraph-structure
  // preset on them.
  if (isPowerMode) return getDefaultViewOptions();
  return getViewOptions(PARAGRAPH_STRUCTURE_VIEW_MODE) ?? getDefaultViewOptions();
}

/**
 * The editor's view options for a web view of `viewType` on a project.
 *
 * `allowInvisibleCharacters` is the project's `platformScripture.allowInvisibleCharacters`
 * (Paratext's `AllowInvisibleChars`). It goes into every view, not only Standard: it describes how
 * the project stores a no-break space, so Standard view (and the footnote editor, which derives its
 * view from this one) keeps `~` and U+00A0 apart, and the Markers view copies them as the project
 * spells them. Without it, Standard view reads a literal `~` in such a project as a no-break space
 * and saves it as one.
 *
 * @param viewType - The web view's view type.
 * @param isPowerMode - Whether the user is in Power mode, where they choose their own view options
 *   rather than the paragraph-structure preset.
 * @param allowInvisibleCharacters - The project's `platformScripture.allowInvisibleCharacters`.
 * @returns The view options to give the editor.
 */
export function getEditorViewOptions(
  viewType: ScriptureEditorViewType,
  isPowerMode: boolean,
  allowInvisibleCharacters: boolean,
): ViewOptions {
  return { ...getViewOptionsForType(viewType, isPowerMode), allowInvisibleCharacters };
}

/**
 * Decides the view options the footnotes pane and its row editor render with. Power mode's pane
 * follows the main editor's view (in Standard view they are Standard's already). Simple mode's pane
 * shows markers as Standard view's does, while the main text keeps Simple's own view options and
 * goes on hiding them. While `platform.interfaceMode` is still loading, `isPowerMode` reads `false`
 * whatever the mode really is, so the pane follows the main editor then: a Power user's pane never
 * briefly takes Simple's answer.
 *
 * Standard view's options carry the project's `allowInvisibleCharacters`, so Simple's pane reads a
 * literal `~` as the project spells it rather than as a no-break space.
 *
 * @param options.isPowerMode Whether `platform.interfaceMode` is 'power'
 * @param options.isInterfaceModeLoading Whether `platform.interfaceMode` is still loading
 * @param options.mainViewOptions The main editor's view options
 * @param options.allowInvisibleCharacters The project's
 *   `platformScripture.allowInvisibleCharacters`
 * @returns The view options for the footnotes pane and its row editor
 */
export function resolveFootnotesPaneViewOptions({
  isPowerMode,
  isInterfaceModeLoading,
  mainViewOptions,
  allowInvisibleCharacters,
}: {
  isPowerMode: boolean;
  isInterfaceModeLoading: boolean;
  mainViewOptions: ViewOptions | undefined;
  allowInvisibleCharacters: boolean;
}): ViewOptions | undefined {
  if (isPowerMode || isInterfaceModeLoading) return mainViewOptions;
  return getEditorViewOptions('standard', isPowerMode, allowInvisibleCharacters);
}
