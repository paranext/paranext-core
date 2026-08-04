// @vitest-environment jsdom

import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useEditorSelectionVersion } from './use-editor-selection-version.hook';

// Counts renders so the unmount test can assert the listener was actually removed. Asserting on
// the DOM after unmount is impossible — there is nothing left to query — so the render count is
// the only observable that makes that test falsifiable.
const renderSpy = vi.fn();

function Probe() {
  const version = useEditorSelectionVersion();
  renderSpy(version);
  return <span data-testid="version">{version}</span>;
}

const fireSelectionChange = () =>
  act(() => {
    document.dispatchEvent(new Event('selectionchange'));
  });

describe('useEditorSelectionVersion', () => {
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

  it('removes its listener on unmount', () => {
    renderSpy.mockClear();
    const { unmount } = render(<Probe />);
    fireSelectionChange();
    const rendersWhileMounted = renderSpy.mock.calls.length;

    unmount();
    fireSelectionChange();

    // A leaked listener would call setState on an unmounted component, re-rendering it.
    expect(renderSpy.mock.calls.length).toBe(rendersWhileMounted);
  });
});
