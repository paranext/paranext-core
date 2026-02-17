import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';

// Mock child components
vi.mock('../components/font-tab.component', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('div', { 'data-testid': 'font-tab' }, 'FontTab mock'),
}));

vi.mock('../components/character-rules-tab.component', () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement('div', { 'data-testid': 'character-rules-tab' }, 'CharacterRulesTab mock'),
}));

describe('LanguageSettingsWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../language-settings.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Language Settings')).toBeInTheDocument();
  });

  it('renders tab list with Font, Graphite, Alphabetic Characters, and Other tabs', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Font')).toBeInTheDocument();
    expect(screen.getByText('Graphite')).toBeInTheDocument();
    expect(screen.getByText('Alphabetic Characters')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('switches to Other tab when clicked', () => {
    render(React.createElement(Component, {}));
    const otherTab = screen.getByText('Other');
    fireEvent.click(otherTab);
    expect(screen.getByLabelText('Medial Punctuation')).toBeInTheDocument();
  });

  it('renders action buttons including Reset to Default', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Reset to Default')).toBeInTheDocument();
  });
});
