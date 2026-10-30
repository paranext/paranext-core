// @vitest-environment jsdom
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { FootnoteCallerDropdown } from './footnote-caller-dropdown.component';
import { buildLocalizedStrings } from './footnote-editor.fixtures';

beforeAll(() => {
  installNoopResizeObserver();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  Reflect.deleteProperty(document, 'activeElement');
  document.querySelectorAll('iframe').forEach((iframe) => iframe.remove());
});

/** Opens the menu, chooses Custom and types `x`, leaving a pending caller to commit on close. */
async function openAndTypePendingCaller(
  user: ReturnType<typeof userEvent.setup>,
  updateCaller: (type: string, custom: string) => void,
  focusNoteText: () => void,
) {
  render(
    <FootnoteCallerDropdown
      callerType="generated"
      customCaller=""
      updateCaller={updateCaller}
      localizedStrings={buildLocalizedStrings()}
      focusNoteText={focusNoteText}
    />,
  );
  await user.click(screen.getByRole('button'));
  await screen.findByRole('menu');
  const row = screen.getByRole('menuitemcheckbox', { name: /custom/i });
  await user.click(row);
  await user.type(within(row).getByRole('textbox'), 'x');
}

/** Lets FocusScope's close-auto-focus timer run. */
async function flushCloseAutoFocus() {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

describe('FootnoteCallerDropdown focus after a close that commits a caller', () => {
  it('does not move focus to the note text after a window-blur close into another frame', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const updateCaller = vi.fn();
    const focusNoteText = vi.fn();
    await openAndTypePendingCaller(user, updateCaller, focusNoteText);

    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    Object.defineProperty(document, 'activeElement', { configurable: true, get: () => iframe });

    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await flushCloseAutoFocus();

    expect(updateCaller).toHaveBeenCalledWith('custom', 'x');
    expect(focusNoteText).not.toHaveBeenCalled();
  });

  it('does not move focus to the note text after a window-blur close inside an unfocused web view', async () => {
    vi.stubGlobal('top', {});
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const updateCaller = vi.fn();
    const focusNoteText = vi.fn();
    await openAndTypePendingCaller(user, updateCaller, focusNoteText);

    vi.spyOn(document, 'hasFocus').mockReturnValue(false);
    act(() => {
      window.dispatchEvent(new Event('blur'));
    });
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await flushCloseAutoFocus();

    expect(updateCaller).toHaveBeenCalledWith('custom', 'x');
    expect(focusNoteText).not.toHaveBeenCalled();
  });

  it('moves focus to the note text after Enter commits the caller', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const updateCaller = vi.fn();
    const focusNoteText = vi.fn();
    await openAndTypePendingCaller(user, updateCaller, focusNoteText);

    await user.keyboard('{Enter}');
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await flushCloseAutoFocus();

    expect(updateCaller).toHaveBeenCalledWith('custom', 'x');
    expect(focusNoteText).toHaveBeenCalledTimes(1);
  });
});
