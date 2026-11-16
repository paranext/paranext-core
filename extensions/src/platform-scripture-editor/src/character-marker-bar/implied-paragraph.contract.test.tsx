// @vitest-environment jsdom
// Renders the REAL editor with verses outside any paragraph marker (an "implied paragraph", a bare
// `<p>`), because the other character-marker bar tests build that DOM and the editor's state by
// hand. Checks what the bar and its menu rely on: the bar can anchor to the block holding the
// caret, and the editor reports `p` for it so the menu offers body-text character markers.
import { describe, expect, it, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { Editorial } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { polyfillRangeBoundingClientRect } from '../jsdom-range-rect.test-utils';
import { resolveActiveLineRect } from './character-marker-bar.utils';

const impliedParagraphUsj: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'JDT' },
    { type: 'chapter', marker: 'c', number: '1' },
    { type: 'verse', marker: 'v', number: '1' },
    'this has text',
  ],
};

// `resolveActiveLineRect` reads the caret's Range rect.
polyfillRangeBoundingClientRect();

/**
 * Renders the real editor, editable, and puts the caret inside the verse text.
 *
 * @param onStateChange Spy for the editor's state snapshots
 * @returns The editor's content root and the text node holding the caret
 */
async function renderWithCaretInVerseText(
  onStateChange: ReturnType<typeof vi.fn>,
): Promise<{ editorRoot: HTMLElement; verseText: Text }> {
  const { container } = render(
    <Editorial
      defaultUsj={impliedParagraphUsj}
      options={{ hasSpellCheck: false }}
      onStateChange={onStateChange}
    />,
  );
  await waitFor(() => expect(container.textContent).toContain('this has text'));
  const editorRoot = container.querySelector<HTMLElement>('.editor-input');
  if (!editorRoot) throw new Error('expected the editor content root');

  const walker = document.createTreeWalker(editorRoot, NodeFilter.SHOW_TEXT);
  let verseText: Text | undefined;
  while (!verseText && walker.nextNode()) {
    const node = walker.currentNode;
    if (node instanceof Text && node.data.includes('this has text')) verseText = node;
  }
  if (!verseText) throw new Error('expected the verse text node');

  const selection = window.getSelection();
  if (!selection) throw new Error('jsdom provided no Selection');
  const range = document.createRange();
  range.setStart(verseText, 4);
  range.collapse(true);
  await act(async () => {
    editorRoot.focus();
    selection.removeAllRanges();
    selection.addRange(range);
    document.dispatchEvent(new Event('selectionchange'));
  });

  return { editorRoot, verseText };
}

describe('the character-marker bar against the real editor, in verses outside any paragraph marker', () => {
  it('anchors the bar to the block holding verses outside any paragraph marker', async () => {
    const { editorRoot, verseText } = await renderWithCaretInVerseText(vi.fn());

    const activeLine = resolveActiveLineRect(window.getSelection() ?? undefined, editorRoot);

    expect(activeLine?.block.contains(verseText)).toBe(true);
  });

  it('reports p as the block marker for a caret in verses outside any paragraph marker', async () => {
    const onStateChange = vi.fn();
    await renderWithCaretInVerseText(onStateChange);

    await waitFor(() =>
      expect(onStateChange).toHaveBeenLastCalledWith(expect.objectContaining({ blockMarker: 'p' })),
    );
  });
});
