// @vitest-environment jsdom

import type { ViewOptions } from '@eten-tech-foundation/platform-editor';
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { NoteEditingSurface } from './platform-scripture-editor.utils';
import { useHeldPaneRowEditor } from './use-held-pane-row-editor.hook';

const STANDARD: ViewOptions = {
  markerMode: 'editable',
  noteMode: 'collapsed',
  hasSpacing: true,
  isFormattedFont: true,
};
const PREVIEW: ViewOptions = { ...STANDARD, markerMode: 'hidden' };

type Props = {
  paneViewOptions: ViewOptions | undefined;
  noteEditingSurface: NoteEditingSurface;
  paneEditingIndex: number | undefined;
};

function renderHeldRowEditor(initialProps: Props) {
  return renderHook(
    ({ paneViewOptions, noteEditingSurface, paneEditingIndex }: Props) =>
      useHeldPaneRowEditor(paneViewOptions, noteEditingSurface, paneEditingIndex),
    { initialProps },
  );
}

describe('useHeldPaneRowEditor', () => {
  it("renders the open session's row editor on the pane's options while the pane is the editing surface", () => {
    const { result } = renderHeldRowEditor({
      paneViewOptions: STANDARD,
      noteEditingSurface: 'pane',
      paneEditingIndex: 2,
    });

    expect(result.current).toEqual({ editingFootnoteIndex: 2, viewOptions: STANDARD });
  });

  it('keeps rendering the session, on the options it opened with, after the pane stops being the editing surface', () => {
    // Ctrl+E to Preview: the surface and the pane's options change in one render, and the session
    // is closed by an effect after it. Unmounting the row editor, or giving it Preview's options,
    // would tear down its marker engine before that close could settle a pending marker rename.
    const { result, rerender } = renderHeldRowEditor({
      paneViewOptions: STANDARD,
      noteEditingSurface: 'pane',
      paneEditingIndex: 2,
    });

    rerender({ paneViewOptions: PREVIEW, noteEditingSurface: 'none', paneEditingIndex: 2 });

    expect(result.current).toEqual({ editingFootnoteIndex: 2, viewOptions: STANDARD });
  });

  it("follows the pane's options again once the session has ended", () => {
    const { result, rerender } = renderHeldRowEditor({
      paneViewOptions: STANDARD,
      noteEditingSurface: 'pane',
      paneEditingIndex: 2,
    });
    rerender({ paneViewOptions: PREVIEW, noteEditingSurface: 'none', paneEditingIndex: 2 });

    rerender({ paneViewOptions: PREVIEW, noteEditingSurface: 'none', paneEditingIndex: undefined });

    expect(result.current).toEqual({ editingFootnoteIndex: undefined, viewOptions: PREVIEW });
  });
});
