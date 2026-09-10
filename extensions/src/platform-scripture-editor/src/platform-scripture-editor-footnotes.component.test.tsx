// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import * as React from 'react';
import { useEffect, useState } from 'react';
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
const localizedStrings = { '%webView_footnoteList_close%': 'Close footnotes pane' };

function renderPane(overrides: Partial<React.ComponentProps<typeof FootnotesLayout>> = {}) {
  return render(
    <FootnotesLayout
      usj={usjWithTwoNotes}
      showMarkers
      useWebViewState={useWebViewStateMock}
      localizedStrings={localizedStrings}
      onClose={() => {}}
      {...overrides}
    >
      <div data-testid="editor" />
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

  it('does not remount the list when a row enters edit mode', () => {
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
    const rowsBefore = screen.getAllByRole('option');
    rerender(
      <FootnotesLayout
        {...props}
        usj={usjWithTwoNotes}
        editingFootnoteIndex={1}
        renderEditingFootnote={() => <div data-testid="row-editor" />}
      >
        <div />
      </FootnotesLayout>,
    );
    // A remount would produce a brand new element for the non-editing row; same node means the
    // USJ-processing effect did not re-run (and therefore did not re-mint `footnoteListKey`) just
    // because `editingFootnoteIndex` changed.
    expect(screen.getAllByRole('option')[0]).toBe(rowsBefore[0]);
    expect(screen.getByTestId('row-editor')).toBeInTheDocument();
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
