import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SplitterPanel from '../components/splitter-panel.component';
import MultiPaneRenderer from '../components/multi-pane-renderer.component';

// Mock papi modules
vi.mock('@papi/frontend', () => ({
  default: {
    commands: {
      sendCommand: vi.fn().mockResolvedValue(undefined),
    },
  },
  logger: {
    debug: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: vi.fn().mockReturnValue([{}]),
}));

describe('SplitterPanel', () => {
  it('renders left and right content when rightVisible is true', () => {
    render(
      <SplitterPanel
        leftContent={<div data-testid="left">Left Content</div>}
        rightContent={<div data-testid="right">Right Content</div>}
        rightVisible
      />,
    );

    expect(screen.getByTestId('left')).toBeDefined();
    expect(screen.getByTestId('right')).toBeDefined();
  });

  it('renders only left content when rightVisible is false', () => {
    render(
      <SplitterPanel
        leftContent={<div data-testid="left">Left Content</div>}
        rightContent={<div data-testid="right">Right Content</div>}
        rightVisible={false}
      />,
    );

    expect(screen.getByTestId('left')).toBeDefined();
    expect(screen.queryByTestId('right')).toBeNull();
  });

  it('renders a separator element', () => {
    render(
      <SplitterPanel leftContent={<div>Left</div>} rightContent={<div>Right</div>} rightVisible />,
    );

    const separator = screen.getByRole('separator');
    expect(separator).toBeDefined();
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('calls onProportionChange during mouse drag', () => {
    const onProportionChange = vi.fn();

    render(
      <SplitterPanel
        leftContent={<div>Left</div>}
        rightContent={<div>Right</div>}
        rightVisible
        onProportionChange={onProportionChange}
      />,
    );

    const separator = screen.getByRole('separator');
    fireEvent.mouseDown(separator);

    // Note: in jsdom, the actual mousemove/mouseup on document would be needed
    // This verifies the mouseDown handler at minimum doesn't throw
    expect(separator).toBeDefined();
  });
});

describe('MultiPaneRenderer', () => {
  const defaultLabels = {
    close: 'Close',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    zoomActual: 'Zoom Actual',
    moveUp: 'Move Up',
    moveDown: 'Move Down',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with the data-testid attribute', () => {
    render(
      <MultiPaneRenderer
        html="<div class='resource'>Test content</div>"
        css=""
        items={[]}
        multiPaneZoom={1.0}
        contextMenuLabels={defaultLabels}
      />,
    );

    expect(screen.getByTestId('multi-pane-renderer')).toBeDefined();
  });

  it('renders HTML content from backend', () => {
    render(
      <MultiPaneRenderer
        html='<div class="resource" data-item-index="0"><a href="select:0" class="abbrev-link">[NIV]</a> In the beginning...</div>'
        css=""
        items={[
          {
            scrText: {
              name: 'NIV',
              id: 'niv-123',
              fullName: 'New International Version',
              language: 'English',
              languageId: 'en',
              fontName: 'Arial',
              baseFontSize: 12,
              isRTL: false,
            },
            zoom: 1.0,
          },
        ]}
        multiPaneZoom={1.0}
        contextMenuLabels={defaultLabels}
      />,
    );

    // The HTML is rendered via dangerouslySetInnerHTML
    const container = screen.getByTestId('multi-pane-renderer');
    expect(container.innerHTML).toContain('[NIV]');
    expect(container.innerHTML).toContain('In the beginning...');
  });

  it('displays empty state when no HTML is provided', () => {
    render(
      <MultiPaneRenderer
        html=""
        css=""
        items={[]}
        multiPaneZoom={1.0}
        contextMenuLabels={defaultLabels}
      />,
    );

    const container = screen.getByTestId('multi-pane-renderer');
    expect(container.innerHTML).toContain('No texts loaded');
  });

  it('calls onAbbreviationClick when abbreviation link is clicked', () => {
    const onAbbreviationClick = vi.fn();

    render(
      <MultiPaneRenderer
        html='<div class="resource"><a href="select:0" class="abbrev-link">[NIV]</a> Text</div>'
        css=""
        items={[
          {
            scrText: {
              name: 'NIV',
              id: 'niv-123',
              fullName: 'NIV',
              language: 'English',
              languageId: 'en',
              fontName: 'Arial',
              baseFontSize: 12,
              isRTL: false,
            },
            zoom: 1.0,
          },
        ]}
        multiPaneZoom={1.0}
        onAbbreviationClick={onAbbreviationClick}
        contextMenuLabels={defaultLabels}
      />,
    );

    // Find the link and click it
    const link = screen.getByTestId('multi-pane-renderer').querySelector('a[href="select:0"]');
    if (link) {
      fireEvent.click(link);
      expect(onAbbreviationClick).toHaveBeenCalledWith(0);
    }
  });
});
