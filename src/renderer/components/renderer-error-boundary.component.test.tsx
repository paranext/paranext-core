import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { logger } from '@shared/services/logger.service';
import { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RendererErrorBoundary } from './renderer-error-boundary.component';
import { WINDOW_CRASHED_ENGLISH_DEFAULTS } from './window-crashed-view.component';

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%window_error_crashed_title%': 'Localized crash title',
      '%window_error_crashed_message%': 'Localized crash message',
      '%window_error_crashed_reloadButton%': 'Localized reload',
    },
    false,
  ]),
}));

function Boom(): ReactNode {
  throw new Error("Cannot read properties of undefined (reading 'length')");
}

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  // React reports every error it hands to a boundary to the console; the boundary's own logging is
  // what these tests assert on, so keep the suite output readable
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
  vi.unstubAllGlobals();
});

describe('RendererErrorBoundary', () => {
  it('renders its children when nothing throws', () => {
    render(
      <RendererErrorBoundary>
        <div>the app</div>
      </RendererErrorBoundary>,
    );

    expect(screen.getByText('the app')).toBeInTheDocument();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('shows the crash screen instead of a blank window when a child throws', () => {
    render(
      <RendererErrorBoundary>
        <Boom />
      </RendererErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Localized crash message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Localized reload' })).toBeInTheDocument();
  });

  it('logs the error message and the component stack that names the failing component', () => {
    render(
      <RendererErrorBoundary>
        <Boom />
      </RendererErrorBoundary>,
    );

    expect(logger.error).toHaveBeenCalledOnce();
    const loggedMessage = vi.mocked(logger.error).mock.calls[0][0];
    expect(loggedMessage).toContain("Cannot read properties of undefined (reading 'length')");
    expect(loggedMessage).toContain('Boom');
  });

  it('reloads the window when the crash screen’s reload button is pressed', () => {
    const reload = vi.fn();
    vi.stubGlobal('location', { reload });

    render(
      <RendererErrorBoundary>
        <Boom />
      </RendererErrorBoundary>,
    );
    screen.getByRole('button', { name: 'Localized reload' }).click();

    expect(reload).toHaveBeenCalledOnce();
  });

  it('falls back to English rather than blanking when localizing the crash screen throws', async () => {
    const { useLocalizedStrings } = await import('@renderer/hooks/papi-hooks');
    vi.mocked(useLocalizedStrings).mockImplementation(() => {
      throw new Error('localization is unwell');
    });

    render(
      <RendererErrorBoundary>
        <Boom />
      </RendererErrorBoundary>,
    );

    expect(
      screen.getByText(WINDOW_CRASHED_ENGLISH_DEFAULTS['%window_error_crashed_message%']),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: WINDOW_CRASHED_ENGLISH_DEFAULTS['%window_error_crashed_reloadButton%'],
      }),
    ).toBeInTheDocument();
  });
});
