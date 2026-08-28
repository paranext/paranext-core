/**
 * Unit tests for the silent-skip reporter's discrimination logic.
 *
 * These run under vitest (`npm test`), not Playwright: `findLostTests` takes a structural shape, so
 * these exercise the real decision with plain objects — no browser, no Electron, no casting.
 *
 * Worth testing directly because the logic is invertible in ways nothing else catches. The reporter
 * exists to fail a run in which tests were lost; a subtly wrong predicate either stops failing —
 * restoring the silent rot it was written to prevent — or starts failing runs whose tests all
 * ultimately passed. Both look like a normal suite until someone investigates.
 */
import { describe, expect, it } from 'vitest';
import { findLostTests, TestOutcomeLike } from './no-silent-skips.reporter';

/** A test declaration carrying only what the decision reads. */
function declaredTest(
  results: TestOutcomeLike['results'][number]['status'][],
  expectedStatus = 'passed',
): TestOutcomeLike {
  return { expectedStatus, results: results.map((status) => ({ status })) };
}

const ran = declaredTest(['passed']);

describe('findLostTests', () => {
  it('reports a test whose only attempt was skipped without anyone asking', () => {
    const lost = declaredTest(['skipped']);

    expect(findLostTests([ran, lost])).toEqual([lost]);
  });

  it('leaves a deliberate test.skip() alone', () => {
    // The only thing separating this from the case above is expectedStatus.
    expect(findLostTests([ran, declaredTest(['skipped'], 'skipped')])).toEqual([]);
  });

  it('accepts a test lost on one attempt that passed on a retry', () => {
    // A setup failure gives the lost test a skipped result AND queues a retry, so reporting this
    // as lost would fail runs whose tests all ultimately passed — hardest on the flakiest suites,
    // which are exactly the ones retries exist for.
    expect(findLostTests([ran, declaredTest(['skipped', 'passed'])])).toEqual([]);
  });

  it('still reports a test when every attempt was lost', () => {
    const lost = declaredTest(['skipped', 'interrupted']);

    expect(findLostTests([ran, lost])).toEqual([lost]);
  });

  it('counts a test that never started at all', () => {
    const lost = declaredTest([]);

    expect(findLostTests([ran, lost])).toEqual([lost]);
  });

  it('reports nothing when no test ran, which is what --list looks like', () => {
    // Every test lost, but nothing ran either — there is no "some ran, some vanished" signal here.
    expect(findLostTests([declaredTest([]), declaredTest([])])).toEqual([]);
  });

  it('does not treat a failing test as lost', () => {
    // A real failure is already loud; only silence is this reporter's business.
    expect(findLostTests([ran, declaredTest(['failed']), declaredTest(['timedOut'])])).toEqual([]);
  });
});
