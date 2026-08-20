import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { afterEach, beforeAll, expect, test, vi } from 'vitest';
import { FootnoteList } from './footnote-list.component';

const footnotes: MarkerObject[] = [
  {
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [
      { type: 'char', marker: 'fr', content: ['1.1'] },
      { type: 'char', marker: 'ft', content: ['First note'] },
    ],
  },
  {
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [
      { type: 'char', marker: 'fr', content: ['1.2'] },
      { type: 'char', marker: 'ft', content: ['Second note'] },
    ],
  },
  {
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [
      { type: 'char', marker: 'fr', content: ['1.3'] },
      { type: 'char', marker: 'ft', content: ['Third note'] },
    ],
  },
];

beforeAll(() => {
  // jsdom does not implement scrollIntoView, and the list calls it whenever the selection changes.
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('scrolls the row of a newly selected footnote just far enough to reveal it', () => {
  const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView');
  const { rerender } = render(<FootnoteList footnotes={footnotes} listId="notes" />);

  expect(scrollIntoView).not.toHaveBeenCalled();

  // The host drives selection from outside the list — e.g. clicking a note caller in the editor.
  rerender(<FootnoteList footnotes={footnotes} listId="notes" selectedFootnote={footnotes[2]} />);

  // `block: 'nearest'` leaves an already-visible row where it is instead of recentering it.
  expect(scrollIntoView).toHaveBeenCalledExactlyOnceWith({ block: 'nearest' });
  expect(scrollIntoView.mock.contexts[0]).toBe(screen.getAllByRole('option')[2]);
});

test('leaves keyboard focus alone when the selection changes', () => {
  // The gesture that changes the selection happens in the editor, so pulling focus into the list
  // would interrupt the typing that is already underway. The stand-in input is where focus must
  // stay.
  const { rerender } = render(
    <>
      <input data-testid="editor" />
      <FootnoteList footnotes={footnotes} listId="notes" />
    </>,
  );
  const editor = screen.getByTestId('editor');
  editor.focus();

  rerender(
    <>
      <input data-testid="editor" />
      <FootnoteList footnotes={footnotes} listId="notes" selectedFootnote={footnotes[2]} />
    </>,
  );

  expect(editor).toHaveFocus();
  expect(screen.getAllByRole('option')[2]).not.toHaveFocus();
});

test('moves keyboard focus into the list on ArrowDown', () => {
  // The contrast that makes the rule above a deliberate divergence rather than an oversight: the
  // list's own arrow-key navigation does take focus, because that gesture starts in the list.
  render(<FootnoteList footnotes={footnotes} listId="notes" />);

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

  expect(screen.getAllByRole('option')[0]).toHaveFocus();
});
