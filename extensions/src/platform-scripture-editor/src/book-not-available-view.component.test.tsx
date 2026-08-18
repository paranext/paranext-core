// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BookNotAvailableView } from './book-not-available-view.component';

const STRINGS = {
  '%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%': 'Ask your administrator.',
  '%webView_platformScriptureEditor_bookNotAvailable_title%': 'Book not in this project',
  '%webView_platformScriptureEditor_bookNotAvailable_description%': 'Add it with Manage books.',
  '%webView_platformScriptureEditor_bookNotAvailable_manageBooksButton%': 'Manage books',
  '%webView_platformScriptureEditor_bookNotAvailable_readOnlyTooltip%':
    'This project is read-only. Books cannot be added.',
  '%webView_platformScriptureEditor_bookNotAvailable_markersViewTooltip%':
    'Books cannot be added from the markers view.',
  '%webView_platformScriptureEditor_bookNotAvailable_syncInProgressTooltip%':
    'Books cannot be added during Send/Receive.',
};

describe('BookNotAvailableView', () => {
  it('renders only the administrator message in Simple mode', () => {
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode={false}
        showManageBooksButton={false}
        onOpenManageBooks={vi.fn()}
      />,
    );

    expect(screen.getByText('Ask your administrator.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Manage books' })).not.toBeInTheDocument();
    // The Power-only title must not leak into the Simple rendering.
    expect(screen.queryByText('Book not in this project')).not.toBeInTheDocument();
  });

  it('never offers the button in Simple mode even when the project is editable', () => {
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode={false}
        showManageBooksButton
        onOpenManageBooks={vi.fn()}
      />,
    );

    expect(screen.queryByRole('button', { name: 'Manage books' })).not.toBeInTheDocument();
  });

  it('renders the zero-state with a Manage books button in Power mode when editable', () => {
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode
        showManageBooksButton
        onOpenManageBooks={vi.fn()}
      />,
    );

    expect(screen.getByText('Book not in this project')).toBeInTheDocument();
    expect(screen.getByText('Add it with Manage books.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Manage books' })).toBeEnabled();
  });

  it('omits the button in Power mode when the surface offers no Manage Books action', () => {
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode
        showManageBooksButton={false}
        onOpenManageBooks={vi.fn()}
      />,
    );

    expect(screen.getByText('Book not in this project')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Manage books' })).not.toBeInTheDocument();
  });

  it.each([
    ['readOnly', 'This project is read-only. Books cannot be added.'],
    ['markersView', 'Books cannot be added from the markers view.'],
    ['syncInProgress', 'Books cannot be added during Send/Receive.'],
  ] as const)(
    'disables the button with the %s reason explained on the wrapper',
    (reason, explanation) => {
      render(
        <BookNotAvailableView
          localizedStrings={STRINGS}
          isPowerMode
          showManageBooksButton
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

  it('does not invoke onOpenManageBooks while the action is disabled', () => {
    const onOpenManageBooks = vi.fn();
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode
        showManageBooksButton
        manageBooksDisabledReason="syncInProgress"
        onOpenManageBooks={onOpenManageBooks}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Manage books' }));

    expect(onOpenManageBooks).not.toHaveBeenCalled();
  });

  it('invokes onOpenManageBooks when the button is clicked', () => {
    const onOpenManageBooks = vi.fn();
    render(
      <BookNotAvailableView
        localizedStrings={STRINGS}
        isPowerMode
        showManageBooksButton
        onOpenManageBooks={onOpenManageBooks}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Manage books' }));

    expect(onOpenManageBooks).toHaveBeenCalledTimes(1);
  });

  it('falls back to the raw key when a string is missing', () => {
    render(
      <BookNotAvailableView
        isPowerMode={false}
        showManageBooksButton={false}
        onOpenManageBooks={vi.fn()}
      />,
    );

    expect(
      screen.getByText('%webView_platformScriptureEditor_bookNotAvailable_simpleMessage%'),
    ).toBeInTheDocument();
  });
});
