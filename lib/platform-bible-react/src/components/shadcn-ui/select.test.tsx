// @vitest-environment jsdom
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';

beforeAll(installNoopResizeObserver);

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderOpenSelect() {
  render(
    <Select defaultOpen defaultValue="one">
      <SelectTrigger aria-label="fruit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one">one</SelectItem>
        <SelectItem value="two">two</SelectItem>
      </SelectContent>
    </Select>,
  );
  return screen.getByRole('combobox', { name: 'fruit', hidden: true });
}

function blurWindow() {
  act(() => {
    window.dispatchEvent(new Event('blur'));
  });
}

/** Lets FocusScope's close-auto-focus timer run. */
async function waitForCloseAutoFocus() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('SelectContent close focus', () => {
  it('does not refocus its trigger after a window-blur close inside an unfocused web view', async () => {
    vi.stubGlobal('top', {});
    const trigger = renderOpenSelect();
    await screen.findByRole('listbox');
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);

    blurWindow();

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    await waitForCloseAutoFocus();
    expect(document.activeElement).not.toBe(trigger);
  });

  it('returns focus to its trigger after Escape in a focused document', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const trigger = renderOpenSelect();
    await screen.findByRole('listbox');

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    await waitForCloseAutoFocus();
    expect(trigger).toHaveFocus();
  });

  it('returns focus to its trigger after an alt-tab in the main document', async () => {
    const trigger = renderOpenSelect();
    await screen.findByRole('listbox');
    vi.spyOn(document, 'hasFocus').mockReturnValue(false);

    blurWindow();

    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    await waitForCloseAutoFocus();
    expect(trigger).toHaveFocus();
  });
});
