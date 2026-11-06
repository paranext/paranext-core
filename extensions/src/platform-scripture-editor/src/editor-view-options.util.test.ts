import {
  getDefaultViewOptions,
  getViewOptions,
  PARAGRAPH_STRUCTURE_VIEW_MODE,
  STANDARD_VIEW_MODE,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import type { ScriptureEditorViewType } from 'platform-scripture-editor';
import { describe, expect, it } from 'vitest';
import { getEditorViewOptions, resolveFootnotesPaneViewOptions } from './editor-view-options.util';

// 'markers' is a legacy saved value: the Markers view is no longer offered, and a tab that saved it
// displays as Standard view in Power. While `platform.interfaceMode` loads, the saved value is
// shown as is, so it can still reach `getEditorViewOptions`.
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

describe('resolveFootnotesPaneViewOptions', () => {
  const mainViewOptions: ViewOptions = {
    markerMode: 'hidden',
    noteMode: 'collapsed',
    hasSpacing: true,
    isFormattedFont: true,
  };

  it('leaves Power on the main editor’s view options', () => {
    expect(
      resolveFootnotesPaneViewOptions({
        isPowerMode: true,
        isInterfaceModeLoading: false,
        mainViewOptions,
        allowInvisibleCharacters: false,
      }),
    ).toBe(mainViewOptions);
  });

  it('gives Simple Standard’s view options, so the pane shows markers', () => {
    expect(
      resolveFootnotesPaneViewOptions({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        mainViewOptions,
        allowInvisibleCharacters: false,
      }),
    ).toEqual(getEditorViewOptions('standard', false, false));
  });

  it.each([true, false])(
    'spells no-break spaces in Simple’s pane as the project does (allowInvisibleCharacters %s)',
    (allowInvisibleCharacters) => {
      // Without it, Standard view reads a literal `~` in such a project as a no-break space.
      expect(
        resolveFootnotesPaneViewOptions({
          isPowerMode: false,
          isInterfaceModeLoading: false,
          mainViewOptions,
          allowInvisibleCharacters,
        })?.allowInvisibleCharacters,
      ).toBe(allowInvisibleCharacters);
    },
  );

  it('keeps the main editor’s view options while the interface mode is still loading', () => {
    // `isPowerMode` reads false until the mode loads, so a Power user's pane must not take
    // Simple's answer in the meantime.
    expect(
      resolveFootnotesPaneViewOptions({
        isPowerMode: false,
        isInterfaceModeLoading: true,
        mainViewOptions,
        allowInvisibleCharacters: false,
      }),
    ).toBe(mainViewOptions);
  });
});
