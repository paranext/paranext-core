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
import {
  findLostTests,
  isMaxFailuresStopMessage,
  TestOutcomeLike,
} from './no-silent-skips.reporter';

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

    expect(findLostTests([ran, lost], 'failed').lost).toEqual([lost]);
  });

  it('leaves a deliberate test.skip() alone', () => {
    // The only thing separating this from the case above is expectedStatus.
    expect(findLostTests([ran, declaredTest(['skipped'], 'skipped')], 'passed').lost).toEqual([]);
  });

  it('accepts a test lost on one attempt that passed on a retry', () => {
    // A setup failure gives the lost test a skipped result AND queues a retry, so reporting this
    // as lost would fail runs whose tests all ultimately passed — hardest on the flakiest suites,
    // which are exactly the ones retries exist for.
    expect(findLostTests([ran, declaredTest(['skipped', 'passed'])], 'passed').lost).toEqual([]);
  });

  it('does not treat an interrupted result as lost — it can be a real outcome max-failures hid', () => {
    // JobDispatcher._onTestEnd overwrites an ALREADY-FINISHED test's status to 'interrupted' once
    // --max-failures trips, clearing its real errors. Counting every 'interrupted' result as lost
    // would turn an intentional -x/Ctrl+C stop into a wall of "N tests never ran" that buries the
    // one real failure that caused it.
    expect(findLostTests([ran, declaredTest(['interrupted'])], 'failed').lost).toEqual([]);
    // Same conclusion whether or not a 'skipped' attempt preceded it.
    expect(findLostTests([ran, declaredTest(['skipped', 'interrupted'])], 'failed').lost).toEqual(
      [],
    );
  });

  it('still reports a test whose every attempt was silently skipped, no interruption involved', () => {
    const lost = declaredTest(['skipped', 'skipped']);

    expect(findLostTests([ran, lost], 'failed').lost).toEqual([lost]);
  });

  it('counts a test that never started at all', () => {
    const lost = declaredTest([]);

    expect(findLostTests([ran, lost], 'failed').lost).toEqual([lost]);
  });

  it('reports nothing when no test ran and the run itself reports passed, which is --list', () => {
    // Every test lost, but nothing ran either — there is no "some ran, some vanished" signal here.
    expect(findLostTests([declaredTest([]), declaredTest([])], 'passed').lost).toEqual([]);
  });

  it('still reports a total loss when nothing ran AND the run did not pass', () => {
    // The `some(results.length > 0)` half of the guard alone cannot tell this apart from --list: a
    // crashed worker, a fatal setup error, or an interruption before anything finished can ALSO
    // leave every declared test with empty results. Gating the guard on `runStatus === 'passed'`
    // too is what keeps this real total loss from reading as clean the way --list correctly does.
    // Neither run here was flagged as having stopped early, so these are genuine losses.
    const lostA = declaredTest([]);
    const lostB = declaredTest([]);

    expect(findLostTests([lostA, lostB], 'failed').lost).toEqual([lostA, lostB]);
    expect(findLostTests([lostA, lostB], 'interrupted').lost).toEqual([lostA, lostB]);
  });

  it('does not treat a failing test as lost', () => {
    // A real failure is already loud; only silence is this reporter's business.
    expect(
      findLostTests([ran, declaredTest(['failed']), declaredTest(['timedOut'])], 'failed').lost,
    ).toEqual([]);
  });

  it('reports a no-results test as "stopped early", not lost, once --max-failures has tripped', () => {
    // Dispatcher._massSkipTestsFromRemaining stops calling _failTestWithErrors once
    // hasReachedMaxFailures() is true, so everything it skips from then on keeps zero results —
    // the expected shape of "we stopped on purpose", not a silent drop.
    const neverReached = declaredTest([]);

    const { lost, notRunBecauseStoppedEarly } = findLostTests([ran, neverReached], 'failed', true);
    expect(lost).toEqual([]);
    expect(notRunBecauseStoppedEarly).toEqual([neverReached]);
  });

  it('reports a no-results test as "stopped early" when the run was interrupted', () => {
    const neverReached = declaredTest([]);

    const { lost, notRunBecauseStoppedEarly } = findLostTests(
      [ran, neverReached],
      'interrupted',
      true,
    );
    expect(lost).toEqual([]);
    expect(notRunBecauseStoppedEarly).toEqual([neverReached]);
  });

  it('still reports a genuinely lost test as lost even during a stopped-early run', () => {
    // A completed 'skipped' result (as opposed to no results at all) comes from
    // _failTestWithErrors, which Dispatcher only skips calling once max-failures has ALREADY
    // tripped — so a test with a real skipped result predates the stop and is not explained by it.
    const genuinelyLost = declaredTest(['skipped']);

    const { lost, notRunBecauseStoppedEarly } = findLostTests([ran, genuinelyLost], 'failed', true);
    expect(lost).toEqual([genuinelyLost]);
    expect(notRunBecauseStoppedEarly).toEqual([]);
  });
});

describe('isMaxFailuresStopMessage', () => {
  it('recognizes the message Dispatcher._reportTestEnd sends when --max-failures trips', () => {
    expect(
      isMaxFailuresStopMessage('Testing stopped early after 1 maximum allowed failures.'),
    ).toBe(true);
  });

  it('recognizes it through the ANSI color codes Playwright wraps it in', () => {
    expect(
      isMaxFailuresStopMessage('[31mTesting stopped early after 3 maximum allowed failures.[39m'),
    ).toBe(true);
  });

  it('rejects an unrelated error message', () => {
    expect(isMaxFailuresStopMessage('TypeError: Cannot read properties of undefined')).toBe(false);
  });

  it('rejects an undefined message', () => {
    expect(isMaxFailuresStopMessage(undefined)).toBe(false);
  });
});
