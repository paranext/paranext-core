// Vitest global setup runs once per worker before any test in the file executes.

import { vi } from 'vitest';
// Import @testing-library/react first so its module-level configure() call runs before ours.
// Importing it here ensures our subsequent configure() call in this file wins — module-level code
// only runs once (on first import); any later `import ... from '@testing-library/react'` in a test
// file is just a cache lookup and won't re-run the configure() override.
import { act } from '@testing-library/react';
import { configure } from '@testing-library/dom';

// ─── ICU warm-up ─────────────────────────────────────────────────────────────
//
// The first construction of each Intl formatter type in a worker process loads that formatter's
// ICU dataset. Measured cold first-use cost is ~8-20ms per type (Intl.DisplayNames with
// type:'language' is the worst at ~20ms) versus ~0.03ms once warm - a ~500x difference. On a cold,
// memory-pressured CI worker that first-touch initialization can spike into the seconds, and when it
// happens to run inside a test's timeout window it flakes that test.
//
// This is exactly what made src/renderer/hooks/use-project-picker-data.hook.test.ts time out only on
// its "first open Scripture Editor web view" case: that was the sole test whose code path constructs
// Intl.DisplayNames (via resolveLanguage), so it alone paid the one-time init inside its timed
// window while every sibling ran warm.
//
// Paying the init here - once per worker, before any timed test - moves the cost out of every test
// window and removes the whole class of flake. We warm exactly the Intl constructors the codebase
// uses. Each statement is a construct-and-use call so the formatter's dataset actually loads.
const locale = typeof navigator !== 'undefined' && navigator.language ? navigator.language : 'en';

new Intl.DisplayNames([locale], { type: 'language' }).of('en');
new Intl.NumberFormat(locale).format(1);
new Intl.DateTimeFormat(locale).format(0);
new Intl.Collator(locale).compare('a', 'b');
new Intl.RelativeTimeFormat(locale).format(1, 'day');
new Intl.ListFormat(locale).format(['a', 'b']);

// ─── asyncWrapper patch for Vitest fake timers + userEvent ───────────────────
//
// @testing-library/react sets asyncWrapper to an implementation that drains the microtask queue by
// creating a setTimeout(resolve, 0) and then calling jest.advanceTimersByTime(0) to fire it. That
// jest.* call only works when `jest` is available as a global — but Vitest only injects `jest` as a
// global in *test* files (src/), not in node_modules code. So @testing-library/react's asyncWrapper
// cannot detect Vitest fake timers and never fires its own drain timer, causing every
// `await user.type(...)` or `await user.click(...)` call to hang when vi.useFakeTimers() is active.
//
// The fix: after @testing-library/react has configured asyncWrapper (it ran at module-load time when
// the `configure` import resolved), replace it with a version that uses vi.advanceTimersByTime(0)
// directly. The `vi` imported above refers to the same Vitest instance that test files use, so it
// correctly controls the current test's fake clock.
//
// When fake timers are NOT active, @sinonjs/fake-timers does NOT set a `.clock` property on
// `setTimeout`, so the fake-timer branch is skipped and a microtask flush suffices.
configure({
  asyncWrapper: async (cb) => {
    // Temporarily clear the React act environment flag so that `waitFor` polling intervals don't
    // produce "not wrapped in act" warnings (mirrors the intent of @testing-library/react's original
    // asyncWrapper, which set IS_REACT_ACT_ENVIRONMENT = false before calling cb()).
    const prevActEnv = (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = false;
    try {
      const result = await cb();
      // Drain pending work after cb() completes:
      //
      // When fake timers are active (@sinonjs marks `setTimeout` with a `.clock` property),
      // we need two things:
      //   1. Fire any 0-ms fake timers that userEvent's internal wait() scheduled.
      //   2. Flush any pending React state updates triggered by async operations in the
      //      handler (e.g., a rejected Promise in an async onClick handler). React
      //      schedules these via the real `setImmediate` (captured before fake timers
      //      replaced the global), so they won't fire from vi.advanceTimersByTime alone.
      //      Wrapping in act() flushes React's internal work queue directly.
      //
      // @sinonjs/fake-timers marks the fake `setTimeout` with a `.clock` property when installed.
      if (Object.prototype.hasOwnProperty.call(setTimeout, 'clock')) {
        // eslint-disable-next-line no-await-in-loop -- act() here is a single flush, not a loop
        await act(async () => {
          await Promise.resolve(); // drain JS microtask queue (Promise continuations)
          // Advance by 50ms — fires any 0-ms fake timers AND the waitFor polling interval
          // (setInterval at 50ms), allowing waitFor to re-check the DOM after async work.
          vi.advanceTimersByTime(50);
        });
      } else {
        await Promise.resolve(); // real timers: a microtask flush is sufficient
      }
      return result;
    } finally {
      (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = prevActEnv;
    }
  },
});
