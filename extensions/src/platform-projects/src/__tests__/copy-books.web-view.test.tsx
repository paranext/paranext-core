import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';

// Mock the grid component to avoid deep rendering
vi.mock('../components/book-comparison-grid.component', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement(
      'div',
      { 'data-testid': 'book-comparison-grid' },
      'BookComparisonGrid mock',
    ),
}));

describe('CopyBooksWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../copy-books.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Copy Books')).toBeInTheDocument();
  });

  it('renders From and To project selectors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('From:')).toBeInTheDocument();
    expect(screen.getByText('To:')).toBeInTheDocument();
  });

  it('shows a warning message when no projects are selected', () => {
    render(React.createElement(Component, {}));
    expect(
      screen.getByText('Select source and destination projects to compare books'),
    ).toBeInTheDocument();
  });

  it('renders OK button as disabled when no books selected', () => {
    render(React.createElement(Component, {}));
    const okButton = screen.getByText('OK');
    expect(okButton).toBeDisabled();
  });
});
