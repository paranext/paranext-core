// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FootnoteEditorPopover } from './footnote-editor-popover.component';

afterEach(() => {
  cleanup();
});

const MARKER = `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}]`;

function renderPopover() {
  const getBoundingClientRect = vi.fn(() => new DOMRect(40, 120, 0, 18));
  render(
    <FootnoteEditorPopover open anchorRef={{ current: { getBoundingClientRect } }}>
      <p>Footnote editor</p>
    </FootnoteEditorPopover>,
  );
  const content = screen.getByText('Footnote editor').closest('[data-slot="popover-content"]');
  if (!(content instanceof HTMLElement)) throw new Error('Popover content not found');
  return { content, getBoundingClientRect };
}

describe('FootnoteEditorPopover', () => {
  it('is 500 px wide at least, unless the pane has less room', () => {
    // A plain 500 px minimum would push the popover past a narrow pane.
    const { content } = renderPopover();

    expect(content.style.minWidth).toBe(
      'min(500px, var(--radix-popover-content-available-width, 100vw))',
    );
  });

  it('stays at interface scale: no zoom area inside it or around it', () => {
    const { content } = renderPopover();

    expect(content.closest(MARKER)).toBeNull();
    expect(content.querySelector(MARKER)).toBeNull();
  });

  it('is placed from its live anchor in the text', async () => {
    const { getBoundingClientRect } = renderPopover();

    await waitFor(() => expect(getBoundingClientRect).toHaveBeenCalled());
  });
});
