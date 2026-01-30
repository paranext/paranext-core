import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import RibbonWarningDisplay from '../ribbon-warning.component';
import type { RibbonWarning } from '../../types/parallel-passages';

describe('RibbonWarningDisplay', () => {
  const onActionClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when warning is null', () => {
    const { container } = render(
      <RibbonWarningDisplay warning={null} onActionClick={onActionClick} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('displays resource-text warning with message only', () => {
    const warning: RibbonWarning = {
      type: 'resource-text',
      message: 'The current active window is a resource text.',
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText('The current active window is a resource text.')).toBeTruthy();
    // resource-text should NOT show "Contact your administrator"
    expect(screen.queryByText(/contact your administrator/i)).toBeNull();
  });

  it('displays book-not-selected warning with action link for admin', () => {
    const warning: RibbonWarning = {
      type: 'book-not-selected',
      message: 'Genesis has not been selected for parallel passage checking.',
      actionLink: { label: 'Add Genesis to selected books', action: 'add-book-selected' },
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByText(warning.message)).toBeTruthy();
    const link = screen.getByRole('button', { name: 'Add Genesis to selected books' });
    expect(link).toBeTruthy();

    fireEvent.click(link);
    expect(onActionClick).toHaveBeenCalledWith('add-book-selected');
  });

  it('displays book-not-selected warning with contact message for non-admin', () => {
    const warning: RibbonWarning = {
      type: 'book-not-selected',
      message: 'Genesis has not been selected for parallel passage checking.',
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByText(warning.message)).toBeTruthy();
    expect(screen.getByText(/contact your administrator/i)).toBeTruthy();
  });

  it('displays book-not-in-scope warning with action link for admin', () => {
    const warning: RibbonWarning = {
      type: 'book-not-in-scope',
      message: 'Current book is not in project scope.',
      actionLink: { label: 'Add Genesis to project scope', action: 'add-book-scope' },
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByText(warning.message)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Add Genesis to project scope' }));
    expect(onActionClick).toHaveBeenCalledWith('add-book-scope');
  });

  it('displays book-not-in-scope warning with contact message for non-admin', () => {
    const warning: RibbonWarning = {
      type: 'book-not-in-scope',
      message: 'Current book is not in project scope.',
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByText(warning.message)).toBeTruthy();
    expect(screen.getByText(/contact your administrator/i)).toBeTruthy();
  });

  it('displays missing-projects warning with action links', () => {
    const warning: RibbonWarning = {
      type: 'missing-projects',
      message: 'Some comparative texts are not available.',
      actionLink: { label: 'Send/Receive', action: 'send-receive' },
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByText(warning.message)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Send/Receive' }));
    expect(onActionClick).toHaveBeenCalledWith('send-receive');
  });

  it('has role="alert" for screen reader accessibility', () => {
    const warning: RibbonWarning = {
      type: 'resource-text',
      message: 'Test message',
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    expect(screen.getByRole('alert')).toBeTruthy();
  });

  it('does not call onActionClick when no action link exists', () => {
    const warning: RibbonWarning = {
      type: 'book-not-selected',
      message: 'Book not selected.',
    };
    render(<RibbonWarningDisplay warning={warning} onActionClick={onActionClick} />);

    // No button should exist (only contact message text)
    expect(screen.queryByRole('button')).toBeNull();
    expect(onActionClick).not.toHaveBeenCalled();
  });
});
