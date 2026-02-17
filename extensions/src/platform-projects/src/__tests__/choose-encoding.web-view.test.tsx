import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';

describe('ChooseEncodingWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../choose-encoding.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Select Character Encoding')).toBeInTheDocument();
  });

  it('renders encoding label and combobox', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Encoding:')).toBeInTheDocument();
    expect(screen.getByText('Select encoder...')).toBeInTheDocument();
  });

  it('renders OK button as disabled when no encoder selected', () => {
    render(React.createElement(Component, {}));
    const okButton = screen.getByText('OK');
    expect(okButton).toBeDisabled();
  });

  it('renders Cancel button as enabled', () => {
    render(React.createElement(Component, {}));
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeEnabled();
  });
});
