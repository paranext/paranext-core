// @vitest-environment jsdom
// A chapter cell finds the verse to scroll to by querying DOM the Scripture editor renders — a
// `span[data-marker="v"][data-number]` per verse, and `.editor-input` as the content root — names
// that belong to `@eten-tech-foundation/platform-editor`, not to this repo. If the editor renamed or
// restructured them the cell would keep rendering but silently stop scrolling, and every other test
// of the finder builds that DOM by hand. So this renders the REAL editor, read-only as the cell
// renders it, and runs the real finder against what it produces.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Editorial } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { findVerseMarkerForVerse } from './reference-scroll.utils';

const chapterUsj: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'JHN' },
    { type: 'chapter', marker: 'c', number: '3' },
    { type: 'para', marker: 's1', content: ['A heading above verse 1'] },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'verse one ',
        { type: 'verse', marker: 'v', number: '14-15' },
        'a bridged pair',
      ],
    },
  ],
};

// jsdom lays nothing out, so every element reports no client rects and the finder would treat each
// marker as hidden. Give every element one, as a browser does for anything with a layout box.
const realGetClientRects = Element.prototype.getClientRects;
beforeEach(() => {
  Object.defineProperty(Element.prototype, 'getClientRects', {
    configurable: true,
    value: () => [new DOMRect()],
  });
});
afterEach(() => {
  Object.defineProperty(Element.prototype, 'getClientRects', {
    configurable: true,
    value: realGetClientRects,
  });
});

/**
 * Renders the real editor the way a Text Collection chapter cell does, once its verses are in.
 *
 * @returns The element the editor rendered into.
 */
async function renderChapter(): Promise<HTMLElement> {
  const { container } = render(
    <Editorial defaultUsj={chapterUsj} options={{ isReadonly: true, hasSpellCheck: false }} />,
  );
  await waitFor(() => expect(container.textContent).toContain('a bridged pair'));
  return container;
}

describe('the chapter finder against the real editor', () => {
  it('finds a verse by its own marker', async () => {
    const container = await renderChapter();

    const marker = findVerseMarkerForVerse(container, 1);

    expect(marker?.tagName).toBe('SPAN');
    expect(marker?.dataset.number).toBe('1');
  });

  it('finds the bridge that covers a verse no marker starts', async () => {
    const container = await renderChapter();

    expect(findVerseMarkerForVerse(container, 15)?.dataset.number).toBe('14-15');
  });

  it('lands verse 0 on the first block of the editor content, above verse 1', async () => {
    const container = await renderChapter();
    const content = container.querySelector('.editor-input');

    const chapterTop = findVerseMarkerForVerse(container, 0);

    expect(content?.firstElementChild).toBeInstanceOf(HTMLElement);
    expect(chapterTop).toBe(content?.firstElementChild);
  });
});
