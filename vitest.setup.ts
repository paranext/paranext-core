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
