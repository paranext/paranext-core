// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { afterEach, describe, expect, it, test, vi } from 'vitest';
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

/** Focuses itself on mount, the way a real editor swapped into the editing row does. */
function SelfFocusingEditor() {
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return <input data-testid="self-focusing-editor" ref={ref} />;
}

/** A list wired the way a consumer wires it: activating a row opens that row's editor in place. */
function EditOnActivateHarness() {
  const [editingIndex, setEditingIndex] = useState<number | undefined>(undefined);
  return (
    <FootnoteList
      footnotes={notesWithReferences}
      listId="t"
      editingFootnoteIndex={editingIndex}
      onFootnoteEditRequested={(_footnote, index) => setEditingIndex(index)}
      renderEditingFootnote={() => <SelfFocusingEditor />}
    />
  );
}

// The list calls scrollIntoView whenever the selection changes; jsdom lacks it, but vitest.setup.ts
// shims it repo-wide, which is what lets these tests spy on it.
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

test('tabs through every row in order, entering the editing row in its place', async () => {
  // Tab walks the rows themselves rather than stopping once on the list and leaving: a reader
  // going through the notes one by one is the pane's primary keyboard gesture, and the row being
  // edited has to hand its turn to the editor it renders so editing continues from the same key.
  const user = userEvent.setup();
  render(
    <>
      <button type="button">before the list</button>
      <FootnoteList
        footnotes={notesWithReferences}
        listId="notes"
        editingFootnoteIndex={1}
        renderEditingFootnote={() => <input data-testid="editor-input" />}
      />
    </>,
  );
  screen.getByText('before the list').focus();

  // Only non-editing rows carry role="option", so rows[0] is footnote 0 and rows[1] is footnote 2.
  const rows = screen.getAllByRole('option');

  await user.tab();
  expect(rows[0]).toHaveFocus();
  await user.tab();
  expect(screen.getByTestId('editor-input')).toHaveFocus();
  await user.tab();
  expect(rows[1]).toHaveFocus();
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
    // Only non-editing rows carry role="option", so rows[0] is footnote 0 and rows[1] is
    // footnote 2 - the row list navigation would land on, hopping the editing row, if the
    // keystroke drove it.
    const rows = screen.getAllByRole('option');

    const editorInput = screen.getByTestId('editor-input');
    editorInput.focus();
    await user.keyboard('{ArrowDown}');

    // The keystroke originated inside the editing row's content, so it must not have driven list
    // navigation: focus stays in the editor input and never reaches the next row.
    expect(editorInput).toHaveFocus();
    expect(rows[1]).not.toHaveFocus();
  });

  it('does not let an overlay portalled out of the editing row drive list navigation', async () => {
    // An editor in the editing row owns overlays of its own - FootnoteEditor's marker palette is a
    // Radix popover - and those render into `document.body`. React events still bubble through the
    // REACT tree, so they reach the list's key handler with a `target` that is nowhere near the
    // row. List navigation must stay out of their way just as it does for the row itself.
    const user = userEvent.setup();
    render(
      <FootnoteList
        footnotes={notesWithReferences}
        listId="t"
        editingFootnoteIndex={1}
        renderEditingFootnote={() =>
          createPortal(<input data-testid="overlay-input" />, document.body)
        }
      />,
    );
    const rows = screen.getAllByRole('option');
    const overlayInput = screen.getByTestId('overlay-input');
    overlayInput.focus();

    await user.keyboard('{ArrowDown}');

    expect(overlayInput).toHaveFocus();
    expect(rows[0]).not.toHaveFocus();
    expect(rows[1]).not.toHaveFocus();
  });

  it('leaves focus in the editor that opens when a row is activated with Enter', async () => {
    // Enter on a row opens its editor, which focuses itself. The list re-points its arrow-key
    // starting index off the now-unfocusable editing row at the same moment; doing that by moving
    // DOM focus would drop the caret onto the NEXT note the instant the user asked to edit this
    // one.
    const user = userEvent.setup();
    render(<EditOnActivateHarness />);
    screen.getByRole('listbox').focus();
    await user.keyboard('{ArrowDown}{ArrowDown}'); // -> row 1

    await user.keyboard('{Enter}');

    expect(screen.getByTestId('self-focusing-editor')).toHaveFocus();
  });

  it('leaves focus in the editor that opens when a row is activated with a click', async () => {
    const user = userEvent.setup();
    render(<EditOnActivateHarness />);

    await user.click(screen.getByText('Second note'));

    expect(screen.getByTestId('self-focusing-editor')).toHaveFocus();
  });

  it('resumes arrow navigation from the row the user tabbed to', async () => {
    // Every row is its own tab stop, so a reader commonly arrives at a row by Tab rather than by
    // arrowing from the top. The next arrow press has to move relative to THAT row.
    const user = userEvent.setup();
    render(
      <>
        <button type="button">before the list</button>
        <FootnoteList footnotes={notesWithReferences} listId="t" />
      </>,
    );
    const rows = screen.getAllByRole('option');
    screen.getByText('before the list').focus();
    await user.tab();
    await user.tab(); // -> row 1
    expect(rows[1]).toHaveFocus();

    await user.keyboard('{ArrowDown}');

    expect(rows[2]).toHaveFocus();
  });
});

describe('FootnoteList editing-row identity', () => {
  /** Stands in for a row editor: counts its mounts the way a document-load effect would run. */
  function countingEditor(onMount: () => void) {
    function RowEditor() {
      useEffect(onMount, [onMount]);
      return <div data-testid="editor-slot">editor</div>;
    }
    return function renderRow() {
      return <RowEditor />;
    };
  }

  it('keeps the editing row mounted when a note added elsewhere re-mints the list id', () => {
    const onMount = vi.fn();
    const renderEditingFootnote = countingEditor(onMount);
    const { rerender } = render(
      <FootnoteList
        footnotes={footnotes}
        listId={1}
        editingFootnoteIndex={1}
        renderEditingFootnote={renderEditingFootnote}
      />,
    );
    expect(onMount).toHaveBeenCalledTimes(1);

    // A note added ahead of the one being edited: one more note, a new list id (the consumer's
    // signal that the rows are new), and the edited note has moved down a row.
    rerender(
      <FootnoteList
        footnotes={[footnotes[0], ...footnotes]}
        listId={2}
        editingFootnoteIndex={2}
        renderEditingFootnote={renderEditingFootnote}
      />,
    );

    expect(onMount).toHaveBeenCalledTimes(1);
  });

  it('still remints read-only rows when the list id changes', () => {
    const { container, rerender } = render(<FootnoteList footnotes={footnotes} listId={1} />);
    const firstRowBefore = container.querySelectorAll('li[role="option"]')[0];

    rerender(<FootnoteList footnotes={[footnotes[0], ...footnotes]} listId={2} />);

    expect(container.querySelectorAll('li[role="option"]')[0]).not.toBe(firstRowBefore);
  });
});
