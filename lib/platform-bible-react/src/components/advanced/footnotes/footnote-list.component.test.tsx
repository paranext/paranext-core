// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { afterEach, beforeAll, describe, expect, it, test, vi } from 'vitest';
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

const notesWithReferences: MarkerObject[] = [
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
  const { rerender } = render(<FootnoteList footnotes={notesWithReferences} listId="notes" />);

  expect(scrollIntoView).not.toHaveBeenCalled();

  // The host drives selection from outside the list — e.g. clicking a note caller in the editor.
  rerender(
    <FootnoteList
      footnotes={notesWithReferences}
      listId="notes"
      selectedFootnote={notesWithReferences[2]}
    />,
  );

  // `block: 'nearest'` leaves an already-visible row where it is instead of recentering it.
  expect(scrollIntoView).toHaveBeenCalledExactlyOnceWith({ block: 'nearest' });
  expect(scrollIntoView.mock.contexts[0]).toBe(screen.getAllByRole('option')[2]);
});

test('re-reveals the row when the SAME footnote is selected again (fresh selectionRequest)', () => {
  const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView');
  const firstRequest = { index: 2 };
  const { rerender } = render(
    <FootnoteList
      footnotes={notesWithReferences}
      listId="notes"
      selectedFootnote={notesWithReferences[2]}
      selectionRequest={firstRequest}
    />,
  );
  expect(scrollIntoView).toHaveBeenCalledTimes(1);

  // Same footnote, same derived index — only the request identity is new. This models the host's
  // repeat caller click, which promises to re-apply: the user may have scrolled the pane away, so
  // the row must be brought back into view even though nothing derived from the selection changed.
  rerender(
    <FootnoteList
      footnotes={notesWithReferences}
      listId="notes"
      selectedFootnote={notesWithReferences[2]}
      selectionRequest={{ index: 2 }}
    />,
  );

  expect(scrollIntoView).toHaveBeenCalledTimes(2);
  expect(scrollIntoView.mock.contexts[1]).toBe(screen.getAllByRole('option')[2]);
});

test('leaves keyboard focus alone when the selection changes', () => {
  // The gesture that changes the selection happens in the editor, so pulling focus into the list
  // would interrupt the typing that is already underway. The stand-in input is where focus must
  // stay.
  const { rerender } = render(
    <>
      <input data-testid="editor" />
      <FootnoteList footnotes={notesWithReferences} listId="notes" />
    </>,
  );
  const editor = screen.getByTestId('editor');
  editor.focus();

  rerender(
    <>
      <input data-testid="editor" />
      <FootnoteList
        footnotes={notesWithReferences}
        listId="notes"
        selectedFootnote={notesWithReferences[2]}
      />
    </>,
  );

  expect(editor).toHaveFocus();
  expect(screen.getAllByRole('option')[2]).not.toHaveFocus();
});

test('moves keyboard focus into the list on ArrowDown', () => {
  // The contrast that makes the rule above a deliberate divergence rather than an oversight: the
  // list's own arrow-key navigation does take focus, because that gesture starts in the list.
  render(<FootnoteList footnotes={notesWithReferences} listId="notes" />);

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });

  expect(screen.getAllByRole('option')[0]).toHaveFocus();
});

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

describe('FootnoteList row swap', () => {
  it('renders the editor slot in place of the editing row', () => {
    render(
      <FootnoteList
        footnotes={footnotes}
        listId="t"
        editingFootnoteIndex={1}
        renderEditingFootnote={(_footnote, index) => (
          <div data-testid="editor-slot">{`editing ${index}`}</div>
        )}
      />,
    );
    expect(screen.getByTestId('editor-slot')).toHaveTextContent('editing 1');
    expect(screen.queryByText('second note text')).not.toBeInTheDocument(); // display row replaced
    expect(screen.getByText('first note text')).toBeInTheDocument(); // others untouched
  });

  it('marks the editing row with data-state="editing"', () => {
    const { container } = render(
      <FootnoteList
        footnotes={footnotes}
        listId="t"
        editingFootnoteIndex={0}
        renderEditingFootnote={() => <div>editor</div>}
      />,
    );
    const editingRow = container.querySelector('li[data-state="editing"]');
    expect(editingRow).toBeInTheDocument();
  });

  it('does not fire edit requests from clicks inside the editing row', async () => {
    const user = userEvent.setup();
    const onEditRequested = vi.fn();
    render(
      <FootnoteList
        footnotes={footnotes}
        listId="t"
        editingFootnoteIndex={0}
        renderEditingFootnote={() => <div data-testid="editor-slot">editor</div>}
        onFootnoteEditRequested={onEditRequested}
      />,
    );
    await user.click(screen.getByTestId('editor-slot'));
    expect(onEditRequested).not.toHaveBeenCalled();
  });

  it('ignores editingFootnoteIndex without renderEditingFootnote', () => {
    render(<FootnoteList footnotes={footnotes} listId="t" editingFootnoteIndex={0} />);
    expect(screen.getByText('first note text')).toBeInTheDocument();
  });

  it('skips the editing row when navigating with ArrowDown', async () => {
    const user = userEvent.setup();
    const threeFootnotes: MarkerObject[] = [
      ...footnotes,
      {
        type: 'note',
        marker: 'f',
        caller: '+',
        content: [{ type: 'char', marker: 'ft', content: ['third note text'] }],
      },
    ];
    render(
      <FootnoteList
        footnotes={threeFootnotes}
        listId="t"
        editingFootnoteIndex={1}
        renderEditingFootnote={() => <div data-testid="editor-slot">editor</div>}
      />,
    );
    // Only non-editing rows carry role="option"; index 1 (the editing row) is excluded, so
    // rows[0] is footnote 0 and rows[1] is footnote 2. Drive focus via real keyboard navigation
    // (rather than a manual .focus() call) so `focusedIndex` state advances the same way a user's
    // keystrokes would.
    const rows = screen.getAllByRole('option');
    screen.getByRole('listbox').focus();
    await user.keyboard('{ArrowDown}'); // -1 -> 0 (footnote 0)
    expect(rows[0]).toHaveFocus();
    await user.keyboard('{ArrowDown}'); // 0 -> hops over the editing row (1) -> 2 (footnote 2)
    expect(rows[1]).toHaveFocus();
  });

  it('renders the separator after the editing row in vertical layout', () => {
    const { container } = render(
      <FootnoteList
        footnotes={footnotes}
        listId="t"
        layout="vertical"
        editingFootnoteIndex={0}
        renderEditingFootnote={() => <div>editor</div>}
      />,
    );
    const editingRow = container.querySelector('li[data-state="editing"]');
    expect(editingRow?.nextElementSibling).toHaveAttribute('data-slot', 'separator');
  });

  it('does not let ArrowDown from inside the editing row drive list navigation', async () => {
    const user = userEvent.setup();
    const threeFootnotes: MarkerObject[] = [
      ...footnotes,
      {
        type: 'note',
        marker: 'f',
        caller: '+',
        content: [{ type: 'char', marker: 'ft', content: ['third note text'] }],
      },
    ];
    render(
      <FootnoteList
        footnotes={threeFootnotes}
        listId="t"
        selectedFootnote={threeFootnotes[0]}
        editingFootnoteIndex={1}
        renderEditingFootnote={() => <input data-testid="editor-input" />}
      />,
    );
    // Footnote 0 is the initial roving tabIndex target (via selectedFootnote).
    const rows = screen.getAllByRole('option');
    expect(rows[0]).toHaveAttribute('tabindex', '0');

    const editorInput = screen.getByTestId('editor-input');
    editorInput.focus();
    await user.keyboard('{ArrowDown}');

    // The keystroke originated inside the editing row's content, so it must not have driven list
    // navigation: the roving tabIndex must stay put, and focus must stay in the editor input.
    expect(rows[0]).toHaveAttribute('tabindex', '0');
    expect(editorInput).toHaveFocus();
  });
});
