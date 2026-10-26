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
  // preset on them. The markers tweaks below predate this and are required to keep the read-only
  // markers view working.
  if (isPowerMode) {
    const base = getDefaultViewOptions();
    if (viewType === 'markers') return { ...base, markerMode: 'visible', noteMode: 'expanded' };
    return base;
  }
  const paragraphStructure =
    getViewOptions(PARAGRAPH_STRUCTURE_VIEW_MODE) ?? getDefaultViewOptions();
  if (viewType === 'markers') return { ...paragraphStructure, noteMode: 'expanded' };
  return paragraphStructure;
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
