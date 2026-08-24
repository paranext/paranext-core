// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BookNotAvailableView } from './book-not-available-view.component';

const STRINGS = {
  '%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%': 'Ask your administrator.',
  '%webView_platformScriptureEditor_bookNotAvailable_title%': 'Book not in this project',
  '%webView_platformScriptureEditor_bookNotAvailable_description%': 'Add it with {buttonLabel}.',
  '%webView_platformScriptureEditor_bookNotAvailable_manageBooksButton%': 'Manage books',
  '%webView_platformScriptureEditor_bookNotAvailable_readOnlyTooltip%':
    'This project is read-only. Books cannot be added.',
  '%webView_platformScriptureEditor_bookNotAvailable_syncInProgressTooltip%':
    'Books cannot be added during Send/Receive.',
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('BookNotAvailableView', () => {
  it('renders only the administrator message in Simple mode', () => {
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode={false}
        onOpenManageBooks={vi.fn()}
      />,
    );

    expect(screen.getByText('Ask your administrator.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Manage books' })).not.toBeInTheDocument();
    // The Power-only title must not leak into the Simple rendering.
    expect(screen.queryByText('Book not in this project')).not.toBeInTheDocument();
  });

  it('renders the zero-state with a Manage books button in Power mode when editable', () => {
    render(
      <BookNotAvailableView localizedStrings={STRINGS} isPowerMode onOpenManageBooks={vi.fn()} />,
    );

    expect(screen.getByText('Book not in this project')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Manage books' })).toBeEnabled();
  });

  it('substitutes the button label into the description rather than hardcoding it', () => {
    render(
      <BookNotAvailableView
        localizedStrings={{
          ...STRINGS,
          '%webView_platformScriptureEditor_bookNotAvailable_manageBooksButton%':
            'Administrar libros',
        }}
        isPowerMode
        onOpenManageBooks={vi.fn()}
      />,
    );

    // The one localized spelling of the label reaches BOTH the prose and the control. A regression to
    // an English literal baked into the description string would leave the two disagreeing.
    expect(screen.getByText('Add it with Administrar libros.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Administrar libros' })).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('announces the message region in Simple mode', () => {
      render(
        <BookNotAvailableView
          localizedStrings={STRINGS}
          isPowerMode={false}
          onOpenManageBooks={vi.fn()}
        />,
      );

      // This view REPLACES the editor canvas, so without a live region a screen-reader user gets no
      // notice at all that the content swapped.
      expect(screen.getByRole('status')).toHaveTextContent('Ask your administrator.');
    });

    it('announces the zero-state and gives it a real heading in Power mode', () => {
      render(
        <BookNotAvailableView localizedStrings={STRINGS} isPowerMode onOpenManageBooks={vi.fn()} />,
      );

      expect(screen.getByRole('status')).toHaveTextContent('Book not in this project');
      // `EmptyTitle` renders a div, so the heading has to be nested inside it — this asserts it is
      // actually a heading and not just styled to look like one.
      expect(screen.getByRole('heading', { name: 'Book not in this project' })).toBeInTheDocument();
    });

    it('takes focus when the unmounted editor had it', () => {
      // jsdom reports `document.hasFocus()` as false, which is the "focus is elsewhere" branch — so the
      // focused case has to say so explicitly rather than relying on the default.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      render(
        <BookNotAvailableView localizedStrings={STRINGS} isPowerMode onOpenManageBooks={vi.fn()} />,
      );

      // The editor subtree this replaced was destroyed with focus inside it, so focus would otherwise
      // sit on `body` with no way back into the content.
      expect(screen.getByRole('status')).toHaveFocus();
    });

    it('leaves focus alone when it is outside this document', () => {
      // Navigating to a missing book from the toolbar's book/chapter control must not yank focus out
      // of the control the user is still typing in — that control lives outside this iframe, so this
      // document does not have focus.
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);

      render(
        <BookNotAvailableView localizedStrings={STRINGS} isPowerMode onOpenManageBooks={vi.fn()} />,
      );

      expect(screen.getByRole('status')).not.toHaveFocus();
    });
  });

  it.each([
    ['readOnly', 'This project is read-only. Books cannot be added.'],
    ['syncInProgress', 'Books cannot be added during Send/Receive.'],
  ] as const)(
    'disables the button with the %s reason explained on the wrapper',
    (reason, explanation) => {
      render(
        <BookNotAvailableView
          localizedStrings={STRINGS}
          isPowerMode
          manageBooksDisabledReason={reason}
          onOpenManageBooks={vi.fn()}
        />,
      );

      // The description keeps promising the action, so the disabled button must stay visible and
      // say why it cannot be used.
      expect(screen.getByText('Add it with Manage books.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Manage books' })).toBeDisabled();
      expect(screen.getByLabelText(explanation)).toBeInTheDocument();
    },
  );

  it('does not invoke onOpenManageBooks when the focusable disabled wrapper is clicked', () => {
    const onOpenManageBooks = vi.fn();
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode
        manageBooksDisabledReason="syncInProgress"
        onOpenManageBooks={onOpenManageBooks}
      />,
    );

    // Clicking the DISABLED BUTTON is not the interesting case: jsdom drops those events regardless
    // of wiring, so such a test passes no matter where the handler sits. The reachable target is
    // `DisabledTooltipWrapper`, which becomes a focusable `role="group"` element precisely so the
    // tooltip stays available while disabled — a handler hoisted onto it would fire for real.
    fireEvent.click(
      screen.getByRole('group', { name: 'Books cannot be added during Send/Receive.' }),
    );

    expect(onOpenManageBooks).not.toHaveBeenCalled();
  });

  it('invokes onOpenManageBooks when the button is clicked', () => {
    const onOpenManageBooks = vi.fn();
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode
        onOpenManageBooks={onOpenManageBooks}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Manage books' }));

    expect(onOpenManageBooks).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['Simple', false],
    ['Power', true],
  ])(
    're-announces in %s mode when announcementKey names a different missing book',
    (_mode, isPowerMode) => {
      // No arm's strings name the book, so GEN -> EXO in a project lacking both would otherwise
      // leave a mounted region with byte-identical text: `aria-live` sees no change and the second
      // book is silent. The key is what remounts the region and repairs focus for it.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);

      const { rerender } = render(
        <BookNotAvailableView
          localizedStrings={STRINGS}
          isPowerMode={isPowerMode}
          onOpenManageBooks={vi.fn()}
          announcementKey="projA:GEN"
        />,
      );
      const firstRegion = screen.getByRole('status');
      expect(firstRegion).toHaveFocus();
      // Focus is orphaned again, as it is when the content the user was in gets torn out.
      firstRegion.blur();

      rerender(
        <BookNotAvailableView
          localizedStrings={STRINGS}
          isPowerMode={isPowerMode}
          onOpenManageBooks={vi.fn()}
          announcementKey="projA:EXO"
        />,
      );

      // A NEW region in the DOM is what gives the live region something to announce, and focus has
      // been repaired into it rather than left on the body.
      const secondRegion = screen.getByRole('status');
      expect(secondRegion).not.toBe(firstRegion);
      expect(secondRegion).toHaveFocus();
    },
  );

  it('falls back to the raw key when a string is missing', () => {
    render(<BookNotAvailableView isPowerMode={false} onOpenManageBooks={vi.fn()} />);

    expect(
      screen.getByText('%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%'),
    ).toBeInTheDocument();
  });
});
