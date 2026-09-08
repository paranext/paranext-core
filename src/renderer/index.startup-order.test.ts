import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * `index.tsx` cannot be imported by a test — it renders the whole app and starts every renderer
 * service — so the one ordering constraint it carries is checked against its source text instead.
 *
 * The constraint: `initConnectionLostService()` must run at module evaluation, BEFORE the async
 * startup IIFE awaits `networkService.initialize()`. `onDidLoseConnection` is a module-level
 * emitter that exists before `initialize()` does, and `PlatformEvent` does not replay to a late
 * subscriber — so a subscription made after the first await leaves a window in which a lost
 * connection is seen by nothing and is missed for good. Moving the call into the IIFE, or into a
 * React effect, reopens that window while leaving every other test green, which is why the
 * constraint needs a pin of its own rather than only the comment at the call site.
 */
describe('renderer startup ordering', () => {
  it('subscribes the connection-lost service before the network service is initialized', () => {
    const source = readFileSync(join(__dirname, 'index.tsx'), 'utf8');

    const subscribeIndex = source.indexOf('initConnectionLostService()');
    const initializeIndex = source.indexOf('networkService.initialize()');

    // Positive control: both call sites still exist under these names, so a rename cannot turn this
    // into a vacuous comparison of two -1s.
    expect(subscribeIndex).toBeGreaterThan(-1);
    expect(initializeIndex).toBeGreaterThan(-1);

    expect(subscribeIndex).toBeLessThan(initializeIndex);
  });
});
