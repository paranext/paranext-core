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

/**
 * Arm the Custom row, type `caller` into its field, then click the row again — the gesture that
 * lands on its check, since the check's own indicator is `pointer-events-none` and a click there
 * reaches the row beneath it.
 */
async function commitCustomCallerByClickingTheCheck(caller: string) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onChange: MockedFunction<OnChange> = vi.fn();
  await renderPopoverAndWaitForInit(editableView, { onChange });
  onChange.mockClear();

  await user.click(screen.getByRole('button', { name: /callerDropdown/i }));
  const customRow = screen.getByRole('menuitemcheckbox', { name: /custom/i });
  // The first click only ARMS the row: it selects Custom and focuses the field to type into.
  await user.click(customRow);
  // The field holds a default caller and caps at one character, so it has to be emptied before
  // the new one will land.
  await user.clear(screen.getByRole('textbox'));
  await user.type(screen.getByRole('textbox'), caller);
  // The second click is on the check of an already-selected row — the confirmation.
  await user.click(customRow);
  await new Promise((resolve) => {
    setTimeout(resolve, 50);
  });
  return { onChange, user };
}

describe('footnote caller dropdown, custom caller', () => {
  it('applies the typed caller and closes when the row check is clicked', async () => {
    // Unlike the fixed callers, choosing Custom deliberately keeps the menu open so a caller can
    // be typed, which leaves the row's own check as the confirmation. Enter already commits this
    // way (see the dropdown's key handling), so the check performing the same commit is the
    // gesture that was missing rather than a new one.
    const { onChange } = await commitCustomCallerByClickingTheCheck('%');

    expect(reportedCallers(onChange)).toEqual(['%']);
    expect(screen.queryByRole('menuitemcheckbox', { name: /custom/i })).not.toBeInTheDocument();
  });

  it('shows the typed caller in the note the popover is editing', async () => {
    await commitCustomCallerByClickingTheCheck('%');

    const editorInput = document.querySelector('.editor-input');
    expect(editorInput?.textContent).toContain('%');
    expect(editorInput?.textContent).not.toContain('+');
  });

  it('keeps the menu open while the field is being used', async () => {
    // Clicking INTO the field is the user reaching for the text, never a confirmation — closing
    // there would make the caller impossible to type.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await renderPopoverAndWaitForInit(editableView, {});

    await user.click(screen.getByRole('button', { name: /callerDropdown/i }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /custom/i }));
    await user.click(screen.getByRole('textbox'));

    expect(screen.getByRole('menuitemcheckbox', { name: /custom/i })).toBeInTheDocument();
  });

  it('applies the typed caller on Enter, the keyboard form of the same commit', async () => {
    // Enter has always been the way to confirm a custom caller, and it runs the same close
    // handler the check now does — so it carries the same requirement: switching to Custom and
    // typing its caller in ONE visit must write that caller, not the type it replaced.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange: MockedFunction<OnChange> = vi.fn();
    await renderPopoverAndWaitForInit(editableView, { onChange });
    onChange.mockClear();

    await user.click(screen.getByRole('button', { name: /callerDropdown/i }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /custom/i }));
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '#');
    await user.keyboard('{Enter}');
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    expect(reportedCallers(onChange)).toEqual(['#']);
  });
});
