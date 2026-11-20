import { describe, expect, it, vi } from 'vitest';
import { focusEditorKeepingSelection } from './focus-editor-keeping-selection.util';

type Editor = NonNullable<Parameters<typeof focusEditorKeepingSelection>[0]>;

/** An editor stand-in; `getSelection` / `getSelectedParaMarker` report a selection when told to. */
function makeEditor(
  selection: { hasSelection?: boolean; hasParaMarker?: boolean },
  pickSelection: Editor['getSelection'],
  pickParaMarker: Editor['getSelectedParaMarker'],
) {
  return {
    focus: vi.fn(),
    getSelection: vi.fn(selection.hasSelection ? pickSelection : () => undefined),
    getSelectedParaMarker: vi.fn(selection.hasParaMarker ? pickParaMarker : () => undefined),
  };
}

describe('focusEditorKeepingSelection', () => {
  const someSelection: Editor['getSelection'] = () => ({
    start: { jsonPath: '$', offset: 0 },
    end: { jsonPath: '$', offset: 1 },
  });
  const someParaMarker: Editor['getSelectedParaMarker'] = () => 'p';

  it("calls the editor's own focus when it is editable and has a selection", () => {
    const editor = makeEditor({ hasSelection: true }, someSelection, someParaMarker);
    const frame = { focus: vi.fn() };
    focusEditorKeepingSelection(editor, true, frame);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(frame.focus).not.toHaveBeenCalled();
  });

  it('counts a selected paragraph marker as a selection', () => {
    const editor = makeEditor({ hasParaMarker: true }, someSelection, someParaMarker);
    const frame = { focus: vi.fn() };
    focusEditorKeepingSelection(editor, true, frame);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(frame.focus).not.toHaveBeenCalled();
  });

  it('focuses only the frame when the editor has no selection to land on', () => {
    const editor = makeEditor({}, someSelection, someParaMarker);
    const frame = { focus: vi.fn() };
    focusEditorKeepingSelection(editor, true, frame);
    expect(editor.focus).not.toHaveBeenCalled();
    expect(frame.focus).toHaveBeenCalledTimes(1);
  });

  it('focuses only the frame for a read-only editor, whatever it has selected', () => {
    const editor = makeEditor({ hasSelection: true }, someSelection, someParaMarker);
    const frame = { focus: vi.fn() };
    focusEditorKeepingSelection(editor, false, frame);
    expect(editor.focus).not.toHaveBeenCalled();
    expect(frame.focus).toHaveBeenCalledTimes(1);
  });

  it('focuses the frame when the editor is not mounted', () => {
    const frame = { focus: vi.fn() };
    focusEditorKeepingSelection(undefined, true, frame);
    expect(frame.focus).toHaveBeenCalledTimes(1);
  });
});
