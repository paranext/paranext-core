/**
 * Unit tests for {@link sampleStepCounterPoll}, the per-sample logic behind
 * `waitForStepCounterChange`'s poll (see its own docblock for why the poll reads dialog visibility
 * and step-counter text together in one non-waiting round trip, rather than a `count()` check
 * followed by a separate `textContent()` read).
 */
import { describe, expect, it, vi } from 'vitest';
import { sampleStepCounterPoll, type StepCounterPollTracker } from './onboarding-tour.page';

describe('sampleStepCounterPoll', () => {
  it('reads the counter with a single non-waiting call, never falling back to a waiting read', async () => {
    // `textContent` never resolves — the OLD shape (a `count()` check followed by a separate
    // `textContent()` round trip) would stall forever on exactly this: a step counter that
    // `evaluateAll` sees is momentarily absent (an empty match, read as `undefined`) while the
    // dialog is still visible. If `sampleStepCounterPoll` ever called `textContent()`, this test
    // would time out instead of resolving.
    const textContent = vi.fn(() => new Promise<string | null>(() => {}));
    const dialog = { isVisible: vi.fn().mockResolvedValue(true) };
    const stepCounter = { evaluateAll: vi.fn().mockResolvedValue(undefined), textContent };
    const tracker: StepCounterPollTracker = { dialogAbsentSamples: 0 };

    const result = await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 4);

    expect(result).toBe('1 of 5');
    expect(textContent).not.toHaveBeenCalled();
  });

  it('returns the trimmed counter text when the dialog is visible and the counter has changed', async () => {
    const dialog = { isVisible: vi.fn().mockResolvedValue(true) };
    const stepCounter = { evaluateAll: vi.fn().mockResolvedValue('  2 of 5  ') };
    const tracker: StepCounterPollTracker = { dialogAbsentSamples: 0 };

    const result = await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 4);

    expect(result).toBe('2 of 5');
  });

  it('reports "closed" only once the dialog has been absent for the configured number of samples', async () => {
    const dialog = { isVisible: vi.fn().mockResolvedValue(false) };
    const stepCounter = { evaluateAll: vi.fn().mockResolvedValue(undefined) };
    const tracker: StepCounterPollTracker = { dialogAbsentSamples: 0 };

    const first = await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 3);
    const second = await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 3);
    const third = await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 3);

    expect(first).toBe('1 of 5');
    expect(second).toBe('1 of 5');
    expect(third).toBe('closed');
  });

  it('resets the absence count once the dialog is visible again', async () => {
    const dialog = { isVisible: vi.fn().mockResolvedValueOnce(false).mockResolvedValue(true) };
    const stepCounter = { evaluateAll: vi.fn().mockResolvedValue('1 of 5') };
    const tracker: StepCounterPollTracker = { dialogAbsentSamples: 0 };

    await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 2);
    await sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 2);

    expect(tracker.dialogAbsentSamples).toBe(0);
  });

  it('throws instead of silently reading the first match if more than one step counter is found', async () => {
    // Runs the real evaluateAll callback against two fake elements, the way Playwright would if a
    // rendering bug left two step counters mounted at once.
    const dialog = { isVisible: vi.fn().mockResolvedValue(true) };
    const stepCounter = {
      evaluateAll: vi
        .fn()
        .mockImplementation((callback: (els: { textContent: string }[]) => unknown) =>
          Promise.resolve(callback([{ textContent: '1 of 5' }, { textContent: '2 of 5' }])),
        ),
    };
    const tracker: StepCounterPollTracker = { dialogAbsentSamples: 0 };

    await expect(sampleStepCounterPoll(dialog, stepCounter, '1 of 5', tracker, 4)).rejects.toThrow(
      /more than one|expected at most one/i,
    );
  });
});
