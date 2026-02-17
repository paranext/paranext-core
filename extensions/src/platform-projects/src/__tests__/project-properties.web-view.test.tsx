import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';

// Mock child components to avoid deep rendering
vi.mock('../components/general-tab.component', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('div', { 'data-testid': 'general-tab' }, `GeneralTab mock`),
  getProjectTypeRules: () => ({
    showBaseProject: false,
    showEncoderFields: false,
    baseProjectRequired: false,
    languageRequired: true,
    editableDefault: true,
    showLanguage: true,
  }),
}));

vi.mock('../components/books-tab.component', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('div', { 'data-testid': 'books-tab' }, 'BooksTab mock'),
}));

vi.mock('../components/project-type-selector.component', () => ({
  getProjectTypeRules: () => ({
    showBaseProject: false,
    showEncoderFields: false,
    baseProjectRequired: false,
    languageRequired: true,
    editableDefault: true,
    showLanguage: true,
  }),
}));

describe('ProjectPropertiesWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../project-properties.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Create New Project')).toBeInTheDocument();
  });

  it('renders tab list with General, Books, and Advanced tabs enabled', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  it('renders OK and Cancel buttons', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('switches to Books tab when clicked', () => {
    render(React.createElement(Component, {}));
    const booksTab = screen.getByText('Books');
    fireEvent.click(booksTab);
    expect(screen.getByTestId('books-tab')).toBeInTheDocument();
  });
});
