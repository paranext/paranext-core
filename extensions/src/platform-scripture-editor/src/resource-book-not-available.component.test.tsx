// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

  it('offers no action, because a resource missing a book has no remedy', () => {
    render(<ResourceBookNotAvailable message={MESSAGE} />);

    // The sibling `BookNotAvailableView` offers "Manage books" because a PROJECT can gain a book. A
    // published resource cannot, in either interface mode — so a button here would promise something
    // impossible.
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
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
