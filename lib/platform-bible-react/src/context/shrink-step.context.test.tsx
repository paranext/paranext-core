import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { SHRINK_STEP, ShrinkStepContext, useShrinkStepValue } from './shrink-step.context';

describe('useShrinkStepValue', () => {
  test('is the widest step outside any provider, so standalone consumers are unchanged', () => {
    const { result } = renderHook(() => useShrinkStepValue());

    expect(result.current).toBe(SHRINK_STEP.WIDE);
  });

  test('reads the value published by the nearest provider', () => {
    function Wrapper({ children }: PropsWithChildren) {
      return (
        <ShrinkStepContext.Provider value={SHRINK_STEP.TIGHTER}>
          {children}
        </ShrinkStepContext.Provider>
      );
    }

    const { result } = renderHook(() => useShrinkStepValue(), { wrapper: Wrapper });

    expect(result.current).toBe(SHRINK_STEP.TIGHTER);
  });

  test('orders the steps from widest to narrowest so comparisons read correctly', () => {
    // Consumers gate on `step >= SHRINK_STEP.MINIMUM` and `step < SHRINK_STEP.MINIMUM`, which only
    // works while the numbers ascend as the space shrinks.
    expect(SHRINK_STEP.WIDE).toBeLessThan(SHRINK_STEP.TIGHT);
    expect(SHRINK_STEP.TIGHT).toBeLessThan(SHRINK_STEP.TIGHTER);
    expect(SHRINK_STEP.TIGHTER).toBeLessThan(SHRINK_STEP.MINIMUM);
  });
});
