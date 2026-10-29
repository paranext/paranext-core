// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { MutableRefObject } from 'react';
import { useForgetEditsOnSyncBlock } from './use-forget-edits-on-sync-block.hook';

const EDIT_AT = 1_000;

function editedRef(): MutableRefObject<number | undefined> {
  return { current: EDIT_AT };
}

function renderForget(
  initialIsSyncBlocked: boolean | undefined,
  ...refs: MutableRefObject<number | undefined>[]
) {
  return renderHook(
    ({ isSyncBlocked }: { isSyncBlocked: boolean | undefined }) =>
      useForgetEditsOnSyncBlock(isSyncBlocked, ...refs),
    { initialProps: { isSyncBlocked: initialIsSyncBlocked } },
  );
}

describe('useForgetEditsOnSyncBlock', () => {
  it('forgets the edit when a block starts', () => {
    const lastEditAt = editedRef();
    const { rerender } = renderForget(false, lastEditAt);
    expect(lastEditAt.current).toBe(EDIT_AT);

    rerender({ isSyncBlocked: true });

    expect(lastEditAt.current).toBeUndefined();
  });

  it('does not forget an edit stamped while the block continues', () => {
    const lastEditAt = editedRef();
    const { rerender } = renderForget(false, lastEditAt);
    rerender({ isSyncBlocked: true });
    expect(lastEditAt.current).toBeUndefined();

    lastEditAt.current = EDIT_AT;
    rerender({ isSyncBlocked: true });
    rerender({ isSyncBlocked: true });

    expect(lastEditAt.current).toBe(EDIT_AT);
  });

  it('forgets nothing when a block ends', () => {
    const lastEditAt = editedRef();
    const { rerender } = renderForget(true, lastEditAt);
    lastEditAt.current = EDIT_AT;

    rerender({ isSyncBlocked: false });

    expect(lastEditAt.current).toBe(EDIT_AT);
  });

  it('forgets the edit when mounted already blocked', () => {
    const lastEditAt = editedRef();

    renderForget(true, lastEditAt);

    expect(lastEditAt.current).toBeUndefined();
  });

  it('forgets every edit it is given', () => {
    const lastEditAt = editedRef();
    const lastPaneEditAt = editedRef();
    const { rerender } = renderForget(false, lastEditAt, lastPaneEditAt);

    rerender({ isSyncBlocked: true });

    expect(lastEditAt.current).toBeUndefined();
    expect(lastPaneEditAt.current).toBeUndefined();
  });
});
