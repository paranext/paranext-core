import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @papi/frontend before importing component
const mockSendCommand = vi.fn().mockResolvedValue({});
vi.mock('@papi/frontend', () => ({
  default: {
    commands: { sendCommand: mockSendCommand },
  },
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: () => [{}],
}));

// We need to test the web view component which assigns to globalThis.webViewComponent.
// Import the module to trigger the assignment.
beforeEach(() => {
  vi.resetModules();
  mockSendCommand.mockReset().mockResolvedValue({});
});

// Helper to create mock WebViewProps
function createMockWebViewProps(overrides: Record<string, unknown> = {}) {
  const stateStore: Record<string, unknown> = { mode: 'new', projectId: null, ...overrides };

  return {
    projectId: undefined,
    useWebViewState: <T,>(key: string, defaultValue: T): [T, (val: T) => void] => {
      const value = (stateStore[key] ?? defaultValue) as T;
      return [value, vi.fn()];
    },
    useWebViewScrollGroupScrRef: vi.fn().mockReturnValue([{}, vi.fn()]),
  };
}

describe('ProjectPropertiesWebView', () => {
  it('renders with New Project title in new mode', async () => {
    // Dynamic import to get fresh module
    await import('./project-properties.web-view');

    const Component = globalThis.webViewComponent;
    expect(Component).toBeDefined();

    const props = createMockWebViewProps();
    render(<Component {...(props as any)} />);

    expect(screen.getByText('New Project')).toBeInTheDocument();
  });

  it('renders all standard tabs', async () => {
    await import('./project-properties.web-view');
    const Component = globalThis.webViewComponent;

    const props = createMockWebViewProps();
    render(<Component {...(props as any)} />);

    expect(screen.getByRole('tab', { name: /general/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /associations/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /notes/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /advanced/i })).toBeInTheDocument();
  });

  it('renders OK and Cancel buttons', async () => {
    await import('./project-properties.web-view');
    const Component = globalThis.webViewComponent;

    const props = createMockWebViewProps();
    render(<Component {...(props as any)} />);

    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('disables OK button when project type is NotSelected', async () => {
    await import('./project-properties.web-view');
    const Component = globalThis.webViewComponent;

    const props = createMockWebViewProps();
    render(<Component {...(props as any)} />);

    // In new mode with defaults, OK should be disabled (projectType is NotSelected, names empty)
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });

  it('does not show Study Bible tab in new mode', async () => {
    await import('./project-properties.web-view');
    const Component = globalThis.webViewComponent;

    const props = createMockWebViewProps();
    render(<Component {...(props as any)} />);

    expect(screen.queryByRole('tab', { name: /study bible/i })).not.toBeInTheDocument();
  });
});
