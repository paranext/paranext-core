import {
  getDefaultViewOptions,
  getViewOptions,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  STANDARD_VIEW_MODE,
} from '@eten-tech-foundation/platform-editor';
import type { ScriptureEditorViewType } from 'platform-scripture-editor';
import { describe, expect, it } from 'vitest';
import { getEditorViewOptions } from './editor-view-options.util';

const VIEW_TYPES: ScriptureEditorViewType[] = ['formatted', 'markers', 'standard'];

describe('getEditorViewOptions', () => {
  it.each(
    VIEW_TYPES.flatMap((viewType) =>
      [true, false].map((isPowerMode) => ({ viewType, isPowerMode })),
    ),
  )(
    "carries the project's allowInvisibleCharacters into the $viewType view (power mode $isPowerMode)",
    ({ viewType, isPowerMode }) => {
      expect(getEditorViewOptions(viewType, isPowerMode, true).allowInvisibleCharacters).toBe(true);
      expect(getEditorViewOptions(viewType, isPowerMode, false).allowInvisibleCharacters).toBe(
        false,
      );
    },
  );

  it('picks the view for the view type and mode', () => {
    const paragraphStructure = getViewOptions(PARAGRAPH_STRUCTURE_VIEW_MODE);
    const on = { allowInvisibleCharacters: true };

    expect(getEditorViewOptions('standard', false, true)).toEqual({
      ...getViewOptions(STANDARD_VIEW_MODE),
      ...on,
    });
    expect(getEditorViewOptions('formatted', true, true)).toEqual({
      ...getDefaultViewOptions(),
      ...on,
    });
    expect(getEditorViewOptions('formatted', false, true)).toEqual({
      ...paragraphStructure,
      ...on,
    });
  });
});
