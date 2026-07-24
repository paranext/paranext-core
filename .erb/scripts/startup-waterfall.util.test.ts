import { parseStartupMarks, formatWaterfall, selectLatestRun } from './startup-waterfall.util';

const SAMPLE = [
  '[2026-07-10 14:23:01.000] [info]  [main] STARTUP_MARK main process-start 1000',
  '[2026-07-10 14:23:01.200] [info]  [rend] STARTUP_MARK renderer root-render 1200',
  'unrelated log line that should be ignored',
  '[2026-07-10 14:23:01.900] [info]  [exth] STARTUP_MARK extension-host activate-start platformScripture 1900',
  '[2026-07-10 14:23:02.500] [info]  [.net] STARTUP_MARK .net project-scan-end 2500',
].join('\n');

// TypeScript log lines that don't already start with a "[...]" prefix get a caller annotation
// (" [at <fn> <file>:<line>:<col>]") appended by the shared logger hook
// (src/shared/utils/logger.utils.ts:122-166). These fixtures cover that shape so the parser
// regression (dropping every caller-suffixed TS mark) stays caught.
const CALLER_SUFFIXED_SAMPLE = [
  '[2026-07-10 14:23:01.050] [info]  [main] STARTUP_MARK main process-start 1050 [at markStartup file:///home/x/src/shared/utils/startup-timing.util.ts:22:10]',
  '[2026-07-10 14:23:01.950] [info]  [exth] STARTUP_MARK extension-host activate-start platformScripture 1950 [at file:///home/x/src/extension-host/services/extension.service.ts:1388:20]',
].join('\n');

describe('parseStartupMarks', () => {
  it('extracts only STARTUP_MARK lines with proc/name/epoch, including multi-word names', () => {
    const marks = parseStartupMarks(SAMPLE);
    expect(marks).toEqual([
      { proc: 'main', name: 'process-start', t: 1000 },
      { proc: 'renderer', name: 'root-render', t: 1200 },
      // <name> can itself contain spaces; the trailing digit run must still anchor <epochMs>.
      { proc: 'extension-host', name: 'activate-start platformScripture', t: 1900 },
      { proc: '.net', name: 'project-scan-end', t: 2500 },
    ]);
  });

  it('returns [] when there are no marks', () => {
    expect(parseStartupMarks('nothing here')).toEqual([]);
  });

  it('extracts the epoch from before a trailing "[at ...]" caller annotation, including when the annotation itself contains digits (e.g. line:col)', () => {
    const marks = parseStartupMarks(CALLER_SUFFIXED_SAMPLE);
    expect(marks).toEqual([
      { proc: 'main', name: 'process-start', t: 1050 },
      // Multi-word <name> plus a caller-suffix containing digits (1388:20) must not confuse the
      // epoch extraction: the epoch is the digit run immediately before " [at ...]".
      { proc: 'extension-host', name: 'activate-start platformScripture', t: 1950 },
    ]);
  });

  it('handles a mix of bare (C#-style) and caller-suffixed (TS-style) lines in the same log', () => {
    const marks = parseStartupMarks([SAMPLE, CALLER_SUFFIXED_SAMPLE].join('\n'));
    expect(marks).toHaveLength(6);
    expect(marks).toContainEqual({ proc: '.net', name: 'project-scan-end', t: 2500 });
    expect(marks).toContainEqual({ proc: 'main', name: 'process-start', t: 1050 });
  });
});

describe('selectLatestRun', () => {
  // electron-log's main.log appends across launches, so two instrumented runs land in one file.
  const TWO_RUN_LOG = [
    '[2026-07-10 14:23:01.000] [info]  [main] STARTUP_MARK main process-start 1000',
    '[2026-07-10 14:23:01.500] [info]  [.net] STARTUP_MARK .net process-start 1500',
    '[2026-07-10 14:23:02.000] [info]  [rend] STARTUP_MARK renderer root-render 2000',
    // Second launch, an hour later:
    '[2026-07-10 15:23:01.000] [info]  [main] STARTUP_MARK main process-start 3601000',
    '[2026-07-10 15:23:01.400] [info]  [.net] STARTUP_MARK .net process-start 3601400',
    '[2026-07-10 15:23:02.100] [info]  [rend] STARTUP_MARK renderer root-render 3602100',
  ].join('\n');

  it('keeps only the marks from the last `main process-start` onward and reports the run count', () => {
    const { marks, runCount } = selectLatestRun(parseStartupMarks(TWO_RUN_LOG));
    expect(runCount).toBe(2);
    expect(marks).toEqual([
      { proc: 'main', name: 'process-start', t: 3601000 },
      { proc: '.net', name: 'process-start', t: 3601400 },
      { proc: 'renderer', name: 'root-render', t: 3602100 },
    ]);
    // The rendered Total span must cover the latest run only, not the inter-launch gap.
    expect(formatWaterfall(marks)).toContain('Total span: 1100ms');
  });

  it('does not treat non-main process-start marks as run boundaries', () => {
    const marks = parseStartupMarks(
      [
        '[t] [info] [main] STARTUP_MARK main process-start 1000',
        '[t] [info] [exth] STARTUP_MARK extension-host process-start 1300',
        // e.g. the extension host restarting mid-session is still the same app run
        '[t] [info] [exth] STARTUP_MARK extension-host process-start 9000',
      ].join('\n'),
    );
    const result = selectLatestRun(marks);
    expect(result.runCount).toBe(1);
    expect(result.marks).toHaveLength(3);
  });

  it('returns all marks unchanged when no main process-start exists (rotated log)', () => {
    const marks = parseStartupMarks('[t] [info] [rend] STARTUP_MARK renderer root-render 2000');
    const result = selectLatestRun(marks);
    expect(result.runCount).toBe(0);
    expect(result.marks).toEqual(marks);
  });
});

describe('formatWaterfall', () => {
  it('orders by time and shows offset from the first mark', () => {
    const out = formatWaterfall(parseStartupMarks(SAMPLE));
    expect(out).toContain('process-start');
    expect(out).toContain('+1500ms'); // project-scan-end relative to process-start
    // multi-word names survive rendering intact
    expect(out).toContain('activate-start platformScripture');
    // first mark is the zero point
    expect(out).toMatch(/process-start[^\n]*\+0ms/);
  });

  it('returns the guidance message when there are no marks', () => {
    expect(formatWaterfall([])).toContain('No startup marks found');
  });
});
