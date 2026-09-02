import path from 'path';
import type { FullConfig, FullResult, Reporter, Suite } from '@playwright/test/reporter';

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
 *
 * `interrupted` does NOT count, unlike `skipped`. `JobDispatcher._onTestEnd`
 * (`playwright/lib/runner/dispatcher.js`) overwrites a test's status to `'interrupted'` — clearing
 * its real errors — once `--max-failures` has already tripped, even for a test that finished with a
 * genuine result of its own. So an `interrupted` result can mean "this ran and Playwright hid the
 * outcome", not "this never ran"; treating every one as lost turned an intentional `-x`/Ctrl+C stop
 * into a wall of "N tests never ran" that buried the one real failure that caused it.
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
  return test.results.every((testResult) => testResult.status === 'skipped');
}

/**
 * The tests a run lost, given every test it declared and how the run as a whole finished.
 *
 * Empty when nothing executed at all AND the run itself reports `'passed'`: that combination is
 * what `--list` looks like — Playwright still loads reporters named in config for `--list`
 * (`createReporters` in `playwright/lib/runner/reporters.js` only swaps the BUILT-IN reporters for
 * a list-mode one; a custom reporter like this one still runs), and its task list for that mode
 * skips test execution entirely, so every declared test keeps empty results while the run itself
 * finishes clean.
 *
 * Checking `runStatus` too (not just whether anything produced a result) matters because a run that
 * lost EVERY test to a real cause — a crashed worker, a fatal setup error, a `--max-failures` trip
 * before anything finished — does not, in practice, come back `'passed'`: a fatal error reaching
 * every remaining test also reaches `FailureTracker.onWorkerError` (`_massSkipTestsFromRemaining`
 * in the same file), and an interruption reports `'interrupted'`. Gating the empty-results case on
 * `'passed'` is what stops that real total loss from also reading as `--list` and reporting clean.
 */
export function findLostTests<T extends TestOutcomeLike>(
  tests: T[],
  runStatus: FullResult['status'],
): T[] {
  if (runStatus === 'passed' && !tests.some((test) => test.results.length > 0)) return [];
  return tests.filter(wasLost);
}

/**
 * Fails the run when a test is reported as skipped without anyone having asked for it to be
 * skipped.
 *
 * Playwright reports a test that never executed — because its worker died, a `beforeAll` threw, or
 * it was still queued when the run was cut short before starting — with the same outcome it uses
 * for a deliberate `test.skip()`. On Linux the list reporter prints those as "did not run" and on
 * Windows as "skipped", and both read as housekeeping rather than breakage.
 *
 * That is not hypothetical. `tests/isolated/find/` sat at "1 failed, 22 did not run" for months. In
 * that window it silently absorbed a fixture refactor, a menu label rename, a Tailwind prefix
 * migration, and a UI redesign — none of which anyone noticed, because 22 hidden tests look exactly
 * like 22 intentionally skipped ones. A suite that fails silently rots at the rate the codebase
 * changes.
 *
 * The discriminator is `expectedStatus`, NOT annotations. A deliberate skip — `test.skip()`,
 * `test.fixme()`, and their conditional and describe-scoped forms — leaves the test EXPECTING to be
 * skipped, and Playwright's dispatcher updates that even for a skip decided at runtime. A test that
 * never ran still expects to pass. That difference is the whole check.
 *
 * Register this reporter FIRST. The multiplexer runs reporters in array order and applies a
 * reporter's status override only after its `onEnd` returns, so a reporter listed after `html` or
 * `list` lets those write a green report for a run this one then fails — which is the same "looks
 * like housekeeping" confusion it exists to end.
 */
class NoSilentSkipsReporter implements Reporter {
  private rootSuite: Suite | undefined;

  onBegin(_config: FullConfig, suite: Suite): void {
    this.rootSuite = suite;
  }

  async onEnd(result: FullResult): Promise<{ status?: FullResult['status'] } | undefined> {
    if (!this.rootSuite) return undefined;

    const allTests = this.rootSuite.allTests();
    const lost = findLostTests(allTests, result.status);
    if (lost.length === 0) return undefined;

    const listed = lost
      .map(
        (test) =>
          `  ${path.relative(process.cwd(), test.location.file)}:${test.location.line} › ` +
          // No `.slice(1)` to drop the project name. Under a config with no `projects` array the
          // name is an empty string and the filter removes it anyway; under one that names its
          // projects the name survives and is printed, which is useful rather than wrong. Slicing
          // unconditionally would eat the outermost describe title in the first case.
          `${test
            .titlePath()
            .filter((segment) => segment && !segment.endsWith('.spec.ts'))
            .join(' › ')}`,
      )
      .join('\n');

    // Reported to the console rather than as a test failure: no single test owns this, and the
    // point is that the run as a whole cannot be trusted.
    console.error(
      `\n${lost.length} test(s) never ran, and nothing asked for them to be skipped:\n${listed}\n\n` +
        `Playwright reports these the same way it reports a deliberate test.skip() — "did not run" ` +
        `on Linux, "skipped" on Windows — so they read as housekeeping. They are not. A worker ` +
        `died, a beforeAll threw, or they were still queued when the run was cut short, and these ` +
        `tests were lost.\n\n` +
        `Look at the first FAILING test in the same file: killing its worker is what usually takes ` +
        `the rest of the file with it.\n`,
    );

    return { status: result.status === 'passed' ? 'failed' : result.status };
  }
}

export default NoSilentSkipsReporter;
