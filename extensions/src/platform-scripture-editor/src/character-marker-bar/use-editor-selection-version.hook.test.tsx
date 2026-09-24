// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEditorSelectionVersion } from './use-editor-selection-version.hook';

function Probe() {
  const version = useEditorSelectionVersion();
  return <span data-testid="version">{version}</span>;
}

const fireSelectionChange = () =>
  act(() => {
    document.dispatchEvent(new Event('selectionchange'));
  });

describe('useEditorSelectionVersion', () => {
  // Spy on addEventListener and removeEventListener to verify the listener is properly cleaned up
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
  });

  // `extensions/vitest.config.ts` sets no `restoreMocks`, so without this the spies stack up across
  // tests in this file and their recorded `mock.calls` accumulate from earlier renders.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts at 0', () => {
    render(<Probe />);
    expect(screen.getByTestId('version').textContent).toBe('0');
  });

  it('increments once per selectionchange event', () => {
    render(<Probe />);
    fireSelectionChange();
    expect(screen.getByTestId('version').textContent).toBe('1');
    fireSelectionChange();
    expect(screen.getByTestId('version').textContent).toBe('2');
  });

  it('increments correctly when multiple events fire in one batch', () => {
    render(<Probe />);
    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
      document.dispatchEvent(new Event('selectionchange'));
    });
    // Both events trigger setState, exercising the functional updater (previous + 1)
    // React batches both, so version is 0 + 1 + 1 = 2
    expect(screen.getByTestId('version').textContent).toBe('2');
  });

  it('removes its listener on unmount', () => {
    const { unmount } = render(<Probe />);

    // Capture the handler that was registered
    const addCalls = addEventListenerSpy.mock.calls;
    const selectionChangeAddCall = addCalls.find((call) => call[0] === 'selectionchange');
    expect(selectionChangeAddCall).toBeDefined();

    if (!selectionChangeAddCall) throw new Error('selectionchange listener was never added');
    const registeredHandler = selectionChangeAddCall[1];

    // Unmount and verify the same handler is unregistered
    unmount();

    // The same handler reference must be passed to removeEventListener
    expect(removeEventListenerSpy).toHaveBeenCalledWith('selectionchange', registeredHandler);
  });
});
