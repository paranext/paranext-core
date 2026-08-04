// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { forwardRef, useImperativeHandle } from 'react';
import type { DeltaOpInsertNoteEmbed, EditorRef, Usj } from '@eten-tech-foundation/platform-editor';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import type { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';

// ---- Editorial stub harness ------------------------------------------------
// No test in this package renders the real Lexical `Editorial` (heavy, flaky in
// jsdom). We stub only `Editorial`, keeping every other real export
// (isInsertEmbedOpOfType, GENERATOR_NOTE_CALLER, ...) via importOriginal.
// The stub records the latest props so tests can drive onUsjChange, and exposes
// spy functions through the imperative ref the component uses.

const editorRefMock = {
  applyUpdate: vi.fn(),
  getNoteOps: vi.fn(),
  replaceEmbedUpdate: vi.fn(),
  focus: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
};

// Latest props passed to the stubbed Editorial, so tests can invoke callbacks.
const latestEditorialProps: {
  onUsjChange?: (usj: Usj) => void;
} = {};

vi.mock('@eten-tech-foundation/platform-editor', async (importOriginal) => {
  const actual = await importOriginal<object>();
  const EditorialStub = forwardRef<Partial<EditorRef>, { onUsjChange?: (usj: Usj) => void }>(
    (props, ref) => {
      latestEditorialProps.onUsjChange = props.onUsjChange;
      // The component only calls the subset of EditorRef methods in editorRefMock
      useImperativeHandle(ref, () => editorRefMock);
      return <div data-testid="editorial-stub" className="editor-input" />;
    },
  );
  EditorialStub.displayName = 'Editorial';
  return { ...actual, Editorial: EditorialStub };
});
// ----------------------------------------------------------------------------

const scrRef: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

// Localized strings fall back to their keys when missing; empty object is fine for tests.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const localizedStrings = {} as FootnoteEditorLocalizedStrings;

function makeNoteOps(text: string): DeltaOpInsertNoteEmbed[] {
  return [
    {
      insert: {
        note: {
          caller: '+',
          style: 'f',
          contents: {
            ops: [
              { insert: '1.1 ', attributes: { char: { style: 'fr' } } },
              { insert: text, attributes: { char: { style: 'ft' } } },
            ],
          },
        },
      },
    },
  ];
}

function renderEditor(overrides: Partial<Parameters<typeof FootnoteEditor>[0]> = {}) {
  const props = {
    noteOps: makeNoteOps('first'),
    onClose: vi.fn(),
    scrRef,
    noteKey: 'key-1',
    editorOptions: {},
    defaultMarkerMenuTrigger: '\\',
    localizedStrings,
    ...overrides,
  };
  return { ...render(<FootnoteEditor {...props} />), props };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe('FootnoteEditor note loading', () => {
  it('applies noteOps once on mount', async () => {
    vi.useFakeTimers();
    renderEditor();
    await vi.runAllTimersAsync(); // load effect applies ops in a setTimeout(0)
    expect(editorRefMock.applyUpdate).toHaveBeenCalledTimes(1);
  });

  it('does NOT reload when only noteKey changes', async () => {
    vi.useFakeTimers();
    const noteOps = makeNoteOps('stable');
    const { rerender, props } = renderEditor({ noteOps });
    await vi.runAllTimersAsync();
    editorRefMock.applyUpdate.mockClear();

    rerender(<FootnoteEditor {...props} noteOps={noteOps} noteKey="key-2" />);
    await vi.runAllTimersAsync();
    expect(editorRefMock.applyUpdate).not.toHaveBeenCalled();
  });

  it('reloads when noteOps identity changes', async () => {
    vi.useFakeTimers();
    const { rerender, props } = renderEditor();
    await vi.runAllTimersAsync();
    editorRefMock.applyUpdate.mockClear();

    rerender(<FootnoteEditor {...props} noteOps={makeNoteOps('second')} />);
    await vi.runAllTimersAsync();
    expect(editorRefMock.applyUpdate).toHaveBeenCalledTimes(1);
  });
});

describe('FootnoteEditor inline mode', () => {
  // CancelAcceptButtons' cancel button carries aria-label from '%cancelButton_tooltip%',
  // which falls back to the key itself when localizedStrings is empty (verified in
  // cancel-accept-buttons.component.tsx: aria-label={cancelLocalized}).
  const cancelButtonSelector = '[aria-label="%cancelButton_tooltip%"]';

  it('renders Save/Cancel buttons in popover mode (default)', () => {
    const { container } = renderEditor();
    expect(container.querySelector(cancelButtonSelector)).toBeInTheDocument();
  });

  it('does not render Save/Cancel buttons in inline mode', () => {
    const { container } = renderEditor({ inline: true });
    expect(container.querySelector(cancelButtonSelector)).toBeNull();
  });

  it('does not width-lock its container in inline mode', () => {
    const { container } = renderEditor({ inline: true });
    const root = container.querySelector<HTMLElement>('.footnote-editor');
    expect(root?.style.width).toBe('');
  });
});
