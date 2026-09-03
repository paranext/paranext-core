// @vitest-environment jsdom
/**
 * Pins the `onNoteEdit` contract: the popover reports every USER edit — the auto-save content path
 * and both caller-change paths — to the host, and never reports programmatic initialization (mount
 * / initial content load). Hosts rely on that split to use the callback as a liveness signal for
 * the editing session (the scripture editor web view refreshes its note-session staleness clock
 * with it, so a long live edit in the popover is never reaped as an orphaned session).
 */
import { forwardRef, useImperativeHandle } from 'react';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import FootnoteEditor from './footnote-editor.component';
import {
  buildLocalizedStrings,
  editableView,
  scrRef,
  sentinelNoteOp,
} from './footnote-editor.fixtures';

// cmdk (Command/CommandInput, used by the inline MarkerMenu popover) instantiates a
// ResizeObserver on mount and schedules scrollTo/scrollIntoView; jsdom ships none of these.
// No-op stubs are sufficient since these tests never open that popover.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

/**
 * Mutable holders the stubbed `Editorial` below fills in: the mocked `EditorRef` it exposes via
 * `useImperativeHandle`, and the latest props it was rendered with — capturing `onUsjChange` lets a
 * test play the role of the real editor, which reports the initial content load and every
 * subsequent content change through that callback. Declared with `vi.hoisted` so the `vi.mock`
 * factory (itself hoisted to the top of the file by Vitest) can close over them.
 */
const { mockEditorRefHolder, editorialPropsHolder } = vi.hoisted(() => {
  const propsHolder: { current: { onUsjChange?: (usj: Usj) => void } | undefined } = {
    current: undefined,
  };
  return {
    mockEditorRefHolder: {
      // Placeholder only — every test overwrites this with a full mock (see `renderFootnoteEditor`)
      // before rendering, so the empty object is never actually read as an `EditorRef`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {} as EditorRef,
    },
    editorialPropsHolder: propsHolder,
  };
});

// Replaces the real `Editorial` with a minimal stub that records the `onUsjChange` prop it was
// rendered with (so tests can invoke it the way the real editor does) and forwards whatever
// `EditorRef` mock the test set up in `mockEditorRefHolder.current`.
vi.mock('@eten-tech-foundation/platform-editor', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@eten-tech-foundation/platform-editor')>();
  return {
    ...actual,
    Editorial: forwardRef<EditorRef, { onUsjChange?: (usj: Usj) => void }>(
      ({ onUsjChange }, ref) => {
        useImperativeHandle(ref, () => mockEditorRefHolder.current);
        editorialPropsHolder.current = { onUsjChange };
        return <div className="editor-input" data-testid="popover-editor-input" />;
      },
    ),
  };
});

beforeEach(() => {
  editorialPropsHolder.current = undefined;
});

/**
 * The single-para USJ the popover's editor reports on a change: the wrapper paragraph hosting the
 * note. Exactly one content node, so `handleUsjChange`'s extra-node cleanup never schedules.
 */
const singleParaUsj: Usj = { type: 'USJ', version: '3.1', content: [{ type: 'para' }] };

function renderFootnoteEditor(onNoteEdit: () => void) {
  // EditorRef has many required methods; using a partial mock via type assertion is simpler than
  // stubbing all of them in a test (same rationale as footnote-editor.component.test.tsx).
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockEditorRefHolder.current = {
    focus: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    getUsj: vi.fn(),
    setUsj: vi.fn(),
    applyUpdate: vi.fn(),
    replaceEmbedUpdate: vi.fn(),
    getSelection: vi.fn(),
    setSelection: vi.fn(),
    getElementByKey: vi.fn(),
    commitPendingMarkerEdits: vi.fn(),
    // A fresh clone per read: the save path mutates the returned op's caller in place, and a
    // shared instance would let one test's save leak into another's initial-state snapshot.
    getNoteOps: vi.fn(() => [structuredClone(sentinelNoteOp)]),
    selectNote: vi.fn(),
  } as unknown as EditorRef;

  return render(
    <FootnoteEditor
      noteOps={[sentinelNoteOp]}
      onClose={() => {}}
      scrRef={scrRef}
      noteKey={undefined}
      editorOptions={{ view: editableView }}
      defaultMarkerMenuTrigger={'\\'}
      localizedStrings={buildLocalizedStrings()}
      onNoteEdit={onNoteEdit}
    />,
  );
}

/**
 * Plays the real editor reporting a USJ change (the initial content load, or a later content
 * change) through the captured `onUsjChange` prop.
 */
function reportUsjChange() {
  const onUsjChange = editorialPropsHolder.current?.onUsjChange;
  if (!onUsjChange) throw new Error('Editorial stub captured no onUsjChange prop');
  act(() => onUsjChange(singleParaUsj));
}

describe('FootnoteEditor onNoteEdit', () => {
  it('is NOT invoked by mount or the initial content load', () => {
    const onNoteEdit = vi.fn();
    renderFootnoteEditor(onNoteEdit);

    // The first USJ change after a note loads is the load itself (the init effect's applyUpdate
    // echoing back) — the auto-save path snapshots it and must not report it as a user edit.
    reportUsjChange();

    expect(onNoteEdit).not.toHaveBeenCalled();
  });

  it('is invoked by a content change after the initial load (the auto-save path)', () => {
    const onNoteEdit = vi.fn();
    renderFootnoteEditor(onNoteEdit);
    reportUsjChange(); // the initial content load — snapshotted, not an edit

    reportUsjChange(); // a user content change

    expect(onNoteEdit).toHaveBeenCalledTimes(1);
  });

  it('is invoked by a caller-type change', async () => {
    const user = userEvent.setup();
    const onNoteEdit = vi.fn();
    renderFootnoteEditor(onNoteEdit);

    await user.click(
      screen.getByRole('button', { name: /footnoteEditor_callerDropdown_item_generated/ }),
    );
    // Selecting an item closes the dropdown, and the close is what commits the caller change.
    await user.click(
      await screen.findByRole('menuitemcheckbox', {
        name: /footnoteEditor_callerDropdown_item_hidden/,
      }),
    );

    expect(onNoteEdit).toHaveBeenCalled();
  });

  it('is invoked by a custom-caller change', async () => {
    const user = userEvent.setup();
    const onNoteEdit = vi.fn();
    renderFootnoteEditor(onNoteEdit);

    await user.click(
      screen.getByRole('button', { name: /footnoteEditor_callerDropdown_item_generated/ }),
    );
    await user.click(
      await screen.findByRole('menuitemcheckbox', {
        name: /footnoteEditor_callerDropdown_item_custom/,
      }),
    );
    const callerInput = screen.getByRole('textbox');
    await user.clear(callerInput);
    await user.type(callerInput, 'a');
    expect(onNoteEdit).not.toHaveBeenCalled(); // nothing commits until the dropdown closes
    await user.keyboard('{Enter}'); // commits the custom caller and closes the dropdown

    expect(onNoteEdit).toHaveBeenCalled();
  });
});
