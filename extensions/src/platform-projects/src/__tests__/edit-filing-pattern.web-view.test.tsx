import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';

describe('EditFilingPatternWebView', () => {
  let Component: React.FC;

  beforeAll(async () => {
    await import('../edit-filing-pattern.web-view');
    Component = (globalThis as Record<string, unknown>).webViewComponent as React.FC;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without errors', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByLabelText('Pattern Format')).toBeInTheDocument();
  });

  it('shows preview based on default pattern', () => {
    render(React.createElement(Component, {}));
    // Default pattern is {nn}{BBB}{project}.SFM → resolved to 41MATTEST.SFM
    expect(screen.getByText('41MATTEST.SFM')).toBeInTheDocument();
  });

  it('shows placeholder legend items', () => {
    render(React.createElement(Component, {}));
    expect(screen.getByText('{BBB}')).toBeInTheDocument();
    expect(screen.getByText('{nn}')).toBeInTheDocument();
    expect(screen.getByText('{project}')).toBeInTheDocument();
  });

  it('updates preview when pattern changes', () => {
    render(React.createElement(Component, {}));
    const patternInput = screen.getByLabelText('Pattern Format');
    fireEvent.change(patternInput, { target: { value: '{BBB}_{project}.sfm' } });
    expect(screen.getByText('MAT_TEST.sfm')).toBeInTheDocument();
  });

  it('shows validation error for .ptx extension', () => {
    render(React.createElement(Component, {}));
    const patternInput = screen.getByLabelText('Pattern Format');
    fireEvent.change(patternInput, { target: { value: 'file.ptx' } });
    expect(screen.getByText('Pattern cannot end with .ptx extension')).toBeInTheDocument();
  });
});
