// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';

const footnotes: MarkerObject[] = [
  {
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [{ type: 'char', marker: 'ft', content: ['first note text'] }],
  },
  {
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [{ type: 'char', marker: 'ft', content: ['second note text'] }],
  },
];

describe('FootnoteList edit requests', () => {
  it('calls onFootnoteEditRequested (not onFootnoteSelected) on click when provided', async () => {
    const user = userEvent.setup();
    const onSelected = vi.fn();
    const onEditRequested = vi.fn();
    render(
      <FootnoteList
        footnotes={footnotes}
        listId="t"
        onFootnoteSelected={onSelected}
        onFootnoteEditRequested={onEditRequested}
      />,
    );
    await user.click(screen.getByText('second note text'));
    expect(onEditRequested).toHaveBeenCalledTimes(1);
    expect(onEditRequested).toHaveBeenCalledWith(footnotes[1], 1, 't', 'end'); // jsdom: no caret API -> 'end'
    expect(onSelected).not.toHaveBeenCalled();
  });

  it('falls back to onFootnoteSelected on click when no edit handler is provided', async () => {
    const user = userEvent.setup();
    const onSelected = vi.fn();
    render(<FootnoteList footnotes={footnotes} listId="t" onFootnoteSelected={onSelected} />);
    await user.click(screen.getByText('first note text'));
    expect(onSelected).toHaveBeenCalledWith(footnotes[0], 0, 't');
  });

  it("requests editing at 'end' via keyboard Enter", async () => {
    const user = userEvent.setup();
    const onEditRequested = vi.fn();
    render(
      <FootnoteList footnotes={footnotes} listId="t" onFootnoteEditRequested={onEditRequested} />,
    );
    const rows = screen.getAllByRole('option');
    rows[0].focus();
    await user.keyboard('{Enter}');
    expect(onEditRequested).toHaveBeenCalledWith(footnotes[0], 0, 't', 'end');
  });
});
