// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { SelectionRange } from '@eten-tech-foundation/platform-editor';
import type { EditorContentSnapshot } from '@/components/advanced/marker-palette-change-guard.util';
import { useMarkerPaletteFocusOutCapture } from './use-marker-palette-focus-out-capture.hook';

const earlierCaret: SelectionRange = { start: { jsonPath: '$.content[1].content[0]', offset: 3 } };
const laterCaret: SelectionRange = { start: { jsonPath: '$.content[4].content[0]', offset: 7 } };

/** What the editor reports as focus leaves it. */
interface EditorReading {
  selection?: SelectionRange;
  selectedParaMarker?: string;
}

/**
 * Mounts the capture over a container holding an `.editor-input`, with `selectionRef` already
 * holding `earlierCaret` from a previous focus-out.
 */
function renderCapture(reading: EditorReading) {
  const container = document.createElement('div');
  const editorInput = document.createElement('div');
  editorInput.className = 'editor-input';
  container.appendChild(editorInput);
  document.body.appendChild(container);

  const editor = {
    getSelection: () => reading.selection,
    getSelectedParaMarker: () => reading.selectedParaMarker,
    getUsj: () => undefined,
  };
  const selectionRef: { current: SelectionRange | undefined } = { current: earlierCaret };
  const baselineRef: { current: EditorContentSnapshot | undefined } = { current: undefined };
  renderHook(() =>
    useMarkerPaletteFocusOutCapture({
      containerRef: { current: container },
      editorRef: { current: editor },
      selectionRef,
      baselineRef,
      isSessionOpen: () => false,
    }),
  );

  const leaveEditor = () =>
    editorInput.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
  return { selectionRef, leaveEditor };
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useMarkerPaletteFocusOutCapture', () => {
  it('captures the caret the user left', () => {
    const { selectionRef, leaveEditor } = renderCapture({ selection: laterCaret });

    leaveEditor();

    expect(selectionRef.current).toBe(laterCaret);
  });

  it('keeps the previous capture when the selection is already gone', () => {
    const { selectionRef, leaveEditor } = renderCapture({});

    leaveEditor();

    expect(selectionRef.current).toBe(earlierCaret);
  });

  it('drops the previous capture when a paragraph marker is selected', () => {
    // A selected gutter marker has no text range. Keeping the older caret would let a later
    // restore move the selection back to a different paragraph and act on it instead.
    const { selectionRef, leaveEditor } = renderCapture({ selectedParaMarker: 'q1' });

    leaveEditor();

    expect(selectionRef.current).toBeUndefined();
  });
});
