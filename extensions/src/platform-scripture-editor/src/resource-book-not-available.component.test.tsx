// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ResourceBookNotAvailable } from './resource-book-not-available.component';

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

      expect(screen.getByRole('status')).toHaveFocus();
    });

    it('leaves focus alone when it is outside this document', () => {
      // Navigating to a missing book from the toolbar's book/chapter control must not yank focus out
      // of the control the user is still using — that control lives outside this iframe, so this
      // document does not have focus.
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      render(<ResourceBookNotAvailable message={MESSAGE} />);

      expect(screen.getByRole('status')).not.toHaveFocus();
    });
  });
});
