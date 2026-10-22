import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RendererErrorBoundary } from '@renderer/components/renderer-error-boundary.component';
import { cleanupOldWebViewState } from '@renderer/services/web-view-state.service';
import { cleanupWebViewStateOnUnload } from './renderer-teardown.util';

vi.mock('@renderer/services/web-view-state.service', () => ({
  cleanupOldWebViewState: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}, false]),
}));

function Boom(): ReactNode {
  throw new Error('a component failed to render');
}

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.clearAllMocks();
  // React reports every error it hands to a boundary to the console
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

describe('cleanupWebViewStateOnUnload', () => {
  // One test rather than two because the crash flag lives for the module's lifetime and is never
  // reset, by design: the healthy case has to be observed before the crash, in the same module.
  it('purges unloaded web view state while the tree is healthy, and keeps it once the tree has crashed', () => {
    cleanupWebViewStateOnUnload();
    expect(cleanupOldWebViewState).toHaveBeenCalledOnce();

    render(
      <RendererErrorBoundary>
        <Boom />
      </RendererErrorBoundary>,
    );
    vi.mocked(cleanupOldWebViewState).mockClear();

    // A tree that crashed partway through restoring tabs never saw them all load, so purging now
    // would delete the saved state of every tab it had not restored yet.
    cleanupWebViewStateOnUnload();
    expect(cleanupOldWebViewState).not.toHaveBeenCalled();
  });
});
