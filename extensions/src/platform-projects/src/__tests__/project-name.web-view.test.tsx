import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';

describe('ProjectNameWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../project-name.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('Project Identification')).toBeInTheDocument();
  });

  it('renders Full Name, Short Name, and Copyright fields', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Short Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Copyright')).toBeInTheDocument();
  });

  it('auto-generates short name from full name input', () => {
    render(React.createElement(Component, {}));
    const fullNameInput = screen.getByLabelText('Full Name');
    const shortNameInput = screen.getByLabelText('Short Name') as HTMLInputElement;

    fireEvent.change(fullNameInput, { target: { value: 'My New Translation' } });

    // Auto-abbreviation: first letters of each word → "MNT"
    expect(shortNameInput.value).toBe('MNT');
  });

  it('renders OK and Cancel buttons', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
