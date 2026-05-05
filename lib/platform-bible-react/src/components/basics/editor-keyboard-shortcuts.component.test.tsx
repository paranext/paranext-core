import { MutableRefObject } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { EditorKeyboardShortcuts } from './editor-keyboard-shortcuts.component';

function makeEditorRef(): {
  ref: MutableRefObject<EditorRef | null>;
  undo: ReturnType<typeof vi.fn>;
  redo: ReturnType<typeof vi.fn>;
} {
  const undo = vi.fn();
  const redo = vi.fn();
  // EditorRef has many required methods; using a partial mock via type assertion is simpler than stubbing all of them in a test
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { ref: { current: { undo, redo } as unknown as EditorRef }, undo, redo };
}

function renderWithInput(
  ref: MutableRefObject<EditorRef | null>,
  props: { canUndo?: boolean; canRedo?: boolean } = {},
) {
  // The component queries `.editor-input` inside its wrapper div, so render it as a child.
  const { getByTestId } = render(
    <EditorKeyboardShortcuts editorRef={ref} {...props}>
      <div
        className="editor-input"
        role="textbox"
        aria-label="editor"
        tabIndex={0}
        data-testid="editor-input"
      />
    </EditorKeyboardShortcuts>,
  );
  const editorInput = getByTestId('editor-input');
  editorInput.focus();
  return editorInput;
}

describe('EditorKeyboardShortcuts', () => {
  it('calls undo when Ctrl+Z is pressed and canUndo is true', () => {
    const { ref, undo } = makeEditorRef();
    renderWithInput(ref, { canUndo: true });
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true });
    expect(undo).toHaveBeenCalledTimes(1);
  });

  it('does not call undo when Ctrl+Z is pressed and canUndo is false', () => {
    const { ref, undo } = makeEditorRef();
    renderWithInput(ref, { canUndo: false });
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true });
    expect(undo).not.toHaveBeenCalled();
  });

  it('calls redo when Ctrl+Y is pressed and canRedo is true', () => {
    const { ref, redo } = makeEditorRef();
    renderWithInput(ref, { canRedo: true });
    fireEvent.keyDown(document, { key: 'y', ctrlKey: true });
    expect(redo).toHaveBeenCalledTimes(1);
  });

  it('does not call redo when Ctrl+Y is pressed and canRedo is false', () => {
    const { ref, redo } = makeEditorRef();
    renderWithInput(ref, { canRedo: false });
    fireEvent.keyDown(document, { key: 'y', ctrlKey: true });
    expect(redo).not.toHaveBeenCalled();
  });

  it('calls redo when Ctrl+Shift+Z is pressed and canRedo is true', () => {
    const { ref, redo } = makeEditorRef();
    renderWithInput(ref, { canRedo: true });
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true, shiftKey: true });
    expect(redo).toHaveBeenCalledTimes(1);
  });

  it('does not call undo or redo when editor-input is not focused', () => {
    const { ref, undo, redo } = makeEditorRef();
    const editorInput = renderWithInput(ref, { canUndo: true, canRedo: true });
    editorInput.blur();
    fireEvent.keyDown(document, { key: 'z', ctrlKey: true });
    fireEvent.keyDown(document, { key: 'y', ctrlKey: true });
    expect(undo).not.toHaveBeenCalled();
    expect(redo).not.toHaveBeenCalled();
  });
});
