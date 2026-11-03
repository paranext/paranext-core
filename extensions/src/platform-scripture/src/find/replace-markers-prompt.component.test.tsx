// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MarkerPromptAction, ReplaceMarkersPrompt } from './replace-markers-prompt.component';

const STRINGS = {
  '%general_cancel%': 'Cancel',
  '%general_ok%': 'OK',
  '%webView_find_replace_markersPrompt_confirm%': 'Replace (including markers)',
  '%webView_find_replace_markersPrompt_deletedMarker%': '(deleted)',
  '%webView_find_replace_markersPrompt_message_2%':
    'This match includes the markers shown here. Replacing it deletes the highlighted markers.',
  '%webView_find_replace_markersPrompt_title%': 'Replace text and markers?',
  '%webView_find_replace_skipped_title%': 'Match skipped',
};

const CONFIRM_KEY = '%webView_find_replace_markersPrompt_confirm%';
const MESSAGE = STRINGS['%webView_find_replace_markersPrompt_message_2%'];
const SKIPPED_MESSAGE = 'The text includes only part of a marker, so it will be skipped.';

function renderPrompt(
  action: MarkerPromptAction,
  matchedUsfm = 'the \\nd Lord\\nd* God',
  replacementUsfm = 'X',
) {
  const onDismiss = vi.fn();
  const onConfirm = vi.fn();
  render(
    <ReplaceMarkersPrompt
      action={action}
      matchedUsfm={matchedUsfm}
      replacementUsfm={replacementUsfm}
      skippedMessage={SKIPPED_MESSAGE}
      localizedStrings={STRINGS}
      onDismiss={onDismiss}
      onConfirm={onConfirm}
    />,
  );
  return { onDismiss, onConfirm };
}

/**
 * Lets the dialog finish what it does on a timer: start listening when it opens, focus when it
 * closes.
 */
const settle = () =>
  act(
    () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, 50);
      }),
  );

// Checked against what `platform.alert` and `platform.confirm` give: an alert dialog named by its
// title and described by its message, focus kept inside it, and Escape dismissing it.
describe.each([
  ['asking', 'confirm', 'Replace text and markers?', MESSAGE],
  ['skipping', 'oneEndedMarker', 'Match skipped', SKIPPED_MESSAGE],
] as const)('ReplaceMarkersPrompt when %s', (_mode, action, title, message) => {
  it('is an alert dialog named by its title and described by its message', () => {
    renderPrompt(action);
    expect(
      screen.getByRole('alertdialog', { name: title, description: new RegExp(`^${message}`) }),
    ).toBeVisible();
  });

  it('starts with focus inside the dialog and keeps it there', async () => {
    const user = userEvent.setup();
    renderPrompt(action);
    const dialog = screen.getByRole('alertdialog');
    const buttons = within(dialog).getAllByRole('button');

    expect(dialog.contains(document.activeElement)).toBe(true);
    // Tabbing past every button wraps around rather than leaving the dialog.
    await buttons.reduce((previous) => previous.then(() => user.tab()), Promise.resolve());
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('dismisses on Escape without confirming', async () => {
    const user = userEvent.setup();
    const { onDismiss, onConfirm } = renderPrompt(action);

    await user.keyboard('{Escape}');

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('stays open when a press lands outside it, as the second press of a double-click can', async () => {
    const { onDismiss, onConfirm } = renderPrompt(action);
    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    if (!overlay) throw new Error('The dialog has no overlay to press');
    // The dialog starts listening for outside presses a tick after it opens.
    await settle();

    fireEvent.pointerDown(overlay);
    fireEvent.mouseDown(overlay);
    fireEvent.click(overlay);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(onDismiss).not.toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('keeps the base side margins in a narrow panel and widens only from the small breakpoint', () => {
    renderPrompt(action);
    const { classList } = screen.getByRole('alertdialog');

    expect(classList).toContain('tw:max-w-[calc(100%-2rem)]');
    expect(classList).toContain('tw:sm:max-w-md');
    expect(classList).not.toContain('tw:sm:max-w-sm');
  });
});

describe('ReplaceMarkersPrompt when asking', () => {
  it('ignores the second click of a double-click that lands on Replace (including markers)', () => {
    const { onConfirm } = renderPrompt('confirm');
    const confirm = screen.getByRole('button', { name: STRINGS[CONFIRM_KEY] });

    // The first press opened the prompt; this is the second press of the same double-click.
    fireEvent.click(confirm, { detail: 2 });
    expect(onConfirm).not.toHaveBeenCalled();

    fireEvent.click(confirm, { detail: 1 });
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('confirms from the keyboard, which reports no click count', () => {
    const { onConfirm } = renderPrompt('confirm');

    fireEvent.click(screen.getByRole('button', { name: STRINGS[CONFIRM_KEY] }), { detail: 0 });

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('marks only the markers the replacement deletes, and says so to a screen reader', () => {
    // The replacement puts `\p` back, so only `\v 2` is lost.
    renderPrompt('confirm', 'Abraham.\n\\p\n\\v 2 Abraham', 'Abraham.\n\\p Abraham');
    const dialog = screen.getByRole('alertdialog');

    const deleted = within(dialog).getAllByRole('deletion');
    expect(deleted.map((marker) => marker.textContent)).toEqual(['\\v 2 (deleted)']);
    expect(within(dialog).getByText('\\p')).not.toHaveAttribute('role', 'deletion');
    expect(within(dialog).getByText('\\p').closest('del')).toBeNull();
    expect(dialog).toHaveAccessibleDescription(
      `${MESSAGE} Abraham. \\p \\v 2 (deleted) Abraham`.replace(/\s+/g, ' '),
    );
  });

  it('marks every marker as deleted when the replacement puts none back', () => {
    renderPrompt('confirm', 'the \\nd Lord\\nd* God', 'X');

    expect(
      within(screen.getByRole('alertdialog'))
        .getAllByRole('deletion')
        .map((marker) => marker.textContent),
    ).toEqual(['\\nd (deleted)', '\\nd* (deleted)']);
  });

  it('marks only the extra copy deleted when the replacement keeps one of two identical markers', () => {
    renderPrompt('confirm', 'a\n\\p b\n\\p c', 'a\n\\p c');

    expect(within(screen.getByRole('alertdialog')).getAllByRole('deletion')).toHaveLength(1);
  });
});

/** A results list with a card whose Replace button opens the prompt, as the Find panel has. */
function Harness({ action: openWith }: { action: MarkerPromptAction }) {
  const [action, setAction] = useState<MarkerPromptAction | undefined>(undefined);
  const [isCardShown, setIsCardShown] = useState(true);
  return (
    <>
      <input aria-label="Search" />
      {/* Stands in for the Find results list, which takes focus for its arrow keys. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <div data-testid="results" tabIndex={0}>
        {isCardShown && (
          <button type="button" onClick={() => setAction(openWith)}>
            Replace
          </button>
        )}
      </div>
      <button type="button" onClick={() => setIsCardShown(false)}>
        Remove card
      </button>
      <ReplaceMarkersPrompt
        action={action}
        matchedUsfm={'the \\nd Lord\\nd* God'}
        replacementUsfm="X"
        skippedMessage={SKIPPED_MESSAGE}
        localizedStrings={STRINGS}
        onDismiss={() => setAction(undefined)}
        onConfirm={() => setAction(undefined)}
      />
    </>
  );
}

describe.each([
  ['Cancel', 'confirm', () => screen.getByRole('button', { name: 'Cancel' })],
  [
    'Replace (including markers)',
    'confirm',
    () => screen.getByRole('button', { name: STRINGS[CONFIRM_KEY] }),
  ],
  ['OK', 'oneEndedMarker', () => screen.getByRole('button', { name: 'OK' })],
] as const)('ReplaceMarkersPrompt closed by %s', (_label, action, getCloseButton) => {
  it('hands focus back to the control that opened it', async () => {
    const user = userEvent.setup();
    render(<Harness action={action} />);
    const opener = screen.getByRole('button', { name: 'Replace' });

    await user.click(opener);
    await screen.findByRole('alertdialog');
    await user.click(getCloseButton());
    await settle();

    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(document.activeElement).toBe(opener);
  });
});

describe('ReplaceMarkersPrompt closed by Escape', () => {
  it('hands focus back to the control that opened it', async () => {
    const user = userEvent.setup();
    render(<Harness action="confirm" />);
    const opener = screen.getByRole('button', { name: 'Replace' });

    await user.click(opener);
    await screen.findByRole('alertdialog');
    await user.keyboard('{Escape}');
    await settle();

    expect(document.activeElement).toBe(opener);
  });

  it('hands focus to the list around the opener when the opener is gone', async () => {
    const user = userEvent.setup();
    render(<Harness action="confirm" />);
    await user.click(screen.getByRole('button', { name: 'Replace' }));
    await screen.findByRole('alertdialog');

    // A new search replaces the result cards while the prompt is open.
    fireEvent.click(screen.getByRole('button', { name: 'Remove card', hidden: true }));
    await user.keyboard('{Escape}');
    await settle();

    expect(document.activeElement).toBe(screen.getByTestId('results'));
  });
});
