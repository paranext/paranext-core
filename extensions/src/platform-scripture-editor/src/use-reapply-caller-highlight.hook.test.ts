// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useReapplyCallerHighlight } from './use-reapply-caller-highlight.hook';

type Props = { viewType: string; usesPaneModel: boolean };

describe('useReapplyCallerHighlight', () => {
  function renderReapply(apply: () => void, initialProps: Props) {
    return renderHook(
      ({ viewType, usesPaneModel }: Props) =>
        useReapplyCallerHighlight(apply, viewType, usesPaneModel),
      { initialProps },
    );
  }

  it('re-applies the highlight when the view changes', () => {
    const apply = vi.fn();
    const { rerender } = renderReapply(apply, { viewType: 'standard', usesPaneModel: true });
    apply.mockClear();

    rerender({ viewType: 'formatted', usesPaneModel: true });

    expect(apply).toHaveBeenCalledTimes(1);
  });

  it('re-applies the highlight when the note model changes without the view changing', () => {
    // The interface mode finishing loading turns Formatted view into a pane-model view.
    const apply = vi.fn();
    const { rerender } = renderReapply(apply, { viewType: 'formatted', usesPaneModel: false });
    apply.mockClear();

    rerender({ viewType: 'formatted', usesPaneModel: true });

    expect(apply).toHaveBeenCalledTimes(1);
  });

  it('leaves the highlight alone when neither changes', () => {
    const apply = vi.fn();
    const { rerender } = renderReapply(apply, { viewType: 'standard', usesPaneModel: true });
    apply.mockClear();

    rerender({ viewType: 'standard', usesPaneModel: true });

    expect(apply).not.toHaveBeenCalled();
  });
});
