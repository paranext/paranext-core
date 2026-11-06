// @vitest-environment jsdom
// jsdom, not this package's default node environment: the settle is observed through the
// document's real focus.

import type { EditorOptions, ViewOptions } from '@eten-tech-foundation/platform-editor';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getPaneRowEditorOptions,
  PaneNoteEditRequestSteps,
  runPaneNoteEditRequest,
  settleRowEditorBeforeClose,
} from './pane-row-editor.utils';

describe('getPaneRowEditorOptions', () => {
  const rowViewOptions: ViewOptions = {
    markerMode: 'editable',
    noteMode: 'collapsed',
    hasSpacing: true,
    isFormattedFont: true,
  };
  const editorOptions: EditorOptions = {
    isReadonly: false,
    structureProtectionMode: 'protected',
    copyLimit: { maxVerses: 10 },
    view: { ...rowViewOptions, markerMode: 'hidden' },
  };

  it("runs on the pane's view options with structure protection off, keeping the editor's other options", () => {
    // A note has no verse or paragraph structure of its own to protect, and 'protected' claims
    // Enter before the note's own `\fp` handling can run.
    expect(getPaneRowEditorOptions(editorOptions, rowViewOptions)).toEqual({
      ...editorOptions,
      view: rowViewOptions,
      structureProtectionMode: 'off',
    });
  });
});

describe('settleRowEditorBeforeClose', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  /** A row editor whose text box is a real, focusable element */
  function mountRowEditor() {
    const textBox = document.createElement('div');
    textBox.tabIndex = 0;
    document.body.append(textBox);
    let isFocusedAtFlush: boolean | undefined;
    const rowEditor = {
      containsFocus: () => textBox.contains(document.activeElement),
      flushPendingEdits: vi.fn(() => {
        isFocusedAtFlush = textBox.contains(document.activeElement);
      }),
    };
    return { textBox, rowEditor, isFocusedAtFlush: () => isFocusedAtFlush };
  }

  it('releases focus from the row editor before flushing, so the marker under its caret settles too', () => {
    const { textBox, rowEditor, isFocusedAtFlush } = mountRowEditor();
    textBox.focus();
    expect(document.activeElement).toBe(textBox);

    settleRowEditorBeforeClose(rowEditor, document);

    expect(rowEditor.flushPendingEdits).toHaveBeenCalledTimes(1);
    expect(isFocusedAtFlush()).toBe(false);
  });

  it('leaves focus elsewhere alone', () => {
    const { rowEditor } = mountRowEditor();
    const elsewhere = document.createElement('input');
    document.body.append(elsewhere);
    elsewhere.focus();

    settleRowEditorBeforeClose(rowEditor, document);

    expect(rowEditor.flushPendingEdits).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(elsewhere);
  });

  it('does nothing without a row editor', () => {
    expect(() => settleRowEditorBeforeClose(undefined, document)).not.toThrow();
  });
});

describe('runPaneNoteEditRequest', () => {
  function recordingSteps(overrides: Partial<PaneNoteEditRequestSteps> = {}) {
    const calls: string[] = [];
    const steps: PaneNoteEditRequestSteps = {
      isPopoverOpen: false,
      paneEditingIndex: undefined,
      navigateToNote: (index) => calls.push(`navigate ${index}`),
      endPaneNoteEdit: () => calls.push('end row edit'),
      startPaneNoteEdit: (index) => calls.push(`edit ${index}`),
      ...overrides,
    };
    return { calls, steps };
  }

  it('only moves the text to the note while a popover still holds the session', () => {
    // The popover applies its text only on Save, so a row editor opened over it would discard
    // what was typed.
    const { calls, steps } = recordingSteps({ isPopoverOpen: true, paneEditingIndex: 1 });

    runPaneNoteEditRequest(3, steps);

    expect(calls).toEqual(['navigate 3']);
  });

  it('opens the note in the row editor after moving the text to it', () => {
    const { calls, steps } = recordingSteps();

    runPaneNoteEditRequest(3, steps);

    expect(calls).toEqual(['navigate 3', 'edit 3']);
  });

  it('ends a row editor open on another note before reading the new one', () => {
    // A load flushes the outgoing note unsettled, losing a marker rename pending under its caret.
    const { calls, steps } = recordingSteps({ paneEditingIndex: 1 });

    runPaneNoteEditRequest(3, steps);

    expect(calls).toEqual(['end row edit', 'navigate 3', 'edit 3']);
  });
});
