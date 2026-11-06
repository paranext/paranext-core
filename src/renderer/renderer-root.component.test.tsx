import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RendererRoot } from './renderer-root.component';

const { appBehavior } = vi.hoisted(() => ({ appBehavior: { shouldThrow: false } }));

// The real app needs the whole renderer running; this stand-in either renders or throws during
// render, which is all the root's boundary can react to.
vi.mock('@renderer/app.component', () => ({
  App: () => {
    if (appBehavior.shouldThrow) throw new Error('the app failed to render');
    return <div>the app</div>;
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}, false]),
}));

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  appBehavior.shouldThrow = false;
  // React reports every error it hands to a boundary to the console
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

describe('RendererRoot', () => {
  it('renders the app', () => {
    render(<RendererRoot />);

    expect(screen.getByText('the app')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows the crash screen instead of a blank window when the app throws while rendering', () => {
    appBehavior.shouldThrow = true;

    // Without the boundary around the app, the throw escapes `render` and tears down the root.
    expect(() => render(<RendererRoot />)).not.toThrow();

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
