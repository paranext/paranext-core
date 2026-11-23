// @vitest-environment jsdom
// A copy whose selection is dragged from one Text Collection cell into another belongs to neither
// cell's editor, so neither editor's own copy handling claims it. This pins that such a copy is
// still shortened, with the real editor in each cell rather than a stand-in.
import '@testing-library/jest-dom';
import { Editorial } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ResourceCellView } from './resource-cell-view.component';

const localizedStrings = {};

function chapterUsj(text: string): Usj {
  return {
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'book', marker: 'id', code: 'GEN' },
      { type: 'chapter', marker: 'c', number: '1' },
      { type: 'para', marker: 'p', content: [{ type: 'verse', marker: 'v', number: '1' }, text] },
    ],
  };
}

const FIRST_TEXT = 'In the beginning God created the heavens and the earth.';
const SECOND_TEXT = 'Now the earth was formless and empty.';

function Cell({ label, text, copyLimit }: { label: string; text: string; copyLimit: number }) {
  return (
    <ResourceCellView
      state="ready"
      zoomArea={`resource-${label}`}
      label={label}
      textDirection="ltr"
      localizedStrings={localizedStrings}
      copyLimit={copyLimit}
      editor={<Editorial defaultUsj={chapterUsj(text)} options={{ isReadonly: true, copyLimit }} />}
    />
  );
}

/** The text node holding `text`, once the editor has rendered it. */
async function findTextNode(container: HTMLElement, text: string): Promise<Text> {
  let found: Text | undefined;
  await waitFor(() => {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode())
      if (node.textContent?.includes(text) && node instanceof Text) found = node;
    expect(found).toBeDefined();
  });
  if (!found) throw new Error(`"${text}" was not rendered`);
  return found;
}

/**
 * Fires a copy the way a browser does for a selection in read-only content: at the page, not at
 * either editor. Returns what was written to the clipboard and whether the copy was claimed.
 */
function copyAtPage() {
  const setData = vi.fn<(format: string, data: string) => void>();
  const event = new Event('copy', { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'clipboardData', { value: { setData, clearData: vi.fn() } });
  document.body.dispatchEvent(event);
  return { setData, isCancelled: event.defaultPrevented };
}

afterEach(() => {
  window.getSelection()?.removeAllRanges();
});

describe('ResourceCellView copy across cells', () => {
  it('shortens a copy whose selection runs from one cell into another', async () => {
    const { container } = render(
      <div>
        <Cell label="WEB" text={FIRST_TEXT} copyLimit={12} />
        <Cell label="KJV" text={SECOND_TEXT} copyLimit={20} />
      </div>,
    );
    const firstNode = await findTextNode(container, FIRST_TEXT);
    const secondNode = await findTextNode(container, SECOND_TEXT);

    const selection = window.getSelection();
    if (!selection) throw new Error('no selection');
    selection.setBaseAndExtent(firstNode, 0, secondNode, secondNode.length);
    // A positive control: the selection covers more than either limit allows.
    expect(selection.toString().length).toBeGreaterThan(20);

    const { setData, isCancelled } = copyAtPage();

    expect(isCancelled).toBe(true);
    expect(setData).toHaveBeenCalled();
    const [format, text] = setData.mock.lastCall ?? [];
    expect(format).toBe('text/plain');
    // The smaller of the two cells' limits wins, and the copy keeps the start of the selection.
    expect(text).toBe(FIRST_TEXT.slice(0, 12));
  });
});
