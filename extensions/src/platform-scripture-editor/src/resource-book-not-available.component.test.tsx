// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID,
  ResourceBookNotAvailable,
} from './resource-book-not-available.component';

const MESSAGE = 'This book does not exist in this Bible text.';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ResourceBookNotAvailable', () => {
  it('renders the message it is given', () => {
    render(<ResourceBookNotAvailable message={MESSAGE} />);

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();
  });

  it('offers no action unless the caller supplies one', () => {
    render(<ResourceBookNotAvailable message={MESSAGE} />);

    // A published resource cannot gain a book in either interface mode, so only a caller that owns a
    // remedy (such as picking a different text) may add a button. The Bible texts panel and the main
    // editor pass none.
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  describe('with an action', () => {
    const ACTION_LABEL = 'Pick model text…';

    it('shows the action as a button under the message and runs it on click', () => {
      const onClick = vi.fn();
      render(
        <ResourceBookNotAvailable message={MESSAGE} action={{ label: ACTION_LABEL, onClick }} />,
      );

      expect(screen.getByText(MESSAGE)).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: ACTION_LABEL }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('announces only the sentence, not the button', () => {
      render(
        <ResourceBookNotAvailable
          message={MESSAGE}
          action={{ label: ACTION_LABEL, onClick: vi.fn() }}
        />,
      );

      const status = screen.getByRole('status');
      expect(status).toHaveTextContent(MESSAGE);
      expect(within(status).queryByRole('button')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: ACTION_LABEL })).toBeInTheDocument();
    });

    it('keeps the top of the message reachable in a panel too short for it', () => {
      render(
        <ResourceBookNotAvailable
          message={MESSAGE}
          action={{ label: ACTION_LABEL, onClick: vi.fn() }}
        />,
      );

      // Plain `justify-center` pushes the top of a too-tall column above the scroll start, out of
      // reach; the safe form falls back to top alignment.
      const wrapper = screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID);
      expect(wrapper).toHaveClass('tw:justify-center-safe', 'tw:overflow-y-auto');
      expect(wrapper).not.toHaveClass('tw:justify-center');
    });

    it('keeps the named, focusable wrapper when an action is shown', () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      render(
        <ResourceBookNotAvailable
          message={MESSAGE}
          action={{ label: ACTION_LABEL, onClick: vi.fn() }}
        />,
      );

      const wrapper = screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID);
      expect(wrapper).toHaveAccessibleName(MESSAGE);
      expect(wrapper).toHaveFocus();
      expect(wrapper).toContainElement(screen.getByRole('button', { name: ACTION_LABEL }));
    });
  });

  describe('accessibility', () => {
    it('gives the focus target an accessible name', () => {
      // A role-less `div` maps to `generic`, which does not support name-from-content — a focused
      // wrapper without a name is announced as "group", or as nothing at all.
      render(<ResourceBookNotAvailable message={MESSAGE} />);

      expect(screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID)).toHaveAccessibleName(MESSAGE);
    });

    it('announces the message region', () => {
      render(<ResourceBookNotAvailable message={MESSAGE} />);

      // This replaces the panel's editor, so without a live region a screen-reader user gets no
      // notice at all that the content swapped.
      expect(screen.getByRole('status')).toHaveTextContent(MESSAGE);
    });

    it('takes focus when the unmounted editor had it', () => {
      // jsdom reports `document.hasFocus()` as false, which is the "focus is elsewhere" branch — so
      // the focused case has to say so explicitly rather than relying on the default.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      render(<ResourceBookNotAvailable message={MESSAGE} />);

      // `role="status"` sits on the `EmptyState` message; the focusable wrapper is its parent.
      expect(screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID)).toHaveFocus();
    });

    it('leaves focus alone when it is outside this document', () => {
      // Navigating to a missing book from the toolbar's book/chapter control must not yank focus out
      // of the control the user is still using — that control lives outside this iframe, so this
      // document does not have focus.
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      render(<ResourceBookNotAvailable message={MESSAGE} />);

      expect(screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID)).not.toHaveFocus();
    });

    it('re-announces when the subject changes while the message stays on screen', () => {
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      const { rerender } = render(
        <ResourceBookNotAvailable message={MESSAGE} announcementKey="ABC:1" />,
      );
      const firstRegion = screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID);
      expect(firstRegion).toHaveFocus();

      // Picking another text that also lacks the book, from the selector this panel keeps mounted.
      rerender(<ResourceBookNotAvailable message={MESSAGE} announcementKey="ABC:2" />);
      const secondRegion = screen.getByTestId(RESOURCE_BOOK_NOT_AVAILABLE_TEST_ID);

      // Node identity is the assertion that matters: the message is byte-identical, so a region that
      // SURVIVES the change keeps focus and announces nothing, and asserting focus alone would pass
      // either way. Remounting is what drops focus to `body` and lets the repair fire again.
      expect(secondRegion).not.toBe(firstRegion);
      expect(secondRegion).toHaveFocus();
    });
  });
});
