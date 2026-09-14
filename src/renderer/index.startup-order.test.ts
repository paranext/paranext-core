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

    // Matched as a whole statement anchored at column 0 rather than as a substring: a substring
    // search is satisfied by a commented-out call or a breadcrumb comment naming it, which is a
    // likelier refactor artifact than a rename. The `^` anchor also pins the call to module scope,
    // which is the constraint itself — indented, it would be inside the async IIFE or a function.
    // Asserting exactly one match is what keeps a leftover comment from standing in for the call.
    const subscribeCalls = source.match(/^initConnectionLostService\(\);$/gm) ?? [];
    expect(subscribeCalls).toHaveLength(1);

    const subscribeIndex = source.search(/^initConnectionLostService\(\);$/m);
    const initializeIndex = source.search(/^\s*await networkService\.initialize\(\);$/m);

    // Positive control: both call sites still exist in these shapes, so a rename cannot turn this
    // into a vacuous comparison of two -1s.
    expect(subscribeIndex).toBeGreaterThan(-1);
    expect(initializeIndex).toBeGreaterThan(-1);

    expect(subscribeIndex).toBeLessThan(initializeIndex);
  });
});
