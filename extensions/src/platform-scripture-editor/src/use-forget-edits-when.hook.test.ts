// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { MutableRefObject } from 'react';
import { useForgetEditsWhen } from './use-forget-edits-when.hook';

const EDIT_AT = 1_000;

function editedRef(): MutableRefObject<number | undefined> {
  return { current: EDIT_AT };
}

function renderForget(
  initialShouldForget: boolean | undefined,
  ...refs: MutableRefObject<number | undefined>[]
) {
  return renderHook(
    ({ shouldForget }: { shouldForget: boolean | undefined }) =>
      useForgetEditsWhen(shouldForget, ...refs),
    { initialProps: { shouldForget: initialShouldForget } },
  );
}

describe('useForgetEditsWhen', () => {
  it('forgets the edit when the condition turns true', () => {
    const lastEditAt = editedRef();
    const { rerender } = renderForget(false, lastEditAt);
    expect(lastEditAt.current).toBe(EDIT_AT);

    rerender({ shouldForget: true });

    expect(lastEditAt.current).toBeUndefined();
  });

  it('does not forget an edit stamped while the condition stays true', () => {
    const lastEditAt = editedRef();
    const { rerender } = renderForget(false, lastEditAt);
    rerender({ shouldForget: true });
    expect(lastEditAt.current).toBeUndefined();

    lastEditAt.current = EDIT_AT;
    rerender({ shouldForget: true });
    rerender({ shouldForget: true });

    expect(lastEditAt.current).toBe(EDIT_AT);
  });

  it('forgets nothing when the condition turns false', () => {
    const lastEditAt = editedRef();
    const { rerender } = renderForget(true, lastEditAt);
    lastEditAt.current = EDIT_AT;

    rerender({ shouldForget: false });

    expect(lastEditAt.current).toBe(EDIT_AT);
  });

  it('forgets the edit when mounted with the condition true', () => {
    const lastEditAt = editedRef();

    renderForget(true, lastEditAt);

    expect(lastEditAt.current).toBeUndefined();
  });

  it('forgets every edit it is given', () => {
    const lastEditAt = editedRef();
    const lastPaneEditAt = editedRef();
    const { rerender } = renderForget(false, lastEditAt, lastPaneEditAt);

    rerender({ shouldForget: true });

    expect(lastEditAt.current).toBeUndefined();
    expect(lastPaneEditAt.current).toBeUndefined();
  });
});
