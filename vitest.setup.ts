// Vitest global setup: warm the lazy, one-time ICU initialization behind the Intl.* constructors.
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

// ---------------------------------------------------------------------------
// Suppress jsdom's "Could not parse CSS stylesheet" errors.
//
// jsdom's CSS engine (rrweb-cssom) cannot parse Tailwind v4's modern syntax
// (@layer, @property, @supports with oklch()/color-mix(), ...). Whenever a
// component under test injects a <style> containing the Tailwind stylesheet
// (e.g. the experimental scripture/footnote editor), jsdom fails to parse it
// and reports a jsdomError whose `detail` property is the ENTIRE ~192 KB
// stylesheet. jsdom's VirtualConsole forwards that to console.error, so every
// such render dumps ~192 KB to the test output - roughly 50x per full run
// (~9.6 MB, ~89% of the CI log).
//
// Beyond the log bloat, the sheer volume of these giant writes intermittently
// deadlocked the vitest worker->main->runner output pipeline on the Linux CI
// runner, hanging the "npm unit tests" step for hours (it froze mid-write of
// the ~32nd dump every time). Windows and macOS drained the same output fine.
//
// jsdom cannot parse this CSS regardless, and no test relies on its computed
// styles, so we drop these specific errors at the source - in the worker,
// before vitest formats and serializes them - which removes both the log spam
// and the writes that caused the hang. All other console.error output passes
// through untouched. jsdom's VirtualConsole does a live property lookup on the
// console object at emit time, so reassigning console.error here is honored.
const CSS_PARSE_ERROR_MESSAGE = 'Could not parse CSS stylesheet';
function isJsdomCssParseError(arg: unknown): boolean {
  if (arg instanceof Error) {
    if (arg.message.includes(CSS_PARSE_ERROR_MESSAGE)) return true;
    return 'type' in arg && arg.type === 'css parsing';
  }
  return typeof arg === 'string' && arg.includes(CSS_PARSE_ERROR_MESSAGE);
}
// The no-console rule guards against stray logging in production code. This is a test-only
// setup file that must wrap the global console.error to drop jsdom's CSS-parse noise (see the
// block comment above), so the rule does not apply to the two references below.
/* eslint-disable no-console */
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  if (args.some(isJsdomCssParseError)) return;
  originalConsoleError(...args);
};
/* eslint-enable no-console */
