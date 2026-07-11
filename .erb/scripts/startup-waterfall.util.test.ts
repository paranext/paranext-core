import { parseStartupMarks, formatWaterfall } from './startup-waterfall.util';

const SAMPLE = [
  '[2026-07-10 14:23:01.000] [info]  [main] STARTUP_MARK main process-start 1000',
  '[2026-07-10 14:23:01.200] [info]  [rend] STARTUP_MARK renderer root-render 1200',
  'unrelated log line that should be ignored',
  '[2026-07-10 14:23:02.500] [info]  [.net] STARTUP_MARK .net project-scan-end 2500',
].join('\n');

describe('parseStartupMarks', () => {
  it('extracts only STARTUP_MARK lines with proc/name/epoch', () => {
    const marks = parseStartupMarks(SAMPLE);
    expect(marks).toEqual([
      { proc: 'main', name: 'process-start', t: 1000 },
      { proc: 'renderer', name: 'root-render', t: 1200 },
      { proc: '.net', name: 'project-scan-end', t: 2500 },
    ]);
  });

  it('returns [] when there are no marks', () => {
    expect(parseStartupMarks('nothing here')).toEqual([]);
  });
});

describe('formatWaterfall', () => {
  it('orders by time and shows offset from the first mark', () => {
    const out = formatWaterfall(parseStartupMarks(SAMPLE));
    expect(out).toContain('process-start');
    expect(out).toContain('+1500ms'); // project-scan-end relative to process-start
    // first mark is the zero point
    expect(out).toMatch(/process-start[^\n]*\+0ms/);
  });
});
