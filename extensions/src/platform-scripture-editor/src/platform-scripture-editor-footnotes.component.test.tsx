// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { ComponentProps, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FootnotesLayout } from './platform-scripture-editor-footnotes.component';

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn(), debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

// jsdom does not implement ResizeObserver; the pane's ResizablePanelGroup (react-resizable-panels)
// wires one up. A no-op stub keeps the render path from throwing.
beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies runtime contract but not structural
    // typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }

  // jsdom does not implement scrollIntoView; FootnoteList calls it to reveal the selected row
  // whenever a footnote is selected. A no-op stub keeps selection-driven tests from throwing.
  if (typeof Element.prototype.scrollIntoView === 'undefined') {
    Element.prototype.scrollIntoView = vi.fn();
  }
});

// Real web-view state hook stand-in: plain React state keyed by name. Matches
// `UseWebViewStateHook`'s 3-tuple return shape (value, setValue, resetValue) so it satisfies
// `FootnotesLayoutProps['useWebViewState']` structurally.
function useWebViewStateMock<T>(
  _key: string,
  defaultValue: T,
): [T, (stateValue: T) => void, () => void] {
  const [value, setValue] = useState<T>(defaultValue);
  return [value, setValue, () => setValue(defaultValue)];
}

const note = (text: string) => ({
  type: 'note',
  marker: 'f',
  caller: '+',
  content: [
    { type: 'char', marker: 'fr', content: ['1:1 '] },
    { type: 'char', marker: 'ft', content: [text] },
  ],
});
const usjWithTwoNotes: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['Test'] },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1' },
        'a ',
        note('alpha'),
        ' b ',
        note('beta'),
      ],
    },
  ],
};
/** A one-paragraph chapter holding a note per text, in order. */
function usjWithNotes(...texts: string[]): Usj {
  return {
    ...usjWithTwoNotes,
    content: [
      usjWithTwoNotes.content[0],
      usjWithTwoNotes.content[1],
      {
        type: 'para',
        marker: 'p',
        content: [{ type: 'verse', marker: 'v', number: '1' }, ...texts.map(note)],
      },
    ],
  };
}
const localizedStrings = {
  '%webView_footnoteList_close%': 'Close footnotes pane',
  '%webView_footnoteList_empty%': 'This chapter has no footnotes.',
};

function renderPane(overrides: Partial<ComponentProps<typeof FootnotesLayout>> = {}) {
  const { children = <div data-testid="editor" />, ...rest } = overrides;
  return render(
    <FootnotesLayout
      usj={usjWithTwoNotes}
      showMarkers
      useWebViewState={useWebViewStateMock}
      localizedStrings={localizedStrings}
      onClose={() => {}}
      {...rest}
    >
      {children}
    </FootnotesLayout>,
  );
}

describe('FootnotesLayout close button', () => {
  it('renders a close button labeled from localized strings that calls onClose', () => {
    const onClose = vi.fn();
    renderPane({ onClose });
    fireEvent.click(screen.getByRole('button', { name: 'Close footnotes pane' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('floats over the list instead of taking a row above it', () => {
    renderPane();
    const closeButton = screen.getByRole('button', { name: 'Close footnotes pane' });
    // Absolutely positioned: it is out of flow, so the pane spends all of its height on notes.
    expect(closeButton.className).toContain('tw:absolute');
    // And it is a sibling of the list rather than sitting in a strip above it, so nothing in the
    // pane's layout reserves room for it.
    expect(closeButton.parentElement?.querySelector('[role="listbox"]')).toBeTruthy();
  });

  it('takes the first turn in the pane, ahead of the notes', async () => {
    const user = userEvent.setup();
    renderPane();
    const closeButton = screen.getByRole('button', { name: 'Close footnotes pane' });
    const pane = closeButton.parentElement;
    if (!pane) throw new Error('close button is not inside the pane');
    const rows = screen.getAllByRole('option');

    // The close button is rendered before the list, so it is the pane's first tab stop even though
    // it floats over the list's top corner - dismissing the pane is one press from entering it.
    const paneTabStops = [...pane.querySelectorAll<HTMLElement>('button, [tabindex]')].filter(
      (element) => element.tabIndex >= 0,
    );
    expect(paneTabStops[0]).toBe(closeButton);

    // And from there Tab reads down the notes one at a time.
    closeButton.focus();
    await user.tab();
    expect(rows[0]).toHaveFocus();
    await user.tab();
    expect(rows[1]).toHaveFocus();
  });
});

describe('FootnotesLayout reporting that the user left the pane', () => {
  it('reports a move to another element in this document', () => {
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      children: (
        <button type="button" data-testid="text">
          text
        </button>
      ),
    });
    screen.getAllByRole('option')[0].focus();
    screen.getByTestId('text').focus();
    expect(onPaneFocusLeft).toHaveBeenCalledTimes(1);
  });

  it('stays silent when focus leaves the document entirely', () => {
    const onPaneFocusLeft = vi.fn();
    const onPaneFocusChange = vi.fn();
    renderPane({ onPaneFocusLeft, onPaneFocusChange });
    const row = screen.getAllByRole('option')[0];
    row.focus();
    // What a marker palette rendered in the host frame (outside this web view's iframe) looks like
    // from in here, and what the window losing focus looks like: a blur with no related target.
    // The user has not moved off the row editor, so the session must survive it — even though the
    // pane does report that it no longer holds focus.
    // eslint-disable-next-line no-null/no-null
    fireEvent.blur(row, { relatedTarget: null });
    expect(onPaneFocusChange).toHaveBeenLastCalledWith(false);
    expect(onPaneFocusLeft).not.toHaveBeenCalled();
  });

  it('stays silent while focus moves into an overlay the row editor opened', () => {
    // The row editor's note-type and caller dropdowns and its marker menu all render through a
    // React portal at `document.body` (shadcn's `dropdown-menu.tsx` / `popover.tsx` wrap their
    // content in a Radix `Portal`), so they are outside the pane's DOM even though the pane is
    // what put them on screen. Reporting that as leaving the pane ends the editing session, which
    // unmounts the very overlay the user just opened - the controls would be unusable.
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => (
        <>
          <input data-testid="row-editor" />
          {createPortal(
            <div data-slot="dropdown-menu-content">
              <button type="button" data-testid="overlay-item">
                Cross-reference
              </button>
            </div>,
            document.body,
          )}
        </>
      ),
    });
    screen.getByTestId('row-editor').focus();

    screen.getByTestId('overlay-item').focus();

    expect(onPaneFocusLeft).not.toHaveBeenCalled();
  });

  it('still reports a move to an unrelated element rendered at the document root', () => {
    // The overlay exemption above is scoped to overlay CONTENT, so clicking something else that
    // happens to live outside the pane's subtree is still the user moving on.
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => (
        <>
          <input data-testid="row-editor" />
          {createPortal(
            <button type="button" data-testid="plain-portal">
              elsewhere
            </button>,
            document.body,
          )}
        </>
      ),
    });
    screen.getByTestId('row-editor').focus();

    screen.getByTestId('plain-portal').focus();

    expect(onPaneFocusLeft).toHaveBeenCalledTimes(1);
  });

  // A click on another panel or the tab strip takes focus out of this document (a blur with no
  // related target, which ends nothing); coming back by clicking into the text is the move on.
  it('reports a return to the text after focus first left the document', () => {
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      children: (
        <button type="button" data-testid="text">
          text
        </button>
      ),
    });
    const row = screen.getAllByRole('option')[0];
    row.focus();
    // A blur with no related target is what focus leaving the document looks like from in here.
    // eslint-disable-next-line no-null/no-null
    fireEvent.blur(row, { relatedTarget: null });
    expect(onPaneFocusLeft).not.toHaveBeenCalled();

    screen.getByTestId('text').focus();

    expect(onPaneFocusLeft).toHaveBeenCalledWith(screen.getByTestId('text'));
  });

  // The marker palette renders in the host frame, outside this document: opening it takes focus out
  // of the document, and closing it hands focus back to the row editor.
  it('keeps the session through the marker palette opening and closing', () => {
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => <input data-testid="row-editor" />,
    });
    const rowEditor = screen.getByTestId('row-editor');
    rowEditor.focus();
    // A blur with no related target is what focus leaving the document looks like from in here.
    // eslint-disable-next-line no-null/no-null
    fireEvent.blur(rowEditor, { relatedTarget: null });

    fireEvent.focusIn(rowEditor);

    expect(onPaneFocusLeft).not.toHaveBeenCalled();
  });

  // An overlay is portalled outside the pane, so its own blur never reaches the pane.
  it('reports a move out of an overlay the row editor opened', () => {
    const onPaneFocusLeft = vi.fn();
    const onPaneFocusChange = vi.fn();
    renderPane({
      onPaneFocusLeft,
      onPaneFocusChange,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => (
        <>
          <input data-testid="row-editor" />
          {createPortal(
            <div data-slot="popover-content">
              <button type="button" data-testid="overlay-item">
                comment
              </button>
            </div>,
            document.body,
          )}
        </>
      ),
      children: (
        <button type="button" data-testid="text">
          text
        </button>
      ),
    });
    screen.getByTestId('row-editor').focus();
    screen.getByTestId('overlay-item').focus();
    expect(onPaneFocusLeft).not.toHaveBeenCalled();

    screen.getByTestId('text').focus();

    expect(onPaneFocusLeft).toHaveBeenCalledTimes(1);
    expect(onPaneFocusChange).toHaveBeenLastCalledWith(false);
  });

  // The editor's right-click menu is portalled like the dropdowns, and its items take focus.
  it("stays silent while focus moves into the row editor's right-click menu", () => {
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => (
        <>
          <input data-testid="row-editor" />
          {createPortal(
            <div className="typeahead-popover">
              <ul>
                <li tabIndex={-1} data-testid="menu-item">
                  Cut
                </li>
              </ul>
            </div>,
            document.body,
          )}
        </>
      ),
    });
    screen.getByTestId('row-editor').focus();

    screen.getByTestId('menu-item').focus();

    expect(onPaneFocusLeft).not.toHaveBeenCalled();
  });

  // Removing the focused element takes focus with it without a blur the pane sees.
  it('reports losing focus when the focused row editor goes away', () => {
    const onPaneFocusChange = vi.fn();
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      onPaneFocusChange,
      usj: usjWithTwoNotes,
    };
    const { rerender } = render(
      <FootnotesLayout
        {...props}
        editingFootnoteIndex={1}
        renderEditingFootnote={() => <input data-testid="row-editor" />}
      >
        <div />
      </FootnotesLayout>,
    );
    screen.getByTestId('row-editor').focus();
    expect(onPaneFocusChange).toHaveBeenLastCalledWith(true);

    rerender(
      <FootnotesLayout {...props}>
        <div />
      </FootnotesLayout>,
    );

    expect(onPaneFocusChange).toHaveBeenLastCalledWith(false);
  });

  it('stays silent while focus moves within the pane', () => {
    const onPaneFocusLeft = vi.fn();
    renderPane({
      onPaneFocusLeft,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => <input data-testid="row-editor" />,
    });
    screen.getAllByRole('option')[0].focus();
    screen.getByTestId('row-editor').focus();
    expect(onPaneFocusLeft).not.toHaveBeenCalled();
  });
});

describe('FootnotesLayout editing seam', () => {
  it('renders the supplied editor in the editing row', () => {
    renderPane({
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => <div data-testid="row-editor" />,
    });
    expect(screen.getByTestId('row-editor')).toBeInTheDocument();
  });

  it('forwards a row click as an edit request with the caret position and selects the row', () => {
    const onFootnoteEditRequested = vi.fn();
    const onSelectedFootnoteChange = vi.fn();
    renderPane({ onFootnoteEditRequested, onSelectedFootnoteChange });
    fireEvent.click(screen.getAllByRole('option')[1]);
    expect(onFootnoteEditRequested).toHaveBeenCalledWith(1, expect.anything());
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
  });

  it('reports selection driven by a focus request', () => {
    const onSelectedFootnoteChange = vi.fn();
    const { rerender } = renderPane({ onSelectedFootnoteChange });
    rerender(
      <FootnotesLayout
        usj={usjWithTwoNotes}
        showMarkers
        useWebViewState={useWebViewStateMock}
        localizedStrings={localizedStrings}
        onClose={() => {}}
        onSelectedFootnoteChange={onSelectedFootnoteChange}
        focusRequest={{ index: 0 }}
      >
        <div />
      </FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(0);
  });

  it('reports undefined when the selected note disappears from the USJ', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      onSelectedFootnoteChange,
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} focusRequest={{ index: 1 }}>
        <div />
      </FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);

    const usjWithOneNote: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '1' }, 'a ', note('alpha')],
        },
      ],
    };
    rerender(
      <FootnotesLayout {...props} usj={usjWithOneNote} focusRequest={{ index: 1 }}>
        <div />
      </FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(undefined);
  });
});

describe('FootnotesLayout pane focus reporting', () => {
  it('reports that the pane has focus when a row receives it', () => {
    const onPaneFocusChange = vi.fn();
    renderPane({ onPaneFocusChange });
    screen.getAllByRole('option')[0].focus();
    expect(onPaneFocusChange).toHaveBeenCalledTimes(1);
    expect(onPaneFocusChange).toHaveBeenCalledWith(true);
  });

  it('reports that the pane lost focus when focus moves to the text outside it', () => {
    const onPaneFocusChange = vi.fn();
    renderPane({
      onPaneFocusChange,
      children: (
        <button type="button" data-testid="text">
          text
        </button>
      ),
    });
    screen.getAllByRole('option')[0].focus();
    screen.getByTestId('text').focus();
    expect(onPaneFocusChange).toHaveBeenNthCalledWith(1, true);
    expect(onPaneFocusChange).toHaveBeenNthCalledWith(2, false);
  });

  it('keeps reporting focus while it moves between a row and the row editor inside the pane', () => {
    const onPaneFocusChange = vi.fn();
    renderPane({
      onPaneFocusChange,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => <input data-testid="row-editor" />,
    });
    screen.getAllByRole('option')[0].focus();
    screen.getByTestId('row-editor').focus();
    expect(onPaneFocusChange).toHaveBeenCalledTimes(1);
    expect(onPaneFocusChange).toHaveBeenCalledWith(true);
    // Back the other way: the pane's boundary is crossed in neither direction, so still one report.
    screen.getAllByRole('option')[0].focus();
    expect(onPaneFocusChange).toHaveBeenCalledTimes(1);
    expect(onPaneFocusChange).toHaveBeenCalledWith(true);
  });
});

describe('FootnotesLayout focus request that asks the pane to take focus', () => {
  it('focuses the selected row so the pane owns focus', () => {
    renderPane({ focusRequest: { index: 1 }, focusRowOnFocusRequest: true });
    const rows = screen.getAllByRole('option');
    expect(rows[1]).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(rows[1]);
  });

  it('leaves focus alone for a request that did not ask for it', () => {
    renderPane({ focusRequest: { index: 0 }, onFootnoteEditRequested: () => {} });
    const rows = screen.getAllByRole('option');
    expect(rows[0]).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).not.toBe(rows[0]);
  });
});

describe('FootnotesLayout selection across USJ changes', () => {
  it('keeps the selected row highlighted after an echo that re-creates the same notes', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      onSelectedFootnoteChange,
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} focusRequest={{ index: 1 }}>
        <div />
      </FootnotesLayout>,
    );
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    // The pane's own focus-request resolution (retrying once `footnotes` first populates from an
    // empty mount) transiently reports `undefined` before settling — clear that mount noise so the
    // assertions below observe only what the echo itself does.
    onSelectedFootnoteChange.mockClear();
    // A fresh USJ object with identical content (what a PDP echo looks like over IPC).
    const echo: Usj = JSON.parse(JSON.stringify(usjWithTwoNotes));
    rerender(
      <FootnotesLayout {...props} usj={echo} focusRequest={{ index: 1 }}>
        <div />
      </FootnotesLayout>,
    );
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    expect(onSelectedFootnoteChange).not.toHaveBeenCalledWith(undefined);
  });

  it('leaves the list where the user scrolled it when an update re-creates the selected note', () => {
    const scrollIntoView = vi.spyOn(Element.prototype, 'scrollIntoView');
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      // One request object throughout: only the document changes below.
      focusRequest: { index: 1 },
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes}>
        <div />
      </FootnotesLayout>,
    );
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    scrollIntoView.mockClear();

    const echo: Usj = JSON.parse(JSON.stringify(usjWithTwoNotes));
    rerender(
      <FootnotesLayout {...props} usj={echo}>
        <div />
      </FootnotesLayout>,
    );

    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    expect(scrollIntoView).not.toHaveBeenCalled();
    scrollIntoView.mockRestore();
  });

  it('keeps the editing row selected while its content changes under live-apply', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      onSelectedFootnoteChange,
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => <div data-testid="row-editor" />,
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} focusRequest={{ index: 1 }}>
        <div />
      </FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
    // Same mount noise as above — clear it so the assertions below observe only the live-apply edit.
    onSelectedFootnoteChange.mockClear();
    const edited: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '1' },
            'a ',
            note('alpha'),
            ' b ',
            note('beta typed more'),
          ],
        },
      ],
    };
    rerender(
      <FootnotesLayout {...props} usj={edited} focusRequest={{ index: 1 }}>
        <div />
      </FootnotesLayout>,
    );
    expect(onSelectedFootnoteChange).toHaveBeenLastCalledWith(1);
    expect(onSelectedFootnoteChange).not.toHaveBeenCalledWith(undefined);
    expect(screen.getByTestId('row-editor')).toBeInTheDocument();
  });

  // Ending a session flushes the row editor's last keystrokes, so the row's final content and the
  // end of editing arrive in one update - which must not read as the selected note changing.
  it('keeps the row selected when its editing ends in the same update as its final content', () => {
    const onSelectedFootnoteChange = vi.fn();
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      onSelectedFootnoteChange,
      focusRequest: { index: 1 },
    };
    const { rerender } = render(
      <FootnotesLayout
        {...props}
        usj={usjWithTwoNotes}
        editingFootnoteIndex={1}
        renderEditingFootnote={() => <div data-testid="row-editor" />}
      >
        <div />
      </FootnotesLayout>,
    );
    onSelectedFootnoteChange.mockClear();

    rerender(
      <FootnotesLayout {...props} usj={usjWithNotes('alpha', 'beta typed more')}>
        <div />
      </FootnotesLayout>,
    );

    expect(onSelectedFootnoteChange).not.toHaveBeenCalledWith(undefined);
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
  });
});

describe('FootnotesLayout list identity across USJ changes', () => {
  it("keeps the editing row mounted when only a note's content changes", () => {
    let mounts = 0;
    function RowEditor() {
      useEffect(() => {
        mounts += 1;
      }, []);
      return <div data-testid="row-editor" />;
    }
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      editingFootnoteIndex: 1,
      renderEditingFootnote: () => <RowEditor />,
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes}>
        <div />
      </FootnotesLayout>,
    );
    const rowBefore = screen.getAllByRole('option')[0];
    expect(mounts).toBe(1);
    const edited: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '1' },
            'a ',
            note('alpha'),
            ' b ',
            note('beta typed more'),
          ],
        },
      ],
    };
    rerender(
      <FootnotesLayout {...props} usj={edited}>
        <div />
      </FootnotesLayout>,
    );
    expect(mounts).toBe(1);
    expect(screen.getAllByRole('option')[0]).toBe(rowBefore);
  });

  it('keeps the row editor mounted when a note is added ahead of the edited last row', () => {
    let mounts = 0;
    function RowEditor() {
      useEffect(() => {
        mounts += 1;
      }, []);
      return <div data-testid="row-editor" />;
    }
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
      renderEditingFootnote: () => <RowEditor />,
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes} editingFootnoteIndex={1}>
        <div />
      </FootnotesLayout>,
    );
    expect(mounts).toBe(1);

    // The web view moves the index and publishes the document in the same update.
    rerender(
      <FootnotesLayout
        {...props}
        usj={usjWithNotes('new', 'alpha', 'beta')}
        editingFootnoteIndex={2}
      >
        <div />
      </FootnotesLayout>,
    );

    expect(mounts).toBe(1);
    expect(screen.getByTestId('row-editor')).toBeInTheDocument();
  });

  it('remounts the rows when a note is added or removed', () => {
    const props = {
      showMarkers: true,
      useWebViewState: useWebViewStateMock,
      localizedStrings,
      onClose: () => {},
    };
    const { rerender } = render(
      <FootnotesLayout {...props} usj={usjWithTwoNotes}>
        <div />
      </FootnotesLayout>,
    );
    const rowBefore = screen.getAllByRole('option')[0];
    const withThree: Usj = {
      ...usjWithTwoNotes,
      content: [
        usjWithTwoNotes.content[0],
        usjWithTwoNotes.content[1],
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '1' },
            'a ',
            note('alpha'),
            ' b ',
            note('beta'),
            ' c ',
            note('gamma'),
          ],
        },
      ],
    };
    rerender(
      <FootnotesLayout {...props} usj={withThree}>
        <div />
      </FootnotesLayout>,
    );
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getAllByRole('option')[0]).not.toBe(rowBefore);
  });
});

describe('FootnotesLayout empty state', () => {
  it('says the chapter has no footnotes once it has loaded', () => {
    renderPane({ usj: usjWithNotes() });
    expect(screen.getByRole('status')).toHaveTextContent('This chapter has no footnotes.');
  });

  it('says nothing while the chapter is still loading', () => {
    renderPane({ usj: usjWithNotes(), isLoading: true });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

describe('FootnotesLayout rows under the close button', () => {
  // The button floats over whichever row is scrolled to the top, not only the first one.
  it('reserves trailing room on every row', () => {
    renderPane();
    const wrapper = screen.getByRole('listbox').parentElement;
    expect(wrapper?.className).toContain('tw:[&_li]:pe-7');
  });
});
