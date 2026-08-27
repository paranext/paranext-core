// @vitest-environment jsdom
/**
 * The caller dropdown, driven against the REAL `Editorial` rather than the mocked one used by
 * footnote-editor.component.test.tsx.
 *
 * The mock cannot see what these pin. A caller change is applied to the popover's editor and the
 * SAVE is what the resulting editor change produces, so with `applyUpdate` stubbed out the chain
 * stops at the first link and every assertion below passes vacuously.
 */
import { describe, it, expect, beforeAll, vi, type MockedFunction } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import type { DeltaOpInsertNoteEmbed } from '@eten-tech-foundation/platform-editor';
import { renderPopoverAndWaitForInit } from './footnote-editor.test-harness';

// cmdk and Radix instantiate a ResizeObserver and schedule scrollTo/scrollIntoView on mount;
// jsdom ships none of these.
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
  if (typeof globalThis.ResizeObserver === 'undefined')
    globalThis.ResizeObserver = NoopResizeObserver;
  if (typeof Element.prototype.scrollTo !== 'function') Element.prototype.scrollTo = () => {};
  if (typeof Element.prototype.scrollIntoView !== 'function')
    Element.prototype.scrollIntoView = () => {};
});

const editableView = { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } as const;

type OnChange = (noteOps: DeltaOpInsertNoteEmbed[]) => void;

/** Every caller the popover reported to the host, in the order it reported them. */
function reportedCallers(onChange: MockedFunction<OnChange>): (string | undefined)[] {
  return onChange.mock.calls.map(([ops]) => ops[0]?.insert?.note?.caller);
}

async function pickHiddenCaller() {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onChange: MockedFunction<OnChange> = vi.fn();
  await renderPopoverAndWaitForInit(editableView, { onChange });
  onChange.mockClear();

  await user.click(screen.getByRole('button', { name: /callerDropdown/i }));
  // Choosing an item also CLOSES the menu, and the close is what commits the selection.
  await user.click(screen.getByRole('menuitemcheckbox', { name: /hidden/i }));
  await new Promise((resolve) => {
    setTimeout(resolve, 50);
  });
  return { onChange };
}

describe('footnote caller dropdown', () => {
  it('reports the caller the user picked, exactly once', async () => {
    // Two separate defects met here. The commit runs from the menu's close handler and picking an
    // item closes the menu, so the state update and the close landed in one React batch and the
    // handler's closure still held the PREVIOUS selection — every pick committed the value it was
    // replacing. And the save re-derived the caller from this component's React state on the way
    // out, so even a corrected pick could be written back stale by a save triggered from inside
    // the same batch. The caller now lives in the editor and is read back from it, which is why
    // one pick produces one report and it carries the picked value.
    const { onChange } = await pickHiddenCaller();

    expect(reportedCallers(onChange)).toEqual(['-']);
  });

  it('shows the new caller in the note the popover is editing', async () => {
    // In editable marker mode the caller is TEXT rendered from the note node's own caller state,
    // so a change the editor never sees is invisible however correctly it reaches the host.
    await pickHiddenCaller();

    const editorInput = document.querySelector('.editor-input');
    expect(editorInput?.textContent).toContain('-');
    expect(editorInput?.textContent).not.toContain('+');
  });
});
