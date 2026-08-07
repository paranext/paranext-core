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
