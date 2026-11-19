import {
  getDefaultViewOptions,
  getViewOptions,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  STANDARD_VIEW_MODE,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import type { ScriptureEditorViewType } from 'platform-scripture-editor';

/**
 * The paragraph-structure preset: hidden markers, with each paragraph's marker in a gutter. The
 * Scripture editor in Simple mode and the Model Text panel both use it, so the two columns can be
 * matched paragraph by paragraph.
 */
function getParagraphStructureViewOptions(): ViewOptions {
  return getViewOptions(PARAGRAPH_STRUCTURE_VIEW_MODE) ?? getDefaultViewOptions();
}

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
  return getParagraphStructureViewOptions();
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
 * The editor's view options for the Model Text panel: the read-only text a Simple user drafts from,
 * beside the Scripture editor. It shows paragraph markers in the same gutter as the Scripture
 * editor's paragraph-structure view, so the two columns can be matched paragraph by paragraph, but
 * not the active-text outline: the reader has no caret here for it to follow.
 *
 * @param allowInvisibleCharacters - The displayed resource's
 *   `platformScripture.allowInvisibleCharacters`, as for {@link getEditorViewOptions}.
 * @returns The view options to give the Model Text panel's editor.
 */
export function getModelTextViewOptions(allowInvisibleCharacters: boolean): ViewOptions {
  return {
    ...getParagraphStructureViewOptions(),
    hasActiveTextFocusBox: false,
    allowInvisibleCharacters,
  };
}
