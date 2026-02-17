import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';

// Mock the grid component
vi.mock('../components/book-list-grid.component', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('div', { 'data-testid': 'book-list-grid' }, 'BookListGrid mock'),
}));

describe('DeleteBooksWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../delete-books.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Delete Books')).toBeInTheDocument();
  });

  it('renders the warning banner', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('WARNING: This action cannot be undone!')).toBeInTheDocument();
  });

  it('renders the book selection label with project name', () => {
    render(React.createElement(Component, {}));
    expect(
      screen.getByText('Select books to delete from My Translation Project:'),
    ).toBeInTheDocument();
  });

  it('renders Delete button as disabled when no books selected', () => {
    render(React.createElement(Component, {}));
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeDisabled();
  });

  it('does not show confirmation dialog initially', () => {
    render(React.createElement(Component, {}));
    expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
  });
});
