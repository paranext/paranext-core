import path from 'path';
import type { FullConfig, FullResult, Reporter, Suite } from '@playwright/test/reporter';

/**
 * Fails the run when a test is reported as skipped without anyone having asked for it to be
 * skipped.
 *
 * Playwright reports a test that never executed — because its worker died, or a `beforeAll` threw,
 * or the run was interrupted — with the same outcome it uses for a deliberate `test.skip()`. On
 * Linux the list reporter prints those as "did not run" and on Windows as "skipped", and both read
 * as housekeeping rather than breakage.
 *
 * That is not hypothetical. `tests/isolated/find/` sat at "1 failed, 22 did not run" for months. In
 * that window it silently absorbed a fixture refactor, a menu label rename, a Tailwind prefix
 * migration, and a UI redesign — none of which anyone noticed, because 22 hidden tests look exactly
 * like 22 intentionally skipped ones. A suite that fails silently rots at the rate the codebase
 * changes.
 *
 * A deliberate skip carries an annotation: `test.skip()`, `test.fixme()`, and their conditional and
 * describe-scoped forms all add one, including when called at runtime. A test that never ran
 * carries none. That difference is the whole check.
 */
/**
 * The parts of a Playwright `TestCase` this reporter reasons about.
 *
 * Structural rather than the real type so the decision below can be exercised directly, with plain
 * objects and no casting. A real `TestCase` satisfies it.
 */
export interface TestOutcomeLike {
  expectedStatus: string;
  results: { status: string }[];
}

/**
 * Whether a test was lost rather than skipped on purpose.
 *
 * Mirrors Playwright's own discrimination in `computeTestCaseOutcome`
 * (`playwright/lib/isomorphic/teleReceiver.js`), which counts a `skipped` result as a real skip
 * only when `expectedStatus` is also `skipped` — i.e. when something actually asked for it — and
 * otherwise counts it as "did not run". `TestCase.outcome()` then collapses both into the single
 * string `'skipped'`, which is why the distinction has to be made from the raw results.
 *
 * A test with no results at all never started, which counts too.
 */
export function wasLost(test: TestOutcomeLike): boolean {
  if (test.expectedStatus === 'skipped') return false;
  if (test.results.length === 0) return true;
  // `every`, not `some`: when a setup failure loses tests, the dispatcher gives each one a
  // `skipped` result AND queues it for retry, so a test whose first attempt was lost but which
  // passed on a later attempt has a mix of results. Reporting that as lost would fail runs whose
  // tests all ultimately passed — the inverse of this reporter's purpose, landing hardest on the
  // flakiest suites, which are exactly the ones `retries` exists for. A test is lost only when no
  // attempt produced a real result, which is also what `computeTestCaseOutcome` requires
  // (`expected === 0 && unexpected === 0`).
  return test.results.every(
    (testResult) => testResult.status === 'skipped' || testResult.status === 'interrupted',
  );
}

/**
 * The tests a run lost, given every test it declared.
 *
 * Empty when nothing executed at all: that is `--list` (or an abort before the first test, which
 * already fails loudly on its own). The signal worth reporting is that SOME tests ran while others
 * were lost, so at least one test must have produced a result.
 */
export function findLostTests<T extends TestOutcomeLike>(tests: T[]): T[] {
  if (!tests.some((test) => test.results.length > 0)) return [];
  return tests.filter(wasLost);
}

class NoSilentSkipsReporter implements Reporter {
  private rootSuite: Suite | undefined;

  onBegin(_config: FullConfig, suite: Suite): void {
    this.rootSuite = suite;
  }

  async onEnd(result: FullResult): Promise<{ status?: FullResult['status'] } | undefined> {
    if (!this.rootSuite) return undefined;

    const allTests = this.rootSuite.allTests();
    const lost = findLostTests(allTests);
    if (lost.length === 0) return undefined;

    const listed = lost
      .map(
        (test) =>
          `  ${path.relative(process.cwd(), test.location.file)}:${test.location.line} › ` +
          `${test
            .titlePath()
            .filter((segment) => segment && !segment.endsWith('.spec.ts'))
            .slice(1)
            .join(' › ')}`,
      )
      .join('\n');

    // Reported to the console rather than as a test failure: no single test owns this, and the
    // point is that the run as a whole cannot be trusted.
    console.error(
      `\n${lost.length} test(s) never ran, and nothing asked for them to be skipped:\n${listed}\n\n` +
        `Playwright reports these the same way it reports a deliberate test.skip() — "did not run" ` +
        `on Linux, "skipped" on Windows — so they read as housekeeping. They are not. A worker ` +
        `died, a beforeAll threw, or the run was interrupted, and these tests were lost.\n\n` +
        `Look at the first FAILING test in the same file: killing its worker is what usually takes ` +
        `the rest of the file with it.\n`,
    );

    return { status: result.status === 'passed' ? 'failed' : result.status };
  }
}

export default NoSilentSkipsReporter;
